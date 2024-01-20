-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cs340_hudeihem
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cs340_hudeihem
-- -----------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS `cs340_hudeihem` DEFAULT CHARACTER SET utf8 ;
USE `cs340_hudeihem` ;

-- -----------------------------------------------------
-- Table `cs340_hudeihem`.`Authors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_hudeihem`.`Authors` (
  `authorID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`authorID`),
  UNIQUE INDEX `authorID_UNIQUE` (`authorID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_hudeihem`.`Books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_hudeihem`.`Books` (
  `bookID` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `yearOfPublication` DATE NOT NULL,
  `price` DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (`bookID`),
  UNIQUE INDEX `bookID_UNIQUE` (`bookID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_hudeihem`.`Stores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_hudeihem`.`Stores` (
  `storeID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`storeID`),
  UNIQUE INDEX `storeID_UNIQUE` (`storeID` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_hudeihem`.`Customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_hudeihem`.`Customers` (
  `customerID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE INDEX `customerID_UNIQUE` (`customerID` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_hudeihem`.`Invoices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_hudeihem`.`Invoices` (
  `invoiceID` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `bookID` INT NOT NULL,
  `storeID` INT NOT NULL,
  `customerID` INT NOT NULL,
  PRIMARY KEY (`invoiceID`, `bookID`, `storeID`, `customerID`),
  UNIQUE INDEX `invoiceID_UNIQUE` (`invoiceID` ASC) VISIBLE,
  INDEX `fk_Invoices_Books_idx` (`bookID` ASC) VISIBLE,
  INDEX `fk_Invoices_Stores1_idx` (`storeID` ASC) VISIBLE,
  INDEX `fk_Invoices_Customers1_idx` (`customerID` ASC) VISIBLE,
  CONSTRAINT `fk_Invoices_Books`
    FOREIGN KEY (`bookID`)
    REFERENCES `cs340_hudeihem`.`Books` (`bookID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Invoices_Stores1`
    FOREIGN KEY (`storeID`)
    REFERENCES `cs340_hudeihem`.`Stores` (`storeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Invoices_Customers1`
    FOREIGN KEY (`customerID`)
    REFERENCES `cs340_hudeihem`.`Customers` (`customerID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cs340_hudeihem`.`AuthorsBooks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cs340_hudeihem`.`AuthorsBooks` (
  `authorID` INT NOT NULL,
  `bookID` INT NOT NULL,
  PRIMARY KEY (`authorID`, `bookID`),
  INDEX `fk_AuthorsBooks_Books1_idx` (`bookID` ASC) VISIBLE,
  CONSTRAINT `fk_AuthorsBooks_Authors1`
    FOREIGN KEY (`authorID`)
    REFERENCES `cs340_hudeihem`.`Authors` (`authorID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_AuthorsBooks_Books1`
    FOREIGN KEY (`bookID`)
    REFERENCES `cs340_hudeihem`.`Books` (`bookID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
