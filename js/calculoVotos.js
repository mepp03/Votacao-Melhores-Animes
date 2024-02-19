const nome = ["leandro", "lucas", "thiago", "nil", "vencedor"];
var idCat;
var catId;

function votar() {
    const temporada = localStorage.getItem('temporada');
    fetch(`http://127.0.0.1:5500/dados/votos/votos${temporada}.json`)
        .then(response => response.json())
        .then(info => {
            const data = info.votos;
            console.log(info);

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

            function adicionarVotos(categoria, cat) {
                var votos = [];
                for (let i = 0; i < 4; i++) {
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
                    votosCategoria.forEach((voto) => {
                        if (voto.nomeJ !== "") {
                            votos.push(voto);
                        }
                    });
                }

                // Verifica se há votos para preencher a estrutura do vencedor
                if (votos.length === 0) {
                    console.log(`Categoria ${cat} não possui votos.`);
                    return Promise.resolve(); // Retorna uma promessa resolvida para pular para a próxima categoria
                }

                const top3 = calcular(votos);

                function calcular(voto) {
                    const result = {};
                    for (const { nomeJ, ponto, extra, id, imagem, imagem2, nomeE } of voto) {
                        if (result[nomeJ]) {
                            result[nomeJ].ponto += parseInt(ponto);
                        } else {
                            result[nomeJ] = { nomeJ, ponto: parseInt(ponto), extra, id, imagem, imagem2, nomeE };
                        }
                    }
                    return Object.values(result).sort((a, b) => b.ponto - a.ponto).slice(0, 3);
                }

                switch (cat) {
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
                    primeiro: top3[0],
                    segundo: top3[1],
                    terceiro: top3[2]
                };

                // Retorna a promessa do fetch
                return fetch(`http://localhost:3000/votos/${idCat}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(info.votos[catId]),
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
            .then(() => {
                console.log('Todos os dados foram salvos com sucesso.');
            })
            .catch(error => {
                console.error('Erro ao salvar os dados:', error);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os dados:', error);
        });
}
