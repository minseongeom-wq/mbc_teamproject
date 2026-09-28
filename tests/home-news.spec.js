import { test, expect } from '@playwright/test';

const items = [
  ['splatoon', '스플래툰3', '/ip/splatoon'],
  ['marioKart', '무료 업데이트 배포', '/store'],
  ['pikmin', '피크민 콜라보 등장', '/store'],
  ['zelda', '젤다의 전설', '/ip/zelda'],
];

for (const width of [1440, 1030, 390]) {
  test(`Opening and closing news preserves the Home background at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    // Exercise a classic scrollbar, including a viewport near Home's breakpoint.
    await page.addStyleTag({ content: 'html::-webkit-scrollbar { width: 16px; }' });
    const card = page.locator('[data-news-id="splatoon"]');
    await card.scrollIntoViewIfNeeded();
    await card.focus();
    const background = () => page.evaluate(() => {
      const canvas = document.querySelector('.home-page__canvas');
      const card = document.querySelector('[data-news-id="splatoon"]');
      return {
        scrollY: window.scrollY,
        canvas: canvas.getBoundingClientRect().toJSON(),
        card: card.getBoundingClientRect().toJSON(),
        scale: canvas.style.getPropertyValue('--home-scale'),
      };
    });
    const before = await background();
    await card.press('Enter');
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect.poll(background).toEqual(before);
    await page.mouse.move(2, 2);
    await page.mouse.wheel(0, 500);
    await expect.poll(background).toEqual(before);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect.poll(background).toEqual(before);
    expect(await page.evaluate(() => document.documentElement.style.scrollbarGutter)).toBe('');
  });
}

for (const width of [1920, 390]) {
  test(`News modal content, dismissal, focus and links at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1080 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/');
    for (const [id, title, link] of items) {
      const card = page.locator(`[data-news-id="${id}"]`);
      await card.focus();
      await card.press('Enter');
      const modal = page.getByRole('dialog');
      await expect(modal).toBeVisible();
      await expect(modal.getByRole('heading')).toContainText(title);
      await expect(modal.getByRole('link')).toHaveAttribute('href', link);
      await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
      const assets = await modal.locator('img').evaluateAll(async images => {
        await Promise.all(images.map(image => image.decode()));
        return images.map(image => ({ loaded: image.naturalWidth > 0, width: image.getBoundingClientRect().width, height: image.getBoundingClientRect().height }));
      });
      expect(assets).toHaveLength(4);
      expect(assets.every(asset => asset.loaded && asset.width > 0 && asset.height > 0)).toBe(true);
      const box = await modal.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.width).toBeLessThanOrEqual(width);
      if (width === 1920) {
        expect(box.width).toBe(1222);
        expect(box.height).toBeCloseTo(878, -1);
      }
      await page.keyboard.press('Shift+Tab');
      await expect(modal.getByRole('link')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(modal.getByRole('button')).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(modal).toHaveCount(0);
      await expect(card).toBeFocused();
      await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
      await card.click();
      await modal.getByRole('button').click();
      await expect(modal).toHaveCount(0);
      await card.click();
      await page.mouse.click(2, 2);
      await expect(modal).toHaveCount(0);
      await card.click();
      await modal.getByRole('link').click();
      await expect(page).toHaveURL(new RegExp(`${link}$`));
      await expect(modal).toHaveCount(0);
      await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
      await page.goto('/');
    }
    expect(errors).toEqual([]);
  });
}
