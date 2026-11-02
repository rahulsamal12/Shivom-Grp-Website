# Local Setup & Operation Guide: SHVM Project

This document provides complete instructions for running, configuring, and verifying the entire **SHVM** application locally on Windows without Docker or cloud deployment.

---

## 1. Project Architecture

The **SHVM** system is composed of three applications sharing a unified MongoDB database:

```text
SHVM Ecosystem
 ├── Backend API (server/)           : Express.js (Node.js ESM) on Port 5099
 ├── CMS Admin Panel (admin/)        : Vite + React 18 + Tailwind CSS on Port 5173
 └── Public Website (shivom-frontend): Next.js 16 (App Router) + React 19 on Port 3000
```

- **Database**: MongoDB Atlas Cluster (connection string configured in `server/.env`)
- **Storage Mode**: Local disk (`server/uploads/`) or Cloudinary
- **Authentication**: JWT Bearer token authentication with bcrypt password hashing
- **Multi-site Support**: Manages multiple website keys: `group`, `solar`, `concrete`, `enterprise`

---

## 2. Required Software & Local Environment

| Tool | Version Installed / Verified | Notes |
| :--- | :--- | :--- |
| **Node.js** | `v22.16.0` | Required for all three applications |
| **npm** | `10.8.1` | Dependency manager |
| **mongosh** | `2.3.2` | MongoDB CLI for direct DB inspection |
| **OS** | Windows 10/11 | Command Prompt / PowerShell compatible |

---

## 3. Local URLs & Port Allocations

| Component | Local URL | Port |
| :--- | :--- | :--- |
| **Frontend Website** | `http://localhost:3000` | `3000` |
| **Admin Panel** | `http://localhost:5173` | `5173` |
| **Backend Server** | `http://localhost:5099` | `5099` |
| **Backend API Base** | `http://localhost:5099/api` | `5099` |
| **API Health Check** | `http://localhost:5099/api/health` | `5099` |

---

## 4. Environment Variables Configuration

### A. Backend (`server/.env`)
```env
MONGO_URI=mongodb+srv://ami_user:Pabani7846@cluster0.anp0ak3.mongodb.net/Shivom
JWT_SECRET=your_strong_secret_here
PORT=5099
VITE_API_URL=http://localhost:5099/api
UPLOAD_MODE=local
PUBLIC_API_URL=http://localhost:5099
SUPER_ADMIN_EMAIL=admin@example.com
SUPER_ADMIN_PASSWORD=change_this_password
```

### B. Admin Panel (`admin/.env`)
```env
VITE_API_URL=http://localhost:5099/api
VITE_API_BASE_URL=http://localhost:5099/api
```

### C. Frontend Website (`shivom-frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5099
NEXT_PUBLIC_API_BASE_URL=http://localhost:5099/api
```

---

## 5. Dependency Installation & Database Seeding

All dependencies are installed in their respective subdirectories. If re-installation is needed:

```bash
# Backend dependencies
cd server
npm install

# Admin Panel dependencies
cd ../admin
npm install

# Frontend dependencies
cd ../shivom-frontend
npm install
```

### Database Seeding
To populate or restore default websites, admin user, sliders, and sample content:
```bash
cd server
npm run seed
```

**Default Super Admin Credentials**:
- **Email**: `admin@example.com`
- **Password**: `change_this_password`

---

## 6. Convenient Windows Startup Scripts

Three batch scripts have been placed in the root directory for one-click operation:

1. **`check-environment.bat`**
   - Validates Node.js, npm, mongosh versions.
   - Verifies all `.env` and `.env.local` configuration files exist.
   - Checks that all `node_modules` folders are present.
   - Verifies that ports `5099`, `5173`, and `3000` are free.

2. **`start-all.bat`**
   - Launches the Backend API on port `5099` in a dedicated command window (`npm run dev`).
   - Launches the Admin Panel on port `5173` in a dedicated command window (`npm run dev`).
   - Launches the Next.js Frontend on port `3000` in a dedicated command window (`npm run dev`).

3. **`stop-all.bat`**
   - Identifies and terminates processes occupying ports `5099`, `5173`, and `3000` cleanly.

---

## 7. Testing & Verification Results

### A. Backend & Postman API Collection
- **Health Endpoint**: `GET /api/health` returned `200 OK` (`status: "healthy"`).
- **Postman API Test Suite**: Executed `132 requests` and `151 test scripts` via Newman against `http://localhost:5099`.
- **Authentication**: `POST /api/admin/auth/login` verified with JWT token generation.
- **Admin Endpoints Tested**:
  - `GET /api/admin/dashboard`
  - `GET /api/admin/websites`
  - `GET`, `POST`, `PUT`, `DELETE` on Sliders, Pages, Projects, Testimonials, Events, Blogs, Awards, Team Members, and Solar Products/Promotions.
- **Public Endpoints Tested**:
  - `GET /api/public/group/home`
  - `GET /api/public/group/projects`
  - `GET /api/public/group/blogs`
  - `GET /api/public/group/careers`
  - `GET /api/public/solar/products`
  - `GET /api/public/solar/promotions/active`
- **Form Submission Test**:
  - Submitted `POST /api/public/group/contact` enquiry.
  - Verified enquiry was stored in DB and retrievable via `GET /api/admin/contacts?websiteKey=group`.

### B. Admin Panel
- Production build verified (`npx vite build` executed cleanly in 3.5s with zero errors).
- Local API routing configured to proxy to `http://localhost:5099/api`.

### C. Frontend Website
- Production build verified (`npx next build` compiled 49 static and dynamic routes cleanly).
- Configured dynamic fallback in `transformers.ts` to consume `process.env.NEXT_PUBLIC_API_URL` locally instead of pointing to production.

---

## 8. Summary of Identified Issues & Applied Fixes

1. **Missing `node_modules` in `shivom-frontend`**:
   - *Fix*: Ran clean `npm install` inside `shivom-frontend` preserving exact dependencies.
2. **Missing Frontend Local Configuration**:
   - *Fix*: Created `shivom-frontend/.env.local` defining `NEXT_PUBLIC_API_URL=http://localhost:5099`.
3. **Hardcoded Production Upload Domain in Frontend**:
   - *Fix*: Updated `shivom-frontend/src/lib/transformers.ts` to prioritize `process.env.NEXT_PUBLIC_API_URL` with fallback to `http://localhost:5099`.
4. **Admin Panel Pointing to Production Domain**:
   - *Fix*: Updated `admin/.env` from `https://apishivom.visital.co.in/api` to `http://localhost:5099/api`.
5. **Backend Public Origin Pointing to Production**:
   - *Fix*: Updated `server/.env` to configure `PUBLIC_API_URL=http://localhost:5099`.

