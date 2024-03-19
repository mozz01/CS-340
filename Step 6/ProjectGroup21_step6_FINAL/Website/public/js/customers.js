// Citation for the following Setup and Route codes:
// Date: 03/10/2024
// Based on CS340 nodejs-starter-app on GitHub
// Code for using JQuery to send requests for adding customer to table, deleting customer from the table and reloading customer table were based
// on "Step 7 - Dynamically Deleting Data" section of nodejs-starter-app on Github. The executed functions for success responses were our own
// work as they varied for each requests. Only for the deleteCustomer function the executed function was based on a code from stackoverflow. It
// filters through the table to find the row that contains matching customer ID and the remove that row.   
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
//             https://stackoverflow.com/questions/31937653/how-to-remove-a-tr-which-have-a-td-that-contain-specific-text

               

function deleteCustomer(ID){
    console.log("Received:", ID)
}

const BUTTON_BG_COLOR = "#001524";
const BUTTON_COLOR = "#E4DFDA";
const BUTTON_HIGHLIGHT_COLOR = "#FF7D00";
const addEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const addPhonePattern = /^\d{3}-\d{3}-\d{4}$/;

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
        const enteredText = this.value.trim();
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
        const enteredText = this.value.trim();
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
            addPhoneError.textContent = `Format: 000-000-0000`;
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

// Add a customer in the table.
async function addCustomer(){
    const data = {
        firstName: addFirstName.value,
        lastName: addLastName.value,
        email: addEmail.value,
        phone: addPhone.value
    }

    await $.ajax({
        url: '/add-customer',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: () => {
            reloadCustomersTable();
        },
        error: function(xhr, status, error) {
            $('#addFirstNameError').text("Customer with same email or phone number already exists in the database!");
            console.error('Error adding to Customers table:', error);
        }
    });
}

// Delete a customer from the table.
function deleteCustomer(customerID){
    $.ajax({
        url: `/customers/${customerID}`,
        type: 'DELETE',
        success: function(response) {
            // Filters through all the table rows (<tr>) to find the first cell (<td>) which contains the customer's ID. Once found it removes the row from the table.
            // Citation (Based on): https://stackoverflow.com/questions/31937653/how-to-remove-a-tr-which-have-a-td-that-contain-specific-text
            $('tr').filter(function() {
                return $(this).find('td:first').text() == customerID;
            }).remove();
            console.log('Customer deleted successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Error deleting customer:', error);
        }
    });
}

// Reload the Customers table after user performs an add or delete operation.
function reloadCustomersTable() {
    $.ajax({
        url: '/reload-customers',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $('.displayTable tbody').empty();

            data.forEach(function(customer) {
                $('.displayTable tbody').append(`
                    <tr data-value=${customer.customerID}>
                        <td>${customer.customerID}</td>
                        <td>${customer.firstName}</td>
                        <td>${customer.lastName}</td>
                        <td>${customer.email}</td>
                        <td>${customer.phone}</td>
                        <td>
                            <button onclick="deleteCustomer(${customer.customerID})">Delete</button>
                        </td>
                    </tr>
                `);
            });
            $("#add-customer-form")[0].reset(); // Clear any input values the user may have entered.
        },
        error: function(xhr, status, error) {
            console.error('Error reloading Customers table:', error);
        }
    });
}