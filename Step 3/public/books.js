const BUTTON_BG_COLOR = "#001524";
const BUTTON_COLOR = "#E4DFDA";

let addTitleInputError = true;
let addPriceInputError = true;
let addAuthor1InputError = true;
let addYearOfPublicationInputError = true;

let updateTitleInputError = true;
let updateAuthor1InputError = true;
let updatePriceInputError = true;
let updateYearOfPublicationInputError = true;

const addButton = document.querySelector(".addButton");
const updateButton = document.querySelector(".updateButton");

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

// -------------------- Adder consts --------------------
const addTitle = document.getElementById("addTitle");
const addTitleError = document.getElementById("addTitleError");


const addOneAuthor = `
<td>
    <label for="author2">Author 2:</label>
</td>
<td>
    <select id="author2" name="author2">
        <option value="NULL" selected> None </option>
        <option value="1"> Edgar Patterson </option>
        <option value="2"> William Fitzgerald </option>
        <option value="3"> George Wolf </option>
        <option value="4"> Mike Lang </option>
    </select>
</td>
`;
const addAuthor2 = document.getElementById("addAuthor2");
const addAuthor1 = document.getElementById("addAuthor1");
const addAuthor1Error = document.getElementById("addAuthor1Error");

const addPrice = document.getElementById("addPrice");
const addPriceError = document.getElementById("addPriceError");

const addYearOfPublication = document.getElementById("addYearOfPublication");
const addYearOfPublicationError = document.getElementById("addYearOfPublicationError");

// -------------------- Updater consts --------------------
const updateTitle = document.getElementById("updateTitle");
const updateTitleError = document.getElementById("updateTitleError");

const updateAuthor1 = document.getElementById("updateAuthor1");
const updateAuthor2 = document.getElementById("updateAuthor2");
const updateAuthor1Error = document.getElementById("updateAuthor1Error");
const updateAuthor2Error = document.getElementById("updateAuthor2Error");

const updatePrice = document.getElementById("updatePrice");
const updatePriceError = document.getElementById("updatePriceError");

const updateYearOfPublication = document.getElementById("updateYearOfPublication");
const updateYearOfPublicationError = document.getElementById("updateYearOfPublicationError");


