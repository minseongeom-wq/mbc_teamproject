import { test, expect } from '@playwright/test';

for (const width of [320, 390, 768, 1280, 1920]) {
  test(`공통 UI 간격과 자산 및 메뉴 동작 ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    const nav = page.locator('.navigation');
    const position = await nav.boundingBox();
    expect(position.y).toBe(15);
    expect(position.height).toBe(60);
    const toggle = page.getByRole('button', { name: 'MENU', exact: true });
    await toggle.click();
    await page.evaluate(() => document.fonts.ready);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const dropdown = page.locator('.dropdown');
    const bounds = await dropdown.boundingBox();
    expect(bounds.y - (position.y + position.height)).toBeCloseTo(10, 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.getByRole('main')).toBeVisible();
    expect((await page.getByRole('main').boundingBox()).y).toBeGreaterThanOrEqual(bounds.y + bounds.height);
    const images = page.locator('.common-header img, .common-footer img');
    for (const img of await images.all()) {
      if (await img.isVisible()) {
        await expect(img).toHaveJSProperty('complete', true);
        expect(await img.evaluate(node => node.naturalWidth)).toBeGreaterThan(0);
      }
    }
    await page.screenshot({ path: testInfo.outputPath(`menu-${width}.png`), fullPage: true });
    if (width === 1920) {
      await page.getByRole('navigation', { name: '주 메뉴', exact: true }).getByRole('link', { name: 'Mario', exact: true }).hover();
      await expect(page.locator('.dropdown__icon--mario .dropdown__portrait')).toBeVisible();
      await dropdown.screenshot({ path: testInfo.outputPath('menu-hover.png') });
    }
    await page.keyboard.press('Escape');
    await expect(toggle).toBeFocused();
    await expect(dropdown).toHaveCount(0);
    await toggle.click();
    await page.getByRole('heading', { level: 1 }).click();
    await expect(dropdown).toHaveCount(0);
    await page.getByRole('button', { name: 'Back to top' }).click();
    expect(await page.evaluate(() => scrollY)).toBe(0);
    await expect(page.getByRole('link', { name: 'Nintendo Korea 홈' })).toBeFocused();
  });
}

test('경로별 Variant 및 계정 이동', async ({ page }, testInfo) => {
  for (const [path, variant] of [['/', 'red'], ['/ip/mario', 'red'], ['/ip/splatoon', 'red'], ['/ip/zelda', 'zelda'], ['/store', 'white'], ['/store/products/demo-product', 'white'], ['/mypage', 'white'], ['/store/order', 'red'], ['/store/checkout', 'red'], ['/support', 'red'], ['/login', 'red'], ['/signup', 'red'], ['/about/history', 'red']]) {
    await page.goto(path);
    await expect(page.getByRole('banner')).toHaveClass(new RegExp(`common-header--${variant}`));
    await expect(page.getByRole('contentinfo')).toHaveClass(new RegExp(`common-footer--${variant === 'zelda' ? 'zelda' : 'default'}`));
    await expect(page.getByRole('banner')).toHaveCount(1);
    await expect(page.getByRole('contentinfo')).toHaveCount(1);
    if (path === '/ip/zelda') {
      await expect(page.locator('.navigation__primary')).toHaveCSS('background-color', 'rgb(199, 149, 47)');
      await expect(page.getByRole('contentinfo')).toHaveCSS('background-color', 'rgb(199, 149, 47)');
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: testInfo.outputPath('zelda.png'), fullPage: true });
    }
  }
  await page.getByRole('link', { name: 'MY NINTENDO', exact: true }).click();
  await expect(page).toHaveURL(/\/mypage$/);
  await page.getByRole('button', { name: 'MENU', exact: true }).click();
  await page.getByRole('navigation', { name: '주 메뉴', exact: true }).getByRole('link', { name: '마이페이지', exact: true }).click();
  await expect(page.locator('.dropdown')).toHaveCount(0);
});
