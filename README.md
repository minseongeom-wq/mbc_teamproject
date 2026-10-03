# Nintendo Korea

React + Vite + JavaScript 기반의 닌텐도 코리아 팀 프로젝트입니다. 홈 화면과 반응형 Navigation·Dropdown·Footer를 구현했으며, 나머지 페이지는 이동 확인용 안내 화면입니다.

## 실행

```sh
npm ci
npm run dev
npm run lint
npm run build
npm test
```

PowerShell 실행 정책으로 npm.ps1이 차단되면 `npm.cmd`를 사용합니다. 브라우저 테스트에는 Microsoft Edge가 필요합니다. Playwright가 4173 포트에 개발 서버를 실행하므로 해당 포트를 비워 두어야 합니다.

## 페이지와 경로

| src/pages 폴더 | Page 파일 | URL |
|---|---|---|
| home | HomePage.jsx | `/` |
| mario | MarioPage.jsx | `/ip/mario` |
| zelda | ZeldaPage.jsx | `/ip/zelda` |
| splatoon | SplatoonPage.jsx | `/ip/splatoon` |
| store | StorePage.jsx | `/store` |
| product-list | ProductListPage.jsx | `/store/products` |
| product-detail | ProductDetailPage.jsx | `/store/products/:id` |
| order-review | OrderReviewPage.jsx | `/store/order` |
| checkout | CheckoutPage.jsx | `/store/checkout` |
| product-list | ProductListPage.jsx | `/store/products?category=Switch%20Online` (Switch 2 메뉴) |
| history | HistoryPage.jsx | `/about/history` |
| community | CommunityPage.jsx | `/community` |
| support | SupportPage.jsx | `/support` |
| login | LoginPage.jsx | `/login` |
| signup | SignupPage.jsx | `/signup` |
| mypage | MyPage.jsx | `/mypage` |

IP 페이지는 별도 컴포넌트로 구성합니다. 등록되지 않은 경로는 페이지를 찾을 수 없다는 안내를 표시합니다.

## 구현 상태

- 홈: 인트로, 히어로, 게임 선택, 뉴스와 뉴스 모달, amiibo, Nintendo Picks, Nintendo Today 섹션 및 반응형 화면과 스크롤 효과.
- 공통: MainLayout의 Navigation·Dropdown·Footer, 내부 링크, 키보드 메뉴 조작, 경로별 red·white·zelda 스타일.
- 빌드 시 React·GSAP 등 외부 라이브러리를 vendor 청크로 분리합니다. 개별 JavaScript 파일 크기를 줄이고 앱 코드 변경 시 라이브러리 캐시를 재사용할 수 있도록 구성합니다.
- 스토어 단계 이동: 상품 목록 → 임시 상품 상세(`/store/products/demo-product`) → 주문 확인 → 결제 안내.
- 로그인·회원가입·마이페이지·상품·주문·결제와 기타 상세 페이지는 임시 안내 화면입니다. 인증, 실제 상품 데이터, 주문 처리, 결제 기능은 후속 구현이 필요합니다.

`Design-token.md`와 `PROJECT_BUILD_GUIDE.md`는 개발 참고 문서이며, 현재 구현 상태는 소스와 이 README를 기준으로 확인합니다.

## 배포

`.github/workflows/deploy-pages.yml`에서 main 브랜치를 GitHub Pages에 배포합니다. 배포 빌드는 `/mbc_teamproject/`를 base로 사용하며 BrowserRouter도 Vite의 BASE_URL을 사용합니다.

`vite.config.js`는 정해진 페이지와 임시 상품 경로마다 index.html을 복사하고, 다른 동적 경로를 위한 404.html을 생성합니다. GitHub Pages에서 404 fallback으로 접근한 경로는 HTTP 404 상태로 응답할 수 있습니다. 다른 호스팅 환경에서는 SPA 경로를 index.html로 rewrite하도록 설정합니다.

## 검증

`npm run lint`, `npm run build`, `npm test`로 검증합니다. 테스트는 직접 접근·새로고침, 내부 이동·브라우저 기록, 임시 페이지 카드 배치, 공통 UI와 홈 화면의 반응형 동작 및 애니메이션을 확인합니다. 홈 경로는 실제 홈 화면을 검사하고, 임시 페이지 카드 검사는 스토어에서 수행합니다.
