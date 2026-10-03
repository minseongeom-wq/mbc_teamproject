import { test, expect } from '@playwright/test';

test('Latest desktop Figma assets and slots render while original interaction targets remain', async ({ page }, testInfo) => {
  test.setTimeout(60000);
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 15000 });
  await page.evaluate(() => document.fonts.ready);
  const brokenImages = await page.locator('.home-page img').evaluateAll(async images => {
    await Promise.all(images.map(image => image.decode().catch(() => {})));
    return images.filter(image => !image.naturalWidth).map(image => image.src);
  });
  expect(brokenImages).toEqual([]);
  const geometry = await page.evaluate(() => {
    const zoom = Number.parseFloat(getComputedStyle(document.querySelector('.home-page__canvas')).zoom);
    return ['home-hero', 'home-discovery', 'home-news', 'home-amiibo', 'home-picks', 'home-daily', 'home-banner'].map(name => {
      const section = document.querySelector(`.${name}`);
      return { name, height: section.getBoundingClientRect().height / zoom };
    });
  });
  expect(geometry.map(section => Math.round(section.height))).toEqual([1883, 1080, 3000, 947, 3985, 1432, 675]);
  await expect(page.locator('.home-hero__image-6')).toHaveAttribute('src', /52328.png$/);
  await expect(page.locator('.home-hero__mario-art')).toHaveCount(0);
  await expect(page.locator('.home-news__image')).toHaveAttribute('src', /c7a3c.png$/);
  await expect(page.locator('.home-news__image-2')).toHaveAttribute('src', /news-orange-latest.png$/);
  await expect(page.locator('.home-news__image-3')).toHaveAttribute('src', /news-blue-latest.png$/);
  for (const selector of ['.home-hero', '.home-news', '.home-amiibo', '.home-picks', '.home-daily', '.home-banner', '.common-footer']) {
    await page.locator(selector).screenshot({ path: testInfo.outputPath(`${selector.slice(1)}.png`) });
  }
  await page.locator('.home-hero__hero-visual-06').click();
  await expect(page.locator('.home-discovery')).toHaveAttribute('data-transition-ready', 'true');
  await expect(page.locator('.home-discovery__console-shell')).toHaveAttribute('src', /1cd5b.png$/);
  await page.locator('.home-discovery').screenshot({ path: testInfo.outputPath('home-discovery.png') });
});
