    // Global variables

    const frontCanvas = new fabric.Canvas('frontCanvas');
    const backCanvas = new fabric.Canvas('backCanvas');
    document.getElementsByClassName("canvas-container")[0].style.position = "absolute";
    document.getElementsByClassName("canvas-container")[0].style.zIndex = "101";
    document.getElementsByClassName("canvas-container")[1].style.position = "absolute";
    document.getElementsByClassName("canvas-container")[0].style.zIndex = "100";
    let frontSide = document.getElementById('front-sideBtn');
    let backSide = document.getElementById('back-sideBtn');
    let frontSideBtn = true;
    let frontArrayLength;
    let showIcon;
    let showHideFront = [];
    let showHideBack = [];
    let frontIconIndex;
    let backIconIndex;
    let createBin;
    let divRectangle;
    let x,y;
    // Get modal element
    let modal = document.getElementById('modal');
    // Get open button
    let openBtn = document.querySelectorAll('.item-button');
    console.log(openBtn);
    // Closing button
    let closeBtn = document.getElementById('closeBtn');
    // Opening modal window

    openBtn.forEach(item => {
        item.addEventListener('click', openModal);
    });
    let imgId;
    
    function openModal(e) {
        // x = 0;
        // y = 0;
        imgId = e.target.id;
        console.log(imgId);
        modal.style.display = "flex";
        frontSide.addEventListener("click", getFrontImagesFromSessionStorage(imgId));
        backSide.addEventListener("click", getBackImagesFromSessionStorage(imgId));
         if(frontSideBtn == true){
            document.querySelectorAll(".back-index").forEach((item) => {
                item.style.display = "none";
            });
            console.log(frontSideBtn);
            document.getElementById("backCanvas").style.display = "none";
            document.getElementById('front').style.display = "initial";
            document.getElementById('front-background').style.display = "initial";
            document.getElementById("backCanvas").style.display = "none";
            document.getElementById("frontCanvas").style.display = "initial";
        } else {
            document.querySelectorAll(".front-index").forEach((item) => {
                item.style.display = "none";
            });
            document.getElementById("frontCanvas").style.display = "none";
            document.getElementById("backCanvas").style.display = "initial";
            document.getElementById('front').style.display = "none";
            document.getElementById('front-background').style.display = "none";
            document.getElementById('back').style.display = "initial";
            document.getElementById('back-background').style.display = "initial";
            document.getElementById("backCanvas").style.display = "initial";
            
       }
        
        e.preventDefault();
    }
   
    // Closing modal window

    closeBtn.addEventListener('click', closeModal);

    function closeModal(e) {
        modal.style.display = "none";
        document.querySelectorAll(".left-side").forEach((element) => {
            console.log(element);
            element.remove();
        });
        document.querySelectorAll(".front-index").forEach((item) => {
            item.remove();
        });
        document.querySelectorAll(".back-index").forEach((item) => {
            item.remove();
        });
        frontCanvas.clear();
        backCanvas.clear();
        
        e.preventDefault();
    }
