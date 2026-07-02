// Local screenshot runner for the reference app's own UI pages.
// Run on YOUR machine (not the sandbox):
//   npm install
//   npm run dev            # in one terminal, starts localhost:3000
//   node scripts/screenshots.mjs   # in another terminal
// Requires: npm i -D playwright && npx playwright install chromium
//
// Saves to screenshots/mXX/mXX-NN-slug.png (matches master-build-prompt.md).
// Dashboard routes require auth, so this signs in as a seeded demo user for the
// authenticated shots. Tool/dashboard shots (Cursor, Claude Code terminal,
// Supabase, Vercel, GitHub) are captured by hand — see screenshots/manifest.md.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const DEMO_EMAIL = process.env.DEMO_EMAIL ?? "demo@vibetracker.app";
const DEMO_PASSWORD = process.env.DEMO_PASSWORD ?? "demopass123";
const OUT = "screenshots";

async function shoot(page, path, url) {
  const dest = `${OUT}/${path}`;
  mkdirSync(dirname(dest), { recursive: true });
  await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: dest, fullPage: true });
  console.log(`✓ ${dest}  (${url})`);
}

const browser = await chromium.launch();

// 1) Public / signed-out shots (no session).
const anon = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await shoot(anon, "m00/m00-01-nextjs-starter.png", "/");
// A protected route redirects an unauthenticated visitor to /login.
await shoot(anon, "m06/m06-01-signed-out.png", "/clients");
await anon.close();

// 2) Sign in, then capture the authenticated app.
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
await page.fill('input[name="email"]', DEMO_EMAIL);
await page.fill('input[name="password"]', DEMO_PASSWORD);
await Promise.all([
  page.waitForURL(/\/clients/),
  page.getByRole("button", { name: "Sign in" }).click(),
]);

const authed = [
  ["m04/m04-01-clients-table.png", "/clients"],
  ["m04/m04-02-create-form.png", "/clients/new"],
  ["m05/m05-01-invoices-table.png", "/invoices"],
  ["m05/m05-02-invoice-form.png", "/invoices/new"],
  ["m11/m11-01-loading.png", "/clients?state=loading"],
  ["m11/m11-02-empty.png", "/clients?state=empty"],
  ["m11/m11-03-error.png", "/clients?state=error"],
  ["m10/m10-01-approval-queue.png", "/reminders"],
  ["m06/m06-02-signed-in-clients.png", "/clients"],
];
for (const [p, u] of authed) await shoot(page, p, u);

await browser.close();
console.log(`\nDone. PNGs are in ./${OUT}`);
