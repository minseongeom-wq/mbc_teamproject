import { test, expect } from '@playwright/test';

test('History intro gives way to the full-height Philosophy section and cleans up', async ({ page }) => {
  await page.goto('/about/history', { waitUntil: 'domcontentloaded' });
  const intro = page.locator('.intro-transition');
  const red = intro.locator('.intro-transition__red-content');
  const philosophy = page.locator('.history-story-transition');

  await expect(intro).toBeVisible();
  await expect(red).toHaveCSS('visibility', 'hidden');
  await expect(red).toHaveCSS('visibility', 'visible', { timeout: 6000 });
  await expect(page.locator('.pin-spacer')).toHaveCount(1);
  expect(await philosophy.evaluate(element => element.offsetHeight)).toBe(1080);
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.6));
  expect(await philosophy.evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThan(await page.evaluate(() => window.innerHeight));
  await page.evaluate(() => window.scrollTo(0, 1650));
  await expect.poll(() => philosophy.evaluate(element => element.getBoundingClientRect().top)).toBeLessThan(720);

  await page.locator('.navigation__logo').click();
  await expect(page.locator('.home-page')).toBeVisible();
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
});

test('the next section waits until the full-height Story hero has finished its pinned scroll', async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 1920, height: 900 } });
  await page.goto('/about/history', { waitUntil: 'domcontentloaded' });
  const hero = page.locator('.intro-transition');
  const title = hero.locator('.history-hero-story__title');
  const next = page.locator('.history-story-transition');
  expect(await hero.evaluate(element => element.offsetHeight)).toBe(1080);

  await page.waitForTimeout(3600);
  await page.evaluate(() => window.scrollTo(0, 450));
  await page.waitForTimeout(900);
  const titleBottom = await title.evaluate(element => element.getBoundingClientRect().bottom);
  const nextTop = await next.evaluate(element => element.getBoundingClientRect().top);
  expect(titleBottom).toBeGreaterThan(0);
  expect(nextTop).toBeGreaterThan(900);

  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(900);
  const heroBottom = await hero.evaluate(element => element.getBoundingClientRect().bottom);
  const revealedNextTop = await next.evaluate(element => element.getBoundingClientRect().top);
  expect(Math.abs(heroBottom - revealedNextTop)).toBeLessThan(2);
  await page.close();
});

test('Philosophy caption remains in its original 1080px section', async ({ browser }) => {
  const page = await browser.newPage({ viewport: { width: 1920, height: 720 } });
  await page.goto('/about/history', { waitUntil: 'domcontentloaded' });
  const philosophy = page.locator('.history-story-transition');
  expect(await philosophy.evaluate(element => element.offsetHeight)).toBe(1080);
  await philosophy.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 360));
  const caption = philosophy.locator('.history-story-transition__text--right');
  await expect.poll(() => caption.evaluate(element => element.getBoundingClientRect().bottom)).toBeLessThanOrEqual(720);
  await page.close();
});

test('Philosophy section scrolls normally while its content moves and Service panels remain sticky', async ({ page }) => {
  await page.goto('/about/history', { waitUntil: 'domcontentloaded' });
  const philosophy = page.locator('.history-story-transition');
  const service = page.locator('.history-service-stack');
  const title = philosophy.locator('.history-story-transition__text--left > strong');
  const sectionStart = await philosophy.evaluate(element => {
    const rect = element.getBoundingClientRect();
    return window.scrollY + rect.top;
  });
  expect(await philosophy.evaluate(element => element.parentElement.classList.contains('pin-spacer'))).toBe(false);

  await page.waitForTimeout(3600);
  await page.evaluate(y => window.scrollTo(0, y), sectionStart + 420);
  await page.waitForTimeout(950);
  const initialTop = await philosophy.evaluate(element => element.getBoundingClientRect().top);
  const initialTextY = await title.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m42);

  await page.evaluate(y => window.scrollTo(0, y), sectionStart + 720);
  await page.waitForTimeout(950);
  const advancedTop = await philosophy.evaluate(element => element.getBoundingClientRect().top);
  const advancedTextY = await title.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m42);
  expect(advancedTop).toBeLessThan(initialTop - 250);
  expect(advancedTextY).toBeLessThan(initialTextY - 10);
  expect(await service.evaluate(element => element.getBoundingClientRect().top)).toBeLessThan(await page.evaluate(() => window.innerHeight));
});

test('the large hero title stays opaque while it scrolls out with the red panel', async ({ page }) => {
  await page.goto('/about/history', { waitUntil: 'domcontentloaded' });
  const title = page.locator('.intro-transition .history-hero-story__title');
  await expect(title).toHaveCSS('opacity', '1', { timeout: 6000 });
  const initialTop = await title.evaluate(element => element.getBoundingClientRect().top);

  await page.mouse.wheel(0, await page.evaluate(() => window.innerHeight * 0.4));
  await expect.poll(() => title.evaluate(element => element.getBoundingClientRect().top)).toBeLessThan(initialTop);
  await expect(title).toHaveCSS('opacity', '1');
  await expect(title).toHaveCSS('visibility', 'visible');
});

test('Beginning and Philosophy text groups react to scroll and settle without changing layout', async ({ page }) => {
  await page.goto('/about/history', { waitUntil: 'domcontentloaded' });
  const section = page.locator('.history-story-transition');
  const textGroups = section.locator('.history-story-transition__text');
  const layout = await textGroups.evaluateAll(elements => elements.map(element => element.offsetTop));
  const translateY = async (index) => textGroups.nth(index).evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m42);

  await page.waitForTimeout(3600);
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(1100);
  await page.mouse.wheel(0, 220);
  await expect.poll(() => translateY(0), { intervals: [20, 20, 50, 100] }).toBeGreaterThan(0);
  await expect.poll(() => translateY(1), { intervals: [20, 20, 50, 100] }).toBeGreaterThan(0);
  await expect.poll(async () => Math.abs(await translateY(0)), { timeout: 2000 }).toBeLessThan(0.1);
  await expect.poll(async () => Math.abs(await translateY(1)), { timeout: 2000 }).toBeLessThan(0.1);
  await page.mouse.wheel(0, -220);
  await expect.poll(() => translateY(0), { intervals: [20, 20, 50, 100] }).toBeLessThan(0);
  await expect.poll(() => translateY(1), { intervals: [20, 20, 50, 100] }).toBeLessThan(0);
  await expect.poll(async () => Math.abs(await translateY(0)), { timeout: 2000 }).toBeLessThan(0.1);
  expect(await textGroups.evaluateAll(elements => elements.map(element => element.offsetTop))).toEqual(layout);
  expect(await section.evaluate(element => element.offsetHeight)).toBe(1080);
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('shows the final intro state without a pin', async ({ page }) => {
    await page.goto('/about/history', { waitUntil: 'domcontentloaded' });
    const intro = page.locator('.intro-transition');
    await expect(intro.locator('.intro-transition__red-content')).toBeVisible();
    await expect(intro.locator('.intro-transition__white')).toBeHidden();
    await expect(page.locator('.pin-spacer')).toHaveCount(0);
  });
});
