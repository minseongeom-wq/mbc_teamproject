import { test, expect } from '@playwright/test';
test('Discovery keeps its design width when pinned inside the zoomed canvas', async ({ page }) => {
 await page.setViewportSize({width:1920,height:1080});
 await page.route('**/videos/Sequence%2002_1.mp4', route => route.abort());
 await page.goto('/');
 await expect(page.locator('.nintendo-intro')).toHaveCount(0,{timeout:15000});
 await page.locator('.home-hero__hero-visual-06').click();
 await expect(page.locator('.home-discovery')).toHaveAttribute('data-transition-ready','true',{timeout:12000});
 for(const width of [1920,1728,1280]) {
 await page.setViewportSize({width,height:1080});
 await page.waitForTimeout(500);
 const bounds = await page.evaluate(() => {
 const d=document.querySelector('.home-discovery'); const r=d.getBoundingClientRect();
 const scale = new DOMMatrix(getComputedStyle(d).transform).a;
 const canvas = document.querySelector('.home-page__canvas');
 return { width: r.width, center: r.x+r.width/2, scale,
   zoom: Number.parseFloat(getComputedStyle(canvas).zoom),
   canvasWidth: canvas.getBoundingClientRect().width, position:getComputedStyle(d).position };
 });
 expect(bounds.position).not.toBe('fixed');
 expect(Math.abs(bounds.width / bounds.scale - 1920 * bounds.zoom)).toBeLessThan(1);
 expect(Math.abs(bounds.center - bounds.canvasWidth / 2)).toBeLessThan(1);
 }
});
