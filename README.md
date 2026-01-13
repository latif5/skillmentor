# SkillMentor

A modern learning platform with a premium landing page and powerful backend.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS
- **Backend**: Convex
- **Auth**: Clerk (synced with Convex)
- **Monorepo**: Turborepo

## Project Setup

### 1. Prerequisites

- Node.js v18+
- NPM v9+

### 2. Installation

```bash
npm install
```

### 3. Environment Setup (Authentication)

This project uses **Clerk** for user management. You need to configure it before running the app.

1.  **Create Clerk Project**: Go to [dashboard.clerk.com](https://dashboard.clerk.com).
2.  **API Keys**: Get `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
3.  **JWT Template**:
    - In Clerk Dashboard, go to **JWT Templates** -> **New Template** -> Select **Convex**.
    - Copy the **Issuer Domain** (e.g., `https://your-domain.clerk.accounts.dev`).

Create `.env.local` in `apps/web`:

```env
# apps/web/.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_ISSUER_DOMAIN=https://...clerk.accounts.dev
```

### 4. Initialize Backend (Convex)

Link your local project to a Convex backend:

```bash
cd apps/web
npx convex dev
```

_This will prompt you to login and set up your Convex project. It automatically generates `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` in `.env.local`._

### 5. Run Development Server

Start both the Web App and Landing Page:

```bash
# Run from root directory
npm run dev
# OR
turbo dev
```

- **Web App**: [http://localhost:3000](http://localhost:3000)
- **Landing Page**: [http://localhost:3001](http://localhost:3001)

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel deployment instructions.
