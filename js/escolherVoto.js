var resposta;
function teste(){
    // var query = document.getElementById("busca").value;
    // (async () => {
    //     const res = await fetch('https://api.animethemes.moe/animeyear/2021')
    //     resposta = await res.json()
    //     console.log("1");
    //   })()
    //   .then(respost =>
    //     {
    //         let filtrado = resposta.winter;
    //         console.log(filtrado);
    //         let anime = filtrado.filter(item => item.name == query);
    //         console.log(anime);
    //     })

    // modal.style.display = "block";


    document.getElementById("Modal").reset();

}



// Get the modal
var modal = document.getElementById("listaModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 