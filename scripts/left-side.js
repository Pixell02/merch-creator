frontSide.addEventListener('click', changeToFrontSide);

    function changeToFrontSide(e) {

        // Changing backSideElements to frontSideElements
        
        frontSideBtn = true;
        document.getElementsByClassName("canvas-container")[0].style.zIndex = "101";
        document.getElementsByClassName("canvas-container")[1].style.zIndex = "100";
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
        document.getElementsByClassName("canvas-container")[0].style.zIndex = "100";
        document.getElementsByClassName("canvas-container")[1].style.zIndex = "101";
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