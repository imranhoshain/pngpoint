#!/bin/bash
set -e

# ==========================
# Load environment variables safely
# ==========================
set -a
source backend/.env.prod
set +a

echo "📦 Step 1: Build Docker images..."
docker-compose -f docker-compose.prod.yml build

echo "🚀 Step 2: Start containers..."
docker-compose -f docker-compose.prod.yml up -d

echo "📂 Step 3: Run database migrations..."
# Generate new migrations (if any)
docker-compose -f docker-compose.prod.yml exec backend python manage.py makemigrations --noinput

docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate

echo "📂 Step 4: Collect static files..."
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput

echo "🔍 Step 5: Validate Nginx configuration..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -t

echo "🔁 Step 6: Reload Nginx gracefully..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload

echo "✅ Production deployment completed successfully!"
