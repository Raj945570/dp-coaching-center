<<<<<<< HEAD
# DP Coaching Center - MERN Platform

A premium coaching institute website and notes portal built on the MongoDB, Express, React (Vite), Node.js (MERN) stack. It includes a custom secure JWT authentication system, a student portal with notes & PYQs filtering, and a powerful admin dashboard featuring aggregated upload activity charts.

---

## Project Structure

- `/backend` - Node.js + Express API server, MongoDB connection, Cloudinary integration, and controllers.
- `/frontend` - React + Vite frontend client styled with modern Tailwind CSS and animated using Framer Motion.

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm
- MongoDB local instance or MongoDB Atlas URI
- Cloudinary Account (for hosting PDF study notes & board question papers)

### 1. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Fill in your MongoDB URI, JWT Secret, and Cloudinary API credentials.
4. (Optional) Seed the admin account:
   ```bash
   node seedAdmin.js
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   The API will run on `http://localhost:5000`.

### 2. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Start the frontend Vite development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## Production Deployment

### Frontend (Vercel)
The frontend is configured with a `vercel.json` rewrite file to support client-side SPA routing (`react-router-dom`) without 404 errors on browser page refreshes.

1. Install the Vercel CLI or import the repository on the Vercel Dashboard.
2. Set the build command to `npm run build` and output directory to `dist`.
3. Set the Environment Variable `VITE_API_URL` to point to your live backend domain.

### Backend (Render / Railway)
1. Deploy the `/backend` folder.
2. In your hosting environment settings, set the environment variables listed in `backend/.env.example`.
3. Configure `CLIENT_URL` to point to your live Vercel frontend URL to enable secure CORS requests.

---

## Verification & Testing Guide

1. **Authentication Flow**:
   - Verify that any unauthenticated access to `/` redirects straight to `/login`.
   - Log in using admin credentials to enter the admin panel.

2. **Aggregated Admin Dashboard**:
   - Navigate to `/admin/dashboard`.
   - Verify stats cards load real statistics dynamically.
   - Verify that the responsive SVG Upload Activity chart shows monthly upload bars correctly.
   - Verify that the Recent Uploads table lists the latest 5 documents correctly.

3. **Study Notes & PYQ Management**:
   - Try uploading a Note or PYQ from the respective admin pages.
   - Confirm PDF file limits (max 10MB) and mimetype validation work.
   - Check MongoDB and Cloudinary to verify that the file was stored and public IDs are logged.
   - Try deleting an item and verify it is removed from both MongoDB and Cloudinary storage.

4. **Student View Filter & Skeletons**:
   - Access student Notes and PYQs pages.
   - Verify that skeleton loading cards display while data fetches.
   - Test search queries, subject selectors, and class/year selectors.
=======
# dp-coaching-center
DP Coaching Center is a full-stack MERN coaching platform with Admin &amp; Student Authentication, PDF Notes Upload, PYQ Management, Cloudinary storage, MongoDB integration, JWT security, and responsive modern UI built using React.js, Node.js, Express.js, MongoDB, Tailwind CSS, and Cloudinary.
>>>>>>> d54a70b366ac004497629650fbef2a7cbcb7600e
