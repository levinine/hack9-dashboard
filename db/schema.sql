CREATE DATABASE /*!32312 IF NOT EXISTS*/ `hack9-judge` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `hack9-judge`;
DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `content` varchar(150) NOT NULL,
  `country` enum('Serbia','Ukraine','Romania','Netherlands') DEFAULT NULL,
  `is_global` tinyint(4) NOT NULL,
  `expiration_time` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_54ce30caeb3f33d68398ea10376` (`user_id`),
  CONSTRAINT `FK_54ce30caeb3f33d68398ea10376` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `api_url` varchar(255) DEFAULT NULL,
  `score` decimal(10,3) NOT NULL DEFAULT '0.000',
  `cloud_provider` enum('aws','azure','gcp') NOT NULL,
  `region` varchar(100) NOT NULL,
  `status` enum('ready','scheduled','running') NOT NULL DEFAULT 'ready',
  `score_diversity` decimal(10,3) NOT NULL DEFAULT '0.000',
  `score_costs` decimal(10,3) NOT NULL DEFAULT '0.000',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `IDX_cf461f5b40cf1a2b8876011e1e` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `weight` int(11) NOT NULL,
  `is_score_descrete` smallint(6) NOT NULL,
  `endpoint` varchar(150) NOT NULL,
  `is_score_ascending` smallint(6) NOT NULL,
  `depends_on_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `test_name_UNIQUE` (`name`),
  UNIQUE KEY `IDX_bb6f40984281fc016e98cab260` (`name`),
  UNIQUE KEY `REL_139fca3810879eec5280d55396` (`depends_on_id`),
  CONSTRAINT `FK_139fca3810879eec5280d553963` FOREIGN KEY (`depends_on_id`) REFERENCES `test` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `test_execution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_execution` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` enum('scheduled','running','finished') NOT NULL DEFAULT 'scheduled',
  `api_url` varchar(255) DEFAULT NULL,
  `score` decimal(10,3) NOT NULL DEFAULT '0.000',
  `results` longtext,
  `cloud_provider` enum('aws','azure','gcp') NOT NULL DEFAULT 'aws',
  `region` varchar(15) DEFAULT NULL,
  `code` varchar(40) DEFAULT NULL,
  `team_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `test_execution_code_IDX` (`code`),
  KEY `status_IX` (`status`),
  KEY `FK_d11b7ac3bab63dde4020bf06293` (`team_id`),
  CONSTRAINT `FK_d11b7ac3bab63dde4020bf06293` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `test_to_test_execution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `test_to_test_execution` (
  `test_id` int(11) NOT NULL,
  `test_execution_id` int(11) NOT NULL,
  `score` decimal(10,3) NOT NULL DEFAULT '0.000',
  `output` longtext CHARACTER SET utf8mb4,
  PRIMARY KEY (`test_id`,`test_execution_id`),
  KEY `FK_c1715092299c93b94eaab612b52` (`test_execution_id`),
  CONSTRAINT `FK_c1715092299c93b94eaab612b52` FOREIGN KEY (`test_execution_id`) REFERENCES `test_execution` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e3f1b033b731587f5f0e4e2736b` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `team_id` int(11) NOT NULL,
  `type` enum('user','admin') NOT NULL DEFAULT 'user',
  `country` enum('Serbia','Ukraine','Romania','Netherlands') NOT NULL DEFAULT 'Serbia',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `FK_155dbc144ff2bd4713fdf1f6c77` (`team_id`),
  CONSTRAINT `FK_155dbc144ff2bd4713fdf1f6c77` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;