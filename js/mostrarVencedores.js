const pegarDados = document.querySelector('#cabecalho__temporadas');

pegarDados.addEventListener('click', function ()
{
    mostrarVencedores();
});

//carregar e mostrar os votos dos vencedores
function mostrarVencedores()
{
    var temporada = localStorage.getItem('temporada');

    fetch(`http://127.0.0.1:5500/votos${temporada}.json`)
        .then(function (response)
        {
            return response.json();
        })
        .then(function (data)
        {
            data = data.votos;

            //abertura
            {
                // console.log(data);
                const leandroAbertura = Object.values(data[0].abertura.leandro);
                const lucasAbertura = Object.values(data[0].abertura.lucas);
                const thiagoAbertura = Object.values(data[0].abertura.thiago);
                const nilAbertura = Object.values(data[0].abertura.nil);
                const vencedorAbertura = Object.values(data[0].abertura.vencedor);

                imgOpLeandro1.src = leandroAbertura[0].imagem;
                imgOpLucas1.src = lucasAbertura[0].imagem;
                imgOpThiago1.src = thiagoAbertura[0].imagem;
                imgOpNil1.src = nilAbertura[0].imagem;
                imgOpVencedor1.src = vencedorAbertura[0].imagem;

                nomeJaponesOpLeandro1.innerHTML = leandroAbertura[0].nomeJ;
                nomeJaponesOpLucas1.innerHTML = lucasAbertura[0].nomeJ;
                nomeJaponesOpThiago1.innerHTML = thiagoAbertura[0].nomeJ;
                nomeJaponesOpNil1.innerHTML = nilAbertura[0].nomeJ;
                nomeJaponesOpVencedor1.innerHTML = vencedorAbertura[0].nomeJ;

                nomeInglesOpLeandro1.innerHTML = leandroAbertura[0].nomeE;
                nomeInglesOpLucas1.innerHTML = lucasAbertura[0].nomeE;
                nomeInglesOpThiago1.innerHTML = thiagoAbertura[0].nomeE;
                nomeInglesOpNil1.innerHTML = nilAbertura[0].nomeE;
                nomeInglesOpVencedor1.innerHTML = vencedorAbertura[0].nomeE;

                extraOpLeandro1.innerHTML = leandroAbertura[0].extra;
                extraOpLucas1.innerHTML = lucasAbertura[0].extra;
                extraOpThiago1.innerHTML = thiagoAbertura[0].extra;
                extraOpNil1.innerHTML = nilAbertura[0].extra;
                extraOpVencedor1.innerHTML = vencedorAbertura[0].extra;


                imgOpLeandro2.src = leandroAbertura[1].imagem;
                imgOpLucas2.src = lucasAbertura[1].imagem;
                imgOpThiago2.src = thiagoAbertura[1].imagem;
                imgOpNil2.src = nilAbertura[1].imagem;
                imgOpVencedor2.src = vencedorAbertura[1].imagem;

                nomeJaponesOpLeandro2.innerHTML = leandroAbertura[1].nomeJ;
                nomeJaponesOpLucas2.innerHTML = lucasAbertura[1].nomeJ;
                nomeJaponesOpThiago2.innerHTML = thiagoAbertura[1].nomeJ;
                nomeJaponesOpNil2.innerHTML = nilAbertura[1].nomeJ;
                nomeJaponesOpVencedor2.innerHTML = vencedorAbertura[1].nomeJ;

                nomeInglesOpLeandro2.innerHTML = leandroAbertura[1].nomeE;
                nomeInglesOpLucas2.innerHTML = lucasAbertura[1].nomeE;
                nomeInglesOpThiago2.innerHTML = thiagoAbertura[1].nomeE;
                nomeInglesOpNil2.innerHTML = nilAbertura[1].nomeE;
                nomeInglesOpVencedor2.innerHTML = vencedorAbertura[1].nomeE;

                extraOpLeandro2.innerHTML = leandroAbertura[1].extra;
                extraOpLucas2.innerHTML = lucasAbertura[1].extra;
                extraOpThiago2.innerHTML = thiagoAbertura[1].extra;
                extraOpNil2.innerHTML = nilAbertura[1].extra;
                extraOpVencedor2.innerHTML = vencedorAbertura[1].extra;


                imgOpLeandro3.src = leandroAbertura[2].imagem;
                imgOpLucas3.src = lucasAbertura[2].imagem;
                imgOpThiago3.src = thiagoAbertura[2].imagem;
                imgOpNil3.src = nilAbertura[2].imagem;
                imgOpVencedor3.src = vencedorAbertura[2].imagem;

                nomeJaponesOpLeandro3.innerHTML = leandroAbertura[2].nomeJ;
                nomeJaponesOpLucas3.innerHTML = lucasAbertura[2].nomeJ;
                nomeJaponesOpThiago3.innerHTML = thiagoAbertura[2].nomeJ;
                nomeJaponesOpNil3.innerHTML = nilAbertura[2].nomeJ;
                nomeJaponesOpVencedor3.innerHTML = vencedorAbertura[2].nomeJ;

                nomeInglesOpLeandro3.innerHTML = leandroAbertura[2].nomeE;
                nomeInglesOpLucas3.innerHTML = lucasAbertura[2].nomeE;
                nomeInglesOpThiago3.innerHTML = thiagoAbertura[2].nomeE;
                nomeInglesOpNil3.innerHTML = nilAbertura[2].nomeE;
                nomeInglesOpVencedor3.innerHTML = vencedorAbertura[2].nomeE;

                extraOpLeandro3.innerHTML = leandroAbertura[2].extra;
                extraOpLucas3.innerHTML = lucasAbertura[2].extra;
                extraOpThiago3.innerHTML = thiagoAbertura[2].extra;
                extraOpNil3.innerHTML = nilAbertura[2].extra;
                extraOpVencedor3.innerHTML = vencedorAbertura[2].extra;
            }

            //encerramento
            {
                const leandroEncerramento = Object.values(data[1].encerramento.leandro);
                const lucasEncerramento = Object.values(data[1].encerramento.lucas);
                const thiagoEncerramento = Object.values(data[1].encerramento.thiago);
                const nilEncerramento = Object.values(data[1].encerramento.nil);
                const vencedorEncerramento = Object.values(data[1].encerramento.vencedor);

                imgEdLeandro1.src = leandroEncerramento[0].imagem;
                imgEdLucas1.src = lucasEncerramento[0].imagem;
                imgEdThiago1.src = thiagoEncerramento[0].imagem;
                imgEdNil1.src = nilEncerramento[0].imagem;

                imgEdVencedor1.src = vencedorEncerramento[0].imagem;

                nomeJaponesEdLeandro1.innerHTML = leandroEncerramento[0].nomeJ;
                nomeJaponesEdLucas1.innerHTML = lucasEncerramento[0].nomeJ;
                nomeJaponesEdThiago1.innerHTML = thiagoEncerramento[0].nomeJ;
                nomeJaponesEdNil1.innerHTML = nilEncerramento[0].nomeJ;
                nomeJaponesEdVencedor1.innerHTML = vencedorEncerramento[0].nomeJ;

                nomeInglesEdLeandro1.innerHTML = leandroEncerramento[0].nomeE;
                nomeInglesEdLucas1.innerHTML = lucasEncerramento[0].nomeE;
                nomeInglesEdThiago1.innerHTML = thiagoEncerramento[0].nomeE;
                nomeInglesEdNil1.innerHTML = nilEncerramento[0].nomeE;
                nomeInglesEdVencedor1.innerHTML = vencedorEncerramento[0].nomeE;

                extraEdLeandro1.innerHTML = leandroEncerramento[0].extra;
                extraEdLucas1.innerHTML = lucasEncerramento[0].extra;
                extraEdThiago1.innerHTML = thiagoEncerramento[0].extra;
                extraEdNil1.innerHTML = nilEncerramento[0].extra;
                extraEdVencedor1.innerHTML = vencedorEncerramento[0].extra;


                imgEdLeandro2.src = leandroEncerramento[1].imagem;
                imgEdLucas2.src = lucasEncerramento[1].imagem;
                imgEdThiago2.src = thiagoEncerramento[1].imagem;
                imgEdNil2.src = nilEncerramento[1].imagem;
                imgEdVencedor2.src = vencedorEncerramento[1].imagem;

                nomeJaponesEdLeandro2.innerHTML = leandroEncerramento[1].nomeJ;
                nomeJaponesEdLucas2.innerHTML = lucasEncerramento[1].nomeJ;
                nomeJaponesEdThiago2.innerHTML = thiagoEncerramento[1].nomeJ;
                nomeJaponesEdNil2.innerHTML = nilEncerramento[1].nomeJ;
                nomeJaponesEdVencedor2.innerHTML = vencedorEncerramento[1].nomeJ;

                nomeInglesEdLeandro2.innerHTML = leandroEncerramento[1].nomeE;
                nomeInglesEdLucas2.innerHTML = lucasEncerramento[1].nomeE;
                nomeInglesEdThiago2.innerHTML = thiagoEncerramento[1].nomeE;
                nomeInglesEdNil2.innerHTML = nilEncerramento[1].nomeE;
                nomeInglesEdVencedor2.innerHTML = vencedorEncerramento[1].nomeE;

                extraEdLeandro2.innerHTML = leandroEncerramento[1].extra;
                extraEdLucas2.innerHTML = lucasEncerramento[1].extra;
                extraEdThiago2.innerHTML = thiagoEncerramento[1].extra;
                extraEdNil2.innerHTML = nilEncerramento[1].extra;
                extraEdVencedor2.innerHTML = vencedorEncerramento[1].extra;


                imgEdLeandro3.src = leandroEncerramento[2].imagem;
                imgEdLucas3.src = lucasEncerramento[2].imagem;
                imgEdThiago3.src = thiagoEncerramento[2].imagem;
                imgEdNil3.src = nilEncerramento[2].imagem;
                imgEdVencedor3.src = vencedorEncerramento[2].imagem;

                nomeJaponesEdLeandro3.innerHTML = leandroEncerramento[2].nomeJ;
                nomeJaponesEdLucas3.innerHTML = lucasEncerramento[2].nomeJ;
                nomeJaponesEdThiago3.innerHTML = thiagoEncerramento[2].nomeJ;
                nomeJaponesEdNil3.innerHTML = nilEncerramento[2].nomeJ;
                nomeJaponesEdVencedor3.innerHTML = vencedorEncerramento[2].nomeJ;

                nomeInglesEdLeandro3.innerHTML = leandroEncerramento[2].nomeE;
                nomeInglesEdLucas3.innerHTML = lucasEncerramento[2].nomeE;
                nomeInglesEdThiago3.innerHTML = thiagoEncerramento[2].nomeE;
                nomeInglesEdNil3.innerHTML = nilEncerramento[2].nomeE;
                nomeInglesEdVencedor3.innerHTML = vencedorEncerramento[2].nomeE;

                extraEdLeandro3.innerHTML = leandroEncerramento[2].extra;
                extraEdLucas3.innerHTML = lucasEncerramento[2].extra;
                extraEdThiago3.innerHTML = thiagoEncerramento[2].extra;
                extraEdNil3.innerHTML = nilEncerramento[2].extra;
                extraEdVencedor3.innerHTML = vencedorEncerramento[2].extra;
            }


            //feminino
            {
                const leandroFeminino = Object.values(data[2].feminino.leandro);
                const lucasFeminino = Object.values(data[2].feminino.lucas);
                const thiagoFeminino = Object.values(data[2].feminino.thiago);
                const nilFeminino = Object.values(data[2].feminino.nil);
                const vencedorFeminino = Object.values(data[2].feminino.vencedor);


                imgFemininoLeandro1.src = leandroFeminino[0].imagem;
                imgFemininoLucas1.src = lucasFeminino[0].imagem;
                imgFemininoThiago1.src = thiagoFeminino[0].imagem;
                imgFemininoNil1.src = nilFeminino[0].imagem;
                imgFemininoVencedor1.src = vencedorFeminino[0].imagem;

                nomeJaponesFemininoLeandro1.innerHTML = leandroFeminino[0].nomeJ;
                nomeJaponesFemininoLucas1.innerHTML = lucasFeminino[0].nomeJ;
                nomeJaponesFemininoThiago1.innerHTML = thiagoFeminino[0].nomeJ;
                nomeJaponesFemininoNil1.innerHTML = nilFeminino[0].nomeJ;
                nomeJaponesFemininoVencedor1.innerHTML = vencedorFeminino[0].nomeE;

                nomeInglesFemininoLeandro1.innerHTML = leandroFeminino[0].nomeE;
                nomeInglesFemininoLucas1.innerHTML = lucasFeminino[0].nomeE;
                nomeInglesFemininoThiago1.innerHTML = thiagoFeminino[0].nomeE;
                nomeInglesFemininoNil1.innerHTML = nilFeminino[0].nomeE;
                nomeInglesFemininoVencedor1.innerHTML = vencedorFeminino[0].nomeE;

                extraFemininoLeandro1.innerHTML = leandroFeminino[0].extra;
                extraFemininoLucas1.innerHTML = lucasFeminino[0].extra;
                extraFemininoThiago1.innerHTML = thiagoFeminino[0].extra;
                extraFemininoNil1.innerHTML = nilFeminino[0].extra;
                extraFemininoVencedor1.innerHTML = vencedorFeminino[0].extra;


                imgFemininoLeandro2.src = leandroFeminino[1].imagem;
                imgFemininoLucas2.src = lucasFeminino[1].imagem;
                imgFemininoThiago2.src = thiagoFeminino[1].imagem;
                imgFemininoNil2.src = nilFeminino[1].imagem;
                imgFemininoVencedor2.src = vencedorFeminino[1].imagem;

                nomeJaponesFemininoLeandro2.innerHTML = leandroFeminino[1].nomeJ;
                nomeJaponesFemininoLucas2.innerHTML = lucasFeminino[1].nomeJ;
                nomeJaponesFemininoThiago2.innerHTML = thiagoFeminino[1].nomeJ;
                nomeJaponesFemininoNil2.innerHTML = nilFeminino[1].nomeJ;
                nomeJaponesFemininoVencedor2.innerHTML = vencedorFeminino[1].nomeE;

                nomeInglesFemininoLeandro2.innerHTML = leandroFeminino[1].nomeE;
                nomeInglesFemininoLucas2.innerHTML = lucasFeminino[1].nomeE;
                nomeInglesFemininoThiago2.innerHTML = thiagoFeminino[1].nomeE;
                nomeInglesFemininoNil2.innerHTML = nilFeminino[1].nomeE;
                nomeInglesFemininoVencedor2.innerHTML = vencedorFeminino[1].nomeE;

                extraFemininoLeandro2.innerHTML = leandroFeminino[1].extra;
                extraFemininoLucas2.innerHTML = lucasFeminino[1].extra;
                extraFemininoThiago2.innerHTML = thiagoFeminino[1].extra;
                extraFemininoNil2.innerHTML = nilFeminino[1].extra;
                extraFemininoVencedor2.innerHTML = vencedorFeminino[1].extra;


                imgFemininoLeandro3.src = leandroFeminino[2].imagem;
                imgFemininoLucas3.src = lucasFeminino[2].imagem;
                imgFemininoThiago3.src = thiagoFeminino[2].imagem;
                imgFemininoNil3.src = nilFeminino[2].imagem;
                imgFemininoVencedor3.src = vencedorFeminino[2].imagem;

                nomeJaponesFemininoLeandro3.innerHTML = leandroFeminino[2].nomeJ;
                nomeJaponesFemininoLucas3.innerHTML = lucasFeminino[2].nomeJ;
                nomeJaponesFemininoThiago3.innerHTML = thiagoFeminino[2].nomeJ;
                nomeJaponesFemininoNil3.innerHTML = nilFeminino[2].nomeJ;
                nomeJaponesFemininoVencedor3.innerHTML = vencedorFeminino[2].nomeE;

                nomeInglesFemininoLeandro3.innerHTML = leandroFeminino[2].nomeE;
                nomeInglesFemininoLucas3.innerHTML = lucasFeminino[2].nomeE;
                nomeInglesFemininoThiago3.innerHTML = thiagoFeminino[2].nomeE;
                nomeInglesFemininoNil3.innerHTML = nilFeminino[2].nomeE;
                nomeInglesFemininoVencedor3.innerHTML = vencedorFeminino[2].nomeE;

                extraFemininoLeandro3.innerHTML = leandroFeminino[2].extra;
                extraFemininoLucas3.innerHTML = lucasFeminino[2].extra;
                extraFemininoThiago3.innerHTML = thiagoFeminino[2].extra;
                extraFemininoNil3.innerHTML = nilFeminino[2].extra;
                extraFemininoVencedor3.innerHTML = vencedorFeminino[2].extra;
            }

            //masculino
            {
                const leandroMasculino = Object.values(data[3].masculino.leandro);
                const lucasMasculino = Object.values(data[3].masculino.lucas);
                const thiagoMasculino = Object.values(data[3].masculino.thiago);
                const nilMasculino = Object.values(data[3].masculino.nil);
                const vencedorMasculino = Object.values(data[3].masculino.vencedor);

                imgMasculinoLeandro1.src = leandroMasculino[0].imagem;
                imgMasculinoLucas1.src = lucasMasculino[0].imagem;
                imgMasculinoThiago1.src = thiagoMasculino[0].imagem;
                imgMasculinoNil1.src = nilMasculino[0].imagem;
                imgMasculinoVencedor1.src = vencedorMasculino[0].imagem;

                nomeJaponesMasculinoLeandro1.innerHTML = leandroMasculino[0].nomeJ;
                nomeJaponesMasculinoLucas1.innerHTML = lucasMasculino[0].nomeJ;
                nomeJaponesMasculinoThiago1.innerHTML = thiagoMasculino[0].nomeJ;
                nomeJaponesMasculinoNil1.innerHTML = nilMasculino[0].nomeJ;
                nomeJaponesMasculinoVencedor1.innerHTML = vencedorMasculino[0].nomeJ;

                nomeInglesMasculinoLeandro1.innerHTML = leandroMasculino[0].nomeE;
                nomeInglesMasculinoLucas1.innerHTML = lucasMasculino[0].nomeE;
                nomeInglesMasculinoThiago1.innerHTML = thiagoMasculino[0].nomeE;
                nomeInglesMasculinoNil1.innerHTML = nilMasculino[0].nomeE;
                nomeInglesMasculinoVencedor1.innerHTML = vencedorMasculino[0].nomeE;

                extraMasculinoLeandro1.innerHTML = leandroMasculino[0].extra;
                extraMasculinoLucas1.innerHTML = lucasMasculino[0].extra;
                extraMasculinoThiago1.innerHTML = thiagoMasculino[0].extra;
                extraMasculinoNil1.innerHTML = nilMasculino[0].extra;
                extraMasculinoVencedor1.innerHTML = vencedorMasculino[0].extra;


                imgMasculinoLeandro2.src = leandroMasculino[1].imagem;
                imgMasculinoLucas2.src = lucasMasculino[1].imagem;
                imgMasculinoThiago2.src = thiagoMasculino[1].imagem;
                imgMasculinoNil2.src = nilMasculino[1].imagem;
                imgMasculinoVencedor2.src = vencedorMasculino[1].imagem;

                nomeJaponesMasculinoLeandro2.innerHTML = leandroMasculino[1].nomeJ;
                nomeJaponesMasculinoLucas2.innerHTML = lucasMasculino[1].nomeJ;
                nomeJaponesMasculinoThiago2.innerHTML = thiagoMasculino[1].nomeJ;
                nomeJaponesMasculinoNil2.innerHTML = nilMasculino[1].nomeJ;
                nomeJaponesMasculinoVencedor2.innerHTML = vencedorMasculino[1].nomeJ;

                nomeInglesMasculinoLeandro2.innerHTML = leandroMasculino[1].nomeE;
                nomeInglesMasculinoLucas2.innerHTML = lucasMasculino[1].nomeE;
                nomeInglesMasculinoThiago2.innerHTML = thiagoMasculino[1].nomeE;
                nomeInglesMasculinoNil2.innerHTML = nilMasculino[1].nomeE;
                nomeInglesMasculinoVencedor2.innerHTML = vencedorMasculino[1].nomeE;

                extraMasculinoLeandro2.innerHTML = leandroMasculino[1].extra;
                extraMasculinoLucas2.innerHTML = lucasMasculino[1].extra;
                extraMasculinoThiago2.innerHTML = thiagoMasculino[1].extra;
                extraMasculinoNil2.innerHTML = nilMasculino[1].extra;
                extraMasculinoVencedor2.innerHTML = vencedorMasculino[1].extra;


                imgMasculinoLeandro3.src = leandroMasculino[2].imagem;
                imgMasculinoLucas3.src = lucasMasculino[2].imagem;
                imgMasculinoThiago3.src = thiagoMasculino[2].imagem;
                imgMasculinoNil3.src = nilMasculino[2].imagem;
                imgMasculinoVencedor3.src = vencedorMasculino[2].imagem;

                nomeJaponesMasculinoLeandro3.innerHTML = leandroMasculino[2].nomeJ;
                nomeJaponesMasculinoLucas3.innerHTML = lucasMasculino[2].nomeJ;
                nomeJaponesMasculinoThiago3.innerHTML = thiagoMasculino[2].nomeJ;
                nomeJaponesMasculinoNil3.innerHTML = nilMasculino[2].nomeJ;
                nomeJaponesMasculinoVencedor3.innerHTML = vencedorMasculino[2].nomeJ;

                nomeInglesMasculinoLeandro3.innerHTML = leandroMasculino[2].nomeE;
                nomeInglesMasculinoLucas3.innerHTML = lucasMasculino[2].nomeE;
                nomeInglesMasculinoThiago3.innerHTML = thiagoMasculino[2].nomeE;
                nomeInglesMasculinoNil3.innerHTML = nilMasculino[2].nomeE;
                nomeInglesMasculinoVencedor3.innerHTML = vencedorMasculino[2].nomeE;

                extraMasculinoLeandro3.innerHTML = leandroMasculino[2].extra;
                extraMasculinoLucas3.innerHTML = lucasMasculino[2].extra;
                extraMasculinoThiago3.innerHTML = thiagoMasculino[2].extra;
                extraMasculinoNil3.innerHTML = nilMasculino[2].extra;
                extraMasculinoVencedor3.innerHTML = vencedorMasculino[2].extra;
            }

            //surpresa
            {
                const leandroSurpresa = Object.values(data[4].surpresa.leandro);
                const lucasSurpresa = Object.values(data[4].surpresa.lucas);
                const thiagoSurpresa = Object.values(data[4].surpresa.thiago);
                const nilSurpresa = Object.values(data[4].surpresa.nil);
                const vencedorSurpresa = Object.values(data[4].surpresa.vencedor);

                imgSurpresaLeandro1.src = leandroSurpresa[0].imagem;
                imgSurpresaLucas1.src = lucasSurpresa[0].imagem;
                imgSurpresaThiago1.src = thiagoSurpresa[0].imagem;
                imgSurpresaNil1.src = nilSurpresa[0].imagem;
                imgSurpresaVencedor1.src = vencedorSurpresa[0].imagem;

                nomeJaponesSurpresaLeandro1.innerHTML = leandroSurpresa[0].nomeJ;
                nomeJaponesSurpresaLucas1.innerHTML = lucasSurpresa[0].nomeJ;
                nomeJaponesSurpresaThiago1.innerHTML = thiagoSurpresa[0].nomeJ;
                nomeJaponesSurpresaNil1.innerHTML = nilSurpresa[0].nomeJ;
                nomeJaponesSurpresaVencedor1.innerHTML = vencedorSurpresa[0].nomeJ;

                nomeInglesSurpresaLeandro1.innerHTML = leandroSurpresa[0].nomeE;
                nomeInglesSurpresaLucas1.innerHTML = lucasSurpresa[0].nomeE;
                nomeInglesSurpresaThiago1.innerHTML = thiagoSurpresa[0].nomeE;
                nomeInglesSurpresaNil1.innerHTML = nilSurpresa[0].nomeE;
                nomeInglesSurpresaVencedor1.innerHTML = vencedorSurpresa[0].nomeE;


                imgSurpresaLeandro2.src = leandroSurpresa[1].imagem;
                imgSurpresaLucas2.src = lucasSurpresa[1].imagem;
                imgSurpresaThiago2.src = thiagoSurpresa[1].imagem;
                imgSurpresaNil2.src = nilSurpresa[1].imagem;
                imgSurpresaVencedor2.src = vencedorSurpresa[1].imagem;

                nomeJaponesSurpresaLeandro2.innerHTML = leandroSurpresa[1].nomeJ;
                nomeJaponesSurpresaLucas2.innerHTML = lucasSurpresa[1].nomeJ;
                nomeJaponesSurpresaThiago2.innerHTML = thiagoSurpresa[1].nomeJ;
                nomeJaponesSurpresaNil2.innerHTML = nilSurpresa[1].nomeJ;
                nomeJaponesSurpresaVencedor2.innerHTML = vencedorSurpresa[1].nomeJ;

                nomeInglesSurpresaLeandro2.innerHTML = leandroSurpresa[1].nomeE;
                nomeInglesSurpresaLucas2.innerHTML = lucasSurpresa[1].nomeE;
                nomeInglesSurpresaThiago2.innerHTML = thiagoSurpresa[1].nomeE;
                nomeInglesSurpresaNil2.innerHTML = nilSurpresa[1].nomeE;
                nomeInglesSurpresaVencedor2.innerHTML = vencedorSurpresa[1].nomeE;


                imgSurpresaLeandro3.src = leandroSurpresa[2].imagem;
                imgSurpresaLucas3.src = lucasSurpresa[2].imagem;
                imgSurpresaThiago3.src = thiagoSurpresa[2].imagem;
                imgSurpresaNil3.src = nilSurpresa[2].imagem;
                imgSurpresaVencedor3.src = vencedorSurpresa[2].imagem;

                nomeJaponesSurpresaLeandro3.innerHTML = leandroSurpresa[2].nomeJ;
                nomeJaponesSurpresaLucas3.innerHTML = lucasSurpresa[2].nomeJ;
                nomeJaponesSurpresaThiago3.innerHTML = thiagoSurpresa[2].nomeJ;
                nomeJaponesSurpresaNil3.innerHTML = nilSurpresa[2].nomeJ;
                nomeJaponesSurpresaVencedor3.innerHTML = vencedorSurpresa[2].nomeJ;

                nomeInglesSurpresaLeandro3.innerHTML = leandroSurpresa[2].nomeE;
                nomeInglesSurpresaLucas3.innerHTML = lucasSurpresa[2].nomeE;
                nomeInglesSurpresaThiago3.innerHTML = thiagoSurpresa[2].nomeE;
                nomeInglesSurpresaNil3.innerHTML = nilSurpresa[2].nomeE;
                nomeInglesSurpresaVencedor3.innerHTML = vencedorSurpresa[2].nomeE;
            }

            //decepção
            {
                const leandroDecepcao = Object.values(data[5].decepcao.leandro);
                const lucasDecepcao = Object.values(data[5].decepcao.lucas);
                const thiagoDecepcao = Object.values(data[5].decepcao.thiago);
                const nilDecepcao = Object.values(data[5].decepcao.nil);
                const vencedorDecepcao = Object.values(data[5].decepcao.vencedor);

                imgDecepcaoLeandro1.src = leandroDecepcao[0].imagem;
                imgDecepcaoLucas1.src = lucasDecepcao[0].imagem;
                imgDecepcaoThiago1.src = thiagoDecepcao[0].imagem;
                imgDecepcaoNil1.src = nilDecepcao[0].imagem;
                imgDecepcaoVencedor1.src = vencedorDecepcao[0].imagem;

                nomeJaponesDecepcaoLeandro1.innerHTML = leandroDecepcao[0].nomeJ;
                nomeJaponesDecepcaoLucas1.innerHTML = lucasDecepcao[0].nomeJ;
                nomeJaponesDecepcaoThiago1.innerHTML = thiagoDecepcao[0].nomeJ;
                nomeJaponesDecepcaoNil1.innerHTML = nilDecepcao[0].nomeJ;
                nomeJaponesDecepcaoVencedor1.innerHTML = vencedorDecepcao[0].nomeJ;

                nomeInglesDecepcaoLeandro1.innerHTML = leandroDecepcao[0].nomeE;
                nomeInglesDecepcaoLucas1.innerHTML = lucasDecepcao[0].nomeE;
                nomeInglesDecepcaoThiago1.innerHTML = thiagoDecepcao[0].nomeE;
                nomeInglesDecepcaoNil1.innerHTML = nilDecepcao[0].nomeE;
                nomeInglesDecepcaoVencedor1.innerHTML = vencedorDecepcao[0].nomeE;


                imgDecepcaoLeandro2.src = leandroDecepcao[1].imagem;
                imgDecepcaoLucas2.src = lucasDecepcao[1].imagem;
                imgDecepcaoThiago2.src = thiagoDecepcao[1].imagem;
                imgDecepcaoNil2.src = nilDecepcao[1].imagem;
                imgDecepcaoVencedor2.src = vencedorDecepcao[1].imagem;

                nomeJaponesDecepcaoLeandro2.innerHTML = leandroDecepcao[1].nomeJ;
                nomeJaponesDecepcaoLucas2.innerHTML = lucasDecepcao[1].nomeJ;
                nomeJaponesDecepcaoThiago2.innerHTML = thiagoDecepcao[1].nomeJ;
                nomeJaponesDecepcaoNil2.innerHTML = nilDecepcao[1].nomeJ;
                nomeJaponesDecepcaoVencedor2.innerHTML = vencedorDecepcao[1].nomeJ;

                nomeInglesDecepcaoLeandro2.innerHTML = leandroDecepcao[1].nomeE;
                nomeInglesDecepcaoLucas2.innerHTML = lucasDecepcao[1].nomeE;
                nomeInglesDecepcaoThiago2.innerHTML = thiagoDecepcao[1].nomeE;
                nomeInglesDecepcaoNil2.innerHTML = nilDecepcao[1].nomeE;
                nomeInglesDecepcaoVencedor2.innerHTML = vencedorDecepcao[1].nomeE;


                imgDecepcaoLeandro3.src = leandroDecepcao[2].imagem;
                imgDecepcaoLucas3.src = lucasDecepcao[2].imagem;
                imgDecepcaoThiago3.src = thiagoDecepcao[2].imagem;
                imgDecepcaoNil3.src = nilDecepcao[2].imagem;
                imgDecepcaoVencedor3.src = vencedorDecepcao[2].imagem;

                nomeJaponesDecepcaoLeandro3.innerHTML = leandroDecepcao[2].nomeJ;
                nomeJaponesDecepcaoLucas3.innerHTML = lucasDecepcao[2].nomeJ;
                nomeJaponesDecepcaoThiago3.innerHTML = thiagoDecepcao[2].nomeJ;
                nomeJaponesDecepcaoNil3.innerHTML = nilDecepcao[2].nomeJ;
                nomeJaponesDecepcaoVencedor3.innerHTML = vencedorDecepcao[2].nomeJ;

                nomeInglesDecepcaoLeandro3.innerHTML = leandroDecepcao[2].nomeE;
                nomeInglesDecepcaoLucas3.innerHTML = lucasDecepcao[2].nomeE;
                nomeInglesDecepcaoThiago3.innerHTML = thiagoDecepcao[2].nomeE;
                nomeInglesDecepcaoNil3.innerHTML = nilDecepcao[2].nomeE;
                nomeInglesDecepcaoVencedor3.innerHTML = vencedorDecepcao[2].nomeE;
            }

            //animacao
            {
                const leandroAnimacao = Object.values(data[6].animacao.leandro);
                const lucasAnimacao = Object.values(data[6].animacao.lucas);
                const thiagoAnimacao = Object.values(data[6].animacao.thiago);
                const nilAnimacao = Object.values(data[6].animacao.nil);
                const vencedorAnimacao = Object.values(data[6].animacao.vencedor);

                imgAnimacaoLeandro1.src = leandroAnimacao[0].imagem;
                imgAnimacaoLucas1.src = lucasAnimacao[0].imagem;
                imgAnimacaoThiago1.src = thiagoAnimacao[0].imagem;
                imgAnimacaoNil1.src = nilAnimacao[0].imagem;
                imgAnimacaoVencedor1.src = vencedorAnimacao[0].imagem;

                nomeJaponesAnimacaoLeandro1.innerHTML = leandroAnimacao[0].nomeJ;
                nomeJaponesAnimacaoLucas1.innerHTML = lucasAnimacao[0].nomeJ;
                nomeJaponesAnimacaoThiago1.innerHTML = thiagoAnimacao[0].nomeJ;
                nomeJaponesAnimacaoNil1.innerHTML = nilAnimacao[0].nomeJ;
                nomeJaponesAnimacaoVencedor1.innerHTML = vencedorAnimacao[0].nomeJ;

                nomeInglesAnimacaoLeandro1.innerHTML = leandroAnimacao[0].nomeE;
                nomeInglesAnimacaoLucas1.innerHTML = lucasAnimacao[0].nomeE;
                nomeInglesAnimacaoThiago1.innerHTML = thiagoAnimacao[0].nomeE;
                nomeInglesAnimacaoNil1.innerHTML = nilAnimacao[0].nomeE;
                nomeInglesAnimacaoVencedor1.innerHTML = vencedorAnimacao[0].nomeE;


                imgAnimacaoLeandro2.src = leandroAnimacao[1].imagem;
                imgAnimacaoLucas2.src = lucasAnimacao[1].imagem;
                imgAnimacaoThiago2.src = thiagoAnimacao[1].imagem;
                imgAnimacaoNil2.src = nilAnimacao[1].imagem;
                imgAnimacaoVencedor2.src = vencedorAnimacao[1].imagem;

                nomeJaponesAnimacaoLeandro2.innerHTML = leandroAnimacao[1].nomeJ;
                nomeJaponesAnimacaoLucas2.innerHTML = lucasAnimacao[1].nomeJ;
                nomeJaponesAnimacaoThiago2.innerHTML = thiagoAnimacao[1].nomeJ;
                nomeJaponesAnimacaoNil2.innerHTML = nilAnimacao[1].nomeJ;
                nomeJaponesAnimacaoVencedor2.innerHTML = vencedorAnimacao[1].nomeJ;

                nomeInglesAnimacaoLeandro2.innerHTML = leandroAnimacao[1].nomeE;
                nomeInglesAnimacaoLucas2.innerHTML = lucasAnimacao[1].nomeE;
                nomeInglesAnimacaoThiago2.innerHTML = thiagoAnimacao[1].nomeE;
                nomeInglesAnimacaoNil2.innerHTML = nilAnimacao[1].nomeE;
                nomeInglesAnimacaoVencedor2.innerHTML = vencedorAnimacao[1].nomeE;


                imgAnimacaoLeandro3.src = leandroAnimacao[2].imagem;
                imgAnimacaoLucas3.src = lucasAnimacao[2].imagem;
                imgAnimacaoThiago3.src = thiagoAnimacao[2].imagem;
                imgAnimacaoNil3.src = nilAnimacao[2].imagem;
                imgAnimacaoVencedor3.src = vencedorAnimacao[2].imagem;

                nomeJaponesAnimacaoLeandro3.innerHTML = leandroAnimacao[2].nomeJ;
                nomeJaponesAnimacaoLucas3.innerHTML = lucasAnimacao[2].nomeJ;
                nomeJaponesAnimacaoThiago3.innerHTML = thiagoAnimacao[2].nomeJ;
                nomeJaponesAnimacaoNil3.innerHTML = nilAnimacao[2].nomeJ;
                nomeJaponesAnimacaoVencedor3.innerHTML = vencedorAnimacao[2].nomeJ;

                nomeInglesAnimacaoLeandro3.innerHTML = leandroAnimacao[2].nomeE;
                nomeInglesAnimacaoLucas3.innerHTML = lucasAnimacao[2].nomeE;
                nomeInglesAnimacaoThiago3.innerHTML = thiagoAnimacao[2].nomeE;
                nomeInglesAnimacaoNil3.innerHTML = nilAnimacao[2].nomeE;
                nomeInglesAnimacaoVencedor3.innerHTML = vencedorAnimacao[2].nomeE;
            }

            //antagonista
            {
                const leandroAntagonista = Object.values(data[7].antagonista.leandro);
                const lucasAntagonista = Object.values(data[7].antagonista.lucas);
                const thiagoAntagonista = Object.values(data[7].antagonista.thiago);
                const nilAntagonista = Object.values(data[7].antagonista.nil);
                const vencedorAntagonista = Object.values(data[7].antagonista.vencedor);

                imgAntagonistaLeandro1.src = leandroAntagonista[0].imagem;
                imgAntagonistaLucas1.src = lucasAntagonista[0].imagem;
                imgAntagonistaThiago1.src = thiagoAntagonista[0].imagem;
                imgAntagonistaNil1.src = nilAntagonista[0].imagem;
                imgAntagonistaVencedor1.src = vencedorAntagonista[0].imagem;

                nomeJaponesAntagonistaLeandro1.innerHTML = leandroAntagonista[0].nomeJ;
                nomeJaponesAntagonistaLucas1.innerHTML = lucasAntagonista[0].nomeJ;
                nomeJaponesAntagonistaThiago1.innerHTML = thiagoAntagonista[0].nomeJ;
                nomeJaponesAntagonistaNil1.innerHTML = nilAntagonista[0].nomeJ;
                nomeJaponesAntagonistaVencedor1.innerHTML = vencedorAntagonista[0].nomeJ;

                nomeInglesAntagonistaLeandro1.innerHTML = leandroAntagonista[0].nomeE;
                nomeInglesAntagonistaLucas1.innerHTML = lucasAntagonista[0].nomeE;
                nomeInglesAntagonistaThiago1.innerHTML = thiagoAntagonista[0].nomeE;
                nomeInglesAntagonistaNil1.innerHTML = nilAntagonista[0].nomeE;
                nomeInglesAntagonistaVencedor1.innerHTML = vencedorAntagonista[0].nomeE;

                extraAntagonistaLeandro1.innerHTML = leandroAntagonista[0].extra;
                extraAntagonistaLucas1.innerHTML = lucasAntagonista[0].extra;
                extraAntagonistaThiago1.innerHTML = thiagoAntagonista[0].extra;
                extraAntagonistaNil1.innerHTML = nilAntagonista[0].extra;
                extraAntagonistaVencedor1.innerHTML = vencedorAntagonista[0].extra;


                imgAntagonistaLeandro2.src = leandroAntagonista[1].imagem;
                imgAntagonistaLucas2.src = lucasAntagonista[1].imagem;
                imgAntagonistaThiago2.src = thiagoAntagonista[1].imagem;
                imgAntagonistaNil2.src = nilAntagonista[1].imagem;
                imgAntagonistaVencedor2.src = vencedorAntagonista[1].imagem;

                nomeJaponesAntagonistaLeandro2.innerHTML = leandroAntagonista[1].nomeJ;
                nomeJaponesAntagonistaLucas2.innerHTML = lucasAntagonista[1].nomeJ;
                nomeJaponesAntagonistaThiago2.innerHTML = thiagoAntagonista[1].nomeJ;
                nomeJaponesAntagonistaNil2.innerHTML = nilAntagonista[1].nomeJ;
                nomeJaponesAntagonistaVencedor2.innerHTML = vencedorAntagonista[1].nomeJ;

                nomeInglesAntagonistaLeandro2.innerHTML = leandroAntagonista[1].nomeE;
                nomeInglesAntagonistaLucas2.innerHTML = lucasAntagonista[1].nomeE;
                nomeInglesAntagonistaThiago2.innerHTML = thiagoAntagonista[1].nomeE;
                nomeInglesAntagonistaNil2.innerHTML = nilAntagonista[1].nomeE;
                nomeInglesAntagonistaVencedor2.innerHTML = vencedorAntagonista[1].nomeE;

                extraAntagonistaLeandro2.innerHTML = leandroAntagonista[1].extra;
                extraAntagonistaLucas2.innerHTML = lucasAntagonista[1].extra;
                extraAntagonistaThiago2.innerHTML = thiagoAntagonista[1].extra;
                extraAntagonistaNil2.innerHTML = nilAntagonista[1].extra;
                extraAntagonistaVencedor2.innerHTML = vencedorAntagonista[1].extra;


                imgAntagonistaLeandro3.src = leandroAntagonista[2].imagem;
                imgAntagonistaLucas3.src = lucasAntagonista[2].imagem;
                imgAntagonistaThiago3.src = thiagoAntagonista[2].imagem;
                imgAntagonistaNil3.src = nilAntagonista[2].imagem;
                imgAntagonistaVencedor3.src = vencedorAntagonista[2].imagem;

                nomeJaponesAntagonistaLeandro3.innerHTML = leandroAntagonista[2].nomeJ;
                nomeJaponesAntagonistaLucas3.innerHTML = lucasAntagonista[2].nomeJ;
                nomeJaponesAntagonistaThiago3.innerHTML = thiagoAntagonista[2].nomeJ;
                nomeJaponesAntagonistaNil3.innerHTML = nilAntagonista[2].nomeJ;
                nomeJaponesAntagonistaVencedor3.innerHTML = vencedorAntagonista[2].nomeJ;

                nomeInglesAntagonistaLeandro3.innerHTML = leandroAntagonista[2].nomeE;
                nomeInglesAntagonistaLucas3.innerHTML = lucasAntagonista[2].nomeE;
                nomeInglesAntagonistaThiago3.innerHTML = thiagoAntagonista[2].nomeE;
                nomeInglesAntagonistaNil3.innerHTML = nilAntagonista[2].nomeE;
                nomeInglesAntagonistaVencedor3.innerHTML = vencedorAntagonista[2].nomeE;

                extraAntagonistaLeandro3.innerHTML = leandroAntagonista[2].extra;
                extraAntagonistaLucas3.innerHTML = lucasAntagonista[2].extra;
                extraAntagonistaThiago3.innerHTML = thiagoAntagonista[2].extra;
                extraAntagonistaNil3.innerHTML = nilAntagonista[2].extra;
                extraAntagonistaVencedor3.innerHTML = vencedorAntagonista[2].extra;
            }

            //par
            {
                const leandroPar = Object.values(data[8].par.leandro);
                const lucasPar = Object.values(data[8].par.lucas);
                const thiagoPar = Object.values(data[8].par.thiago);
                const nilPar = Object.values(data[8].par.nil);
                const vencedorPar = Object.values(data[8].par.vencedor);

                imgParLeandro1.src = leandroPar[0].imagem;
                imgParLucas1.src = lucasPar[0].imagem;
                imgParThiago1.src = thiagoPar[0].imagem;
                imgParNil1.src = nilPar[0].imagem;
                imgParVencedor1.src = vencedorPar[0].imagem;
                imgPar2Leandro1.src = leandroPar[0].imagem2;
                imgPar2Lucas1.src = lucasPar[0].imagem2;
                imgPar2Thiago1.src = thiagoPar[0].imagem2;
                imgPar2Nil1.src = nilPar[0].imagem2;
                imgPar2Vencedor1.src = vencedorPar[0].imagem2;

                nomeJaponesParLeandro1.innerHTML = leandroPar[0].nomeJ;
                nomeJaponesParLucas1.innerHTML = lucasPar[0].nomeJ;
                nomeJaponesParThiago1.innerHTML = thiagoPar[0].nomeJ;
                nomeJaponesParNil1.innerHTML = nilPar[0].nomeJ;
                nomeJaponesParVencedor1.innerHTML = vencedorPar[0].nomeJ;

                nomeInglesParLeandro1.innerHTML = leandroPar[0].nomeE;
                nomeInglesParLucas1.innerHTML = lucasPar[0].nomeE;
                nomeInglesParThiago1.innerHTML = thiagoPar[0].nomeE;
                nomeInglesParNil1.innerHTML = nilPar[0].nomeE;
                nomeInglesParVencedor1.innerHTML = vencedorPar[0].nomeE;

                extraParLeandro1.innerHTML = leandroPar[0].extra;
                extraParLucas1.innerHTML = lucasPar[0].extra;
                extraParThiago1.innerHTML = thiagoPar[0].extra;
                extraParNil1.innerHTML = nilPar[0].extra;
                extraParVencedor1.innerHTML = vencedorPar[0].extra;


                imgParLeandro2.src = leandroPar[1].imagem;
                imgParLucas2.src = lucasPar[1].imagem;
                imgParThiago2.src = thiagoPar[1].imagem;
                imgParNil2.src = nilPar[1].imagem;
                imgParVencedor2.src = vencedorPar[1].imagem;
                imgPar2Leandro2.src = leandroPar[1].imagem2;
                imgPar2Lucas2.src = lucasPar[1].imagem2;
                imgPar2Thiago2.src = thiagoPar[1].imagem2;
                imgPar2Nil2.src = nilPar[1].imagem2;
                imgPar2Vencedor2.src = vencedorPar[1].imagem2;

                nomeJaponesParLeandro2.innerHTML = leandroPar[1].nomeJ;
                nomeJaponesParLucas2.innerHTML = lucasPar[1].nomeJ;
                nomeJaponesParThiago2.innerHTML = thiagoPar[1].nomeJ;
                nomeJaponesParNil2.innerHTML = nilPar[1].nomeJ;
                nomeJaponesParVencedor2.innerHTML = vencedorPar[1].nomeJ;

                nomeInglesParLeandro2.innerHTML = leandroPar[1].nomeE;
                nomeInglesParLucas2.innerHTML = lucasPar[1].nomeE;
                nomeInglesParThiago2.innerHTML = thiagoPar[1].nomeE;
                nomeInglesParNil2.innerHTML = nilPar[1].nomeE;
                nomeInglesParVencedor2.innerHTML = vencedorPar[1].nomeE;

                extraParLeandro2.innerHTML = leandroPar[1].extra;
                extraParLucas2.innerHTML = lucasPar[1].extra;
                extraParThiago2.innerHTML = thiagoPar[1].extra;
                extraParNil2.innerHTML = nilPar[1].extra;
                extraParVencedor2.innerHTML = vencedorPar[1].extra;


                imgParLeandro3.src = leandroPar[2].imagem;
                imgParLucas3.src = lucasPar[2].imagem;
                imgParThiago3.src = thiagoPar[2].imagem;
                imgParNil3.src = nilPar[2].imagem;
                imgParVencedor3.src = vencedorPar[2].imagem;
                imgPar2Leandro3.src = leandroPar[2].imagem2;
                imgPar2Lucas3.src = lucasPar[2].imagem2;
                imgPar2Thiago3.src = thiagoPar[2].imagem2;
                imgPar2Nil3.src = nilPar[2].imagem2;
                imgPar2Vencedor3.src = vencedorPar[2].imagem2;

                nomeJaponesParLeandro3.innerHTML = leandroPar[2].nomeJ;
                nomeJaponesParLucas3.innerHTML = lucasPar[2].nomeJ;
                nomeJaponesParThiago3.innerHTML = thiagoPar[2].nomeJ;
                nomeJaponesParNil3.innerHTML = nilPar[2].nomeJ;
                nomeJaponesParVencedor3.innerHTML = vencedorPar[2].nomeJ;

                nomeInglesParLeandro3.innerHTML = leandroPar[2].nomeE;
                nomeInglesParLucas3.innerHTML = lucasPar[2].nomeE;
                nomeInglesParThiago3.innerHTML = thiagoPar[2].nomeE;
                nomeInglesParNil3.innerHTML = nilPar[2].nomeE;
                nomeInglesParVencedor3.innerHTML = vencedorPar[2].nomeE;

                extraParLeandro3.innerHTML = leandroPar[2].extra;
                extraParLucas3.innerHTML = lucasPar[2].extra;
                extraParThiago3.innerHTML = thiagoPar[2].extra;
                extraParNil3.innerHTML = nilPar[2].extra;
                extraParVencedor3.innerHTML = vencedorPar[2].extra;
            }

            //doente
            {
                const leandroDoente = Object.values(data[9].doente.leandro);
                const lucasDoente = Object.values(data[9].doente.lucas);
                const thiagoDoente = Object.values(data[9].doente.thiago);
                const nilDoente = Object.values(data[9].doente.nil);
                const vencedorDoente = Object.values(data[9].doente.vencedor);

                imgDoenteLeandro1.src = leandroDoente[0].imagem;
                imgDoenteLucas1.src = lucasDoente[0].imagem;
                imgDoenteThiago1.src = thiagoDoente[0].imagem;
                imgDoenteNil1.src = nilDoente[0].imagem;
                imgDoenteVencedor1.src = vencedorDoente[0].imagem;

                nomeJaponesDoenteLeandro1.innerHTML = leandroDoente[0].nomeJ;
                nomeJaponesDoenteLucas1.innerHTML = lucasDoente[0].nomeJ;
                nomeJaponesDoenteThiago1.innerHTML = thiagoDoente[0].nomeJ;
                nomeJaponesDoenteNil1.innerHTML = nilDoente[0].nomeJ;
                nomeJaponesDoenteVencedor1.innerHTML = vencedorDoente[0].nomeJ;

                nomeInglesDoenteLeandro1.innerHTML = leandroDoente[0].nomeE;
                nomeInglesDoenteLucas1.innerHTML = lucasDoente[0].nomeE;
                nomeInglesDoenteThiago1.innerHTML = thiagoDoente[0].nomeE;
                nomeInglesDoenteNil1.innerHTML = nilDoente[0].nomeE;
                nomeInglesDoenteVencedor1.innerHTML = vencedorDoente[0].nomeE;

                extraDoenteLeandro1.innerHTML = leandroDoente[0].extra;
                extraDoenteLucas1.innerHTML = lucasDoente[0].extra;
                extraDoenteThiago1.innerHTML = thiagoDoente[0].extra;
                extraDoenteNil1.innerHTML = nilDoente[0].extra;
                extraDoenteVencedor1.innerHTML = vencedorDoente[0].extra;


                imgDoenteLeandro2.src = leandroDoente[1].imagem;
                imgDoenteLucas2.src = lucasDoente[1].imagem;
                imgDoenteThiago2.src = thiagoDoente[1].imagem;
                imgDoenteNil2.src = nilDoente[1].imagem;
                imgDoenteVencedor2.src = vencedorDoente[1].imagem;

                nomeJaponesDoenteLeandro2.innerHTML = leandroDoente[1].nomeJ;
                nomeJaponesDoenteLucas2.innerHTML = lucasDoente[1].nomeJ;
                nomeJaponesDoenteThiago2.innerHTML = thiagoDoente[1].nomeJ;
                nomeJaponesDoenteNil2.innerHTML = nilDoente[1].nomeJ;
                nomeJaponesDoenteVencedor2.innerHTML = vencedorDoente[1].nomeJ;

                nomeInglesDoenteLeandro2.innerHTML = leandroDoente[1].nomeE;
                nomeInglesDoenteLucas2.innerHTML = lucasDoente[1].nomeE;
                nomeInglesDoenteThiago2.innerHTML = thiagoDoente[1].nomeE;
                nomeInglesDoenteNil2.innerHTML = nilDoente[1].nomeE;
                nomeInglesDoenteVencedor2.innerHTML = vencedorDoente[1].nomeE;

                extraDoenteLeandro2.innerHTML = leandroDoente[1].extra;
                extraDoenteLucas2.innerHTML = lucasDoente[1].extra;
                extraDoenteThiago2.innerHTML = thiagoDoente[1].extra;
                extraDoenteNil2.innerHTML = nilDoente[1].extra;
                extraDoenteVencedor2.innerHTML = vencedorDoente[1].extra;


                imgDoenteLeandro3.src = leandroDoente[2].imagem;
                imgDoenteLucas3.src = lucasDoente[2].imagem;
                imgDoenteThiago3.src = thiagoDoente[2].imagem;
                imgDoenteNil3.src = nilDoente[2].imagem;
                imgDoenteVencedor3.src = vencedorDoente[2].imagem;

                nomeJaponesDoenteLeandro3.innerHTML = leandroDoente[2].nomeJ;
                nomeJaponesDoenteLucas3.innerHTML = lucasDoente[2].nomeJ;
                nomeJaponesDoenteThiago3.innerHTML = thiagoDoente[2].nomeJ;
                nomeJaponesDoenteNil3.innerHTML = nilDoente[2].nomeJ;
                nomeJaponesDoenteVencedor3.innerHTML = vencedorDoente[2].nomeJ;

                nomeInglesDoenteLeandro3.innerHTML = leandroDoente[2].nomeE;
                nomeInglesDoenteLucas3.innerHTML = lucasDoente[2].nomeE;
                nomeInglesDoenteThiago3.innerHTML = thiagoDoente[2].nomeE;
                nomeInglesDoenteNil3.innerHTML = nilDoente[2].nomeE;
                nomeInglesDoenteVencedor3.innerHTML = vencedorDoente[2].nomeE;

                extraDoenteLeandro3.innerHTML = leandroDoente[2].extra;
                extraDoenteLucas3.innerHTML = lucasDoente[2].extra;
                extraDoenteThiago3.innerHTML = thiagoDoente[2].extra;
                extraDoenteNil3.innerHTML = nilDoente[2].extra;
                extraDoenteVencedor3.innerHTML = vencedorDoente[2].extra;
            }

            //emocao
            {
                const leandroEmocao = Object.values(data[10].emocao.leandro);
                const lucasEmocao = Object.values(data[10].emocao.lucas);
                const thiagoEmocao = Object.values(data[10].emocao.thiago);
                const nilEmocao = Object.values(data[10].emocao.nil);
                const vencedorEmocao = Object.values(data[10].emocao.vencedor);

                imgEmocaoLeandro1.src = leandroEmocao[0].imagem;
                imgEmocaoLucas1.src = lucasEmocao[0].imagem;
                imgEmocaoThiago1.src = thiagoEmocao[0].imagem;
                imgEmocaoNil1.src = nilEmocao[0].imagem;
                imgEmocaoVencedor1.src = vencedorEmocao[0].imagem;

                nomeJaponesEmocaoLeandro1.innerHTML = leandroEmocao[0].nomeJ;
                nomeJaponesEmocaoLucas1.innerHTML = lucasEmocao[0].nomeJ;
                nomeJaponesEmocaoThiago1.innerHTML = thiagoEmocao[0].nomeJ;
                nomeJaponesEmocaoNil1.innerHTML = nilEmocao[0].nomeJ;
                nomeJaponesEmocaoVencedor1.innerHTML = vencedorEmocao[0].nomeJ;

                nomeInglesEmocaoLeandro1.innerHTML = leandroEmocao[0].nomeE;
                nomeInglesEmocaoLucas1.innerHTML = lucasEmocao[0].nomeE;
                nomeInglesEmocaoThiago1.innerHTML = thiagoEmocao[0].nomeE;
                nomeInglesEmocaoNil1.innerHTML = nilEmocao[0].nomeE;
                nomeInglesEmocaoVencedor1.innerHTML = vencedorEmocao[0].nomeE;


                imgEmocaoLeandro2.src = leandroEmocao[1].imagem;
                imgEmocaoLucas2.src = lucasEmocao[1].imagem;
                imgEmocaoThiago2.src = thiagoEmocao[1].imagem;
                imgEmocaoNil2.src = nilEmocao[1].imagem;
                imgEmocaoVencedor2.src = vencedorEmocao[1].imagem;

                nomeJaponesEmocaoLeandro2.innerHTML = leandroEmocao[1].nomeJ;
                nomeJaponesEmocaoLucas2.innerHTML = lucasEmocao[1].nomeJ;
                nomeJaponesEmocaoThiago2.innerHTML = thiagoEmocao[1].nomeJ;
                nomeJaponesEmocaoNil2.innerHTML = nilEmocao[1].nomeJ;
                nomeJaponesEmocaoVencedor2.innerHTML = vencedorEmocao[1].nomeJ;

                nomeInglesEmocaoLeandro2.innerHTML = leandroEmocao[1].nomeE;
                nomeInglesEmocaoLucas2.innerHTML = lucasEmocao[1].nomeE;
                nomeInglesEmocaoThiago2.innerHTML = thiagoEmocao[1].nomeE;
                nomeInglesEmocaoNil2.innerHTML = nilEmocao[1].nomeE;
                nomeInglesEmocaoVencedor2.innerHTML = vencedorEmocao[1].nomeE;


                imgEmocaoLeandro3.src = leandroEmocao[2].imagem;
                imgEmocaoLucas3.src = lucasEmocao[2].imagem;
                imgEmocaoThiago3.src = thiagoEmocao[2].imagem;
                imgEmocaoNil3.src = nilEmocao[2].imagem;
                imgEmocaoVencedor3.src = vencedorEmocao[2].imagem;

                nomeJaponesEmocaoLeandro3.innerHTML = leandroEmocao[2].nomeJ;
                nomeJaponesEmocaoLucas3.innerHTML = lucasEmocao[2].nomeJ;
                nomeJaponesEmocaoThiago3.innerHTML = thiagoEmocao[2].nomeJ;
                nomeJaponesEmocaoNil3.innerHTML = nilEmocao[2].nomeJ;
                nomeJaponesEmocaoVencedor3.innerHTML = vencedorEmocao[2].nomeJ;

                nomeInglesEmocaoLeandro3.innerHTML = leandroEmocao[2].nomeE;
                nomeInglesEmocaoLucas3.innerHTML = lucasEmocao[2].nomeE;
                nomeInglesEmocaoThiago3.innerHTML = thiagoEmocao[2].nomeE;
                nomeInglesEmocaoNil3.innerHTML = nilEmocao[2].nomeE;
                nomeInglesEmocaoVencedor3.innerHTML = vencedorEmocao[2].nomeE;
            }

            //anime
            {
                const leandroAnime = Object.values(data[11].anime.leandro);
                const lucasAnime = Object.values(data[11].anime.lucas);
                const thiagoAnime = Object.values(data[11].anime.thiago);
                const nilAnime = Object.values(data[11].anime.nil);
                const vencedorAnime = Object.values(data[11].anime.vencedor);

                imgAnimeLeandro1.src = leandroAnime[0].imagem;
                imgAnimeLucas1.src = lucasAnime[0].imagem;
                imgAnimeThiago1.src = thiagoAnime[0].imagem;
                imgAnimeNil1.src = nilAnime[0].imagem;
                imgAnimeVencedor1.src = vencedorAnime[0].imagem;

                nomeJaponesAnimeLeandro1.innerHTML = leandroAnime[0].nomeJ;
                nomeJaponesAnimeLucas1.innerHTML = lucasAnime[0].nomeJ;
                nomeJaponesAnimeThiago1.innerHTML = thiagoAnime[0].nomeJ;
                nomeJaponesAnimeNil1.innerHTML = nilAnime[0].nomeJ;
                nomeJaponesAnimeVencedor1.innerHTML = vencedorAnime[0].nomeE;

                nomeInglesAnimeLeandro1.innerHTML = leandroAnime[0].nomeE;
                nomeInglesAnimeLucas1.innerHTML = lucasAnime[0].nomeE;
                nomeInglesAnimeThiago1.innerHTML = thiagoAnime[0].nomeE;
                nomeInglesAnimeNil1.innerHTML = nilAnime[0].nomeE;
                nomeInglesAnimeVencedor1.innerHTML = vencedorAnime[0].nomeE;


                imgAnimeLeandro2.src = leandroAnime[1].imagem;
                imgAnimeLucas2.src = lucasAnime[1].imagem;
                imgAnimeThiago2.src = thiagoAnime[1].imagem;
                imgAnimeNil2.src = nilAnime[1].imagem;
                imgAnimeVencedor2.src = vencedorAnime[1].imagem;

                nomeJaponesAnimeLeandro2.innerHTML = leandroAnime[1].nomeJ;
                nomeJaponesAnimeLucas2.innerHTML = lucasAnime[1].nomeJ;
                nomeJaponesAnimeThiago2.innerHTML = thiagoAnime[1].nomeJ;
                nomeJaponesAnimeNil2.innerHTML = nilAnime[1].nomeJ;
                nomeJaponesAnimeVencedor2.innerHTML = vencedorAnime[1].nomeE;

                nomeInglesAnimeLeandro2.innerHTML = leandroAnime[1].nomeE;
                nomeInglesAnimeLucas2.innerHTML = lucasAnime[1].nomeE;
                nomeInglesAnimeThiago2.innerHTML = thiagoAnime[1].nomeE;
                nomeInglesAnimeNil2.innerHTML = nilAnime[1].nomeE;
                nomeInglesAnimeVencedor2.innerHTML = vencedorAnime[1].nomeE;


                imgAnimeLeandro3.src = leandroAnime[2].imagem;
                imgAnimeLucas3.src = lucasAnime[2].imagem;
                imgAnimeThiago3.src = thiagoAnime[2].imagem;
                imgAnimeNil3.src = nilAnime[2].imagem;
                imgAnimeVencedor3.src = vencedorAnime[2].imagem;

                nomeJaponesAnimeLeandro3.innerHTML = leandroAnime[2].nomeJ;
                nomeJaponesAnimeLucas3.innerHTML = lucasAnime[2].nomeJ;
                nomeJaponesAnimeThiago3.innerHTML = thiagoAnime[2].nomeJ;
                nomeJaponesAnimeNil3.innerHTML = nilAnime[2].nomeJ;
                nomeJaponesAnimeVencedor3.innerHTML = vencedorAnime[2].nomeE;

                nomeInglesAnimeLeandro3.innerHTML = leandroAnime[2].nomeE;
                nomeInglesAnimeLucas3.innerHTML = lucasAnime[2].nomeE;
                nomeInglesAnimeThiago3.innerHTML = thiagoAnime[2].nomeE;
                nomeInglesAnimeNil3.innerHTML = nilAnime[2].nomeE;
                nomeInglesAnimeVencedor3.innerHTML = vencedorAnime[2].nomeE;
            }
        });
}

//mostrando os vencedores na inicialização
mostrarVencedores();