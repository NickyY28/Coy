# Coy Discover

A mobile-first discovery demo inspired by Coy. It includes a swipe-based profile feed, persistent likes and passes, mutual matching, a matches screen, a Coy-style Home screen, and a demo reset action.

## Live Deployments

- Frontend (Vercel): https://nicky-coy.vercel.app
- Backend (Render): https://coy-tkpj.onrender.com

## Tech Stack

### Frontend

- Next.js App Router
- React
- TypeScript
- Framer Motion
- Mobile-first CSS

### Backend

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- Zod
- dotenv

## Features

### Discover

- Displays one profile at a time
- Supports drag gestures on mobile
- Supports Like and Pass buttons on desktop and mobile
- Animates likes, passes, and profile changes
- Removes swiped profiles from the feed permanently
- Shows an empty state when all profiles have been swiped

### Matching

- Creates a match only when both users like each other
- Shows an "It's a match!" modal immediately after a mutual like
- Lists mutual matches in the Matches tab
- Never exposes profiles that have only liked the logged-in user

### Home

- Displays a Coy-style landing card and feature shortcuts
- Includes an application reset button
- Resets swipes, matches, and seeded profiles

### Persistent Demo Data

- The logged-in user is represented by the fixed ID `logged-user`
- 30 mock profiles are seeded on initial setup
- 10 unique profiles from the complete 30-profile pool already like the logged-in user
- Swipe and match state remains persisted across reloads in PostgreSQL

## Project Structure

```text
coy/
├── frontend/
│   ├── app/
│   │   ├── home/page.tsx
│   │   ├── discover/page.tsx
│   │   ├── matches/page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/layout/
│   ├── features/
│   │   ├── discover/
│   │   └── matches/
│   ├── lib/api.ts
│   └── package.json
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   ├── src/
│   │   ├── config/
│   │   ├── features/
│   │   │   ├── feed/
│   │   │   ├── swipe/
│   │   │   ├── match/
│   │   │   └── reset/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
└── package.json
```

Frontend imports use the `@/` alias. For example:

```ts
import { SwipeContainer } from "@/features/discover/components/SwipeContainer";
```

## Prerequisites

- Node.js 20 or newer
- npm
- PostgreSQL

## Local Setup

### 1. Install dependencies

From the repository root:

```bash
npm run install:all
```

### 2. Configure PostgreSQL

Create a PostgreSQL database, then copy the backend environment template:

```bash
cp backend/.env.example backend/.env
```

Update `DATABASE_URL` with your PostgreSQL username and database:

```env
DATABASE_URL="postgresql://YOUR_POSTGRES_USER@localhost:5433/coy_discover?schema=public"
PORT=4000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
CLIENT_URLS=http://localhost:3000,http://192.168.1.100:3000
```

`CLIENT_URLS` is a comma-separated CORS allowlist. `CLIENT_URL` is used as its fallback.

### 3. Create and seed the database

```bash
npm run db:setup --prefix backend
```

To reset only the existing database to the seed data:

```bash
cd backend
npx prisma db seed
```

### 4. Run the application

From the repository root:

```bash
npm run dev
```

Open:

- Frontend: `http://localhost:3000/discover`
- Home: `http://localhost:3000/home`
- Matches: `http://localhost:3000/matches`
- Backend: `http://localhost:4000`
- Health check: `http://localhost:4000/health`

The backend and frontend can also be run separately:

```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

## API

All list and action responses use `ApiResponse`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | Backend health check |
| `GET` | `/feed` | Returns profiles not yet swiped by the logged-in user |
| `POST` | `/swipe` | Records a like or pass |
| `GET` | `/matches` | Returns all mutual matches |
| `POST` | `/reset` | Restores the database to seed data |

### Swipe Request

```http
POST /swipe
Content-Type: application/json

{
  "profileId": "profile-1",
  "action": "like"
}
```

`action` can be `like` or `pass`.

### Success Response

```json
{
  "statusCode": 200,
  "message": "Swipe recorded successfully",
  "data": {
    "matched": true
  },
  "success": true
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Profile not found",
  "data": null,
  "success": false,
  "errors": []
}
```

## Resetting the Demo

Use the **Reset Application** button on the Home page, or call:

```bash
curl -X POST http://localhost:4000/reset
```

The reset deletes existing users and swipes, recreates the logged-in user and 30 profiles, and seeds 10 random profiles that already like the logged-in user.

## Build

Build both applications:

```bash
npm run build
```

Build and run the backend:

```bash
npm run build --prefix backend
npm start --prefix backend
```

Build and run the frontend:

```bash
npm run build --prefix frontend
npm start --prefix frontend
```

## Render Deployment

For a separate backend Web Service:

1. Set the root directory to `backend`.
2. Set the build command to:

   ```bash
   npm install && npm run build
   ```

3. Set the start command to:

   ```bash
   npm start
   ```

4. Configure these environment variables:

   ```env
   DATABASE_URL=<your-production-postgresql-url>
   PORT=4000
   NODE_ENV=production
   CLIENT_URL=<your-render-or-custom-frontend-url>
   CLIENT_URLS=<comma-separated-frontend-url(s)>
   ```

Create and seed the production database using a Render shell or a one-time migration command:

```bash
npx prisma migrate deploy
npx prisma db seed
```

## Suggested Core Features

1. **Anonymous compatibility prompts** - Let users answer private prompts before revealing a match. Only shared answers should become visible after mutual interest, preserving Coy's privacy-first experience.

2. **Consent-led conversation starters** - After matching, require either party to choose an icebreaker or opt in before chat and notifications become active. This reduces unsolicited attention and keeps conversations intentional.
