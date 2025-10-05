# 🚀 VPS Deployment Guide - Food Truck Marketplace

This guide will help you deploy the Food Truck Marketplace on a VPS using Docker and Nginx.

## 📋 Prerequisites

- A VPS with Ubuntu 20.04+ (or similar Linux distribution)
- Root or sudo access
- A domain name pointing to your VPS IP
- Basic knowledge of Linux commands

## 🛠️ Deployment Steps

### 1. Prepare Your VPS

```bash
# Connect to your VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y

# Install essential packages
apt install -y curl wget git unzip
```

### 2. Upload Your Project

**Option A: Using Git (Recommended)**
```bash
# Clone your repository
git clone https://github.com/yourusername/food-truck-marketplace.git
cd food-truck-marketplace
```

**Option B: Upload via SCP**
```bash
# From your local machine
scp -r ./food-truck-marketplace root@your-vps-ip:/var/www/
```

### 3. Run the Deployment Script

```bash
# Make the script executable
chmod +x deploy.sh

# Run the deployment
./deploy.sh
```

### 4. Manual Configuration (if needed)

If the script doesn't work, follow these manual steps:

#### Install Docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker $USER
```

#### Install Docker Compose
```bash
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

#### Install Nginx
```bash
apt install nginx -y
```

#### Build and Start the Application
```bash
docker-compose build
docker-compose up -d
```

#### Configure Nginx
```bash
# Copy the nginx configuration
cp nginx.conf /etc/nginx/sites-available/food-truck-marketplace

# Edit the domain name
nano /etc/nginx/sites-available/food-truck-marketplace
# Replace "your-domain.com" with your actual domain

# Enable the site
ln -s /etc/nginx/sites-available/food-truck-marketplace /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Test and restart nginx
nginx -t
systemctl restart nginx
```

### 5. Setup SSL (Optional but Recommended)

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
crontab -e
# Add this line:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔧 Configuration

### Environment Variables

Edit the `env.production` file:
```bash
nano env.production
```

**Important:** Change these values:
- `ADMIN_EMAIL`: Your admin email
- `ADMIN_PASSWORD`: Strong password for admin
- `NEXTAUTH_SECRET`: Random secret key
- `NEXTAUTH_URL`: Your domain URL

### Domain Configuration

1. Update `nginx.conf` with your domain name
2. Update `env.production` with your domain URL
3. Restart services:
```bash
docker-compose restart
systemctl restart nginx
```

## 📊 Monitoring and Maintenance

### Check Application Status
```bash
# Check if containers are running
docker-compose ps

# View logs
docker-compose logs -f

# Check nginx status
systemctl status nginx
```

### Backup Data
```bash
# Backup JSON data
cp -r data/ backup-$(date +%Y%m%d)/

# Backup images
cp -r public/images/ backup-$(date +%Y%m%d)/images/
```

### Update Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🚨 Troubleshooting

### Application Not Starting
```bash
# Check logs
docker-compose logs

# Check if port 3000 is available
netstat -tlnp | grep :3000
```

### Nginx Issues
```bash
# Test nginx configuration
nginx -t

# Check nginx logs
tail -f /var/log/nginx/error.log
```

### Permission Issues
```bash
# Fix file permissions
chown -R www-data:www-data /var/www/food-truck-marketplace
chmod -R 755 /var/www/food-truck-marketplace
```

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Use strong NEXTAUTH_SECRET
- [ ] Setup SSL certificate
- [ ] Configure firewall (UFW)
- [ ] Regular backups
- [ ] Keep system updated

### Setup Firewall
```bash
# Install UFW
apt install ufw -y

# Configure firewall
ufw allow ssh
ufw allow 'Nginx Full'
ufw enable
```

## 📈 Performance Optimization

### Enable Gzip Compression
Already configured in nginx.conf

### Setup Monitoring
```bash
# Install htop for monitoring
apt install htop -y

# Monitor resources
htop
```

## 🆘 Support

If you encounter issues:

1. Check the logs: `docker-compose logs -f`
2. Verify nginx configuration: `nginx -t`
3. Check if ports are open: `netstat -tlnp`
4. Ensure domain DNS is pointing to your VPS

## 📝 Default Access

After deployment, you can access:
- **Website**: http://your-domain.com
- **Admin Panel**: http://your-domain.com/admin/login
- **Default Admin**: 
  - Email: admin@foodtruck.ma
  - Password: admin123 (CHANGE THIS!)

---

**⚠️ Important**: Always change the default admin credentials and use strong passwords in production!
