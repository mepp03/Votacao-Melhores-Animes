busca1();

// var anoBusca = "2021";
// var temporada = "winter";
const tabela = document.getElementById("lista");
const tabelaExtra = document.getElementById("extra");
var animes;



// Cria os cards dos animes
const criaCardAnime = (id, large, medium, season, SeasonYear, english, romaji, op, ed) =>
{
    const novoCardAnime = document.createElement('div');
    novoCardAnime.classList.add('lista__item');
    const conteudo =
        `
        <img src="${large}" class="lista__item--img" id="${id}" data-nomeJ="${romaji}" data-nomeE="${english}" onclick="passarEscolha()">        
        <h3 class="lista__item--nome" id="nomeJ">${romaji}</h3>
        <h3 class="lista__item--nome" id="nomeE">${english}</h3>
        <a class="esconder" href="#">${op}</a>
        <p class="esconder">${ed}</p>
        `
    // <a href="${video}" class="lista__item--link">${op}</a>
    //<a class="esconder" href="#" onClick="MyWindow=window.open('${video}','MyWindow','width=960,height=540'); return false;">${op}</a>

    novoCardAnime.innerHTML = conteudo;
    novoCardAnime.dataset.id = id;

    return novoCardAnime;
};

// Cria os cards das aberturas
const criaCardAbertura = (id, op, video) =>
{
    const novoCardExtra = document.createElement('div');
    novoCardExtra.classList.add('lista__item');
    const conteudo =
        `<video class="lista__item--video" id="video" width="720" height="480" controls>
            <source src="${video}" type="video/webm">
        </video>
        <h3 class="lista__item--nome" id="nomeOP">${op}</h3>
        <button class="lista__item--botao" id="${id}" data-nomeOp="${op}" onclick="passarEscolhaExtra('${op}')">Escolher</button>        
        `
    // <a href="${video}" class="lista__item--link">${op}</a>

    novoCardExtra.innerHTML = conteudo;
    novoCardExtra.dataset.id = id;

    return novoCardExtra;
};

// Cria os cards dos encerramentos
const criaCardEncerramento = (id, ed, video) =>
{
    const novoCardExtra = document.createElement('div');
    novoCardExtra.classList.add('lista__item');
    const conteudo =
        `<video class="lista__item--video" id="video" width="720" height="480" controls>
            <source src="${video}" type="video/webm">
        </video>
        <h3 class="lista__item--nome" id="nomeED">${ed}</h3>
        <button class="lista__item--botao" id="${id}" data-nomeEd="${ed}" onclick="passarEscolhaExtra('${ed}')">Escolher</button>        
        `
    novoCardExtra.innerHTML = conteudo;
    novoCardExtra.dataset.id = id;

    return novoCardExtra;
};

// Cria os cards dos personagens
const criaCardExtra = (id, romaji, english, gender, full, large) =>
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
        `<img src="${large}" class="lista__item--img" onclick="passarEscolhaExtra('${full}')">        
        <h3 class="lista__item--nome" id="nomeFull">${full}</h3>
        <h3 class="lista__item--nome" id="genero">${genero}</h3>
        `

    novoCardExtra.innerHTML = conteudo;
    novoCardExtra.dataset.id = id;
    
    return novoCardExtra;
}

