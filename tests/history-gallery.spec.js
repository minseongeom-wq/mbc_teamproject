import { test, expect } from '@playwright/test';

test.use({ channel: 'chrome' });

test('History gallery cards use the Figma hover state without moving the section', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/about/history', { waitUntil: 'domcontentloaded' });
  const gallery = page.locator('.history-visual-story');
  const cards = gallery.locator('.history-card');
  await expect(cards).toHaveCount(3);
  const start = await gallery.evaluate(element => element.getBoundingClientRect().top + scrollY);
  await page.evaluate(y => window.scrollTo(0, y), start + 160);
  await page.waitForTimeout(200);

  const card = gallery.locator('.history-card--create');
  const originalWidth = await card.evaluate(element => element.getBoundingClientRect().width);
  await expect(card).toHaveCSS('width', '511px');
  await expect(card).toHaveCSS('height', '500px');
  await page.mouse.move(310, 420);
  await expect(card.locator('.history-card__hover-title')).toHaveCSS('opacity', '1');
  await expect(card.locator('.history-card__hover-name')).toHaveCSS('opacity', '1');
  await expect(card.locator('.history-card__bottom h3')).toHaveCSS('opacity', '0');
  expect(await card.evaluate(element => element.getBoundingClientRect().width)).toBeGreaterThan(originalWidth + 10);

  for (const other of [gallery.locator('.history-card--play'), gallery.locator('.history-card--share')]) {
    const box = await other.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await expect(other.locator('.history-card__hover-title')).toHaveCSS('opacity', '1');
  }

  await page.mouse.move(650, 950);
  await expect(card.locator('.history-card__hover-title')).toHaveCSS('opacity', '0');
  await expect(gallery).toHaveCSS('height', '1300px');
  for (const image of await gallery.locator('.history-card__image').all()) {
    expect(await image.getAttribute('src')).toMatch(/^\/images\/history\/history-(create|play|share)\.png$/);
  }
});
