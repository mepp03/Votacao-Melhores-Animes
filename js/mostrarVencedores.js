const endereco = "http://localhost:3000/";

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
      const imagens = dados.imagem.split("***");
      // Limpar container de imagens primeiro
      const imgContainer = imgElement.parentElement;
      imgContainer.innerHTML = "";
      imgContainer.style.display = "flex";
      imgContainer.style.justifyContent = "center";
      imgContainer.style.alignItems = "center";
      imgContainer.style.gap = "2px";

      // Adicionar cada imagem lado a lado
      imagens.forEach((imagemSrc, index) => {
        if (
          imagemSrc &&
          imagemSrc !== "../imagem/1333.jpg" &&
          imagemSrc !== ""
        ) {
          const novaImg = document.createElement("img");
          novaImg.src = imagemSrc;
          novaImg.alt = dados.nomeJ || "";
          novaImg.className = "imagem-voto imagem-empate";
          novaImg.style.flex = "1";
          novaImg.style.maxWidth = `${100 / imagens.length}%`;
          novaImg.style.height = "auto";
          novaImg.style.objectFit = "cover";
          imgContainer.appendChild(novaImg);
        }
      });
    } else {
      // Imagem única (comportamento normal)
      if (dados.imagem !== "../imagem/1333.jpg" && dados.imagem !== "") {
        imgElement.src = dados.imagem;
        imgElement.alt = dados.nomeJ || "";
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

// Resetar todas as imagens para o padrão
function resetarImagens() {
  const pessoas = ["leandro", "lucas", "thiago", "nil", "vencedor"];

  categoriasMap.forEach((categoria) => {
    pessoas.forEach((pessoa) => {
      const pessoaCapitalizada =
        pessoa.charAt(0).toUpperCase() + pessoa.slice(1);

      // Resetar posições 1, 2, 3
      ["1", "2", "3"].forEach((posicao) => {
        // Resetar imagem principal
        const imgElement = document.getElementById(
          `img${categoria.codigo}${pessoaCapitalizada}${posicao}`
        );
        if (imgElement) {
          imgElement.src = "../imagem/1333.jpg";
          imgElement.alt = "";
          // Restaurar estrutura original do container
          const imgContainer = imgElement.parentElement;
          imgContainer.innerHTML = "";
          imgContainer.style.display = "block";
          const originalImg = document.createElement("img");
          originalImg.src = "../imagem/1333.jpg";
          originalImg.id = `img${categoria.codigo}${pessoaCapitalizada}${posicao}`;
          originalImg.className = "imagem-voto";
          originalImg.alt = "";
          imgContainer.appendChild(originalImg);
        }

        // Resetar segunda imagem (para categoria Par)
        if (categoria.codigo === "Par") {
          const img2Element = document.getElementById(
            `img${categoria.codigo}2${pessoaCapitalizada}${posicao}`
          );
          if (img2Element) {
            img2Element.src = "../imagem/1333.jpg";
            // Restaurar estrutura original do container
            const img2Container = img2Element.parentElement;
            img2Container.innerHTML = "";
            img2Container.style.display = "block";
            const originalImg2 = document.createElement("img");
            originalImg2.src = "../imagem/1333.jpg";
            originalImg2.id = `img${categoria.codigo}2${pessoaCapitalizada}${posicao}`;
            originalImg2.className = "imagem-voto imagem-par";
            originalImg2.alt = "";
            img2Container.appendChild(originalImg2);
          }
        }

        // Resetar pontos APENAS do vencedor
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
