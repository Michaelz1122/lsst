#!/bin/bash

# Vercel Build Script for Next.js Application
# This script handles the complete build process for Vercel deployment

set -e

echo "🚀 Starting Vercel build process..."

# Set environment
export NODE_ENV=production

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next out dist

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --prefer-offline --no-audit

# Type checking
echo "🔍 Running TypeScript type checking..."
npm run type-check

# Run linting
echo "🔍 Running ESLint..."
npm run lint

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations (if DATABASE_URL is available)
if [ -n "$DATABASE_URL" ]; then
  echo "🔄 Running database migrations..."
  npx prisma migrate deploy || echo "⚠️  Migration failed, continuing build..."
fi

# Build Next.js application
echo "🏗️  Building Next.js application..."
npm run build

# Export static files if needed (for static sites)
# echo "📤 Exporting static files..."
# npm run export

echo "✅ Build completed successfully!"
echo "🎉 Application is ready for Vercel deployment!"