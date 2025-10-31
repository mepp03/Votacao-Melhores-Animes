// Mapeamento das categorias para os nomes exibidos (na ordem correta)
const categoriasDisplayMap = [
  { key: "abertura", nome: "Melhor Abertura", codigo: "Op" },
  { key: "encerramento", nome: "Melhor Encerramento", codigo: "Ed" },
  { key: "feminino", nome: "Melhor Waifu ❤", codigo: "Feminino" },
  {
    key: "masculino",
    nome: "Melhor Personagem Masculino",
    codigo: "Masculino",
  },
  { key: "surpresa", nome: "Maior Surpresa", codigo: "Surpresa" },
  { key: "decepcao", nome: "Maior Decepção", codigo: "Decepcao" },
  { key: "animacao", nome: "Melhor Animação", codigo: "Animacao" },
  { key: "antagonista", nome: "Melhor Antagonista", codigo: "Antagonista" },
  { key: "par", nome: "Melhor Par", codigo: "Par" },
  { key: "doente", nome: "Personagem Mais Doente Mental", codigo: "Doente" },
  {
    key: "emocao",
    nome: "Melhor Anime Que Mexeu Com Seu Kokoro",
    codigo: "Emocao",
  },
  { key: "anime", nome: "Melhor Anime", codigo: "Anime" },
];

const pessoas = ["leandro", "lucas", "nil", "thiago", "vencedor"];

function criarTabelaCategoria(categoria) {
  const isPar = categoria.key === "par";

  return `
        <section class="categoria ${categoria.key}">
            <h2 class="categoria--h2Nome">${categoria.nome}</h2>
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
                ${criarLinhaTabela(categoria.codigo, "1", "🥇", isPar)}
                ${criarLinhaTabela(categoria.codigo, "2", "🥈", isPar)}
                ${criarLinhaTabela(categoria.codigo, "3", "🥉", isPar)}
            </table>
        </section>
    `;
}

function criarLinhaTabela(categoriaCodigo, posicao, emoji, isPar) {
  return `
        <tr class="tabela__linha ${
          posicao === "1"
            ? "primeiro"
            : posicao === "2"
            ? "segundo"
            : "terceiro"
        }">
            <td class="tabela__coluna posicao">${emoji}</td>
            ${pessoas
              .map((pessoa) =>
                criarColuna(categoriaCodigo, pessoa, posicao, isPar)
              )
              .join("")}
        </tr>
    `;
}

function criarColuna(categoriaCodigo, pessoa, posicao, isPar) {
  const pessoaCapitalizada = capitalizeFirst(pessoa);

  return `
        <td class="tabela__coluna">
            <div class="tabela__coluna__img">
                <img src="../imagem/1333.jpg" 
                     id="img${categoriaCodigo}${pessoaCapitalizada}${posicao}"
                     class="imagem-voto">
                ${
                  isPar
                    ? `
                <img src="../imagem/1333.jpg" 
                     id="img${categoriaCodigo}2${pessoaCapitalizada}${posicao}"
                     class="imagem-voto imagem-par">`
                    : ""
                }
            </div>
            <!-- MOSTRAR PONTOS APENAS PARA O VENCEDOR -->
            ${
              pessoa === "vencedor"
                ? `<h4 id="pontos${categoriaCodigo}${pessoaCapitalizada}${posicao}" class="pontos-celula"></h4>`
                : ""
            }
            <h4 id="nomeJapones${categoriaCodigo}${pessoaCapitalizada}${posicao}">${posicao}º Lugar</h4>
            <h4 id="nomeIngles${categoriaCodigo}${pessoaCapitalizada}${posicao}"></h4>
            <h4 id="extra${categoriaCodigo}${pessoaCapitalizada}${posicao}"></h4>
        </td>
    `;
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função principal para carregar todas as categorias
function carregarCategorias() {
  const main = document.querySelector("main");
  const temporadaElement = main.querySelector(".temporada");

  if (!temporadaElement) {
    console.error("Elemento temporada não encontrado!");
    return;
  }

  // Remove apenas as seções de categoria, não o cabeçalho
  const sectionsCategoria = main.querySelectorAll("section.categoria");
  sectionsCategoria.forEach((section) => {
    section.remove();
  });

  // Adiciona todas as categorias dinamicamente
  categoriasDisplayMap.forEach((categoria) => {
    const categoriaHTML = criarTabelaCategoria(categoria);
    temporadaElement.insertAdjacentHTML("beforeend", categoriaHTML);
  });
  console.log("Categorias carregadas com sucesso!");
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  carregarCategorias();
});
