-- Group #21 - Mo Hudeihed & Saurav Shrestha
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- -----------------------------------------------------
-- Table `Books`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Books`;
CREATE TABLE `Books` (
  `bookID` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `yearOfPublication` YEAR NOT NULL,
  `price` DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (`bookID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Authors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Authors`;
CREATE TABLE `Authors` (
  `authorID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`authorID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Customers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Customers`;
CREATE TABLE `Customers` (
  `customerID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE INDEX `Email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `Phone_UNIQUE` (`phone` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Stores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Stores`;
CREATE TABLE `Stores` (
  `storeID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`storeID`),
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Invoices`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Invoices`;
CREATE TABLE `Invoices` (
  `invoiceID` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `bookID` INT NOT NULL,
  `storeID` INT NOT NULL,
  `customerID` INT NOT NULL,
  PRIMARY KEY (`invoiceID`),
  INDEX `bookID_idx` (`bookID` ASC),
  INDEX `storeID_idx` (`storeID` ASC),
  INDEX `customerID_idx` (`customerID` ASC),
  CONSTRAINT `bookID`
    FOREIGN KEY (`bookID`)
    REFERENCES `Books` (`bookID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `storeID`
    FOREIGN KEY (`storeID`)
    REFERENCES `Stores` (`storeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `customerID`
    FOREIGN KEY (`customerID`)
    REFERENCES `Customers` (`customerID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AuthorsBooks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AuthorsBooks`;
CREATE TABLE `AuthorsBooks` (
  `authorBookID` INT AUTO_INCREMENT NOT NULL,
  `bookID` INT NOT NULL,
  `authorID` INT,
  PRIMARY KEY (`authorBookID`),
  INDEX `fk_books_has_authors_authors1_idx` (`authorID` ASC),
  INDEX `fk_books_has_authors_books1_idx` (`bookID` ASC),
  CONSTRAINT `fk_books_has_authors_books1`
    FOREIGN KEY (`bookID`)
    REFERENCES `Books` (`bookID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_books_has_authors_authors1`
    FOREIGN KEY (`authorID`)
    REFERENCES `Authors` (`authorID`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- ------------------------------------------------------------------------------------
-- INSERT DATA SECTION
-- ------------------------------------------------------------------------------------

-- Insert data in Stores table
INSERT INTO Stores (NAME, phone, address)
VALUES
  (
    'Metropolitan Stories',
    '402-547-6787',
    '1 Broad Court, Irmo, SC 29063'
  ),
  (
    'Literary Books',
    '542-888-2167',
    '121 Main Lane, Pataskala, OH 43062'
  ),
  (
    'Bookshelf Boutique',
    '901-325-4321',
    '9906 W. Union Street, Burke, VA 22015'
  );

-- Insert data in Customers table
INSERT INTO Customers (firstName, lastName, email, phone)
VALUES
  (
    'Patricia',
    'Carlson',
    'pcarlson@gmail.com',
    '667-222-4521'
  ),
  (
    'Selena',
    'Lozada',
    'slozada@gmail.com',
    '701-548-1944'
  ),
  (
    'Michael',
    'Karlsson',
    'mkarlsson@gmail.com',
    '402-666-1234'
  ),
  (
    'Sergio',
    'Hernandez',
    'shernandez@gmail.com',
    '801-951-3574'
  );

-- Insert data in Authors table
INSERT INTO Authors (firstName, lastName)
VALUES
  ('Edgar', 'Patterson'),
  ('William', 'Fitzgerald'),
  ('George', 'Wolf'),
  ('Mike', 'Lang');

-- Insert data in Books table
INSERT INTO Books (title, yearofpublication, price)
VALUES
  ('Linear Algebra', '2005', 80.00),
  ('Discrete Mathematics', '1992', 90.99),
  ('Organic Chemistry', '2020', 120.00),
  ('Statistics', 2021, 115.00);

-- Insert data in AuthorsBooks intersection table
INSERT INTO AuthorsBooks (bookID, authorID)
VALUES
(
  (
    SELECT bookID FROM Books WHERE title = 'Linear Algebra'
  ),
  (
    SELECT authorID
    FROM Authors
    WHERE firstName = 'Edgar'
      AND lastName = 'Patterson'
  )
),
(
  (
    SELECT bookID FROM Books WHERE title = 'Linear Algebra'
  ),
  (
    SELECT authorID
    FROM Authors
    WHERE firstName = 'William'
      AND lastName = 'Fitzgerald'
  )
),
(
  (
    SELECT bookID FROM Books WHERE title = 'Discrete Mathematics'
  ),
  (
    SELECT authorID
    FROM Authors
    WHERE firstName = 'William'
      AND lastName = 'Fitzgerald'
  )
),
(
  (
    SELECT bookID FROM Books WHERE title = 'Organic Chemistry'
  ),
  (
    SELECT authorID
    FROM Authors
    WHERE firstName = 'George'
      AND lastName = 'Wolf'
  )
),
(
  (
    SELECT bookID FROM Books WHERE title = 'Statistics'
  ),
  NULL
);

-- Insert data in Authors table
INSERT INTO Invoices (date, bookID, storeID, customerID)
VALUES
( "2021-02-25",
  (
    SELECT bookID
    FROM Books
    WHERE title = "Linear Algebra"
  ),
  (
    SELECT storeID
    FROM Stores
    WHERE name = "Metropolitan Stories"
  ),
  (
    SELECT customerID
    FROM Customers
    WHERE firstName = 'Patricia'
      AND lastName = 'Carlson'
  )
),
( "2021-03-19",
  (
    SELECT bookID
    FROM Books
    WHERE title = "Discrete Mathematics"
  ),
  (
    SELECT storeID
    FROM Stores
    WHERE name = "Metropolitan Stories"
  ),
  (
    SELECT customerID
    FROM Customers
    WHERE firstName = 'Patricia'
      AND lastName = 'Carlson'
  )
),
( "2023-10-10",
  (
    SELECT bookID
    FROM Books
    WHERE title = "Discrete Mathematics"
  ),
  (
    SELECT storeID
    FROM Stores
    WHERE name = "Literary Books"
  ),
  (
    SELECT customerID
    FROM Customers
    WHERE firstName = 'Selena'
      AND lastName = 'Lozada'
  )
),
( "2022-02-05",
  (
    SELECT bookID
    FROM Books
    WHERE title = "Linear Algebra"
  ),
  (
    SELECT storeID
    FROM Stores
    WHERE name = "Metropolitan Stories"
  ),
  (
    SELECT customerID
    FROM Customers
    WHERE firstName = 'Sergio'
      AND lastName = 'Hernandez'
  )
);


-- ------------------------------------------------------------------------------------
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
-- SET FOREIGN_KEY_CHECKS=1;
COMMIT;
