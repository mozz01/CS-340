const BUTTON_BG_COLOR = "#001524";
const BUTTON_COLOR = "#E4DFDA";
const addEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const addPhonePattern = /^\+?\d{1,3}[\s-]?\d{3,14}$/;

let addFirstNameInputError = true;
let addLastNameInputError = true;
let addEmailInputError = true;
let addPhoneInputError = true;

const addFirstName = document.getElementById("addFirstName");
const addLastName = document.getElementById("addLastName");
const addEmail = document.getElementById("addEmail");
const addPhone = document.getElementById("addPhone");

const addFirstNameError = document.getElementById("addFirstNameError");
const addLastNameError = document.getElementById("addLastNameError");
const addEmailError = document.getElementById("addEmailError");
const addPhoneError = document.getElementById("addPhoneError");

const addButton = document.querySelector(".addButton");

document.addEventListener('DOMContentLoaded', function() {
    addFirstName.addEventListener('input', function() {
        const enteredText = this.value;
        const maxLength = this.getAttribute('maxlength');

        if ((enteredText.length <= 0) || (enteredText.length > maxLength)) {
            addFirstNameInputError = true;
            addFirstNameError.textContent = `First Name length cannot be 0 or exceed ${maxLength} characters.`;
        }
        else if (enteredText.length == maxLength){
            addFirstNameError.textContent = `First Name length cannot be 0 or exceed ${maxLength} characters.`;
        }
        else {
            addFirstNameInputError = false;
            addFirstNameError.textContent = "";
        }

        changeButtonStyle(addButton, addFirstNameInputError, addLastNameInputError, addEmailInputError, addPhoneInputError);
    });

    addLastName.addEventListener('input', function() {
        const enteredText = this.value;
        const maxLength = this.getAttribute('maxlength');

        if ((enteredText.length <= 0) || (enteredText.length > maxLength)) {
            addLastNameInputError = true;
            addLastNameError.textContent = `Last Name length cannot be 0 or exceed ${maxLength} characters.`;
        }
        else if (enteredText.length == maxLength){
            addLastNameError.textContent = `Last Name length cannot be 0 or exceed ${maxLength} characters.`;
        }
        else {
            addLastNameInputError = false;
            addLastNameError.textContent = "";
        }

        changeButtonStyle(addButton, addFirstNameInputError, addLastNameInputError, addEmailInputError, addPhoneInputError);
    });
    
    addEmail.addEventListener('input', function() {
        const enteredText = this.value;

        if ((enteredText.length <= 0) || !(addEmailPattern.test(enteredText))) {
            addEmailInputError = true;
            addEmailError.textContent = `Email is invalid.`;
        }
        else {
            addEmailInputError = false;
            addEmailError.textContent = "";
        }

        changeButtonStyle(addButton, addFirstNameInputError, addLastNameInputError, addEmailInputError, addPhoneInputError);

    });

    addPhone.addEventListener('input', function() {
        const enteredText = this.value;

        // Pattern validates phone number length
        if ((enteredText.length <= 0) || !(addPhonePattern.test(enteredText))) {
            addPhoneInputError = true;
            addPhoneError.textContent = `Phone number is invalid.`;
        }
        else {
            addPhoneInputError = false;
            addPhoneError.textContent = "";
        }

        changeButtonStyle(addButton, addFirstNameInputError, addLastNameInputError, addEmailInputError, addPhoneInputError);
    });

    checkDefault(addFirstName, addFirstNameError, "");
    checkDefault(addLastName, addLastNameError, "");
    checkDefault(addEmail, addEmailError, "");
    checkDefault(addPhone, addPhoneError, "");
});


function changeButtonStyle(button, firstNameHasError, lastNameHasError, emailHasError, phoneHasError) {
    // -------------------- Debug --------------------
    // console.log(button, firstNameHasError, lastNameHasError, emailHasError, phoneHasError)
    // -----------------------------------------------

    if (firstNameHasError || lastNameHasError || emailHasError || phoneHasError) 
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