# Food Truck Marketplace - Constructeur de Food Trucks au Maroc

Une plateforme moderne et performante pour la construction et la vente de food trucks personnalisés au Maroc.

## 🚀 Fonctionnalités

### Public Marketplace
- **Page d'accueil** avec hero section et modèles phares
- **Marketplace** avec grille de food trucks et filtres
- **Pages de détail** avec galerie d'images et spécifications
- **Formulaire de devis** intégré pour chaque modèle
- **Page À propos** avec histoire et équipe
- **Page Contact** avec formulaire et carte Google Maps
- **Mode sombre** avec toggle
- **Design responsive** mobile-first

### Admin Panel
- **Authentification sécurisée** avec sessions
- **Tableau de bord** avec statistiques en temps réel
- **Gestion des food trucks** (CRUD complet)
- **Upload d'images** avec optimisation automatique
- **Gestion des devis** avec statuts (en attente, en cours, terminé)
- **Gestion des messages** de contact
- **Interface moderne** et intuitive

## 🛠️ Technologies

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Base de données**: PostgreSQL
- **Authentification**: Sessions sécurisées
- **Upload d'images**: Système local avec API optimisée
- **TypeScript**: Typage complet
- **Icons**: Lucide React

## 📦 Installation

### Prérequis
- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

### Configuration

1. **Cloner le projet**
```bash
git clone <repository-url>
cd food-truck-marketplace
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de la base de données**
```bash
# Créer la base de données PostgreSQL
createdb foodtruck_marketplace

# Copier le fichier d'environnement
cp env.example .env.local
```

4. **Configurer les variables d'environnement**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=foodtruck_marketplace
DB_USER=postgres
DB_PASSWORD=your_password
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

5. **Initialiser la base de données**
```bash
npm run dev
# La base de données sera automatiquement initialisée au premier démarrage
```

6. **Démarrer le serveur de développement**
```bash
npm run dev
```

## 🔐 Accès Admin

**Compte par défaut:**
- Email: `admin@foodtruck.ma`
- Mot de passe: `admin123`

## 🚀 Déploiement VPS

### Configuration Ubuntu + Nginx + PM2

1. **Installation des dépendances système**
```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Installer Nginx
sudo apt install nginx -y

# Installer PM2 globalement
sudo npm install -g pm2
```

2. **Configuration PostgreSQL**
```bash
# Se connecter à PostgreSQL
sudo -u postgres psql

# Créer la base de données et l'utilisateur
CREATE DATABASE foodtruck_marketplace;
CREATE USER foodtruck_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE foodtruck_marketplace TO foodtruck_user;
\q
```

3. **Déploiement de l'application**
```bash
# Cloner le projet
git clone <repository-url>
cd food-truck-marketplace

# Installer les dépendances
npm install

# Build de production
npm run build

# Configurer PM2
pm2 start npm --name "food-truck-app" -- start
pm2 save
pm2 startup
```

4. **Configuration Nginx**
```nginx
# /etc/nginx/sites-available/food-truck
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Optimisation des images
    location /uploads/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

5. **Activer le site**
```bash
sudo ln -s /etc/nginx/sites-available/food-truck /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 📁 Structure du Projet

```
food-truck-marketplace/
├── app/                    # App Router (Next.js 14)
│   ├── admin/             # Pages admin
│   ├── api/               # API routes
│   ├── marketplace/       # Pages marketplace
│   ├── about/             # Page à propos
│   ├── contact/           # Page contact
│   └── globals.css        # Styles globaux
├── components/            # Composants réutilisables
│   ├── AdminLayout.tsx    # Layout admin
│   ├── Navbar.tsx         # Navigation
│   ├── Footer.tsx         # Pied de page
│   ├── QuoteModal.tsx     # Modal de devis
│   └── TruckModal.tsx     # Modal food truck
├── lib/                   # Utilitaires
│   └── database.ts        # Configuration DB
├── types/                 # Types TypeScript
└── public/               # Fichiers statiques
    └── uploads/          # Images uploadées
```

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `tailwind.config.js`:
- Navy: `#1E3A8A`
- Sky: `#0EA5E9`
- Emerald: `#059669`
- Light: `#F1F5F9`

### Typographie
- Headings: Montserrat
- Body: Inter

## 📊 Performance

- **Lighthouse Score**: 90+ sur Performance, Accessibilité, SEO
- **Images optimisées** avec Next.js Image
- **Lazy loading** des composants
- **Cache** des images statiques
- **Bundle optimisé** avec tree-shaking

## 🔧 Maintenance

### Sauvegarde de la base de données
```bash
pg_dump foodtruck_marketplace > backup_$(date +%Y%m%d).sql
```

### Logs PM2
```bash
pm2 logs food-truck-app
pm2 monit
```

### Mise à jour
```bash
git pull origin main
npm install
npm run build
pm2 restart food-truck-app
```

## 📞 Support

Pour toute question ou support technique, contactez l'équipe de développement.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
