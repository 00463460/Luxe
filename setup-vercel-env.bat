@echo off
setlocal enabledelayedexpansion

REM Vercel Environment Variables Setup Script for Windows
REM This script helps you add environment variables to Vercel via CLI

echo ==================================
echo Vercel Environment Setup
echo ==================================
echo.

REM Check if vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Vercel CLI is not installed!
    echo Install it with: npm install -g vercel
    pause
    exit /b 1
)

echo [OK] Vercel CLI is installed
echo.

REM Navigate to frontend directory
cd frontend

echo Please enter your environment variables:
echo.

REM Get Railway backend URL
set /p BACKEND_URL="Enter your Railway backend URL (e.g., https://luxe-backend-production.up.railway.app): "

REM Get Stripe public key
set /p STRIPE_KEY="Enter your Stripe Publishable Key (starts with pk_): "

REM Get OpenAI API key
set /p OPENAI_KEY="Enter your OpenAI API Key (starts with sk-): "

echo.
echo Setting up environment variables on Vercel...
echo.

REM Add VITE_API_URL
echo Adding VITE_API_URL...
echo %BACKEND_URL%/api | vercel env add VITE_API_URL production

REM Add VITE_STRIPE_PUBLIC_KEY
echo Adding VITE_STRIPE_PUBLIC_KEY...
echo %STRIPE_KEY% | vercel env add VITE_STRIPE_PUBLIC_KEY production

REM Add VITE_OPENAI_API_KEY
echo Adding VITE_OPENAI_API_KEY...
echo %OPENAI_KEY% | vercel env add VITE_OPENAI_API_KEY production

echo.
echo [OK] Environment variables added successfully!
echo.
echo Now redeploying frontend to apply changes...
call vercel --prod

echo.
echo ==================================
echo [OK] Setup Complete!
echo ==================================
echo.
echo Your frontend is now configured with:
echo - Backend URL: %BACKEND_URL%/api
echo - Stripe integration enabled
echo - OpenAI chatbot enabled
echo.
echo Visit your live site:
echo https://frontend-o07pbklyt-kashans-projects-70aa2ca8.vercel.app
echo.

pause
