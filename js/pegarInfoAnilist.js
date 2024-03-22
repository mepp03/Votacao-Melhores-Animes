var animes = [];
var ano = document.getElementById('ano').value;;
var estacao = estacao = document.getElementById('estacao').value;
const jsonString = `[]`;
var obj = JSON.parse(jsonString);
var anilist;
var votos = {};

// Adicione um ouvinte de evento ao cabeçalho assim que o script for carregado
document.addEventListener("DOMContentLoaded", function ()
{
    const pegarDados = document.querySelector('#cabecalho');
    pegarDados.addEventListener('change', function ()
    {
        ano = document.getElementById('ano').value;
        estacao = document.getElementById('estacao').value;
        atualizarValores(ano, estacao);
    });
});

//query para buscar os anime por temporada
const queryTemporada =
    `   
    query ($pagina: Int, $porPagina: Int, $ano: Int, $estacao: MediaSeason) 
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
            media (seasonYear: $ano, season: $estacao, type: ANIME, isAdult: false, sort: TITLE_ROMAJI) 
            { 
                id
                averageScore
                episodes
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

// query para buscar um anime por ID
const queryId = `
    query ($id: Int) {
        Media (id: $id, type: ANIME) { 
            id
            averageScore
            episodes
            title {
                romaji
                english
            }
            seasonYear
            season
            coverImage {
                large
                medium
            }    
            characters {
                edges {
                    node {
                        name {
                            full
                        }
                        image {
                            large
                        }
                        gender
                    }
                }
            }
        }
    }
