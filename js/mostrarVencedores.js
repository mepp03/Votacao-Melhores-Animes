// Mapeamento das categorias na ordem correta
const categoriasMap = [
  { key: "abertura", codigo: "Op" },
  { key: "encerramento", codigo: "Ed" },
  { key: "feminino", codigo: "Feminino" },
  { key: "masculino", codigo: "Masculino" },
  { key: "surpresa", codigo: "Surpresa" },
  { key: "decepcao", codigo: "Decepcao" },
  { key: "animacao", codigo: "Animacao" },
  { key: "antagonista", codigo: "Antagonista" },
  { key: "par", codigo: "Par" },
  { key: "doente", codigo: "Doente" },
  { key: "emocao", codigo: "Emocao" },
  { key: "anime", codigo: "Anime" },
];

// Adicione um ouvinte de evento ao cabeçalho assim que o script for carregado
document.addEventListener("DOMContentLoaded", function () {
  const pegarDados = document.querySelector("#cabecalho__temporadas");
  if (pegarDados) {
    pegarDados.addEventListener("change", function () {
      resetarImagens();
      mostrarVencedores();
    });

    // Chama automaticamente ao carregar
    mostrarVencedores();
  }
});

// Função principal para mostrar vencedores
function mostrarVencedores() {
  var temporada = localStorage.getItem("temporada");

  if (!temporada) {
    return;
  }

  const arquivoVotos = `votos${temporada}`;

  fetch(`${endereco}${arquivoVotos}`)
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(function (data) {
      const votosData = data.votos || data;
      preencherTodasCategorias(votosData);
    })
    .catch(function (error) {
      console.error("❌ Erro ao carregar dados:", error);
    });
}

// Preencher todas as categorias dinamicamente
function preencherTodasCategorias(votosData) {
  if (!votosData) {
    return;
  }

  if (!Array.isArray(votosData)) {
    return;
  }

  // Para cada categoria no mapeamento
  categoriasMap.forEach((categoria, index) => {
    const dadosCategoria = votosData[index];
    if (!dadosCategoria) {
      return;
    }

    const categoriaKey = Object.keys(dadosCategoria).find(
      (key) => key !== "id"
    );

    if (!categoriaKey || categoriaKey !== categoria.key) {
      return;
    }

    const votos = dadosCategoria[categoriaKey];

    // Preencher dados para cada pessoa e posição
    pessoas.forEach((pessoa) => {
      if (votos[pessoa]) {
        const votosPessoa = Object.values(votos[pessoa]);

        ["1", "2", "3"].forEach((posicao, posIndex) => {
          if (votosPessoa[posIndex]) {
            preencherCelula(
              categoria.codigo,
              pessoa,
              posicao,
              votosPessoa[posIndex]
            );
          }
        });
      }
    });

    // Preencher os pontos do vencedor
    if (votos.vencedor) {
      preencherPontosVencedor(categoria.codigo, votos.vencedor);
    }
  });
}

// Preencher apenas os pontos do vencedor
function preencherPontosVencedor(categoriaCodigo, vencedor) {
  const pessoa = "vencedor";
  const pessoaCapitalizada = pessoa.charAt(0).toUpperCase() + pessoa.slice(1);

  // Preencher pontos para cada posição do vencedor
  if (vencedor.primeiro && vencedor.primeiro.ponto) {
    const pontosElement = document.getElementById(
      `pontos${categoriaCodigo}${pessoaCapitalizada}1`
    );
    if (pontosElement) {
      pontosElement.textContent = `Pontos: ${vencedor.primeiro.ponto}`;
    }
  }

  if (vencedor.segundo && vencedor.segundo.ponto) {
    const pontosElement = document.getElementById(
      `pontos${categoriaCodigo}${pessoaCapitalizada}2`
    );
    if (pontosElement) {
      pontosElement.textContent = `Pontos: ${vencedor.segundo.ponto}`;
    }
  }

  if (vencedor.terceiro && vencedor.terceiro.ponto) {
    const pontosElement = document.getElementById(
      `pontos${categoriaCodigo}${pessoaCapitalizada}3`
    );
    if (pontosElement) {
      pontosElement.textContent = `Pontos: ${vencedor.terceiro.ponto}`;
    }
  }
}

