InkPainter

    Transform any image into a traditional Japanese sumi-e ink painting using AI.

A full-stack web application that combines AI image generation, asynchronous background processing, cloud storage, user authentication, and multilingual support.

---
✨ Features
🎨 AI-powered image transformation (Replicate FLUX Kontext Pro)
🖌️ Traditional Japanese sumi-e style conversion
👤 Guest mode (no login required)
🔐 Google OAuth authentication
🔄 Guest artwork migration after login
🖼️ Personal gallery
📥 Download transformed images
☁️ Cloudflare R2 image storage
⚡ Background image processing with BullMQ + Redis
🌐 English / Japanese language support
📱 Responsive interface
---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- CSS3
- Context API

### Backend

- Node
- Express
- PostgreSQL
- BullMQ
- Redis

### DataBase

-   PostgreSQL

### AI

-   Replicate API
-   FLUX Kontext Pro

### Cloud

-   Cloudflare R2

### Authentication

-   Passport.js
-   Google OAuth 2.0
-   Express Session
-   Redis Session Store

### Infrastructure

-   Docker
-   Nginx

---

## 📂 Project Structure

```
InkPainter
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── queues/
│   │   ├── routes/
│   │   ├── services/
│   │   └── workers/
│
├── nginx/
├── docs/
└── package.json
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/InkPainter.git
```

### Install dependencies

```bash
cd frontend
npm install
```

Backend

```bash
cd ../backend
npm install
```

### Configure environment variables

Create a `.env` file inside the backend directory.

Example:

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

### Run the application

Frontend

```bash
npm run dev
```

Backend

```bash
npm run dev
```

Worker

```bash
node src/workers/imageWorker.js
```

---

## 📌 Roadmap

- [x] Image upload
- [x] AI image transformation
- [x] Artwork gallery
- [x] Google Authentication
- [x] Guest mode
- [ ] Prompt customization
- [ ] Multiple art styles
- [ ] Docker deployment
- [ ] CI/CD pipeline

---

## 👨‍💻 Author

Created by oracle-vfts-352

Built as a learning project to explore modern full-stack development, cloud infrastructure, and AI-powered image generation.