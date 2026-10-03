import { test, expect } from '@playwright/test';

async function state(page, progress) {
  return page.evaluate(async progress => {
    const resource = performance.getEntriesByType('resource').find(item => item.name.includes('/gsap_ScrollTrigger.js'));
    const { ScrollTrigger } = await import(resource.name);
    const section = document.querySelector('[data-daily-scroll]');
    const triggers = ScrollTrigger.getAll().filter(item => item.trigger === section);
    const trigger = triggers[0];
    if (progress !== undefined) {
      window.scrollTo(0, trigger.start + (trigger.end - trigger.start) * progress);
      ScrollTrigger.update();
    }
    return {
      count: triggers.length, progress: trigger?.animation.progress(), active: trigger?.isActive,
      top: section.getBoundingClientRect().top,
      phones: [...section.querySelectorAll('[data-phone]')].map(node => getComputedStyle(node).transform),
      screens: [...section.querySelectorAll('[data-screen]')].map(node => Number(getComputedStyle(node).opacity)),
      numberPosition: (() => {
        const track = section.querySelector('[data-number-track]').getBoundingClientRect();
        const viewport = section.querySelector('.daily-carousel__number-window').getBoundingClientRect();
        return (viewport.top - track.top) / viewport.height;
      })(),
      sources: [...section.querySelectorAll('img')].map(node => node.src),
    };
  }, progress);
}
async function seek(page, progress) {
  await expect.poll(async () => {
    // Upstream sections can finish refreshing their spacers after fonts load.
    // Resolve the current scroll coordinate instead of a stale first-frame one.
    await state(page, progress);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    return Math.abs((await state(page)).progress - Math.min(1, progress));
  }).toBeLessThan(.003);
}
for (const [width, height] of [[1920, 1432], [1920, 1080], [1896, 904], [1600, 1000], [1536, 960], [1440, 720], [1280, 900], [390, 844], [390, 667]]) {
  test('Daily scrub carousel reverses and releases at ' + width + 'x' + height, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
    await page.goto('/');
    await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 10000 });
    await page.locator(width < 1024 ? '.home-hero-mobile__layer-13' : '.home-hero__hero-visual-06').click();
    await expect(page.locator('[data-scroll-position]')).toHaveAttribute('data-transition-ready', 'true');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await expect.poll(async () => (await state(page)).count).toBe(1);
    const section = page.locator('[data-daily-scroll]');
    expect(await section.locator('img').evaluateAll(async nodes => {
      await Promise.all(nodes.map(node => node.decode()));
      return nodes.every(node => node.naturalWidth > 0 && node.getBoundingClientRect().width > 0);
    })).toBe(true);
    const introState = () => section.evaluate(node => {
      const opacity = selector => Number(getComputedStyle(node.querySelector(selector)).opacity);
      return {
        heading: opacity('.daily-carousel__heading'),
        center: opacity('[data-phone="1"]'),
        left: opacity('[data-phone="0"]'),
        description: opacity('[data-description="0"]'),
        centerTransform: getComputedStyle(node.querySelector('[data-phone="1"]')).transform,
      };
    });
    await seek(page, 7 / 115);
    expect(await introState()).toMatchObject({ heading: 1, center: 0, left: 0, description: 0 });
    await seek(page, 16 / 115);
    const entering = await introState();
    expect(entering.center).toBeGreaterThan(0);
    expect(entering.center).toBeLessThan(1);
    expect(entering.left).toBe(0);
    await page.waitForTimeout(150);
    expect(await introState()).toEqual(entering);
    await page.screenshot({ path: testInfo.outputPath('daily-intro-center.png') });
    await seek(page, 23 / 115);
    expect((await introState()).center).toBe(1);
    expect((await introState()).left).toBeGreaterThan(0);
    expect((await introState()).left).toBeLessThan(1);
    await seek(page, 16 / 115);
    expect(await introState()).toEqual(entering);
    await seek(page, 31 / 115);
    const initial = await state(page);
    expect(initial.numberPosition).toBeCloseTo(0, 3);
    const widgetVideo = section.locator('[data-widget-video]');
    await expect.poll(() => widgetVideo.evaluate(video =>
      video.readyState >= 2 && video.videoWidth > 0 && !video.paused)).toBe(true);
    const videoTime = await widgetVideo.evaluate(video => video.currentTime);
    await expect.poll(() => widgetVideo.evaluate(video => video.currentTime)).not.toBe(videoTime);
    const geometry = await section.evaluate(node => {
      const phone = node.querySelector('[data-content="01"]');
      const heading = node.querySelector('[data-description="0"] h3');
      return { phoneWidth: phone.offsetWidth, phoneHeight: phone.offsetHeight, descriptionSize: getComputedStyle(heading).fontSize };
    });
    expect(geometry).toEqual(width < 1024
      ? { phoneWidth: 181, phoneHeight: 349, descriptionSize: '27px' }
      : { phoneWidth: 354, phoneHeight: 678, descriptionSize: '61px' });
    const assertVisible = async index => {
      expect((await state(page)).numberPosition).toBeCloseTo(index, 3);
      await expect(section.locator('[data-number]')).toHaveText(['01', '02', '03', '04']);
      const boxes = await section.evaluate((node, index) => {
        const phone = node.querySelector('[data-phone="' + (index + 1) + '"]');
        const description = node.querySelector('[data-description="' + index + '"]');
        const heading = node.querySelector('.daily-carousel__heading');
        const title = node.querySelector('[data-title]');
        return [heading, title, phone, description].map(node => {
          const r = node.getBoundingClientRect();
          return { top: r.top, bottom: r.bottom, left: r.left, right: r.right };
        });
      }, index);
      for (const [index, box] of boxes.entries()) {
        expect(box.top).toBeGreaterThanOrEqual(-1);
        // The desktop phones and description may continue below the viewport.
        if (width < 1024 || index < 2) expect(box.bottom).toBeLessThanOrEqual(height + 1);
        expect(box.left).toBeGreaterThanOrEqual(-1);
        expect(box.right).toBeLessThanOrEqual(width + 1);
      }
      // Keeping the title on screen must not make it overlap the phone.
      expect(boxes[2].top - boxes[1].bottom).toBeGreaterThan(12);
    };
    await assertVisible(0);
    const filledWidth = await section.evaluate(node => {
      const stage = node.querySelector('.daily-carousel__stage').getBoundingClientRect();
      return stage.width / node.getBoundingClientRect().width;
    });
    expect(filledWidth).toBeLessThanOrEqual(1.001);
    if (width < 1024) expect(filledWidth).toBeGreaterThan(.7);
    else {
      const availableWidth = await page.evaluate(() => document.querySelector('.home-page').clientWidth);
      expect(filledWidth).toBeCloseTo(Math.min(1, availableWidth / 1920) * 1920 / availableWidth, 3);
    }
    const visibleScreens = () => section.locator('[data-phone]').evaluateAll(phones =>
      phones.map(phone => [...phone.querySelectorAll('[data-screen]')]
        .find(screen => Number(getComputedStyle(screen).opacity) === 1)?.dataset.screen));
    expect((await visibleScreens()).slice(0, 3)).toEqual(['kirby-wallpaper', '01', '02']);
    if (width >= 1024) {
      const ratios = await section.evaluate(node => {
        const stage = node.querySelector('.daily-carousel__stage').getBoundingClientRect();
        const background = node.querySelector('.daily-carousel__background').getBoundingClientRect();
        const phone = node.querySelector('[data-content="01"]').getBoundingClientRect();
        const calendar = node.querySelector('[data-calendar="0"]').getBoundingClientRect();
        return { backgroundWidth: background.width / stage.width, backgroundHeight: background.height / stage.height, phoneWidth: phone.width / stage.width, phoneHeight: phone.height / stage.height, calendarWidth: calendar.width / stage.width };
      });
      expect(ratios.backgroundWidth).toBeCloseTo(2172 / 1920, 4);
      expect(ratios.backgroundHeight).toBeCloseTo(735 / 1432, 4);
      expect(ratios.phoneWidth).toBeCloseTo(372 / 1920, 4);
      expect(ratios.phoneHeight).toBeCloseTo(718 / 1432, 4);
      expect(ratios.calendarWidth).toBeCloseTo(176 * .96 / 1920, 4);
    }
    await page.screenshot({ path: testInfo.outputPath('daily-original-01.png') });
    await seek(page, 44 / 115);
    const midway = await state(page);
    expect(midway.numberPosition).toBeGreaterThan(.45);
    expect(midway.numberPosition).toBeLessThan(.55);
    await page.screenshot({ path: testInfo.outputPath('daily-number-midway.png') });
    expect(midway.phones[0]).not.toBe(initial.phones[0]);
    expect(midway.phones[1]).not.toBe(initial.phones[1]);
    expect(midway.phones[2]).not.toBe(initial.phones[2]);
    expect(Math.abs(midway.top - initial.top)).toBeLessThan(2);
    await page.waitForTimeout(250);
    await expect.poll(async () => (await state(page)).phones).toEqual(midway.phones);
    expect((await state(page)).numberPosition).toBe(midway.numberPosition);
    await seek(page, 60 / 115);
    await expect.poll(() => widgetVideo.evaluate(video => video.paused)).toBe(true);
    await assertVisible(1);
    expect((await visibleScreens()).slice(1, 4)).toEqual(['zelda', '02', 'calendar']);
    await page.screenshot({ path: testInfo.outputPath('daily-03.png') });
    await seek(page, 87 / 115);
    await assertVisible(2);
    expect((await visibleScreens()).slice(2, 5)).toEqual(['02', '03', 'zelda']);
    await page.screenshot({ path: testInfo.outputPath('daily-02.png') });
    await seek(page, 111 / 115);
    await assertVisible(3);
    expect((await visibleScreens()).slice(3, 6)).toEqual(['kirby', '04', 'splatoon']);
    await page.screenshot({ path: testInfo.outputPath('daily-final.png') });
    await seek(page, 44 / 115);
    expect((await state(page)).phones).toEqual(midway.phones);
    expect((await state(page)).screens).toEqual(midway.screens);
    expect((await state(page)).numberPosition).toBe(midway.numberPosition);
    expect((await state(page)).sources).toEqual(initial.sources);
    await page.mouse.move(width / 2, 300);
    await page.mouse.wheel(0, 180);
    await expect.poll(async () => (await state(page)).progress).toBeGreaterThan(44 / 115 + .005);
    await page.waitForTimeout(500);
    const wheelForward = (await state(page)).progress;
    await page.mouse.wheel(0, -180);
    await expect.poll(async () => (await state(page)).progress).toBeLessThan(wheelForward - .01);
    await seek(page, 1.02);
    expect((await state(page)).active).toBe(false);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect.poll(async () => (await state(page)).count).toBe(0);
    await expect.poll(() => widgetVideo.evaluate(video => video.paused)).toBe(true);
  });
}

