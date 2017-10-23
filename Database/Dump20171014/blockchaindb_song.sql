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
-- Table structure for table `song`
--

DROP TABLE IF EXISTS `song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `song` (
  `musicID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(70) NOT NULL,
  `Explicit` tinyint(4) DEFAULT '0',
  `Path` varchar(255) DEFAULT NULL,
  `Extension` varchar(4) NOT NULL DEFAULT '.mp3',
  `price` int(11) NOT NULL DEFAULT '0',
  `album_ID` int(11) DEFAULT NULL,
  `artistID` int(11) DEFAULT NULL,
  `Played` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`musicID`),
  KEY `album_id_idx` (`album_ID`),
  KEY `user_id_idx` (`artistID`),
  CONSTRAINT `idalbum` FOREIGN KEY (`album_ID`) REFERENCES `album` (`albumID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `iduser` FOREIGN KEY (`artistID`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song`
--

LOCK TABLES `song` WRITE;
/*!40000 ALTER TABLE `song` DISABLE KEYS */;
INSERT INTO `song` VALUES (1,'Nightmare',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,1,32,0),(2,'Welcome To The Family',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,1,32,39),(3,'Danger Line',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',3,1,32,4),(4,'Buried Alive',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,1,32,1),(5,'Natural Born Killer',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,1,32,1),(6,'So Far Away',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,1,32,2),(7,'God Hates Us',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,1,32,0),(8,'Victim',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,1,32,0),(9,'Tonight The World Dies',1,'C:\\Users\\User\\Documents\\RIP Music Files`','mp3',2,1,32,0),(10,'Fiction',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,1,32,0),(11,'Save Me',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',3,1,32,0),(12,'Lost It All (Bonus Track)',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,1,32,0),(13,'Couch Potato',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,2,10,4),(14,'Gimme My Fix',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,2,10,9),(15,'Good Morning, Sunshine',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',3,2,10,0),(16,'Cold Shoulder',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,2,10,1),(17,'Bikini Weather',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,2,10,14),(18,'Mo Money',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,2,10,81),(19,'LCBSS',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,2,10,0),(20,'Say My Name',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',3,2,10,3),(21,'Boxing Day',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,2,10,0),(22,'The Wedding Blues',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,2,10,11),(23,'Backbone',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',3,2,10,1),(24,'127 Hours',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,2,10,2),(25,'Synthesizer',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,2,10,0),(26,'Superliminal',0,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,3,21,0),(27,'Channel 42',0,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',3,3,21,1),(28,'The Veldt',0,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,3,21,0),(29,'Fn Pig',0,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,3,21,0),(30,'Professional Griefers',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,3,21,0),(31,'Maths',0,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',3,3,21,12),(32,'There Might Be Coffee',0,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,3,21,0),(33,'Take Care Of The Proper Paperwork',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,3,21,0),(34,'Closer',0,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,3,21,0),(35,'October',0,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,3,21,3),(36,'Failbait',0,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',3,3,21,0),(37,'Telemiscommunications',0,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,3,21,0),(38,'And All Things Will End',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,4,32,0),(39,'Chapter Four',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,4,32,0),(40,'Clairvoyant Disease',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,4,32,17),(41,'Desecrate Through Reverance',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,4,32,1),(42,'Eternal Rest',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,4,32,4),(43,'I Won_t See You Tonight_ Pt. 1',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,4,32,0),(44,'I Won_t See You Tonight_ Pt. 2',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,4,32,5),(45,'Radiant Eclipse',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,4,32,0),(46,'Remenissions',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,4,32,1),(47,'Second Heartbeat',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',2,4,32,0),(48,'Unholy Confessions',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,4,32,7),(49,'Waking The Fallen',1,'C:\\Users\\User\\Documents\\RIP Music Files','mp3',1,4,32,0);
/*!40000 ALTER TABLE `song` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-14 15:35:31
