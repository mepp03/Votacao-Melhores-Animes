function mostrarVotos()
{
    var nome = "leandro";
    fetch("https://mepp03.github.io/Votacao-Melhores-Animes/votos2021Winter.json")
        .then(response => response.json())
        .then(data =>
        {
            data = data.votos2021Winter;
            console.log(data[0].abertura[nome].primeiro.nomeJ);

            data[0].abertura[nome].primeiro = Object.assign(data[0].abertura[nome].primeiro,
                {
                    id: "114194",
                    nomeJ: "nomeJVoto",
                    nomeE: "nomeEVoto",
                    imagem: "imagemVoto",
                    extra: "extraVoto",
                    ponto: "pontuacao"
                });
                console.log(data[0].abertura[nome].primeiro.nomeJ);

                fetch("https://mepp03.github.io/Votacao-Melhores-Animes/votos2021Winter.json",
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data =>
                {
                    console.log('Dados salvos com sucesso:', data);
                })
                .catch(error =>
                {
                    console.error('Erro ao salvar dados:', error);
                });
        });
}

// fetch(`http://localhost:3000/votos2021Winter/${idCat}`)
//     .then(response => response.json())
//     .then(data =>
//     {
//         dados = data;

//         switch (posicao) 
//         {
//             case "1":
//                 ordinal = "primeiro";
//                 pontuacao = "3";
//                 break;
//             case "2":
//                 ordinal = "segundo";
//                 pontuacao = "2";
//                 break;
//             case "3":
//                 ordinal = "terceiro";
//                 pontuacao = "1";
//                 break;
//         }

//         dados[tipo].leandro[ordinal] = Object.assign(dados[tipo].leandro[ordinal],
//             {
//                 id: idVoto,
//                 nomeJ: nomeJVoto,
//                 nomeE: nomeEVoto,
//                 imagem: imagemVoto,
//                 extra: extraVoto,
//                 ponto: pontuacao
//             });

//         fetch(`http://localhost:3000/votos2021Winter/${idCat}`,
//             {
//                 method: 'PUT',
//                 body: JSON.stringify(dados),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then(response => response.json())
//             .then(dados =>
//             {
//                 console.log('Dados salvos com sucesso:', dados);
//             })
//             .catch(error =>
//             {
//                 console.error('Erro ao salvar dados:', error);
//             });
//     });
