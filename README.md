# 🛒 Modern E-Commerce Store

Une boutique en ligne moderne et élégante construite avec Next.js 14, TypeScript, Tailwind CSS et Shadcn/ui.

## ✨ Fonctionnalités

### 🏪 Boutique
- **Catalogue de produits** avec catégories organisées
- **Recherche avancée** avec suggestions en temps réel
- **Filtrage par catégories** et prix
- **Pagination intelligente**
- **Produits populaires** mis en avant

### 🛍️ Panier & Commandes
- **Panier dynamique** avec mise à jour en temps réel
- **Gestion des quantités** interactive
- **Calcul automatique** des totaux
- **Paiement sécurisé** avec Stripe
- **Suivi des commandes**

### 👤 Utilisateur
- **Authentification** NextAuth.js
- **Profils utilisateurs** personnalisés
- **Historique des commandes**
- **Liste de souhaits** persistante
- **Avis et commentaires**

### 🎨 Interface
- **Design moderne** avec Shadcn/ui
- **Responsive design** mobile-first
- **Animations fluides** et transitions
- **Thème sombre/clair**
- **Accessibilité** WCAG 2.1

### 🔧 Administration
- **Panneau d'administration** complet
- **Gestion des produits** CRUD
- **Gestion des commandes**
- **Statistiques en temps réel**
- **Gestion des utilisateurs**

## 🚀 Technologies

- **Frontend:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Shadcn/ui
- **Base de données:** PostgreSQL avec Prisma
- **Authentification:** NextAuth.js
- **Paiement:** Stripe
- **Déploiement:** Vercel
- **Langage:** TypeScript

## 📦 Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/modern-ecommerce.git
   cd modern-ecommerce
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de la base de données**
   ```bash
   # Copier le fichier d'environnement
   cp .env.example .env.local

   # Configurer votre base de données PostgreSQL
   DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce"

   # Configurer NextAuth.js
   NEXTAUTH_SECRET="votre-secret-très-long"
   NEXTAUTH_URL="http://localhost:3000"

   # Configurer Stripe
   STRIPE_PUBLIC_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   ```

4. **Migration de la base de données**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Lancer l'application**
   ```bash
   npm run dev
   ```

   L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 🏗️ Structure du projet

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Routes d'authentification
│   ├── (dashboard)/       # Dashboard utilisateur
│   ├── admin/             # Panneau d'administration
│   ├── api/               # API Routes
│   ├── checkout/          # Processus de paiement
│   └── products/          # Pages produits
├── components/            # Composants réutilisables
│   ├── ui/               # Composants Shadcn/ui
│   ├── forms/            # Formulaires
│   ├── layout/           # Layout components
│   └── product/          # Composants produit
├── lib/                  # Utilitaires et configurations
│   ├── auth.ts           # Configuration NextAuth
│   ├── db.ts             # Configuration base de données
│   ├── stripe.ts         # Configuration Stripe
│   └── utils.ts          # Fonctions utilitaires
├── hooks/                # Custom hooks React
├── store/                # Zustand stores
└── types/                # Types TypeScript
```

## 🗄️ Base de données

Le projet utilise Prisma avec PostgreSQL. Le schéma inclut :

- **Users** - Utilisateurs et authentification
- **Products** - Catalogue de produits
- **Categories** - Catégories de produits
- **Orders** - Commandes et transactions
- **Reviews** - Avis et commentaires
- **CartItems** - Articles du panier

## 🎨 Scripts disponibles

```bash
# Développement
npm run dev          # Lancer le serveur de développement
npm run build        # Build de production
npm run start        # Lancer en production
npm run lint         # Vérification ESLint

# Base de données
npm run db:migrate   # Migration Prisma
npm run db:studio    # Interface Prisma Studio
npm run db:seed      # Seeding de la base de données

# Types
npm run type-check   # Vérification TypeScript
```

## 🔧 Configuration

### Variables d'environnement

Créer un fichier `.env.local` avec :

```env
# Base de données
DATABASE_URL="postgresql://..."

# NextAuth.js
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (optionnel)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="..."
EMAIL_SERVER_PASSWORD="..."
```

## 🚀 Déploiement

### Vercel (Recommandé)

1. **Connecter votre repository GitHub à Vercel**
2. **Ajouter les variables d'environnement** dans les paramètres Vercel
3. **Déployer automatiquement** à chaque push

### Autres plateformes

Le projet peut être déployé sur :
- **Netlify**
- **Railway**
- **Render**
- **Heroku**

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Contacter l'équipe de développement

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) - Framework React
- [Shadcn/ui](https://ui.shadcn.com/) - Composants UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Prisma](https://prisma.io/) - ORM de base de données
- [Stripe](https://stripe.com/) - Solution de paiement
- [NextAuth.js](https://next-auth.js.org/) - Authentification

---

⭐ **N'oubliez pas de mettre une étoile si ce projet vous plaît !**