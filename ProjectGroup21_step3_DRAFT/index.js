//npm install express, nodemon.

'use strict';

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

let htmlTop = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bookstore</title>
    </head>
    <body>
        <nav>
            <a href="index.html">Home</a>
            <a href="books.html">Books</a>
            <a href="authors.html">Authors</a>
            <a href="customers.html">Customers</a>
            <a href="stores.html">Stores</a>
            <a href="invoices.html">Invoices</a>
            <a href="authorsbooks.html">AuthorsBooks</a>
        </nav>
`

let htmlBottom = `
        <footer>
            <p>&copy; 2023 Saurav Shrestha, Mo Hudeihed</p>
        </footer>
    </body>
</html>
`