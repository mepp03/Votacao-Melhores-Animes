let count = 0;
let anoBusca = 2021;
const tabela = document.getElementById("lista");
const tabelaExtra = document.getElementById("extra");
var animes;

// Pega as informações dos animes 
const criaAnime = (imgGrande, imgMedia, temporada, ano, ingles, japones) =>
{
    return fetch(`http://localhost:3000/profile`,
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    imgGrande: imgGrande,
                    imgMedia: imgMedia,
                    temporada: temporada,
                    ano: ano,
                    ingles: ingles,
                    japones: japones
                })
        })
        .then(resposta =>
        {
            if (resposta.ok) 
            {
                return resposta.body;
            }
            throw new Error('Não foi possível criar um anime')
        })
}

// Cria os cards dos animes
const criaCardAnime = (id, large, medium, season, SeasonYear, english, romaji) =>
{
    const novoCardAnime = document.createElement('div');
    novoCardAnime.classList.add('lista__item');
    const conteudo =
        `
        <img src="${large}" class="lista__item--img" id="${id}" data-nomeJ="${romaji}" data-nomeE="${english}" onclick="passarEscolha()">        
        <h3 class="lista__item--nome" id="nomeJ">${romaji}</h3>
        <h3 class="lista__item--nome" id="nomeE">${english}</h3>
        <a href="" class="lista__item--link">Encerramento</a>
        `

    novoCardAnime.innerHTML = conteudo;
    novoCardAnime.dataset.id = id;

    return novoCardAnime;
};

// Cria os cards dos personagens
const criaCardExtra = (romaji, english, gender, full, large) =>
{
    var genero = "";
    switch (gender)
    {
        case "Male":
            genero = "Masculino"
            break;

        case "Female":
            genero = "Feminino"
            break;

        default:
            genero = "Anilist não informou :/";
            break;
    }
    const novoCardExtra = document.createElement('div');
    novoCardExtra.classList.add('lista__item');
    const conteudo =
        `
        <h3 class="lista__item--nome" id="nomeJ">${romaji}</h3>
        <h3 class="lista__item--nome" id="nomeE">${english}</h3>
        <img src="${large}" class="lista__item--img" onclick="passarEscolhaExtra()">        
        <h3 class="lista__item--nome" id="nomeFull">${full}</h3>
        <h3 class="lista__item--nome" id="genero">${genero}</h3>
        `

    novoCardExtra.innerHTML = conteudo;

    return novoCardExtra;
}

//busca os animes por ano e temporada
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

function busca1()
{
    var contPagina = 1;

    // Define our query variables and values that will be used in the query request
    var variables = {
        busca: "",
        ano: anoBusca,
        temporada: "WINTER",
        pagina: contPagina,
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
        let recebidos = data.data.Page.media;
        let filtrado = recebidos.filter(item => item.averageScore != null);
        animes = filtrado;
        // console.log(animes);
        // pagina = data.data.Page.pageInfo.hasNextPage;
        // numPag = data.data.Page.pageInfo.currentPage;

        filtrado.forEach(elemento => 
        {
            tabela.appendChild(criaCardAnime(elemento.id, elemento.coverImage.large, elemento.coverImage.medium, elemento.season,
                elemento.SeasonYear, elemento.title.english, elemento.title.romaji));
        });
    }

    function handleError(error)
    {
        console.error(error);
    }

}


function busca2()
{



    var contPagina = 2;

    // Define our query variables and values that will be used in the query request
    var variables = {
        busca: "",
        ano: anoBusca,
        temporada: "WINTER",
        pagina: contPagina,
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
        let recebidos = data.data.Page.media;
        let filtrado = recebidos.filter(item => item.averageScore != null);
        animes = filtrado;
        // console.log(filtrado);

        // pagina = data.data.Page.pageInfo.hasNextPage;
        // numPag = data.data.Page.pageInfo.currentPage;

        filtrado.forEach(elemento => 
        {
            tabela.appendChild(criaCardAnime(elemento.id, elemento.coverImage.large, elemento.coverImage.medium, elemento.season,
                elemento.SeasonYear, elemento.title.english, elemento.title.romaji));
        });
    }

    function handleError(error)
    {
        console.error(error);
    }

}

function busca3()
{



    var contPagina = 3;

    // Define our query variables and values that will be used in the query request
    var variables = {
        busca: "",
        ano: anoBusca,
        temporada: "WINTER",
        pagina: contPagina,
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
        let recebidos = data.data.Page.media;
        let filtrado = recebidos.filter(item => item.averageScore != null);
        animes = filtrado;
        // console.log(filtrado);

        // pagina = data.data.Page.pageInfo.hasNextPage;
        // numPag = data.data.Page.pageInfo.currentPage;

        filtrado.forEach(elemento => 
        {
            tabela.appendChild(criaCardAnime(elemento.id, elemento.coverImage.large, elemento.coverImage.medium, elemento.season,
                elemento.SeasonYear, elemento.title.english, elemento.title.romaji));
        });
    }

    function handleError(error)
    {
        console.error(error);
    }

}


