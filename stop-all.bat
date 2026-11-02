@echo off
setlocal
title SHVM - Stopping All Services

echo ========================================================
echo   Stopping SHVM Services (Ports: 5099, 5173, 3000)
echo ========================================================
echo.

powershell -NoProfile -Command ^
  "$ports = @(5099, 5173, 3000); foreach ($port in $ports) { $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue; if ($connections) { foreach ($conn in $connections) { $procId = $conn.OwningProcess; if ($procId -gt 0) { try { Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue; Write-Host ('  [STOPPED] Process ' + $procId + ' on port ' + $port) } catch {} } } } else { Write-Host ('  [CLEAN] No process listening on port ' + $port) } }"

echo.
echo ========================================================
echo   All SHVM processes have been stopped!
echo ========================================================
timeout /t 2 /nobreak >nul

