// Local screenshot runner for the reference app's own UI pages.
// Run on YOUR machine (not the sandbox):
//   npm install
//   npm run dev            # in one terminal, starts localhost:3000
//   node scripts/screenshots.mjs   # in another terminal
// Requires: npm i -D playwright && npx playwright install chromium
//
// Saves to screenshots/mXX/mXX-NN-slug.png (matches master-build-prompt.md).
// Only WEB UI (localhost) can be captured here. Tool/dashboard shots
// (Cursor, Claude Code terminal, Supabase, Vercel, GitHub) are captured by hand
// — see screenshots/manifest.md.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const shots = [
  { path: "m00/m00-01-nextjs-starter.png", url: "/", note: "Next.js starter" },
  { path: "m04/m04-01-clients-table.png", url: "/clients", note: "Clients table" },
  { path: "m04/m04-02-create-form.png", url: "/clients/new", note: "New client form" },
  { path: "m05/m05-01-invoices-table.png", url: "/invoices", note: "Invoices table" },
  { path: "m05/m05-02-invoice-form.png", url: "/invoices/new", note: "New invoice form" },
  { path: "m11/m11-01-loading.png", url: "/clients?state=loading", note: "Loading skeleton" },
  { path: "m11/m11-02-empty.png", url: "/clients?state=empty", note: "Empty state" },
  { path: "m11/m11-03-error.png", url: "/clients?state=error", note: "Error + retry" },
  { path: "m10/m10-01-approval-queue.png", url: "/reminders", note: "Reminder approval queue" },
];

const OUT = "screenshots";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

for (const s of shots) {
  const dest = `${OUT}/${s.path}`;
  mkdirSync(dirname(dest), { recursive: true });
  await page.goto(`${BASE}${s.url}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: dest, fullPage: true });
  console.log(`✓ ${dest}  (${s.note})`);
}

await browser.close();
console.log(`\nDone. PNGs are in ./${OUT}`);