busca1();
busca2();
busca3();

// =======================================escolherVoto.js=================================================

var imagemVoto;
var nomeJVoto;
var nomeEVoto;
var escolherPersonagem = false;

function passarEscolha()
{
    var idAnime;
    document.addEventListener('click', function (e)
    {
        // black magic, não entendo essa parte
        e = e || window.event;
        var target = e.target || e.srcElement,
            anime = target || target.nid;

        var escolhido = document.getElementById(anime.id);

        // checando se o click pega um id que é um número, para não bugar e ficar pegando tudo
        if (!isNaN(anime.id))
        {


            idAnime = anime.id;

            imagemVoto.src = escolhido.src;
            nomeJVoto.innerHTML = escolhido.getAttribute("data-nomeJ");
            nomeEVoto.innerHTML = escolhido.getAttribute("data-nomeE");

            if (escolherPersonagem) 
            {
                document.getElementById("secaoLista").classList.add("esconder");
                document.getElementById("secaoExtra").classList.remove("esconder");


                console.log(idAnime);
                console.log(animes);
                var personagens = animes.filter(item => item.id == idAnime);
                console.log(personagens);
                var animeNomeE = personagens[0].title.english;
                var animeNomeJ = personagens[0].title.romaji;

                personagensFiltrados = personagens[0].characters.edges;
                personagensFiltrados.forEach(elemento => 
                {
                    tabelaExtra.appendChild(criaCardExtra(animeNomeE, animeNomeJ, elemento.node.gender, elemento.node.name.full, elemento.node.image.large));
                });
            }
            else
            {
                modal.style.display = "none";
            }

        }

    }, false);
}


function passarEscolhaExtra()
{
    escolherPersonagem = true;
    modal.style.display = "none";
    document.getElementById("secaoExtra").classList.add("esconder");
    document.getElementById("secaoLista").classList.remove("esconder");
}



