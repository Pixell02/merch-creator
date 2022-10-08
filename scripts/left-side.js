frontSide.addEventListener('click', changeToFrontSide);

    function changeToFrontSide(e) {

        // Changing backSideElements to frontSideElements
        
        frontSideBtn = true;
        document.getElementsByClassName("canvas-container")[0].style.zIndex = "11";
        document.getElementsByClassName("canvas-container")[1].style.zIndex = "10";
        document.getElementById('front').style.display = 'inline';
        document.getElementById('back').style.display = 'none';
        document.getElementById('front-background').style.display = 'inline';
        document.getElementById('back-background').style.display = 'none';
        document.getElementById('front-sideBtn').style.backgroundColor = '#0a1e42';
        document.getElementById('back-sideBtn').style.backgroundColor = '#133879';

        // Showing frontSide images if they are added and setting their properties

        document.getElementById("frontCanvas").style.display = "initial";
        document.getElementById("backCanvas").style.display = "none";
        let frontElements = document.querySelectorAll(".frontSide");
        frontElements.forEach((e, i) => {
            if (showHideFront[i] == true) {
                document.getElementById("frontSide" + i).style.display = "flex";
            } else {
                document.getElementById("frontSide" + i).style.display = "none";
            }
        });

        // Disappearing backSide images 

        let backElements = document.querySelectorAll(".backSide");
        backElements.forEach((e, i) => {
            document.getElementById("backSide" + i).style.display = "none";
        });

        // Showing frontSide layers and setting their properties

        let frontHolder = document.querySelectorAll(".front-index")
        frontHolder.forEach((e, i) => {
            document.getElementById('front-index' + i).style.display = "inherit";
            if (showHideFront[i] == true) {
                document.getElementById("frontIcon" + i).setAttribute("src", "items/open.png");
            } else {
                document.getElementById("frontIcon" + i).setAttribute("src", "items/closed.png");
            }
        });

        // Disappearing backSide layers

        let backHolder = document.querySelectorAll(".back-index");
        backHolder.forEach((e, i) => {
            document.getElementById("back-index" + i).style.display = "none";
        });
        e.preventDefault();
    }

    // Listening backSide Btn

    backSide.addEventListener('click', changeToBackSide);

    function changeToBackSide(e) {

        // Changing frontSideElements to backSideElements
        
        frontSideBtn = false;
        document.getElementsByClassName("canvas-container")[0].style.zIndex = "10";
        document.getElementsByClassName("canvas-container")[1].style.zIndex = "11";
        document.getElementById('front').style.display = 'none';
        document.getElementById('back').style.display = 'inline';
        document.getElementById('front-background').style.display = 'none';
        document.getElementById('back-background').style.display = 'inline';
        document.getElementById('back-sideBtn').style.backgroundColor = '#0a1e42';
        document.getElementById('front-sideBtn').style.backgroundColor = '#133879';

        // Disappearing frontSide images

        document.getElementById("frontCanvas").style.display = "none";
        document.getElementById("backCanvas").style.display = "initial";

        // Showing backSide images and setting their properties

        let backElements = document.querySelectorAll(".backSide");
        backElements.forEach((e, i) => {
            if (showHideBack[i] == true) {
                document.getElementById("backIcon" + i).setAttribute("src", "items/open.png");
                document.getElementById("backSide" + i).style.display = "inherit";
            } else {
                document.getElementById("backIcon" + i).setAttribute("src", "items/closed.png");
                document.getElementById("backSide" + i).style.display = "none";
            }
        });

        // Disappearing front layers

        let frontHolder = document.querySelectorAll(".front-index");
        frontHolder.forEach((e, i) => {
            document.getElementById("front-index" + i).style.display = "none";
        });

        // Setting layer icon to opened or closed and showing back layers

        let backHolder = document.querySelectorAll(".back-index");
        backHolder.forEach((e, i) => {
            document.getElementById("back-index" + i).style.display = "inherit";
            if (showHideBack[i] == true) {
                document.getElementById("backIcon" + i).setAttribute("src", "items/open.png");
            } else {
                document.getElementById("backIcon" + i).setAttribute("src", "items/closed.png");
            }
        });
        e.preventDefault();
    }

    // Listening leftSide click

    document.querySelector('#workspace').addEventListener("mouseup", setCoordsOfImage);

    function setCoordsOfImage(e){
        if(frontSideBtn == true){
        let imageSrc = frontCanvas._activeObject.getSrc();
        let topCoords = frontCanvas._activeObject.top;
        let leftCoords = frontCanvas._activeObject.left;
        let scaleX = frontCanvas._activeObject.scaleX;
        let scaleY = frontCanvas._activeObject.scaleY;
        let angle = frontCanvas._activeObject.angle;
        console.log(imageSrc);
        console.log(topCoords);
        console.log(leftCoords);
        let frontSessionStorage = [];
        frontSessionStorage = JSON.parse(sessionStorage.getItem(imgId));
        frontSessionStorage.forEach((item, i) => {
            let splitData = item.split('&');
            let firstPart = splitData[0];
            if(firstPart == imageSrc){
                splitData.splice(2, 5, topCoords, leftCoords, scaleX, scaleY, angle);
                console.log(splitData[2] + " " + splitData[3]);
                item = splitData[0] + "&" + splitData[1] + "&" + splitData[2] + "&" + splitData[3] + "&" + splitData[4] + "&" + splitData[5] + "&" + splitData[6];
                console.log(item);
                frontSessionStorage[i] = item;
                
            } else {
                console.log('Invalid');
            }
            
        });
        document.querySelectorAll(".frontMiniImage").forEach((item, i) => {
            let alt = item.getAttribute("alt");
            let splitAlt = alt.split("&");
            console.log(imageSrc);
            if(imageSrc == splitAlt[0]){
                splitAlt.splice(2, 5, topCoords, leftCoords, scaleX, scaleY, angle);
                item.setAttribute("alt", splitAlt[0] + "&" + splitAlt[1] + "&" + splitAlt[2] + "&" + splitAlt[3] + "&" + splitAlt[4] + "&" + splitAlt[5] + "&" + splitAlt[6]);
                console.log(item.getAttribute("alt"));
            } else {
                console.log("not the same");
            }
        });
        console.log(frontSessionStorage);
        sessionStorage.setItem(imgId, JSON.stringify(frontSessionStorage));
        } else {

        let imageSrc = backCanvas._activeObject.getSrc();
        let topCoords = backCanvas._activeObject.top;
        let leftCoords = backCanvas._activeObject.left;
        let scaleX = backCanvas._activeObject.scaleX;
        let scaleY = backCanvas._activeObject.scaleY;
        let angle = backCanvas._activeObject.angle;
        console.log(imageSrc);
        console.log(topCoords);
        console.log(leftCoords);
        let backSessionStorage = [];
        let backImgId = imgId.split("-");
        console.log(backImgId[1]);
        backSessionStorage = JSON.parse(sessionStorage.getItem("back-" + backImgId[1]));
        backSessionStorage.forEach((item, i) => {
            let splitData = item.split('&');
            let firstPart = splitData[0];
            if(firstPart == imageSrc){
                splitData.splice(2, 5, topCoords, leftCoords, scaleX, scaleY, angle);
                
                console.log(splitData[2] + " " + splitData[3]);
                item = splitData[0] + "&" + splitData[1] + "&" + splitData[2] + "&" + splitData[3] + "&" + splitData[4] + "&" + splitData[5]  + "&" + splitData[6];
                console.log(item);
                backSessionStorage[i] = item;
                
            } else {
                console.log('Invalid');
            }
            
        });
        document.querySelectorAll(".backMiniImage").forEach((item, i) => {
            let alt = item.getAttribute("alt");
            let splitAlt = alt.split("&");
            console.log(imageSrc);
            if(imageSrc == splitAlt[0]){
                splitAlt.splice(2, 5, topCoords, leftCoords, scaleX, scaleY, angle);
                item.setAttribute("alt", splitAlt[0] + "&" + splitAlt[1] + "&" + splitAlt[2] + "&" + splitAlt[3] + "&" + splitAlt[4] + "&" + splitAlt[5]  + "&" + splitAlt[6]);
                console.log(item.getAttribute("alt"));
                
            } else {
                console.log("not the same");
            }
        });
        console.log(backSessionStorage);
        sessionStorage.setItem("back-" + backImgId[1], JSON.stringify(backSessionStorage));
        }
        e.preventDefault();
    
    }
