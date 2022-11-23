//set input textbox just number
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    });
}

setInputFilter(document.getElementById("S_XayDung"), function (value) {
    return /^-?\d*[.,]?\d*$/.test(value)
});
setInputFilter(document.getElementById("S_SanXD"), function (value) {
    return /^-?\d*[.,]?\d*$/.test(value)
});
setInputFilter(document.getElementById("S_SuDung"), function (value) {
    return /^-?\d*[.,]?\d*$/.test(value)
});
setInputFilter(document.getElementById("BalconyHeight"), function (value) {
    return /^-?\d*[.,]?\d*$/.test(value)
});
setInputFilter(document.getElementById("S_SuaChua"), function (value) {
    return /^-?\d*[.,]?\d*$/.test(value)
});
setInputFilter(document.getElementById("HouseExpipry1"), function (value) {
    return /^-?\d*[.,]?\d*$/.test(value)
});
setInputFilter(document.getElementById("HouseExpipry2"), function (value) {
    return /^-?\d*[.,]?\d*$/.test(value)
});