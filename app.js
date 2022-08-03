let create = document.getElementById('t-shirt').addEventListener('onclick',create_window());

function create_window(e){
    let modal_window = document.getElementById("modal-creator");
    modal_window.style.display = "fixed";
    e.preventdefault();
}
let file = document.getElementById('file').click;
