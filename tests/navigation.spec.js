import { test, expect } from '@playwright/test';

const destinations = [
  ['Mario', '/ip/mario', 'IP 상세 — Mario', 'IP'],
  ['Zelda', '/ip/zelda', 'IP 상세 — Zelda', 'IP'],
  ['Splatoon', '/ip/splatoon', 'IP 상세 — Splatoon', 'IP'],
  ['E-shop', '/store', '닌텐도 스토어'],
  ['Nintendo Switch', '/switch', '실물제품'],
  ['브랜드 / 역사', '/about/history', '브랜드 / 역사'],
  ['Community', '/community', 'SNS형 피드'],
  ['고객지원', '/support', '고객지원'],
  ['로그인', '/login', '로그인', 'MY NINTENDO'],
  ['회원가입', '/signup', '회원가입', 'MY NINTENDO'],
  ['마이페이지', '/mypage', '마이페이지', 'MY NINTENDO'],
];

async function checkPage(page, path, heading) {
  await expect(page).toHaveURL(new RegExp(`${path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
  await expect(page.getByRole('banner')).toHaveCount(1);
  await expect(page.getByRole('contentinfo')).toHaveCount(1);
  await expect(page.getByRole('main')).toHaveCount(1);
}

for (const viewport of [{ width: 1280, height: 800 }, { width: 390, height: 844 }]) {
  test.describe(`내부 이동 ${viewport.width}px`, () => {
    test.use({ viewport });

    for (const [label, path, heading] of destinations) {
      test(`메인 → ${label} → 메인 및 브라우저 기록`, async ({ page }) => {
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto('/');
        // SPA 내부 이동이 문서를 다시 로드하지 않는지도 검사한다.
        await page.evaluate(() => { window.navigationTestMarker = 'same-document'; });
        const nav = page.getByRole('navigation', { name: '주 메뉴', exact: true });
        await page.getByRole('button', { name: 'MENU', exact: true }).click();
        await nav.getByRole('link', { name: label, exact: true }).click();
        await checkPage(page, path, heading);
        expect(await page.evaluate(() => window.navigationTestMarker)).toBe('same-document');
        await page.goBack();
        await checkPage(page, '/', '메인');
        await page.goForward();
        await checkPage(page, path, heading);
        await page.getByRole('link', { name: 'Nintendo Korea 홈', exact: true }).click();
        await checkPage(page, '/', '메인');
        expect(errors).toEqual([]);
      });
    }

    test('스토어 전체 단계와 뒤로/앞으로 이동', async ({ page }) => {
      await page.goto('/');
      await page.getByRole('button', { name: 'MENU', exact: true }).click();
      await page.getByRole('navigation', { name: '주 메뉴', exact: true })
        .getByRole('link', { name: 'E-shop', exact: true }).click();
      const steps = [
        ['상품 목록', '/store/products', '상품 목록'],
        ['임시 상품 상세 (이동 확인용)', '/store/products/demo-product', '상품 상세'],
        ['주문 확인', '/store/order', '주문 확인'],
        ['결제 페이지', '/store/checkout', '결제 / 결과 확인'],
      ];
      let previous = ['/store', '닌텐도 스토어'];
      for (const [label, path, heading] of steps) {
        await page.getByRole('navigation', { name: '스토어 단계 이동' })
          .getByRole('link', { name: label, exact: true }).click();
        await checkPage(page, path, heading);
        await page.goBack();
        await checkPage(page, ...previous);
        await page.goForward();
        await checkPage(page, path, heading);
        previous = [path, heading];
      }
    });

    test('Footer 고객지원 이동 및 메인 복귀', async ({ page }) => {
      await page.goto('/store/products/demo-product');
      await page.getByRole('navigation', { name: '푸터 메뉴' })
        .getByRole('link', { name: '온라인 고객 상담', exact: true }).click();
      await checkPage(page, '/support', '고객지원');
      await page.getByRole('contentinfo').getByRole('link', { name: '메인', exact: true }).click();
      await checkPage(page, '/', '메인');
      await expect(page.locator('a[href="#"], a:not([href])')).toHaveCount(0);
    });
  });
}

test('키보드로 IP 메뉴를 열고 Mario로 이동', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'MENU', exact: true });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'MY NINTENDO', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('navigation', { name: '주 메뉴', exact: true }).getByRole('link', { name: 'Mario', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await checkPage(page, '/ip/mario', 'IP 상세 — Mario');
});
