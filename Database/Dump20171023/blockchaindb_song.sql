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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song`
--

LOCK TABLES `song` WRITE;
/*!40000 ALTER TABLE `song` DISABLE KEYS */;
INSERT INTO `song` VALUES (1,'Nightmare',1,'Nightmare','mp3',1,1,32,15),(2,'Welcome To The Family',1,'Welcome To The Family','mp3',2,1,32,82),(3,'Danger Line',1,'Danger Line.mp3','mp3',3,1,32,11),(4,'Buried Alive',1,'Buried Alive.mp3','mp3',2,1,32,8),(5,'Natural Born Killer',1,'Natural Born Killer.mp3','mp3',2,1,32,6),(6,'So Far Away',1,'So Far Away.mp3','mp3',1,1,32,12),(7,'God Hates Us',1,'God Hates Us.mp3','mp3',2,1,32,4),(8,'Victim',1,'Victim.mp3','mp3',2,1,32,6),(9,'Tonight The World Dies',1,'Tonight The World Dies.mp3','mp3',2,1,32,4),(10,'Fiction',1,'Fiction.mp3','mp3',2,1,32,6),(11,'Save Me',1,'Save Me.mp3','mp3',3,1,32,4),(12,'Lost It All (Bonus Track)',1,'Lost It All (Bonus Track).mp3','mp3',2,1,32,4),(13,'Couch Potato',1,'Couch Potato.mp3','mp3',2,2,10,7),(14,'Gimme My Fix',1,'Gimme My Fix.mp3','mp3',2,2,10,14),(15,'Good Morning, Sunshine',1,'Good Morning, Sunshine.mp3','mp3',3,2,10,0),(16,'Cold Shoulder',1,'Cold Shoulder.mp3','mp3',2,2,10,3),(17,'Bikini Weather',1,'Bikini Weather.mp3','mp3',2,2,10,67),(18,'Mo Money',1,'Mo Money.mp3','mp3',1,2,10,110),(19,'LCBSS',1,'LCBSS.mp3','mp3',1,2,10,1),(20,'Say My Name',1,'Say My Name.mp3','mp3',3,2,10,4),(21,'Boxing Day',1,'Boxing Day.mp3','mp3',1,2,10,4),(22,'The Wedding Blues',1,'The Wedding Blues.mp3','mp3',1,2,10,17),(23,'Backbone',1,'Backbone.mp3','mp3',3,2,10,2),(24,'127 Hours',1,'127 Hours.mp3','mp3',1,2,10,4),(25,'Synthesizer',1,'Synthesizer.mp3','mp3',1,2,10,2),(26,'Superliminal',0,'Superliminal.mp3','mp3',1,3,21,1),(27,'Channel 42',0,'Channel 42.mp3','mp3',3,3,21,4),(28,'The Veldt',0,'The Veldt.mp3','mp3',2,3,21,1),(29,'Fn Pig',0,'Fn Pig.mp3','mp3',2,3,21,2),(30,'Professional Griefers',1,'Professional Griefers.mp3','mp3',2,3,21,1),(31,'Maths',0,'Maths.mp3','mp3',3,3,21,15),(32,'There Might Be Coffee',0,'There Might Be Coffee.mp3','mp3',2,3,21,0),(33,'Take Care Of The Proper Paperwork',1,'Take Care Of The Proper Paperwork.mp3','mp3',2,3,21,1),(34,'Closer',0,'Closer.mp3','mp3',2,3,21,1),(35,'October',0,'October.mp3','mp3',1,3,21,7),(36,'Failbait',0,'Failbait.mp3','mp3',3,3,21,1),(37,'Telemiscommunications',0,'Telemiscommunications.mp3','mp3',1,3,21,3),(38,'And All Things Will End',1,'And All Things Will End.mp3','mp3',1,4,32,7),(39,'Chapter Four',1,'Chapter Four.mp3','mp3',2,4,32,2),(40,'Clairvoyant Disease',1,'Clairvoyant Disease.mp3','mp3',2,4,32,32),(41,'Desecrate Through Reverance',1,'Desecrate Through Reverance.mp3','mp3',2,4,32,3),(42,'Eternal Rest',1,'Eternal Rest.mp3','mp3',2,4,32,6),(43,'I Won_t See You Tonight_ Pt. 1',1,'I Won_t See You Tonight_ Pt. 1.mp3','mp3',2,4,32,1),(44,'I Won_t See You Tonight_ Pt. 2',1,'I Won_t See You Tonight_ Pt. 2.mp3','mp3',2,4,32,7),(45,'Radiant Eclipse',1,'Radiant Eclipse.mp3','mp3',1,4,32,2),(46,'Remenissions',1,'Remenissions.mp3','mp3',2,4,32,4),(47,'Second Heartbeat',1,'Second Heartbeat.mp3','mp3',2,4,32,5),(48,'Unholy Confessions',1,'Unholy Confessions.mp3','mp3',1,4,32,10),(49,'Waking The Fallen',1,'Waking The Fallen.mp3','mp3',1,4,32,2),(52,'Hey Ya - Walk off the Earth Outkast Cover',1,'Hey Ya - Walk off the Earth Outkast Cover.mp3','.mp3',250,14,21,7),(53,'Hey Ya - Walk off the Earth Outkast Cover',1,'Hey Ya - Walk off the Earth Outkast Cover.mp3','.mp3',250,14,21,7),(54,'Bietjie Hoop Amptelike Musiek Video',1,'Hey Ya - Walk off the Earth Outkast Cover.mp3','.mp3',150,14,21,0),(55,'Hey Ya - Walk off the Earth Outkast Cover',1,'Die Heuwels Fantasties - Bietjie Hoop Amptelike Musiek Video.mp3','.mp3',250,14,21,7),(56,'Bietjie Hoop',1,'Die Heuwels Fantasties - Bietjie Hoop Amptelike Musiek Video.mp3','.mp3',120,17,21,0),(57,'Hey Ya',1,'Hey Ya - Walk off the Earth Outkast Cover.mp3','.mp3',250,17,21,0);
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

-- Dump completed on 2017-10-23 16:56:52
