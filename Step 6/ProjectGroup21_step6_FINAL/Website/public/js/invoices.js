// Citation for the following Setup and Route codes:
// Date: 03/10/2024
// Based on CS340 nodejs-starter-app on GitHub
// Code for using JQuery to send requests for adding an invoice to table, deleting an invoice from the table and reloading Invoices table were based
// on "Step 7 - Dynamically Deleting Data" section of nodejs-starter-app on Github. The executed functions for success responses were our own
// work as they varied for each requests. Only for the deleteInvoice function the executed function was based on a code from stackoverflow. It
// filters through the table to find the row that contains matching invoice ID and the remove that row.    
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
//             https://stackoverflow.com/questions/31937653/how-to-remove-a-tr-which-have-a-td-that-contain-specific-text
               

const BUTTON_BG_COLOR = "#001524";
const BUTTON_COLOR = "#E4DFDA";
const BUTTON_HIGHLIGHT_COLOR = "#FF7D00";
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

    getTitles();
    getStores();
    getCustomers();
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

// Add an invoice to the table.
async function addInvoice(){
    const data = {
        date: addDate.value,
        bookID: addBook.value,
        storeID: addStore.value,
        customerID: addCustomer.value
    }

    await $.ajax({
        url: '/add-invoice',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: () => {
            reloadInvoicesTable();
        },
        error: function(xhr, status, error) {
            console.error('Error adding to Invoices table:', error);
        }
    });
}

// Delete an invoice from the table.
function deleteInvoice(invoiceID){
    $.ajax({
        url: `/invoices/${invoiceID}`,
        type: 'DELETE',
        success: function(response) {
            // Filters through all the table rows (<tr>) to find the first cell (<td>) which contains the customer's ID. Once found it removes the row from the table.
            // Citation (Based on): https://stackoverflow.com/questions/31937653/how-to-remove-a-tr-which-have-a-td-that-contain-specific-text
            $('tr').filter(function() {
                return $(this).find('td:first').text() == invoiceID;
            }).remove();
            console.log('Invoice deleted successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Error deleting invoice:', error);
        }
    });
}

// Reload the storess table after user performs an add or delete operation.
function reloadInvoicesTable() {
    $.ajax({
        url: '/reload-invoices',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $('.displayTable tbody').empty();

            data.forEach(function(invoice) {
                $('.displayTable tbody').append(`
                    <tr>
                        <td>${invoice.invoiceID}</td>
                        <td>${invoice.date}</td>
                        <td>${invoice.title}</td>
                        <td>${invoice.name}</td>
                        <td>${invoice.customerName}</td>
                        <td>
                            <button onclick="deleteInvoice(${invoice.invoiceID})">Delete</button>
                        </td>
                    </tr>
                `);
            });
            $("#add-invoice-form")[0].reset(); // Clear any input values the user may have entered.
        },
        error: function(xhr, status, error) {
            console.error('Error reloading Invoices table:', error);
        }
    });
}

// Populate select dropdown list of titles to select from.
function getTitles(){
    $.ajax({
        url: '/reload-books',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(books) {
            books.forEach(function(book) {
                $('#addBook').append(`
                    <option value="${book.bookID}">
                        ${book.title}
                    </option>
                `);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error retrieving titles:', error);
        }
    });
};

// Populate select dropdown list of stores to select from. 
function getStores(){
    $.ajax({
        url: '/reload-stores',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(stores) {
            stores.forEach(function(store) {
                $('#addStore').append(`
                    <option value="${store.storeID}">
                        ${store.name}
                    </option>
                `);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error retrieving titles:', error);
        }
    });
};

// Populate select dropdown list of customers to select from.
function getCustomers(){
    $.ajax({
        url: '/reload-customers',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(customers) {
            customers.forEach(function(customer) {
                $('#addCustomer').append(`
                    <option value="${customer.customerID}">
                        ${customer.firstName} ${customer.lastName}
                    </option>
                `);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error retrieving titles:', error);
        }
    });
};