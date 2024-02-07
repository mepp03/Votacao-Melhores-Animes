const cabecalhoTemporadas = document.querySelector('#cabecalho__temporadas');
var estacao = document.querySelector('input[name="estacoes"]:checked').value;
var ano = document.getElementById("ano").value;

//mudando o titulo na inicializaçao
estacao = estacao.charAt(0).toUpperCase() + estacao.slice(1);
temporada.innerHTML = estacao + " " + ano



// mudando o titulo quando a data é mudada
cabecalhoTemporadas.addEventListener('click', function ()
{
    var estacao1 = document.querySelector('input[name="estacoes"]:checked').value;
    var ano = document.getElementById("ano").value;
    estacao1 = estacao1.charAt(0).toUpperCase() + estacao1.slice(1);
    document.getElementById("temporada").innerHTML = estacao1 + " " + ano;
    // mostrarVencedores();
    localStorage.setItem('temporada', ano+estacao1);
    // console.log(estacao1 + " " + ano);
    // document.getElementById("temporada").innerHTML = localStorage.getItem('temporada')
    teste();
});


function teste(){

}



