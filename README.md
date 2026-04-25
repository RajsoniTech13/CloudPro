<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

# CloudPro — Docker Practice Web App

> A practical full-stack cloud computing project with React front-end, Node.js backend, MongoDB, and Docker Compose orchestration.

---

## 📌 Overview

CloudPro is a sample cloud computing project built for hands-on Docker and container orchestration practice. It includes:

- React + TypeScript frontend powered by Vite
- Express.js backend with authentication, feedback, and blog data APIs
- MongoDB database service
- Docker Compose configuration for local multi-container deployment

---

## 🚀 Quick Start

### Prerequisites

- Docker Desktop
- Git
- Node.js (optional if you use Docker only)

### Run with Docker Compose

```bash
git clone https://github.com/YourUsername/CloudPro.git
cd CloudPro
docker-compose up --build
```

Open in browser:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080`

---

## 🧩 Project Structure

```text
CloudPro/
├── docker-compose.yml       # Compose service definitions
├── backend/                 # Node.js Express API
│   ├── models/              # Mongoose schemas
│   ├── package.json         # Backend dependencies + start script
│   └── server.js            # Main backend application
├── frontend/                # React + Vite frontend
│   ├── package.json         # Frontend dependencies + dev/build scripts
│   ├── public/              # Static assets
│   └── src/                 # React source code
└── README.md                # Project documentation
```

---

## 🛠️ Tech Stack

- Frontend: React 19, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose, bcryptjs, jsonwebtoken
- Database: MongoDB
- DevOps: Docker, Docker Compose

---

## 📦 Docker Setup

This repository uses `docker-compose.yml` to run three services:

- `frontend` → builds `./frontend`, exposes port `5173`
- `backend` → builds `./backend`, exposes port `8080`
- `mongo` → official MongoDB image, exposes port `27017`

### Start services

```bash
docker-compose up --build
```

### Stop and remove containers

```bash
docker-compose down
```

### Rebuild only changed services

```bash
docker-compose up --build backend frontend
```

---

## 🔧 Backend Environment

The backend reads these environment variables from local environment or container defaults.

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://mongo:27017/testdb` |
| `JWT_SECRET` | JSON Web Token secret | `devsecret` |
| `PORT` | Backend port | `8080` |

> The Compose setup uses the internal Mongo service name `mongo`, so `mongodb://mongo:27017/testdb` works inside the backend container.

---

## 🌐 API Endpoints

### Public endpoints

- `GET /api` — health check
- `POST /api/register` — register a new user
- `POST /api/login` — login and receive a JWT
- `POST /api/feedback` — submit feedback
- `GET /api/feedback` — get latest feedback items
- `GET /api/blogs` — retrieve blog posts
- `GET /api/about/docker` — Docker guide content
- `GET /api/aws/tutorials` — AWS tutorial links

### Authenticated endpoint

- `GET /api/me` — get current user profile (`Authorization: Bearer <token>`)

---

## 💡 Frontend Development

If you want to run the frontend locally without Docker:

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173`.

## 🖥 Backend Development

To run backend locally without Docker:

```bash
cd backend
npm install
npm start
```

By default, the backend listens on `http://localhost:8080`.

---

## ✅ Practical Notes

- Docker Compose is the recommended way to run this repository for the practical.
- Backend uses `mongo` service hostname; do not change it unless you update `MONGO_URI`.
- If `localhost:5173` does not load, wait a few seconds while containers finish starting.

---

## ⚠️ Troubleshooting

- `docker-compose up` fails with port conflict: verify nothing else uses `5173`, `8080`, or `27017`.
- `MongoDB connected` does not appear: check the `MONGO_URI` in the backend and confirm the `mongo` service is up.
- Login fails after registering: ensure the backend JWT secret is consistent between restarts.

---

## 📚 Useful Docker Commands

```bash
docker ps

docker-compose logs -f

docker-compose down --volumes

docker-compose exec backend sh
```

---

## 🙌 Contribution

This project is built as a cloud computing practical exercise. If you want to extend it, add:

- production build support for the frontend
- authentication refresh tokens
- protected routes in the frontend
- persistent volumes for MongoDB data

---

<p align="center">
  Built for Cloud Computing Docker practice.
</p>