// Preencher uma célula específica
function preencherCelula(categoria, pessoa, posicao, dados) {
  const pessoaCapitalizada = pessoa.charAt(0).toUpperCase() + pessoa.slice(1);

  // Elementos da DOM
  const imgElement = document.getElementById(
    `img${categoria}${pessoaCapitalizada}${posicao}`
  );
  const nomeJaponesElement = document.getElementById(
    `nomeJapones${categoria}${pessoaCapitalizada}${posicao}`
  );
  const nomeInglesElement = document.getElementById(
    `nomeIngles${categoria}${pessoaCapitalizada}${posicao}`
  );
  const extraElement = document.getElementById(
    `extra${categoria}${pessoaCapitalizada}${posicao}`
  );

  // CORREÇÃO: Lidar com múltiplas imagens (empatados)
  if (imgElement && dados.imagem) {
    // Se tem "***" significa que são múltiplas imagens (empatados)
    if (dados.imagem.includes("***")) {
      const imagens = dados.imagem
        .split("***")
        .filter(
          (imagemSrc) =>
            imagemSrc && imagemSrc !== "../imagem/1333.jpg" && imagemSrc !== ""
        );

      // Se tem imagens válidas para empate
      if (imagens.length > 0) {
        // Configura o container
        const imgContainer = imgElement.parentElement;
        imgContainer.style.display = "flex";
        imgContainer.style.justifyContent = "center";
        imgContainer.style.alignItems = "center";
        imgContainer.style.gap = "5px";
        imgContainer.style.flexWrap = "wrap";

        // Remove a imagem original temporariamente
        imgElement.style.display = "none";

        // Adiciona cada imagem de empate
        imagens.forEach((imagemSrc, index) => {
          const novaImg = document.createElement("img");
          novaImg.src = imagemSrc;
          novaImg.alt = dados.nomeJ || "";
          novaImg.className = "imagem-voto imagem-empate";
          novaImg.style.maxWidth = "45%"; // Controla o tamanho
          novaImg.style.height = "auto";
          novaImg.style.objectFit = "cover";
          novaImg.style.flex = "1";
          novaImg.style.minWidth = "40%"; // Evita imagens muito pequenas
          imgContainer.appendChild(novaImg);
        });
      }
    } else {
      // Imagem única (comportamento normal)
      if (dados.imagem !== "../imagem/1333.jpg" && dados.imagem !== "") {
        // Garante que a imagem original está visível
        imgElement.style.display = "block";
        imgElement.src = dados.imagem;
        imgElement.alt = dados.nomeJ || "";
        imgElement.className = "imagem-voto";
        imgElement.style.cssText = ""; // Remove estilos anteriores
      }
    }
  }

  // CORREÇÃO: Lidar com múltiplas imagens2 para categoria Par (empatados)
  if (categoria === "Par" && dados.imagem2) {
    const img2Element = document.getElementById(
      `img${categoria}2${pessoaCapitalizada}${posicao}`
    );

    if (img2Element && dados.imagem2.includes("***")) {
      const imagens2 = dados.imagem2.split("***");
      // Limpar container de imagens2 primeiro
      const img2Container = img2Element.parentElement;
      img2Container.innerHTML = "";
      img2Container.style.display = "flex";
      img2Container.style.justifyContent = "center";
      img2Container.style.alignItems = "center";
      img2Container.style.gap = "2px";

      // Adicionar cada imagem2 lado a lado
      imagens2.forEach((imagemSrc, index) => {
        if (
          imagemSrc &&
          imagemSrc !== "../imagem/1333.jpg" &&
          imagemSrc !== ""
        ) {
          const novaImg = document.createElement("img");
          novaImg.src = imagemSrc;
          novaImg.alt = dados.nomeJ || "";
          novaImg.className = "imagem-voto imagem-par imagem-empate";
          novaImg.style.flex = "1";
          novaImg.style.maxWidth = `${100 / imagens2.length}%`;
          novaImg.style.height = "auto";
          novaImg.style.objectFit = "cover";
          img2Container.appendChild(novaImg);
        }
      });
    } else if (
      img2Element &&
      dados.imagem2 !== "../imagem/1333.jpg" &&
      dados.imagem2 !== ""
    ) {
      // Imagem2 única (comportamento normal)
      img2Element.src = dados.imagem2;
    }
  }

  // Preencher textos
  if (nomeJaponesElement && dados.nomeJ && dados.nomeJ !== "") {
    nomeJaponesElement.textContent = dados.nomeJ;
  }

  if (nomeInglesElement && dados.nomeE && dados.nomeE !== "") {
    nomeInglesElement.textContent = dados.nomeE;
  }

  if (extraElement && dados.extra && dados.extra !== "") {
    extraElement.textContent = dados.extra;
  }
}

