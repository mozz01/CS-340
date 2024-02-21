document.addEventListener('DOMContentLoaded', function() {
    const addTitle = document.getElementById("addTitle");
    const addTitleError = document.getElementById("addTitleError");

    addTitle.addEventListener('input', function() {
        const enteredText = this.value;
        const maxLength = this.getAttribute('maxlength');

        if (enteredText.length >= maxLength) {
            addTitleError.textContent = `Title length cannot exceed ${maxLength} characters.`;
        } 
        else {
            addTitleError.textContent = "";
        }
    });


    const addPrice = document.getElementById("addPrice");
    const addPriceError = document.getElementById("addPriceError");

    addPrice.addEventListener('input', function() {
        const value = this.value;
        const min = this.getAttribute('min');
        const max = this.getAttribute('max');

        if (value < min || value > max) {
            addPriceError.textContent = `Price must be in the valid range from ${min} to ${max}.`;
        } 
        else {
            addPriceError.textContent = "";
        }
    });


    const addYearOfPublication = document.getElementById("addYearOfPublication");
    const addYearOfPublicationError = document.getElementById("addYearOfPublicationError");

    addYearOfPublication.addEventListener('input', function() {
        const value = this.value;
        const min = this.getAttribute('min');

        if (value < min) {
            addYearOfPublicationError.textContent = `Year of Publication must be greater or equal to ${min}.`;
        } 
        else {
            addYearOfPublicationError.textContent = "";
        }
    });
    

    const updateTitle = document.getElementById("updateTitle");
    const updateTitleError = document.getElementById("updateTitleError");

    updateTitle.addEventListener('input', function() {
        const enteredText = this.value;
        const maxLength = this.getAttribute('maxlength');

        if (enteredText.length >= maxLength) {
            updateTitleError.textContent = `Title length cannot exceed ${maxLength} characters.`;
        } 
        else {
            updateTitleError.textContent = "";
        }
    });


    const updatePrice = document.getElementById("updatePrice");
    const updatePriceError = document.getElementById("updatePriceError");

    updatePrice.addEventListener('input', function() {
        const value = this.value;
        const min = this.getAttribute('min');
        const max = this.getAttribute('max');

        if (value < min || value > max) {
            updatePriceError.textContent = `Price must be in the valid range from ${min} to ${max}.`;
        } 
        else {
            updatePriceError.textContent = "";
        }
    });


    const updateYearOfPublication = document.getElementById("updateYearOfPublication");
    const updateYearOfPublicationError = document.getElementById("updateYearOfPublicationError");

    updateYearOfPublication.addEventListener('input', function() {
        const value = this.value;
        const min = this.getAttribute('min');

        if (value < min) {
            updateYearOfPublicationError.textContent = `Year of Publication must be greater or equal to ${min}.`;
        } 
        else {
            updateYearOfPublicationError.textContent = "";
        }
    });
    


    const addOneAuthor = `
                <td>
                <label for="author2">Author 2:</label>
                </td>
                <td>
                <select id="author2" name="author2" required>
                    <option selected="selected" value="none"> None </option>
                    <option value="Edgar Patterson"> Edgar Patterson </option>
                    <option value="William Fitzgerald"> William Fitzgerald </option>
                    <option value="George Wolf"> George Wolf </option>
                    <option value="Mike Lang"> Mike Lang </option>
                </select>
                </td>
                `;
    const addAuthors = document.getElementById("addAuthors");
    const selectAuthor1 = document.getElementById("selectAuthor1");

    selectAuthor1.addEventListener('change', function() {

        const selectedValue = this.value;
        // console.log(selectedValue);

        if (selectedValue !== "NULL") {
            addAuthors.innerHTML = addOneAuthor;
        } 
        else {
            addAuthors.innerHTML = '';
        }
    });
});