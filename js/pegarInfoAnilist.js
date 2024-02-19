var animes = [];
var ano;
var estacao;

var query =
    `   
    query ($pagina: Int, $porPagina: Int, $ano: Int, $estacao: MediaSeason) 
    {
        Page (page: $pagina, perPage: $porPagina) 
        {
            pageInfo 
            {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media (seasonYear: $ano, season: $estacao, type: ANIME, isAdult: false, sort: TITLE_ROMAJI) 
            { 
                id
                averageScore
                episodes
                title 
                {
                    romaji
                    english
                }
                seasonYear
                season
                coverImage
                {
                    large
                    medium
                }    characters 
                {
                edges 
                { # Array of character edges
                    node 
                    { # Character node
                        name 
                        {
                            full
                        }
                        image 
                        {
                            large
                        }
                        gender
                    }
                }
            }
        }
    }}
`;

async function pegarInfo()
{
    animes = [];
    ano = document.getElementById("ano").value;
    estacao = document.getElementById("temporada").value;

    try
    {
        for (let index = 1; index <= 3; index++)
        {
            var variables = {
                busca: "",
                ano: ano,
                estacao: estacao,
                pagina: index,
                porPagina: 50
            };

            var url = 'https://graphql.anilist.co',
                options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        query: query,
                        variables: variables
                    })
                };

            const response = await fetch(url, options);
            const data = await response.json();
            const filtrado = data.data.Page.media.filter(item => item.averageScore != null);
            filtrado.forEach(anime =>
            {
                anime.opening = {
                    edges: []
                };
                anime.ending = {
                    edges: []
                };
            });
            animes.push(...filtrado);
        }

        console.log(animes);
        salvarArquivoJSON(ano, estacao);
    } catch (error)
    {
        console.error(error);
    }
}

async function salvarArquivoJSON(ano, estacao)
{
    try
    {
        const estacaoTraduzida = {
            'winter': 'Inverno',
            'spring': 'Primavera',
            'summer': 'Verão',
            'fall': 'Outono'
        }[estacao.toLowerCase()];

        if (!estacaoTraduzida)
        {
            console.error('Estação inválida:', estacao);
            return;
        }

        // Transforma o objeto JavaScript em uma string JSON
        let jsonString = JSON.stringify(animes, null, 2);

        // Substitui os valores null por strings vazias na string JSON
        jsonString = jsonString.replace(/: null/g, ': ""');

        const nomeArquivo = `${ano}${estacaoTraduzida}.json`;

        // Cria um objeto Blob com a string JSON modificada
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Cria um link temporário para download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = nomeArquivo;

        // Adiciona o link ao documento e simula um clique
        document.body.appendChild(link);
        link.click();

        // Remove o link do documento
        document.body.removeChild(link);

        console.log(`Arquivo ${nomeArquivo} salvo com sucesso!`);
    } catch (error)
    {
        console.error('Erro ao salvar o arquivo:', error);
    }
}










// function mostrar()
// {    
//     ano = document.getElementById("ano").value;
//     estacao = document.getElementById("temporada").value;
//     var a;
//     var b = [];
//     estacao = estacao.toLowerCase();
//     fetch(`http://127.0.0.1:5500/dados/${estacao}${ano}.json`)
//     // http://localhost:3000/votos2021Winter/${idCat}`
//         .then(function (response)
//         {
//             return response.json();
//         })
//         .then(function (data)
//         {
//             a = data;

//             for (let i = 0; i < a.length; i++)
//             {
//                 const item = a[i];
//                 item.opening = { edges: [] };
//                 item.ending = { edges: [] };
//                 b.push(item);
//             }

//             b.sort((a, b) => (a.title.romaji > b.title.romaji) ? 1 : -1);

//         })

// }


function mostrar()
{
    ano = document.getElementById("ano").value;
    estacao = document.getElementById("temporada").value;
    switch (estacao)
    {
        case "WINTER":
            estacao = "Inverno";
            break;
        case "SPRING":
            estacao = "Primavera";
            break;
        case "SUMMER":
            estacao = "Verao";
            break;
        case "FALL":
            estacao = "Outono";
            break;
    }
    var a;
    var b = [];
    fetch(`http://127.0.0.1:5500/dados/${ano}${estacao}.json`)
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            console.log(data);
            a = data;

            for (let i = 0; i < a.length; i++)
            {
                const item = a[i];
                item.opening = { edges: [] };
                item.ending = { edges: [] };
                b.push(item);
            }

            b.sort((a, b) => (a.title.romaji > b.title.romaji) ? 1 : -1);


            // Converte a nova array em um objeto JSON
            var json = JSON.stringify(b);
            json = json.replace(/'/g, "");
            // console.log(json);

            // Envia uma solicitação POST para o servidor com o objeto JSON no corpo da solicitação
            fetch(`http://127.0.0.1:5500/dados/${ano}${estacao}.json`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                .then(response => response.json())
                .then(dados =>
                {
                    console.log('Dados salvos com sucesso:', dados);
                })
                .catch(error =>
                {
                    console.error('Erro ao salvar dados:', error);
                });
        });
}