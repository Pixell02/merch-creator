function deleteElement(e) {

    if (frontSideBtn == true) {

        // Getting id of clicked element

        let getElement = e.target.id;

        // Getting digits from id

        let idText = getElement.match(/\d/g).join('');

        // Removing the element from canvas and from layer holder

        frontCanvas.remove(frontCanvas.item(document.querySelectorAll(".front-index").length - idText - 1));
        frontCanvas.renderAll();
        document.getElementById("front-index" + idText).remove();

        deleteFromSessionStorage(idText);

        let binElements = document.querySelectorAll(".front-index");
        binElements.forEach((e, i) => {
            e.id = "front-index" + i;
            document.getElementsByClassName("frontBin")[i].id = "front-bin" + i;
            document.getElementsByClassName("frontIcon")[i].id = "frontIcon" + i;
        });
    } else {

        // Getting id of clicked element

        let getElement = e.target.id;

        // Getting digits of clicked element

        let idText = getElement.match(/\d/g).join('');

        // Removing element from backCanvas and files holder

        backCanvas.remove(backCanvas.item(document.querySelectorAll(".back-index").length - idText - 1));
        backCanvas.renderAll();
        document.getElementById("back-index" + idText).remove();
        deleteFromSessionStorage(idText);

        // Indexing layers

        let binElements = document.querySelectorAll(".back-index");
        binElements.forEach((e, i) => {
            document.getElementsByClassName("backBin")[i].id = "back-bin" + i;
            document.getElementsByClassName("backIcon")[i].id = "backIcon" + i;
            e.id = "back-index" + i;
        });
    }
    e.preventDefault();
}

    //Changing icon

function changeIcon(e) {

    // Getting id of icon

    let getIcon = e.target.id;

    // Getting digit from id

    let idText = getIcon.match(/\d/g).join('');

    // Changing showHide icon

    showIcon = e.target;
    if (showIcon.getAttribute('src') == "items/open.png") {

        // Changing icon to Hidden

        showIcon.setAttribute("src", "items/closed.png");
        if (frontSideBtn == true) {

        // Hiding selected image for frontSide on canvas

            frontCanvas.item(document.querySelectorAll(".front-index").length - idText - 1).visible = false;
            frontCanvas.renderAll();
            showHideFront[idText] = false;
        } else {

        // Hiding selected image for backSide on canvas

            backCanvas.item(document.querySelectorAll(".back-index").length - idText - 1).visible = false;
            backCanvas.renderAll();
            showHideBack[idText] = false;
        }
    } else {

        // Changing icon from hidden to visible
        
        showIcon.setAttribute("src", "items/open.png");
        if (frontSideBtn == true) {

        // Showing frontSide image on canvas

            frontCanvas.item(document.querySelectorAll(".front-index").length - idText - 1).visible = true;
            frontCanvas.renderAll();
            showHideFront[idText] = true;
        } else {

        // Showing backSide image on canvas

            backCanvas.item(document.querySelectorAll(".back-index").length - idText - 1).visible = true;
            backCanvas.renderAll();
            showHideBack[idText] = true;
        }
    }
    e.preventDefault();
}
function storeImageInSessionStorage(imageSrc, fileName, elementId) {

    // Declaring variables for session storage

    let frontSessionStorage;
    let backSessionStorage;

    // Splitting imgId to get session storage

    let splitName = imgId.split("-");

    // Saving image source, name and cords

    let connectName = imageSrc + "&" + fileName + "&" + "0" + "&" + "0" + "&" + "0.2" + "&" + "0.2" + "&" + "0";
        if (frontSideBtn == true) {
            if (sessionStorage.getItem(elementId) == null) {
                frontSessionStorage = [];
            } else {
                frontSessionStorage = JSON.parse(sessionStorage.getItem(elementId));
            }
            frontSessionStorage.push(connectName);
            sessionStorage.setItem(elementId, JSON.stringify(frontSessionStorage));
        } else {
            if (sessionStorage.getItem('back-' + splitName[1]) == null) {
              backSessionStorage = [];
            } else {
              backSessionStorage = JSON.parse(sessionStorage.getItem('back-' + splitName[1]));
            }
              backSessionStorage.push(connectName);
              sessionStorage.setItem('back-' + splitName[1], JSON.stringify(backSessionStorage));
        }
}

