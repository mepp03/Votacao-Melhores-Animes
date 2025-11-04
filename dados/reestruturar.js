const fs = require("fs");

// Carrega o conteúdo do arquivo dbVotos.json
const rawData = fs.readFileSync("dbVotos.json");
const data = JSON.parse(rawData);

// Estrutura base dos votos
function criarEstruturaVotos() {
  const usuarios = ["leandro", "lucas", "thiago", "nil", "vencedor"];
  const posicoes = ["primeiro", "segundo", "terceiro"];
  const categorias = [
    "abertura",
    "encerramento",
    "feminino",
    "masculino",
    "surpresa",
    "decepcao",
    "animacao",
    "antagonista",
    "par",
    "doente",
    "emocao",
    "anime",
  ];

  const estruturaVazia = {
    id: "",
    nomeJ: "",
    nomeE: "",
    imagem: "../imagem/1333.jpg",
    ponto: "",
    extra: "",
  };

  const votos = [];

  categorias.forEach((categoria, index) => {
    const categoriaObj = {};
    usuarios.forEach((usuario) => {
      categoriaObj[usuario] = {};
      posicoes.forEach((posicao) => {
        categoriaObj[usuario][posicao] = { ...estruturaVazia };
      });
    });

    votos.push({
      id: (index + 1).toString().padStart(2, "0"),
      [categoria]: categoriaObj,
    });
  });

  return votos;
}

// Função para criar estrutura completa até 2025
function criarEstruturaCompleta(dadosAtuais) {
  const anos = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const temporadas = ["Inverno", "Primavera", "Verao", "Outono"];

  const novoBD = {};

  // Itera sobre todos os anos e temporadas
  anos.forEach((ano) => {
    temporadas.forEach((temporada) => {
      const chaveAnime = `${ano}${temporada}`;
      const chaveVotos = `votos${ano}${temporada}`;

      // Se já existe no BD atual, mantém os dados dos animes
      if (dadosAtuais[chaveAnime]) {
        novoBD[chaveAnime] = dadosAtuais[chaveAnime];
      } else {
        // Se não existe, cria array vazio
        novoBD[chaveAnime] = [];
      }

      // Se já existe votos no BD atual, mantém os dados
      if (dadosAtuais[chaveVotos]) {
        novoBD[chaveVotos] = dadosAtuais[chaveVotos];
      } else {
        // Se não existe, cria estrutura de votos completa
        novoBD[chaveVotos] = criarEstruturaVotos();
      }
    });
  });

  // Mantém quaisquer outras chaves que possam existir no BD
  Object.keys(dadosAtuais).forEach((chave) => {
    if (!novoBD[chave]) {
      novoBD[chave] = dadosAtuais[chave];
    }
  });

  return novoBD;
}

// Executa a função
console.log("🔄 Criando estrutura completa até 2025...");
const bdCompleto = criarEstruturaCompleta(data);

// Salva o novo JSON em um arquivo
fs.writeFileSync("bd_completo.json", JSON.stringify(bdCompleto, null, 2));

// Mostra estatísticas
console.log("✅ BD completo criado com sucesso!");
console.log("📊 Estatísticas:");

const anos = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
const temporadas = ["Inverno", "Primavera", "Verao", "Outono"];

anos.forEach((ano) => {
  temporadas.forEach((temporada) => {
    const chaveAnime = `${ano}${temporada}`;
    const chaveVotos = `votos${ano}${temporada}`;

    const qtdAnimes = Array.isArray(bdCompleto[chaveAnime])
      ? bdCompleto[chaveAnime].length
      : "ERRO";
    const temVotos =
      bdCompleto[chaveVotos] && Array.isArray(bdCompleto[chaveVotos])
        ? "✅"
        : "❌";

    console.log(`   ${chaveAnime}: ${qtdAnimes} animes | Votos: ${temVotos}`);

    // Mostra detalhes da estrutura de votos se existir
    if (bdCompleto[chaveVotos] && Array.isArray(bdCompleto[chaveVotos])) {
      console.log(
        `      Estrutura votos: ${bdCompleto[chaveVotos].length} categorias`
      );
      bdCompleto[chaveVotos].forEach((categoria, index) => {
        const nomeCategoria = Object.keys(categoria).find(
          (key) => key !== "id"
        );
        console.log(`        - ${categoria.id}: ${nomeCategoria}`);
      });
    }
  });
});
