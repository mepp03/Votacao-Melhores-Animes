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
        <img src="${large}" class="lista__item--img" id="${id}" data-nomeJ="${romaji}" data-nomeE="${english}" 
            onclick="passarEscolha('${id}', '${romaji}', '${english}', '${large}')">        
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
        `<img src="${large}" class="lista__item--img" onclick="passarEscolhaExtra('${full}', '${large}')">        
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


function mostrarVotos()
{
    var nome = "leandro";
    fetch("http://127.0.0.1:5500/votos2021WinterCopy.json")
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            data = data.votos2021Winter;

            const abertura = Object.values(data[0].abertura[nome]);
            const encerramento = Object.values(data[1].encerramento[nome]);
            const feminino = Object.values(data[2].feminino[nome]);
            const masculino = Object.values(data[3].masculino[nome]);
            const surpresa = Object.values(data[4].surpresa[nome]);
            const decepcao = Object.values(data[5].decepcao[nome]);
            const animacao = Object.values(data[6].animacao[nome]);
            const antagonista = Object.values(data[7].antagonista[nome]);
            const par = Object.values(data[8].par[nome]);
            const doente = Object.values(data[9].doente[nome]);
            const emocao = Object.values(data[10].emocao[nome]);
            const anime = Object.values(data[11].anime[nome]);

            abertura.map((item, index) =>
            {
                const img = document.querySelector(`#aberturaImg${index + 1}`);
                const nomeJapones = document.querySelector(`#aberturaNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#aberturaNomeIngles${index + 1}`);
                const nomeMusica = document.querySelector(`#aberturaNomeMusica${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
                nomeMusica.innerHTML = item.extra;
            });

            encerramento.map((item, index) =>
            {
                const img = document.querySelector(`#encerramentoImg${index + 1}`);
                const nomeJapones = document.querySelector(`#encerramentoNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#encerramentoNomeIngles${index + 1}`);
                const nomeMusica = document.querySelector(`#encerramentoNomeMusica${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
                nomeMusica.innerHTML = item.extra;
            });

            feminino.map((item, index) =>
            {
                const img = document.querySelector(`#femininoImg${index + 1}`);
                const nomeJapones = document.querySelector(`#femininoNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#femininoNomeIngles${index + 1}`);
                const nomePersonagem = document.querySelector(`#femininoNomePersonagem${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
                nomePersonagem.innerHTML = item.extra;
            });

            masculino.map((item, index) =>
            {
                const img = document.querySelector(`#masculinoImg${index + 1}`);
                const nomeJapones = document.querySelector(`#masculinoNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#masculinoNomeIngles${index + 1}`);
                const nomePersonagem = document.querySelector(`#masculinoNomePersonagem${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
                nomePersonagem.innerHTML = item.extra;
            });

            surpresa.map((item, index) =>
            {
                const img = document.querySelector(`#surpresaImg${index + 1}`);
                const nomeJapones = document.querySelector(`#surpresaNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#surpresaNomeIngles${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
            });

            decepcao.map((item, index) =>
            {
                const img = document.querySelector(`#decepcaoImg${index + 1}`);
                const nomeJapones = document.querySelector(`#decepcaoNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#decepcaoNomeIngles${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
            });

            animacao.map((item, index) =>
            {
                const img = document.querySelector(`#animacaoImg${index + 1}`);
                const nomeJapones = document.querySelector(`#animacaoNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#animacaoNomeIngles${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
            });

            antagonista.map((item, index) =>
            {
                const img = document.querySelector(`#antagonistaImg${index + 1}`);
                const nomeJapones = document.querySelector(`#antagonistaNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#antagonistaNomeIngles${index + 1}`);
                const nomePersonagem = document.querySelector(`#antagonistaNomePersonagem${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
                nomePersonagem.innerHTML = item.extra;
            });

            par.map((item, index) =>
            {
                const img = document.querySelector(`#parImg${index + 1}`);
                const nomeJapones = document.querySelector(`#parNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#parNomeIngles${index + 1}`);
                const nomePar = document.querySelector(`#parNomePar${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
                nomePar.innerHTML = item.extra;
            });

            doente.map((item, index) =>
            {
                const img = document.querySelector(`#doenteImg${index + 1}`);
                const nomeJapones = document.querySelector(`#doenteNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#doenteNomeIngles${index + 1}`);
                const nomePersonagem = document.querySelector(`#doenteNomePersonagem${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
                nomePersonagem.innerHTML = item.extra;
            });

            emocao.map((item, index) =>
            {
                const img = document.querySelector(`#emocaoImg${index + 1}`);
                const nomeJapones = document.querySelector(`#emocaoNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#emocaoNomeIngles${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
            });

            anime.map((item, index) =>
            {
                const img = document.querySelector(`#animeImg${index + 1}`);
                const nomeJapones = document.querySelector(`#animeNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#animeNomeIngles${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
            });




        });
}

// function mostrarVotos()
// {
//     var nome = "leandro"
//     fetch("http://127.0.0.1:5500/votos2021Winter.json")
//     .then(function (response)
//     {
//         return response.json();
//     })
//     .then(function (data)
//     {
//         data = data.votos2021Winter;


//             document.getElementById("aberturaImg1").src = data[0].abertura[nome].primeiro.imagem;
//             document.getElementById("aberturaNomeJapones1").innerHTML = data[0].abertura[nome].primeiro.nomeJ;
//             document.getElementById("aberturaNomeIngles1").innerHTML = data[0].abertura[nome].primeiro.nomeE;
//             document.getElementById("aberturaNomeMusica1").innerHTML = data[0].abertura[nome].primeiro.extra;

//             document.getElementById("aberturaImg2").src = data[0].abertura[nome].segundo.imagem;
//             document.getElementById("aberturaNomeJapones2").innerHTML = data[0].abertura[nome].segundo.nomeJ;
//             document.getElementById("aberturaNomeIngles2").innerHTML = data[0].abertura[nome].segundo.nomeE;
//             document.getElementById("aberturaNomeMusica2").innerHTML = data[0].abertura[nome].segundo.extra;

//             document.getElementById("aberturaImg3").src = data[0].abertura[nome].terceiro.imagem;
//             document.getElementById("aberturaNomeJapones3").innerHTML = data[0].abertura[nome].terceiro.nomeJ;
//             document.getElementById("aberturaNomeIngles3").innerHTML = data[0].abertura[nome].terceiro.nomeE;
//             document.getElementById("aberturaNomeMusica3").innerHTML = data[0].abertura[nome].terceiro.extra;

//             document.getElementById("encerramentoImg1").src = data[1].encerramento[nome].primeiro.imagem;
//             document.getElementById("encerramentoNomeJapones1").innerHTML = data[1].encerramento[nome].primeiro.nomeJ;
//             document.getElementById("encerramentoNomeIngles1").innerHTML = data[1].encerramento[nome].primeiro.nomeE;
//             document.getElementById("encerramentoNomeMusica1").innerHTML = data[1].encerramento[nome].primeiro.extra;

//             document.getElementById("encerramentoImg2").src = data[1].encerramento[nome].segundo.imagem;
//             document.getElementById("encerramentoNomeJapones2").innerHTML = data[1].encerramento[nome].segundo.nomeJ;
//             document.getElementById("encerramentoNomeIngles2").innerHTML = data[1].encerramento[nome].segundo.nomeE;
//             document.getElementById("encerramentoNomeMusica2").innerHTML = data[1].encerramento[nome].segundo.extra;

//             document.getElementById("encerramentoImg3").src = data[1].encerramento[nome].terceiro.imagem;
//             document.getElementById("encerramentoNomeJapones3").innerHTML = data[1].encerramento[nome].terceiro.nomeJ;
//             document.getElementById("encerramentoNomeIngles3").innerHTML = data[1].encerramento[nome].terceiro.nomeE;
//             document.getElementById("encerramentoNomeMusica3").innerHTML = data[1].encerramento[nome].terceiro.extra;
//     });
// }
// =======================================escolherVoto.js=================================================

var imagemVoto;
var nomeJVoto;
var nomeEVoto;
var escolhaExtra = "nenhum";

function fechar()
{
    modal.style.display = "none";
}

function passarEscolha(id, nomeJ, nomeE, imagem)
{
    idAnime = id;
    imagemVoto.src = imagem;
    imagemVoto.setAttribute("data-identificacao", idAnime);
    imagemVoto.setAttribute("data-nomeJ", nomeJ);
    imagemVoto.setAttribute("data-nomeE", nomeE);
    nomeJVoto.innerHTML = nomeJ;
    nomeEVoto.innerHTML = nomeE;
    imagemVoto.setAttribute("data-extra", "sem");

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
    resetarLista();
}

function passarEscolhaExtra(info, imagemPersonagem)
{
    if (imagemPersonagem != null)
    {
        imagemVoto.src = imagemPersonagem;
    }

    extraVoto.innerHTML = info;
    imagemVoto.setAttribute("data-identificacao", idAnime);
    imagemVoto.setAttribute("data-extra", info);

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

// escolhas
{
    {
        function aberturaEscolherVoto1()
        {
            esconderExtra();
            filtrarVideo("op");
            escolhaExtra = "abertura";
            modal.style.display = "block";
            idVoto = document.getElementById("aberturaImg1").dataset.identificacao;
            imagemVoto = document.getElementById("aberturaImg1");
            nomeJVoto = document.getElementById("aberturaNomeJapones1");
            nomeEVoto = document.getElementById("aberturaNomeIngles1");
            extraVoto = document.getElementById("aberturaNomeMusica1");
            // votar("abertura1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("abertura2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("abertura3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("encerramento1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("encerramento2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("encerramento3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("feminino1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("feminino2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("feminino3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("masculino1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("masculino2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("masculino3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("surpresa1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
        }

        function surpresaEscolherVoto2()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("surpresaImg2");
            nomeJVoto = document.getElementById("surpresaNomeJapones2");
            nomeEVoto = document.getElementById("surpresaNomeIngles2");
            // votar("surpresa2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
        }

        function surpresaEscolherVoto3()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("surpresaImg3");
            nomeJVoto = document.getElementById("surpresaNomeJapones3");
            nomeEVoto = document.getElementById("surpresaNomeIngles3");
            // votar("surpresa3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("decepcao1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
        }

        function decepcaoEscolherVoto2()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("decepcaoImg2");
            nomeJVoto = document.getElementById("decepcaoNomeJapones2");
            nomeEVoto = document.getElementById("decepcaoNomeIngles2");
            // votar("decepcao2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
        }

        function decepcaoEscolherVoto3()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("decepcaoImg3");
            nomeJVoto = document.getElementById("decepcaoNomeJapones3");
            nomeEVoto = document.getElementById("decepcaoNomeIngles3");
            // votar("decepcao3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("animacao1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
        }

        function animacaoEscolherVoto2()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("animacaoImg2");
            nomeJVoto = document.getElementById("animacaoNomeJapones2");
            nomeEVoto = document.getElementById("animacaoNomeIngles2");
            // votar("animacao2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
        }

        function animacaoEscolherVoto3()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("animacaoImg3");
            nomeJVoto = document.getElementById("animacaoNomeJapones3");
            nomeEVoto = document.getElementById("animacaoNomeIngles3");
            // votar("animacao3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("antagonista1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("antagonista2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("antagonista3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("par1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("par2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("par3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("doente1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("doente2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("doente3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("emocao1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
        }

        function emocaoEscolherVoto2()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("emocaoImg2");
            nomeJVoto = document.getElementById("emocaoNomeJapones2");
            nomeEVoto = document.getElementById("emocaoNomeIngles2");
            // votar("emocao2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
        }

        function emocaoEscolherVoto3()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("emocaoImg3");
            nomeJVoto = document.getElementById("emocaoNomeJapones3");
            nomeEVoto = document.getElementById("emocaoNomeIngles3");
            // votar("emocao3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
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
            // votar("anime1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
        }

        function animeEscolherVoto2()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("animeImg2");
            nomeJVoto = document.getElementById("animeNomeJapones2");
            nomeEVoto = document.getElementById("animeNomeIngles2");
            // votar("anime2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
        }

        function animeEscolherVoto3()
        {
            escolhaExtra = "false";
            modal.style.display = "block";
            imagemVoto = document.getElementById("animeImg3");
            nomeJVoto = document.getElementById("animeNomeJapones3");
            nomeEVoto = document.getElementById("animeNomeIngles3");
            // votar("anime3", imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
        }
    }
    // =======================================escolherVoto.js=================================================
}