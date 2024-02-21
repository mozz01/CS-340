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
    console.log(selectedValue);

    if (selectedValue !== "NULL") {
        addAuthors.innerHTML = addOneAuthor;
    } 
    else {
        addAuthors.innerHTML = '';
    }
});