import { test, expect } from '@playwright/test';

test('cursor Skip bypasses the logo and video and restores Home scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  const intro = page.locator('.nintendo-intro');
  const skip = page.locator('.nintendo-intro__skip');
  await expect(intro).toHaveAttribute('data-phase', 'aligned');
  await page.mouse.move(480, 320);
  await expect.poll(() => skip.evaluate(element => {
    const box = element.getBoundingClientRect();
    return Math.round(box.left + box.width / 2);
  })).toBe(480);
  await page.mouse.click(480, 320);
  await expect(intro).toHaveAttribute('data-phase', 'revealing');
  await expect(intro).toHaveCount(0, { timeout: 5000 });
  await expect(page.locator('.home-hero')).toBeVisible();
  expect(await page.evaluate(() => ({ overflow: document.body.style.overflow, inert: document.getElementById('root').inert })))
    .toEqual({ overflow: '', inert: false });
});

test('Skip also stops the playing intro video', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  const intro = page.locator('.nintendo-intro');
  await expect(intro).toHaveAttribute('data-phase', 'video', { timeout: 10000 });
  await page.mouse.move(650, 400);
  await page.mouse.click(650, 400);
  await expect(intro).toHaveAttribute('data-phase', 'revealing');
  await expect(page.locator('.nintendo-intro__video')).toHaveJSProperty('paused', true);
  await expect(intro).toHaveCount(0, { timeout: 5000 });
});