function busca1()
{
    fetch("http://127.0.0.1:5500/winter2021Copy.json")
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            animes = data;
            // console.log(data[8].opening.edges[0].node.op.name);
            data.forEach(elemento => 
            {
                // console.log(elemento.title.romaji);
                // console.log(elemento.opening.edges.length);
                // console.log(elemento.ending.edges.length);

                // console.log(quantidade);
                var temOp = elemento.opening.edges.length;
                var temEd = elemento.ending.edges.length;

                switch (true)
                {
                    // tem op e ed
                    case (temOp > 0 && temEd > 0):
                        // console.log("    tem op e ed");
                        tabela.appendChild(criaCardAnime(elemento.id, elemento.coverImage.large, elemento.coverImage.medium, elemento.season,
                            elemento.SeasonYear, elemento.title.english, elemento.title.romaji, temOp, temEd));
                        break;

                    // só tem op
                    case (temOp > 0 && temEd == 0):
                        // console.log("    só tem op");
                        tabela.appendChild(criaCardAnime(elemento.id, elemento.coverImage.large, elemento.coverImage.medium, elemento.season,
                            elemento.SeasonYear, elemento.title.english, elemento.title.romaji, temOp, ""));
                        break;

                    // so tem ed
                    case (temOp == 0 && temEd > 0):
                        // console.log("    so tem ed");
                        tabela.appendChild(criaCardAnime(elemento.id, elemento.coverImage.large, elemento.coverImage.medium, elemento.season,
                            elemento.SeasonYear, elemento.title.english, elemento.title.romaji, "", temEd));
                        break;

                    // não tem op nem ed
                    default:
                        // console.log("    Não tem op nem ed");
                        tabela.appendChild(criaCardAnime(elemento.id, elemento.coverImage.large, elemento.coverImage.medium, elemento.season,
                            elemento.SeasonYear, elemento.title.english, elemento.title.romaji, "", ""));
                        break;
                }
                // console.log(elemento.opening.edges[0].node);
                // tabela.appendChild(criaCardAnime(elemento.id, elemento.coverImage.large, elemento.coverImage.medium, elemento.season,
                //     elemento.SeasonYear, elemento.title.english, elemento.title.romaji, 
                //     elemento.opening.edges.node.op.name, elemento.opening.edges.node.op.video));

                // tabela.appendChild(criaCardAnime(elemento.id, elemento.coverImage.large, elemento.coverImage.medium, elemento.season,
                //     elemento.SeasonYear, elemento.title.english, elemento.title.romaji));


            });
        })
}

function mostrarExtra()
{
    // esconde o modal dos animes e mostra o modal extra
    document.getElementById("secaoLista").classList.add("esconder");
    document.getElementById("secaoExtra").classList.remove("esconder");

    // apaga o modal extra
    tabelaExtra.innerHTML = '';
}

function esconderExtra()
{
    // esconde o modal dos animes e mostra o modal extra
    document.getElementById("secaoExtra").classList.add("esconder");
    document.getElementById("secaoLista").classList.remove("esconder");
}

function resetarLista()
{
    var videos = document.querySelectorAll('a');
    for (var i = 0; i < videos.length; i++)
    {
            videos[i].parentElement.classList.remove("esconder");
    }

    var videos = document.querySelectorAll('p');
    for (var i = 0; i < videos.length; i++)
    {

            videos[i].parentElement.classList.remove("esconder");
    }
}

function procurar()
{
    var nomeProcurado = document.getElementById("extra__busca").value.toLowerCase();  // input
    var listaProcurar = document.querySelectorAll('[id=nomeFull]');     // nomes


    listaProcurar.forEach(element =>
    {
        var nomes = element.innerHTML.split(' ');

        console.log(nomes);

        const nomesFiltrados = nomes.filter(function (nome)
        {
            return nome.toLowerCase().includes(nomeProcurado);
        });

        if (nomesFiltrados.length > 0)
        {
            element.parentElement.classList.add("esconder");
        } else
        {
            element.parentElement.classList.remove("esconder");
        }
    });

    if (nomeProcurado == "")
    {
        listaProcurar.forEach(element =>
        {
            element.parentElement.classList.remove("esconder");
        });
    }
}

// =======================================escolherVoto.js=================================================

var imagemVoto;
var nomeJVoto;
var nomeEVoto;
var escolhaExtra = "nenhum";

