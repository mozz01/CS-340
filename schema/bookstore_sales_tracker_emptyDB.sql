-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cs340_StudentID
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cs340_StudentID
-- -----------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS `cs340_StudentID` DEFAULT CHARACTER SET utf8 ;
USE `cs340_StudentID` ;

-- -----------------------------------------------------
-- Table `cs340_StudentID`.`Books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_StudentID`.`Books` (
  `bookID` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `yearOfPublication` DATE NOT NULL,
  `price` DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (`bookID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_StudentID`.`Authors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_StudentID`.`Authors` (
  `authorID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`authorID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_StudentID`.`Customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_StudentID`.`Customers` (
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
-- Table `cs340_StudentID`.`Stores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_StudentID`.`Stores` (
  `storeID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`storeID`),
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_StudentID`.`Invoices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_StudentID`.`Invoices` (
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
    REFERENCES `cs340_StudentID`.`Books` (`bookID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `storeID`
    FOREIGN KEY (`storeID`)
    REFERENCES `cs340_StudentID`.`Stores` (`storeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `customerID`
    FOREIGN KEY (`customerID`)
    REFERENCES `cs340_StudentID`.`Customers` (`customerID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_StudentID`.`AuthorsBooks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_StudentID`.`AuthorsBooks` (
  `authorBookID` INT NULL,
  `bookID` INT NOT NULL,
  `authorID` INT NOT NULL,
  PRIMARY KEY (`authorBookID`),
  INDEX `fk_books_has_authors_authors1_idx` (`authorID` ASC),
  INDEX `fk_books_has_authors_books1_idx` (`bookID` ASC),
  CONSTRAINT `fk_books_has_authors_books1`
    FOREIGN KEY (`bookID`)
    REFERENCES `cs340_StudentID`.`Books` (`bookID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_books_has_authors_authors1`
    FOREIGN KEY (`authorID`)
    REFERENCES `cs340_StudentID`.`Authors` (`authorID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
