-- Group #21 - Mo Hudeihed & Saurav Shrestha
-- ---------------------------------------------
-- Books
-- ---------------------------------------------
-- Populate the Books table on the Books page
SELECT * 
FROM Books
ORDER BY bookID ASC;

-- Add (Create) a book. This will also add the FKs to AuthorBooks table in the M:M relationship.
INSERT INTO Books(title, yearOfPublication, price)
VALUES (:title, :yearOfPublication, :price);

INSERT INTO AuthorsBooks(bookID, AuthorID)
VALUES (
            (
                SELECT bookID 
                FROM Books 
                WHERE title = :title
            ), 
            :author1ID
        );

-- Check if the book with the same title already exists in the table
SELECT * FROM Books
WHERE title = :title;

-- Add the bookID and Author2ID to AuthorsBooks table.
Insert INTO AuthorsBooks(bookID, AuthorID)
VALUES (
            (
                SELECT bookID 
                FROM Books 
                WHERE title = :title
            ), 
            :author2ID
        );

-- Query to retrieve a book information so it can be used to populate the form with data for that particular book.
SELECT  bookID,
        title,
        yearOfPublication,
        price
FROM Books
WHERE bookID = :bookID;

-- Select author IDs associated with the book ID.
SELECT  authorID
FROM AuthorsBooks
WHERE bookID = :bookID;


-- Query to check if a book with the new title already exists in the Books table.
SELECT * FROM Books
WHERE title = :newTitle and bookID != :bookID;

-- Update a book. This will also update AuthorsBooks table in the M:M relationship.
UPDATE Books
SET yearOfPublication = :yearOfPublication,
    price = :price
    title = :title
WHERE bookdID = :bookID;

-- Delete Author IDs associated with the book ID.
DELETE FROM AuthorsBooks
WHERE bookID = :bookID; 

-- Add book ID and AuthorID to AuthorsBooks table.
INSERT INTO AuthorsBooks(bookID, AuthorID)
    VALUES (
                (
                    SELECT bookID 
                    FROM Books 
                    WHERE title = :newTitle
                ), 
                :newAuthor1ID
            );

-- Reload the Books table after a book is deleted or added to the table.
SELECT * 
FROM Books
ORDER BY bookID ASC;

-- Delete book from the Books table.
DELETE FROM Books 
WHERE bookID = bookID;


-- ---------------------------------------------
-- Authors
-- ---------------------------------------------
-- Populate the Authors table on the Authors page
-- Can also be used to reload Authors table after an author is added or deleted from the table.

SELECT * 
FROM Authors 
ORDER BY authorID ASC;

-- Add (Create) an author
INSERT INTO Authors(firstName, lastName)
VALUES (:firstName, :lastName);

-- Delete an author
DELETE FROM Authors
WHERE authorID = (:authorID);

-- Populate Author2 dropdown menu
SELECT * 
FROM Authors
WHERE authorID != :authorID;

-- Check if an author with the same first name AND last name already exists in the Authors table.
SELECT * FROM Authors
WHERE firstName = :firstName AND lastName = :lastName;

-- ---------------------------------------------
-- Customers
-- ---------------------------------------------
-- Populate the Customers table on the Customers page
-- Also used to reload Customers table after a customer is added or deleted from the table.
SELECT * 
FROM Customers 
ORDER BY customerID ASC;

-- Add (Create) a customer
INSERT INTO Customers(firstName, lastName, email, phone)
VALUES (:firstName, :lastName, :email, :phone);

-- Delete a customer
DELETE FROM Customers
WHERE customerID = (:customerID);

-- Check if a customer with same email OR phone already exists in the table.
SELECT * FROM Customers
WHERE email = :email OR phone = :phone

-- ---------------------------------------------
-- Stores
-- ---------------------------------------------
-- Populate the Stores table on the Stores page
-- Also used to reload Stores table after a store is added or deleted from the table.
SELECT * 
FROM Stores
ORDER BY storeID ASC;

-- Add (Create) a store
INSERT INTO Stores(name, phone, address)
VALUES (:name, :phone, :address);

-- Check if a store with the same name OR phone number OR address already exists in the table.
SELECT * FROM Stores
WHERE name = :name OR phone = :phone OR address = :address;

-- Delete a store from the Stores table.
DELETE FROM Stores
WHERE storeID = :storeID;

-- ---------------------------------------------
-- Invoices
-- ---------------------------------------------
-- Populate the Invoices table on the Invoices page
-- also use to reload Invoices table after an inovice is added or deleted from the table.
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

-- Add (Create) an invoice
INSERT INTO Invoices(date, bookID, storeID, customerID)
        VALUES (
                date, 
                bookID,
                storeID,
                customerID
            );

-- Delete invoice from the Invoice table.
DELETE FROM Invoices
WHERE invoiceID = invoiceID;

-- ---------------------------------------------
-- AuthorsBooks
-- ---------------------------------------------
-- Populate the AuthorsBooks table on the AuthorsBooks page
SELECT  AuthorsBooks.authorBookID, 
        Books.title, 
        CONCAT(Authors.firstName,' ',Authors.lastName) AS authorsname
FROM AuthorsBooks 
LEFT JOIN Authors  
ON AuthorsBooks.authorID = Authors.authorID
JOIN Books 
ON AuthorsBooks.bookID = Books.bookID
ORDER BY AuthorsBooks.authorBookID ASC;