`;

async function pegarTemporada()
{
    animes = [];
    ano = document.getElementById("ano").value;
    estacao = document.getElementById("estacao").value;

    try
    {
        for (let index = 1; index <= 3; index++)
        {
            var variables = {
                busca: "",
                ano: ano,
                estacao: estacao,
                pagina: index,
                porPagina: 50
            };

            var url = 'https://graphql.anilist.co',
                options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        query: queryTemporada,
                        variables: variables
                    })
                };

            const response = await fetch(url, options);
            const data = await response.json();
            const filtrado = data.data.Page.media.filter(item => item.averageScore != null);
            filtrado.forEach(anime =>
            {
                anime.opening = {
                    edges: []
                };
                anime.ending = {
                    edges: []
                };
            });
            animes.push(...filtrado);
        }

        // Atualiza a interface do usuário para exibir os novos animes
        anilist = 1;
        atualizarValores(ano, estacao, undefined, 1); 
        
    } catch (error)
    {
        console.error(error);
    }
}

// Função para buscar os dados de um anime por ID usando GraphQL
async function pegarAnimeId(id)
{
    try
    {
        const variables = {
            id: id
        };

        const url = 'https://graphql.anilist.co',
            options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: queryId,
                    variables: variables
                })
            };

        const response = await fetch(url, options);
        const data = await response.json();

        // Adiciona o anime no início do array
        var animeNovo = data.data.Media;
        // Adiciona as propriedades opening e ending com edges vazios
        animeNovo.opening = { edges: [] };
        animeNovo.ending = { edges: [] };
        console.log(animeNovo);
        // Atualiza a interface do usuário para exibir o novo anime
        atualizarValores(ano, estacao, animeNovo);
    } catch (error)
    {
        console.error('Erro ao buscar os dados do anime por ID:', error);
    }
}

// evento dos botões
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('salvar')) {
        pegarAlteracoes();
        salvarValores(ano, estacao);
    } else if (event.target.classList.contains('apagar')) {
        const animeDiv = event.target.closest('.anime-box');
        animeDiv.remove();
    } else if (event.target.classList.contains('add-abertura')) {
        criarInput('abertura', event.target);
    } else if (event.target.classList.contains('add-encerramento')) {
        criarInput('encerramento', event.target);
    }
});

// Função auxiliar para criar um novo op_ed
function criarInput(tipo, clickedElement) {
    const animeBox = clickedElement.closest('.anime-box');
    if (animeBox) {
        // Cria o novo op_ed
        const novoOpEd = document.createElement("div");
        novoOpEd.className = "op_ed " + tipo;

        const labelNome = document.createElement("label");
        labelNome.textContent = tipo === 'abertura' ? 'Nome da Abertura: ' : 'Nome do Encerramento: ';

        const inputNome = document.createElement("input");
        inputNome.type = "text";
        inputNome.id = tipo === 'abertura' ? 'nomeOp' : 'nomeEd'; // Define o ID com base no tipo

        const labelVideo = document.createElement("label");
        labelVideo.textContent = tipo === 'abertura' ? 'Vídeo da Abertura: ' : 'Vídeo do Encerramento: ';

        const inputVideo = document.createElement("input");
        inputVideo.type = "text";
        inputVideo.id = tipo === 'abertura' ? 'videoOp' : 'videoEd'; // Define o ID com base no tipo

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "x";
        botaoRemover.onclick = function () {
            novoOpEd.parentNode.removeChild(novoOpEd);
        };

        novoOpEd.appendChild(labelNome);
        novoOpEd.appendChild(inputNome);
        novoOpEd.appendChild(labelVideo);
        novoOpEd.appendChild(inputVideo);
        novoOpEd.appendChild(botaoRemover);

        // Adiciona o novo op_ed ao contêiner apropriado
        if (tipo === 'abertura') {
            const containerOp = animeBox.querySelector('.container__op');
            if (containerOp) {
                containerOp.appendChild(novoOpEd);
            }
        } else if (tipo === 'encerramento') {
            const containerEd = animeBox.querySelector('.container__ed');
            if (containerEd) {
                containerEd.appendChild(novoOpEd);
            }
        }
    }
}

// Adicione uma função para atualizar os valores na página com base no primeiro item do objeto
function atualizarValores(ano, estacao, animeNovo, anilist)
{
    limparValores();
    switch (estacao)
    {
        case "WINTER":
            estacao = "Inverno";
            break;
        case "SPRING":
            estacao = "Primavera";
            break;
        case "SUMMER":
            estacao = "Verao";
            break;
        case "FALL":
            estacao = "Outono";
            break;
    }
    fetch(`https://dados-animes.glitch.me/${ano}${estacao}`)
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            votos = data.votos;
            obj = data.dados; // Atualize o objeto obj com os dados recebidos
            if (animeNovo !== undefined)
            {
                obj.unshift(animeNovo);
            }

            if (anilist == 1) 
            {
                obj = animes;
            }
            // Itera sobre cada item do objeto e cria os elementos correspondentes na página
            obj.forEach((item, index) =>
            {
                if (!document.querySelector(`.anime-box[data-id="${item.id}"]`))
                {
                    // Verifica se o anime já está na página
                    const animeDiv = document.createElement('div');
                    animeDiv.classList.add('anime-box');
                    animeDiv.dataset.id = item.id;

                    const image = document.createElement('img');
                    image.src = item.coverImage.large;
                    animeDiv.appendChild(image);

                    // Adiciona o elemento de texto para mostrar a quantidade de episódios
                    const episodesText = document.createElement('p');
                    episodesText.textContent = `Episódios: ${item.episodes}`;
                    animeDiv.appendChild(episodesText);

                    const infoDiv = document.createElement('div');
                    infoDiv.id = "info";
                    infoDiv.classList.add('item-container');

                    const japaneseNameLabel = document.createElement('label');
                    japaneseNameLabel.textContent = 'Nome em japonês:';
                    infoDiv.appendChild(japaneseNameLabel);
                    const japaneseNameInput = document.createElement('input');
                    japaneseNameInput.type = 'text';
                    japaneseNameInput.id = "nomeJapones";
                    japaneseNameInput.value = item.title.romaji;
                    infoDiv.appendChild(japaneseNameInput);

                    const englishNameLabel = document.createElement('label');
                    englishNameLabel.textContent = 'Nome em inglês:';
                    infoDiv.appendChild(englishNameLabel);
                    const englishNameInput = document.createElement('input');
                    englishNameInput.id = "nomeIngles";
                    englishNameInput.type = 'text';
                    englishNameInput.value = item.title.english;
                    infoDiv.appendChild(englishNameInput);

                    const openingContainer = document.createElement('div');
                    openingContainer.classList.add('container__op');
                    const openingLabel = document.createElement('label');
                    openingLabel.textContent = 'Abertura:';
                    openingContainer.appendChild(openingLabel);

                    // Verifica se há dados nas aberturas antes de criar os campos
                    if (item.opening.edges.length > 0)
                    {
                        item.opening.edges.forEach((edge) =>
                        {
                            const openingOpEd = criarNovoOpEd('abertura', edge.node.op.name, edge.node.op.video);
                            openingContainer.appendChild(openingOpEd);
                        });
                    }

                    const addOpeningButton = document.createElement('button');
                    addOpeningButton.textContent = '+ Adicionar Abertura';
                    addOpeningButton.classList.add('round-button', 'add-abertura');
                    openingContainer.appendChild(addOpeningButton);

                    infoDiv.appendChild(openingContainer);

                    const endingContainer = document.createElement('div');
                    endingContainer.classList.add('container__ed');
                    const endingLabel = document.createElement('label');
                    endingLabel.textContent = 'Encerramento:';
                    endingContainer.appendChild(endingLabel);

                    // Verifica se há dados nos encerramentos antes de criar os campos
                    if (item.ending.edges.length > 0)
                    {
                        item.ending.edges.forEach((edge) =>
                        {
                            const endingOpEd = criarNovoOpEd('encerramento', edge.node.ed.name, edge.node.ed.video);
                            endingContainer.appendChild(endingOpEd);
                        });
                    }

                    const addEndingButton = document.createElement('button');
                    addEndingButton.textContent = '+ Adicionar Encerramento';
                    addEndingButton.classList.add('round-button', 'add-encerramento');
                    endingContainer.appendChild(addEndingButton);

                    infoDiv.appendChild(endingContainer);

                    animeDiv.appendChild(infoDiv);

                    const escolhaDiv = document.createElement('div');
                    escolhaDiv.id = "escolha";

                    const buttonSalvar = document.createElement('button');
                    buttonSalvar.textContent = "Salvar";
                    buttonSalvar.classList.add('salvar');
                    escolhaDiv.appendChild(buttonSalvar);

                    const buttonApagar = document.createElement('button');
                    buttonApagar.textContent = "Apagar";
                    buttonApagar.classList.add('apagar');
                    escolhaDiv.appendChild(buttonApagar);

                    animeDiv.appendChild(escolhaDiv);

                    document.getElementById('lista').appendChild(animeDiv);
                }
            });
        });
}

