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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `password` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `isActivated` tinyint(4) NOT NULL,
  `emailHash` varchar(16) NOT NULL,
  `profilepicture` varchar(45) NOT NULL DEFAULT 'Default.png',
  `bio` varchar(4000) DEFAULT '...',
  `coins` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test','testSurname','test@test.com','1992-09-21','098f6bcd4621d373cade4e832627b4f6','test',1,'','Default.png','test hallo',114),(3,'Vorster','Naude','vorsternaude@gmail.com','1996-08-29','1234','Vorster4429',1,'WZ7fIOedl2xZwBs1','Default.png',NULL,100000),(4,'Theunnis','jv Rensburg','tcjvr2015@gmail.com','1996-05-05','098f6bcd4621d373cade4e832627b4f6','Theunnis',1,'uonfNx1Md9fwkQ6G','Default.png','shortie...',37),(5,'Jannie','van Rensburg','jv@gmail.com','1996-05-06','098f6bcd4621d373cade4e832627b4f6','Jannie',0,'1vkhcPbJGoFnFheq','Default.png',NULL,10),(8,'Pieter','Opperman','piet@opopop.com','1996-12-12','PietIsnLekkerOu','LekkerOuPiet',0,'BrvGy3Ghc61tjDd3','Default.png',NULL,10),(9,'test2','test2','test2@test.com','1996-12-12','test2','test2',1,'ZYAsXL59xFyqTa8d','Default.png',NULL,4),(10,'some','people','test4@test.com','1980-08-08','098f6bcd4621d373cade4e832627b4f6','Shortstraw',1,'NULL','Default.png','We are shortstraw',10),(21,'dead','mau5','deadmau5@gmail.com','1990-01-01','098f6bcd4621d373cade4e832627b4f6','Deadmau5',1,'NULL','deadmau5.png','My head is a big mouse',10),(30,'Brett','Nell','pietdreyer21@gmail.com','2013-02-05','12341234','BrettIsLekker',0,'cOpBglzBvjIV5SaY','Default.png',NULL,10),(31,'Johan','Pieterse','ja.pieterse3@gmail.com','1996-05-05','12345','Johan',0,'a92nxSj7g90UubWi','Default.png',NULL,10),(32,'test1','test1','test1@test.com','1985-06-06','098f6bcd4621d373cade4e832627b4f6','Avenged Sevenfold',1,'NULL','Default.png','We are avenged sevenfold',14),(33,'test3','test3','philipventer1996@gmail.com','1996-12-12','0000','Phil',0,'e9maXHgjoadOPXLQ','Default.png','...',0),(34,'Jake','Paul','zandervanvuuren@gmail.com','1989-10-22','382707646a33109cef8703f0000a3441','Jake',1,'Pq9DJ9w0SmKSgEd8','Default.png','...',1000000000);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-23 16:56:46