// -------------------- Listeners --------------------
document.addEventListener('DOMContentLoaded', function() {
    addTitle.addEventListener('input', function() {
        const enteredText = this.value;
        const maxLength = this.getAttribute('maxlength');

        if ((enteredText.length <= 0) || (enteredText.length > maxLength)) {
            addTitleInputError = true;
            addTitleError.textContent = `Title length cannot be 0 or exceed ${maxLength} characters.`;
        }
        else if (enteredText.length == maxLength){
            addTitleError.textContent = `Title length cannot be 0 or exceed ${maxLength} characters.`;
        }
        else {
            addTitleInputError = false;
            addTitleError.textContent = "";
        }

        changeButtonStyle(addButton, addTitleInputError, addAuthor1InputError, addPriceInputError, addYearOfPublicationInputError);

    });

    addAuthor1.addEventListener("change", function () {
        const selectedValue = this.value;
        const index = this.selectedIndex;

        if (selectedValue === "NULL") {
            addAuthor1Error.textContent = "* Required";
            addAuthor2.innerHTML = "";
            addAuthor1InputError = true;
        } 
        else {
            addAuthor1Error.textContent = "";
            addAuthor2.innerHTML = addOneAuthor;
            addAuthor2.childNodes[3].childNodes[1].options[index].disabled = true
            addAuthor1InputError = false;
        }

        changeButtonStyle(addButton, addTitleInputError, addAuthor1InputError, addPriceInputError, addYearOfPublicationInputError);

    });

    addPrice.addEventListener('input', function() {
        // -------------------- Debug --------------------
        // console.log(this.value)
        // -----------------------------------------------
        const value_HTML = this.value;
        const min_HTML = this.getAttribute('min');
        const max_HTML = this.getAttribute('max');
        
        const value = parseFloat(value_HTML);
        const min = parseFloat(min_HTML);
        const max = parseFloat(max_HTML);

        if (value < min || value > max || value_HTML.length == 0 || value_HTML === "-0") {
            addPriceInputError = true;
            addPriceError.textContent = `Price must be in the valid range from ${formatter.format(min)} to ${formatter.format(max)} (inclusive).`;
        } 
        else {
            addPriceInputError = false;
            addPriceError.textContent = "";
        }

        changeButtonStyle(addButton, addTitleInputError, addAuthor1InputError, addPriceInputError, addYearOfPublicationInputError);
    });

    addYearOfPublication.addEventListener('input', function() {
        this.value = this.value.replace(/[-+.]/g, "");
        const value_HTML = this.value;
        const min_HTML = this.getAttribute('min');
        const max_HTML = this.getAttribute('max');

        const value = parseInt(value_HTML);
        const min = parseInt(min_HTML);
        const max = parseInt(max_HTML);

        if (value < min || value > max || value_HTML.length == 0) {
            addYearOfPublicationInputError = true;
            addYearOfPublicationError.textContent = `Year of Publication must be in the valid range from ${min} to ${max} (inclusive).`;
        } 
        else {
            addYearOfPublicationInputError = false;
            addYearOfPublicationError.textContent = "";
        }

        changeButtonStyle(addButton, addTitleInputError, addAuthor1InputError, addPriceInputError, addYearOfPublicationInputError);

    });
    
    // ------------------------------------------------------------------------------------------------

    updateTitle.addEventListener('input', function() {
        const enteredText = this.value;
        const maxLength = this.getAttribute('maxlength');

        if ((enteredText.length <= 0) || (enteredText.length > maxLength)) {
            updateTitleInputError = true;
            updateTitleError.textContent = `Title length cannot exceed ${maxLength} characters.`;
        } 
        else if (enteredText.length == maxLength){
            updateTitleError.textContent = `Title length cannot exceed ${maxLength} characters.`;
        }
        else {
            updateTitleInputError = false;
            updateTitleError.textContent = "";
        }

        changeButtonStyle(updateButton, updateTitleInputError, updateAuthor1InputError, updatePriceInputError, updateYearOfPublicationInputError);
    });


    updateAuthor1.addEventListener("change", function () {
        const selectedValue = this.value;
        const index = this.selectedIndex;

        // reset all options so they're selectable
        for (let i = 1; i < updateAuthor2.options.length; i++) {
            updateAuthor2.options[i].disabled = false;
        }

        if ((selectedValue === "NULL" && updateAuthor2.value === "NULL") || (selectedValue === "NULL" && updateAuthor2.value != "NULL")) {
            updateAuthor1Error.textContent = "* Required";
            updateAuthor1InputError = true;
        } 
        else if (selectedValue === updateAuthor2.value) {
            updateAuthor2.value = "NULL";
            this.value = "NULL";
            updateAuthor1Error.textContent = "Author 1 cannot equal Author 2.";
            updateAuthor1InputError = true;
        }
        else {
            updateAuthor1Error.textContent = "";
            updateAuthor1InputError = false;
            updateAuthor2.options[index].disabled = true
        }

        changeButtonStyle(updateButton, updateTitleInputError, updateAuthor1InputError, updatePriceInputError, updateYearOfPublicationInputError);

    });
    

    updatePrice.addEventListener('input', function() {
        const value_HTML = this.value;
        const min_HTML = this.getAttribute('min');
        const max_HTML = this.getAttribute('max');

        const value = parseFloat(value_HTML);
        const min = parseFloat(min_HTML);
        const max = parseFloat(max_HTML);

        if (value < min || value > max || value_HTML.length == 0 || value_HTML === "-0") {
            updatePriceInputError = true;
            updatePriceError.textContent = `Price must be in the valid range from ${formatter.format(min)} to ${formatter.format(max)} (inclusive).`;
        } 
        else {
            updatePriceInputError = false;
            updatePriceError.textContent = "";
        }

        changeButtonStyle(updateButton, updateTitleInputError, updateAuthor1InputError, updatePriceInputError, updateYearOfPublicationInputError);
    });


    updateYearOfPublication.addEventListener('input', function() {
        this.value = this.value.replace(/[-+.]/g, "");
        const value_HTML = this.value;
        const min_HTML = this.getAttribute('min');
        const max_HTML = this.getAttribute('max');

        const value = parseInt(value_HTML);
        const min = parseInt(min_HTML);
        const max = parseInt(max_HTML);

        if (value < min || value > max || value_HTML.length == 0) {
            updateYearOfPublicationInputError = true;
            updateYearOfPublicationError.textContent = `Year of Publication must be in the valid range from ${min} to ${max} (inclusive).`;
        } 
        else {
            updateYearOfPublicationInputError = false;
            updateYearOfPublicationError.textContent = "";
        }

        changeButtonStyle(updateButton, updateTitleInputError, updateAuthor1InputError, updatePriceInputError, updateYearOfPublicationInputError);
    });

    checkDefault(addTitle, addTitleError, "");
    checkDefault(addAuthor1, addAuthor1Error, "NULL");
    checkDefault(addPrice, addPriceError, "0");
    checkDefault(addYearOfPublication, addYearOfPublicationError, "0");
    checkDefault(updateTitle, updateTitleError, "");
    checkDefault(updateAuthor1, updateAuthor1Error, "NULL");
    checkDefault(updatePrice, updatePriceError, "0");
    checkDefault(updateYearOfPublication, updateYearOfPublicationError, "0");
});


function changeButtonStyle(button, titleHasError, author1HasError, priceHasError, yearHasError) {
    // -------------------- Debug --------------------
    console.log(titleHasError, author1HasError, priceHasError, yearHasError)
    // -----------------------------------------------

    if (titleHasError || author1HasError || priceHasError || yearHasError) 
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

function updateBook(id, title, year, price)
{
    // run fetch query based on ID

    updateTitle.value = title;
    updateAuthor1.value = id;
    updatePrice.value = year;
    updateYearOfPublication.value = price;


    // Clear user input checks for old book's information
    updateTitleInputError = false;
    updateAuthor1InputError = false;
    updatePriceInputError = false;
    updateYearOfPublicationInputError = false;
    
    changeButtonStyle(updateButton, updateTitleInputError, updateAuthor1InputError, updatePriceInputError, updateYearOfPublicationInputError);

    checkDefault(updateTitle, updateTitleError, "");
    checkDefault(updateAuthor1, updateAuthor1Error, "NULL");
    checkDefault(updatePrice, updatePriceError, "0");
    checkDefault(updateYearOfPublication, updateYearOfPublicationError, "0");
}