# Blog Communautaire Laravel + React

Un blog communautaire moderne construit avec Laravel, React, et Inertia.js. Cette application permet aux utilisateurs de créer, modifier, et partager des articles, avec un système de likes et une interface utilisateur réactive.

> 💡 Ce projet est inspiré du tutoriel de [LaMinuteDecode](https://www.youtube.com/@LaMinuteDecode) avec des modifications et améliorations personnelles.

## 🚀 Fonctionnalités

- 📝 Création et gestion d'articles
- 🖼️ Upload d'images pour les articles
- 👍 Système de likes
- 🌓 Thème clair/sombre
- 🔐 Authentification complète
- 🎨 Interface utilisateur moderne avec Tailwind CSS
- ⚡ Navigation fluide grâce à Inertia.js

## 🛠️ Technologies Utilisées

- **Backend**
  - Laravel 12.x
  - PHP 8.2+
  - SQLite (base de données)
  - Laravel Fortify (authentification)

- **Frontend**
  - React 18
  - TypeScript
  - Inertia.js
  - Tailwind CSS
  - Shadcn/ui

## 📋 Prérequis

- PHP 8.2 ou supérieur
- Composer
- Node.js 16+ et npm
- SQLite

## 🚀 Installation

1. **Cloner le dépôt**
   ```bash
   git clone [URL_DU_REPO]
   cd [NOM_DU_DOSSIER]
   ```

2. **Installation des dépendances PHP**
   ```bash
   composer install
   ```

3. **Installation des dépendances JavaScript**
   ```bash
   npm install
   ```

4. **Configuration de l'environnement**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configuration de la base de données**
   - La base de données SQLite est utilisée par défaut
   ```bash
   touch database/database.sqlite
   php artisan migrate
   ```

6. **Création du lien symbolique pour le stockage**
   ```bash
   php artisan storage:link
   ```

7. **Compilation des assets**
   ```bash
   npm run build
   ```

## 🏃‍♂️ Lancement en développement

1. **Démarrer le serveur Laravel**
   ```bash
   php artisan serve
   ```

2. **Démarrer le serveur de développement Vite**
   ```bash
   npm run dev
   ```

L'application sera accessible sur `http://localhost:8000`

## 🏗️ Structure du Projet

```
├── app/                     # Code source PHP
│   ├── Http/
│   │   ├── Controllers/    # Contrôleurs Laravel
│   │   └── Middleware/     # Middleware
│   └── Models/             # Modèles Eloquent
├── database/
│   ├── migrations/         # Migrations de base de données
│   └── seeders/           # Seeders de données
├── resources/
│   ├── js/                # Code source React/TypeScript
│   │   ├── components/    # Composants React
│   │   ├── layouts/       # Layouts de l'application
│   │   └── pages/        # Pages de l'application
│   └── views/            # Vues Laravel (minimal)
└── routes/               # Définition des routes
```

## 🔒 Authentification

Le système d'authentification utilise Laravel Fortify avec :
- Inscription
- Connexion
- Réinitialisation de mot de passe
- Vérification d'email
- Authentification à deux facteurs (optionnelle)

## 💾 Base de données

### Tables principales
- `users` - Informations des utilisateurs
- `posts` - Articles du blog
- `post_likes` - Système de likes (table pivot)

## 🚢 Déploiement

1. **Préparation du serveur**
   - PHP 8.2+
   - Composer
   - Node.js et npm
   - Serveur web (Apache/Nginx) : Mais avec WAMP/XAMP ce serait plus facile

2. **Configuration du serveur web**
   - Point d'entrée : public/index.php
   - Configuration des redirections vers index.php
   - Configuration du SSL

3. **Déploiement de l'application**
   ```bash
   # Sur le serveur
   git pull origin main
   composer install --optimize-autoloader --no-dev
   npm install
   npm run build
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

4. **Variables d'environnement de production**
   - Configurer `.env` pour la production
   - Désactiver le mode debug
   - Configurer les emails
   - Configurer la base de données

## 👥 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

[MIT](https://choosealicense.com/licenses/mit/)

## ✨ Fonctionnalités futures envisagées

- [ ] Système de commentaires
- [ ] Catégories d'articles
- [ ] Recherche avancée
- [ ] Partage sur les réseaux sociaux
- [ ] Éditeur de texte riche
- [ ] Notifications en temps réel
