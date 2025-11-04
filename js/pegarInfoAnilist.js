var animes = [];
var ano = document.getElementById("ano").value;
var estacao = document.getElementById("estacao").value;
const jsonString = `[]`;
var obj = JSON.parse(jsonString);
var anilist;
var votos = {};
var modoAdicao = false;

// Adicione um ouvinte de evento ao cabecalho assim que o script for carregado
document.addEventListener("DOMContentLoaded", function () {
  const pegarDados = document.querySelector("#cabecalho");
  pegarDados.addEventListener("change", function () {
    ano = document.getElementById("ano").value;
    estacao = document.getElementById("estacao").value;
  });

  // Inicializar botoes
  document.getElementById("botaoPegarAnime").disabled = true;
  document.getElementById("botaoSalvarBD").disabled = true;
});

//query para buscar os anime por temporada
const queryTemporada = `   
    query ($pagina: Int, $porPagina: Int, $ano: Int, $estacao: MediaSeason) 
    {
        Page (page: $pagina, perPage: $porPagina) 
        {
            pageInfo 
            {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media (seasonYear: $ano, season: $estacao, type: ANIME, isAdult: false, sort: TITLE_ROMAJI) 
            { 
                id
                averageScore
                episodes
                title 
                {
                    romaji
                    english
                }
                seasonYear
                season
                coverImage
                {
                    large
                    medium
                }    characters 
                {
                edges 
                { # Array of character edges
                    node 
                    { # Character node
                        name 
                        {
                            full
                        }
                        image 
                        {
                            large
                        }
                        gender
                    }
                }
            }
        }
    }}
`;

// query para buscar um anime por ID
const queryId = `
    query ($id: Int) {
        Media (id: $id, type: ANIME) { 
            id
            averageScore
            episodes
            title {
                romaji
                english
            }
            seasonYear
            season
            coverImage {
                large
                medium
            }    
            characters {
                edges {
                    node {
                        name {
                            full
                        }
                        image {
                            large
                        }
                        gender
                    }
                }
            }
        }
    }
`;

// Funcao para pegar temporada do AniList
async function pegarTemporadaAnilist() {
  animes = [];
  ano = document.getElementById("ano").value;
  estacao = document.getElementById("estacao").value;

  try {
    for (let index = 1; index <= 3; index++) {
      var variables = {
        busca: "",
        ano: ano,
        estacao: estacao,
        pagina: index,
        porPagina: 50,
      };

      var url = "https://graphql.anilist.co",
        options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: queryTemporada,
            variables: variables,
          }),
        };

      const response = await fetch(url, options);
      const data = await response.json();
      const filtrado = data.data.Page.media.filter(
        (item) => item.averageScore != null
      );

      // Buscar videos para cada anime
      for (let anime of filtrado) {
        anime.opening = { edges: [] };
        anime.ending = { edges: [] };
        await buscarVideosAnimethemes(anime);
      }

      animes.push(...filtrado);
    }

    // Atualiza a interface do usuario para exibir os novos animes
    anilist = 1;
    modoAdicao = true;
    document.getElementById("botaoPegarAnime").disabled = false;
    document.getElementById("botaoSalvarBD").disabled = false;
    atualizarValores(ano, estacao, undefined, 1);
  } catch (error) {
    console.error(error);
  }
}

