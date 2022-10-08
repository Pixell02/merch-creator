
// Getting preview button

const preview = document.getElementById("preview");

// Listening preview button

preview.addEventListener("click", openPreview)

function openPreview(e) {

    // Creating previewWindow and setting properties

    const previewWindow = document.createElement("div");
    previewWindow.id = "preview-window";
    previewWindow.style.display = "inline-block";
    previewWindow.style.zIndex = "50";

    // Inserting previewWindow to modal window

    modal.appendChild(previewWindow);

    // Creating closeBtn for previewWindow and setting properties

    const closePreviewBtn = document.createElement("span");
    closePreviewBtn.id = "preview-closeBtn";
    closePreviewBtn.innerHTML = "&times;";

    // Styling closeBtn

    closePreviewBtn.style.fontSize = "300%";
    closePreviewBtn.style.width = "50px";
    closePreviewBtn.style.height = "50px";

    // Inserting closeBtn to previewWindow

    previewWindow.appendChild(closePreviewBtn);

    // Creating previewContainer and setting properties

    const prevContainer = document.createElement("div");
    prevContainer.id = "preview-container";
    
    // Styling previewContainer

    prevContainer.style.display = "flex";
    prevContainer.style.justifyContent = "center";
    prevContainer.style.alignItems = "center";
    prevContainer.style.marginTop = "150px";

    // Inserting previewContainer to previewWindow

    previewWindow.appendChild(prevContainer);

    
    // if statement for modalBtn

    if(frontSideBtn == true){

    const previewCanvas = document.createElement("canvas");
    previewCanvas.id = "previewCanvas";



    previewCanvas.width = 250;
    previewCanvas.style.zIndex = "61";
    previewCanvas.height = 430;
    previewCanvas.style.marginTop = "-10px";
    
    prevContainer.appendChild(previewCanvas);
    
    const fabricPreview = new fabric.Canvas(previewCanvas);
    
    document.getElementsByClassName("canvas-container")[2].style.width = "250px";
    document.getElementsByClassName("canvas-container")[2].style.height = "416px";
    document.getElementsByClassName("canvas-container")[2].style.marginTop = "40px";
    const fabricCanvas = document.getElementsByClassName("upper-canvas")[2];
    
    fabricCanvas.style.marginTop = "0";
    fabricCanvas.style.width = "250px";
    fabricCanvas.style.height = "416px";
    fabricCanvas.style.zIndex = "60";

    const frontSideImage = document.createElement("img");
    frontSideImage.setAttribute("src", "items/" + imgId + ".png");
    frontSideImage.id = "front-preview";
    frontSideImage.className = "background front-canvas-img workspace";


    frontSideImage.style.maxWidth = "700px";
    frontSideImage.style.marginTop = '0';
    
    prevContainer.appendChild(frontSideImage);

    let frontSideBackground = document.createElement("img");
    frontSideBackground.setAttribute("src", "items/" + imgId + "Background.png");
    frontSideBackground.id = "front-preview-background";
    frontSideBackground.className = "background workspace";



    frontSideBackground.style.maxWidth = "700px";
    frontSideBackground.style.mixBlendMode = "multiply";
    frontSideBackground.style.backgroundColor = pickerColor.value;
    prevContainer.appendChild(frontSideBackground);
    
    let xCoords = [];
    let yCoords = [];
    let imageScaleX = [];
    let imageScaleY = [];
    let imageAngle = [];
    if(sessionStorage.getItem(imgId) == null) {
       let frontSessionStorage = []; 
    } else {
    frontSessionStorage = JSON.parse(sessionStorage.getItem(imgId));
    frontSessionStorage.forEach((item, i) => {

        
        let names = item.split("&");
        xCoords.push(names[2]);
        yCoords.push(names[3]);
        imageScaleX.push(names[4]);
        imageScaleY.push(names[5]);
        imageAngle.push(names[6]);


        const cords = 250/150;

        // Creating image object for frontCanvas

          let imgObj = new Image();
          imgObj.src = names[0];
          
          console.log(imgObj);
          imgObj.onload = () => {
              let newImg = new fabric.Image(imgObj);
              newImg.visible = true;
              fabricPreview.add(newImg);
              newImg.scaleToHeight(250);
              newImg.scaleToWidth(250);
              fabricPreview.item(i).top = parseInt(cords*xCoords[i]);
              fabricPreview.item(i).left = parseInt(cords*yCoords[i]);
              fabricPreview.item(i).scaleX = parseFloat(cords*imageScaleX[i]);
              fabricPreview.item(i).scaleY = parseFloat(cords*imageScaleY[i]);
              fabricPreview.item(i).angle = parseFloat(imageAngle[i]);
              fabricPreview.item(i).moveTo(0-i);
              fabricPreview.renderAll();
          }
    })
    }
    } else {
         
        const previewCanvas = document.createElement("canvas");
        previewCanvas.style.zIndex = "61";
        previewCanvas.id = "previewCanvas";
        
        previewCanvas.width = 250;
        previewCanvas.height = 500;
        previewCanvas.style.marginTop = "-40px";
        console.log(previewCanvas);
        prevContainer.appendChild(previewCanvas);
        
        const fabricPreview = new fabric.Canvas(previewCanvas);
        
        document.getElementsByClassName("canvas-container")[2].style.width = "250px";
        document.getElementsByClassName("canvas-container")[2].style.height = "500px";
        document.getElementsByClassName("canvas-container")[2].style.marginTop = "40px";

        const fabricCanvas = document.getElementsByClassName("upper-canvas")[2];
        fabricCanvas.style.marginTop = "0";
        fabricCanvas.style.width = "250px";
        fabricCanvas.style.height = "500px";
        fabricCanvas.style.zIndex = "60";
        

        let backImgId = imgId.split("-");
        const backSideImage = document.createElement("img");
        backSideImage.setAttribute("src", "items/" + "back-" + backImgId[1] + ".png");
        backSideImage.id = "back-preview";
        backSideImage.className = "background front-canvas-img workspace";

        backSideImage.style.width = "700px";
        backSideImage.style.marginTop = "0px";
             
        prevContainer.appendChild(backSideImage);
        
        const backSideBackground = document.createElement("img");
        backSideBackground.setAttribute("src", "items/" + "back-"+ backImgId[1] + "Background.png");
        backSideBackground.id = "back-preview-background";
        backSideBackground.className = "background workspace";

        backSideBackground.style.maxWidth = "700px";
        backSideBackground.style.mixBlendMode = "multiply";
        backSideBackground.style.backgroundColor = pickerColor.value;

        prevContainer.appendChild(backSideBackground);
        
        let xCoords = [];
        let yCoords = [];
        let imageScaleX = [];
        let imageScaleY = [];
        let imageAngle = [];

        if(sessionStorage.getItem("back-" + backImgId[1]) == null) {
           let backSessionStorage = []; 
        } else {
       backSessionStorage = JSON.parse(sessionStorage.getItem("back-"+ backImgId[1]));
       backSessionStorage.forEach((item, i) => {
            let names = item.split("&");


            xCoords.push(names[2]);
            yCoords.push(names[3]);
            imageScaleX.push(names[4]);
            imageScaleY.push(names[5]);
            imageAngle.push(names[6]);
              
            const cords = 250/150;
            
            // Creating image object for frontCanvas
              let imgObj = new Image();
              imgObj.src = names[0];

              imgObj.onload = () => {
                  let newImg = new fabric.Image(imgObj);
                  newImg.visible = true;
                  fabricPreview.add(newImg);
                  newImg.scaleToHeight(250);
                  newImg.scaleToWidth(250);
                  fabricPreview.item(i).top = parseInt(cords*xCoords[i]);
                  fabricPreview.item(i).left = parseInt(cords*yCoords[i]);
                  fabricPreview.item(i).scaleX = parseFloat(cords*imageScaleX[i]);
                  fabricPreview.item(i).scaleY = parseFloat(cords*imageScaleY[i]);
                  fabricPreview.item(i).angle = parseFloat(imageAngle[i]);
                  fabricPreview.item(i).moveTo(0-i);
                  fabricPreview.renderAll();
              }
        })
        }
    }
    const closePreview = document.getElementById("preview-closeBtn");
    closePreview.addEventListener("click", closePreviewWindow);

    function closePreviewWindow(e) {
        document.getElementById("preview-window").remove();
    e.preventDefault();
}
    e.preventDefault();
}
