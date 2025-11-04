// Mapeamento das categorias do JSON para os nomes exibidos
const categoriasMap = {
  abertura: "Melhor Abertura",
  encerramento: "Melhor Encerramento",
  feminino: "Melhor Waifu ❤",
  masculino: "Melhor Personagem Masculino",
  surpresa: "Maior Surpresa",
  decepcao: "Maior Decepção",
  animacao: "Melhor Animação",
  antagonista: "Melhor Antagonista",
  par: "Melhor Par",
  doente: "Personagem Mais Doente Mental",
  emocao: "Melhor Anime Que Mexeu Com Seu Kokoro",
  anime: "Melhor Anime",
};

// Mapeamento das posições
const posicoes = ["primeiro", "segundo", "terceiro"];
const posicoesMap = {
  primeiro: "🥇",
  segundo: "🥈",
  terceiro: "🥉",
};

// Pessoas que votam
const pessoas = ["leandro", "lucas", "nil", "thiago", "vencedor"];

function criarTabelaCategoria(categoriaKey, categoriaNome) {
  return `
        <section class="categoria ${categoriaKey}">
            <h2 class="categoria--h2Nome">${categoriaNome}</h2>
            <table class="tabela">
                <tr class="tabela__linha">
                    <th class="tabela__cabecalho"></th>
                    ${pessoas
                      .map(
                        (pessoa) =>
                          `<th class="tabela__cabecalho">${
                            pessoa === "vencedor"
                              ? "Vencedor"
                              : capitalizeFirst(pessoa)
                          }</th>`
                      )
                      .join("")}
                </tr>
                ${posicoes
                  .map((posicao) => criarLinhaTabela(categoriaKey, posicao))
                  .join("")}
            </table>
        </section>
    `;
}

function criarLinhaTabela(categoriaKey, posicao) {
  return `
        <tr class="tabela__linha ${posicao}">
            <td class="tabela__coluna posicao">${posicoesMap[posicao]}</td>
            ${pessoas
              .map((pessoa) => criarColuna(categoriaKey, pessoa, posicao))
              .join("")}
        </tr>
    `;
}

function criarColuna(categoriaKey, pessoa, posicao) {
  const isPar = categoriaKey === "par";

  return `
        <td class="tabela__coluna">
            <div class="tabela__coluna__img">
                <img src="../imagem/1333.jpg" 
                     id="img${capitalizeFirst(categoriaKey)}${capitalizeFirst(
    pessoa
  )}${getNumeroPosicao(posicao)}"
                     class="imagem-voto"
                     data-categoria="${categoriaKey}"
                     data-pessoa="${pessoa}"
                     data-posicao="${posicao}">
                ${
                  isPar
                    ? `<img src="../imagem/1333.jpg" 
                     id="img${capitalizeFirst(categoriaKey)}2${capitalizeFirst(
                        pessoa
                      )}${getNumeroPosicao(posicao)}"
                     class="imagem-voto imagem-par"
                     data-categoria="${categoriaKey}"
                     data-pessoa="${pessoa}"
                     data-posicao="${posicao}">`
                    : ""
                }
            </div>
            <h4 id="nomeJapones${capitalizeFirst(
              categoriaKey
            )}${capitalizeFirst(pessoa)}${getNumeroPosicao(posicao)}">
                ${getNumeroPosicao(posicao)}º Lugar
            </h4>
            <h4 id="nomeIngles${capitalizeFirst(categoriaKey)}${capitalizeFirst(
    pessoa
  )}${getNumeroPosicao(posicao)}"></h4>
            <h4 id="extra${capitalizeFirst(categoriaKey)}${capitalizeFirst(
    pessoa
  )}${getNumeroPosicao(posicao)}"></h4>
        </td>
    `;
}

function getNumeroPosicao(posicao) {
  const map = { primeiro: "1", segundo: "2", terceiro: "3" };
  return map[posicao];
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função principal para carregar todas as categorias
function carregarCategorias() {
  const main = document.querySelector("main");
  const temporadaElement = document.querySelector(".temporada");

  // Remove todas as seções existentes (exceto a de temporada)
  const sections = main.querySelectorAll("section");
  sections.forEach((section) => {
    if (!section.classList.contains("temporada")) {
      section.remove();
    }
  });

  // Adiciona todas as categorias dinamicamente
  Object.keys(categoriasMap).forEach((categoriaKey) => {
    const categoriaHTML = criarTabelaCategoria(
      categoriaKey,
      categoriasMap[categoriaKey]
    );
    temporadaElement.insertAdjacentHTML("afterend", categoriaHTML);
  });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  carregarCategorias();
});
