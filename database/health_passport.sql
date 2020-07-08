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
-- Table structure for table `main_tb`
--
DROP TABLE IF EXISTS `main_tb`;
CREATE TABLE `main_tb` (
  `card_id` int NOT NULL PRIMARY KEY,
  `name` text NOT NULL,
  `weight` float NOT NULL,
  `physical_education` boolean NOT NULL,
  `recommended_water_volume` float NOT NULL,
  `drinked_water_volume` float NOT NULL,
  `sick_status` boolean NOT NULL,
  `class` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `main_tb`
--
INSERT INTO `main_tb` (`card_id`, `name`, `weight`, `physical_education`, `recommended_water_volume`, `drinked_water_volume`, `sick_status`, `class`) VALUES
('108022041', 'Mick', 68.1, true, 1.5 , 0.6,true, 101);

-- --------------------------------------------------------
--
-- Table structure for table `pe_tb`
--
DROP TABLE IF EXISTS `pe_tb`;
CREATE TABLE `pe_tb` (
  `class_id` int NOT NULL PRIMARY KEY,
  `mon` varchar(8)  NULL,
  `tue` varchar(8)  NULL,
  `wed` varchar(8)  NULL,
  `thu` varchar(8)  NULL,
  `fri` varchar(8) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pe_tb`
--
INSERT INTO `pe_tb` (`class_id`, `mon`, `tue`, `wed`, `thu`, `fri`) VALUES
(101,null,null,'13001500',null,null),
(102,null,'09001100',null,null,null);
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
('10802204','2020-07-07'),
('10802212','2020-07-02'),
('10802215','2020-07-04');
-- --------------------------------------------------------
--
-- Table structure for table `record_tb`
--
DROP TABLE IF EXISTS `record_tb`;
CREATE TABLE `record_tb` (
  `card_id` int NOT NULL PRIMARY KEY,
  `name` text NOT NULL,
  `date` datetime NOT NULL,
  `recommended_water_volume` float NOT NULL,
  `drinked_water_volume` float NOT NULL,
  `class` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `record_tb`
--
INSERT INTO `record_tb` (`card_id`, `name`, `date`, `recommended_water_volume`, `drinked_water_volume`, `class`) VALUES
('10802204', 'Mick', '2020-07-07', 1.5 , 0.6, 101);

-- --------------------------------------------------------
