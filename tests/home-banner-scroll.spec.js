import { test, expect } from '@playwright/test';

async function bannerState(page, progress) {
  return page.evaluate(async progress => {
    const resource = performance.getEntriesByType('resource').find(item => item.name.includes('/gsap_ScrollTrigger.js'));
    const { ScrollTrigger } = await import(resource.name);
    const section = document.querySelector('[data-banner-scroll]');
    const triggers = ScrollTrigger.getAll().filter(trigger => trigger.trigger === section);
    const trigger = triggers[0];
    if (progress !== undefined) {
      window.scrollTo(0, trigger.start + (trigger.end - trigger.start) * progress);
      ScrollTrigger.update();
    }
    const scene = section.querySelector('.home-banner__scene').getBoundingClientRect();
    const scale = scene.width / 1920;
    const rect = selector => {
      const bounds = section.querySelector(selector).getBoundingClientRect();
      return { x: (bounds.left - scene.left) / scale, y: (bounds.top - scene.top) / scale,
        width: bounds.width / scale, height: bounds.height / scale };
    };
    const wordY = word => Number(gsapY(section.querySelector(`[data-banner-word="${word}"]`)));
    function gsapY(node) {
      const value = getComputedStyle(node).transform;
      return value === 'none' ? 0 : new DOMMatrix(value).m42;
    }
    return {
      count: triggers.length, progress: trigger?.progress, active: trigger?.isActive,
      top: section.getBoundingClientRect().top,
      height: section.getBoundingClientRect().height,
      sceneWidth: scene.width, sceneCenterY: scene.top + scene.height / 2,
      mario: rect('[data-banner-mario]'), marioArt: rect('[data-banner-mario-art]'),
      words: ['putting', 'smiles', 'on-the', 'faces'].map(wordY),
      blockY: gsapY(section.querySelector('[data-banner-block]')),
      fixed: ['.home-banner__layer-2', '.home-banner__layer-4', '.home-banner__slogan-text-2'].map(rect),
    };
  }, progress);
}

async function seek(page, progress) {
  await expect.poll(async () => {
    await bannerState(page, progress);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    return Math.abs((await bannerState(page)).progress - Math.min(1, progress));
  }).toBeLessThan(.002);
}

