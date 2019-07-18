-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Mar 04 Juin 2019 à 18:48
-- Version du serveur :  5.7.26-0ubuntu0.18.04.1
-- Version de PHP :  7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `phpmyadmin`
--

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `ID` int(5) NOT NULL,
  `Identifiant` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `Nom` varchar(20) DEFAULT NULL,
  `Prenom` varchar(20) DEFAULT NULL,
  `Poste` varchar(20) DEFAULT NULL,
  `Societe` varchar(50) DEFAULT NULL,
  `Slogan` varchar(100) DEFAULT NULL,
  `Siret` varchar(50) DEFAULT NULL,
  `Telephone` varchar(20) DEFAULT NULL,
  `Photo` varchar(50000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `Users`
--

INSERT INTO `Users` (`ID`, `Identifiant`, `Email`, `Password`, `Nom`, `Prenom`, `Poste`, `Societe`, `Slogan`, `Siret`, `Telephone`, `Photo`) VALUES
(1, 'enigmhatik', 'jeanvernus@wild.com', '$2b$10$2nyjFawdaDRCwtUIhsi8oO0r9wcA415AZENxng06aO9byeOucmhV6', 'VERNUS', 'Jean', 'DevOps', 'NativeEditionWeb', 'Dev avec plaisir et rapidité', '1234567890', '0635151220', '1559666744645-prepaEntretiensCirruseo.pdf'),
(3, 'mado', 'madeline@live.fr', '$2b$10$kCn7CRg3GgdJPi8h4hpfvusBhCURyw/qboUgyoFtLY2pVgXNQ.n4u', 'Verheye', 'madeline', 'maman', 'alamaison', 'vivelesgosses', 'é\"\'(-è', '0619743271', NULL);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
