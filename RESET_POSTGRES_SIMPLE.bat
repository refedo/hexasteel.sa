@echo off
echo ============================================
echo PostgreSQL Password Reset Helper
echo ============================================
echo.
echo This script will help you reset the PostgreSQL password.
echo.
echo INSTRUCTIONS:
echo 1. This will open pg_hba.conf in Notepad
echo 2. Find the line with "127.0.0.1/32" and "scram-sha-256"
echo 3. Change "scram-sha-256" to "trust"
echo 4. Save and close Notepad
echo 5. Press any key to continue
echo.
pause

echo.
echo Opening pg_hba.conf...
notepad "C:\Program Files\PostgreSQL\17\data\pg_hba.conf"

echo.
echo Restarting PostgreSQL service...
net stop postgresql-x64-17
timeout /t 2 /nobreak >nul
net start postgresql-x64-17

echo.
echo ============================================
echo Now run this command to reset password:
echo ============================================
echo.
echo psql -U postgres -c "ALTER USER postgres WITH PASSWORD 'postgres';"
echo.
echo ============================================
echo.
echo After that, change "trust" back to "scram-sha-256" in pg_hba.conf
echo and restart PostgreSQL again.
echo.
pause
