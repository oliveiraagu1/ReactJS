DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `createdAt`, `updatedAt`) VALUES
(1, 'Cesar', 'cesar@celke.com.br', '$2a$08$v3miaQyqpe7Ej9.Vic.yWuFZZ8Ty0ssPRtBrQGwW9V5uB2R2DbJom', '2021-06-01 22:34:41', '2021-06-01 23:11:15'),
(2, 'Cesar2', 'cesar2@celke.com.br', '$2a$08$LbGaBpzmZ1H5iL5MAGtHhOPM.kVK6kmOrC5F3t/yI/BjIZzdZBTfi', '2021-06-01 22:41:44', '2021-06-01 22:41:44');
COMMIT;
