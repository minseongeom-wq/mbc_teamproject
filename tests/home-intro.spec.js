import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

const reference = JSON.parse(readFileSync(new URL('../src/components/home/intro/figma-keyframes.json', import.meta.url), 'utf8'));
const pairs = [
  ['N', '3432:7008', '1233:4900'], ['i', '3432:7007', '1233:4917'],
  ['n-first', '3432:7002', '1233:4905'], ['t', '3432:7006', '1233:4920'],
  ['e', '3432:7003', '1233:4908'], ['n-second', '3432:7004', '1233:4911'],
  ['d', '3432:7005', '1233:4903'], ['o', '3432:7000', '1233:4914'],
  ['registered', '3432:7009', '1233:4924'],
];

function bounds(node) {
  const [[a, c, x], [b, d, y]] = node.m;
  const corners = [[0, 0], [node.w, 0], [0, node.h], [node.w, node.h]].map(([u, v]) => ({ x: a * u + c * v + x, y: b * u + d * v + y }));
  const xs = corners.map(p => p.x), ys = corners.map(p => p.y);
  return { x: Math.min(...xs), y: Math.min(...ys), width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys) };
}

async function expectFrame(page, state, viewport = { width: 1920, height: 1080 }) {
  const scale = Math.min(viewport.width / 1920, viewport.height / 1080);
  const offset = { x: (viewport.width - 1920 * scale) / 2, y: (viewport.height - 1080 * scale) / 2 };
  for (const [letter, startId, endId] of pairs) {
    const node = reference[state].letters.find(n => n.id === (state === 'start' ? startId : endId));
    const target = bounds(node);
    const actual = await page.locator(`[data-letter="${letter}"] img`).first().boundingBox();
    for (const key of ['x', 'y', 'width', 'height']) {
      expect(Math.abs(actual[key] - (target[key] * scale + (offset[key] || 0))), `${state}: ${letter}.${key}`).toBeLessThan(0.15);
    }
  }
  // The two paths of ® must remain aligned under the same parent transform.
  const r = bounds(reference[state].letters.find(n => n.id === (state === 'start' ? '3432:7001' : '1233:4923')));
  const actualR = await page.locator('[data-letter="registered"] img').nth(1).boundingBox();
  for (const key of ['x', 'y', 'width', 'height']) {
    expect(Math.abs(actualR[key] - (r[key] * scale + (offset[key] || 0)))).toBeLessThan(0.15);
  }
}

// Reuse Vite's exact module URL (including its cache key), without a debug API.
async function captureTimeline(page) {
  await page.locator('.nintendo-intro img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
  await page.evaluate(async () => {
    const resource = performance.getEntriesByType('resource').find(entry => /\/gsap\.js\?/.test(entry.name));
    const { gsap } = await import(resource.name);
    window.introTestTimeline = gsap.globalTimeline.getChildren().find(t => t.labels?.scatter);
    window.introTestTimeline.pause(0);
  });
}

test('intro preserves Figma endpoints, bounces as one logo, releases and holds deterministically', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await captureTimeline(page);
  expect(await page.evaluate(() => window.introTestTimeline.timeScale())).toBe(1.3);
  await page.locator('.nintendo-intro img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
  await expectFrame(page, 'start');
  await expect(page.locator('.nintendo-intro__letter')).toHaveCount(9);
  await expect(page.locator('.nintendo-intro')).toHaveCSS('background-color', 'rgb(230, 0, 18)');
  expect(await page.evaluate(() => document.elementFromPoint(960, 540)?.closest('.nintendo-intro__logo-layer') !== null)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('aligned.png') });

  const squash = await page.evaluate(() => {
    window.introTestTimeline.seek(0.46);
    const matrix = new DOMMatrix(getComputedStyle(document.querySelector('.nintendo-intro__logo')).transform);
    return { x: matrix.a, y: matrix.d };
  });
  expect(squash.x).toBeCloseTo(1.025, 3);
  expect(squash.y).toBeCloseTo(0.92, 3);
  await page.evaluate(() => { window.introTestTimeline.seek('settle'); });
  await expectFrame(page, 'start');

  await page.evaluate(() => { window.introTestTimeline.play(0); });
  await expect(page.locator('.nintendo-intro')).toHaveAttribute('data-phase', 'scatter');
  await expect(page.locator('.nintendo-intro')).toHaveAttribute('data-phase', 'hold');
  await page.evaluate(() => { window.introTestTimeline.pause('hold'); });
  await expectFrame(page, 'scatter');
  await page.screenshot({ path: testInfo.outputPath('scatter.png') });
  await page.evaluate(() => { window.introTestTimeline.restart().pause().seek('hold'); });
  await expectFrame(page, 'scatter');
  const exit = await page.evaluate(() => {
    const letters = [...document.querySelectorAll('.nintendo-intro__letter')];
    const centers = letters.map(node => {
      const matrix = new DOMMatrix(getComputedStyle(node).transform);
      return [matrix.e, matrix.f];
    });
    window.introTestTimeline.seek('logo-exit+=0.18');
    return letters.map((node, index) => {
      const matrix = new DOMMatrix(getComputedStyle(node).transform);
      return { before: centers[index], after: [matrix.e, matrix.f], opacity: Number(getComputedStyle(node).opacity) };
    });
  });
  exit.forEach(letter => {
    expect(letter.after).toEqual(letter.before);
    expect(letter.opacity).toBeGreaterThan(0);
    expect(letter.opacity).toBeLessThan(1);
  });
  expect(errors).toEqual([]);
});