{
    function aberturaEscolherVoto1()
    {
        escolherPersonagem = true;
        modal.style.display = "block";
        imagemVoto = document.getElementById("aberturaImg1");
        nomeJVoto = document.getElementById("aberturaNomeJapones1");
        nomeEVoto = document.getElementById("aberturaNomeIngles1");
    }

    function aberturaEscolherVoto2()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("aberturaImg2");
        nomeJVoto = document.getElementById("aberturaNomeJapones2");
        nomeEVoto = document.getElementById("aberturaNomeIngles2");
    }

    function aberturaEscolherVoto3()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("aberturaImg3");
        nomeJVoto = document.getElementById("aberturaNomeJapones3");
        nomeEVoto = document.getElementById("aberturaNomeIngles3");
    }

    function encerramentoEscolherVoto1()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("encerramentoImg1");
        nomeJVoto = document.getElementById("encerramentoNomeJapones1");
        nomeEVoto = document.getElementById("encerramentoNomeIngles1");
    }

    function encerramentoEscolherVoto2()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("encerramentoImg2");
        nomeJVoto = document.getElementById("encerramentoNomeJapones2");
        nomeEVoto = document.getElementById("encerramentoNomeIngles2");
    }

    function encerramentoEscolherVoto3()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("encerramentoImg3");
        nomeJVoto = document.getElementById("encerramentoNomeJapones3");
        nomeEVoto = document.getElementById("encerramentoNomeIngles3");
    }

    function femininoEscolherVoto1()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("femininoImg1");
        nomeJVoto = document.getElementById("femininoNomeJapones1");
        nomeEVoto = document.getElementById("femininoNomeIngles1");
    }

    function femininoEscolherVoto2()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("femininoImg2");
        nomeJVoto = document.getElementById("femininoNomeJapones2");
        nomeEVoto = document.getElementById("femininoNomeIngles2");
    }

    function femininoEscolherVoto3()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("femininoImg3");
        nomeJVoto = document.getElementById("femininoNomeJapones3");
        nomeEVoto = document.getElementById("femininoNomeIngles3");
    }

    function masculinoEscolherVoto1()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("masculinoImg1");
        nomeJVoto = document.getElementById("masculinoNomeJapones1");
        nomeEVoto = document.getElementById("masculinoNomeIngles1");
    }

    function masculinoEscolherVoto2()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("masculinoImg2");
        nomeJVoto = document.getElementById("masculinoNomeJapones2");
        nomeEVoto = document.getElementById("masculinoNomeIngles2");
    }

    function masculinoEscolherVoto3()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("masculinoImg3");
        nomeJVoto = document.getElementById("masculinoNomeJapones3");
        nomeEVoto = document.getElementById("masculinoNomeIngles3");
    }

    function surpresaEscolherVoto1()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("surpresaImg1");
        nomeJVoto = document.getElementById("surpresaNomeJapones1");
        nomeEVoto = document.getElementById("surpresaNomeIngles1");
    }

    function surpresaEscolherVoto2()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("surpresaImg2");
        nomeJVoto = document.getElementById("surpresaNomeJapones2");
        nomeEVoto = document.getElementById("surpresaNomeIngles2");
    }

    function surpresaEscolherVoto3()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("surpresaImg3");
        nomeJVoto = document.getElementById("surpresaNomeJapones3");
        nomeEVoto = document.getElementById("surpresaNomeIngles3");
    }

    function decepcaoEscolherVoto1()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("decepcaoImg1");
        nomeJVoto = document.getElementById("decepcaoNomeJapones1");
        nomeEVoto = document.getElementById("decepcaoNomeIngles1");
    }

    function decepcaoEscolherVoto2()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("decepcaoImg2");
        nomeJVoto = document.getElementById("decepcaoNomeJapones2");
        nomeEVoto = document.getElementById("decepcaoNomeIngles2");
    }

    function decepcaoEscolherVoto3()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("decepcaoImg3");
        nomeJVoto = document.getElementById("decepcaoNomeJapones3");
        nomeEVoto = document.getElementById("decepcaoNomeIngles3");
    }

    function animacaoEscolherVoto1()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("animacaoImg1");
        nomeJVoto = document.getElementById("animacaoNomeJapones1");
        nomeEVoto = document.getElementById("animacaoNomeIngles1");
    }

    function animacaoEscolherVoto2()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("animacaoImg2");
        nomeJVoto = document.getElementById("animacaoNomeJapones2");
        nomeEVoto = document.getElementById("animacaoNomeIngles2");
    }

    function animacaoEscolherVoto3()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("animacaoImg3");
        nomeJVoto = document.getElementById("animacaoNomeJapones3");
        nomeEVoto = document.getElementById("animacaoNomeIngles3");
    }

    function antagonistaEscolherVoto1()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("antagonistaImg1");
        nomeJVoto = document.getElementById("antagonistaNomeJapones1");
        nomeEVoto = document.getElementById("antagonistaNomeIngles1");
    }

    function antagonistaEscolherVoto2()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("antagonistaImg2");
        nomeJVoto = document.getElementById("antagonistaNomeJapones2");
        nomeEVoto = document.getElementById("antagonistaNomeIngles2");
    }

    function antagonistaEscolherVoto3()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("antagonistaImg3");
        nomeJVoto = document.getElementById("antagonistaNomeJapones3");
        nomeEVoto = document.getElementById("antagonistaNomeIngles3");
    }

    function parEscolherVoto1()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("parImg1");
        nomeJVoto = document.getElementById("parNomeJapones1");
        nomeEVoto = document.getElementById("parNomeIngles1");
    }

    function parEscolherVoto2()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("parImg2");
        nomeJVoto = document.getElementById("parNomeJapones2");
        nomeEVoto = document.getElementById("parNomeIngles2");
    }

    function parEscolherVoto3()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("parImg3");
        nomeJVoto = document.getElementById("parNomeJapones3");
        nomeEVoto = document.getElementById("parNomeIngles3");
    }

    function doenteEscolherVoto1()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("doenteImg1");
        nomeJVoto = document.getElementById("doenteNomeJapones1");
        nomeEVoto = document.getElementById("doenteNomeIngles1");
    }

    function doenteEscolherVoto2()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("doenteImg2");
        nomeJVoto = document.getElementById("doenteNomeJapones2");
        nomeEVoto = document.getElementById("doenteNomeIngles2");
    }

    function doenteEscolherVoto3()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("doenteImg3");
        nomeJVoto = document.getElementById("doenteNomeJapones3");
        nomeEVoto = document.getElementById("doenteNomeIngles3");
    }

    function emocaoEscolherVoto1()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("emocaoImg1");
        nomeJVoto = document.getElementById("emocaoNomeJapones1");
        nomeEVoto = document.getElementById("emocaoNomeIngles1");
    }

    function emocaoEscolherVoto2()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("emocaoImg2");
        nomeJVoto = document.getElementById("emocaoNomeJapones2");
        nomeEVoto = document.getElementById("emocaoNomeIngles2");
    }

    function emocaoEscolherVoto3()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("emocaoImg3");
        nomeJVoto = document.getElementById("emocaoNomeJapones3");
        nomeEVoto = document.getElementById("emocaoNomeIngles3");
    }

    function animeEscolherVoto1()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("animeImg1");
        nomeJVoto = document.getElementById("animeNomeJapones1");
        nomeEVoto = document.getElementById("animeNomeIngles1");
    }

    function animeEscolherVoto2()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("animeImg2");
        nomeJVoto = document.getElementById("animeNomeJapones2");
        nomeEVoto = document.getElementById("animeNomeIngles2");
    }

    function animeEscolherVoto3()
    {
        escolherPersonagem = false;
        modal.style.display = "block";
        imagemVoto = document.getElementById("animeImg3");
        nomeJVoto = document.getElementById("animeNomeJapones3");
        nomeEVoto = document.getElementById("animeNomeIngles3");
    }

    // =======================================escolherVoto.js=================================================
}