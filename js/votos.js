var ano = "2021";
var temporada = "Winter"
var dados;

const elements = document.querySelectorAll('[data-identificacao]');

elements.forEach(function(element) {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'data-identificacao') {
        var categoria = mutation.target.id;
        var idVoto = mutation.target.getAttribute('data-identificacao');
        var imagemVoto = mutation.target.src;
        var nomeJVoto = mutation.target.getAttribute('data-nomeJ');
        var nomeEVoto = mutation.target.getAttribute('data-nomeE');
        var extraVoto = mutation.target.getAttribute('data-extra');

        votar(categoria, idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto);

      }
    });
  });

  observer.observe(element, { attributes: true });
});

function votar(categoria, idVoto, imagemVoto, nomeJVoto, nomeEVoto, extraVoto)
{
    const votos = document.querySelectorAll('[data-identificacao]');

    // for (var i = 0; i < votos.length; i++)
    // {
        // console.log(votos[i].getAttribute('data-identificacao'));

        fetch('http://localhost:3000/votos2021Winter/01')
            .then(response => response.json())
            .then(data =>
            {
                dados = data;
                colocar();
            });

        function colocar()
        {
            dados.abertura.leandro.primeiro = Object.assign(dados.abertura.leandro.primeiro, {
                id: idVoto,
                nomeJ: nomeJVoto,
                nomeE: nomeEVoto,
                imagem: imagemVoto,
                musica: extraVoto,
                ponto: '3'
            });

            console.log(dados.abertura.leandro.primeiro);
            // Enviando os dados atualizados de volta para o servidor
                fetch('http://localhost:3000/votos2021Winter/01', {
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
            // }

        }
    }