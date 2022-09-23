    const upload = document.getElementById('file');
    const realBtn = document.getElementById('file-upload');
    const holder = document.getElementById('files-holder');

    // Listening Upload Btn

    upload.addEventListener('click', uploadFile);

    function uploadFile(e) {
        realBtn.click();
        e.preventDefault();
    }
    realBtn.onchange = () => { 
                       
        let reader = new FileReader();
        let arrayLength = realBtn.files.length - 1;
        reader.readAsDataURL(realBtn.files[arrayLength]);
        reader.onload = (e) => {
            let imgObj = new Image();
            imgObj.src = e.target.result;
            console.log (imgObj.src);
            console.log(realBtn.files[arrayLength].name);
            storeImageInSessionStorage(imgObj.src, realBtn.files[arrayLength].name, imgId);
            divRectangle = document.createElement('div');
        if (frontSideBtn == true) {
          divRectangle.className = "front-index";
          frontIconIndex = document.getElementsByClassName("front-index").length;
          divRectangle.id = "front-index" + frontIconIndex;
        } else {
          divRectangle.className = "back-index";
          backIconIndex = document.getElementsByClassName("back-index").length;
          divRectangle.id = "back-index" + backIconIndex;
        }
        
        holder.appendChild(divRectangle);

        let miniImageHolder = document.createElement('div');
        miniImageHolder.className = "image-holder";
        divRectangle.appendChild(miniImageHolder);

        // Creating image element

        let miniImage = document.createElement('img');

        // Assigment loaded image to variable
            
        miniImage.setAttribute("src", imgObj.src);
        miniImage.style.float = "left";
        miniImageHolder.appendChild(miniImage);

        // Creating file name element

        let text = document.createElement("span");

        //  Assigment name of file to variable to show on website      

        text.innerHTML = realBtn.files[0].name;
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
        if (frontSideBtn == true) {
            showIcon.id = "frontIcon" + frontIconIndex;
            showIcon.className = "frontIcon";
            showHideFront[frontIconIndex] = true;
        } else {
          showIcon.id = "backIcon" + backIconIndex;
          showIcon.className = "backIcon";
          showHideBack[backIconIndex] = true;
        }

        // Listening event on icon

        showIcon.addEventListener('click', changeIcon);
        rightSideHolder.appendChild(showIcon);

        // Creating bin image

        createBin = document.createElement("img");

        // Styling bin image

        createBin.setAttribute("src", "items/bin.png");

        // Adding id and className to bin image

        if (frontSideBtn == true) {
            createBin.id = "front-bin" + frontIconIndex;
            createBin.className = "frontBin";
        } else {
            createBin.id = "back-bin" + backIconIndex;
            createBin.className = "backBin";
            }

            // Putting bin image in rightSideHolder

            rightSideHolder.appendChild(createBin);
            
            // Listening bin image  

            createBin.addEventListener("click", deleteElement);
            
            imgObj.onload = function () {
                
                let newImg = new fabric.Image(imgObj);
                newImg.scaleToHeight(150);
                newImg.scaleToWidth(150);
                newImg.visible = true;
                if (frontSideBtn == true) {
                    x = document.querySelectorAll(".front-index").length - 1;
                    console.log(x);
                    frontCanvas.centerObject(newImg);
                    frontCanvas.add(newImg);
                    frontCanvas.item(x).moveTo(0-x);
                    console.log(frontCanvas.item(x));
                    frontCanvas.renderAll();
                } else {
                    y = document.querySelectorAll(".back-index").length - 1;
                    backCanvas.centerObject(newImg);
                    backCanvas.add(newImg);
                    backCanvas.item(y).moveTo(0-y);
                    console.log(backCanvas.item(y));
                    backCanvas.renderAll();
                }
            }
        }
    }