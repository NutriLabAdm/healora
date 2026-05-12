#!/bin/bash
# Deploy to dev.healora.ru
cd "E:\_dev\55.Skoltech\56.AIMLEI-2026\healora.ru\www\dev.healora.ru"

echo "Building frontend..."
npm run build

echo "Build complete. Output in dist/"
echo "To deploy: copy dist/* to your web server's dev.healora.ru directory"
ls -la dist/
