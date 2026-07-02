import { defineConfig, devices } from "@playwright/test";

// E2E lives in ./e2e and auto-starts the dev server. Post-Supabase (Module 6)
// this flow becomes sign in → create → see it; today it runs on mock data.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
