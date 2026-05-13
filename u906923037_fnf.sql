-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 08, 2026 at 12:35 PM
-- Server version: 11.8.6-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u906923037_fnf`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` int(10) UNSIGNED NOT NULL,
  `activity_type_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `units` varchar(50) NOT NULL,
  `original_price` varchar(20) DEFAULT NULL,
  `discount` varchar(20) DEFAULT NULL,
  `offer_price` varchar(20) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(10) UNSIGNED NOT NULL,
  `create_audit_time` datetime NOT NULL,
  `update_audit_id` int(10) UNSIGNED DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(10) UNSIGNED DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL,
  `main_image` varchar(255) DEFAULT NULL,
  `landing_image` varchar(255) DEFAULT NULL,
  `gallery_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gallery_images`)),
  `videos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`videos`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `activity_type_id`, `name`, `duration`, `units`, `original_price`, `discount`, `offer_price`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`, `main_image`, `landing_image`, `gallery_images`, `videos`) VALUES
(1, 1, 'Standard Bowling', '30 min', '10 balls', '200', '10%', '179', 'Active', 1, '2026-01-26 13:46:33', 1, '2026-01-26 13:51:38', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 1, 'basic', '30 min', 'One', '400', '0%', '400', 'Active', 1, '2026-01-26 15:55:02', 1, '2026-01-26 15:55:11', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 1, 'Birtday', NULL, '', NULL, NULL, NULL, 'Active', 1, '2026-01-27 15:11:41', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 1, 'Test', NULL, '', NULL, NULL, NULL, 'Active', 1, '2026-01-27 15:35:05', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 1, 'Test', NULL, '', NULL, NULL, NULL, 'Active', 1, '2026-01-27 16:07:08', NULL, NULL, NULL, NULL, '697895533c258.png', NULL, NULL, NULL),
(6, 1, 'Test', NULL, '', NULL, NULL, NULL, 'Active', 1, '2026-01-27 16:13:18', NULL, NULL, NULL, NULL, '697896c5af5b1.png', NULL, NULL, NULL),
(7, 1, 'Test', NULL, '', NULL, NULL, NULL, 'Active', 1, '2026-01-27 16:21:02', NULL, NULL, NULL, NULL, '697898960876e.png', NULL, NULL, NULL),
(8, 1, 'Test', NULL, '', NULL, NULL, NULL, 'Active', 1, '2026-01-28 20:07:41', 1, '2026-02-05 11:33:08', NULL, NULL, '697a1f334e95b.png', '697a1f3419e08.jpg', NULL, NULL),
(9, 1, 'test', '50', '10', '400', '10%', '360', 'Active', 1, '2026-02-05 11:59:18', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 1, 'test', '', '4', '11', '0%', '11', 'Active', 1, '2026-02-05 12:00:49', 1, '2026-02-06 18:11:04', NULL, NULL, NULL, NULL, NULL, NULL),
(11, 1, 'helloooo', '11', '11', '11', '11%', '10', 'Active', 1, '2026-02-05 12:03:48', 1, '2026-02-05 12:13:08', 1, '2026-02-05 12:13:19', NULL, NULL, NULL, NULL),
(12, 1, 'hello', '11', '11', '9', '20%', '7', 'Active', 1, '2026-02-09 09:51:14', 1, '2026-02-10 18:20:19', NULL, NULL, NULL, NULL, NULL, NULL),
(13, 2, 'Ursula Barnes', 'Amet iure delectus', 'Molestias iure nostr', '158', '9%', '144', 'Active', 1, '2026-02-13 17:01:43', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 23, 'Dara Newton', 'Quae qui quis dicta ', 'Nisi maxime quo duci', '268', '89%', '29', 'Active', 1, '2026-02-13 17:02:36', 1, '2026-02-13 17:02:46', NULL, NULL, NULL, NULL, NULL, NULL),
(15, 1, 'test', '11', '10', '8989', '87%', '1169', 'Active', 1, '2026-02-13 17:14:41', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 1, 'Brooke Monroe', 'Saepe qui dolor illu', 'Repellendus Ut sapi', '327', '30%', '229', 'Active', 1, '2026-02-13 17:15:20', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `activities_banner`
--

CREATE TABLE `activities_banner` (
  `id` int(10) UNSIGNED NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime DEFAULT current_timestamp(),
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activities_banner`
--

INSERT INTO `activities_banner` (`id`, `image`, `title`, `description`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, '69676b1b73a31.png', 'Bumping Cars', 'RC Car Racing, Drift & Bumper Cars, Bowling Alley, Arcade Games—high laughter and casual thrills for everyone.', 'Active', 1, '2026-01-14 15:38:36', 1, '2026-01-14 15:41:41', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `activities_media`
--

CREATE TABLE `activities_media` (
  `id` int(10) UNSIGNED NOT NULL,
  `activity_type_id` int(10) UNSIGNED NOT NULL,
  `main_image` varchar(255) DEFAULT NULL,
  `landing_image` varchar(255) DEFAULT NULL,
  `gallery_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gallery_images`)),
  `videos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`videos`)),
  `video_label` longtext DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(10) UNSIGNED NOT NULL,
  `create_audit_time` datetime NOT NULL,
  `update_audit_id` int(10) UNSIGNED DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(10) UNSIGNED DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL,
  `links` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`links`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activities_media`
--

