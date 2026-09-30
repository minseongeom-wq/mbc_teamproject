import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('http://127.0.0.1:5173/about/history');
await page.locator('.history-awards').scrollIntoViewIfNeeded();
const bounds = await page.locator('.history-awards').boundingBox();
const canvas = page.locator('.history-awards__pixel-trail');
await page.mouse.move(bounds.x + 120, bounds.y + 120);
await page.mouse.move(bounds.x + 165, bounds.y + 120);
await page.waitForTimeout(80);
const active = await canvas.evaluate((node) => {
  const ctx = node.getContext('2d');
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  return {
    pixels: [...ctx.getImageData(0, 0, node.width, node.height).data].filter((_, index) => index % 4 === 3 && _ > 0).length,
    pointerEvents: getComputedStyle(node).pointerEvents,
    ratio,
  };
});
await page.waitForTimeout(750);
const expired = await canvas.evaluate((node) => [...node.getContext('2d').getImageData(0, 0, node.width, node.height).data].filter((_, index) => index % 4 === 3 && _ > 0).length);
console.log(JSON.stringify({ active, expired }));
await browser.close();
