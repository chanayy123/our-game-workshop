@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 22.12 or newer, then run this file again.
  pause
  exit /b 1
)
where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Reinstall Node.js with npm enabled.
  pause
  exit /b 1
)
if not exist "node_modules\vite\bin\vite.js" (
  echo Installing game dependencies. This first step needs internet access.
  call npm ci
  if errorlevel 1 (
    echo Dependency installation failed. Check the message above and try again.
    pause
    exit /b 1
  )
)
echo Starting Midnight Masquerade at http://127.0.0.1:5184
echo Keep this window open while playing. Press Ctrl+C to stop.
call npm run dev -- --open
if errorlevel 1 (
  echo The game server stopped. Port 5184 may already be in use.
  pause
  exit /b 1
)
