import { test, expect } from "@playwright/test";

test("home loads and sticky CTA appears after scroll", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("text=Know what’s really in the bills.")).toBeVisible();
  await page.mouse.wheel(0, 1200);
  await expect(page.locator("text=Ready to see Verity in action?")).toBeVisible();
});

test("header links work", async ({ page }) => {
  await page.goto("/");
  await page.click('a[href="/product"]');
  await expect(page).toHaveURL(/\/product$/);
  await page.click('a[href="/pricing"]');
  await expect(page).toHaveURL(/\/pricing$/);
});

test("join-waitlist validates", async ({ page }) => {
  await page.goto("/join-waitlist");
  await page.click('button:has-text("Join")');
  await expect(page.locator('text=You’re on the list')).not.toBeVisible();
  await page.fill('input[type="email"]', "user@example.com");
  await page.click('button:has-text("Join")');
  await expect(page.locator('text=You’re on the list')).toBeVisible();
});
