# Deployment Guide (Linux Server)

## 1) Server prerequisites

- Ubuntu 22.04+ (or similar Linux)
- Node.js 20 LTS
- npm 10+
- Nginx
- PM2

Install:

```bash
sudo apt update
sudo apt install -y nginx curl git
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm i -g pm2
```

## 2) Upload project

```bash
cd /var/www
sudo git clone <YOUR_REPO_URL> crypto-exchange
sudo chown -R $USER:$USER /var/www/crypto-exchange
cd /var/www/crypto-exchange
```

## 3) Environment variables

```bash
cp .env.example .env.local
nano .env.local
```

Required:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Optional markups:

- `RATE_MARKUP_BTC`
- `RATE_MARKUP_ETH`
- `RATE_MARKUP_USDT`
- `RATE_MARKUP_LTC`
- `RATE_MARKUP_TRX`
- `RATE_MARKUP_BNB`

## 4) Build and start app

```bash
npm ci
npm run build
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Check:

```bash
pm2 status
curl -I http://127.0.0.1:3000
```

## 5) Nginx reverse proxy

Create `/etc/nginx/sites-available/crypto-exchange`:

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable:

```bash
sudo ln -s /etc/nginx/sites-available/crypto-exchange /etc/nginx/sites-enabled/crypto-exchange
sudo nginx -t
sudo systemctl reload nginx
```

## 6) Update deployment

```bash
cd /var/www/crypto-exchange
git pull
npm ci
npm run build
pm2 restart crypto-exchange
```

