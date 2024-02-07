const nome = ["leandro", "lucas", "thiago", "nil", "vencedor"]


function mostrarVotos()
{
    fetch("http://127.0.0.1:5500/votos2021Winter.json")
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            // console.log(data);
            data = data.votos2021Winter;

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

            // console.log(par);

            function adicionarVotos(categoria, cat)
            {
                var top3;
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

                function calcular(voto)
                {
                    const result = {};
                    for (const { nomeJ, ponto, extra, id, imagem, imagem2, nomeE } of voto)
                    {
                        if (result[nomeJ])
                        {
                            result[nomeJ].ponto += parseInt(ponto);
                        } else
                        {
                            result[nomeJ] = { nomeJ, ponto: parseInt(ponto), extra, id, imagem, imagem2, nomeE };
                        }
                    }
                    top3 = Object.values(result).sort((a, b) => b.ponto - a.ponto).slice(0, 3);
                }
                calcular(votos);


                var idCat;

                switch (cat) 
                {
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
                        break
                }
                // fetch(`http://localhost:3000/votos2021Winter/${idCat}`)
                // .then(response => response.json())
                // .then(data =>
                // {
                //     console.log(data[cat].vencedor.primeiro);
                //     data[cat].vencedor.primeiro = Object.assign(data[cat].vencedor.primeiro, top3[0]);
                //     data[cat].vencedor.segundo = Object.assign(data[cat].vencedor.segundo, top3[1]);
                //     data[cat].vencedor.terceiro = Object.assign(data[cat].vencedor.terceiro, top3[2]);
                // })

                fetch(`http://localhost:3000/votos2021Winter/${idCat}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                            vencedor: {
                                primeiro: top3[0],
                                segundo: top3[1],
                                terceiro: top3[2]
                            }
                    })
                })
                    .then(response => response.json())
                    .then(data =>
                    {
                        console.log('Success:', data);
                    })
                    .catch((error) =>
                    {
                        console.error('Error:', error);
                    });











                // fetch(`http://localhost:3000/votos2021Winter/${idCat}`,
                // {
                //   method: 'PUT',
                //   body: JSON.stringify(data),
                //   headers: {
                //     'Content-Type': 'application/json'
                //   }
                // })
                // .then(response => response.json())
                // .then(data =>
                // {
                //   console.log('Dados salvos com sucesso:', data);
                // })
                // .catch(error =>
                // {
                //   console.error('Erro ao salvar dados:', error);
                // });

            }



            adicionarVotos(abertura, "abertura");
            adicionarVotos(encerramento, "encerramento");
            adicionarVotos(feminino, "feminino");
            adicionarVotos(masculino, "masculino");
            adicionarVotos(surpresa, "surpresa");
            adicionarVotos(decepcao, "decepcao");
            adicionarVotos(animacao, "animacao");
            adicionarVotos(antagonista, "antagonista");
            adicionarVotos(par, "par1");
            adicionarVotos(doente, "doente");
            adicionarVotos(emocao, "emocao");
            adicionarVotos(anime, "anime");



















            //como era antes da ia melhorar
            // {
            //     for (let i = 0; i < 4; i++) 
            //     {
            //         var extra1 = abertura[i].primeiro.extra;
            //         var id1 = abertura[i].primeiro.id;
            //         var imagem1 = abertura[i].primeiro.imagem;
            //         var nomeE1 = abertura[i].primeiro.nomeE;
            //         var nomeJ1 = abertura[i].primeiro.nomeJ;
            //         var ponto1 = abertura[i].primeiro.ponto;

            //         var extra2 = abertura[i].segundo.extra;
            //         var id2 = abertura[i].segundo.id;
            //         var imagem2 = abertura[i].segundo.imagem;
            //         var nomeE2 = abertura[i].segundo.nomeE;
            //         var nomeJ2 = abertura[i].segundo.nomeJ;
            //         var ponto2 = abertura[i].segundo.ponto;

            //         var extra3 = abertura[i].terceiro.extra;
            //         var id3 = abertura[i].terceiro.id;
            //         var imagem3 = abertura[i].terceiro.imagem;
            //         var nomeE3 = abertura[i].terceiro.nomeE;
            //         var nomeJ3 = abertura[i].terceiro.nomeJ;
            //         var ponto3 = abertura[i].terceiro.ponto;

            //         if (id1 != "") 
            //         {
            //             VotoOp.push({ extra: extra1, id: id1, imagem: imagem1, nomeE: nomeE1, nomeJ: nomeJ1, ponto: ponto1 })
            //         }

            //         if (id2 != "") 
            //         {
            //             VotoOp.push({ extra: extra2, id: id2, imagem: imagem2, nomeE: nomeE2, nomeJ: nomeJ2, ponto: ponto2 })
            //         }

            //         if (id3 != "") 
            //         {
            //             VotoOp.push({ extra: extra3, id: id3, imagem: imagem3, nomeE: nomeE3, nomeJ: nomeJ3, ponto: ponto3 })
            //         }
            //     }


            //     for (let i = 0; i < 4; i++) 
            //     {
            //         var extra1 = par[i].primeiro.extra;
            //         var id1 = par[i].primeiro.id;
            //         var imagem1 = par[i].primeiro.imagem;
            //         var imagem21 = par[i].primeiro.imagem2;
            //         var nomeE1 = par[i].primeiro.nomeE;
            //         var nomeJ1 = par[i].primeiro.nomeJ;
            //         var ponto1 = par[i].primeiro.ponto;

            //         var extra2 = par[i].segundo.extra;
            //         var id2 = par[i].segundo.id;
            //         var imagem2 = par[i].segundo.imagem;
            //         var imagem22 = par[i].primeiro.imagem2;
            //         var nomeE2 = par[i].segundo.nomeE;
            //         var nomeJ2 = par[i].segundo.nomeJ;
            //         var ponto2 = par[i].segundo.ponto;

            //         var extra3 = par[i].terceiro.extra;
            //         var id3 = par[i].terceiro.id;
            //         var imagem3 = par[i].terceiro.imagem;
            //         var imagem23 = par[i].primeiro.imagem2;
            //         var nomeE3 = par[i].terceiro.nomeE;
            //         var nomeJ3 = par[i].terceiro.nomeJ;
            //         var ponto3 = par[i].terceiro.ponto;

            //         if (id1 != "") 
            //         {
            //             VotoOp.push({ extra: extra1, id: id1, imagem: imagem1, imagem2: imagem21, nomeE: nomeE1, nomeJ: nomeJ1, ponto: ponto1 })
            //         }

            //         if (id2 != "") 
            //         {
            //             VotoOp.push({ extra: extra1, id: id1, imagem: imagem1, imagem2: imagem22, nomeE: nomeE1, nomeJ: nomeJ1, ponto: ponto1 })
            //         }

            //         if (id3 != "") 
            //         {
            //             VotoOp.push({ extra: extra1, id: id1, imagem: imagem1, imagem2: imagem23, nomeE: nomeE1, nomeJ: nomeJ1, ponto: ponto1 })
            //         }
            //     }
            // }


            // imagemLeandro.innerHTML 

            // for(let i = 0; i < abertura.length-1; i++)
            // {
            //     votos1.push(abertura[i].primeiro.id);
            //     // votos2.push(abertura[i].segundo);
            //     // votos3.push(abertura[i].terceiro);
            //     // console.log(nome[i]);
            //     // console.log(votos1);
            //     console.log(abertura[i].primeiro.nomeJ);

            //     var nome = abertura[i].primeiro.nomeJ;

            //     nomeJLeandro.innerHTML = nome;
            // }

            // abertura.forEach(elemento => 
            // {
            //     console.log(elemento.primeiro);
            //     votos1.push(elemento.primeiro);

            // console.log(elemento.opening.edges.length);
            // console.log(elemento.ending.edges.length);

            // console.log(quantidade);

            // console.log(elemento.opening.edges[0].node);
            // tabela.appendChild(criaCardAnime(elemento.id, elemento.coverImage.large, elemento.coverImage.medium, elemento.season,
            //     elemento.SeasonYear, elemento.title.english, elemento.title.romaji, 
            //     elemento.opening.edges.node.op.name, elemento.opening.edges.node.op.video));

            // tabela.appendChild(criaCardAnime(elemento.id, elemento.coverImage.large, elemento.coverImage.medium, elemento.season,
            //     elemento.SeasonYear, elemento.title.english, elemento.title.romaji));


            // });
        })


}