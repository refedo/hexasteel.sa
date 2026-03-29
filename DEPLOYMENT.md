# Deployment Guide - Digital Ocean

This guide explains how to deploy the Hexasteel website to Digital Ocean using GitHub Actions.

## Prerequisites

1. Digital Ocean Droplet (Ubuntu 20.04+ recommended)
2. Domain name configured (hexasteel.sa)
3. GitHub repository access
4. PostgreSQL database on the server

## Server Setup

### 1. Initial Server Configuration

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Git
sudo apt install -y git
```

### 2. PostgreSQL Setup

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE hexasteel;
CREATE USER hexasteel_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE hexasteel TO hexasteel_user;
\q
```

### 3. Application Setup

```bash
# Create application directory
sudo mkdir -p /var/www/hexasteel.sa
sudo chown -R $USER:$USER /var/www/hexasteel.sa

# Clone repository
cd /var/www/hexasteel.sa
git clone https://github.com/refedo/hexasteel.sa.git .

# Install dependencies
npm ci

# Create .env file
nano .env
```

Add the following to `.env`:
```env
DATABASE_URL="postgresql://hexasteel_user:your_secure_password@localhost:5432/hexasteel?schema=public"
NEXTAUTH_SECRET="generate-a-secure-random-string-here"
NEXTAUTH_URL="https://hexasteel.sa"
```

```bash
# Run database migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Build the application
npm run build

# Start with PM2
pm2 start npm --name "hexasteel" -- start
pm2 save
pm2 startup
```

### 4. Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/hexasteel.sa
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name hexasteel.sa www.hexasteel.sa;

    location / {
        proxy_pass http://localhost:4500;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/hexasteel.sa /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 5. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d hexasteel.sa -d www.hexasteel.sa

# Auto-renewal is configured automatically
```

## GitHub Actions Setup

### Required Secrets

Add these secrets in GitHub repository settings (Settings → Secrets and variables → Actions):

1. **DO_HOST**: Your Digital Ocean droplet IP address
2. **DO_USERNAME**: SSH username (usually `root` or your user)
3. **DO_SSH_KEY**: Private SSH key for authentication
4. **DO_PORT**: SSH port (default: 22)
5. **DATABASE_URL**: PostgreSQL connection string
6. **NEXTAUTH_SECRET**: NextAuth secret key
7. **NEXTAUTH_URL**: Production URL (https://hexasteel.sa)

### Generate SSH Key for GitHub Actions

On your local machine:
```bash
ssh-keygen -t ed25519 -C "github-actions@hexasteel.sa" -f ~/.ssh/hexasteel_deploy
```

Add the public key to the server:
```bash
ssh-copy-id -i ~/.ssh/hexasteel_deploy.pub user@your-server-ip
```

Copy the private key content and add it as `DO_SSH_KEY` secret in GitHub.

## Deployment Process

1. Push code to `main` branch
2. GitHub Actions automatically:
   - Checks out code
   - Installs dependencies
   - Builds the application
   - Deploys to Digital Ocean via SSH
   - Runs database migrations
   - Restarts the application with PM2

## Manual Deployment

If needed, deploy manually:

```bash
cd /var/www/hexasteel.sa
git pull origin main
npm ci
npm run build
npx prisma migrate deploy
pm2 restart hexasteel
```

## Monitoring

```bash
# View application logs
pm2 logs hexasteel

# Check application status
pm2 status

# Monitor resources
pm2 monit

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Application won't start
```bash
pm2 logs hexasteel --lines 100
```

### Database connection issues
```bash
# Test PostgreSQL connection
psql -U hexasteel_user -d hexasteel -h localhost
```

### Port already in use
```bash
# Find process using port 4500
sudo lsof -i :4500
# Kill the process
sudo kill -9 <PID>
```

## Security Checklist

- [ ] Firewall configured (UFW)
- [ ] SSH key-based authentication only
- [ ] PostgreSQL accepts local connections only
- [ ] SSL certificate installed
- [ ] Environment variables secured
- [ ] Regular backups configured
- [ ] Fail2ban installed
- [ ] Automatic security updates enabled

## Backup Strategy

```bash
# Database backup
pg_dump -U hexasteel_user hexasteel > backup_$(date +%Y%m%d).sql

# Automated daily backups
sudo crontab -e
# Add: 0 2 * * * pg_dump -U hexasteel_user hexasteel > /backups/hexasteel_$(date +\%Y\%m\%d).sql
```
