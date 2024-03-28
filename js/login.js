function checarUsuario()
{
    var usuario = localStorage.getItem("usuario");

    if (usuario != "null")
    {
        document.getElementById("botaoSair").classList.remove("esconder");
        document.getElementById("botaoVotar").classList.remove("esconder");
        document.getElementById("botaoEntrar").classList.add("esconder");
        document.getElementById("nomeUsuario").innerHTML = usuario;
    }
}

function abrirLogin()
{
    modal.style.display = "block";
}

function logar()
{
    var usuario = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;
    var usuarios = [{ nome: 'leandro', senha: 'leandro' }, { nome: 'lucas', senha: 'lucas' }, { nome: 'thiago', senha: 'thiago' }, { nome: 'nil', senha: 'nil' }];

    for (var i = 0; i < usuarios.length; i++)
    {
        if (usuario == usuarios[i].nome && senha == usuarios[i].senha)
        {
            localStorage.setItem('usuario', usuario);
            location.reload();
            return;
        }
    }

    alert("Usuário ou senha incorretos");
}

function deslogar()
{
    localStorage.setItem("usuario", null);
    location.reload();
}

function home()
{
    window.location.href = "/tela/index.html";
}

function votacao()
{
    window.location.href = "votacaoCopy.html";
}

