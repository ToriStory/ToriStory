CREATE DATABASE  IF NOT EXISTS `businessdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `businessdb`;
-- MariaDB dump 10.19  Distrib 10.11.5-MariaDB, for Win64 (AMD64)
--
-- Host: k9a402.p.ssafy.io    Database: businessdb
-- ------------------------------------------------------
-- Server version	11.1.2-MariaDB-1:11.1.2+maria~ubu2204

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
-- Table structure for table `acorn`
--

DROP TABLE IF EXISTS `acorn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acorn` (
  `acorn_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `cnt` smallint(5) unsigned NOT NULL,
  `percent` float NOT NULL,
  PRIMARY KEY (`acorn_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acorn`
--

LOCK TABLES `acorn` WRITE;
/*!40000 ALTER TABLE `acorn` DISABLE KEYS */;
INSERT INTO `acorn` VALUES
(1,10,0.8),
(2,30,0.15),
(3,50,0.04),
(4,100,0.01);
/*!40000 ALTER TABLE `acorn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asset`
--

DROP TABLE IF EXISTS `asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asset` (
  `asset_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `asset_nm` varchar(20) NOT NULL,
  PRIMARY KEY (`asset_id`),
  UNIQUE KEY `UK_mxvwg054034x32rqldb20aibt` (`asset_nm`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asset`
--

LOCK TABLES `asset` WRITE;
/*!40000 ALTER TABLE `asset` DISABLE KEYS */;
INSERT INTO `asset` VALUES
(4,'DAILY_TOTORI_TICKET'),
(1,'DOTORI'),
(2,'RANDOM_TICKET'),
(3,'TOTORI_TICKET');
/*!40000 ALTER TABLE `asset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `basket`
--

DROP TABLE IF EXISTS `basket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `basket` (
  `basket_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `gift_cnt` tinyint(3) unsigned NOT NULL,
  `member_id` int(10) unsigned NOT NULL,
  `open_flag` tinyint(1) NOT NULL,
  `send_dtm` timestamp NOT NULL,
  `gift_id` tinyint(3) unsigned DEFAULT NULL,
  `letter_id` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`basket_id`),
  KEY `FKm53edrr455tuwsljt0tjyvjsl` (`letter_id`),
  KEY `FK1h8tao6o3i50t5ruvpyxj1ylu` (`gift_id`),
  CONSTRAINT `FK1h8tao6o3i50t5ruvpyxj1ylu` FOREIGN KEY (`gift_id`) REFERENCES `gift` (`gift_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKm53edrr455tuwsljt0tjyvjsl` FOREIGN KEY (`letter_id`) REFERENCES `letter` (`letter_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
INSERT INTO `basket` VALUES
(1,3,2,1,'2023-11-16 02:00:00',1,1),
(2,0,5,0,'2023-11-16 04:00:00',NULL,5),
(3,0,2,1,'2023-11-16 04:00:00',NULL,4),
(6,0,3,0,'2023-11-16 08:00:00',NULL,1),
(7,1,1,1,'2023-11-16 06:00:00',2,2),
(8,0,1,1,'2023-11-16 08:00:00',NULL,2),
(9,0,2,0,'2023-11-16 09:00:00',NULL,5),
(10,1,1,1,'2023-11-16 08:00:00',2,2),
(11,0,1,1,'2023-11-16 08:00:00',NULL,5),
(12,10,1,0,'2023-11-16 11:00:00',1,4);
/*!40000 ALTER TABLE `basket` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tori`@`%`*/ /*!50003 TRIGGER quest5_trigger
AFTER INSERT ON basket
FOR EACH ROW
BEGIN
    DECLARE quest_already_comp INT;
    DECLARE existing_member_id INT;

    -- 새로 추가된 행의 member_id를 가져옵니다.
    SET existing_member_id = NEW.member_id;

    -- 새로 추가된 행의 member_id에 해당하는 quest 테이블의 comp_flag 값을 가져옵니다.
    SELECT comp_flag INTO quest_already_comp FROM quest WHERE member_id = existing_member_id AND quest_no = 5;
    
    IF quest_already_comp = 0 THEN
        -- 해당 member_id를 가진 행의 comp_flag를 1로 업데이트합니다.
        UPDATE quest SET comp_flag = 1 WHERE member_id = existing_member_id AND quest_no = 5;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `common_challenge`
--

DROP TABLE IF EXISTS `common_challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `common_challenge` (
  `common_challenge_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(20) NOT NULL,
  `today_flag` tinyint(1) NOT NULL,
  `unit` varchar(20) NOT NULL,
  PRIMARY KEY (`common_challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common_challenge`
--

LOCK TABLES `common_challenge` WRITE;
/*!40000 ALTER TABLE `common_challenge` DISABLE KEYS */;
INSERT INTO `common_challenge` VALUES
(1,'산책하기',0,'[5, 20, 50]'),
(2,'내가 좋아하는 노래 듣기',1,'[10, 30, 60]'),
(3,'내 방 청소하기',0,'[1, 20, 40]'),
(4,'가족에게 안부 전하기',0,'[1, 40, 60]'),
(5,'명상하기',0,'[1, 40, 70]'),
(6,'요리하기',0,'[5, 30, 50]'),
(7,'그림 그리기',0,'[5. 15. 30]'),
(8,'하늘 올려다 보기',0,'[10, 30, 60]'),
(9,'스트레칭 하기',0,'[5, 10, 30]'),
(10,'친구한테 연락하기',0,'[1, 10, 20]');
/*!40000 ALTER TABLE `common_challenge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `common_entry`
--

DROP TABLE IF EXISTS `common_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `common_entry` (
  `common_entry_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `challenge_dt` date NOT NULL,
  `comp_flag` tinyint(1) NOT NULL,
  `member_id` int(10) unsigned NOT NULL,
  `common_challenge_id` bigint(20) unsigned NOT NULL,
  `img_url` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`common_entry_id`),
  KEY `FKsixwhn1lg7wuniqdcdjnqhwwl` (`common_challenge_id`),
  CONSTRAINT `FKsixwhn1lg7wuniqdcdjnqhwwl` FOREIGN KEY (`common_challenge_id`) REFERENCES `common_challenge` (`common_challenge_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common_entry`
--

LOCK TABLES `common_entry` WRITE;
/*!40000 ALTER TABLE `common_entry` DISABLE KEYS */;
INSERT INTO `common_entry` VALUES
(3,'2023-11-16',0,2,2,NULL),
(5,'2023-11-16',0,3,2,NULL);
/*!40000 ALTER TABLE `common_entry` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tori`@`%`*/ /*!50003 TRIGGER quest1_trigger
AFTER INSERT ON common_entry
FOR EACH ROW
BEGIN
    DECLARE quest_already_comp INT;

    -- 새로 추가된 행의 member_id에 해당하는 quest 테이블의 comp_flag 값을 가져옵니다.
    SELECT comp_flag INTO quest_already_comp FROM quest WHERE member_id = NEW.member_id AND quest_no = 1;

    -- 가져온 comp_flag 값이 false인 경우에만 업데이트를 수행합니다.
    IF quest_already_comp = 0 THEN
        -- 해당 member_id를 가진 행의 comp_flag를 1로 업데이트합니다.
        UPDATE quest SET comp_flag = 1 WHERE member_id = NEW.member_id AND quest_no = 1;
    END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `custom_challenge`
--

DROP TABLE IF EXISTS `custom_challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `custom_challenge` (
  `custom_challenge_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(20) NOT NULL,
  `member_id` int(10) unsigned NOT NULL,
  `report_cnt` int(10) unsigned NOT NULL,
  `scrap_cnt` int(10) unsigned NOT NULL,
  `reg_dtm` timestamp NOT NULL,
  `display_flag` tinyint(1) NOT NULL,
  PRIMARY KEY (`custom_challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_challenge`
--

LOCK TABLES `custom_challenge` WRITE;
/*!40000 ALTER TABLE `custom_challenge` DISABLE KEYS */;
INSERT INTO `custom_challenge` VALUES
(1,'낙엽 5개 밟기',3,0,5,'2023-11-16 01:44:03',1),
(3,'친구에게 안부 전하기',6,0,3,'2023-11-16 02:31:36',1),
(4,'산책가기',3,0,0,'2023-11-16 04:28:49',0);
/*!40000 ALTER TABLE `custom_challenge` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tori`@`%`*/ /*!50003 TRIGGER quest2_trigger

AFTER INSERT ON custom_challenge
FOR EACH ROW
BEGIN
    DECLARE existing_member_id INT;
    
    -- 새로 추가된 행의 member_id 값을 가져옵니다.
    SET existing_member_id = NEW.member_id;

    -- 해당 member_id를 가진 행의 comp_flag를 1로 업데이트합니다.
    UPDATE quest SET comp_flag = 1 WHERE member_id = existing_member_id and quest_no = 2;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `custom_entry`
--

DROP TABLE IF EXISTS `custom_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `custom_entry` (
  `custom_entry_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comp_flag` tinyint(1) NOT NULL,
  `del_flag` tinyint(1) NOT NULL,
  `end_dt` date DEFAULT NULL,
  `img_url` varchar(2048) DEFAULT NULL,
  `member_id` int(10) unsigned NOT NULL,
  `start_dt` date NOT NULL,
  `custom_challenge_id` bigint(20) unsigned NOT NULL,
  `comp_dt` date DEFAULT NULL,
  PRIMARY KEY (`custom_entry_id`),
  KEY `FKhhy0ywysf26rsswbs5r8hpons` (`custom_challenge_id`),
  CONSTRAINT `FKhhy0ywysf26rsswbs5r8hpons` FOREIGN KEY (`custom_challenge_id`) REFERENCES `custom_challenge` (`custom_challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_entry`
--

LOCK TABLES `custom_entry` WRITE;
/*!40000 ALTER TABLE `custom_entry` DISABLE KEYS */;
INSERT INTO `custom_entry` VALUES
(1,1,0,'2023-11-16','https://s3.ap-northeast-2.amazonaws.com/tori-bucket/17001026972068589506865563477854.jpg_514d921f-a522-4fd7-be09-bba2809e8f6a',3,'2023-11-16',1,'2023-11-16'),
(2,0,0,'2023-11-16',NULL,5,'2023-11-16',1,NULL),
(28,1,0,NULL,NULL,2,'2023-11-16',1,'2023-11-16'),
(32,0,0,'2023-11-16',NULL,6,'2023-11-16',1,NULL),
(40,0,0,'2023-11-16',NULL,2,'2023-11-16',1,NULL),
(42,0,0,'2023-11-16',NULL,2,'2023-11-16',1,NULL),
(44,0,0,'2023-11-16',NULL,6,'2023-11-16',3,NULL),
(46,0,0,'2023-11-16',NULL,1,'2023-11-16',3,NULL),
(47,1,0,NULL,NULL,3,'2023-11-16',3,'2023-11-16'),
(48,0,0,'2023-11-16',NULL,3,'2023-11-16',4,NULL),
(49,1,0,'2023-11-16','https://s3.ap-northeast-2.amazonaws.com/tori-bucket/%EC%82%B0%EC%B1%85.jpg_45722e55-815c-48d9-a630-2f3bda249290',3,'2023-11-16',3,'2023-11-16');
/*!40000 ALTER TABLE `custom_entry` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tori`@`%`*/ /*!50003 TRIGGER quest4_trigger
AFTER INSERT ON custom_entry
FOR EACH ROW
BEGIN
    DECLARE quest_already_comp INT;
    DECLARE existing_member_id INT;

    -- 새로 추가된 행의 member_id를 가져옵니다.
    SET existing_member_id = NEW.member_id;

    -- 새로 추가된 행의 member_id에 해당하는 quest 테이블의 comp_flag 값을 가져옵니다.
    SELECT comp_flag INTO quest_already_comp FROM quest WHERE member_id = existing_member_id AND quest_no = 4;

    IF quest_already_comp = 0 THEN
        -- 현재 업데이트된 값의 member_id와 오늘 날짜의 comp_dt로 custom_entry 테이블에서 열 개수 확인
        IF (SELECT member_id
            FROM custom_challenge
            WHERE custom_challenge_id = NEW.custom_challenge_id) <> existing_member_id THEN

            -- 해당 member_id를 가진 행의 comp_flag를 1로 업데이트합니다.
            UPDATE quest SET comp_flag = 1 WHERE member_id = existing_member_id AND quest_no = 4;
        END IF;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tori`@`%`*/ /*!50003 TRIGGER quest3_trigger
AFTER UPDATE ON custom_entry
FOR EACH ROW
BEGIN
    DECLARE existing_member_id INT;

    -- 새로 추가된 행의 member_id 값을 가져옵니다.
    SET existing_member_id = NEW.member_id;

    -- 현재 업데이트된 값의 member_id와 오늘 날짜의 comp_dt로 custom_entry 테이블에서 열 개수 확인
    IF (SELECT COUNT(*)
        FROM custom_entry
        WHERE member_id = existing_member_id
        AND comp_flag = 1
        AND comp_dt = NEW.comp_dt) = 3 THEN

           -- 해당 member_id를 가진 행의 comp_flag를 1로 업데이트합니다.
        UPDATE quest SET comp_flag = 1 WHERE member_id = existing_member_id and quest_no = 3;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `gift`
--

DROP TABLE IF EXISTS `gift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gift` (
  `gift_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`gift_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gift`
--

LOCK TABLES `gift` WRITE;
/*!40000 ALTER TABLE `gift` DISABLE KEYS */;
INSERT INTO `gift` VALUES
(1,'DOTORI'),
(2,'RANDOM_TICKET'),
(3,'TOTORI_TICKET');
/*!40000 ALTER TABLE `gift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `letter`
--

DROP TABLE IF EXISTS `letter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `letter` (
  `letter_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`letter_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letter`
--

LOCK TABLES `letter` WRITE;
/*!40000 ALTER TABLE `letter` DISABLE KEYS */;
INSERT INTO `letter` VALUES
(1,'오늘도 좋은 하루'),
(2,'할 수 있다!!!'),
(3,'긍정적으로 생각하면 좋은 일이 일어날거야'),
(4,'행운 가득한 하루~~'),
(5,'웃어보자!');
/*!40000 ALTER TABLE `letter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_asset`
--

DROP TABLE IF EXISTS `member_asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_asset` (
  `member_asset_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `asset_cnt` smallint(5) unsigned NOT NULL,
  `member_id` int(10) unsigned NOT NULL,
  `asset_id` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`member_asset_id`),
  KEY `FKhwojeeek3o2jwftdh8bth2iof` (`asset_id`),
  CONSTRAINT `FKhwojeeek3o2jwftdh8bth2iof` FOREIGN KEY (`asset_id`) REFERENCES `asset` (`asset_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_asset`
--

LOCK TABLES `member_asset` WRITE;
/*!40000 ALTER TABLE `member_asset` DISABLE KEYS */;
INSERT INTO `member_asset` VALUES
(1,0,1,4),
(2,300,1,1),
(3,5,1,2),
(4,0,1,3),
(5,0,2,4),
(6,37,2,1),
(7,0,2,2),
(8,0,2,3),
(9,0,3,4),
(10,2488,3,1),
(11,80,3,2),
(12,265,3,3),
(13,1,4,4),
(14,10,4,1),
(15,0,4,2),
(16,0,4,3),
(17,1,5,4),
(18,18,5,1),
(19,0,5,2),
(20,0,5,3),
(21,1,6,4),
(22,10,6,1),
(23,0,6,2),
(24,0,6,3),
(25,1,7,4),
(26,10,7,1),
(27,0,7,2),
(28,0,7,3),
(29,1,8,4),
(30,10,8,1),
(31,0,8,2),
(32,0,8,3);
/*!40000 ALTER TABLE `member_asset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_collection`
--

DROP TABLE IF EXISTS `member_collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_collection` (
  `member_collection_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `member_id` int(10) unsigned NOT NULL,
  `tori_collection_id` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`member_collection_id`),
  KEY `FKhym9gu722o75nvjqq0j2nr44o` (`tori_collection_id`),
  CONSTRAINT `FKhym9gu722o75nvjqq0j2nr44o` FOREIGN KEY (`tori_collection_id`) REFERENCES `tori_collection` (`tori_collection_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_collection`
--

LOCK TABLES `member_collection` WRITE;
/*!40000 ALTER TABLE `member_collection` DISABLE KEYS */;
INSERT INTO `member_collection` VALUES
(1,1,1),
(2,2,1),
(3,3,1),
(4,4,1),
(5,5,1),
(6,6,1),
(7,1,16),
(8,3,19),
(9,7,1),
(10,8,1);
/*!40000 ALTER TABLE `member_collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `notification_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `alarm_tm` time NOT NULL,
  `content` varchar(100) NOT NULL,
  PRIMARY KEY (`notification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo_challenge`
--

DROP TABLE IF EXISTS `photo_challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo_challenge` (
  `photo_challenge_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(20) NOT NULL,
  `keyword` varchar(10) NOT NULL,
  PRIMARY KEY (`photo_challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo_challenge`
--

LOCK TABLES `photo_challenge` WRITE;
/*!40000 ALTER TABLE `photo_challenge` DISABLE KEYS */;
INSERT INTO `photo_challenge` VALUES
(1,'오렌지 먹기','orange'),
(2,'침대 정리하기','bed'),
(3,'산책하며 길고양이 사진 찍기','cat'),
(4,'내가 가장 좋아하는 컵 자랑하기','cup'),
(5,'오늘의 깜찍한 나 인증하기','person');
/*!40000 ALTER TABLE `photo_challenge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place_challenge`
--

DROP TABLE IF EXISTS `place_challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `place_challenge` (
  `place_challenge_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(20) NOT NULL,
  `keyword` varchar(10) NOT NULL,
  PRIMARY KEY (`place_challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place_challenge`
--

LOCK TABLES `place_challenge` WRITE;
/*!40000 ALTER TABLE `place_challenge` DISABLE KEYS */;
INSERT INTO `place_challenge` VALUES
(1,'GS25 편의점 가기','GS25'),
(2,'CU 편의점 가기','CU'),
(3,'세븐일레븐 편의점 가기','세븐일레븐'),
(4,'공원 산책하기','공원'),
(5,'서점 가기','서점'),
(6,'타코야끼 먹기','타코야끼');
/*!40000 ALTER TABLE `place_challenge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quest`
--

DROP TABLE IF EXISTS `quest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quest` (
  `quest_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comp_flag` tinyint(1) DEFAULT 0,
  `member_id` int(10) unsigned NOT NULL,
  `reward_flag` tinyint(1) DEFAULT 0,
  `quest_no` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`quest_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quest`
--

LOCK TABLES `quest` WRITE;
/*!40000 ALTER TABLE `quest` DISABLE KEYS */;
INSERT INTO `quest` VALUES
(1,0,1,0,1),
(2,0,1,0,2),
(3,0,1,0,3),
(4,1,1,1,4),
(5,1,1,1,5),
(11,1,2,0,1),
(12,0,2,0,2),
(13,0,2,0,3),
(14,1,2,1,4),
(15,1,2,1,5),
(16,0,3,0,1),
(17,1,3,1,2),
(18,1,3,0,3),
(19,1,3,1,4),
(20,0,3,0,5),
(21,0,4,0,1),
(22,0,4,0,2),
(23,0,4,0,3),
(24,0,4,0,4),
(25,0,4,0,5),
(26,0,5,0,1),
(27,0,5,0,2),
(28,0,5,0,3),
(29,1,5,0,4),
(30,1,5,1,5),
(31,0,6,0,1),
(32,1,6,0,2),
(33,0,6,0,3),
(34,1,6,0,4),
(35,0,6,0,5),
(36,0,7,0,1),
(37,0,7,0,2),
(38,0,7,0,3),
(39,0,7,0,4),
(40,0,7,0,5),
(41,0,8,0,1),
(42,0,8,0,2),
(43,0,8,0,3),
(44,0,8,0,4),
(45,0,8,0,5);
/*!40000 ALTER TABLE `quest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `random_challenge`
--

DROP TABLE IF EXISTS `random_challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `random_challenge` (
  `random_challenge_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(5) NOT NULL,
  `challenge_dt` date NOT NULL,
  `challenge_id` int(10) unsigned NOT NULL,
  `comp_flag` tinyint(1) NOT NULL,
  `member_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`random_challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `random_challenge`
--

LOCK TABLES `random_challenge` WRITE;
/*!40000 ALTER TABLE `random_challenge` DISABLE KEYS */;
INSERT INTO `random_challenge` VALUES
(1,'PLACE','2023-11-15',2,0,18),
(2,'PLACE','2023-11-15',5,0,1),
(3,'PHOTO','2023-11-16',2,0,2),
(4,'PHOTO','2023-11-16',1,0,3),
(5,'PHOTO','2023-11-16',1,0,5),
(6,'PLACE','2023-11-16',2,0,1),
(7,'PHOTO','2023-11-16',1,0,6);
/*!40000 ALTER TABLE `random_challenge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report` (
  `report_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reason` tinyint(3) unsigned NOT NULL,
  `reported_id` int(10) unsigned NOT NULL,
  `reporter_id` int(10) unsigned NOT NULL,
  `custom_challenge_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`report_id`),
  KEY `FK43e4l3wrief44b0mhtrsbfiew` (`custom_challenge_id`),
  CONSTRAINT `FK43e4l3wrief44b0mhtrsbfiew` FOREIGN KEY (`custom_challenge_id`) REFERENCES `custom_challenge` (`custom_challenge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setting` (
  `member_id` int(10) unsigned NOT NULL,
  `notification_flag` tinyint(1) DEFAULT 1,
  `bgm_flag` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES
(1,1,1),
(2,1,1),
(3,1,1),
(4,1,1),
(5,1,1),
(6,1,1),
(7,1,1),
(8,1,1);
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thank_note`
--

DROP TABLE IF EXISTS `thank_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thank_note` (
  `thank_note_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(2100) NOT NULL,
  `create_dt` date NOT NULL,
  `member_id` int(10) unsigned NOT NULL,
  `continue_cnt` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`thank_note_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thank_note`
--

LOCK TABLES `thank_note` WRITE;
/*!40000 ALTER TABLE `thank_note` DISABLE KEYS */;
INSERT INTO `thank_note` VALUES
(1,'[\"오늘 하루 감사합니다\"]','2023-11-16',1,1);
/*!40000 ALTER TABLE `thank_note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tori_collection`
--

DROP TABLE IF EXISTS `tori_collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tori_collection` (
  `tori_collection_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `img_url` varchar(2048) NOT NULL,
  `limited_flag` tinyint(1) NOT NULL,
  `price` smallint(5) unsigned NOT NULL,
  `tori_nm` varchar(10) NOT NULL,
  PRIMARY KEY (`tori_collection_id`),
  UNIQUE KEY `UK_npoyr9e2eo74nebkp6hq7rl7r` (`tori_nm`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tori_collection`
--

LOCK TABLES `tori_collection` WRITE;
/*!40000 ALTER TABLE `tori_collection` DISABLE KEYS */;
INSERT INTO `tori_collection` VALUES
(1,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EA%B8%B0%EB%B3%B8%EB%8B%A4%EB%9E%8C%EC%A5%90.png',0,0,'다람쥐'),
(2,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EA%B3%B5%EB%A3%A1%EB%8B%A4%EB%9E%8C%EC%A5%90.png',1,1000,'공룡 다람쥐'),
(3,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%ED%8C%8C%EB%9E%80%EB%8B%A4%EB%9E%8C%EC%A5%90.png',1,1000,'파란 다람쥐'),
(4,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%ED%95%98%EC%96%80%EB%8B%A4%EB%9E%8C%EC%A5%90.png',1,1000,'하얀 다람쥐'),
(5,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EB%88%88%EC%82%AC%EB%9E%8C%EB%8B%A4%EB%9E%8C%EC%A5%90.png',1,1000,'눈사람 다람쥐'),
(6,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EB%B6%95%EC%96%B4%EB%B9%B5%EB%8B%A4%EB%9E%8C%EC%A5%90.png',1,1000,'붕어빵 다람쥐'),
(7,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EC%82%B0%ED%83%80%EB%8B%A4%EB%9E%8C%EC%A5%90.png',1,1000,'산타 다람쥐'),
(8,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EC%BB%B5%EC%BC%80%EC%9D%B4%ED%81%AC%EB%8B%A4%EB%9E%8C%EC%A5%90.png',1,1000,'컵케이크 다람쥐'),
(9,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%ED%8A%B8%EB%A6%AC%EB%8B%A4%EB%9E%8C%EC%A5%90.png',1,1000,'트리 다람쥐'),
(10,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EA%B5%B0%EC%B9%A8%EC%9D%B4%EC%8B%B9%EB%8F%84%EB%8A%94%EB%8B%A4%EB%9E%8C%EC%A5%90.png',0,300,'군침이싹도는 다람쥐'),
(11,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EA%B7%80%EB%8F%84%EB%A6%AC%EB%8B%A4%EB%9E%8C%EC%A5%90.png',0,300,'귀도리 다람쥐'),
(12,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EB%84%A5%ED%83%80%EC%9D%B4%EB%8B%A4%EB%9E%8C%EC%A5%90.png',0,300,'넥타이 다람쥐'),
(13,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EC%82%AC%EA%B3%BC%EB%8B%A4%EB%9E%8C%EC%A5%90.png',0,300,'사과 다람쥐'),
(14,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EC%8B%B8%ED%94%BC%EB%8B%A4%EB%9E%8C%EC%A5%90.png',0,300,'싸피 다람쥐'),
(15,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EC%95%88%EA%B2%BD%EB%8B%A4%EB%9E%8C%EC%A5%90.png',0,300,'안경 다람쥐'),
(16,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EC%96%91%EB%A8%B8%EB%A6%AC%EB%8B%A4%EB%9E%8C%EC%A5%90.png',0,300,'찜질방 다람쥐'),
(17,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EC%9C%99%ED%81%AC%ED%95%98%EB%8A%94%EB%8B%A4%EB%9E%8C%EC%A5%90.png',0,300,'윙크 다람쥐'),
(18,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EC%B4%88%EB%A1%B1%EC%B4%88%EB%A1%B1%EB%8B%A4%EB%9E%8C%EC%A5%90.png',0,300,'초롱초롱 다람쥐'),
(19,'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%ED%8E%AD%EA%B7%84%EB%A8%B8%EB%A6%AC%EB%9D%A0.png',0,300,'펭귄 다람쥐');
/*!40000 ALTER TABLE `tori_collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `totori`
--

DROP TABLE IF EXISTS `totori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `totori` (
  `totori_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(20) NOT NULL,
  `percent` float NOT NULL,
  PRIMARY KEY (`totori_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `totori`
--

LOCK TABLES `totori` WRITE;
/*!40000 ALTER TABLE `totori` DISABLE KEYS */;
INSERT INTO `totori` VALUES
(1,'DOTORI',0.5),
(2,'RANDOM_TICKET',0.3),
(3,'TOTORI_TICKET',0.195),
(4,'TORI',0.005);
/*!40000 ALTER TABLE `totori` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'businessdb'
--

--
-- Dumping routines for database 'businessdb'
--
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertCommonChallenge` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`tori`@`%` PROCEDURE `insertCommonChallenge`()
BEGIN
    DECLARE i INT DEFAULT 3;
        
    WHILE i <= 1003 DO
        INSERT INTO common_challenge(common_challenge_id, content, today_flag, unit)
          VALUES(i, concat('공동 도전 과제', i), 0, '[1, 50, 100]');
        SET i = i + 1;
    END WHILE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertCustomChallenge` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`tori`@`%` PROCEDURE `insertCustomChallenge`()
BEGIN
    DECLARE i INT DEFAULT 300;
        
    WHILE i <= 1300 DO
        INSERT INTO custom_challenge(custom_challenge_id , content, member_id, report_cnt, scrap_cnt, reg_dtm, display_flag)
          VALUES(i, concat('도전 과제',i), i, 0, 0, now(), 1);
		INSERT INTO custom_entry(custom_entry_id, comp_flag, del_flag, member_id, start_dt, custom_challenge_id)
		  VALUES(i, 0, 0, i, now(), i);
        SET i = i + 1;
    END WHILE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertLetter` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`tori`@`%` PROCEDURE `insertLetter`()
BEGIN
    DECLARE i INT DEFAULT 300;
        
    WHILE i <= 1300 DO
        INSERT INTO letter(letter_id, content)
          VALUES(i, concat('행운의 편지', i));
        SET i = i + 1;
    END WHILE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertMember` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`tori`@`%` PROCEDURE `insertMember`()
BEGIN
    DECLARE i INT DEFAULT 300;
        
    WHILE i <= 1300 DO
        INSERT INTO member(member_id, email, img_url, nickname, pw, profile)
          VALUES(i, concat('dummy', i, '@naver.com'), 'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EA%B8%B0%EB%B3%B8%EB%8B%A4%EB%9E%8C%EC%A5%90.png', concat('user', i), '$2a$10$7Sa4vHdaQsYN3/5xdkukOeiJrkD94o.cvnoCGWbrplPBgABMG34PW', 1);
        SET i = i + 1;
    END WHILE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertThank` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`tori`@`%` PROCEDURE `insertThank`()
BEGIN
    DECLARE i INT DEFAULT 300;
        
    WHILE i <= 1300 DO
        INSERT INTO thank_note(thank_note_id, content, create_dt, member_id, continue_cnt)
          VALUES(i, concat('감자합니다', i), now(), i, 1);
        SET i = i + 1;
    END WHILE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-16 17:08:33
CREATE DATABASE  IF NOT EXISTS `authdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `authdb`;
-- MariaDB dump 10.19  Distrib 10.11.5-MariaDB, for Win64 (AMD64)
--
-- Host: k9a402.p.ssafy.io    Database: authdb
-- ------------------------------------------------------
-- Server version	11.1.2-MariaDB-1:11.1.2+maria~ubu2204

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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `member_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(320) NOT NULL,
  `img_url` varchar(2048) NOT NULL,
  `nickname` varchar(8) NOT NULL,
  `pw` varchar(255) NOT NULL,
  `profile` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_mbmcqelty0fbrvxp1q58dn57t` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES
(1,'dkgusdkfk@gmail.com','https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EA%B8%B0%EB%B3%B8%EB%8B%A4%EB%9E%8C%EC%A5%90.png','빵빵덕','$2a$10$RYRFGqfZwynF/n0hQ0jxieFJxLasrLKKBqnR9uLwBqnHodWdqaVvy',1),
(2,'sma07174@naver.com','https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EA%B8%B0%EB%B3%B8%EB%8B%A4%EB%9E%8C%EC%A5%90.png','강낭콩','$2a$10$OqtqAvroiwAfRPQs73.hluVLklKQJIlPtoCRUsQkZEpcgHgAPm7qa',1),
(3,'kimriun27@gmail.com','https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%ED%8E%AD%EA%B7%84%EB%A8%B8%EB%A6%AC%EB%9D%A0.png','리나','$2a$10$EIbmhaN0bIkWPjKFOXkB8ORnGUnVL/dbAz0X3wDgqy76Dp2CMuR56',19),
(4,'dhrtnqls0535@naver.com','https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EA%B8%B0%EB%B3%B8%EB%8B%A4%EB%9E%8C%EC%A5%90.png','soob','$2a$10$.d/insLke..EYsik4d9StODHD97nbhstIey8cRdi0QHtLc5m3CRk2',1),
(5,'whdtmql1228@gmail.com','https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EA%B8%B0%EB%B3%B8%EB%8B%A4%EB%9E%8C%EC%A5%90.png','나김코치다','$2a$10$9/xtDxIMDQLk1JHgvSi2v.RBIYrkp/24v2PeV1xkfCCJs9QqqFU4K',1),
(6,'jieun21124@naver.com','https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EA%B8%B0%EB%B3%B8%EB%8B%A4%EB%9E%8C%EC%A5%90.png','ez=','$2a$10$F7uNWbhJRyKGYeP43lMc5.dvSZfSk0hi/0MTxddNZiiXqqTWY7KlC',1),
(7,'yebin0825@naver.com','https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EA%B8%B0%EB%B3%B8%EB%8B%A4%EB%9E%8C%EC%A5%90.png','t','$2a$10$Jmn6szTtPm50yN3HE0mIdObav.bCR8kuBIaIZfHioJn6WapxWp0eK',1),
(8,'lcj000107@naver.com','https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EA%B8%B0%EB%B3%B8%EB%8B%A4%EB%9E%8C%EC%A5%90.png','토리','$2a$10$BFrTHm8JX5y5o700qPr62ecV7ZHEYkB6HN8nAQAIJ5T.TOL6XvQjS',1);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tori`@`%`*/ /*!50003 TRIGGER `authdb`.`member_AFTER_INSERT` AFTER INSERT ON `member` FOR EACH ROW
BEGIN
    -- 변수 선언
    DECLARE done INT DEFAULT FALSE;
    DECLARE currentAssetId TINYINT(3) UNSIGNED;
    DECLARE currentAssetName VARCHAR(20);
    DECLARE i INT DEFAULT 1;
    DECLARE assetCursor CURSOR FOR SELECT asset_id, asset_nm FROM businessdb.asset;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- 첫 번째 로직: asset 데이터 처리
    OPEN assetCursor;
    read_loop: LOOP
        FETCH assetCursor INTO currentAssetId, currentAssetName;
        IF done THEN
            LEAVE read_loop;
        END IF;

        IF currentAssetName = 'DOTORI' THEN
            INSERT INTO businessdb.member_asset (asset_cnt, member_id, asset_id) VALUES (10, NEW.member_id, currentAssetId);
        ELSEIF currentAssetName = 'DAILY_TOTORI_TICKET' THEN
			INSERT INTO businessdb.member_asset (asset_cnt, member_id, asset_id) VALUES (1, NEW.member_id, currentAssetId);
        ELSE
            INSERT INTO businessdb.member_asset (asset_cnt, member_id, asset_id) VALUES (0, NEW.member_id, currentAssetId);
        END IF;
    END LOOP;
    CLOSE assetCursor;

    -- 두 번째 로직: quest 데이터 처리
    WHILE i <= 5 DO
        INSERT INTO businessdb.quest (member_id, quest_no) VALUES (NEW.member_id, i);
        SET i = i + 1;
    END WHILE;
    
    -- 세 번째 로직: member_collection 데이터 처리
    INSERT INTO businessdb.member_collection (member_id, tori_collection_id) VALUES (NEW.member_id, 1);
    
    -- 네 번째 로직: setting 데이터 처리
    INSERT INTO businessdb.setting (member_id, notification_flag, bgm_flag) VALUES (NEW.member_id, 1, 1);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'authdb'
--

--
-- Dumping routines for database 'authdb'
--
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertLetter` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`tori`@`%` PROCEDURE `insertLetter`()
BEGIN
    DECLARE i INT DEFAULT 300;
        
    WHILE i <= 1300 DO
        INSERT INTO letter(letter_id, content)
          VALUES(i, '행운의 편지');
        SET i = i + 1;
    END WHILE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertMember` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
DELIMITER ;;
CREATE DEFINER=`tori`@`%` PROCEDURE `insertMember`()
BEGIN
    DECLARE i INT DEFAULT 300;
        
    WHILE i <= 1300 DO
        INSERT INTO member(member_id, email, img_url, nickname, pw, profile)
          VALUES(i, concat('dummy', i, '@naver.com'), 'https://tori-bucket.s3.ap-northeast-2.amazonaws.com/%ED%8E%AD%EA%B7%84/%EA%B8%B0%EB%B3%B8%EB%8B%A4%EB%9E%8C%EC%A5%90.png', concat('user', i), '$2a$10$7Sa4vHdaQsYN3/5xdkukOeiJrkD94o.cvnoCGWbrplPBgABMG34PW', 1);
        SET i = i + 1;
    END WHILE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-16 17:08:33
