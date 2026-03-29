# Reset PostgreSQL Password Guide

## Method 1: Using pgAdmin (Easiest)

1. Open **pgAdmin 4** (should be installed with PostgreSQL)
2. Connect to your PostgreSQL server
3. Right-click on "Login/Group Roles" → "postgres"
4. Go to "Definition" tab
5. Enter new password: `postgres` (or your preferred password)
6. Click "Save"

## Method 2: Using Command Line

### Step 1: Locate pg_hba.conf
Find the file at: `C:\Program Files\PostgreSQL\17\data\pg_hba.conf`

### Step 2: Backup and Edit pg_hba.conf
1. Make a backup copy of `pg_hba.conf`
2. Open `pg_hba.conf` as Administrator in Notepad
3. Find the line:
   ```
   host    all             all             127.0.0.1/32            scram-sha-256
   ```
4. Change `scram-sha-256` to `trust`:
   ```
   host    all             all             127.0.0.1/32            trust
   ```
5. Save the file

### Step 3: Restart PostgreSQL
```powershell
# Run as Administrator
Restart-Service postgresql-x64-17
```

### Step 4: Reset Password
```powershell
# Connect without password
psql -U postgres

# In psql prompt, run:
ALTER USER postgres WITH PASSWORD 'postgres';

# Exit
\q
```

### Step 5: Restore pg_hba.conf
1. Change `trust` back to `scram-sha-256` in `pg_hba.conf`
2. Save the file
3. Restart PostgreSQL again:
   ```powershell
   Restart-Service postgresql-x64-17
   ```

## Method 3: Reinstall PostgreSQL (Last Resort)
If the above methods don't work, you can reinstall PostgreSQL and set a new password during installation.

## After Resetting Password

Update your `.env` file with the new password:
```
DATABASE_URL="postgresql://postgres:NEW_PASSWORD@localhost:5432/hexasteel?schema=public"
```

Then restart your Next.js dev server.
