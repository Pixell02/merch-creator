    // Get modal element
    let modal = document.getElementById('modal');
    // Get open button
    let openBtn = document.getElementById('create');
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

    // Get color from input
    
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

    
    //Getting color value from input
    
    const inputColor = document.getElementById('hexa-color');

    inputColor.addEventListener('input',inputValue);

    function inputValue(e)
    {
        backColor.style.backgroundColor = "#"+inputColor.value;
        frontColor.style.backgroundColor = "#"+inputColor.value;
        e.preventDefault();
    }

    let addImage;
    

    // Getting Upload Btn by click edited Btn
    

    const upload = document.getElementById('file');
    let realBtn = document.getElementById('file-upload');
    const holder = document.getElementById('files-holder');

    // Listening Upload Btn

    upload.addEventListener('click',uploadFile);

    function uploadFile(e)
    {
        realBtn.click();
        e.preventDefault();
    }
    let frontSide = document.getElementById('front-sideBtn');
    let backSide = document.getElementById('back-sideBtn');
    let frontSideBtn = true;
    let arrayLength;
    frontSide.addEventListener('click', btnValue)
    function btnValue(e)
    {
        frontSideBtn=true;
        e.preventDefault();
    }
    backSide.addEventListener('click', backBtnValue)
    function backBtnValue(e)
    {
        frontSideBtn=false;
        e.preventDefault();
    }
    // Uploading image file and creating object
    //let place = document.getElementById('image'+arrayLength);
    realBtn.onchange = () => {
    let reader = new FileReader();
    arrayLength = realBtn.files.length-1;
    console.log(arrayLength);
    reader.readAsDataURL(realBtn.files[arrayLength]);
    addImage = document.createElement('img');
    
    
    if(frontSideBtn == true)
    {
        addImage.id = "frontSide"+arrayLength;
    }
    else
    {
        addImage.id = "backSide"+arrayLength;
    }
    addImage.className = "images";
    addImage.style.zIndex = "4";
    console.log(realBtn.files[arrayLength]);
    reader.onload = () =>
    { 
        // Placing image on t-shirt
        
        addImage.setAttribute("src",reader.result);
        document.getElementById('frontSide-logo').appendChild(addImage);

        // Assignment files holder to a variable

        const holder = document.getElementById('files-holder');

        // Creating div and styling 

        let divRetriangle = document.createElement('div');
        if(frontSideBtn == true)
        {
        divRetriangle.id = "front-index"+arrayLength;
        }
        else
        {
            divRetriangle.id = "back-index"+arrayLength; 
        }
        divRetriangle.style.height = '70px';
        divRetriangle.style.width = 'auto';
        divRetriangle.style.borderBottom = 'solid black 1px';
        holder.appendChild(divRetriangle);
        
        // Creating image element

        let miniImage = document.createElement('img');

        // Assigment loaded image to variable

        miniImage.setAttribute("src",reader.result);

        // Styling image variable

        miniImage.style.marginLeft = "10px";
        miniImage.style.marginTop = "5px";
        miniImage.style. maxHeight = "60px";
        miniImage.style.maxWidth = "60px";
        miniImage.style.justifyContent = "center";
        divRetriangle.appendChild(miniImage);

        // Creating file name element

        let text = document.createElement("span");

        //  Assigment name of file to variable to show on website      

        text.innerHTML = realBtn.files[0].name;

        // Styling name of file

        text.style.color = "black";
        text.style.position = "absolute";
        text.style.marginTop = "25px";
        text.style.width = "200px";
        text.style.marginLeft = "10px";
        text.style.height = "30px";
        text.style.textAlign = "center";
        text.style.fontFamily = "Arial";
        text.style.overflow = "hidden";

        // Selecting div to put element into div

        divRetriangle.appendChild(text);

        // Creating image element

        let showIcon = document.createElement('img');

        // Styling and setting image

        showIcon.setAttribute("src","open.png");
        showIcon.style.width = "30px";
        showIcon.style.float = "right";
        showIcon.style.marginTop = "20px";
        showIcon.style.marginRight = "40px";
        console.log(showIcon.attributes);

        // Listening event on icon

        showIcon.addEventListener('click',changeIcon);

        //Changing icon
        

        function changeIcon(e)
        {
            let countImages = document.getElementsByClassName("images");
            console.log(countImages);
            if(showIcon.getAttribute('src')=="open.png")
            {
                showIcon.setAttribute("src","closed.png");
                for(let i = 0 ; i <= countImages.length ; i++)
                {
                    countImages[i].style.display = "none";
                    console.log(countImages[i].style.display);
                }
            }
            else
            {
                showIcon.setAttribute("src","open.png");
                for(let i = 0 ; i <= countImages.length ; i++)
                {
                    countImages[i].style.display = "flex"; 
                    console.log(countImages[i].style.display);
                }
                
            }
            
            e.preventDefault();
        }
        divRetriangle.appendChild(showIcon);
        
    }
        }
        
        // Listening and getting frontSide Btn

        
    
    frontSide.addEventListener('click',changeToFrontSide);

    function changeToFrontSide(e)
    {
        document.getElementById('front').style.display = 'inline';
        document.getElementById('back').style.display = 'none';
        document.getElementById('back-background').style.display = 'none';
        document.getElementById('front-background').style.display = 'inline';
        document.getElementById('front-sideBtn').style.backgroundColor = '#0a1e42';
        document.getElementById('back-sideBtn').style.backgroundColor = '#133879';
        for(let i = 0 ; i <= arrayLength ; i++)
            {
                document.getElementById("frontSide"+i).style.display = "flex";
            }
        for(let i = 0 ; i <= arrayLength ; i++)
            {
                document.getElementById("backSide"+i).style.display = "none";
            }
        for(let i = 0 ; i<=arrayLength ; i++)
            {
                document.getElementById("front-index"+i).style.display = "flex";
            }
        for(let i = 0 ; i<=arrayLength ; i++)
            {
                document.getElementById("back-index"+i).style.display = "none";
            }
        e.preventDefault();
    }
        // Get button backSide

    

    // Listening backSide Btn

    backSide.addEventListener('click',changeToBackSide);

    function changeToBackSide(e)
    {

        document.getElementById('front').style.display = 'none';
        document.getElementById('back').style.display = 'inline';
        document.getElementById('back-background').style.display = 'inline';
        document.getElementById('front-background').style.display = 'none';
        document.getElementById('back-sideBtn').style.backgroundColor = '#0a1e42';
        document.getElementById('front-sideBtn').style.backgroundColor = '#133879';
        for(let i = 0 ; i <= arrayLength ; i++)
            {
                document.getElementById("frontSide"+i).style.display = "none";
            }
        for(let i = 0 ; i <= arrayLength ; i++)
            {
                document.getElementById("backSide"+i).style.display = "flex";
            }
        for(let i = 0 ; i<=arrayLength ; i++)
            {
                document.getElementById("front-index"+i).style.display = "none";
            }
        for(let i = 0 ; i<=arrayLength ; i++)
            {
                document.getElementById("back-index"+i).style.display = "flex";
            }
        e.preventDefault();
    }
     // Moving image to indicated place

        // let imageOnTshirt = document.getElementById('chosen-frontSide-image');
        
        // imageOnTshirt.addEventListener('mousemove',moveElement);
        // function moveElement(e)
        // {
        //     let x = e.clientX;
        //     let y = e.clientY;
        //     imageOnTshirt.style.left = x + "px";
        //     imageOnTshirt.style.top = y + "px";

        //     e.preventDefault();
        // }
        
        // Only fronSide elements
        