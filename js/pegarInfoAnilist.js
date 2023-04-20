var animes = [];
const ano = document.getElementById("ano").value;
var temporada = document.getElementById("temporada").value;


// const criaAnime = (imgGrande, imgMedia, temporada, ano, ingles, japones) =>
// {
//     return fetch(`http://localhost:3000/profile`,
//         {
//             method: 'POST',
//             headers:
//             {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(
//                 {
//                     imgGrande: imgGrande,
//                     imgMedia: imgMedia,
//                     temporada: temporada,
//                     ano: ano,
//                     ingles: ingles,
//                     japones: japones
//                 })
//         })
//         .then(resposta =>
//         {
//             if (resposta.ok) 
//             {
//                 return resposta.body;
//             }
//             throw new Error('Não foi possível criar um anime')
//         })
// }

// const criaNovaLinha = (id, large, medium, season, SeasonYear, english, romaji) =>
// {
//     const linhaNovoProduto = document.createElement('div');
//     linhaNovoProduto.classList.add('lista__item');
//     const conteudo =
//         `
//         <img src="${large}" class="lista__item--img" id="${id}" data-nomeJ="${romaji}" data-nomeE="${english}"  onmouseenter="teste()" onclick="passarEscolha()">        
//         <h3 class="lista__item--nome" id="nomeJ">${romaji}</h3>
//         <h3 class="lista__item--nome" id="nomeE">${english}</h3>
//         <a href="" class="lista__item--link">Encerramento</a>


//         // <h3 class="esconder" id="imgM">${medium}</h3>
//         // <h3 class="esconder" id="temporada">${season}</h3>
//         // <h3 class="esconder" id="ano">${SeasonYear}</h3>
//         `
//     // <h3 class="esconder" id="pegar${id}" nId="${id}" imgL="${large}" NomeE="${english}" nomeJ="${romaji}"></h3>

//     linhaNovoProduto.innerHTML = conteudo;
//     linhaNovoProduto.dataset.id = id;

//     return linhaNovoProduto;
// };

var query =
    `   
    query ($pagina: Int, $porPagina: Int, $ano: Int, $temporada: MediaSeason) 
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
            media (seasonYear: $ano, season: $temporada, type: ANIME, isAdult: false, sort: TITLE_ROMAJI) 
            { 
                id
                averageScore
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















function pegarInfo()
{
    for (let index = 1; index <= 3; index++) 
    {
        // Define our query variables and values that will be used in the query request
        var variables = {
            busca: "",
            ano: ano,
            temporada: temporada,
            pagina: index,
            porPagina: 50
        };

        // Define the config we'll need for our Api request
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

        // Make the HTTP Api request
        fetch(url, options).then(handleResponse)
            .then(handleData)
            .catch(handleError);

        function handleResponse(response)
        {
            return response.json().then(function (json)
            {
                return response.ok ? json : Promise.reject(json);
            });
        }
        function handleData(data)
        {
            let recebidos = data.data.Page.media;
            let filtrado = recebidos.filter(item => item.averageScore != null);
            animes.push(filtrado);
        }

        function handleError(error)
        {
            console.error(error);
        }

        // return
    }
    console.log(animes);
}

function mostrar()
{
    var a;
    var b = [];
    temporada = temporada.toLowerCase();
    fetch(`http://127.0.0.1:5500/${temporada}${ano}.json`)
    // http://localhost:3000/votos2021Winter/${idCat}`
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            a = data;

            for (let i = 0; i < a.length; i++)
            {
                const item = a[i];
                item.opening = { edges: [] };
                item.ending = { edges: [] };
                b.push(item);
            }

            b.sort((a, b) => (a.title.romaji > b.title.romaji) ? 1 : -1);

            console.log(b);

        })

}



















