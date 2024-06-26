const BUTTON_BG_COLOR = "#001524";
const BUTTON_COLOR = "#E4DFDA";
const BUTTON_HIGHLIGHT_COLOR = "#FF7D00";
const addPhonePattern = /^\d{3}-\d{3}-\d{4}$/;

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
        const enteredText = this.value.trim();
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
            addPhoneError.textContent = `Format: 000-000-0000`;
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
            addAddressError.textContent = `Address length cannot be 0 or exceed ${maxLength} characters.`;
        }
        else if (enteredText.length == maxLength){
            addAddressError.textContent = `Address length cannot be 0 or exceed ${maxLength} characters.`;
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
        button.style.cursor = "pointer";
        button.style.backgroundColor = BUTTON_BG_COLOR;
        button.style.color = BUTTON_COLOR;
        button.style.transition = "background-color 0.3s ease";

        button.addEventListener("mouseenter", function() {
            button.style.backgroundColor = BUTTON_HIGHLIGHT_COLOR;
            button.style.color = BUTTON_BG_COLOR;
        });
        button.addEventListener("mouseleave", function() {
            button.style.backgroundColor = BUTTON_BG_COLOR;
            button.style.color = BUTTON_COLOR;
        });
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


async function addStore(){
    const data = {
        name: addName.value,
        phone: addPhone.value,
        address: addAddress.value
    }

    await $.ajax({
        url: '/add-store',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: () => {
            reloadStoresTable();
        },
        error: function(xhr, status, error) {
            $('#addNameError').text("Store with the same name, phone or address already exists in the database!");
            console.error('Error adding to Stores table:', error);
        }
    });
}


function deleteStore(storeID){
    $.ajax({
        url: `/stores/${storeID}`,
        type: 'DELETE',
        success: function(response) {
            $('tr').filter(function() {
                return $(this).find('td:first').text() == storeID;
            }).remove();
            console.log('Store deleted successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Error deleting store:', error);
        }
    });
}


function reloadStoresTable() {
    $.ajax({
        url: '/reload-stores',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $('.displayTable tbody').empty();

            data.forEach(function(store) {
                $('.displayTable tbody').append(`
                    <tr>
                        <td>${store.storeID}</td>
                        <td>${store.name}</td>
                        <td>${store.phone}</td>
                        <td>${store.address}</td>
                        <td>
                            <button onclick="deleteStore(${store.storeID})">Delete</button>
                        </td>
                    </tr>
                `);
            });
            $("#add-store-form")[0].reset();

        },
        error: function(xhr, status, error) {
            console.error('Error reloading Stores table:', error);
        }
    });
}