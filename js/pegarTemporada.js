const cabecalhoTemporadas = document.querySelector("#cabecalho__temporadas");

// Mudando o título na inicialização
function iniciar() {
  // Tenta carregar do localStorage, senão usa padrão
  const temporadaSalva = localStorage.getItem("temporada");

  if (temporadaSalva) {
    // Extrai ano e estação do valor salvo (ex: "2019Inverno")
    const ano = temporadaSalva.substring(0, 4); // Primeiros 4 caracteres
    const estacao = temporadaSalva.substring(4); // Restante

    // Atualiza os inputs
    document.getElementById("ano").value = ano;

    // Marca o radio button correto
    const radioEstacao = document.querySelector(
      `input[name="estacoes"][value="${estacao.toLowerCase()}"]`
    );
    if (radioEstacao) {
      radioEstacao.checked = true;
    }

    // Atualiza o título
    const estacaoFormatada =
      estacao.charAt(0).toUpperCase() + estacao.slice(1).toLowerCase();
    document.getElementById("temporada").innerHTML =
      estacaoFormatada + " " + ano;
  } else {
    // Se não tem nada salvo, usa os valores padrão
    var estacao = document.querySelector(
      'input[name="estacoes"]:checked'
    ).value;
    var ano = document.getElementById("ano").value;

    estacao = estacao.charAt(0).toUpperCase() + estacao.slice(1);
    localStorage.setItem("temporada", ano + estacao);
    document.getElementById("temporada").innerHTML = estacao + " " + ano;
  }
}

// Mudando o título quando a data é mudada
cabecalhoTemporadas.addEventListener("change", function () {
  var estacao1 = document.querySelector('input[name="estacoes"]:checked').value;
  var ano = document.getElementById("ano").value;
  estacao1 = estacao1.charAt(0).toUpperCase() + estacao1.slice(1);
  document.getElementById("temporada").innerHTML = estacao1 + " " + ano;
  localStorage.setItem("temporada", ano + estacao1);
});

function teste() {
  console.log(localStorage.getItem("temporada"));
}

// Chama a função iniciar quando a página carrega
document.addEventListener("DOMContentLoaded", iniciar);
