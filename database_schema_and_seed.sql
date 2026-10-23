-- ==============================================================================
-- La Carafa des Blés — Schéma & Données Initiales de Production
-- Moteur : MySQL 8.0+ / MariaDB 10.5+
-- Encodage : utf8mb4 / Collation : utf8mb4_unicode_ci
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `la_carafa_db`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `la_carafa_db`;

-- Désactivation temporaire des contraintes de clés étrangères pour import propre
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------------------------
-- 1. Table : schema_migrations
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `schema_migrations`;
CREATE TABLE `schema_migrations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `version` VARCHAR(100) NOT NULL UNIQUE,
    `name` VARCHAR(255) NOT NULL,
    `executed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. Table : admins
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(191) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(100) NOT NULL,
    `role` ENUM('admin', 'editor') NOT NULL DEFAULT 'admin',
    `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
    `last_login_at` TIMESTAMP NULL DEFAULT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_admins_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. Table : categories
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(120) NOT NULL UNIQUE,
    `description` TEXT NULL,
    `display_order` INT NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_categories_slug` (`slug`),
    INDEX `idx_categories_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. Table : products
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `category_id` INT NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `slug` VARCHAR(160) NOT NULL UNIQUE,
    `short_description` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `price` DECIMAL(6, 2) NULL,
    `currency` VARCHAR(3) NOT NULL DEFAULT 'EUR',
    `allergens` VARCHAR(255) NULL,
    `image_url` VARCHAR(255) NULL,
    `is_available` BOOLEAN NOT NULL DEFAULT TRUE,
    `is_featured` BOOLEAN NOT NULL DEFAULT FALSE,
    `is_published` BOOLEAN NOT NULL DEFAULT TRUE,
    `meta_title` VARCHAR(150) NULL,
    `meta_description` VARCHAR(255) NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT,
    INDEX `idx_products_category` (`category_id`),
    INDEX `idx_products_slug` (`slug`),
    INDEX `idx_products_published` (`is_published`, `is_available`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. Table : site_settings
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE `site_settings` (
    `setting_key` VARCHAR(80) NOT NULL PRIMARY KEY,
    `setting_value` LONGTEXT NOT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. Table : contact_messages
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE `contact_messages` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(30) NULL,
    `subject` VARCHAR(150) NOT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('unread', 'read', 'archived') NOT NULL DEFAULT 'unread',
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_contact_status` (`status`),
    INDEX `idx_contact_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. Table : admin_audit_logs
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `admin_audit_logs`;
CREATE TABLE `admin_audit_logs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `admin_id` INT NULL,
    `action` VARCHAR(100) NOT NULL,
    `entity_type` VARCHAR(50) NOT NULL,
    `entity_id` VARCHAR(50) NULL,
    `metadata` JSON NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`admin_id`) REFERENCES `admins`(`id`) ON DELETE SET NULL,
    INDEX `idx_audit_admin` (`admin_id`),
    INDEX `idx_audit_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Réactivation des contraintes de clés étrangères
SET FOREIGN_KEY_CHECKS = 1;


-- ==============================================================================
-- DONNÉES INITIALES (SEED DATA)
-- ==============================================================================

-- 1. Initialisation des migrations
INSERT INTO `schema_migrations` (`version`, `name`) VALUES
('001', 'create_schema_migrations'),
('002', 'create_admins_table'),
('003', 'create_categories_table'),
('004', 'create_products_table'),
('005', 'create_site_settings_table'),
('006', 'create_contact_messages_table'),
('007', 'create_admin_audit_logs_table');

-- 2. Compte Administrateur Initial
-- Email: admin@lacarafadesbles.fr
-- Mot de passe par défaut: ArtisanBakery2026!Secure
INSERT INTO `admins` (`id`, `email`, `password_hash`, `full_name`, `role`, `is_active`) VALUES
(1, 'admin@lacarafadesbles.fr', '$2a$12$YTUO6Hpb5KKDTJ2F0UiQe.A0z0TIoZRqmSJxMBSgB.rvRi3J004ym', 'Maître Boulanger', 'admin', 1);

-- 3. Catégories de Spécialités
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `display_order`, `is_active`) VALUES
(1, 'Pains de tradition', 'pains-de-tradition', 'Façonnés à la main, cuits sur place, avec des farines de qualité.', 1, 1),
(2, 'Viennoiseries', 'viennoiseries', 'Beurre de qualité, feuilletage pur beurre et dorure maison.', 2, 1),
(3, 'Pâtisseries maison', 'patisseries-maison', 'Des créations gourmandes élaborées chaque jour avec soin.', 3, 1);

-- 4. Catalogue des Produits
INSERT INTO `products` (
  `id`, `category_id`, `name`, `slug`, `short_description`, `description`,
  `price`, `currency`, `allergens`, `image_url`, `is_available`, `is_featured`, `is_published`,
  `meta_title`, `meta_description`
) VALUES
(
  1, 1, 'Baguette de Tradition Française', 'baguette-de-tradition-francaise',
  'Croûte dorée croustillante, mie alvéolée et arômes délicats de froment.',
  'Élaborée selon la pure tradition française sans additifs, issue d’une fermentation lente sur levain pour révéler une saveur authentique et une conservation remarquable.',
  1.30, 'EUR', 'Gluten (blé)', '/assets/images/products/baguette-tradition.webp', 1, 1, 1,
  'Baguette de Tradition — La Carafa des Blés',
  'Découvrez notre baguette de tradition artisanale cuite chaque jour à Épinay-sur-Orge.'
),
(
  2, 1, 'Pain de Campagne au Levain', 'pain-de-campagne-au-levain',
  'Pain rustique pétri à la farine de seigle et de blé, levain naturel.',
  'Un grand classique rustique à la croûte épaisse et à la mie fondante délicatement acidulée, idéal pour accompagner vos repas gastronomiques et fromages.',
  3.20, 'EUR', 'Gluten (blé, seigle)', '/assets/images/products/pain-campagne.webp', 1, 1, 1,
  'Pain de Campagne Artisanal — La Carafa des Blés',
  'Pain de campagne au levain naturel cuit sur sole de pierre.'
),
(
  3, 1, 'Pain Complet aux Graines', 'pain-complet-aux-graines',
  'Riche en fibres, parsemé de graines de lin, tournesol et sésame toastées.',
  'Un pain complet nutritif et croquant, confectionné avec des farines complètes sélectionnées et un mélange harmonieux de 5 graines torréfiées.',
  3.60, 'EUR', 'Gluten, Sésame', '/assets/images/products/pain-graines.webp', 1, 0, 1,
  'Pain Complet aux Graines — La Carafa des Blés',
  'Pain complet riche en fibres et graines saines.'
),
(
  4, 2, 'Croissant Pur Beurre AOP', 'croissant-pur-beurre-aop',
  'Feuilletage aérien et croustillant, élaboré au pur beurre de Charentes-Poitou.',
  'Chaque croissant est façonné à la main et doré au jaune d’œuf frais pour offrir un feuilletage d’une légèreté incomparable et des arômes beurrés gourmands.',
  1.40, 'EUR', 'Gluten, Lait, Œufs', '/assets/images/products/croissant.webp', 1, 1, 1,
  'Croissant Pur Beurre Artisanal — La Carafa des Blés',
  'Croissant au beurre AOP croustillant et fondant.'
),
(
  5, 2, 'Pain au Chocolat Feuilleté', 'pain-au-chocolat-feuillete',
  'Deux barres de chocolat noir intense nichées au cœur d’un feuilletage doré.',
  'Le compagnon parfait de vos matins : une pâte feuilletée levée croustillante renfermant deux bâtons de chocolat noir à 55% de cacao.',
  1.50, 'EUR', 'Gluten, Lait, Œufs, Soja', '/assets/images/products/pain-chocolat.webp', 1, 1, 1,
  'Pain au Chocolat Pur Beurre — La Carafa des Blés',
  'Pain au chocolat artisanal au feuilletage d’or.'
),
(
  6, 2, 'Brioche Tressée Pur Beurre', 'brioche-tressee-pur-beurre',
  'Moelleuse à souhait, parfumée à la fleur d’oranger et parsemée de sucre perlé.',
  'Une brioche généreuse tressée à la main, enrichie en œufs frais et beurre fin, idéale pour les goûters en famille.',
  4.80, 'EUR', 'Gluten, Lait, Œufs', '/assets/images/products/brioche.webp', 1, 0, 1,
  'Brioche Tressée Artisanale — La Carafa des Blés',
  'Brioche moelleuse au beurre fin et sucre perlé.'
),
(
  7, 3, 'Tartelette aux Framboises Fraîches', 'tartelette-aux-framboises-fraiches',
  'Pâte sablée croustillante, crème d’amande fondante et framboises fraîches.',
  'Fond de tarte croustillant garni d’une crème diplomate légère à la vanille de Madagascar et recouvert de framboises fraîches délicatement lustrées.',
  4.20, 'EUR', 'Gluten, Lait, Œufs, Fruits à coque', '/assets/images/products/tartelette-framboise.webp', 1, 1, 1,
  'Tartelette Framboises Fraîches — La Carafa des Blés',
  'Pâtisserie fine aux framboises fraîches et vanille.'
),
(
  8, 3, 'Éclair au Chocolat Grand Cru', 'eclair-au-chocolat-grand-cru',
  'Pâte à choux pur beurre garnie d’un crémeux au chocolat noir 70% et glaçage brillant.',
  'L’incontournable de la pâtisserie française revisité avec un chocolat pure plantation intense et peu sucré, pour les véritables amateurs de cacao.',
  3.80, 'EUR', 'Gluten, Lait, Œufs', '/assets/images/products/eclair-chocolat.webp', 1, 1, 1,
  'Éclair au Chocolat Grand Cru — La Carafa des Blés',
  'Éclair traditionnel au crémeux intense de chocolat noir.'
),
(
  9, 3, 'Paris-Brest Artisanal', 'paris-brest-artisanal',
  'Couronne de pâte à choux croustillante garnie d’une mousseline pralinée noisette.',
  'Pâte à choux parsemée d’amandes effilées, garnie d’une onctueuse crème mousseline au praliné maison pur noisettes du Piémont.',
  4.50, 'EUR', 'Gluten, Lait, Œufs, Fruits à coque', '/assets/images/products/paris-brest.webp', 1, 0, 1,
  'Paris-Brest Praliné Maison — La Carafa des Blés',
  'Pâtisserie signature au praliné noisette croustillant.'
);

-- 5. Paramètres & Textes du Site
INSERT INTO `site_settings` (`setting_key`, `setting_value`) VALUES
('homepage_hero_kicker', 'BOULANGERIE • PÂTISSERIE ARTISANALE'),
('homepage_hero_title', 'Le goût des bonnes choses.'),
('homepage_hero_subtitle', 'Des produits artisanaux, préparés chaque jour avec des ingrédients sélectionnés et beaucoup de passion.'),
('homepage_hero_cta', 'Découvrir nos créations'),
('story_kicker', 'NOTRE HISTOIRE'),
('story_title', 'Le savoir-faire, chaque jour.'),
('story_text', 'Artisans boulangers-pâtissiers à Épinay-sur-Orge, nous mettons tout notre cœur dans la préparation de pains authentiques et de pâtisseries maison. Notre exigence : des produits savoureux, un accueil chaleureux et le respect des traditions artisanales.'),
('story_signature', 'La Carafa des Blés'),
('business_name', 'La Carafa des Blés'),
('business_address', '15 Rue Pasteur, 91360 Épinay-sur-Orge, France'),
('business_phone', '07 53 79 29 19'),
('business_phone_verified', 'false'),
('business_email', 'contact@lacarafadesbles.fr'),
('google_maps_url', 'https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France'),
('opening_hours_note', 'Horaires en cours d’actualisation — contactez-nous par téléphone.');
