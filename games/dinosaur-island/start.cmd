@echo off
setlocal
cd /d "%~dp0"
rem Reuse this game's existing server when the launcher is double-clicked again.
powershell.exe -NoProfile -Command "try { $page = Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:5182/' -TimeoutSec 2; if ($page.Content.Contains('The Lost Island') -and $page.Content.Contains('/src/main.ts')) { exit 0 } } catch {}; exit 1" >nul 2>&1
if not errorlevel 1 (
  start "" "http://127.0.0.1:5182/"
  exit /b 0
)
where npm.cmd >nul 2>&1
if errorlevel 1 (
  echo Node.js / npm was not found. Install Node.js, then try again.
  pause
  exit /b 1
)
if not exist node_modules (
  call npm.cmd install
  if errorlevel 1 (
    echo Dependency installation failed. See the error above.
    pause
    exit /b 1
  )
)
echo Starting Dinosaur Island. The browser will open when the server is ready.
echo Keep this window open while playing. Press Ctrl+C to stop.
call npm.cmd run dev -- --open
if errorlevel 1 (
  echo Could not start the game. If port 5182 is occupied by another app, close that app first.
  pause
  exit /b 1
)
