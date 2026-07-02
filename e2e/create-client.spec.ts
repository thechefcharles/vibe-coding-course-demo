import { test, expect } from "@playwright/test";

test("create a client: fill the form and see confirmation", async ({ page }) => {
  await page.goto("/clients");
  await expect(page.getByRole("heading", { name: "Clients" })).toBeVisible();

  await page.getByRole("link", { name: "New client" }).click();
  await expect(page).toHaveURL(/\/clients\/new$/);

  // Submitting empty shows validation errors.
  await page.getByRole("button", { name: "Save client" }).click();
  await expect(page.getByText("Name is required.")).toBeVisible();

  // Fill valid values and submit.
  await page.getByLabel("Name").fill("Wayne Enterprises");
  await page.getByLabel("Email").fill("ap@wayne.com");
  await page.getByRole("button", { name: "Save client" }).click();

  await expect(page.getByText(/Saved/)).toBeVisible();
  await expect(page.getByText("Wayne Enterprises")).toBeVisible();
});

test("overdue reminders require human approval before send", async ({ page }) => {
  await page.goto("/reminders");
  await expect(
    page.getByRole("heading", { name: "Overdue reminders" }),
  ).toBeVisible();

  const firstApprove = page.getByRole("button", { name: "Approve & send" }).first();
  await expect(firstApprove).toBeVisible();
  await firstApprove.click();
  await expect(page.getByText("Sent (mock)").first()).toBeVisible();
});
