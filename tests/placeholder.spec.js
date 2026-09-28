import { test, expect } from '@playwright/test';

for (const width of [1280, 390]) {
  test(`기본 UI 및 카드 배치 ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const cards = page.getByRole('article');
    const first = await cards.nth(0).boundingBox();
    const second = await cards.nth(1).boundingBox();
    if (width < 768) expect(second.y).toBeGreaterThan(first.y + first.height);
    else expect(second.y).toBe(first.y);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), fullPage: true });
    await page.getByRole('navigation', { name: '관련 페이지' }).getByRole('link', { name: '스토어로 이동' }).click();
    await expect(page).toHaveURL(/\/store$/);
    await page.getByRole('navigation', { name: '관련 페이지' }).getByRole('link', { name: '상품 목록 보기' }).click();
    await expect(page).toHaveURL(/\/store\/products$/);
    await page.getByRole('navigation', { name: '관련 페이지' }).getByRole('link', { name: '임시 상품 상세 보기' }).click();
    await expect(page).toHaveURL(/\/store\/products\/demo-product$/);
  });
}
