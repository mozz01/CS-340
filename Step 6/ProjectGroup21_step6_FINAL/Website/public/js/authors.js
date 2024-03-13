const BUTTON_BG_COLOR = "#001524";
const BUTTON_COLOR = "#E4DFDA";
const BUTTON_HIGHLIGHT_COLOR = "#FF7D00";
let addFirstNameInputError = true;
let addLastNameInputError = true;

const addFirstName = document.getElementById("addFirstName");
const addLastName = document.getElementById("addLastName");

const addFirstNameError = document.getElementById("addFirstNameError");
const addLastNameError = document.getElementById("addLastNameError");

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

        changeButtonStyle(addButton, addFirstNameInputError, addLastNameInputError);

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

        changeButtonStyle(addButton, addFirstNameInputError, addLastNameInputError);
    });

    checkDefault(addFirstName, addFirstNameError, "");
    checkDefault(addLastName, addLastNameError, "");
});


function changeButtonStyle(button, firstNameHasError, lastNameHasError) {
    // -------------------- Debug --------------------
    // console.log(firstNameHasError, lastNameHasError)
    // -----------------------------------------------

    if (firstNameHasError || lastNameHasError) 
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


async function addAuthor(){
    const data = {
        firstName: addFirstName.value,
        lastName: addLastName.value
    }

    await $.ajax({
        url: '/add-author',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: () => {
            console.log(`Added to Authors table: firstName = '${data.firstName}', lastName = '${data.lastName}'.`);
            reloadAuthorsTable();
        },
        error: function(xhr, status, error) {
            $('#addFirstNameError').text("Author already exists in the database!");
            console.error('Error adding to Authors table:', error);
        }
    });
}


function deleteAuthor(authorID){
    $.ajax({
        url: `/authors/${authorID}`,
        type: 'DELETE',
        success: function(response) {
            $('tr').filter(function() {
                return $(this).find('td:first').text() == authorID;
            }).remove();
            console.log('Author deleted successfully.');
        },
        error: function(xhr, status, error) {
            console.error('Error deleting author:', error);
        }
    });
}


function reloadAuthorsTable() {
    $.ajax({
        url: '/reload-authors',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            $('.displayTable tbody').empty();

            data.forEach(function(author) {
                $('.displayTable tbody').append(`
                    <tr>
                        <td>${author.authorID}</td>
                        <td>${author.firstName}</td>
                        <td>${author.lastName}</td>
                        <td>
                            <button onclick="deleteAuthor(${author.authorID})">Delete</button>
                        </td>
                    </tr>
                `);
            });
            $("#add-author-form")[0].reset();

        },
        error: function(xhr, status, error) {
            console.error('Error reloading Authors table:', error);
        }
    });
}