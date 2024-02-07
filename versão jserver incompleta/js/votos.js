var temporada = localStorage.getItem('temporada');
var dados;
var nome = localStorage.getItem("usuario");

const elements = document.querySelectorAll('[data-identificacao]');
        

elements.forEach(function (element)
{
  const observer = new MutationObserver(function (mutations)
  {
    mutations.forEach(function (mutation)
    {
      if (mutation.attributeName === 'data-identificacao')
      {
        var categoria = mutation.target.id;
        var idVoto = mutation.target.getAttribute('data-identificacao');
        var imagemVoto = mutation.target.src;
        var nomeJVoto = mutation.target.getAttribute('data-nomeJ');
        var nomeEVoto = mutation.target.getAttribute('data-nomeE');
        var extraVoto = mutation.target.getAttribute('data-extra');

        var partes = categoria.split("Img");
        var tipo = partes[0];
        var posicao = partes[1];
        if (tipo == "abertura" || tipo == "encerramento" || tipo == "feminino" || tipo == "masculino" || tipo == "antagonista" || tipo == "par1" ||
          tipo == "doente") 
        {
          if (extraVoto != "sem") 
          {
            var imagemVoto2 = mutation.target.getAttribute('data-imagem2');
            salvar(categoria, tipo, posicao, idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto, imagemVoto2);
          }
        } else
        {
          salvar(categoria, tipo, posicao, idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
          teste;
        }
      }
    });
  });

  observer.observe(element, { attributes: true });
});

function salvar(categoria, tipo, posicao, idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto, imagemVoto2)
{
  var idCat;
  var ordinal;
  var pontuacao;

  switch (tipo) 
  {
    case "abertura":
      idCat = "0";
      break;
    case "encerramento":
      idCat = "1";
      break;
    case "feminino":
      idCat = "2";
      break;
    case "masculino":
      idCat = "3";
      break;
    case "surpresa":
      idCat = "4";
      break;
    case "decepcao":
      idCat = "5";
      break;
    case "animacao":
      idCat = "6";
      break;
    case "antagonista":
      idCat = "7";
      break;
    case "par1":
      idCat = "8";
      break;
    case "doente":
      idCat = "9";
      break;
    case "emocao":
      idCat = "10";
      break;
    case "anime":
      idCat = "11";
      break;
    default:
      console.log("deu ruim");
      // idCat = "09";
      break
  }
  // fetch(`http://localhost:3000/votos${ano}${temporada}/${idCat}`)
  fetch(`http://127.0.0.1:5500/votos${temporada}.json`)
    .then(response => response.json())
    .then(data =>
    {
      console.log(data);
      dados = data.votos[idCat];

      switch (posicao) 
      {
        case "1":
          ordinal = "primeiro";
          pontuacao = "3";
          break;
        case "2":
          ordinal = "segundo";
          pontuacao = "2";
          break;
        case "3":
          ordinal = "terceiro";
          pontuacao = "1";
          break;
      }
      if (idCat == "09") 
      {
        console.log(dados.par[nome][ordinal]);
        dados.par[nome][ordinal] = Object.assign(dados.par[nome][ordinal],
          {
            id: idVoto,
            nomeJ: nomeJVoto,
            nomeE: nomeEVoto,
            imagem: imagemVoto,
            imagem2: imagemVoto2,
            extra: extraVoto,
            ponto: pontuacao
          });
      } else 
      {
        dados[tipo][nome][ordinal] = Object.assign(dados[tipo][nome][ordinal],
          {
            id: idVoto,
            nomeJ: nomeJVoto,
            nomeE: nomeEVoto,
            imagem: imagemVoto,
            extra: extraVoto,
            ponto: pontuacao
          });
      }
      fetch(`http://localhost:3000/votos${temporada}/${idCat}`,
        {
          method: 'PUT',
          body: JSON.stringify(dados),
          headers: {
            'Content-Type': 'application/json'
          }
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