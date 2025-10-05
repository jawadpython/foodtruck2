#!/bin/bash

# Backup script for Food Truck Marketplace
BACKUP_DIR="/var/backups/food-truck-marketplace"
DATE=$(date +%Y%m%d_%H%M%S)
PROJECT_DIR="/var/www/food-truck-marketplace"

echo "🔄 Starting backup process..."

# Create backup directory
mkdir -p $BACKUP_DIR

# Create backup
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" \
    -C $PROJECT_DIR \
    data/ \
    public/images/ \
    env.production

echo "✅ Backup created: $BACKUP_DIR/backup_$DATE.tar.gz"

# Keep only last 7 backups
cd $BACKUP_DIR
ls -t backup_*.tar.gz | tail -n +8 | xargs -r rm

echo "🧹 Old backups cleaned up"
echo "📊 Current backups:"
ls -la backup_*.tar.gz
