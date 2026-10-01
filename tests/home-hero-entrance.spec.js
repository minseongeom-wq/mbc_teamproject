import { test, expect } from '@playwright/test';

test('Hero characters grow back to their designed size as the intro reveals Home', async ({ page }) => {
  await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');

  const yoshi = page.locator('.home-hero__hero-visual-01 > .home-hero__layer-10');
  await expect(page.locator('.nintendo-intro')).toBeVisible();
  await expect.poll(() => yoshi.evaluate(element => getComputedStyle(element).transform)).not.toBe('none');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 12000 });
  await expect.poll(() => yoshi.evaluate(element => getComputedStyle(element).transform)).toBe('none');
});
