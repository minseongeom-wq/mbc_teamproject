import { test, expect } from '@playwright/test';

test('Discovery recedes while the unchanged News section rises, then reverses with scroll', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await page.mouse.move(480, 320);
  await page.mouse.click(480, 320);
  await expect(page.locator('.nintendo-intro')).toHaveCount(0);
  await page.locator('.home-hero__hero-visual-06').click();
  await expect(page.locator('.home-transition')).toBeHidden({ timeout: 12000 });
  await expect(page.locator('.home-discovery')).not.toHaveClass(/home-discovery--booting/);

  const geometry = () => page.evaluate(() => {
    const discovery = document.querySelector('.home-discovery');
    const news = document.querySelector('.home-news');
    return {
      scale: new DOMMatrix(getComputedStyle(discovery).transform).a,
      discoveryTop: discovery.getBoundingClientRect().top,
      newsTop: news.getBoundingClientRect().top,
      newsTransform: getComputedStyle(news).transform,
    };
  });
  const beginning = await geometry();
  expect(beginning.scale).toBeCloseTo(1, 2);

  await page.evaluate(() => window.scrollBy(0, 400));
  await expect.poll(async () => (await geometry()).scale).toBeLessThan(0.99);
  const middle = await geometry();
  expect(middle.scale).toBeGreaterThan(0.88);
  expect(middle.newsTop).toBeLessThan(beginning.newsTop);
  expect(middle.newsTransform).toBe('none');
  await page.screenshot({ path: testInfo.outputPath('discovery-news-midpoint.png') });

  await page.evaluate(() => window.scrollBy(0, 800));
  await expect.poll(async () => (await geometry()).newsTop).toBeLessThan(0);
  await page.evaluate(() => window.scrollBy(0, -1200));
  await expect.poll(async () => (await geometry()).scale).toBeCloseTo(1, 2);
});

test('The mobile Discovery scene also recedes without transforming the News layout', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.mouse.move(200, 250);
  await page.mouse.click(200, 250);
  await expect(page.locator('.nintendo-intro')).toHaveCount(0);
  await page.locator('.home-hero-mobile__layer-13').click();
  await expect(page.locator('.home-transition')).toBeHidden({ timeout: 12000 });
  await expect(page.locator('.home-discovery-mobile')).not.toHaveClass(/home-discovery--booting/);
  await page.evaluate(() => window.scrollBy(0, 250));
  await expect.poll(() => page.locator('.home-discovery-mobile').evaluate(element => new DOMMatrix(getComputedStyle(element).transform).a)).toBeLessThan(1);
  await expect(page.locator('.home-news-mobile')).toHaveCSS('transform', 'none');
});

test('Discovery cards remain scrollable before the depth transition starts', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await page.mouse.move(480, 320);
  await page.mouse.click(480, 320);
  await expect(page.locator('.nintendo-intro')).toHaveCount(0);
  await page.locator('.home-hero__hero-visual-06').click();
  await expect(page.locator('.home-transition')).toBeHidden({ timeout: 12000 });
  await expect(page.locator('.home-discovery')).not.toHaveClass(/home-discovery--booting/, { timeout: 12000 });

  const selected = page.locator('.home-game-carousel__card[aria-pressed="true"]');
  const sectionTop = await page.evaluate(() => window.scrollY);
  for (const position of ['3', '4', '5', '6']) {
    await page.mouse.wheel(0, 120);
    await expect(selected).toHaveAttribute('data-carousel-position', position);
    expect(await page.evaluate(() => window.scrollY)).toBe(sectionTop);
    await page.waitForTimeout(580);
  }
  await page.mouse.wheel(0, 350);
  await expect.poll(() => page.locator('.home-discovery').evaluate(element => new DOMMatrix(getComputedStyle(element).transform).a)).toBeLessThan(1);
  await expect.poll(() => page.locator('.home-news').evaluate(element => element.getBoundingClientRect().top)).toBeLessThan(1080);
});
