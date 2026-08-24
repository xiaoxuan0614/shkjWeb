server {
    listen 80;
    server_name www.shouhuikeji.com;

    location ^~ /.well-known/acme-challenge/ {
        root /opt/apps/gateway/acme-challenge;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name www.shouhuikeji.com;

    ssl_certificate     /etc/nginx/certs/www.shouhuikeji.com_ecc/fullchain.cer;
    ssl_certificate_key /etc/nginx/certs/www.shouhuikeji.com_ecc/www.shouhuikeji.com.key;

    root /opt/apps/website/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /uploads/ {
        alias /opt/apps/website/uploads/;
    }

    location /api/ {
        resolver 127.0.0.11 valid=10s;
        set $backend http://website-backend:8080;
        proxy_pass $backend;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}