// Função auxiliar para criar um novo op_ed
function criarNovoOpEd(tipo, nome, video)
{
    const novoOpEd = document.createElement("div");
    novoOpEd.className = "op_ed " + tipo;

    const labelNome = document.createElement("label");
    labelNome.textContent = tipo === 'abertura' ? 'Nome da Abertura: ' : 'Nome do Encerramento: ';

    const inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.id = tipo === 'abertura' ? 'nomeOp' : 'nomeEd'; // Define o ID com base no tipo
    inputNome.value = nome;

    const labelVideo = document.createElement("label");
    labelVideo.textContent = tipo === 'abertura' ? 'Vídeo da Abertura: ' : 'Vídeo do Encerramento: ';

    const inputVideo = document.createElement("input");
    inputVideo.type = "text";
    inputVideo.id = tipo === 'abertura' ? 'videoOp' : 'videoEd'; // Define o ID com base no tipo
    inputVideo.value = video;

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "x";
    botaoRemover.onclick = function ()
    {
        novoOpEd.parentNode.removeChild(novoOpEd);
    };

    novoOpEd.appendChild(labelNome);
    novoOpEd.appendChild(inputNome);
    novoOpEd.appendChild(labelVideo);
    novoOpEd.appendChild(inputVideo);
    novoOpEd.appendChild(botaoRemover);

    return novoOpEd;
}

