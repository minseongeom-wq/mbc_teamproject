import { test, expect } from '@playwright/test';

async function openHome(page, width = 1920, height = 1080) {
  await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
  await page.setViewportSize({ width, height });
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });
}

async function expectDiscoveryBoot(page) {
  const transition = page.locator('.home-transition');
  await expect(transition).toBeVisible();
  await expect(page.locator('.home-transition__pixel')).toHaveCount(0);
  await expect(page.locator('.home-transition__icon')).toHaveCount(0);
  await expect(transition).toHaveCSS('background-color', 'rgb(0, 0, 0)');
}

async function expectCompletedDiscovery(page) {
  await expect(page.locator('.home-transition')).toBeHidden({ timeout: 12000 });
  await expect(page.locator('.home-discovery__game-carousel-viewport')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(page.locator('.home-discovery')).not.toHaveClass(/home-discovery--booting/);
  const alignment = await page.evaluate(() => ({
    sectionTop: document.querySelector('.home-discovery').getBoundingClientRect().top,
    overflow: document.body.style.overflow,
  }));
  expect(Math.abs(alignment.sectionTop)).toBeLessThan(2);
  expect(alignment.overflow).not.toBe('hidden');
}

test('Hero transition button boots the actual Game Discovery section', async ({ page }) => {
  await openHome(page);
  await page.locator('.home-hero__hero-visual-06').click();
  await expectDiscoveryBoot(page);
  await expectCompletedDiscovery(page);
});

test('Scrolling from Hero reuses the same transition once', async ({ page }) => {
  await openHome(page);
  await page.mouse.wheel(0, 1000);
  await expect(page.locator('.home-transition')).toBeHidden();
  await page.mouse.wheel(0, 350);
  await expect(page.locator('.home-transition')).toBeVisible();
  await expectDiscoveryBoot(page);
  await expect.poll(() => page.locator('.home-transition').evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThan(0);
  await page.mouse.wheel(0, 1000);
  await expectCompletedDiscovery(page);
  await expect(page.locator('.home-transition')).toBeHidden();
});

test('Small wheel steps finish the Hero transition before changing Discovery cards', async ({ page }) => {
  await openHome(page);
  const selected = page.locator('.home-game-carousel__card[aria-pressed="true"]');
  await page.evaluate(() => {
    const top = document.querySelector('.home-discovery').getBoundingClientRect().top;
    window.scrollTo(0, window.scrollY + top - 100);
  });
  await expect(page.locator('.home-transition')).toBeVisible();
  await page.mouse.wheel(0, 120);
  await expectCompletedDiscovery(page);
  await expect(selected).toHaveAttribute('data-game', '2');
});

test('Scrolling into Discovery boots once and keeps its cards available', async ({ page }) => {
  await openHome(page, 1365, 720);
  await page.mouse.wheel(0, 1000);
  await page.waitForTimeout(700);
  await page.mouse.wheel(0, 500);
  await expect(page.locator('.home-discovery')).not.toHaveClass(/home-discovery--booting/, { timeout: 12000 });
  await expect(page.locator('.home-transition')).toBeHidden();
  await page.waitForTimeout(1500);
  await expect(page.locator('.home-discovery')).not.toHaveClass(/home-discovery--booting/);
  await expect(page.locator('.home-transition')).toBeHidden();
  await page.mouse.wheel(0, 120);
  await expect(page.locator('.home-game-carousel__card[aria-pressed="true"]')).toHaveAttribute('data-game', '3');
});

test('The black panel follows forward and reverse scroll before the Switch boots', async ({ page }) => {
  await openHome(page);
  await page.mouse.wheel(0, 1350);
  const panel = page.locator('.home-transition');
  await expect(panel).toBeVisible();
  await page.waitForTimeout(750);
  const forwardTop = await panel.evaluate(element => element.getBoundingClientRect().top);
  expect(forwardTop).toBeGreaterThan(0);
  expect(forwardTop).toBeLessThan(1080);

  await page.mouse.wheel(0, -150);
  await expect.poll(() => panel.evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThan(forwardTop);
  await page.mouse.wheel(0, 1000);
  await expectCompletedDiscovery(page);
});

test('Scrolling up from Discovery reverses the console and rising panel back to Hero', async ({ page }) => {
  await openHome(page, 1365, 720);
  await page.locator('.home-hero__hero-visual-06').click();
  await expectCompletedDiscovery(page);

  const selected = page.locator('.home-game-carousel__card[aria-pressed="true"]');
  for (const position of ['1', '0']) {
    await page.mouse.wheel(0, -120);
    await expect(selected).toHaveAttribute('data-carousel-position', position);
    await page.waitForTimeout(580);
  }

  await page.mouse.wheel(0, -350);
  const panel = page.locator('.home-transition');
  await expect(panel).toBeVisible();
  await expect.poll(() => panel.evaluate(element => element.getBoundingClientRect().top)).toBe(0);
  await page.evaluate(() => window.dispatchEvent(new Event('scroll')));
  await page.evaluate(() => window.scrollBy(0, 1));
  await page.waitForTimeout(700);
  await expect(panel).toBeVisible();
  await expect(page.locator('.home-discovery')).toHaveClass(/home-discovery--booting/);
  await page.mouse.wheel(0, -350);
  await expect.poll(() => panel.evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThan(0);
  await page.mouse.wheel(0, -1000);
  await expect(panel).toBeHidden();
  await expect(page.locator('.home-hero')).toBeInViewport();

  await page.locator('.home-hero__hero-visual-06').click();
  await expectCompletedDiscovery(page);
});

test('Three deliberate upward wheel steps start the reverse transition promptly', async ({ page }) => {
  await openHome(page, 1365, 720);
  await page.locator('.home-hero__hero-visual-06').click();
  await expectCompletedDiscovery(page);

  const selected = page.locator('.home-game-carousel__card[aria-pressed="true"]');
  await page.mouse.wheel(0, -120);
  await expect(selected).toHaveAttribute('data-carousel-position', '1');
  await page.waitForTimeout(220);
  await page.mouse.wheel(0, -120);
  await expect(selected).toHaveAttribute('data-carousel-position', '0');
  await page.waitForTimeout(220);
  await page.mouse.wheel(0, -120);
  await expect(page.locator('.home-transition')).toBeVisible();
});

test('Continuous upward wheel input carries through console shutdown into Hero', async ({ page }) => {
  await openHome(page, 1365, 720);
  await page.locator('.home-hero__hero-visual-06').click();
  await expectCompletedDiscovery(page);
  await page.evaluate(() => {
    window.reverseFrames = [];
    const capture = () => {
      const panel = document.querySelector('.home-transition');
      window.reverseFrames.push({ top: panel.getBoundingClientRect().top, opacity: Number(getComputedStyle(panel).opacity) });
      window.reverseFrameId = requestAnimationFrame(capture);
    };
    capture();
  });
  for (let step = 0; step < 14; step += 1) {
    await page.mouse.wheel(0, -120);
    await page.waitForTimeout(80);
  }
  await expect(page.locator('.home-transition')).toBeHidden();
  const frames = await page.evaluate(() => {
    cancelAnimationFrame(window.reverseFrameId);
    return window.reverseFrames;
  });
  expect(frames.some(frame => frame.opacity > 0.9 && frame.top > 10 && frame.top < 710)).toBe(true);
  await expect(page.locator('.home-hero')).toBeInViewport();
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
  await expect(page.locator('.home-discovery')).not.toHaveAttribute('data-transition-ready', 'true');
  await page.locator('.home-hero__hero-visual-06').click();
  await expectCompletedDiscovery(page);
  await expect(page.locator('.pin-spacer')).toHaveCount(1);
});

test('Changing direction during the rising Hero panel boots Discovery again', async ({ page }) => {
  await openHome(page, 1365, 720);
  await page.locator('.home-hero__hero-visual-06').click();
  await expectCompletedDiscovery(page);
  const selected = page.locator('.home-game-carousel__card[aria-pressed="true"]');
  for (const position of ['1', '0']) {
    await page.mouse.wheel(0, -120);
    await expect(selected).toHaveAttribute('data-carousel-position', position);
    await page.waitForTimeout(220);
  }
  await page.mouse.wheel(0, -120);
  await expect(page.locator('.home-discovery')).toHaveClass(/home-discovery--booting/);
  await page.mouse.wheel(0, -350);
  await expect.poll(() => page.locator('.home-transition').evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThan(0);
  await page.mouse.wheel(0, 350);
  await expectCompletedDiscovery(page);
});

test('Mobile Hero control reveals the existing mobile Discovery layout', async ({ page }) => {
  await openHome(page, 390, 844);
  await page.locator('.home-hero-mobile__layer-13').click();
  await expect(page.locator('.home-transition')).toBeVisible();
  await expect(page.locator('.home-transition__icon')).toHaveCount(0);
  await expect(page.locator('.home-transition')).toBeHidden({ timeout: 12000 });
  await expect(page.locator('.home-discovery-mobile')).not.toHaveClass(/home-discovery--booting/);
  await expect(page.locator('.home-discovery-mobile')).toBeInViewport();
});

test('Reduced motion boots without a second input', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openHome(page);
  await page.locator('.home-hero__hero-visual-06').click();
  await expect(page.locator('.home-transition__icon')).toHaveCount(0);
  await expectCompletedDiscovery(page);
});
