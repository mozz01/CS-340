/*
Clean start:
source drop.sql; source DDL.sql; source check.sql;

Reload database:
source DDL.sql; source check.sql;

Check database:
source check.sql;
*/

SHOW TABLES;

DESCRIBE Authors;
DESCRIBE AuthorsBooks;
DESCRIBE Books;
DESCRIBE Customers;
DESCRIBE Invoices;
DESCRIBE Stores;

SELECT * FROM Authors;
SELECT * FROM AuthorsBooks;
SELECT * FROM Books;
SELECT * FROM Customers;
SELECT * FROM Invoices;
SELECT * FROM Stores;
