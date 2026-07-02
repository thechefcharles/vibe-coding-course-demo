---
name: add-invoice-feature
description: Use when adding a new feature to the Invoice Tracker app — enforces the project's Server Component + Server Action + RLS conventions so new code matches the existing patterns.
---

# Add a feature to the Invoice Tracker

Follow the patterns already in the repo. Look at the `clients` feature first — copy its shape.

## Steps
1. **Types** — add/extend a type in `types/` (e.g. `types/invoice.ts`).
2. **Read path** — fetch data in a **Server Component** via `lib/supabase/server.ts`
   (`await createClient()`), never from the client.
3. **Write path** — put mutations in a **Server Action** (`app/(dashboard)/<feature>/actions.ts`),
   set `user_id` from `auth.uid()`, then `revalidatePath()` and `redirect()`.
4. **Security** — add the table's RLS policies (default-deny + per-user on `auth.uid()`,
   `with check` on inserts/updates). Verify with two accounts.
5. **States** — give every data screen loading / empty / error states.
6. **Verify** — `npm run build` and `npm test` must pass before you call it done.

## Rules
- Server Components by default; add `"use client"` only for state/effects.
- `cookies()` is async (Next 16) — always `await`.
- Don't ship code you can't explain.
