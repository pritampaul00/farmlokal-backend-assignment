# 🚀 FarmLokal Backend Assignment

A production-style backend system built with **Node.js, TypeScript, MySQL, and Redis**, focused on **performance, reliability, and scalability**.

---

## 🧱 Tech Stack

- **Node.js + Express** – REST API server  
- **TypeScript** – Type safety and maintainability  
- **MySQL** – Primary database (1M+ product records)  
- **Redis** – Caching, token storage, rate limiting, idempotency  
- **Auth0 OAuth2** – Client Credentials authentication  

---

## 🔐 Authentication (OAuth2 Client Credentials)

**Implemented OAuth2 Client Credentials flow using Auth0.**

### Features
- Fetches access token from OAuth provider
- Token cached in Redis with expiry buffer
- Automatic token refresh
- Concurrency-safe token fetching (no duplicate requests)

**Endpoint for testing**

GET /auth/test-token

---

## 🌐 External API Integrations

### API A – Synchronous Integration
- Timeout handling (2s)
- Retry with exponential backoff
- Circuit breaker pattern using `opossum`
- Graceful fallback response when API is unavailable

**Test endpoint**

GET /external/test-api-a

---

### API B – Webhook-Based Integration
- Callback endpoint for async updates
- Idempotency using Redis (prevents duplicate processing)
- Safe retries

**Webhook endpoint**

POST /webhook

---

## 🛍 Product Listing API (Performance Critical)

GET /products


### Features
- Cursor-based pagination
- Sorting (`price`, `name`, `createdAt`)
- Full-text search (`name`, `description`)
- Filters (category, price range)
- Supports 1M+ records efficiently

### Performance Optimizations
- Indexed MySQL queries
- FULLTEXT search index
- Redis query caching (60s TTL)
- Request deduplication (prevents duplicate DB hits)
- Connection pooling

**Example Queries**

| Feature | Example |
|--------|---------|
| Pagination | `/products?cursor=1000&limit=20` |
| Sorting | `/products?sort=price&order=ASC` |
| Filtering | `/products?category=sports&minPrice=100` |
| Search | `/products?search=ball` |

---

## ⚡ Reliability & Resilience

| Mechanism | Purpose |
|-----------|---------|
| Redis caching | Reduces DB load |
| Rate limiting | Prevents abuse |
| Circuit breaker | Prevents cascading failures |
| Retry logic | Handles transient API errors |
| Request deduplication | Avoids duplicate DB queries |
| Idempotent webhooks | Safe event handling |

---

## 📊 Observability

**Metrics endpoint**

GET /metrics


Provides:
- Uptime
- Total requests
- Product API requests
- Memory usage

**Health check**

GET /health


---

## 🧠 Caching Strategy

- Product list responses cached in Redis for **60 seconds**
- Cache keys based on full query parameters
- Cache invalidation occurs via TTL expiry
- Future product update APIs would clear related cache keys (`products:*`)

---

## 🗄 Database Setup

### Create database
```sql
CREATE DATABASE products_db;
USE products_db;
```
### Products Table
Includes indexes on:

- category
- price
- createdAt
- FULLTEXT index on name, description
---

## 🌱 Seed 1 Million Products
**Uses Faker to generate realistic product data.**
```
npm run seed
```
---
## ⚙️ Setup Instructions
**1️⃣ Install dependencies**
```
npm install
```

**2️⃣ Configure environment variables**

Create .env

```
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=products_db

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

OAUTH_TOKEN_URL=...
OAUTH_CLIENT_ID=...
OAUTH_CLIENT_SECRET=...
OAUTH_AUDIENCE=...
```

**3️⃣ Start services**

Make sure MySQL and Redis are running.

**4️⃣ Run server**
```sql
npm run dev
```
---

## 📈 Load Testing

A k6 load test script is included to validate performance.

**Target: P95 latency < 200ms**

---

## ⚖️ Trade-offs

- Short cache TTL favors performance over real-time freshness
- Simulated dataset used for scale testing
- External APIs mocked for reliability testing

---

## 🌍 Deployment

Backend deployed on Render.