// Adicione uma função para limpar os valores na página
function limparValores()
{
    const lista = document.getElementById('lista');
    while (lista.firstChild)
    {
        lista.removeChild(lista.firstChild);
    }
};

// Função para pegar as alterações
function pegarAlteracoes()
{
    // Limpa o array de animes antes de adicionar os valores atualizados
    animes = [];

    // Seleciona todos os elementos com a classe "anime-box"
    const animeBoxes = document.querySelectorAll('.anime-box');

    // Itera sobre cada "anime-box"
    animeBoxes.forEach((animeBox) =>
    {
        // Obtém o ID do anime
        const animeId = animeBox.dataset.id;

        // Encontra o objeto correspondente ao anime usando o ID
        const anime = obj.find((item) => item.id == animeId);

        // Verifica se o anime foi encontrado
        if (anime)
        {
            const abertura = animeBox.querySelectorAll('.op_ed.abertura');
            const encerramento = animeBox.querySelectorAll('.op_ed.encerramento');

            // Limpa os arrays de abertura e encerramento
            anime.opening = { edges: [] };
            anime.ending = { edges: [] };

            // Adiciona novos nós de abertura
            abertura.forEach((op) =>
            {
                const openingNameInput = op.querySelector('#nomeOp');
                const openingVideoInput = op.querySelector('#videoOp');

                const newOpening = {
                    node: {
                        op: {
                            name: openingNameInput.value,
                            video: openingVideoInput.value
                        }
                    }
                };

                anime.opening.edges.push(newOpening);
            });

            // Adiciona novos nós de encerramento
            encerramento.forEach((ed) =>
            {
                const endingNameInput = ed.querySelector('#nomeEd');
                const endingVideoInput = ed.querySelector('#videoEd');

                const newEnding = {
                    node: {
                        ed: {
                            name: endingNameInput.value,
                            video: endingVideoInput.value
                        }
                    }
                };

                anime.ending.edges.push(newEnding);
            });

            // Obtém os inputs dentro da "anime-box" atual
            const japaneseNameInput = animeBox.querySelector('#nomeJapones');
            const englishNameInput = animeBox.querySelector('#nomeIngles');

            // Atualiza os valores do anime com os valores dos inputs
            anime.title.romaji = japaneseNameInput.value;
            anime.title.english = englishNameInput.value;

            // Adiciona o anime atualizado ao array animes
            animes.push(anime);
        }
    });
}


// Adicione uma função para salvar os valores
function salvarValores(ano, estacao)
{
    switch (estacao)
    {
        case "WINTER":
            estacao = "Inverno";
            break;
        case "SPRING":
            estacao = "Primavera";
            break;
        case "SUMMER":
            estacao = "Verao";
            break;
        case "FALL":
            estacao = "Outono";
            break;
    }
    // Ordena os animes pelo título "romaji"
    obj.sort((a, b) => (a.title.romaji > b.title.romaji) ? 1 : -1);

    // Substitui os valores null por strings vazias na string JSON
    let jsonString = JSON.stringify(obj);
    jsonString = jsonString.replace(/: null/g, ': ""');

    // Remove as aspas simples
    jsonString = jsonString.replace(/'/g, "");
    console.log(ano, estacao);

    // Cria um objeto com a estrutura correta
    const data = {};
    data.dados = JSON.parse(jsonString);
    data.votos = votos;

    fetch(`https://dados-animes.glitch.me/${ano}${estacao}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
}

// Chame a função para atualizar os valores
atualizarValores(ano, estacao);