var nome = localStorage.getItem("usuario");

// carregar e mostrar os votos do BD
function mostrarVotos()
{
    if (nome == "null")
    {
        window.location.href = "index.html";
    }

    fetch("http://127.0.0.1:5500/votos2021Winter.json")
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            data = data.votos2021Winter;

            const abertura = Object.values(data[0].abertura[nome]);
            const encerramento = Object.values(data[1].encerramento[nome]);
            const feminino = Object.values(data[2].feminino[nome]);
            const masculino = Object.values(data[3].masculino[nome]);
            const surpresa = Object.values(data[4].surpresa[nome]);
            const decepcao = Object.values(data[5].decepcao[nome]);
            const animacao = Object.values(data[6].animacao[nome]);
            const antagonista = Object.values(data[7].antagonista[nome]);
            const par = Object.values(data[8].par[nome]);
            const doente = Object.values(data[9].doente[nome]);
            const emocao = Object.values(data[10].emocao[nome]);
            const anime = Object.values(data[11].anime[nome]);

            abertura.map((item, index) =>
            {
                const img = document.querySelector(`#aberturaImg${index + 1}`);
                const nomeJapones = document.querySelector(`#aberturaNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#aberturaNomeIngles${index + 1}`);
                const nomeMusica = document.querySelector(`#aberturaNomeMusica${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
                nomeMusica.innerHTML = item.extra;
            });

            encerramento.map((item, index) =>
            {
                const img = document.querySelector(`#encerramentoImg${index + 1}`);
                const nomeJapones = document.querySelector(`#encerramentoNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#encerramentoNomeIngles${index + 1}`);
                const nomeMusica = document.querySelector(`#encerramentoNomeMusica${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
                nomeMusica.innerHTML = item.extra;
            });

            feminino.map((item, index) =>
            {
                const img = document.querySelector(`#femininoImg${index + 1}`);
                const nomeJapones = document.querySelector(`#femininoNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#femininoNomeIngles${index + 1}`);
                const nomePersonagem = document.querySelector(`#femininoNomePersonagem${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
                nomePersonagem.innerHTML = item.extra;
            });

            masculino.map((item, index) =>
            {
                const img = document.querySelector(`#masculinoImg${index + 1}`);
                const nomeJapones = document.querySelector(`#masculinoNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#masculinoNomeIngles${index + 1}`);
                const nomePersonagem = document.querySelector(`#masculinoNomePersonagem${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
                nomePersonagem.innerHTML = item.extra;
            });

            surpresa.map((item, index) =>
            {
                const img = document.querySelector(`#surpresaImg${index + 1}`);
                const nomeJapones = document.querySelector(`#surpresaNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#surpresaNomeIngles${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
            });

            decepcao.map((item, index) =>
            {
                const img = document.querySelector(`#decepcaoImg${index + 1}`);
                const nomeJapones = document.querySelector(`#decepcaoNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#decepcaoNomeIngles${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
            });

            animacao.map((item, index) =>
            {
                const img = document.querySelector(`#animacaoImg${index + 1}`);
                const nomeJapones = document.querySelector(`#animacaoNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#animacaoNomeIngles${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
            });

            antagonista.map((item, index) =>
            {
                const img = document.querySelector(`#antagonistaImg${index + 1}`);
                const nomeJapones = document.querySelector(`#antagonistaNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#antagonistaNomeIngles${index + 1}`);
                const nomePersonagem = document.querySelector(`#antagonistaNomePersonagem${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
                nomePersonagem.innerHTML = item.extra;
            });

            par.map((item, index) =>
            {
                const img1 = document.querySelector(`#par1Img${index + 1}`);
                const img2 = document.querySelector(`#par2Img${index + 1}`);
                const nomeJapones = document.querySelector(`#parNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#parNomeIngles${index + 1}`);
                const nomePar = document.querySelector(`#parNomePar${index + 1}`);

                img1.src = item.imagem;
                img2.src = item.imagem2;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
                nomePar.innerHTML = item.extra;
            });

            doente.map((item, index) =>
            {
                const img = document.querySelector(`#doenteImg${index + 1}`);
                const nomeJapones = document.querySelector(`#doenteNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#doenteNomeIngles${index + 1}`);
                const nomePersonagem = document.querySelector(`#doenteNomePersonagem${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
                nomePersonagem.innerHTML = item.extra;
            });

            emocao.map((item, index) =>
            {
                const img = document.querySelector(`#emocaoImg${index + 1}`);
                const nomeJapones = document.querySelector(`#emocaoNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#emocaoNomeIngles${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
            });

            anime.map((item, index) =>
            {
                const img = document.querySelector(`#animeImg${index + 1}`);
                const nomeJapones = document.querySelector(`#animeNomeJapones${index + 1}`);
                const nomeIngles = document.querySelector(`#animeNomeIngles${index + 1}`);

                img.src = item.imagem;
                nomeJapones.innerHTML = item.nomeJ;
                nomeIngles.innerHTML = item.nomeE;
            });
        });
}
