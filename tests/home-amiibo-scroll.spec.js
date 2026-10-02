import { test, expect } from '@playwright/test';

async function amiiboState(page, progress) {
  return page.evaluate(async requested => {
    const resource = performance.getEntriesByType('resource').find(entry => entry.name.includes('/gsap_ScrollTrigger.js'));
    const { ScrollTrigger } = await import(resource.name);
    const section = document.querySelector('[data-amiibo-scroll]');
    const trigger = ScrollTrigger.getAll().find(item => item.trigger === section);
    if (requested !== undefined) {
      window.scrollTo(0, trigger.start + (trigger.end - trigger.start) * requested);
      ScrollTrigger.update();
    }
    const root = section.getBoundingClientRect();
    const prefix = section.classList.contains('home-amiibo') ? '.home-amiibo' : '.home-amiibo-mobile';
    const first = section.querySelector(`${prefix}__${prefix.endsWith('mobile') ? 'text' : 'text-2'}`);
    const figures = [...section.querySelector('.home-amiibo-track').children];
    const line = section.querySelector('.home-amiibo__image-13');
    const marquee = section.querySelector('[data-name="infinite marquee animation-Amibo"]');
    return {
      progress: trigger?.animation.progress(),
      triggers: ScrollTrigger.getAll().filter(item => item.trigger === section).length,
      pinned: Boolean(trigger?.pin),
      active: Boolean(trigger?.isActive),
      top: root.top,
      width: root.width,
      range: trigger ? trigger.end - trigger.start : 0,
      end: trigger?.end,
      viewportHeight: innerHeight,
      scroll: scrollY,
      nextTop: section.closest('.pin-spacer')?.nextElementSibling?.getBoundingClientRect().top ?? section.nextElementSibling?.getBoundingClientRect().top,
      titleX: new DOMMatrix(getComputedStyle(first).transform).m41,
      lineClip: line ? getComputedStyle(line).clipPath : null,
      figures: figures.map(figure => Number(getComputedStyle(figure).opacity)),
      geometry: [...section.querySelectorAll('p, .home-amiibo-track > div, .home-amiibo__layer, [data-name="Dot"], .home-amiibo__layer-3, .home-amiibo__layer-6, .home-amiibo__layer-9')].map(node => {
        const rect = node.getBoundingClientRect();
        return { x: rect.x - root.x, y: rect.y - root.y, width: rect.width, height: rect.height, font: getComputedStyle(node).fontSize };
      }),
      background: getComputedStyle(section).backgroundColor,
      height: root.height,
      rolling: section.hasAttribute('data-amiibo-rolling'),
      marqueeX: new DOMMatrix(getComputedStyle(marquee).transform).m41,
    };
  }, progress);
}

async function seek(page, progress) {
  await amiiboState(page, progress);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await expect.poll(async () => Math.abs((await amiiboState(page)).progress - progress)).toBeLessThan(0.004);
}

function expectGeometry(actual, expected) {
  expect(actual).toHaveLength(expected.length);
  actual.forEach((box, index) => {
    for (const property of ['x', 'y', 'width', 'height']) {
      expect(box[property], `slot ${index}.${property}`).toBeCloseTo(expected[index][property], 1);
    }
    expect(box.font).toBe(expected[index].font);
  });
}