test('viewport changes preserve the scatter composition without global layout changes', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await captureTimeline(page);
  await page.evaluate(() => { window.introTestTimeline.seek('hold'); });
  await expectFrame(page, 'scatter');
  expect(await page.locator('.home-hero').boundingBox()).toMatchObject({ x: 0, y: 0, width: 1920, height: 1883 });
  expect((await page.locator('.common-footer').boundingBox()).y).toBe(13175);
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await expect.poll(() => page.locator('.nintendo-intro__stage').evaluate(n => n.getBoundingClientRect().width)).toBeCloseTo(viewport.width, 1);
    await expectFrame(page, 'scatter', viewport);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(viewport.width);
  }
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
});

test('unmount cancels animation and remount creates only one intro under React StrictMode', async ({ page }) => {
  await page.goto('/');
  await captureTimeline(page);
  await page.evaluate(() => {
    window.history.pushState({}, '', '/support');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  await expect(page.locator('.nintendo-intro')).toHaveCount(0);
  expect(await page.evaluate(() => window.introTestTimeline.parent === null)).toBe(true);
  expect(await page.evaluate(() => [document.body.style.overflow, document.documentElement.style.overflow, document.getElementById('root').inert])).toEqual(['', '', false]);
  await page.goBack();
  await expect(page.locator('.nintendo-intro')).toHaveCount(1);
  await expect(page.locator('.nintendo-intro__letter')).toHaveCount(9);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.nintendo-intro')).toHaveAttribute('data-phase', 'video');
});

test('real video ended reveals the already-mounted Home with a one-second panel slide and restores scroll', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.evaluate(() => {
    window.introHero = document.querySelector('.home-hero');
    window.introEvents = {};
    const video = document.querySelector('.nintendo-intro__video');
    video.addEventListener('ended', () => { window.introEvents.ended = performance.now(); });
    video.addEventListener('play', () => { window.introEvents.plays = (window.introEvents.plays || 0) + 1; });
    const panel = document.querySelector('.nintendo-intro');
    new MutationObserver(() => {
      if (panel.dataset.phase === 'revealing') window.introEvents.reveal ??= performance.now();
      if (!panel.isConnected) window.introEvents.removed ??= performance.now();
    }).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['data-phase'] });
  });
  const heroBefore = await page.locator('.home-hero').boundingBox();
  await expect(page.locator('.nintendo-intro')).toHaveAttribute('data-phase', 'video', { timeout: 10000 });
  await expect(page.locator('.nintendo-intro')).toHaveAttribute('data-video-ready', 'true');
  const video = page.locator('.nintendo-intro__video');
  await expect(video).toHaveCSS('object-fit', 'contain');
  await expect(page.locator('.nintendo-intro__video-wrapper')).toHaveCSS('background-color', 'rgb(230, 0, 18)');
  expect(await video.evaluate(v => ({ muted: v.muted, inline: v.playsInline, autoplay: v.autoplay, loop: v.loop, duration: v.duration, rate: v.playbackRate }))).toEqual({ muted: true, inline: true, autoplay: true, loop: false, duration: 8, rate: 1 });
  await page.mouse.wheel(0, 1000);
  await page.keyboard.press('PageDown');
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await page.waitForFunction(() => document.querySelector('video').currentTime > 2);
  await page.screenshot({ path: testInfo.outputPath('video-desktop.png') });
  await expect(page.locator('.nintendo-intro')).toHaveAttribute('data-phase', 'revealing', { timeout: 10000 });
  await page.waitForFunction(() => document.querySelector('.nintendo-intro')?.getBoundingClientRect().y < -200);
  await expect(page.locator('.nintendo-intro')).toHaveCSS('opacity', '1');
  expect(await page.locator('.home-hero').boundingBox()).toEqual(heroBefore);
  await page.screenshot({ path: testInfo.outputPath('panel-slide.png') });
  await expect(page.locator('.nintendo-intro')).toHaveCount(0);
  const result = await page.evaluate(() => ({
    sameHero: window.introHero === document.querySelector('.home-hero'),
    events: window.introEvents,
    bodyOverflow: document.body.style.overflow,
    htmlOverflow: document.documentElement.style.overflow,
    inert: document.getElementById('root').inert,
  }));
  expect(result.sameHero).toBe(true);
  expect(result.bodyOverflow).toBe('');
  expect(result.htmlOverflow).toBe('');
  expect(result.inert).toBe(false);
  expect(result.events.plays).toBe(1);
  expect(result.events.reveal - result.events.ended).toBeLessThan(100);
  expect(result.events.reveal - result.events.ended).toBeGreaterThanOrEqual(0);
  expect(result.events.removed - result.events.reveal).toBeGreaterThan(800);
  expect(result.events.removed - result.events.reveal).toBeLessThan(1300);
  expect(await page.locator('.home-hero').boundingBox()).toEqual(heroBefore);
  await page.getByRole('button', { name: 'MENU', exact: true }).click();
  await expect(page.locator('.dropdown')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.mouse.wheel(0, 500);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  expect(errors).toEqual([]);
});

