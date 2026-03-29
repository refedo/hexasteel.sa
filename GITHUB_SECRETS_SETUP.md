# GitHub Secrets Configuration Guide

This guide explains how to configure GitHub repository secrets for automated deployment to Digital Ocean.

## Required GitHub Secrets

Navigate to your GitHub repository: https://github.com/refedo/hexasteel.sa

Go to: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

### 1. Digital Ocean Server Secrets

#### DO_HOST
- **Name:** `DO_HOST`
- **Value:** Your Digital Ocean droplet IP address
- **Example:** `164.92.123.45`

#### DO_USERNAME
- **Name:** `DO_USERNAME`
- **Value:** SSH username for your server
- **Example:** `root` or `ubuntu` or your custom user

#### DO_SSH_KEY
- **Name:** `DO_SSH_KEY`
- **Value:** Private SSH key for authentication

**To generate SSH key:**
```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions@hexasteel.sa" -f ~/.ssh/hexasteel_deploy

# Copy the PRIVATE key content
cat ~/.ssh/hexasteel_deploy

# Copy the PUBLIC key to your server
ssh-copy-id -i ~/.ssh/hexasteel_deploy.pub root@YOUR_SERVER_IP
```

Copy the entire content of the **private key** (including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`) and paste it as the secret value.

#### DO_PORT
- **Name:** `DO_PORT`
- **Value:** SSH port number
- **Default:** `22`

### 2. Database Configuration

#### DATABASE_URL
- **Name:** `DATABASE_URL`
- **Value:** PostgreSQL connection string
- **Format:** `postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public`
- **Example:** `postgresql://hexasteel_user:SecurePass123!@localhost:5432/hexasteel?schema=public`

**Important:** Use a strong password for production!

### 3. NextAuth Configuration

#### NEXTAUTH_SECRET
- **Name:** `NEXTAUTH_SECRET`
- **Value:** Random secure string for session encryption

**Generate a secure secret:**
```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online generator
# Visit: https://generate-secret.vercel.app/32
```

#### NEXTAUTH_URL
- **Name:** `NEXTAUTH_URL`
- **Value:** Your production domain URL
- **Example:** `https://hexasteel.sa`

## Summary of All Secrets

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `DO_HOST` | Server IP address | `164.92.123.45` |
| `DO_USERNAME` | SSH username | `root` |
| `DO_SSH_KEY` | Private SSH key | `-----BEGIN OPENSSH...` |
| `DO_PORT` | SSH port | `22` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@localhost:5432/db` |
| `NEXTAUTH_SECRET` | Session encryption key | `random-32-char-string` |
| `NEXTAUTH_URL` | Production URL | `https://hexasteel.sa` |

## Verification Steps

### 1. Test SSH Connection

Before deploying, verify SSH access works:

```bash
ssh -i ~/.ssh/hexasteel_deploy root@YOUR_SERVER_IP
```

### 2. Test Secrets in GitHub Actions

After adding all secrets, you can test by:

1. Making a small commit to the `main` branch
2. Checking the Actions tab in GitHub
3. Viewing the deployment workflow logs

### 3. Manual Deployment Test

If automated deployment fails, test manually:

```bash
# SSH into your server
ssh root@YOUR_SERVER_IP

# Navigate to project directory
cd /var/www/hexasteel.sa

# Pull latest changes
git pull origin main

# Install dependencies
npm ci

# Build
npm run build

# Run migrations
npx prisma migrate deploy

# Restart application
pm2 restart hexasteel
```

## Security Best Practices

### SSH Key Security
- ✅ Use dedicated SSH key for GitHub Actions
- ✅ Never commit private keys to repository
- ✅ Rotate keys periodically
- ✅ Use strong passphrases for keys

### Database Security
- ✅ Use strong, unique passwords
- ✅ Restrict PostgreSQL to localhost only
- ✅ Regular backups
- ✅ Enable SSL connections in production

### Environment Variables
- ✅ Never commit `.env` file to repository
- ✅ Use different secrets for dev/staging/production
- ✅ Rotate secrets periodically
- ✅ Limit access to GitHub secrets

## Troubleshooting

### Deployment Fails with "Permission Denied"

**Solution:** Verify SSH key is correctly added to server
```bash
# On server
cat ~/.ssh/authorized_keys
# Should contain the public key
```

### Database Connection Fails

**Solution:** Check PostgreSQL is running and credentials are correct
```bash
# On server
sudo systemctl status postgresql
psql -U hexasteel_user -d hexasteel -h localhost
```

### Build Fails

**Solution:** Check Node.js version and dependencies
```bash
# On server
node --version  # Should be 18.x
npm ci
npm run build
```

### Port Already in Use

**Solution:** Check what's using port 4500
```bash
# On server
sudo lsof -i :4500
pm2 list
```

## Next Steps After Configuration

1. ✅ Add all secrets to GitHub
2. ✅ Set up Digital Ocean server (see DEPLOYMENT.md)
3. ✅ Configure domain DNS to point to server
4. ✅ Install SSL certificate
5. ✅ Test deployment by pushing to main branch
6. ✅ Monitor first deployment in GitHub Actions
7. ✅ Verify site is accessible at https://hexasteel.sa

## Support

For issues with:
- **GitHub Actions:** Check Actions tab logs
- **Server Setup:** See DEPLOYMENT.md
- **Database:** Check PostgreSQL logs
- **Application:** Check PM2 logs with `pm2 logs hexasteel`
