# PNGPoint

PNGPoint is a full-stack platform for curating, moderating, and serving transparent PNG assets. It combines a public-facing catalog powered by Next.js with a Django REST backend, Cloudflare Images storage, Redis-backed caching, Celery workers, and role-aware dashboards for administrators and contributors.

## Overview
- **Frontend** – Next.js 15 (App Router, React 19, TypeScript, Tailwind CSS 4) renders the marketing site, catalog, and dashboards. Redux Toolkit + RTK Query coordinate state, authentication, and API calls. Components sprinkle structured JSON-LD metadata, social previews, pagination, dropzones, and toast notifications for a polished UX.
- **Backend** – Django 5 + Django REST Framework expose `/api/v1` endpoints secured with SimpleJWT. A custom `User` model supports admin/user roles (only one admin can exist), Cloudflare API credentials live in `configuration.CloudflareConfig`, and the `images` app manages categories, sub-categories, keywords, and PNG metadata.
- **Workers & Infra** – Celery workers offload bulk uploads and Cloudflare cleanup, Redis backs Celery and request caching, PostgreSQL serves production data (SQLite in dev), and Nginx terminates TLS before proxying Next.js and Daphne.

### Why PNGPoint?
- **Searchable catalog** – Visitors can search by title, keyword, category, slugified tags, or curated trending keywords, and every detail page exposes download actions, dimensions, SEO metadata, and related assets.
- **Contributor workflow** – Contributors log in, upload via drag-and-drop batches (metadata auto-extracted with `exifr`), monitor status counts, edit keywords/categories from a sidebar editor, import metadata via CSV, and download consolidated stats.
- **Admin control** – Admins get everything contributors do plus user management (block/unblock, download counts), category/sub-category CRUD with inline previews, Cloudflare configuration management, bulk moderation tools, and total platform metrics.
- **Deployment ready** – Docker Compose files, production-ready Nginx config, Celery workers, Redis, and a deployment helper script (`deploy.prod.sh`) make it easy to ship.

## Feature Highlights
### Public catalog
- Hero search with schema.org `SearchAction` metadata, trending image grid, trending tags, category and sub-category landing pages, and infinite browse via `react-responsive-pagination`.
- Dedicated routes for `/image/[slug]` (single image, related results), `/categories`, `/sub-categories`, `/about`, `/contact`, `/terms`, `/privacy`, `/license`, `/forgot-password`, and `/confirm-password/[uid]/[token]`.
- JSON-LD structured data for search, related, and trending grids plus full Open Graph/Twitter metadata per page.

### Contributor experience
- JWT login (`/user/login`) persists auth in localStorage; `useAuthCheck` rehydrates on refresh.
- Upload screen uses `react-dropzone`, `p-limit`, and `exifr` to queue PNG uploads in batches of 10, auto fill metadata, monitor success/failure states, and throttle requests.
- Dashboard cards highlight totals per status; sidebar editor (`SelectedImageSidebar`) lets contributors update titles/descriptions/keywords, move images across categories/sub-categories, request status changes, or delete assets in bulk.
- Personal stats routes under `/dashboard/contributor/[username]/*` for total, pending, approved, rejected, uploads, profile, change-password, and download counts.

### Admin & operations
- Additional dashboard panels for total downloads (`/images/all-download/`), user listings (with block/unblock toggles and download tallies), category & sub-category CRUD modals, CSV metadata import, and Cloudflare credential management.
- APIs enforce role-based permissions: public endpoints are read-only, contributor endpoints require a JWT, and admin routes require the `admin` role via `IsAdminUser`.
- CSV metadata updates (`CSVFileView`) allow bulk editing of titles/categories/keywords when wired to `/api/v1/images/upload/csv/`.

### Platform services
- Cloudflare Images integration uploads and deletes PNGs, retries until variants exist, and stores `cloudflare_id`/URL per image. Download counts increment through `/images/download/<cloudflare_id>/`.
- Celery tasks (see `tasks/upload_images_task.py`) support async batch uploads and Cloudflare deletion jobs triggered through the backend.
- Redis cache stores frequently requested lists (approved/pending/rejected/total) with helper utilities to wipe per-status keys when moderation changes happen.
- Next.js Incremental Static Regeneration is manually invalidated via `POST /api/revalidate` using `REVALIDATE_SECRET`; Django can call `core.utils.trigger_nextjs_revalidate`.

