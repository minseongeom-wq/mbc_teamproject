import { test, expect } from '@playwright/test';

test('Home wheel scroll eases to its destination and stops affecting other routes', async ({ page }) => {
  await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });

  const wheelAllowed = await page.evaluate(() => {
    const event = new WheelEvent('wheel', { deltaY: 250, bubbles: true, cancelable: true });
    return document.querySelector('.home-page').dispatchEvent(event);
  });
  expect(wheelAllowed).toBe(false);
  await page.waitForTimeout(150);
  const during = await page.evaluate(() => window.scrollY);
  expect(during).toBeGreaterThan(0);
  expect(during).toBeLessThan(250);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(250);

  await page.evaluate(() => {
    history.pushState({}, '', '/support');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  await expect(page.locator('.home-page')).toHaveCount(0);
  const otherRouteWheelAllowed = await page.evaluate(() => {
    const event = new WheelEvent('wheel', { deltaY: 700, bubbles: true, cancelable: true });
    return document.body.dispatchEvent(event);
  });
  expect(otherRouteWheelAllowed).toBe(true);
});
