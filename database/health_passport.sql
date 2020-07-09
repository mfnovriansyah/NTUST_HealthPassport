/*
 * Author: Fahriza
 * Purpose: to Create and Use DataBase health_passport in Server
 * statement in MySQL.
 */
DROP DATABASE IF EXISTS `health_passport`;
CREATE DATABASE `health_passport`;
USE `health_passport`;

-- --------------------------------------------------------
--
-- Table structure for table `today_tb`
--
DROP TABLE IF EXISTS `record_tb`;
CREATE TABLE `record_tb` (
  `card_id` int NOT NULL PRIMARY KEY,
  `name` text NOT NULL,
  `weight` float NOT NULL,
  `physical_education` boolean NOT NULL,
  `recommended_water_volume` float NOT NULL,
  `drinked_water_volume` float NOT NULL,
  `sick_status` boolean NOT NULL,
  `class` int NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `record_tb`
--
INSERT INTO `record_tb` (`card_id`, `name`, `weight`, `physical_education`, `recommended_water_volume`, `drinked_water_volume`, `sick_status`, `class`,`date`) VALUES
('108022041', 'Mick', 68.1, false, 1.5 , 0.6,true, 101, '2020-07-07'),
('108022042', 'Muhamad', 68.6, false, 1.6 , 0.8,false, 101,'2020-07-07'),
('108022043', 'Fahriza', 69.6, true, 1.7 , 0.7,false, 102,'2020-07-07'),
('108022044', 'Steve', 69.4, false, 1.7 , 1.0,true, 103, '2020-07-07'),
('108022045', 'Jobs', 67.9, false, 1.5 , 1.1,false, 103, '2020-07-07'),
('108022046', 'Bill', 66.6, false, 1.6 , 0.7,false, 104, '2020-07-07'),
('108022047', 'Gates', 67.6, false, 1.8 , 0.8,false, 104, '2020-07-07'),
('108022048', 'Mark', 70.6, false, 1.8 , 0.9,false, 105, '2020-07-07'),
('108022049', 'Zuckerberg', 68.7, false, 1.6, 1.2,false, 105, '2020-07-07'),
('108022050', 'Novriansyah', 67.5, true, 1.6, 0.6,true, 102, '2020-07-07'),
('108022051', 'Messi', 68.1, false, 1.6 , 1.2,false, 101, '2020-07-07');
-- --------------------------------------------------------
--
-- Table structure for table `pe_tb`
--
DROP TABLE IF EXISTS `pe_tb`;
CREATE TABLE `pe_tb` (
  `class_id` int NOT NULL PRIMARY KEY,
  `day` text  NULL,
  `start` text  NULL,
  `end` text  NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pe_tb`
--
INSERT INTO `pe_tb` (`class_id`, `day`, `start`, `end`) VALUES
(101,"Monday","10.00","13.00"),
(102,"Tuesday","09.00","11.00"),
(103,"Wednesday","10.00","13.00"),
(104,"Thursday","10.00","13.00"),
(105,"Friday","09.00","11.00");
-- --------------------------------------------------------
--
-- Table structure for table `sick_tb`
--
DROP TABLE IF EXISTS `sick_tb`;
CREATE TABLE `sick_tb` (
  `card_id` int NOT NULL PRIMARY KEY,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- Dumping data for table `sick_tb`
--
INSERT INTO `sick_tb` (`card_id`, `date`) VALUES
('108022041','2020-07-07'),
('108022050','2020-07-07'),
('108022044','2020-07-07');