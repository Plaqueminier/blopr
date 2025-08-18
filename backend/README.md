# Blopr Backend

Minimal Node.js + SQLite API for blood pressure data synchronization.

## Installation

```bash
cd backend
npm install
```

## Running

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/entries` - Get all blood pressure entries
- `POST /api/entries` - Add new entry
- `DELETE /api/entries/:id` - Delete entry by ID

## Database

SQLite database (`blopr.db`) is created automatically with schema:
- id (auto-increment)
- systolic, diastolic, heart_rate (integers)
- date, time (text)
- created_at (timestamp)

## Default Port

Server runs on port 3001 by default.