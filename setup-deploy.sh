#!/bin/bash

# 🚀 Quick Setup Script for Vercel + GitHub Actions

echo "🚀 Setting up Vercel + GitHub Actions deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit with GitHub Actions setup"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Install Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel@latest
    echo "✅ Vercel CLI installed"
else
    echo "✅ Vercel CLI already installed"
fi

# Login to Vercel
echo "🔐 Logging into Vercel..."
vercel login

# Create Vercel token
echo "🔑 Creating Vercel token..."
vercel tokens create
echo ""
echo "✅ Copy the token from above and add it to GitHub Secrets as 'VERCEL_TOKEN'"

# Link project to Vercel
echo "🔗 Linking project to Vercel..."
vercel link

# Build project locally
echo "🔨 Building project locally..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix build errors before deploying."
    exit 1
fi

# Instructions
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 NEXT STEPS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Create GitHub repository (if not exists)"
echo "2. Add VERCEL_TOKEN to GitHub Secrets:"
echo "   - Go to: https://github.com/dylyk/crypto-exchange-ulan-ude-github/settings/secrets/actions"
echo "   - Click: New repository secret"
echo "   - Name: VERCEL_TOKEN"
echo "   - Value: <paste the token from above>"
echo ""
echo "3. Push to GitHub:"
echo "   git remote add origin https://github.com/dylyk/crypto-exchange-ulan-ude-github.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Monitor deployment:"
echo "   - GitHub: https://github.com/dylyk/crypto-exchange-ulan-ude-github/actions"
echo "   - Vercel: https://vercel.com/dashboard"
echo "   - Site: https://crypto-exchange-ulan-ude-github.vercel.app"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Setup complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