// Funcao para pegar temporada do BD
async function pegarTemporadaBD() {
  ano = document.getElementById("ano").value;
  estacao = document.getElementById("estacao").value;
  const estacaoTraduzida = converterEstacao(estacao);

  const chaveBD = `${ano}${estacaoTraduzida}`;

  try {
    console.log("🔍 Buscando no BD:", `${endereco}${chaveBD}`);
    const response = await fetch(`${endereco}${chaveBD}`);

    if (!response.ok) {
      if (response.status === 404) {
        console.log("📭 Arquivo nao encontrado (404)");
        obj = [];
        alert(
          "❌ Esta temporada não existe no BD. Use 'Pegar do Anilist' para criar."
        );
        return;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } else {
      const data = await response.json();
      obj = Array.isArray(data) ? data : [];
    }

    console.log("📥 Dados carregados do BD:", obj);
    console.log("🔢 Total de animes:", obj.length);

    limparValores();
    obj.forEach((item) => {
      criarAnimeNaLista(item);
    });

    modoAdicao = true;
    document.getElementById("botaoPegarAnime").disabled = false;
    document.getElementById("botaoSalvarBD").disabled = false;

    console.log("🎉 Dados do BD carregados com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao carregar dados do BD:", error);
    alert("❌ Erro ao carregar dados do BD: " + error.message);
  }
}

// Funcao para buscar os dados de um anime por ID usando GraphQL
async function pegarAnimeId(id) {
  if (!modoAdicao) {
    alert(
      "Primeiro carregue uma temporada usando 'Pegar do Anilist' ou 'Pegar do BD'"
    );
    return;
  }

  try {
    const variables = {
      id: parseInt(id),
    };

    const url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: queryId,
          variables: variables,
        }),
      };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.errors) {
      alert("Anime nao encontrado: " + data.errors[0].message);
      return;
    }

    // Adiciona o anime no array existente
    var animeNovo = data.data.Media;
    animeNovo.opening = { edges: [] };
    animeNovo.ending = { edges: [] };

    await buscarVideosAnimethemes(animeNovo);

    console.log(animeNovo);

    obj.push(animeNovo);
    criarAnimeNaLista(animeNovo);
    document.getElementById("idAnime").value = "";

    alert("Anime adicionado com sucesso a temporada!");
  } catch (error) {
    console.error("Erro ao buscar os dados do anime por ID:", error);
    alert("Erro ao buscar anime: " + error.message);
  }
}

// Funcao para criar um anime na lista sem limpar os existentes
function criarAnimeNaLista(item) {
  if (!document.querySelector(`.anime-box[data-id="${item.id}"]`)) {
    const animeDiv = document.createElement("div");
    animeDiv.classList.add("anime-box");
    animeDiv.dataset.id = item.id;

    const image = document.createElement("img");
    image.src = item.coverImage.large;
    animeDiv.appendChild(image);

    const episodesText = document.createElement("p");
    episodesText.textContent = `Episodios: ${item.episodes}`;
    animeDiv.appendChild(episodesText);

    const infoDiv = document.createElement("div");
    infoDiv.id = "info";
    infoDiv.classList.add("item-container");

    const japaneseNameLabel = document.createElement("label");
    japaneseNameLabel.textContent = "Nome em japones:";
    infoDiv.appendChild(japaneseNameLabel);
    const japaneseNameInput = document.createElement("input");
    japaneseNameInput.type = "text";
    japaneseNameInput.id = "nomeJapones";
    japaneseNameInput.value = item.title.romaji;
    infoDiv.appendChild(japaneseNameInput);

    const englishNameLabel = document.createElement("label");
    englishNameLabel.textContent = "Nome em ingles:";
    infoDiv.appendChild(englishNameLabel);
    const englishNameInput = document.createElement("input");
    englishNameInput.id = "nomeIngles";
    englishNameInput.type = "text";
    englishNameInput.value = item.title.english;
    infoDiv.appendChild(englishNameInput);

    const openingContainer = document.createElement("div");
    openingContainer.classList.add("container__op");
    const openingLabel = document.createElement("label");
    openingLabel.textContent = "Abertura:";
    openingContainer.appendChild(openingLabel);

    if (item.opening.edges.length > 0) {
      item.opening.edges.forEach((edge) => {
        const openingOpEd = criarNovoOpEd(
          "abertura",
          edge.node.op.name,
          edge.node.op.video
        );
        openingContainer.appendChild(openingOpEd);
      });
    }

    const addOpeningButton = document.createElement("button");
    addOpeningButton.textContent = "+ Adicionar Abertura";
    addOpeningButton.classList.add("round-button", "add-abertura");
    openingContainer.appendChild(addOpeningButton);

    infoDiv.appendChild(openingContainer);

    const endingContainer = document.createElement("div");
    endingContainer.classList.add("container__ed");
    const endingLabel = document.createElement("label");
    endingLabel.textContent = "Encerramento:";
    endingContainer.appendChild(endingLabel);

    if (item.ending.edges.length > 0) {
      item.ending.edges.forEach((edge) => {
        const endingOpEd = criarNovoOpEd(
          "encerramento",
          edge.node.ed.name,
          edge.node.ed.video
        );
        endingContainer.appendChild(endingOpEd);
      });
    }

    const addEndingButton = document.createElement("button");
    addEndingButton.textContent = "+ Adicionar Encerramento";
    addEndingButton.classList.add("round-button", "add-encerramento");
    endingContainer.appendChild(addEndingButton);

    infoDiv.appendChild(endingContainer);

    animeDiv.appendChild(infoDiv);

    const escolhaDiv = document.createElement("div");
    escolhaDiv.id = "escolha";

    const buttonSalvar = document.createElement("button");
    buttonSalvar.textContent = "Salvar";
    buttonSalvar.classList.add("salvar");
    escolhaDiv.appendChild(buttonSalvar);

    const buttonApagar = document.createElement("button");
    buttonApagar.textContent = "Apagar";
    buttonApagar.classList.add("apagar");
    escolhaDiv.appendChild(buttonApagar);

    animeDiv.appendChild(escolhaDiv);
    document.getElementById("lista").appendChild(animeDiv);
  }
}

