import { test, expect } from '@playwright/test';

async function state(page, requested) {
  return page.evaluate(async requested => {
    const resource = performance.getEntriesByType('resource').find(e => e.name.includes('/gsap_ScrollTrigger.js'));
    const { ScrollTrigger } = await import(resource.name);
    const root = document.querySelector('.home-picks');
    const triggers = ScrollTrigger.getAll().filter(t => t.trigger === root);
    const trigger = triggers[0];
    if (requested !== undefined) {
      scrollTo(0, trigger.start + (trigger.end - trigger.start) * requested);
      ScrollTrigger.update();
    }
    const rect = root.getBoundingClientRect();
    const scale = rect.width / 1920;
    const visual = id => {
      const node = root.querySelector(`[data-node-id="${id}"]`);
      return { opacity: Number(getComputedStyle(node).opacity), y: new DOMMatrix(getComputedStyle(node).transform).m42 };
    };
    return {
      triggers: triggers.length, progress: trigger?.animation.progress(),
      repeat: trigger?.animation.repeat(), pin: Boolean(trigger?.pin),
      duration: trigger?.animation.duration(),
      distance: trigger ? trigger.end - trigger.start : 0,
      normalDistance: rect.height + window.innerHeight,
      paused: trigger?.animation.paused(),
      scroll: window.scrollY,
      upper: root.querySelector('[data-node-id="2485:10407"] path').getAttribute('stroke-dasharray'),
      lower: root.querySelector('[data-node-id="2485:10408"] path').getAttribute('stroke-dasharray'),
      title: visual('2485:10470'), first: visual('2485:10420'), last: visual('2485:10457'),
      words: [...root.querySelectorAll('.home-picks__intro-word')].map(word => ({
        opacity: Number(getComputedStyle(word).opacity),
        scale: new DOMMatrix(getComputedStyle(word).transform).a,
      })),
      points: [...root.querySelectorAll('.home-picks__checkpoint')].map(n => Number(getComputedStyle(n).opacity)),
      geometry: [...root.querySelectorAll('img,p,svg')].map(node => {
        const r = node.getBoundingClientRect();
        return [(r.x - rect.x) / scale, (r.y - rect.y) / scale, r.width / scale, r.height / scale, node.tagName === 'P'];
      }),
    };
  }, requested);
}

async function seek(page, progress) {
  await state(page, progress);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await expect.poll(async () => Math.abs((await state(page)).progress - progress)).toBeLessThan(0.001);
}

function sameGeometry(actual, expected) {
  expect(actual).toHaveLength(expected.length);
  actual.forEach((box, index) => box.slice(0, 4).forEach((value, axis) => {
    // Auto-sized glyph bounds round differently after Chromium screenshots;
    // image geometry and all positions keep the tighter tolerance.
    const tolerance = box[4] && axis === 2 ? 1.5 : 0.2;
    expect(Math.abs(value - expected[index][axis]), `slot ${index}.${axis}`).toBeLessThan(tolerance);
  }));
}

for (const width of [1920, 1280, 1024]) {
  test(`Picks follows scroll, holds and reverses Figma frames at ${width}px`, async ({ page }, testInfo) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width, height: 1080 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/');
    await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 15000 });
    await page.locator('.home-hero__hero-visual-06').click();
    await expect(page.locator('.home-discovery')).toHaveAttribute('data-transition-ready', 'true');
    await page.locator('.home-picks img').evaluateAll(nodes => Promise.all(nodes.map(img => img.decode())));
    await page.evaluate(() => document.fonts.ready);
    const baseline = await state(page);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await expect.poll(async () => (await state(page)).triggers).toBe(1);
    await seek(page, 0);
    const initial = await state(page);
    expect(initial.repeat).toBe(0);
    expect(initial.pin).toBe(false);
    expect(initial.duration).toBe(1);
    expect(initial.paused).toBe(true);
    expect(initial.distance / initial.normalDistance).toBeCloseTo(2, 2);
    expect(initial.title.opacity).toBe(0);
    expect(initial.words).toHaveLength(2);
    initial.words.forEach(word => {
      expect(word.opacity).toBe(0);
      expect(word.scale).toBeCloseTo(0.86, 2);
    });
    expect(initial.first.opacity).toBe(0);
    expect(initial.upper).toBe('0 1');
    await page.waitForTimeout(350);
    expect((await state(page)).title).toEqual(initial.title);

    if (width === 1280) {
      await seek(page, 0.4);
      await page.mouse.move(400, 400);
      const beforeWheel = await state(page);
      await page.mouse.wheel(0, 40);
      await expect.poll(async () => (await state(page)).scroll).toBe(beforeWheel.scroll + 40);
      const afterWheel = await state(page);
      expect(afterWheel.progress - beforeWheel.progress).toBeLessThan(0.02);
      expect(Number.parseFloat(afterWheel.upper)).toBeGreaterThan(Number.parseFloat(beforeWheel.upper));
      const snapshot = value => ({ progress: value.progress, upper: value.upper, lower: value.lower,
        title: value.title, first: value.first, last: value.last, points: value.points });
      await page.waitForTimeout(5000);
      expect(snapshot(await state(page))).toEqual(snapshot(afterWheel));
      await page.waitForTimeout(5000);
      expect(snapshot(await state(page))).toEqual(snapshot(afterWheel));
      await page.mouse.wheel(0, -40);
      await expect.poll(async () => (await state(page)).scroll).toBe(beforeWheel.scroll);
      expect(Number.parseFloat((await state(page)).upper)).toBeCloseTo(Number.parseFloat(beforeWheel.upper), 3);
    }

    await seek(page, 0.3);
    const early = await state(page);
    expect(early.first.opacity).toBe(1);
    expect(early.last.opacity).toBe(0);
    await seek(page, 0.65);
    const middle = await state(page);
    expect(middle.upper).toBe('1 1');
    expect(middle.last.opacity).toBe(0);
    await page.waitForTimeout(450);
    expect(Number.parseFloat((await state(page)).lower)).toBeCloseTo(Number.parseFloat(middle.lower), 3);
    expect((await state(page)).progress).toBe(middle.progress);

    await seek(page, 1);
    const final = await state(page);
    final.words.forEach(word => {
      expect(word.opacity).toBe(1);
      expect(word.scale).toBeCloseTo(1, 2);
    });
    expect(final.upper).toBe('1 1');
    expect(final.lower).toBe('1 1');
    expect(final.last).toEqual({ opacity: 1, y: 0 });
    expect(final.points.every(p => p === 1)).toBe(true);
    sameGeometry(final.geometry, baseline.geometry);
    await page.locator('.home-picks').screenshot({ path: testInfo.outputPath(`picks-final-${width}.png`) });
    // Full-section screenshots scroll the target back into view.
    await seek(page, 1);
    await page.waitForTimeout(350);
    expect((await state(page)).last).toEqual(final.last);

    await seek(page, 0.65);
    expect(Number.parseFloat((await state(page)).lower)).toBeCloseTo(Number.parseFloat(middle.lower), 3);
    await seek(page, 0.3);
    expect((await state(page)).first).toEqual(early.first);
    await seek(page, 0);
    expect((await state(page)).points.every(p => p === 0)).toBe(true);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect.poll(async () => (await state(page)).triggers).toBe(0);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    sameGeometry((await state(page)).geometry, baseline.geometry);
    expect(errors).toEqual([]);
  });
}
