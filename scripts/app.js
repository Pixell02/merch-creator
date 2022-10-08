    // Global variables

    const frontCanvas = new fabric.Canvas('frontCanvas');
    const backCanvas = new fabric.Canvas('backCanvas');
    document.getElementsByClassName("canvas-container")[0].style.position = "absolute";
    document.getElementsByClassName("canvas-container")[0].style.zIndex = "11";
    document.getElementsByClassName("canvas-container")[1].style.position = "absolute";
    document.getElementsByClassName("canvas-container")[1].style.zIndex = "10";
    const frontSide = document.getElementById('front-sideBtn');
    const backSide = document.getElementById('back-sideBtn');
    let frontSideBtn = true;
    let frontArrayLength;
    let showIcon;
    let showHideFront = [];
    let showHideBack = [];
    let frontIconIndex;
    let backIconIndex;
    let createBin;
    let divRectangle;
    
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
        
        // Getting id of selected item

        imgId = e.target.id;
        
        // Showing modal window

        modal.style.display = "flex";

        document.getElementsByClassName("upper-canvas")[0].style.marginTop = "90px";
        document.getElementsByClassName("upper-canvas")[1].style.marginTop = "50px";
        frontSide.addEventListener("click", getFrontImagesFromSessionStorage(imgId));
        backSide.addEventListener("click", getBackImagesFromSessionStorage(imgId));

        // Getting color from session storage or if session storage is empty setting value to white color

        let colorFromSessionStorage;
        if(sessionStorage.getItem(imgId + "-color") == null){
            colorFromSessionStorage = [];
            pickerColor.value = "#FFFFFF";
        } else {
            colorFromSessionStorage = sessionStorage.getItem(imgId + "-color");
            pickerColor.value = colorFromSessionStorage;
        }

        // Setting background color

        const backColor = document.getElementById('back-background');
        const frontColor = document.getElementById('front-background');
        backColor.style.backgroundColor = pickerColor.value;
        frontColor.style.backgroundColor = pickerColor.value;

         if(frontSideBtn == true){

            // Deleting backSide elements and showing frontSide elements
            
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

            // Deleting frontSide elements and showing backSide elements

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
        
        // Hiding modal window and deleting all elements from modal window

        modal.style.display = "none";
        document.querySelectorAll(".workspace").forEach((element) => {
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
    