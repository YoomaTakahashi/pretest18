-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Oct 07, 2026 at 07:20 AM
-- Server version: 26.7.0
-- PHP Version: 8.3.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pretest18`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_indicate`
--

CREATE TABLE `tb_indicate` (
  `id_indicate` int NOT NULL,
  `id_topic` int NOT NULL,
  `name_indicate` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `detail_indicate` text,
  `point_indicate` int NOT NULL,
  `check_indicate` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_indicate`
--

INSERT INTO `tb_indicate` (`id_indicate`, `id_topic`, `name_indicate`, `detail_indicate`, `point_indicate`, `check_indicate`) VALUES
(1, 1, 'ระบบaiคุณภาพสูง', 'ประเมินความถูกต้อง ครบถ้วน และเป็นไปตามมาตรฐานของงานที่ได้รับมอบหมาย', 1, 'y'),
(2, 1, 'ความตรงต่อเวลา', 'ประเมินความสามารถในการดำเนินงานและส่งมอบงานภายในระยะเวลาที่กำหนด', 2, 'ืn');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_indicate`
--
ALTER TABLE `tb_indicate`
  ADD PRIMARY KEY (`id_indicate`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_indicate`
--
ALTER TABLE `tb_indicate`
  MODIFY `id_indicate` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
