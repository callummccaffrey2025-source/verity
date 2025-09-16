import { test, expect } from "@playwright/test";

test.describe("[smoke] Verity", () => {
  test("home loads + sticky CTA after scroll", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Know what’s really in the bills.")).toBeVisible();
    await page.mouse.wheel(0, 2000);
    await expect(page.getByText("Ready to see Verity in action?")).toBeVisible();
  });

  test("header links /product -> /pricing", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/product"]');
    await expect(page).toHaveURL(/\/product$/);
    await page.click('a[href="/pricing"]');
    await expect(page).toHaveURL(/\/pricing$/);
  });

  test("command palette navigates to /pricing", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("banner")).toBeVisible();
    const isMac = process.platform === "darwin";
    await page.keyboard.press(isMac ? "Meta+K" : "Control+K");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.type("pricing");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/pricing$/);
  });

  test("join-waitlist validates + success flow", async ({ page }) => {
    await page.goto("/join-waitlist");
    await page.getByRole("button", { name: /join/i }).click();
    await expect(page.getByText("You’re on the list")).toBeHidden();
    await page.getByRole("textbox").fill("user@example.com");
    await page.getByRole("button", { name: /join/i }).click();
    await expect(page.getByText("You’re on the list")).toBeVisible();
  });

  test("theme-color meta & manifest exist", async ({ page, request }) => {
    await page.goto("/");
    const themeColor = await page.locator('meta[name="theme-color"]').getAttribute("content");
    expect(themeColor).toBe("#0a0a0a");
    const res = await request.get("/manifest.webmanifest", { failOnStatusCode: false });
    expect(res.ok()).toBeTruthy();
  });
});
