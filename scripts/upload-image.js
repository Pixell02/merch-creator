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
    
      // Creating reader object

        let reader = new FileReader();
        let arrayLength = realBtn.files.length - 1;

      // Getting DataURL and name of file to store in session storage

        reader.readAsDataURL(realBtn.files[arrayLength]);
        reader.onload = (e) => {
            let imgObj = new Image();
            imgObj.src = e.target.result;
            storeImageInSessionStorage(imgObj.src, realBtn.files[arrayLength].name, imgId);
          
            // Deleting items to refresh workspace and elements
           
            if(frontSideBtn==true){
                document.querySelectorAll(".front-index").forEach((item) => {
                  item.remove();
                });
                document.querySelectorAll(".front-canvas-img").forEach((item) => {
                    item.remove();
                });  
              frontCanvas.clear();
              getFrontImagesFromSessionStorage(imgId);
            } else {
                document.querySelectorAll(".back-index").forEach((item) => { 
                item.remove();
              });
                document.querySelectorAll(".back-canvas-img").forEach((item) => {
                item.remove();
              });
                backCanvas.clear();
                getBackImagesFromSessionStorage(imgId);
            }
        }
    }