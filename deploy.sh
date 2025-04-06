#!/bin/bash

# Exit on error
set -e

# Clean up
echo "Cleaning up..."
pnpm clean || true

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Build the project
echo "Building project..."
pnpm build

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

echo "Deployment complete!" 