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
INSERT INTO Books(bookID, title, yearOfPublication, price)
VALUE (:bookID, :title, :yearOfPublication, :price);

-- Update a book
UPDATE Books
SET title = :title,
    yearOfPublication = :yearOfPublication,
    price = :price
WHERE bookID = (:bookID);

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
INSERT INTO Authors(authorID, firstName, lastName)
VALUE (:authorID, :firstName, :lastName);

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
INSERT INTO Customers(customerID, firstName, lastName, email, phone)
VALUE (:customerID, :firstName, :lastName, :email, :phone);

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
INSERT INTO Stores(storeID, name, phone, address)
VALUE (:storeID, :name, :phone, :address);


