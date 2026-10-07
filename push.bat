@echo off
echo ===================================================
echo   Pushing Portfolio Updates to GitHub
echo ===================================================
git add .
git commit -m "Update resume link to NeoResume.pdf"
git push
pause
