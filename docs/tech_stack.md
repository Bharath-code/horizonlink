## Core Platform Stack

- **Mobile (Android sharer app):** Kotlin, Jetpack Compose (UI), WorkManager + Fused Location Provider, Retrofit for networking, Hilt DI, Play Billing 5.0, Firebase Crashlytics & Analytics.
- **Receiver Apps:**
  - Android/Google TV: Kotlin, Leanback/Compose for TV, WebSocket client, Google Maps Static SDK.
  - Voice Interfaces: Dialogflow CX for Google Assistant action; Alexa Skills Kit (Node.js Lambda) post-MVP.
- **Cross-Platform Utilities:** Kotlin Multiplatform shared models for mobile + TV where practical.

## Backend & Infrastructure

- **APIs:** Node.js (NestJS) or Kotlin (Ktor) microservices behind API Gateway; GraphQL façade for app clients; REST for devices.
- **Runtime & Hosting:** AWS (ECS Fargate) or GCP (Cloud Run) with IaC via Terraform; load balancer + WAF.
- **Data Storage:**
  - Redis (ElastiCache/Memorystore) for latest location cache.
  - Time-series DB (TimescaleDB on RDS or InfluxDB Cloud) for history.
  - PostgreSQL for auth, subscriptions, metadata.
- **Messaging:** Google Pub/Sub or AWS SNS/SQS for ingest pipeline; WebSocket broker (API Gateway WebSockets) for push.
- **External APIs:** Google Maps Directions & Geocoding, Firebase Cloud Messaging, Stripe Billing (web) + Play Billing.

## DevOps & Tooling

- **CI/CD:** GitHub Actions (lint, unit/E2E tests, infrastructure deploy). Canary releases via Play Console tracks.
- **Observability:** OpenTelemetry instrumentation, Grafana + Prometheus, Sentry for error tracking, CloudWatch/Stackdriver logs.
- **Security & Compliance:** AWS Cognito/Auth0 for identity, Vault/Secrets Manager, automated dependency scanning (Dependabot/Snyk), SOC2 readiness checklist.

## Front-of-House Systems

- **Marketing Site:** Next.js + Tailwind, hosted on Vercel/Netlify; integrates with Stripe Checkout and HubSpot CRM.
- **Customer Support:** Intercom in-app chat, Notion knowledge base, Zendesk ticketing (Phase 2).
- **Analytics & Growth:** Mixpanel for product analytics, Segment for event routing, Braze/Mailchimp for lifecycle campaigns.