// Delete images from SessionStorage

function deleteFromSessionStorage(imageToDelete) {
    
    // Declaring variables for session storage

    let frontSessionStorage;
    let backSessionStorage;

    // Splitting imgId to get front and back session storage

    let backImgId = imgId.split('-');


    if(frontSideBtn == true) {

    // Deleting element from frontSide and from front session storage

    frontSessionStorage = JSON.parse(sessionStorage.getItem(imgId));
    frontSessionStorage.forEach((item, index) => {
        if (imageToDelete == index) {
            frontSessionStorage.splice(index, 1);
        } else {
            console.log("not the same element")
        }
    });

    // Saving variable to session storage

    sessionStorage.setItem(imgId, JSON.stringify(frontSessionStorage));  

    } else {

    // Checking if back session storage is empty
        
        if (sessionStorage.getItem("back-" + backImgId[1]) == null) {
        backSessionStorage = [];
        } else {
        backSessionStorage = JSON.parse(sessionStorage.getItem("back-" + backImgId[1]));
    }

    // Deleting image from backSide and back session storage

    backSessionStorage.forEach( (item, index) => {
        if (imageToDelete == index) {
            backSessionStorage.splice(index, 1);
        } else {
            console.log("not the same element")
        }
    });
    
    // Saving backSide in session storage

    sessionStorage.setItem("back-" + backImgId[1], JSON.stringify(backSessionStorage));
}
}
        
// Getting images from SessionStorage

