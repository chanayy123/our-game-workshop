@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Please install Node.js 22.12 or newer, then run this file again.
  pause
  exit /b 1
)
if not exist "node_modules\vite\bin\vite.js" (
  echo Installing project dependencies...
  call npm ci --no-audit --no-fund
  if errorlevel 1 (
    echo Installation failed. Please check the network connection and try again.
    pause
    exit /b 1
  )
)
echo Opening Pelican Pedal Club at http://127.0.0.1:5173/
echo Press Ctrl+C to stop the local server.
call npm run dev -- --open
if errorlevel 1 pause
