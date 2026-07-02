# Invoice Tracker — project guide for AI assistants

A small invoice tracker: **Next.js 16 (App Router) + TypeScript + Tailwind v4**,
**Supabase** (auth + Postgres with Row Level Security), deployed on **Vercel**.
It's the reference app for an AI-assisted coding course, so keep the code clear
and idiomatic — a learner should be able to read and explain every part.

## Commands
- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build (also type-checks)
- `npm test` — Vitest unit tests · `npm run test:e2e` — Playwright E2E
- `npm run screenshots` — regenerate app-UI figures

## Conventions
- **Server Components by default**; add `"use client"` only when you need state/effects.
- **Data lives in Supabase.** Read in Server Components via `lib/supabase/server.ts`;
  write via **Server Actions** (`app/(dashboard)/**/actions.ts`), never from the client directly.
- **`cookies()` is async** (Next 16) — always `await` it. The session refresh lives in
  `proxy.ts` (Next 16 renamed `middleware` → `proxy`).
- **Security is not optional.** Every table has RLS (default-deny) + per-user policies on
  `auth.uid()`; `user_id` defaults to `auth.uid()`. Validate input on the server, not just the browser.
- **Match existing patterns** — look at `clients/` before adding an `invoices/`-style feature.

## The rule
Don't add code you can't explain. Prefer the smallest change that works, and verify it
(build + tests) before calling it done.

<!-- Shared agent rules (also read by other tools) live in AGENTS.md: -->
@AGENTS.md