function fechar()
{
    modal.style.display = "none";
}

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

            switch (escolhaExtra)
            {
                case 'abertura':
                    mostrarExtra();

                    var aberturas = animes.filter(item => item.id == idAnime);

                    // var aberturasFiltradas = aberturas[0].opening;
                    // console.log(aberturasFiltradas);
                    aberturas.forEach(elemento => 
                    {
                        var quantidade = elemento.opening.edges.length;
                        // console.log(quantidade);
                        for (var i = 0; i < quantidade; i++)
                        {
                            // console.log(elemento.opening.edges[i].node.op.name);
                            tabelaExtra.appendChild(criaCardAbertura(elemento.id, elemento.opening.edges[i].node.op.name, 
                                elemento.opening.edges[i].node.op.video));
                        }
                    });
                    break;

                case 'encerramento':
                    mostrarExtra();

                    var aberturas = animes.filter(item => item.id == idAnime);

                    aberturas.forEach(elemento => 
                    {
                        var quantidade = elemento.ending.edges.length;
                        for (var i = 0; i < quantidade; i++)
                        {
                            tabelaExtra.appendChild(criaCardEncerramento(elemento.id, elemento.ending.edges[i].node.ed.name, 
                                elemento.ending.edges[i].node.ed.video));
                        }
                    });
                    break;

                case 'personagemFeminino':
                    mostrarExtra();

                    var personagens = animes.filter(item => item.id == idAnime);

                    // console.log(personagens[0].characters);
                    personagensFiltrados = personagens[0].characters.edges;
                    personagensFiltrados.forEach(elemento => 
                    {
                        if (elemento.node.gender != "Male")
                        {
                            tabelaExtra.appendChild(criaCardExtra(elemento.id, animeNomeE, animeNomeJ, elemento.node.gender, elemento.node.name.full, 
                                elemento.node.image.large));
                        }
                    });
                    break;

                case 'personagemMasculino':
                    mostrarExtra();

                    var personagens = animes.filter(item => item.id == idAnime);

                    personagensFiltrados = personagens[0].characters.edges;
                    personagensFiltrados.forEach(elemento => 
                    {
                        if (elemento.node.gender != "Female")
                        {
                            tabelaExtra.appendChild(criaCardExtra(elemento.id, animeNomeE, animeNomeJ, elemento.node.gender, elemento.node.name.full, 
                                elemento.node.image.large));
                        }
                    });
                    break;

                case 'personagem':
                    mostrarExtra();

                    // console.log(idAnime);
                    // console.log(animes);
                    var personagens = animes.filter(item => item.id == idAnime);
                    // console.log(personagens);
                    var animeNomeE = personagens[0].title.english;
                    var animeNomeJ = personagens[0].title.romaji;

                    personagensFiltrados = personagens[0].characters.edges;
                    personagensFiltrados.forEach(elemento => 
                    {
                        tabelaExtra.appendChild(criaCardExtra(elemento.id, animeNomeE, animeNomeJ, elemento.node.gender, elemento.node.name.full, 
                            elemento.node.image.large));
                    });
                    break;

                case 'par':
                    mostrarExtra();

                    // console.log(idAnime);
                    // console.log(animes);
                    var personagens = animes.filter(item => item.id == idAnime);
                    // console.log(personagens);
                    var animeNomeE = personagens[0].title.english;
                    var animeNomeJ = personagens[0].title.romaji;

                    personagensFiltrados = personagens[0].characters.edges;
                    personagensFiltrados.forEach(elemento => 
                    {
                        tabelaExtra.appendChild(criaCardExtra(animeNomeE, animeNomeJ, elemento.node.gender, elemento.node.name.full, elemento.node.image.large));
                    });
                    break;

                default:
                    modal.style.display = "none";
                    break;
            }

            // if (escolhaExtra == "abertura") 
            // {
            //     document.getElementById("secaoLista").classList.add("esconder");
            //     document.getElementById("secaoExtra").classList.remove("esconder");

            //     console.log(idAnime);
            //     console.log(animes);
            //     var personagens = animes.filter(item => item.id == idAnime);
            //     console.log(personagens);
            //     var animeNomeE = personagens[0].title.english;
            //     var animeNomeJ = personagens[0].title.romaji;

            //     personagensFiltrados = personagens[0].characters.edges;
            //     personagensFiltrados.forEach(elemento => 
            //     {
            //         tabelaExtra.appendChild(criaCardExtra(animeNomeE, animeNomeJ, elemento.node.gender, elemento.node.name.full, elemento.node.image.large));
            //     });
            // }
            // else
            // {
            //     modal.style.display = "none";
            // }

        }

    }, false);
    resetarLista();
}

function passarEscolhaExtra(info)
{        
        extraVoto.innerHTML = info;

    // escolhaExtra = true;
    
    // console.log(document.getElementById("secaoExtra").classList.value);
    document.getElementById("secaoExtra").classList.add("esconder");

    
    // console.log(document.getElementById("secaoLista").classList.value);
    document.getElementById("secaoLista").classList.remove("esconder");

    modal.style.display = "none";
}

