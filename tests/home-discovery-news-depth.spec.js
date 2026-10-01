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
  const before = await page.evaluate(() => ({
    y: window.scrollY,
    scale: new DOMMatrix(getComputedStyle(document.querySelector('.home-discovery-mobile')).transform).a,
  }));
  await page.mouse.wheel(0, -120);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(before.y);
  await expect.poll(() => page.locator('.home-discovery-mobile').evaluate(element => new DOMMatrix(getComputedStyle(element).transform).a)).toBeGreaterThan(before.scale);
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

test('Wheel reversal changes depth progress before changing Discovery cards', async ({ page }) => {
  await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });
  await page.locator('.home-hero__hero-visual-06').click();
  await expect(page.locator('.home-discovery')).not.toHaveClass(/home-discovery--booting/, { timeout: 12000 });
  await expect(page.locator('.home-discovery')).toHaveAttribute('data-transition-ready', 'true');
  await expect(page.locator('.pin-spacer')).toHaveCount(1);
  await page.evaluate(() => window.scrollBy(0, 400));
  await expect.poll(() => page.locator('.home-discovery').evaluate(element => new DOMMatrix(getComputedStyle(element).transform).a)).toBeLessThan(0.99);

  const before = await page.evaluate(() => ({
    y: window.scrollY,
    scale: new DOMMatrix(getComputedStyle(document.querySelector('.home-discovery')).transform).a,
    card: document.querySelector('.home-game-carousel__card[aria-pressed="true"]').dataset.carouselPosition,
  }));
  await page.mouse.wheel(0, -120);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(before.y);
  await expect.poll(() => page.locator('.home-discovery').evaluate(element => new DOMMatrix(getComputedStyle(element).transform).a)).toBeGreaterThan(before.scale);
  await expect(page.locator('.home-discovery > .home-discovery__game-discovery-console .home-game-carousel__card[aria-pressed="true"]')).toHaveAttribute('data-carousel-position', before.card);
});

test('Depth scale and News position follow the same progress in both directions', async ({ page }) => {
  await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });
  await page.locator('.home-hero__hero-visual-06').click();
  await expect(page.locator('.pin-spacer')).toHaveCount(1, { timeout: 12000 });

  const anchor = await page.evaluate(() => window.scrollY);
  const measure = () => page.evaluate(() => ({
    scale: new DOMMatrix(getComputedStyle(document.querySelector('.home-discovery')).transform).a,
    newsTop: document.querySelector('.home-news').getBoundingClientRect().top,
  }));
  const baseline = await measure();
  const samples = new Map();
  for (const offset of [270, 540, 810, 1080, 810, 540, 270, 0, 270, 540]) {
    await page.evaluate(y => window.scrollTo(0, y), anchor + offset);
    const expectedScale = 1 - 0.12 * offset / 1080;
    await expect.poll(async () => (await measure()).scale).toBeCloseTo(expectedScale, 2);
    const current = await measure();
    expect(current.newsTop).toBeCloseTo(baseline.newsTop - offset, 0);
    if (samples.has(offset)) {
      expect(current.scale).toBeCloseTo(samples.get(offset).scale, 2);
      expect(current.newsTop).toBeCloseTo(samples.get(offset).newsTop, 0);
    } else samples.set(offset, current);
  }
});

test('Discovery dots sample the live scene and reverse with the depth progress', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await page.mouse.move(480, 320);
  await page.mouse.click(480, 320);
  await expect(page.locator('.nintendo-intro')).toHaveCount(0);
  await page.locator('.home-hero__hero-visual-06').click();
  await expect(page.locator('.pin-spacer')).toHaveCount(1, { timeout: 12000 });

  const anchor = await page.evaluate(() => window.scrollY);
  const measure = () => page.evaluate(() => {
    const discovery = document.querySelector('.home-discovery');
    const dotLayer = discovery.querySelector('.home-discovery__dot-layer');
    return {
      scale: new DOMMatrix(getComputedStyle(discovery).transform).a,
      original: Number(discovery.style.getPropertyValue('--home-dot-source-opacity')),
      dots: Number(discovery.style.getPropertyValue('--home-dot-opacity')),
      radius: parseFloat(discovery.style.getPropertyValue('--home-dot-radius')),
      cloneImage: dotLayer?.querySelector('.home-discovery__image')?.getAttribute('src'),
      sourceImage: discovery.querySelector(':scope > .home-discovery__game-discovery-console .home-discovery__image')?.getAttribute('src'),
      mask: dotLayer ? getComputedStyle(dotLayer).maskImage : 'none',
    };
  });
  const samples = new Map();
  for (const offset of [378, 702, 918, 1080, 918, 702, 378, 0]) {
    await page.evaluate(y => window.scrollTo(0, y), anchor + offset);
    await expect.poll(async () => (await measure()).scale).toBeCloseTo(1 - 0.12 * offset / 1080, 2);
    const sample = await measure();
    if (offset === 0) {
      await expect(page.locator('.home-discovery__dot-layer')).toHaveCount(0);
      expect(sample.original).toBe(1);
      continue;
    }
    expect(sample.cloneImage).toBe(sample.sourceImage);
    expect(sample.mask).toContain('radial-gradient');
    if (samples.has(offset)) {
      expect(sample.original).toBeCloseTo(samples.get(offset).original, 2);
      expect(sample.dots).toBeCloseTo(samples.get(offset).dots, 2);
      expect(sample.radius).toBeCloseTo(samples.get(offset).radius, 2);
    } else samples.set(offset, sample);
    if (offset === 702) await page.screenshot({ path: testInfo.outputPath('discovery-dots.png') });
  }
  expect(samples.get(378).original).toBeGreaterThan(samples.get(702).original);
  expect(samples.get(702).dots).toBeGreaterThan(samples.get(918).dots);
  expect(samples.get(702).radius).toBeGreaterThan(samples.get(918).radius);
});
