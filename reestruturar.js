const fs = require('fs');

// Carrega o conteúdo do arquivo bd.json
const rawData = fs.readFileSync('bd.json');
const data = JSON.parse(rawData);

// Função para reestruturar os dados
function reestruturarDados(animeData, votosData) {
    const resultado = {};
    
    // Itera sobre os dados dos animes
    for (const chave in animeData) {
        if (Object.prototype.hasOwnProperty.call(animeData, chave)) {
            const anoEstacao = chave;
            const animes = animeData[chave];
            const votos = votosData[`votos${chave}`] && votosData[`votos${chave}`].votos ? votosData[`votos${chave}`].votos : [];
            
            // Cria um objeto para armazenar os dados dos animes e dos votos
            resultado[anoEstacao] = {
                dados: animes,
                votos: votos
            };
        }
    }
    
    return resultado;
}

// Chama a função para reestruturar os dados
const novoJSON = reestruturarDados(data, data);

// Salva o novo JSON em um arquivo
fs.writeFileSync('novo_bd.json', JSON.stringify(novoJSON, null, 2));
