function dragging(){
let draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

// Adding dragging to class list to draggable elements

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

// Removing dragging from class list

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})
 
function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
  if(frontSideBtn == true){
    
    // Changing front indexes of layer properties

  document.querySelectorAll(".front-index").forEach((element, i) =>{
    element.id = "front-index" + i;
  });
  document.querySelectorAll(".frontIcon").forEach((element, i) =>{
    element.id = "frontIcon" + i;
  });
  document.querySelectorAll(".frontBin").forEach((element, i) => {
    element.id = "front-bin" + i;
  });
  } else {

    // Changing back indexes of layer properties

    document.querySelectorAll(".back-index").forEach((element, i) =>{
      element.id = "back-index" + i;
    });
    document.querySelectorAll(".backIcon").forEach((element, i) =>{
      element.id = "backIcon" + i;
    });
    document.querySelectorAll(".backBin").forEach((element, i) => {
      element.id = "back-bin" + i;
    });
  }
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
  
}
}

function checkElements(){
  if(frontSideBtn == true){
  let frontSessionStorage = [];

    // Getting items from session storage to variable

  frontSessionStorage = JSON.parse(sessionStorage.getItem(imgId));

    // Splitting elements from frontSessionStorage variable

   let splitData = [];
   let firstPart = [];
   let secondPart = [];
   let xCoords = [];
   let yCoords = [];
   let imageScaleX = [];
   let imageScaleY = [];
   let imageAngle = [];

  frontSessionStorage.forEach((element, i) => {
    splitData = element.split("&");
    console.log(splitData);
    firstPart[i] = splitData[0];
    secondPart[i] = splitData[1];
    xCoords[i] = splitData[2];
    yCoords[i] = splitData[3];
    imageScaleX[i] = splitData[4];
    imageScaleY[i] = splitData[5];
    imageAngle[i] = splitData[6];
  })

    // Checking elements from variable frontSessionStorage

  document.querySelectorAll(".frontMiniImage").forEach((element, i) => {
    if(element.getAttribute("src") == firstPart[i]){
      console.log("same values");
    } else {
      frontSessionStorage.splice(i, 1, element.getAttribute("alt"));
      console.log(frontSessionStorage[i]);
    }});

    // Setting session storage item

    sessionStorage.setItem(imgId, JSON.stringify(frontSessionStorage));

    // Clearing Canvas

    frontCanvas.clear();

    // Splitting session storage elements to arrays

    let xPosition = [];
    let yPosition = [];
    let xScale = [];
    let yScale = [];
    let angle = [];

    frontSessionStorage.forEach((element, i) => {
      let splitElement = element.split("&");
          console.log(splitElement);
          xPosition[i] = splitElement[2];
          yPosition[i] = splitElement[3];
          xScale[i] = splitElement[4];
          yScale[i] = splitElement[5];
          angle[i] = splitElement[6];
    });

    // Creating images by getting source of miniImage
    
    document.querySelectorAll(".frontMiniImage").forEach((element, i) => {
      let imgObj = new Image();
      imgObj.src = element.getAttribute("src");
      imgObj.onload = () => {

          let newImg = new fabric.Image(imgObj);
          newImg.scaleToHeight(150);
          newImg.scaleToWidth(150);
          frontCanvas.add(newImg);
          frontCanvas.item(i).top = parseInt(xPosition[i]);
          frontCanvas.item(i).left = parseInt(yPosition[i]);
          frontCanvas.item(i).scaleX = parseFloat(xScale[i]);
          frontCanvas.item(i).scaleY = parseFloat(yScale[i]);
          frontCanvas.item(i).angle = parseFloat(angle[i]);
          frontCanvas.item(i).moveTo(0-i);
          frontCanvas.renderAll();
      }
    })
  } else {

    // Splitting chosen image name

    let backSessionStorage = [];
    let backImgId = imgId.split("-");
        backSessionStorage = JSON.parse(sessionStorage.getItem("back-" + backImgId[1]));
    let splitData = [];
    let firstPart = [];
    let secondPart = [];
    let xCoords = [];
    let yCoords = [];
    let imageScaleX = [];
    let imageScaleY = [];
    let imageAngle = [];

    // Splitting image name in different variables

  backSessionStorage.forEach((element, i) => {
    splitData = element.split("&");
    firstPart[i] = splitData[0];
    secondPart[i] = splitData[1];
    xCoords[i] = splitData[2];
    yCoords[i] = splitData[3];
    imageScaleX[i] = splitData[4];
    imageScaleY[i] = splitData[5];
    imageAngle[i] = splitData[6];
    console.log(imageAngle[i]);
  });

    // Checking similarity between elements

  document.querySelectorAll(".backMiniImage").forEach((element, i) => {
    if(element.getAttribute("src") == firstPart[i]){
      console.log("same values");
    } else {
      backSessionStorage.splice(i, 1, element.getAttribute("alt"));
      }
    })
    
    // Saving elements in session storage

    sessionStorage.setItem("back-" + backImgId[1], JSON.stringify(backSessionStorage));

    // Clearing backCanvas

    backCanvas.clear();
    let xPosition = [];
    let yPosition = [];
    let xScale = [];
    let yScale = [];
    let Angle = [];

    backSessionStorage.forEach((element, i) => {
      let splitElement = element.split("&");
          xPosition[i] = splitElement[2];
          yPosition[i] = splitElement[3];
          xScale[i] = splitElement[4];
          yScale[i] = splitElement[5];
          Angle[i] = splitElement[6];
          console.log(Angle[i]);
    });
    // Creating image for backCanvas

    document.querySelectorAll(".backMiniImage").forEach((element, i) => {
      let imgObj = new Image();
      imgObj.src = element.getAttribute("src");
     
      imgObj.onload = () => {
          let newImg = new fabric.Image(imgObj);
          newImg.scaleToHeight(150);
          newImg.scaleToWidth(150);
          backCanvas.add(newImg);
          backCanvas.item(i).top = parseInt(xPosition[i]);
          backCanvas.item(i).left = parseInt(yPosition[i]);
          backCanvas.item(i).scaleX = parseFloat(xScale[i]);
          backCanvas.item(i).scaleY = parseFloat(yScale[i]);
          backCanvas.item(i).angle = parseFloat(Angle[i]);
          backCanvas.item(i).moveTo(0-i);
          backCanvas.renderAll();
      }
    })
  }
}
document.getElementById("files-holder").addEventListener("mouseenter",dragging) ;
document.getElementById("files-holder").addEventListener("dragend",checkElements) ;