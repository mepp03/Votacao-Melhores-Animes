const tabela = document.getElementById("lista");
const tabelaExtra = document.getElementById("extra");
var animes;
var nome = localStorage.getItem("usuario");

buscar();

// Cria os cards dos animes
const criaCardAnime = (
  id,
  large,
  medium,
  season,
  SeasonYear,
  english,
  romaji,
  op,
  ed
) => {
  const novoCardAnime = document.createElement("div");
  novoCardAnime.classList.add("lista__item");
  const conteudo = `
        <img src="${large}" class="lista__item--img" id="${id}" data-nomeJ="${romaji}" data-nomeE="${english}" 
            onclick="passarEscolha('${id}', '${romaji}', '${english}', '${large}')">        
        <h3 class="lista__item--nome" id="nomeJ">${romaji}</h3>
        <h3 class="lista__item--nome" id="nomeE">${english}</h3>
        <a class="esconder" href="#">${op}</a>
        <p class="esconder">${ed}</p>
        `;
  // <a href="${video}" class="lista__item--link">${op}</a>
  //<a class="esconder" href="#" onClick="MyWindow=window.open('${video}','MyWindow','width=960,height=540'); return false;">${op}</a>

  novoCardAnime.innerHTML = conteudo;
  novoCardAnime.dataset.id = id;

  return novoCardAnime;
};

// Cria os cards das aberturas
const criaCardAbertura = (id, op, video) => {
  const novoCardExtra = document.createElement("div");
  novoCardExtra.classList.add("lista__item");
  const conteudo = `<video class="lista__item--video" id="video" width="720" height="480" controls>
            <source src="${video}" type="video/webm">
        </video>
        <h3 class="lista__item--nome" id="nomeOP">${op}</h3>
        <button class="lista__item--botao" id="${id}" data-nomeOp="${op}" onclick="passarEscolhaExtra('${op}')">Escolher</button>        
        `;
  // <a href="${video}" class="lista__item--link">${op}</a>

  novoCardExtra.innerHTML = conteudo;
  novoCardExtra.dataset.id = id;

  return novoCardExtra;
};

// Cria os cards dos encerramentos
const criaCardEncerramento = (id, ed, video) => {
  const novoCardExtra = document.createElement("div");
  novoCardExtra.classList.add("lista__item");
  const conteudo = `<video class="lista__item--video" id="video" width="720" height="480" controls>
            <source src="${video}" type="video/webm">
        </video>
        <h3 class="lista__item--nome" id="nomeED">${ed}</h3>
        <button class="lista__item--botao" id="${id}" data-nomeEd="${ed}" onclick="passarEscolhaExtra('${ed}')">Escolher</button>        
        `;
  novoCardExtra.innerHTML = conteudo;
  novoCardExtra.dataset.id = id;

  return novoCardExtra;
};

// Cria os cards dos personagens
const criaCardExtra = (id, romaji, english, gender, full, large) => {
  var genero = "";
  switch (gender) {
    case "Male":
      genero = "Masculino";
      break;

    case "Female":
      genero = "Feminino";
      break;

    default:
      genero = "Anilist não informou :/";
      break;
  }
  const novoCardExtra = document.createElement("div");
  novoCardExtra.classList.add("lista__item");
  const conteudo = `<img src="${large}" class="lista__item--img" onclick="passarEscolhaExtra('${full}', '${large}')">        
        <h3 class="lista__item--nome" id="nomeFull">${full}</h3>
        <h3 class="lista__item--nome" id="genero">${genero}</h3>
        `;

  novoCardExtra.innerHTML = conteudo;
  novoCardExtra.dataset.id = id;

  return novoCardExtra;
};

// Cria os cards dos pares
const criaCardPar = (id, romaji, english, gender, full, large) => {
  var genero = "";
  switch (gender) {
    case "Male":
      genero = "Masculino";
      break;

    case "Female":
      genero = "Feminino";
      break;

    default:
      genero = "Anilist não informou :/";
      break;
  }
  const novoCardExtra = document.createElement("div");
  novoCardExtra.classList.add("lista__item");
  const conteudo = `<img src="${large}" class="lista__item--img">        
    <h3 class="lista__item--nome" id="nomeFull">${full}</h3>
    <h3 class="lista__item--nome" id="genero">${genero}</h3>
    <label>
    <input type="checkbox" name="par" value="${large}" data-nome="${full}" data-nomeE="${english}" data-nomeJ="${romaji}" onclick="selecionarPares()">
        Selecione o par
    </label>
    `;

  novoCardExtra.innerHTML = conteudo;
  novoCardExtra.dataset.id = id;

  return novoCardExtra;
};

