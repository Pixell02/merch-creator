const merch = document.getElementsByClassName('image').addEventlistener('click',modal());

function modal(e){
    let popup =document.querySelector('div');
    popup = document.createElement('div');
    popup.id = "pop-up";
    popup.style.backgroundColor="white";
    popup.style.width = "200";
    e.preventdefault();
}