// Funcao para buscar videos no Animethemes
async function buscarVideosAnimethemes(animeInfo) {
  try {
    const nomesTentativa = [
      animeInfo.title.native,
      animeInfo.title.romaji,
      animeInfo.title.english,
      animeInfo.title.native?.replace(/:/g, ""),
      animeInfo.title.romaji?.replace(/:/g, ""),
      animeInfo.title.native?.replace(/第2期/g, "2nd Season"),
      animeInfo.title.romaji?.replace(/2nd Season/g, "Second Season"),
      animeInfo.title.native?.replace(/第3期/g, "3rd Season"),
      animeInfo.title.romaji?.replace(/3rd Season/g, "Third Season"),
      animeInfo.title.native?.replace(/３Ｄ彼女/g, "3D Kanojo"),
      animeInfo.title.romaji?.replace(/3D Kanojo/g, "Three-dimensional Girl"),
      animeInfo.title.native?.replace(/[「」『』]/g, ""),
      animeInfo.title.romaji?.replace(/[\[\]\(\)]/g, ""),
    ].filter((nome) => nome && nome.length > 0);

    for (const tentativa of nomesTentativa) {
      const url = `https://api.animethemes.moe/anime?filter[name]=${encodeURIComponent(
        tentativa
      )}&include=animethemes,animethemes.animethemeentries.videos,animethemes.song,animethemes.song.artists`;

      const res = await fetch(url);
      const data = await res.json();

      if (data?.anime?.length > 0) {
        const animeThemes = data.anime[0];

        animeThemes.animethemes?.forEach((theme) => {
          if (theme.type === "OP") {
            theme.animethemeentries?.forEach((entry) => {
              entry.videos?.forEach((video) => {
                animeInfo.opening.edges.push({
                  node: {
                    op: {
                      name: theme.song?.title || "Opening",
                      video: video.link,
                    },
                  },
                });
              });
            });
          } else if (theme.type === "ED") {
            theme.animethemeentries?.forEach((entry) => {
              entry.videos?.forEach((video) => {
                animeInfo.ending.edges.push({
                  node: {
                    ed: {
                      name: theme.song?.title || "Ending",
                      video: video.link,
                    },
                  },
                });
              });
            });
          }
        });

        console.log(`✅ Videos encontrados no Animethemes para: ${tentativa}`);
        break;
      }
    }
  } catch (error) {
    console.error("Erro ao buscar videos no Animethemes:", error);
  }
}

