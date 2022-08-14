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
    let showIcon;
    let showHideFront = [];
    let showHideBack = [];
    

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
    let frontArrayLength;
    let backArrayLength;
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
    
    realBtn.onchange = () => 
    {
        let reader = new FileReader();
        arrayLength = realBtn.files.length-1;
        reader.readAsDataURL(realBtn.files[arrayLength]);
        addImage = document.createElement('img');
    
    
         if(frontSideBtn == true)
        {
             if(document.getElementsByClassName('frontSide').length > 0)
            {
                frontArrayLength = document.getElementsByClassName('frontSide').length;
                addImage.style.zIndex = parseInt(4+frontArrayLength);
            }
             else
            {
                frontArrayLength = 0;
            }
            addImage.id = "frontSide"+frontArrayLength;
            addImage.className = "frontSide";
            
        }
         else
        {
             if(document.getElementsByClassName('backSide').length > 0)
            {
                backArrayLength = document.getElementsByClassName('backSide').length;
                addImage.style.zIndex = parseInt(4+backArrayLength);
            }
             else
            {
                backArrayLength = 0;
            }
            addImage.id = "backSide"+backArrayLength;
            addImage.className = "backSide";
            
        }
        addImage.setAttribute("draggable","true");
        addImage.style.zIndex = parseInt(4+arrayLength);
    
        reader.onload = () =>
        { 
        
        // Placing image on t-shirt
        
            addImage.setAttribute("src",reader.result);
            document.getElementById('frontSide-logo').appendChild(addImage);

        // Creating div and styling 

            let divRetriangle = document.createElement('div');
            if(frontSideBtn == true)
             {
                divRetriangle.id = "front-index"+frontArrayLength;
                divRetriangle.className = "front-index";
            }
             else
            {
                divRetriangle.id = "back-index"+backArrayLength; 
                divRetriangle.className = "back-index";
            }
            divRetriangle.style.height = '70px';
            divRetriangle.style.width = 'auto';
            divRetriangle.style.borderBottom = 'solid black 1px';
            holder.appendChild(divRetriangle);

            // miniImage holder

            let miniImageHolder = document.createElement('div');
            miniImageHolder.className = "image-holder"
            miniImageHolder.style.float = "left";
            miniImageHolder.style.borderRight = "solid black 1px";
            miniImageHolder.style.height = "70px";
            miniImageHolder.style.width = "80px";
            divRetriangle.appendChild(miniImageHolder);
        
        // Creating image element

            let miniImage = document.createElement('img');

        // Assigment loaded image to variable

            miniImage.setAttribute("src",reader.result);


            miniImageHolder.appendChild(miniImage);

        // Creating file name element

            let text = document.createElement("span");

        //  Assigment name of file to variable to show on website      

            text.innerHTML = realBtn.files[0].name;

        // Selecting div to put element into div

            divRetriangle.appendChild(text);

        // Creating image element

            showIcon = document.createElement('img');

        // Styling and setting image

            showIcon.setAttribute("src","open.png");
            showIcon.style.width = "30px";
            showIcon.style.float = "right";
            showIcon.style.marginTop = "20px";
            showIcon.style.marginRight = "40px";
             if(frontSideBtn == true)
            {
                showIcon.id = "frontIcon"+frontArrayLength;
                showIcon.className = "frontIcon";
                showHideFront[frontArrayLength] = true;
                
            }
             else
            {
                showIcon.id = "backIcon"+backArrayLength;
                showIcon.className = "backIcon";
                showHideBack[backArrayLength] = true;
            }
        

        // Listening event on icon

            showIcon.addEventListener('click',changeIcon);

        
      
            divRetriangle.appendChild(showIcon);
        
        }
    }

        //Changing icon
        
     function changeIcon(e)
    {
        let getIcon = e.target.id;
        let idText = getIcon.match(/\d/g).join('');
        console.log(idText);
        showIcon = e.target;
             if(showIcon.getAttribute('src') == "open.png")
            {
                 showIcon.setAttribute("src","closed.png");
                 if(frontSideBtn == true)
                {
                    document.getElementById("frontSide"+idText).style.display = "none";
                    showHideFront[idText] = false;
                    console.log(showHideFront[idText]);
                }
                 else
                {
                    document.getElementById("backSide"+idText).style.display = "none";
                    showHideBack[idText] = false;
                    console.log(showHideBack[idText]);
                }
            }
             else
            {
                showIcon.setAttribute("src","open.png");
                if(frontSideBtn == true)
               {
                    document.getElementById("frontSide"+idText).style.display = "initial";
                    showHideFront[idText] = true;
                    console.log(showHideFront[idText]);
               }
                else
               {
                    document.getElementById("backSide"+idText).style.display = "initial";
                    showHideBack[idText] = true;
                    console.log(showHideBack[idText]);
               }
            }
            e.preventDefault();
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
        
                // Showing frontSide images if they are added and setting their properties

                 if( document.getElementsByClassName("frontSide").length > 0)
                {
                     for(let i = 0 ; i <= frontArrayLength ; i++)
                    {
                
                
                     if(showHideFront[i] == true)
                    {
                        document.getElementById("frontSide"+i).style.display = "flex";
                    }
                     else
                    {
                        document.getElementById("frontSide"+i).style.display = "none";
                    }
                    }
                }
                 else
                {
                    console.log("false");
                    
                }

            // Disappearing backSide images 
            
             for(let i = 0 ; i <= backArrayLength ; i++)
            {
                
                if(document.getElementsByClassName('backSide').length > 0)
                {
                    document.getElementById("backSide"+i).style.display = "none";
                    
                }
                else
                {
                    console.log("false");
                    break;
                }
            }

            // Showing frontSide layers and setting their properties

             for(let i = 0 ; i<=frontArrayLength ; i++)
            {
                 if(document.getElementsByClassName("front-index").length > 0)
                {
                    document.getElementById('front-index'+i).style.display = "inherit";
                     if(showHideFront[i] == true)
                    {
                        document.getElementById("frontIcon"+i).setAttribute("src","open.png");
                    }
                     else
                    {
                        document.getElementById("frontIcon"+i).setAttribute("src","closed.png");
                    }
                    
                }
                 else
                {
                    console.log("false");
                    break;
                }
            }

            // Disappearing backSide layers

             for(let i = 0 ; i<=backArrayLength ; i++)
            {
                
                 if(document.getElementsByClassName("back-index").length > 0)
                {
                    document.getElementById("back-index"+i).style.display = "none";
                }
                 else
                {
                    showHideBack[i] = null;
                    break;
                }
            }
        e.preventDefault();
    }

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
            
            // Disappearing frontSide images

             for(let i = 0 ; i <= frontArrayLength ; i++)
            {
                
                 if(document.getElementsByClassName("frontSide").length > 0)
                {
                    document.getElementById("frontSide"+i).style.display = "none";
                }
                 else
                {
                    
                    console.log("false");
                    break;
                }
            }

            // Showing backSide images and setting their properties

             for(let i = 0 ; i <= backArrayLength ; i++)
            {
                
                 if(document.getElementsByClassName("backSide").length > 0)
                {
                    
                     if(showHideBack[i] == true)
                    {
                        document.getElementById("backIcon"+i).setAttribute("src","open.png");
                        document.getElementById("backSide"+i).style.display = "inherit";
                    }
                     else
                    {
                        document.getElementById("backIcon"+i).setAttribute("src","closed.png");
                        document.getElementById("backSide"+i).style.display = "none";
                    }
                }
                 else
                {
                    showHideBack[i] = null;
                    break;
                }
            }

            // Disappearing front layers

             for(let i = 0 ; i <= frontArrayLength ; i++)
            {   
                 if(document.getElementsByClassName('front-index').length > 0)
                {
                    document.getElementById("front-index"+i).style.display = "none";
                }
                 else
                {
                    console.log("false");
                    break;
                }
            }

            // Setting layer icon to opened or closed and showing layers

             for(let i = 0 ; i<=backArrayLength ; i++)
            {   
                
                 if(document.getElementsByClassName("back-index").length > 0)
                {
                    document.getElementById("back-index"+i).style.display = "inherit";
                    if(showHideBack[i] == true)
                    {
                        document.getElementById("backIcon"+i).setAttribute("src","open.png");
                    }
                    else
                    {
                        document.getElementById("backIcon"+i).setAttribute("src","closed.png");
                    }
                }
                 else
                {
                    break;
                }
            }
        e.preventDefault();
    }
     // Moving image to indicated place
     let images;
     let selectImage;
        if(frontSideBtn == true)
        {
             if(document.getElementsByClassName("frontSide").length > 0)
            {
                images = document.querySelector('.frontSide');
                images.addEventListener('dragstart',dragStart);
            }
             else
            {
                console.log("false");
            }
        }
         else
        {
            if(document.getElementsByClassName("backSide").length > 0)
            {
                images = document.querySelector('.backSide');
            }
             else
            {
                console.log("false");
            }
        }
        
         function dragStart()
        {
            console.log("drag");
            this.className += 'hold';
            setTimeout(() => this.className = 'invisible') ;
            
        }
       
        