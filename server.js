const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();
const dbPath = path.join(__dirname, "dados", "dbVotos.json");
const middlewares = jsonServer.defaults({
  static: "./public",
});

const PORT = process.env.PORT || 3000;

// CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// ⭐ VARIÁVEL GLOBAL para controlar o router
let router = null;

// ⭐ FUNÇÃO PARA RECARREGAR O ROUTER
function recarregarRouter() {
  if (router) {
    server._router.stack = server._router.stack.filter((layer) => {
      return layer.handle !== router;
    });
  }

  // Ler os dados atualizados do arquivo
  let db = {};
  if (fs.existsSync(dbPath)) {
    const conteudo = fs.readFileSync(dbPath, "utf8");
    db = JSON.parse(conteudo);
  }

  // Criar novo router com dados atualizados
  router = jsonServer.router(db);
  server.use(router);

  console.log("🔄 Router recarregado com dados atualizados");
}

// ⭐ ROTA CUSTOMIZADA PARA PUT - ATUALIZADA
server.put("/:temporada", (req, res) => {
  console.log(`📝 Recebendo PUT para /${req.params.temporada}`);

  try {
    const temporada = req.params.temporada;
    const novosAnimes = req.body;

    // Ler arquivo JSON atual
    let db = {};
    if (fs.existsSync(dbPath)) {
      const conteudo = fs.readFileSync(dbPath, "utf8");
      db = JSON.parse(conteudo);
    }

    // Atualizar temporada
    db[temporada] = novosAnimes;

    // Salvar arquivo
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");

    console.log(`✅ ${temporada} salva com ${novosAnimes.length} animes`);

    // ⭐ RECARREGAR O ROUTER APÓS SALVAR
    recarregarRouter();

    res.status(200).json({
      success: true,
      message: `${temporada} atualizada com sucesso`,
      count: novosAnimes.length,
    });
  } catch (error) {
    console.error("❌ Erro ao salvar:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ⭐ ROTA CUSTOMIZADA PARA GET - PARA EVITAR CACHE
server.get("/:temporada", (req, res) => {
  const temporada = req.params.temporada;
  console.log(`📖 GET para /${temporada}`);

  try {
    // Ler diretamente do arquivo (não do router)
    let db = {};
    if (fs.existsSync(dbPath)) {
      const conteudo = fs.readFileSync(dbPath, "utf8");
      db = JSON.parse(conteudo);
    }

    const dadosTemporada = db[temporada] || [];

    console.log(
      `✅ ${temporada} retornada com ${dadosTemporada.length} animes`
    );

    // ⭐ HEADERS PARA EVITAR CACHE
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", "0");

    res.status(200).json(dadosTemporada);
  } catch (error) {
    console.error("❌ Erro ao buscar temporada:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ⭐ INICIALIZAR O ROUTER PELA PRIMEIRA VEZ
recarregarRouter();

server.listen(PORT, () => {
  console.log(`🚀 JSON Server rodando na porta ${PORT}`);
  console.log(`📂 Banco de dados: ${dbPath}`);
  console.log(`🔄 Sistema de reload automático ativado`);
});
