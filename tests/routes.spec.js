import { test, expect } from '@playwright/test';

const cases = [
  [
    "/",
    "메인"
  ],
  [
    "/store",
    "닌텐도 스토어"
  ],
  [
    "/store/products",
    "상품 목록"
  ],
  [
    "/store/products/demo-product",
    "상품 상세"
  ],
  [
    "/store/order",
    "주문 확인"
  ],
  [
    "/store/checkout",
    "결제 / 결과 확인"
  ],
  [
    "/switch",
    "실물제품"
  ],
  [
    "/about/history",
    "브랜드 / 역사"
  ],
  [
    "/community",
    "SNS형 피드"
  ],
  [
    "/support",
    "고객지원"
  ],
  [
    "/login",
    "로그인"
  ],
  [
    "/signup",
    "회원가입"
  ],
  [
    "/mypage",
    "마이페이지"
  ],
  [
    "/ip/mario",
    "IP 상세 — Mario"
  ],
  [
    "/ip/zelda",
    "IP 상세 — Zelda"
  ],
  [
    "/ip/splatoon",
    "IP 상세 — Splatoon"
  ]
];

for (const [url, heading] of cases) {
  test(`직접 접근 및 새로고침: ${url}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const response = await page.goto(url);
    expect(response.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    await expect(page.getByRole('article')).toHaveCount(3);
    await expect(page.getByText('준비 중', { exact: true })).toBeVisible();
    await expect(page.locator('.placeholder-page__english')).toBeVisible();
    await expect(page.getByRole('navigation', { name: '관련 페이지' }).getByRole('link')).toHaveCount(2);
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    expect(errors).toEqual([]);
  });
}

test('존재하지 않는 URL', async ({ page }) => {
  await page.goto('/not-a-page');
  await expect(page.getByRole('heading')).toHaveText('페이지를 찾을 수 없습니다.');
});
