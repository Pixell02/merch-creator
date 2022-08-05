

// Get modal element
let modal = document.getElementById('modal');
// Get open button
let openBtn = document.getElementById('t-shirt');
// Closing button
let closeBtn = document.getElementById('closeBtn');
// Opening modal window
openBtn.addEventListener('click', openModal);

function openModal(e)
{
    modal.style.display = "flex";
    e.preventDefault();
}
// Closing modal window
closeBtn.addEventListener('click', closeModal);

function closeModal(e)
{
    modal.style.display = "none";
    e.preventDefault();
}
// Get color

// const hexColor = document.getElementById('hexacolor');
const pickerColor = document.getElementById('pallet');
const backColor = document.getElementById('back-background');
const frontColor = document.getElementById('front-background');
pickerColor.addEventListener('input',colorValue);
function colorValue(e)
{
    backColor.style.backgroundColor = pickerColor.value;
    frontColor.style.backgroundColor = pickerColor.value;
    e.preventDefault();
}
const inputColor = document.getElementById('hexa-color');

inputColor.addEventListener('input',inputValue);

function inputValue(e)
{
    backColor.style.backgroundColor = "#"+inputColor.value;
    frontColor.style.backgroundColor = "#"+inputColor.value;
    e.preventDefault();
}


// Get back Btn

let backSide = document.getElementById('back-side');

let frontSide = document.getElementById('front-side');

backSide.addEventListener('click',changeToBackSide);

function changeToBackSide(e)
{

    document.getElementById('front').style.display = 'none';
    document.getElementById('back').style.display = 'inline';
    document.getElementById('back-background').style.display = 'inline';
    document.getElementById('front-background').style.display = 'none';
    document.getElementById('back-side').style.backgroundColor = '#0a1e42';
    document.getElementById('front-side').style.backgroundColor = '#133879';
    
    
    e.preventDefault();
}

frontSide.addEventListener('click',changeToFrontSide);

function changeToFrontSide(e)
{
    document.getElementById('front').style.display = 'inline';
    document.getElementById('back').style.display = 'none';
    document.getElementById('back-background').style.display = 'none';
    document.getElementById('front-background').style.display = 'inline';
    document.getElementById('front-side').style.backgroundColor = '#0a1e42';
    document.getElementById('back-side').style.backgroundColor = '#133879';
    
    e.preventDefault();
}



let upload = document.getElementById('file');
let realBtn = document.getElementById('file-upload');
let place = document.getElementById('chosen-image');
let holder = document.getElementById('files-holder');
upload.addEventListener('click',uploadFile);

function uploadFile(e)
{
    realBtn.click();
    e.preventDefault();
}



    realBtn.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(realBtn.files[0]);
    console.log(realBtn.files[0]);
    reader.onload = () =>
    {
        place.setAttribute("src",reader.result);

    }
}