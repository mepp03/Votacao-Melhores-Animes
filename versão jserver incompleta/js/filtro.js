function filtrarPersonagem() {
    var input = document.getElementById("extra__busca");
    var filter = input.value.toUpperCase();
    var div = document.getElementById("extra");
    var item = div.getElementsByClassName("lista__item");

    for (var i = 0; i < item.length; i++) {
        var nome = item[i].getElementsByClassName("lista__item--nome")[0];
        var txtValue = nome.textContent || nome.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            item[i].style.display = "";
        } else {
            item[i].style.display = "none";
        }
    }
}

function filtrar() {
    var input = document.getElementById("busca");
    var filter = input.value.toUpperCase();
    var div = document.getElementById("lista");
    var item = div.getElementsByClassName("lista__item");

    for (var i = 0; i < item.length; i++) {
        var nome = item[i].getElementsByClassName("lista__item--nome")[0];
        var txtValue = nome.textContent || nome.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            item[i].style.display = "";
        } else {
            item[i].style.display = "none";
        }
    }
}

function selecionarPares() {
    var checkboxes = document.getElementsByName("par");
    var selecionados = [];
    for (var i = 0; i < checkboxes.length; i++) 
    {
        if (checkboxes[i].checked) {
            var imagem = checkboxes[i].value;
            var nome = checkboxes[i].getAttribute("data-nome");
            var nomeE = checkboxes[i].getAttribute("data-nomeE");
            var nomeJ = checkboxes[i].getAttribute("data-nomeJ");
            selecionados.push({imagem: imagem, nome: nome});
        }
    }
    if (selecionados.length == 2) 
    {
        // console.log(selecionados[0].imagem);
        var info1 = selecionados[0].nome;
        var info2 = selecionados[1].nome;
        var imagemPersonagem1 = selecionados[0].imagem;
        var imagemPersonagem2 = selecionados[1].imagem;
        passarEscolhaExtraPar(info1, info2, imagemPersonagem1, imagemPersonagem2, nomeE,  nomeJ)
    }
}