# Nintendo Renewal — 최신 정보구조 및 기본 페이지 가이드

기준: [Figma 정보구조](https://www.figma.com/design/e0m4kzzInBhdHR8Hrp5jPN/?node-id=382-7970), 수정된 플로우차트 `2665:398` (2026-09-23 확인).
기존 IA 표(`378:7793`)와 내용이 다를 때 **수정된 플로우차트의 실제 표시 텍스트**를 우선한다. 일부 레이어 이름과 상단 요약의 News 표기는 상세 흐름의 MYPAGE와 다르므로 현재 페이지 기준으로 사용하지 않는다.

공통 개발·디자인 규칙은 [PROJECT_BUILD_GUIDE.md](./PROJECT_BUILD_GUIDE.md), [Design-token.md](./Design-token.md)를 따른다. 현재 폴더와 라우트는 이 문서를 기준으로 한다.

## 구현 범위

- 기존 `components/home`, `pages/home`의 소스·콘텐츠·레이아웃은 유지한다.
- Home 이외 화면은 공통 Navigation과 기본 페이지 레이아웃으로 연결한다. `준비 중` 상태와 예정 콘텐츠, 관련 페이지 링크를 제공한다.
- 실제 인증, 결제, 검색, 게시물·문의 저장은 이번 단계에 포함하지 않는다. 결과 화면도 실제 결제 완료를 의미하지 않는다.
- 관리자 화면은 기존 기본 파일만 유지하고 라우트와 일반 메뉴에 연결하지 않는다.
- `ip-explore`, 공개 `news`, `account-find`, 별도 `community-detail` 폴더는 만들지 않는다. 게시물 상세는 `community`에 포함한다.

## 수정된 사용자 흐름

1. **DISCOVER / IP (`2665:399`)**: Home/GNB에서 IP 선택 → IP 상세의 세계관·캐릭터 → 이미지·영상·스토리 → 스토어. Mario, Zelda, Splatoon의 직접 링크를 제공한다.
2. **COMMERCE (`2665:400`)**: E-shop → 상품 목록 → 상품 상세 → 주문 확인 → 로그인 상태 확인 → 결제 → 결과 → Home/마이페이지. E-shop의 게임 목록에서 관련 IP/게임으로 이동한다.
3. **CONTENT (`2665:401`)**: 마이페이지 → 주문 내역·최근 활동·남긴 리뷰. 역사 → 시대별 Nintendo History·IP/게임 연혁 → Home. 커뮤니티 → SNS 피드 → 게시물 상세 → 참여/작성. Nintendo Switch → 스토어/고객지원.
4. **UTILITY (`2665:402`)**: 고객지원 → FAQ/문제 검색 → 상담/수리 접수 → 문의 확인. 로그인/회원가입 → 마이페이지 → 이전 주문·커뮤니티 작업으로 복귀.

인증 후 이전 작업 복귀, 인증이 필요한 화면의 접근 제어, 결제 확인 팝업은 후속 기능 구현 대상이다. 현재는 관련 화면 사이의 링크만 연결한다. 추후 마이페이지·주문·문의에는 인증/소유권 검증을 적용하고, 복귀 주소는 내부 경로만 허용한다.

## 폴더 구조

`src/components`와 `src/pages`는 다음 기능 구조를 공유한다. 각 페이지는 해당 Content 컴포넌트를 조합한다.

```text
common/
  basic-page/
  navigation/
layout/
login/
signup/
home/                         # 기존 유지
ip-detail/
  mario/  zelda/  splatoon/
store/
  games/
  game-detail/
  product-detail/
  order-confirmation/
  payment/                    # 결제와 결과
hardware/
history/                      # 기존 about에서 이동
community/                    # 피드·상세·작성
mypage/                       # 요약·프로필·주문·활동·리뷰
support/                      # 도움말·접수·문의 확인
admin/                        # 기존 기본 파일, 라우트 비활성
```

`pages`와 `components`의 모든 상대 폴더 경로를 동일하게 유지한다. 로그인·회원가입도 각각 Page → Content 구조를 사용한다. `pages/common/NotFoundPage.jsx`와 `pages/layout/BasicPageLayout.jsx`는 공통 화면을 조합한다. `pages/common/basic-page`, `pages/common/navigation`은 대응 구조를 위한 예약 폴더이며 `.gitkeep`으로 보존한다. 해당 UI 구현은 `components/common`에서 관리하고 복사하지 않는다. 파일명과 파일 수는 역할에 따라 다를 수 있다. 새 폴더를 추가하거나 이동할 때 양쪽 경로를 함께 맞춘다.

폴더 그룹과 URL은 독립적이다. 구매 화면의 폴더를 `store` 아래로 모으되 기존 `/games`, `/order-confirmation`, `/payment` 링크는 유지한다. `admin/about`, `admin/news`는 기존 비활성 관리 파일이며 공개 페이지를 의미하지 않는다.

## 현재 연결된 경로

| 경로 | 화면 | components/pages 기능 폴더 |
| --- | --- | --- |
| `/` | 기존 Home | `home` |
| `/ip/mario`, `/ip/zelda`, `/ip/splatoon` | IP 상세 | `ip-detail/{캐릭터}` |
| `/store` | E-shop / 닌텐도 스토어 | `store` |
| `/games` | 게임 목록·탐색 | `store/games` |
| `/games/:productId` | 게임 상세 | `store/game-detail` |
| `/store/:productId` | 상품 상세 | `store/product-detail` |
| `/order-confirmation` | 주문 확인 | `store/order-confirmation` |
| `/payment` | 결제 | `store/payment` |
| `/payment/result` | 결제 결과 | `store/payment` |
| `/hardware` | Nintendo Switch | `hardware` |
| `/history` | 닌텐도의 역사 | `history` |
| `/community` | 커뮤니티 / SNS 피드 | `community` |
| `/community/:postId` | 게시물 상세 | `community` |
| `/community/write` | 참여·게시글 작성 | `community` |
| `/mypage` | 마이 닌텐도 | `mypage` |
| `/mypage/orders` | 주문 내역 | `mypage` |
| `/mypage/activity` | 최근 활동 | `mypage` |
| `/mypage/reviews` | 남긴 리뷰 | `mypage` |
| `/mypage/profile` | 프로필 수정 | `mypage` |
| `/support` | 고객지원 | `support` |
| `/support/faq` | FAQ / 문제 검색 | `support` |
| `/support/request` | 상담 / 수리 접수 | `support` |
| `/inquiries` | 문의 확인 / 내 문의 | `support` |
| `/login`, `/signup` | 로그인·회원가입 | `login`, `signup` |

`/about`은 `/history`로 리다이렉트한다. 미등록 경로, 미지원 IP, `/admin`은 404 안내 화면을 표시한다. 상세의 `sample-*` 링크는 기본 화면 점검용이며 실제 콘텐츠가 아니다.

## 연결 및 스타일 규칙

- 경로는 `src/components/common/navigation/navigationLinks.js`에서 관리하고 `src/App.jsx`에 등록한다.
- 내부 이동은 `AppLink`를 사용한다. 배포 하위 경로는 BrowserRouter의 `import.meta.env.BASE_URL` 기준이다.
- 기본 페이지 문구는 `src/data/basicPages.js` → `src/services/basicPageService.js` → `FeatureOverview`를 통해 제공한다.
- 기존 CSS/BEM 및 Design-token의 색상·타이포그래피를 유지한다. 새 애니메이션은 추가하지 않는다.
- 기본 페이지에 들어가면 제목을 갱신하고 본문 제목으로 포커스를 이동한다.

## 확인 방법

```sh
npm ci
npm run build
npm run dev
```

기본 Vite 주소에서 `/`을 열고 메뉴 → IP/스토어/역사/커뮤니티/지원 → 관련 페이지 링크를 확인한다. Vercel에서는 `/`, GitHub Pages 배포에서는 `/mbc_teamproject/`을 기준으로 한다. 상세 URL 새로고침·뒤로 가기와 모바일 너비도 확인한다. GitHub Pages용 `404.html`은 빌드 후 생성되며 직접 진입 시 플랫폼 특성상 HTTP 상태가 404일 수 있다. Vercel은 rewrite 설정을 사용한다.

이번 변경의 브라우저 검증 스크립트는 로컬 `.work/verify-basic-pages.mjs`에 있다. Edge/Playwright 실행 환경이 필요하며 일반 빌드에는 필요하지 않다.
