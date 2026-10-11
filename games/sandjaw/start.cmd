@echo off
setlocal
cd /d "%~dp0"
rem Reuse an existing SANDJAW development server.
powershell.exe -NoProfile -Command "try { $page = Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:5186/' -TimeoutSec 2; if ($page.Content.Contains('SANDJAW') -and $page.Content.Contains('/src/main.ts')) { exit 0 } } catch {}; exit 1" >nul 2>&1
if not errorlevel 1 (
  echo Opening the running SANDJAW game.
  start "" "http://127.0.0.1:5186/"
  exit /b 0
)
where npm.cmd >nul 2>&1
if errorlevel 1 (
  echo Node.js / npm was not found. Install Node.js 22.17 or newer, then try again.
  pause
  exit /b 1
)
if not exist node_modules\vite\bin\vite.js (
  call npm.cmd install --cache .npm-cache
  if errorlevel 1 (
    echo Dependency installation failed. See the error above.
    pause
    exit /b 1
  )
)
echo Starting SANDJAW. The browser will open when the server is ready.
echo Keep this window open while playing. Press Ctrl+C to stop.
call npm.cmd run dev -- --open
if errorlevel 1 (
  echo Could not start the game. Check the error above; port 5186 may be occupied.
  pause
  exit /b 1
)