test('Daily scene scales as one unit and refreshes its pin after desktop resize', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1432 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0);
  await page.locator('.home-hero__hero-visual-06').click();
  await expect(page.locator('[data-scroll-position]')).toHaveAttribute('data-transition-ready', 'true');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(async () => (await state(page)).count).toBe(1);
  const geometry = () => page.locator('[data-daily-scroll]').evaluate(section => {
    const wrapper = section.querySelector('.daily-scene-wrapper');
    const scene = section.querySelector('.daily-scene');
    const bounds = scene.getBoundingClientRect();
    const scale = bounds.width / 1920;
    return {
      scale, width: bounds.width, height: bounds.height,
      wrapperHeight: wrapper.getBoundingClientRect().height,
      sectionHeight: section.getBoundingClientRect().height,
      center: bounds.left + bounds.width / 2,
      centerY: bounds.top + bounds.height / 2,
      headingTop: section.querySelector('.daily-carousel__heading').getBoundingClientRect().top,
      top: bounds.top, bottom: bounds.bottom,
      origin: getComputedStyle(scene).transformOrigin,
      layoutWidth: scene.offsetWidth, layoutHeight: scene.offsetHeight,
      elements: [...scene.querySelectorAll('[data-phone], [data-calendar], .daily-carousel__background')].map(node => {
        const rect = node.getBoundingClientRect();
        return [(rect.left - bounds.left) / scale, (rect.top - bounds.top) / scale, rect.width / scale, rect.height / scale];
      }),
    };
  });
  await seek(page, 111 / 115);
  const baseline = await geometry();
  for (const [width, height] of [[1680, 900], [1600, 900], [1536, 864], [1440, 720], [1440, 900], [1280, 1200], [1920, 1432]]) {
    await page.setViewportSize({ width, height });
    const availableWidth = await page.evaluate(() => document.querySelector('.home-page').clientWidth);
    const expectedScale = Math.min(1, availableWidth / 1920);
    await expect.poll(async () => (await geometry()).scale).toBeCloseTo(expectedScale, 3);
    await seek(page, 111 / 115);
    const current = await geometry();
    expect(current.layoutWidth).toBe(1920);
    expect(current.layoutHeight).toBe(1432);
    expect(current.origin).toBe('960px 716px');
    expect(current.center).toBeCloseTo(availableWidth / 2, 1);
    expect(current.headingTop).toBeCloseTo(24, 0);
    expect(current.height).toBeCloseTo(1432 * expectedScale, 1);
    expect(current.wrapperHeight).toBeCloseTo(24 + (1432 - 278) * expectedScale, 1);
    expect(current.bottom).toBeCloseTo(current.sectionHeight, 0);
    expect(current.sectionHeight).toBeCloseTo(current.wrapperHeight, 1);
    current.elements.forEach((rect, index) => rect.forEach((value, axis) =>
      expect(value).toBeCloseTo(baseline.elements[index][axis], 1)));
    expect((await state(page)).count).toBe(1);
    expect(Math.abs((await state(page)).top)).toBeLessThan(2);
    await seek(page, 44 / 115);
    // Browser scroll coordinates round to pixels, including after a height resize.
    expect((await state(page)).numberPosition).toBeCloseTo(.5, 2);
    await seek(page, 111 / 115);
  }
  // Simulate an upstream layout shift before the cached trigger start refreshes.
  const oldMargin = await page.evaluate(async () => {
    const section = document.querySelector('[data-daily-scroll]');
    const preceding = section.parentElement.previousElementSibling;
    const oldMargin = preceding.style.marginBottom;
    preceding.style.marginBottom = '160px';
    const resource = performance.getEntriesByType('resource').find(item => item.name.includes('/gsap_ScrollTrigger.js'));
    const { ScrollTrigger } = await import(resource.name);
    window.scrollTo(0, window.scrollY + 2);
    ScrollTrigger.update();
    return oldMargin;
  });
  await expect.poll(async () => Math.abs((await state(page)).top)).toBeLessThan(2);
  await page.evaluate(async oldMargin => {
    document.querySelector('[data-daily-scroll]').parentElement.previousElementSibling.style.marginBottom = oldMargin;
    const resource = performance.getEntriesByType('resource').find(item => item.name.includes('/gsap_ScrollTrigger.js'));
    const { ScrollTrigger } = await import(resource.name);
    ScrollTrigger.refresh();
  }, oldMargin);
  await seek(page, 1.02);
  expect((await state(page)).active).toBe(false);
});


