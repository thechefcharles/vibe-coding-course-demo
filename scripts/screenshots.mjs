// Local screenshot runner for the reference app's own UI pages (v2 module numbering).
// Run on YOUR machine (not the sandbox):
//   npm install
//   npm run dev            # in one terminal, starts localhost:3000
//   node scripts/screenshots.mjs   # in another terminal
// Requires: npm i -D playwright && npx playwright install chromium
//
// Saves to screenshots/mNN/mNN-seq-slug.png. Auth-gated routes are shot signed in
// as a seeded demo user. Desktop (1280x800) + a mobile pass (375px) for Module 6.
// Dashboard/desktop/terminal shots are captured separately (chrome-devtools MCP or
// by hand) — see screenshots/manifest.md.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const DEMO_EMAIL = process.env.DEMO_EMAIL ?? "demo@vibetracker.app";
const DEMO_PASSWORD = process.env.DEMO_PASSWORD ?? "demopass123";
const OUT = "screenshots";

async function shoot(page, path, url, opts = {}) {
  const dest = `${OUT}/${path}`;
  mkdirSync(dirname(dest), { recursive: true });
  await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: dest, fullPage: opts.fullPage ?? true });
  console.log(`✓ ${dest}`);
}

async function signIn(page) {
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await page.fill('input[name="email"]', DEMO_EMAIL);
  await page.fill('input[name="password"]', DEMO_PASSWORD);
  await Promise.all([
    page.waitForURL(/\/clients/),
    page.getByRole("button", { name: "Sign in" }).click(),
  ]);
}

const browser = await chromium.launch();

// 1) Public / signed-out (Module 0 starter + Module 7 signed-out gate).
const anon = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await shoot(anon, "m00/m00-01-nextjs-starter.png", "/");
await shoot(anon, "m07/m07-01-signed-out.png", "/clients"); // redirects to /login
await anon.close();

// 2) Authenticated desktop (1280x800).
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await signIn(page);
const desktop = [
  ["m04/m04-01-clients-table.png", "/clients"],
  ["m04/m04-02-create-form.png", "/clients/new"],
  ["m05/m05-01-invoices-table.png", "/invoices"],
  ["m05/m05-02-invoice-form.png", "/invoices/new"],
  ["m06/m06-01-clients-styled.png", "/clients"], // Module 6 — design (desktop)
  ["m07/m07-02-signed-in-clients.png", "/clients"],
  ["m11/m11-01-approval-queue.png", "/reminders"],
  ["m12/m12-01-loading.png", "/clients?state=loading"],
  ["m12/m12-02-empty.png", "/clients?state=empty"],
  ["m12/m12-03-error.png", "/clients?state=error"],
];
for (const [p, u] of desktop) await shoot(page, p, u);
await page.close();

// 3) Mobile pass (375px) — Module 6 responsive figures.
const mobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
await signIn(mobile);
await shoot(mobile, "m06/m06-02-clients-mobile.png", "/clients");
await shoot(mobile, "m06/m06-03-invoices-mobile.png", "/invoices");
await mobile.close();

await browser.close();
console.log(`\nDone. PNGs are in ./${OUT}`);
console.log(
  "Not regenerated here (captured via chrome-devtools MCP / prod / by hand): " +
    "m07 supabase dashboards, m08 error overlay, m09 github, m10 vercel + live-clients, m13 automation.",
);
