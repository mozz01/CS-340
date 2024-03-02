-- Group #21 - Mo Hudeihed & Saurav Shrestha
-- ---------------------------------------------
-- Books
-- ---------------------------------------------
-- Populate the Books table on the Books page
SELECT  bookID,
        title,
        yearOfPublication,
        price
FROM Books;

-- Add (Create) a book. This will also add the FKs to AuthorBooks table in the M:M relationship.
INSERT INTO Books(title, yearOfPublication, price)
VALUES (:title, :yearOfPublication, :price);

Insert INTO AuthorsBooks(bookID, AuthorID)
VALUES ((SELECT bookID FROM BOOKS WHERE title = :title), :author1)

IF :author2 IS NOT NULL THEN
    Insert INTO AuthorsBooks(bookID, AuthorID)
    VALUES ((SELECT bookID FROM BOOKS WHERE title = :title), :author2)
END IF;

-- Query to retrieve a book information so it can be used to populate the form with data for that particular book.
SELECT yearOfPublication, price, title
FROM Books
WHERE title = :title;

-- Update a book. This will also update AuthorsBooks table in the M:M relationship.
UPDATE Books
SET yearOfPublication = :yearOfPublication,
    price = :price
    title = :title
WHERE bookdID = :bookID;

UPDATE AuthorsBooks
SET AuthorID = (SELECT AuthorID FROM Authors WHERE AuthorName = :author1)
WHERE bookID = :bookID;

IF :author2 IS NOT NULL THEN
    UPDATE AuthorsBooks
    SET AuthorID = (SELECT AuthorID FROM Authors WHERE AuthorName = :author2)
    WHERE bookID = :bookID;
ELSE
-- If :author2 is null, remove the corresponding row from AuthorsBooks
    DELETE FROM AuthorsBooks
    WHERE bookID = :bookID AND AuthorID != (SELECT AuthorID FROM Authors WHERE AuthorName = :author1);
END IF;


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
VALUES (:firstName, :lastName);

-- Delete an author
DELETE FROM Authors
WHERE authorID = (:authorID);

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
VALUES (:firstName, :lastName, :email, :phone);

-- Delete a customer
DELETE FROM Customers
WHERE customerID = (:customerID);


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
VALUES (:name, :phone, :address);


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

-- Add (Create) an invoice
INSERT INTO Invoices(date, bookID, storeID, customerID)
VALUES (
        :date, 
        (
            SELECT bookID
            FROM Books
            WHERE title = :bookTitle
        ),
        (
            SELECT storeID
            FROM Stores
            WHERE name = :storeName
        ),
        (
            SELECT customerID
            FROM Customers
            WHERE   firstName = :customerFirst
                AND lastName = :customerLast
        )
    );



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