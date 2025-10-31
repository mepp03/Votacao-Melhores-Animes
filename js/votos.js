const endereco2 = "http://localhost:3000/";
var temporada9 = localStorage.getItem("temporada");
var dados;
var nome = localStorage.getItem("usuario");
var dadosAnimes = [];

const elements = document.querySelectorAll("[data-identificacao]");

elements.forEach(function (element) {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === "data-identificacao") {
        var categoria = mutation.target.id;
        var idVoto = mutation.target.getAttribute("data-identificacao");
        var imagemVoto = mutation.target.src;
        var nomeJVoto = mutation.target.getAttribute("data-nomeJ");
        var nomeEVoto = mutation.target.getAttribute("data-nomeE");
        var extraVoto = mutation.target.getAttribute("data-extra");

        var partes = categoria.split("Img");
        var tipo = partes[0];
        var posicao = partes[1];

        // CORREÇÃO: Tratar "par1" como "par"
        if (tipo === "par1") {
          tipo = "par";
        }

        if (
          tipo == "abertura" ||
          tipo == "encerramento" ||
          tipo == "feminino" ||
          tipo == "masculino" ||
          tipo == "antagonista" ||
          tipo == "par" || // Alterado de "par1" para "par"
          tipo == "doente"
        ) {
          if (extraVoto != "sem") {
            var imagemVoto2 = mutation.target.getAttribute("data-imagem2");
            salvar(
              categoria,
              tipo,
              posicao,
              idVoto,
              imagemVoto,
              nomeJVoto,
              nomeEVoto,
              extraVoto,
              imagemVoto2
            );
          }
        } else {
          salvar(
            categoria,
            tipo,
            posicao,
            idVoto,
            imagemVoto,
            nomeJVoto,
            nomeEVoto,
            extraVoto
          );
        }
      }
    });
  });

  observer.observe(element, { attributes: true });
});

function salvar(
  categoria,
  tipo,
  posicao,
  idVoto,
  imagemVoto,
  nomeJVoto,
  nomeEVoto,
  extraVoto,
  imagemVoto2
) {
  var idCat;
  var ordinal;
  var pontuacao;

  // CORREÇÃO: Escapar apóstrofos e barras antes de usar os dados
  function escapeForJSON(text) {
    if (!text) return text;
    return text
      .replace(/\\/g, "\\\\") // Escape backslashes first
      .replace(/'/g, "\\'") // Escape single quotes
      .replace(/"/g, '\\"') // Escape double quotes
      .replace(/\//g, "\\/") // Escape barras - IMPORTANTE para Fate/stay night
      .replace(/\n/g, "\\n") // Escape newlines
      .replace(/\r/g, "\\r") // Escape carriage returns
      .replace(/\t/g, "\\t"); // Escape tabs
  }

  // Aplicar escape nos campos de texto
  nomeJVoto = escapeForJSON(nomeJVoto);
  nomeEVoto = escapeForJSON(nomeEVoto);
  extraVoto = escapeForJSON(extraVoto);

  // CORREÇÃO: Removida a lógica duplicada de "par1" pois já foi tratada acima
  switch (tipo) {
    case "abertura":
      idCat = "01";
      catId = "0";
      break;
    case "encerramento":
      idCat = "02";
      catId = "1";
      break;
    case "feminino":
      idCat = "03";
      catId = "2";
      break;
    case "masculino":
      idCat = "04";
      catId = "3";
      break;
    case "surpresa":
      idCat = "05";
      catId = "4";
      break;
    case "decepcao":
      idCat = "06";
      catId = "5";
      break;
    case "animacao":
      idCat = "07";
      catId = "6";
      break;
    case "antagonista":
      idCat = "08";
      catId = "7";
      break;
    case "par": // Agora só trata "par", não "par1"
      idCat = "09";
      catId = "8";
      break;
    case "doente":
      idCat = "10";
      catId = "9";
      break;
    case "emocao":
      idCat = "11";
      catId = "10";
      break;
    case "anime":
      idCat = "12";
      catId = "11";
      break;
    default:
      console.log("deu ruim - tipo não reconhecido:", tipo);
      return;
  }

  temporada9 = localStorage.getItem("temporada");
  fetch(`${endereco2}votos${temporada9}`)
    .then((response) => response.json())
    .then((data) => {
      dadosAnimes = data.dados;
      var todasAsCategorias = data.votos;
      var categoriaAtualizada = todasAsCategorias[catId];

      // CORREÇÃO: Removida a lógica duplicada de "par1" aqui também
      var dadosCat = categoriaAtualizada[tipo];
      var nomeObjeto = dadosCat[nome];

      switch (posicao) {
        case "1":
          ordinal = "primeiro";
          pontuacao = 3;
          break;
        case "2":
          ordinal = "segundo";
          pontuacao = 2;
          break;
        case "3":
          ordinal = "terceiro";
          pontuacao = 1;
          break;
        default:
          console.log("Posição inválida:", posicao);
          return;
      }

      var objetoVoto = {
        id: idVoto,
        nomeJ: nomeJVoto,
        nomeE: nomeEVoto,
        imagem: imagemVoto,
        extra: extraVoto,
        ponto: pontuacao,
      };

      // CORREÇÃO: Agora usa idCat numérico para comparação
      if (idCat === "09") {
        // "09" corresponde à categoria "par"
        objetoVoto.imagem2 = imagemVoto2;
      }

      if (!nomeObjeto || !nomeObjeto.hasOwnProperty(ordinal)) {
        console.log("Objeto não encontrado para", nome, ordinal);
        return;
      }

      nomeObjeto[ordinal] = objetoVoto;

      temporada9 = localStorage.getItem("temporada");
      fetch(`${endereco2}votos${temporada9}`, {
        method: "PUT",
        body: JSON.stringify({ dados: dadosAnimes, votos: todasAsCategorias }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((dados) => {
          console.log("Dados salvos com sucesso");
        })
        .catch((error) => {
          console.error("Erro ao salvar dados:", error);
        });
    })
    .catch((error) => {
      console.error("Erro ao obter os dados:", error);
    });
}
