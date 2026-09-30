import { test, expect } from '@playwright/test';

test.use({ channel: 'chrome' });

test('Service title and image motion follows scrolling in both directions', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 900 });
  await page.goto('/about/history', { waitUntil: 'domcontentloaded' });
  const start = await page.locator('.history-service-stack').evaluate(element => element.getBoundingClientRect().top + window.scrollY);
  const read = async distance => {
    await page.evaluate(y => window.scrollTo(0, y), start + distance);
    await page.waitForTimeout(1100);
    return page.evaluate(() => {
      const panel = document.querySelector('.history-service-stack__panel--originality');
      const title = panel.querySelector('.history-service-motion__title-text');
      const image = panel.querySelector('.history-service-motion__image');
      return {
        titleClip: getComputedStyle(title).clipPath,
        imageScale: new DOMMatrixReadOnly(getComputedStyle(image).transform).a,
      };
    });
  };

  const entering = await read(-500);
  const settled = await read(330);
  const reversed = await read(-500);
  expect(entering.imageScale).toBeLessThan(0.95);
  expect(settled.imageScale).toBeGreaterThan(0.99);
  expect(reversed.imageScale).toBeLessThan(0.95);
  expect(entering.titleClip).not.toBe(settled.titleClip);
  expect(reversed.titleClip).not.toBe(settled.titleClip);

  for (const [id, enteringAt, settledAt] of [
    ['flexibility', 800, 1230],
    ['sincerity', 1900, 2315],
  ]) {
    const imageScale = async distance => {
      await page.evaluate(y => window.scrollTo(0, y), start + distance);
      await page.waitForTimeout(1100);
      return page.locator(`.history-service-stack__panel--${id} .history-service-motion__image`)
        .evaluate(element => new DOMMatrixReadOnly(getComputedStyle(element).transform).a);
    };
    expect(await imageScale(enteringAt)).toBeLessThan(0.95);
    expect(await imageScale(settledAt)).toBeGreaterThan(0.99);
  }
});

test('red boundary scrolls away before ORIGINALITY becomes sticky', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 900 });
  await page.goto('/about/history', { waitUntil: 'domcontentloaded' });
  const stack = page.locator('.history-service-stack');
  const start = await stack.evaluate(element => element.getBoundingClientRect().top + window.scrollY);
  const read = async distance => {
    await page.evaluate(y => window.scrollTo(0, y), start + distance);
    await page.waitForTimeout(100);
    return page.evaluate(() => ({
      redBottom: Math.round(document.querySelector('.history-story-transition').getBoundingClientRect().bottom),
      panelTop: Math.round(document.querySelector('.history-service-stack__panel--originality').getBoundingClientRect().top),
      edgeBottom: Math.round(document.querySelector('.history-service-stack__entry-edge').getBoundingClientRect().bottom),
    }));
  };

  expect(await read(0)).toEqual({ redBottom: 0, panelTop: 0, edgeBottom: 232 });
  expect(await read(200)).toEqual({ redBottom: -200, panelTop: -200, edgeBottom: 32 });
  expect(await read(330)).toEqual({ redBottom: -330, panelTop: -330, edgeBottom: -98 });
  expect(await read(500)).toEqual({ redBottom: -500, panelTop: -330, edgeBottom: -268 });
  await expect(page.locator('.history-story-transition')).toHaveCSS('height', '1080px');
});

test('original section heights remain while sticky panels cover each other', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 900 });
  await page.goto('/about/history', { waitUntil: 'domcontentloaded' });
  const stack = page.locator('.history-service-stack');
  const panels = stack.locator('.history-service-stack__panel');
  const projects = page.locator('.history-visual-story');
  await expect(panels).toHaveCount(3);
  await expect(projects.locator('.history-card')).toHaveCount(3);
  expect(await panels.evaluateAll(elements => elements.map(element => element.offsetHeight))).toEqual([1230, 1085, 1230]);

  const start = await stack.evaluate(element => element.getBoundingClientRect().top + window.scrollY);
  const positions = [];
  for (const distance of [-450, 615, 1230, 1772, 2315, 2930, 3545]) {
    await page.evaluate(y => window.scrollTo(0, y), start + distance);
    await page.waitForTimeout(100);
    positions.push(await page.evaluate(() => ({
      philosophyBottom: Math.round(document.querySelector('.history-story-transition').getBoundingClientRect().bottom),
      panels: [...document.querySelectorAll('.history-service-stack__panel')].map(element => Math.round(element.getBoundingClientRect().top)),
      projectsTop: Math.round(document.querySelector('.history-visual-story').getBoundingClientRect().top),
    })));
  }

  expect(positions[0].philosophyBottom).toBe(450);
  expect(positions[0].panels[0]).toBe(450);
  expect(positions[1].panels[1]).toBe(615);
  expect(positions[2].panels[1]).toBe(0);
  expect(positions[3].panels[2]).toBe(543);
  expect(positions[4].panels[2]).toBe(0);
  expect(positions[5].projectsTop).toBe(615);
  expect(positions[6].projectsTop).toBe(0);
  await expect(projects).toHaveCSS('height', '1300px');
  expect(await projects.evaluate(element => getComputedStyle(element, '::before').height)).toBe('42px');
});

test('wheel scroll preserves a partial overlap between Service panels', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 900 });
  await page.goto('/about/history', { waitUntil: 'domcontentloaded' });
  const stack = page.locator('.history-service-stack');
  const start = await stack.evaluate(element => element.getBoundingClientRect().top + window.scrollY);
  await page.evaluate(y => window.scrollTo(0, y), start);
  await expect.poll(() => stack.locator('.history-service-stack__panel').first().evaluate(element => Math.abs(element.getBoundingClientRect().top))).toBeLessThan(120);
  await page.mouse.wheel(0, 610);
  await expect.poll(() => stack.locator('.history-service-stack__panel').nth(1).evaluate(element => element.getBoundingClientRect().top)).toBeLessThan(1085);
  const nextTop = await stack.locator('.history-service-stack__panel').nth(1).evaluate(element => element.getBoundingClientRect().top);
  expect(nextTop).toBeGreaterThan(0);
  expect(nextTop).toBeLessThan(1085);
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('uses the original sections in normal flow', async ({ page }) => {
    await page.goto('/about/history', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.history-service-stack__panel').first()).toHaveCSS('position', 'relative');
  });
});
