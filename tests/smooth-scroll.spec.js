import { test, expect } from '@playwright/test';

for (const path of ['/', '/about/history', '/store']) {
  test(`Lenis smooths wheel scrolling on ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveClass(/\blenis\b/);

    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(50);
    const early = await page.evaluate(() => window.scrollY);
    await page.waitForTimeout(250);
    const later = await page.evaluate(() => window.scrollY);
    expect(later).toBeGreaterThan(early);
    expect(later).toBeLessThan(600);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
  });
}

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('leaves native scrolling in place', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).not.toHaveClass(/\blenis\b/);
  });
});
