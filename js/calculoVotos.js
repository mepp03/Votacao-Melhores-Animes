// const endereco4 = "http://localhost:3000/";
const endereco4 = "https://dados-animes.glitch.me/";
var idCat;
var catId;
var dados = [];

function votar()
{
    const temporada = localStorage.getItem('temporada');
    // fetch(`https://dados-animes.glitch.me/${temporada}`)
    fetch(`${endereco4}${temporada}`)
        .then(response => response.json())
        .then(info =>
        {
            const data = info.votos;
            dados = info.dados;

            const abertura = Object.values(data[0].abertura);
            const encerramento = Object.values(data[1].encerramento);
            const feminino = Object.values(data[2].feminino);
            const masculino = Object.values(data[3].masculino);
            const surpresa = Object.values(data[4].surpresa);
            const decepcao = Object.values(data[5].decepcao);
            const animacao = Object.values(data[6].animacao);
            const antagonista = Object.values(data[7].antagonista);
            const par = Object.values(data[8].par);
            const doente = Object.values(data[9].doente);
            const emocao = Object.values(data[10].emocao);
            const anime = Object.values(data[11].anime);

            function adicionarVotos(categoria, cat)
            {
                var votos = [];
                for (let i = 0; i < 4; i++)
                {
                    const { primeiro, segundo, terceiro } = categoria[i];
                    const votosCategoria = [
                        {
                            nomeJ: primeiro.nomeJ, ponto: primeiro.ponto, extra: primeiro.extra, id: primeiro.id, imagem: primeiro.imagem,
                            imagem2: primeiro.imagem2, nomeE: primeiro.nomeE
                        },
                        {
                            nomeJ: segundo.nomeJ, ponto: segundo.ponto, extra: segundo.extra, id: segundo.id, imagem: segundo.imagem,
                            imagem2: segundo.imagem2, nomeE: segundo.nomeE
                        },
                        {
                            nomeJ: terceiro.nomeJ, ponto: terceiro.ponto, extra: terceiro.extra, id: terceiro.id, imagem: terceiro.imagem,
                            imagem2: terceiro.imagem2, nomeE: terceiro.nomeE
                        },
                    ];
                    votosCategoria.forEach((voto) =>
                    {
                        if (voto.nomeJ !== "")
                        {
                            votos.push(voto);
                        }
                    });
                }

                // Verifica se há votos para preencher a estrutura do vencedor
                if (votos.length === 0)
                {
                    return Promise.resolve(); // Retorna uma promessa resolvida para pular para a próxima categoria
                }

                const top3 = calcular(votos);

                function calcular(votos) {
                    let resultados = {};
                
                    votos.forEach(voto => {
                        if (resultados[voto.id]) {
                            resultados[voto.id].ponto += voto.ponto;
                            if (!resultados[voto.id].extras.includes(voto.extra)) {
                                resultados[voto.id].extras.push(voto.extra);
                            }
                            resultados[voto.id].imagens.push(voto.imagem);
                            if (voto.imagem2 && resultados[voto.id].imagem2) {
                                resultados[voto.id].imagem2.push(voto.imagem2);
                            }
                        } else {
                            resultados[voto.id] = { 
                                ...voto, 
                                ponto: voto.ponto, 
                                imagens: [voto.imagem], 
                                extras: [voto.extra], // Inicializa extras como array
                                imagem2: voto.imagem2 ? [voto.imagem2] : [] // Inicializa imagem2 como array vazio se não presente
                            };
                        }
                    });
                
                    // Conversão e limpeza final
                    Object.keys(resultados).forEach(id => {
                        resultados[id].imagem = resultados[id].imagens.join('***');
                        resultados[id].extra = resultados[id].extras.join('\n');
                        delete resultados[id].imagens;
                        delete resultados[id].extras;
                        if (resultados[id].imagem2 && resultados[id].imagem2.length) {
                            resultados[id].imagem2 = resultados[id].imagem2.join('***');
                        } else {
                            delete resultados[id].imagem2;
                        }
                    });
                
    // Ordenação e tratamento de empates
    let ordenadosPorPontos = Object.values(resultados).sort((a, b) => b.ponto - a.ponto);

    let resultadoFinal = [];
    for (let i = 0; i < Math.min(3, ordenadosPorPontos.length); i++) {
        resultadoFinal.push(ordenadosPorPontos[i]);
    }

    return resultadoFinal;
                }

                switch (cat)
                {
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
                    case "par":
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
                        console.log("deu ruim");
                        idCat = "09";
                        break
                }

info.votos[catId][cat].vencedor = {
    primeiro: top3.length > 0 ? top3[0] : {},
    segundo: top3.length > 1 ? top3[1] : {},
    terceiro: top3.length > 2 ? top3[2] : {}
};

                // Retorna a promessa do fetch
                // return fetch(`https://dados-animes.glitch.me/${temporada}`, {
                    return fetch(`${endereco4}${temporada}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ votos: info.votos, dados: dados }),
                });
            }

            // Chama a função adicionarVotos para cada categoria
            Promise.all([
                adicionarVotos(abertura, "abertura"),
                adicionarVotos(encerramento, "encerramento"),
                adicionarVotos(feminino, "feminino"),
                adicionarVotos(masculino, "masculino"),
                adicionarVotos(surpresa, "surpresa"),
                adicionarVotos(decepcao, "decepcao"),
                adicionarVotos(animacao, "animacao"),
                adicionarVotos(antagonista, "antagonista"),
                adicionarVotos(par, "par"),
                adicionarVotos(doente, "doente"),
                adicionarVotos(emocao, "emocao"),
                adicionarVotos(anime, "anime"),
            ])
                .then(() =>
                {
                    console.log('Todos os dados foram salvos com sucesso.', info.votos);
                })
                .catch(error =>
                {
                    console.error('Erro ao salvar os dados:', error);
                });
        })
        .catch(error =>
        {
            console.error('Erro ao buscar os dados:', error);
        });
}