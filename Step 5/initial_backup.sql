-- MariaDB dump 10.19  Distrib 10.5.22-MariaDB, for Linux (x86_64)
--
-- Host: classmysql.engr.oregonstate.edu    Database: cs340_hudeihem
-- ------------------------------------------------------
-- Server version	10.6.16-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Authors`
--

DROP TABLE IF EXISTS `Authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Authors` (
  `authorID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  PRIMARY KEY (`authorID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Authors`
--

LOCK TABLES `Authors` WRITE;
/*!40000 ALTER TABLE `Authors` DISABLE KEYS */;
INSERT INTO `Authors` VALUES (1,'Edgar','Patterson'),(2,'William','Fitzgerald'),(3,'George','Wolf'),(4,'Mike','Lang'),(6,'Jesse','Takens'),(7,'Christopher','Paolini');
/*!40000 ALTER TABLE `Authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AuthorsBooks`
--

DROP TABLE IF EXISTS `AuthorsBooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AuthorsBooks` (
  `authorBookID` int(11) NOT NULL AUTO_INCREMENT,
  `bookID` int(11) NOT NULL,
  `authorID` int(11) DEFAULT NULL,
  PRIMARY KEY (`authorBookID`),
  KEY `fk_books_has_authors_authors1_idx` (`authorID`),
  KEY `fk_books_has_authors_books1_idx` (`bookID`),
  CONSTRAINT `fk_books_has_authors_authors1` FOREIGN KEY (`authorID`) REFERENCES `Authors` (`authorID`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `fk_books_has_authors_books1` FOREIGN KEY (`bookID`) REFERENCES `Books` (`bookID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AuthorsBooks`
--

LOCK TABLES `AuthorsBooks` WRITE;
/*!40000 ALTER TABLE `AuthorsBooks` DISABLE KEYS */;
INSERT INTO `AuthorsBooks` VALUES (1,1,2),(2,1,2),(3,2,2),(4,3,3),(5,4,NULL),(11,8,2),(12,8,2),(13,9,2),(15,11,6),(16,12,7),(19,16,1),(21,19,4),(22,19,4);
/*!40000 ALTER TABLE `AuthorsBooks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Books`
--

DROP TABLE IF EXISTS `Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Books` (
  `bookID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `yearOfPublication` year(4) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  PRIMARY KEY (`bookID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Books`
--

LOCK TABLES `Books` WRITE;
/*!40000 ALTER TABLE `Books` DISABLE KEYS */;
INSERT INTO `Books` VALUES (1,'Linear Algebra',2005,100.00),(2,'Discrete Mathematics',1992,90.99),(3,'Organic Chemistry',2020,120.00),(4,'Statistics',2021,115.00),(8,'Calculus',1997,1000.00),(9,'Maths',2099,234.99),(11,'Quantum Mechanics',2045,80.00),(12,'Eragon',2002,20.00),(14,'A Tale of Two Cities',2005,43.00),(16,'Test',1901,20.00),(19,'test33',2022,5.00);
/*!40000 ALTER TABLE `Books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(30) NOT NULL,
  PRIMARY KEY (`customerID`),
  UNIQUE KEY `Email_UNIQUE` (`email`),
  UNIQUE KEY `Phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES (1,'Patricia','Carlson','pcarlson@gmail.com','667-222-4521'),(2,'Selena','Lozada','slozada@gmail.com','701-548-1944'),(3,'Michael','Karlsson','mkarlsson@gmail.com','402-666-1234'),(4,'Sergio','Hernandez','shernandez@gmail.com','801-951-3574'),(6,'Brett','VanDenBurg','bretty@brett.com','123123123');
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Invoices`
--

DROP TABLE IF EXISTS `Invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Invoices` (
  `invoiceID` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `bookID` int(11) NOT NULL,
  `storeID` int(11) NOT NULL,
  `customerID` int(11) DEFAULT NULL,
  PRIMARY KEY (`invoiceID`),
  KEY `bookID_idx` (`bookID`),
  KEY `storeID_idx` (`storeID`),
  KEY `customerID_idx` (`customerID`),
  CONSTRAINT `bookID` FOREIGN KEY (`bookID`) REFERENCES `Books` (`bookID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `customerID` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `storeID` FOREIGN KEY (`storeID`) REFERENCES `Stores` (`storeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Invoices`
--

LOCK TABLES `Invoices` WRITE;
/*!40000 ALTER TABLE `Invoices` DISABLE KEYS */;
INSERT INTO `Invoices` VALUES (2,'2021-03-19',2,1,1),(4,'2022-02-05',1,1,4),(5,'2020-10-10',1,1,3),(7,'2024-03-05',1,1,1);
/*!40000 ALTER TABLE `Invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stores`
--

DROP TABLE IF EXISTS `Stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Stores` (
  `storeID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`storeID`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stores`
--

LOCK TABLES `Stores` WRITE;
/*!40000 ALTER TABLE `Stores` DISABLE KEYS */;
INSERT INTO `Stores` VALUES (1,'Metropolitan Stories','402-547-6787','1 Broad Court, Irmo, SC 29063'),(2,'Literary Books','542-888-2167','121 Main Lane, Pataskala, OH 43062'),(3,'Bookshelf Boutique','901-325-4321','9906 W. Union Street, Burke, VA 22015');
/*!40000 ALTER TABLE `Stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnostic`
--

DROP TABLE IF EXISTS `diagnostic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diagnostic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnostic`
--

LOCK TABLES `diagnostic` WRITE;
/*!40000 ALTER TABLE `diagnostic` DISABLE KEYS */;
INSERT INTO `diagnostic` VALUES (1,'MySQL is working!');
/*!40000 ALTER TABLE `diagnostic` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-06 18:48:12
