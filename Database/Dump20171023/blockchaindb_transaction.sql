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
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction` (
  `idtransaction` int(11) NOT NULL AUTO_INCREMENT,
  `user__id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL,
  `transactions_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cost` varchar(45) NOT NULL,
  `hash` char(20) NOT NULL,
  PRIMARY KEY (`idtransaction`),
  KEY `user____id_idx` (`user__id`),
  KEY `song____id_idx` (`song_id`),
  KEY `user______id_idx` (`user__id`),
  KEY `song______id_idx` (`song_id`),
  CONSTRAINT `song____id` FOREIGN KEY (`song_id`) REFERENCES `song` (`musicID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user______id` FOREIGN KEY (`user__id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,1,1,'2017-10-23 09:33:27','2','asdfasdfasdf'),(2,1,2,'2017-10-23 09:33:28','2','asdfasdfa'),(3,1,4,'2017-10-23 09:33:28','2','fasdf'),(4,1,6,'2017-10-23 09:33:29','2','asdasfasd'),(5,1,8,'2017-10-23 09:33:29','2','aa'),(6,1,4,'2017-10-23 09:33:30','2','asdf'),(7,1,9,'2017-10-23 09:33:30','2','fasasdfd'),(8,1,12,'2017-10-23 09:33:30','2','fasdfasd'),(9,1,13,'2017-10-23 09:33:31','2','dfasdf'),(10,1,16,'2017-10-23 09:33:31','2','df'),(11,1,17,'2017-10-23 09:33:32','2','asdf'),(12,4,23,'2017-10-23 09:37:55','2','asdfasdfas'),(13,4,35,'2017-10-23 09:37:55','1','asdf'),(14,4,21,'2017-10-23 09:37:55','5','asdf'),(15,4,45,'2017-10-23 09:37:56','1','asdf'),(16,4,41,'2017-10-23 09:37:56','8','fasdf'),(17,4,3,'2017-10-23 09:37:57','1','aasdfs'),(18,4,1,'2017-10-23 09:37:57','8','asdfasdf'),(19,4,6,'2017-10-23 09:37:58','6','asdfasdf'),(20,4,8,'2017-10-23 09:37:58','0','asfsdfasdf'),(21,4,17,'2017-10-23 09:37:59','4','asdfasdf'),(22,4,2,'2017-10-23 09:37:59','1','asdfasdf'),(23,4,4,'2017-10-23 09:37:59','7','asdfasdf'),(24,9,1,'2017-10-23 13:22:39','20, 2','sB00x1dRseWcP49W'),(25,9,1,'2017-10-23 13:22:46','20, 2','dh8guI8kr9VdDv4g'),(26,9,1,'2017-10-23 13:23:04','20, 2','RB4XqPHSvUUzFXeE'),(27,9,1,'2017-10-23 13:23:44','2','qdMCgvjXAkVxuSZA'),(28,9,1,'2017-10-23 13:24:33','2','m7UFPcF1wDMUo9fM'),(29,9,1,'2017-10-23 13:24:43','2','Ng8TCvr2svom9syZ'),(30,1,40,'2017-10-23 13:29:29','9','CUHQXx5l9YCpLxl8'),(31,1,40,'2017-10-23 13:30:59','9','DnhyI6s5U06iNqxH'),(32,1,40,'2017-10-23 13:32:06','9','2OI20ZrOZCVijQa1');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-23 16:57:09
