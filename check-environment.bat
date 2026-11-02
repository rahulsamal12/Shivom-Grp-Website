@echo off
setlocal
echo ========================================================
echo   SHVM - Checking Local Development Environment
echo ========================================================
echo.

echo [1/5] Checking Node.js and npm...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not found in PATH!
) else (
    for /f "tokens=*" %%i in ('node -v') do echo   Node.js version: %%i
)

where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not found in PATH!
) else (
    for /f "tokens=*" %%i in ('npm -v') do echo   npm version: %%i
)
echo.

echo [2/5] Checking Database Tools...
where mongosh >nul 2>&1
if %errorlevel% neq 0 (
    echo   [NOTE] mongosh is not in PATH (Optional for CLI inspections)
) else (
    for /f "tokens=*" %%i in ('mongosh --version') do echo   mongosh version: %%i
)
echo.

echo [3/5] Checking Configuration (.env) Files...
if exist "server\.env" (
    echo   [OK] server\.env exists
) else (
    echo   [WARNING] server\.env is missing!
)

if exist "admin\.env" (
    echo   [OK] admin\.env exists
) else (
    echo   [WARNING] admin\.env is missing!
)

if exist "shivom-frontend\.env.local" (
    echo   [OK] shivom-frontend\.env.local exists
) else (
    echo   [WARNING] shivom-frontend\.env.local is missing!
)
echo.

echo [4/5] Checking Dependencies (node_modules)...
if exist "server\node_modules" (
    echo   [OK] server\node_modules installed
) else (
    echo   [WARNING] server\node_modules missing. Run 'cd server ^&^& npm install'
)

if exist "admin\node_modules" (
    echo   [OK] admin\node_modules installed
) else (
    echo   [WARNING] admin\node_modules missing. Run 'cd admin ^&^& npm install'
)

if exist "shivom-frontend\node_modules" (
    echo   [OK] shivom-frontend\node_modules installed
) else (
    echo   [WARNING] shivom-frontend\node_modules missing. Run 'cd shivom-frontend ^&^& npm install'
)
echo.

echo [5/5] Checking Port Conflicts (Ports: 5099, 5173, 3000)...
for %%P in (5099 5173 3000) do (
    netstat -ano | findstr /R /C:":%%P " >nul 2>&1
    if errorlevel 1 (
        echo   [FREE] Port %%P is available
    ) else (
        echo   [BUSY] Port %%P is currently in use
    )
)

echo.
echo ========================================================
echo   Environment check completed!
echo ========================================================
pause
