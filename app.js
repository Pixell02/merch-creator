

// Get modal element
let modal = document.getElementById('modal');
// Get open button
let openBtn = document.getElementById('t-shirt');
// Closing button
let closeBtn = document.getElementById('closeBtn');
// Opening modal window
openBtn.addEventListener('click', openModal);

function openModal(e){
    modal.style.display = "block";
    e.preventdefault();
}
// Closing modal window
closeBtn.addEventListener('click', closeModal);

function closeModal(e){
    modal.style.display = "none";
    e.preventdefault();
}

// Get back Btn

let backSide = document.getElementById('back-side');

let frontSide = document.getElementById('front-side');

backSide.addEventListener('click',changeToBackSide);

function changeToBackSide(e){

    document.getElementById('front').style.display = 'none';
    document.getElementById('back').style.display = 'inline';
    document.getElementById('back-side').style.backgroundColor = '#0a1e42';
    document.getElementById('front-side').style.backgroundColor = '#133879';
    e.preventdefault();
}

frontSide.addEventListener('click',changeToFrontSide);

function changeToFrontSide(e){
    document.getElementById('front').style.display = 'inline';
    document.getElementById('back').style.display = 'none';
    document.getElementById('front-side').style.backgroundColor = '#0a1e42';
    document.getElementById('back-side').style.backgroundColor = '#133879';
    e.preventdefault();
}

let updateColor = document.getElementById('front');