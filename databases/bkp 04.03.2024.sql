-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para vmr_coins
CREATE DATABASE IF NOT EXISTS `vmr_coins` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `vmr_coins`;

-- Copiando estrutura para tabela vmr_coins.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `name` varchar(30) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela vmr_coins.permissions: ~6 rows (aproximadamente)
INSERT INTO `permissions` (`name`, `user_id`) VALUES
	('gerente', 9),
	('vendedor', 9),
	('visitante', 9),
	('visitante', 5),
	('admin', 9),
	('dashboardv2', 9);

-- Copiando estrutura para tabela vmr_coins.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `token` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `last_login` varchar(255) NOT NULL,
  `remember` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela vmr_coins.sessions: ~0 rows (aproximadamente)
INSERT INTO `sessions` (`token`, `user_id`, `last_login`, `remember`) VALUES
	(15, 9, '1709596854340', '0');

-- Copiando estrutura para tabela vmr_coins.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Copiando dados para a tabela vmr_coins.users: ~0 rows (aproximadamente)
INSERT INTO `users` (`user_id`, `name`, `email`, `password`) VALUES
	(9, 'Kalisom Cruz', 'kalisom.cruz@vumer.com.br', '$2b$10$WBUTTRKz6FappkvP5UMYTea4aa07T11xnAMg3147.lxkgwAl8rmFG');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
