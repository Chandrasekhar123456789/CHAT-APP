# Simplified Chat App (Frontend + Backend)

This project contains:
- `backend/` - Node.js + Express mock API server (no DB).
- `frontend/` - React app (Create React App style) with Tailwind CSS.

## Quick start (local)

1. Backend:
   ```
   cd backend
   npm install
   npm start
   ```
   Server runs at http://localhost:4000

2. Frontend:
   ```
   cd frontend
   npm install
   npm start
   ```
   App runs at http://localhost:3000

The frontend expects the backend at http://localhost:4000. The demo implements:
- Sessions list (sidebar), New Chat button (generates session and navigates).
- Chat view with messages, answers that include a table + description.
- Like/Dislike buttons (client-only alert for demo).
- Light/Dark theme toggle.
- Tailwind CSS (dev dependencies included). After npm install follow Tailwind setup if required.

Notes:
- This is a lightweight starter scaffold satisfying the assignment requirements. You can extend the backend to persist feedback, add better animations, or convert to Vite/CRA fully.
Published Link:https://chat-app-umber-eight-68.vercel.app/
