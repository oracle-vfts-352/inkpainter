🇺🇸 English | 🇯🇵 [日本語はこちら](README_JP.md)
# 🎨 InkPainter

> Transform ordinary images into beautiful traditional **Japanese Sumi-e (墨絵)** ink paintings using AI.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Redis](https://img.shields.io/badge/Redis-BullMQ-DC382D?logo=redis)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions)

InkPainter is a full-stack AI-powered web application that transforms uploaded images into traditional Japanese ink paintings using the **Replicate FLUX Kontext Pro** model.

The project demonstrates modern software engineering practices including asynchronous job processing, cloud object storage, authentication, Docker containerization, reverse proxying, ORM integration, and continuous integration.

---

# ✨ Features

- 🎨 AI-powered image transformation
- 🖌️ Traditional Japanese Sumi-e art generation
- 👤 Guest mode (no login required)
- 🔐 Google OAuth authentication
- 🔄 Guest artwork migration after login
- 🖼️ Personal artwork gallery
- 📥 Download generated images
- ☁️ Cloudflare R2 cloud storage
- ⚡ Background processing with BullMQ + Redis
- 🌐 English / Japanese language support
- 📱 Responsive user interface

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- CSS3
- Context API

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- BullMQ
- Redis

## AI

- Replicate API
- FLUX Kontext Pro

## Authentication

- Passport.js
- Google OAuth 2.0
- Express Session
- Redis Session Store

## Cloud

- Cloudflare R2

## Infrastructure

- Docker
- Docker Compose
- Nginx
- GitHub Actions CI

---

# 🏗 Architecture

```text
                    User
                     │
                     ▼
                 React (Vite)
                     │
                     ▼
                   Nginx
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
   Express API               Static Assets
        │
 ┌──────┴──────────────┐
 ▼                     ▼
PostgreSQL         Redis + BullMQ
   │                     │
   ▼                     ▼
Prisma ORM        Image Worker
                         │
                         ▼
                 Replicate AI API
                         │
                         ▼
                  Cloudflare R2
```

---

# 📂 Project Structure

```text
InkPainter
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── Dockerfile
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── queues/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── workers/
│   │   └── ...
│   ├── Dockerfile
│   └── Dockerfile.worker
│
├── nginx/
│   └── nginx.conf
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── docker-compose.yml
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/oracle-vfts-352/inkpainter.git

cd inkpainter
```

---

## Install Dependencies

### Backend

```bash
cd backend

npm install
```

### Frontend

```bash
cd ../frontend

npm install
```

---

# ⚙ Environment Variables

Create a `.env` file inside **backend/**

```env
DATABASE_URL=

SESSION_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

REDIS_HOST=
REDIS_PORT=

R2_ENDPOINT=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=

REPLICATE_API_TOKEN=
```

---

# ▶ Running Locally

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

Worker

```bash
node src/workers/imageWorker.js
```

---

# 🐳 Running with Docker

```bash
docker compose up --build
```

This starts

- PostgreSQL
- Redis
- Backend API
- BullMQ Worker
- React Frontend
- Nginx Reverse Proxy

---

# 🚀 Continuous Integration

GitHub Actions automatically verifies every push by

- Installing dependencies
- Generating Prisma Client
- Verifying backend syntax
- Building the frontend

This helps prevent broken commits from being merged.

---

# 📌 Roadmap

- [x] AI Image Generation
- [x] Google OAuth
- [x] Guest Mode
- [x] Guest Artwork Migration
- [x] Personal Gallery
- [x] Cloudflare R2 Storage
- [x] Background Workers (BullMQ)
- [x] Prisma ORM
- [x] Docker Support
- [x] Docker Compose
- [x] Nginx Reverse Proxy
- [x] GitHub Actions CI

---

# 📚 What I Learned

This project helped me gain practical experience with

- Full-stack web development
- AI API integration
- Background job processing
- Database design with Prisma ORM
- Docker containerization
- Reverse proxy configuration with Nginx
- Cloud object storage
- Authentication and session management
- GitHub Actions CI
- Production-oriented project architecture

---

# 👨‍💻 Author

**ORACLE (oracle-vfts-352)**

InkPainter was built as a portfolio project to explore modern full-stack software engineering, cloud infrastructure, asynchronous processing, and AI-powered image generation.

---

# 📄 License

This project is intended for educational and portfolio purposes.

## Project Status

✅ Completed

InkPainter is complete as a portfolio project and is no longer under active development. It will continue to serve as a demonstration of full-stack development, AI integration, cloud infrastructure, Docker, and CI/CD practices.