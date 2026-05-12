#!/bin/bash
# Deploy Healora to dev.healora.ru
# Usage: ./deploy-dev.sh

set -e

echo "=== Healora Deploy to dev.healora.ru ==="

# Configuration
PROJECT_ROOT="E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru"
DEV_FOLDER="$PROJECT_ROOT\www\dev.healora.ru"
BUILD_DIR="$DEV_FOLDER\dist"

echo "1. Building frontend..."
cd "$DEV_FOLDER"
npm run build

echo "2. Build complete. Files in $BUILD_DIR:"
ls -la "$BUILD_DIR"

echo ""
echo "3. To deploy manually:"
echo "   - Copy contents of $BUILD_DIR to your web server's dev.healora.ru directory"
echo "   - Ensure API server is running on port 3051"
echo "   - Configure web server (nginx/apache) to:"
echo "     * Serve static files from dev.healora.ru directory"
echo "     * Proxy /api requests to localhost:3051"
echo ""
echo "4. Or run local preview:"
echo "   cd $DEV_FOLDER"
echo "   npx vite preview --port 8080"
echo ""
echo "=== Deploy script complete ==="
