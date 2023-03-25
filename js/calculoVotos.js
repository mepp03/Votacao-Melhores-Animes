

// "abertura":
// {
//     "nome": leandro 
//     {
//         "posicao": "primeiro"
//         {
//             "id":
//             "nomeJ":
//             "nomeE":
//             "imagem":
//             "ponto":
//         }
//         segundo 
//         {
//             id
//             nomeJ
//             nomeE
//             imagem
//             ponto
//         }
//         terceiro 
//         {
//             id
//             nomeJ
//             nomeE
//             imagem
//             ponto
//         }
//     }    
//     lucas 
//     {
//         primeiro 
//         {
//             id
//             nomeJ
//             nomeE
//             imagem
//             ponto
//         }
//         segundo 
//         {
//             id
//             nomeJ
//             nomeE
//             imagem
//             ponto
//         }
//         terceiro 
//         {
//             id
//             nomeJ
//             nomeE
//             imagem
//             ponto
//         }
//     }    
//     thiago 
//     {
//         primeiro 
//         {
//             id
//             nomeJ
//             nomeE
//             imagem
//             ponto
//         }
//         segundo 
//         {
//             id
//             nomeJ
//             nomeE
//             imagem
//             ponto
//         }
//         terceiro 
//         {
//             id
//             nomeJ
//             nomeE
//             imagem
//             ponto
//         }
//     }    
//     nil 
//     {
//         primeiro 
//         {
//             id
//             nomeJ
//             nomeE
//             imagem
//             ponto
//         }
//         segundo 
//         {
//             id
//             nomeJ
//             nomeE
//             imagem
//             ponto
//         }
//         terceiro 
//         {
//             id
//             nomeJ
//             nomeE
//             imagem
//             ponto
//         }
//     }    
//     vencedor 
//     {
//         primeiro 
//         {
//             id
//             nomeJ
//             nomeE
//             imagem
//             ponto
//         }
//         segundo 
//         {
//             id
//             nomeJ
//             nomeE
//             imagem
//             ponto
//         }
//         terceiro 
//         {
//             id
//             nomeJ
//             nomeE
//             imagem
//             ponto
//         }
//     }
// }


abertura.forEach(votante => {
    let juiz = votante.filter(nome != "vencedor");
    var concorrentes;
    if (concorrentes.id == juiz.posicao.id) //arrumar, tem que buscar por todos os itens do concorrentes
    {
        concorrentes.ponto += juiz.posicao.ponto;
    } 
    else 
    {
        concorrentes(juiz.posicao.id, juiz.posicao.nomeJ, juiz.posicao.nomeE, juiz.posicao.imagem, juiz.posicao.ponto);    
    }

    //ordenar concorrentes
    
    abertura.voto.primeiro = concorrentes[0];
    abertura.voto.segundo = concorrentes[1];
    abertura.voto.terceiro = concorrentes[2];
});