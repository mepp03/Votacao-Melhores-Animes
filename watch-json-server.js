const jsonServer = require('json-server');
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'dados', 'votos');
const mergedFilePath = path.join(__dirname, 'merged-votos.json');

// Função para mesclar todos os arquivos JSON na pasta
function mergeJsonFiles() {
  const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.json'));
  const mergedData = files.reduce((acc, file) => {
    const filePath = path.join(directoryPath, file);
    const jsonData = JSON.parse(fs.readFileSync(filePath));
    return { ...acc, ...jsonData };
  }, {});
  fs.writeFileSync(mergedFilePath, JSON.stringify(mergedData, null, 2));
}

// Inicializa a mesclagem dos arquivos JSON
mergeJsonFiles();

// Inicia o servidor json-server com o arquivo mesclado
const server = jsonServer.create();
const router = jsonServer.router(mergedFilePath);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('Servidor json-server iniciado em http://localhost:3000');
});

// Assiste a alterações nos arquivos JSON e reinicia o servidor quando necessário
chokidar.watch(directoryPath).on('all', (event, path) => {
  console.log(`Arquivo alterado: ${path}`);
  mergeJsonFiles();
  console.log('Reiniciando o servidor...');
  server.close(() => {
    server.listen(3000, () => {
      console.log('Servidor reiniciado.');
    });
  });
});
