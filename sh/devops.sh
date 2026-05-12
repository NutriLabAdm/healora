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

show_menu() {
    echo "=============================================="
    echo "  DevOps CI/CD - healora.ru (Beget)"
    echo "=============================================="
    echo ""
    echo "Server: $REMOTE_HOST"
    echo "Web Root: $REMOTE_DIR"
    echo "Local: $WEB_ROOT"
    echo ""
    echo "OPTIONS:"
    echo "  1) Config Nginx"
    echo "  2) Setup SSL"
    echo "  3) Deploy frontend"
    echo "  4) Deploy backend"
    echo "  5) Start backend"
    echo "  6) Status check"
    echo "  7) Git pull"
    echo "  8) Git commit"
    echo "  9) Git push"
    echo " 10) Deploy dev version (dev.healora.ru)"
    echo " 11) Start local development"
    echo "  0) Exit"
    echo ""
    read -p "Select option [0-11]: " choice
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

    root /var/www/healora.ru;
    index index.html index.htm;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
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
    log_info "Deploying to $REMOTE_HOST:$REMOTE_DIR"
    
    if [ ! -d "$WEB_ROOT" ]; then
        log_error "$WEB_ROOT not found"
        return
    fi
    
    ssh $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_DIR/backups/$(date +%Y%m%d_%H%M%S) && cp -r $REMOTE_DIR/* \$_ 2>/dev/null || true"
    
    if command -v rsync &> /dev/null; then
        rsync -avz --delete "$WEB_ROOT/" $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/
    else
        scp -r "$WEB_ROOT/"* $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/
    fi
    
    ssh $REMOTE_USER@$REMOTE_HOST "chown -R www-data:www-data $REMOTE_DIR && find $REMOTE_DIR -type f -exec chmod 644 {} \; && find $REMOTE_DIR -type d -exec chmod 755 {} \;"
    
    log_info "Deploy complete"
}

deploy_dev() {
    log_info "Deploying to dev.healora.ru"
    
    local DEV_REMOTE_DIR="/var/www/dev.healora.ru"
    local DEV_BUILD="$PROJECT_ROOT/www/dev.healora.ru/dist"
    
    # Build frontend
    log_info "Building frontend for dev.healora.ru..."
    cd "$PROJECT_ROOT/www/dev.healora.ru"
    npm run build
    
    if [ ! -d "$DEV_BUILD" ]; then
        log_error "Build directory not found: $DEV_BUILD"
        return 1
    fi
    
    # Create backup on remote
    ssh $REMOTE_USER@$REMOTE_HOST "mkdir -p $DEV_REMOTE_DIR/backups/$(date +%Y%m%d_%H%M%S) && cp -r $DEV_REMOTE_DIR/* \$_ 2>/dev/null || true"
    
    # Deploy using rsync or scp
    if command -v rsync &> /dev/null; then
        rsync -avz --delete "$DEV_BUILD/" $REMOTE_USER@$REMOTE_HOST:$DEV_REMOTE_DIR/
    else
        scp -r "$DEV_BUILD/"* $REMOTE_USER@$REMOTE_HOST:$DEV_REMOTE_DIR/
    fi
    
    # Set permissions
    ssh $REMOTE_USER@$REMOTE_HOST "chown -R www-data:www-data $DEV_REMOTE_DIR && find $DEV_REMOTE_DIR -type f -exec chmod 644 {} \; && find $DEV_REMOTE_DIR -type d -exec chmod 755 {} \;"
    
    log_info "Dev deployment complete"
    log_info "Visit: http://dev.healora.ru"
}

deploy_backend() {
    log_info "Deploying backend to $REMOTE_HOST"
    
    local API_DIR="$PROJECT_ROOT/api"
    local REMOTE_API_DIR="/var/www/healora-api"
    
    if [ ! -d "$API_DIR" ]; then
        log_error "API directory not found: $API_DIR"
        return
    fi
    
    ssh $REMOTE_USER@$REMOTE_HOST "bash -s" << 'ENDSSH'
mkdir -p /var/www/healora-api
cd /var/www/healora-api
mkdir -p backups/$(date +%Y%m%d_%H%M%S)
cp -r * backups/$(date +%Y%m%d_%H%M%S)/ 2>/dev/null || true
ENDSSH
    
    if command -v rsync &> /dev/null; then
        rsync -avz --exclude 'node_modules' --exclude '.env' "$API_DIR/" $REMOTE_USER@$REMOTE_HOST:$REMOTE_API_DIR/
    else
        scp -r "$API_DIR/"* $REMOTE_USER@$REMOTE_HOST:$REMOTE_API_DIR/
    fi
    
    ssh $REMOTE_USER@$REMOTE_HOST "bash -s" << 'ENDSSH'
cd /var/www/healora-api
npm install --production
echo "Backend deployed"
ENDSSH
    
    log_info "Backend deploy complete"
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

start_local() {
    log_info "Starting local development environment"
    
    # Start backend on port 3051
    log_info "Starting backend server on port 3051"
    cd "$PROJECT_ROOT/api"
    if [ ! -d "node_modules" ]; then
        log_info "Installing backend dependencies..."
        npm install > /dev/null 2>&1
    fi
    # Kill any existing process on port 3051
    fuser -k 3051/tcp 2>/dev/null || true
    sleep 1
    nohup node server.js > backend.log 2>&1 &
    BACKEND_PID=$!
    sleep 3
    if ps -p $BACKEND_PID > /dev/null; then
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
    # Kill any existing vite process
    pkill -f "vite" 2>/dev/null || true
    sleep 1
    nohup npm run dev > frontend.log 2>&1 &
    FRONTEND_PID=$!
    sleep 5
    
    # Check if Vite dev server is running
    if ps -p $FRONTEND_PID > /dev/null; then
        log_info "Frontend dev server started successfully (PID: $FRONTEND_PID)"
        log_info "Open your browser at: http://localhost:3001"
    else
        log_error "Failed to start frontend dev server"
        cat frontend.log
        return 1
    fi
    
    log_info "Local development environment is ready"
    log_info "Backend: http://localhost:3051"
    log_info "Frontend: http://localhost:3001"
    log_info "To stop servers, run: kill $BACKEND_PID $FRONTEND_PID"
    log_info "Or press Ctrl+C and then run: fuser -k 3051/tcp; pkill -f 'vite'"
}

# Main loop
while true; do
    show_menu
    case $choice in
        1) config_nginx ;;
        2) setup_ssl ;;
        3) deploy ;;
        4) deploy_backend ;;
        5) start_backend ;;
        6) check_status ;;
        7) git_pull ;;
        8) git_commit ;;
        9) git_push ;;
        10) deploy_dev ;;
        11) start_local ;;
        0) exit 0 ;;
        *) log_error "Invalid option" ;;
    esac
    echo ""
done
