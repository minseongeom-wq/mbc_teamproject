import { test, expect } from '@playwright/test';

test('News heading and existing pixels enter in order and reset on upward scroll', async ({ page }, testInfo) => {
  await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });
  await page.locator('.home-hero__hero-visual-06').click();
  await expect(page.locator('.pin-spacer')).toHaveCount(1, { timeout: 12000 });

  const words = page.locator('.home-news__intro-word');
  const pixels = page.locator('.home-news__dot, .home-news__dot-2, .home-news__dot-3');
  const description = page.locator('.home-news__text');
  const discover = page.locator('.home-news__text-2');
  const opacity = locator => locator.evaluate(element => Number(getComputedStyle(element).opacity));
  await expect.poll(() => opacity(words.first())).toBe(0);
  await expect.poll(() => opacity(pixels.first())).toBe(0);

  const anchor = await page.evaluate(() => window.scrollY);
  await page.evaluate(() => window.scrollTo(0, window.scrollY + 1080));
  await expect.poll(() => opacity(words.first())).toBe(1);
  await expect.poll(() => opacity(words.last())).toBe(1);
  await expect.poll(() => opacity(description)).toBe(1);
  await expect.poll(() => opacity(discover)).toBe(1);
  for (const pixel of await pixels.all()) await expect.poll(() => opacity(pixel)).toBe(1);
  await page.screenshot({ path: testInfo.outputPath('news-intro-complete.png') });

  await page.evaluate(y => window.scrollTo(0, y), anchor);
  await expect.poll(() => opacity(words.first())).toBe(0);
  await expect.poll(() => opacity(discover)).toBe(0);
  for (const pixel of await pixels.all()) await expect.poll(() => opacity(pixel)).toBe(0);
});

test('Reduced motion keeps the News introduction readable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const selector of [
    '.home-news__intro-word',
    '.home-news__dot',
    '.home-news__text',
    '.home-news__text-2',
  ]) {
    await expect(page.locator(selector).first()).toHaveCSS('opacity', '1');
  }
});

test('Mobile News title and follow-up text enter without desktop pixels', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.mouse.move(200, 250);
  await page.mouse.click(200, 250);
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });
  await page.locator('.home-hero-mobile__layer-13').click();
  await expect(page.locator('.home-transition')).toBeHidden({ timeout: 12000 });
  await expect(page.locator('.home-discovery-mobile')).not.toHaveClass(/home-discovery--booting/, { timeout: 12000 });
  const title = page.locator('.home-news-mobile__intro-word');
  await expect(title.first()).toHaveCSS('opacity', '0');
  await page.evaluate(() => {
    const newsTop = document.querySelector('.home-news-mobile').getBoundingClientRect().top;
    window.scrollBy(0, newsTop + 120);
  });
  await expect(title.first()).toHaveCSS('opacity', '1');
  await expect(page.locator('.home-news-mobile__text-2')).toHaveCSS('opacity', '1');
  await expect(page.locator('.home-news-mobile__text-3')).toHaveCSS('opacity', '1');
});
