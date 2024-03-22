const fs = require('fs');
const path = require('path');

const directoryPath = 'C:\\Users\\mepp\\OneDrive\\Área de Trabalho\\alura\\votacao animes\\dados\\votos\\db';
const outputFile = 'C:\\Users\\mepp\\OneDrive\\Área de Trabalho\\alura\\votacao animes\\dados\\votos\\db\\db.json';

// Objeto para armazenar todos os dados dos arquivos JSON
let allData = {};

// Lê cada arquivo JSON e adiciona seus dados ao objeto allData
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Erro ao ler o diretório:', err);
    return;
  }
  
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const fileName = path.basename(file, '.json');
      const filePath = path.join(directoryPath, file);
      const fileContent = fs.readFileSync(filePath);
      
      try {
        const jsonData = JSON.parse(fileContent);
        
        // Adiciona os dados do arquivo ao objeto allData
        allData[fileName] = jsonData;
      } catch (error) {
        console.error('Erro ao analisar o arquivo JSON:', filePath);
      }
    }
  });
  
  // Escreve os dados combinados em um único arquivo JSON
  fs.writeFileSync(outputFile, JSON.stringify(allData, null, 2));
  
  console.log('Dados combinados e salvos em', outputFile);
});
