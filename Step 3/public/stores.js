const BUTTON_BG_COLOR = "#001524";
const BUTTON_COLOR = "#E4DFDA";
const addPhonePattern = /^\+?\d{1,3}[\s-]?\d{3,14}$/;

let addNameInputError = true;
let addPhoneInputError = true;
let addAddressInputError = true;

const addName = document.getElementById("addName");
const addPhone = document.getElementById("addPhone");
const addAddress = document.getElementById("addAddress");

const addNameError = document.getElementById("addNameError");
const addPhoneError = document.getElementById("addPhoneError");
const addAddressError = document.getElementById("addAddressError");

const addButton = document.querySelector(".addButton");

document.addEventListener('DOMContentLoaded', function() {
    addName.addEventListener('input', function() {
        const enteredText = this.value;
        const maxLength = this.getAttribute('maxlength');

        if ((enteredText.length <= 0) || (enteredText.length > maxLength)) {
            addNameInputError = true;
            addNameError.textContent = `Store Name length cannot be 0 or exceed ${maxLength} characters.`;
        }
        else if (enteredText.length == maxLength){
            addNameError.textContent = `Store Name length cannot be 0 or exceed ${maxLength} characters.`;
        }
        else {
            addNameInputError = false;
            addNameError.textContent = "";
        }

        changeButtonStyle(addButton, addNameInputError, addPhoneInputError, addAddressInputError);

    });

    addPhone.addEventListener('input', function() {
        const enteredText = this.value;

        // Pattern validates phone number length
        if ( (enteredText.length <= 0) || !(addPhonePattern.test(enteredText))) {
            addPhoneInputError = true;
            addPhoneError.textContent = `Phone number is invalid.`;
        }
        else {
            addPhoneInputError = false;
            addPhoneError.textContent = "";
        }

        changeButtonStyle(addButton, addNameInputError, addPhoneInputError, addAddressInputError);
    });

    addAddress.addEventListener('input', function() {
        const enteredText = this.value;
        const maxLength = this.getAttribute('maxlength');

        if ((enteredText.length <= 0) || (enteredText.length > maxLength)) {
            addAddressInputError = true;
            addAddressError.textContent = `Last Name length cannot be 0 or exceed ${maxLength} characters.`;
        }
        else if (enteredText.length == maxLength){
            addAddressError.textContent = `Last Name length cannot be 0 or exceed ${maxLength} characters.`;
        }
        else {
            addAddressInputError = false;
            addAddressError.textContent = "";
        }

        changeButtonStyle(addButton, addNameInputError, addPhoneInputError, addAddressInputError);
    });

    checkDefault(addName, addNameError, "");
    checkDefault(addPhone, addPhoneError, "");
    checkDefault(addAddress, addAddressError, "");
});


function changeButtonStyle(button, nameHasError, phoneHasError, addressHasError) {
    // -------------------- Debug --------------------
    // console.log(nameHasError, phoneHasError, addressHasError)
    // -----------------------------------------------

    if (nameHasError || phoneHasError || addressHasError) 
    {
        button.disabled = true;
        button.style.backgroundColor = "gray";
        button.style.color = "white";
        button.style.cursor = "not-allowed";
    } 
    else 
    {
        button.disabled = false;
        button.style.backgroundColor = BUTTON_BG_COLOR;
        button.style.color = BUTTON_COLOR;
        button.style.cursor = "pointer";
    }
}

function checkDefault(inputObj, inputObjError, defaultVal){
    // -------------------- Debug --------------------
    // console.log(inputObj, inputObjError, defaultVal);
    // console.log("inputObj.value:", inputObj.value, "defaultVal:", defaultVal, "inputObj.value == defaultVal:", inputObj.value == defaultVal);
    // -----------------------------------------------

    if (inputObj.value == defaultVal)
    {
        inputObjError.textContent = "* Required";
    }
    else{
        inputObjError.textContent = "";
    }
}