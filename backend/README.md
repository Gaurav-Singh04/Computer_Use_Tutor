# Backend — Google Calendar Clone

This folder contains the Express backend and Prisma schema for the Google Calendar clone.

## Overview
- Node.js + Express server exposing a small REST API for events.
- Prisma ORM with a Postgres datasource and a seed script to populate sample events.

## Requirements
- Node.js (v14+)
- npm
- PostgreSQL (recommended via Docker Compose)

## Environment
Create `backend/.env` (or copy `.env.example`) and set:

- DATABASE_URL="postgresql://user:password@localhost:5432/calendar_db?schema=public"
- PORT=4000 (optional)

## Common tasks

Install dependencies

```powershell
cd "C:\Users\Gaurav Singh\Google-Calender-Clone\backend"
npm install
```

Generate Prisma client and push schema

```powershell
npx prisma generate
npx prisma db push
```

Seed the database

```powershell
node prisma/seed.js
```

Start the dev server

```powershell
npm run dev
```

## API endpoints
- GET /events — returns all events
- GET /events/:id — returns single event
- POST /events — create an event (expects JSON { title, start, end, description?, color? })
- PUT /events/:id — update event
- DELETE /events/:id — delete event

Example POST body

```json
{
  "title": "Lunch with Sam",
  "start": "2025-11-02T12:00:00.000Z",
  "end": "2025-11-02T13:00:00.000Z",
  "description": "Discuss roadmap",
  "color": "#4caf50"
}
```

## Prisma schema
- Location: `backend/prisma/schema.prisma`
- If you update the schema, run `npx prisma generate` and `npx prisma db push`.

## Notes
- CORS is enabled by default to allow the frontend (Vite) to access the API during development.
- If using Docker Compose for Postgres, confirm the `DATABASE_URL` matches the container credentials.
