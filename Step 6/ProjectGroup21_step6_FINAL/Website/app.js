// Citation for the following Setup and Route codes:
// Date: 03/10/2024
// Based on CS340 nodejs-starter-app on GitHub
// Setup codes were taken from the starter app on GitHub. Similarly, the routes for dynamically displaying data, adding/updating/deleting data were
// also based on various sections of the starter app file in Github. Codes to control the flow of execution of queries based on certain conditions
// were our own work. Similarly, the SQL queries were our own work.
// Source URL:  https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
//              https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data
//              https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
               

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

// Route to display books table
app.get('/books', function (req, res) {
    const query1 = `
            SELECT * 
            FROM Books
            ORDER BY bookID ASC;
            `;
    const query2 = "SELECT * FROM Authors;";

    db.pool.query(query1, function (error, rows, fields) {
        const books = rows;

        // Iterate through each row in the array and format the price as currency in US dollars with two decimal places.
        rows.forEach(function(book) {
            // Citation for formatting currency: https://stackoverflow.com/a/16233919
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


// Route to add a book to the books table and add bookID + authorID to authorsbooks table
app.post('/add-book', (req, res) => {
    const data = req.body;
    const title = data.title;
    const author1ID = data.author1ID;
    const author2ID = data.author2ID;
    const yearOfPublication = data.YOP;
    const price = data.price;
    
    let isAuthor1NULL = (author1ID === 'NULL');
    let isAuthor2NULL = (author2ID === 'NULL');

    console.log("data:", data, "isAuthor1NULL:", isAuthor1NULL, "isAuthor2NULL:", isAuthor2NULL)

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

    const checkQuery = `
        SELECT * FROM Books
        WHERE title = ?;
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

    // Run a query to check if the book with the same title already exists in the table.
    db.pool.query(checkQuery, [[title]], function(error, rows, fields){
        console.log(rows);
        if (!rows || rows.length === 0){
            console.log(`No duplicate titles exist. Book may be added.`);
            
            // ---------- Book is not a duplicate ----------
            // Add the book to the Books table.
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

            // Add the bookID and Author1ID to AuthorsBooks table.
            if(!isAuthor1NULL){
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
            }

            // Add the bookID and Author2ID to AuthorsBooks table.
            if (!isAuthor1NULL && !isAuthor2NULL) {
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
            
        } 
        else {
            console.log('Book already exists in the database.');
            return res.status(409).send('Book already exists in the database.');
        }
    });
});

// Delete book from the Books table.
app.delete('/delete-book-ajax/', function (req, res, next) {
    const data = req.body;
    const bookID = parseInt(data.id);
    const delete_book = `
        DELETE FROM Books 
        WHERE bookID = ?;
    `;

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


// Route to populate book information based on book ID.
app.get('/populate-update-book', (req, res) => {
    const data = req.query;
    const bookID = parseInt(data.id);
    
    // Query to select book information based on book ID.
    const selectQuery1 = `
        SELECT  bookID,
                title,
                yearOfPublication,
                price
        FROM Books
        WHERE bookID = ?;
        `;
    
    // Query to select author IDs associated with the book ID.
    const selectQuery2 = `
        SELECT  authorID
        FROM AuthorsBooks
        WHERE bookID = ?;
        `;


        // Execute the first query (selectQuery1) to get book information.
        db.pool.query(selectQuery1, [bookID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            if (rows.length > 0) {
                const bookInfo = rows[0];
                console.log("Book retrieved of ID =", bookInfo.bookID);

                // Execute the second query to get author IDs associated with the book ID.
                db.pool.query(selectQuery2, [bookID], (error, rows, fields) => {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    }
                    else {
                        const authors = rows;
                        let authorIDs = authors.map(author => author.authorID);

                        // Convert author IDs to string if not NULL.
                        if (authorIDs[0] != null) {
                            authorIDs = authors.map(author => author.authorID.toString());
                        }
                        else {
                            authorIDs = ["NULL"];
                        }

                        authorIDs.push("NULL");
                        console.log("Authors retrieved of ID =", authorIDs);
                        
                        // Send JSON response containing book information and author IDs.
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

// Route to update book information.
app.post('/update-book', (req, res) => {
    const data = req.body;
    const bookID = data.bookID;
    const newTitle = data.title;
    const newAuthor1ID = data.author1;
    const newAuthor2ID = data.author2;
    const newYOP = data.yearOfPublication;
    const newPrice = data.price;

    let isAuthor1NULL = (newAuthor1ID === 'NULL');
    let isAuthor2NULL = (newAuthor2ID === 'NULL');

    // Query to check if a book with the new title already exists in the Books table.
    const updateCheckQuery = `
        SELECT * FROM Books
        WHERE title = ? and bookID != ?;
    `;

    // Query to update book information in the Books table.
    const updateQuery1 = `
        UPDATE Books
        SET yearOfPublication = ?,
            price = ?,
            title = ?
        WHERE bookID = ?;
        `;
    
    // Query to delete Author IDs associated with the book ID.
    const updateQuery2 = `
        DELETE FROM AuthorsBooks
        WHERE bookID = ?; 
    `;

    // Query to add book ID and AuthorID to AuthorsBooks table.
    let updateQuery3 = `
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

    // Modify updateQuery3 if author1 is NULL.
    if(isAuthor1NULL){
        updateQuery3 = `
                    INSERT INTO AuthorsBooks(bookID, AuthorID)
                    VALUES (
                            (
                                SELECT bookID 
                                FROM Books 
                                WHERE title = ?
                            ), 
                            NULL
                        );
                    `;
    }
    

    // Run a query to check if the updated book title already exists in the Books table.
    db.pool.query(updateCheckQuery, [[newTitle], [bookID]], function(error, rows, fields){
        if (!rows || rows.length === 0){
            console.log(`Book does not exist in the table already`);

            // Execute query to update the book information.
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

            // Delete existing row with BookID and AuthorID from the AuthorsBooks table.
            db.pool.query(updateQuery2, [bookID], function (error, rows, fields) {
                if (error) {
                    console.log(`Failed to delete authors from AuthorsBooks table:bookID = ${bookID}.`);
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    console.log(`Successfully deleted authors from AuthorsBooks table, bookID = ${bookID}.`);
                }
            })
            
            // If newauthor1 is not NULL, insert author1ID and the bookID to AuthorsBooks table.
            if (!isAuthor1NULL) {
                db.pool.query(updateQuery3, [[newTitle], [newAuthor1ID]], function (error, rows, fields) {
                    if (error) {
                        console.log(`Failed to add to AuthorsBooks table: AuthorID1 = "${newAuthor1ID}", book = "${newTitle}".`);
                        console.log(error);
                        res.sendStatus(400);
                    }
                    else {
                        console.log(`Added AuthorsBooks table: AuthorID1 = "${newAuthor1ID}", book = "${newTitle}".`);
                    }
                })    
            }
            else{
                db.pool.query(updateQuery3, [[newTitle]], function (error, rows, fields) {
                    if (error) {
                        console.log(`Failed to add to AuthorsBooks table: AuthorID1 = "NULL", book = "${newTitle}".`);
                        console.log(error);
                        res.sendStatus(400);
                    }
                    else {
                        console.log(`Added AuthorsBooks table: AuthorID1 = "NULL", book = "${newTitle}".`);
                    }
                }) 
            }

            // Insert author2ID and the bookID to AuthorsBooks table if author2ID is not NULL.
            if (!isAuthor1NULL && !isAuthor2NULL) {
                db.pool.query(updateQuery3, [[newTitle], [newAuthor2ID]], function (error, rows, fields) {
                    if (error) {
                        console.log(`Failed to add to AuthorsBooks table: AuthorID2 = "${newAuthor2ID}", book = "${newTitle}".`);
                        console.log(error);
                        res.sendStatus(400);
                    }
                    else {
                        console.log(`Added AuthorsBooks table: AuthorID2 = "${newAuthor2ID}", book = "${newTitle}".`);
                    }
                })
            }
            res.sendStatus(200);
        } else {
            return res.status(409).send('Book already exists in the database.');
        }
    });
});


// Route to reload the Books table after a book is deleted or added to the table.
app.get('/reload-books', (req, res) => {
    const query1 = `
            SELECT * 
            FROM Books
            ORDER BY bookID ASC;
            `;

        // Execute query to select all the columns from the Books table.
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

// Route to display Authors table.
app.get('/authors', function (req, res) {
    const query1 = `
            SELECT * 
            FROM Authors 
            ORDER BY authorID ASC;
    `;

    // Execute query to select all the columns from Authors table.
    db.pool.query(query1, function (error, rows, fields) {
        res.render('authors', { data: rows });
    })
});


// Fetch author2 menu
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

// Route to reload Authors table after an author is added or deleted from the table.
app.get('/reload-authors', function (req, res) {
    const query1 = `
            SELECT * 
            FROM Authors 
            ORDER BY authorID ASC;
    `;

    // Execute query to select all the columns from Authors table.
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

// Route to add an author to Authors table.
app.post('/add-author', (req, res) => {
    const data = req.body;
    const firstName = data.firstName;
    const lastName = data.lastName;
    
    const addAuthorQuery = `
        INSERT INTO Authors(firstName, lastName)
        VALUES (?, ?);
    `;

    const checkAuthorQuery = `
        SELECT * FROM Authors
        WHERE firstName = ? AND lastName = ?;
    `;
    
    // Execute query to check if an author with the same first name AND last name already exists in the Authors table.
    db.pool.query(checkAuthorQuery, [[firstName], [lastName]], (error, rows, fields)=>{
        if (!rows || rows.length === 0){
            db.pool.query(addAuthorQuery, [[firstName], [lastName]], (error, rows, fields)=>{
                if (error) {
                    console.log(`Failed to insert into Authors table: firstName = ${firstName}, lastName = ${lastName}.`);
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    console.log(`Inserted into Authors table: firstName = ${firstName}, lastName = ${lastName}.`);
                    res.sendStatus(200);
                }
            });
        } else {
            return res.status(409).send('Author already exists in the database.');
            }
    });
});


// Route to delete an author from Authors table.
app.delete('/authors/:authorID', (req, res) => {
    const authorID = req.params.authorID;
    const deleteAuthorQuery = `
        DELETE FROM Authors
        WHERE authorID = ?;
    `;

    // Execute query to delete an author from Authors table.
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

// Route to display Customers table.
app.get('/customers', function (req, res) {
    const query1 = `
            SELECT * 
            FROM Customers 
            ORDER BY customerID ASC;
    `;

    // Execute query to select all the columns from the Customers table.
    db.pool.query(query1, function (error, rows, fields) {
        res.render('customers', { data: rows });
    })
});

// Route to reload Customers table after a customer is added or deleted from the table.
app.get('/reload-customers', function (req, res) {
    const query1 = `
            SELECT * 
            FROM Customers 
            ORDER BY customerID ASC;
    `;

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

// Route to add a customer to the Customer table.
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

    const checkCustomerQuery = `
        SELECT * FROM Customers
        WHERE email = ? OR phone = ?
    `;

    // Execute query to check if a customer with same email OR phone already exists in the table.
    db.pool.query(checkCustomerQuery, [[email], [phone]], (error, rows, fields)=>{
        if (!rows || rows.length === 0){
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
            });
        } else {
            return res.status(409).send('Customer already exists in the database.');
        }
    });
});

// Route to delete a customer from the Customers table.
app.delete('/customers/:customerID', (req, res) => {
    const customerID = req.params.customerID;
    const deleteCustomerQuery = `
        DELETE FROM Customers
        WHERE customerID = ?;
    `;

    // Execute query to delete customer from Customers table.
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

// Route to display Stores table.
app.get('/stores', function (req, res) {
    const query1 = `
                SELECT * 
                FROM Stores
                ORDER BY storeID ASC;
    `;

    // Execute query to select all the columns from Stores table.
    db.pool.query(query1, function (error, rows, fields) {
        res.render('stores', { data: rows });
    })
});

// Route to reload Stores table after a store is added or deleted from the table.
app.get('/reload-stores', function (req, res) {
    const query1 = `
                SELECT * 
                FROM Stores
                ORDER BY storeID ASC;
    `;

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

// Route to add a store to the Stores table.
app.post('/add-store', (req, res) => {
    const data = req.body;
    const name = data.name;
    const phone = data.phone;
    const address = data.address;

    const addStoreQuery = `
        INSERT INTO Stores(name, phone, address)
        VALUES (?, ?, ?);
    `;

    const checkStoreQuery = `
        SELECT * FROM Stores
        WHERE name = ? OR phone = ? OR address = ?;
        `;
    
    // Execute query to check if a store with the same name OR phone number OR address already exists in the table.
    db.pool.query(checkStoreQuery, [[name], [phone], [address]], (error, rows, fields)=> {
        if (!rows || rows.length === 0){
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
            });
        } else {
            return res.status(409).send('Store already exists in the database.');
        }
    });
});

// Route to delete a store from the Stores table.
app.delete('/stores/:storeID', (req, res) => {
    const storeID = req.params.storeID;
    const deleteStoreQuery = `
        DELETE FROM Stores
        WHERE storeID = ?;
    `;

    // Execute query to delete a store from Stores table.
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

// Route to display Invoices table.
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
            ON Invoices.customerID = Customers.customerID
        ORDER BY invoiceID ASC;
    `;

    // Execute query to display data for Invoice table.
    db.pool.query(query1, function (error, rows, fields) {
        // format date for display
        rows.forEach(row => {
            currDate = row.date;
            row.date = `${(currDate.getMonth() + 1).toString().padStart(2, '0')}-${currDate.getDate().toString().padStart(2, '0')}-${currDate.getFullYear()}`;
        });
        
        res.render('invoices', { data: rows });
    })
});

// Route to reload Invoices table after an inovice is added or deleted from the table.
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
        ON Invoices.customerID = Customers.customerID
    ORDER BY invoiceID ASC;
`;

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(`Failed to reload Invoices Table.`);
            console.log(error);
            res.sendStatus(400);
        }
        else {
            console.log(`Reloaded Invoices table successfully.`);
            
            rows.forEach(row => {
                currDate = row.date;
                row.date = `${(currDate.getMonth() + 1).toString().padStart(2, '0')}-${currDate.getDate().toString().padStart(2, '0')}-${currDate.getFullYear()}`;
            });
            
            res.send(rows);
        }
    })
    });


// Add invoice to the Invoice table.
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

    // Execute query to add invoice data to the Invoice table.
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


// Route to delete invoice from the Invoice table.
app.delete('/invoices/:invoiceID', (req, res) => {
    const invoiceID = req.params.invoiceID;
    const deleteInvoiceQuery = `
        DELETE FROM Invoices
        WHERE invoiceID = ?;
    `;

    // Execute query to delete an invoice.
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
// Route to display AuthorsBooks table
app.get('/authorsbooks', function (req, res) {
    const query1 = `
            SELECT  AuthorsBooks.authorBookID, 
                    Books.title, 
                    CONCAT(Authors.firstName,' ',Authors.lastName) AS authorsname
            FROM AuthorsBooks 
            LEFT JOIN Authors  
            ON AuthorsBooks.authorID = Authors.authorID
            JOIN Books 
            ON AuthorsBooks.bookID = Books.bookID
            ORDER BY AuthorsBooks.authorBookID ASC;
        `;

    // Execute query to display Author names and book names.                
    db.pool.query(query1, function (error, rows, fields) {
        rows.forEach(function(row) {
            if(row.authorsname == null){
                row.authorsname = "NULL"
            }
        });
        res.render('authorsbooks', { data: rows })
    })
});


app.listen(PORT, function () {
    console.log('Express started on http://flip4.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});