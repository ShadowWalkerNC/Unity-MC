# 🛠️ Canonical Tech Stack Decisions

This document outlines the standard tech stacks across the ShadowWalkerNC organization. Any new projects should align with these guidelines to simplify maintenance and cross-project contributions.

## 🏗️ Core Technologies

### Web Applications
- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Vanilla CSS (CSS Modules) / Tailwind CSS (v4 where supported)
- **State Management**: React Context, Zustand (for complex client state)
- **Data Fetching**: React Server Components (RSC) + SWR/TanStack Query (for client-side polling)

### Databases & Backend
- **Primary Database**: [Supabase](https://supabase.com/) (PostgreSQL)
  - Row Level Security (RLS) must be enabled on every table.
  - Database schema migrations managed via Supabase CLI.
- **Caching & Key-Value**: Redis (Upstash) for serverless routes.

### Hosting & Infrastructure
- **Web Deployment**: [Vercel](https://vercel.com/) (Next.js frontends)
- **Background Workers**: [Railway](https://railway.app/) / [Render](https://render.com/) (Node.js/Go processes, cron schedules)
- **CI/CD**: GitHub Actions (defined in `.github` repo)

---

## 📋 Technology Matrix by Repo Group

| Group | Repositories | Frontend Stack | Backend/Database | Hosting |
| :--- | :--- | :--- | :--- | :--- |
| **🍽️ Culinary** | CulinaryOS, Plated, KitchenKit, Post-Pilot | Next.js, TypeScript, Tailwind | Supabase (Shared DB) | Vercel |
| **💬 Platform** | Mercury | Next.js / Node.js API | Supabase / PostgreSQL | Railway |
| **🏥 Care** | ShorelineOps | React, TypeScript | PostgreSQL | Render |
| **🚑 Safety** | Emergency-CAD | Next.js (App Router) | Supabase (Isolated) | Vercel |
| **✝️ Faith** | BibleDesk, prayer-atlas | React (BibleDesk) / Next.js | SQLite (Offline) / Supabase | Vercel / Local |
| **👤 Personal**| portfolio, ShadowWalkerNC | HTML/CSS or Next.js static | N/A | GitHub Pages / Vercel |
