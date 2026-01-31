🚀 FarmLokal Backend Assignment

A high-performance, production-style backend built with Node.js, TypeScript, MySQL, and Redis.
Designed to handle large datasets, external API failures, and real-world reliability challenges.

🧱 Tech Stack

Node.js + TypeScript — Type-safe backend

Express — Web framework

MySQL — Primary database (1M+ products)

Redis — Caching, rate limiting, token storage

OAuth2 (Client Credentials) — Machine authentication

Circuit Breaker Pattern — Resilience for external APIs

🔐 Authentication (OAuth2)

Implements OAuth2 Client Credentials flow.

Features

Fetches access tokens from OAuth provider

Tokens cached in Redis

Automatic refresh before expiry

Concurrency-safe (no duplicate token requests)
