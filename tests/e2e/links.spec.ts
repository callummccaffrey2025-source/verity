import { test, expect } from "@playwright/test";

const START_PAGES = [
  "/",
  "/product",
  "/pricing",
  "/trust",
  "/blog",
  "/case-studies",
  "/solutions",
  "/mps",
  "/developers",
  "/roadmap",
];

test.describe("internal links", () => {
  for (const start of START_PAGES) {
    test(`no broken links from ${start}`, async ({ page, request }) => {
      const res = await page.goto(start);
      expect(res?.status(), `GET ${start}`).toBeLessThan(400);

      // collect internal anchors
      const hrefs = new Set<string>();
      const anchors = await page.$$('a[href^="/"]');
      for (const a of anchors) {
        const href = await a.getAttribute("href");
        if (!href) continue;
        if (href.startsWith("/embed/")) continue; // embeds are standalone
        if (href.includes("#")) continue; // skip in-page anchors
        hrefs.add(href);
      }

      for (const h of hrefs) {
        const r = await request.get(h);
        const status = r.status();
        expect(status, `GET ${h}`).toBeLessThan(400);
      }
    });
  }
});
