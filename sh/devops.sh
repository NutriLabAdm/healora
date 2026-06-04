#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
WEB_ROOT="$PROJECT_ROOT/www/healora.ru"

REMOTE_HOST="217.114.8.5"
REMOTE_USER="root"
REMOTE_DIR="/var/www/healora.ru"
DOMAIN="healora.ru"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Windows (Git Bash) PATH fix: nvm paths may contain unexpanded %VAR% refs
case "$(uname -s)" in
    CYGWIN*|MINGW*|MSYS*)
        _nvm_path=""; _nvm_home=""
        [ -n "$NVM_SYMLINK" ] && _nvm_path=$(echo "$NVM_SYMLINK" | tr '\\' '/' | sed 's|^\([a-zA-Z]\):/|/\L\1/|') && PATH="$PATH:$_nvm_path"
        [ -n "$NVM_HOME" ] && _nvm_home=$(echo "$NVM_HOME" | tr '\\' '/' | sed 's|^\([a-zA-Z]\):/|/\L\1/|') && PATH="$PATH:$_nvm_home"
        # Common Node.js install locations if nvm not used
        [ -d "/c/Program Files/nodejs" ] && PATH="$PATH:/c/Program Files/nodejs"
        ;;
esac

# Sync files from local to remote — copies only what's new/changed
# Uses rsync if available, falls back to tar over SSH (reliable on any platform)
sync_files() {
    local src_dir="$1"
    local dest_host="$2"
    local dest_dir="$3"
    local exclude_pattern="$4"

    if [ ! -d "$src_dir" ]; then
        log_error "Source not found: $src_dir"
        return 1
    fi

    if command -v rsync &> /dev/null; then
        log_info "Using rsync..."
        if [ -n "$exclude_pattern" ]; then
            rsync -avz --delete --exclude "$exclude_pattern" "$src_dir/" $REMOTE_USER@$dest_host:$dest_dir/
        else
            rsync -avz --delete "$src_dir/" $REMOTE_USER@$dest_host:$dest_dir/
        fi
    else
        log_info "Using tar over SSH..."
        local rc
        if [ -n "$exclude_pattern" ]; then
            tar cf - --exclude="$exclude_pattern" -C "$src_dir" . 2>&1 | \
            ssh $REMOTE_USER@$dest_host "tar xf - -C $dest_dir --overwrite" 2>&1
            rc=${PIPESTATUS[0]}
        else
            tar cf - -C "$src_dir" . 2>&1 | \
            ssh $REMOTE_USER@$dest_host "tar xf - -C $dest_dir --overwrite" 2>&1
            rc=${PIPESTATUS[0]}
        fi
        if [ "$rc" -ne 0 ]; then
            log_error "Sync failed (exit code $rc)"
            return 1
        fi
        log_info "Sync complete"
    fi
}

set_perms() {
    local dir="$1"
    local user="${2:-www-data}"
    ssh $REMOTE_USER@$REMOTE_HOST "chown -R $user:$user $dir 2>/dev/null; find $dir -type f -exec chmod 644 {} \; 2>/dev/null; find $dir -type d -exec chmod 755 {} \; 2>/dev/null; true"
}

backup_remote() {
    local dir="$1"
    local ts=$(date +%Y%m%d_%H%M%S)
    ssh $REMOTE_USER@$REMOTE_HOST "mkdir -p $dir/backups/$ts 2>/dev/null; cp -r $dir/* $dir/backups/$ts/ 2>/dev/null; rm -rf $dir/backups/$ts/backups 2>/dev/null; true"
}

show_menu() {
    echo "=============================================="
    echo "  DevOps CI/CD - healora.ru (Beget)"
    echo "=============================================="
    echo ""
    echo "Server: $REMOTE_HOST"
    echo "Web Root: $REMOTE_DIR"
    echo "Local: $WEB_ROOT"
    echo ""
    echo "╔══ BUILD & DEPLOY ═══════════════════════╗"
    echo "║  1) Build + Deploy prod (healora.ru)    ║"
    echo "║  2) Build + Deploy dev (dev.healora.ru) ║"
    echo "║  3) Build + Deploy prod + dev (full)    ║"
    echo "║  4) Deploy backend (API)                ║"
    echo "╚══════════════════════════════════════════╝"
    echo "╔══ INFRASTRUCTURE ═══════════════════════╗"
    echo "║  5) Config Nginx                        ║"
    echo "║  6) Setup SSL                           ║"
    echo "╚══════════════════════════════════════════╝"
    echo "╔══ SERVER MANAGEMENT ════════════════════╗"
    echo "║  7) Start backend                       ║"
    echo "║  8) Status check                        ║"
    echo "║  9) Cleanup orphaned files on server    ║"
    echo "╚══════════════════════════════════════════╝"
    echo "╔══ SOURCE CONTROL ═══════════════════════╗"
    echo "║ 10) Git pull                            ║"
    echo "║ 11) Git commit                          ║"
    echo "║ 12) Git push                            ║"
    echo "╚══════════════════════════════════════════╝"
    echo "╔══ DEVELOPMENT ══════════════════════════╗"
    echo "║ 13) Start local development             ║"
    echo "║ 14) Start Ollama (BigPickle)            ║"
    echo "╚══════════════════════════════════════════╝"
    echo "  0) Exit"
    echo ""
    read -p "Select option [0-14]: " choice
}

