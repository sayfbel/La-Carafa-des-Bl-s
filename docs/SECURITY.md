# Politique de Sécurité & Modèle de Menace — La Carafa des Blés

Ce document répertorie les mesures de sécurité implémentées, la politique de gestion des secrets et les contrôles d'accès.

---

## 1. Principes de Défense en Profondeur

### 1.1. Authentification & Gestion des Sessions
- **Hachage des Mots de Passe** : Utilisation de `bcrypt` avec un coût de calcul renforcé (12 rounds) ou Argon2id.
- **Sessions Côté Serveur** : Identifiants de session aléatoires cryptographiquement sécurisés transmis via des cookies `HttpOnly`, `SameSite=Lax`, et `Secure` en HTTPS.
- **Aucun Jeton dans `localStorage`** : Les informations d'authentification ne sont jamais stockées dans le stockage local du navigateur afin d'immuniser l'administration contre le vol de session via script XSS.
- **Protection Brute-Force** : Limiteur de débit (`express-rate-limit`) sur la route de connexion `/api/admin/auth/login` (maximum 5 tentatives par tranche de 15 minutes par IP).
- **Messages d'Erreur Génériques** : Aucun indice sur l'existence ou non de l'adresse email lors d'une tentative de connexion erronée.

### 1.2. Protection des Données & Injections SQL
- **Requêtes Paramétrées** : L'intégralité des interactions avec la base de données MySQL utilise des requêtes préparées (`?` placeholders) via `mysql2/promise`. Aucune concaténation de chaînes SQL n'est autorisée.
- **Validation Stricte des Schémas** : Toutes les charges utiles entrantes (formulaires de contact, création de produits, mise à jour de contenu) sont validées et assainies avant tout traitement métier.

### 1.3. En-têtes HTTP de Sécurité
- Utilisation de `helmet` pour configurer :
  - `Content-Security-Policy` (CSP)
  - `X-Frame-Options: DENY` (protection contre le clickjacking)
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`

### 1.4. Gestion des Secrets & Hygiène Git
- Le fichier `.env` est exclu de manière absolue dans le fichier `.gitignore`.
- Seul le modèle `.env.example` contenant des valeurs fictives documentées est consigné dans le dépôt Git.
- Aucun mot de passe d'administration par défaut n'est commité en dur dans le code source ; le provisionnement se fait via commande dédiée sécurisée en CLI.

### 1.5. Journal d'Audit Administrateur (Audit Log)
- Toute opération sensible effectuée dans le panneau d'administration (création/modification/suppression de produit, modification des textes d'accueil, suppression de message) est immédiatement consignée dans la table `admin_audit_logs`.
