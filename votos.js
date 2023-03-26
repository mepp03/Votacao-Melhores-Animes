var ano = "2021";
var temporada = "Winter"
var dados;

fetch('votos' + ano + temporada + '.json')
    .then(response => response.json())
    .then(data =>
    {
        // data[0].abertura.leandro.primeiro.id = '123';
        // data[0].abertura.leandro.primeiro.nomeJ = 'Nome em japonês';
        // data[0].abertura.leandro.primeiro.nomeE = 'Nome em inglês';
        // data[0].abertura.leandro.primeiro.imagem = 'imagem.jpg';
        // data[0].abertura.leandro.primeiro.musica = 'música.mp3';
        // data[0].abertura.leandro.primeiro.ponto = 'ponto';
        dados = data;
        colocar();
        console.log(data[0].abertura.leandro);
    });

function colocar()
{
    dados[0].abertura.leandro.primeiro = Object.assign(dados[0].abertura.leandro.primeiro, {
        id: '123',
        nomeJ: 'Horimiya',
        nomeE: 'Horimiya',
        imagem: 'algo.jpg',
        musica: 'Iro Kousui',
        ponto: '3'
    });
}

// Enviando os dados atualizados de volta para o servidor
fetch('votos' + ano + temporada + '.json', {
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


    