function busca2()
{
    // Define our query variables and values that will be used in the query request
    var variables = {
        busca: "",
        ano: ano,
        temporada: temporada,
        pagina: 2,
        porPagina: 50
    };

    // Define the config we'll need for our Api request
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

    var pagina = true;

    // Make the HTTP Api request 
    fetch(url, options).then(handleResponse)
        .then(handleData)
        .catch(handleError);

    function handleResponse(response)
    {
        return response.json().then(function (json)
        {
            return response.ok ? json : Promise.reject(json);
        });
    }
    function handleData(data)
    {
        ;
        let recebidos = data.data.Page.media;
        let filtrado = recebidos.filter(item => item.averageScore != null);
        console.log(filtrado);;

        pagina = data.data.Page.pageInfo.hasNextPage;
        numPag = data.data.Page.pageInfo.currentPage;

        // filtrado.forEach(elemento => 
        // {
        //     tabela.appendChild(criaNovaLinha(elemento.id, elemento.coverImage.large, elemento.coverImage.medium, elemento.season,
        //         elemento.SeasonYear, elemento.title.english, elemento.title.romaji));
        // });
    }

    function handleError(error)
    {
        console.error(error);
    }

}


function busca3()
{
    // Define our query variables and values that will be used in the query request
    var variables = {
        busca: "",
        ano: ano,
        temporada: temporada,
        pagina: 3,
        porPagina: 50
    };

    // Define the config we'll need for our Api request
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

    var pagina = true;

    // Make the HTTP Api request
    fetch(url, options).then(handleResponse)
        .then(handleData)
        .catch(handleError);

    function handleResponse(response)
    {
        return response.json().then(function (json)
        {
            return response.ok ? json : Promise.reject(json);
        });
    }
    function handleData(data)
    {
        ;
        let recebidos = data.data.Page.media;
        let filtrado = recebidos.filter(item => item.averageScore != null);
        console.log(filtrado);

        pagina = data.data.Page.pageInfo.hasNextPage;
        numPag = data.data.Page.pageInfo.currentPage;

        // filtrado.forEach(elemento => 
        // {
        //     tabela.appendChild(criaNovaLinha(elemento.id, elemento.coverImage.large, elemento.coverImage.medium, elemento.season,
        //         elemento.SeasonYear, elemento.title.english, elemento.title.romaji));
        // });
    }

    function handleError(error)
    {
        console.error(error);
    }

}

// busca1();
// busca2();
// busca3();

function pegaTudo()
{
    try 
    {
        const imgGrande = document.getElementById("imgL").src;
        const imgMedia = document.getElementById("imgM").innerHTML;
        const temporada = document.getElementById("temporada").innerHTML;
        const ano = document.getElementById("ano").innerHTML;
        const ingles = document.getElementById("nomeE").innerHTML;
        const japones = document.getElementById("nomeJ").innerHTML;
        criaAnime(imgGrande, imgMedia, temporada, ano, ingles, japones);
    }
    catch (erro) 
    {
        console.log(erro);
        // window.location.href = '../telas/erro.html' 
    }
}


function mostrarVideo()
{
    document.getElementById("video").classList.remove("esconder");
}





// // Get the modal
// var modal = document.getElementById("listaModal");

// // Get the button that opens the modal
// var chamar = document.getElementById("imgLeandro1");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// chamar.onclick = function ()
// {
//     modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function ()
// {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event)
// {
//     if (event.target == modal)
//     {
//         modal.style.display = "none";
//     }
// }

// function passarEscolha()
// {
//     document.addEventListener('click', function (e)
//     {
//         e = e || window.event;
//         var target = e.target || e.srcElement,
//             anime = target || target.nid;

//         var escolhido = document.getElementById(anime.id);

//         console.log("2 " + votoEscolhido);
//         // votoEscolhido.src = escolhido.src;
//         document.getElementById(votoEscolhido).src = escolhido.src;
//         // document.getElementById("nomeJaponesLeandro1").innerHTML = escolhido.getAttribute("data-nomeJ");
//         // document.getElementById("nomeInglesLeandro1").innerHTML = escolhido.getAttribute("data-nomeE");
//     }, false);
//     modal.style.display = "none";
// }

// const votos = document.querySelectorAll('img')
// var votoEscolhido1;
// var votoEscolhido;

// function escolherVoto()
// {
//     document.addEventListener('click', function (e)
// {
//     e = e || window.event;
//     var target = e.target || e.srcElement,
//         votoSelecionado = target || target.nid;
//         console.log("baixo " + votoSelecionado.id)
//         votoEscolhido1 = votoSelecionado.id;
// }, false);
// modal.style.display = "block";
// }

// function teste()
// {
//     votoEscolhido = votoEscolhido1
//     console.log("foi");
// }