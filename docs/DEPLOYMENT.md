# Guide de Déploiement & Environnements — La Carafa des Blés

Ce document détaille les procédures pour configurer et exécuter le projet en environnement de développement local (XAMPP/MySQL) ainsi que les exigences pour un déploiement en production sécurisé.

---

## 1. Environnement de Développement Local (XAMPP / MySQL)

### Prérequis
- Node.js LTS (v18+)
- npm (v9+)
- XAMPP avec le service MySQL démarré sur le port par défaut `3306`

### Étapes de mise en route
1. **Démarrer MySQL** :
   Ouvrir le panneau XAMPP et démarrer le module MySQL, ou exécuter en ligne de commande :
   ```powershell
   C:\xampp\mysql\bin\mysqld.exe --defaults-file=C:\xampp\mysql\bin\my.ini --standalone
   ```

2. **Créer les bases de données** :
   ```sql
   CREATE DATABASE IF NOT EXISTS la_carafa_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE DATABASE IF NOT EXISTS la_carafa_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Installer les dépendances** :
   ```bash
   npm install
   ```

4. **Configurer l'environnement** :
   Copier le fichier `.env.example` vers `.env` à la racine :
   ```bash
   cp .env.example .env
   ```

5. **Exécuter les migrations et le peuplement initial** :
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

6. **Créer le compte administrateur initial** :
   ```bash
   npm run admin:create
   ```

7. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```
   - Site Web public : `http://localhost:5173`
   - API Backend : `http://localhost:5000`
   - Dashboard Admin : `http://localhost:5173/admin`

---

## 2. Déploiement en Production

> [!WARNING]
> XAMPP est strictement conçu pour le développement local. Ne jamais exposer une instance XAMPP ou le compte root MySQL directement sur Internet.

### Exigences pour la Production
- **Serveur d'hébergement** : VPS ou serveur dédié sous Linux (Debian 12 / Ubuntu 22.04 LTS).
- **Reverse Proxy** : Nginx ou Caddy avec terminaison SSL/TLS (certificat Let's Encrypt automatique).
- **Process Manager** : PM2 ou service systemd pour superviser le serveur Node.js.
- **Base de données** : Serveur MySQL 8.0+ ou MariaDB 10.6+ configuré avec un utilisateur dédié à moindres privilèges (aucun droit de `GRANT` ou de modification système).
- **Variables d'Environnement** : Secrets cryptographiques forts (`SESSION_SECRET` >= 64 caractères aléatoires), `NODE_ENV=production`, `COOKIE_SECURE=true`.
