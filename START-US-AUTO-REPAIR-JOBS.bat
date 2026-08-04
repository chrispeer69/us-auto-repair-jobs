@echo off
REM ============================================================
REM  US Auto Repair Jobs - local launcher
REM  Double-click this file to start the site and open it.
REM ============================================================
cd /d "%~dp0"
echo Starting US Auto Repair Jobs on http://127.0.0.1:8080 ...
start "" "http://127.0.0.1:8080/index.html"
python -m http.server 8080 --bind 127.0.0.1
