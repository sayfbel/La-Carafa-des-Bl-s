# Stratégie & Procédures de Tests Automatisés — La Carafa des Blés

Ce document consigne la méthodologie d'assurance qualité (QA), les suites de tests automatisés mises en œuvre, et les commandes de validation.

---

## 1. Niveaux de Tests

Le projet intègre trois niveaux de couverture de tests :

1. **Tests Unitaires & Composants (Frontend & Backend)** :
   - Validation des utilitaires, des formateurs de prix et des fonctions de sécurité.
   - Validation du rendu des composants UI (cartes produits, bannières, alertes).
2. **Tests d'Intégration d'API (Backend + MySQL)** :
   - Exécution contre une base de données de test dédiée `la_carafa_test`.
   - Vérification de l'idempotence des migrations et des semences de données.
   - Test des routes publiques : listing des produits, filtrage par catégorie, persistance des messages de contact.
   - Test de sécurité des routes d'administration : rejet des requêtes non authentifiées (401), invalidation des sessions après déconnexion.
   - Résistance aux attaques par injection SQL (`' OR 1=1 --`) et injection XSS.
3. **Tests de Bout en Bout (E2E Workflow)** :
   - Scénario complet : Navigation visiteur -> Consultation d'un produit -> Soumission d'un formulaire de contact -> Vérification en base -> Connexion administrateur -> Modification de produit -> Persistance et mise à jour publique.

---

## 2. Commandes de Test

```bash
# Exécution de l'ensemble des suites de tests (Client + Serveur)
npm test

# Exécution des tests backend uniquement
npm --prefix server test

# Exécution des tests frontend uniquement
npm --prefix client test

# Exécution de la vérification de bout en bout
npm run test:e2e
```

---

## 3. Règle Fondamentale d'Intégrité des Tests

- Aucun test d'intégration ou E2E ne doit être masqué, faussé ou remplacé par des mocks silencieux.
- La base de données de test `la_carafa_test` est isolée et réinitialisée avant chaque exécution de la suite de test afin de garantir des résultats déterministes sans risque pour la base de données principale.
