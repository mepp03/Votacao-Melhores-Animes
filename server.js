const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("dados/dbVotos.json");
const middlewares = jsonServer.defaults({
  static: "./public",
});

const PORT = process.env.PORT || 3000;

// Configurar CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server rodando na porta ${PORT}`);
});