test('portrait video preserves the full frame and reduced motion finishes without a panel animation', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveAttribute('data-phase', 'video');
  await expect(page.locator('video')).toHaveCSS('object-fit', 'contain');
  await page.waitForFunction(() => document.querySelector('video').currentTime > 2);
  await page.screenshot({ path: testInfo.outputPath('video-portrait.png') });
  await page.evaluate(() => { document.querySelector('video').currentTime = 7.8; });
  await expect(page.locator('.nintendo-intro')).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
});

test('intermediate desktop aspect ratio keeps the full source frame centered in the red wrapper', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1600, height: 960 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveAttribute('data-phase', 'video');
  const video = page.locator('.nintendo-intro__video');
  await expect(video).toHaveCSS('object-fit', 'contain');
  await expect(video).toHaveCSS('object-position', '50% 50%');
  const geometry = await video.evaluate(element => {
    const wrapper = element.parentElement.getBoundingClientRect();
    const scale = Math.min(wrapper.width / element.videoWidth, wrapper.height / element.videoHeight);
    return {
      wrapper: { width: wrapper.width, height: wrapper.height },
      frame: { width: element.videoWidth * scale, height: element.videoHeight * scale },
    };
  });
  expect(geometry.wrapper).toEqual({ width: 1600, height: 960 });
  expect(geometry.frame.width).toBe(1600);
  expect(geometry.frame.height).toBe(900);
  await expect(page.locator('.nintendo-intro__video-wrapper')).toHaveCSS('background-color', 'rgb(230, 0, 18)');
  await page.waitForFunction(() => document.querySelector('video').currentTime > 2);
  await page.screenshot({ path: testInfo.outputPath('video-contained-desktop.png') });
});

test('video failure releases the panel and restores existing inline scroll settings', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/Sequence%2002_1.mp4', route => route.abort());
  await page.route('http://127.0.0.1:4173/', async route => {
    const response = await route.fetch();
    await route.fulfill({ response, body: (await response.text()).replace('<body>', '<body style="overflow: auto !important;">') });
  });
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toBeVisible();
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });
  expect(await page.evaluate(() => [document.body.style.overflow, document.body.style.getPropertyPriority('overflow'), document.getElementById('root').inert])).toEqual(['auto', 'important', false]);
  expect(errors).toEqual([]);
});
