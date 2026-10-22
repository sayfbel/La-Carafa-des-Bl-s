# Architecture Technique & Modèle de Données — La Carafa des Blés

Ce document décrit l'architecture globale, les choix techniques, le flux de données, ainsi que la modélisation de la base de données relationnelle MySQL.

---

## 1. Vue d'Ensemble du Système

L'application est structurée selon une architecture découplée Client-Serveur :

```
[ Navigateur Web ]
       │
       │ HTTP / HTTPS (JSON REST API & Cookies Sécurisés)
       ▼
[ Serveur Node.js / Express ]
       │
       ├─► Middleware de Sécurité (Helmet, CORS, Limiteur de Débit, Sessions HTTP-Only)
       ├─► Contrôleurs & Services Métier
       ├─► Couche d'Accès aux Données (mysql2/promise avec requêtes paramétrées)
       │
       ▼
[ Base de Données MySQL / MariaDB (XAMPP local ou Serveur Dédié) ]
       ├─► la_carafa_db (Environnement d'exécution)
       └─► la_carafa_test (Environnement de test isolé)
```

---

## 2. Découpage Modulaire

### Frontend (`client/`)
- **Technologie** : React 18 / 19 avec Vite.
- **Routage** : React Router DOM avec gestion des routes publiques et des routes protégées `/admin/*`.
- **Style** : CSS modulaire et variables CSS avec tokens stricts (couleurs, typographie, espacements).
- **Icônes** : Lucide React.
- **Gestion des états** : React Hooks & contextes d'authentification (`AuthContext`).

### Backend (`server/`)
- **Technologie** : Node.js avec Express.
- **Gestion des sessions** : `express-session` avec stockage sécurisé ou jeton signé en cookie `HttpOnly`, `SameSite=Lax/Strict`, `Secure` (en production).
- **Validation** : Validation et assainissement stricts de toutes les entrées utilisateur.
- **Journalisation** : Logs structurés avec horodatage, sans fuite de secrets ni de données personnelles sensibles.

---

## 3. Schéma de la Base de Données Relationnelle (MySQL / MariaDB)

### 3.1. Table `schema_migrations`
- `version` (VARCHAR(50), PRIMARY KEY) : Identifiant de la migration (ex: `001_initial_schema`).
- `applied_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP).

### 3.2. Table `admins`
- `id` (INT AUTO_INCREMENT PRIMARY KEY).
- `email` (VARCHAR(191) NOT NULL UNIQUE).
- `password_hash` (VARCHAR(255) NOT NULL).
- `full_name` (VARCHAR(100) NOT NULL).
- `role` (ENUM('admin', 'editor') DEFAULT 'admin').
- `is_active` (BOOLEAN DEFAULT TRUE).
- `last_login_at` (TIMESTAMP NULL).
- `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP).
- `updated_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP).

### 3.3. Table `categories`
- `id` (INT AUTO_INCREMENT PRIMARY KEY).
- `name` (VARCHAR(100) NOT NULL).
- `slug` (VARCHAR(120) NOT NULL UNIQUE).
- `description` (TEXT NULL).
- `display_order` (INT DEFAULT 0).
- `is_active` (BOOLEAN DEFAULT TRUE).
- `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP).
- `updated_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP).

### 3.4. Table `products`
- `id` (INT AUTO_INCREMENT PRIMARY KEY).
- `category_id` (INT NOT NULL, FOREIGN KEY REFERENCES categories(id) ON DELETE RESTRICT).
- `name` (VARCHAR(150) NOT NULL).
- `slug` (VARCHAR(160) NOT NULL UNIQUE).
- `short_description` (VARCHAR(255) NULL).
- `description` (TEXT NULL).
- `price` (DECIMAL(6,2) NULL).
- `currency` (VARCHAR(3) DEFAULT 'EUR').
- `allergens` (VARCHAR(255) NULL).
- `image_url` (VARCHAR(255) NULL).
- `is_available` (BOOLEAN DEFAULT TRUE).
- `is_featured` (BOOLEAN DEFAULT FALSE).
- `is_published` (BOOLEAN DEFAULT TRUE).
- `meta_title` (VARCHAR(150) NULL).
- `meta_description` (VARCHAR(255) NULL).
- `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP).
- `updated_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP).

### 3.5. Table `site_settings`
- `setting_key` (VARCHAR(80) PRIMARY KEY).
- `setting_value` (LONGTEXT NOT NULL).
- `updated_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP).

### 3.6. Table `contact_messages`
- `id` (INT AUTO_INCREMENT PRIMARY KEY).
- `name` (VARCHAR(100) NOT NULL).
- `email` (VARCHAR(191) NOT NULL).
- `phone` (VARCHAR(30) NULL).
- `subject` (VARCHAR(150) NOT NULL).
- `message` (TEXT NOT NULL).
- `status` (ENUM('unread', 'read', 'archived') DEFAULT 'unread').
- `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP).

### 3.7. Table `admin_audit_logs`
- `id` (INT AUTO_INCREMENT PRIMARY KEY).
- `admin_id` (INT NULL, FOREIGN KEY REFERENCES admins(id) ON DELETE SET NULL).
- `action` (VARCHAR(100) NOT NULL).
- `entity_type` (VARCHAR(50) NOT NULL).
- `entity_id` (VARCHAR(50) NULL).
- `metadata` (JSON NULL).
- `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP).
