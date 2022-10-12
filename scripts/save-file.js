const saveBtn = document.getElementById("saveBtn");
    saveBtn.addEventListener('click', function () {
        domtoimage.toBlob(document.getElementById('workspace'))
            .then(function (blob) {
                window.saveAs(blob, 'merch.png');
            });
    });