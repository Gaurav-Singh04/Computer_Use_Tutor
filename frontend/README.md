# Frontend — Google Calendar Clone

This folder contains the React (Vite) frontend for the Google Calendar clone.

## Overview
- Built with React and Vite.
- Key UI features: Month/Week/Day views, drag & drop to move events, Quick Add, mini-month sidebar, event modal for create/edit.

## Requirements
- Node.js (v14+)
- npm

## Running the app

Install dependencies and start the dev server:

```powershell
cd "C:\Users\Gaurav Singh\Google-Calender-Clone\frontend"
npm install
npm run dev
```

By default the frontend expects the backend API to be available at `http://localhost:4000`. If your backend uses a different URL, update the base URL in `frontend/src/services/api.js`.

## Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — build production assets
- `npm run preview` — preview the production build

## Important files
- `frontend/src/App.jsx` — app entry and top-level state
- `frontend/src/components/Calendar.jsx` — main calendar control and routing between views
- `frontend/src/components/MonthView.jsx` — month view implementation
- `frontend/src/components/WeekView.jsx` / `DayView.jsx` — grid and drag/drop logic
- `frontend/src/components/Sidebar.jsx` — mini-month + tasks list
- `frontend/src/services/api.js` — Axios wrapper for API calls
- `frontend/src/styles.css` — main stylesheet (slot sizing, layout, z-index polishes)

## Notes & troubleshooting
- If event drag/drop does not persist, confirm the backend is running and reachable.
- If you change the API URL, edit `frontend/src/services/api.js` (baseURL) or add an environment variable and wire it to axios.
- For layout issues (sidebar, mini-month) the main stylesheet is `frontend/src/styles.css`.

## Development tips
- To give the calendar more horizontal space, collapse or reduce the sidebar width in `styles.css` or implement a collapsible sidebar in `Sidebar.jsx`.
- Use browser devtools to inspect event pill elements when titles are clipped — `.absolute-ev` is the CSS class applied to absolute-positioned events.
