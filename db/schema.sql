CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `api_url` varchar(255) DEFAULT NULL,
  `score` decimal(8,3) NOT NULL DEFAULT '0.000',
  `cloud_provider` enum('aws','azure','gcp') NOT NULL,
  `region` varchar(100) NOT NULL,
  `status` enum('ready','scheduled','running') NOT NULL DEFAULT 'ready',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `test_execution` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` enum('scheduled','running','finished') NOT NULL DEFAULT 'scheduled',
  `api_url` varchar(255) DEFAULT NULL,
  `score` decimal(8,3) NOT NULL DEFAULT '0.000',
  `results` longtext,
  `team_id` int(11) NOT NULL,
  `cloud_provider` enum('aws','azure','gcp') DEFAULT NULL,
  `region` varchar(15) DEFAULT NULL,
  `code` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `test_execution_code_IDX` (`code`) USING BTREE,
  KEY `status_IX` (`status`),
  KEY `fk_test_execution_team_id` (`team_id`),
  CONSTRAINT `fk_test_execution_team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `team_id` int(11) DEFAULT NULL,
  `type` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_team_id_idx` (`team_id`),
  CONSTRAINT `fk_team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `weight` int(11) NOT NULL,
  `min_score` int(11) DEFAULT NULL,
  `max_score` int(11) DEFAULT NULL,
  `type` enum('functional', 'load') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `test_name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE team ADD score_diversity decimal(8,3) DEFAULT 0 NOT NULL;
ALTER TABLE team ADD score_costs decimal(8,3) DEFAULT 0 NOT NULL;
