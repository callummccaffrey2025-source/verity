import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("[a11y] Axe on key routes", () => {
  const paths = ["/", "/product", "/pricing", "/join-waitlist"];

  for (const p of paths) {
    test(`axe clean enough for ${p}`, async ({ page }) => {
      await page.goto(p);

      const axe = new AxeBuilder({ page }).disableRules([
        "color-contrast",
        "csp-xss",
      ]);

      const { violations } = await axe.analyze();
      if (violations.length) {
        console.warn("\n[A11Y] Violations on", p);
        for (const v of violations) {
          console.warn(`- ${v.id}: ${v.help} (${v.nodes.length} nodes)`);
        }
      }
      expect(violations.length, `Axe violations on ${p}`).toBeLessThanOrEqual(2);
    });
  }
});
