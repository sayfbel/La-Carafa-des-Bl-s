# La Carafa des Blés 🌾
> Site Web Artisanal Full-Stack React, Panneau d'Administration Sécurisé, Persistance MySQL (XAMPP/Production) & Assurance Qualité Automatisée.

[![CI Status](https://img.shields.io/badge/CI-Automated%20Tests-success.svg)](https://github.com/sayfbel/La-Carafa-des-Bl-s)
[![Node](https://img.shields.io/badge/Node.js-v18%2B%20%7C%20v20%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18%20%2B%20Vite-blue.svg)](https://vitejs.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-InnoDB%20utf8mb4-orange.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-Proprietary-darkred.svg)](#)

---

## 🏛️ Identité de l'Établissement

- **Enseigne** : La Carafa des Blés
- **Activité** : Boulangerie & Pâtisserie artisanale de tradition française
- **Adresse** : 15 Rue Pasteur, 91360 Épinay-sur-Orge, France
- **Contact téléphonique** : `07 53 79 29 19` *(Mentionné comme indicatif/non vérifié jusqu'à validation finale par le gérant)*
- **Localisation** : [Ouvrir dans Google Maps](https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France)

---

## ✨ Points Clés du Projet

1. **Design Éditorial Premium** :
   - Conforme à la maquette de référence artisanale (ivoire chaud `#F8F3E8`, bordeaux profond `#590B16`, or antique `#B78A3D`).
   - Typographie de haute facture (Cormorant Garamond & Inter).
   - Intégration de la photographie authentique de la devanture et des artisans à Épinay-sur-Orge.
2. **Architecture Découplée Robuste** :
   - Frontend en **React avec Vite** et **React Router**.
   - Backend en **Node.js / Express** avec architecture en couches (routes, contrôleurs, services, dépôts).
3. **Persistance Réelle MySQL** :
   - Compatible avec **XAMPP MySQL / MariaDB** en local et serveurs dédiés en production.
   - Système de migrations versionnées avec table `schema_migrations`.
   - Semences reproductibles et idempotentes (`npm run db:seed`).
4. **Tableau de Bord Administrateur Protégé** :
   - Authentification par cookies `HttpOnly` sécurisés côté serveur (zéro stockage de tokens dans `localStorage`).
   - Gestion complète du catalogue : produits, catégories, disponibilités et prix.
   - Éditeur de contenu dynamique pour les textes d'accueil et les coordonnées.
   - Boîte de réception des messages de contact avec suivi des statuts.
   - Journal d'audit d'administration pour la traçabilité des opérations sensibles.
5. **Assurance Qualité & Sécurité** :
   - En-têtes HTTP sécurisés (`helmet`), politique CORS stricte et limitation de débit (`express-rate-limit`).
   - Requêtes SQL 100% paramétrées (immunité contre l'injection SQL).
   - Suite de tests automatisés (Unitaires, Intégration API, et scénarios E2E).

---

## 📁 Structure du Projet

```text
La-Carafa-des-Bl-s/
├── client/                     # Application Frontend React + Vite
│   ├── src/
│   │   ├── app/                # Configuration globale, routeur & providers
│   │   ├── components/         # Composants UI partagés (Header, Footer, Cartes, Modales)
│   │   ├── layouts/            # Layouts Public & Administration
│   │   ├── pages/              # Pages publiques (Accueil, Produits, Histoire, Contact, Mentions)
│   │   ├── pages/admin/        # Pages du tableau de bord d'administration
│   │   ├── services/           # Clients API REST
│   │   └── styles/             # Tokens CSS, variables de design & typographie
│   └── public/                 # Favicons, illustrations vectorielles & assets
├── server/                     # Serveur Backend Node.js / Express
│   ├── src/
│   │   ├── config/             # Validation de l'environnement & configuration
│   │   ├── database/           # Pool MySQL, exécuteur de migrations & seeds
│   │   ├── controllers/        # Contrôleurs HTTP
│   │   ├── services/           # Logique métier
│   │   ├── repositories/       # Couche d'accès aux données (SQL paramétré)
│   │   ├── middleware/         # Auth, CSRF, limitation de débit, gestion d'erreurs
│   │   └── utils/              # Fonctions utilitaires & journalisation
│   ├── migrations/             # Fichiers de migration SQL ordonnés
│   └── tests/                  # Suites de tests automatisés d'API & intégration
├── docs/                       # Documentation technique détaillée
│   ├── PROJECT_STATUS.md       # État d'avancement des jalons et tâches
│   ├── ARCHITECTURE.md         # Architecture logicielle et schéma de base de données
│   ├── TESTING.md              # Stratégie de tests et commandes de validation
│   ├── DEPLOYMENT.md           # Instructions de déploiement XAMPP & Production
│   └── SECURITY.md             # Modèle de menace et politiques de sécurité
├── TODO.md                     # Liste permanente de tâches et critères d'acceptation
├── CHANGELOG.md                # Historique exhaustif des versions et modifications
└── package.json                # Scripts d'orchestration racine
```

---

## 🚀 Démarrage Rapide en Local (avec XAMPP)

### 1. Démarrer MySQL dans XAMPP
Ouvrez le panneau de contrôle XAMPP et démarrez le module **MySQL** (port par défaut `3306`).

### 2. Cloner et Installer les Dépendances
```bash
git clone https://github.com/sayfbel/La-Carafa-des-Bl-s.git
cd "La-Carafa-des-Bl-s"
npm install
```

### 3. Configurer l'Environnement
Copiez le modèle d'environnement :
```bash
cp .env.example .env
```
*(Ajustez si nécessaire les identifiants de base de données dans `.env`)*

### 4. Exécuter les Migrations et Semences
```bash
# Appliquer les migrations de structure de base de données
npm run db:migrate

# Insérer les catégories et produits artisanaux initiaux
npm run db:seed
```

### 5. Créer le Compte Administrateur Initial
```bash
npm run admin:create
```

### 6. Lancer l'Application
```bash
npm run dev
```
- **Site Web Public** : [http://localhost:5173](http://localhost:5173)
- **Espace Administrateur** : [http://localhost:5173/admin](http://localhost:5173/admin)
- **API Backend** : [http://localhost:5000](http://localhost:5000)

---

## 🧪 Exécution des Tests

```bash
# Lancer l'ensemble des tests automatisés
npm test
```

Consultez [docs/TESTING.md](docs/TESTING.md) pour les détails sur la suite de tests et l'environnement de test isolé.

---

## 📚 Documentation Additionnelle

- [Architecture & Modèle Relationnel](docs/ARCHITECTURE.md)
- [Politique de Sécurité & Modèle de Menace](docs/SECURITY.md)
- [Guide de Déploiement](docs/DEPLOYMENT.md)
- [Suivi d'Avancement du Projet](docs/PROJECT_STATUS.md)
- [Journal des Modifications](CHANGELOG.md)
- [Checklist Complète des Tâches](TODO.md)
