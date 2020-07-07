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
CREATE TABLE `main_tb` (
  `card_id` varchar(9) NOT NULL PRIMARY KEY,
  `name` text NOT NULL,
  `weight` float NOT NULL,
  `physical_education` boolean NOT NULL,
  `recommended_water_volume` float NOT NULL,
  `drinked_water_volume` float NOT NULL,
  `sick_status` boolean NOT NULL,
  `temperature` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `main_tb`
--

INSERT INTO `main_tb` (`card_id`, `name`, `weight`, `physical_education`, `recommended_water_volume`, `drinked_water_volume`, `sick_status`, `temperature`) VALUES
('M10802204', 'Mick', 68 , true, 1.5 , 0.6,true, 30.4);

-- --------------------------------------------------------

--
-- Table structure for table `pe_tb`
--

CREATE TABLE `pe_tb` (
  `id` varchar(9) NOT NULL PRIMARY KEY,
  `mon` boolean NOT NULL,
  `tue` boolean NOT NULL,
  `wed` boolean NOT NULL,
  `thu` boolean NOT NULL,
  `fri` boolean NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



--
-- Dumping data for table `pe_tb`
--

INSERT INTO `pe_tb` (`id`, `mon`, `tue`, `wed`, `thu`, `fri`) VALUES
('M10802204',false,false,true,true,false);

-- --------------------------------------------------------

-- --------------------------------------------------------

--
-- Table structure for table `pe_tb`
--


CREATE TABLE `sick_tb` (
  `id` varchar(9) NOT NULL PRIMARY KEY,
  `mon` boolean NOT NULL,
  `tue` boolean NOT NULL,
  `wed` boolean NOT NULL,
  `thu` boolean NOT NULL,
  `fri` boolean NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `sick_tb` (`id`, `mon`, `tue`, `wed`, `thu`, `fri`) VALUES
('M10802204',true,false,false,false,false);

