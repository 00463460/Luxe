#!/bin/bash

# Vercel Environment Variables Setup Script
# This script helps you add environment variables to Vercel via CLI

echo "=================================="
echo "Vercel Environment Setup"
echo "=================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed!"
    echo "Install it with: npm install -g vercel"
    exit 1
fi

echo "✅ Vercel CLI is installed"
echo ""

# Navigate to frontend directory
cd frontend || exit

echo "Please enter your environment variables:"
echo ""

# Get Railway backend URL
read -p "Enter your Railway backend URL (e.g., https://luxe-backend-production.up.railway.app): " BACKEND_URL

# Get Stripe public key
read -p "Enter your Stripe Publishable Key (starts with pk_): " STRIPE_KEY

# Get OpenAI API key
read -p "Enter your OpenAI API Key (starts with sk-): " OPENAI_KEY

echo ""
echo "Setting up environment variables on Vercel..."
echo ""

# Add VITE_API_URL
echo "Adding VITE_API_URL..."
vercel env add VITE_API_URL production <<EOF
${BACKEND_URL}/api
EOF

# Add VITE_STRIPE_PUBLIC_KEY
echo "Adding VITE_STRIPE_PUBLIC_KEY..."
vercel env add VITE_STRIPE_PUBLIC_KEY production <<EOF
${STRIPE_KEY}
EOF

# Add VITE_OPENAI_API_KEY
echo "Adding VITE_OPENAI_API_KEY..."
vercel env add VITE_OPENAI_API_KEY production <<EOF
${OPENAI_KEY}
EOF

echo ""
echo "✅ Environment variables added successfully!"
echo ""
echo "Now redeploying frontend to apply changes..."
vercel --prod

echo ""
echo "=================================="
echo "✅ Setup Complete!"
echo "=================================="
echo ""
echo "Your frontend is now configured with:"
echo "- Backend URL: ${BACKEND_URL}/api"
echo "- Stripe integration enabled"
echo "- OpenAI chatbot enabled"
echo ""
echo "Visit your live site:"
echo "https://frontend-o07pbklyt-kashans-projects-70aa2ca8.vercel.app"
