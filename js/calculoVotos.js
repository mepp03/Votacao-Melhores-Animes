var idCat;
var catId;
var dados = [];

function votar() {
  const temporada = localStorage.getItem("temporada");

  fetch(`${endereco}votos${temporada}`)
    .then((response) => response.json())
    .then((info) => {
      // 🔧 Faz uma cópia limpa dos dados (evita somar sobre resultados anteriores)
      const data = JSON.parse(JSON.stringify(info.votos));
      dados = info.dados;

      // 🔄 Zera todos os vencedores antes de recalcular
      data.forEach((cat) => {
        Object.keys(cat).forEach((key) => {
          cat[key].vencedor = { primeiro: {}, segundo: {}, terceiro: {} };
        });
      });

      const categorias = [
        { data: Object.values(data[0].abertura), nome: "abertura" },
        { data: Object.values(data[1].encerramento), nome: "encerramento" },
        { data: Object.values(data[2].feminino), nome: "feminino" },
        { data: Object.values(data[3].masculino), nome: "masculino" },
        { data: Object.values(data[4].surpresa), nome: "surpresa" },
        { data: Object.values(data[5].decepcao), nome: "decepcao" },
        { data: Object.values(data[6].animacao), nome: "animacao" },
        { data: Object.values(data[7].antagonista), nome: "antagonista" },
        { data: Object.values(data[8].par), nome: "par" },
        { data: Object.values(data[9].doente), nome: "doente" },
        { data: Object.values(data[10].emocao), nome: "emocao" },
        { data: Object.values(data[11].anime), nome: "anime" },
      ];

      function adicionarVotos(categoriaArray, cat) {
        return new Promise((resolve) => {
          var votos = [];

          if (!categoriaArray || categoriaArray.length === 0) {
            console.log(`Categoria ${cat} vazia, pulando...`);
            resolve();
            return;
          }

          for (let i = 0; i < categoriaArray.length; i++) {
            const categoria = categoriaArray[i];
            if (!categoria) continue;

            const { primeiro, segundo, terceiro } = categoria;

            // Atribuir pontos fixos baseados na posição
            if (primeiro && primeiro.nomeJ && primeiro.nomeJ !== "") {
              votos.push({
                nomeJ: primeiro.nomeJ,
                ponto: 3,
                extra: primeiro.extra || "",
                id: primeiro.id || "",
                imagem: primeiro.imagem || "",
                imagem2: primeiro.imagem2 || "",
                nomeE: primeiro.nomeE || "",
              });
            }

            if (segundo && segundo.nomeJ && segundo.nomeJ !== "") {
              votos.push({
                nomeJ: segundo.nomeJ,
                ponto: 2,
                extra: segundo.extra || "",
                id: segundo.id || "",
                imagem: segundo.imagem || "",
                imagem2: segundo.imagem2 || "",
                nomeE: segundo.nomeE || "",
              });
            }

            if (terceiro && terceiro.nomeJ && terceiro.nomeJ !== "") {
              votos.push({
                nomeJ: terceiro.nomeJ,
                ponto: 1,
                extra: terceiro.extra || "",
                id: terceiro.id || "",
                imagem: terceiro.imagem || "",
                imagem2: terceiro.imagem2 || "",
                nomeE: terceiro.nomeE || "",
              });
            }
          }

          if (votos.length === 0) {
            console.log(`Nenhum voto válido na categoria ${cat}`);
            resolve();
            return;
          }

          const top3 = calcular(votos, cat);

          function calcular(votos, categoriaNome) {
            let resultados = {};

            votos.forEach((voto) => {
              // CORREÇÃO: Criar ID único inteligente baseado no tipo de categoria
              let idUnico;

              if (
                categoriaNome === "feminino" ||
                categoriaNome === "masculino" ||
                categoriaNome === "antagonista"
              ) {
                // Para personagens: usar imagem (cada personagem tem imagem única)
                idUnico = voto.imagem;
              } else if (
                categoriaNome === "abertura" ||
                categoriaNome === "encerramento"
              ) {
                // Para OP/ED: usar extra (que contém a URL do YouTube) + nomeJ (nome do anime)
                idUnico = (voto.extra || "") + "|" + (voto.nomeJ || "");
              } else if (categoriaNome === "par") {
                // Para pares: ordenar alfabeticamente as imagens para evitar A&B vs B&A
                const imagens = [voto.imagem, voto.imagem2 || ""].sort();
                idUnico = imagens.join("|");
              } else {
                // Para outras categorias: usar ID do anime
                idUnico = voto.id;
              }

              // Pular votos vazios
              if (!idUnico || idUnico.includes("1333.jpg") || idUnico === "|")
                return;

              if (resultados[idUnico]) {
                resultados[idUnico].ponto += voto.ponto;

                if (
                  voto.extra &&
                  !resultados[idUnico].extras.includes(voto.extra)
                ) {
                  resultados[idUnico].extras.push(voto.extra);
                }
                if (
                  voto.imagem &&
                  !resultados[idUnico].imagens.includes(voto.imagem)
                ) {
                  resultados[idUnico].imagens.push(voto.imagem);
                }
                if (
                  voto.imagem2 &&
                  !resultados[idUnico].imagens2.includes(voto.imagem2)
                ) {
                  resultados[idUnico].imagens2.push(voto.imagem2);
                }
              } else {
                resultados[idUnico] = {
                  ...voto,
                  ponto: voto.ponto,
                  imagens: voto.imagem ? [voto.imagem] : [],
                  extras: voto.extra ? [voto.extra] : [],
                  imagens2: voto.imagem2 ? [voto.imagem2] : [],
                };
              }
            });

            // Processamento final dos resultados
            Object.keys(resultados).forEach((idUnico) => {
              if (resultados[idUnico].imagens.length > 0) {
                resultados[idUnico].imagem =
                  resultados[idUnico].imagens.join("***");
              }
              if (resultados[idUnico].extras.length > 0) {
                resultados[idUnico].extra =
                  resultados[idUnico].extras.join("\n");
              }
              if (resultados[idUnico].imagens2.length > 0) {
                resultados[idUnico].imagem2 =
                  resultados[idUnico].imagens2.join("***");
              }
              delete resultados[idUnico].imagens;
              delete resultados[idUnico].extras;
              delete resultados[idUnico].imagens2;

              // Para pares, garantir a ordem correta das imagens após o cálculo
              if (categoriaNome === "par" && resultados[idUnico].imagem2) {
                const imagens = resultados[idUnico].imagem.split("***");
                const imagens2 = resultados[idUnico].imagem2.split("***");

                // Reordenar para manter consistência visual
                if (imagens.length === imagens2.length) {
                  const paresOrdenados = [];
                  for (let i = 0; i < imagens.length; i++) {
                    const par = [imagens[i], imagens2[i]].sort();
                    paresOrdenados.push(par);
                  }
                  resultados[idUnico].imagem = paresOrdenados
                    .map((p) => p[0])
                    .join("***");
                  resultados[idUnico].imagem2 = paresOrdenados
                    .map((p) => p[1])
                    .join("***");
                }
              }

              // Restaurar o ID original para salvar no JSON
              if (
                categoriaNome === "anime" ||
                categoriaNome === "surpresa" ||
                categoriaNome === "decepcao" ||
                categoriaNome === "animacao" ||
                categoriaNome === "doente" ||
                categoriaNome === "emocao"
              ) {
                resultados[idUnico].id = idUnico; // Já é o ID do anime
              } else {
                // Para outras categorias, usar a primeira parte do ID único
                resultados[idUnico].id = idUnico.split("|")[0];
              }
            });

            let ordenadosPorPontos = Object.values(resultados).sort(
              (a, b) => b.ponto - a.ponto
            );

            let resultadoFinal = [];
            let i = 0;

            while (i < ordenadosPorPontos.length && resultadoFinal.length < 3) {
              const itemAtual = ordenadosPorPontos[i];
              const itensEmpatados = [itemAtual];

              let j = i + 1;
              while (
                j < ordenadosPorPontos.length &&
                ordenadosPorPontos[j].ponto === itemAtual.ponto
              ) {
                itensEmpatados.push(ordenadosPorPontos[j]);
                j++;
              }

              if (itensEmpatados.length === 1) {
                resultadoFinal.push(itemAtual);
              } else {
                const itemEmpatado = {
                  id: itensEmpatados.map((item) => item.id).join("&"),
                  nomeJ: itensEmpatados.map((item) => item.nomeJ).join(" & "),
                  nomeE: itensEmpatados.map((item) => item.nomeE).join(" & "),
                  ponto: itemAtual.ponto,
                  extra: itensEmpatados.map((item) => item.extra).join(" & "),
                  imagem: itensEmpatados.map((item) => item.imagem).join("***"),
                  imagem2: itensEmpatados
                    .map((item) => item.imagem2)
                    .filter((img) => img)
                    .join("***"),
                };
                resultadoFinal.push(itemEmpatado);

                console.log(`🔀 EMPATE na categoria ${categoriaNome}:`, {
                  pontos: itemAtual.ponto,
                  itens: itensEmpatados.map((item) => item.nomeJ),
                });
              }

              i = j;
            }

            return resultadoFinal;
          }

          switch (cat) {
            case "abertura":
              catId = "0";
              break;
            case "encerramento":
              catId = "1";
              break;
            case "feminino":
              catId = "2";
              break;
            case "masculino":
              catId = "3";
              break;
            case "surpresa":
              catId = "4";
              break;
            case "decepcao":
              catId = "5";
              break;
            case "animacao":
              catId = "6";
              break;
            case "antagonista":
              catId = "7";
              break;
            case "par":
              catId = "8";
              break;
            case "doente":
              catId = "9";
              break;
            case "emocao":
              catId = "10";
              break;
            case "anime":
              catId = "11";
              break;
            default:
              console.log("Categoria não reconhecida:", cat);
              resolve();
              return;
          }

          // Atualiza os vencedores na cópia limpa
          data[catId][cat].vencedor = {
            primeiro: top3.length > 0 ? top3[0] : {},
            segundo: top3.length > 1 ? top3[1] : {},
            terceiro: top3.length > 2 ? top3[2] : {},
          };

          console.log(`✅ Categoria ${cat} processada:`, {
            primeiro: top3[0]?.nomeJ,
            pontosPrimeiro: top3[0]?.ponto,
            segundo: top3[1]?.nomeJ,
            pontosSegundo: top3[1]?.ponto,
            terceiro: top3[2]?.nomeJ,
            pontosTerceiro: top3[2]?.ponto,
          });

          resolve();
        });
      }

      const promises = categorias.map((cat) =>
        adicionarVotos(cat.data, cat.nome)
      );

      Promise.all(promises)
        .then(() => {
          // 🔥 Salva apenas após todos os cálculos terminarem
          fetch(`${endereco}votos${temporada}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ votos: data, dados }),
          })
            .then(() => {
              console.log("🎉 Todas as categorias foram processadas e salvas!");
            })
            .catch((error) => {
              console.error("❌ Erro ao salvar dados finais:", error);
            });
        })
        .catch((error) => {
          console.error("💥 Erro ao processar categorias:", error);
        });
    })
    .catch((error) => {
      console.error("🚨 Erro ao buscar os dados:", error);
    });
}
