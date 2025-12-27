# HorizonLink

A real-time live location tracking platform with enterprise-grade features for individuals and organizations.

## 📁 Project Structure

```
horizonlink/
├── marketing_site_astro/    # Marketing website (Astro + Tailwind)
├── live-location-tracker/   # Backend services (NX Monorepo + NestJS)
│   ├── auth-service/            # Authentication & device pairing
│   ├── location-ingest-service/ # Location data ingestion
│   ├── location-worker-service/ # Location processing worker
│   ├── google-assistant-service/# Google Assistant integration
│   ├── android-sharer-app/      # Android sharer app
│   └── android-tv-app/          # Android TV receiver app
└── docs/                    # Documentation
```

---

## 🚀 Quick Start

### Marketing Site

```bash
cd marketing_site_astro
npm install
npm run dev      # Development server at http://localhost:4321
```

**Build for Production:**
```bash
npm run build    # Creates static files in ./dist
npm run preview  # Preview production build
```

---

### Backend Services (NX Monorepo)

```bash
cd live-location-tracker
npm install
```

**Run Individual Services:**
```bash
npx nx serve auth-service                 # Port 3000
npx nx serve location-ingest-service      # Port 3001
npx nx serve location-worker-service      # Port 3002
npx nx serve google-assistant-service     # Port 3003
```

**Build All Services:**
```bash
npx nx run-many -t build -p auth-service location-ingest-service location-worker-service google-assistant-service
```

---

## 🔌 API Endpoints

### Auth Service (Port 3000)

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | `/api`           | Health check             |
| POST   | `/pairing/code`  | Generate 6-digit pairing code |
| POST   | `/pairing/verify`| Verify code & link device |

**Generate Pairing Code:**
```bash
curl -X POST http://localhost:3000/pairing/code \
  -H "Content-Type: application/json" \
  -d '{"userId": "user123"}'
```

**Verify Pairing Code:**
```bash
curl -X POST http://localhost:3000/pairing/verify \
  -H "Content-Type: application/json" \
  -d '{"code": "123456", "deviceId": "tv-device-001"}'
```

### Location Ingest Service (Port 3001)

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| POST   | `/location`         | Submit location update   |
| GET    | `/location/:userId` | Get user's latest location |

**Submit Location:**
```bash
curl -X POST http://localhost:3001/location \
  -H "Content-Type: application/json" \
  -d '{"latitude": 12.9716, "longitude": 77.5946, "accuracy": 10}'
```

---

## ⚙️ Environment Variables

For production deployment, configure these environment variables:

```env
# Auth Service
COGNITO_USER_POOL_ID=your_cognito_pool_id
COGNITO_CLIENT_ID=your_client_id

# Location Services
AWS_REGION=us-east-1
SQS_QUEUE_URL=your_sqs_queue_url

# General
NODE_ENV=production
PORT=3000
```

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌──────────────────┐
│ Android Sharer  │────▶│ Location Ingest  │
│     App         │     │    Service       │
└─────────────────┘     └────────┬─────────┘
                                 │
                                 ▼
┌─────────────────┐     ┌──────────────────┐
│  Android TV     │◀────│ Location Worker  │
│     App         │     │    Service       │
└─────────────────┘     └──────────────────┘
        ▲
        │
┌───────┴─────────┐     ┌──────────────────┐
│ Google Assistant│◀────│ G.A. Service     │
└─────────────────┘     └──────────────────┘
```

---

## 📱 Mobile Apps

### Android Sharer App
Located in `live-location-tracker/android-sharer-app/`

```bash
# Open in Android Studio
cd live-location-tracker/android-sharer-app
./gradlew build
```

### Android TV App
Located in `live-location-tracker/android-tv-app/`

```bash
cd live-location-tracker/android-tv-app
./gradlew build
```

---

## 🧪 Development Commands

```bash
# Lint all projects
npx nx lint auth-service

# Type check
npx nx typecheck auth-service

# Run tests
npx nx test auth-service

# Visualize project graph
npx nx graph
```

---

## 📝 Tech Stack

| Component        | Technology          |
|------------------|---------------------|
| Marketing Site   | Astro 5, Tailwind CSS |
| Backend          | NestJS 11, TypeScript |
| Monorepo         | NX 22               |
| Auth             | AWS Cognito (JWT)   |
| Queue            | AWS SQS             |
| Mobile           | Kotlin, Jetpack Compose |

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
