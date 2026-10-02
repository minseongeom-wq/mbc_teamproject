import { test, expect } from '@playwright/test';

test('Switch cards consume downward scroll before Home continues to the next section', async ({ page }) => {
  await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });
  await page.locator('.home-hero__hero-visual-06').click();
  await expect(page.locator('.home-discovery')).toHaveClass(/home-discovery--booting/);
  await expect(page.locator('.home-transition')).toBeHidden({ timeout: 12000 });
  await expect(page.locator('.home-discovery')).not.toHaveClass(/home-discovery--booting/);

  const selected = page.locator('.home-game-carousel__card[aria-pressed="true"]');
  const sectionTop = await page.evaluate(() => window.scrollY);
  await expect(selected).toHaveAttribute('data-game', '2');
  for (const [game, position] of [[3, 3], [4, 4], [0, 5], [1, 6]]) {
    await page.mouse.wheel(0, 120);
    await expect(selected).toHaveAttribute('data-game', String(game));
    await expect(selected).toHaveAttribute('data-carousel-position', String(position));
    expect(await page.evaluate(() => window.scrollY)).toBe(sectionTop);
    await page.waitForTimeout(580);
  }

  await page.mouse.wheel(0, 350);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(sectionTop);
});

test('Mobile Discovery cards advance on scroll before the page moves on', async ({ page }) => {
  await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });
  await page.locator('.home-hero-mobile__layer-13').click();
  await expect(page.locator('.home-discovery-mobile')).toHaveClass(/home-discovery--booting/);
  await expect(page.locator('.home-transition')).toBeHidden({ timeout: 12000 });
  await expect(page.locator('.home-discovery-mobile')).not.toHaveClass(/home-discovery--booting/, { timeout: 12000 });

  const selected = page.locator('.home-mobile-carousel__card[aria-pressed="true"]');
  const sectionTop = await page.evaluate(() => window.scrollY);
  let previousGame = await selected.getAttribute('aria-label');
  for (let step = 0; step < 2; step += 1) {
    await page.mouse.wheel(0, 120);
    await expect.poll(() => selected.getAttribute('aria-label')).not.toBe(previousGame);
    previousGame = await selected.getAttribute('aria-label');
    expect(await page.evaluate(() => window.scrollY)).toBe(sectionTop);
    await page.waitForTimeout(580);
  }
  await page.mouse.wheel(0, 350);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(sectionTop);
});

test('Discovery cards resume after the depth transition reverses at a scaled desktop width', async ({ page }) => {
  await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
  await page.setViewportSize({ width: 1365, height: 720 });
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });
  await page.locator('.home-hero__hero-visual-06').click();
  await expect(page.locator('.home-transition')).toBeHidden({ timeout: 12000 });
  await expect(page.locator('.home-discovery')).not.toHaveClass(/home-discovery--booting/);
  await expect(page.locator('.home-discovery')).toHaveAttribute('data-transition-ready', 'true');
  await expect(page.locator('.pin-spacer')).toHaveCount(1);

  const selected = page.locator('.home-game-carousel__card[aria-pressed="true"]');
  const initialScroll = await page.evaluate(() => window.scrollY);
  await expect(page.locator('.home-discovery')).not.toHaveAttribute('data-depth-active', 'true');
  for (const game of ['3', '4', '0', '1']) {
    await page.mouse.wheel(0, 120);
    await expect(selected).toHaveAttribute('data-game', game);
    await expect(page.locator('.home-discovery')).not.toHaveClass(/home-discovery--booting/);
    expect(await page.evaluate(() => window.scrollY)).toBe(initialScroll);
    await page.waitForTimeout(580);
  }
  await page.mouse.wheel(0, 350);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(initialScroll);
  await expect(page.locator('.home-discovery')).toHaveAttribute('data-depth-active', 'true');
  await page.evaluate(y => window.scrollTo(0, y), initialScroll);
  await expect(page.locator('.home-discovery')).not.toHaveAttribute('data-depth-active', 'true');
  await page.mouse.wheel(0, -120);
  await expect(selected).toHaveAttribute('data-carousel-position', '5');
  expect(await page.evaluate(() => window.scrollY)).toBe(initialScroll);
});

test('Landing directly on Discovery still scrolls its cards before the page', async ({ page }) => {
  await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
  await page.setViewportSize({ width: 1365, height: 720 });
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });
  await page.evaluate(() => {
    const top = document.querySelector('.home-discovery').getBoundingClientRect().top;
    window.scrollTo(0, window.scrollY + top);
  });
  const start = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 120);
  await expect(page.locator('.home-game-carousel__card[aria-pressed="true"]')).toHaveAttribute('data-game', '3');
  expect(await page.evaluate(() => window.scrollY)).toBe(start);
  await expect(page.locator('.home-transition')).toBeHidden();

  const selected = page.locator('.home-game-carousel__card[aria-pressed="true"]');
  for (const game of ['4', '0', '1']) {
    await page.waitForTimeout(580);
    await page.mouse.wheel(0, 120);
    await expect(selected).toHaveAttribute('data-game', game);
  }
  await page.waitForTimeout(580);
  await page.mouse.wheel(0, 350);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(start);
  await page.evaluate(y => window.scrollTo(0, y - 20), start);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(start);
  await expect(page.locator('.home-transition')).toBeHidden();
  await expect(page.locator('.home-discovery')).not.toHaveClass(/home-discovery--booting/);
  await page.mouse.wheel(0, -120);
  await expect(selected).toHaveAttribute('data-carousel-position', '5');
});
