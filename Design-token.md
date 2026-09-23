# Nintendo Renewal 디자인 토큰 가이드

## 1. 문서 목적

이 문서는 Nintendo Renewal React 팀 프로젝트에서 사용하는 디자인 토큰과 적용 기준을 정의한다.

디자이너와 개발자가 동일한 색상, 글자 크기, 간격, 레이아웃, 모션 기준을 사용하도록 하고 페이지마다 임의의 값을 추가하는 문제를 방지한다.

### Figma 기준 및 적용 범위

- 디자인: https://www.figma.com/design/e0m4kzzInBhdHR8Hrp5jPN/?node-id=1148-6399
- MCP로 확인한 스타일: `Core Color/*`, `Core Font/*` (메인 노드 재확인: 2026-09-23).
- 등록 스타일과 실제 프레임의 값을 구분한다. 색상·타이포 표는 등록 스타일을, 내비게이션 높이·radius·1920px 기준 화면은 실제 프레임을 근거로 한다.
- Figma에 없는 폼·상태·그림자·모션·모바일 기준은 기존 개발 기본값을 유지한다. 이를 Figma 추출값으로 간주하지 않는다.
- 1920px 시안의 대형 글자와 좌표를 모바일에 고정하지 않는다. 모바일 퍼스트 기준으로 조정하고 데스크톱에서 원본 비율을 재현한다.
- 본문은 Pretendard Variable, 영문 디스플레이는 Pexel Grotesk, 한글 디스플레이는 DeltaGlassKR를 사용한다. 추가 폰트 파일과 사용 조건은 구현 시 확인하고, 파일이 없으면 임시 fallback 사용 사실을 보고한다.

### Figma MCP 스타일 연결표

- Figma 파일 키: `e0m4kzzInBhdHR8Hrp5jPN`
- 메인 노드: `1148:6399`
- 조회 도구: `get_variable_defs`
- 이 문서는 MCP로 조회한 스타일을 정리한 파일이다. Figma 변경 사항이 자동으로 동기화되는 것은 아니므로, 디자인 변경 시 같은 노드를 다시 조회해 아래 연결과 CSS 예시를 함께 갱신한다.
- 우선순위: 사용자 지정 기준 → Figma 등록 스타일 → 문서에 표시한 구현 기본값. 본문 행간 1.4와 모바일 크기 기준은 기존 사용자 지침을 유지한다.

| Figma 컬러 스타일 | 확인 값 | CSS 토큰 |
|---|---|---|
| `Core Color/Red` | `#E60012` | `--color-brand-red` |
| `Core Color/Black` | `#151515` | `--color-black` |
| `Core Color/White`, `White` | `#FFFFFF` | `--color-white` |
| `Core Color/White2` | `#EDEDED` | `--color-gray-100` |
| `Core Color/Gray2` | `#DADADA` | `--color-gray-200` |
| `Core Color/Gray` | `#8C8C8C` | `--color-gray-500` |

| Figma 텍스트 스타일 | 확인 서체·굵기·크기 | CSS 크기 토큰 | 프로젝트 적용 행간 |
|---|---|---|---|
| `Core Font/Title/H1 EN` | Pexel Grotesk · 400 · 70px | `--font-size-title-en` | 1.5 |
| `Core Font/Title/H1 KR` | DeltaGlassKR · 400 · 68px | `--font-size-title-kr` | 0.9 |
| `Core Font/Title/H2` | Pretendard · 300 · 55px | `--font-size-title-h2` | normal |
| `Core Font/Body/H3` | Pretendard · 300 · 32px | `--font-size-body-h3` | 1.3 |
| `Core Font/Body/Body` | Pretendard · 300 · 24px | `--font-size-body` | **1.4** (Figma 원본 1.5) |
| `Core Font/Body/Body Strong` | Pretendard · 600 · 30px | `--font-size-body-strong` | **1.4** (Figma 원본 1.3) |
| `Core Font/Body/Caption` | Pretendard · 500 · 15px | `--font-size-caption` | 1.3 |

H2의 행간은 앞서 Plugin API로 확인한 `AUTO`를 CSS `normal`로 대응한다. `get_variable_defs`가 반환하는 `lineHeight: 100`을 임의로 100px로 해석하지 않는다. 메인 노드에서 재확인되지 않은 Nav·Label·Body Long·Caption EN 스타일은 4-6절의 기존 파일 전체 조회 기록을 유지한다.

### 프로젝트 기본 기준

- React + Vite + JavaScript
- Pretendard Variable
- CSS + BEM
- Mobile First
- 닌텐도 레드·블랙·화이트와 픽셀·하프톤 비주얼 중심의 디자인
- 컴포넌트와 페이지 CSS는 해당 JSX 파일과 같은 폴더에 배치
- 공통 디자인 토큰은 `src/styles/variables.css`에서 관리

---

## 2. 토큰 관리 원칙

### 토큰 단계

디자인 토큰은 다음 세 단계로 구분한다.

| 단계            | 역할               | 예시                   |
| --------------- | ------------------ | ---------------------- |
| Primitive Token | 실제 원시 값       | `--color-gray-900`     |
| Semantic Token  | 의미와 역할        | `--color-text-primary` |
| Component Token | 특정 컴포넌트 역할 | `--button-primary-bg`  |

컴포넌트 CSS에서는 가능하면 Primitive Token을 직접 사용하지 않고 Semantic Token 또는 Component Token을 사용한다.

```css
/* 지양 */
.game-card__name {
    color: #111111;
}

/* 권장 */
.game-card__name {
    color: var(--color-text-primary);
}
```

### 토큰 파일 위치

