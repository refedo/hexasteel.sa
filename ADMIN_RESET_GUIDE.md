# Admin User Reset Guide

## Current Issue
PostgreSQL database is not running at `localhost:5432`, preventing the application from connecting to the database.

## Steps to Fix

### 1. Start PostgreSQL Database

**Option A: Using Windows Services (Requires Admin)**
1. Open PowerShell as Administrator
2. Run: `Start-Service postgresql-x64-17`
3. Verify: `Get-Service postgresql-x64-17`

**Option B: Using Services GUI**
1. Press `Win + R`, type `services.msc`
2. Find "postgresql-x64-17 - PostgreSQL Server 17"
3. Right-click → Start

### 2. Reset Admin Credentials

Once PostgreSQL is running, execute the reset script:

```bash
npm run reset-admin
```

**New Admin Credentials:**
- **Email:** `admin@hexasteel.sa`
- **Password:** `Admin@2026`

### 3. Alternative: Manual Database Setup

If the database doesn't exist yet, run:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create database schema
npx prisma migrate deploy

# Or reset database (WARNING: deletes all data)
npx prisma migrate reset

# Then run the reset script
npm run reset-admin
```

### 4. Verify Login

1. Navigate to: `http://localhost:4500/admin/login`
2. Use credentials:
   - Email: `admin@hexasteel.sa`
   - Password: `Admin@2026`

## Troubleshooting

### PostgreSQL Won't Start
- Check if port 5432 is already in use
- Verify PostgreSQL installation
- Check Windows Event Viewer for errors

### Database Connection Issues
- Verify `.env` file has correct `DATABASE_URL`
- Current: `postgresql://postgres:Refe@2808@localhost:5432/hexasteel?schema=public`
- Ensure database `hexasteel` exists

### Create Database Manually
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE hexasteel;

# Exit
\q
```

## Quick Reference

**Old Credentials (from code):**
- Password: `admin123` or `Admin@123`

**New Credentials (after reset):**
- Email: `admin@hexasteel.sa`
- Password: `Admin@2026`
