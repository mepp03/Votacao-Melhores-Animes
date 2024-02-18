var cat;
function votar() {
    temporada = localStorage.getItem('temporada');
    fetch(`http://127.0.0.1:5500/dados/votos/votos${temporada}.json`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            data = data.votos;

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

            function adicionarVotos(categoria, tipo) {
                cat = tipo;
                var top3 = [];
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
                            top3.push(voto);
                        }
                    });
                }

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

                return calcular(top3);
            }

            // Adicionando votos ao objeto data antes de enviar para o segundo patch
            data[0].abertura.vencedor = adicionarVotos(abertura, "abertura");
            data[1].encerramento.vencedor = adicionarVotos(encerramento, "encerramento");
            data[2].feminino.vencedor = adicionarVotos(feminino, "feminino");
            data[3].masculino.vencedor = adicionarVotos(masculino, "masculino");
            data[4].surpresa.vencedor = adicionarVotos(surpresa, "surpresa");
            data[5].decepcao.vencedor = adicionarVotos(decepcao, "decepcao");
            data[6].animacao.vencedor = adicionarVotos(animacao, "animacao");
            data[7].antagonista.vencedor = adicionarVotos(antagonista, "antagonista");
            data[8].par.vencedor = adicionarVotos(par, "par1");
            data[9].doente.vencedor = adicionarVotos(doente, "doente");
            data[10].emocao.vencedor = adicionarVotos(emocao, "emocao");
            data[11].anime.vencedor = adicionarVotos(anime, "anime");
            console.log(data);

            // Definindo idCat antes de usar na segunda fetch
            var idCat;

            switch (cat) {
                case "abertura":
                    idCat = "01";
                    break;
                case "encerramento":
                    idCat = "02";
                    break;
                case "feminino":
                    idCat = "03";
                    break;
                case "masculino":
                    idCat = "04";
                    break;
                case "surpresa":
                    idCat = "05";
                    break;
                case "decepcao":
                    idCat = "06";
                    break;
                case "animacao":
                    idCat = "07";
                    break;
                case "antagonista":
                    idCat = "08";
                    break;
                case "par1":
                    idCat = "09";
                    break;
                case "doente":
                    idCat = "10";
                    break;
                case "emocao":
                    idCat = "11";
                    break;
                case "anime":
                    idCat = "12";
                    break;
                default:
                    console.log("deu ruim");
                    idCat = "09";
                    break;
            }
            
            // Segunda fetch
            fetch(`http://localhost:3000/votos.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Envie os dados atualizados
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
}
