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
    echo "  3) Deploy"
    echo "  4) Status check"
    echo "  5) Git pull"
    echo "  6) Exit"
    echo ""
    read -p "Select option [1-6]: " choice
}

config_nginx() {
    log_info "Configuring Nginx for $DOMAIN"
    ssh $REMOTE_USER@$REMOTE_HOST << 'EOF'
mkdir -p /var/www/healora.ru
chown -R www-data:www-data /var/www/healora.ru
chmod -R 755 /var/www/healora.ru

cat > /etc/nginx/sites-available/healora << 'NGINX'
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
}
NGINX

ln -sf /etc/nginx/sites-available/healora /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
echo "Nginx configured"
EOF
    log_info "Nginx config complete"
}

setup_ssl() {
    log_info "Setting up SSL for $DOMAIN"
    read -p "Enter email for SSL: " SSL_EMAIL
    ssl_email="${SSL_EMAIL:-admin@healora.ru}"
    
    ssh $REMOTE_USER@$REMOTE_HOST << EOF
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email $ssl_email
systemctl reload nginx
echo "SSL configured"
EOF
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

check_status() {
    log_info "Checking server status..."
    ssh $REMOTE_USER@$REMOTE_HOST << 'EOF'
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
EOF
}

git_pull() {
    log_info "Git pull deployment"
    read -p "GitHub repo URL: " REPO_URL
    read -p "Branch [main]: " BRANCH
    branch="${BRANCH:-main}"
    
    ssh $REMOTE_USER@$REMOTE_HOST << EOF
cd $REMOTE_DIR
git init 2>/dev/null || true
git remote add origin $REPO_URL 2>/dev/null || true
git fetch origin
git reset --hard origin/$branch
chown -R www-data:www-data .
EOF
    log_info "Git pull complete"
}

show_menu
case $choice in
    1) config_nginx ;;
    2) setup_ssl ;;
    3) deploy ;;
    4) check_status ;;
    5) git_pull ;;
    6) exit 0 ;;
    *) log_error "Invalid option" ;;
esac