## Architecture & Stack
```
Next.js 15 (App Router, Redux, Tailwind)  <--->  Django 5 + DRF + SimpleJWT
            |                                                 |
            |                                     Celery workers + Redis
            |                                                 |
         Browser <-- Nginx (SSL, static/media) --> Daphne ASGI + PostgreSQL
                                                         |
                                             Cloudflare Images storage
```
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS 4, Redux Toolkit, RTK Query, React Hook Form, react-dropzone, exifr, react-responsive-pagination, react-toastify, next-sitemap.
- **Backend**: Django 5.2, Django REST Framework, SimpleJWT, django-filters, django-redis, Celery 5, Redis, PostgreSQL (prod) / SQLite (dev), drf-spectacular + schema viewer, requests, Pillow, phonenumbers.
- **Infra**: Docker Compose (dev & prod), Nginx with Let's Encrypt volumes, Daphne ASGI server, Redis 7, Celery workers, Deploy script orchestrating builds/migrations/static collection.

## Domain Model
| Model | Description |
| --- | --- |
| `accounts.User` | Custom auth model (email login, slug, gender, role). Only one admin allowed. Tracks avatar, phone, activity flags, and download stats aggregation. |
| `images.Categories` & `SubCategories` | Read-only to the public, admin-editable via API/UI. Each has an icon, slug, timestamps, and relationships (sub-categories belong to categories). |
| `images.Keywords` | Unique slugified keywords attached to images (M2M). |
| `images.Images` | Core metadata for PNG assets: title/slug, description, Cloudflare IDs/URLs, status (`pending`, `approved`, `rejected`), download count, category/sub-category FKs, keywords, and uploader reference. |
| `configuration.CloudflareConfig` | Stores API token, account ID/hash, image domain, and email. Only one record exists at a time and is editable through the dashboard/API. |

## API Surface (Base URL: `/api/v1`)
- **Auth**
  - `POST /accounts/user/register/`
  - `POST /accounts/user/login/`
  - `POST /accounts/admin/login/`
  - `GET /accounts/user/profile/` & `PATCH /accounts/user/profile/update/`
  - `POST /accounts/user/password/change/`
  - `POST /accounts/user/forgot-password/`, `POST /accounts/user/reset-password/<uid>/<token>/`
  - `GET /accounts/users-list/`, `PATCH /accounts/user/admin/update/<id>/`
  - `GET /accounts/user/download-count/`
  - `POST /token/refresh/`, `POST /token/verify/`
- **Images & catalog**
  - `POST /images/upload/` (multipart, png-only, requires JWT)
  - `GET /images/approved/`, `/pending/`, `/rejected/`, `/total/` with optional `title`, `keyword`, `category`, `page` filters
  - `GET /images/user/<status>/…` mirrors the above but scoped to the logged-in contributor
  - `GET /images/approved-images-length/` (admin) and analogous endpoints for each status + contributor counts
  - `GET /images/<slug>/` returns single image plus related assets
  - `GET /images/download/<cloudflare_id>/` streams PNGs and increments download counts
  - `DELETE /images/delete/<id>/`, `POST /images/deletes/` for bulk deletion, `DELETE /images/delete-all/` for global cleanup
  - `PUT /images/update/<id>/`, `PUT /images/bulk-update/` for moderation/category updates
  - `GET/POST /images/categories/` (+ `/<slug>/`, `/<id>/` for admin CRUD)
  - `GET/POST /images/sub-categories/` (+ detail routes)
  - `GET /images/keywords/` returns latest 20 unique keywords
  - `POST /images/upload/csv/` *(wire `CSVFileView` in `api/images/urls.py` to enable the CSV metadata uploader used in the frontend)*
- **Configuration**
  - `GET/POST /configuration/cloudflare/config/`
- **Docs & utilities**
  - `/schema/`, `/schema/swagger-ui/`, `/schema/redoc/`, `/database-design/` (dev only)
- All protected endpoints expect `Authorization: Bearer <access_token>` headers issued by the login endpoint (SimpleJWT).