// Função para capitalizar
function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Resetar todas as imagens para o padrão - VERSÃO INTELIGENTE
function resetarImagens() {
  const pessoas = ["leandro", "lucas", "thiago", "nil", "vencedor"];

  categoriasMap.forEach((categoria) => {
    pessoas.forEach((pessoa) => {
      const pessoaCapitalizada =
        pessoa.charAt(0).toUpperCase() + pessoa.slice(1);

      ["1", "2", "3"].forEach((posicao) => {
        // Estratégia SUAVE: Apenas reseta o conteúdo, não destrói a estrutura
        const imgId = `img${categoria.codigo}${pessoaCapitalizada}${posicao}`;
        const imgElement = document.getElementById(imgId);

        if (imgElement) {
          // RESETA APENAS a imagem original - mantém estrutura
          imgElement.src = "../imagem/1333.jpg";
          imgElement.alt = "";
          imgElement.className = "imagem-voto";
          imgElement.style.cssText = ""; // Remove estilos inline

          // Remove APENAS imagens extras (empates) mantendo a original
          const container = imgElement.parentElement;
          if (container) {
            const todasImagens = container.querySelectorAll("img");
            todasImagens.forEach((img, index) => {
              if (index > 0) {
                // Mantém a primeira (original), remove as outras
                img.remove();
              }
            });

            // Reseta estilos do container MAS mantém estrutura básica
            container.style.display = "";
            container.style.flexDirection = "";
            container.style.justifyContent = "";
            container.style.alignItems = "";
            container.style.gap = "";
            container.style.flexWrap = "";
          }
        }

        // Para categoria Par (segunda imagem)
        if (categoria.codigo === "Par") {
          const img2Id = `img${categoria.codigo}2${pessoaCapitalizada}${posicao}`;
          const img2Element = document.getElementById(img2Id);

          if (img2Element) {
            img2Element.src = "../imagem/1333.jpg";
            img2Element.alt = "";
            img2Element.className = "imagem-voto imagem-par";
            img2Element.style.cssText = "";

            const container2 = img2Element.parentElement;
            if (container2) {
              const todasImagens2 = container2.querySelectorAll("img");
              todasImagens2.forEach((img, index) => {
                if (index > 0) {
                  img.remove();
                }
              });
              container2.style.display = "";
            }
          }
        }

        // Resetar pontos do vencedor
        if (pessoa === "vencedor") {
          const pontosElement = document.getElementById(
            `pontos${categoria.codigo}${pessoaCapitalizada}${posicao}`
          );
          if (pontosElement) {
            pontosElement.textContent = "";
          }
        }

        // Resetar textos
        const nomeJaponesElement = document.getElementById(
          `nomeJapones${categoria.codigo}${pessoaCapitalizada}${posicao}`
        );
        const nomeInglesElement = document.getElementById(
          `nomeIngles${categoria.codigo}${pessoaCapitalizada}${posicao}`
        );
        const extraElement = document.getElementById(
          `extra${categoria.codigo}${pessoaCapitalizada}${posicao}`
        );

        if (nomeJaponesElement) nomeJaponesElement.textContent = "";
        if (nomeInglesElement) nomeInglesElement.textContent = "";
        if (extraElement) extraElement.textContent = "";
      });
    });
  });
}
