-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 52.211.85.57    Database: blockchaindb
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `album` (
  `albumID` int(11) NOT NULL AUTO_INCREMENT,
  `album_name` varchar(45) NOT NULL,
  `release date` datetime DEFAULT NULL,
  `price` int(11) NOT NULL DEFAULT '0',
  `image_path` varchar(255) NOT NULL DEFAULT 'C:UsersAdministratorDesktopweb serviceimagesalbumsDefault.png',
  `userid` int(11) DEFAULT NULL,
  `image_name` varchar(45) NOT NULL DEFAULT 'Default.png',
  `number_of_songs` int(11) NOT NULL DEFAULT '0',
  `released` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`albumID`),
  UNIQUE KEY `albumID_UNIQUE` (`albumID`),
  KEY `userID_idx` (`userid`),
  CONSTRAINT `userID` FOREIGN KEY (`userid`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,'Nightmare','2010-07-23 00:00:00',15,'C:\\Users\\Administrator\\Desktop\\web service\\images\\Avenged-Sevenfold-Nightmare.png',32,'Avenged-Sevenfold-Nightmare.png',12,1),(2,'Good Morning_ Sunshine','1997-01-01 00:00:00',17,'C:\\Users\\Administrator\\Desktop\\web service\\images\\Default.png',10,'Default.png',13,1),(3,'Album Title Goes Here','2012-09-21 00:00:00',18,'C:\\Users\\Administrator\\Desktop\\web service\\images\\Default.png',21,'album_title_goes_here.png',12,1),(4,'Waking The Fallen','2003-08-26 00:00:00',9,'C:\\Users\\Administrator\\Desktop\\web service\\images\\Waking_The_Fallen.png',32,'Waking_The_Fallen.png',12,1),(6,'my harige onderarms',NULL,0,'C:UsersAdministratorDesktopweb serviceimagesalbumsDefault.png',9,'Default.png',0,0),(7,'lekker asseblief asseblief',NULL,0,'C:UsersAdministratorDesktopweb serviceimagesalbumsDefault.png',21,'Default.png',0,0),(8,'lekker asseblief asseblief',NULL,0,'C:UsersAdministratorDesktopweb serviceimagesalbumsDefault.png',21,'Default.png',0,0),(9,'lekker asseblief asseblief',NULL,0,'C:UsersAdministratorDesktopweb serviceimagesalbumsDefault.png',21,'Default.png',0,0),(10,'Asseblief My Lief',NULL,0,'C:UsersAdministratorDesktopweb serviceimagesalbumsDefault.png',21,'Default.png',0,0),(11,'Depressing Black Hole',NULL,0,'C:UsersAdministratorDesktopweb serviceimagesalbumsDefault.png',21,'Default.png',0,0),(12,'Depressing Black Hole',NULL,0,'C:UsersAdministratorDesktopweb serviceimagesalbumsDefault.png',21,'Default.png',0,0),(13,'Depressing Black Hole 2',NULL,0,'C:UsersAdministratorDesktopweb serviceimagesalbumsDefault.png',21,'Default.png',0,0),(14,'Depressing Black Hole 3','2017-10-23 10:39:28',0,'C:UsersAdministratorDesktopweb serviceimagesalbumsDefault.png',21,'Default.png',0,1),(15,'Depressing Black Hole 3',NULL,0,'C:UsersAdministratorDesktopweb serviceimagesalbumsDefault.png',21,'Default.png',0,0),(16,'Depressing Black Hole 3',NULL,0,'C:UsersAdministratorDesktopweb serviceimagesalbumsDefault.png',21,'Default.png',0,0),(17,'Depressing Black Hole 4','2017-10-23 10:55:46',0,'C:UsersAdministratorDesktopweb serviceimagesalbumsDefault.png',21,'Default.png',0,1);
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-23 16:56:58