for (const [width, height] of [[1920, 675], [1920, 1080], [1440, 720]]) {
  test(`Banner follows all five Figma frames and reverses at ${width}x${height}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
    await page.goto('/');
    await expect(page.locator('.nintendo-intro')).toHaveCount(0);
    const section = page.locator('[data-banner-scroll]');
    expect((await bannerState(page)).count).toBe(0);
    const sources = await section.locator('img').evaluateAll(async images => {
      await Promise.all(images.map(image => image.decode()));
      return images.map(image => ({ source: image.src.split('/').at(-1), width: image.naturalWidth }));
    });
    expect(sources.map(image => image.source)).toEqual(['94fd4.svg', '2f91e.png', '66341.png', 'a8314.png', '04258.png', '664b4.png']);
    expect(sources.every(image => image.width > 0)).toBe(true);
    await page.locator('.home-hero__hero-visual-06').click();
    await expect(page.locator('[data-scroll-position]')).toHaveAttribute('data-transition-ready', 'true');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await expect.poll(async () => (await bannerState(page)).count).toBe(1);
    // Partial entry must show 07 1, even when almost the entire section is in view.
    for (const remaining of [height * .75, height * .25, 2]) {
      await page.evaluate(async remaining => {
        const section = document.querySelector('[data-banner-scroll]');
        const anchor = section.parentElement.getBoundingClientRect().top + window.scrollY;
        const resource = performance.getEntriesByType('resource').find(item => item.name.includes('/gsap_ScrollTrigger.js'));
        const { ScrollTrigger } = await import(resource.name);
        window.scrollTo(0, anchor - remaining);
        ScrollTrigger.update();
      }, remaining);
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const entering = await bannerState(page);
      expect(entering.top).toBeGreaterThan(0);
      expect(entering.progress).toBe(0);
      expect(entering.mario.x).toBeCloseTo(635, 1);
      expect(entering.words).toEqual([-24, 0, 0, 0]);
      expect(entering.blockY).toBe(0);
    }
    const frames = [
      { x: 635, words: [-24, 0, 0, 0], blockY: 0, artY: 147 },
      { x: 790, words: [0, -23.5, 0, 0], blockY: 0, artY: 146 },
      { x: 937, words: [0, .5, 0, 0], blockY: -14, artY: 147 },
      { x: 1070, words: [0, .5, -23.5, 0], blockY: 0, artY: 147 },
      { x: 1215, words: [0, .5, -.5, -24], blockY: 0, artY: 147 },
    ];
    const fixed = [
      { x: -248, y: 77, width: 628.599, height: 643.655 },
      { x: 1442, y: 205, width: 648.283, height: 398.29 },
      { x: 506, y: 349, width: 908, height: 75 },
    ];
    for (const index of [0, 1, 2, 3, 4, 3, 2, 1, 0]) {
      await seek(page, index === 0 ? .03 : index / 4);
      const state = await bannerState(page);
      expect(Math.abs(state.top)).toBeLessThan(1);
      expect(state.height).toBeCloseTo(height, 0);
      expect(state.sceneCenterY).toBeCloseTo(height / 2, 0);
      expect(state.mario.x).toBeCloseTo(frames[index].x, 1);
      expect(state.mario.y).toBeCloseTo(144, 1);
      expect(state.mario.width).toBeCloseTo(88, 1);
      expect(state.marioArt.y).toBeCloseTo(frames[index].artY, 1);
      state.words.forEach((value, word) => expect(value).toBeCloseTo(frames[index].words[word], 1));
      expect(state.blockY).toBeCloseTo(frames[index].blockY, 1);
      state.fixed.forEach((slot, slotIndex) => {
        for (const axis of ['x', 'y', 'width', 'height']) expect(slot[axis]).toBeCloseTo(fixed[slotIndex][axis], 1);
      });
      await page.screenshot({ path: testInfo.outputPath(`07-${index + 1}.png`) });
    }
    // Each move has a raised midpoint and returns to the same landing height.
    for (let step = 0; step < 4; step++) {
      const at = .6 + step * 2;
      await seek(page, (at + .5) / 8);
      const apex = await bannerState(page);
      expect(apex.mario.y).toBeCloseTo(72, 0);
      expect(apex.mario.x).toBeGreaterThan(frames[step].x);
      expect(apex.mario.x).toBeLessThan(frames[step + 1].x);
      await page.waitForTimeout(100);
      expect((await bannerState(page)).mario.y).toBe(apex.mario.y);
      await seek(page, (at + 1.3) / 8);
      expect((await bannerState(page)).mario.y).toBeCloseTo(144, 1);
      // Reversing the scrub returns to the identical airborne position.
      await seek(page, (at + .5) / 8);
      expect((await bannerState(page)).mario.y).toBeCloseTo(apex.mario.y, 1);
    }
    await seek(page, .125);
    const midway = await bannerState(page);
    expect(midway.mario.x).toBeGreaterThan(635);
    expect(midway.mario.x).toBeLessThan(790);
    await page.waitForTimeout(150);
    expect((await bannerState(page)).mario.x).toBe(midway.mario.x);
    await page.mouse.move(width / 2, height / 2);
    await page.mouse.wheel(0, 180);
    await expect.poll(async () => (await bannerState(page)).progress).toBeGreaterThan(.13);
    await page.waitForTimeout(700);
    const forward = (await bannerState(page)).progress;
    await page.mouse.wheel(0, -180);
    await expect.poll(async () => (await bannerState(page)).progress).toBeLessThan(forward - .015);
    await page.setViewportSize({ width: 1600, height: 900 });
    await seek(page, .5);
    expect((await bannerState(page)).mario.x).toBeCloseTo(937, 1);
    await expect.poll(async () => (await bannerState(page)).height).toBeCloseTo(900, 0);
    await seek(page, 1.02);
    expect((await bannerState(page)).active).toBe(false);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect.poll(async () => (await bannerState(page)).count).toBe(0);
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.home-banner-mobile')).toHaveCount(1);
    await expect(section).toHaveCount(0);
  });
}
