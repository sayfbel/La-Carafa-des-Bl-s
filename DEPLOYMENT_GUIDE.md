# 🚀 Guide de Déploiement en Production — La Carafa des Blés

Ce document contient l'intégralité des instructions techniques, de l'architecture et des commandes nécessaires pour mettre en ligne le site web et son système d'administration.

---

## 🛠️ 1. Architecture & Stack Technique

### Frontend (Client SPA)
- **Framework** : React 18 + Vite (SPA ultra-rapide)
- **Routage** : React Router DOM v6
- **Styling** : Design System Vanilla CSS (Variables de tokens fluides, Zéro dépendance lourde, 100% Responsive Mobile-First)
- **Icônes** : Lucide React
- **Build Output** : `client/dist/` (fichiers statiques HTML/CSS/JS/WebP prêts à être servis par Nginx ou hébergeur statique)

### Backend (Serveur API REST)
- **Runtime** : Node.js (v18+ ou v20+ LTS recommandé)
- **Framework** : Express 4 (ES Modules `import/export`)
- **Base de Données** : MySQL 8.0+ ou MariaDB 10.5+
- **Driver SQL** : `mysql2/promise` avec pool de connexions optimisé
- **Sécurité** :
  - `bcryptjs` (Hachage de mot de passe à coût 12)
  - `jsonwebtoken` (JWT dans cookie sécurisé `HttpOnly` + `SameSite=Lax`)
  - `helmet` (En-têtes HTTP de sécurité)
  - `express-rate-limit` (Protection anti brute-force sur `/login` et `/contact`)
  - `multer` (Upload d'images avec validation stricte de type MIME et d'extension)

---

## 🗄️ 2. Base de Données (Fichier SQL Prêt à l'Emploi)

Un fichier SQL tout-en-un contenant les tables, les index et les données initiales (produits, catégories, textes, compte admin) a été généré :

📁 **Chemin du fichier** : [`database_schema_and_seed.sql`](./database_schema_and_seed.sql)

### Option A — Import via phpMyAdmin / cPanel
1. Connectez-vous à phpMyAdmin.
2. Créez une nouvelle base de données nommée `la_carafa_db` (Interclassement : `utf8mb4_unicode_ci`).
3. Cliquez sur l'onglet **Importer**, sélectionnez le fichier [`database_schema_and_seed.sql`](./database_schema_and_seed.sql), puis cliquez sur **Exécuter**.

### Option B — Import en ligne de commande (VPS / Linux)
```bash
mysql -u root -p < database_schema_and_seed.sql
```

### Option C — Via les scripts Node.js du projet
Si la base est créée vide :
```bash
cd server
npm run migrate    # Exécute les migrations SQL ordonnées
npm run seed       # Injecte les données initiales
```

---

## 🔑 3. Identifiants Administrateur par Défaut

- **URL de connexion** : `https://votre-domaine.fr/admin/login`
- **Email** : `admin@lacarafadesbles.fr`
- **Mot de passe** : `ArtisanBakery2026!Secure`

> ⚠️ **Important** : Dès la première connexion en production, modifiez le mot de passe dans l'onglet **Sécurité** de l'espace administration ou via le script :
```bash
cd server
node scripts/create-admin.js --email=admin@votre-domaine.fr --password=NouveauMotDePasseFort2026!
```

---

## ⚙️ 4. Configuration des Variables d'Environnement (`.env`)

Créez un fichier `.env` à la racine du projet (ou copiez `.env.example`) :

```ini
# Environnement
NODE_ENV=production
PORT=5000

# URL publique de votre frontend (autorisée pour les cookies et le CORS)
CLIENT_ORIGIN=https://www.lacarafadesbles.fr

# Base de Données MySQL
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=la_carafa_db
DB_USER=votre_utilisateur_mysql
DB_PASSWORD=votre_mot_de_passe_securise

# Clé secrète de session JWT (Générer avec : openssl rand -base64 48)
SESSION_SECRET=votre-cle-secrete-aleatoire-tres-longue-2026
COOKIE_SECURE=true

# Téléversement de photos
UPLOAD_DIRECTORY=./uploads
MAX_UPLOAD_SIZE_MB=5
```

---

## 📦 5. Compilation & Lancement

### Étape 1 : Installer les dépendances
```bash
npm run install:all
```

### Étape 2 : Compiler le Frontend pour la Production
```bash
cd client
npm run build
```
Le dossier optimisé est généré dans `client/dist/`.

### Étape 3 : Lancer le Serveur Backend avec PM2 (Recommandé)
Sur un serveur VPS (Ubuntu/Debian) :
```bash
# Installer PM2 si ce n'est pas fait
npm install -g pm2

# Lancer le serveur backend
cd server
pm2 start src/index.js --name "la-carafa-api"

# Sauvegarder pour redémarrage automatique après reboot serveur
pm2 save
pm2 startup
```

---

## 🌐 6. Configuration Nginx & SSL (Exemple Production)

Voici le fichier de configuration Nginx `/etc/nginx/sites-available/lacarafadesbles.fr` :

```nginx
server {
    server_name lacarafadesbles.fr www.lacarafadesbles.fr;

    # 1. Frontend React (Single Page Application)
    root /var/www/la-carafa/client/dist;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml image/svg+xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 2. Uploads et médias servis directement
    location /uploads/ {
        alias /var/www/la-carafa/server/uploads/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # 3. Proxy API vers Express (Port 5000)
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Certificat SSL géré automatiquement par Certbot
}
```

Pour activer le certificat HTTPS gratuit Let's Encrypt :
```bash
sudo certbot --nginx -d lacarafadesbles.fr -d www.lacarafadesbles.fr
```

---

## 🧪 7. Validation & Tests

Pour s'assurer que tout fonctionne sans aucun accroc :
```bash
# 1. Vérifier les tests backend (API, Sécurité, SQLi)
cd server
npm test

# 2. Vérifier le build frontend
cd ../client
npm run build
```
Résultat attendu : **16/16 tests passés**, build terminé en ~5 secondes.
