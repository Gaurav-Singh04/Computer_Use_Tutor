# Google Calendar Clone

A full-stack Google Calendar-like application built with a React + Vite frontend and an Express + Prisma + PostgreSQL backend. It implements Month / Week / Day views, drag & drop event repositioning, a mini-month sidebar, quick-add, and basic CRUD persisted to PostgreSQL.

This repository is intended to run locally for development. The instructions below assume you're on Windows and using PowerShell.

---
# Preview
<img width="1899" height="879" alt="image" src="https://github.com/user-attachments/assets/a9cbe679-da2d-4f77-b143-3c92b16c2775" />
<img width="1887" height="868" alt="image" src="https://github.com/user-attachments/assets/ffcdf4dd-4574-42c3-b655-982c804249ba" />
<img width="304" height="571" alt="image" src="https://github.com/user-attachments/assets/9f16fd4b-59c3-4e46-87d5-f8068c162591" />
<img width="1889" height="873" alt="image" src="https://github.com/user-attachments/assets/4fa25f4f-ea93-45b2-baf0-6eed0bc4f52e" />



## Tech stack
- Frontend: React (Vite), date-fns, Axios
- Backend: Node.js, Express, Prisma ORM
- Database: PostgreSQL (docker-compose recommended for local dev)

## Quick start (local)

1. Clone the repo

```powershell
git clone <repo-url> "C:\Users\Gaurav Singh\Google-Calender-Clone"
cd "C:\Users\Gaurav Singh\Google-Calender-Clone"
```

2. Start the database (recommended: Docker Compose)

Open a terminal in the `backend` folder and run:

```powershell
cd "C:\Users\Gaurav Singh\Google-Calender-Clone\backend"
docker-compose up -d
```

If you prefer a locally installed Postgres, set `DATABASE_URL` in `backend/.env` accordingly.

3. Backend: install deps, generate Prisma client, push schema and seed

```powershell
cd "C:\Users\Gaurav Singh\Google-Calender-Clone\backend"
npm install
npx prisma generate
npx prisma db push
node prisma/seed.js
npm run dev
```

The backend should start at http://localhost:4000 by default.

4. Frontend: install deps and start Vite

```powershell
cd "C:\Users\Gaurav Singh\Google-Calender-Clone\frontend"
npm install
npm run dev
```

Open the Vite URL shown in the terminal (usually http://localhost:5173).

## Environment variables
- `backend/.env` should contain a `DATABASE_URL` (Postgres connection string). See `backend/.env.example` if present.

## Useful commands
- Backend
  - `npm run dev` — start backend with nodemon (dev)
  - `npx prisma generate` — generate Prisma client
  - `npx prisma db push` — push schema to DB
  - `node prisma/seed.js` — run seed script
- Frontend
  - `npm run dev` — start Vite dev server
  - `npm run build` — produce a production build

## Where to look in the code
- `backend/` — Express server, Prisma schema, routes
- `frontend/src/` — React app, components (`Calendar.jsx`, `MonthView.jsx`, `WeekView.jsx`, `DayView.jsx`, `Sidebar.jsx`, `QuickAdd.jsx`, `EventModal.jsx`), and `styles.css`.

## Notes and troubleshooting
- If you change the Prisma schema, run `npx prisma generate` and `npx prisma db push` again.
- If the frontend can't reach the backend, ensure the backend is running and check the base URL in `frontend/src/services/api.js`.
- On Windows PowerShell, remember to wrap paths containing spaces in quotes when using `cd`.

## Next steps & improvements
- Add a collapsible sidebar to let the calendar use full width when needed.
- Add natural-language parsing for Quick Add.
