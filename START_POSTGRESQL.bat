@echo off
echo Starting PostgreSQL Service...
echo.
echo This requires Administrator privileges.
echo If prompted, please click "Yes" to allow.
echo.

net session >nul 2>&1
if %errorLevel% == 0 (
    echo Running with Administrator privileges...
    net start postgresql-x64-17
    if %errorLevel% == 0 (
        echo.
        echo ✓ PostgreSQL started successfully!
        echo.
        echo You can now run: npm run reset-admin
    ) else (
        echo.
        echo ✗ Failed to start PostgreSQL
        echo Please check Windows Services manually
    )
) else (
    echo.
    echo ✗ This script needs Administrator privileges
    echo.
    echo Please right-click this file and select "Run as administrator"
)

echo.
pause
