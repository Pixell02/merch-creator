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

    //
    //Getting color value from input
    //

    const inputColor = document.getElementById('hexa-color');

    inputColor.addEventListener('input',inputValue);

    function inputValue(e)
    {
        backColor.style.backgroundColor = "#"+inputColor.value;
        frontColor.style.backgroundColor = "#"+inputColor.value;
        e.preventDefault();
    }


    // Get button side

    let backSide = document.getElementById('back-side');

    let frontSide = document.getElementById('front-side');

    // Listening backSide Btn

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

    // Listening frontSide Btn

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

    // Getting Upload Btn by click edited Btn

    const upload = document.getElementById('file');
    let realBtn = document.getElementById('file-upload');
    const place = document.getElementById('chosen-image');
    const holder = document.getElementById('files-holder');

    // Listening Upload Btn

    upload.addEventListener('click',uploadFile);

    function uploadFile(e)
    {
        realBtn.click();
        e.preventDefault();
    }

    // Uploading image file and creating object

    realBtn.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(realBtn.files[0]);
    console.log(realBtn.files[0]);
    reader.onload = () =>
    {
        // Placing image on t-shirt

        place.setAttribute("src",reader.result);
        

        // Assignment files holder to a variable

        const holder = document.getElementById('files-holder');

        // Creating div and styling 

        let divRetriangle = document.createElement('div');
        divRetriangle.style.height = '70px';
        divRetriangle.style.width = 'auto';
        divRetriangle.style.border = 'solid black 1px';
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

        text.textContent = realBtn.files[0].name;

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

       
        }
    }
     // Moving image to indicated place

        let imageOnTshirt = document.getElementById('chosen-image');
        
        imageOnTshirt.addEventListener('mousemove',moveElement);
        function moveElement(e)
        {
            let x = e.clientX;
            let y = e.clientY;
            imageOnTshirt.style.left = x + "px";
            imageOnTshirt.style.top = y + "px";

            e.preventDefault();
        }
        