INSERT INTO `activities_media` (`id`, `activity_type_id`, `main_image`, `landing_image`, `gallery_images`, `videos`, `video_label`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`, `links`) VALUES
(1, 2, '699b38b5e4f3b.jpg', '699b38b847192.jpg', '[\"69e9ee576a97b.jpg\",\"69e9ee5815536.jpg\",\"69e9ee59a10de.jpg\",\"69e9ee5a45148.jpg\"]', '[{\"video\":\"69d38356c3395.mp4\",\"label\":\"Intro\"}]', 'Intro', 'Active', 1, '2026-01-27 15:48:13', 1, '2026-04-23 15:33:07', NULL, NULL, NULL),
(3, 1, '6980546fad94b.jpg', '697b6abe9cbeb.jpg', '[\"697b325899ce6.jpg\",\"697b32599f993.jpg\",\"697b325b10f74.jpg\",\"69805407311e9.png\",\"69805457303ab.png\"]', '[{\"video\":\"697b325c61511.mp4\",\"label\":\"Laborum In qui cons\"}]', '[\"Laborum In qui cons\"]', 'Active', 1, '2026-01-29 15:41:42', 1, '2026-02-10 14:25:55', 1, '2026-02-10 15:59:36', NULL),
(4, 1, '697b3264cd611.jpg', '697b3265e1be2.jpg', '[\"697b3268475e6.jpg\",\"697b3269546db.jpg\",\"697b326a9c669.jpg\"]', '[{\"video\":\"697b326dcdee5.mp4\",\"label\":\"[\\\"Laborum In qui cons\\\"]\"}]', '[\"Laborum In qui cons\"]', 'Active', 1, '2026-01-29 15:41:59', NULL, NULL, 1, '2026-01-29 15:59:03', NULL),
(5, 1, '69806b358288b.png', '69806b36355ab.jpg', '[\"69806b36b398f.png\",\"69806b378c1a8.png\",\"69806b382aab6.jpg\"]', '[{\"video\":\"69806b38c9d38.mp4\",\"label\":\"testings\"}]', '[\"test\"]', 'Active', 1, '2026-02-02 14:45:37', 1, '2026-02-05 21:43:14', 1, '2026-02-10 17:10:42', NULL),
(6, 1, '6984c743a26e6.jpg', '6984c7460318c.png', '[\"6984c7468917a.png\",\"6984c7473bcd6.jpg\",\"6984c748145d0.webp\"]', '[{\"video\":\"6984c748bf344.mp4\",\"label\":\"jdsjndlnmslk\"}]', '[\"testing6\"]', 'Active', 1, '2026-02-05 22:07:29', 1, '2026-02-05 22:10:50', 1, '2026-02-05 22:11:07', NULL),
(7, 16, '6995ff6f136da.png', '6995ffa5c81f5.png', '[\"6995f6e1589b9.png\",\"6995f714b5e83.png\",\"69ce4ac2edac3.jpg\"]', '[{\"video\":\"69cf8d2aacdbd.mp4\",\"label\":\"FNF Arena Bowling Alley\"}]', 'FNF Arena Bowling Alley', 'Active', 1, '2026-02-10 14:03:56', 1, '2026-04-03 15:19:32', NULL, NULL, '[\"https:\\/\\/youtu.be\\/5IOUpwvwxRI\"]'),
(8, 1, '698aedeb12517.png', '698aed707c45a.png', '[\"698aed71063df.png\",\"698aed7181734.png\",\"698aed7239126.png\",\"698aed734ee85.png\"]', '[{\"video\":\"698aed73c5a71.mp4\",\"label\":\"gtr\"}]', '[\"gtr\"]', 'Inactive', 1, '2026-02-10 14:03:56', 1, '2026-02-10 14:05:55', 1, '2026-02-10 14:07:43', NULL),
(9, 18, '69cfcce901c4c.jpg', '69cfcce9c62cd.jpg', '[\"6995f8bdb6611.png\",\"69cfccead4bc6.jpg\",\"69cfccec43789.jpg\"]', '[{\"video\":\"69cfcced162cf.mp4\",\"label\":\"FNF Arena Laser Tag\"}]', 'FNF Arena Laser Tag', 'Active', 1, '2026-02-11 18:12:43', 1, '2026-04-03 19:51:34', NULL, NULL, NULL),
(10, 19, '69cfbdd660372.jpg', '69d3f3d028ac2.jpg', '[\"69e9c6a569365.jpg\",\"69e9c6a6d6d8f.jpg\",\"69e9c7ffb576b.jpg\"]', '[{\"video\":\"69cfbdd7202e7.mp4\",\"label\":\"FNF Arena Softplay\"},{\"video\":\"69cfbdd8b7661.mp4\",\"label\":\"FNF Arena Trampoline\"},{\"video\":\"69cfbdda51f1a.mp4\",\"label\":\"FNF Arena Bull Ride\"}]', 'FNF Arena Softplay', 'Active', 1, '2026-02-11 18:55:29', 1, '2026-04-23 12:49:29', NULL, NULL, NULL),
(11, 19, '698c83436163f.jpg', '698c8344755af.jpg', '[\"698c83458616b.jpg\",\"698c8346c710c.jpg\",\"698c8347daa93.jpg\"]', '[{\"video\":\"698c8348d9c09.mp4\",\"label\":\"[\\\"Quo minus optio mag\\\"]\"}]', '[\"Quo minus optio mag\"]', 'Active', 1, '2026-02-11 18:55:29', NULL, NULL, 1, '2026-02-11 18:56:18', NULL),
(12, 19, '698c8345a83d9.jpg', '698c8346c8b3c.jpg', '[\"698c83480ed27.jpg\",\"698c8349518ed.jpg\",\"698c834a56d31.jpg\"]', '[{\"video\":\"698c834b49a81.mp4\",\"label\":\"[\\\"Quo minus optio mag\\\"]\"}]', '[\"Quo minus optio mag\"]', 'Active', 1, '2026-02-11 18:55:32', NULL, NULL, 1, '2026-02-11 18:56:23', NULL),
(13, 22, '698c91d1cb629.jpg', '69d3f346ea628.jpg', '[\"698c91d4c1666.jpg\",\"69d3f3481df1a.jpg\",\"69d3f348dbfef.jpg\"]', '[{\"video\":\"69d3f34993b70.mp4\",\"label\":\"Paintball Arena\"}]', 'Paintball Arena', 'Active', 1, '2026-02-11 19:57:39', 1, '2026-04-06 23:24:19', NULL, NULL, NULL),
(14, 25, '699b3f210cb23.jpg', '698c98ecea3f6.jpg', '[\"699b3f2230e9c.jpg\",\"69d3ea36e6d05.jpg\"]', '[{\"video\":\"69d3ea385da4e.mp4\",\"label\":\"Zipline Roller Coaster\"}]', 'Zipline Roller Coaster', 'Active', 1, '2026-02-11 20:27:53', 1, '2026-04-07 14:58:56', NULL, NULL, NULL),
(15, 25, '698c98eca4bcb.jpg', '698c98ed9cc11.jpg', '[\"698c98eeab4f4.jpg\",\"698c98efa5c78.jpg\",\"698c98f0a258b.jpg\"]', '[{\"video\":\"698c98f14929a.mp4\",\"label\":\"[\\\"Harum Nam laboriosam\\\"]\"}]', '[\"Harum Nam laboriosam\"]', 'Active', 1, '2026-02-11 20:27:54', NULL, NULL, 1, '2026-02-11 20:28:00', NULL),
(16, 24, '69e9e9e81b9a0.jpg', '69e9d004d286c.jpg', '[\"69e9ea3a85448.jpg\",\"69e9ea3b7ca95.jpg\",\"69e9ea3c25db0.jpg\",\"69ea459d75036.jpg\"]', '[{\"video\":\"69d3e7503a164.mp4\",\"label\":\"Shooting Range, Target Zone at FNF Arena\"}]', 'Shooting Range, Target Zone at FNF Arena', 'Active', 1, '2026-02-12 11:36:04', 1, '2026-04-23 21:45:26', NULL, NULL, NULL),
(17, 24, '698d6dc88a012.jpg', '698d6dc939ab9.jpg', '[\"698d6dca1bc8b.jpg\",\"698d6dcb3601f.jpg\",\"698d6dcc1278a.jpg\"]', '[{\"video\":\"698d6dcce6c17.mp4\",\"label\":\"[\\\"jb\\\"]\"}]', '[\"jb\"]', 'Active', 1, '2026-02-12 11:36:05', NULL, NULL, 1, '2026-02-12 11:36:19', NULL),
(18, 24, '698d6dccac685.jpg', '698d6dcdcb070.jpg', '[\"698d6dcecff5f.jpg\",\"698d6dcff1ee7.jpg\",\"698d6dd094e42.jpg\"]', '[{\"video\":\"698d6dd19c2d7.mp4\",\"label\":\"[\\\"jb\\\"]\"}]', '[\"jb\"]', 'Active', 1, '2026-02-12 11:36:10', NULL, NULL, 1, '2026-02-12 11:36:26', NULL),
(19, 27, '69d3782c3f613.jpg', '69d3782d62fa1.jpg', '[\"69d3782e3d2fa.jpg\",\"69d3782f0a5a9.jpg\"]', '[{\"video\":\"69d3e5447453a.mp4\",\"label\":\"Sky Roller FNF Arena\"}]', 'Sky Roller FNF Arena', 'Active', 1, '2026-02-12 11:49:03', 1, '2026-04-06 22:24:29', NULL, NULL, NULL),
(20, 27, '698d70d539045.jpg', '698d70d652f4a.jpg', '[\"698d70d6e4892.jpg\",\"698d70d7d2589.jpg\",\"698d70d963ef7.jpg\"]', '[{\"video\":\"698d70da6b730.mp4\",\"label\":\"[\\\"demo\\\"]\"}]', '[\"demo\"]', 'Active', 1, '2026-02-12 11:49:07', NULL, NULL, 1, '2026-02-12 11:49:38', NULL),
(21, 23, '698d71cdb3054.jpg', '69cf6c2d9309d.jpg', '[\"698d71d0d00d9.jpg\",\"69e9cb37e4b3a.jpg\",\"69e9cb38a4682.jpg\"]', NULL, NULL, 'Active', 1, '2026-02-12 11:53:17', 1, '2026-04-23 13:03:13', NULL, NULL, '[\"https:\\/\\/youtu.be\\/2Rs9Nc65-jY?si=UcDa53yopulSQZxp\",\"https:\\/\\/youtu.be\\/eHNJMzzFXBA?si=IChPaGA0XvjHnegI\"]'),
(22, 20, '699b4492762e7.jpg', '699b4494d7c98.jpg', '[\"699b44e528a60.jpg\",\"699b44e73569f.jpg\",\"699b44e900311.jpg\"]', '[{\"video\":\"69d3e4a71226d.mp4\",\"label\":\"Arcade Zone FNF Arena\"}]', 'Arcade Zone FNF Arena', 'Active', 1, '2026-02-12 11:59:19', 1, '2026-04-06 22:21:54', NULL, NULL, NULL),
(23, 28, '698d744777111.jpg', '698d7448b3fb7.jpg', '[\"698d744a92807.jpg\",\"698d744c188ea.jpg\",\"698d744d227db.jpg\"]', '[{\"video\":\"698d744e6fda0.mp4\",\"label\":\"[\\\"demo\\\"]\"}]', '[\"demo\"]', 'Active', 1, '2026-02-12 12:03:51', NULL, NULL, 1, '2026-02-12 14:22:41', NULL),
(24, 28, '69cf6b9874a32.jpg', '69cf6b998688e.jpg', '[\"69ce50d13fcb2.jpg\",\"69ce51797fe39.jpg\",\"69ce517ac4f77.jpg\"]', NULL, NULL, 'Active', 1, '2026-02-12 12:04:07', 1, '2026-04-07 14:52:47', NULL, NULL, '[\"https:\\/\\/www.youtube.com\\/watch?v=VZqZo-NBRvc\"]'),
(25, 26, '69d376365e835.jpg', '699b3fa539366.jpg', '[\"699b3fa7db259.jpg\",\"699b3fab5be62.jpg\",\"69d3763709bc8.jpg\",\"69d3763841f0b.jpg\"]', NULL, 'Sky Cycle FNF Arena', 'Active', 1, '2026-02-12 12:05:20', 1, '2026-04-06 15:09:32', NULL, NULL, NULL),
(26, 26, '698ec78704b0f.jpg', '698ec7881c19d.jpg', '[\"698ec788d53e6.jpg\",\"698ec78972857.jpg\",\"698ec78a7ef96.jpg\"]', '[{\"video\":\"698ec78bceee2.mp4\",\"label\":\"[\\\"Quis quis aspernatur\\\"]\"}]', '[\"Quis quis aspernatur\"]', 'Inactive', 1, '2026-02-13 12:11:17', 1, '2026-02-13 12:14:05', 1, '2026-02-13 12:14:08', NULL),
(27, 28, '69ce4b9ba60dd.jpg', '69ce4b9c3769f.jpg', '[\"69ce4b9d84b1e.jpg\",\"69ce4b9e22ab9.jpg\",\"69ce4bffb17d7.jpg\"]', '[{\"video\":\"69ce4d8d38658.mp4\",\"label\":\"3\"}]', '[\"Must be at least 8 years old\", \"Height requirement: minimum 4 feet\"]', 'Active', 1, '2026-04-02 15:15:07', 1, '2026-04-02 16:35:49', 1, '2026-04-02 21:20:19', NULL),
(31, 2, '69cf98f3e7b85.jpg', '69cf98f5618b1.jpg', '[\"69cf98f634dfa.jpg\",\"69cf98f6cb727.jpg\"]', '[{\"video\":\"69cf98f765187.mp4\",\"label\":\"Go-karting at FNF Arena\"}]', 'Go-karting at FNF Arena', 'Active', 1, '2026-04-02 21:32:53', 1, '2026-04-06 15:18:03', 1, '2026-04-02 21:20:19', '[\"https:\\/\\/youtu.be\\/kcf42z8JoLU?si=PhILO16wRME38rkC\"]'),
(32, 28, '69cf5a7c874f9.jpeg', '69cf5a7d48794.jpg', '[\"69cf5a7dca02b.jpeg\",\"69cf5a7e6af06.jpg\",\"69cf5a7eeffe6.jpeg\"]', NULL, NULL, 'Inactive', 1, '2026-04-03 11:43:20', 1, '2026-04-06 22:13:19', NULL, NULL, '[\"https:\\/\\/youtu.be\\/g5RNv4Pgtfc\"]'),
(35, 27, '69d3759641c48.jpg', '69d375974173f.jpg', '[\"69d37598921e3.jpg\",\"69d37599487e6.jpg\",\"69d37599dbbb8.jpg\"]', '[{\"video\":\"69d3e2648d3cd.mp4\",\"label\":\"Sky Roller\"}]', 'Sky Roller', 'Active', 1, '2026-04-06 09:55:50', 1, '2026-04-06 22:12:14', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `activity_details`
--

CREATE TABLE `activity_details` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` varchar(150) NOT NULL,
  `feature_1` varchar(30) NOT NULL,
  `feature_2` varchar(30) NOT NULL,
  `feature_3` varchar(30) NOT NULL,
  `feature_4` varchar(30) NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_details`
--

INSERT INTO `activity_details` (`id`, `activity_id`, `title`, `description`, `feature_1`, `feature_2`, `feature_3`, `feature_4`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, 'High-Speed Racing Experience', 'Experience the thrill...', 'Professional Track', 'Safety Equipment', 'Expert Supervision', 'Time Recording', 'Active', 1, '2026-01-23 11:13:32', 1, '2026-01-28 17:28:56', 1, '2026-02-10 16:00:59'),
(2, 1, 'High-Speed Racing Experience', 'Experience the thrill of high-speed racing on our professional go-kart track with state-of-the-art s...', 'Professional Track', 'Safety Equipment', 'Expert Supervision', 'Time Recording', 'Active', 1, '2026-01-27 10:55:20', NULL, NULL, 1, '2026-01-27 15:21:32'),
(3, 1, 'High-Speed Racing Experience', 'Experience the thrill of high-speed racing on our professional go-kart track with state-of-the-art s...', 'Professional Track', 'Safety Equipment', 'Expert Supervision', 'Time Recording', 'Active', 1, '2026-01-27 14:47:50', NULL, NULL, 1, '2026-01-27 14:48:24'),
(4, 1, 'High-Speed Racing Experience', 'Experience the thrill of high-speed racing on our professional go-kart track with state-of-the-art s...', 'Professional Track', 'Safety Equipment', 'Expert Supervision', 'Time Recording', 'Active', 1, '2026-01-27 18:20:55', NULL, NULL, 1, '2026-01-27 18:24:17'),
(5, 2, 'High-Speed Racing Experience', 'Experience the thrill of high-speed racing on our professional go-kart track with state-of-the-art s...', 'Professional Track', 'Safety Equipment', 'Expert Supervision', 'Time Recording', 'Active', 1, '2026-01-27 18:51:59', 1, '2026-01-28 15:12:10', 1, '2026-01-28 15:20:54'),
(6, 1, 'aa', 'aa', 'aa', 'aa', 'aa', 'aa', 'Inactive', 1, '2026-01-28 17:29:19', NULL, NULL, 1, '2026-02-10 14:32:57'),
(7, 1, 'aa', 'aaa', 'aa', 'aa', 'aa', 'aa', 'Active', 1, '2026-01-28 17:32:42', NULL, NULL, 1, '2026-01-28 17:34:04'),
(8, 1, 'aa', 'aa', 'aa', 'aa', 'aa', 'aa', 'Inactive', 1, '2026-01-28 17:34:47', 1, '2026-02-12 14:31:41', 1, '2026-02-18 22:41:44'),
(9, 1, 'aa', 'aa', 'aa', 'aa', 'aa', 'aa', 'Active', 1, '2026-01-28 17:40:40', 1, '2026-02-04 21:36:54', 1, '2026-02-04 21:37:00'),
(10, 1, 'aa', 'aa', 'aa', 'aa', 'aa', 'aa', 'Active', 1, '2026-01-28 17:42:28', NULL, NULL, 1, '2026-01-28 18:09:18'),
(11, 1, 'a', 'aa', 'aa', 'aa', 'aa', 'aa', 'Inactive', 1, '2026-01-28 17:44:29', NULL, NULL, 1, '2026-01-28 18:08:40'),
(12, 1, 'aa', 'aa', 'aa', 'aa', 'aa', 'aa', 'Active', 1, '2026-01-28 17:49:21', NULL, NULL, 1, '2026-01-28 18:08:35'),
(13, 1, 'attt', 'ee', 'ee', 'ee', 'ee', 'ee', 'Active', 1, '2026-01-28 17:51:27', NULL, NULL, 1, '2026-01-28 18:08:26'),
(16, 8, 'eeeeeeeeeeeeeeee', 'srgrgrwegvrewgbwr', 'aa', 'aa', 'aa', 'aa', 'Active', 1, '2026-02-04 12:37:10', NULL, NULL, 1, '2026-02-04 12:39:14'),
(17, 8, 'ddddddddddd', 'efwergfvwr', 'aa', 'aa', 'aa', 'aa', 'Active', 1, '2026-02-04 12:39:05', 1, '2026-02-04 12:42:34', 1, '2026-02-04 12:42:37'),
(19, 1, 'Molestiae facere exp', 'Sed nisi cupiditate ab consequatur deserunt eveniet corporis sit distinctio A assumenda nobis minus quasi debitis fuga Harum molestiae', 'Atque delectus mini', 'In qui eos maiores c', 'Debitis voluptas ita', 'Aut omnis mollit exp', 'Active', 1, '2026-02-10 14:29:04', NULL, NULL, 1, '2026-02-10 15:59:59'),
(20, 16, 'We operate Brunswick Bowling Lanes', 'Powered by trusted Brunswick innovation, where every shot delivers championship-level accuracy and performance.', 'Smooth', 'Consistent', 'Precision', 'Technology', 'Active', 1, '2026-02-10 14:29:40', 1, '2026-02-18 22:54:04', NULL, NULL),
(21, 2, 'Eaque non amet elig', 'Quo et excepturi sed in facere consequatur Quis eos dolor officiis iusto quasi sequi', 'Pariatur Ut ut eos', 'Nam corrupti adipis', 'Vel in rerum iure es', 'A ut vel ut irure to', 'Active', 1, '2026-02-11 13:03:12', NULL, NULL, 1, '2026-02-12 14:31:35'),
(22, 2, 'Eaque ut et laboris ', 'Proident distinctio Est qui assumenda doloribus facilis debitis reprehenderit aute voluptatem mollit provident blanditiis tempor occaecat consequa', 'Est minima delectus', 'Anim magna saepe del', 'Dolor molestiae faci', 'Placeat autem conse', 'Active', 1, '2026-02-11 13:03:32', NULL, NULL, 1, '2026-02-12 14:31:59'),
(23, 24, 'Target Zone – Aim. Shoot. Score.', 'Test your focus and precision in our exciting Target Zone challenge. Perfect for friends and corporate teams, it’s all about accuracy, controlling', 'Precision Aim Game', 'Skill-BasedChallenge', 'Safe Shooting Setup', 'Fun Group Activity', 'Active', 1, '2026-02-11 14:57:50', 1, '2026-02-22 23:40:23', NULL, NULL),
(24, 25, 'Exercitation illo do', 'Sed ad sed reprehenderit quos modi sint dolor quia eum cillum ducimus sunt', 'Repudiandae ut ut ad', 'Quo ducimus laborum', 'Quis quis fugiat qui', 'Deserunt velit rati', 'Active', 1, '2026-02-11 14:57:55', 1, '2026-02-12 08:22:21', 1, '2026-02-12 14:31:23'),
(25, 2, 'Twin Kart – Race Together', 'Enjoy double the thrill with our Twin Kart experience. Perfect for friends, couples, or parent-child duos, it delivers speed, safety, and shared race', '270ccPowerful Engine', 'Dual Seat Racing', 'Smooth Race Track', 'Safe & Stable Ride', 'Active', 1, '2026-02-11 14:57:59', 1, '2026-02-22 22:24:33', NULL, NULL),
(26, 28, 'adcaecfd', 'efersfwsrwsrefwrfw', 'aa', 'aa', 'aa', 'aa', 'Active', 1, '2026-02-11 16:59:28', NULL, NULL, 1, '2026-02-11 17:03:39'),
(27, 18, 'Ut id sint fuga Cu', 'Laborum In et quibusdam libero exercitationem incididunt quis sunt sed sit cumque modi vitae ullamco ut ex', 'Proident asperiores', 'Incididunt sit sit', 'Nemo quisquam archit', 'Rem similique conseq', 'Active', 1, '2026-02-11 18:24:34', NULL, NULL, 1, '2026-02-12 14:31:15'),
(28, 18, 'FOG - Future of Gaming', 'Engage in an immersive battle with one of the world\'s most futuristic Laser Tag equipments and an arena that feels like a real life movie set!  ', 'FOG', 'Laser', 'Tag', 'arena', 'Active', 1, '2026-02-11 18:25:22', 1, '2026-02-18 23:45:06', NULL, NULL),
(29, 19, 'Trampoline Fun Arena', 'Bounce into excitement with our high-energy trampoline zone designed for safe jumping, active play, and nonstop fun for all ages.', 'High-Quality Trampol', 'Safe Padded Surround', 'Energy-Filled Zone', 'Monitored Activitys', 'Active', 1, '2026-02-11 19:06:32', 1, '2026-02-22 23:19:39', NULL, NULL),
(30, 22, 'Dolore dolore et ver', 'Excepturi in eligendi fugit aut iusto rerum quisquam voluptates iure beatae dicta reprehenderit do perferendis commodo omnis', 'In aliquid itaque ac', 'In sint distinctio', 'Eius eiusmod archite', 'Quam est Nam animi ', 'Active', 1, '2026-02-11 20:05:03', 1, '2026-02-11 20:05:12', 1, '2026-02-12 14:30:17'),
(31, 22, 'Paintball Arena – Battle Zone', 'Gear up for an action-packed paintball experience filled with strategy, teamwork, and adrenaline as you compete in an exciting combat-style arena.\n', 'Tactical Battle Zone', 'Protective Gear', 'Team Play Action', 'Safe Play Area', 'Active', 1, '2026-02-11 20:05:21', 1, '2026-02-22 23:37:58', NULL, NULL),
(32, 25, 'Dolorem excepteur co', 'Error reiciendis sunt laboris consequatur odit quis quae omnis reiciendis eiusmod', 'Est ut dolor repreh', 'Non quia impedit ea', 'Veniam consectetur', 'Labore placeat rem ', 'Active', 1, '2026-02-11 20:28:38', NULL, NULL, 1, '2026-02-12 14:30:39'),
(33, 25, 'Odit voluptas dolore', 'Maxime ducimus architecto placeat in molestias eos et exercitation quo', 'Deleniti perferendis', 'Tempor enim minim co', 'Quas numquam et temp', 'Et laudantium ut no', 'Active', 1, '2026-02-11 20:28:50', NULL, NULL, 1, '2026-02-12 14:30:09'),
(34, 25, 'Qui rem necessitatib', 'Voluptas ut qui sunt ipsam exercitation error nesciunt consequatur Id sit aliquam', 'Nobis et quia nisi u', 'Qui omnis omnis exce', 'Et magna proident e', 'Velit omnis cum et ', 'Active', 1, '2026-02-11 20:31:51', NULL, NULL, 1, '2026-02-22 23:07:15'),
(35, 26, 'Sky Cycle – Pedal Above the Ground', 'Ride high and feel the thrill as you cycle across an elevated track, combining balance, adventure, and excitement in a safe aerial experience.', 'Elevated Cycling', 'Safe Harness System', 'Fun Balance Challeng', 'Smooth Track Design', 'Active', 1, '2026-02-12 07:23:17', 1, '2026-02-22 23:41:57', NULL, NULL),
(36, 27, 'Sky Roller – Glide the Sky Thrill', 'Experience the excitement of rolling high above the ground on a suspended track, combining speed, balance, and adventure in one thrilling ride.', 'Elevated Roller Ride', 'Secure Harness Fit', 'Smooth Track Glide', 'Fun Adventure Ride', 'Active', 1, '2026-02-12 07:39:06', 1, '2026-02-22 23:43:38', NULL, NULL),
(37, 28, 'Rocket Ejection – Launch Into the Sky', 'Feel the ultimate adrenaline rush as you’re propelled high into the air with powerful force and smooth control—an electrifying thrill ride ', 'High-Altitude Launch', 'Single Ride Option', 'Secure Safety Harnes', 'Controlled Descent', 'Active', 1, '2026-02-12 07:57:18', 1, '2026-02-22 23:44:52', NULL, NULL),
(38, 23, 'Drifters  – Spin, Drift & Smash Fun', 'Experience thrilling spins and playful collisions in our electric drifter and bumper cars arena—perfect for high-energy fun with friends and family.', '360° Drift Action', 'Safe Bumper Design', 'Smooth Ride Control', 'Fun Group Activity', 'Active', 1, '2026-02-12 08:05:44', 1, '2026-04-23 13:01:02', NULL, NULL),
(39, 20, 'Arcade Zone – Play. Compete. Win.', 'Step into a vibrant world of exciting arcade games featuring skill challenges, racing simulators, and interactive fun for all age groups.', 'Wide Range of Arcade', 'Latest Interactive', 'Fun for All Age ', 'Great bonding ', 'Active', 1, '2026-02-12 17:08:04', 1, '2026-02-22 23:27:18', NULL, NULL),
(40, 19, 'Soft Play Zone', 'A colorful, safe, and fun-filled play area designed for kids to climb, crawl, slide, and explore while building confidence and motor skills.', 'Soft-Padded Play Are', 'Safe Slides', 'Kid-Friendly', 'Supervised Play Zone', 'Active', 1, '2026-02-13 10:27:14', 1, '2026-02-22 23:18:43', NULL, NULL),
(41, 19, 'Voluptates omnis fac', 'Ullamco exercitationem incididunt vitae sed dolores non voluptatem Fuga', 'Deserunt est ipsum ', 'Dolorem vel aut perf', 'Mollitia modi eu del', 'Tempor perferendis m', 'Active', 1, '2026-02-13 10:27:31', NULL, NULL, 1, '2026-02-22 23:16:58'),
(42, 2, 'Est molestiae cupidi', 'Eaque cumque maxime pariatur Et vel distinctio Debitis sint et exercitationem enim quo voluptatibus dolores voluptas ut eum', 'Aut fugit officiis ', 'Odit eiusmod dicta a', 'Aut molestiae velit', 'Eu nihil eum fuga N', 'Inactive', 1, '2026-02-13 17:51:56', NULL, NULL, 1, '2026-02-16 15:24:15'),
(43, 2, 'Single Kart – Feel the Real Racing Thrill', 'Experience the adrenaline rush of solo racing in our high-performance single karts. Built for speed, control, and safety, it’s pure motorsports', '200ccPowerful Engine', 'Build for Speed', 'Smooth Race Track', 'High-Grip Surface', 'Active', 1, '2026-02-16 15:25:09', 1, '2026-02-22 22:24:43', NULL, NULL),
(44, 18, 'Exciting Laser Tag for Everyone', 'At FNF Arena, safety comes first without compromising on fun. Our lightweight laser tag gear is suitable for kids and adults', 'Kids', 'Adults', 'Safe', 'Gear', 'Active', 1, '2026-02-16 15:30:55', 1, '2026-02-18 23:41:26', NULL, NULL),
(45, 18, 'Gaming Live Score Updates', 'FNF Arena’s live scoring tracks every tag and hit in real time. Play solo or team up, monitor your stats, and climb the leaderboard each match.', 'Live', 'Score', 'Monitor', 'Stats', 'Active', 1, '2026-02-16 15:31:21', 1, '2026-02-18 23:40:17', NULL, NULL),
(46, 16, 'Perfected Lanes. Exceptional Play', 'Precision lane care ensures perfect oil patterns and smooth rolls, delivering a consistent, high-performance bowling experience every time', 'Smooth', 'Delivering', 'Consistent', 'high', 'Active', 1, '2026-02-18 22:56:22', NULL, NULL, NULL, NULL),
(47, 25, 'Zip Line Roller Coaster ', 'Experience the thrill of height as you glide, twist, and race through elevated tracks—an adrenaline-packed ride built for pure excitement.', 'High Elevated Ride', 'Secure Harness', 'Smooth Curved', 'Exciting Twists', 'Active', 1, '2026-02-22 23:07:00', 1, '2026-04-03 20:50:48', NULL, NULL),
(48, 19, 'Bull Ride - Ultimate Balance Challenge', 'Hold tight and test your balance on our thrilling mechanical bull ride. A fun and safe challenge that brings rodeo-style excitement to every event.', 'Adjustable Speed', 'Soft Padded', 'Safe Landing zone', 'Fun and Challenging ', 'Active', 1, '2026-02-22 23:21:14', NULL, NULL, NULL, NULL),
(49, 23, 'Bumping Cars – Spin, Slide & Drift Fun', 'Experience controlled drifting and smooth spins in our electric drifters arena—perfect for adrenaline-filled fun with friends and family.', '360° Drift Action', 'Advanced Safety', 'Smooth Ride Control', 'Perfect for Groups', 'Active', 1, '2026-04-23 12:57:51', 1, '2026-04-23 13:00:53', NULL, NULL),
(50, 2, 'Track', 'Track details ', '650', 'turns', 'length', 'wide', 'Active', 1, '2026-04-23 15:23:37', NULL, NULL, 1, '2026-04-23 15:24:50'),
(51, 2, 'Go-Karting Track – Built for Real Racing Action', 'Experience a professionally designed track that delivers speed, control, and pure racing excitement. Every corner, straight, and surface is engineered', 'High-Grip Surface', 'Wide Track Design', 'Smooth & Fast', 'Night Racing Lights', 'Active', 1, '2026-04-23 15:30:07', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `activity_features`
--

CREATE TABLE `activity_features` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `short_description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `activity_gallery`
--

CREATE TABLE `activity_gallery` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_gallery`
--

INSERT INTO `activity_gallery` (`id`, `activity_id`, `image`, `create_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, '6972231ea8121.jpg', NULL, NULL, NULL),
(2, 1, '6972231f8a947.jpg', NULL, NULL, NULL),
(3, 2, '69722f6b4c6c1.jpg', NULL, NULL, NULL),
(4, 2, '69722f6c26f2f.jpg', NULL, NULL, NULL),
(5, 8, '697a1f3547dba.jpg', '2026-01-28 20:07:45', NULL, NULL),
(6, 8, '697a1f36e1b7f.jpg', '2026-01-28 20:07:45', NULL, NULL),
(7, 8, '697a1f3888edf.jpg', '2026-01-28 20:07:45', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `activity_metrics`
--

CREATE TABLE `activity_metrics` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `participation_rate` int(11) DEFAULT NULL,
  `participation_rate_suffix` varchar(5) DEFAULT NULL,
  `average_score` int(11) DEFAULT NULL,
  `average_score_suffix` varchar(5) DEFAULT NULL,
  `completion_time` int(11) DEFAULT NULL,
  `completion_time_suffix` varchar(5) DEFAULT NULL,
  `satisfaction_rate` int(11) DEFAULT NULL,
  `satisfaction_rate_suffix` varchar(5) DEFAULT NULL,
  `repeat_customers` int(11) DEFAULT NULL,
  `repeat_customers_suffix` varchar(5) DEFAULT NULL,
  `revenue_growth` int(11) DEFAULT NULL,
  `revenue_growth_suffix` varchar(5) DEFAULT NULL,
  `safety_score` int(11) DEFAULT NULL,
  `safety_score_suffix` varchar(5) DEFAULT NULL,
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_metrics`
--

INSERT INTO `activity_metrics` (`id`, `activity_id`, `status`, `participation_rate`, `participation_rate_suffix`, `average_score`, `average_score_suffix`, `completion_time`, `completion_time_suffix`, `satisfaction_rate`, `satisfaction_rate_suffix`, `repeat_customers`, `repeat_customers_suffix`, `revenue_growth`, `revenue_growth_suffix`, `safety_score`, `safety_score_suffix`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, 'Active', 85, '%', 92, '+', 15, '+', 94, '%', 67, '%', 23, '%', 98, '%', 1, '2026-01-23 10:01:29', 1, '2026-01-26 11:57:14', 1, '2026-01-26 11:57:42'),
(2, 1, 'Active', 10, '%', 87, '+', 14, '+', 94, '%', 67, '%', 22, '%', 98, '%', 1, '2026-01-26 10:53:38', 1, '2026-01-27 16:06:52', 1, '2026-02-10 17:10:49'),
(3, 8, 'Inactive', 1, '%', 12, '+', 1, '+', 1, '%', 1, '%', 1, '%', 1, '+', 1, '2026-01-27 16:09:21', 1, '2026-02-04 12:28:05', 1, '2026-02-04 12:28:10'),
(4, 3, 'Active', 11, '%', 1, '+', 11, '+', 1, '%', 1, '%', 1, '%', 1, '+', 1, '2026-01-27 16:11:20', NULL, NULL, 1, '2026-01-27 16:13:17'),
(5, 1, 'Active', 23, '%', 10, '+', 1, '+', 11, '%', 1, '%', 1, '%', 2, '+', 1, '2026-01-28 18:35:11', 1, '2026-02-04 09:50:33', 1, '2026-02-10 16:00:52'),
(6, 1, 'Active', 85, '%', 92, '+', 15, '+', 94, '%', 67, '%', 23, '%', 98, '%', 1, '2026-02-04 12:07:15', 1, '2026-02-05 21:43:21', 1, '2026-02-10 16:00:48'),
(8, 16, 'Active', 80, '%', 70, '+', 40, '+', 89, '%', 20, '%', 25, '%', 100, '%', 1, '2026-02-10 14:24:43', 1, '2026-02-18 23:24:11', NULL, NULL),
(9, 2, 'Active', 90, '%', 90, '+', 99, '+', 99, '%', 99, '%', 99, '%', 99, '+', 1, '2026-02-11 13:02:51', 1, '2026-02-22 23:02:03', NULL, NULL),
(10, 22, 'Active', 97, '+', 72, '%', 61, '+', 86, '%', 14, '+', 83, '+', 281, '+', 1, '2026-02-11 14:57:22', NULL, NULL, NULL, NULL),
(11, 20, 'Active', 94, '%', 69, '+', 91, '%', 37, '+', 97, '+', 33, '+', 67, '+', 1, '2026-02-11 14:57:35', 1, '2026-02-12 07:16:26', NULL, NULL),
(12, 19, 'Active', 25, '%', 47, '%', 91, '%', 79, '%', 91, '%', 43, '%', 90, '%', 1, '2026-02-11 14:57:43', NULL, NULL, NULL, NULL),
(13, 18, 'Active', 85, '+', 85, '%', 96, '%', 32, '%', 99, '%', 75, '+', 99, '%', 1, '2026-02-11 18:28:28', 1, '2026-02-16 19:30:48', NULL, NULL),
(14, 25, 'Active', 30, '%', 54, '%', 6, '%', 14, '+', 37, '%', 37, '%', 62, '%', 1, '2026-02-11 20:28:19', NULL, NULL, NULL, NULL),
(15, 26, 'Active', 36, '%', 58, '%', 45, '%', 94, '%', 33, '%', 87, '+', 55, '+', 1, '2026-02-12 07:24:38', NULL, NULL, NULL, NULL),
(16, 27, 'Active', 84, '%', 14, '%', 45, '%', 32, '+', 45, '%', 87, '+', 63, '+', 1, '2026-02-12 07:38:54', 1, '2026-02-12 07:38:57', NULL, NULL),
(17, 28, 'Active', 71, '+', 53, '+', 138, '+', 96, '%', 64, '+', 92, '+', 33, '%', 1, '2026-02-12 07:57:03', NULL, NULL, NULL, NULL),
(18, 23, 'Active', 25, '%', 80, '%', 702, '+', 75, '%', 1, '+', 83, '+', 26, '%', 1, '2026-02-12 08:05:35', NULL, NULL, NULL, NULL),
(19, 24, 'Active', 84, '+', 41, '%', 226, '+', 99, '+', 87, '+', 55, '%', 81, '+', 1, '2026-02-12 08:21:57', NULL, NULL, NULL, NULL),
(20, 23, 'Active', 60, '%', 35, '%', 79, '%', 71, '+', 6, '+', 6, '+', 0, '%', 1, '2026-02-13 17:50:39', 1, '2026-02-13 17:51:39', 1, '2026-02-13 17:51:44');

-- --------------------------------------------------------

--
-- Table structure for table `activity_protocols`
--

CREATE TABLE `activity_protocols` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `requirements` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`requirements`)),
  `equipment` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`equipment`)),
  `etiquette` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`etiquette`)),
  `rules` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`rules`)),
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime DEFAULT current_timestamp(),
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_protocols`
--

INSERT INTO `activity_protocols` (`id`, `activity_id`, `requirements`, `equipment`, `etiquette`, `rules`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, '[\"Must be at least 8 years old\",\"Height requirement: minimum 4 feet\"]', '[\"Safety helmet provided\"]', '[\"Follow track marshal instructions\"]', '[\"Maximum speed limit enforced\"]', 'Active', 1, '2026-01-23 12:35:58', 1, '2026-01-26 15:25:47', 1, '2026-01-28 20:09:51'),
(2, 1, '[\"Must be at least 8 years old\",\"Height requirement: minimum 4 feet\"]', '[\"Safety helmet provided\"]', '[\"Follow track marshal instructions\"]', '[\"Maximum speed limit enforced\"]', 'Active', 1, '2026-01-26 09:49:54', 1, '2026-01-29 09:31:23', 1, '2026-02-10 16:01:36'),
(3, 2, '[\"a b\",\"a\",\"a\",\"a\"]', '[\"a\",\"aa\",\"a\",\"a\"]', '[\"aa\",\"a\",\"a\",\"a\"]', '[\"a\",\"a\",\"a\",\"a\"]', 'Active', 1, '2026-01-26 11:36:52', 1, '2026-01-27 17:18:35', 1, '2026-01-27 17:20:07'),
(4, 2, '[\"a\",\"a\",\"a\",\"a\"]', '[\"a\",\"a\",\"a\",\"a\"]', '[\"a\",\"a\",\"a\",\"a\"]', '[\"a\",\"a\",\"a\",\"a\"]', 'Active', 1, '2026-01-26 11:37:31', NULL, NULL, 1, '2026-01-28 20:09:55'),
(5, 4, '[\"a\",\"f\",\"m\",\"k\"]', '[\" ,\",\"m\",\",m\",\"m\"]', '[\"m\",\",m\",\",\",\"m\"]', '[\",m\",\"mm\",\"m\",\"k\"]', 'Inactive', 1, '2026-01-26 11:39:27', 1, '2026-02-12 14:33:29', 1, '2026-02-12 17:14:19'),
(6, 1, '[\"Must be at least 8 years old\",\"Height requirement: minimum 4 feet\"]', '[\"Safety helmet provided\"]', '[\"Follow track marshal instructions\"]', '[\"Maximum speed limit enforced\"]', 'Active', 1, '2026-01-26 11:43:31', NULL, NULL, 1, '2026-02-10 16:01:32'),
(7, 3, '[\"a\",\"a\",\"a\",\"a\"]', '[\"q\",\"a\",\"a\",\"a\"]', '[\"w\",\"w\",\"w\",\"w\"]', '[\"w\",\"w\",\"w\",\"w\"]', 'Active', 1, '2026-01-26 11:44:47', NULL, NULL, 1, '2026-02-10 16:01:27'),
(8, 5, '[\"Must be at least 8 years old\",\"Height requirement: minimum 4 feet\"]', '[\"Safety helmet provided\"]', '[\"Follow track marshal instructions\"]', '[\"Maximum speed limit enforced\"]', 'Active', 1, '2026-01-26 11:47:24', NULL, NULL, 1, '2026-02-10 16:01:24'),
(9, 3, '[\"a\",\"a\",\"a\",\"a\"]', '[\"aa\",\"a\",\"a\",\"a\"]', '[\"aa\",\"a\",\"a\",\"a\"]', '[\"a\",\"a\",\"a\",\"a\"]', 'Active', 1, '2026-01-26 11:56:18', NULL, NULL, 1, '2026-02-10 16:01:22'),
(10, 5, '[\"a\",\"aa\",\"a\",\"q\"]', '[\"q\",\"q\",\"q\",\"q\"]', '[\"qw\",\"e\",\"e\",\"r\"]', '[\"q\",\"q\",\"q\",\"q\"]', 'Active', 1, '2026-01-26 12:05:53', 1, '2026-02-05 23:13:42', 1, '2026-02-10 16:01:20'),
(11, 1, '[\"d\",\"a\",\"a\",\"a\"]', '[\"aa\",\"a\",\"a\",\"a\"]', '[\"aa\",\"a\",\"a\",\"a\"]', '[\"aa\",\"a\",\"a\",\"a\"]', 'Inactive', 1, '2026-01-27 11:43:27', 1, '2026-02-04 21:44:31', 1, '2026-02-04 21:44:39'),
(12, 1, '[\"Must be at least 8 years old\",\"Height requirement: minimum 4 feet\"]', '[\"Safety helmet provided\"]', '[\"Follow track marshal instructions\"]', '[\"Maximum speed limit enforced\"]', 'Active', 1, '2026-01-28 14:54:48', NULL, NULL, 1, '2026-01-28 20:44:06'),
(13, 1, '[\"w\",\"w\",\"w\",\"w\"]', '[\"w\",\"w\",\"w\",\"w\"]', '[\"w\",\"w\",\"w\",\"w\"]', '[\"ww\",\"w\",\"w\",\"w\"]', 'Active', 1, '2026-01-28 15:11:22', NULL, NULL, 1, '2026-01-28 20:41:30'),
(14, 1, '[\"11111111111111\",\"grgreg\",\"rgrgrg\",\"rsgrgrg\"]', '[\"rgregr\",\"sdfvsdgfvf\",\"rgrgrg\",\"rgrgrgver\"]', '[\"dbgdtfgbdhb\",\"bdghbdhb\",\"fb db ndb n\",\"bfdbdfb \"]', '[\"dhbdthbdthb \",\"dhbdfb d\",\"dfb dfb df\",\"fdb fdgbd\"]', 'Active', 1, '2026-02-04 07:29:46', 1, '2026-02-04 13:02:15', 1, '2026-02-04 13:02:27'),
(15, 4, '[\"a\",\"gjkjk\",\"kjh\",\"hhjhb\"]', '[\"jhbhb\",\"hjbjbj\",\"vvjv\",\"jvjvjvjh\"]', '[\"jbvjbjhb\",\"jhbjhbhk\",\"bhb\",\"khkh\"]', '[\"ikikh\",\"hjh\",\"i\",\"ii\"]', 'Active', 1, '2026-02-04 16:09:38', 1, '2026-02-04 21:40:26', 1, '2026-02-04 21:40:33'),
(17, 1, '[\"Amet animi dolorem\",\"Eu maiores officiis \",\"Est aperiam ratione \",\"Molestiae iste minim\"]', '[\"Veritatis velit ea n\",\"Quam ipsum culpa t\",\"Dolor labore volupta\",\"Placeat velit labor\",\"Ipsum quia et repre\",\"Eos aspernatur beata\",\"Est quis vitae rerum\",\"Qui non fugit est p\",\"Voluptate autem volu\"]', '[\"Distinctio Sed temp\",\"Incididunt suscipit \",\"Deserunt minus commo\",\"Dolores officia haru\",\"Totam sed praesentiu\",\"Neque dolore asperna\",\"Quod assumenda aut i\"]', '[\"Velit exercitatione\",\"Excepturi elit debi\",\"Quo rerum praesentiu\",\"Qui est temporibus d\",\"Nihil qui vel sit ip\",\"Vitae inventore quo \"]', 'Active', 1, '2026-02-10 09:13:54', 1, '2026-02-10 14:48:38', 1, '2026-02-10 16:01:17'),
(18, 16, '[\"Bowling shoes mandatory\",\"Use house bowling balls\",\"Follow lane instructions\",\"Wait for your turn\"]', '[\"Brunswick pro lanes\",\"Quality bowling balls\",\"Auto scoring system\",\"Safety ball returns\"]', '[\"Respect other players\",\"Bowl when lane is clear\",\"No food on lanes\",\"Keep noise minimal\"]', '[\"One player per turn\",\"Stay behind foul line\",\"Valid strike hits all pins\",\"Follow staff guidance\"]', 'Active', 1, '2026-02-10 09:21:13', 1, '2026-02-18 23:21:56', NULL, NULL),
(19, 16, '[\"Iusto et earum verit\",\"Aut voluptatum alias\",\"Consequatur illum d\",\"In ex ea et error ni\"]', '[\"Voluptatem do debit\",\"Tempor beatae volupt\",\"Maiores do ea ipsa \",\"Distinctio Rerum ea\"]', '[\"Consequatur eligend\",\"Facere ea molestiae \",\"Iusto consectetur a\",\"Aut dolore facilis q\"]', '[\"Possimus incididunt\",\"Velit aut sint ab p\",\"Enim rerum sit dolo\",\"Totam nisi ipsum ven\"]', 'Inactive', 1, '2026-02-10 09:23:25', NULL, NULL, 1, '2026-02-10 15:00:56'),
(20, 16, '[\"Iusto et earum verit\",\"Aut voluptatum alias\",\"Consequatur illum d\",\"In ex ea et error ni\"]', '[\"Voluptatem do debit\",\"Tempor beatae volupt\",\"Maiores do ea ipsa \",\"Distinctio Rerum ea\"]', '[\"Consequatur eligend\",\"Facere ea molestiae \",\"Iusto consectetur a\",\"Aut dolore facilis q\"]', '[\"Possimus incididunt\",\"Velit aut sint ab p\",\"Enim rerum sit dolo\",\"Totam nisi ipsum ven\"]', 'Inactive', 1, '2026-02-10 09:24:11', NULL, NULL, 1, '2026-02-10 15:00:53'),
(21, 16, '[\"Perferendis a rerum \",\"Adipisicing aliqua \",\"Culpa omnis sint nu\",\"Irure qui dolorum ir\"]', '[\"Fugit qui rerum eli\",\"Facilis cupidatat do\",\"Velit dicta sed magn\",\"Elit vel optio omn\"]', '[\"Voluptas vel ut tene\",\"Sunt aut eum aut qui\",\"Est voluptate aliqui\",\"Aut quidem vel ad un\"]', '[\"Aute dicta eos moles\",\"Assumenda qui repell\",\"Lorem officiis aut s\",\"Laborum Ut ut inven\"]', 'Inactive', 1, '2026-02-10 09:25:00', NULL, NULL, 1, '2026-02-10 15:00:58'),
(22, 1, '[\"Eum obcaecati delect\",\"Deleniti in quia ea \",\"Nam alias id ea quis\",\"Magnam odio totam so\"]', '[\"A sint qui est et\",\"Perspiciatis rerum \",\"Illo vel ex commodi \",\"Perferendis voluptat\"]', '[\"Fugiat in aut distin\",\"Quod enim sapiente a\",\"Veritatis et tempore\",\"Ut optio non aute t\"]', '[\"Incidunt dolor corr\",\"Sunt deserunt delect\",\"Amet voluptate earu\",\"Deleniti omnis quia \"]', 'Inactive', 1, '2026-02-10 09:26:26', 1, '2026-02-12 14:33:08', 1, '2026-02-12 17:14:11'),
(23, 1, '[\"Ut inventore aut est\",\"Molestias aliquam eu\",\"Voluptas maxime duis\",\"Id dolore quae sed v\"]', '[\"Officia consequat D\",\"Omnis in sed ea corp\",\"Saepe iusto accusamu\",\"Nihil rem voluptatem\"]', '[\"Ipsum excepturi dese\",\"Mollit consequat Re\",\"Ullam culpa fugiat \",\"Voluptatem Aliqua \"]', '[\"Asperiores ut duis n\",\"Sit pariatur Volupt\",\"Sed laboris reprehen\",\"Ut mollitia fugiat \"]', 'Inactive', 1, '2026-02-10 09:27:24', NULL, NULL, 1, '2026-02-10 16:01:12'),
(24, 2, '[\"Minimum Height: 4.6 ft\",\"Age Limit: 12+ Years\",\"Valid ID for Adults\",\"Signed Indemnity Form\"]', '[\"Wear Helmet at All Times\",\"Follow Marshal Instructions\",\"Fasten Seat Belt Securely\",\"No Bumping or Blocking\"]', '[\"Long Hair Tied Securely\",\"Closed-Toe Shoes Mandatory\",\"Comfortable Casual Clothing\",\"No Loose Scarves\\/Jackets\"]', '[\"Respect Fellow Racers\",\"Follow Marshal Instructions\",\"No Intentional Collisions\",\"Follow Track Rules\"]', 'Active', 1, '2026-02-11 07:34:40', 1, '2026-04-23 12:32:08', NULL, NULL),
(25, 20, '[\"Suitable for All Ages\",\"Parental Guidance for Kids\",\"Follow Game Instructions\",\"Use Valid Game Card\\/Tokens\"]', '[\"Follow Game Instructions\",\"Handle Machines Carefully\",\"No Hitting or Shaking Units\",\"Report Issues to Staff\"]', '[\"Wait for Your Turn\",\"Respect Other Players\",\"No Game Hogging\",\"Keep Area Clean\"]', '[\"Outside Food & Beverages\",\"Sharp or Hazardous Items\",\"Alcohol & Tobacco Products\",\"Large Bags Near Machines\"]', 'Active', 1, '2026-02-11 09:28:06', 1, '2026-02-22 23:30:12', NULL, NULL),
(26, 25, '[\"Fugit commodi fugia\",\"Sunt impedit accusa\",\"Sed alias eiusmod mi\",\"Voluptas cupiditate \"]', '[\"Magna doloribus earu\",\"Sed adipisicing sint\",\"Ut minim elit perfe\",\"Culpa natus cum cons\"]', '[\"Dolor exercitationem\",\"Irure dolorem mollit\",\"Repudiandae ipsum r\",\"Natus est reiciendi\"]', '[\"Qui nisi sit iure d\",\"Dignissimos velit c\",\"Nemo quisquam quidem\",\"Culpa aut eum qui co\"]', 'Active', 1, '2026-02-11 09:28:09', 1, '2026-02-11 20:30:20', NULL, NULL),
(27, 2, '[\"Vel natus quo cumque\",\"Nobis id molestias c\",\"Velit omnis sit Nam\",\"Consectetur libero \"]', '[\"Et iusto dolore aper\",\"Et duis nihil et dol\",\"Amet sit aliqua Ra\",\"Qui nisi earum enim \"]', '[\"Sit fugit iure exer\",\"Ut itaque dignissimo\",\"Explicabo Totam qui\",\"Sint dicta omnis ab\"]', '[\"Lorem fugit fugit \",\"Architecto at nihil \",\"Aspernatur aut repud\",\"Ex repudiandae harum\"]', 'Inactive', 1, '2026-02-11 09:28:12', NULL, NULL, 1, '2026-02-12 14:33:22'),
(28, 28, '[\"a\",\"a\",\"a\",\"a\"]', '[\"aa\",\"aa\",\"aa\",\"aa\"]', '[\"aaa\",\"aaa\",\"aaa\",\"aaa\"]', '[\"aaaa\",\"aaaa\",\"aaaa\",\"aaaa\"]', 'Active', 1, '2026-02-11 11:22:22', NULL, NULL, 1, '2026-02-11 16:53:10'),
(29, 28, '[\"a\",\"a\",\"a\",\"a\"]', '[\"aa\",\"aa\",\"aa\",\"aa\"]', '[\"aaa\",\"aaa\",\"aaa\",\"aaa\"]', '[\"aaaa\",\"aaaa\",\"aaaa\",\"aaaa\"]', 'Active', 1, '2026-02-11 11:34:06', NULL, NULL, 1, '2026-02-11 17:04:15'),
(30, 27, '[\"a\",\"a\",\"a\",\"a\"]', '[\"aa\",\"aa\",\"aa\",\"aa\"]', '[\"aaa\",\"aaa\",\"aaa\",\"aaa\"]', '[\"aaaa\",\"aaaa\",\"aaaa\",\"aaaa\"]', 'Active', 1, '2026-02-11 11:39:50', 1, '2026-02-11 17:10:02', 1, '2026-02-11 17:10:08'),
(31, 18, '[\"Minimum Age: 10+ Years\",\"Minimum Height Required\",\"Comfortable Clothing Only\",\"Follow Safety Briefing\"]', '[\"Advanced Laser Tag Gear\",\"Lightweight Sensor Vests\",\"Arena Safety Monitoring\",\"Trained Game Supervisors\"]', '[\"No Running or Pushing\",\"No Physical Contact\",\"Follow Arena Boundaries\",\"Respect All Players\"]', '[\"No Arena Wall Climbing\",\"No Covering Sensors\",\"No Throwing Equipment\",\"No Entry Without Gear\"]', 'Active', 1, '2026-02-11 13:07:54', 1, '2026-04-23 12:46:49', NULL, NULL),
(32, 19, '[\"Minimum Height & Age Criteria \",\"Follow Staff Instructions\",\"Wear Proper Attire\",\"No Health Risk Conditions\"]', '[\"Mandatory Safety Gear\",\"Equipment Checked Before Use\",\"Staff Safety Supervision\",\"Follow All Safety Briefings\"]', '[\"Respect Staff Instructions\",\"Wait for Your Turn\",\"Avoid Rough Behavior\",\"Be Considerate to Others\"]', '[\"Follow All Posted Instructions\",\"No Alcohol or Intoxication\",\"No Misuse of Equipment\",\"Management Rights Reserved\"]', 'Active', 1, '2026-02-11 13:36:15', 1, '2026-04-23 12:47:46', NULL, NULL),
(33, 22, '[\"Minimum Age: 18+ Years\",\"Parental Consent for Minors\",\"Valid ID Verification\",\"Physically Fit to Participate\"]', '[\"Full-Face Mask Mandatory\",\"Protective Vest Provided\",\"Barrel Cover in Safe Zone\",\"No Gear Removal in Field\"]', '[\"No Blind Firing\",\"Maintain Safe Distance\",\"Accept Hits Honestly\",\"Respect Teammates & Rivals\"]', '[\"Obey Referee Commands\",\"Stop on Whistle Signal\",\"No Firing in Safe Zones\",\"Staff Decision is Final\"]', 'Active', 1, '2026-02-11 14:39:19', 1, '2026-04-23 12:48:21', NULL, NULL),
(34, 26, '[\"Safety Check Before Start\",\"Always Stay Seated\",\"Keep Hands on Handlebars\",\"No Sudden Movements\"]', '[\"Minimum Height Criteria\",\"Physically Fit to Ride\",\"Secure Harness Mandatory\",\"Follow Staff Instructions\"]', '[\"No Standing on Pedals\",\"No Shaking the Cycle\",\"No Mobile Phone Use\",\"No Loose Clothing\"]', '[\"Maintain Safe Distance\",\"Pedal at Controlled Speed\",\"Follow Staff Signals\",\"Staff Decision is Final\"]', 'Active', 1, '2026-02-12 01:57:09', 1, '2026-02-23 00:07:27', NULL, NULL),
(35, 27, '[\"Secure Harness Mandatory\",\"Follow Staff Instructions\",\"Keep Hands on Handle\",\"No Sudden Movements\"]', '[\"Minimum Height Criteria\",\"Physically Fit to Ride\",\"No Medical Conditions\",\"Signed Consent Required\"]', '[\"Maintain Steady Speed\",\"Do Not Lean Excessively\",\"Follow Entry\\/Exit Signs\",\"Wait for Staff Signal\"]', '[\"No Mobile Phones\",\"No Loose Clothing\",\"No Standing on Seat\",\"No Horseplay Allowed\"]', 'Active', 1, '2026-02-12 02:10:05', 1, '2026-02-23 00:11:24', NULL, NULL),
(36, 28, '[\"Minimum Height & Age Limit\",\"Physically Fit to Ride\",\"No Heart\\/Back Issues\",\"Signed Consent Mandatory\"]', '[\"Secure Harness Check\",\"Staff Pre-Ride Inspection\",\"Follow Operator Signals\",\"Controlled Launch System\"]', '[\"Remove Loose Items\",\"Empty Pockets Before Ride\",\"Tie Long Hair Securely\",\"Listen to Safety Briefing\"]', '[\"Keep Head Back on Launch\",\"Hold Handles Firmly\",\"No Mobile Phones\",\"Staff Decision is Final\"]', 'Active', 1, '2026-02-12 02:27:36', 1, '2026-02-23 00:15:12', NULL, NULL),
(37, 23, '[\"Minimum Height Criteria\",\"Kids Under Supervision\",\"No Toddlers Allowed\",\"Fit to Ride Condition\"]', '[\"No Tampering with Cars\",\"Handle Steering Properly\",\"Do Not Stand in Cars\",\"Report Issues to Staff\"]', '[\"No Intentional Hard Hits\",\"No Head-On Ramming\",\"Respect Other Riders\",\"Take Turns Fairly\"]', '[\"Follow Operator Signals\",\"Remain Seated Always\",\"Exit When Ride Stops\",\"Staff Decision is Final\"]', 'Active', 1, '2026-02-12 02:36:02', 1, '2026-02-22 23:57:42', NULL, NULL),
(38, 24, '[\"Minimum Age Criteria\",\"Kids With Supervision\",\"Fit to Participate\",\"Follow Staff Approval\"]', '[\"Use Provided Gear Only\",\"Protective Setup in Place\",\"No Equipment Misuse\",\"Staff Safety Monitoring\"]', '[\"Aim at Targets Only\",\"No Horseplay Allowed\",\"Wait for Your Turn\",\"Respect Other Players\"]', '[\"Follow Range Commands\",\"No Entry During Play\",\"Keep Safe Distance\",\"Staff Decision is Final\"]', 'Active', 1, '2026-02-12 02:52:50', 1, '2026-02-23 00:01:31', NULL, NULL),
(39, 18, '[\"Sapiente distinctio\",\"Qui iure harum ut te\",\"Atque voluptatibus n\",\"Minim in nesciunt t\"]', '[\"Odio vel provident \",\"Sed non ab non labor\",\"Sed et in est veniam\",\"Nemo voluptatibus om\"]', '[\"Esse ratione esse i\",\"Et eiusmod deserunt \",\"Dolores voluptatibus\",\"Dolor qui exercitati\"]', '[\"Cupidatat quo cupidi\",\"Excepturi fugiat ul\",\"Quia ea animi iste \",\"Ut quis et sunt ill\"]', 'Active', 1, '2026-02-13 12:39:01', 1, '2026-02-13 18:09:26', 1, '2026-02-13 18:09:30');

-- --------------------------------------------------------

--
-- Table structure for table `activity_reviews`
--

CREATE TABLE `activity_reviews` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `reviewer_name` varchar(100) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `review_description` text NOT NULL,
  `reviewer_image` varchar(255) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_reviews`
--

INSERT INTO `activity_reviews` (`id`, `activity_id`, `reviewer_name`, `rating`, `review_description`, `reviewer_image`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, 'B Sudhakar', 5, 'Amazing experience! The track was well-maintained and the staff was very professional. Had an absolute blast racing with friends.', '697310dd9294a.jpg', 'Inactive', 1, '2026-01-23 11:40:45', 1, '2026-02-12 17:10:21', 1, '2026-02-12 17:11:00'),
(2, 1, 'Sudhakar', 4, 'Amazing experience! The track was well-maintained and the staff was very professional. Had an absolute blast racing with friends.', NULL, 'Inactive', 1, '2026-01-23 16:51:47', 1, '2026-01-29 10:01:42', 1, '2026-02-12 17:11:12'),
(3, 1, 'sa', 5, 'asdvdsaassss', NULL, 'Active', 1, '2026-01-29 10:02:00', NULL, NULL, 1, '2026-01-29 10:02:17'),
(4, 8, 'Satish', 5, 'qwertyuiolkj', '6982f4fea5732.png', 'Active', 1, '2026-01-30 01:48:11', 1, '2026-02-04 21:38:39', 1, '2026-02-12 17:11:51'),
(5, 1, 'Siva Shankar', 5, 'Good morning', '6982f31443df8.jpg', 'Inactive', 1, '2026-02-04 12:49:49', 1, '2026-02-12 17:10:31', 1, '2026-02-12 17:10:44'),
(7, 1, 'John Smith', 5, 'ghkjhnljlkjjlnlk', NULL, 'Active', 1, '2026-02-05 22:21:22', NULL, NULL, 1, '2026-02-05 22:21:53'),
(8, 1, 'John Smith', 5, 'jdkndsnekfhvre', NULL, 'Active', 1, '2026-02-05 22:22:03', NULL, NULL, 1, '2026-02-05 22:22:56'),
(10, 16, 'Rahul Varma', 5, '“Had an amazing time bowling at FNF Arena! The lanes are super smooth, scoring system is accurate, and the whole place has a great vibe. Staff were helpful and the experience felt premium from start to finish. Definitely coming back with friends!”\r\n', '6995fd8a95456.png', 'Active', 1, '2026-02-10 14:36:12', 1, '2026-02-18 23:27:31', NULL, NULL),
(11, 1, 'Graham Glass', 5, 'Quaerat officiis at ', NULL, 'Active', 1, '2026-02-10 14:39:20', NULL, NULL, 1, '2026-02-10 14:39:32'),
(12, 2, 'kiran M', 5, '“The best place for racing fun! Competing with friends on the track was thrilling, safe, and unforgettable.” 🏎️🔥', '699675374a428.png', 'Active', 1, '2026-02-11 13:03:52', 1, '2026-02-19 07:58:08', NULL, NULL),
(13, 2, 'Lohit reddy', 5, '“Absolutely loved the speed and excitement! The safety measures are great, and the whole experience feels professional and well-managed.”', '69967507b25a1.png', 'Active', 1, '2026-02-11 13:04:09', 1, '2026-02-19 07:57:20', NULL, NULL),
(14, 2, 'Sagar Chandu', 5, '“Go Karting at FNF Arena was an incredible racing experience! The track is smooth, the karts are powerful, and the thrill is unmatched.”', '699674a57578e.png', 'Active', 1, '2026-02-11 13:04:20', 1, '2026-02-19 07:55:42', NULL, NULL),
(15, 19, 'Divya Lakshmi', 5, '“From safe and colorful Soft Play to high jumps on the Trampoline and the exciting Bull Ride challenge — every attraction was fun, safe, and unforgettable!” 🎉🔥', '699673371ec08.png', 'Active', 1, '2026-02-11 19:09:57', 1, '2026-02-19 07:49:36', NULL, NULL),
(16, 19, 'Aarav Reddy', 5, '“Soft Play was perfect for kids, the Trampoline zone was full of energy, and the Bull Ride added a thrilling twist! A complete fun package for the whole family.”', '69967311e9006.png', 'Active', 1, '2026-02-11 19:23:08', 1, '2026-02-19 07:48:58', NULL, NULL),
(17, 22, 'Praneeth Reddy', 5, '“Paintball Arena was an intense and thrilling experience! The action, strategy, and team play made it absolutely unforgettable.”', '699672222ca24.png', 'Active', 1, '2026-02-11 20:07:24', 1, '2026-02-19 07:44:58', NULL, NULL),
(18, 22, 'Deepika Chowdary', 5, '“Such an adrenaline-packed adventure! The Paintball Arena is well-organized, safe, and perfect for competitive fun with friends.”', '699671f0e3104.png', 'Active', 1, '2026-02-11 20:07:34', 1, '2026-02-19 07:44:09', NULL, NULL),
(19, 23, 'Harini Devi', 5, '“Such an entertaining ride! Drifting around and bumping into friends made it one of the most enjoyable attractions at FNF Arena.”', '6996717741c03.png', 'Active', 1, '2026-02-11 20:29:31', 1, '2026-02-19 07:42:08', NULL, NULL),
(20, 25, 'Sushmitha Rao', 5, '“Absolutely thrilling! The rush of flying through the air on the Zip Line Roller Coaster was both safe and super fun.”', '6996709c51233.png', 'Active', 1, '2026-02-11 20:30:12', 1, '2026-02-19 07:38:29', NULL, NULL),
(21, 20, 'Sindhu Priya', 5, '“Absolutely loved the Arcade Games! It’s perfect for all ages, super entertaining, and full of exciting challenges.” 🎮✨', '6996728e7e7c0.png', 'Active', 1, '2026-02-12 07:25:10', 1, '2026-02-19 07:46:47', NULL, NULL),
(22, 26, 'Nikhil Reddy', 5, '“Sky Cycle was an amazing adventure! Cycling high above the ground gave me a thrilling yet safe experience I’ll never forget.”', '69967010a8e36.png', 'Active', 1, '2026-02-12 07:25:23', 1, '2026-02-19 07:36:09', NULL, NULL),
(23, 27, 'Hari Vardhan', 5, '“Sky Roller was such a fun experience! The smooth glide and height gave me the perfect mix of thrill and excitement.”', '69966fd12087c.png', 'Active', 1, '2026-02-12 07:39:43', 1, '2026-02-19 07:35:05', NULL, NULL),
(24, 27, 'Meghana Reddy', 5, '“Absolutely loved Sky Roller! It feels adventurous yet safe, and the ride is super enjoyable from start to finish.”', '69966fc5c75b4.png', 'Active', 1, '2026-02-12 07:39:43', 1, '2026-02-19 07:34:55', NULL, NULL),
(25, 28, 'Sai Teja Reddy', 5, '“Rocket Ejection was an incredible thrill! The powerful launch and smooth landing made it one of the most exciting rides at FNF Arena.”', '69966ee7c1ac1.png', 'Active', 1, '2026-02-12 07:57:25', 1, '2026-02-19 07:31:12', NULL, NULL),
(26, 23, 'Vamsi Krishna', 5, '“Drifters & Bumping Cars was pure fun! The smooth drifting and playful crashes made it an exciting and laughter-filled experience.”', '699671a12dbec.png', 'Active', 1, '2026-02-12 08:05:54', 1, '2026-02-19 07:42:50', NULL, NULL),
(27, 24, 'Karthikeya Reddy', 5, '“Target Zone was super engaging and fun! The competitive vibe and precision challenges made it an exciting experience.”', '699670f315576.png', 'Active', 1, '2026-02-12 08:22:36', 1, '2026-02-19 07:39:55', NULL, NULL),
(28, 18, 'Navya Sri', 5, '“Such an exciting and competitive game! Laser Tag at FNF Arena is well-organized, safe, and perfect for friends and family fun.”', '6996742ba419a.png', 'Active', 1, '2026-02-12 09:44:41', 1, '2026-02-19 07:53:40', NULL, NULL),
(29, 28, 'Susan Carrrrrrr', 5, 'Dolor animi lorem r', NULL, 'Active', 1, '2026-02-13 18:02:26', 1, '2026-02-13 18:02:51', 1, '2026-02-13 18:02:56'),
(30, 16, 'Sneha Reddy', 5, '“FNF Arena is hands down one of the best bowling spots! The lanes are well maintained, the atmosphere is lively, and everything feels professionally managed. Perfect place for a fun evening with friends and family.”', '6995fe02c4e82.png', 'Active', 1, '2026-02-18 23:26:37', 1, '2026-02-18 23:29:32', NULL, NULL),
(31, 16, 'Arjun Mehta', 5, '“Fantastic bowling experience at FNF Arena! Smooth lanes, great lighting, and quick scoring system. The staff was friendly and organized. Totally worth it — can’t wait to visit again!”', '6995fdcebde03.png', 'Active', 1, '2026-02-18 23:28:39', NULL, NULL, 1, '2026-04-23 15:54:28'),
(32, 28, 'Sravani Lakshmi', 5, '“An amazing adrenaline rush! Rocket Ejection feels intense yet completely safe. Definitely one of my favorite attractions!” 🚀', '69966edd9da4f.png', 'Active', 1, '2026-02-19 07:29:36', 1, '2026-02-19 07:31:02', NULL, NULL),
(33, 26, 'Lahari Priya', 5, '“Such a unique and exciting ride! Sky Cycle perfectly blends fun and challenge — I loved every moment of it.” 🚴‍♂️', '699670375c5a9.png', 'Active', 1, '2026-02-19 07:36:48', NULL, NULL, NULL, NULL),
(34, 25, 'Aditya Varma', 5, '“The Zip Line Roller Coaster was pure excitement! The speed, height, and smooth glide made it an unforgettable adventure.”', '699670bb2dac5.png', 'Active', 1, '2026-02-19 07:39:00', NULL, NULL, NULL, NULL),
(35, 24, 'Ananya Sri', 5, '“I loved the thrill of aiming and scoring in Target Zone! It’s the perfect mix of fun, focus, and friendly competition.” 🎯', '699671283862b.png', 'Active', 1, '2026-02-19 07:40:49', NULL, NULL, NULL, NULL),
(36, 20, 'Rahul Teja', 5, '“The Arcade Games section is amazing! So many fun options to play — from classic games to modern ones. I didn’t want to leave!”', '699672644bbb3.png', 'Active', 1, '2026-02-19 07:46:05', NULL, NULL, NULL, NULL),
(37, 18, 'Abhinav Reddy', 5, '“Laser Tag was absolutely thrilling! The lights, sound effects, and team strategy made it an action-packed experience from start to finish.”', '699673f57dfc8.png', 'Active', 1, '2026-02-19 07:52:46', NULL, NULL, NULL, NULL),
(38, 2, 'Naveen G', 5, '“An amazing racing experience! The track layout is exciting, and the karts deliver the perfect mix of speed and control.”', NULL, 'Active', 1, '2026-02-19 07:59:01', NULL, NULL, NULL, NULL),
(39, 2, 'Kedhar', 5, '“Go Karting here is pure adrenaline! Safe environment, well-maintained karts, and so much fun competing with friends.”', NULL, 'Active', 1, '2026-02-19 07:59:18', NULL, NULL, NULL, NULL),
(40, 2, 'challagulla', 5, '\"Absolutely thrilling from start to finish! The acceleration, sharp turns, and race vibe make it a must-try attraction.” 🏁🏎️', NULL, 'Active', 1, '2026-02-19 08:00:03', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `activity_types`
--

CREATE TABLE `activity_types` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime DEFAULT current_timestamp(),
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_types`
--

INSERT INTO `activity_types` (`id`, `category_id`, `name`, `description`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, 'Go Kart', '', 'Inactive', 1, '2026-01-22 17:54:05', 1, '2026-02-12 09:52:02', 1, '2026-02-18 22:32:30'),
(2, 3, 'Go Karting', 'Race fast, corner sharp, and feel the thrill! 🏁🔥', 'Active', 1, '2026-01-30 12:01:17', 1, '2026-02-18 22:33:14', NULL, NULL),
(3, NULL, 'Go Karting', 'hiiiiiiiiiiiiii', 'Inactive', 1, '2026-01-30 12:03:16', NULL, NULL, 1, '2026-02-10 16:02:54'),
(4, NULL, 'Go Karting', 'hiiiiiiiiiiiiii', 'Inactive', 1, '2026-01-30 12:30:28', NULL, NULL, 1, '2026-02-10 16:02:51'),
(5, NULL, 'Go Karting', 'hiiiiiiiiiiiiii', 'Inactive', 1, '2026-01-30 12:39:23', NULL, NULL, 1, '2026-02-10 16:02:48'),
(6, NULL, 'Go Karting', 'hiiiiiiiiiiiiii', 'Inactive', 1, '2026-01-30 12:39:33', NULL, NULL, 1, '2026-02-04 22:25:07'),
(7, NULL, 'hiajkhjksdhnjlsd', 'thtrhtfhnfthnftnrtfdjhntfjhn', 'Inactive', 1, '2026-01-30 13:23:45', 1, '2026-02-04 22:10:55', 1, '2026-02-04 22:25:04'),
(8, NULL, 'hiajkhjksdhnjlsd', 'drgdtedrthbebdrth', 'Active', 1, '2026-01-30 13:33:05', NULL, NULL, 1, '2026-02-04 22:10:28'),
(9, NULL, 'sahi', 'aaaaaaaaaaaaaaaaaaaa', 'Active', 1, '2026-01-30 14:12:34', 1, '2026-01-30 14:22:58', 1, '2026-01-30 14:24:05'),
(10, NULL, 'getdhgbethgest', 'aaaaaaaaaa', 'Inactive', 1, '2026-01-30 14:24:22', 1, '2026-02-04 21:59:08', 1, '2026-02-04 22:10:25'),
(11, NULL, 'hiajkhjksdhnjlsd', 'efwsefwefve', 'Active', 1, '2026-02-04 09:51:39', 1, '2026-02-04 09:51:54', 1, '2026-02-04 09:53:15'),
(12, NULL, 'test', 'svdhssdsbkhbkjcn', 'Active', 1, '2026-02-04 21:59:35', 1, '2026-02-04 22:09:34', 1, '2026-02-04 22:10:22'),
(13, NULL, 'test', 'gjgjkkjhjkhjkbkjb', 'Active', 1, '2026-02-04 22:10:40', 1, '2026-02-04 22:24:40', 1, '2026-02-04 22:25:01'),
(14, NULL, 'test', 'bdjknjdndnmbfdkjnfd,', 'Active', 1, '2026-02-04 22:29:06', 1, '2026-02-04 22:29:13', 1, '2026-02-04 22:29:16'),
(15, NULL, 'test', 'sdjkshsnscndklcm;', 'Active', 1, '2026-02-05 23:00:13', 1, '2026-02-05 23:00:23', 1, '2026-02-05 23:00:29'),
(16, 2, 'Bowling', 'Strike hard, score big! 🎳', 'Active', 1, '2026-02-10 10:38:25', 1, '2026-04-29 11:27:35', NULL, NULL),
(17, 4, 'test', 'testttttttttttt', 'Inactive', 1, '2026-02-10 16:05:44', 1, '2026-02-10 16:33:52', 1, '2026-02-18 22:32:26'),
(18, 2, 'Laser tag', 'Suit up and dominate the arena!', 'Active', 1, '2026-02-11 12:56:02', 1, '2026-04-29 11:28:35', NULL, NULL),
(19, 2, 'Softplay & Trampoline & Bull Ride', 'Jump, bounce, and hold on for wild fun! 🤸‍♂️🐂', 'Active', 1, '2026-02-11 12:57:33', 1, '2026-02-18 22:34:39', NULL, NULL),
(20, 2, 'Arcade Games', 'Play, score, and win 🎮✨', 'Active', 1, '2026-02-11 12:57:52', 1, '2026-04-29 11:29:22', NULL, NULL),
(21, NULL, 'Arcade Games', 'this is Arcade Games description', 'Active', 1, '2026-02-11 12:57:58', NULL, NULL, 1, '2026-02-11 12:58:07'),
(22, 1, 'Paintball Arena', 'Gear up, take cover, and battle with a splash of colors !!', 'Active', 1, '2026-02-11 12:58:38', 1, '2026-04-03 16:12:33', NULL, NULL),
(23, 1, 'Drifters & Bumping Cars', 'Spin, slide, and crash into nonstop fun! 🚗💥', 'Active', 1, '2026-02-11 12:58:53', 1, '2026-04-03 16:12:34', NULL, NULL),
(24, 1, 'Target Zone', 'Aim sharp, shoot fast, and hit every mark! 🎯', 'Active', 1, '2026-02-11 12:59:05', 1, '2026-04-03 16:12:35', NULL, NULL),
(25, 14, 'Zipline Roller Coaster', 'Glide, roll, and race through the air for an Fun', 'Active', 1, '2026-02-11 13:00:34', 1, '2026-04-07 14:58:35', NULL, NULL),
(26, 14, 'Sky Cycle', 'Ride high, pedal strong, and enjoy the thrill above ground level!', 'Active', 1, '2026-02-11 13:00:50', 1, '2026-02-18 22:27:42', NULL, NULL),
(27, 14, 'Sky Roller', 'Pedal your way high above the ground for a fun', 'Active', 1, '2026-02-11 13:01:03', 1, '2026-02-18 22:36:21', NULL, NULL),
(28, 14, 'Rocket Ejection', 'Buckle up and blast upward in a high-thrill launch 🚀', 'Active', 1, '2026-02-11 13:01:14', 1, '2026-04-07 14:52:10', NULL, NULL),
(29, NULL, 'test', 'sgvfrgsvsrfgv', 'Active', 1, '2026-02-11 15:25:50', NULL, NULL, 1, '2026-02-11 15:26:59'),
(30, 4, 'test22', 'rrthygbterhberthg', 'Active', 1, '2026-02-11 15:29:35', 1, '2026-02-11 15:29:55', 1, '2026-02-11 15:30:01'),
(31, 4, 'test22', 'sfvsfvcefvcwefvcfcv', 'Active', 1, '2026-02-11 15:31:58', NULL, NULL, 1, '2026-02-11 15:33:14'),
(32, NULL, 'test22', 'sgvrfvfrgvreg', 'Active', 1, '2026-02-11 15:33:23', NULL, NULL, 1, '2026-02-11 15:33:41'),
(33, 7, 'test', 'gvbertgbetgerg', 'Active', 1, '2026-02-11 15:35:42', 1, '2026-02-11 15:35:52', 1, '2026-02-11 15:35:55'),
(34, 7, 'test', 'vgrfgvbrfgvgg', 'Inactive', 1, '2026-02-11 15:40:40', 1, '2026-02-11 15:40:46', 1, '2026-02-11 15:40:49'),
(35, 3, 'Dustin Chandler', 'Reprehenderit quas d', 'Active', 1, '2026-02-13 17:42:25', NULL, NULL, 1, '2026-02-13 17:42:48');

-- --------------------------------------------------------

--
-- Table structure for table `activity_videos`
--

CREATE TABLE `activity_videos` (
  `id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `video` varchar(255) NOT NULL,
  `label` varchar(150) NOT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL,
  `create_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_videos`
--

INSERT INTO `activity_videos` (`id`, `activity_id`, `video`, `label`, `delete_audit_id`, `delete_audit_time`, `create_audit_time`) VALUES
(1, 1, '6972232069ab5.mp4', 'Go Karting Action Highlights', NULL, NULL, NULL),
(2, 2, '69722f6d002ea.mp4', 'Go Karting Action Highlights', NULL, NULL, NULL),
(3, 8, '697a1f3940c20.mp4', 'Testing video', NULL, NULL, '2026-01-28 20:07:46');

-- --------------------------------------------------------

--
-- Table structure for table `birthday_bookings`
--

CREATE TABLE `birthday_bookings` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `child` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `theme` varchar(50) DEFAULT NULL,
  `date` varchar(50) NOT NULL,
  `time` varchar(50) NOT NULL,
  `guests` int(11) NOT NULL,
  `booking_type` varchar(50) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `advance` decimal(10,2) DEFAULT 0.00,
  `balance` decimal(10,2) DEFAULT 0.00,
  `payment_status` enum('Paid','Partial','Pending') DEFAULT 'Pending',
  `status` enum('Pending','Approved','Confirmed','Cancelled') DEFAULT 'Pending',
  `message` text DEFAULT NULL,
  `booking_date` date NOT NULL DEFAULT curdate(),
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime NOT NULL DEFAULT current_timestamp(),
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL,
  `confirm_audit_id` int(11) DEFAULT NULL,
  `confirmed_audit_time` datetime DEFAULT NULL,
  `cancelled_audit_id` int(11) DEFAULT NULL,
  `cancelled_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `birthday_bookings`
--

INSERT INTO `birthday_bookings` (`id`, `customer_name`, `child`, `age`, `email`, `phone`, `theme`, `date`, `time`, `guests`, `booking_type`, `total`, `advance`, `balance`, `payment_status`, `status`, `message`, `booking_date`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`, `confirm_audit_id`, `confirmed_audit_time`, `cancelled_audit_id`, `cancelled_audit_time`) VALUES
(1, 'John Doe', 'Alice', 7, 'john@example.com', '9876543210', 'Example', '2026-02-15', '12:00PM-04:00PM', 15, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', NULL, '2026-01-26', 1, '2026-01-26 15:09:56', NULL, NULL, 1, '2026-04-12 15:51:05', NULL, NULL, NULL, NULL),
(2, 'John Doe', 'Alice', 7, 'john@example.com', '9876543210', 'Example', '2026-02-15', '12:00PM-04:00PM', 15, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'testing', '2026-02-01', 1, '2026-02-01 12:00:10', NULL, NULL, 1, '2026-04-12 15:51:03', NULL, NULL, NULL, NULL),
(3, 'Sed mollit incidunt', 'Neque amet tempora ', 12, 'vatymukox@mailinator.com', '8472794731', 'Libero officiis perf', '1984-02-06', '02:41', 26, 'Pre-Booked', 83.00, 65.00, 18.00, '', 'Pending', NULL, '2026-02-09', 1, '2026-02-09 10:37:28', NULL, NULL, 1, '2026-04-12 15:50:12', NULL, NULL, NULL, NULL),
(4, 'John Doe', 'Alice', 7, 'john@example.com', '9876543210', 'Example', '2026-02-15', '12:00PM-04:00PM', 15, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'testing', '2026-02-09', 1, '2026-02-09 15:02:53', NULL, NULL, 1, '2026-04-12 15:49:12', NULL, NULL, NULL, NULL),
(7, 'John Doe', 'Alice', 7, 'john@example.com', '9876543210', 'Example', '2026-02-15', '12:00PM-04:00PM', 15, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'testing', '2026-02-09', 1, '2026-02-09 15:11:30', NULL, NULL, 1, '2026-04-12 15:48:47', NULL, NULL, NULL, NULL),
(8, 'Sai', 'Dhrushya', 1, 'sai@gmail.com', '6300839532', 'Example', '2026-02-03', '10:00 AM - 12:00 PM', 5, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'dfcsfvsfv', '2026-02-09', 1, '2026-02-09 15:12:04', NULL, NULL, 1, '2026-04-12 15:49:21', NULL, NULL, NULL, NULL),
(19, 'Guy Underwood', 'Sylvester Adams', 1, 'guqolof@mailinator.com', '9876543210', 'Birthday Party', '1981-05-31', '10:00 AM - 12:00 PM', 25, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Reiciendis anim quis', '2026-02-10', 1, '2026-02-10 12:42:09', NULL, NULL, 1, '2026-04-12 15:48:45', NULL, NULL, NULL, NULL),
(20, 'Guy Underwood', 'Sylvester Adams', 1, 'guqolof@mailinator.com', '9876543210', 'Birthday Party', '1981-05-31', '10:00 AM - 12:00 PM', 25, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Reiciendis anim quis', '2026-02-10', 1, '2026-02-10 12:42:11', NULL, NULL, 1, '2026-04-12 15:48:50', NULL, NULL, NULL, NULL),
(21, 'Germaine Gamble', 'Lael Joyce', 13, 'zypukigyz@mailinator.com', '9876543211', 'Birthday Party', '2010-07-21', '5:30 PM - 7:30 PM', 25, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Laborum Nemo quam a', '2026-02-11', 1, '2026-02-11 19:21:24', NULL, NULL, 1, '2026-04-12 15:48:43', NULL, NULL, NULL, NULL),
(22, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:16:40', NULL, NULL, 1, '2026-04-12 15:48:52', NULL, NULL, NULL, NULL),
(23, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:16:55', NULL, NULL, 1, '2026-04-12 15:48:41', NULL, NULL, NULL, NULL),
(24, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:16:55', NULL, NULL, 1, '2026-04-12 15:48:39', NULL, NULL, NULL, NULL),
(25, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:16:55', NULL, NULL, 1, '2026-04-12 15:49:55', NULL, NULL, NULL, NULL),
(26, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:16:55', NULL, NULL, 1, '2026-04-12 15:48:54', NULL, NULL, NULL, NULL),
(27, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:16:55', NULL, NULL, 1, '2026-04-12 15:49:52', NULL, NULL, NULL, NULL),
(28, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:16:55', NULL, NULL, 1, '2026-04-12 15:48:56', NULL, NULL, NULL, NULL),
(29, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:19', NULL, NULL, 1, '2026-04-12 15:48:58', NULL, NULL, NULL, NULL),
(30, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:19', NULL, NULL, 1, '2026-04-12 15:49:00', NULL, NULL, NULL, NULL),
(31, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:19', NULL, NULL, 1, '2026-04-12 15:49:02', NULL, NULL, NULL, NULL),
(32, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:21', NULL, NULL, 1, '2026-04-12 15:48:34', NULL, NULL, NULL, NULL),
(33, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:27', NULL, NULL, 1, '2026-04-12 15:48:32', NULL, NULL, NULL, NULL),
(34, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:28', NULL, NULL, 1, '2026-04-12 15:48:30', NULL, NULL, NULL, NULL),
(35, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:28', NULL, NULL, 1, '2026-04-12 15:48:36', NULL, NULL, NULL, NULL),
(36, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:29', NULL, NULL, 1, '2026-04-12 15:49:04', NULL, NULL, NULL, NULL),
(37, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:29', NULL, NULL, 1, '2026-04-12 15:49:06', NULL, NULL, NULL, NULL),
(38, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:29', NULL, NULL, 1, '2026-04-12 15:48:27', NULL, NULL, NULL, NULL),
(39, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:29', NULL, NULL, 1, '2026-04-12 15:48:25', NULL, NULL, NULL, NULL),
(40, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:30', NULL, NULL, 1, '2026-04-12 15:48:23', NULL, NULL, NULL, NULL),
(41, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:30', NULL, NULL, 1, '2026-04-12 15:49:08', NULL, NULL, NULL, NULL),
(42, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:30', NULL, NULL, 1, '2026-04-12 15:48:21', NULL, NULL, NULL, NULL),
(43, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:31', NULL, NULL, 1, '2026-04-12 15:49:25', NULL, NULL, NULL, NULL),
(44, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:31', NULL, NULL, 1, '2026-04-12 15:48:19', NULL, NULL, NULL, NULL),
(45, 'Amery Hardy', 'Gloria Silva', 3, 'test@gmail.com', '6787689989', 'Birthday Party', '2017-08-01', '10:00 AM - 12:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Consequuntur in sed ', '2026-02-12', 1, '2026-02-12 14:17:32', NULL, NULL, 1, '2026-04-12 15:49:28', NULL, NULL, NULL, NULL),
(46, 'Keaton Calhoun', 'Xantha Hurley', 6, 'xesowymev@mailinator.com', '9876543211', 'Birthday Party', '1996-08-30', '8:00 PM - 10:00 PM', 16, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Non laborum Sit te', '2026-02-13', 1, '2026-02-13 16:56:00', NULL, NULL, 1, '2026-04-12 15:49:31', NULL, NULL, NULL, NULL),
(47, 'Keaton Calhoun', 'Xantha Hurley', 6, 'xesowymev@mailinator.com', '9876543211', 'Birthday Party', '1996-08-30', '8:00 PM - 10:00 PM', 16, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Non laborum Sit te', '2026-02-13', 1, '2026-02-13 16:56:01', NULL, NULL, 1, '2026-04-12 15:49:35', NULL, NULL, NULL, NULL),
(48, 'Keaton Calhoun', 'Xantha Hurley', 6, 'xesowymev@mailinator.com', '9876543211', 'Birthday Party', '1996-08-30', '8:00 PM - 10:00 PM', 16, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Non laborum Sit te', '2026-02-13', 1, '2026-02-13 16:56:04', NULL, NULL, 1, '2026-04-12 15:49:38', NULL, NULL, NULL, NULL),
(49, 'Tashya Holden', 'Illiana Parrish', 2, 'goxa@mailinator.com', '9876543211', 'Birthday Party', '1972-04-16', '3:00 PM - 5:00 PM', 25, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Delectus nisi illum', '2026-02-13', 1, '2026-02-13 17:25:34', NULL, NULL, 1, '2026-04-12 15:48:12', NULL, NULL, NULL, NULL),
(50, 'Tobias Buchanan', 'Inga Watson', 14, 'rowutery@mailinator.com', '9876543211', 'Birthday Party', '2024-02-15', '12:30 PM - 2:30 PM', 16, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Voluptatem Providen', '2026-02-13', 1, '2026-02-13 17:26:58', NULL, NULL, 1, '2026-04-12 15:48:07', NULL, NULL, NULL, NULL),
(51, 'Tobias Buchanan', 'Inga Watson', 14, 'rowutery@mailinator.com', '9876543211', 'Birthday Party', '2024-02-15', '12:30 PM - 2:30 PM', 16, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Voluptatem Providen', '2026-02-13', 1, '2026-02-13 17:26:59', NULL, NULL, 1, '2026-04-12 15:48:14', NULL, NULL, NULL, NULL),
(52, 'Kenneth Gordon', 'Olivia Hodges', 13, 'debika@mailinator.com', '9876543211', 'Birthday Party', '1973-07-04', '12:30 PM - 2:30 PM', 16, 'Pre-Booked', 0.00, 0.00, 0.00, 'Partial', 'Pending', 'Voluptatem elit id', '2026-02-13', 1, '2026-02-13 17:36:43', NULL, NULL, 1, '2026-04-12 15:48:03', NULL, NULL, NULL, NULL),
(53, 'Kenneth Gordon', 'Olivia Hodges', 13, 'debika@mailinator.com', '9876543211', 'Birthday Party', '1973-07-04', '12:30 PM - 2:30 PM', 16, 'Pre-Booked', 0.00, 0.00, 0.00, 'Partial', 'Pending', 'Voluptatem elit id', '2026-02-13', 1, '2026-02-13 17:36:46', NULL, NULL, 1, '2026-04-12 15:47:59', NULL, NULL, NULL, NULL),
(54, 'John Doe', 'Alice', 7, 'john@example.com', '9876543210', 'Example', '2026-02-15', '12:00PM-04:00PM', 15, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'testing', '2026-02-13', 1, '2026-02-13 17:36:59', NULL, NULL, 1, '2026-04-12 15:47:55', NULL, NULL, NULL, NULL),
(55, 'Aliquip fugiat liber', 'Veniam aut impedit', 17, 'beja@mailinator.com', '9876543211', 'Minus et et quas pra', '1982-05-02', '21:37', 69, 'Pre-Booked', 70.00, 68.00, 2.00, 'Pending', 'Pending', NULL, '2026-02-13', 1, '2026-02-13 19:07:08', NULL, NULL, 1, '2026-04-12 15:47:52', NULL, NULL, NULL, NULL),
(56, 'rkrest', 'reddy22', 22, 'grkrishnareddy25@gmail.com', '9955503099', 'Birthday Party', '2026-02-26', '10:00 AM - 12:00 PM', 16, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', '', '2026-02-22', 1, '2026-02-22 12:39:49', NULL, NULL, 1, '2026-04-12 15:47:51', NULL, NULL, NULL, NULL),
(57, 'rkrest', 'reddy22', 22, 'grkrishnareddy25@gmail.com', '9955503099', 'Birthday Party', '2026-02-26', '10:00 AM - 12:00 PM', 16, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', '', '2026-02-22', 1, '2026-02-22 12:39:53', NULL, NULL, 1, '2026-04-12 15:47:48', NULL, NULL, NULL, NULL),
(58, 'rkrest', 'reddy22', 22, 'grkrishnareddy25@gmail.com', '9955503099', 'Birthday Party', '2026-02-26', '10:00 AM - 12:00 PM', 16, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', '', '2026-02-22', 1, '2026-02-22 12:39:56', NULL, NULL, 1, '2026-04-12 15:47:57', NULL, NULL, NULL, NULL),
(59, 'rkrest', 'reddy22', 22, 'grkrishnareddy25@gmail.com', '9955503099', 'Birthday Party', '2026-02-26', '10:00 AM - 12:00 PM', 16, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', '', '2026-02-22', 1, '2026-02-22 12:39:57', NULL, NULL, 1, '2026-04-12 15:48:01', NULL, NULL, NULL, NULL),
(60, 'rkrest', 'reddy22', 22, 'grkrishnareddy25@gmail.com', '9955503099', 'Birthday Party', '2026-02-26', '10:00 AM - 12:00 PM', 16, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', '', '2026-02-22', 1, '2026-02-22 12:39:58', NULL, NULL, 1, '2026-04-12 15:48:05', NULL, NULL, NULL, NULL),
(61, 'rkrest', 'reddy22', 22, 'grkrishnareddy25@gmail.com', '9955503099', 'Birthday Party', '2026-02-26', '10:00 AM - 12:00 PM', 16, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', '', '2026-02-22', 1, '2026-02-22 12:39:58', NULL, NULL, 1, '2026-04-12 15:48:17', NULL, NULL, NULL, NULL),
(62, 'rkrest', 'reddy22', 22, 'grkrishnareddy25@gmail.com', '9955503099', 'Birthday Party', '2026-02-26', '10:00 AM - 12:00 PM', 16, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', '', '2026-02-22', 1, '2026-02-22 12:40:36', NULL, NULL, 1, '2026-04-12 15:49:41', NULL, NULL, NULL, NULL),
(63, 'rkrest', 'reddy22', 22, 'grkrishnareddy25@gmail.com', '9955503099', 'Birthday Party', '2026-02-26', '10:00 AM - 12:00 PM', 16, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', '', '2026-02-22', 1, '2026-02-22 12:40:37', NULL, NULL, 1, '2026-04-12 15:49:50', NULL, NULL, NULL, NULL),
(64, 'Xaviera Lyons', 'Vanna Hines', 10, 'teheqe@mailinator.com', '9865173913', 'Birthday Party', '2025-11-30', '12:30 PM - 2:30 PM', 21, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Rerum sit ut in exce', '2026-02-24', 1, '2026-02-24 11:59:48', NULL, NULL, 1, '2026-04-12 15:49:44', NULL, NULL, NULL, NULL),
(65, 'Xaviera Lyons', 'Vanna Hines', 10, 'teheqe@mailinator.com', '9865173913', 'Birthday Party', '2025-11-30', '12:30 PM - 2:30 PM', 21, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Rerum sit ut in exce', '2026-02-24', 1, '2026-02-24 11:59:52', NULL, NULL, 1, '2026-04-12 15:49:57', NULL, NULL, NULL, NULL),
(66, 'Xaviera Lyons', 'Vanna Hines', 10, 'teheqe@mailinator.com', '9865173913', 'Birthday Party', '2025-11-30', '12:30 PM - 2:30 PM', 21, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Rerum sit ut in exce', '2026-02-24', 1, '2026-02-24 11:59:53', NULL, NULL, 1, '2026-04-12 15:49:47', NULL, NULL, NULL, NULL),
(67, 'Xaviera Lyons', 'Vanna Hines', 10, 'teheqe@mailinator.com', '9865173913', 'Birthday Party', '2025-11-30', '12:30 PM - 2:30 PM', 21, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Rerum sit ut in exce', '2026-02-24', 1, '2026-02-24 12:00:20', NULL, NULL, 1, '2026-04-12 15:50:00', NULL, NULL, NULL, NULL),
(68, 'Xaviera Lyons', 'Vanna Hines', 10, 'teheqe@mailinator.com', '9865173913', 'Birthday Party', '2025-11-30', '12:30 PM - 2:30 PM', 21, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Rerum sit ut in exce', '2026-02-24', 1, '2026-02-24 12:00:21', NULL, NULL, 1, '2026-04-12 15:50:10', NULL, NULL, NULL, NULL),
(69, 'Xaviera Lyons', 'Vanna Hines', 10, 'teheqe@mailinator.com', '9865173913', 'Birthday Party', '2025-11-30', '12:30 PM - 2:30 PM', 21, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Rerum sit ut in exce', '2026-02-24', 1, '2026-02-24 12:00:22', NULL, NULL, 1, '2026-04-12 15:50:03', NULL, NULL, NULL, NULL),
(70, 'Xaviera Lyons', 'Vanna Hines', 10, 'teheqe@mailinator.com', '9865173913', 'Birthday Party', '2025-11-30', '12:30 PM - 2:30 PM', 21, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Rerum sit ut in exce', '2026-02-24', 1, '2026-02-24 12:00:26', NULL, NULL, 1, '2026-04-12 15:50:06', NULL, NULL, NULL, NULL),
(71, 'Xaviera Lyons', 'Vanna Hines', 10, 'teheqe@mailinator.com', '9865173913', 'Birthday Party', '2025-11-30', '12:30 PM - 2:30 PM', 21, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Rerum sit ut in exce', '2026-02-24', 1, '2026-02-24 12:01:33', NULL, NULL, 1, '2026-04-12 15:50:20', NULL, NULL, NULL, NULL),
(72, 'Xaviera Lyons', 'Vanna Hines', 10, 'teheqe@mailinator.com', '9865173913', 'Birthday Party', '2025-11-30', '12:30 PM - 2:30 PM', 21, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Rerum sit ut in exce', '2026-02-24', 1, '2026-02-24 12:01:34', NULL, NULL, 1, '2026-04-12 15:50:15', NULL, NULL, NULL, NULL),
(73, 'Xaviera Lyons', 'Vanna Hines', 10, 'teheqe@mailinator.com', '9865173913', 'Birthday Party', '2025-11-30', '12:30 PM - 2:30 PM', 21, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Rerum sit ut in exce', '2026-02-24', 1, '2026-02-24 12:01:35', NULL, NULL, 1, '2026-04-12 15:50:18', NULL, NULL, NULL, NULL),
(74, 'Erich Spence', 'Linus Payne', 7, 'buzozyvy@mailinator.com', '9585534564', 'Birthday Party', '2023-04-22', '8:00 PM - 10:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Pariatur Dolorem ve', '2026-02-24', 1, '2026-02-24 12:03:21', NULL, NULL, 1, '2026-04-12 15:51:08', NULL, NULL, NULL, NULL),
(75, 'Erich Spence', 'Linus Payne', 7, 'buzozyvy@mailinator.com', '9585534564', 'Birthday Party', '2023-04-22', '8:00 PM - 10:00 PM', 11, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Pariatur Dolorem ve', '2026-02-24', 1, '2026-02-24 12:03:23', NULL, NULL, 1, '2026-04-12 15:50:23', NULL, NULL, NULL, NULL),
(76, 'Blaine Shepard', 'McKenzie Douglas', 10, 'cahu@mailinator.com', '9706526842', 'Birthday Party', '2015-01-06', '10:00 AM - 12:00 PM', 21, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Porro quisquam exerc', '2026-02-24', 1, '2026-02-24 12:04:30', NULL, NULL, 1, '2026-04-12 15:50:54', NULL, NULL, NULL, NULL),
(77, 'Blaine Shepard', 'McKenzie Douglas', 10, 'cahu@mailinator.com', '9706526842', 'Birthday Party', '2015-01-06', '10:00 AM - 12:00 PM', 21, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Porro quisquam exerc', '2026-02-24', 1, '2026-02-24 12:04:33', NULL, NULL, 1, '2026-04-12 15:50:25', NULL, NULL, NULL, NULL),
(78, 'Blaine Shepard', 'McKenzie Douglas', 10, 'cahu@mailinator.com', '9706526842', 'Birthday Party', '2015-01-06', '10:00 AM - 12:00 PM', 21, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Porro quisquam exerc', '2026-02-24', 1, '2026-02-24 12:04:34', NULL, NULL, 1, '2026-04-12 15:50:28', NULL, NULL, NULL, NULL),
(79, 'Wyoming Reese', 'Bree Smith', 6, 'sezis@mailinator.com', '9399903335', 'Birthday Party', '1970-09-15', '3:00 PM - 5:00 PM', 5, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Eu sed soluta vel co', '2026-02-24', 1, '2026-02-24 12:06:20', NULL, NULL, 1, '2026-04-12 15:50:31', NULL, NULL, NULL, NULL),
(80, 'Wyoming Reese', 'Bree Smith', 6, 'sezis@mailinator.com', '9399903335', 'Birthday Party', '1970-09-15', '3:00 PM - 5:00 PM', 5, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', 'Eu sed soluta vel co', '2026-02-24', 1, '2026-02-24 12:06:29', NULL, NULL, 1, '2026-04-12 15:50:33', NULL, NULL, NULL, NULL),
(81, 'September Sanders', 'Idona Joyner', 7, 'nafy@mailinator.com', '9876543210', 'Birthday Party', '1982-11-08', '12:30 PM - 2:30 PM', 11, 'Pre-Booked', 0.00, 0.00, 0.00, 'Partial', 'Pending', 'Earum mollit nulla l', '2026-02-24', 1, '2026-02-24 12:07:41', NULL, NULL, 1, '2026-04-12 15:50:48', NULL, NULL, NULL, NULL),
(82, 'Regan Ward', 'Zeus Johnson', 15, 'cokuqizop@mailinator.com', '9876543210', 'Birthday Party', '1982-09-21', '10:00 AM - 12:00 PM', 25, 'Pre-Booked', 0.00, 0.00, 0.00, 'Partial', 'Pending', 'Nam porro dignissimo', '2026-02-24', 1, '2026-02-24 14:50:53', NULL, NULL, 1, '2026-04-12 15:50:36', NULL, NULL, NULL, NULL),
(83, 'Nobita', 'Doremon', 10, 'madakisy@mailinator.com', '9876543211', 'Birthday Party', '2026-03-26', '3:00 PM - 5:00 PM', 16, 'Pre-Booked', 0.00, 0.00, 0.00, 'Partial', 'Pending', 'Vero inventore saepe', '2026-02-24', 1, '2026-02-24 15:03:21', NULL, NULL, 1, '2026-04-12 15:50:51', NULL, NULL, NULL, NULL),
(84, 'geon', 'dekisuki', 14, 'hiwohok@mailinator.com', '9876543211', 'Birthday Party', '2020-06-17', '10:00 AM - 12:00 PM', 21, 'Pre-Booked', 0.00, 0.00, 0.00, 'Partial', 'Pending', 'Dolore hic incidunt', '2026-02-24', 1, '2026-02-24 15:04:09', NULL, NULL, 1, '2026-04-12 15:51:10', NULL, NULL, NULL, NULL),
(85, 'doremon', 'suzuka', 10, 'tydu@mailinator.com', '9876543211', 'Birthday Party', '2026-03-23', '10:00 AM - 12:00 PM', 21, 'Pre-Booked', 0.00, 0.00, 0.00, 'Partial', 'Pending', 'Tempore reprehender', '2026-02-24', 1, '2026-02-24 15:32:37', NULL, NULL, 1, '2026-04-12 15:51:13', NULL, NULL, NULL, NULL),
(86, 'John Doe', 'Alice', 7, 'john@example.com', '9876543210', 'Example', '2026-02-15', '12:00PM-04:00PM', 15, 'Pre-Booked', 2000.00, 500.00, 1500.00, 'Partial', 'Pending', NULL, '2026-02-24', 1, '2026-02-24 17:55:07', NULL, NULL, 1, '2026-04-12 15:51:15', NULL, NULL, NULL, NULL),
(87, 'nobisuke', 'kitretsu', 9, 'runyz@mailinator.com', '9871236544', 'Birthday Party', '2026-03-12', '12:00 PM - 1:00 PM', 21, 'Pre-Booked', 1000.00, 500.00, 500.00, 'Pending', 'Pending', 'Officia voluptas lab', '2026-02-24', 1, '2026-02-24 18:09:49', 1, '2026-02-24 18:10:14', 1, '2026-04-12 15:47:30', NULL, NULL, NULL, NULL),
(88, 'nobita', 'doremon', 9, 'kyza@mailinator.com', '9874563211', 'Magna et id omnis si', '2026-03-20', '12:00 PM - 1:00 PM', 7, 'Pre-Booked', 14.00, 5.00, 9.00, 'Pending', 'Pending', NULL, '2026-02-24', 1, '2026-02-24 18:11:04', NULL, NULL, 1, '2026-04-12 15:47:27', NULL, NULL, NULL, NULL),
(89, 'Guinevere Butler', 'Constance Bowman', 14, 'ripo@mailinator.com', '9807614680', 'Birthday Party', '2021-09-03', '12:00 PM - 1:00 PM', 21, 'Pre-Booked', 0.00, 0.00, 0.00, 'Partial', 'Pending', 'Nisi nisi quam venia', '2026-03-02', 1, '2026-03-02 09:55:41', NULL, NULL, 1, '2026-04-12 15:47:26', NULL, NULL, NULL, NULL),
(90, 'gugjhghjg', 'Gautham', 10, 'hjhjhjh@hhh.vbb', '8878878778', 'Birthday Party', '2026-03-11', '10:00 AM - 12:01 PM', 21, 'Pre-Booked', 0.00, 0.00, 0.00, 'Partial', 'Pending', '', '2026-03-03', 1, '2026-03-03 21:52:18', NULL, NULL, 1, '2026-04-12 15:47:24', NULL, NULL, NULL, NULL),
(91, 'bird', 'vinod', 2, 'vinod5448@gmail.com', '9000000003', 'Birthday Party', '2026-03-07', '10:00 AM - 12:01 PM', 5, 'Pre-Booked', 0.00, 0.00, 0.00, 'Partial', 'Pending', 'ASDFASDF\nASDFASD\nASDF\nAS\nDF\nASDF\nAS\nDF\nASDF\nASD\nF\nASD\nASD\nFAS\nDF\nASD\nF\nA\nDSF', '2026-03-06', 1, '2026-03-06 12:09:50', NULL, NULL, 1, '2026-04-12 15:47:21', NULL, NULL, NULL, NULL),
(92, 'bird2', 'vinod', 3, 'vinod5448@gmail.com', '9000000003', 'Birthday Party', '2026-03-07', '10:00 AM - 12:01 PM', 5, 'Pre-Booked', 200.00, 200.00, 0.00, 'Pending', 'Pending', 'aSDCFASDFVASDFASD ASDF ASDF ASDF ASDF ASDFASDF ASDF ASDF ASDF ASDF A SDFASD FASDF ASD FASDF AAS DFASDF ASDF ASD F', '2026-03-07', 1, '2026-03-07 10:22:28', 1, '2026-03-07 13:03:46', 1, '2026-04-12 15:47:18', NULL, NULL, NULL, NULL),
(93, 'TEST', 'TEST', 1, 'test@gmail.com', '9639639639', 'Birthday Party', '2026-03-07', '12:00 PM - 1:00 PM', 25, 'Pre-Booked', 0.00, 0.00, 0.00, 'Partial', 'Pending', 'ASD ASDF ASDF ASD FASDF ASD ASD FAS DF', '2026-03-07', 1, '2026-03-07 10:24:43', NULL, NULL, 1, '2026-04-12 15:47:16', NULL, NULL, NULL, NULL),
(94, 'hemanth', 'SASI', 10, 'hemanthsai@gmail.com', '9874563211', 'Birthday Party', '2026-04-04', '10:00 AM - 12:01 PM', 21, 'Pre-Booked', 100.00, 100.00, 0.00, '', 'Pending', 'veg only', '2026-04-02', 1, '2026-04-02 15:52:37', 1, '2026-04-07 11:36:44', 1, '2026-04-12 15:47:14', NULL, NULL, NULL, NULL),
(95, 'Hemanth', 'sasi', 10, 'hemanth@gmail.com', '9874665321', 'surprise party', '2026-09-04', '12:00 PM - 1:00 PM', 27, 'Pre-Booked', 100.00, 20.00, 80.00, '', 'Pending', NULL, '2026-04-07', 1, '2026-04-07 11:43:53', NULL, NULL, 1, '2026-04-12 15:47:12', NULL, NULL, NULL, NULL),
(96, 'tetet', 'naveen', 18, 'tetetete@gmail.com', '9966604099', 'Birthday Party', '2026-04-15', '10:00 AM - 12:01 PM', 20, 'Pre-Booked', 0.00, 0.00, 0.00, 'Partial', 'Pending', 'test', '2026-04-07', 1, '2026-04-07 20:35:21', NULL, NULL, 1, '2026-04-12 15:47:08', NULL, NULL, NULL, NULL),
(97, 'radhatest', 'RK', 18, 'grkrishnareddy@gmail.com', '9966604099', 'Birthday Party', '2026-04-28', '10:00 AM - 12:01 PM', 25, 'Pre-Booked', 0.00, 0.00, 0.00, 'Partial', 'Pending', '', '2026-04-23', 1, '2026-04-23 14:24:03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(98, 'siri', 'Dhruva', 8, 'n.shirisha777@gmail.com', '9100649694', 'Birthday Party', '2026-04-25', '12:00 PM - 1:00 PM', 30, 'Pre-Booked', 0.00, 0.00, 0.00, 'Partial', 'Pending', '', '2026-04-23', 1, '2026-04-23 14:43:03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_name` varchar(155) NOT NULL,
  `activity_id` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `group_size` int(11) NOT NULL,
  `message` text NOT NULL,
  `event_date` varchar(30) DEFAULT NULL,
  `event_time` varchar(30) DEFAULT NULL,
  `duration_hours` varchar(30) DEFAULT NULL,
  `status` enum('Pending','Confirm','Cancel','Active','Inactive') NOT NULL DEFAULT 'Pending',
  `create_audit_id` int(11) DEFAULT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_name`, `activity_id`, `email`, `phone`, `group_size`, `message`, `event_date`, `event_time`, `duration_hours`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 'Sudhakar bv', 'Birthday', 'sudhakarbv144@gmail.com', '+916300839532', 13, 'good team', NULL, NULL, NULL, 'Pending', 1, '2026-02-10 22:35:55', 1, '2026-02-10 22:36:16', 1, '2026-04-12 15:40:28'),
(2, 'Sudhakar', 'Birthday', 'sudhakar@gmail.com', '6300839532', 12, 'test', NULL, NULL, NULL, 'Active', 0, '2026-02-11 20:56:01', NULL, NULL, 1, '2026-04-12 15:40:19'),
(4, 'Sudhakar', 'Birthday', 'sudhakar@gmail.com', '6300839532', 12, 'test', '12-02-2026', '13:00', '3 hrs', 'Active', 0, '2026-02-11 21:12:15', NULL, NULL, 1, '2026-04-12 15:40:35'),
(5, 'rawytidobu', 'Birthday', 'qufi@mailinator.com', '9876543211', 909, 'Quia saepe non beata', '11-02-2026', '17:34', '11 hrs', 'Active', 0, '2026-02-11 21:15:09', NULL, NULL, 1, '2026-04-12 15:40:41'),
(6, 'noxoqisa', 'Coorporate', 'xexuqibusa@mailinator.com', '9363804680', 761, 'Alias deserunt id ma', '12-02-2026', '05:59', '5 hrs', 'Active', 0, '2026-02-12 14:06:02', NULL, NULL, 1, '2026-04-12 15:40:47'),
(7, '^&#^@&#^&@^#&@^&%#%#%$#%$%#$%#&%$&#%$&%#&$%#&%$&#%&%#&%R#&^%$&#%$&%#&$%#%$&#%$&%#^', 'Birthday', 'anvesh@yopmail.com', '9999999999', 999, 'yes', '06-03-2026', '04:53', '19 hrs', 'Active', 0, '2026-03-06 09:54:24', NULL, NULL, 1, '2026-04-07 10:33:25'),
(8, 'test', 'Event Space', 'test@gmail.com', '9000000003', 33, 'testing', '06-03-2026', '12:59', '3 hrs', 'Active', 0, '2026-03-06 11:58:41', NULL, NULL, 1, '2026-04-12 15:40:51'),
(9, 'test', 'Event Space', 'birdvinod@gmail.com', '8919671663', 1, 'tha;lskdjf;laksdf a;s as;ldkfj; ;lka sdf;lkajsdf;  ;alksdjf ;alskd  ;alskdfj a;lskdfasdf ;alksdjf a;lskdjf ;alksdjf ;lkj ;laksjdf ;alksdjf ;alsdfkja ;sdf;lakjs df', '06-03-2026', '12:00', '1 hrs', 'Active', 0, '2026-03-06 12:00:51', NULL, NULL, 1, '2026-04-12 15:40:15'),
(10, 'zepozetul', 'Event Space', 'luwe@mailinator.com', '9874563211', 23, 'Nulla molestias ullam ullamco consectetur nisi id architecto quae maxime mollit autem dicta rerum dignissimos velit ratione labore tempore obcaecati', '13-03-2026', '23:02', '1 hrs', 'Active', 0, '2026-03-06 16:23:11', NULL, NULL, 1, '2026-04-12 15:40:11'),
(11, 'sudhhakar', '1', 'sudhakarbv144@gmail.com', '1234567895', 5, 'test', '04-04-2026', '14:00', '3 hrs', 'Active', 0, '2026-04-02 12:16:57', 1, '2026-04-07 11:08:50', 1, '2026-04-12 15:40:08'),
(12, 'Hemanth', 'Corporate', 'hemanth@gmail.com', '7984651239', 21, 'VEG FOOD ONLY', '04-04-2026', '16:30', '2 hrs', 'Active', 0, '2026-04-02 15:48:07', 1, '2026-04-07 10:59:09', 1, '2026-04-12 15:40:04'),
(13, 'Hemanth', 'Birtday', 'hemanthsai@gmail.com', '9874563215', 25, 'this is party\n', '2026-04-08', '10:00', '2 hrs', 'Active', 1, '2026-04-07 10:40:45', 1, '2026-04-07 11:26:02', 1, '2026-04-12 15:39:57'),
(16, 'sudhhakar', 'Birthday', 'sudhakarbv144@gmail.com', '1234567895', 25, 'tests', '2026-07-03', '12:00', '3', 'Active', 1, '2026-04-07 11:04:27', 1, '2026-04-07 11:26:15', 1, '2026-04-12 15:39:52'),
(17, 'sarika', 'Birthday', 'n.shirisha777@gmail.com', '9100649694', 50, '', '28-04-2026', '16:00', '5 hrs', 'Active', 0, '2026-04-21 15:46:56', NULL, NULL, NULL, NULL),
(18, 'shravani', 'Event Space', 'n.shirisha777@gmail.com', '9100649694', 50, 'Corporate meeting', '25-04-2026', '11:00', '3 hrs', 'Active', 0, '2026-04-21 15:49:42', NULL, NULL, NULL, NULL),
(19, 'sarika', 'Corporate', 'n.shirisha777@gmail.com', '9100649694', 23, '', '28-04-2026', '11:30', '5 hrs', 'Active', 0, '2026-04-23 14:40:28', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `create_audit_id` int(11) DEFAULT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 'Outdoor', 'Active', 1, '2026-01-14 13:18:31', NULL, NULL, NULL, NULL),
(2, 'Indoor', 'Active', 1, '2026-01-14 13:18:41', 1, '2026-02-04 22:03:36', NULL, NULL),
(3, 'Go-Karting', 'Active', 1, '2026-01-14 13:18:56', 1, '2026-02-04 22:03:34', NULL, NULL),
(4, 'Racing Arena', 'Inactive', 1, '2026-01-14 13:20:02', 1, '2026-02-21 16:31:37', NULL, NULL),
(5, 'Sports', 'Inactive', 1, '2026-01-28 15:22:22', 1, '2026-01-28 15:54:28', 5, '2026-01-28 15:54:43'),
(6, 'Sport cricket', 'Inactive', 1, '2026-01-28 15:41:39', 1, '2026-01-28 15:42:02', 6, '2026-01-28 15:50:49'),
(7, 'Sports', 'Inactive', 1, '2026-01-28 15:54:51', 1, '2026-02-22 21:52:30', NULL, NULL),
(8, 'SPorts2', 'Active', 1, '2026-01-28 16:16:15', NULL, NULL, 8, '2026-01-28 16:18:14'),
(9, 'WOMEN', 'Active', 1, '2026-01-28 16:18:20', NULL, NULL, 9, '2026-01-28 16:22:02'),
(10, 'Sample Test', 'Active', 1, '2026-01-28 17:54:18', 1, '2026-01-28 17:55:16', 10, '2026-01-28 18:03:16'),
(11, 'sample1Test', 'Inactive', 1, '2026-01-28 17:55:23', 1, '2026-01-28 17:55:35', 11, '2026-01-28 17:55:38'),
(12, 'sample', 'Active', 1, '2026-01-28 18:03:07', NULL, NULL, 12, '2026-01-28 18:03:13'),
(13, 'test', 'Active', 1, '2026-02-10 16:16:33', NULL, NULL, 13, '2026-02-10 16:27:46'),
(14, 'Adventure', 'Active', 1, '2026-02-12 13:32:02', NULL, NULL, NULL, NULL),
(15, 'testing', 'Active', 1, '2026-04-28 17:32:30', NULL, NULL, 15, '2026-04-28 17:32:36');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `phone2` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `email2` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `linkedin` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `map` text DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) DEFAULT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `phone`, `phone2`, `email`, `email2`, `instagram`, `facebook`, `youtube`, `linkedin`, `address`, `map`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, '7719333444', '1234567895', 'contact@fnfarena.com', 'groupbooking@fnfarena.com', 'https://www.instagram.com/fnfarena', 'https://www.facebook.com/fnfkarting/', 'https://www.youtube.com/@FNFARENA', 'https://in.linkedin.com/company/fnfarena', 'FNF ARENA Janwada, Hyderabad, Telangana 500075', '<iframe \n  src=\"https://maps.google.com/maps?hl=en&q=FNF%20ARENA%20Janwada,%20Hyderabad,%20Telangana%20500075&z=16&output=embed\" \n  width=\"100%\" \n  height=\"450\" \n  style=\"border:0;\" \n  allowfullscreen \n  loading=\"lazy\" \n  referrerpolicy=\"no-referrer-when-downgrade\">\n</iframe>', 'Inactive', NULL, NULL, 1, '2026-04-28 17:36:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `corporate_bookings`
--

CREATE TABLE `corporate_bookings` (
  `id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `contact_person` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `event_type_id` varchar(255) NOT NULL,
  `participants` varchar(50) NOT NULL,
  `preferred_date` date NOT NULL,
  `time` varchar(50) NOT NULL,
  `total` varchar(30) NOT NULL,
  `advance` varchar(30) DEFAULT NULL,
  `balance` varchar(30) DEFAULT NULL,
  `payment_status` enum('Pending','Partial','Paid') NOT NULL DEFAULT 'Pending',
  `requirements` text DEFAULT NULL,
  `status` enum('Pending','Approved','Confirmed','Cancelled') DEFAULT 'Pending',
  `booking_date` date DEFAULT curdate(),
  `confirm_audit_id` int(11) DEFAULT NULL,
  `confirmed_audit_time` datetime DEFAULT NULL,
  `cancelled_audit_id` int(11) DEFAULT NULL,
  `cancelled_audit_time` datetime DEFAULT NULL,
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime NOT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `corporate_bookings`
--

INSERT INTO `corporate_bookings` (`id`, `company_name`, `contact_person`, `email`, `phone`, `event_type_id`, `participants`, `preferred_date`, `time`, `total`, `advance`, `balance`, `payment_status`, `requirements`, `status`, `booking_date`, `confirm_audit_id`, `confirmed_audit_time`, `cancelled_audit_id`, `cancelled_audit_time`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 'ABC Technologies Pvt Ltd', 'Sudhakar', 'contact@abc.com', '9876543210', '1', '2', '2026-02-15', '10:00AM-12:00PM', '40000', '20000', '20000', 'Pending', 'Need projector and lunch arrangement', 'Cancelled', '2026-02-10', 1, '2026-01-22 16:11:17', 1, '2026-01-22 16:11:29', 1, '2026-01-22 16:10:24', 1, '2026-01-26 14:44:22', 1, '2026-04-12 15:47:03'),
(2, 'ABC Technologies Pvt Ltd', 'Sudhakar', 'contact@abc.com', '9876543210', '1', '2', '2026-02-15', '10:00AM-12:00PM', '40000', '20000', '20000', 'Pending', 'Need projector and lunch arrangement', 'Pending', '2026-01-26', NULL, NULL, NULL, NULL, 1, '2026-01-26 14:41:33', NULL, NULL, 1, '2026-04-12 15:47:01'),
(3, 'ABC Technologies Pvt Ltd', 'Sudhakar', 'contact@abc.com', '9876543210', '1', '', '2026-02-15', '', '0', '0', '0', 'Pending', 'Need projector and lunch arrangement', 'Pending', '2026-02-10', NULL, NULL, NULL, NULL, 0, '2026-02-05 17:52:04', NULL, NULL, 1, '2026-04-12 15:46:48'),
(4, 'ABC Technologies Pvt Ltd', 'Sudhakar', 'contact@abc.com', '9876543210', '1', '', '2026-02-15', '', '0', '0', '0', 'Pending', 'Need projector and lunch arrangement', 'Pending', '2026-02-10', NULL, NULL, NULL, NULL, 0, '2026-02-05 17:53:11', NULL, NULL, 1, '2026-04-12 15:46:59'),
(5, 'sa', 'Sahithi Kandula', 'kandulasahithi3006@gmail.com', '916302223488', '1', '', '2026-02-08', '', '0', '0', '0', 'Pending', 'hii', 'Pending', '2026-02-05', NULL, NULL, NULL, NULL, 0, '2026-02-05 17:53:49', NULL, NULL, 1, '2026-04-12 15:46:50'),
(6, 'sa', 'Sahithi Kandula', 'kandulasahithi3006@gmail.com', '6302223488', '1', '', '2026-02-10', '', '0', '0', '0', 'Pending', 'hi', 'Pending', '2026-02-05', NULL, NULL, NULL, NULL, 0, '2026-02-05 22:39:04', NULL, NULL, 1, '2026-04-12 15:46:52'),
(7, 'sa', 'Sahithi Kandula', 'kandulasahithi3006@gmail.com', '916302223488', '1', '', '2026-02-26', '', '0', '0', '0', 'Pending', 'ss', 'Pending', '2026-02-05', NULL, NULL, NULL, NULL, 0, '2026-02-05 22:39:44', NULL, NULL, 1, '2026-04-12 15:46:54'),
(8, 'Suscipit nobis exped', 'Nostrud itaque rerum', 'vawun@gmail.com', '9234567899', '1', '', '1988-10-27', '', '0', '0', '0', 'Pending', 'Maxime laudantium i', 'Pending', '2026-02-09', NULL, NULL, NULL, NULL, 1, '2026-02-09 10:21:10', NULL, NULL, 1, '2026-04-12 15:46:40'),
(9, 'Tenetur alias tempor', 'Molestiae necessitat', 'vyqyxafijy@mailinator.com', '9465767670', '1', '', '1986-07-14', '', '0', '0', '0', 'Pending', 'Consequatur labore ', 'Pending', '2026-02-09', NULL, NULL, NULL, NULL, 1, '2026-02-09 10:23:19', 1, '2026-02-09 10:24:06', 1, '2026-04-12 15:46:38'),
(10, 'Guzman and Serrano Traders', 'Dolor eveniet imped', 'vybixiw@mailinator.com', '9876543211', '1', '', '2024-02-05', '', '0', '0', '0', 'Pending', 'Est rerum animi lor', 'Pending', '2026-02-10', NULL, NULL, NULL, NULL, 0, '2026-02-10 11:08:40', NULL, NULL, 1, '2026-04-12 15:46:43'),
(11, 'Peck and Lang Co', 'Dolore amet sapient', 'boteluzab@mailinator.com', '9876543211', '1', '', '1992-03-14', '', '0', '0', '0', 'Pending', 'At dolore aliquip qu', 'Pending', '2026-02-11', NULL, NULL, NULL, NULL, 0, '2026-02-11 19:21:50', NULL, NULL, 1, '2026-04-12 15:46:36'),
(12, 'Sharp and Holcomb Plc', 'Velit totam qui in c', 'xilu@mailinator.com', '9876543211', '1', '', '1987-12-09', '', '0', '0', '0', 'Pending', 'Rerum nisi labore of', 'Pending', '2026-02-11', NULL, NULL, NULL, NULL, 0, '2026-02-11 19:22:09', NULL, NULL, 1, '2026-04-12 15:46:56'),
(13, 'Rice and Browning LLC', 'Voluptas commodi ali', 'losajym@mailinator.com', '5665654789', '1', '', '2007-09-07', '', '0', '0', '0', 'Pending', 'Veniam consectetur ', 'Pending', '2026-02-12', NULL, NULL, NULL, NULL, 0, '2026-02-12 14:45:52', NULL, NULL, 1, '2026-04-12 15:46:45'),
(14, 'Accusantium sit cons', 'Laudantium temporib', 'pocaqakif@mailinator.com', '7686768768', '1', '', '1993-06-03', '', '0', '0', '0', 'Pending', 'Qui tempore et in t', 'Pending', '2026-02-13', NULL, NULL, NULL, NULL, 1, '2026-02-13 17:09:38', NULL, NULL, 1, '2026-04-12 15:46:34'),
(15, 'Bates Vincent Traders', 'Anim dolor necessita', 'wupo@mailinator.com', '9876543211', '1', '', '2015-04-04', '', '0', '0', '0', 'Pending', 'Dolore laborum Moll', 'Pending', '2026-02-13', NULL, NULL, NULL, NULL, 0, '2026-02-13 17:39:16', NULL, NULL, 1, '2026-04-12 15:46:31'),
(16, 'Ratliff Baird Traders', 'Ad nulla cum commodi', 'tinegifuv@mailinator.com', '9876543211', '1', '', '2012-03-02', '', '0', '0', '0', 'Pending', 'Id corrupti quia qu', 'Pending', '2026-02-13', NULL, NULL, NULL, NULL, 0, '2026-02-13 17:39:38', NULL, NULL, 1, '2026-04-12 15:46:29'),
(17, 'Ratione eu voluptati', 'At error est aut con', 'lyrijut@mailinator.com', '9876543211', '1', '', '1980-08-11', '', '0', '0', '0', 'Pending', 'Pariatur Dolor solu', 'Pending', '2026-02-13', NULL, NULL, NULL, NULL, 1, '2026-02-13 19:05:46', 1, '2026-02-13 19:06:07', 1, '2026-04-12 15:46:27'),
(18, 'amazon', '9966604099', 'grkrishnareddy@gmail.com', '9966604099', '1', '', '2026-02-27', '', '0', '0', '0', 'Pending', '', 'Pending', '2026-02-22', NULL, NULL, NULL, NULL, 0, '2026-02-22 12:10:43', 1, '2026-02-22 12:12:22', 1, '2026-04-12 15:46:25'),
(19, 'rttetet', 'ttetet', 'tetete@gmail.com', '9955504099', '1', '', '2026-02-27', '', '0', '0', '0', 'Pending', 'testetet', 'Pending', '2026-02-22', NULL, NULL, NULL, NULL, 0, '2026-02-22 13:04:52', 1, '2026-02-22 13:06:30', 1, '2026-04-12 15:46:23'),
(20, '21stcentury', 'doremon', 'zalodove@mailinator.com', '9876543211', '1', '', '2005-09-01', '', '0', '0', '0', 'Pending', 'Quibusdam ipsa sequ', 'Pending', '2026-02-24', NULL, NULL, NULL, NULL, 0, '2026-02-24 15:54:21', NULL, NULL, 1, '2026-04-12 15:46:20'),
(21, 'Spears and Eaton Co', 'Mollitia qui tempor ', 'dareca@mailinator.com', '9876541233', 'Ut quis et ut aut at', '', '2000-04-09', '', '0', '0', '0', 'Pending', 'Ex magnam officia do', 'Pending', '2026-02-24', NULL, NULL, NULL, NULL, 0, '2026-02-24 16:31:52', NULL, NULL, 1, '2026-04-12 15:46:18'),
(22, 'Sapiente nostrud ali', 'Consequatur Est mo', 'vodedu@mailinator.com', '9871234566', '2', '', '1978-12-07', '', '0', '0', '0', 'Pending', 'Voluptas lorem aliqu', 'Pending', '2026-02-24', NULL, NULL, NULL, NULL, 1, '2026-02-24 17:01:45', 1, '2026-02-24 17:02:37', 1, '2026-04-12 15:46:16'),
(23, 'Sequi totam dolor ex', 'Distinctio Ut et au', 'merylyv@mailinator.com', '9876541231', 'team meeting', '', '1997-06-12', '', '0', '0', '0', 'Pending', 'Ab officia doloremqu', 'Pending', '2026-02-24', NULL, NULL, NULL, NULL, 1, '2026-02-24 17:16:48', NULL, NULL, 1, '2026-04-12 15:46:13'),
(24, 'Voluptatibus non cup', 'Eu est in qui mollit', 'kuhi@mailinator.com', '9876544561', 'Deserunt ut aperiam ', '', '2001-01-27', '', '0', '0', '0', 'Pending', 'Velit mollit amet d', 'Pending', '2026-02-24', NULL, NULL, NULL, NULL, 1, '2026-02-24 17:27:29', NULL, NULL, 1, '2026-04-12 15:46:11'),
(25, 'ABC Technologies Pvt Ltd', 'Sudhakar', 'contact@abc.com', '9876543210', '1', '2', '2026-02-15', '', '40000', '20000', '20000', 'Pending', 'Need projector and lunch arrangement', 'Pending', '2026-02-24', NULL, NULL, NULL, NULL, 1, '2026-02-24 17:29:33', NULL, NULL, 1, '2026-04-12 15:46:09'),
(26, 'dekisuki', 'Consequat Magni com', 'viha@mailinator.com', '9876544569', 'Provident illo in o', '8', '2026-03-20', '7', '73', '17', '56', 'Pending', 'Tenetur dolor eligen', 'Pending', '2026-02-24', NULL, NULL, NULL, NULL, 1, '2026-02-24 17:33:01', NULL, NULL, 1, '2026-04-12 15:46:07'),
(27, 'Hall Hancock LLC', 'Vel facere modi eius', 'miwemefocy@mailinator.com', '9871234566', 'team lunch', '', '2010-12-23', '', '0', '0', '0', 'Pending', 'Fugiat neque sint vo', 'Pending', '2026-02-24', NULL, NULL, NULL, NULL, 0, '2026-02-24 17:34:12', NULL, NULL, 1, '2026-04-12 15:46:05'),
(28, 'Mckenzie and Robbins Traders', 'Consequat Animi se', 'ryvuwexu@mailinator.com', '9871236545', 'Nisi soluta reprehen', '3', '2026-02-24', '5', '20', '10', '10', 'Pending', 'Quis pariatur Lorem', 'Pending', '2026-02-24', NULL, NULL, NULL, NULL, 1, '2026-02-24 17:39:31', 1, '2026-02-24 17:42:44', 1, '2026-04-12 15:46:02'),
(29, 'Microsoft', 'Hemanth', 'hemanthsai@gmail.com', '9871236545', 'Team lunch', '4', '2026-04-04', '7', '0', '0', '0', 'Pending', 'veg only', 'Pending', '2026-04-02', NULL, NULL, NULL, NULL, 1, '2026-04-02 15:54:37', NULL, NULL, 1, '2026-04-12 15:46:00'),
(30, 'Abc', 'Hemanth', 'hemanth@email.com', '7896541233', 'team dinner', '5', '2026-04-04', '5', '0', '0', '0', 'Pending', '', 'Pending', '2026-04-03', NULL, NULL, NULL, NULL, 1, '2026-04-03 17:45:52', NULL, NULL, 1, '2026-04-12 15:45:58'),
(31, 'Sthrive IT Solutions', 'siri', 'n.shirisha777@gmail.com', '9100649694', 'team building', '30', '2026-04-30', '7', '0', '0', '0', 'Pending', '', 'Pending', '2026-04-21', NULL, NULL, NULL, NULL, 1, '2026-04-21 15:50:33', NULL, NULL, NULL, NULL),
(32, 'iris', 's', 'n.shirisha777@gmail.com', '9100649694', 'corporate booking', '30', '2026-04-30', '7', '0', '0', '0', 'Pending', '', 'Pending', '2026-04-23', NULL, NULL, NULL, NULL, 1, '2026-04-23 14:34:19', NULL, NULL, NULL, NULL),
(33, 'shravani', 'sh', 'n.shirisha777@gmail.com', '9100649694', 'birthday', '25', '2026-04-29', '7', '1', '0', '1', 'Pending', '', 'Pending', '2026-04-23', NULL, NULL, NULL, NULL, 1, '2026-04-23 14:37:46', 1, '2026-04-23 15:00:55', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `corporate_event_types`
--

CREATE TABLE `corporate_event_types` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `corporate_event_types`
--

INSERT INTO `corporate_event_types` (`id`, `name`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 'Team Building Tornament', 'Active', 1, '2026-01-22 09:42:31', 1, '2026-01-22 09:44:49', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `corporate_participant_ranges`
--

CREATE TABLE `corporate_participant_ranges` (
  `id` int(11) NOT NULL,
  `min_participants` int(11) NOT NULL,
  `max_participants` int(11) NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `corporate_participant_ranges`
--

INSERT INTO `corporate_participant_ranges` (`id`, `min_participants`, `max_participants`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 10, 15, 'Active', 1, '2026-01-22 09:54:50', 1, '2026-01-22 09:57:03', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `corporate_time_slots`
--

CREATE TABLE `corporate_time_slots` (
  `id` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `corporate_time_slots`
--

INSERT INTO `corporate_time_slots` (`id`, `start_time`, `end_time`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, '09:00:00', '11:00:00', 'Active', 1, '2026-01-22 10:41:54', 1, '2026-01-22 10:43:53', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `email`, `mobile`, `password`, `gender`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 'Sudhakar', 'sudhakarbv144@gmail.com', '987654321', '$2y$10$pbTiRL4som.zni0MFhD4hOs2SzdXlVI2jF7ZmlSWbDXV0R1Aa.jRW', 'Male', 'Active', 1, '2026-01-23 10:35:55', 1, '2026-02-10 16:41:21', NULL, NULL),
(4, 'IT\'S A BABY', 'cesezuhany@mailinator.com', '6300839532', '$2y$10$OZ3bgRtm2zvlE55pBzyrnOZ/qeoJTa47YG6teAvWhTNoayD096cj.', 'Male', 'Inactive', 1, '2026-02-09 10:48:32', NULL, NULL, 1, '2026-04-23 14:59:36'),
(5, 'Connor Webster', 'nycefu@mailinator.com', '8767889999', '$2y$10$wwswnKezHw16V6L41ZHdYuHZ0a3xF3oZ.qCzvz0RCbwtiv6fuRIm.', 'Other', 'Active', 1, '2026-02-09 10:49:30', 1, '2026-02-09 10:51:39', 1, '2026-04-23 14:59:59'),
(6, 'Bertha Jensen', 'regyhawy@mailinator.com', '9876543211', '$2y$10$QWqr7/tOZjxZ/0E5Z9IlcuLlrEPZM7YDQ9Np6ECm5x92SPfiqLoWu', 'Male', 'Active', 1, '2026-02-13 16:47:02', NULL, NULL, 1, '2026-04-23 14:59:56'),
(7, 'Ivana Vincent', 'kekabag@mailinator.com', '9876543210', '$2y$10$BbhK98q2hJf7smGWrIhHtOV3rKbPZPZKrx6V0r0hMUiHnHvNYJ0Iu', 'Female', 'Active', 1, '2026-02-13 16:47:35', NULL, NULL, 1, '2026-04-23 14:59:49'),
(8, 'Selma Conrad2', 'mozosi@mailinator.com', '9876543211', '$2y$10$MUT8Lk0kBvBMMDyNKnRXBOnQtFFO1/zh.V0UH67EmgvQBzz1/ifWi', 'Female', 'Inactive', 1, '2026-02-13 16:48:12', 1, '2026-03-07 13:24:32', 1, '2026-04-23 14:59:42'),
(9, 'test', 'birdvinod@gmail.com', '9000000003', '$2y$10$aZkzkhbp0XnVYMYgzA6zyuwj2OB1MNRgKeZ0UCQq2qx0bcSTiDLBe', 'Male', 'Active', 1, '2026-03-07 13:07:13', NULL, NULL, 1, '2026-03-07 13:10:32'),
(10, 'F', 'vinod5448@gmail.com', '9000000003', '$2y$10$XuzTvOxwqD/xdBd6cDSIieUE937IU2yfOSkPpyRr3RaCNVav/0Wyy', 'Male', 'Active', 1, '2026-03-07 13:25:58', NULL, NULL, 1, '2026-04-23 14:59:40');

-- --------------------------------------------------------

--
-- Table structure for table `events_metrics`
--

CREATE TABLE `events_metrics` (
  `id` int(10) UNSIGNED NOT NULL,
  `event_id` int(10) UNSIGNED NOT NULL,
  `attendance_rate` int(11) NOT NULL,
  `attendance_rate_suffix` enum('%','+') NOT NULL DEFAULT '%',
  `satisfaction_score` int(11) NOT NULL,
  `satisfaction_score_suffix` enum('%','+') NOT NULL DEFAULT '+',
  `occasions` int(11) NOT NULL,
  `occasions_suffix` enum('%','+') NOT NULL DEFAULT '+',
  `repeat_bookings` int(11) NOT NULL,
  `repeat_bookings_suffix` enum('%','+') NOT NULL DEFAULT '%',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `create_audit_id` int(10) UNSIGNED NOT NULL,
  `create_audit_time` datetime NOT NULL,
  `update_audit_id` int(10) UNSIGNED DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(10) UNSIGNED DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events_metrics`
--

INSERT INTO `events_metrics` (`id`, `event_id`, `attendance_rate`, `attendance_rate_suffix`, `satisfaction_score`, `satisfaction_score_suffix`, `occasions`, `occasions_suffix`, `repeat_bookings`, `repeat_bookings_suffix`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, 98, '%', 88, '+', 25, '+', 73, '%', 'inactive', 1, '2026-01-23 16:37:10', 1, '2026-02-04 13:57:59', 1, '2026-02-10 15:49:38'),
(2, 2, 92, '%', 88, '+', 25, '+', 73, '%', 'inactive', 1, '2026-01-28 10:55:04', 1, '2026-01-28 11:00:41', 1, '2026-01-28 11:00:46'),
(3, 1, 1, '%', 1, '+', 1, '+', 1, '%', 'active', 1, '2026-02-04 13:51:54', NULL, NULL, 1, '2026-02-10 16:02:33'),
(4, 1, 95, '%', 95, '+', 45, '+', 50, '%', 'active', 1, '2026-02-05 22:46:15', 1, '2026-02-22 12:33:11', NULL, NULL),
(5, 2, 99, '%', 95, '%', 180, '+', 40, '+', 'active', 1, '2026-02-10 15:45:28', 1, '2026-02-22 12:51:57', NULL, NULL),
(6, 2, 73, '%', 12, '+', 83, '%', 67, '+', 'inactive', 1, '2026-02-11 14:58:47', NULL, NULL, 1, '2026-02-11 16:49:16'),
(7, 3, 95, '%', 90, '%', 150, '+', 30, '%', 'active', 1, '2026-02-11 16:49:27', 1, '2026-02-22 12:29:01', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `events_reviews`
--

CREATE TABLE `events_reviews` (
  `id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `reviewer_name` varchar(100) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `review_description` text NOT NULL,
  `reviewer_image` varchar(255) DEFAULT NULL,
  `occasion` varchar(255) DEFAULT NULL,
  `place` varchar(255) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events_reviews`
--

INSERT INTO `events_reviews` (`id`, `event_id`, `reviewer_name`, `rating`, `review_description`, `reviewer_image`, `occasion`, `place`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, 'Sudhakar', 4, 'Amazing experience! The track was well-maintained and the staff was very professional. Had an absolute blast racing with friends.Amazing experience! The track was well-maintained and the staff was very professional. Had an absolute blast racing with friends.Amazing experience! The track was well-maintained and the staff was very professional. Had an absolute blast racing with friends.', '697310dd9294a.jpg', 'Birthday Event', 'Vijayawada', 'Active', 1, '2026-01-23 11:40:45', 1, '2026-02-22 11:57:16', NULL, NULL),
(2, 2, 'Hemanth', 4, 'Food is delicious, and the quality of food is good ', '697b1dab6b9f3.jpg', 'Birthday Event', 'Hydrabad ', 'Active', 1, '2026-01-29 14:13:44', 1, '2026-04-23 13:55:54', NULL, NULL),
(3, 3, 'Siva', 5, 'Food is good', '697b1dab6b9f3.jpg', 'Birthday Event', 'Hyderabad', 'Active', 1, '2026-01-29 14:13:44', 1, '2026-04-23 16:00:21', NULL, NULL),
(4, 0, '', 0, '', NULL, '', '', '', 1, '2026-02-11 17:54:21', 1, '2026-02-11 18:09:52', 1, '2026-02-11 18:10:11'),
(5, 3, 'sgvfrdgvrg', 3, 'undefinedgtfdhbrtfdhbn', '698c7a2742076.png', 'undefined', 'rgsvrdgbdrt', 'Active', 1, '2026-02-11 18:10:26', 1, '2026-02-11 18:28:22', 1, '2026-02-11 18:28:41'),
(6, 3, 'Venu', 5, 'Created a best birthday for my kid', NULL, 'kids birthday ', 'Open lawn', 'Active', 1, '2026-04-23 13:08:35', 1, '2026-04-23 15:59:22', NULL, NULL),
(7, 3, 'Murali', 5, 'Over Team enjoyed well ', NULL, 'Team Meet up', 'Banquet hall', 'Active', 1, '2026-04-23 13:09:40', 1, '2026-04-23 15:59:44', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event_bookings`
--

CREATE TABLE `event_bookings` (
  `id` int(10) UNSIGNED NOT NULL,
  `event_type_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `booking_type` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `guests` int(10) UNSIGNED DEFAULT NULL,
  `total_amount` varchar(30) NOT NULL,
  `advance` varchar(30) DEFAULT NULL,
  `balance` varchar(30) NOT NULL,
  `payment_status` enum('Pending','Partial','Paid') DEFAULT 'Pending',
  `status` enum('Active','Inactive','Cancelled') DEFAULT 'Active',
  `create_audit_id` int(10) UNSIGNED NOT NULL,
  `create_audit_time` datetime NOT NULL,
  `update_audit_id` int(10) UNSIGNED DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(10) UNSIGNED DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `event_bookings`
--

INSERT INTO `event_bookings` (`id`, `event_type_id`, `name`, `booking_type`, `date`, `guests`, `total_amount`, `advance`, `balance`, `payment_status`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, 'Wedding Reception', 'Full Day', '2026-02-15', 250, '150000', '50000', '100000', 'Partial', 'Active', 1, '2026-01-26 14:10:08', 1, '2026-01-26 14:13:39', 1, '2026-04-02 11:54:46'),
(2, 10, 'Facere alias tenetur', 'On-Spot', '1985-02-13', 48, '72', '28', '44', '', 'Active', 1, '2026-02-09 10:05:31', 1, '2026-04-12 15:45:47', 1, '2026-04-12 15:45:49'),
(3, 10, 'Pariatur Voluptatib', 'Pre-Booked', '1974-05-13', 74, '58', '8', '50', 'Pending', 'Active', 1, '2026-02-09 10:10:22', NULL, NULL, 1, '2026-04-12 15:45:29'),
(4, 10, 'RK', 'Pre-Booked', '2026-04-15', 200, '10000', '0', '10000', 'Pending', 'Active', 1, '2026-04-02 11:55:13', NULL, NULL, 1, '2026-04-12 15:45:27');

-- --------------------------------------------------------

--
-- Table structure for table `event_details`
--

CREATE TABLE `event_details` (
  `id` int(11) NOT NULL,
  `event_id` int(20) DEFAULT NULL,
  `title1` varchar(255) DEFAULT NULL,
  `image1` varchar(255) DEFAULT NULL,
  `description1` text DEFAULT NULL,
  `feature1_1` varchar(255) DEFAULT NULL,
  `feature1_2` varchar(255) DEFAULT NULL,
  `feature1_3` varchar(255) DEFAULT NULL,
  `feature1_4` varchar(255) DEFAULT NULL,
  `size1` int(11) DEFAULT NULL,
  `guests_count1` int(11) DEFAULT NULL,
  `age_group1` varchar(50) DEFAULT NULL,
  `duration1` int(11) DEFAULT NULL,
  `title2` varchar(255) DEFAULT NULL,
  `image2` varchar(255) DEFAULT NULL,
  `description2` text DEFAULT NULL,
  `feature2_1` varchar(255) DEFAULT NULL,
  `feature2_2` varchar(255) DEFAULT NULL,
  `feature2_3` varchar(255) DEFAULT NULL,
  `feature2_4` varchar(255) DEFAULT NULL,
  `size2` int(11) DEFAULT NULL,
  `guests_count2` int(11) DEFAULT NULL,
  `age_group2` varchar(50) DEFAULT NULL,
  `duration2` int(11) DEFAULT NULL,
  `title3` varchar(255) DEFAULT NULL,
  `image3` varchar(255) DEFAULT NULL,
  `description3` text DEFAULT NULL,
  `feature3_1` varchar(255) DEFAULT NULL,
  `feature3_2` varchar(255) DEFAULT NULL,
  `feature3_3` varchar(255) DEFAULT NULL,
  `feature3_4` varchar(255) DEFAULT NULL,
  `size3` int(11) DEFAULT NULL,
  `guests_count3` int(11) DEFAULT NULL,
  `age_group3` varchar(50) DEFAULT NULL,
  `duration3` int(11) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) DEFAULT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_details`
--

INSERT INTO `event_details` (`id`, `event_id`, `title1`, `image1`, `description1`, `feature1_1`, `feature1_2`, `feature1_3`, `feature1_4`, `size1`, `guests_count1`, `age_group1`, `duration1`, `title2`, `image2`, `description2`, `feature2_1`, `feature2_2`, `feature2_3`, `feature2_4`, `size2`, `guests_count2`, `age_group2`, `duration2`, `title3`, `image3`, `description3`, `feature3_1`, `feature3_2`, `feature3_3`, `feature3_4`, `size3`, `guests_count3`, `age_group3`, `duration3`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, 'Kids Birthday Bash', '6973656eba53d.jpg', 'A fun-filled birthday celebration designed specifically for children with games, entertainment, and delicious treats in a safe environment.', 'Themed Decorations', 'Birthday Cake Included', 'Party Games & Activities', 'Professional Host', 500, 25, '5-12 years', 3, 'Teen Birthday Celebration', '', 'An exciting birthday party for teenagers featuring modern entertainment, music, and age-appropriate activities in a vibrant setting.', 'DJ & Music System', 'Photo Booth Setup', 'Gaming Stations', 'Customized Playlist', 750, 40, '13-18 years', 4, 'Adult Birthday Party', '', 'Sophisticated birthday celebration for adults with elegant ambiance, premium catering, and entertainment options tailored for mature guests.', 'Premium Catering', 'Live Entertainment', 'Bar Service Available', 'Elegant Decor', 1000, 60, '21+ years', 5, 'Active', 1, '2026-01-23 17:41:28', 1, '2026-02-10 15:46:17', 1, '2026-01-28 14:47:30'),
(2, 1, 'Kids Birthday Bash', '699b2a2a165ff.jpeg', 'A fun-filled birthday celebration designed specifically for children with games, entertainment, and delicious treats in a safe environment.', 'Themed Decorations as per the choices ', 'Custom Birthday Cakes ', 'Party Games & Activities ', 'Professional Hosts on Demand basis', 3000, 150, '5-12 years', 3, 'Teen Birthday Celebration', '699b2a2aae483.jpeg', 'An exciting birthday party for teenagers featuring modern entertainment, music, and age-appropriate activities in a vibrant setting.', 'DJ & Music System on demand ', 'Photo Booth Setup', 'Gaming Stations', 'Customized Playlist', 3000, 150, '13-18 years', 4, 'Adult Birthday Party', '699b2a2b68e43.jpeg', 'Sophisticated birthday celebration for adults with elegant ambiance, premium catering, and entertainment options tailored for mature guests.', 'Premium Catering', 'Live Entertainment ', 'Bar Service Available on demand ', 'Elegant Decor', 3000, 150, '21+ years', 5, 'Active', 1, '2026-01-28 11:51:23', 1, '2026-02-22 21:39:16', NULL, NULL),
(3, 1, 'Kids Birthday Bash', NULL, 'A fun-filled birthday celebration designed specifically for children with games, entertainment, and delicious treats in a safe environment.', 'Themed Decorations', 'Birthday Cake Included', 'Party Games & Activities', 'Professional Host', 500, 25, '5-12 years', 3, 'Teen Birthday Celebration', NULL, 'An exciting birthday party for teenagers featuring modern entertainment, music, and age-appropriate activities in a vibrant setting.', 'DJ & Music System', 'Photo Booth Setup', 'Gaming Stations', 'Customized Playlist', 750, 40, '13-18 years', 4, 'Adult Birthday Party', NULL, 'Sophisticated birthday celebration for adults with elegant ambiance, premium catering, and entertainment options tailored for mature guests.', 'Premium Catering', 'Live Entertainment', 'Bar Service Available', 'Elegant Decor', 1000, 60, '21+ years', 5, 'Inactive', 1, '2026-01-28 13:05:54', 1, '2026-02-10 15:46:19', 1, '2026-01-30 03:00:29'),
(4, 1, 'aa', NULL, 'aaaaaaaaaaaaaaaaa', 'a', 'a', 'aa', 'a', 9, 11, '11', 11, 'aa', NULL, 'aaaaaaaaaaaaaaaa', 'aa', 'aaa', 'aa', 'aa', 11, 11, '11', 11, 'aa', NULL, 'aaaaaaaa', 'aaa', 'aa', 'aa', 'aa', 11, 11, '11', 11, 'Inactive', 1, '2026-01-30 18:35:20', 1, '2026-02-10 15:49:04', 1, '2026-02-10 16:02:28'),
(5, 1, 'test', NULL, 'aaaaaaaaaaa', 'aaaaaa', 'aaaaaa', 'aaaaa', 'aaaaaaaa', 11, 11, '11', 1, 'aa', NULL, 'aaaaaaaa', 'w', 'w', 'w', 'w', 1, 11, '1', 1, 'Adult Birthday Party', NULL, 'aaaaa', 'aa', 'aa', 'aa', 'aa', 1, 1, '1', 1, 'Active', 1, '2026-01-30 18:48:17', 1, '2026-02-11 16:55:31', 1, '2026-02-10 16:02:25'),
(6, 1, 'aa', NULL, 'mmm', 'aa', 'aa', 'aa', 'aa', 1, 1, '1', 1, 'aa', NULL, 'aaaaaa', 'qq', 'qq', 'qq', 'qq', 1, 1, '11', 10, 'qqqqq', NULL, 'aaaaaaaaaaa', 'qq', 'aa', 'aa', 'aa', 1, 1, '11', 1, 'Active', 1, '2026-01-30 19:00:51', 1, '2026-02-04 13:11:46', 1, '2026-02-10 16:02:23'),
(7, 1, '11111111', NULL, 'dgbdfgb d fd', 'aa', 'aa', 'aa', 'aa', 1, 1, '1', 1, 'aa', NULL, 'dfgbdgb gsdfb d', 'qq', 'qq', 'qq', 'qq', 1, 1, '11', 10, 'qqqqq', NULL, 'fdgbdfb fd', 'qq', 'aa', 'aa', 'aa', 1, 1, '11', 1, 'Inactive', 1, '2026-02-04 13:17:19', 1, '2026-02-11 17:23:16', 1, '2026-02-10 16:02:19'),
(8, 1, '11111111', '6983720c222d4.jpg', 'dthgbdthbd', 'aa', 'aa', 'aa', 'aa', 1, 1, '1', 1, 'aa', NULL, 'dbdgfb nd', 'qq', 'qq', 'qq', 'qq', 1, 1, '11', 10, 'qqqqq', NULL, 'fdbdgfb ndg', 'qq', 'aa', 'aa', 'aa', 1, 1, '11', 1, 'Active', 1, '2026-02-04 13:20:29', 1, '2026-02-10 15:36:09', 1, '2026-02-10 16:02:17'),
(9, 1, '11111111', '6982fdbf908fc.jpg', 'rdgvdrfgbd', 'aa', 'aa', 'aa', 'aa', 1, 1, '1', 1, 'aa', '6982fdc1002e9.jpg', 'sdrgvrsfdb fd', 'qq', 'qq', 'qq', 'qq', 1, 1, '11', 10, 'qqqqq', '6982fdc23e32d.jpg', 'ffdb db', 'qq', 'aa', 'aa', 'aa', 1, 1, '11', 1, 'Active', 1, '2026-02-04 13:35:22', NULL, NULL, 1, '2026-02-04 13:42:51'),
(10, 1, '5555555555555', '6982ff6d01ac1.jpg', 'drgbrdgbrdgz', 'aa', 'aa', 'aa', 'aa', 1, 1, '1', 1, 'aa', '6982fea0d83ad.jpg', 'dtdgfhbdhbgfdhb', 'qq', 'qq', 'qq', 'qq', 1, 1, '11', 10, 'qqqqq', '6982fea18d8d0.jpg', 'fghbgfgfhbfghb', 'qq', 'aa', 'aa', 'aa', 1, 1, '11', 1, 'Active', 1, '2026-02-04 13:39:06', 1, '2026-02-04 13:42:29', 1, '2026-02-04 13:42:40'),
(11, 1, 'kjhgfdghjkl;', '6984d00ec4c9e.jpg', 'jnjnljnk', 'ewwjkjnk', 'njnjkn', 'kjnjnjnjn', 'jnjnkn', 5, 67687, '687', 678, 'kjknkjnj', '6984cff6cdaf9.jpg', 'nnjnnl', 'njnjnjnjn', 'knjnjnn', 'jnnjnj', 'yhkbk', 88, 7858, '57858567567', 454654, '4547', '6984cff8067e1.jpg', '67676', '576', '5675', '67576', '56', 56, 576, '56', 5, 'Active', 1, '2026-02-05 22:44:32', 1, '2026-02-05 22:44:55', 1, '2026-02-05 22:45:07'),
(12, 2, 'All-In-One Corporate Destination', '69d395d726b20.jpg', 'Adventure games, team-building activities, banquet hall, and meeting rooms — all under one roof.', 'Multi-Activity Gaming Zone', 'Indoor & Outdoor Attractions', 'Banquet & Meeting Spaces', 'Large Group Hosting Capacity', 3000, 150, '18 to 70', 4, 'Customised Corporate Packages', '69d395d9ecd35.jpg', 'Flexible plans designed for team outings, annual meets, rewards, and client events.', 'Flexible Event Packages', 'Team-Building Game Combos', 'Custom Food & Catering Plans', 'Half & Full-Day Options', 3000, 150, '18 to 70', 4, 'Professional & Safe Environment', '69d395da8462e.jpeg', 'Trained staff, strict safety standards, and seamless event coordination.', 'Trained & Certified Staff', 'Strict Safety Protocols', 'Dedicated Event Coordinator', 'Smooth & Hassle-Free Execution', 3000, 150, '18 to 70', 4, 'Active', 1, '2026-02-10 15:41:06', 1, '2026-04-06 16:45:38', NULL, NULL),
(13, 2, 'Consequuntur accusam', '698b04379f79a.png', 'Vero excepteur tempora asperiores illo tempor totam unde vel error in do voluptatem est sequi vel eum blanditiis', 'Veniam ratione quisquam ut cupidatat cu', 'Ea omnis laborum Quaerat elit sunt re', 'Doloremque fugiat culpa aut similique u', 'Iusto quod reiciendis accusamus voluptat', 61, 31, 'Voluptatem Earum ad', 0, 'Labore sed Nam Nam e', '698b04382a038.png', 'Perferendis illum eiusmod do est quo commodi nisi autem fugiat perferendis perferendis esse consectetur quia vitae', 'Illo totam dolore ullam eu eaque neque i', 'Assumenda quo quis eius animi sapiente ', 'Fuga Quia sint dolore odit itaque est ', 'Quos qui cumque aliquam aspernatur ad cu', 59, 45, 'Irure dolor odit eum', 76, 'Commodi hic corrupti', '698b043a1bd17.png', 'Non praesentium iste natus dolorem modi quibusdam adipisci molestiae qui duis facere deserunt sunt dolor est laborum et ut qui', 'Et hic sint iure itaque odio et et sint ', 'Optio suscipit minim numquam sint dolo', 'Itaque nisi autem voluptas amet dolore ', 'Et consequuntur cupiditate eius vel fugi', 22, 25, 'Voluptatem omnis con', 74, 'Active', 1, '2026-02-10 15:41:06', 1, '2026-02-10 15:42:31', 1, '2026-02-10 15:42:42'),
(14, 3, 'Banquet hall - First floor ', '69e9e9ea6a95a.png', 'First Floor Banquet Hall at FNF Arena accommodates 150 guests, perfect for birthdays, corporate events, and celebrations with added fun activities.', 'Seats Up to 150 Guests', 'Flexible Seating Setup', 'Ideal for All Celebrations', 'Delicious food options Avilable ', 3000, 150, '5+', 2, 'Meeting Room - First Floor ', '699b27b717900.jpeg', 'Meeting room for 10–15 guests, ideal for corporate meetings, team discussions, and presentations in a comfortable, private setting at FNF Arena.', 'Seats 10–15 Members', 'Private & Quiet Space', 'Ideal for Meetings', 'Comfortable Seating Setup', 500, 15, '21+', 2, 'Open Lawns - Mutiple ', '699b27b8b1809.jpeg', 'Open lawn venues , perfect for outdoor parties, celebrations, and special events in a vibrant, open-air setting.', 'Capacity Ranges 50 Guests to 200 Guests ', 'Spacious Open-Air Setting', 'Perfect for Outdoor Events', 'Flexible Event Setup Options', 5000, 200, '5+', 2, 'Active', 1, '2026-02-11 16:49:05', 1, '2026-04-23 16:05:38', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event_gallery`
--

CREATE TABLE `event_gallery` (
  `id` int(10) UNSIGNED NOT NULL,
  `activity_id` int(10) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `create_audit_time` datetime NOT NULL,
  `delete_audit_id` int(10) UNSIGNED DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_gallery`
--

INSERT INTO `event_gallery` (`id`, `activity_id`, `image`, `create_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, '6973440b8cf51.jpg', '2026-01-23 15:19:01', NULL, NULL),
(2, 1, '6973440c614b3.jpg', '2026-01-23 15:19:01', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event_media`
--

CREATE TABLE `event_media` (
  `id` int(10) UNSIGNED NOT NULL,
  `event_id` int(10) UNSIGNED NOT NULL,
  `main_image` varchar(255) DEFAULT NULL,
  `landing_image` varchar(255) DEFAULT NULL,
  `gallery_images` longtext DEFAULT NULL,
  `videos` longtext DEFAULT NULL,
  `video_label` longtext DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `create_audit_id` int(10) UNSIGNED NOT NULL,
  `create_audit_time` datetime NOT NULL,
  `update_audit_id` int(10) UNSIGNED DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(10) UNSIGNED DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_media`
--

INSERT INTO `event_media` (`id`, `event_id`, `main_image`, `landing_image`, `gallery_images`, `videos`, `video_label`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, '699b2b8011247.png', '699b2b5ad2b5d.jpeg', '[\"699b2aa0735a2.jpeg\",\"699b2c3d32fad.jpeg\",\"699b2c3e73061.jpeg\",\"699b2c3f08218.jpeg\"]', '[{\"video\":\"697b10320ce01.mp4\",\"label\":\"[\\\"Must be at least 8 years old\\\", \\\"Height requirement: minimum 4 feet\\\"]\"},{\"video\":\"699b2bce3430a.mp4\",\"label\":\"Partying\"}]', '[\"Must be at least 8 years old\", \"Height requirement: minimum 4 feet\"]', 'Active', 1, '2026-01-23 15:18:59', 1, '2026-02-22 21:48:07', NULL, NULL),
(2, 1, '697b0fb90dab9.jpg', '697b0fc0da3e2.jpg', '[\"697b0fc22d7e5.png\",\"697b0fc398d5a.jpg\"]', '[{\"video\":\"697b0fc5a13b0.mp4\",\"label\":\"[\\\"Must be at least 8 years old\\\", \\\"Height requirement: minimum 4 feet\\\"]\"}]', '[\"Must be at least 8 years old\", \"Height requirement: minimum 4 feet\"]', 'Active', 1, '2026-01-29 13:14:07', NULL, NULL, 1, '2026-02-10 16:02:10'),
(3, 1, '697b3e8d90edd.jpg', '697b3e906ceff.jpg', '[\"697b3e9155cde.jpg\",\"697b3e9291c44.jpg\",\"697b3e9385dec.jpg\",\"697b3ebdcb18b.jpg\"]', '[{\"video\":\"697b3e94c49f5.mp4\",\"label\":\"[\\\"df\\\"]\"}]', '[\"df\"]', 'Active', 1, '2026-01-29 16:33:50', 1, '2026-01-29 16:34:32', 1, '2026-01-29 16:34:51'),
(4, 1, '697b40580b178.png', '697b4059239ba.jpg', '[\"697b405aed6ec.jpg\",\"697b405d621f9.jpg\",\"697b405eac00c.jpg\",\"697b405fa4a4d.jpg\"]', '[{\"video\":\"697b10320ce01.mp4\",\"label\":\"[\\\"Must be at least 8 years old\\\", \\\"hgjkbhgjfkhnbd\\\"]\"}]', NULL, 'Active', 1, '2026-01-29 16:41:29', 1, '2026-02-04 10:33:15', 1, '2026-02-10 16:02:06'),
(5, 1, '6982f72333af0.jpg', '6982f7251cc6c.jpg', '[\"6982f726a6602.jpg\",\"6982f7284d570.jpg\",\"6982f7298b48f.webp\",\"6982f794ece13.png\"]', '[{\"video\":\"6982f7b62d641.mp4\",\"label\":\"[\\\"test\\\"]\"}]', '[\"test\"]', 'Inactive', 1, '2026-02-04 13:07:14', 1, '2026-02-10 15:17:34', 1, '2026-02-10 16:02:00'),
(6, 1, '6984cf384595e.jpg', '6984cf84f28cd.jpg', '[\"6984cf3982549.jpg\",\"6984cf3a20ace.png\",\"6984cf3a998ca.jpg\"]', '[{\"video\":\"6984cf3b9fc7f.mp4\",\"label\":\"[\\\"testing\\\"]\"}]', '[\"testing\"]', 'Inactive', 1, '2026-02-05 22:41:24', 1, '2026-02-05 22:42:49', 1, '2026-02-05 22:42:59'),
(7, 1, '698afdb5359e4.png', '698afdb639716.png', '[\"698afdb6a85eb.png\",\"698afdb73c7bc.png\",\"698afdb837bde.png\"]', NULL, NULL, 'Inactive', 1, '2026-02-10 15:13:20', 1, '2026-02-10 15:17:28', 1, '2026-02-10 16:01:51'),
(8, 2, '698b020187ff2.png', '698b02023e48b.png', '[\"698b0202d1097.png\",\"698b02037ee1f.png\",\"698b020401fe3.png\"]', NULL, NULL, 'Active', 1, '2026-02-10 15:31:40', NULL, NULL, 1, '2026-02-10 15:31:58'),
(9, 2, '698b02038bdd6.png', '698b020413799.png', '[\"698b02047fd60.png\",\"698b020506dc1.png\",\"698b02058513e.png\"]', NULL, NULL, 'Active', 1, '2026-02-10 15:31:42', NULL, NULL, 1, '2026-02-10 15:32:05'),
(10, 2, '699b25dcc74f7.jpeg', '699b267425b08.jpeg', '[\"699b25df053df.jpeg\",\"699b25e03b11b.jpeg\",\"699b25e1bd4b8.jpeg\",\"699b263b8f25e.jpeg\"]', '[{\"video\":\"698eb36c61d5f.avi\",\"label\":\"\"},{\"video\":\"699b25e2601d4.mp4\",\"label\":\"Tug of war\"},{\"video\":\"699b25e36b782.mp4\",\"label\":\"MC\"}]', 'Tug of war', 'Active', 1, '2026-02-10 15:31:42', 1, '2026-02-22 21:23:24', NULL, NULL),
(11, 3, '699b270f204d6.jpeg', '699b270fc8475.jpeg', '[\"699b2710c911a.jpeg\",\"699b271175199.jpeg\",\"699b27126f466.jpeg\"]', '[{\"video\":\"698c65d2dacbd.mp4\",\"label\":\"[\\\"event video\\\"]\"},{\"video\":\"699b277cc849e.mp4\",\"label\":\"event video\"},{\"video\":\"69cfcfd80fd34.mp4\",\"label\":\"FNF Arena Banquet Hall Event Space\"},{\"video\":\"69cfcfe72464c.mp4\",\"label\":\"FNF Arena Banquet Hall Event Space\"}]', '[\"event video\"]', 'Active', 1, '2026-02-11 16:49:47', 1, '2026-04-03 20:04:17', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event_time_slots`
--

CREATE TABLE `event_time_slots` (
  `id` int(11) NOT NULL,
  `event_type_id` int(11) NOT NULL,
  `start_time` varchar(30) NOT NULL,
  `end_time` varchar(30) NOT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `create_audit_id` int(11) DEFAULT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `event_time_slots`
--

INSERT INTO `event_time_slots` (`id`, `event_type_id`, `start_time`, `end_time`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, '12:00', '13:00', 'Active', 1, '2026-02-13 17:55:35', 1, '2026-02-13 18:08:36', 1, '2026-02-13 18:09:16'),
(2, 1, '16:00', '19:00', 'Active', 1, '2026-02-13 17:55:52', 1, '2026-04-23 14:47:40', NULL, NULL),
(3, 1, '12:00', '16:00', 'Active', 1, '2026-02-13 17:56:36', 1, '2026-04-23 14:47:21', NULL, NULL),
(4, 3, '14:00', '18:00', 'Active', 1, '2026-02-13 18:37:15', 1, '2026-02-25 10:33:28', NULL, NULL),
(5, 2, '15:00', '18:00', 'Active', 1, '2026-02-24 15:37:31', 1, '2026-04-06 16:02:03', NULL, NULL),
(6, 1, '10:00', '14:01', 'Active', 1, '2026-02-24 15:52:14', 1, '2026-04-23 14:45:18', NULL, NULL),
(7, 2, '11:00', '14:00', 'Active', 1, '2026-02-24 16:01:48', 1, '2026-02-25 10:34:44', NULL, NULL),
(8, 3, '11:00', '14:00', 'Active', 1, '2026-02-25 10:32:44', 1, '2026-02-25 10:32:58', NULL, NULL),
(9, 3, '18:00', '21:00', 'Active', 1, '2026-02-25 10:34:08', 1, '2026-03-06 12:28:28', NULL, NULL),
(10, 2, '18:00', '22:59', 'Active', 1, '2026-04-06 16:02:20', 1, '2026-04-07 11:03:22', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `event_types`
--

CREATE TABLE `event_types` (
  `id` int(11) NOT NULL,
  `name` varchar(155) NOT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  `create_audit_id` int(11) DEFAULT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_types`
--

INSERT INTO `event_types` (`id`, `name`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 'Birthday', 'Active', 1, '2026-01-23 14:48:55', 1, '2026-01-23 14:50:55', NULL, NULL),
(2, 'Corporate', 'Active', 1, '2026-02-10 15:29:41', 1, '2026-02-12 16:10:23', NULL, NULL),
(3, 'Event Space', 'Active', 1, '2026-02-10 15:29:41', 1, '2026-02-11 18:50:15', NULL, NULL),
(4, 'test', 'Active', 1, '2026-02-11 18:55:11', 1, '2026-02-11 18:55:18', 4, '2026-02-11 18:55:21'),
(5, 'jbkjdas', 'Active', 1, '2026-02-13 17:45:18', 1, '2026-02-13 17:46:51', 5, '2026-02-13 17:46:54');

-- --------------------------------------------------------

--
-- Table structure for table `event_videos`
--

CREATE TABLE `event_videos` (
  `id` int(10) UNSIGNED NOT NULL,
  `activity_id` int(10) UNSIGNED NOT NULL,
  `video` varchar(255) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `create_audit_time` datetime NOT NULL,
  `delete_audit_id` int(10) UNSIGNED DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_videos`
--

INSERT INTO `event_videos` (`id`, `activity_id`, `video`, `label`, `create_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, '6973440d978ca.jpg', 'Birthday Party Celebration Highlights and Best Moments', '2026-01-23 15:19:02', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `food_categories`
--

CREATE TABLE `food_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime NOT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_categories`
--

INSERT INTO `food_categories` (`id`, `name`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 'Power Mains', 'Active', 1, '2026-01-22 16:28:41', 1, '2026-01-28 14:46:44', 1, '2026-01-28 15:58:11'),
(2, 'Potion Station', 'Active', 1, '2026-01-22 16:33:53', 1, '2026-02-16 17:03:39', NULL, NULL),
(3, 'Main Mission', 'Active', 1, '2026-01-22 16:34:08', 1, '2026-02-16 17:03:24', NULL, NULL),
(4, 'Way To West', 'Active', 1, '2026-01-22 16:34:22', 1, '2026-02-16 17:03:12', NULL, NULL),
(5, 'Games Food', 'Active', 1, '2026-01-28 14:47:18', NULL, NULL, 1, '2026-01-28 15:57:43'),
(6, 'Mini Power Ups', 'Active', 1, '2026-01-28 16:04:24', 1, '2026-02-16 17:02:58', NULL, NULL),
(7, 'Power Mains', 'Active', 1, '2026-01-28 16:04:28', NULL, NULL, 1, '2026-01-28 16:04:36'),
(8, 'Power M', 'Active', 1, '2026-01-28 16:19:25', NULL, NULL, 1, '2026-01-28 16:34:35'),
(9, 'Sample Test', 'Inactive', 1, '2026-01-28 17:57:33', NULL, NULL, 1, '2026-01-28 18:01:59'),
(10, 'Day Starter', 'Active', 1, '2026-02-04 22:53:06', 1, '2026-02-16 17:02:36', NULL, NULL),
(11, 'test', 'Inactive', 1, '2026-02-10 16:33:30', 1, '2026-02-11 15:58:56', 1, '2026-02-16 17:03:52');

-- --------------------------------------------------------

--
-- Table structure for table `food_products`
--

CREATE TABLE `food_products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `price` varchar(10) NOT NULL,
  `offer_price` varchar(10) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime DEFAULT current_timestamp(),
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_products`
--

INSERT INTO `food_products` (`id`, `category_id`, `image`, `name`, `description`, `price`, `offer_price`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, 'food_69720e1c14a564.73293518.jpg', 'Victory Burger', 'Double patty burger with cheese, lettuce, and our special gaming sauce', '349', '399', 'Active', 1, '2026-01-22 17:16:44', 1, '2026-02-05 21:49:25', 1, '2026-02-10 16:03:23'),
(2, 1, 'food_6979a13ccc6003.71751546.png', 'Pizza', 'Pizaaa with toppings\r\n', '120', '120', 'Active', 1, '2026-01-28 11:09:48', 1, '2026-01-28 11:10:12', 1, '2026-01-28 11:10:24'),
(3, 1, 'food_6979a161089901.09965852.png', 'Pizza', 'Pizza with toppings', '120', '120', 'Active', 1, '2026-01-28 11:10:50', NULL, NULL, 1, '2026-01-28 14:28:10'),
(4, 1, 'food_6979a161676b65.47309050.png', 'Pizza', 'Pizza with toppings', '120', '120', 'Active', 1, '2026-01-28 11:10:51', NULL, NULL, 1, '2026-02-10 16:03:18'),
(5, 1, 'food_6979a4d2c44f69.03952375.jpg', 'Thumps up', 'Drinkkkkkkkkkk ', '12', '12', 'Active', 1, '2026-01-28 11:25:31', NULL, NULL, 1, '2026-02-10 16:03:15'),
(6, 2, 'food_6979cf87aed148.18538329.png', 'Pizza', 'sdfghjkljkl;,p', '1111', '1111', 'Active', 1, '2026-01-28 14:27:45', NULL, NULL, 1, '2026-01-28 14:28:03'),
(7, 4, 'food_697a0113f34100.47189266.png', 'Water', 'Pure, refreshing drinking water filtered and packaged to ensure safety, clarity, and superior hydration.\r\n', '100', '100', 'Active', 1, '2026-01-28 14:27:48', 1, '2026-02-12 16:15:31', 1, '2026-02-16 18:13:17'),
(8, 8, 'food_6979ed35479fa1.45348665.png', 'Likhi', 'asdfghjklertyuio', '143', '143', 'Active', 1, '2026-01-28 16:34:22', NULL, NULL, 1, NULL),
(9, 8, 'food_6979ed363085e4.50476139.png', 'Likhi', 'asdfghjklertyuio', '143', '143', 'Active', 1, '2026-01-28 16:34:23', NULL, NULL, 1, NULL),
(10, 8, 'food_6979ed37af3a50.90545615.png', 'Likhi', 'asdfghjklertyuio', '143', '143', 'Active', 1, '2026-01-28 16:34:24', NULL, NULL, 1, NULL),
(11, 6, 'food_698d4d9ee757d3.72196154.jpg', 'Pizza', 'Delicious oven-baked pizza topped with fresh ingredients, rich sauce, and melted cheese on a perfectly crisp crust.\r\n', '555', '555', 'Active', 1, '2026-01-28 16:45:45', 1, '2026-02-12 16:15:18', 1, '2026-02-16 17:52:38'),
(12, 9, 'food_697a012f901ce6.20731741.png', 'Sample Item', 'Sample Testing', '5555555555', '5555555555', 'Active', 1, '2026-01-28 17:59:37', 1, '2026-01-28 18:01:16', 1, NULL),
(13, 6, 'food_697a01df37cf18.40089768.png', 'sample', 'sample Test', '1111', '1111', 'Active', 1, '2026-01-28 18:02:32', NULL, NULL, 1, '2026-01-28 18:02:35'),
(14, 3, 'food_698d4e4b19a5e2.58972884.jpg', 'red bull', 'Refreshing energy drink that boosts alertness and performance with a powerful blend of caffeine, vitamins, and essential ingredients.\r\n', '200', '200', 'Active', 1, '2026-02-10 16:30:45', 1, '2026-02-12 16:15:00', 1, '2026-02-16 17:09:06'),
(15, 2, 'food_698b101af0b046.77754907.png', 'Rooney Hurley', 'Esse est enim aperi', '241.07', '241.07', 'Active', 1, '2026-02-10 16:31:47', 1, '2026-02-10 16:33:10', 1, '2026-02-10 16:33:21'),
(16, 10, 'food_698d4e6b3ebf67.82764262.jpg', 'Burger', 'Juicy, freshly prepared burger made with premium ingredients, layered with rich flavors, and served in a soft, toasted bun.\r\n', '400', '400', 'Active', 1, '2026-02-12 09:22:12', 1, '2026-02-12 16:14:45', 1, '2026-02-16 17:14:31'),
(17, 2, 'food_698d4e97d20673.66343171.jpg', 'Sandwich', 'Freshly prepared sandwich made with soft bread, high-quality fillings, and flavorful ingredients for a delicious and satisfying meal.\r\n', '400', '400', 'Active', 1, '2026-02-12 09:22:56', 1, '2026-02-12 16:14:22', 1, '2026-02-16 18:59:51'),
(18, 10, 'food_698d4eb794b639.77934250.png', 'pasta', 'Premium-quality pasta made from selected durum wheat, offering perfect texture and rich flavor for a satisfying dining experience.', '450', '450', 'Active', 1, '2026-02-12 09:23:28', 1, '2026-02-12 16:13:26', 1, '2026-02-16 17:14:26'),
(19, 10, 'food_698dc325afb1b5.26197414.jpg', 'pastaaa', 'uifhssafnjknweg', '425', '425', 'Active', 1, '2026-02-12 17:40:14', 1, '2026-02-12 17:40:40', 1, '2026-02-16 17:14:23'),
(20, 10, 'food_698dc69ec3cdf4.65203427.png', 'Shaine Gay', 'cdfefdcecef', '3', '3', 'Active', 1, '2026-02-12 17:55:04', NULL, NULL, 1, '2026-02-12 17:55:09'),
(21, 10, 'food_6992ec8291a4b5.53524630.png', 'peri peri pasta ', 'this is a spicy pasta ', '329', '329', 'Active', 1, '2026-02-16 15:38:16', NULL, NULL, 1, '2026-02-16 17:14:19'),
(22, 3, 'food_69930184b8f970.82107525.jpg', 'Ema Dathsi Chicken', 'nnnnnnbbbbbbbbb', '449', '449', 'Active', 1, '2026-02-16 17:07:42', NULL, NULL, 1, '2026-02-16 17:07:50'),
(23, 3, 'food_699301878fe216.72875751.jpg', 'Ema Dathsi Chicken', 'A fiery and comforting classic from the Himalayas. Tender chicken simmered in a traditional broth of melted cheese, butter, and spicy green chilies. Served with a mound of steamed rice.', '449', '449', 'Active', 1, '2026-02-16 17:07:44', 1, '2026-02-16 18:44:16', NULL, NULL),
(24, 10, 'food_69930565b57b60.65645979.webp', 'Special English Breakfast', 'Two eggs prepared your way, served with chicken sausage, chicken salami, crispy hashbrowns, baked beans, and sautéed veggies. Includes toast and your choice of coffee or tea.', '349', '349', 'Active', 1, '2026-02-16 17:18:29', 1, '2026-02-16 17:24:13', NULL, NULL),
(25, 10, 'food_69930525ee6187.86164856.jpg', 'Cinnamon French Toast', 'Golden-brown toast with a warm cinnamon kick. Served with maple syrup and whipped cream.', '179', '179', 'Active', 1, '2026-02-16 17:23:13', NULL, NULL, NULL, NULL),
(26, 10, 'food_69930609dc28d6.23533773.jpg', 'Nutella Waffle', 'A warm, golden Belgian waffle slathered with rich Nutella hazelnut spread. Topped with a dusting of icing sugar and a side of whipped cream.', '199', '199', 'Active', 1, '2026-02-16 17:26:59', NULL, NULL, NULL, NULL),
(27, 10, 'food_699306d52e7d83.14724671.webp', 'Classic Pancake', 'Our signature batter, griddled to perfection—crisp edges with a soft, airy center. Topped with icing sugar and served with your choice of honey or maple syrup.', '179', '179', 'Active', 1, '2026-02-16 17:30:23', NULL, NULL, NULL, NULL),
(28, 10, 'food_69930761c9edd7.27147198.webp', 'Herb Chicken Broccoli Soup', 'Fresh broccoli and tender chicken in a savory herb broth. Served with a side of toasted garlic bread.', '269', '269', 'Active', 1, '2026-02-16 17:32:43', NULL, NULL, NULL, NULL),
(29, 10, 'food_69930b9a1c0964.89626761.webp', 'Jamaican Pineapple Chicken Salad', 'The perfect balance of heat and sweet. Tender chicken marinated in bold Jamaican spices, tossed with fresh pineapple salsa, cherry tomatoes, and crunchy lettuce to cool down the spice.', '319', '319', 'Active', 1, '2026-02-16 17:35:01', 1, '2026-02-16 17:50:42', NULL, NULL),
(30, 6, 'food_69ce5409463ce3.64847465.jpg', 'American Cheese Chicken Nachos', 'Crispy nachos served with seasoned chicken and warm cheese sauce.', '329', '329', 'Active', 1, '2026-02-16 17:54:59', 1, '2026-04-02 17:03:29', NULL, NULL),
(31, 6, 'food_69930d210500b1.29116029.webp', 'Tandoori Prawns', 'Fresh prawns tossed in a bold red chili and garlic marinade, cooked to perfection in the tandoor. A smoky delight for spice enthusiasts.', '499', '499', 'Active', 1, '2026-02-16 17:57:15', NULL, NULL, NULL, NULL),
(32, 6, 'food_69930df90a8443.76026825.jpg', 'Malai Broccoli', 'Tender broccoli steeped in a velvety white marinade of cardamom, cream, and cheese. Finished with a touch of white pepper and a smoky char.', '369', '369', 'Active', 1, '2026-02-16 18:00:50', NULL, NULL, NULL, NULL),
(33, 6, 'food_69930f34b97cf4.86873265.webp', 'Mushroom Salt & Pepper', 'Fresh button mushrooms, batter-fried to a golden crunch and wok-tossed with cracked black pepper, garlic, and spring onions. A savory, spicy favorite.', '359', '359', 'Active', 1, '2026-02-16 18:06:05', NULL, NULL, NULL, NULL),
(34, 6, 'food_69930fbf363622.18618092.webp', 'Peri Peri Chicken Wings', 'Juicy wings drenched in a vibrant, citrus-spiked hot sauce. Sticky, messy, and addictive.', '369', '369', 'Active', 1, '2026-02-16 18:08:24', NULL, NULL, NULL, NULL),
(35, 6, 'food_6993108d720e38.40160129.webp', 'Kung Pao Chicken', 'Spicy stir-fried chicken with vegetables, peanuts, and dried chilies in a savory sauce.', '419', '419', 'Active', 1, '2026-02-16 18:11:50', NULL, NULL, NULL, NULL),
(36, 4, 'food_6993124c868722.35350898.jpg', 'Grilled Fish', 'A tender fillet of fish, pan-seared to perfection and drizzled with a rich lemon-garlic butter sauce. Served with a side of creamy mashed potatoes and sautéed vegetables.', '479', '479', 'Active', 1, '2026-02-16 18:19:18', NULL, NULL, NULL, NULL),
(37, 4, 'food_6993124e939f75.32034764.jpg', 'Grilled Fish', 'A tender fillet of fish, pan-seared to perfection and drizzled with a rich lemon-garlic butter sauce. Served with a side of creamy mashed potatoes and sautéed vegetables.', '479', '479', 'Active', 1, '2026-02-16 18:19:19', NULL, NULL, 1, '2026-02-16 18:19:34'),
(38, 4, 'food_6993131be36b39.27907389.webp', 'Tandoori Chicken Pizza', 'Spicy roasted chicken, onions, and peppers on a cheesy mozzarella base.', '459', '459', 'Active', 1, '2026-02-16 18:22:44', NULL, NULL, NULL, NULL),
(39, 4, 'food_6993157e2f5233.41282073.jpg', 'Toasted Club Veg Sandwich', 'A towering triple-decker delight. Three slices of golden toasted bread layered with crisp lettuce, juicy tomatoes, cucumber slices, and melted cheese. Served with a side of crunchy French Fries.', '329', '329', 'Active', 1, '2026-02-16 18:32:55', NULL, NULL, NULL, NULL),
(40, 4, 'food_6993163f678ab3.35662080.jpg', 'Mac n Cheese', 'An elevated classic. Al dente pasta tossed in a luxurious white cheddar and parmesan béchamel, finished with a drizzle of truffle oil and a crispy herb-breadcrumb crust.', '369', '369', 'Active', 1, '2026-02-16 18:36:08', NULL, NULL, NULL, NULL),
(41, 4, 'food_699316c0102f11.88229425.jpg', 'Chicken Lasagna', 'A rich, white-sauce variation. Roasted shredded chicken and spinach layered between pasta sheets with a velvety garlic-cream sauce. Topped with a crust of parmesan and mozzarella.', '429', '429', 'Active', 1, '2026-02-16 18:38:16', NULL, NULL, NULL, NULL),
(42, 4, 'food_69931795296145.93239449.jpg', 'Mushroom Stroganoff', 'A heart-warming classic. Fresh button mushrooms sautéed with garlic and onions, simmered in a rich, velvety sour cream and paprika sauce. Served over a bed of herb-buttered rice.', '369', '369', 'Active', 1, '2026-02-16 18:39:08', 1, '2026-02-16 18:41:49', NULL, NULL),
(43, 3, 'food_699318adafa568.94181470.jpg', 'Konaseema Kodi Pulao', 'Succulent bone-in chicken marinated in a secret Konaseema spice blend, slow-cooked with fragrant herbs, caramelized onions, and a hint of ghee. Served with raitha and salan.', '379', '379', 'Active', 1, '2026-02-16 18:46:30', NULL, NULL, NULL, NULL),
(44, 3, 'food_6993191a193e81.22851439.jpg', 'Kadai Vegetable', 'A vibrant medley of seasonal vegetables and diced capsicum, wok-tossed in a spicy tomato-onion gravy. Flavored with our house-ground Kadai masala', '349', '349', 'Active', 1, '2026-02-16 18:48:19', NULL, NULL, NULL, NULL),
(45, 3, 'food_69931990d3aec0.72448813.webp', 'Telangana Chicken Curry', 'Spicy, traditional chicken curry cooked with roasted spices and curry leaves.', '399', '399', 'Active', 1, '2026-02-16 18:50:17', NULL, NULL, NULL, NULL),
(46, 3, 'food_69931a00a090f7.75182615.jpg', 'Sambar Rice', 'A wholesome, one-bowl meal. Steamed rice mixed with our signature spicy-tangy vegetable sambar. Served hot with a side of crispy papad and pickle.', '249', '249', 'Active', 1, '2026-02-16 18:52:09', NULL, NULL, NULL, NULL),
(47, 3, 'food_69931a7b4681a5.96640347.jpg', 'Schezwan Chicken Fried Rice', 'Aromatic basmati rice stir-fried on high heat with succulent chicken strips and a vibrant mix of garlic, dried red chilies, and Sichuan peppercorns. A perfect balance of spice and pungency.', '319', '319', 'Active', 1, '2026-02-16 18:54:12', NULL, NULL, NULL, NULL),
(48, 3, 'food_69931ad072cde0.27094668.jpg', 'Vegetable Hakka Noodles', 'A timeless favorite. Steamed noodles wok-tossed on high heat with crunchy shredded cabbage, carrots, bell peppers, and spring onions. Seasoned lightly with soy and white pepper.', '249', '249', 'Active', 1, '2026-02-16 18:55:38', NULL, NULL, NULL, NULL),
(49, 3, 'food_69ce542a6b9ab7.19611132.jpg', 'Butter Garlic Naan', 'Soft, leavened flatbread baked in the tandoor until fluffy and golden. Topped with a generous layer of minced garlic and fresh coriander, then brushed with melted butter.', '100', '100', 'Active', 1, '2026-02-16 18:57:35', 1, '2026-04-02 17:04:02', NULL, NULL),
(50, 3, 'food_69931bab2141a9.87248611.jpg', 'Lachha Paratha', 'Beautifully spiraled and golden-brown. Each bite offers a satisfying crunch on the outside and soft, buttery layers on the inside. Perfect for scooping up thick gravies.', '70', '70', 'Active', 1, '2026-02-16 18:59:15', NULL, NULL, NULL, NULL),
(51, 2, 'food_69931c3923d1f8.26674824.webp', 'Cold Pressed Watermelon Juice', '100% raw and natural. Extracted using cold-press technology to retain maximum nutrients and enzymes. No added sugar, no water—just the pure, sweet essence of watermelon.', '229', '229', 'Active', 1, '2026-02-16 19:01:38', NULL, NULL, NULL, NULL),
(52, 2, 'food_69931ca98cf941.17481658.jpg', 'Spiced Hot Chocolate', 'A rich, velvety dark chocolate blend infused with cinnamon and a pinch of cayenne pepper/chili. The subtle heat enhances the cocoa flavor for a warming, sophisticated finish.', '249', '249', 'Active', 1, '2026-02-16 19:03:30', NULL, NULL, NULL, NULL),
(53, 2, 'food_69931d7a4554c9.06039483.jpg', 'Lotus Biscoff Thickshake', 'The trending favorite. Rich vanilla bean ice cream blended with generous scoops of creamy Lotus Biscoff spread. Topped with whipped cream and a crunchy Biscoff biscuit crumble.', '229', '229', 'Active', 1, '2026-02-16 19:06:59', NULL, NULL, NULL, NULL),
(54, 2, 'food_69ce52e3605387.80459169.jpg', 'Virgin Mojito', 'Crisp, cool, and aromatic. A refreshing blend of hand-crushed mint, tangy lime juice, and a splash of sugar syrup. Served tall over ice for a clean finish.', '179', '179', 'Active', 1, '2026-02-16 19:08:10', 1, '2026-04-02 16:58:35', NULL, NULL),
(55, 2, 'food_69931e330181d2.85203895.jpg', 'Shirley Temple', 'Sweet, fizzy, and fun. Crisp Sprite swirled with ruby-red pomegranate syrup creates a beautiful pink blush. Finished with a squeeze of lime and a cherry on top.', '179', '179', 'Active', 1, '2026-02-16 19:10:03', NULL, NULL, NULL, NULL),
(56, 2, 'food_69931ea608b511.53407112.jpg', 'Hazelnut Latte', 'A nutty twist on the classic. Rich, full-bodied espresso swirled with steamed velvety milk and infused with sweet, toasted hazelnut syrup.', '219', '219', 'Active', 1, '2026-02-16 19:11:58', NULL, NULL, NULL, NULL),
(57, 4, 'food_69931f985ad933.44478313.jpg', 'Penne English Vegetable Pasta', 'Penne pasta cooked with broccoli, zucchini, and bell peppers in your choice of Red, White, or Pink sauce.', '369', '369', 'Active', 1, '2026-02-16 19:16:01', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `home_stats`
--

CREATE TABLE `home_stats` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `metrics1` int(11) DEFAULT NULL,
  `metrics1_suffix` varchar(5) DEFAULT NULL,
  `metrics2` int(11) DEFAULT NULL,
  `metrics2_suffix` varchar(5) DEFAULT NULL,
  `metrics3` int(11) DEFAULT NULL,
  `metrics3_suffix` varchar(5) DEFAULT NULL,
  `feature_title1` varchar(155) DEFAULT NULL,
  `feature_title2` varchar(155) DEFAULT NULL,
  `feature_title3` varchar(155) DEFAULT NULL,
  `feature_title4` varchar(155) DEFAULT NULL,
  `feature_title5` varchar(155) DEFAULT NULL,
  `feature_description1` text DEFAULT NULL,
  `feature_description2` text DEFAULT NULL,
  `feature_description3` text DEFAULT NULL,
  `feature_description4` text DEFAULT NULL,
  `feature_description5` text DEFAULT NULL,
  `feature_image1` varchar(155) DEFAULT NULL,
  `feature_image2` varchar(155) DEFAULT NULL,
  `feature_image3` varchar(155) DEFAULT NULL,
  `feature_image4` varchar(155) DEFAULT NULL,
  `feature_image5` varchar(155) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) DEFAULT NULL,
  `create_audit_time` datetime DEFAULT current_timestamp(),
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `home_stats`
--

INSERT INTO `home_stats` (`id`, `title`, `image`, `metrics1`, `metrics1_suffix`, `metrics2`, `metrics2_suffix`, `metrics3`, `metrics3_suffix`, `feature_title1`, `feature_title2`, `feature_title3`, `feature_title4`, `feature_title5`, `feature_description1`, `feature_description2`, `feature_description3`, `feature_description4`, `feature_description5`, `feature_image1`, `feature_image2`, `feature_image3`, `feature_image4`, `feature_image5`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 'Test Home Stat', '699b2e21ce9ea.jpeg', 20, '+', 60, '%', 100, '%', '🏁 Excellencee', '🛡 Safety First', '⚡ Energy', '🤝 Professionalism', '❤️ Passion', 'Delivering world-class experiences in every ride.', 'Strict global safety protocols at every level.', 'High-adrenaline action in every activity.', 'Trained staff. Organized operations. Premium service.\r\n', 'Driven by love for motorsports and entertainment.', '6993d083b0c21.jpg', '6995ec6c10aec.png', '699b2dd675ded.jpeg', '6993d2f45a3ec.png', '6993d24f310b3.png', 'Active', 1, '2026-01-14 12:41:55', 1, '2026-04-28 17:56:13', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `menu_documents`
--

CREATE TABLE `menu_documents` (
  `id` int(11) NOT NULL,
  `gaming_menu` varchar(255) DEFAULT NULL,
  `overall_menu` varchar(255) DEFAULT NULL,
  `cafe_menu` varchar(255) DEFAULT NULL,
  `create_audit_id` int(11) DEFAULT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_documents`
--

INSERT INTO `menu_documents` (`id`, `gaming_menu`, `overall_menu`, `cafe_menu`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, '69e9ee395b85c.pdf', '69ea09f5d1aee.pdf', '69e9ee3b33319.pdf', NULL, NULL, 1, '2026-04-23 17:30:55', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE `offers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `discount` varchar(20) NOT NULL,
  `start_date` varchar(30) NOT NULL,
  `end_date` varchar(30) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `create_audit_id` int(11) NOT NULL,
  `create_audit_time` datetime NOT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offers`
--

INSERT INTO `offers` (`id`, `name`, `type`, `discount`, `start_date`, `end_date`, `image`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 'New Year Offer 2026', 'Percentage', '50%', '31-01-2025', '01-01-2026', '6978472605e3a.jpg', 'Active', 1, '2026-01-27 10:33:35', NULL, NULL, 1, '2026-04-06 16:03:29'),
(2, 'February', 'Percentage', '10%', '28-01-2026', '27-02-2026', '69784d9c3edfe.jpg', 'Active', 1, '2026-01-27 11:01:09', NULL, NULL, 1, '2026-04-06 16:03:33'),
(3, 'Officiis qui asperio', 'Percentage', '24%', '13-09-2017', '16-09-2003', '6978524b4730c.jpg', 'Inactive', 1, '2026-01-27 11:21:09', NULL, NULL, 1, '2026-03-07 13:17:59'),
(4, 'test', 'Flat', '222', '07-03-2026', '07-03-2026', '69abd881023fa.jpg', 'Active', 1, '2026-03-07 13:19:22', NULL, NULL, 1, '2026-04-06 16:03:38'),
(5, 'Summer Offer 2026', 'Percentage', '50%', '31-03-2026', '01-05-2026', '69d33c58abe1a.jpg', 'Active', 1, '2026-04-06 10:23:46', NULL, NULL, 1, '2026-04-06 16:03:22');

-- --------------------------------------------------------

--
-- Table structure for table `our_vision_values`
--

CREATE TABLE `our_vision_values` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) DEFAULT NULL,
  `create_audit_time` datetime DEFAULT current_timestamp(),
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `our_vision_values`
--

INSERT INTO `our_vision_values` (`id`, `name`, `image`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 'Local Pride, Global Standard', '6967321ddf8ae.png', 'Active', 1, '2026-01-14 11:29:58', 1, '2026-01-14 11:38:48', NULL, NULL),
(2, 'Saftey Above All', '696733b8e065a.png', 'Active', 1, '2026-01-14 11:42:10', NULL, NULL, NULL, NULL),
(3, 'Inclusive Fun for All Ages', '6967321ddf8ae.png', 'Active', 1, '2026-01-14 11:42:39', NULL, NULL, NULL, NULL),
(4, 'Lasting Memories', '696733b8e065a.png', 'Active', 1, '2026-01-14 11:42:48', NULL, NULL, NULL, NULL),
(5, 'Continuous Innovation', '6967321ddf8ae.png', 'Active', 1, '2026-01-14 11:42:50', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` varchar(30) NOT NULL,
  `discounted_price` varchar(30) NOT NULL,
  `features` text NOT NULL,
  `is_most_popular` tinyint(1) DEFAULT 0,
  `guidelines` text DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) DEFAULT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `name`, `description`, `price`, `discounted_price`, `features`, `is_most_popular`, `guidelines`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 'BONUS PACK', 'Epic Adventure!', '3493', '2699', '[\"GOKARTING (12 LAPS)\",\"BOWLING\",\"ZIPLINE ROLLERCOASTER OR SKY ROLLER OR SKY CYCLE\",\"TRAMPOLINE (30 MINS)\",\"ARCHERY OR RIFLE SHOOTING OR PAINT BALL SHOOTING\",\"ROCKET EJECTION\",\"FOOD ( Standard Buffet )\"]', 0, '[{\"title\":\"Usage Guideline\",\"description\":\"Minimum group size required is 20 participants.\"},{\"title\":\"Safety Guideline\",\"description\":\"All participants must follow activity safety instructions and wear the required safety gear provided by FNF Arena staff.\"}]', 'Active', 1, '2026-02-10 20:29:45', 1, '2026-03-05 18:00:46', NULL, NULL),
(2, 'PEAK PERFORMER PACK', 'Pro Level!', '2993', '2399', '[\"GOKARTING (5 LAPS)\",\"BOWLING\",\"ZIPLINE ROLLERCOASTER OR SKY ROLLER OR SKY CYCLE\",\"TRAMPOLINE (30 MINS)\",\"ARCHERY OR RIFLE SHOOTING OR PAINT BALL SHOOTING\",\"ROCKET EJECTION\",\"FOOD ( Standard Buffet )\"]', 0, '[{\"title\":\"Usage Guideline\",\"description\":\"Minimum group size required is 20 participants.\"},{\"title\":\"Safety Guideline\",\"description\":\"All participants must follow activity safety instructions and wear the required safety gear provided by FNF Arena staff.\"}]', 'Active', 1, '2026-02-10 20:30:12', 1, '2026-03-05 18:00:27', NULL, NULL),
(3, 'GAME CHANGER PACK', 'Ultimate Fun!', '2694', '2099', '[\"GOKARTING (5 LAPS)\",\"BOWLING\",\"ZIPLINE ROLLERCOASTER OR SKY ROLLER OR SKY CYCLE\",\"TRAMPOLINE (30 MINS)\",\"ARCHERY OR RIFLE SHOOTING OR PAINT BALL SHOOTING\",\"FOOD ( Standard Buffet )\"]', 0, '[{\"title\":\"Usage Guideline\",\"description\":\"Minimum group size required is 20 participants.\"},{\"title\":\"Safety Guideline\",\"description\":\"All participants must follow activity safety instructions and wear the required safety gear provided by FNF Arena staff.\"}]', 'Active', 1, '2026-02-10 20:30:25', 1, '2026-03-05 18:00:11', NULL, NULL),
(4, 'THE INNOVATORS PACK', 'Game Changer!', '2195', '1799', '[\"GOKARTING (5 LAPS)\",\"ARCHERYORRIFLE SHOOTINGORPAINT BALL SHOOTING\",\"ROCKET EJECTION\",\"ZIPLINE ROLLERCOASTERORSKY ROLLERORSKY CYCLE\",\"FOOD ( Standard Buffet )\"]', 1, '[{\"title\":\"Usage Guideline\",\"description\":\"Minimum group size required is 20 participants.\"},{\"title\":\"Safety Guideline\",\"description\":\"All participants must follow activity safety instructions and wear the required safety gear provided by FNF Arena staff.\"}]', 'Active', 1, '2026-02-10 20:32:12', 1, '2026-03-13 15:27:51', NULL, NULL),
(5, 'RAISING STAR PACK', 'Level Up!', '1646', '1599', '[\"GOKARTING (5 LAPS)\",\"ARCHERY OR RIFLE SHOOTING OR PAINT BALL SHOOTING\",\"ZIPLINE ROLLERCOASTER OR SKY ROLLER OR SKY CYCLE\",\"FOOD ( Standard Buffet )\"]', 0, '[{\"title\":\"Usage Guideline\",\"description\":\"Minimum group size required is 20 participants.\"},{\"title\":\"Safety Guideline\",\"description\":\"All participants must follow activity safety instructions and wear the required safety gear provided by FNF Arena staff.\"}]', 'Active', 1, '2026-02-10 20:33:46', 1, '2026-03-13 15:47:18', NULL, NULL),
(6, 'FRESHER PACK', 'Perfect Start!', '1647', '1399', '[\"GOKARTING (5 LAPS)\",\"BOWLING\",\"FOOD ( Standard Buffet )\"]', 0, '[{\"title\":\"Usage Guideline\",\"description\":\"Minimum group size required is 20 participants\"},{\"title\":\"Safety Guideline\",\"description\":\"All participants must follow activity safety instructions and wear the required safety gear provided by FNF Arena staff.\"}]', 'Active', 1, '2026-02-10 20:34:04', 1, '2026-03-05 17:58:28', NULL, NULL),
(9, 'test', 'test', '100', '89', '[\"11111\",\"2222222\"]', 0, '[{\"title\":\"test title\",\"description\":\"test descriptipn\"}]', 'Active', 1, '2026-02-10 23:32:31', 1, '2026-02-10 23:46:53', 1, '2026-02-10 23:53:38'),
(10, 'RIDER PACK', 'Perfect Start!', '2694', '2199', '[\"GOKARTING (5LAPS)\",\"BOWLING\",\"ARCHERY OR RIFLE SHOOTING OR PAINT BALL SHOOTING\",\"ZIPLINE ROLLERCOASTER OR SKY ROLLER OR SKY CYCLE \",\"LASER TAG (10 MINS)\",\"FOOD ( Standard Buffet )\"]', 0, '[{\"title\":\"Usage Guideline\",\"description\":\"Minimum group size required is 20 participants.\"},{\"title\":\"Safety Guideline\",\"description\":\"All participants must follow activity safety instructions and wear the required safety gear provided by FNF Arena staff.\"}]', 'Active', 1, '2026-03-13 15:32:12', 1, '2026-03-13 15:37:19', NULL, NULL),
(11, 'ROYAL PACK', 'Perfect Start!', '2894', '2399', '[\"GOKARTING (5LAPS)\",\"BOWLING\",\" ARCHERY OR RIFLE SHOOTING OR PAINT BALL SHOOTING\",\"LASER TAG (10 MINS)\",\"PAINT BALL ARENA (60 BALLS)\",\"FOOD ( Standard Buffet )\"]', 0, '[{\"title\":\"Usage Guideline\",\"description\":\"Minimum group size required is 20 participants\"},{\"title\":\"Safety Guideline\",\"description\":\"All participants must follow activity safety instructions and wear the required safety gear provided by FNF Arena staff.\"}]', 'Active', 1, '2026-03-13 15:36:50', 1, '2026-04-23 15:53:24', NULL, NULL),
(12, 'INFINITY PACK', 'Level Up!', '3293', '2599', '[\"GOKARTING (5LAPS)\",\"BOWLING\",\" ARCHERY OR RIFLE SHOOTING OR PAINT BALL SHOOTING\",\" ZIPLINE ROLLERCOASTER OR SKY ROLLER OR SKY CYCLE\",\"LASER TAG (10 MINS)\",\"PAINT BALL ARENA (60 BALLS)\",\"FOOD ( Standard Buffet )\"]', 0, '[{\"title\":\"Usage Guideline\",\"description\":\"Minimum group size required is 20 participants\"},{\"title\":\"Safety Guideline\",\"description\":\"All participants must follow activity safety instructions and wear the required safety gear provided by FNF Arena staff.\"}]', 'Active', 1, '2026-03-13 15:39:40', 1, '2026-03-13 15:44:06', NULL, NULL),
(13, 'EXPLORER PACK', 'Adventure', '3991', '3199', '[\"GOKARTING (5 LAPS)\",\"BOWLING\",\"LASER TAG (10 MINS)\",\"PAINT BALL ARENA (60 BALLS)\",\"ARCHERY OR RIFLE SHOOTING OR PAINT BALL SHOOTING\",\"ZIPLINE ROLLERCOASTER OR SKY ROLLER OR SKY CYCLE\",\"ROCKET EJECTION\",\"TRAMPOLINE (30 MINS)\",\"FOOD ( Standard Buffet )\"]', 0, '[{\"title\":\"Usage Guideline\",\"description\":\"Minimum group size required is 20 participants\"},{\"title\":\"Safety Guideline\",\"description\":\"All participants must follow activity safety instructions and wear the required safety gear provided by FNF Arena staff.\"}]', 'Active', 1, '2026-03-13 15:42:06', 1, '2026-03-13 15:42:39', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `otp` varchar(10) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expire_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`id`, `email`, `otp`, `token`, `expire_at`, `created_at`) VALUES
(13, 'admin@gmail.com', '117179', '0cee36b8adca9fb746140985f41f6b58e4c9527e', '2026-01-31 23:43:59', '2026-01-31 23:33:59');

-- --------------------------------------------------------

--
-- Table structure for table `plan_bookings`
--

CREATE TABLE `plan_bookings` (
  `id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `event_date` varchar(40) NOT NULL,
  `event_time` varchar(40) NOT NULL,
  `participants` int(11) NOT NULL,
  `special_requests` text DEFAULT NULL,
  `terms_accepted` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('Pending','Approve','Reject') DEFAULT 'Pending',
  `create_audit_id` int(11) DEFAULT NULL,
  `create_audit_time` datetime DEFAULT NULL,
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `plan_bookings`
--

INSERT INTO `plan_bookings` (`id`, `package_id`, `full_name`, `email`, `phone`, `event_date`, `event_time`, `participants`, `special_requests`, `terms_accepted`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, 'John Doe', 'john@example.com', '9876543210', '2026-03-15', '18:00', 50, 'Vegetarian food', 1, 'Reject', 1, '2026-02-10 21:06:33', 1, '2026-04-07 09:49:46', NULL, '2026-04-12 15:43:00'),
(2, 1, 'John Doe', 'john@example.com', '9876543210', '2026-03-15', '18:00', 50, 'Vegetarian food', 1, 'Pending', 1, '2026-02-10 21:08:56', 1, '2026-04-02 16:13:36', NULL, '2026-04-12 15:43:03'),
(3, 6, 'Kadeem Berg', 'qoje@mailinator.com', '9876543217', '2026-02-26', '00:03', 313, 'Eius minim ratione q', 1, 'Pending', 1, '2026-02-11 20:50:58', 1, '2026-04-02 16:50:13', NULL, '2026-04-12 15:43:06'),
(4, 5, 'Heather Noel', 'tudywyho@mailinator.com', '9876543211', '2026-02-26', '00:08', 198, 'Nihil ullamco pariat', 1, 'Pending', 1, '2026-02-11 20:54:15', NULL, NULL, NULL, '2026-04-12 15:43:09'),
(5, 6, 'Alma Gillespie', 'riruqasuki@mailinator.com', '9876543211', '2026-02-15', '07:26', 243, 'Quasi atque laboris', 1, 'Pending', 1, '2026-02-12 09:33:42', 1, '2026-04-02 15:32:31', NULL, '2026-04-12 15:43:15'),
(6, 5, 'Flynn Randolph', 'qobi@mailinator.com', '5693758758', '2026-03-06', '06:15', 133, 'Voluptatem facilis', 1, 'Pending', 1, '2026-02-12 12:12:09', NULL, NULL, NULL, '2026-04-12 15:43:12'),
(7, 6, 'Lani Curtis', 'haluhucypy@mailinator.com', '7583584552', '2026-03-06', '12:22', 98, 'Irure qui quam quia', 1, 'Pending', 1, '2026-02-12 12:12:33', NULL, NULL, NULL, '2026-04-12 15:45:22'),
(8, 6, 'Robert Pollard', 'vacad@mailinator.com', '9876541231', '2026-02-17', '22:13', 620, 'Ullam est obcaecati', 1, 'Pending', 1, '2026-02-12 12:24:52', NULL, NULL, NULL, '2026-04-12 15:43:20'),
(9, 5, 'TaShya Berry', 'qulejiq@mailinator.com', '9876543211', '2026-02-25', '17:39', 654, 'Est ad optio quam m', 1, 'Pending', 1, '2026-02-13 17:29:22', NULL, NULL, NULL, '2026-04-12 15:45:20'),
(10, 6, 'Nolan Sheppard', 'vugehihy@mailinator.com', '1234567899', '2026-02-19', '03:08', 952, 'Accusantium soluta i', 1, 'Pending', 1, '2026-02-13 17:30:01', NULL, NULL, NULL, '2026-04-12 15:43:29'),
(11, 4, 'Gloria Shelton', 'puvewiwa@mailinator.com', '9786543211', '2026-02-18', '21:18', 398, 'Eum velit laborum', 1, 'Pending', 1, '2026-02-13 19:04:05', NULL, NULL, NULL, '2026-04-12 15:44:24'),
(12, 6, 'test', 'grkrishnareddy@gmail.com', '9955504099', '2026-02-27', '11:30', 35, 'test', 1, 'Pending', 1, '2026-02-14 18:15:11', NULL, NULL, NULL, '2026-04-12 15:44:18'),
(13, 5, 'tetetetete', 'grkrishnareddy@gmail.com', '9955504999', '2026-02-24', '11:30', 36, '', 1, 'Pending', 1, '2026-02-14 18:15:49', NULL, NULL, NULL, '2026-04-12 15:45:18'),
(14, 6, 'Owen Parker', 'kudir@mailinator.com', '9876543211', '2026-02-19', '11:14', 513, 'Possimus in rerum e', 1, 'Pending', 1, '2026-02-16 15:19:09', NULL, NULL, NULL, '2026-04-12 15:45:16'),
(15, 4, 'Ria Kennedy', 'nedosibyj@mailinator.com', '9876543211', '2026-02-19', '00:34', 201, 'Omnis omnis eiusmod', 1, 'Pending', 1, '2026-02-16 15:19:54', NULL, NULL, NULL, '2026-04-12 15:44:32'),
(16, 6, 'Bharat', 'Bharatgudeti@gmail.com', '7799234520', '2026-02-28', '17:21', 10, 'hi', 1, 'Pending', 1, '2026-02-21 16:22:06', NULL, NULL, NULL, '2026-04-12 15:45:13'),
(17, 5, 'Alea Sampson', 'lumi@mailinator.com', '9876543236', '2026-03-04', '03:28', 50, 'Exercitationem id i', 1, 'Pending', 1, '2026-02-27 11:04:42', NULL, NULL, NULL, '2026-04-12 15:44:35'),
(18, 6, 'Amber Wolfe', 'wuqawu@mailinator.com', '9248393087', '2026-03-04', '17:01', 442, 'Sit quisquam offici', 1, 'Pending', 1, '2026-02-27 11:30:07', NULL, NULL, NULL, '2026-04-12 15:44:38'),
(19, 6, 'hghghgyt', 'fghghuy@gmail.coom', '0000000000', '2026-03-13', '13:01', 9, 'ygyg', 1, 'Pending', 1, '2026-03-05 13:58:05', NULL, NULL, NULL, '2026-04-12 15:44:42'),
(20, 5, 'Vineeth', 'vineeth@gmail.com', '9177754434', '2026-03-18', '14:22', 5, '', 1, 'Pending', 1, '2026-03-05 16:08:46', NULL, NULL, NULL, '2026-04-12 15:44:44'),
(21, 6, '232343434545454', 'anvesh@yopmail.com', '0000000000', '2026-03-14', '00:40', 9, '', 1, 'Pending', 1, '2026-03-05 20:36:29', NULL, NULL, NULL, '2026-04-12 15:45:11'),
(22, 5, '232343434545454', 'anvesh@yopmail.com', '0000000000', '2026-03-13', '00:00', 55554, '', 1, 'Pending', 1, '2026-03-05 20:37:28', NULL, NULL, NULL, '2026-04-12 15:42:54'),
(23, 5, 'e', 'anvesh@yopmail.com', '0000000000', '2222-01-31', '01:17', 2, '', 1, 'Pending', 1, '2026-03-05 21:17:56', NULL, NULL, NULL, '2026-04-12 15:42:51'),
(24, 1, 'vinod kumar', 'vinod5448@gmail.com', '9000000003', '2026-03-09', '01:13', 4, 'asdfasdfa', 1, 'Pending', 1, '2026-03-06 12:12:50', NULL, NULL, NULL, '2026-04-12 15:44:47'),
(25, 1, 'vinod kumar', 'vinod5448@gmail.com', '9000000003', '2026-03-09', '12:13', 4, 'aSDFASDF', 1, 'Pending', 1, '2026-03-06 12:13:21', NULL, NULL, NULL, '2026-04-12 15:44:50'),
(26, 3, 'vinod kumar', 'vinod5448@gmail.com', '9000000003', '2026-03-18', '00:13', 2, '', 1, 'Pending', 1, '2026-03-06 12:13:46', NULL, NULL, NULL, '2026-04-12 15:44:53'),
(27, 6, 'vinod kumar', 'vinod5448@gmail.com', '9000000003', '2026-03-09', '12:16', 3, '', 1, 'Pending', 1, '2026-03-06 12:14:12', 1, '2026-04-07 09:25:43', NULL, '2026-04-12 15:44:55'),
(28, 5, 'Steel Reilly', 'hurifu@mailinator.com', '9876543211', '2026-03-29', '17:30', 20, 'Id laborum In sunt rerum repudiandae ea dignissimos laborum', 1, 'Pending', 1, '2026-03-06 15:35:54', NULL, NULL, NULL, '2026-04-12 15:45:09'),
(29, 6, 'Emerson Moore', 'vuma@mailinator.com', '9000000000', '2027-02-07', '11:13', 21, 'Ut quis ad hic incididunt magnam in debitis sed quia autem amet tenetur vel nihil quia porro nostrud autem', 1, 'Pending', 1, '2026-03-06 15:39:01', NULL, NULL, NULL, '2026-04-12 15:45:07'),
(30, 6, 'Prescott Mcfarland', 'puhim@mailinator.com', '9876543211', '2026-03-29', '13:24', 31, 'Maiores est cupiditate dolorum sint do excepteur fugiat', 1, 'Pending', 1, '2026-03-06 15:50:40', NULL, NULL, NULL, '2026-04-12 15:45:05'),
(31, 5, 'Graham Rasmussen', 'laginuv@mailinator.com', '9876541323', '2026-04-17', '13:51', 30, 'Non ea dolorem voluptatem eum et mollit sapiente quidem expedita exercitation numquam non', 1, 'Pending', 1, '2026-03-06 15:53:21', NULL, NULL, NULL, '2026-04-12 15:45:02'),
(32, 4, 'Cairo Bond', 'retinimy@mailinator.com', '9876541233', '2026-08-24', '17:12', 457, 'Exercitationem lorem quasi numquam culpa optio quam', 1, 'Pending', 1, '2026-03-06 15:53:45', NULL, NULL, NULL, '2026-04-12 15:44:59'),
(33, 5, 'Macey Roth', 'zulefe@mailinator.com', '7896541233', '2026-03-12', '15:14', 32, 'Aut perspiciatis ut et non at', 1, 'Pending', 1, '2026-03-06 15:57:53', NULL, NULL, NULL, '2026-04-12 15:42:37'),
(34, 5, 'Charissa Sims', 'huwidoruv@mailinator.com', '9876541233', '2026-10-13', '17:59', 36, 'Et asperiores quam molestiae aspernatur id voluptas nobis quod nostrud reprehenderit duis sit corrupti voluptate officia aut excepturi', 1, 'Pending', 1, '2026-03-06 15:59:42', NULL, NULL, NULL, '2026-04-12 15:42:34'),
(35, 5, 'Sheila Joyce', 'nopok@mailinator.com', '9874563214', '2026-05-03', '13:02', 397, 'Iste totam ut cum lorem', 1, 'Pending', 1, '2026-03-06 16:04:13', NULL, NULL, NULL, '2026-04-12 15:42:46'),
(36, 5, 'Lucy Deleon', 'jyxepy@mailinator.com', '9874563211', '2026-10-16', '21:43', 27, 'Nihil voluptatem mollitia minima et', 1, 'Pending', 1, '2026-03-06 16:11:16', NULL, NULL, NULL, '2026-04-12 15:42:22'),
(37, 5, 'Yvonne Schmidt', 'janef@mailinator.com', '9874563211', '2026-07-19', '19:15', 27, 'Consectetur dolorem tempora aut neque cillum', 1, 'Pending', 1, '2026-03-06 16:13:26', NULL, NULL, NULL, '2026-04-12 15:41:49'),
(38, 5, 'Regina Knight', 'hamacyju@mailinator.com', '9874563211', '2026-05-21', '21:02', 21, 'At alias anim voluptatem duis nulla similique incididunt veniam totam autem elit', 1, 'Pending', 1, '2026-03-06 16:18:24', NULL, NULL, NULL, '2026-04-12 15:41:44'),
(39, 4, 'vinod kumar', 'vinod5448@gmail.com', '9000000003', '2026-03-11', '11:45', 20, 'ASDfsdf', 1, 'Pending', 1, '2026-03-07 10:47:24', NULL, NULL, NULL, '2026-04-12 15:41:40'),
(40, 6, 'vinod kumar', 'vinod5448@gmail.com', '8919671663', '2026-03-20', '11:53', 33, 'SDf  asdf asdf asdf asdf asdf asdf', 1, 'Pending', 1, '2026-03-07 10:51:14', NULL, NULL, NULL, '2026-04-12 15:41:35'),
(41, 5, 'vinod kumar', 'vinod5448@gmail.com', '9000000003', '2026-04-22', '11:53', 44, 'asdf asdf asd fasdf asdf asd fasdf asdf asdf', 1, 'Pending', 1, '2026-03-07 10:53:46', 1, '2026-04-07 09:25:25', NULL, '2026-04-12 15:41:31'),
(42, 12, 'Hema', 'hemaduggiralasr@gmail.com', '7997637811', '2026-03-30', '11:30', 25, 'Please make food items less spicy', 1, 'Pending', 1, '2026-03-14 13:28:47', 1, '2026-04-07 09:27:52', NULL, '2026-04-12 15:41:27'),
(43, 1, 'TEST', 'grkrishnareddy@gmail.com', '9966604099', '2026-04-14', '22:30', 20, 'TEST', 1, 'Reject', 1, '2026-04-02 11:50:50', 1, '2026-04-07 10:03:49', NULL, '2026-04-12 15:41:19'),
(44, 13, 'tetetetet', 'ttet@gmail.com', '9955504988', '2026-12-04', '13:30', 20, '', 1, 'Pending', 1, '2026-04-02 12:50:12', NULL, NULL, NULL, '2026-04-12 15:41:23'),
(45, 12, 'Camilla Church', 'hyxomate@mailinator.com', '9876541236', '2026-05-07', '18:39', 21, 'Incididunt ex est deserunt et corporis tempore atque ut sapiente velit omnis culpa laudantium ut omnis anim', 1, 'Pending', 1, '2026-04-02 14:37:31', NULL, NULL, NULL, '2026-04-12 15:41:16'),
(46, 12, 'Hemanth', 'hemanth@gmail.com', '7986541236', '2026-04-04', '16:43', 21, 'Veg food only', 1, 'Pending', 1, '2026-04-02 15:45:11', 1, '2026-04-07 09:21:55', NULL, '2026-04-12 15:41:14'),
(47, 1, 'John Doeeee', 'john@example.com', '9876543211', '2026-04-15', '18:00', 51, 'Vegetarian food', 1, 'Pending', 1, '2026-04-02 16:13:25', 1, '2026-04-07 09:54:10', NULL, '2026-04-12 15:41:11'),
(48, 1, 'John Doe', 'john@example.com', '9876543210', '2026-03-15', '18:00', 50, 'Vegetarian food', 1, 'Approve', 1, '2026-04-07 09:34:52', 1, '2026-04-07 10:00:37', NULL, '2026-04-12 15:41:09'),
(49, 6, 'krishna', 'grkrishnareddy@gmail.com', '9966604099', '2026-12-05', '12:40', 20, 'approved', 1, 'Pending', 1, '2026-04-07 20:32:34', 1, '2026-04-07 20:33:35', NULL, '2026-04-12 15:41:06'),
(50, 4, 'siri', 'n.shirisha777@gmail.com', '9100649694', '2026-04-30', '11:00', 28, 'Need Hi Tea', 1, 'Approve', 1, '2026-04-21 15:39:53', 1, '2026-04-21 15:42:03', NULL, NULL),
(51, 10, 'hema', 'hema@gmail.com', '7997637811', '2026-04-29', '11:00', 30, '', 1, 'Reject', 1, '2026-04-21 15:43:05', 1, '2026-04-21 15:44:14', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `role_name` varchar(100) NOT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `create_audit_id` int(10) UNSIGNED NOT NULL,
  `create_audit_time` datetime NOT NULL DEFAULT current_timestamp(),
  `update_audit_id` int(10) UNSIGNED DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `delete_audit_id` int(10) UNSIGNED DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 'HR', 'Active', 1, '2026-01-21 19:15:24', 1, '2026-01-21 19:17:40', 1, '2026-01-21 19:17:40');

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

CREATE TABLE `sub_category` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `create_audit_id` int(11) DEFAULT NULL,
  `create_audit_time` datetime DEFAULT current_timestamp(),
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`id`, `category_id`, `name`, `status`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 1, 'Painball Areana', 'Active', 1, '2026-01-14 13:36:53', NULL, NULL, NULL, NULL),
(2, 1, 'Drifters & Bumping Cars', 'Active', 1, '2026-01-14 13:37:27', NULL, NULL, NULL, NULL),
(3, 1, 'Target Zone', 'Active', 1, '2026-01-14 13:37:45', NULL, NULL, NULL, NULL),
(4, 2, 'Bowling', 'Active', 1, '2026-01-14 13:47:47', NULL, NULL, NULL, NULL),
(5, 2, 'Laser Tag', 'Active', 1, '2026-01-14 13:48:20', NULL, NULL, NULL, NULL),
(6, 2, 'Softplay & Trampoline & Bull Ride', 'Active', 1, '2026-01-14 13:49:04', NULL, NULL, NULL, NULL),
(7, 2, 'Arcade Games', 'Active', 1, '2026-01-14 13:49:19', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `business_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `gst` varchar(50) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `create_audit_id` int(11) DEFAULT NULL,
  `create_audit_time` datetime DEFAULT current_timestamp(),
  `update_audit_id` int(11) DEFAULT NULL,
  `update_audit_time` datetime DEFAULT NULL,
  `delete_audit_id` int(11) DEFAULT NULL,
  `delete_audit_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `role`, `status`, `business_name`, `location`, `gst`, `last_login`, `create_audit_id`, `create_audit_time`, `update_audit_id`, `update_audit_time`, `delete_audit_id`, `delete_audit_time`) VALUES
(1, 'Super Admin 2', 'admin@gmail.com', '$2y$10$rQdGYM96mZuf.VzXD0EmIuhriRXDOUKolXps2x.M7INA/HKIOs67C', '987654321', 'admin', 'Active', 'FnF Arena', 'Hyderabad', '36ABCDE1234F1Z5', NULL, 1, '2025-12-09 15:31:17', 1, '2026-03-07 13:17:29', NULL, NULL),
(2, 'Sudhakar', 'sudhakarbv144@gmail.com', '$2y$10$rQdGYM96mZuf.VzXD0EmIuhriRXDOUKolXps2x.M7INA/HKIOs67C', NULL, 'admin', 'Active', NULL, NULL, NULL, '2025-12-10 14:47:29', 1, '2025-12-10 14:33:33', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activities_banner`
--
ALTER TABLE `activities_banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activities_media`
--
ALTER TABLE `activities_media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activity_details`
--
ALTER TABLE `activity_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activity_features`
--
ALTER TABLE `activity_features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activity_gallery`
--
ALTER TABLE `activity_gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activity_metrics`
--
ALTER TABLE `activity_metrics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activity_protocols`
--
ALTER TABLE `activity_protocols`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activity_reviews`
--
ALTER TABLE `activity_reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activity_types`
--
ALTER TABLE `activity_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activity_videos`
--
ALTER TABLE `activity_videos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `birthday_bookings`
--
ALTER TABLE `birthday_bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `corporate_bookings`
--
ALTER TABLE `corporate_bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `corporate_event_types`
--
ALTER TABLE `corporate_event_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `corporate_participant_ranges`
--
ALTER TABLE `corporate_participant_ranges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `corporate_time_slots`
--
ALTER TABLE `corporate_time_slots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `events_metrics`
--
ALTER TABLE `events_metrics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events_reviews`
--
ALTER TABLE `events_reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_bookings`
--
ALTER TABLE `event_bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_details`
--
ALTER TABLE `event_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_gallery`
--
ALTER TABLE `event_gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_media`
--
ALTER TABLE `event_media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_time_slots`
--
ALTER TABLE `event_time_slots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_types`
--
ALTER TABLE `event_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event_videos`
--
ALTER TABLE `event_videos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food_categories`
--
ALTER TABLE `food_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food_products`
--
ALTER TABLE `food_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_stats`
--
ALTER TABLE `home_stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_documents`
--
ALTER TABLE `menu_documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `our_vision_values`
--
ALTER TABLE `our_vision_values`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plan_bookings`
--
ALTER TABLE `plan_bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `activities_banner`
--
ALTER TABLE `activities_banner`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `activities_media`
--
ALTER TABLE `activities_media`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `activity_details`
--
ALTER TABLE `activity_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `activity_features`
--
ALTER TABLE `activity_features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `activity_gallery`
--
ALTER TABLE `activity_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `activity_metrics`
--
ALTER TABLE `activity_metrics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `activity_protocols`
--
ALTER TABLE `activity_protocols`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `activity_reviews`
--
ALTER TABLE `activity_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `activity_types`
--
ALTER TABLE `activity_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `activity_videos`
--
ALTER TABLE `activity_videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `birthday_bookings`
--
ALTER TABLE `birthday_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `corporate_bookings`
--
ALTER TABLE `corporate_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `corporate_event_types`
--
ALTER TABLE `corporate_event_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `corporate_participant_ranges`
--
ALTER TABLE `corporate_participant_ranges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `corporate_time_slots`
--
ALTER TABLE `corporate_time_slots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `events_metrics`
--
ALTER TABLE `events_metrics`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `events_reviews`
--
ALTER TABLE `events_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `event_bookings`
--
ALTER TABLE `event_bookings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `event_details`
--
ALTER TABLE `event_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `event_gallery`
--
ALTER TABLE `event_gallery`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `event_media`
--
ALTER TABLE `event_media`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `event_time_slots`
--
ALTER TABLE `event_time_slots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `event_types`
--
ALTER TABLE `event_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `event_videos`
--
ALTER TABLE `event_videos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `food_categories`
--
ALTER TABLE `food_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `food_products`
--
ALTER TABLE `food_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `home_stats`
--
ALTER TABLE `home_stats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `menu_documents`
--
ALTER TABLE `menu_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `our_vision_values`
--
ALTER TABLE `our_vision_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `plan_bookings`
--
ALTER TABLE `plan_bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
