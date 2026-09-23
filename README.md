# Nintendo Renewal — Home

Figma 메인페이지를 구현한 React + Vite + JavaScript 프로젝트입니다. 이번 구현 범위는 Home 한 페이지입니다.

```sh
npm install
npm run dev
npm run lint
npm run build
```

## 구성

- `src/pages/home/NintendoHomePage.jsx`: 메인페이지 조합
- `src/components/home/`: HeroSection, GameDiscoverySection, WhatsNewSection, AmiiboSection, NintendoPicksSection, DailyNintendoSection, DailyNintendoBanner
- `src/components/home/AmiiboFigure.jsx`: 반복 피규어 UI
- `src/components/layout/`: NintendoHeader, NintendoFooter
- `src/components/common/FigmaImage.jsx`: Figma 공통 이미지 레이어
- `src/data/home.js` → `src/services/homeService.js`: 반복 콘텐츠 전달
- `src/hooks/useDesignScale.js`: 1920px 원본 레이아웃을 현재 화면 폭에 비례 적용
- `src/styles/`: reset, 문서 기반 토큰, 폰트, 전역 접근성 규칙
- 각 페이지와 컴포넌트의 CSS는 JSX 옆에 배치합니다.

## 디자인 출처

[Figma 메인페이지](https://www.figma.com/design/e0m4kzzInBhdHR8Hrp5jPN/?node-id=1148-6399)

| 섹션 | 노드 |
|---|---|
| Hero | 1148:6400 |
| Game Discovery | 1148:6518 |
| What's New | 1215:8562 |
| Amiibo | 1148:6626 |
| Nintendo Picks | 1148:6675 |
| Daily Nintendo | 1148:6749 |
| Daily Nintendo Banner | 1148:6782 |
| Footer | 1148:8007 |

`public/images/banners`의 이미지·SVG는 위 Figma 메인 노드에서 추출한 원본 에셋입니다. 에셋 파일명은 MCP 내보내기의 식별자를 유지하며, JSX의 `data-node-id`로 원본 위치를 추적할 수 있습니다. `shader-orange.png`, `shader-blue.png`는 각각 1215:8569, 1215:8570 효과 레이어의 정적 내보내기입니다. 일시적인 Figma 에셋 URL에 의존하지 않습니다.

폰트는 로컬에서 제공된 PretendardVariable.woff2, PexelGrotesk-Regular.ttf, DeltaGlassKR.ttf를 `public/fonts`에 복사해 사용합니다.

## 동작과 범위

- MENU: 메인 섹션 탐색, 바깥 클릭·Escape 닫기, 닫은 뒤 키보드 초점 복귀
- 로고·Back to top: 페이지 맨 위로 이동
- MY NINTENDO: [공식 My Nintendo](https://my.nintendo.com/) 외부 이동
- 이메일·전화번호: 기본 메일·전화 링크
- 게임 캐러셀·플레이 모드·뉴스 카드·위젯은 Figma의 초기 정적 상태를 재현합니다. 확인되지 않은 목적지나 추가 콘텐츠는 만들지 않았습니다.
- GSAP, 자동 재생, 실제 셰이더 실행은 사용하지 않습니다.
- 데스크톱 구성을 우선하며 폭에 따라 비례 축소됩니다. 전용 모바일 레이아웃은 별도 구현 범위입니다.
- 기존 두 지침 문서와 다른 페이지는 수정하지 않았습니다.
