const BUTTON_BG_COLOR = "#001524";
const BUTTON_COLOR = "#E4DFDA";
const addDatePattern = /^\d{4}-\d{2}-\d{2}$/;

let addDateInputError = true;
let addBookInputError = true;
let addStoreInputError = true;
let addCustomerInputError = true;

const addDate = document.getElementById("addDate");
const addBook = document.getElementById("addBook");
const addStore = document.getElementById("addStore");
const addCustomer = document.getElementById("addCustomer");

const addDateError = document.getElementById("addDateError");
const addBookError = document.getElementById("addBookError");
const addStoreError = document.getElementById("addStoreError");
const addCustomerError = document.getElementById("addCustomerError");

const addButton = document.querySelector(".addButton");

document.addEventListener('DOMContentLoaded', function() {
    addDate.addEventListener("input", function () {
        const selectedValue = this.value;

        if (selectedValue === "NULL" || !(addDatePattern.test(selectedValue))) {
            addDateError.textContent = "* Required";
            addDateInputError = true;
        } 
        else {
            addDateError.textContent = "";
            addDateInputError = false;
        }

        changeButtonStyle(addButton, addDateInputError, addBookInputError, addStoreInputError, addCustomerInputError);

    });

    addBook.addEventListener("change", function () {
        const selectedValue = this.value;

        if (selectedValue === "NULL") {
            addBookError.textContent = "* Required";
            addBookInputError = true;
        } 
        else {
            addBookError.textContent = "";
            addBookInputError = false;
        }

        changeButtonStyle(addButton, addDateInputError, addBookInputError, addStoreInputError, addCustomerInputError);

    });

    addStore.addEventListener("change", function () {
        const selectedValue = this.value;

        if (selectedValue === "NULL") {
            addStoreError.textContent = "* Required";
            addStoreInputError = true;
        } 
        else {
            addStoreError.textContent = "";
            addStoreInputError = false;
        }

        changeButtonStyle(addButton, addDateInputError, addBookInputError, addStoreInputError, addCustomerInputError);

    });

    addCustomer.addEventListener("change", function () {
        const selectedValue = this.value;

        if (selectedValue === "NULL") {
            addCustomerError.textContent = "* Required";
            addCustomerInputError = true;
        } 
        else {
            addCustomerError.textContent = "";
            addCustomerInputError = false;
        }

        changeButtonStyle(addButton, addDateInputError, addBookInputError, addStoreInputError, addCustomerInputError);

    });
    
    
    checkDefault(addDate, addDateError, "");
    checkDefault(addBook, addBookError, "NULL");
    checkDefault(addStore, addStoreError, "NULL");
    checkDefault(addCustomer, addCustomerError, "NULL");
});

function changeButtonStyle(button, dateHasError, bookHasError, storeHasError, customerHasError) {
    // -------------------- Debug --------------------
    // console.log(dateHasError, bookHasError, storeHasError, customerHasError)
    // -----------------------------------------------

    if (dateHasError || bookHasError || storeHasError || customerHasError) 
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