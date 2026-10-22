# Journal des Modifications (CHANGELOG)

Toutes les modifications notables apportées à ce projet sont consignées dans ce fichier.
Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/) et ce projet adhère à [Semantic Versioning](https://semver.org/lang/fr/).

---

## [1.0.0] - 2026-10-22

### Ajouté
- **Architecture Complète Full-Stack** :
  - Monorepo avec scripts d'orchestration (`dev`, `build`, `test`, `db:migrate`, `db:seed`, `admin:create`).
  - Frontend React 18 avec Vite et React Router.
  - Backend Node.js / Express avec architecture modulaire en couches.
  - Persistance relationnelle MySQL/MariaDB avec moteur InnoDB et encodage `utf8mb4_unicode_ci`.
- **Identité Visuelle & Système de Design Éditorial Artisanal** :
  - Palette luxueuse : ivoire chaud `#F8F3E8`, bordeaux profond `#590B16`, or antique `#B78A3D`.
  - Typographie Cormorant Garamond & Plus Jakarta Sans.
  - Motifs vectoriels SVG : logo de la marque au brin de blé, sceau « Fait maison avec passion », et sac de farine gravé.
  - Intégration de la photographie authentique de la devanture et des artisans à Épinay-sur-Orge.
  - Génération et optimisation d'images WebP haute résolution pour chaque création.
- **Pages Publiques Implémentées** :
  - `/` (Accueil) : structure conforme pixel-par-pixel à la maquette de référence (hero, 3 cartes catégories, Notre histoire, bandeau contact).
  - `/produits` : catalogue complet avec recherche en temps réel et filtrage dynamique par catégorie.
  - `/produits/:slug` : fiche détaillée avec allergènes, disponibilité, prix et produits suggérés.
  - `/notre-histoire` : récit éditorial, engagements qualité et mise en avant des artisans.
  - `/contact` : coordonnées complètes, lien Google Maps, et formulaire interactif avec validation et persistance MySQL en temps réel.
  - `/mentions-legales`, `/politique-de-confidentialite` (conforme RGPD), `/gestion-des-cookies` (bannière interactive).
  - Page d'erreur 404 personnalisée et soignée.
- **Tableau de Bord Administrateur Sécurisé** :
  - `/admin/login` : authentification avec cookies HTTP-Only, hachage bcrypt (12 rounds) et limitation de débit.
  - `/admin` : vue d'ensemble avec statistiques réelles issues de MySQL et historique d'audit.
  - `/admin/produits` : gestion CRUD complète des produits (création, modification, disponibilité, publication, suppression avec confirmation).
  - `/admin/categories` : gestion des catégories avec protection contre la suppression de catégories liées à des produits.
  - `/admin/messages` : boîte de réception des messages avec changement de statut (lu/non lu) et suppression.
  - `/admin/contenu` : éditeur de contenu dynamique pour la page d'accueil, l'histoire et les coordonnées.
  - `/admin/parametres` : configuration commerciale et validation du numéro de téléphone.
  - `/admin/securite` : journal d'audit complet des actions administratives.
- **Base de Données & Migrations** :
  - 7 fichiers de migration SQL versionnés (`schema_migrations`, `admins`, `categories`, `products`, `site_settings`, `contact_messages`, `admin_audit_logs`).
  - Script d'exécution de migrations transactionnel et idempotent (`migrate.js`).
  - Script de peuplement initial (`seed.js`) et provisionnement CLI d'administrateur (`create-admin.js`).
- **Assurance Qualité & Tests Automatisés** :
  - Suite de tests d'intégration API Backend (16/16 tests réussis avec Vitest et Supertest).
  - Suite de tests de composants Frontend React (5/5 tests réussis avec React Testing Library).
  - Script de validation de bout en bout E2E (10/10 étapes validées avec succès contre `la_carafa_test`).
  - Pipeline GitHub Actions CI complet (`.github/workflows/ci.yml`).