function buscar() {
  var temporada = localStorage.getItem("temporada");
  tabela.innerHTML = "";

  fetch(`${endereco}${temporada}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      animes = data;

      animes.forEach((elemento) => {
        var temOp = elemento.opening.edges.length;
        var temEd = elemento.ending.edges.length;

        switch (true) {
          // tem op e ed
          case temOp > 0 && temEd > 0:
            tabela.appendChild(
              criaCardAnime(
                elemento.id,
                elemento.coverImage.large,
                elemento.coverImage.medium,
                elemento.season,
                elemento.SeasonYear,
                elemento.title.english,
                elemento.title.romaji,
                temOp,
                temEd
              )
            );
            break;

          // só tem op
          case temOp > 0 && temEd == 0:
            tabela.appendChild(
              criaCardAnime(
                elemento.id,
                elemento.coverImage.large,
                elemento.coverImage.medium,
                elemento.season,
                elemento.SeasonYear,
                elemento.title.english,
                elemento.title.romaji,
                temOp,
                ""
              )
            );
            break;

          // so tem ed
          case temOp == 0 && temEd > 0:
            // console.log("    so tem ed");
            tabela.appendChild(
              criaCardAnime(
                elemento.id,
                elemento.coverImage.large,
                elemento.coverImage.medium,
                elemento.season,
                elemento.SeasonYear,
                elemento.title.english,
                elemento.title.romaji,
                "",
                temEd
              )
            );
            break;

          // não tem op nem ed
          default:
            tabela.appendChild(
              criaCardAnime(
                elemento.id,
                elemento.coverImage.large,
                elemento.coverImage.medium,
                elemento.season,
                elemento.SeasonYear,
                elemento.title.english,
                elemento.title.romaji,
                "",
                ""
              )
            );
            break;
        }
      });
    });
}

function mostrarExtra() {
  // esconde o modal dos animes e mostra o modal extra
  document.getElementById("secaoLista").classList.add("esconder");
  document.getElementById("secaoExtra").classList.remove("esconder");

  // apaga o modal extra
  tabelaExtra.innerHTML = "";
}

function esconderExtra() {
  // esconde o modal dos animes e mostra o modal extra
  document.getElementById("secaoExtra").classList.add("esconder");
  document.getElementById("secaoLista").classList.remove("esconder");
}

function resetarLista() {
  var videos = document.querySelectorAll("a");
  for (var i = 0; i < videos.length; i++) {
    videos[i].parentElement.classList.remove("esconder");
  }

  var videos = document.querySelectorAll("p");
  for (var i = 0; i < videos.length; i++) {
    videos[i].parentElement.classList.remove("esconder");
  }
}

// =======================================escolherVoto.js=================================================

var imagemVoto;
var nomeJVoto;
var nomeEVoto;
var escolhaExtra = "nenhum";

function fechar() {
  modal.style.display = "none";
}

function passarEscolha(id, nomeJ, nomeE, imagem) {
  idAnime = id;
  imagemVoto.src = imagem;
  imagemVoto.setAttribute("data-identificacao", idAnime);
  imagemVoto.setAttribute("data-nomeJ", nomeJ);
  imagemVoto.setAttribute("data-nomeE", nomeE);
  imagemVoto.setAttribute("data-extra", "sem");
  nomeJVoto.innerHTML = nomeJ;
  nomeEVoto.innerHTML = nomeE;

  switch (escolhaExtra) {
    case "abertura":
      mostrarExtra();

      var aberturas = animes.filter((item) => item.id == idAnime);

      // var aberturasFiltradas = aberturas[0].opening;
      // console.log(aberturasFiltradas);
      aberturas.forEach((elemento) => {
        var quantidade = elemento.opening.edges.length;
        // console.log(quantidade);
        for (var i = 0; i < quantidade; i++) {
          // console.log(elemento.opening.edges[i].node.op.name);
          tabelaExtra.appendChild(
            criaCardAbertura(
              elemento.id,
              elemento.opening.edges[i].node.op.name,
              elemento.opening.edges[i].node.op.video
            )
          );
        }
      });
      break;

    case "encerramento":
      mostrarExtra();

      var aberturas = animes.filter((item) => item.id == idAnime);

      aberturas.forEach((elemento) => {
        var quantidade = elemento.ending.edges.length;
        for (var i = 0; i < quantidade; i++) {
          tabelaExtra.appendChild(
            criaCardEncerramento(
              elemento.id,
              elemento.ending.edges[i].node.ed.name,
              elemento.ending.edges[i].node.ed.video
            )
          );
        }
      });
      break;

    case "personagemFeminino":
      mostrarExtra();

      var personagens = animes.filter((item) => item.id == idAnime);

      personagensFiltrados = personagens[0].characters.edges;
      personagensFiltrados.forEach((elemento) => {
        if (elemento.node.gender != "Male") {
          tabelaExtra.appendChild(
            criaCardExtra(
              elemento.id,
              animeNomeE,
              animeNomeJ,
              elemento.node.gender,
              elemento.node.name.full,
              elemento.node.image.large
            )
          );
        }
      });
      break;

    case "personagemMasculino":
      mostrarExtra();

      var personagens = animes.filter((item) => item.id == idAnime);

      personagensFiltrados = personagens[0].characters.edges;
      personagensFiltrados.forEach((elemento) => {
        if (elemento.node.gender != "Female") {
          tabelaExtra.appendChild(
            criaCardExtra(
              elemento.id,
              animeNomeE,
              animeNomeJ,
              elemento.node.gender,
              elemento.node.name.full,
              elemento.node.image.large
            )
          );
        }
      });
      break;

    case "personagem":
      mostrarExtra();

      // console.log(idAnime);
      // console.log(animes);
      var personagens = animes.filter((item) => item.id == idAnime);
      // console.log(personagens);
      var animeNomeE = personagens[0].title.english;
      var animeNomeJ = personagens[0].title.romaji;

      personagensFiltrados = personagens[0].characters.edges;
      personagensFiltrados.forEach((elemento) => {
        tabelaExtra.appendChild(
          criaCardExtra(
            elemento.id,
            animeNomeE,
            animeNomeJ,
            elemento.node.gender,
            elemento.node.name.full,
            elemento.node.image.large
          )
        );
      });
      break;

    case "par":
      mostrarExtra();

      // console.log(idAnime);
      // console.log(animes);
      var personagens = animes.filter((item) => item.id == idAnime);
      // console.log(personagens);
      var animeNomeE = personagens[0].title.english;
      var animeNomeJ = personagens[0].title.romaji;

      personagensFiltrados = personagens[0].characters.edges;
      personagensFiltrados.forEach((elemento) => {
        tabelaExtra.appendChild(
          criaCardPar(
            elemento.id,
            animeNomeE,
            animeNomeJ,
            elemento.node.gender,
            elemento.node.name.full,
            elemento.node.image.large
          )
        );
      });
      break;

    default:
      modal.style.display = "none";
      break;
  }
  resetarLista();
}

function passarEscolhaExtra(info, imagemPersonagem) {
  if (imagemPersonagem != null) {
    imagemVoto.src = imagemPersonagem;
  }

  extraVoto.innerHTML = info;
  imagemVoto.setAttribute("data-identificacao", idAnime);
  imagemVoto.setAttribute("data-extra", info);

  document.getElementById("secaoExtra").classList.add("esconder");
  document.getElementById("secaoLista").classList.remove("esconder");

  const video = document.getElementById("video");
  if (video != null) {
    video.pause();
  }

  modal.style.display = "none";
}

function passarEscolhaExtraPar(
  info1,
  info2,
  imagemPersonagem1,
  imagemPersonagem2,
  nomeE,
  nomeJ
) {
  imagemVoto.src = imagemPersonagem1;
  imagemVoto2.src = imagemPersonagem2;

  extraVoto.innerHTML = info1 + " & " + info2;
  imagemVoto.setAttribute("data-identificacao", idAnime);
  imagemVoto.setAttribute("data-nomeE", nomeE);
  imagemVoto.setAttribute("data-nomeJ", nomeJ);
  imagemVoto.setAttribute("data-extra", info1 + " & " + info2);
  imagemVoto.setAttribute("data-imagem2", imagemPersonagem2);

  document.getElementById("secaoExtra").classList.add("esconder");
  document.getElementById("secaoLista").classList.remove("esconder");

  modal.style.display = "none";
}

function filtrarVideo(video) {
  switch (true) {
    case video == "op":
      var videos = document.querySelectorAll("a");
      for (var i = 0; i < videos.length; i++) {
        if (videos[i].textContent == "") {
          videos[i].parentElement.classList.add("esconder");
        }
      }
      break;

    case video == "ed":
      var videos = document.querySelectorAll("p");
      for (var i = 0; i < videos.length; i++) {
        if (videos[i].textContent == "") {
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
    function aberturaEscolherVoto1() {
      document.getElementById("busca").value = "";
      filtrar();
      document.getElementById("busca").value = "";
      filtrar();
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

    function aberturaEscolherVoto2() {
      document.getElementById("busca").value = "";
      filtrar();
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

    function aberturaEscolherVoto3() {
      document.getElementById("busca").value = "";
      filtrar();
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
    function encerramentoEscolherVoto1() {
      document.getElementById("busca").value = "";
      filtrar();
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

    function encerramentoEscolherVoto2() {
      document.getElementById("busca").value = "";
      filtrar();
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

    function encerramentoEscolherVoto3() {
      document.getElementById("busca").value = "";
      filtrar();
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
    function femininoEscolherVoto1() {
      document.getElementById("busca").value = "";
      filtrar();
      esconderExtra();
      escolhaExtra = "personagemFeminino";
      modal.style.display = "block";
      imagemVoto = document.getElementById("femininoImg1");
      nomeJVoto = document.getElementById("femininoNomeJapones1");
      nomeEVoto = document.getElementById("femininoNomeIngles1");
      extraVoto = document.getElementById("femininoNomePersonagem1");
      // votar("feminino1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function femininoEscolherVoto2() {
      document.getElementById("busca").value = "";
      filtrar();
      esconderExtra();
      escolhaExtra = "personagemFeminino";
      modal.style.display = "block";
      imagemVoto = document.getElementById("femininoImg2");
      nomeJVoto = document.getElementById("femininoNomeJapones2");
      nomeEVoto = document.getElementById("femininoNomeIngles2");
      extraVoto = document.getElementById("femininoNomePersonagem2");
      // votar("feminino2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function femininoEscolherVoto3() {
      document.getElementById("busca").value = "";
      filtrar();
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
    function masculinoEscolherVoto1() {
      document.getElementById("busca").value = "";
      filtrar();
      esconderExtra();
      escolhaExtra = "personagemMasculino";
      modal.style.display = "block";
      imagemVoto = document.getElementById("masculinoImg1");
      nomeJVoto = document.getElementById("masculinoNomeJapones1");
      nomeEVoto = document.getElementById("masculinoNomeIngles1");
      extraVoto = document.getElementById("masculinoNomePersonagem1");
      // votar("masculino1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function masculinoEscolherVoto2() {
      document.getElementById("busca").value = "";
      filtrar();
      esconderExtra();
      escolhaExtra = "personagemMasculino";
      modal.style.display = "block";
      imagemVoto = document.getElementById("masculinoImg2");
      nomeJVoto = document.getElementById("masculinoNomeJapones2");
      nomeEVoto = document.getElementById("masculinoNomeIngles2");
      extraVoto = document.getElementById("masculinoNomePersonagem2");
      // votar("masculino2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function masculinoEscolherVoto3() {
      document.getElementById("busca").value = "";
      filtrar();
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
    function surpresaEscolherVoto1() {
      document.getElementById("busca").value = "";
      filtrar();
      escolhaExtra = "false";
      modal.style.display = "block";
      imagemVoto = document.getElementById("surpresaImg1");
      nomeJVoto = document.getElementById("surpresaNomeJapones1");
      nomeEVoto = document.getElementById("surpresaNomeIngles1");
      // votar("surpresa1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function surpresaEscolherVoto2() {
      document.getElementById("busca").value = "";
      filtrar();
      escolhaExtra = "false";
      modal.style.display = "block";
      imagemVoto = document.getElementById("surpresaImg2");
      nomeJVoto = document.getElementById("surpresaNomeJapones2");
      nomeEVoto = document.getElementById("surpresaNomeIngles2");
      // votar("surpresa2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function surpresaEscolherVoto3() {
      document.getElementById("busca").value = "";
      filtrar();
      escolhaExtra = "false";
      modal.style.display = "block";
      imagemVoto = document.getElementById("surpresaImg3");
      nomeJVoto = document.getElementById("surpresaNomeJapones3");
      nomeEVoto = document.getElementById("surpresaNomeIngles3");
      // votar("surpresa3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }
  }

  {
    function decepcaoEscolherVoto1() {
      document.getElementById("busca").value = "";
      filtrar();
      escolhaExtra = "false";
      modal.style.display = "block";
      imagemVoto = document.getElementById("decepcaoImg1");
      nomeJVoto = document.getElementById("decepcaoNomeJapones1");
      nomeEVoto = document.getElementById("decepcaoNomeIngles1");
      // votar("decepcao1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function decepcaoEscolherVoto2() {
      document.getElementById("busca").value = "";
      filtrar();
      escolhaExtra = "false";
      modal.style.display = "block";
      imagemVoto = document.getElementById("decepcaoImg2");
      nomeJVoto = document.getElementById("decepcaoNomeJapones2");
      nomeEVoto = document.getElementById("decepcaoNomeIngles2");
      // votar("decepcao2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function decepcaoEscolherVoto3() {
      document.getElementById("busca").value = "";
      filtrar();
      escolhaExtra = "false";
      modal.style.display = "block";
      imagemVoto = document.getElementById("decepcaoImg3");
      nomeJVoto = document.getElementById("decepcaoNomeJapones3");
      nomeEVoto = document.getElementById("decepcaoNomeIngles3");
      // votar("decepcao3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }
  }

  {
    function animacaoEscolherVoto1() {
      document.getElementById("busca").value = "";
      filtrar();
      escolhaExtra = "false";
      modal.style.display = "block";
      imagemVoto = document.getElementById("animacaoImg1");
      nomeJVoto = document.getElementById("animacaoNomeJapones1");
      nomeEVoto = document.getElementById("animacaoNomeIngles1");
      // votar("animacao1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function animacaoEscolherVoto2() {
      document.getElementById("busca").value = "";
      filtrar();
      escolhaExtra = "false";
      modal.style.display = "block";
      imagemVoto = document.getElementById("animacaoImg2");
      nomeJVoto = document.getElementById("animacaoNomeJapones2");
      nomeEVoto = document.getElementById("animacaoNomeIngles2");
      // votar("animacao2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function animacaoEscolherVoto3() {
      document.getElementById("busca").value = "";
      filtrar();
      escolhaExtra = "false";
      modal.style.display = "block";
      imagemVoto = document.getElementById("animacaoImg3");
      nomeJVoto = document.getElementById("animacaoNomeJapones3");
      nomeEVoto = document.getElementById("animacaoNomeIngles3");
      // votar("animacao3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }
  }

  {
    function antagonistaEscolherVoto1() {
      document.getElementById("busca").value = "";
      filtrar();
      esconderExtra();
      escolhaExtra = "personagem";
      modal.style.display = "block";
      imagemVoto = document.getElementById("antagonistaImg1");
      nomeJVoto = document.getElementById("antagonistaNomeJapones1");
      nomeEVoto = document.getElementById("antagonistaNomeIngles1");
      extraVoto = document.getElementById("antagonistaNomePersonagem1");
      // votar("antagonista1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function antagonistaEscolherVoto2() {
      document.getElementById("busca").value = "";
      filtrar();
      esconderExtra();
      escolhaExtra = "personagem";
      modal.style.display = "block";
      imagemVoto = document.getElementById("antagonistaImg2");
      nomeJVoto = document.getElementById("antagonistaNomeJapones2");
      nomeEVoto = document.getElementById("antagonistaNomeIngles2");
      extraVoto = document.getElementById("antagonistaNomePersonagem2");
      // votar("antagonista2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function antagonistaEscolherVoto3() {
      document.getElementById("busca").value = "";
      filtrar();
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
    function parEscolherVoto1() {
      document.getElementById("busca").value = "";
      filtrar();
      esconderExtra();
      escolhaExtra = "par";
      modal.style.display = "block";
      imagemVoto = document.getElementById("par1Img1");
      imagemVoto2 = document.getElementById("par2Img1");
      nomeJVoto = document.getElementById("parNomeJapones1");
      nomeEVoto = document.getElementById("parNomeIngles1");
      extraVoto = document.getElementById("parNomePar1");
      // votar("par1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function parEscolherVoto2() {
      document.getElementById("busca").value = "";
      filtrar();
      esconderExtra();
      escolhaExtra = "par";
      modal.style.display = "block";
      imagemVoto = document.getElementById("par1Img2");
      imagemVoto2 = document.getElementById("par2Img2");
      nomeJVoto = document.getElementById("parNomeJapones2");
      nomeEVoto = document.getElementById("parNomeIngles2");
      extraVoto = document.getElementById("parNomePar2");
      // votar("par2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function parEscolherVoto3() {
      document.getElementById("busca").value = "";
      filtrar();
      esconderExtra();
      escolhaExtra = "par";
      modal.style.display = "block";
      imagemVoto = document.getElementById("par1Img3");
      imagemVoto2 = document.getElementById("par2Img3");
      nomeJVoto = document.getElementById("parNomeJapones3");
      nomeEVoto = document.getElementById("parNomeIngles3");
      extraVoto = document.getElementById("parNomePar3");
      // votar("par3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }
  }

  {
    function doenteEscolherVoto1() {
      document.getElementById("busca").value = "";
      filtrar();
      esconderExtra();
      escolhaExtra = "personagem";
      modal.style.display = "block";
      imagemVoto = document.getElementById("doenteImg1");
      nomeJVoto = document.getElementById("doenteNomeJapones1");
      nomeEVoto = document.getElementById("doenteNomeIngles1");
      extraVoto = document.getElementById("doenteNomePersonagem1");
      // votar("doente1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function doenteEscolherVoto2() {
      document.getElementById("busca").value = "";
      filtrar();
      esconderExtra();
      escolhaExtra = "personagem";
      modal.style.display = "block";
      imagemVoto = document.getElementById("doenteImg2");
      nomeJVoto = document.getElementById("doenteNomeJapones2");
      nomeEVoto = document.getElementById("doenteNomeIngles2");
      extraVoto = document.getElementById("doenteNomePersonagem2");
      // votar("doente2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function doenteEscolherVoto3() {
      document.getElementById("busca").value = "";
      filtrar();
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
    function emocaoEscolherVoto1() {
      document.getElementById("busca").value = "";
      filtrar();
      escolhaExtra = "false";
      modal.style.display = "block";
      imagemVoto = document.getElementById("emocaoImg1");
      nomeJVoto = document.getElementById("emocaoNomeJapones1");
      nomeEVoto = document.getElementById("emocaoNomeIngles1");
      // votar("emocao1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function emocaoEscolherVoto2() {
      document.getElementById("busca").value = "";
      filtrar();
      escolhaExtra = "false";
      modal.style.display = "block";
      imagemVoto = document.getElementById("emocaoImg2");
      nomeJVoto = document.getElementById("emocaoNomeJapones2");
      nomeEVoto = document.getElementById("emocaoNomeIngles2");
      // votar("emocao2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function emocaoEscolherVoto3() {
      document.getElementById("busca").value = "";
      filtrar();
      escolhaExtra = "false";
      modal.style.display = "block";
      imagemVoto = document.getElementById("emocaoImg3");
      nomeJVoto = document.getElementById("emocaoNomeJapones3");
      nomeEVoto = document.getElementById("emocaoNomeIngles3");
      // votar("emocao3", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }
  }

  {
    function animeEscolherVoto1() {
      document.getElementById("busca").value = "";
      filtrar();
      escolhaExtra = "false";
      modal.style.display = "block";
      imagemVoto = document.getElementById("animeImg1");
      nomeJVoto = document.getElementById("animeNomeJapones1");
      nomeEVoto = document.getElementById("animeNomeIngles1");
      // votar("anime1", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function animeEscolherVoto2() {
      document.getElementById("busca").value = "";
      filtrar();
      escolhaExtra = "false";
      modal.style.display = "block";
      imagemVoto = document.getElementById("animeImg2");
      nomeJVoto = document.getElementById("animeNomeJapones2");
      nomeEVoto = document.getElementById("animeNomeIngles2");
      // votar("anime2", idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
    }

    function animeEscolherVoto3() {
      document.getElementById("busca").value = "";
      filtrar();
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