config_nginx() {
    log_info "Configuring Nginx for $DOMAIN"
    ssh $REMOTE_USER@$REMOTE_HOST "bash -s" << 'ENDSSH'
mkdir -p /var/www/healora.ru
chown -R www-data:www-data /var/www/healora.ru
chmod -R 755 /var/www/healora.ru

cat > /etc/nginx/sites-available/healora << 'ENDNGINX'
server {
    listen 80;
    server_name healora.ru www.healora.ru;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name healora.ru www.healora.ru;

    ssl_certificate /etc/letsencrypt/live/healora.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/healora.ru/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    root /var/www/healora.ru;
    index index.html;

    client_max_body_size 50M;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    location /digital-twin/ {
        try_files $uri $uri/ /digital-twin/index.html;
    }

    location = / {
        return 301 /digital-twin/;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3054;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
ENDNGINX

ln -sf /etc/nginx/sites-available/healora /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
echo "Nginx configured"
ENDSSH
    log_info "Nginx config complete"
}

setup_ssl() {
    log_info "Setting up SSL for $DOMAIN"
    read -p "Enter email for SSL: " SSL_EMAIL
    ssl_email="${SSL_EMAIL:-admin@healora.ru}"
    
    ssh $REMOTE_USER@$REMOTE_HOST "bash -s" << 'ENDSSH'
certbot --nginx -d healora.ru -d www.healora.ru --non-interactive --agree-tos --email $ssl_email
systemctl reload nginx
echo "SSL configured"
ENDSSH
    log_info "SSL setup complete"
}

deploy() {
    log_info "Deploying frontend to $REMOTE_HOST:$REMOTE_DIR"

    if [ ! -d "$WEB_ROOT" ]; then
        log_error "$WEB_ROOT not found"
        return
    fi

    backup_remote "$REMOTE_DIR"
    sync_files "$WEB_ROOT" "$REMOTE_HOST" "$REMOTE_DIR"
    set_perms "$REMOTE_DIR"

    log_info "Frontend deploy complete"
    log_info "Visit: https://healora.ru"
}

# Verify deploy function also called from main loop after deploy

# Build the Vite app, copy dist into www/healora.ru/digital-twin,
# and copy images required by root-level paths
build_and_sync_digital_twin() {
    local DEV_SRC="$PROJECT_ROOT/www/dev.healora.ru"
    local DEV_BUILD="$DEV_SRC/dist"
    local DT_DEST="$PROJECT_ROOT/www/healora.ru/digital-twin"
    local PROD_IMAGES="$PROJECT_ROOT/www/healora.ru/images"
    local DEV_PUBLIC="$DEV_SRC/public"

    log_info "Building frontend..."
    cd "$DEV_SRC"
    npm run build

    if [ ! -d "$DEV_BUILD" ]; then
        log_error "Build directory not found: $DEV_BUILD"
        return 1
    fi

    log_info "Syncing dist to production digital-twin source..."
    rm -rf "$DT_DEST" 2>/dev/null; mkdir -p "$DT_DEST"
    cp -r "$DEV_BUILD/"* "$DT_DEST/" 2>/dev/null || true
    log_info "Digital twin source updated"

    # Copy built index.html to production root so / serves the same SPA
    cp "$DEV_BUILD/index.html" "$PROJECT_ROOT/www/healora.ru/index.html" 2>/dev/null || true
    log_info "Root index.html updated"

    # Copy images from public/ to www/healora.ru/images/
    # (the code references /images/pers/32_32/ at root, not /digital-twin/images/)
    if [ -d "$DEV_PUBLIC/images" ]; then
        log_info "Copying public images to production root..."
        mkdir -p "$PROD_IMAGES"
        cp -r "$DEV_PUBLIC/images/"* "$PROD_IMAGES/" 2>/dev/null || true
        log_info "Production images updated"
    fi

    # Copy digital-twin images (pers/32_32 thumbnails) to root images for production
    if [ -d "$DT_DEST/images/pers/32_32" ]; then
        log_info "Copying pers thumbnails to production root images..."
        mkdir -p "$PROD_IMAGES/pers/32_32"
        cp -r "$DT_DEST/images/pers/32_32/"* "$PROD_IMAGES/pers/32_32/" 2>/dev/null || true
    fi
}

# Check that key files exist on remote after deploy
verify_deploy() {
    local dir="$1"
    local files=("$@")
    unset files[0] # remove dir from list
    local missing=0

    log_info "Verifying deployment at $dir..."
    for f in "${files[@]}"; do
        if ssh $REMOTE_USER@$REMOTE_HOST "test -f $dir/$f" 2>/dev/null; then
            log_info "  OK  $f"
        else
            log_warn "  MISSING  $f"
            missing=$((missing + 1))
        fi
    done

    if [ $missing -eq 0 ]; then
        log_info "All files verified"
    else
        log_warn "$missing file(s) missing"
    fi
    return $missing
}

# Remove orphaned files on remote that no longer exist in local source
cleanup_orphaned() {
    log_info "Cleaning up orphaned files on remote..."

    # Full-size pers images at root level (code uses only 32_32 thumbnails)
    if [ -d "$PROJECT_ROOT/www/healora.ru/images/pers" ]; then
        log_info "Syncing pers images (removing orphans)..."
        for f in $(ssh $REMOTE_USER@$REMOTE_HOST "ls /var/www/healora.ru/images/pers/ 2>/dev/null"); do
            if [ ! -f "$PROJECT_ROOT/www/healora.ru/images/pers/$f" ]; then
                ssh $REMOTE_USER@$REMOTE_HOST "rm -f /var/www/healora.ru/images/pers/$f" 2>/dev/null
                log_warn "  Removed orphan: images/pers/$f"
            fi
        done
    fi

    # Stale digital-twin asset files (JS/CSS not referenced by current index.html)
    log_info "Cleaning stale digital-twin assets..."
    local DT_REMOTE="/var/www/healora.ru/digital-twin"
    local DT_LOCAL="$PROJECT_ROOT/www/healora.ru/digital-twin"
    if [ -f "$DT_LOCAL/index.html" ]; then
        local current_js=$(grep -oP 'src="[^"]*\.js"' "$DT_LOCAL/index.html" | sed 's/.*\///;s/".*//' | head -1)
        local current_css=$(grep -oP 'href="[^"]*\.css"' "$DT_LOCAL/index.html" | sed 's/.*\///;s/".*//' | head -1)
        ssh $REMOTE_USER@$REMOTE_HOST "cd $DT_REMOTE/assets && for f in index-*.js; do if [ \"\$f\" != \"$current_js\" ]; then rm -f \"\$f\"; echo \"  Removed stale: \$f\"; fi; done; for f in index-*.css; do if [ \"\$f\" != \"$current_css\" ]; then rm -f \"\$f\"; echo \"  Removed stale: \$f\"; fi; done" 2>/dev/null
    fi

    log_info "Cleanup complete"
}

deploy_frontend() {
    build_and_sync_digital_twin
    deploy
}

deploy_backend() {
    log_info "Deploying backend to $REMOTE_HOST"

    local API_DIR="$PROJECT_ROOT/api"
    local REMOTE_API_DIR="/var/www/healora-api"

    if [ ! -d "$API_DIR" ]; then
        log_error "API directory not found: $API_DIR"
        return
    fi

    ssh $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_API_DIR && mkdir -p $REMOTE_API_DIR/backups/$(date +%Y%m%d_%H%M%S)"
    ssh $REMOTE_USER@$REMOTE_HOST "cp -r $REMOTE_API_DIR/* $REMOTE_API_DIR/backups/$(date +%Y%m%d_%H%M%S)/ 2>/dev/null; rm -rf $REMOTE_API_DIR/backups/*/backups 2>/dev/null; true"

    sync_files "$API_DIR" "$REMOTE_HOST" "$REMOTE_API_DIR" "node_modules"

    # Sync tools/ (knowledge pipeline: connectors, models, orchestrator)
    local TOOLS_DIR="$PROJECT_ROOT/tools"
    local REMOTE_TOOLS_DIR="/var/www/healora-api/tools"
    if [ -d "$TOOLS_DIR" ]; then
        ssh $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_TOOLS_DIR"
        sync_files "$TOOLS_DIR" "$REMOTE_HOST" "$REMOTE_TOOLS_DIR"
    fi

    ssh $REMOTE_USER@$REMOTE_HOST "bash -s" << 'ENDSSH'
cd /var/www/healora-api
npm install --production
echo "Backend deployed"
ENDSSH

    log_info "Backend deploy complete"
}

deploy_dev() {
    log_info "Deploying to dev.healora.ru"

    local DEV_REMOTE_ROOT="/var/www/dev.healora.ru"
    local DEV_REMOTE_DIR="/var/www/dev.healora.ru/digital-twin"
    local DEV_SRC="$PROJECT_ROOT/www/dev.healora.ru"
    local DEV_BUILD="$DEV_SRC/dist"

    # Если передан аргумент --skip-build, пропускаем сборку (используем уже собранное)
    if [ "${1:-}" != "--skip-build" ]; then
        build_and_sync_digital_twin
    fi

    log_info "Deploying digital-twin SPA to $DEV_REMOTE_DIR..."
    backup_remote "$DEV_REMOTE_DIR"
    sync_files "$DEV_BUILD" "$REMOTE_HOST" "$DEV_REMOTE_DIR"
    set_perms "$DEV_REMOTE_DIR"

    # Clean stale assets in remote digital-twin directory
    ssh $REMOTE_USER@$REMOTE_HOST "rm -f $DEV_REMOTE_DIR/assets/index-*.js $DEV_REMOTE_DIR/assets/index-*.css 2>/dev/null; true"
    sync_files "$DEV_BUILD" "$REMOTE_HOST" "$DEV_REMOTE_DIR"
    set_perms "$DEV_REMOTE_DIR"

    # Copy the built index.html to root so dev.healora.ru serves the same SPA
    log_info "Updating root index.html for dev.healora.ru..."
    ssh $REMOTE_USER@$REMOTE_HOST "cp $DEV_REMOTE_DIR/index.html $DEV_REMOTE_ROOT/index.html"

    log_info "Dev deployment complete"
    log_info "Visit: http://dev.healora.ru"
}

deploy_all() {
    log_info "Deploying to both prod and dev..."
    build_and_sync_digital_twin
    deploy
    deploy_dev --skip-build
    log_info "Full deploy complete: https://healora.ru + http://dev.healora.ru"
}

start_backend() {
    log_info "Starting backend server"

    ssh $REMOTE_USER@$REMOTE_HOST "bash -s" << 'ENDSSH'
cd /var/www/healora-api
pkill -f "node server.js" || true
nohup node server.js > server.log 2>&1 &
sleep 2
if pgrep -f "node server.js" > /dev/null; then
    echo "Backend started successfully"
else
    echo "Failed to start backend"
    cat server.log
fi
ENDSSH

    log_info "Backend startup complete"
}

check_status() {
    log_info "Checking server status..."
    ssh $REMOTE_USER@$REMOTE_HOST "bash -s" << 'ENDSSH'
echo "=== Nginx Status ==="
systemctl status nginx --no-pager | head -5

echo ""
echo "=== SSL Certificate ==="
certbot certificates 2>/dev/null || echo "SSL not configured"

echo ""
echo "=== Domain Response ==="
curl -sI https://healora.ru | head -5

echo ""
echo "=== Files ==="
ls -la /var/www/healora.ru | head -10
ENDSSH
}

git_pull() {
    log_info "Pulling latest changes..."
    cd "$PROJECT_ROOT"
    git pull
    log_info "Git pull complete"
}

git_commit() {
    log_info "Creating commit..."
    cd "$PROJECT_ROOT"
    git status
    echo ""
    read -p "Enter commit message: " msg
    if [ -n "$msg" ]; then
        git add -A
        git commit -m "$msg"
        log_info "Commit created"
    else
        log_error "Commit message cannot be empty"
    fi
}

git_push() {
    log_info "Pushing to remote..."
    cd "$PROJECT_ROOT"
    git push
    log_info "Git push complete"
}

start_ollama() {
    # Check if Ollama is already running
    if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
        log_info "Ollama уже запущен"
        return 0
    fi

    log_info "Запуск Ollama (BigPickle)..."
    # Try common install locations
    if command -v ollama &> /dev/null; then
        nohup ollama serve > "$PROJECT_ROOT/api/ollama.log" 2>&1 &
        sleep 3
        if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
            log_info "Ollama запущен"
            # Check if big-pickle model exists
            local has_model
            has_model=$(curl -s http://localhost:11434/api/tags | grep -o '"name":"[^"]*"' | grep -i "big-pickle\|bigpickle" || true)
            if [ -z "$has_model" ]; then
                log_warn "Модель big-pickle не найдена. Скачайте: ollama pull big-pickle"
            fi
        else
            log_error "Не удалось запустить Ollama"
            return 1
        fi
    else
        log_error "Ollama не установлена. Установите: winget install Ollama.Ollama"
        return 1
    fi
}

start_local() {
    log_info "Starting local development environment"
    
    # Detect OS for platform-specific commands
    local IS_WIN=false
    case "$(uname -s)" in
        CYGWIN*|MINGW*|MSYS*) IS_WIN=true ;;
    esac
    
    # Kill existing processes on API and Vite ports
    log_info "Cleaning up old processes..."
    for port in 3054 3051 3001; do
        local pids
        if $IS_WIN; then
            pids=$(netstat -ano 2>/dev/null | grep "LISTENING" | grep ":$port " | awk '{print $NF}' | sort -u)
        else
            pids=$(lsof -ti:$port 2>/dev/null)
        fi
        if [ -n "$pids" ]; then
            for pid in $pids; do
                taskkill //F //PID "$pid" 2>/dev/null && log_info "Killed PID $pid on port $port" || true
            done
        fi
    done
    sleep 2
    
    # Start Ollama if available
    start_ollama || true
    
    # Start backend
    log_info "Starting backend server"
    cd "$PROJECT_ROOT/api"
    if [ ! -d "node_modules" ]; then
        log_info "Installing backend dependencies..."
        npm install > /dev/null 2>&1
    fi
    local BG=""  # nohup for Linux (SSH), plain & for Windows
    $IS_WIN || BG="nohup "
    ${BG}node server.js > backend.log 2>&1 &
    BACKEND_PID=$!
    sleep 3
    if kill -0 $BACKEND_PID 2>/dev/null; then
        log_info "Backend started successfully (PID: $BACKEND_PID)"
    else
        log_error "Failed to start backend"
        cat backend.log
        return 1
    fi
    
    # Start frontend (Vite dev server) on port 3001
    log_info "Starting frontend development server on port 3001"
    cd "$PROJECT_ROOT/www/dev.healora.ru"
    if [ ! -d "node_modules" ]; then
        log_info "Installing frontend dependencies..."
        npm install > /dev/null 2>&1
    fi
    ${BG}npx vite --port 3001 --strictPort > frontend.log 2>&1 &
    FRONTEND_PID=$!
    sleep 5
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        log_info "Frontend dev server started successfully (PID: $FRONTEND_PID)"
        log_info "Open your browser at: http://localhost:3001"
    else
        log_error "Failed to start frontend dev server"
        cat frontend.log
        return 1
    fi
    
    # Get actual API port from .env or default
    local api_port=$(grep -oP 'PORT=\K\d+' "$PROJECT_ROOT/api/.env" 2>/dev/null || echo "3054")
    
    log_info "Local development environment is ready"
    log_info "Backend: http://localhost:$api_port"
    log_info "Frontend: http://localhost:3001"
    log_info "To stop servers, run: kill $BACKEND_PID $FRONTEND_PID"
}

# Main loop
while true; do
    show_menu
    case $choice in
        1) deploy_frontend; verify_deploy "$REMOTE_DIR" "index.html" "digital-twin/index.html" "images/pers/32_32/19_Danil_29_sofa_blue_jeanse.png" ;;
        2) deploy_dev; verify_deploy "/var/www/dev.healora.ru" "index.html" "digital-twin/index.html" "images/pers/32_32/19_Danil_29_sofa_blue_jeanse.png" ;;
        3) deploy_all ;;
        4) deploy_backend ;;
        5) config_nginx ;;
        6) setup_ssl ;;
        7) start_backend ;;
        8) check_status ;;
        9) cleanup_orphaned ;;
        10) git_pull ;;
        11) git_commit ;;
        12) git_push ;;
        13) start_local ;;
        14) start_ollama ;;
        0) exit 0 ;;
        *) log_error "Invalid option. Use 0-14" ;;
    esac
    echo ""
done
