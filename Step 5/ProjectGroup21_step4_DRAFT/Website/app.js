require("dotenv").config();
const express = require('express');                 // We are using the express library for the web server
const app = express();                              // We need to instantiate an express object to interact with the server in our code

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

PORT = process.env.PORT;                            // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars');       // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs", defaultLayout: 'main' }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                     // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
const db = require('./database/db-connector');


// ---------------------------------------------
// Home/Index
// ---------------------------------------------
app.get('/', function (req, res) {
    res.render('index');
});



// ---------------------------------------------
// Books
// ---------------------------------------------
// Display books table
app.get('/books', function (req, res) {
    const query1 = "SELECT * FROM Books;";
    const query2 = "SELECT * FROM Authors;";

    db.pool.query(query1, function (error, rows, fields) {
        const books = rows;

        rows.forEach(function(book) {
            book.price = book.price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        });

        db.pool.query(query2, (error, rows, fields) => { // Used to populate select list of authors in books.hbs file
            const authors = rows;
            res.render('books', { data: books, authors: authors });
        });
    });
});


// Add book to the books table and add bookID + authorID to authorsbooks table
app.post('/add-book', (req, res) => {
    const data = req.body;
    const title = data.title;
    const author1ID = data.author1ID;
    const author2ID = data.author2ID;
    const yearOfPublication = data.YOP;
    const price = data.price;
    let isAuthor2NULL = (author2ID === 'NULL');

    console.log("data:", data, "isAuthor2NULL:", isAuthor2NULL)

    const addQuery1 = `
        INSERT INTO Books(title, yearOfPublication, price)
        VALUES (?, ?, ?);
        `;
    const addQuery2 = `
        INSERT INTO AuthorsBooks(bookID, AuthorID)
        VALUES (
                    (
                        SELECT bookID 
                        FROM Books 
                        WHERE title = ?
                    ), 
                    ?
                );
        `;

    let addQuery3 = ";";

    if (!isAuthor2NULL) {
        addQuery3 = `
        Insert INTO AuthorsBooks(bookID, AuthorID)
        VALUES (
                    (
                        SELECT bookID 
                        FROM Books 
                        WHERE title = ?
                    ), 
                    ?
                );
        `;
    }

    db.pool.query(addQuery1, [[title], [yearOfPublication], [price]], function (error, rows, fields) {
        if (error) {
            console.log(`Failed to add to Books table: ${data}.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Added to Books table: ${data}.`);
        }
    })

    db.pool.query(addQuery2, [[title], [author1ID]], function (error, rows, fields) {
        if (error) {
            console.log(`Failed to add to AuthorsBooks table: AuthorID1 = ${author1ID}, book = "${title}".`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Added AuthorsBooks table: AuthorID1 = ${author1ID}, book = "${title}".`);
        }
    })

    if (!isAuthor2NULL) {
        db.pool.query(addQuery3, [[title], [author2ID]], function (error, rows, fields) {
            if (error) {
                console.log(`Failed to add to AuthorsBooks table: AuthorID2 = ${author2ID}, book = "${title}".`);
                console.log(error);
                res.sendStatus(400);
            }
            else {
                console.log(`Added AuthorsBooks table: AuthorID2 = ${author2ID}, book = "${title}".`);
            }
        })
    }

    res.sendStatus(200);
});


app.delete('/delete-book-ajax/', function (req, res, next) {
    const data = req.body;
    const bookID = parseInt(data.id);
    const delete_book = `DELETE FROM Books WHERE bookID = ?`;

    db.pool.query(delete_book, [bookID], function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(`Could not delete from Books table: bookID = ${bookID}.`);
            console.log(error);
            res.sendStatus(400);
        }

        else {
            console.log(`Deleted from Books table: bookID = ${bookID}.`);
            res.sendStatus(204);
        }
    })
});


app.get('/populate-update-book', (req, res) => {
    const data = req.query;
    const bookID = parseInt(data.id);
    const selectQuery1 = `
        SELECT  bookID,
                title,
                yearOfPublication,
                price
        FROM Books
        WHERE bookID = ?;
        `;
    const selectQuery2 = `
        SELECT  authorID
        FROM AuthorsBooks
        WHERE bookID = ?;
        `;


    db.pool.query(selectQuery1, [bookID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            if (rows.length > 0) {
                const bookInfo = rows[0];
                console.log("Book retrieved of ID =", bookInfo.bookID);

                db.pool.query(selectQuery2, [bookID], (error, rows, fields) => {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    }
                    else {
                        const authors = rows;
                        let authorIDs = authors.map(author => author.authorID);;

                        if (authorIDs[0] != null) {
                            authorIDs = authors.map(author => author.authorID.toString());
                        }
                        else {
                            authorIDs = ["NULL"];
                        }

                        authorIDs.push("NULL");
                        console.log("Authors retrieved of ID =", authorIDs);
                        res.json({ bookInfo, authorIDs });
                    }
                });
            }
            else {
                console.log("No book found with ID:", bookID);
                res.sendStatus(404);
            }
        }
    });
});


app.post('/update-book', (req, res) => {
    const data = req.body;
    const bookID = data.bookID;
    const newTitle = data.title;
    const newAuthor1ID = data.author1;
    const newAuthor2ID = data.author2;
    const newYOP = data.yearOfPublication;
    const newPrice = data.price;
    let isAuthor2NULL = false;

    const updateQuery1 = `
        UPDATE Books
        SET yearOfPublication = ?,
            price = ?,
            title = ?
        WHERE bookID = ?;
        `;
    const updateQuery2 = `
        UPDATE AuthorsBooks
        SET AuthorID = ?
        WHERE bookID =  ?;
        `;

    let updateQuery3 = "";

    if (newAuthor2ID === 'NULL') {
        isAuthor2NULL = true;
        updateQuery3 = `
            DELETE FROM AuthorsBooks
            WHERE bookID = ${bookID} 
            AND AuthorID != ${newAuthor1ID};
        `;
    }
    else {
        updateQuery3 = `
            UPDATE AuthorsBooks
            SET AuthorID = ${newAuthor2ID}
            WHERE bookID = ${bookID};
        `;
    }


    db.pool.query(updateQuery1, [[newYOP], [newPrice], [newTitle], [bookID]], function (error, rows, fields) {
        if (error) {
            console.log(`Failed to update Books table: bookID = ${bookID}.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Updated Books table: bookID = ${bookID}.`);
        }
    })

    db.pool.query(updateQuery2, [[newAuthor1ID], [bookID]], function (error, rows, fields) {
        if (error) {
            console.log(`Failed to update AuthorsBooks table: AuthorID1 = ${newAuthor1ID}, bookID = ${bookID}.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Updated AuthorsBooks table: AuthorID1 = ${newAuthor1ID}, bookID = ${bookID}.`);
        }
    })

    if (!isAuthor2NULL) {
        db.pool.query(updateQuery2, [[newAuthor2ID], [bookID]], function (error, rows, fields) {
            if (error) {
                console.log(`Failed to update AuthorsBooks table: AuthorID2 = ${newAuthor2ID}, bookID = ${bookID}.`);
                console.log(error);
                res.sendStatus(400);
            }
            else {
                console.log(`Updated AuthorsBooks table: AuthorID2 = ${newAuthor2ID}, bookID = ${bookID}.`);
            }
        })
    }

    db.pool.query(updateQuery3, function (error, rows, fields) {
        if (error) {
            console.log(`Failed to delete/update AuthorsBooks table: AuthorID2 = ${newAuthor2ID}, bookID = ${bookID}.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Deleted/updateed AuthorsBooks table: AuthorID2 = ${newAuthor2ID}, bookID = ${bookID}.`);
        }
    })
    res.sendStatus(200);
});

// Used to retrieve books too
app.get('/reload-books', (req, res) => {
    const query1 = "SELECT * FROM Books;";

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(`Failed to reload Books Table.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Reloaded Books table successfully.`);
            res.send(rows);
        }
    })
});


// ---------------------------------------------
// Authors
// ---------------------------------------------
// Display authors table
app.get('/authors', function (req, res) {
    const query1 = "SELECT * FROM Authors;";

    db.pool.query(query1, function (error, rows, fields) {
        res.render('authors', { data: rows });
    })
});

app.get('/get-author2', function (req, res) {
    const data = req.query;
    const query = `
                SELECT * 
                FROM Authors
                WHERE authorID != ?;
                `;
    const author1ID = parseInt(data.author1ID);

    db.pool.query(query, [author1ID], function (error, rows, fields) {
        if (error) {
            console.log(`Failed to retrieve author2 list from Authors Table.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Retrieved author2 list from Authors table successfully.`);
            res.send(rows);
        }
    })
});


app.get('/reload-authors', function (req, res) {
    const query1 = "SELECT * FROM Authors;";

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(`Failed to reload Authors Table.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Reloaded Authors table successfully.`);
            res.send(rows);
        }
    })
});


app.post('/add-author', (req, res) => {
    const data = req.body;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const addAuthorQuery = `
        INSERT INTO Authors(firstName, lastName)
        VALUES (?, ?);
    `;

    db.pool.query(addAuthorQuery, [[firstName], [lastName]], (error, rows, fields) => {
        if (error) {
            console.log(`Failed to insert into Authors table: firstName = ${firstName}, lastName = ${lastName}.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Inserted into Authors table: firstName = ${firstName}, lastName = ${lastName}.`);
            res.sendStatus(200);
        }
    })
});


app.delete('/authors/:authorID', (req, res) => {
    const authorID = req.params.authorID;
    const deleteAuthorQuery = `
        DELETE FROM Authors
        WHERE authorID = ?;
    `;

    db.pool.query(deleteAuthorQuery, [authorID], (error, rows, fields) => {
        if (error) {
            console.log(`Failed to delete from Authors table: authorID = ${authorID}.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Deleted from Authors table: authorID = ${authorID}.`);
            res.sendStatus(200);
        }
    })
});


// ---------------------------------------------
// Customers
// ---------------------------------------------
// Display customers table
app.get('/customers', function (req, res) {

    const query1 = "SELECT * FROM Customers;";

    db.pool.query(query1, function (error, rows, fields) {
        res.render('customers', { data: rows });
    })
});


app.get('/reload-customers', function (req, res) {
    const query1 = "SELECT * FROM Customers;";

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(`Failed to reload Customers Table.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Reloaded Customers table successfully.`);
            res.send(rows);
        }
    })
});


app.post('/add-customer', (req, res) => {
    const data = req.body;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const phone = data.phone;
    const addCustomerQuery = `
        INSERT INTO Customers(firstName, lastName, email, phone)
        VALUES (?, ?, ?, ?);
    `;

    db.pool.query(addCustomerQuery, [[firstName], [lastName], [email], [phone]], (error, rows, fields) => {
        if (error) {
            console.log(`Failed to insert into Customers table: ${data}.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Inserted into Customers table: ${data}.`);
            res.sendStatus(200);
        }
    })
});


app.delete('/customers/:customerID', (req, res) => {
    const customerID = req.params.customerID;
    const deleteCustomerQuery = `
        DELETE FROM Customers
        WHERE customerID = ?;
    `;

    db.pool.query(deleteCustomerQuery, [customerID], (error, rows, fields) => {
        if (error) {
            console.log(`Failed to delete from Customers table: customerID = ${customerID}.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Deleted from Customers table: customerID = ${customerID}.`);
            res.sendStatus(200);
        }
    })
});



// ---------------------------------------------
// Stores
// ---------------------------------------------
app.get('/stores', function (req, res) {

    const query1 = "SELECT * FROM Stores;";

    db.pool.query(query1, function (error, rows, fields) {
        res.render('stores', { data: rows });
    })
});


app.get('/reload-stores', function (req, res) {
    const query1 = "SELECT * FROM Stores;";

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(`Failed to reload Stores Table.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Reloaded Stores table successfully.`);
            res.send(rows);
        }
    })
});


app.post('/add-store', (req, res) => {
    const data = req.body;
    const name = data.name;
    const phone = data.phone;
    const address = data.address;
    const addStoreQuery = `
        INSERT INTO Stores(name, phone, address)
        VALUES (?, ?, ?);
    `;

    db.pool.query(addStoreQuery, [[name], [phone], [address]], (error, rows, fields) => {
        if (error) {
            console.log(`Failed to insert into Stores table: ${data}.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Inserted into Stores table: ${data}.`);
            res.sendStatus(200);
        }
    })
});


app.delete('/stores/:storeID', (req, res) => {
    const storeID = req.params.storeID;
    const deleteStoreQuery = `
        DELETE FROM Stores
        WHERE storeID = ?;
    `;

    db.pool.query(deleteStoreQuery, [storeID], (error, rows, fields) => {
        if (error) {
            console.log(`Failed to delete from Stores table: storeID = ${storeID}.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Deleted from Stores table: storeID = ${storeID}.`);
            res.sendStatus(200);
        }
    })
});

// ---------------------------------------------
// Invoices
// ---------------------------------------------
app.get('/invoices', function (req, res) {

    const query1 = `
        SELECT  invoiceID,
                date,
                Books.title,
                Stores.name,
                CONCAT(Customers.firstName,' ',Customers.lastName) AS "customerName"
        FROM Invoices
        JOIN Books
            ON Invoices.bookID = Books.bookID
        JOIN Stores
            ON Invoices.storeID = Stores.storeID
        JOIN Customers
            ON Invoices.customerID = Customers.customerID;
    `;

    db.pool.query(query1, function (error, rows, fields) {
        rows.forEach(row => {
            currDate = row.date;
            row.date = `${(currDate.getMonth() + 1).toString().padStart(2, '0')}-${currDate.getDate().toString().padStart(2, '0')}-${currDate.getFullYear()}`;
        });
        
        res.render('invoices', { data: rows });
    })
});


app.get('/reload-invoices', function (req, res) {
    const query1 = `
    SELECT  invoiceID,
            date,
            Books.title,
            Stores.name,
            CONCAT(Customers.firstName,' ',Customers.lastName) AS "customerName"
    FROM Invoices
    JOIN Books
        ON Invoices.bookID = Books.bookID
    JOIN Stores
        ON Invoices.storeID = Stores.storeID
    JOIN Customers
        ON Invoices.customerID = Customers.customerID;
`;

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(`Failed to reload Invoices Table.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Reloaded Invoices table successfully.`);
            const convertedRows = rows.map(row => ({
                ...row,
                invoiceID: row.invoiceID.toString('utf-8'),  // Adjust 'utf-8' based on the actual encoding
                date: row.date.toString('utf-8')             // Adjust 'utf-8' based on the actual encoding
            }));
            res.send(convertedRows);
        }
    })
});


app.post('/add-invoice', (req, res) => {
    const data = req.body;
    const date = data.date;
    const bookID = data.bookID;
    const storeID = data.storeID;
    const customerID = data.customerID;

    const addInvoiceQuery = `
        INSERT INTO Invoices(date, bookID, storeID, customerID)
        VALUES (
                ?, 
                ?,
                ?,
                ?
            );
    `;

    db.pool.query(addInvoiceQuery, [[date], [bookID], [storeID], [customerID]], (error, rows, fields) => {
        if (error) {
            console.log(`Failed to insert into Invoices table: ${data}.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Inserted into Invoices table: ${data}.`);
            res.sendStatus(200);
        }
    })
});


app.delete('/invoices/:invoiceID', (req, res) => {
    const invoiceID = req.params.invoiceID;
    const deleteInvoiceQuery = `
        DELETE FROM Invoices
        WHERE invoiceID = ?;
    `;

    db.pool.query(deleteInvoiceQuery, [invoiceID], (error, rows, fields) => {
        if (error) {
            console.log(`Failed to delete from Invoices table: invoiceID = ${invoiceID}.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Deleted from Invoices table: invoiceID = ${invoiceID}.`);
            res.sendStatus(200);
        }
    })
});


// ---------------------------------------------
// AuthorsBooks
// ---------------------------------------------
// Display authorsbooks table (currently it only displays the authorBooksID, book title, but the author name is not populating for some reason)
app.get('/authorsbooks', function (req, res) {
    const query1 = "SELECT  AuthorsBooks.authorBookID, Books.title, CONCAT(Authors.firstName,' ',Authors.lastName) AS authorsname FROM Authors JOIN AuthorsBooks ON Authors.authorID = AuthorsBooks.authorID JOIN Books ON AuthorsBooks.bookID = Books.bookID;";

    db.pool.query(query1, function (error, rows, fields) {
        res.render('authorsbooks', { data: rows })
    })
});


app.listen(PORT, function () {
    console.log('Express started on http://flip4.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});