function filtrarVideo(video)
{
    switch (true)
    {
        case video == "op":
            var videos = document.querySelectorAll('a');
            for (var i = 0; i < videos.length; i++)
            {
                if (videos[i].textContent == "")
                {

                    videos[i].parentElement.classList.add("esconder");
                }
            }
            break;

        case video == "ed":
            var videos = document.querySelectorAll('p');
            for (var i = 0; i < videos.length; i++)
            {
                if (videos[i].textContent == "")
                {

                    videos[i].parentElement.classList.add("esconder");
                }
            }
            break;

        default:
            break;
    }
}

{
    {
        function aberturaEscolherVoto1()
        {            
            esconderExtra();
            filtrarVideo("op");
            escolhaExtra = "abertura";
            modal.style.display = "block";
            imagemVoto = document.getElementById("aberturaImg1");
            nomeJVoto = document.getElementById("aberturaNomeJapones1");
            nomeEVoto = document.getElementById("aberturaNomeIngles1");
            extraVoto = document.getElementById("aberturaNomeMusica1");
        }

        function aberturaEscolherVoto2()
        {
            esconderExtra();
            filtrarVideo("op");
            escolhaExtra = "abertura";
            modal.style.display = "block";
            imagemVoto = document.getElementById("aberturaImg2");
            nomeJVoto = document.getElementById("aberturaNomeJapones2");
            nomeEVoto = document.getElementById("aberturaNomeIngles2");
            extraVoto = document.getElementById("aberturaNomeMusica2");
        }

        function aberturaEscolherVoto3()
        {
            esconderExtra();
            filtrarVideo("op");
            escolhaExtra = "abertura";
            modal.style.display = "block";
            imagemVoto = document.getElementById("aberturaImg3");
            nomeJVoto = document.getElementById("aberturaNomeJapones3");
            nomeEVoto = document.getElementById("aberturaNomeIngles3");
            extraVoto = document.getElementById("aberturaNomeMusica3");
        }
    }

    {
        function encerramentoEscolherVoto1()
        {
            esconderExtra();
            filtrarVideo("ed");
            escolhaExtra = "encerramento";
            modal.style.display = "block";
            imagemVoto = document.getElementById("encerramentoImg1");
            nomeJVoto = document.getElementById("encerramentoNomeJapones1");
            nomeEVoto = document.getElementById("encerramentoNomeIngles1");
            extraVoto = document.getElementById("encerramentoNomeMusica1");
        }

        function encerramentoEscolherVoto2()
        {
            esconderExtra();
            filtrarVideo("ed");
            escolhaExtra = "encerramento";
            modal.style.display = "block";
            imagemVoto = document.getElementById("encerramentoImg2");
            nomeJVoto = document.getElementById("encerramentoNomeJapones2");
            nomeEVoto = document.getElementById("encerramentoNomeIngles2");
            extraVoto = document.getElementById("encerramentoNomeMusica2");
        }

        function encerramentoEscolherVoto3()
        {
            esconderExtra();
            filtrarVideo("ed");
            escolhaExtra = "encerramento";
            modal.style.display = "block";
            imagemVoto = document.getElementById("encerramentoImg3");
            nomeJVoto = document.getElementById("encerramentoNomeJapones3");
            nomeEVoto = document.getElementById("encerramentoNomeIngles3");
            extraVoto = document.getElementById("encerramentoNomeMusica3");
        }
    }

    {
        function femininoEscolherVoto1()
        {
            esconderExtra();
            escolhaExtra = "personagemFeminino";
            modal.style.display = "block";
            imagemVoto = document.getElementById("femininoImg1");
            nomeJVoto = document.getElementById("femininoNomeJapones1");
            nomeEVoto = document.getElementById("femininoNomeIngles1");
            extraVoto = document.getElementById("femininoNomePersonagem1");
        }

        function femininoEscolherVoto2()
        {
            esconderExtra();
            escolhaExtra = "personagemFeminino";
            modal.style.display = "block";
            imagemVoto = document.getElementById("femininoImg2");
            nomeJVoto = document.getElementById("femininoNomeJapones2");
            nomeEVoto = document.getElementById("femininoNomeIngles2");
            extraVoto = document.getElementById("femininoNomePersonagem2");
        }

        function femininoEscolherVoto3()
        {
            esconderExtra();
            escolhaExtra = "personagemFeminino";
            modal.style.display = "block";
            imagemVoto = document.getElementById("femininoImg3");
            nomeJVoto = document.getElementById("femininoNomeJapones3");
            nomeEVoto = document.getElementById("femininoNomeIngles3");
            extraVoto = document.getElementById("femininoNomePersonagem3");
        }
    }

    {
        function masculinoEscolherVoto1()
        {
            esconderExtra();
            escolhaExtra = "personagemMasculino";
            modal.style.display = "block";
            imagemVoto = document.getElementById("masculinoImg1");
            nomeJVoto = document.getElementById("masculinoNomeJapones1");
            nomeEVoto = document.getElementById("masculinoNomeIngles1");
            extraVoto = document.getElementById("masculinoNomePersonagem1");
        }

        function masculinoEscolherVoto2()
        {
            esconderExtra();
            escolhaExtra = "personagemMasculino";
            modal.style.display = "block";
            imagemVoto = document.getElementById("masculinoImg2");
            nomeJVoto = document.getElementById("masculinoNomeJapones2");
            nomeEVoto = document.getElementById("masculinoNomeIngles2");
            extraVoto = document.getElementById("masculinoNomePersonagem2");
        }

        function masculinoEscolherVoto3()
        {
            esconderExtra();
            escolhaExtra = "personagemMasculino";
            modal.style.display = "block";
            imagemVoto = document.getElementById("masculinoImg3");
            nomeJVoto = document.getElementById("masculinoNomeJapones3");
            nomeEVoto = document.getElementById("masculinoNomeIngles3");
            extraVoto = document.getElementById("masculinoNomePersonagem3");
        }
    }

    {
        function surpresaEscolherVoto1()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("surpresaImg1");
            nomeJVoto = document.getElementById("surpresaNomeJapones1");
            nomeEVoto = document.getElementById("surpresaNomeIngles1");
        }

        function surpresaEscolherVoto2()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("surpresaImg2");
            nomeJVoto = document.getElementById("surpresaNomeJapones2");
            nomeEVoto = document.getElementById("surpresaNomeIngles2");
        }

        function surpresaEscolherVoto3()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("surpresaImg3");
            nomeJVoto = document.getElementById("surpresaNomeJapones3");
            nomeEVoto = document.getElementById("surpresaNomeIngles3");
        }
    }

    {
        function decepcaoEscolherVoto1()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("decepcaoImg1");
            nomeJVoto = document.getElementById("decepcaoNomeJapones1");
            nomeEVoto = document.getElementById("decepcaoNomeIngles1");
        }

        function decepcaoEscolherVoto2()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("decepcaoImg2");
            nomeJVoto = document.getElementById("decepcaoNomeJapones2");
            nomeEVoto = document.getElementById("decepcaoNomeIngles2");
        }

        function decepcaoEscolherVoto3()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("decepcaoImg3");
            nomeJVoto = document.getElementById("decepcaoNomeJapones3");
            nomeEVoto = document.getElementById("decepcaoNomeIngles3");
        }
    }

    {
        function animacaoEscolherVoto1()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("animacaoImg1");
            nomeJVoto = document.getElementById("animacaoNomeJapones1");
            nomeEVoto = document.getElementById("animacaoNomeIngles1");
        }

        function animacaoEscolherVoto2()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("animacaoImg2");
            nomeJVoto = document.getElementById("animacaoNomeJapones2");
            nomeEVoto = document.getElementById("animacaoNomeIngles2");
        }

        function animacaoEscolherVoto3()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("animacaoImg3");
            nomeJVoto = document.getElementById("animacaoNomeJapones3");
            nomeEVoto = document.getElementById("animacaoNomeIngles3");
        }
    }

    {
        function antagonistaEscolherVoto1()
        {
            esconderExtra();
            escolhaExtra = "personagem";
            modal.style.display = "block";
            imagemVoto = document.getElementById("antagonistaImg1");
            nomeJVoto = document.getElementById("antagonistaNomeJapones1");
            nomeEVoto = document.getElementById("antagonistaNomeIngles1");
            extraVoto = document.getElementById("antagonistaNomePersonagem1");
        }

        function antagonistaEscolherVoto2()
        {
            esconderExtra();
            escolhaExtra = "personagem";
            modal.style.display = "block";
            imagemVoto = document.getElementById("antagonistaImg2");
            nomeJVoto = document.getElementById("antagonistaNomeJapones2");
            nomeEVoto = document.getElementById("antagonistaNomeIngles2");
            extraVoto = document.getElementById("antagonistaNomePersonagem2");
        }

        function antagonistaEscolherVoto3()
        {
            esconderExtra();
            escolhaExtra = "personagem";
            modal.style.display = "block";
            imagemVoto = document.getElementById("antagonistaImg3");
            nomeJVoto = document.getElementById("antagonistaNomeJapones3");
            nomeEVoto = document.getElementById("antagonistaNomeIngles3");
            extraVoto = document.getElementById("antagonistaNomePersonagem3");
        }
    }

    {
        function parEscolherVoto1()
        {
            esconderExtra();
            escolhaExtra = "par";
            modal.style.display = "block";
            imagemVoto = document.getElementById("parImg1");
            nomeJVoto = document.getElementById("parNomeJapones1");
            nomeEVoto = document.getElementById("parNomeIngles1");
            extraVoto = document.getElementById("parNomePar1");
        }

        function parEscolherVoto2()
        {
            esconderExtra();
            escolhaExtra = "par";
            modal.style.display = "block";
            imagemVoto = document.getElementById("parImg2");
            nomeJVoto = document.getElementById("parNomeJapones2");
            nomeEVoto = document.getElementById("parNomeIngles2");
            extraVoto = document.getElementById("parNomePar2");
        }

        function parEscolherVoto3()
        {
            esconderExtra();
            escolhaExtra = "par";
            modal.style.display = "block";
            imagemVoto = document.getElementById("parImg3");
            nomeJVoto = document.getElementById("parNomeJapones3");
            nomeEVoto = document.getElementById("parNomeIngles3");
            extraVoto = document.getElementById("parNomePar3");
        }
    }

    {
        function doenteEscolherVoto1()
        {
            esconderExtra();
            escolhaExtra = "personagem";
            modal.style.display = "block";
            imagemVoto = document.getElementById("doenteImg1");
            nomeJVoto = document.getElementById("doenteNomeJapones1");
            nomeEVoto = document.getElementById("doenteNomeIngles1");
            extraVoto = document.getElementById("doenteNomePersonagem1");
        }

        function doenteEscolherVoto2()
        {
            esconderExtra();
            escolhaExtra = "personagem";
            modal.style.display = "block";
            imagemVoto = document.getElementById("doenteImg2");
            nomeJVoto = document.getElementById("doenteNomeJapones2");
            nomeEVoto = document.getElementById("doenteNomeIngles2");
            extraVoto = document.getElementById("doenteNomePersonagem2");
        }

        function doenteEscolherVoto3()
        {
            esconderExtra();
            escolhaExtra = "personagem";
            modal.style.display = "block";
            imagemVoto = document.getElementById("doenteImg3");
            nomeJVoto = document.getElementById("doenteNomeJapones3");
            nomeEVoto = document.getElementById("doenteNomeIngles3");
            extraVoto = document.getElementById("doenteNomePersonagem3");
        }
    }

    {
        function emocaoEscolherVoto1()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("emocaoImg1");
            nomeJVoto = document.getElementById("emocaoNomeJapones1");
            nomeEVoto = document.getElementById("emocaoNomeIngles1");
        }

        function emocaoEscolherVoto2()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("emocaoImg2");
            nomeJVoto = document.getElementById("emocaoNomeJapones2");
            nomeEVoto = document.getElementById("emocaoNomeIngles2");
        }

        function emocaoEscolherVoto3()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("emocaoImg3");
            nomeJVoto = document.getElementById("emocaoNomeJapones3");
            nomeEVoto = document.getElementById("emocaoNomeIngles3");
        }
    }

    {
        function animeEscolherVoto1()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("animeImg1");
            nomeJVoto = document.getElementById("animeNomeJapones1");
            nomeEVoto = document.getElementById("animeNomeIngles1");
        }

        function animeEscolherVoto2()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("animeImg2");
            nomeJVoto = document.getElementById("animeNomeJapones2");
            nomeEVoto = document.getElementById("animeNomeIngles2");
        }

        function animeEscolherVoto3()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("animeImg3");
            nomeJVoto = document.getElementById("animeNomeJapones3");
            nomeEVoto = document.getElementById("animeNomeIngles3");
        }
    }
    // =======================================escolherVoto.js=================================================
}