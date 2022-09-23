function deleteElement(e) {

    if (frontSideBtn == true) {
        let getElement = e.target.id;
        let idText = getElement.match(/\d/g).join('');
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
        let getElement = e.target.id;
        let idText = getElement.match(/\d/g).join('');
        backCanvas.remove(backCanvas.item(document.querySelectorAll(".back-index").length - idText - 1));
        backCanvas.renderAll();
        document.getElementById("back-index" + idText).remove();
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
    let getIcon = e.target.id;
    let idText = getIcon.match(/\d/g).join('');
    showIcon = e.target;
    if (showIcon.getAttribute('src') == "items/open.png") {
        showIcon.setAttribute("src", "items/closed.png");
        if (frontSideBtn == true) {
            frontCanvas.item(idText).visible = false;
            frontCanvas.renderAll();
            showHideFront[idText] = false;
        } else {
            backCanvas.item(idText).visible = false;
            backCanvas.renderAll();
            showHideBack[idText] = false;
        }
    } else {
        showIcon.setAttribute("src", "items/open.png");
        if (frontSideBtn == true) {
            frontCanvas.item(idText).visible = true;
            frontCanvas.renderAll();
            showHideFront[idText] = true;
        } else {
            backCanvas.item(idText).visible = true;
            backCanvas.renderAll();
            showHideBack[idText] = true;
        }
    }
    e.preventDefault();
}
function storeImageInSessionStorage(imageSrc, fileName, elementId) {
    let frontSessionStorage;
    let backSessionStorage;
    console.log(imageSrc);
    console.log(fileName);
    let splitName = imgId.split("-");
    let connectName = imageSrc + "-" + fileName;
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
    let frontSessionStorage;
    let backSessionStorage;
    if(frontSideBtn == true) {
    frontSessionStorage = JSON.parse(sessionStorage.getItem(imgId));
    frontSessionStorage.forEach((item, index) => {
        if (imageToDelete == index) {
            frontSessionStorage.splice(index, 1);
        }
    });
        sessionStorage.setItem(imgId, JSON.stringify(frontSessionStorage));   
    } else {    
        if (sessionStorage.getItem("back-Tshirt") == null) {
        backSessionStorage = [];
        } else {
        backSessionStorage = JSON.parse(sessionStorage.getItem('back-Tshirt'));
    }
    backSessionStorage.forEach(function (item, index) {
        if (imageToDelete == index) {
            backSessionStorage.splice(index, 1);
        }
    });
    sessionStorage.setItem('back-Tshirt', JSON.stringify(backSessionStorage));
}
}
        
// Getting images from SessionStorage

function getFrontImagesFromSessionStorage(elementId){
    console.log(elementId);
    let frontSessionStorage;
    let frontSideImage = document.createElement("img");
    frontSideImage.setAttribute("src", "items/" + imgId + ".png");
    frontSideImage.id = "front";
    frontSideImage.className = "background left-side";
    document.getElementById("left-side").appendChild(frontSideImage);

    let frontSideBackground = document.createElement("img");
    frontSideBackground.setAttribute("src", "items/" + imgId + "Background.png");
    frontSideBackground.id = "front-background";
    frontSideBackground.className = "background left-side";
    document.getElementById("left-side").appendChild(frontSideBackground);
    
        if(sessionStorage.getItem(elementId) == null){
            frontSessionStorage = []
        } else {
          frontSessionStorage = JSON.parse(sessionStorage.getItem(elementId));
          console.log(frontSessionStorage);
        let names = [];
        frontSessionStorage.forEach((image, i) => {
            showFrontImagesAndDivRectangle(image, i);
            });
    }}

    // Getting backSide images from SessionStorage

    function getBackImagesFromSessionStorage(elementId){

    // Creating chosen item image for backSide

    let backSideImage = document.createElement("img");
    let backImgId = imgId.split("-");
    console.log(backImgId);
    backSideImage.setAttribute("src", "items/back-" + backImgId[1] + ".png");
    backSideImage.id = "back";
    backSideImage.className = "background back-canvas-img left-side";
    document.getElementById("left-side").appendChild(backSideImage);

    // Creating background for item image

    let backSideBackground = document.createElement("img");
    backSideBackground.setAttribute("src", "items/back-" + backImgId[1] + "Background.png");
    backSideBackground.id = "back-background";
    backSideBackground.className = "background back-canvas-img left-side";
    document.getElementById("left-side").appendChild(backSideBackground);
    let backSessionStorage;
    let backId = elementId.split("-");
    console.log(backId);

    // Checking session storage 

    if(sessionStorage.getItem("back-"+backId[1]) == null){
        backSessionStorage = [];
    } else {
        backSessionStorage = JSON.parse(sessionStorage.getItem("back-"+backId[1]));
        y = 0;
        backSessionStorage.forEach((image, i) => {
        showBackImagesAndDivRectangle(image, i);
      });}
    }

    function showFrontImagesAndDivRectangle(image){

        // Creating container to display layer

        divRectangle = document.createElement('div');        
        divRectangle.className = "front-index";
        frontIconIndex = document.getElementsByClassName("front-index").length;
        console.log(frontIconIndex);
        divRectangle.id = "front-index" + frontIconIndex;       
        holder.appendChild(divRectangle);
        names = image.split("-");

        // Creating image object for frontCanvas

        let imgObj = new Image();
        imgObj.src = names[0];
        console.log(imgObj);
        imgObj.onload = function () {
            console.log(x);
            let newImg = new fabric.Image(imgObj);
            newImg.scaleToHeight(150);
            newImg.scaleToWidth(150);
            newImg.visible = true;                        
            frontCanvas.centerObject(newImg);
            frontCanvas.add(newImg);
            frontCanvas.item(x).moveTo(0-x);
            console.log(frontCanvas.item(x));
            x++;
            console.log(x);
            frontCanvas.renderAll();
        }
        console.log(names[0]);

        // Creating Image holder

        let miniImageHolder = document.createElement('div');
        miniImageHolder.className = "image-holder"
        divRectangle.appendChild(miniImageHolder);

        // Creating image element

        let miniImage = document.createElement('img');

        // Assigment loaded image to variable

        
        miniImage.setAttribute("src", names[0]);
        miniImage.style.float = "left";
        miniImageHolder.appendChild(miniImage);

        // Creating file name element

        let text = document.createElement("span");

        //  Assigment name of file to variable to show on website      
        
        text.innerHTML = names[1];

        // Selecting div to put element into div

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
        
        // Putting bin image in rightSideHolder

        rightSideHolder.appendChild(createBin);
        
        // Listening bin image  

        createBin.addEventListener("click", deleteElement);
    }

function showBackImagesAndDivRectangle(image){

    // Splitting name for get side of canvas

    names = image.split("-"); 
    
    // Creating image object for canvas

    let imgObj = new Image();
    imgObj.src = names[0];
    imgObj.onload = function () {
        console.log(y);
        let newImg = new fabric.Image(imgObj);
        newImg.scaleToHeight(150);
        newImg.scaleToWidth(150);
        newImg.visible = true;
        backCanvas.centerObject(newImg);
        backCanvas.add(newImg);
        console.log(backCanvas.item(y));
        backCanvas.item(y).moveTo(0-y);
        y++;
        backCanvas.renderAll();            
    }
    console.log(names[0]);

    //Creating layer in files holder

    divRectangle = document.createElement('div');
    divRectangle.className = "back-index";
    backIconIndex = document.getElementsByClassName("back-index").length;
    divRectangle.id = "back-index" + backIconIndex;
    holder.appendChild(divRectangle);

    // Creating image holder
        
    let miniImageHolder = document.createElement('div');
    miniImageHolder.className = "image-holder";
    divRectangle.appendChild(miniImageHolder);

    // Creating image element

    let miniImage = document.createElement('img');

    // loading image file to variable

    console.log(names[0]);
    miniImage.setAttribute("src", names[0]);
    miniImage.style.float = "left";
    miniImageHolder.appendChild(miniImage);

    // Creating file name element

    let text = document.createElement("span");

    //  Assigment name of file to variable to show on website      
        
    text.innerHTML = names[1];
    text.style.float = "left";
    text.style.display = "inline-block";

    // Selecting div to put element into div

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

    // Listening event on icon

    showIcon.addEventListener('click', changeIcon);
    rightSideHolder.appendChild(showIcon);

    // Creating bin image

    createBin = document.createElement("img");

    // Styling bin image

    createBin.setAttribute("src", "items/bin.png");

    // Adding id and className to bin image

    createBin.id = "back-bin" + backIconIndex;
    createBin.className = "backBin";            

    // Putting bin image in rightSideHolder

    rightSideHolder.appendChild(createBin);
        
    // Listening bin image  

     createBin.addEventListener("click", deleteElement);
}