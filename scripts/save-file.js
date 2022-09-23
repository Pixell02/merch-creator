const saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener('click', function () {
        domtoimage.toBlob(document.getElementById('left-side'))
            .then(function (blob) {
                window.saveAs(blob, 'my-node.png');
            });
    });