

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
const place = document.getElementById('chosen-image');
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
        console.log(reader.result);
        const holder = document.getElementById('files-holder');
        let divRetriangle = document.createElement('div');
        divRetriangle.style.height = '70px';
        divRetriangle.style.width = 'auto';
        divRetriangle.style.border = 'solid black 1px';
        holder.appendChild(divRetriangle);
        
        let miniImage = document.createElement('img');
        miniImage.setAttribute("src",reader.result);
        miniImage.style.marginLeft = "10px";
        miniImage.style.marginTop = "5px";
        miniImage.style. maxHeight = "60px";
        miniImage.style.maxWidth = "60px";
        miniImage.style.justifyContent = "center";
        divRetriangle.appendChild(miniImage);
        let text = document.createElement("span");
        text.textContent = realBtn.files[0].name;
        text.style.color = "black";
        text.style.position = "absolute";
        text.style.marginTop = "25px";
        text.style.width = "200px";
        text.style.marginLeft = "10px";
        text.style.height = "30px";
        text.style.textAlign = "center";
        text.style.fontFamily = "Arial";
        text.style.overflow = "hidden";
        //text.style.backgroundColor = "red";
        divRetriangle.appendChild(text);
        let showIcon = document.createElement('img');
        showIcon.setAttribute("src","open.png");
        showIcon.style.width = "30px";
        showIcon.style.float = "right";
        showIcon.style.marginTop = "20px";
        showIcon.style.marginRight = "40px";
        console.log(showIcon.attributes);
        showIcon.addEventListener('click',changeIcon);
        function changeIcon(e)
        {
            if(showIcon.getAttribute('src')=="open.png")
            {
                showIcon.setAttribute("src","closed.png");
                document.getElementById('logo').style.display = 'none';
            }
            else
            {
                showIcon.setAttribute("src","open.png");
                document.getElementById('logo').style.display = 'flex';
            }
            e.preventDefault();
        }
        divRetriangle.appendChild(showIcon);
        let imageOnTshirt = document.getElementById('chosen-image');
        imageOnTshirt.addEventListener('mousedown',moveElement);
        function moveElement(e)
        {
            let x = e.clientX;
            let y = e.clientY;
            imageOnTshirt.style.left = x + "px";
            imageOnTshirt.style.top = y + "px";

            
        }
    }
    
}