// Get color from input

let pickerColor = document.getElementById('pallet');
let inputColor = document.getElementById('hexa-color');

//Getting color value from input

pickerColor.addEventListener('input', colorValue);

function colorValue(e) {
    const backColor = document.getElementById('back-background');
    const frontColor = document.getElementById('front-background');
    backColor.style.backgroundColor = pickerColor.value;
    frontColor.style.backgroundColor = pickerColor.value;
    inputColor.value = pickerColor.value;
    if(frontSideBtn == true) {
        sessionStorage.setItem(imgId + '-color', pickerColor.value);
    } else {
        let backId = imgId.split("-");
        sessionStorage.setItem("back-" + backId[1] + "-color", pickerColor.value);
    }
    e.preventDefault();
}

inputColor.addEventListener('input', inputValue);

function inputValue(e) {
    const backColor = document.getElementById('back-background');
    const frontColor = document.getElementById('front-background');
    frontColor.style.backgroundColor = inputColor.value;
    backColor.style.backgroundColor = inputColor.value;
    pickerColor.value = inputColor.value;
    if(frontSideBtn == true) {
        sessionStorage.setItem(imgId + '-color', pickerColor.value);
    } else {
        let backId = imgId.split("-");
        sessionStorage.setItem("back-" + backId[1] + "-color", pickerColor.value);
    }
    e.preventDefault();
}