function getFrontImagesFromSessionStorage(elementId){
   
    // Declaring variable for session storage

    let frontSessionStorage;

    // Creating frontSide item

    let frontSideImage = document.createElement("img");
    frontSideImage.setAttribute("src", "items/" + imgId + ".png");
    frontSideImage.id = "front";
    frontSideImage.className = "background front-canvas-img workspace";
    document.getElementById("workspace").appendChild(frontSideImage);

    // Creating frontSide background

    let frontSideBackground = document.createElement("img");
    frontSideBackground.setAttribute("src", "items/" + imgId + "Background.png");
    frontSideBackground.id = "front-background";
    frontSideBackground.className = "background workspace";
    document.getElementById("workspace").appendChild(frontSideBackground);

    // Getting color from session storage

    let getColor;

        if(sessionStorage.getItem(imgId + "-color") == null){
            getColor = [];
        } else {
            getColor = JSON.stringify(sessionStorage.getItem(imgId + "-color"));
            let newColor = getColor.toString().replace(/"/g, "");
            pickerColor.value = newColor;
            inputColor.value = newColor;
        }
    
        // Check if session storage is empty

        if(sessionStorage.getItem(elementId) == null){
            frontSessionStorage = []
        } else {

        // Getting session storage and creating arrays

          frontSessionStorage = JSON.parse(sessionStorage.getItem(elementId));
          let names = [];
          let xCoords = [];
          let yCoords = [];
          let imageScaleX = [];
          let imageScaleY = [];
          let imageAngle = [];
            frontSessionStorage.forEach((image, i) => {
                showFrontImagesAndDivRectangle(image, i, xCoords, yCoords, imageScaleX, imageScaleY, imageAngle);
            });
    }}

    function showFrontImagesAndDivRectangle(image, i, xCoords, yCoords, imageScaleX, imageScaleY, imageAngle) {

        // Creating container to display layer
        
        divRectangle = document.createElement('div');
        divRectangle.setAttribute("draggable", "true");      
        divRectangle.className = "front-index draggable";

        // Giving a number for front index
        
        frontIconIndex = document.getElementsByClassName("front-index").length;
        divRectangle.id = "front-index" + frontIconIndex;       
        holder.appendChild(divRectangle);

        // Splitting infromation from session storage to arrays

        names = image.split("&");
        xCoords.push(names[2]);
        yCoords.push(names[3]);
        imageScaleX.push(names[4]);
        imageScaleY.push(names[5]);
        imageAngle.push(names[6]);
        
        // Creating image object for frontCanvas

        let imgObj = new Image();
        imgObj.src = names[0];
        imgObj.onload = () => {
            let newImg = new fabric.Image(imgObj);
            newImg.scaleToWidth(150);
            newImg.visible = true;
            frontCanvas.add(newImg);
            frontCanvas.item(i).top = parseInt(xCoords[i]);
            frontCanvas.item(i).left = parseInt(yCoords[i]);
            frontCanvas.item(i).scaleX = parseFloat(imageScaleX[i]);
            frontCanvas.item(i).scaleY = parseFloat(imageScaleY[i]);
            frontCanvas.item(i).angle = parseFloat(imageAngle[i]);
            frontCanvas.item(i).moveTo(0-i);
            frontCanvas.renderAll();
        }

        // Creating Image holder

        let miniImageHolder = document.createElement('div');
        miniImageHolder.className = "image-holder"
        divRectangle.appendChild(miniImageHolder);

        // Creating image element

        const miniImage = document.createElement('img');
        miniImage.id = "frontMiniImage" + frontIconIndex;
        miniImage.className = "frontMiniImage";
        miniImage.setAttribute("alt",image);

        // Assignment loaded image to variable
        
        miniImage.setAttribute("src", names[0]);
        miniImage.style.float = "left";
        miniImageHolder.appendChild(miniImage);

        // Creating file name element

        let text = document.createElement("span");
        text.innerHTML = names[1];
        divRectangle.appendChild(text);

        // Styling and setting image

        let rightSideHolder = document.createElement("div");
        rightSideHolder.style.width = "85px";
        rightSideHolder.style.float = "left";
        divRectangle.appendChild(rightSideHolder);

        // Creating image element

        showIcon = document.createElement('img');
        showIcon.setAttribute("src", "items/open.png");
        showIcon.id = "frontIcon" + frontIconIndex;
        showIcon.className = "frontIcon";
        showHideFront[frontIconIndex] = true;
       
        // Listening event on icon

        showIcon.addEventListener('click', changeIcon);
        rightSideHolder.appendChild(showIcon);

        // Creating bin image

        createBin = document.createElement("img");

        // Styling bin image

        createBin.setAttribute("src", "items/bin.png");

        // Adding id and className to bin image

        createBin.id = "front-bin" + frontIconIndex;
        createBin.className = "frontBin";
        
        // Inserting bin image in rightSideHolder

        rightSideHolder.appendChild(createBin);
        
        // Listening bin image  

        createBin.addEventListener("click", deleteElement);
        
    }
    // Getting backSide images from SessionStorage

    function getBackImagesFromSessionStorage(elementId){

    // Creating chosen item image for backSide

    let backSideImage = document.createElement("img");
    let backImgId = imgId.split("-");
    console.log(backImgId);
    backSideImage.setAttribute("src", "items/back-" + backImgId[1] + ".png");
    backSideImage.id = "back";
    backSideImage.className = "background back-canvas-img workspace";
    backSideImage.style.display = "inline";
    document.getElementById("workspace").appendChild(backSideImage);

    // Creating background for item image

    let backSideBackground = document.createElement("img");
    backSideBackground.setAttribute("src", "items/back-" + backImgId[1] + "Background.png");
    backSideBackground.id = "back-background";
    backSideBackground.className = "background back-canvas-img workspace";
    
    document.getElementById("workspace").appendChild(backSideBackground);
    if(frontSideBtn == true){
        backSideImage.style.display = "none";
        backSideBackground.style.display = "none";
    } else {
        backSideImage.style.display = "inline";
        backSideBackground.style.display = "inline";
    }

    let backSessionStorage;
    let backId = elementId.split("-");

    // Checking session storage 
    
    if(sessionStorage.getItem("back-"+backId[1]) == null){
        backSessionStorage = [];
    } else {
        let xCoords = [];
        let yCoords = [];
        let imageScaleX = [];
        let imageScaleY = [];
        let imageAngle = [];
        backSessionStorage = JSON.parse(sessionStorage.getItem("back-" + backId[1]));
        backSessionStorage.forEach((image, i) => {
        showBackImagesAndDivRectangle(image, i, xCoords, yCoords, imageScaleX, imageScaleY, imageAngle);
      });}
    }

    function showBackImagesAndDivRectangle(image, i, xCoords, yCoords, imageScaleX, imageScaleY, imageAngle){

    // Splitting name for get side of canvas

    names = image.split("&"); 
    xCoords.push(names[2]);
    yCoords.push(names[3]);
    imageScaleX.push(names[4]);
    imageScaleY.push(names[5]);
    imageAngle.push(names[6]);

    // Creating image object for canvas

    let imgObj = new Image();
    imgObj.src = names[0];
    imgObj.onload =  () => {
        let newImg = new fabric.Image(imgObj);
        newImg.scaleToHeight(150);
        newImg.scaleToWidth(150);
        newImg.visible = true;
        backCanvas.add(newImg);
        backCanvas.item(i).top = parseInt(xCoords);
        backCanvas.item(i).left = parseInt(yCoords);
        backCanvas.item(i).scaleX = parseFloat(imageScaleX[i]);
        backCanvas.item(i).scaleY = parseFloat(imageScaleY[i]);
        backCanvas.item(i).angle = parseFloat(imageAngle[i]);
        backCanvas.item(i).moveTo(0-i);
        backCanvas.renderAll();
        document.getElementById('back-background').style.backgroundColor = pickerColor.value;           
    }

    //Creating layer in files holder

    divRectangle = document.createElement('div');
    divRectangle.setAttribute("draggable", "true");
    divRectangle.className = "back-index draggable";
    
    backIconIndex = document.getElementsByClassName("back-index").length;
    divRectangle.id = "back-index" + backIconIndex;
    holder.appendChild(divRectangle);

    // Creating image holder
        
    let miniImageHolder = document.createElement('div');
    miniImageHolder.className = "image-holder";
    divRectangle.appendChild(miniImageHolder);

    // Creating image element

    let miniImage = document.createElement('img');
    miniImage.id = "backMiniImage" + backIconIndex;
    miniImage.className = "backMiniImage";

    // loading image file to variable

    miniImage.setAttribute("src", names[0]);
    miniImage.setAttribute("alt", image);
    miniImage.style.float = "left";
    miniImageHolder.appendChild(miniImage);

    // Creating file name element

    let text = document.createElement("span");    
    text.innerHTML = names[1];
    text.style.float = "left";
    text.style.display = "inline-block";

    // Inserting file name element to div

    divRectangle.appendChild(text);

    // Creating image element

    showIcon = document.createElement('img');

    // Styling and setting image

    let rightSideHolder = document.createElement("div");
    rightSideHolder.style.width = "85px";
    rightSideHolder.style.float = "left";
    divRectangle.appendChild(rightSideHolder);

    // Styling showHideIcon 

    showIcon.setAttribute("src", "items/open.png");
    showIcon.id = "backIcon" + backIconIndex;
    showIcon.className = "backIcon";
    showHideBack[backIconIndex] = true;

    rightSideHolder.appendChild(showIcon);
    // Listening event on icon

    showIcon.addEventListener('click', changeIcon);
   

    // Creating bin image

    createBin = document.createElement("img");
    createBin.setAttribute("src", "items/bin.png");
    createBin.id = "back-bin" + backIconIndex;
    createBin.className = "backBin";            

    // Inserting bin image in rightSideHolder

    rightSideHolder.appendChild(createBin);
        
    // Listening bin image  

     createBin.addEventListener("click", deleteElement);
     
}
    