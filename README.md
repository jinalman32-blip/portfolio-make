# PortfolioMaker - AI Portfolio Generator

A full-stack web app similar to cv2portfolio.in — dark SaaS UI with AI portfolio generation.

## Folder Structure

```
portfolio/
├── frontend/          # React + Vite + Tailwind CSS
│   └── src/
│       ├── components/
│       │   ├── Sidebar.jsx
│       │   ├── Card.jsx
│       │   ├── Header.jsx
│       │   ├── UploadModal.jsx
│       │   └── ParticleBackground.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── MyPortfolios.jsx
│       │   ├── Credits.jsx
│       │   ├── ProfileSettings.jsx
│       │   └── ReferEarn.jsx
│       └── App.jsx
└── backend/           # Node.js + Express + MongoDB
    ├── models/
    │   ├── User.js
    │   └── Portfolio.js
    ├── routes/
    │   ├── auth.js
    │   ├── upload.js
    │   └── portfolios.js
    ├── middleware/
    │   └── auth.js
    └── server.js
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

## Setup & Run

### 1. Backend

```bash
cd backend
npm install
# Edit .env → set your MONGO_URI and JWT_SECRET
npm run dev
# Runs on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

## API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login & get token |
| GET | /api/auth/profile | Yes | Get user profile |
| POST | /api/upload | Yes | Upload resume (PDF/DOCX) |
| GET | /api/portfolios | Yes | List my portfolios |
| POST | /api/portfolios | Yes | Create portfolio |
| GET | /api/portfolios/:id | Yes | Get one portfolio |
| PUT | /api/portfolios/:id | Yes | Update portfolio |
| DELETE | /api/portfolios/:id | Yes | Delete portfolio |

## Features

- Dark navy + neon cyan theme
- Animated particle star background
- Glassmorphism cards with hover glow
- JWT authentication
- Resume upload (PDF/DOCX, max 5MB)
- Credits system + referral program
- Fully responsive layout
