# Nintendo Korea 기본 구조

React + Vite + JavaScript 기반의 팀 작업용 기본 사이트입니다. 페이지 간 이동과 기본 펼침 메뉴를 제공하며, 최종 디자인·CSS·인증·실제 결제 기능은 구현하지 않았습니다.

## 실행

```sh
npm install
npm run dev
npm run lint
npm run build
npm test
```

PowerShell 실행 정책으로 npm.ps1이 차단되면 `npm.cmd`를 사용합니다. 브라우저 검증은 설치된 Microsoft Edge를 사용합니다. 테스트는 개발 서버를 4173 포트에 직접 실행합니다.

## 확인한 원본과 기존 상태

- [최신 Figma IA](https://www.figma.com/design/e0m4kzzInBhdHR8Hrp5jPN/?node-id=382-7970): MCP에서 `IA + 정보구조 / FLOW SYNC`의 일반 사용자 표 확인.
- 작업 시작 시 폴더에는 `Design-token.md`, `PROJECT_BUILD_GUIDE.md`만 있었습니다. 기존 src·라우터·HomePage·공통 UI·팀원 구현·Git 저장소는 없었습니다.
- 위 두 MD는 수정하지 않았습니다. 신규 구조에는 이번 요청의 명칭과 경로를 적용했습니다.

## 생성한 Page와 URL

| 폴더 (src/pages 아래) | Page 파일 | URL |
|---|---|---|
| home | HomePage.jsx | `/` |
| ip-detail | IPDetailPage.jsx | `/ip/:slug` |
| store | StorePage.jsx | `/store` |
| product-list | ProductListPage.jsx | `/store/products` |
| product-detail | ProductDetailPage.jsx | `/store/products/:id` |
| order-review | OrderReviewPage.jsx | `/store/order` |
| checkout | CheckoutPage.jsx | `/store/checkout` |
| hardware | SwitchPage.jsx | `/switch` |
| history | HistoryPage.jsx | `/about/history` |
| community | CommunityPage.jsx | `/community` |
| support | SupportPage.jsx | `/support` |
| login | LoginPage.jsx | `/login` |
| signup | SignupPage.jsx | `/signup` |
| mypage | MyPage.jsx | `/mypage` |

`/ip/mario`, `/ip/zelda`, `/ip/splatoon`은 하나의 IPDetailPage를 공유합니다. 상품 상세의 `:id`는 후속 데이터 연결을 위한 경로 매개변수입니다. 결제와 결과 화면은 CheckoutPage 하나에서 후속 구현합니다. 미등록 URL은 임시 안내 화면을 표시합니다.

## 생성한 폴더

- `src/pages`: `home`, `ip-detail`, `store`, `product-list`, `product-detail`, `order-review`, `checkout`, `hardware`, `history`, `community`, `support`, `login`, `signup`, `mypage`
- `src/components`: `home`, `ip-detail`, `store`, `product-list`, `product-detail`, `order-review`, `checkout`, `hardware`, `history`, `community`, `support`, `mypage`
- `src/components/common/navigation`, `src/components/common/footer`
- `src/layouts`, `src/routes`, `tests`

기능별 pages/components 폴더명은 login·signup을 제외하고 일치합니다. 빈 컴포넌트 폴더에는 향후 Git 추적을 위해 .gitkeep만 두었습니다. 팀원이 JSX와 인접 CSS를 생성한 후 해당 Page에서 직접 import합니다.

## 공통 Layout 연결 상태

모든 페이지는 MainLayout의 Outlet으로 렌더링합니다. 기존 별도 인증 Layout은 없었습니다.

기존 Navigation·Dropdown·Footer 구현은 없었으므로 MainLayout에 CSS 없는 기본 탐색 연결부를 추가했습니다. 텍스트 로고는 메인으로, 주 메뉴와 Footer는 준비된 페이지로 이동합니다. IP와 MY NINTENDO는 브라우저 기본 details/summary로 펼치며 모든 목적지는 React Router NavLink로 연결합니다.

스토어 화면에는 E-shop → 상품 목록 → 이동 확인용 임시 상품(`/store/products/demo-product`) → 주문 확인 → 결제 페이지 링크가 있습니다. 실제 상품 데이터가 없으므로 실상품인 것처럼 표시하지 않습니다. 기존 Page 내용은 변경하지 않았습니다.

향후 디자인된 Navigation·Dropdown·Footer를 연결할 때 MainLayout의 기본 탐색 연결부를 교체하여 중복 렌더링을 피합니다. 현재 Red·White·Gold 및 모바일 전용 디자인 구현은 없으며, 임의로 만들지 않았습니다. Gold를 Zelda에만 적용하는 규칙은 실제 Variant 구현 시 반영해야 합니다.

## MD와 최신 요청의 차이

| 기존 개발 가이드 | 이번 요청에 적용한 구조 |
|---|---|
| MarioPage·ZeldaPage·SplatoonPage | ip-detail/IPDetailPage 공유 |
| StoreHomePage | store/StorePage |
| StoreProductListPage | product-list/ProductListPage |
| StoreProductDetailPage, :productId | product-detail/ProductDetailPage, :id |
| CheckoutPage + CheckoutResultPage | checkout/CheckoutPage |
| NintendoSwitchPage, switch 폴더 | hardware/SwitchPage |
| NintendoHistoryPage, /history | history/HistoryPage, /about/history |
| CommunityFeedPage | community/CommunityPage |
| auth/LoginPage·SignUpPage | login/LoginPage·signup/SignupPage |
| components/layout | components/common/navigation·footer + layouts/MainLayout |
| Games·News·게시글 상세/작성·문의 CRUD·장바구니 등 | 이번 요청의 14개 페이지 밖이므로 신규 생성하지 않음 |
| 인증 보호·회원가입·결제·Zustand 등 전체 기능 | 이번 단계는 구조만 준비; 임시 페이지는 인증 없이 접근 가능 |
| reset·폰트·토큰·스타일 적용 | 이번 CSS 구현 제외 범위에 따라 미적용 |

Figma 지정 영역에는 과거 IA와 최신 일반 사용자 표가 함께 있습니다. Games·News·세부 게시물 페이지가 포함된 과거 표 대신, 요청하신 14개 개발 페이지에 대응하는 최신 일반 사용자 표를 기준으로 했습니다. 관리자 운영 정의는 생성 대상에서 제외했습니다.

## 후속 구현

14개 Page 모두 실제 콘텐츠와 개별 컴포넌트 구현이 필요합니다. 현재는 페이지 제목과 공통 탐색 링크만 표시합니다. 최종 Navigation·Dropdown·Footer 디자인 및 인증 Layout 필요 여부도 후속 작업 대상입니다.

Vite 개발 서버와 preview는 SPA fallback으로 직접 접근·새로고침을 지원합니다. 배포 서버에서는 `/ip/*`, `/store/*` 등을 포함한 앱 경로를 `index.html`로 rewrite하도록 설정해야 합니다. 호스팅 대상이 지정되지 않아 배포 설정은 추가하지 않았습니다.

## 검수 결과

- 요청된 14개 Page 생성 및 기능별 pages/components 폴더명 일치 확인.
- npm run lint 통과.
- npm run build 통과.
- Microsoft Edge 브라우저 테스트 44개 통과: 기존 직접 접근·새로고침 테스트 17개와 내부 이동 테스트 27개. PC 1280px·모바일 390px에서 주 메뉴·계정·IP·Footer·스토어 단계·뒤로/앞으로 이동·키보드 메뉴 조작을 확인했습니다.
- Design-token.md 및 PROJECT_BUILD_GUIDE.md의 작업 전후 SHA-256 동일.
- 기존 Page·components 폴더·두 MD 보존. CSS 생성 없음. 공통 header·main·footer가 각각 한 번만 렌더링됨을 확인했습니다.
- 디자인 Variant는 기존 소스가 없어 검증 대상에서 제외. 배포 서버 rewrite는 배포 시 별도 설정 필요.

## 내부 이동 작업 변경 파일

- 수정: `src/layouts/MainLayout.jsx` — 텍스트 로고, 주 메뉴, IP·계정 펼침 메뉴, 스토어 단계, Footer 내부 링크.
- 수정: `src/routes/routePaths.js` — 이동 확인용 임시 상품 ID 명시. 기존 URL은 모두 유지.
- 추가: `tests/navigation.spec.js` — 실제 클릭 이동·브라우저 기록·공통 영역 중복·키보드 검증.
- 수정: `README.md` — 연결 상태와 검수 결과 갱신.

작업 전에는 위 표의 14개 Page가 URL 직접 접근만 지원했습니다. 이번에는 메뉴 클릭으로도 모두 탐색할 수 있습니다. 새 Page나 기능별 UI 컴포넌트는 생성하지 않았습니다.

## 연결하지 않은 항목

- 이용약관·개인정보처리방침·회사정보·SNS·관련 사이트: 준비된 Page나 확정된 목적 URL이 없어 링크를 추가하지 않았습니다.
- Games·News·장바구니 등 기존 MD의 추가 범위: 최신 일반 사용자 표와 현재 준비된 Page 범위 밖이어서 이번에 만들지 않았습니다.
- 실제 상품 선택·주문·결제: 데이터와 업무 기능이 없는 임시 페이지입니다. 현재 링크는 페이지 이동 검증용입니다.
- 목적지가 없는 `href="#"` 링크는 사용하지 않습니다.