## Frontend Routes & Screens
- `/` – Hero search, trending images, tags, footer.
- `/categories`, `/categories/[slug]`
- `/sub-categories`, `/sub-categories/[slug]`
- `/image/[slug]` – main image, related results, download CTA.
- `/user/login`, `/user/register`, `/forgot-password`, `/password-change-successful`, `/confirm-password/[uid]/[token]`.
- `/about`, `/contact`, `/terms`, `/privacy`, `/license`.
- Dashboards:
  - `/dashboard/admin/[username]/` + nested routes (`upload-images`, `total-images`, `approved-images`, `pending-images`, `rejected-images`, `categories`, `sub-categories`, `users`, `profile`, `chnage-password`, `cloudflare-configuration`).
  - `/dashboard/contributor/[username]/` + analogous nested routes without user/cloudflare admin.

## Getting Started
### Prerequisites
- Node.js 18+ (project uses Node 22 in Docker images).
- Python 3.12.
- Docker / Docker Compose (optional but recommended).
- Redis 7 (if running services without Docker).

### Environment variables
Create `.env.dev`/`.env.prod` inside `backend/` and `.env.local` inside `frontend/`.

**Backend (`backend/.env.dev`/`.env.prod`):**
| Variable | Description |
| --- | --- |
| `DJANGO_SETTINGS_MODULE` | `app.settings.dev` for local dev, `app.settings.prod` for production. |
| `DJANGO_SECRET_KEY` | Secret key for Django. |
| `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_SSLMODE` | Required when using PostgreSQL/production. |
| `CELERY_BROKER_URL`, `CELERY_RESULT_BACKEND` | Redis URLs (e.g., `redis://redis:6379/0`). |
| `FRONTEND_DOMAIN` | Base URL used in password reset emails (e.g., `http://localhost:3000`). |
| `NEXTJS_URL` | URL to the Next.js app so the backend can trigger ISR (e.g., `http://localhost:3000`). |
| `REVALIDATE_SECRET` | Shared secret with Next.js `/api/revalidate`. |
| `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, `EMAIL_HOST`, `EMAIL_PORT` | SMTP credentials for forgot-password emails. |

**Frontend (`frontend/.env.local`):**
| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SERVER_URL` | Base API URL (e.g., `http://localhost:8000/api/v1`). |
| `NEXT_PUBLIC_MEDIA_URL` | Base media URL (e.g., `http://localhost:8000`). |
| `REVALIDATE_SECRET` | Must match backend `REVALIDATE_SECRET` if you trigger ISR from the frontend route. |

> Tip: `frontend/utils/api.ts` currently hardcodes production URLs. Uncomment the environment variable exports at the top of that file for local development.

### Run everything with Docker (recommended)
```bash
# Development stack (Next.js + Django run hot reloaders, Redis, Celery)
docker compose -f docker-compose.dev.yml up --build

# Tear down
docker compose -f docker-compose.dev.yml down
```
- Frontend runs on http://localhost:3000.
- Backend API runs on http://localhost:8000 (`/api/v1`).
- Redis is exposed on port 6379.

### Manual local setup
1. **Redis** – start `redis-server` locally or via Docker (`docker run --rm -p 6379:6379 redis:7-alpine`).
2. **Backend**
   ```bash
   cd backend
   python -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   export DJANGO_SETTINGS_MODULE=app.settings.dev
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver 0.0.0.0:8000
   ```
3. **Celery worker**
   ```bash
   cd backend
   source .venv/bin/activate
   celery -A app worker --loglevel=info
   ```
4. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Cloudflare workflow
1. Obtain Cloudflare Images API token, account ID, account hash, and custom domain.
2. Authenticate as admin and open `/dashboard/admin/<username>/cloudflare-configuration/`.
3. Submit the form (fields map directly to `CloudflareConfig`). Only one record exists; updating replaces previous credentials.
4. Upload PNGs via `/dashboard/<role>/<username>/upload-images/`. The backend enforces PNG-only uploads, max 10 MB size (see `core.utils.VALIDATE_IMAGE_SIZE`), and tries to generate unique titles/slugs before saving to Cloudflare.
5. Approved assets appear publicly once admin status changes propagate. If you rely on Next.js ISR caches, call `trigger_nextjs_revalidate("/categories")` or hit `POST /api/revalidate` with `{ secret, path }`.

### CSV metadata import
- The React dashboard calls `POST /api/v1/images/upload/csv/` with a CSV file containing `Filename`, `Title`, `Category`, and `Keywords`.
- Wire `CSVFileView` into `api/images/urls.py` if it is not already exposed.
- The importer finds images by `name`, updates title/category, and creates keywords if missing.