```text
src/
└── styles/
    ├── reset.css
    ├── variables.css
    ├── fonts.css
    └── global.css
```

- `variables.css`: 모든 디자인 토큰 선언
- `fonts.css`: Pretendard Variable, Pexel Grotesk, DeltaGlassKR 연결
- `global.css`: body, 공통 컨테이너, 접근성 유틸리티
- 컴포넌트별 실제 스타일: 해당 컴포넌트 폴더의 CSS

---

### reset.css 기준

- [Eric Meyer Reset CSS v2.0](https://meyerweb.com/eric/tools/css/reset/)를 `src/styles/reset.css`에 사용한다.
- 원본 주석과 규칙을 유지하며, 프로젝트 추가 기본값은 `global.css`에 둔다.
- 로드 순서: `reset.css` → `variables.css` → `fonts.css` → `global.css` → 컴포넌트 CSS.
- Meyer reset의 `body { line-height: 1; }`은 이후 `global.css`에서 `line-height: var(--line-height-body)`로 덮어써 최종 본문 행간을 1.4로 설정한다.

## 3. 컬러 토큰

## 3-1. Primitive Color

### Neutral

| 토큰               | 값        | 용도                           |
| ------------------ | --------- | ------------------------------ |
| `--color-white`    | `#FFFFFF` | 기본 밝은 배경                 |
| `--color-black`    | `#151515` | Core Color/Black · 텍스트·배경 |
| `--color-gray-50`  | `#FAFAFA` | 보조 배경                      |
| `--color-gray-100` | `#EDEDED` | 카드·입력 배경                 |
| `--color-gray-200` | `#DADADA` | 기본 테두리                    |
| `--color-gray-300` | `#D4D4D4` | 비활성 테두리                  |
| `--color-gray-400` | `#A3A3A3` | placeholder                    |
| `--color-gray-500` | `#8C8C8C` | 보조 텍스트                    |
| `--color-gray-600` | `#525252` | 본문 보조 텍스트               |
| `--color-gray-700` | `#404040` | 강조 보조 텍스트               |
| `--color-gray-800` | `#262626` | 어두운 배경                    |
| `--color-gray-900` | `#151515` | 기본 텍스트                    |
| `--color-gray-950` | `#151515` | 가장 어두운 배경               |

### Status

| 토큰                 | 값        | 용도         |
| -------------------- | --------- | ------------ |
| `--color-red-50`     | `#FEF2F2` | 오류 배경    |
| `--color-red-600`    | `#DC2626` | 오류·삭제    |
| `--color-green-50`   | `#F0FDF4` | 성공 배경    |
| `--color-green-700`  | `#15803D` | 성공 상태    |
| `--color-yellow-50`  | `#FEFCE8` | 대기 배경    |
| `--color-yellow-700` | `#A16207` | 대기 상태    |
| `--color-blue-50`    | `#EFF6FF` | 정보 배경    |
| `--color-blue-700`   | `#1D4ED8` | 정보·확인 중 |

상태 컬러는 고객문의 상태, 폼 오류, 성공 알림 등에만 제한적으로 사용한다. 브랜드 레드와 오류 색상은 별도 토큰으로 구분한다.

Figma 대응: Black → `--color-black`, Red → `--color-brand-red`, White → `--color-white`, White2 → `--color-gray-100`, Gray2 → `--color-gray-200`, Gray → `--color-gray-500`. 나머지 중간 회색은 기존 보완값이다.

## 3-2. Semantic Color

| 토큰                           | 연결 값              | 역할                    |
| ------------------------------ | -------------------- | ----------------------- |
| `--color-bg-primary`           | `--color-white`      | 기본 화면 배경          |
| `--color-bg-secondary`         | `--color-gray-100`   | 보조 섹션 배경          |
| `--color-bg-inverse`           | `--color-gray-950`   | 반전 배경               |
| `--color-surface`              | `--color-white`      | 카드·모달 표면          |
| `--color-surface-muted`        | `--color-gray-100`   | 비활성·보조 표면        |
| `--color-text-primary`         | `--color-gray-900`   | 제목·본문 기본색        |
| `--color-text-secondary`       | `--color-gray-600`   | 설명·메타 정보          |
| `--color-text-muted`           | `--color-gray-500`   | placeholder·비활성 정보 |
| `--color-text-inverse`         | `--color-white`      | 어두운 배경의 텍스트    |
| `--color-border-default`       | `--color-gray-200`   | 기본 테두리             |
| `--color-border-strong`        | `--color-gray-900`   | 선택·강조 테두리        |
| `--color-action-primary`       | `--color-brand-red`  | 기본 CTA                |
| `--color-action-primary-hover` | `--color-gray-800`   | CTA hover · 기존 보완값 |
| `--color-action-disabled`      | `--color-gray-300`   | 비활성 버튼             |
| `--color-focus`                | `#2563EB`            | 키보드 포커스 링        |
| `--color-error`                | `--color-red-600`    | 오류·삭제               |
| `--color-success`              | `--color-green-700`  | 성공                    |
| `--color-warning`              | `--color-yellow-700` | 접수·대기               |
| `--color-info`                 | `--color-blue-700`   | 정보·확인 중            |

### 접근성 기준

- 일반 텍스트와 배경의 명도 대비는 최소 4.5:1을 목표로 한다.
- 큰 글자는 최소 3:1을 목표로 한다.
- 포커스 표시와 UI 경계는 주변 색상과 최소 3:1을 목표로 한다.
- 상태는 색상만으로 표현하지 않고 텍스트 또는 아이콘을 함께 제공한다.

---

## 4. 타이포그래피 토큰

## 4-1. Font Family

| 토큰                 | 값                                              |
| -------------------- | ----------------------------------------------- |
| `--font-family-base` | `"Pretendard Variable", Pretendard, sans-serif` |

## 4-2. Font Weight

| 토큰                     |    값 | 용도      |
| ------------------------ | ----: | --------- |
| `--font-weight-regular`  | `400` | 본문      |
| `--font-weight-medium`   | `500` | 버튼·메뉴 |
| `--font-weight-semibold` | `600` | 카드 제목 |
| `--font-weight-bold`     | `700` | 주요 제목 |

## 4-3. Font Size

| 토큰               |         값 | 사용 예시               |
| ------------------ | ---------: | ----------------------- |
| `--font-size-100`  |  `0.75rem` | 12px 캡션               |
| `--font-size-200`  | `0.875rem` | 14px 메타 정보          |
| `--font-size-300`  |     `1rem` | 16px 본문               |
| `--font-size-400`  | `1.125rem` | 18px 강조 본문          |
| `--font-size-500`  |  `1.25rem` | 20px 카드 제목          |
| `--font-size-600`  |   `1.5rem` | 24px 섹션 소제목        |
| `--font-size-700`  |     `2rem` | 32px 모바일 페이지 제목 |
| `--font-size-800`  |   `2.5rem` | 40px 태블릿 제목        |
| `--font-size-900`  |   `3.5rem` | 56px 데스크톱 제목      |
| `--font-size-1000` |   `4.5rem` | 72px 데스크톱 히어로    |

폼·기능 화면의 본문은 기본 16px을 유지하고, 브랜드 콘텐츠 본문은 Figma Body 스타일(데스크톱 24px)을 사용한다. 작은 정보도 12px 미만으로 작성하지 않는다.

## 4-4. Line Height

| 토큰                    |     값 | 용도        |
| ----------------------- | -----: | ----------- |
| `--line-height-tight`   |  `0.9` | 히어로 제목 |
| `--line-height-heading` |  `1.3` | 일반 제목   |
| `--line-height-body`    |  `1.4` | 본문        |
| `--line-height-relaxed` | `1.4` | 긴 설명문   |

## 4-5. Letter Spacing

| 토큰                      |        값 | 용도      |
| ------------------------- | --------: | --------- |
| `--letter-spacing-tight`  | `-0.03em` | 대형 제목 |
| `--letter-spacing-normal` |       `0` | 본문      |
| `--letter-spacing-wide`   |  `0.04em` | 메뉴·버튼 |
| `--letter-spacing-wider`  |  `0.12em` | 영문 라벨 |

---

## 4-6. Figma 등록 타이포그래피

아래 표는 Figma의 데스크톱 스타일을 기준으로 한다. 본문·긴 본문·강조 본문의 행간은 2026-09-23 사용자 지시에 따라 원본 값보다 우선하여 1.4를 적용한다. 제목·메뉴·캡션 행간은 기존 기준을 유지한다. 기존 숫자형 폰트 크기 토큰은 폼·보조 화면용으로 유지하고, 브랜드 콘텐츠는 아래 역할별 토큰을 사용한다. 모든 스타일의 자간은 0이며 Label만 -2%다. H2의 AUTO는 `normal`로 대응한다.

| 스타일           | 폰트          | 굵기 | 크기 토큰                        | 행간   |
| ---------------- | ------------- | ---: | -------------------------------- | ------ |
| Title/H1 EN      | Pexel Grotesk |  400 | `--font-size-title-en` (70px)    | 1.5    |
| Title/H1 KR      | DeltaGlassKR  |  400 | `--font-size-title-kr` (68px)    | 0.9    |
| Title/H2         | Pretendard    |  300 | `--font-size-title-h2` (55px)    | normal |
| Body/H3          | Pretendard    |  300 | `--font-size-body-h3` (32px)     | 1.3    |
| Body/Nav S       | Pretendard    |  700 | `--font-size-nav-s` (16px)       | 1.35   |
| Body/Nav M       | Pexel Grotesk |  400 | `--font-size-nav-m` (40px)       | 1.35   |
| Body/Nav L       | Pexel Grotesk |  400 | `--font-size-nav-l` (56px)       | 1.35   |
| Body/Label       | Pretendard    |  300 | `--font-size-label` (28px)       | 1.3    |
| Body/Body        | Pretendard    |  300 | `--font-size-body` (24px)        | 1.4 |
| Body/Body Long   | Pretendard    |  300 | `--font-size-body` (24px)        | 1.4 |
| Body/Body Strong | Pretendard    |  600 | `--font-size-body-strong` (30px) | 1.4 |
| Body/Caption     | Pretendard    |  500 | `--font-size-caption` (15px)     | 1.3    |
| Body/Caption EN  | Pexel Grotesk |  400 | `--font-size-caption` (15px)     | 1.3    |

히어로의 40th(560px/500px), 82px 문구는 해당 프레임에만 있는 개별 값이다. 공통 H1을 바꾸지 말고 HeroSection 전용 CSS에서 반응형으로 처리한다.

---

## 4-7. 한글·영문 및 PC·모바일 폰트 기준

| 용도 | 한글 | 영문 | 확인 사항 |
|---|---|---|---|
| 본문·기능 UI | Pretendard Variable | Pretendard Variable | 혼합 문장·숫자·문장부호, 300/400/500/600/700 굵기 |
| 디스플레이 제목 | DeltaGlassKR | Pexel Grotesk | 각각 400 굵기, 언어별 명시적 서체 적용 |
| fallback | Pretendard Variable → Pretendard → sans-serif | 제목은 sans-serif, 본문은 기본 서체 | 실제 폰트 로드·누락 글리프 확인 |

- 실제 파일: `public/fonts/PretendardVariable.woff2`, `PexelGrotesk-Regular.ttf`, `DeltaGlassKR.ttf`.
- 영문 전용 Pexel Grotesk를 한글 본문에 지정하지 않는다. 혼합 제목은 언어별 요소로 나누어 서체를 적용한다.
- 본문·긴 본문·강조 본문 행간은 단위 없는 `1.4`다. 예: 모바일 16px → 22.4px, PC 24px → 33.6px.
- PC는 1024px 이상, 모바일·태블릿은 1024px 미만에서 아래 모바일 크기를 사용한다. 모바일 값은 구현 기본값이며 Figma 추출값이 아니다.

| 역할 | PC | 모바일 | 반응형 토큰 |
|---|---:|---:|---|
| 영문 디스플레이 | 70px | 36px | `--font-size-content-title-en` |
| 한글 디스플레이 | 68px | 32px | `--font-size-content-title-kr` |
| 섹션 제목 | 55px | 28px | `--font-size-content-title-h2` |
| 소제목 | 32px | 24px | `--font-size-content-body-h3` |
| 작은 메뉴 | 16px | 16px | `--font-size-content-nav-s` |
| 중간 메뉴 | 40px | 24px | `--font-size-content-nav-m` |
| 큰 메뉴 | 56px | 32px | `--font-size-content-nav-l` |
| 라벨 | 28px | 16px | `--font-size-content-label` |
| 본문·긴 본문 | 24px | 16px | `--font-size-content-body` |
| 강조 본문 | 30px | 18px | `--font-size-content-body-strong` |
| 캡션 | 15px | 12px | `--font-size-content-caption` |

크기 원본은 `--font-size-역할-pc`와 `--font-size-역할-mobile`로 구분하고, 실제 반응형 UI에서는 `--font-size-content-역할`을 사용한다. 토큰 예시의 미디어쿼리가 이 별칭을 전환한다.

```css
.article__body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-content-body);
  line-height: var(--line-height-body);
}
```

기존 메인페이지의 `--font-size-body` 등은 1920px Figma 좌표 기준 토큰으로 유지한다. 현재 메인페이지는 `--home-scale`로 글자도 비례 축소하므로 모바일 크기 적용이 완료된 것으로 간주하지 않는다. 모바일 레이아웃 작업 시 반응형 토큰으로 교체하고 글자 크기에 `--home-scale`을 중복 곱하지 않는다.

---

## 5. 간격 토큰

4px을 기본 단위로 사용한다.

| 토큰         |        값 |  픽셀 |
| ------------ | --------: | ----: |
| `--space-0`  |       `0` |   0px |
| `--space-1`  | `0.25rem` |   4px |
| `--space-2`  |  `0.5rem` |   8px |
| `--space-3`  | `0.75rem` |  12px |
| `--space-4`  |    `1rem` |  16px |
| `--space-5`  | `1.25rem` |  20px |
| `--space-6`  |  `1.5rem` |  24px |
| `--space-8`  |    `2rem` |  32px |
| `--space-10` |  `2.5rem` |  40px |
| `--space-12` |    `3rem` |  48px |
| `--space-16` |    `4rem` |  64px |
| `--space-20` |    `5rem` |  80px |
| `--space-24` |    `6rem` |  96px |
| `--space-32` |    `8rem` | 128px |

### 간격 적용 기준

- 아이콘과 텍스트: 8px
- 입력 label과 input: 8px
- 폼 필드 사이: 20px 또는 24px
- 카드 내부 여백: 모바일 16px, 데스크톱 24px
- 섹션 사이: 모바일 64px, 태블릿 80px, 데스크톱 96px 이상

---

## 6. 레이아웃 토큰

## 6-1. Container

| 토큰             |       값 | 역할                |
| ---------------- | -------: | ------------------- |
| `--container-sm` |  `640px` | 폼·인증 화면        |
| `--container-md` |  `960px` | 게시판·고객문의     |
| `--container-lg` | `1200px` | 일반 콘텐츠         |
| `--container-xl` | `1440px` | 게임 탐색·메인 화면 |

## 6-2. Page Padding

| 토큰                     |     값 |
| ------------------------ | -----: |
| `--page-padding-mobile`  | `16px` |
| `--page-padding-tablet`  | `24px` |
| `--page-padding-desktop` | `40px` |

## 6-3. Grid Gap

| 토큰            |     값 |
| --------------- | -----: |
| `--grid-gap-sm` | `12px` |
| `--grid-gap-md` | `20px` |
| `--grid-gap-lg` | `32px` |

### 상품 그리드

- 모바일: 2열
- 태블릿: 3열
- 데스크톱: 4열

---

## 7. 반응형 기준

Mobile First 방식으로 기본 스타일을 작성한다.

| 구분    |             기준 |
| ------- | ---------------: |
| Mobile  | 기본값, 0px 이상 |
| Tablet  |     `768px` 이상 |
| Desktop |    `1024px` 이상 |
| Wide    |    `1440px` 이상 |

CSS 변수는 미디어쿼리 안에서 필요한 값만 변경한다.

```css
:root {
    --page-padding: var(--page-padding-mobile);
    --section-space: var(--space-16);
}

@media (min-width: 768px) {
    :root {
        --page-padding: var(--page-padding-tablet);
        --section-space: var(--space-20);
    }
}

@media (min-width: 1024px) {
    :root {
        --page-padding: var(--page-padding-desktop);
        --section-space: var(--space-24);
    }
}
```

---

## 8. 크기 토큰

| 토큰                    |     값 | 용도           |
| ----------------------- | -----: | -------------- |
| `--size-touch-min`      | `44px` | 최소 터치 영역 |
| `--size-button-sm`      | `40px` | 작은 버튼      |
| `--size-button-md`      | `48px` | 기본 버튼      |
| `--size-button-lg`      | `56px` | 주요 CTA       |
| `--size-input`          | `48px` | 기본 입력 요소 |
| `--size-header-mobile`  | `56px` | 모바일 헤더    |
| `--size-header-desktop` | `60px` | 데스크톱 헤더  |
| `--size-icon-sm`        | `16px` | 작은 아이콘    |
| `--size-icon-md`        | `20px` | 기본 아이콘    |
| `--size-icon-lg`        | `24px` | 주요 아이콘    |

---

## 9. Border 토큰

## 9-1. Border Width

| 토큰                    |    값 |
| ----------------------- | ----: |
| `--border-width-thin`   | `1px` |
| `--border-width-medium` | `2px` |

## 9-2. Border Radius

폼·모달의 기존 보완값은 유지한다. Figma 내비게이션에는 `--radius-nav`(15px), 로고·위젯에는 `--radius-logo`(10px), Back-To-Top에는 `--radius-pill`(30px)을 적용한다.

| 토큰            |       값 | 용도                |
| --------------- | -------: | ------------------- |
| `--radius-none` |      `0` | 게임 카드·기본 영역 |
| `--radius-sm`   |    `2px` | 작은 상태 요소      |
| `--radius-md`   |    `4px` | 입력·일반 버튼      |
| `--radius-lg`   |    `8px` | 모달·보조 카드      |
| `--radius-full` | `9999px` | 프로필 이미지·배지  |

---

## 10. Shadow 토큰

그림자는 모달, 드롭다운 등 레이어 구분이 필요한 곳에만 사용한다.

| 토큰            | 값                              |
| --------------- | ------------------------------- |
| `--shadow-none` | `none`                          |
| `--shadow-sm`   | `0 1px 2px rgb(0 0 0 / 0.08)`   |
| `--shadow-md`   | `0 8px 24px rgb(0 0 0 / 0.12)`  |
| `--shadow-lg`   | `0 20px 48px rgb(0 0 0 / 0.18)` |

---

## 11. Z-index 토큰

임의의 큰 숫자를 사용하지 않는다.

| 토큰           |    값 | 대상        |
| -------------- | ----: | ----------- |
| `--z-base`     |   `0` | 일반 콘텐츠 |
| `--z-sticky`   | `100` | sticky 요소 |
| `--z-header`   | `200` | 헤더        |
| `--z-dropdown` | `300` | 드롭다운    |
| `--z-overlay`  | `400` | dimmed 배경 |
| `--z-modal`    | `500` | 모달        |
| `--z-toast`    | `600` | 토스트      |

---

## 12. Motion 토큰

모션은 `transform`과 `opacity`를 우선 사용한다.

## 12-1. Duration

| 토큰                 |      값 | 용도              |
| -------------------- | ------: | ----------------- |
| `--duration-fast`    | `120ms` | hover·즉시 피드백 |
| `--duration-normal`  | `240ms` | 버튼·카드 전환    |
| `--duration-slow`    | `480ms` | 메뉴·모달         |
| `--duration-section` | `800ms` | 섹션 등장         |

## 12-2. Easing

| 토큰                | 값                              |
| ------------------- | ------------------------------- |
| `--ease-standard`   | `cubic-bezier(0.2, 0, 0, 1)`    |
| `--ease-emphasized` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-exit`       | `cubic-bezier(0.4, 0, 1, 1)`    |

### 모션 접근성

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        scroll-behavior: auto !important;
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

GSAP 애니메이션도 `prefers-reduced-motion`을 확인해 축소하거나 비활성화한다.

---

## 13. 투명도 토큰

| 토큰                 |     값 | 용도               |
| -------------------- | -----: | ------------------ |
| `--opacity-disabled` |  `0.4` | 비활성 요소        |
| `--opacity-muted`    | `0.64` | 보조 이미지·텍스트 |
| `--opacity-overlay`  | `0.56` | 모달 배경          |
| `--opacity-hover`    |  `0.8` | 이미지 hover       |

---

## 14. 컴포넌트 토큰

## 14-1. Button

| 토큰                        | 연결 값                        |
| --------------------------- | ------------------------------ |
| `--button-primary-bg`       | `--color-action-primary`       |
| `--button-primary-text`     | `--color-text-inverse`         |
| `--button-primary-hover`    | `--color-action-primary-hover` |
| `--button-secondary-bg`     | `--color-white`                |
| `--button-secondary-text`   | `--color-text-primary`         |
| `--button-secondary-border` | `--color-border-strong`        |
| `--button-disabled-bg`      | `--color-action-disabled`      |
| `--button-height`           | `--size-button-md`             |
| `--button-radius`           | `--radius-md`                  |

## 14-2. Input

| 토큰                   | 연결 값                  |
| ---------------------- | ------------------------ |
| `--input-bg`           | `--color-white`          |
| `--input-text`         | `--color-text-primary`   |
| `--input-placeholder`  | `--color-text-muted`     |
| `--input-border`       | `--color-border-default` |
| `--input-border-focus` | `--color-border-strong`  |
| `--input-border-error` | `--color-error`          |
| `--input-height`       | `--size-input`           |
| `--input-radius`       | `--radius-md`            |

## 14-3. Card

| 토큰             | 연결 값                  |
| ---------------- | ------------------------ |
| `--card-bg`      | `--color-surface`        |
| `--card-border`  | `--color-border-default` |
| `--card-radius`  | `--radius-none`          |
| `--card-padding` | `--space-4`              |

## 14-4. Modal

| 토큰              | 연결 값           |
| ----------------- | ----------------- |
| `--modal-bg`      | `--color-surface` |
| `--modal-radius`  | `--radius-lg`     |
| `--modal-shadow`  | `--shadow-lg`     |
| `--modal-z-index` | `--z-modal`       |

---

## 15. 고객문의 상태 토큰

| 상태                 | 배경                | 텍스트            |
| -------------------- | ------------------- | ----------------- |
| 접수 완료 `PENDING`  | `--color-yellow-50` | `--color-warning` |
| 확인 중 `IN_REVIEW`  | `--color-blue-50`   | `--color-info`    |
| 답변 완료 `ANSWERED` | `--color-green-50`  | `--color-success` |

```css
.inquiry-status--pending {
    color: var(--color-warning);
    background-color: var(--color-yellow-50);
}

.inquiry-status--in-review {
    color: var(--color-info);
    background-color: var(--color-blue-50);
}

.inquiry-status--answered {
    color: var(--color-success);
    background-color: var(--color-green-50);
}
```

---

### Figma 추가 토큰과 화면 기준

| 토큰                       | 값                                                  | 역할                               |
| -------------------------- | --------------------------------------------------- | ---------------------------------- |
| `--color-brand-red`        | `#E60012`                                           | Core Color/Red · 브랜드 강조       |
| `--font-family-display-en` | `"Pexel Grotesk", sans-serif`                       | 영문 디스플레이                    |
| `--font-family-display-kr` | `"DeltaGlassKR", "Pretendard Variable", sans-serif` | 한글 디스플레이                    |
| `--font-weight-light`      | `300`                                               | Light                              |
| `--font-size-title-en`     | `70px`                                              | H1 EN                              |
| `--font-size-title-kr`     | `68px`                                              | H1 KR                              |
| `--font-size-title-h2`     | `55px`                                              | H2                                 |
| `--font-size-body-h3`      | `32px`                                              | H3                                 |
| `--font-size-nav-s`        | `16px`                                              | Nav S                              |
| `--font-size-nav-m`        | `40px`                                              | Nav M                              |
| `--font-size-nav-l`        | `56px`                                              | Nav L                              |
| `--font-size-label`        | `28px`                                              | Label                              |
| `--font-size-body`         | `24px`                                              | Body / Body Long                   |
| `--font-size-body-strong`  | `30px`                                              | Body Strong                        |
| `--font-size-caption`      | `15px`                                              | Caption / Caption EN               |
| `--line-height-auto`       | `normal`                                            | H2의 AUTO                          |
| `--line-height-nav`        | `1.35`                                              | Nav                                |
| `--letter-spacing-label`   | `-0.02em`                                           | Label                              |
| `--radius-logo`            | `10px`                                              | Nav-Logo                           |
| `--radius-nav`             | `15px`                                              | Nav                                |
| `--radius-pill`            | `30px`                                              | Back-To-Top                        |
| `--layout-design-width`    | `1920px`                                            | 원본 시안 기준 폭                  |
| `--container-wide`         | `1760px`                                            | 구현 기준: 1920px에서 좌우 약 80px |
| `--page-padding-wide`      | `80px`                                              | 구현 기준: 시안 좌우 약 80px       |

## 16. variables.css 전체 예시

```css
:root {
    /* Figma styles and wide-layout implementation tokens */
    --color-brand-red: #E60012;
    --font-family-display-en: "Pexel Grotesk", sans-serif;
    --font-family-display-kr: "DeltaGlassKR", "Pretendard Variable", sans-serif;
    --font-weight-light: 300;
    --font-size-title-en: 70px;
    --font-size-title-kr: 68px;
    --font-size-title-h2: 55px;
    --font-size-body-h3: 32px;
    --font-size-nav-s: 16px;
    --font-size-nav-m: 40px;
    --font-size-nav-l: 56px;
    --font-size-label: 28px;
    --font-size-body: 24px;
    --font-size-body-strong: 30px;
    --font-size-caption: 15px;
    --line-height-auto: normal;
    --line-height-nav: 1.35;
    --letter-spacing-label: -0.02em;
    --radius-logo: 10px;
    --radius-nav: 15px;
    --radius-pill: 30px;
    --layout-design-width: 1920px;
    --container-wide: 1760px;
    --page-padding-wide: 80px;

    /* Primitive Colors */
    --color-white: #ffffff;
    --color-black: #151515;
    --color-gray-50: #fafafa;
    --color-gray-100: #EDEDED;
    --color-gray-200: #DADADA;
    --color-gray-300: #d4d4d4;
    --color-gray-400: #a3a3a3;
    --color-gray-500: #8C8C8C;
    --color-gray-600: #525252;
    --color-gray-700: #404040;
    --color-gray-800: #262626;
    --color-gray-900: #151515;
    --color-gray-950: #151515;

    --color-red-50: #fef2f2;
    --color-red-600: #dc2626;
    --color-green-50: #f0fdf4;
    --color-green-700: #15803d;
    --color-yellow-50: #fefce8;
    --color-yellow-700: #a16207;
    --color-blue-50: #eff6ff;
    --color-blue-700: #1d4ed8;

    /* Semantic Colors */
    --color-bg-primary: var(--color-white);
    --color-bg-secondary: var(--color-gray-100);
    --color-bg-inverse: var(--color-gray-950);
    --color-surface: var(--color-white);
    --color-surface-muted: var(--color-gray-100);
    --color-text-primary: var(--color-gray-900);
    --color-text-secondary: var(--color-gray-600);
    --color-text-muted: var(--color-gray-500);
    --color-text-inverse: var(--color-white);
    --color-border-default: var(--color-gray-200);
    --color-border-strong: var(--color-gray-900);
    --color-action-primary: var(--color-brand-red);
    --color-action-primary-hover: var(--color-gray-800);
    --color-action-disabled: var(--color-gray-300);
    --color-focus: #2563eb;
    --color-error: var(--color-red-600);
    --color-success: var(--color-green-700);
    --color-warning: var(--color-yellow-700);
    --color-info: var(--color-blue-700);

    /* Typography */
    --font-family-base: "Pretendard Variable", Pretendard, sans-serif;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-size-100: 0.75rem;
    --font-size-200: 0.875rem;
    --font-size-300: 1rem;
    --font-size-400: 1.125rem;
    --font-size-500: 1.25rem;
    --font-size-600: 1.5rem;
    --font-size-700: 2rem;
    --font-size-800: 2.5rem;
    --font-size-900: 3.5rem;
    --font-size-1000: 4.5rem;
    --line-height-tight: 0.9;
    --line-height-heading: 1.3;
    --line-height-body: 1.4;
    --line-height-relaxed: 1.4;
    --letter-spacing-tight: -0.03em;
    --letter-spacing-normal: 0;
    --letter-spacing-wide: 0.04em;
    --letter-spacing-wider: 0.12em;

    /* Spacing */
    --space-0: 0;
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    --space-16: 4rem;
    --space-20: 5rem;
    --space-24: 6rem;
    --space-32: 8rem;

    /* Layout */
    --container-sm: 640px;
    --container-md: 960px;
    --container-lg: 1200px;
    --container-xl: 1440px;
    --page-padding-mobile: 16px;
    --page-padding-tablet: 24px;
    --page-padding-desktop: 40px;
    --page-padding: var(--page-padding-mobile);
    --section-space: var(--space-16);
    --grid-gap-sm: 12px;
    --grid-gap-md: 20px;
    --grid-gap-lg: 32px;

    /* Size */
    --size-touch-min: 44px;
    --size-button-sm: 40px;
    --size-button-md: 48px;
    --size-button-lg: 56px;
    --size-input: 48px;
    --size-header-mobile: 56px;
    --size-header-desktop: 60px;
    --size-icon-sm: 16px;
    --size-icon-md: 20px;
    --size-icon-lg: 24px;

    /* Border */
    --border-width-thin: 1px;
    --border-width-medium: 2px;
    --radius-none: 0;
    --radius-sm: 2px;
    --radius-md: 4px;
    --radius-lg: 8px;
    --radius-full: 9999px;

    /* Shadow */
    --shadow-none: none;
    --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.08);
    --shadow-md: 0 8px 24px rgb(0 0 0 / 0.12);
    --shadow-lg: 0 20px 48px rgb(0 0 0 / 0.18);

    /* Z-index */
    --z-base: 0;
    --z-sticky: 100;
    --z-header: 200;
    --z-dropdown: 300;
    --z-overlay: 400;
    --z-modal: 500;
    --z-toast: 600;

    /* Motion */
    --duration-fast: 120ms;
    --duration-normal: 240ms;
    --duration-slow: 480ms;
    --duration-section: 800ms;
    --ease-standard: cubic-bezier(0.2, 0, 0, 1);
    --ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-exit: cubic-bezier(0.4, 0, 1, 1);

    /* Opacity */
    --opacity-disabled: 0.4;
    --opacity-muted: 0.64;
    --opacity-overlay: 0.56;
    --opacity-hover: 0.8;

    /* Component */
    --button-primary-bg: var(--color-action-primary);
    --button-primary-text: var(--color-text-inverse);
    --button-primary-hover: var(--color-action-primary-hover);
    --button-secondary-bg: var(--color-white);
    --button-secondary-text: var(--color-text-primary);
    --button-secondary-border: var(--color-border-strong);
    --button-disabled-bg: var(--color-action-disabled);
    --button-height: var(--size-button-md);
    --button-radius: var(--radius-md);
    --input-bg: var(--color-white);
    --input-text: var(--color-text-primary);
    --input-placeholder: var(--color-text-muted);
    --input-border: var(--color-border-default);
    --input-border-focus: var(--color-border-strong);
    --input-border-error: var(--color-error);
    --input-height: var(--size-input);
    --input-radius: var(--radius-md);
    --card-bg: var(--color-surface);
    --card-border: var(--color-border-default);
    --card-radius: var(--radius-none);
    --card-padding: var(--space-4);
    --modal-bg: var(--color-surface);
    --modal-radius: var(--radius-lg);
    --modal-shadow: var(--shadow-lg);
    --modal-z-index: var(--z-modal);
}

@media (min-width: 768px) {
    :root {
        --page-padding: var(--page-padding-tablet);
        --section-space: var(--space-20);
        --card-padding: var(--space-6);
    }
}

@media (min-width: 1024px) {
    :root {
        --page-padding: var(--page-padding-desktop);
        --section-space: var(--space-24);
    }
}

@media (min-width: 1440px) {
    :root {
        --page-padding: var(--page-padding-wide);
    }
}

/* Explicit device sizes. Existing Figma coordinate tokens stay unchanged. */
:root {
    --font-size-title-en-pc: 70px;
    --font-size-title-en-mobile: 36px;
    --font-size-content-title-en: var(--font-size-title-en-mobile);
    --font-size-title-kr-pc: 68px;
    --font-size-title-kr-mobile: 32px;
    --font-size-content-title-kr: var(--font-size-title-kr-mobile);
    --font-size-title-h2-pc: 55px;
    --font-size-title-h2-mobile: 28px;
    --font-size-content-title-h2: var(--font-size-title-h2-mobile);
    --font-size-body-h3-pc: 32px;
    --font-size-body-h3-mobile: 24px;
    --font-size-content-body-h3: var(--font-size-body-h3-mobile);
    --font-size-nav-s-pc: 16px;
    --font-size-nav-s-mobile: 16px;
    --font-size-content-nav-s: var(--font-size-nav-s-mobile);
    --font-size-nav-m-pc: 40px;
    --font-size-nav-m-mobile: 24px;
    --font-size-content-nav-m: var(--font-size-nav-m-mobile);
    --font-size-nav-l-pc: 56px;
    --font-size-nav-l-mobile: 32px;
    --font-size-content-nav-l: var(--font-size-nav-l-mobile);
    --font-size-label-pc: 28px;
    --font-size-label-mobile: 16px;
    --font-size-content-label: var(--font-size-label-mobile);
    --font-size-body-pc: 24px;
    --font-size-body-mobile: 16px;
    --font-size-content-body: var(--font-size-body-mobile);
    --font-size-body-strong-pc: 30px;
    --font-size-body-strong-mobile: 18px;
    --font-size-content-body-strong: var(--font-size-body-strong-mobile);
    --font-size-caption-pc: 15px;
    --font-size-caption-mobile: 12px;
    --font-size-content-caption: var(--font-size-caption-mobile);
}

@media (min-width: 1024px) {
    :root {
        --font-size-content-title-en: var(--font-size-title-en-pc);
        --font-size-content-title-kr: var(--font-size-title-kr-pc);
        --font-size-content-title-h2: var(--font-size-title-h2-pc);
        --font-size-content-body-h3: var(--font-size-body-h3-pc);
        --font-size-content-nav-s: var(--font-size-nav-s-pc);
        --font-size-content-nav-m: var(--font-size-nav-m-pc);
        --font-size-content-nav-l: var(--font-size-nav-l-pc);
        --font-size-content-label: var(--font-size-label-pc);
        --font-size-content-body: var(--font-size-body-pc);
        --font-size-content-body-strong: var(--font-size-body-strong-pc);
        --font-size-content-caption: var(--font-size-caption-pc);
    }
}
```

---

## 17. React 적용 방법

`main.jsx`에서 공통 CSS를 한 번만 불러온다.

```jsx
import './styles/reset.css';
import './styles/fonts.css';
import './styles/variables.css';
import './styles/global.css';
```

컴포넌트 CSS에서는 변수를 사용한다.

```css
.game-card {
        color: var(--color-text-primary);
        background-color: var(--card-bg);
}

.game-card__name {
        margin-top: var(--space-3);
        font-size: var(--font-size-300);
        font-weight: var(--font-weight-medium);
        line-height: var(--line-height-heading);
}

.game-card__like-button {
        width: var(--size-touch-min);
        height: var(--size-touch-min);
        color: var(--color-text-primary);
}

.game-card__like-button:focus-visible {
        outline: var(--border-width-medium) solid var(--color-focus);
        outline-offset: 2px;
}
```

---

## 18. 토큰 사용 금지 기준

- 컴포넌트 CSS에 임의의 HEX 색상을 반복해서 작성하지 않는다.
- `13px`, `17px`, `23px`처럼 정의되지 않은 글자 크기를 임의로 사용하지 않는다.
- `z-index: 9999`를 사용하지 않는다.
- 비슷한 간격 값을 페이지마다 새로 만들지 않는다.
- 색상만으로 성공, 실패, 선택 상태를 표시하지 않는다.
- 그림자와 radius는 Figma에서 확인한 컴포넌트별 기준으로 적용한다.
- 전역 토큰을 특정 컴포넌트 하나만을 위해 무분별하게 추가하지 않는다.

새로운 토큰이 필요한 경우 팀원과 용도, 이름, 중복 여부를 확인한 후 `variables.css`와 이 문서를 함께 수정한다.

---

## 19. 디자인 토큰 완료 체크리스트

- [ ] Pretendard Variable, Pexel Grotesk, DeltaGlassKR 연결과 fallback을 확인했다.
- [ ] `variables.css`에 공통 토큰이 선언되었다.
- [ ] 컬러가 Figma의 레드·블랙·화이트·그레이 스타일과 일치한다.
- [ ] 상태 컬러는 고객문의·알림 등 필요한 곳에만 사용한다.
- [ ] PC·모바일 역할별 폰트 크기를 확인했다(모바일 적용 여부는 비례 축소와 구분).
- [ ] 본문·긴 본문·강조 본문 행간이 1.4다.
- [ ] 한글·영문·혼합 문장·숫자의 실제 서체와 글리프를 확인했다.
- [ ] Meyer reset 이후 프로젝트 기본값과 컴포넌트 스타일이 적용된다.
- [ ] 최소 터치 영역이 44px 이상이다.
- [ ] 간격은 4px 단위를 기준으로 사용한다.
- [ ] 모바일 퍼스트로 작성했다.
- [ ] 768px, 1024px, 1440px 기준을 사용한다.
- [ ] 컴포넌트가 Semantic Token을 우선 사용한다.
- [ ] 임의의 HEX와 z-index를 반복해서 사용하지 않는다.
- [ ] 포커스 표시가 분명하게 보인다.
- [ ] 텍스트 명도 대비를 확인했다.
- [ ] 상태를 색상만으로 구분하지 않는다.
- [ ] `prefers-reduced-motion`을 지원한다.
- [ ] 새 토큰 추가 시 문서와 `variables.css`를 함께 수정한다.
