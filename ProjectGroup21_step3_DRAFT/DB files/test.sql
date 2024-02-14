-- ---------------------------------------------
-- Books
-- ---------------------------------------------
-- Populate the Books table on the Books page
SELECT  bookID,
        title,
        yearOfPublication,
        price
FROM Books;

-- Add (Create) a book
INSERT INTO Books(title, yearOfPublication, price)
VALUE ("test_title", 0000, 10.01);
SELECT * FROM Books;


-- Update a book
UPDATE Books
SET title = "test_title_update",
    yearOfPublication = 2002,
    price = 20.02
WHERE bookID = (
SELECT bookID
FROM Books
WHERE title = "test_title"
);
SELECT * FROM Books;


-- Populate the Books dropdown menu
SELECT  bookID,
        title
FROM Books;


-- ---------------------------------------------
-- Authors
-- ---------------------------------------------
-- Populate the Authors table on the Authors page
-- Can also be used to populate the Author dropdown menu
SELECT  authorID,
        firstName,
        lastName
FROM Authors;

-- Add (Create) an author
INSERT INTO Authors(firstName, lastName)
VALUE ("test_firstName", "test_lastName");
SELECT * FROM Authors;

-- Delete an author
DELETE FROM Authors
WHERE authorID = (
    SELECT authorID
    FROM Authors
    WHERE   firstName = "test_firstName"
        AND lastName = "test_lastName"
);
SELECT * FROM Authors;

-- -- Populate the Author dropdown menu
-- SELECT  authorID,
--         firstName,
--         lastName
-- FROM Authors;


-- ---------------------------------------------
-- Customers
-- ---------------------------------------------
-- Populate the Customers table on the Customers page
SELECT  customerID,
        firstName,
        lastName,
        email,
        phone
FROM Customers;

-- Add (Create) a customer
INSERT INTO Customers(firstName, lastName, email, phone)
VALUE ("test_firstName", "test_lastName", "test_email", "test_phone");
SELECT * FROM Customers;

-- Delete a customer
DELETE FROM Customers
WHERE customerID = (
    SELECT customerID
    FROM Customers
    WHERE   firstName = "test_firstName"
        AND lastName = "test_lastName"
);
SELECT * FROM Customers;


-- ---------------------------------------------
-- Stores
-- ---------------------------------------------
-- Populate the Stores table on the Stores page
SELECT  storeID,
        name,
        phone,
        address
FROM Stores;

-- Add (Create) a store
INSERT INTO Stores(name, phone, address)
VALUE ("test_name", "test_phone", "test_address");
SELECT * FROM Stores;

-- ---------------------------------------------
-- Invoices
-- ---------------------------------------------
-- Populate the Invoices table on the Invoices page
SELECT  Invoices.invoiceID,
        Invoices.date,
        Books.title,
        Stores.name,
        CONCAT(Customers.firstName,' ',Customers.lastName) AS "customer name"
FROM Customers
JOIN Invoices
ON Customers.customerID = Invoices.customerID
JOIN Books
ON Books.bookID = Invoices.bookID
JOIN Stores
ON Stores.storeID = Invoices.storeID;
SELECT * FROM Invoices;

-- Add (Create) an invoice
INSERT INTO Invoices(date, bookID, storeID, customerID)
VALUE (
        "2024-02-13", 
        (
            SELECT bookID
            FROM Books
            WHERE title = "Linear Algebra"
        ),
        (
            SELECT storeID
            FROM Stores
            WHERE name = "Literary Books"
        ),
        (
            SELECT customerID
            FROM Customers
            WHERE   firstName = "Sergio"
                AND lastName = "Hernandez"
        )
    );
SELECT * FROM Invoices;


-- ---------------------------------------------
-- AuthorsBooks
-- ---------------------------------------------
-- Populate the AuthorsBooks table on the AuthorsBooks page
SELECT  AuthorsBooks.authorBookID,
        Books.title,
        CONCAT(Authors.firstName,' ',Authors.lastName) AS "authors name"
FROM Authors
JOIN AuthorsBooks
ON Authors.authorID = AuthorsBooks.authorID
JOIN Books
ON AuthorsBooks.bookID = Books.bookID;
SELECT * FROM AuthorsBooks;