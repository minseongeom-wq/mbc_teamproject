import { test, expect } from '@playwright/test';

test('Background News characters rise with scroll and return to the same position', async ({ page }, testInfo) => {
  await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });
  await page.locator('.home-hero__hero-visual-06').click();
  await expect(page.locator('.home-transition')).toBeHidden({ timeout: 12000 });
  await expect(page.locator('.pin-spacer:has(> .home-discovery)')).toHaveCount(1, { timeout: 12000 });

  const anchor = await page.evaluate(() => window.scrollY);
  const offsets = () => page.locator('.home-news [data-news-parallax]').evaluateAll(elements =>
    elements.map(element => new DOMMatrix(getComputedStyle(element).transform).m42));
  const scrollTo = offset => page.evaluate(y => window.scrollTo(0, y), anchor + offset);

  await scrollTo(1200);
  await expect.poll(async () => (await offsets())[0]).toBeLessThan(-20);
  const first = await offsets();
  await scrollTo(2400);
  await expect.poll(async () => (await offsets())[0]).toBeLessThan(first[0] - 35);
  const second = await offsets();
  expect(first).toHaveLength(6);
  second.forEach((value, index) => expect(value).toBeLessThan(first[index] - 25));
  await page.screenshot({ path: testInfo.outputPath('news-parallax-midpoint.png') });

  await scrollTo(1200);
  await expect.poll(async () => (await offsets())[0]).toBeCloseTo(first[0], 0);
  const reversed = await offsets();
  reversed.forEach((value, index) => expect(value).toBeCloseTo(first[index], 0));
  expect(await page.locator('.home-news__layer').evaluate(element => element.style.transform)).toBe('');
  expect(await page.locator('.home-news__image-1042-edited-3-1').evaluate(element => element.style.transform)).toBe('');
});
