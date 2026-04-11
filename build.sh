#!/bin/bash
# Build script for the monorepo

set -e

echo "🏗️  Building CanchaYa..."

# Build shared types first
echo "📦 Building @canchaya/types..."
yarn workspace @canchaya/types build

# Build API
echo "📦 Building @canchaya/api..."
yarn workspace @canchaya/api build

# Build mobile
echo "📦 Building @canchaya/mobile..."
yarn workspace @canchaya/mobile build

# Build web
echo "📦 Building @canchaya/web..."
yarn workspace @canchaya/web build

echo "✅ Build complete!"
