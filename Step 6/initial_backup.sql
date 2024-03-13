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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Authors`
--

LOCK TABLES `Authors` WRITE;
/*!40000 ALTER TABLE `Authors` DISABLE KEYS */;
INSERT INTO `Authors` VALUES (1,'Edgar','Patterson'),(2,'William','Fitzgerald'),(3,'George','Wolf'),(4,'Mike','Lang'),(5,'45645','45645'),(17,'test','test'),(18,'Bill','Brasky');
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
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AuthorsBooks`
--

LOCK TABLES `AuthorsBooks` WRITE;
/*!40000 ALTER TABLE `AuthorsBooks` DISABLE KEYS */;
INSERT INTO `AuthorsBooks` VALUES (3,2,2),(4,3,3),(5,4,NULL),(18,13,3),(19,13,2),(31,1,1),(32,1,3),(45,5,2),(46,5,3),(59,23,1),(60,25,1),(65,27,1),(68,28,17),(69,6,2),(70,6,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Books`
--

LOCK TABLES `Books` WRITE;
/*!40000 ALTER TABLE `Books` DISABLE KEYS */;
INSERT INTO `Books` VALUES (1,'Linear Algebra',2005,80.00),(2,'Discrete Mathematics',1992,90.99),(3,'Organic Chemistry',2020,120.00),(4,'Statistics',2021,115.00),(5,'Linear Algebra: A Straightforward Guide to Confusion',1901,0.00),(6,'Discrete Mathematics: Numbers Nonsense',1901,2.00),(13,'new book updated',1901,1.00),(23,'2',1955,2.00),(24,'2',1901,234.00),(25,'234',2122,2.00),(27,'3',1955,1.00),(28,'test',1902,85.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES (1,'Patricia','Carlson','pcarlson@gmail.com','667-222-4521'),(2,'Selena','Lozada','slozada@gmail.com','701-548-1944'),(3,'Michael','Karlsson','mkarlsson@gmail.com','402-666-1234'),(4,'Sergio','Hernandez','shernandez@gmail.com','801-951-3574'),(28,'1','2','qwer@d.com','1234567788'),(36,'2','2','qwer@d.com3','1234567789'),(37,'test','test','test@gmail.com','593-242');
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Invoices`
--

LOCK TABLES `Invoices` WRITE;
/*!40000 ALTER TABLE `Invoices` DISABLE KEYS */;
INSERT INTO `Invoices` VALUES (1,'2021-02-25',1,1,1),(2,'2021-03-19',2,1,1),(4,'2022-02-05',1,1,4),(5,'2024-03-08',1,1,1),(6,'2024-03-01',1,1,1),(7,'2024-03-08',1,1,1),(10,'2024-03-07',1,1,4),(11,'2024-03-06',5,1,3),(14,'2024-03-27',1,1,3),(31,'2024-03-21',24,2,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stores`
--

LOCK TABLES `Stores` WRITE;
/*!40000 ALTER TABLE `Stores` DISABLE KEYS */;
INSERT INTO `Stores` VALUES (1,'Metropolitan Stories','402-547-6787','1 Broad Court, Irmo, SC 29063'),(2,'Literary Books','542-888-2167','121 Main Lane, Pataskala, OH 43062'),(10,'qwer','1234567789','123'),(11,'','','');
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

-- Dump completed on 2024-03-13 15:20:42
