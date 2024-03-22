function mostrarVideo()
{
    document.getElementById("video").classList.remove("esconder");
}

// Get the modal
var modal = document.getElementById("listaModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function ()
{
    modal.style.display = "none";    
    
    // Pausar o vídeo quando o modal é fechado
    const video = document.getElementById('video');
    video.pause();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event)
{
    if (event.target == modal)
    {
        modal.style.display = "none";
    }
}


