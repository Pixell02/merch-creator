    
    // Get modal element
    let modal = document.getElementById('modal');
    // Get open button
    let openBtn = document.getElementById('create');
    // Closing button
    let closeBtn = document.getElementById('closeBtn');
    // Opening modal window
    openBtn.addEventListener('click', openModal);

    function openModal(e){
        modal.style.display = "flex";
        e.preventDefault();
    }
    // Closing modal window
    closeBtn.addEventListener('click', closeModal);

    function closeModal(e){
        modal.style.display = "none";
        e.preventDefault();
    }

    // Get color from input
    
     let pickerColor = document.getElementById('pallet');
     const backColor = document.getElementById('back-background');
     const frontColor = document.getElementById('front-background');
     let inputColor = document.getElementById('hexa-color');
    
    //Getting color value from input
    
    pickerColor.addEventListener('input',colorValue);
     function colorValue(e){
         backColor.style.backgroundColor = pickerColor.value;
         frontColor.style.backgroundColor = pickerColor.value;
         inputColor.value = pickerColor.value;
         e.preventDefault();
     }
    
        
    inputColor.addEventListener('input',inputValue);

    function inputValue(e){
        frontColor.style.backgroundColor = inputColor.value;
        backColor.style.backgroundColor = inputColor.value;
        
        pickerColor.value = inputColor.value;
        e.preventDefault();
    }

    // Getting Upload Btn by click edited Btn
    

    const upload = document.getElementById('file');
    let realBtn = document.getElementById('file-upload');
    const holder = document.getElementById('files-holder');

    // Listening Upload Btn

    upload.addEventListener('click',uploadFile);

    function uploadFile(e){
        realBtn.click();
        e.preventDefault();
    }

    
    
   
        
    
    const frontCanvas = new fabric.Canvas('frontCanvas');
    const backCanvas = new fabric.Canvas('backCanvas');
    document.getElementsByClassName("canvas-container")[0].style.position = "absolute";
    document.getElementsByClassName("canvas-container")[0].style.zIndex = "101";
    document.getElementsByClassName("canvas-container")[1].style.position = "absolute";
    document.getElementsByClassName("canvas-container")[0].style.zIndex = "100";
    let frontSide = document.getElementById('front-sideBtn');
    let backSide = document.getElementById('back-sideBtn');
    let frontSideBtn = true;
    let arrayLength;
    let frontArrayLength;
    
    let i;
    let addImage;
    let showIcon;
    let showHideFront = [];
    let showHideBack = [];
    let frontIconIndex;
    let backIconIndex;
    let createBin;
    let divRetriangle;
    frontSide.addEventListener('click', btnValue)
    function btnValue(e){
        frontSideBtn = true;
        e.preventDefault();
    }
    backSide.addEventListener('click', backBtnValue)
    function backBtnValue(e){
        frontSideBtn = false;
        e.preventDefault();
    }
    // Uploading image file and creating object
    
    realBtn.onchange = () => {
        let reader = new FileReader();
        arrayLength = realBtn.files.length-1;
        reader.readAsDataURL(realBtn.files[arrayLength]);
         // Creating div and styling 

            divRetriangle = document.createElement('div');
            if(frontSideBtn == true){
                
                divRetriangle.className = "front-index";
                frontIconIndex = document.getElementsByClassName("front-index").length;
                console.log(frontIconIndex);
                divRetriangle.id = "front-index"+frontIconIndex;
                
            }
             else{
                
                divRetriangle.className = "back-index";
                backIconIndex = document.getElementsByClassName("back-index").length;
                console.log(backIconIndex);
                divRetriangle.id = "back-index"+backIconIndex; 
                
            }
            divRetriangle.style.height = '70px';
            divRetriangle.style.width = '330px';
            divRetriangle.style.borderBottom = 'solid black 1px';
            divRetriangle.style.float = "left";
            holder.appendChild(divRetriangle);

            
        addImage = document.createElement('img');
        
        
         if(frontSideBtn == true){
                
                addImage.style.zIndex = parseInt(4+frontIconIndex);
             
            
            addImage.className = "frontSide front-canvas-img"; 
            addImage.id = "frontSide"+frontIconIndex; 
         } else {
                
                addImage.style.zIndex = parseInt(4+backIconIndex);
            
            addImage.id = "backSide"+backIconIndex;
            addImage.className = "backSide back-canvas-img";
        }
        
        addImage.style.zIndex = parseInt(10+arrayLength);
        addImage.style.display = "inherit";
        reader.onload = (e) => { 
        let imgObj = new Image();
        imgObj.src = e.target.result;
        
        imgObj.onload = function(){
            let newImg = new fabric.Image(imgObj);
            newImg.scaleToHeight(150);
            newImg.scaleToWidth(150); 
            newImg.visible = true;
            if(frontSideBtn == true){
                frontCanvas.centerObject(newImg);
                frontCanvas.add(newImg);
                frontCanvas.renderAll();
            } else{
                backCanvas.centerObject(newImg);
                backCanvas.add(newImg);
                backCanvas.renderAll();
            }
        }
       
       

        // miniImage holder

            let miniImageHolder = document.createElement('div');
            miniImageHolder.className = "image-holder"
            miniImageHolder.style.float = "left";
            miniImageHolder.style.display = "inline-block";
            miniImageHolder.style.borderRight = "solid black 1px";
            miniImageHolder.style.height = "70px";
            miniImageHolder.style.width = "80px";
            divRetriangle.appendChild(miniImageHolder);
        
        // Creating image element

            let miniImage = document.createElement('img');

        // Assigment loaded image to variable

            miniImage.setAttribute("src",reader.result);
            miniImage.style.float = "left";
            miniImageHolder.appendChild(miniImage);

        // Creating file name element

            let text = document.createElement("span");

        //  Assigment name of file to variable to show on website      

            text.innerHTML = realBtn.files[0].name;
             text.style.float = "left";
            text.style.display = "inline-block";
        // Selecting div to put element into div

            divRetriangle.appendChild(text);

        // Creating image element

            showIcon = document.createElement('img');

        // Styling and setting image
            let rightSideHolder = document.createElement("div");
            rightSideHolder.style.width = "85px";
            // rightSideHolder.style.display = "inline";
            rightSideHolder.style.float = "left";
            divRetriangle.appendChild(rightSideHolder);

            showIcon.setAttribute("src","open.png");
            showIcon.style.width = "25px";
            showIcon.style.float = "left";
            showIcon.style.display = "inline";
            showIcon.style.marginTop = "20px";
            showIcon.style.marginLeft = "10px";
             if(frontSideBtn == true){
                showIcon.id = "frontIcon"+frontIconIndex;
                showIcon.className = "frontIcon";
                showHideFront[frontIconIndex] = true;  
            }
             else{
                showIcon.id = "backIcon"+backIconIndex;
                showIcon.className = "backIcon";
                showHideBack[backIconIndex] = true;
            }
        

        // Listening event on icon

            showIcon.addEventListener('click',changeIcon);
            rightSideHolder.appendChild(showIcon);

            
            createBin = document.createElement("img");
            createBin.setAttribute("src","bin.png");
            createBin.style.width = "25px";
            createBin.style.float = "left";
            createBin.style.marginTop = "20px";
            createBin.style.display = "block";
            createBin.style.marginLeft = "15px";
            if(frontSideBtn == true){
                createBin.id = "front-bin"+frontIconIndex;
                createBin.className = "frontBin";    
            } else {createBin.id = "back-bin"+backIconIndex;
            createBin.className = "backBin";   
            }
            
            createBin.addEventListener("click",deleteElement);
            rightSideHolder.appendChild(createBin);
            
        }
    }
        //Deleting element
        

        function deleteElement(e){
            
            if(frontSideBtn == true){
            let getElement = e.target.id;
            console.log(getElement);
            let idText = getElement.match(/\d/g).join('');
            console.log(idText);
            let getId;
                frontCanvas.remove(frontCanvas.item(idText));
                frontCanvas.renderAll();
                
                document.getElementById("front-index"+idText).remove();
                
                let binElements = document.querySelectorAll(".front-index");
                console.log(binElements);
                console.log(createBin);
                binElements.forEach( (e,i) => {
                    console.log(i);
                    e.id = "front-index"+i;
                    console.log(e.id);
                    document.getElementsByClassName("frontBin")[i].id = "front-bin"+ i;
                    console.log(createBin.id);
                    document.getElementsByClassName("frontIcon")[i].id = "frontIcon"+ i;
                    console.log(showIcon.id);
                });
                
            } else {
                let getElement = e.target.id;
                console.log(getElement);
                let idText = getElement.match(/\d/g).join('');
                console.log(idText);
                console.log(backCanvas.item(idText));
                backCanvas.remove(backCanvas.item(idText));
                backCanvas.renderAll();
                document.getElementById("back-index"+idText).remove();
                let binElements = document.querySelectorAll(".back-index");
                console.log(binElements);
                binElements.forEach( (e,i) => {
                    document.getElementsByClassName("backBin")[i].id = "back-bin"+i;
                    document.getElementsByClassName("backIcon")[i].id = "backIcon"+i;
                    e.id = "back-index"+i;
                });
            }
            e.preventDefault();
        }
        
        //Changing icon
        
     function changeIcon(e){
        let getIcon = e.target.id;
        let idText = getIcon.match(/\d/g).join('');
        console.log(idText);
        showIcon = e.target;
             if(showIcon.getAttribute('src') == "open.png"){
                 showIcon.setAttribute("src","closed.png");
                 if(frontSideBtn == true){
                    frontCanvas.item(idText).visible = false;
                    frontCanvas.renderAll();
                    showHideFront[idText] = false;
                    console.log(showHideFront[idText]);
                 }
                 else{
                    backCanvas.item(idText).visible = false;
                    backCanvas.renderAll();
                    showHideBack[idText] = false;
                    console.log(showHideBack[idText]);
                 }
             } else {
                showIcon.setAttribute("src","open.png");
                if(frontSideBtn == true){
                    frontCanvas.item(idText).visible = true;
                    frontCanvas.renderAll();
                    showHideFront[idText] = true;
                    console.log(showHideFront[idText]);
               } else{
                backCanvas.item(idText).visible = true;
                backCanvas.renderAll();
                    showHideBack[idText] = true;
                    console.log(showHideBack[idText]);
                 }
                }
        e.preventDefault();
     }
        

        // Listening and getting frontSide Btn
    
    frontSide.addEventListener('click',changeToFrontSide);
    
    function changeToFrontSide(e){
        document.getElementsByClassName("canvas-container")[0].style.zIndex = "101";
        document.getElementsByClassName("canvas-container")[1].style.zIndex = "100";
        document.getElementById('front').style.display = 'inline';
        document.getElementById('back').style.display = 'none';
        document.getElementById('back-background').style.display = 'none';
        document.getElementById('front-background').style.display = 'inline';
        document.getElementById('front-sideBtn').style.backgroundColor = '#0a1e42';
        document.getElementById('back-sideBtn').style.backgroundColor = '#133879';
        
                // Showing frontSide images if they are added and setting their properties
                    document.getElementById("frontCanvas").style.display = "initial";
                    document.getElementById("backCanvas").style.display = "none";
                let frontElements = document.querySelectorAll(".frontSide");
                
                    console.log(frontElements);
                    frontElements.forEach((e,i) => {
                        if(showHideFront[i] == true){
                        document.getElementById("frontSide"+i).style.display = "flex";
                        console.log ("flex");
                        } else {
                        document.getElementById("frontSide"+i).style.display = "none";
                        console.log ("none");
                        }
                    });
                

            // Disappearing backSide images 
            let backElements = document.querySelectorAll(".backSide");
             backElements.forEach((e,i) => {
                if(document.getElementsByClassName('backSide').length > 0){
                    document.getElementById("backSide"+i).style.display = "none";  
                    
                } else {
                    console.log("false");
                }
             });

            // Showing frontSide layers and setting their properties

                let frontHolder = document.querySelectorAll(".front-index")
                frontHolder.forEach((e,i) => {
                 if(document.getElementsByClassName("front-index").length > 0) {
                    document.getElementById('front-index'+i).style.display = "inherit";
                     if(showHideFront[i] == true) {
                        document.getElementById("frontIcon"+i).setAttribute("src","open.png");
                     } else {
                        document.getElementById("frontIcon"+i).setAttribute("src","closed.png");
                    }   
                 } else {
                    console.log("false");
                 }
             });

            // Disappearing backSide layers

             let backHolder = document.querySelectorAll(".back-index");
             
             backHolder.forEach((e,i) =>{
                 if(document.getElementsByClassName("back-index").length > 0){
                    document.getElementById("back-index"+i).style.display = "none";
                    
                 } else {
                    showHideBack[i] = null;   
                 }
            });
        e.preventDefault();
    }

    // Listening backSide Btn

    backSide.addEventListener('click',changeToBackSide);

    function changeToBackSide(e)
    {
        document.getElementsByClassName("canvas-container")[0].style.zIndex = "100";
        document.getElementsByClassName("canvas-container")[1].style.zIndex = "101";
        document.getElementById('front').style.display = 'none';
        document.getElementById('back').style.display = 'inline';
        document.getElementById('back-background').style.display = 'inline';
        document.getElementById('front-background').style.display = 'none';
        document.getElementById('back-sideBtn').style.backgroundColor = '#0a1e42';
        document.getElementById('front-sideBtn').style.backgroundColor = '#133879';
            
            // Disappearing frontSide images
            document.getElementById("frontCanvas").style.display = "none";
            document.getElementById("backCanvas").style.display = "initial";
            

            // Showing backSide images and setting their properties
                let backElements = document.querySelectorAll(".backSide");
                
                 
                    backElements.forEach((e,i) => {
                     if(showHideBack[i] == true){
                        document.getElementById("backIcon"+i).setAttribute("src","open.png");
                        document.getElementById("backSide"+i).style.display = "inherit";
                    } else {
                        document.getElementById("backIcon"+i).setAttribute("src","closed.png");
                        document.getElementById("backSide"+i).style.display = "none";
                    }
                    
                });
              

            // Disappearing front layers
            let frontHolder = document.querySelectorAll(".front-index");
            
             frontHolder.forEach((e,i) => {   
                 if(document.getElementsByClassName('front-index').length > 0){
                    document.getElementById("front-index"+i).style.display = "none";
                    
                 } else {
                    console.log("false");
                  }
                
             });
            
            // Setting layer icon to opened or closed and showing layers

                 
                    let backHolder = document.querySelectorAll(".back-index");
                        
                    backHolder.forEach((e,i) => {
                        console.log(i);
                    document.getElementById("back-index"+i).style.display = "inherit";
                    if(showHideBack[i] == true){
                        document.getElementById("backIcon"+i).setAttribute("src","open.png");
                        console.log("tylnia ikona "+i+" jest widoczna");
                    } else {
                        document.getElementById("backIcon"+i).setAttribute("src","closed.png");
                        console.log ("tylnia ikona "+i+" jest niewidoczna");
                      }
                      
                    });
                 
            
        e.preventDefault();
    }
    // Downloading image
    const saveBtn = document.getElementById("saveBtn");
    
    // Creating downloadable image
    saveBtn.addEventListener('click', function(){
    
domtoimage.toBlob(document.getElementById('left-side'))
    .then(function (blob) {
        window.saveAs(blob, 'my-node.png');
    });
     });

 
