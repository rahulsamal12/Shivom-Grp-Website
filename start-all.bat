@echo off
setlocal EnableDelayedExpansion
title SHVM - Starting All Services

echo ========================================================
echo   Starting Complete SHVM Project Locally
echo ========================================================
echo.
echo   1. Backend Server   : http://localhost:5099
echo      API Endpoint     : http://localhost:5099/api
echo      API Health Check : http://localhost:5099/api/health
echo.
echo   2. Admin Panel      : http://localhost:5173
echo.
echo   3. Frontend Website : http://localhost:3000
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/3] Launching Backend Server on port 5099...
start "SHVM - Backend Server (Port 5099)" cmd.exe /k "cd /d "%~dp0server" && npm.cmd run dev"

ping 127.0.0.1 -n 3 >nul

echo [2/3] Launching Admin Panel on port 5173...
start "SHVM - Admin Panel (Port 5173)" cmd.exe /k "cd /d "%~dp0admin" && npm.cmd run dev"

ping 127.0.0.1 -n 3 >nul

echo [3/3] Launching Frontend Website on port 3000...
start "SHVM - Frontend (Port 3000)" cmd.exe /k "cd /d "%~dp0shivom-frontend" && npm.cmd run dev"

echo.
echo ========================================================
echo   All 3 services have been launched in separate windows!
echo   Keep those terminal windows open while working.
echo   Run stop-all.bat to stop all running instances.
echo ========================================================