### Cache & revalidation
- Redis keys follow `pngpoint:<status>:*`. Call `core.utils.clear_images_cache_by_status("approved")` (or pending/rejected/total) after bulk moderation to evict stale entries.
- `core.utils.trigger_nextjs_revalidate` posts to `NEXTJS_URL/api/revalidate` with `REVALIDATE_SECRET` to bust cached Next.js routes (e.g., categories landing pages).

## Deployment
1. Populate `backend/.env.prod` and `frontend/.env.local` with production values.
2. Ensure `/etc/letsencrypt` contains your TLS certs – `nginx/default.conf` mounts it read-only.
3. Run the helper script:
   ```bash
   chmod +x deploy.prod.sh
   ./deploy.prod.sh
   ```
   The script builds Docker images, runs `docker-compose.prod.yml`, executes migrations, collects static files, validates Nginx config, and reloads Nginx.
4. Services included in the production stack:
   - `frontend` – Next.js build served via `npm run start`.
   - `backend` – Daphne ASGI server exposing port 8000.
   - `celery` – Worker with `--concurrency=4`.
   - `redis` – Message broker/cache.
   - `nginx` – Terminates HTTPS, proxies `/` to `frontend:3000`, `/api/` to `backend:8000`, and serves `/static/` + `/media/` from bind mounts.

## Testing & Quality
- **Backend**: `python manage.py test` (test suites are scaffolds; add coverage for accounts/images as you extend the platform).
- **Frontend**: `npm run lint` leverages `eslint-config-next`.
- Consider adding integration tests (e.g., Cypress or Playwright) for dashboard flows and pytest-based API suites for uploads/moderation.

## Project Layout
```
pngpoint/
├── backend/                 # Django project (accounts, images, configuration, Celery tasks)
│   ├── app/                 # Settings (base/dev/prod), URLs, ASGI/WSGI, celery config
│   ├── api/                 # DRF viewsets/serializers grouped by feature
│   ├── accounts/            # Custom user model, services, validators, docs
│   ├── images/              # Models, filters, services (Cloudflare, CSV, pagination), docs, migrations
│   ├── configuration/       # Cloudflare config model + utils
│   ├── core/                # Shared utils (validation, caching, revalidation helpers)
│   ├── media/               # Sample category/sub-category/user images
│   ├── tasks/               # Celery batch upload tasks
│   └── requirements/        # (Optional) split requirements placeholders
├── frontend/                # Next.js app (App Router)
│   ├── app/                 # Route handlers (pages, API revalidate route, layouts)
│   ├── components/          # UI, dashboard widgets, forms, popups, SEO blocks
│   ├── redux/               # Store, slices, RTK Query APIs
│   ├── utils/               # API helpers, menus, search schema, icon registry
│   ├── hooks/               # Auth helpers
│   └── public/              # Logos, favicons, sitemap, robots.txt
├── nginx/default.conf       # TLS + proxy configuration
├── docker-compose.dev.yml   # Dev stack (frontend, backend, celery, redis)
├── docker-compose.prod.yml  # Prod stack (frontend, backend, celery, redis, nginx)
├── deploy.prod.sh           # Helper script to build/start/migrate/collectstatic
└── requirements.txt         # Backend dependency lock (pip)
```

## Operational Notes & Next Steps
- **Secrets**: Move hard-coded email credentials out of `app/settings/base.py` and load them from environment variables before production.
- **CSV endpoint**: Ensure `CSVFileView` is mapped inside `api/images/urls.py` so the dashboard’s CSV import button hits a valid route.
- **Next.js envs**: Switch `frontend/utils/api.ts` to consume `NEXT_PUBLIC_*` variables when working locally; do not commit prod secrets.
- **Media limits**: `core.utils.VALIDATE_IMAGE_SIZE` caps uploads at 10 MB and `VALIDATE_IMAGE_DIMENSIONS` expects PNGs between 2000×2000 and 10,000×10,000 px. Adjust these helpers as requirements change.
- **ISR**: Anytime you mutate categories/sub-categories or approve batches programmatically, trigger both Redis cache invalidation and Next.js revalidation to avoid stale content.
- **Testing debt**: Test suites are stubs. Add unit tests around upload/mode ration workflows and Cypress/Playwright specs for dashboards to prevent regressions.

Happy building! Let contributors focus on art while PNGPoint keeps ingestion, moderation, and delivery humming. 💠
