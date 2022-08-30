CREATE DATABASE  IF NOT EXISTS `backend` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `backend`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: i7b203.p.ssafy.io    Database: backend
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auction_detail`
--

DROP TABLE IF EXISTS `auction_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auction_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bid_increment` int DEFAULT NULL,
  `grade` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `product_title` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `starting_price` int DEFAULT NULL,
  `auction_room_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjpmmlioeia80rnp7u9t2cq6jp` (`auction_room_id`)
) ENGINE=MyISAM AUTO_INCREMENT=232 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auction_detail`
--

LOCK TABLES `auction_detail` WRITE;
/*!40000 ALTER TABLE `auction_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `auction_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auction_result`
--

DROP TABLE IF EXISTS `auction_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auction_result` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `auctioned_price` bigint DEFAULT NULL,
  `deal_completed` bit(1) DEFAULT NULL,
  `delivery_completed` bit(1) DEFAULT NULL,
  `payment_completed` bit(1) DEFAULT NULL,
  `auction_detail_id` bigint DEFAULT NULL,
  `buyer_id` bigint DEFAULT NULL,
  `seller_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKofu7k99qbcaa66n3foswgucs6` (`auction_detail_id`),
  KEY `FKcyg5babq35p102699gmfgdcsm` (`buyer_id`),
  KEY `FK6w6fhkjj0fi0g5uvxs2q3tfdq` (`seller_id`)
) ENGINE=MyISAM AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auction_result`
--

LOCK TABLES `auction_result` WRITE;
/*!40000 ALTER TABLE `auction_result` DISABLE KEYS */;
/*!40000 ALTER TABLE `auction_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auction_room`
--

DROP TABLE IF EXISTS `auction_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auction_room` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `auction_room_description` varchar(255) COLLATE utf8mb4_0900_as_cs NOT NULL,
  `auction_room_title` varchar(255) COLLATE utf8mb4_0900_as_cs NOT NULL,
  `auctioned` bit(1) DEFAULT NULL,
  `owner_id` bigint DEFAULT NULL,
  `thumbnail_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmwujbjhj0ybq6r84y5vwbdp9o` (`thumbnail_id`)
) ENGINE=MyISAM AUTO_INCREMENT=205 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auction_room`
--

LOCK TABLES `auction_room` WRITE;
/*!40000 ALTER TABLE `auction_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `auction_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_refresh_save`
--

DROP TABLE IF EXISTS `auth_refresh_save`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_refresh_save` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `refresh_token` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=361 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_refresh_save`
--

LOCK TABLES `auth_refresh_save` WRITE;
/*!40000 ALTER TABLE `auth_refresh_save` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_refresh_save` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (13);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content_type` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `file_size` bigint DEFAULT NULL,
  `origin_file_name` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `server_file_name` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL,
  `date` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `direction` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `price` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `unit` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `value` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (11,'2022-08-12','0','무','28,180','20kg','2.8'),(10,'2022-08-12','0','토마토','18,140','5kg','0.3'),(9,'2022-08-12','0','오이','34,250','10kg','2.1'),(8,'2022-08-12','0','배추','18,480','10kg','9.2'),(7,'2022-08-12','1','감자','45,080','20kg','0.5'),(12,'2022-08-12','2','당근','41,780','20kg','0.0');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `account` varchar(255) COLLATE utf8mb4_0900_as_cs NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_0900_as_cs NOT NULL,
  `bank` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `data_create` datetime NOT NULL,
  `detail_address` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_0900_as_cs NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_0900_as_cs NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_0900_as_cs NOT NULL,
  `zip_code` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `auction_room_id` bigint DEFAULT NULL,
  `image_id` bigint DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FKsujpbk0tgg4b8ft4v78xksauh` (`auction_room_id`),
  KEY `FK9hpx11qlu8cqhrkjn0yor93h` (`image_id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification`
--

DROP TABLE IF EXISTS `verification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `confirm_number` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification`
--

LOCK TABLES `verification` WRITE;
/*!40000 ALTER TABLE `verification` DISABLE KEYS */;
/*!40000 ALTER TABLE `verification` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-30 15:44:57
