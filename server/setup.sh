#!/bin/bash
# ==============================================
# Настройка VPS для статического блога Даталог
# Запускать от root на Ubuntu 24.04
# ==============================================

set -e

DOMAIN="datalog-blog.ru"
DEPLOY_USER="deploy"
WEB_ROOT="/var/www/datalog"

echo "=== 1. Обновление системы ==="
apt update && apt upgrade -y

echo "=== 2. Установка nginx и certbot ==="
apt install -y nginx certbot python3-certbot-nginx

echo "=== 3. Создание пользователя deploy ==="
if ! id "$DEPLOY_USER" &>/dev/null; then
    adduser --disabled-password --gecos "" $DEPLOY_USER
    mkdir -p /home/$DEPLOY_USER/.ssh
    chmod 700 /home/$DEPLOY_USER/.ssh
    touch /home/$DEPLOY_USER/.ssh/authorized_keys
    chmod 600 /home/$DEPLOY_USER/.ssh/authorized_keys
    chown -R $DEPLOY_USER:$DEPLOY_USER /home/$DEPLOY_USER/.ssh
    echo ">>> Пользователь deploy создан"
else
    echo ">>> Пользователь deploy уже существует"
fi

echo "=== 4. Создание директории сайта ==="
mkdir -p $WEB_ROOT
chown -R $DEPLOY_USER:$DEPLOY_USER $WEB_ROOT

# Временная заглушка
echo "<h1>datalog-blog.ru — скоро здесь будет блог</h1>" > $WEB_ROOT/index.html
chown $DEPLOY_USER:$DEPLOY_USER $WEB_ROOT/index.html

echo "=== 5. Настройка nginx ==="
cat > /etc/nginx/sites-available/$DOMAIN << 'NGINX'
server {
    listen 80;
    server_name datalog-blog.ru www.datalog-blog.ru;

    root /var/www/datalog;
    index index.html;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 256;
    gzip_types text/html text/css text/javascript application/javascript application/json application/xml image/svg+xml font/woff2;

    # Static assets — long cache
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|webp|avif)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location ~* \.html$ {
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }

    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    error_page 404 /404.html;
}
NGINX

ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "=== 6. Настройка firewall ==="
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "=== 7. SSL сертификат (Let's Encrypt) ==="
echo ">>> Убедись что DNS A-запись указывает на этот сервер!"
echo ">>> Запусти вручную после настройки DNS:"
echo "    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m your@email.com"

echo ""
echo "============================================"
echo "  Сервер готов!"
echo "  Осталось:"
echo "  1. Настроить DNS: A-запись $DOMAIN → $(curl -s ifconfig.me)"
echo "  2. Добавить SSH-ключ deploy: /home/$DEPLOY_USER/.ssh/authorized_keys"
echo "  3. Выпустить SSL: certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "============================================"
