#!/bin/bash

# Database Migration Script for Vercel Deployment
# This script should be run during the deployment process

set -e

echo "🚀 Starting database migration for Vercel deployment..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL environment variable is not set"
  exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations (if using PostgreSQL)
echo "🔄 Running database migrations..."
npx prisma migrate deploy

# Push schema changes (if using SQLite or for development)
# npx prisma db push

# Seed database if needed
if [ -f "prisma/seed.ts" ]; then
  echo "🌱 Seeding database..."
  npx tsx prisma/seed.ts
fi

echo "✅ Database migration completed successfully!"
echo "🎉 Your database is ready for production!"