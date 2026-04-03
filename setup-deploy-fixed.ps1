# 🚀 Quick Setup Script for Vercel + GitHub Actions (PowerShell)

Write-Host "🚀 Setting up Vercel + GitHub Actions deployment..." -ForegroundColor Cyan

# Check if Node.js is installed
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCheck) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js found: $($nodeCheck.Version)" -ForegroundColor Green

# Check if npm is installed
$npmCheck = Get-Command npm -ErrorAction SilentlyContinue
if (-not $npmCheck) {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}
Write-Host "✅ npm found" -ForegroundColor Green

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit with GitHub Actions setup"
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already exists" -ForegroundColor Green
}

# Install Vercel CLI
$vercelCheck = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelCheck) {
    Write-Host "📦 Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel@latest
    Write-Host "✅ Vercel CLI installed" -ForegroundColor Green
} else {
    Write-Host "✅ Vercel CLI already installed" -ForegroundColor Green
}

# Instructions
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📋 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Login to Vercel:" -ForegroundColor Yellow
Write-Host "   vercel login" -ForegroundColor White
Write-Host ""
Write-Host "2. Create Vercel token:" -ForegroundColor Yellow
Write-Host "   vercel tokens create" -ForegroundColor White
Write-Host "   ✅ Copy to token and save it!" -ForegroundColor Green
Write-Host ""
Write-Host "3. Add VERCEL_TOKEN to GitHub Secrets:" -ForegroundColor Yellow
Write-Host "   - Go to: https://github.com/dylyk/crypto-exchange-ulan-ude-github/settings/secrets/actions" -ForegroundColor White
Write-Host "   - Click: New repository secret" -ForegroundColor White
Write-Host "   - Name: VERCEL_TOKEN" -ForegroundColor White
Write-Host "   - Value: [paste to token from step 2]" -ForegroundColor White
Write-Host ""
Write-Host "4. Link project to Vercel:" -ForegroundColor Yellow
Write-Host "   vercel link" -ForegroundColor White
Write-Host ""
Write-Host "5. Build project locally:" -ForegroundColor Yellow
Write-Host "   npm run build" -ForegroundColor White
Write-Host ""
Write-Host "6. Push to GitHub:" -ForegroundColor Yellow
Write-Host "   git remote add origin https://github.com/dylyk/crypto-exchange-ulan-ude-github.git" -ForegroundColor White
Write-Host "   git branch -M main" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "7. Monitor deployment:" -ForegroundColor Yellow
Write-Host "   - GitHub: https://github.com/dylyk/crypto-exchange-ulan-ude-github/actions" -ForegroundColor White
Write-Host "   - Vercel: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "   - Site: https://crypto-exchange-ulan-ude-github.vercel.app" -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ Setup complete! Follow to steps above." -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 Read DEPLOYMENT-GUIDE.md for detailed instructions." -ForegroundColor Cyan
