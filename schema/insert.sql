-- Insert data in Stores table
INSERT INTO Stores(name, phone, address) VALUES ('Metropolitan Stories', '402-547-6787', '1 Broad Court, Irmo, SC 29063');
INSERT INTO Stores(name, phone, address) VALUES ('Literary Books', '542-888-2167', '121 Main Lane, Pataskala, OH 43062');
INSERT INTO Stores(name, phone, address) VALUES ('Bookshelf Boutique', '901-325-4321', '9906 W. Union Street, Burke, VA 22015');

-- Insert data in Customers table
INSERT INTO Customers(firstName, lastName, email, phone) VALUES ('Patricia', 'Carlson', 'pcarlson@gmail.com', '667-222-4521');
INSERT INTO Customers(firstName, lastName, email, phone) VALUES ('Selena', 'Lozada', 'slozada@gmail.com', '701-548-1944');
INSERT INTO Customers(firstName, lastName, email, phone) VALUES ('Michael', 'Karlsson', 'mkarlsson@gmail.com', '402-666-1234');
INSERT INTO Customers(firstName, lastName, email, phone) VALUES ('Sergio', 'Hernandez', 'shernandez@gmail.com', '801-951-3574');

-- Insert data in Authors table
INSERT INTO Authors(firstName, lastName) VALUES ('Edgar', 'Patterson');
INSERT INTO Authors(firstName, lastName) VALUES ('William', 'Fitzgerald');
INSERT INTO Authors(firstName, lastName) VALUES ('George', 'Wolf');
INSERT INTO Authors(firstName, lastName) VALUES ('Mike', 'Lang');


-- Insert data in Books table
INSERT INTO Books(title, yearOfPublication, price) VALUES ('Linear Algebra', '2005', 80.00);
INSERT INTO Books(title, yearOfPublication, price) VALUES ('Discrete Mathematics', '1992', 90.99);
INSERT INTO Books(title, yearOfPublication, price) VALUES('Organic Chemistry', '2020', 120.00);
INSERT INTO Books(title, yearOfPublication, price) VALUES('Statistics', 2021, 115.00);



-- Insert data in AuthorsBooks intersection table
INSERT INTO AuthorsBooks(bookID, authorID) VALUES ((SELECT bookID FROM Books WHERE title = 'Linear Algebra'), (SELECT authorID FROM Authors WHERE firstName = 'Edgar' and lastName = 'Patterson'));
INSERT INTO AuthorsBooks(bookID, authorID) VALUES ((SELECT bookID FROM Books WHERE title = 'Linear Algebra'), (SELECT authorID FROM Authors WHERE firstName = 'William' and lastName = 'Fitzgerald'));
INSERT INTO AuthorsBooks(bookID, authorID) VALUES ((SELECT bookID FROM Books WHERE title = 'Discrete Mathematics'), (SELECT authorID FROM Authors WHERE firstName = 'William' and lastName = 'Fitzgerald'));
INSERT INTO AuthorsBooks(bookID, authorID) VALUES ((SELECT bookID FROM Books WHERE title = 'Organic Chemistry'), (SELECT authorID FROM Authors WHERE firstName = 'George' and lastName = 'Wolf'));
INSERT INTO AuthorsBooks(bookID, authorID) VALUES ((SELECT bookID FROM Books WHERE title = 'Statistics'), NULL);