for (const width of [1920, 1280, 768, 390]) {
  test(`Amiibo preserves final slots and reverses one scrub timeline at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: width < 1024 ? 844 : 1080 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });
    await page.evaluate(() => document.fonts.ready);
    await page.locator(width < 1024 ? '.home-hero-mobile__layer-13' : '.home-hero__hero-visual-06').click();
    await expect(page.locator('[data-scroll-position]')).toHaveAttribute('data-transition-ready', 'true');
    const section = page.locator('[data-amiibo-scroll]');
    const baseline = await amiiboState(page);
    expect(baseline.triggers).toBe(0);
    expect(baseline.figures.every(opacity => opacity === 1)).toBe(true);
    const images = await section.locator('img').evaluateAll(async nodes => {
      await Promise.all(nodes.map(image => image.decode()));
      return nodes.map(image => ({ loaded: image.naturalWidth > 0, width: image.getBoundingClientRect().width, height: image.getBoundingClientRect().height }));
    });
    expect(images).toHaveLength(width < 1024 ? 24 : 28);
    expect(images.every(image => image.loaded && image.width > 0 && image.height > 0)).toBe(true);

    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await expect.poll(async () => (await amiiboState(page)).triggers).toBe(1);
    await seek(page, 0);
    const initial = await amiiboState(page);
    expect(initial.pinned).toBe(true);
    expect(Math.abs(initial.range - initial.viewportHeight * 1.5)).toBeLessThan(1);
    expect(initial.rolling).toBe(false);
    expect(initial.titleX).toBe(width < 1024 ? 12 : 60);
    expect(initial.figures.every(opacity => opacity === 0)).toBe(true);
    expect(initial.background).toBe(baseline.background);
    expect(initial.height).toBeCloseTo(baseline.height, 1);
    expect(initial.width).toBeCloseTo(baseline.width, 1);

    await amiiboState(page, -0.15);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const entering = await amiiboState(page);
    expect(entering.active).toBe(false);
    expect(entering.progress).toBe(0);
    expect(entering.titleX).toBe(initial.titleX);
    expect(entering.top).toBeGreaterThan(0);

    await seek(page, 0.1);
    const hold = await amiiboState(page);
    expect(hold.titleX).toBe(initial.titleX);
    expect(hold.figures.every(opacity => opacity === 0)).toBe(true);
    expect(Math.abs(hold.top)).toBeLessThan(1);
    expectGeometry(hold.geometry, initial.geometry);

    await seek(page, 0.5);
    const middle = await amiiboState(page);
    expect(middle.titleX).toBe(0);
    expect(middle.figures.every(opacity => opacity === 0)).toBe(true);
    if (middle.lineClip) {
      const sides = middle.lineClip.slice(6, -1).trim().split(/\s+/);
      expect(sides[1]).toBe(sides[3] ?? sides[1]);
      expect(Number.parseFloat(sides[1])).toBeGreaterThan(0);
      expect(Number.parseFloat(sides[1])).toBeLessThan(50);
    }
    await seek(page, 0.74);
    const stagger = await amiiboState(page);
    expect(stagger.figures[0]).toBeGreaterThan(0);
    expect(stagger.figures[11]).toBe(0);

    await seek(page, 0.99);
    const final = await amiiboState(page);
    expect(final.figures.every(opacity => opacity === 1)).toBe(true);
    expectGeometry(final.geometry, baseline.geometry);
    expect(final.rolling).toBe(false);
    await section.screenshot({ path: testInfo.outputPath(`amiibo-final-${width}.png`) });
    await amiiboState(page, 1.01);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const released = await amiiboState(page);
    expect(released.active).toBe(false);
    const scrollDelta = released.scroll - final.scroll;
    expect(Math.abs(released.top + released.scroll - released.end)).toBeLessThan(1);
    expect(Math.abs(released.nextTop - (final.nextTop - scrollDelta))).toBeLessThan(1);
    await expect.poll(async () => (await amiiboState(page)).rolling).toBe(true);
    await expect.poll(async () => (await amiiboState(page)).marqueeX).toBeLessThan(-1);
    const loop = await section.evaluate(node => {
      const marquee = node.querySelector('[data-name="infinite marquee animation-Amibo"]');
      const animation = marquee.getAnimations()[0];
      const running = animation.playState;
      animation.pause();
      animation.currentTime = 44999;
      const before = marquee.children[1].children[0].getBoundingClientRect().x;
      animation.currentTime = 45001;
      const after = marquee.children[0].children[0].getBoundingClientRect().x;
      return { running, gap: Math.abs(before - after) };
    });
    expect(loop.running).toBe('running');
    expect(loop.gap).toBeLessThan(1);

    await seek(page, 0.3);
    const reverse = await amiiboState(page);
    expect(reverse.titleX).toBeGreaterThan(0);
    expect(reverse.figures.every(opacity => opacity === 0)).toBe(true);
    expect(reverse.rolling).toBe(false);
    expect(reverse.marqueeX).toBe(0);
    await seek(page, 0);
    expect((await amiiboState(page)).titleX).toBe(initial.titleX);
    await seek(page, 0.1);
    expectGeometry((await amiiboState(page)).geometry, hold.geometry);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect.poll(async () => (await amiiboState(page)).triggers).toBe(0);
    expectGeometry((await amiiboState(page)).geometry, baseline.geometry);
    expect((await amiiboState(page)).rolling).toBe(false);
    expect(errors).toEqual([]);
  });
}

test('Amiibo follows real wheel reversal with Lenis and cleans up on mobile resize', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });
  await page.locator('.home-hero__hero-visual-06').click();
  await expect(page.locator('.home-discovery')).toHaveAttribute('data-transition-ready', 'true', { timeout: 12000 });
  await seek(page, 0.11);
  await page.mouse.move(400, 400);
  await page.mouse.wheel(0, 120);
  await expect.poll(async () => (await amiiboState(page)).progress).toBeGreaterThan(0.15);
  expect((await amiiboState(page)).titleX).toBeLessThan(60);
  await seek(page, 0.35);
  await page.mouse.wheel(0, 160);
  await expect.poll(async () => (await amiiboState(page)).progress).toBeGreaterThan(0.45);
  const forward = (await amiiboState(page)).progress;
  await page.mouse.wheel(0, -160);
  await expect.poll(async () => (await amiiboState(page)).progress).toBeLessThan(forward - 0.05);
  // Release the separate Discovery pin before changing the Home breakpoint.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(async () => (await amiiboState(page)).triggers).toBe(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.home-amiibo-mobile')).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(async () => (await amiiboState(page)).triggers).toBe(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => {
    history.pushState({}, '', '/support');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  await expect(page.locator('[data-amiibo-scroll]')).toHaveCount(0);
  expect(await page.evaluate(async () => {
    const resource = performance.getEntriesByType('resource').find(entry => entry.name.includes('/gsap_ScrollTrigger.js'));
    const { ScrollTrigger } = await import(resource.name);
    return ScrollTrigger.getAll().filter(trigger => trigger.trigger?.hasAttribute('data-amiibo-scroll')).length;
  })).toBe(0);
});
