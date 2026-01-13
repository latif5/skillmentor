# SkillMentor Deployment Guide

This guide covers how to run the **SkillMentor** project locally and deploy it to Vercel.

## Prerequisites

- **Node.js**: v18 or higher
- **NPM**: v9 or higher
- **Convex Account**: [Sign up here](https://convex.dev/)
- **Vercel Account**: [Sign up here](https://vercel.com/)

## Local Development

### 1. Install Dependencies

navigate to the project root:

```bash
cd skillmentor
npm install
```

### 2. Setup Convex (Backend)

You need to link your local project to a Convex backend.

```bash
cd apps/web
npx convex dev
```

_Follow the prompts to log in and select (or create) a project. This will create a `.env.local` file in `apps/web` with your `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL`._

### 3. Run Development Server

From the project root, you can start all apps simultaneously using Turbo:

```bash
npm run dev
# or
turbo dev
```

- **Web App**: [http://localhost:3000](http://localhost:3000)
- **Landing Page**: [http://localhost:3001](http://localhost:3001)

## Deploying to Vercel

Since this is a monorepo, you will deploy `apps/web` and `apps/landing` as separate Vercel projects.

### Deploying the Web App (`apps/web`)

1.  **Push your code** to GitHub.
2.  **Import Project** in Vercel.
3.  **Build Settings**:
    - **Framework Preset**: Next.js
    - **Root Directory**: `apps/web`
    - **Build Command**: `cd ../.. && npx query-vitals` (or default if Vercel detects Monorepo correctly. Usually `cd ../.. && turbo build --filter=web...` is safer, but Vercel's default for Next.js often works if Root Directory is set).
    - _Better approach for Turbo_:
      - **Root Directory**: `apps/web`
      - **Ignore Command**: `npx turbo-ignore` (optional, saves build minutes)
4.  **Environment Variables**:
    - Copy `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` from `apps/web/.env.local` to Vercel.
    - **Important**: For production, follow [Convex Vercel Guide](https://docs.convex.dev/production/hosting/vercel) to set up the Production environment variables (`CONVEX_DEPLOYMENT` usually needs to point to prod).

### Deploying the Landing Page (`apps/landing`)

1.  **Import Project** in Vercel (New Project).
2.  Select the **same repository**.
3.  **Build Settings**:
    - **Root Directory**: `apps/landing`
4.  **Deploy**.

## Troubleshooting

- **Missing Convex Env**: Ensure you added the Environment Variables in Vercel settings.
- **Build Fails**: Check if `turbo` is in `devDependencies` in the root `package.json`.