// evento dos botoes
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("salvar")) {
    pegarAlteracoes();
    salvarValores(ano, estacao);
  } else if (event.target.classList.contains("apagar")) {
    const animeDiv = event.target.closest(".anime-box");
    const animeId = animeDiv.dataset.id;
    obj = obj.filter((item) => item.id != animeId);
    animeDiv.remove();
    console.log(`🗑️ Anime ${animeId} removido`);
  } else if (event.target.classList.contains("add-abertura")) {
    criarInput("abertura", event.target);
  } else if (event.target.classList.contains("add-encerramento")) {
    criarInput("encerramento", event.target);
  }
});

function criarInput(tipo, clickedElement) {
  const animeBox = clickedElement.closest(".anime-box");
  if (animeBox) {
    const novoOpEd = document.createElement("div");
    novoOpEd.className = "op_ed " + tipo;

    const labelNome = document.createElement("label");
    labelNome.textContent =
      tipo === "abertura" ? "Nome da Abertura: " : "Nome do Encerramento: ";

    const inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.id = tipo === "abertura" ? "nomeOp" : "nomeEd";

    const labelVideo = document.createElement("label");
    labelVideo.textContent =
      tipo === "abertura" ? "Video da Abertura: " : "Video do Encerramento: ";

    const inputVideo = document.createElement("input");
    inputVideo.type = "text";
    inputVideo.id = tipo === "abertura" ? "videoOp" : "videoEd";

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "x";
    botaoRemover.onclick = function () {
      novoOpEd.parentNode.removeChild(novoOpEd);
    };

    novoOpEd.appendChild(labelNome);
    novoOpEd.appendChild(inputNome);
    novoOpEd.appendChild(labelVideo);
    novoOpEd.appendChild(inputVideo);
    novoOpEd.appendChild(botaoRemover);

    if (tipo === "abertura") {
      animeBox.querySelector(".container__op").appendChild(novoOpEd);
    } else {
      animeBox.querySelector(".container__ed").appendChild(novoOpEd);
    }
  }
}

async function salvarNoBD() {
  pegarAlteracoes();
  await salvarValores(ano, estacao);
}

