@echo off
REM Git setup script for CanchaYa Phase 1 & 2 Infrastructure

cd C:\Projects\CanchaYa

echo Creating feature branch...
git checkout -b feature/phase1-phase2-infrastructure

echo Staging all files...
git add .

echo Creating commit...
git commit -m "feat: Set up monorepo infrastructure and NestJS API foundation

Phase 1 & 2 Implementation:
- Initialize monorepo with yarn workspaces
- Configure TypeScript, ESLint, Prettier, Jest
- Set up PostgreSQL + PostGIS Docker environment
- Create shared types package with DTOs and models
- Initialize NestJS API project with full configuration
- Add comprehensive documentation (SETUP.md, GETTING_STARTED.md)
- Set up environment files, build tools, and development scripts

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"

echo.
echo Showing recent commits...
git log --oneline -5

echo.
echo Branch info...
git branch -v

echo.
echo Git status...
git status

echo.
echo ✅ Commit complete!
pause
