const jsonString = `[]`;
var animes = [];
var obj = JSON.parse(jsonString);
var nomeArquivo;

function criarInput(tipo) {
  const container = event.target.closest('.anime-box').querySelector("." + tipo);
  if (container) {
    const animeId = event.target.closest('.anime-box').dataset.id;
    const anime = obj.find(item => item.id === animeId);

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
      const containerOp = event.target.closest('.anime-box').querySelector('.container__op');
      if (containerOp) {
        containerOp.appendChild(novoOpEd);
      }
    } else if (tipo === 'encerramento') {
      const containerEd = event.target.closest('.anime-box').querySelector('.container__ed');
      if (containerEd) {
        containerEd.appendChild(novoOpEd);
      }
    }
  }
}

// Adicione um evento de clique ao botão "Salvar"
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('salvar')) {
    pegarAlteracoes();
    salvarValores(nomeArquivo);
  } else if (event.target.classList.contains('apagar')) {
    const animeDiv = event.target.closest('.anime-box');
    animeDiv.remove();
  } else if (event.target.classList.contains('add-abertura')) {
    criarInput('abertura');
  } else if (event.target.classList.contains('add-encerramento')) {
    criarInput('encerramento');
  } else if (event.target.id === 'escolher-arquivo') {
    // Quando o botão "Escolha o arquivo JSON" for clicado, abrir a janela de seleção de arquivo
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change', function () {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = function (event) {
        const newJsonString = event.target.result;
        obj = JSON.parse(newJsonString);
        nomeArquivo = file.name;
        // Limpar os valores antes de atualizar com o novo JSON
        limparValores();
        // Atualize os valores na página com base no novo JSON
        atualizarValores();
      };
      reader.readAsText(file);
    });
    input.click(); // Simula o clique no input para abrir a janela de seleção de arquivo
  }
});

// Função auxiliar para criar um novo op_ed
function criarInput(tipo) {
  const container = document.querySelector('.anime-box');
  if (container) {
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
      const containerOp = document.querySelector('.container__op');
      if (containerOp) {
        containerOp.appendChild(novoOpEd);
      }
    } else if (tipo === 'encerramento') {
      const containerEd = document.querySelector('.container__ed');
      if (containerEd) {
        containerEd.appendChild(novoOpEd);
      }
    }
  }
}


// Adicione uma função para atualizar os valores na página com base no primeiro item do objeto
function atualizarValores() {
  obj.forEach((item, index) => {
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
    japaneseNameInput.id = "nomeJapones"
    japaneseNameInput.value = item.title.romaji;
    infoDiv.appendChild(japaneseNameInput);

    const englishNameLabel = document.createElement('label');
    englishNameLabel.textContent = 'Nome em inglês:';
    infoDiv.appendChild(englishNameLabel);
    const englishNameInput = document.createElement('input');
    englishNameInput.id = "nomeIngles"
    englishNameInput.type = 'text';
    englishNameInput.value = item.title.english;
    infoDiv.appendChild(englishNameInput);

    const openingContainer = document.createElement('div');
    openingContainer.classList.add('container__op');
    const openingLabel = document.createElement('label');
    openingLabel.textContent = 'Abertura:';
    openingContainer.appendChild(openingLabel);

    // Verifica se há dados nas aberturas antes de criar os campos
    if (item.opening.edges.length > 0) {
      item.opening.edges.forEach((edge) => {
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
    if (item.ending.edges.length > 0) {
      item.ending.edges.forEach((edge) => {
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
  });
}


// Função auxiliar para criar um novo op_ed
function criarNovoOpEd(tipo, nome, video) {
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
  botaoRemover.onclick = function () {
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
function limparValores() {
  const lista = document.getElementById('lista');
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
};

// Função para pegar as alterações
function pegarAlteracoes() {
  // Limpa o array de animes antes de adicionar os valores atualizados
  animes = [];

  // Seleciona todos os elementos com a classe "anime-box"
  const animeBoxes = document.querySelectorAll('.anime-box');

  // Itera sobre cada "anime-box"
  animeBoxes.forEach((animeBox) => {
    // Obtém o ID do anime
    const animeId = animeBox.dataset.id;

    // Encontra o objeto correspondente ao anime usando o ID
    const anime = obj.find((item) => item.id == animeId);

    // Verifica se o anime foi encontrado
    if (anime) {
      const abertura = animeBox.querySelectorAll('.op_ed.abertura');
      const encerramento = animeBox.querySelectorAll('.op_ed.encerramento');

      // Limpa os arrays de abertura e encerramento
      anime.opening.edges = [];
      anime.ending.edges = [];

      // Adiciona novos nós de abertura
      abertura.forEach((op) => {
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
      encerramento.forEach((ed) => {
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
function salvarValores(nomeArquivo) {
  const novoJsonString = JSON.stringify(animes, null, 2);

  const blob = new Blob([novoJsonString], {
    type: 'application/json'
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = nomeArquivo; // Use o nome do arquivo fornecido como parâmetro
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);

  animes = [];
}

// Chame a função para atualizar os valores
atualizarValores();