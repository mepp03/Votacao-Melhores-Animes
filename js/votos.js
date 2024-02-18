var temporada = localStorage.getItem('temporada');
// var temporada = "2019Inverno"
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

function salvar(categoria, tipo, posicao, idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto, imagemVoto2) {
  var idCat;
  var ordinal;
  var pontuacao;

  switch (tipo) {
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
      return; // Se o tipo não for reconhecido, saímos da função
  }

  fetch(`http://localhost:3000/votos/${idCat}`)
    .then(response => response.json())
    .then(data => {
      var partes = categoria.split("Img");
      var tipo = partes[0];
      if (tipo == "par1") {tipo = "par"}
      var dados = data[tipo]; // Obtenha os dados específicos para este tipo
      var nomeObjeto = dados[nome]; // Obtenha o objeto correspondente ao nome do usuário

      switch (posicao) {
        case "1":
          ordinal = "primeiro";
          pontuacao = 3;
          break;
        case "2":
          ordinal = "segundo";
          pontuacao = 2;
          break;
        case "3":
          ordinal = "terceiro";
          pontuacao = 1;
          break;
        default:
          console.log("Posição inválida");
          return; // Se a posição não for válida, saímos da função
      }

      var objetoVoto = {
        id: idVoto,
        nomeJ: nomeJVoto,
        nomeE: nomeEVoto,
        imagem: imagemVoto,
        extra: extraVoto,
        ponto: pontuacao
      };

      if (idCat == "09") {
        objetoVoto.imagem2 = imagemVoto2;
      }

      if (!nomeObjeto.hasOwnProperty(ordinal)) {
        console.log("Objeto não encontrado para", nome, ordinal);
        return; // Se o objeto correspondente não for encontrado, saímos da função
      }

      nomeObjeto[ordinal] = objetoVoto; // Atualize o objeto correspondente

      fetch(`http://localhost:3000/votos/${idCat}`, {
        method: 'PUT',
        body: JSON.stringify(data), // Envie os dados atualizados
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(dados => {
        console.log('Dados salvos com sucesso:', dados);
      })
      .catch(error => {
        console.error('Erro ao salvar dados:', error);
      });
    })
    .catch(error => {
      console.error('Erro ao obter os dados:', error);
    });
}
