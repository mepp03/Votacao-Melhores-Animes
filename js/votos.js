var ano = "2021";
var temporada = "Winter"
var dados;

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

        console.log(tipo);
        if (tipo == "abertura" || tipo == "encerramento" || tipo == "feminino" || tipo == "masculino" || tipo == "antagonista" || tipo == "par" ||
          tipo == "doente") 
        {
          if (extraVoto != "sem") 
          {
            votar(categoria, tipo, posicao, idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
          }
        } else
        {
          votar(categoria, tipo, posicao, idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);
        }
      }
    });
  });

  observer.observe(element, { attributes: true });
});

function votar(categoria, tipo, posicao, idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto)
{
  var idCat;
  var ordinal;
  var pontuacao;

  switch (tipo) 
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
    case "par":
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
  }

  fetch(`http://localhost:3000/votos2021Winter/${idCat}`)
    .then(response => response.json())
    .then(data =>
    {
      dados = data;

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

      dados[tipo].leandro[ordinal] = Object.assign(dados[tipo].leandro[ordinal],
        {
          id: idVoto,
          nomeJ: nomeJVoto,
          nomeE: nomeEVoto,
          imagem: imagemVoto,
          extra: extraVoto,
          ponto: pontuacao
        });

      fetch(`http://localhost:3000/votos2021Winter/${idCat}`,
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

  // function colocar(categoria)
  // {
  //   dados.abertura.leandro.primeiro = Object.assign(dados.abertura.leandro.primeiro,
  //     {
  //       id: idVoto,
  //       nomeJ: nomeJVoto,
  //       nomeE: nomeEVoto,
  //       imagem: imagemVoto,
  //       musica: extraVoto,
  //       if (condition) 
  //       {          
  //         ponto: '3'
  //       }
  //     });

  //   // switch (categoria)
  //   // {
  //   //   case "aberturaImg1":
  //   //     dados.abertura.leandro.primeiro = Object.assign(dados.abertura.leandro.primeiro,
  //   //       {
  //   //         id: idVoto,
  //   //         nomeJ: nomeJVoto,
  //   //         nomeE: nomeEVoto,
  //   //         imagem: imagemVoto,
  //   //         musica: extraVoto,
  //   //         ponto: '3'
  //   //       });
  //   //     break;
  //   //   case "aberturaImg2":
  //   //     dados.abertura.leandro.segundo = Object.assign(dados.abertura.leandro.segundo,
  //   //       {
  //   //         id: idVoto,
  //   //         nomeJ: nomeJVoto,
  //   //         nomeE: nomeEVoto,
  //   //         imagem: imagemVoto,
  //   //         musica: extraVoto,
  //   //         ponto: '2'
  //   //       });
  //   //     break;
  //   //   case "aberturaImg3":
  //   //     dados.abertura.leandro.terceiro = Object.assign(dados.abertura.leandro.terceiro,
  //   //       {
  //   //         id: idVoto,
  //   //         nomeJ: nomeJVoto,
  //   //         nomeE: nomeEVoto,
  //   //         imagem: imagemVoto,
  //   //         musica: extraVoto,
  //   //         ponto: '1'
  //   //       });
  //   //     break;

  //   //   case "encerramentoImg1":
  //   //     dados.encerramento.leandro.primeiro = Object.assign(dados.encerramento.leandro.primeiro,
  //   //       {
  //   //         id: idVoto,
  //   //         nomeJ: nomeJVoto,
  //   //         nomeE: nomeEVoto,
  //   //         imagem: imagemVoto,
  //   //         musica: extraVoto,
  //   //         ponto: '3'
  //   //       });
  //   //     break;
  //   //   case "encerramentoImg2":
  //   //     dados.encerramento.leandro.segundo = Object.assign(dados.encerramento.leandro.segundo,
  //   //       {
  //   //         id: idVoto,
  //   //         nomeJ: nomeJVoto,
  //   //         nomeE: nomeEVoto,
  //   //         imagem: imagemVoto,
  //   //         musica: extraVoto,
  //   //         ponto: '2'
  //   //       });
  //   //     break;
  //   //   case "encerramentoImg3":
  //   //     dados.encerramento.leandro.terceiro = Object.assign(dados.encerramento.leandro.terceiro,
  //   //       {
  //   //         id: idVoto,
  //   //         nomeJ: nomeJVoto,
  //   //         nomeE: nomeEVoto,
  //   //         imagem: imagemVoto,
  //   //         musica: extraVoto,
  //   //         ponto: '1'
  //   //       });
  //   //     break;
  //   //   default:
  //   //     break;
  //   // }

  //   // Enviando os dados atualizados de volta para o servidor
  //   fetch(`http://localhost:3000/votos2021Winter/${idCat}`,
  //     {
  //       method: 'PUT',
  //       body: JSON.stringify(dados),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     .then(response => response.json())
  //     .then(dados =>
  //     {
  //       console.log('Dados salvos com sucesso:', dados);
  //     })
  //     .catch(error =>
  //     {
  //       console.error('Erro ao salvar dados:', error);
  //     });
  // }
}