function atualizarValores(ano, estacao, animeNovo, anilist) {
  if (typeof obj === "undefined") {
    obj = [];
  }

  limparValores();
  const estacaoTraduzida = converterEstacao(estacao);

  console.log("🔍 Iniciando atualizarValores...");
  console.log(
    "🌐 URL que sera buscada:",
    `${endereco}${ano}${estacaoTraduzida}`
  );

  fetch(`${endereco}${ano}${estacaoTraduzida}`)
    .then(function (response) {
      if (!response.ok) {
        if (response.status === 404) {
          obj = [];
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(function (data) {
      obj = Array.isArray(data) ? data : [];
      if (anilist == 1) {
        obj = animes || [];
      }
      if (!Array.isArray(obj)) obj = [];
      obj.forEach((item) => {
        criarAnimeNaLista(item);
      });
    })
    .catch(function (error) {
      console.error("❌ Erro ao carregar dados:", error);
      obj = [];
    });
}

function criarNovoOpEd(tipo, nome, video) {
  const novoOpEd = document.createElement("div");
  novoOpEd.className = "op_ed " + tipo;

  const labelNome = document.createElement("label");
  labelNome.textContent =
    tipo === "abertura" ? "Nome da Abertura: " : "Nome do Encerramento: ";

  const inputNome = document.createElement("input");
  inputNome.type = "text";
  inputNome.id = tipo === "abertura" ? "nomeOp" : "nomeEd";
  inputNome.value = nome;

  const labelVideo = document.createElement("label");
  labelVideo.textContent =
    tipo === "abertura" ? "Video da Abertura: " : "Video do Encerramento: ";

  const inputVideo = document.createElement("input");
  inputVideo.type = "text";
  inputVideo.id = tipo === "abertura" ? "videoOp" : "videoEd";
  inputVideo.value = video;

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "x";
  botaoRemover.onclick = function () {
    novoOpEd.parentNode.removeChild(novoOpEd);
  };

  novoOpEd.appendChild(labelNome);
  novoOpEd.appendChild(inputNome);
  novoOpEd.appendChild(labelVideo);
  novoOpEd.appendChild(inputVideo);
  novoOpEd.appendChild(botaoRemover);
  return novoOpEd;
}

function limparValores() {
  const lista = document.getElementById("lista");
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
}

function pegarAlteracoes() {
  animes = [];
  const animeBoxes = document.querySelectorAll(".anime-box");

  animeBoxes.forEach((animeBox) => {
    const animeId = animeBox.dataset.id;
    const anime = obj.find((item) => item.id == animeId);

    if (anime) {
      const abertura = animeBox.querySelectorAll(".op_ed.abertura");
      const encerramento = animeBox.querySelectorAll(".op_ed.encerramento");

      anime.opening = { edges: [] };
      anime.ending = { edges: [] };

      abertura.forEach((op) => {
        const openingNameInput = op.querySelector("#nomeOp");
        const openingVideoInput = op.querySelector("#videoOp");

        const newOpening = {
          node: {
            op: {
              name: openingNameInput.value,
              video: openingVideoInput.value,
            },
          },
        };
        anime.opening.edges.push(newOpening);
      });

      encerramento.forEach((ed) => {
        const endingNameInput = ed.querySelector("#nomeEd");
        const endingVideoInput = ed.querySelector("#videoEd");

        const newEnding = {
          node: {
            ed: {
              name: endingNameInput.value,
              video: endingVideoInput.value,
            },
          },
        };
        anime.ending.edges.push(newEnding);
      });

      const japaneseNameInput = animeBox.querySelector("#nomeJapones");
      const englishNameInput = animeBox.querySelector("#nomeIngles");

      anime.title.romaji = japaneseNameInput.value;
      anime.title.english = englishNameInput.value;
      animes.push(anime);
    }
  });
}

function converterEstacao(estacao) {
  switch (estacao) {
    case "WINTER":
      return "Inverno";
    case "SPRING":
      return "Primavera";
    case "SUMMER":
      return "Verao";
    case "FALL":
      return "Outono";
    default:
      return estacao;
  }
}

// =============== SALVAR LOCALMENTE =================
async function salvarValores(ano, estacao) {
  const estacaoTraduzida = converterEstacao(estacao);
  const nomeArquivo = `${ano}${estacaoTraduzida}.json`;

  obj.sort((a, b) => (a.title.romaji > b.title.romaji ? 1 : -1));

  console.log("💾 Salvando dados:", nomeArquivo);
  console.log("📊 Total de animes:", obj.length);

  try {
    // Criar blob com os dados
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json",
    });

    // Criar URL temporária
    const url = URL.createObjectURL(blob);

    // Criar elemento de link para download
    const a = document.createElement("a");
    a.href = url;
    a.download = nomeArquivo;
    a.style.display = "none";

    // Adicionar ao documento, clicar e remover
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Liberar a URL
    URL.revokeObjectURL(url);

    console.log("✅ Dados salvos com sucesso!");
    alert("✅ Dados salvos com sucesso como " + nomeArquivo);
  } catch (error) {
    console.error("❌ Erro ao salvar dados:", error);
    alert("❌ Erro ao salvar dados: " + error.message);
  }
}
// ===========================================

atualizarValores(ano, estacao);
