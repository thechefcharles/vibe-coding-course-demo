import { test, expect, Page } from "@playwright/test";

// Each test provisions its own fresh user so they can run in parallel and stay
// isolated (RLS scopes all data per-user anyway).
async function signUp(page: Page): Promise<string> {
  const email = `e2e-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(page).toHaveURL(/\/clients$/);
  return email;
}

test("sign up → create a client → see it", async ({ page }) => {
  await signUp(page);

  // New user starts empty.
  await expect(page.getByText("No clients yet")).toBeVisible();

  await page.getByRole("link", { name: "New client" }).click();

  // Client-side validation on empty submit.
  await page.getByRole("button", { name: "Save client" }).click();
  await expect(page.getByText("Name is required.")).toBeVisible();

  await page.getByLabel("Name").fill("Wayne Enterprises");
  await page.getByLabel("Email").fill("ap@wayne.com");
  await page.getByRole("button", { name: /Save client/ }).click();

  await expect(page).toHaveURL(/\/clients$/);
  await expect(page.getByText("Wayne Enterprises")).toBeVisible();
  await expect(page.getByText("ap@wayne.com")).toBeVisible();
});

test("overdue invoice appears in reminders and needs approval to send", async ({
  page,
}) => {
  await signUp(page);

  // Create a client.
  await page.goto("/clients/new");
  await page.getByLabel("Name").fill("Globex");
  await page.getByLabel("Email").fill("team@globex.com");
  await page.getByRole("button", { name: /Save client/ }).click();
  await expect(page).toHaveURL(/\/clients$/);

  // Create an overdue invoice for that client.
  await page.goto("/invoices/new");
  await page.getByLabel("Client").selectOption({ label: "Globex" });
  await page.getByLabel("Amount (USD)").fill("500");
  await page.getByLabel("Status").selectOption("overdue");
  await page.getByLabel("Due date").fill("2026-01-15");
  await page.getByRole("button", { name: /Save invoice/ }).click();
  await expect(page).toHaveURL(/\/invoices$/);

  // It shows up in the reminder approval queue; nothing sends without approval.
  await page.goto("/reminders");
  const approve = page.getByRole("button", { name: "Approve & send" }).first();
  await expect(approve).toBeVisible();
  await approve.click();
  await expect(page.getByText("Sent (mock)").first()).toBeVisible();
});
