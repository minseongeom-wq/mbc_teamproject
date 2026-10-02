import { test, expect } from '@playwright/test';

test('Home Desktop matches Figma section bounds and original image slots', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 20000 });
  await page.evaluate(() => document.fonts.ready);
  const width = await page.locator('.home-page').evaluate(node => node.clientWidth);
  const scale = width / 1920;
  const expected = [
    ['hero', 0, 1883], ['discovery', 1883, 1080], ['news', 2963, 3173],
    ['amiibo', 6136, 947], ['picks', 7083, 3985], ['daily', 11068, 1432], ['banner', 12500, 675],
  ];
  for (const [name, y, height] of expected) {
    const box = await page.locator(`.home-${name}`).boundingBox();
    expect(box.x).toBe(0);
    expect(box.width).toBeCloseTo(width, 1);
    expect(box.y).toBeCloseTo(y * scale, 1);
    expect(box.height).toBeCloseTo(height * scale, 1);
  }
  expect((await page.getByRole('contentinfo').boundingBox()).y).toBeCloseTo(13175 * scale, 1);
  await expect(page.getByRole('banner')).toHaveCount(1);
  await expect(page.getByRole('contentinfo')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  const images = await page.locator('.home-page img').evaluateAll(async nodes => {
    await Promise.all(nodes.map(img => img.decode().catch(() => {})));
    return nodes.map(img => ({ loaded: img.naturalWidth > 0, width: img.getBoundingClientRect().width, height: img.getBoundingClientRect().height }));
  });
  expect(images.length).toBeGreaterThan(70);
  expect(images.every(img => img.loaded && img.width > 0 && img.height > 0)).toBe(true);
  expect(errors).toEqual([]);
});

test('Desktop game cards respond to selection, keyboard and play modes', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/');
  await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 20000 });
  const track = page.getByRole('group', { name: '게임 선택' });
  const zelda = track.getByRole('button', { name: '젤다의 전설', exact: true });
  await expect(zelda).toHaveAttribute('aria-pressed', 'true');
  const scale = await page.locator('.home-page').evaluate(node => node.clientWidth / 1920);
  expect((await zelda.boundingBox()).width).toBeCloseTo(338.733 * scale, 1);
  const splatoon = track.getByRole('button', { name: '스플래툰 3', exact: true });
  await splatoon.click();
  await expect(splatoon).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.home-discovery__game-selected-info')).toContainText('스플래툰 3');
  await splatoon.press('ArrowLeft');
  await expect(zelda).toBeFocused();
  await expect(zelda).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Play Together', exact: true }).click();
  await expect(track.getByRole('button')).toHaveCount(3);
  await expect(track.getByRole('button', { name: '마리오 카트', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

for (const width of [360, 768, 1024, 1440]) {
  test(`Home responsive assets and shared Navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('.nintendo-intro')).toHaveCount(0, { timeout: 20000 });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.home-page section')).toHaveCount(7);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const navigation = await page.locator('.navigation').boundingBox();
    expect(navigation.y).toBe(15);
    expect(navigation.height).toBe(60);
    await page.getByRole('button', { name: 'MENU', exact: true }).click();
    const dropdown = await page.locator('.dropdown').boundingBox();
    expect(dropdown.y - navigation.y - navigation.height).toBe(10);
    await page.keyboard.press('Escape');
    await expect(page.locator('.dropdown')).toHaveCount(0);
    if (width < 1024) {
      const phone = page.getByAltText('피크민 Nintendo Today 위젯');
      await expect(phone).toBeVisible();
      expect(await phone.evaluate(img => img.naturalWidth)).toBeGreaterThan(0);
      const track = page.getByRole('group', { name: '게임 선택' });
      const active = track.getByRole('button', { name: '젤다의 전설', exact: true });
      await active.press('ArrowRight');
      await expect(track.getByRole('button', { name: '스플래툰 3', exact: true })).toHaveAttribute('aria-pressed', 'true');
      const selected = track.getByRole('button', { name: '스플래툰 3', exact: true });
      await selected.click({ trial: true });
      const box = await selected.boundingBox();
      const dragY = Math.min(box.y + box.height / 2, page.viewportSize().height - 20);
      await page.mouse.move(box.x + box.width / 2, dragY);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2 - 70, dragY, { steps: 5 });
      await page.mouse.up();
      await expect(track.getByRole('button', { name: '슈퍼 마리오 오디세이', exact: true })).toHaveAttribute('aria-pressed', 'true');
      const news = page.locator('.home-news-mobile');
      await news.evaluate(node => { node.scrollLeft = 300; });
      expect(await news.evaluate(node => node.scrollLeft)).toBeGreaterThan(0);
    }
  });
}
