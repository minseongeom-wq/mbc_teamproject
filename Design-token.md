# Nintendo Renewal 디자인 토큰 가이드

## 1. 문서 목적

이 문서는 Nintendo Renewal React 팀 프로젝트에서 사용하는 디자인 토큰과 적용 기준을 정의한다.

디자이너와 개발자가 동일한 색상, 글자 크기, 간격, 레이아웃, 모션 기준을 사용하도록 하고 페이지마다 임의의 값을 추가하는 문제를 방지한다.

### 프로젝트 기본 기준

- React + Vite + JavaScript
- Pretendard Variable + Figma 화면별 디스플레이 폰트
- CSS + BEM
- Mobile First
- 화이트·블랙·닌텐도 레드 기반 공통 UI와 Mario·Zelda·Splatoon별 테마
- 컴포넌트와 페이지 CSS는 해당 JSX 파일과 같은 폴더에 배치
- 본문 행간은 PC·모바일·한글·영문 모두 단위 없는 `1.4`를 사용
- CSS 초기화는 Eric Meyer Reset CSS v2.0 사용
- 공통 디자인 토큰은 `src/styles/variables.css`에서 관리

---

### Figma 기준과 적용 범위

- 스타일 원본: [06 Design System](https://www.figma.com/design/e0m4kzzInBhdHR8Hrp5jPN/?node-id=450-10178)
- MCP로 확인한 `Core Color`, `Core Font`, `Core_Mobile`, `Commerce`, `Mario`, `Zelda`, `Splatoon` 스타일을 적용한다.
- 아래의 Figma 매핑 표는 원본 값이다. 본문 행간은 사용자 지정 `1.4`가 Figma 원본보다 우선하며 CSS 적용 토큰에 반영한다. 간격·반응형·모션·그림자·상태 컬러 등 별도 Figma 근거가 없는 기존 값은 구현 기본값으로 유지한다.
- 같은 파일의 `Design Quick` 스타일은 이번 닌텐도 디자인 시스템 범위에 포함하지 않는다.
- 폰트 파일은 `src/styles/fonts.css`에서 연결한다. 원본 폰트 파일이 없으면 대체 폰트를 명시하고 동일하게 재현했다고 간주하지 않는다.

## 2. 토큰 관리 원칙

### 토큰 단계

디자인 토큰은 다음 세 단계로 구분한다.

| 단계 | 역할 | 예시 |
|---|---|---|
| Primitive Token | 실제 원시 값 | `--color-gray-900` |
| Semantic Token | 의미와 역할 | `--color-text-primary` |
| Component Token | 특정 컴포넌트 역할 | `--button-primary-bg` |

컴포넌트 CSS에서는 가능하면 Primitive Token을 직접 사용하지 않고 Semantic Token 또는 Component Token을 사용한다.

```css
/* 지양 */
.product-card__name {
  color: #111111;
}

/* 권장 */
.product-card__name {
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

- `reset.css`: [Eric Meyer Reset CSS v2.0](https://meyerweb.com/eric/tools/css/reset/) 원본 사용
- `variables.css`: 모든 디자인 토큰 선언
- `fonts.css`: Pretendard Variable 및 Figma 지정 디스플레이 폰트 연결
- `global.css`: body, 공통 컨테이너, 접근성 유틸리티
- 컴포넌트별 실제 스타일: 해당 컴포넌트 폴더의 CSS

---

### reset.css 적용 기준

- [Meyer Reset CSS 공식 페이지](https://meyerweb.com/eric/tools/css/reset/)의 v2.0 (20110126)을 `src/styles/reset.css`에 저장해 사용한다. 출처·버전·public domain 주석을 유지한다.
- 공식 CSS 파일: [reset.css 다운로드](https://meyerweb.com/eric/tools/css/reset/reset.css)
- 로드 순서: `reset.css → fonts.css → variables.css → global.css`.
- reset의 `body { line-height: 1; }`은 초기화 값이다. 이후 `global.css`에서 `line-height: var(--line-height-body)`로 덮어써 본문 행간을 1.4로 적용한다.
- 프로젝트의 폰트·색상·반응형 크기는 reset에 넣지 않고 토큰과 전역 스타일에서 관리한다.


## 3. 컬러 토큰

## 3-1. Primitive Color

### Neutral

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-white` | `#FFFFFF` | 기본 밝은 배경 |
| `--color-black` | `#000000` | 가장 강한 텍스트·배경 |
| `--color-gray-50` | `#FAFAFA` | 보조 배경 |
| `--color-gray-100` | `#F5F5F5` | 카드·입력 배경 |
| `--color-gray-200` | `#E5E5E5` | 기본 테두리 |
| `--color-gray-300` | `#D4D4D4` | 비활성 테두리 |
| `--color-gray-400` | `#A3A3A3` | placeholder |
| `--color-gray-500` | `#737373` | 보조 텍스트 |
| `--color-gray-600` | `#525252` | 본문 보조 텍스트 |
| `--color-gray-700` | `#404040` | 강조 보조 텍스트 |
| `--color-gray-800` | `#262626` | 어두운 배경 |
| `--color-gray-900` | `#171717` | 기본 텍스트 |
| `--color-gray-950` | `#0A0A0A` | 가장 어두운 배경 |

### Figma 원본 컬러 매핑

| Figma 스타일 | CSS 토큰 | 값 |
|---|---|---|
| Core Color/White | `--color-white` | `#FFFFFF` |
| Core Color/White2 | `--color-core-white2` | `#EDEDED` |
| Core Color/Stroke | `--color-core-stroke` | `#D2D2CD` |
| Core Color/Gray2 | `--color-core-gray2` | `#DADADA` |
| Core Color/Gray | `--color-core-gray` | `#8C8C8C` |
| Core Color/Black | `--color-core-black` | `#151515` |
| Core Color/Red | `--color-nintendo-red` | `#E60012` |
| Mario/Mario-Black 2 | `--color-mario-mario-black-2` | `#363636` |
| Mario/Main/Red | `--color-mario-main-red` | `#FF0000` |
| Mario/Main/Green | `--color-mario-main-green` | `#08A937` |
| Mario/Main/Pink | `--color-mario-main-pink` | `#F196BF` |
| Mario/Main/Lime | `--color-mario-main-lime` | `#70B921` |
| Mario/Main/Blue | `--color-mario-main-blue` | `#18419A` |
| Mario/Main/Yellow | `--color-mario-main-yellow` | `#F8BF10` |
| Mario/Main/Section Label | `--color-mario-main-section-label` | `#E70012` |
| Mario/Sub/Preview Info  Description | `--color-mario-sub-preview-info-description` | `#333333` |
| Mario/Sub/Preview Character  Title - Default | `--color-mario-sub-preview-character-title-default` | `#E60012` |
| Mario/Sub/Preview Character  Title - Fire | `--color-mario-sub-preview-character-title-fire` | `#F45A3C` |
| Mario/Sub/Preview Character  Title - Cat | `--color-mario-sub-preview-character-title-cat` | `#FFD50B` |
| Mario/Sub/Preview Character  Title - Elephant | `--color-mario-sub-preview-character-title-elephant` | `#F06F72` |
| Mario/Sub/Preview Character  Title - Bubble | `--color-mario-sub-preview-character-title-bubble` | `#D964FE` |
| Mario/Sub/Preview Character  Title - Drill | `--color-mario-sub-preview-character-title-drill` | `#84381F` |
| Mario/Sub/Red | `--color-mario-sub-red` | `#FFF0EE` |
| Mario/Sub/Green | `--color-mario-sub-green` | `#E6FFDD` |
| Mario/Sub/Pink | `--color-mario-sub-pink` | `#FADDEA` |
| Mario/Sub/Lime | `--color-mario-sub-lime` | `#F2F8DF` |
| Mario/Sub/Blue | `--color-mario-sub-blue` | `#DDE9FA` |
| Mario/Sub/Yellow | `--color-mario-sub-yellow` | `#FFE5C4` |
| Splatoon/Yellow | `--color-splatoon-yellow` | `#FFFF5F` |
| Splatoon/Blue | `--color-splatoon-blue` | `#603BFF` |
| Splatoon/Black | `--color-splatoon-black` | `#24343D` |
| Zelda/Gold | `--color-zelda-gold` | `#C7952F` |
| Zelda/Green | `--color-zelda-green` | `#4CC3A8` |

Neutral의 기존 회색 단계는 보조 UI용으로 유지한다. 실제 화면의 공통 배경·텍스트·경계는 아래 Semantic 매핑을 사용한다.

### Status

| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-red-50` | `#FEF2F2` | 오류 배경 |
| `--color-red-600` | `#DC2626` | 오류·삭제 |
| `--color-green-50` | `#F0FDF4` | 성공 배경 |
| `--color-green-700` | `#15803D` | 성공 상태 |
| `--color-yellow-50` | `#FEFCE8` | 대기 배경 |
| `--color-yellow-700` | `#A16207` | 대기 상태 |
| `--color-blue-50` | `#EFF6FF` | 정보 배경 |
| `--color-blue-700` | `#1D4ED8` | 정보·확인 중 |

상태 컬러는 고객문의 상태, 폼 오류, 성공 알림에 사용한다. 브랜드 레드와 IP별 컬러는 상태 컬러와 구분한다.

## 3-2. Semantic Color

`--color-text-secondary`, `--color-text-muted`, hover·focus·status는 기존 접근성·상호작용용 기본값을 유지한다. `Core Color/Gray`는 장식·비활성 표시에만 사용하고 작은 본문에는 대비를 확인한다.

| 토큰 | 연결 값 | 역할 |
|---|---|---|
| `--color-bg-primary` | `--color-white` | 기본 화면 배경 |
| `--color-bg-secondary` | `--color-core-white2` | 보조 섹션 배경 |
| `--color-bg-inverse` | `--color-core-black` | 반전 배경 |
| `--color-surface` | `--color-white` | 카드·모달 표면 |
| `--color-surface-muted` | `--color-core-gray2` | 비활성·보조 표면 |
| `--color-text-primary` | `--color-core-black` | 제목·본문 기본색 |
| `--color-text-secondary` | `--color-gray-600` | 설명·메타 정보 |
| `--color-text-muted` | `--color-gray-500` | placeholder·비활성 정보 |
| `--color-text-inverse` | `--color-white` | 어두운 배경의 텍스트 |
| `--color-border-default` | `--color-core-stroke` | 기본 테두리 |
| `--color-border-strong` | `--color-core-black` | 선택·강조 테두리 |
| `--color-action-primary` | `--color-nintendo-red` | 기본 CTA |
| `--color-action-primary-hover` | `--color-gray-800` | CTA hover |
| `--color-action-disabled` | `--color-gray-300` | 비활성 버튼 |
| `--color-focus` | `#2563EB` | 키보드 포커스 링 |
| `--color-error` | `--color-red-600` | 오류·삭제 |
| `--color-success` | `--color-green-700` | 성공 |
| `--color-warning` | `--color-yellow-700` | 접수·대기 |
| `--color-info` | `--color-blue-700` | 정보·확인 중 |

### 접근성 기준

- 일반 텍스트와 배경의 명도 대비는 최소 4.5:1을 목표로 한다.
- 큰 글자는 최소 3:1을 목표로 한다.
- 포커스 표시와 UI 경계는 주변 색상과 최소 3:1을 목표로 한다.
- 상태는 색상만으로 표현하지 않고 텍스트 또는 아이콘을 함께 제공한다.

---

## 4. 타이포그래피 토큰

## 4-1. Font Family

| 토큰 | 값 |
|---|---|
| `--font-family-base` | `"Pretendard Variable", Pretendard, sans-serif` |

## 4-2. Font Weight

| 토큰 | 값 | 용도 |
|---|---:|---|
| `--font-weight-regular` | `400` | 본문 |
| `--font-weight-medium` | `500` | 버튼·메뉴 |
| `--font-weight-semibold` | `600` | 카드 제목 |
| `--font-weight-bold` | `700` | 주요 제목 |

## 4-3. Font Size

| 토큰 | 값 | 사용 예시 |
|---|---:|---|
| `--font-size-100` | `0.75rem` | 12px 캡션 |
| `--font-size-200` | `0.875rem` | 14px 메타 정보 |
| `--font-size-300` | `1rem` | 16px 본문 |
| `--font-size-400` | `1.125rem` | 18px 강조 본문 |
| `--font-size-500` | `1.25rem` | 20px 카드 제목 |
| `--font-size-600` | `1.5rem` | 24px 섹션 소제목 |
| `--font-size-700` | `2rem` | 32px 모바일 페이지 제목 |
| `--font-size-800` | `2.5rem` | 40px 태블릿 제목 |
| `--font-size-900` | `3.5rem` | 56px 데스크톱 제목 |
| `--font-size-1000` | `4.5rem` | 72px 데스크톱 히어로 |

아래의 일반 크기 스케일은 폼·보조 UI의 기존 구현 기본값이다. 디자인 화면에는 4-6의 Figma 텍스트 스타일을 우선한다. Core 본문은 24px, Core_Mobile 본문은 13px이다. 모바일 caption의 원본 10px은 기록하되, 실제 가독성 검토 시 기존 최소 12px 기준으로 보정하고 차이를 기록한다.

## 4-4. Line Height

| 토큰 | 값 | 용도 |
|---|---:|---|
| `--line-height-tight` | `1.1` | 히어로 제목 |
| `--line-height-heading` | `1.25` | 일반 제목 |
| `--line-height-body` | `1.4` | PC·모바일 공통 본문 |
| `--line-height-relaxed` | `--line-height-body` | 긴 설명문도 본문과 동일한 1.4 |

## 4-5. Letter Spacing

| 토큰 | 값 | 용도 |
|---|---:|---|
| `--letter-spacing-tight` | `-0.03em` | 대형 제목 |
| `--letter-spacing-normal` | `0` | 본문 |
| `--letter-spacing-wide` | `0.04em` | 메뉴·버튼 |
| `--letter-spacing-wider` | `0.12em` | 영문 라벨 |

---

## 4-6. Figma 텍스트 스타일 매핑 (원본 기록)

MCP로 확인한 원본 기록이며, 아래 표의 행간과 실제 적용 행간은 구분한다. 본문·강조 본문·긴 설명·캐릭터 설명·스토어 설명·Commerce UI Text에는 1.4를 적용한다. 제목·내비게이션·라벨·캡션·가격의 행간은 원본을 유지한다. 16절 CSS 예시는 이 적용 정책을 반영한다.

토큰 접두사에 `-family`, `-weight`, `-size`, `-line-height`, `-letter-spacing`을 붙여 사용한다. `AUTO` 행간은 CSS `normal`, 퍼센트 자간은 `em`으로 변환한다. 크기는 원본 px이며 고정 루트 16px을 기준으로 rem 변환할 수 있다. 모바일 화면은 `Core_Mobile` 스타일을 우선한다.

| Figma 스타일 | 토큰 접두사 | 폰트 | 굵기 | 크기 | 행간 | 자간 |
|---|---|---|---:|---:|---|---|
| Core Font/Title/H1 EN | `--type-core-font-title-h1-en` | Pexel Grotesk | 400 | 70px | 1.5 | 0em |
| Core Font/Title/H1 KR | `--type-core-font-title-h1-kr` | DeltaGlassKR | 400 | 68px | 0.9 | 0em |
| Core Font/Title/H2 | `--type-core-font-title-h2` | Pretendard | 300 | 55px | normal | 0em |
| Core Font/Body/H3 | `--type-core-font-body-h3` | Pretendard | 300 | 32px | 1.3 | 0em |
| Core Font/Body/Nav S | `--type-core-font-body-nav-s` | Pretendard | 700 | 16px | 1.35 | 0em |
| Core Font/Body/Nav M | `--type-core-font-body-nav-m` | Pexel Grotesk | 400 | 40px | 1.35 | 0em |
| Core Font/Body/Nav L | `--type-core-font-body-nav-l` | Pexel Grotesk | 400 | 56px | 1.35 | 0em |
| Core Font/Body/Label | `--type-core-font-body-label` | Pretendard | 300 | 28px | 1.3 | -0.02em |
| Core Font/Body/Body | `--type-core-font-body-body` | Pretendard | 300 | 24px | 1.5 | 0em |
| Core Font/Body/Body Long | `--type-core-font-body-body-long` | Pretendard | 300 | 24px | 1.65 | 0em |
| Core Font/Body/Body Strong | `--type-core-font-body-body-strong` | Pretendard | 600 | 30px | 1.3 | 0em |
| Core Font/Body/Caption | `--type-core-font-body-caption` | Pretendard | 500 | 15px | 1.3 | 0em |
| Core Font/Body/Caption EN | `--type-core-font-body-caption-en` | Pexel Grotesk | 400 | 15px | 1.3 | 0em |
| Core_Mobile/H1 EN | `--type-core-mobile-h1-en` | Pexel Grotesk | 400 | 40px | 0.9 | -0.01em |
| Core_Mobile/H2 EN | `--type-core-mobile-h2-en` | Pexel Grotesk | 400 | 32px | 1.35 | 0em |
| Core_Mobile/H3 | `--type-core-mobile-h3` | DeltaGlassKR | 400 | 32px | 1.35 | 0em |
| Core_Mobile/H1 KR | `--type-core-mobile-h1-kr` | DeltaGlassKR | 400 | 27px | 0.9 | 0em |
| Core_Mobile/H2 KR | `--type-core-mobile-h2-kr` | Pretendard | 400 | 22px | 1.3 | 0em |
| Core_Mobile/H2 Strong | `--type-core-mobile-h2-strong` | Pretendard | 600 | 22px | 1.3 | 0em |
| Core_Mobile/Body Bold | `--type-core-mobile-body-bold` | Pretendard | 700 | 15px | 1.3 | 0em |
| Core_Mobile/Body | `--type-core-mobile-body` | Pretendard | 400 | 13px | 1.3 | 0em |
| Core_Mobile/caption | `--type-core-mobile-caption` | Pretendard | 500 | 10px | 1.3 | 0em |
| Mario/Heading/Mario Page Display -Accent | `--type-mario-heading-mario-page-display-accent` | Black Han Sans | 400 | 98px | normal | -0.02em |
| Mario/Heading/Mario Page Display | `--type-mario-heading-mario-page-display` | Black Han Sans | 400 | 85px | normal | -0.02em |
| Mario/Heading/Mario page sub Display | `--type-mario-heading-mario-page-sub-display` | Black Han Sans | 400 | 54px | normal | -0.02em |
| Mario/Heading/Ending | `--type-mario-heading-ending` | Galmuri9 | 400 | 65px | 1.5 | 0.02em |
| Mario/Heading/Next Stage | `--type-mario-heading-next-stage` | Lilita One | 400 | 56px | normal | 0.03em |
| Mario/Heading/Player | `--type-mario-heading-player` | Lilita One | 400 | 46px | normal | -0.005em |
| Zelda/Title | `--type-zelda-title` | Triforce | 400 | 120px | 1.15 | 0em |
| Zelda/H1 | `--type-zelda-h1` | Heir of Light | 400 | 120px | normal | 0em |
| Splatoon/Title/Display | `--type-splatoon-title-display` | SplatoonK | 400 | 128px | normal | 0em |
| Splatoon/Title/H1 | `--type-splatoon-title-h1` | SplatoonK | 400 | 100px | normal | 0em |
| Splatoon/Title/H2 | `--type-splatoon-title-h2` | SplatoonK | 400 | 96px | normal | 0em |
| Splatoon/Title/H3 | `--type-splatoon-title-h3` | SplatoonK | 400 | 70px | normal | 0em |
| Splatoon/Title/Stat Header | `--type-splatoon-title-stat-header` | SplatoonK | 400 | 48px | normal | -0.04em |
| Splatoon/Body/Stat Label | `--type-splatoon-body-stat-label` | SplatoonK | 400 | 40px | normal | -0.04em |
| Splatoon/Body/Weapon EN | `--type-splatoon-body-weapon-en` | Pretendard | 600 | 40px | normal | 0em |
| Splatoon/Body/Stat Value | `--type-splatoon-body-stat-value` | SplatoonK | 400 | 36px | normal | -0.04em |
| Splatoon/Body/Body Large | `--type-splatoon-body-body-large` | SplatoonK | 400 | 36px | normal | 0em |
| Splatoon/Body/Nav | `--type-splatoon-body-nav` | SplatoonK | 400 | 32px | normal | 0em |
| Zelda/Accent | `--type-zelda-accent` | Triforce | 400 | 60px | normal | 0em |
| Zelda/H2 | `--type-zelda-h2` | Heir of Light | 400 | 56px | 1 | 0em |
| Zelda/H3 | `--type-zelda-h3` | DNF Forged Blade | 500 | 36px | 1.3 | 0.015em |
| Zelda/Display | `--type-zelda-display` | The Wild Breath of Zelda | 400 | 30px | 1 | 0em |
| Zelda/Label | `--type-zelda-label` | DNF Forged Blade | 500 | 24px | normal | 0em |
| Commerce/UI Text | `--type-commerce-ui-text` | Pretendard | 400 | 24px | 1.5 | 0em |
| Commerce/Tab Label | `--type-commerce-tab-label` | Pretendard | 400 | 24px | 1.3 | 0em |
| Commerce/Price L | `--type-commerce-price-l` | Pretendard | 400 | 22px | 1.3 | 0em |
| Commerce/Menu Label | `--type-commerce-menu-label` | Pretendard | 400 | 16px | 1.3 | -0.02em |
| Commerce/Price S | `--type-commerce-price-s` | Pretendard | 400 | 13px | 1.3 | 0em |
| Mario/Item/Name | `--type-mario-item-name` | Press Start 2P | 400 | 20px | 1.3 | 0em |
| Mario/Item/Keyword | `--type-mario-item-keyword` | Black Han Sans | 400 | 20px | normal | 0em |
| Mario/Nav/Scroll | `--type-mario-nav-scroll` | Press Start 2P | 400 | 18px | normal | 0em |
| Mario/Item/Accent | `--type-mario-item-accent` | Black Han Sans | 400 | 16px | normal | 0em |
| Mario/Section/Label | `--type-mario-section-label` | Pretendard | 500 | 24px | 34px | -0.01em |
| Mario/Display/Character | `--type-mario-display-character` | RO Spritendo | 600 | 175px | normal | 0.08em |
| Mario/Character/Name | `--type-mario-character-name` | Jalnan Gothic | 400 | 24px | normal | 0.05em |
| Mario/Character/English Name | `--type-mario-character-english-name` | Jalnan Gothic | 400 | 18px | normal | 0.04em |
| Mario/Character/Tagline | `--type-mario-character-tagline` | Pretendard | 400 | 18px | normal | 0em |
| Mario/Character/Description | `--type-mario-character-description` | Pretendard | 300 | 14px | 1.4 | 0.03em |
| Mario/Store/Heading | `--type-mario-store-heading` | Jalnan 2 | 400 | 36px | 50px | 0.015em |
| Mario/Store/Description | `--type-mario-store-description` | Jalnan Gothic | 400 | 20px | 37px | -0.015em |
| Mario/Store/Footnote | `--type-mario-store-footnote` | Jalnan Gothic | 400 | 14px | normal | 0.02em |
| Mario/Store/CTA | `--type-mario-store-cta` | Jalnan Gothic | 400 | 13px | normal | -0.01em |
| Mario/RedBox/Label | `--type-mario-redbox-label` | Black Han Sans | 400 | 28px | 1 | -0.02em |
| Mario/World/Subtitle | `--type-mario-world-subtitle` | Galmuri9 | 400 | 51.5px | normal | -0.02em |
| Mario/World/Title Accent | `--type-mario-world-title-accent` | Black Han Sans | 400 | 98px | normal | -0.02em |
| Mario/World/Title | `--type-mario-world-title` | Black Han Sans | 400 | 85px | normal | -0.02em |
| Mario/World/Title Comma | `--type-mario-world-title-comma` | Black Han Sans | 400 | 98px | normal | -0.02em |
| Mario/World Card/Index | `--type-mario-world-card-index` | Press Start 2P | 400 | 10px | normal | 0em |
| Mario/World Card/Title | `--type-mario-world-card-title` | Press Start 2P | 400 | 18px | normal | 0em |
| Mario/World Card/Description | `--type-mario-world-card-description` | 42dot Sans | 500 | 16px | 1.5 | 0em |
| Splatoon/Body/Jalnan H2 | `--type-splatoon-body-jalnan-h2` | Jalnan 2 | 400 | 36px | 50px | 0.015em |
| Splatoon/Body/Jalnan Body | `--type-splatoon-body-jalnan-body` | Jalnan Gothic | 400 | 20px | 37px | -0.015em |
| Splatoon/Body/Caption | `--type-splatoon-body-caption` | Jalnan Gothic | 400 | 14px | normal | 0.02em |

---

## 4-7. 한글·영문 서체와 PC·모바일 크기

아래 값은 MCP의 `Core Font`와 `Core_Mobile` 스타일을 대조한 것이다. PC는 기존 Desktop 기준인 1024px 이상에 적용한다. 0~1023px은 모바일 값을 유지한다. 태블릿 중간 크기는 별도 Figma 근거가 없어 임의로 만들지 않는다.

| 역할 | PC 서체·굵기 | PC 크기 | 모바일 서체·굵기 | 모바일 크기 |
|---|---|---:|---|---:|
| 한글 H1 | DeltaGlassKR Regular 400 | 68px | DeltaGlassKR Regular 400 | 27px |
| 영문 H1 | Pexel Grotesk Regular 400 | 70px | Pexel Grotesk Regular 400 | 40px |
| 한글 H2 | Pretendard Light 300 | 55px | Pretendard Regular 400 | 22px |
| 영문 H2 | 별도 EN 원본 없음: Core H2 사용 | 55px | Pexel Grotesk Regular 400 | 32px |
| H3 | Pretendard Light 300 | 32px | DeltaGlassKR Regular 400 | 32px |
| 한글·영문 일반 본문 | Pretendard Light 300 | 24px | Pretendard Regular 400 | 13px |
| 강조 본문 | Pretendard SemiBold 600 | 30px | Pretendard Bold 700 | 15px |
| 한글 캡션 | Pretendard Medium 500 | 15px | Pretendard Medium 500 | 원본 10px / 적용 최소 12px |
| 영문 캡션 | Pexel Grotesk Regular 400 | 15px | 별도 EN 원본 없음: 모바일 caption 사용 | 원본 10px / 적용 최소 12px |

- 한글·영문 혼용 본문은 Pretendard Variable을 기본으로 사용한다. 영문이라는 이유만으로 모든 본문을 Pexel Grotesk으로 변경하지 않는다.
- 영문 디스플레이 요소에는 해당 EN 스타일을 지정한다. 한글이 섞이면 Pretendard fallback을 사용하고 글리프 누락을 확인한다.
- `fonts.css`에서 폰트 family 이름과 실제 폰트 파일의 weight를 맞춘다. Pretendard Light 300·Regular 400·Medium 500·SemiBold 600·Bold 700을 확인한다.
- IP 전용 서체와 크기는 4-6의 Mario·Zelda·Splatoon 매핑을 따른다. 해당 이름의 모바일 스타일이 별도로 없으면 PC 값을 모바일 확정값으로 간주하지 않고 화면별 모바일 디자인을 확인한다.
- 본문 행간은 모바일 13px × 1.4 = 18.2px, PC 24px × 1.4 = 33.6px이다. 고정 px 행간 대신 `1.4`를 사용한다.
- 본문 적용에는 아래 `--text-body-*` 반응형 토큰을 사용한다. 일반 `--font-size-300`의 16px은 보조 UI 스케일이며 본문 반응형 토큰을 대체하지 않는다.


## 5. 간격 토큰

4px을 기본 단위로 사용한다.

| 토큰 | 값 | 픽셀 |
|---|---:|---:|
| `--space-0` | `0` | 0px |
| `--space-1` | `0.25rem` | 4px |
| `--space-2` | `0.5rem` | 8px |
| `--space-3` | `0.75rem` | 12px |
| `--space-4` | `1rem` | 16px |
| `--space-5` | `1.25rem` | 20px |
| `--space-6` | `1.5rem` | 24px |
| `--space-8` | `2rem` | 32px |
| `--space-10` | `2.5rem` | 40px |
| `--space-12` | `3rem` | 48px |
| `--space-16` | `4rem` | 64px |
| `--space-20` | `5rem` | 80px |
| `--space-24` | `6rem` | 96px |
| `--space-32` | `8rem` | 128px |

### 간격 적용 기준

- 아이콘과 텍스트: 8px
- 입력 label과 input: 8px
- 폼 필드 사이: 20px 또는 24px
- 카드 내부 여백: 모바일 16px, 데스크톱 24px
- 섹션 사이: 모바일 64px, 태블릿 80px, 데스크톱 96px 이상

---

## 6. 레이아웃 토큰

## 6-1. Container

| 토큰 | 값 | 역할 |
|---|---:|---|
| `--container-sm` | `640px` | 폼·인증 화면 |
| `--container-md` | `960px` | 게시판·고객문의 |
| `--container-lg` | `1200px` | 일반 콘텐츠 |
| `--container-xl` | `1440px` | 스토어·메인 화면 |

## 6-2. Page Padding

| 토큰 | 값 |
|---|---:|
| `--page-padding-mobile` | `16px` |
| `--page-padding-tablet` | `24px` |
| `--page-padding-desktop` | `40px` |

## 6-3. Grid Gap

| 토큰 | 값 |
|---|---:|
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

| 구분 | 기준 |
|---|---:|
| Mobile | 기본값, 0px 이상 |
| Tablet | `768px` 이상 |
| Desktop | `1024px` 이상 |
| Wide | `1440px` 이상 |

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

| 토큰 | 값 | 용도 |
|---|---:|---|
| `--size-touch-min` | `44px` | 최소 터치 영역 |
| `--size-button-sm` | `40px` | 작은 버튼 |
| `--size-button-md` | `48px` | 기본 버튼 |
| `--size-button-lg` | `56px` | 주요 CTA |
| `--size-input` | `48px` | 기본 입력 요소 |
| `--size-header-mobile` | `60px` | 모바일 헤더 |
| `--size-header-desktop` | `60px` | 데스크톱 헤더 |
| `--size-icon-sm` | `16px` | 작은 아이콘 |
| `--size-icon-md` | `20px` | 기본 아이콘 |
| `--size-icon-lg` | `24px` | 주요 아이콘 |

---

Figma `Nav Type`(1224:9280)의 모바일·데스크톱 바 높이는 60px이다. 바 너비 342px/664px은 원본 프레임 측정값이며, 반응형 화면 폭에 맞춰 제한한다. 고정 바의 화면 여백은 바 높이에 포함하지 않는다.

## 9. Border 토큰

## 9-1. Border Width

| 토큰 | 값 |
|---|---:|
| `--border-width-thin` | `1px` |
| `--border-width-medium` | `2px` |

## 9-2. Border Radius

Figma 컴포넌트의 radius를 우선한다. 공통 내비게이션과 데스크톱 메뉴 오버레이의 radius는 15px이며, 아래의 나머지 값은 기존 구현 기본값이다.

| 토큰 | 값 | 용도 |
|---|---:|---|
| `--radius-none` | `0` | 상품 카드·기본 영역 |
| `--radius-sm` | `2px` | 작은 상태 요소 |
| `--radius-md` | `4px` | 입력·일반 버튼 |
| `--radius-lg` | `8px` | 모달·보조 카드 |
| `--radius-navigation` | `15px` | Nav·데스크톱 메뉴 오버레이 (Figma) |
| `--radius-full` | `9999px` | 프로필 이미지·배지 |

---

## 10. Shadow 토큰

그림자는 모달, 드롭다운 등 레이어 구분이 필요한 곳에만 사용한다.

| 토큰 | 값 |
|---|---|
| `--shadow-none` | `none` |
| `--shadow-sm` | `0 1px 2px rgb(0 0 0 / 0.08)` |
| `--shadow-md` | `0 8px 24px rgb(0 0 0 / 0.12)` |
| `--shadow-lg` | `0 20px 48px rgb(0 0 0 / 0.18)` |

---

## 11. Z-index 토큰

임의의 큰 숫자를 사용하지 않는다.

| 토큰 | 값 | 대상 |
|---|---:|---|
| `--z-base` | `0` | 일반 콘텐츠 |
| `--z-sticky` | `100` | sticky 요소 |
| `--z-header` | `200` | 헤더 |
| `--z-dropdown` | `300` | 드롭다운 |
| `--z-overlay` | `400` | dimmed 배경 |
| `--z-modal` | `500` | 모달 |
| `--z-toast` | `600` | 토스트 |

---

## 12. Motion 토큰

모션은 `transform`과 `opacity`를 우선 사용한다.

## 12-1. Duration

| 토큰 | 값 | 용도 |
|---|---:|---|
| `--duration-fast` | `120ms` | hover·즉시 피드백 |
| `--duration-normal` | `240ms` | 버튼·카드 전환 |
| `--duration-slow` | `480ms` | 메뉴·모달 |
| `--duration-section` | `800ms` | 섹션 등장 |

## 12-2. Easing

| 토큰 | 값 |
|---|---|
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-emphasized` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` |

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

| 토큰 | 값 | 용도 |
|---|---:|---|
| `--opacity-disabled` | `0.4` | 비활성 요소 |
| `--opacity-muted` | `0.64` | 보조 이미지·텍스트 |
| `--opacity-overlay` | `0.56` | 모달 배경 |
| `--opacity-hover` | `0.8` | 이미지 hover |

---

## 14. 컴포넌트 토큰

## 14-1. Button

| 토큰 | 연결 값 |
|---|---|
| `--button-primary-bg` | `--color-action-primary` |
| `--button-primary-text` | `--color-text-inverse` |
| `--button-primary-hover` | `--color-action-primary-hover` |
| `--button-secondary-bg` | `--color-white` |
| `--button-secondary-text` | `--color-text-primary` |
| `--button-secondary-border` | `--color-border-strong` |
| `--button-disabled-bg` | `--color-action-disabled` |
| `--button-height` | `--size-button-md` |
| `--button-radius` | `--radius-md` |

## 14-2. Input

| 토큰 | 연결 값 |
|---|---|
| `--input-bg` | `--color-white` |
| `--input-text` | `--color-text-primary` |
| `--input-placeholder` | `--color-text-muted` |
| `--input-border` | `--color-border-default` |
| `--input-border-focus` | `--color-border-strong` |
| `--input-border-error` | `--color-error` |
| `--input-height` | `--size-input` |
| `--input-radius` | `--radius-md` |

## 14-3. Card

| 토큰 | 연결 값 |
|---|---|
| `--card-bg` | `--color-surface` |
| `--card-border` | `--color-border-default` |
| `--card-radius` | `--radius-none` |
| `--card-padding` | `--space-4` |

## 14-4. Modal

| 토큰 | 연결 값 |
|---|---|
| `--modal-bg` | `--color-surface` |
| `--modal-radius` | `--radius-lg` |
| `--modal-shadow` | `--shadow-lg` |
| `--modal-z-index` | `--z-modal` |

---

## 15. 고객문의 상태 토큰

| 상태 | 배경 | 텍스트 |
|---|---|---|
| 접수 완료 `PENDING` | `--color-yellow-50` | `--color-warning` |
| 확인 중 `IN_REVIEW` | `--color-blue-50` | `--color-info` |
| 답변 완료 `ANSWERED` | `--color-green-50` | `--color-success` |

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

## 16. variables.css 전체 예시

```css
:root {
  /* Primitive Colors */
  --color-white: #ffffff;
  --color-black: #000000;
  --color-gray-50: #fafafa;
  --color-gray-100: #f5f5f5;
  --color-gray-200: #e5e5e5;
  --color-gray-300: #d4d4d4;
  --color-gray-400: #a3a3a3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;
  --color-gray-950: #0a0a0a;

  --color-red-50: #fef2f2;
  --color-red-600: #dc2626;
  --color-green-50: #f0fdf4;
  --color-green-700: #15803d;
  --color-yellow-50: #fefce8;
  --color-yellow-700: #a16207;
  --color-blue-50: #eff6ff;
  --color-blue-700: #1d4ed8;

  /* Figma Colors */
  --color-core-white2: #ededed;
  --color-core-stroke: #d2d2cd;
  --color-core-gray2: #dadada;
  --color-core-gray: #8c8c8c;
  --color-core-black: #151515;
  --color-nintendo-red: #e60012;
  --color-mario-mario-black-2: #363636;
  --color-mario-main-red: #ff0000;
  --color-mario-main-green: #08a937;
  --color-mario-main-pink: #f196bf;
  --color-mario-main-lime: #70b921;
  --color-mario-main-blue: #18419a;
  --color-mario-main-yellow: #f8bf10;
  --color-mario-main-section-label: #e70012;
  --color-mario-sub-preview-info-description: #333333;
  --color-mario-sub-preview-character-title-default: #e60012;
  --color-mario-sub-preview-character-title-fire: #f45a3c;
  --color-mario-sub-preview-character-title-cat: #ffd50b;
  --color-mario-sub-preview-character-title-elephant: #f06f72;
  --color-mario-sub-preview-character-title-bubble: #d964fe;
  --color-mario-sub-preview-character-title-drill: #84381f;
  --color-mario-sub-red: #fff0ee;
  --color-mario-sub-green: #e6ffdd;
  --color-mario-sub-pink: #faddea;
  --color-mario-sub-lime: #f2f8df;
  --color-mario-sub-blue: #dde9fa;
  --color-mario-sub-yellow: #ffe5c4;
  --color-splatoon-yellow: #ffff5f;
  --color-splatoon-blue: #603bff;
  --color-splatoon-black: #24343d;
  --color-zelda-gold: #c7952f;
  --color-zelda-green: #4cc3a8;

  /* Semantic Colors */
  --color-bg-primary: var(--color-white);
  --color-bg-secondary: var(--color-core-white2);
  --color-bg-inverse: var(--color-core-black);
  --color-surface: var(--color-white);
  --color-surface-muted: var(--color-core-gray2);
  --color-text-primary: var(--color-core-black);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-500);
  --color-text-inverse: var(--color-white);
  --color-border-default: var(--color-core-stroke);
  --color-border-strong: var(--color-core-black);
  --color-action-primary: var(--color-nintendo-red);
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
  --line-height-tight: 1.1;
  --line-height-heading: 1.25;
  --line-height-body: 1.4;
  --line-height-relaxed: var(--line-height-body);
  --letter-spacing-tight: -0.03em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.04em;
  --letter-spacing-wider: 0.12em;

  /* Figma Text Styles */
  /* Core Font/Title/H1 EN */
  --type-core-font-title-h1-en-family: "Pexel Grotesk", var(--font-family-base);
  --type-core-font-title-h1-en-weight: 400;
  --type-core-font-title-h1-en-size: 70px;
  --type-core-font-title-h1-en-line-height: 1.5;
  --type-core-font-title-h1-en-letter-spacing: 0em;
  /* Core Font/Title/H1 KR */
  --type-core-font-title-h1-kr-family: "DeltaGlassKR", var(--font-family-base);
  --type-core-font-title-h1-kr-weight: 400;
  --type-core-font-title-h1-kr-size: 68px;
  --type-core-font-title-h1-kr-line-height: 0.9;
  --type-core-font-title-h1-kr-letter-spacing: 0em;
  /* Core Font/Title/H2 */
  --type-core-font-title-h2-family: "Pretendard", var(--font-family-base);
  --type-core-font-title-h2-weight: 300;
  --type-core-font-title-h2-size: 55px;
  --type-core-font-title-h2-line-height: normal;
  --type-core-font-title-h2-letter-spacing: 0em;
  /* Core Font/Body/H3 */
  --type-core-font-body-h3-family: "Pretendard", var(--font-family-base);
  --type-core-font-body-h3-weight: 300;
  --type-core-font-body-h3-size: 32px;
  --type-core-font-body-h3-line-height: 1.3;
  --type-core-font-body-h3-letter-spacing: 0em;
  /* Core Font/Body/Nav S */
  --type-core-font-body-nav-s-family: "Pretendard", var(--font-family-base);
  --type-core-font-body-nav-s-weight: 700;
  --type-core-font-body-nav-s-size: 16px;
  --type-core-font-body-nav-s-line-height: 1.35;
  --type-core-font-body-nav-s-letter-spacing: 0em;
  /* Core Font/Body/Nav M */
  --type-core-font-body-nav-m-family: "Pexel Grotesk", var(--font-family-base);
  --type-core-font-body-nav-m-weight: 400;
  --type-core-font-body-nav-m-size: 40px;
  --type-core-font-body-nav-m-line-height: 1.35;
  --type-core-font-body-nav-m-letter-spacing: 0em;
  /* Core Font/Body/Nav L */
  --type-core-font-body-nav-l-family: "Pexel Grotesk", var(--font-family-base);
  --type-core-font-body-nav-l-weight: 400;
  --type-core-font-body-nav-l-size: 56px;
  --type-core-font-body-nav-l-line-height: 1.35;
  --type-core-font-body-nav-l-letter-spacing: 0em;
  /* Core Font/Body/Label */
  --type-core-font-body-label-family: "Pretendard", var(--font-family-base);
  --type-core-font-body-label-weight: 300;
  --type-core-font-body-label-size: 28px;
  --type-core-font-body-label-line-height: 1.3;
  --type-core-font-body-label-letter-spacing: -0.02em;
  /* Core Font/Body/Body */
  --type-core-font-body-body-family: "Pretendard", var(--font-family-base);
  --type-core-font-body-body-weight: 300;
  --type-core-font-body-body-size: 24px;
  --type-core-font-body-body-line-height: var(--line-height-body);
  --type-core-font-body-body-letter-spacing: 0em;
  /* Core Font/Body/Body Long */
  --type-core-font-body-body-long-family: "Pretendard", var(--font-family-base);
  --type-core-font-body-body-long-weight: 300;
  --type-core-font-body-body-long-size: 24px;
  --type-core-font-body-body-long-line-height: var(--line-height-body);
  --type-core-font-body-body-long-letter-spacing: 0em;
  /* Core Font/Body/Body Strong */
  --type-core-font-body-body-strong-family: "Pretendard", var(--font-family-base);
  --type-core-font-body-body-strong-weight: 600;
  --type-core-font-body-body-strong-size: 30px;
  --type-core-font-body-body-strong-line-height: var(--line-height-body);
  --type-core-font-body-body-strong-letter-spacing: 0em;
  /* Core Font/Body/Caption */
  --type-core-font-body-caption-family: "Pretendard", var(--font-family-base);
  --type-core-font-body-caption-weight: 500;
  --type-core-font-body-caption-size: 15px;
  --type-core-font-body-caption-line-height: 1.3;
  --type-core-font-body-caption-letter-spacing: 0em;
  /* Core Font/Body/Caption EN */
  --type-core-font-body-caption-en-family: "Pexel Grotesk", var(--font-family-base);
  --type-core-font-body-caption-en-weight: 400;
  --type-core-font-body-caption-en-size: 15px;
  --type-core-font-body-caption-en-line-height: 1.3;
  --type-core-font-body-caption-en-letter-spacing: 0em;
  /* Core_Mobile/H1 EN */
  --type-core-mobile-h1-en-family: "Pexel Grotesk", var(--font-family-base);
  --type-core-mobile-h1-en-weight: 400;
  --type-core-mobile-h1-en-size: 40px;
  --type-core-mobile-h1-en-line-height: 0.9;
  --type-core-mobile-h1-en-letter-spacing: -0.01em;
  /* Core_Mobile/H2 EN */
  --type-core-mobile-h2-en-family: "Pexel Grotesk", var(--font-family-base);
  --type-core-mobile-h2-en-weight: 400;
  --type-core-mobile-h2-en-size: 32px;
  --type-core-mobile-h2-en-line-height: 1.35;
  --type-core-mobile-h2-en-letter-spacing: 0em;
  /* Core_Mobile/H3 */
  --type-core-mobile-h3-family: "DeltaGlassKR", var(--font-family-base);
  --type-core-mobile-h3-weight: 400;
  --type-core-mobile-h3-size: 32px;
  --type-core-mobile-h3-line-height: 1.35;
  --type-core-mobile-h3-letter-spacing: 0em;
  /* Core_Mobile/H1 KR */
  --type-core-mobile-h1-kr-family: "DeltaGlassKR", var(--font-family-base);
  --type-core-mobile-h1-kr-weight: 400;
  --type-core-mobile-h1-kr-size: 27px;
  --type-core-mobile-h1-kr-line-height: 0.9;
  --type-core-mobile-h1-kr-letter-spacing: 0em;
  /* Core_Mobile/H2 KR */
  --type-core-mobile-h2-kr-family: "Pretendard", var(--font-family-base);
  --type-core-mobile-h2-kr-weight: 400;
  --type-core-mobile-h2-kr-size: 22px;
  --type-core-mobile-h2-kr-line-height: 1.3;
  --type-core-mobile-h2-kr-letter-spacing: 0em;
  /* Core_Mobile/H2 Strong */
  --type-core-mobile-h2-strong-family: "Pretendard", var(--font-family-base);
  --type-core-mobile-h2-strong-weight: 600;
  --type-core-mobile-h2-strong-size: 22px;
  --type-core-mobile-h2-strong-line-height: 1.3;
  --type-core-mobile-h2-strong-letter-spacing: 0em;
  /* Core_Mobile/Body Bold */
  --type-core-mobile-body-bold-family: "Pretendard", var(--font-family-base);
  --type-core-mobile-body-bold-weight: 700;
  --type-core-mobile-body-bold-size: 15px;
  --type-core-mobile-body-bold-line-height: var(--line-height-body);
  --type-core-mobile-body-bold-letter-spacing: 0em;
  /* Core_Mobile/Body */
  --type-core-mobile-body-family: "Pretendard", var(--font-family-base);
  --type-core-mobile-body-weight: 400;
  --type-core-mobile-body-size: 13px;
  --type-core-mobile-body-line-height: var(--line-height-body);
  --type-core-mobile-body-letter-spacing: 0em;
  /* Core_Mobile/caption */
  --type-core-mobile-caption-family: "Pretendard", var(--font-family-base);
  --type-core-mobile-caption-weight: 500;
  --type-core-mobile-caption-size: 10px;
  --type-core-mobile-caption-line-height: 1.3;
  --type-core-mobile-caption-letter-spacing: 0em;
  /* Mario/Heading/Mario Page Display -Accent */
  --type-mario-heading-mario-page-display-accent-family: "Black Han Sans", var(--font-family-base);
  --type-mario-heading-mario-page-display-accent-weight: 400;
  --type-mario-heading-mario-page-display-accent-size: 98px;
  --type-mario-heading-mario-page-display-accent-line-height: normal;
  --type-mario-heading-mario-page-display-accent-letter-spacing: -0.02em;
  /* Mario/Heading/Mario Page Display */
  --type-mario-heading-mario-page-display-family: "Black Han Sans", var(--font-family-base);
  --type-mario-heading-mario-page-display-weight: 400;
  --type-mario-heading-mario-page-display-size: 85px;
  --type-mario-heading-mario-page-display-line-height: normal;
  --type-mario-heading-mario-page-display-letter-spacing: -0.02em;
  /* Mario/Heading/Mario page sub Display */
  --type-mario-heading-mario-page-sub-display-family: "Black Han Sans", var(--font-family-base);
  --type-mario-heading-mario-page-sub-display-weight: 400;
  --type-mario-heading-mario-page-sub-display-size: 54px;
  --type-mario-heading-mario-page-sub-display-line-height: normal;
  --type-mario-heading-mario-page-sub-display-letter-spacing: -0.02em;
  /* Mario/Heading/Ending */
  --type-mario-heading-ending-family: "Galmuri9", var(--font-family-base);
  --type-mario-heading-ending-weight: 400;
  --type-mario-heading-ending-size: 65px;
  --type-mario-heading-ending-line-height: 1.5;
  --type-mario-heading-ending-letter-spacing: 0.02em;
  /* Mario/Heading/Next Stage */
  --type-mario-heading-next-stage-family: "Lilita One", var(--font-family-base);
  --type-mario-heading-next-stage-weight: 400;
  --type-mario-heading-next-stage-size: 56px;
  --type-mario-heading-next-stage-line-height: normal;
  --type-mario-heading-next-stage-letter-spacing: 0.03em;
  /* Mario/Heading/Player */
  --type-mario-heading-player-family: "Lilita One", var(--font-family-base);
  --type-mario-heading-player-weight: 400;
  --type-mario-heading-player-size: 46px;
  --type-mario-heading-player-line-height: normal;
  --type-mario-heading-player-letter-spacing: -0.005em;
  /* Zelda/Title */
  --type-zelda-title-family: "Triforce", var(--font-family-base);
  --type-zelda-title-weight: 400;
  --type-zelda-title-size: 120px;
  --type-zelda-title-line-height: 1.15;
  --type-zelda-title-letter-spacing: 0em;
  /* Zelda/H1 */
  --type-zelda-h1-family: "Heir of Light", var(--font-family-base);
  --type-zelda-h1-weight: 400;
  --type-zelda-h1-size: 120px;
  --type-zelda-h1-line-height: normal;
  --type-zelda-h1-letter-spacing: 0em;
  /* Splatoon/Title/Display */
  --type-splatoon-title-display-family: "SplatoonK", var(--font-family-base);
  --type-splatoon-title-display-weight: 400;
  --type-splatoon-title-display-size: 128px;
  --type-splatoon-title-display-line-height: normal;
  --type-splatoon-title-display-letter-spacing: 0em;
  /* Splatoon/Title/H1 */
  --type-splatoon-title-h1-family: "SplatoonK", var(--font-family-base);
  --type-splatoon-title-h1-weight: 400;
  --type-splatoon-title-h1-size: 100px;
  --type-splatoon-title-h1-line-height: normal;
  --type-splatoon-title-h1-letter-spacing: 0em;
  /* Splatoon/Title/H2 */
  --type-splatoon-title-h2-family: "SplatoonK", var(--font-family-base);
  --type-splatoon-title-h2-weight: 400;
  --type-splatoon-title-h2-size: 96px;
  --type-splatoon-title-h2-line-height: normal;
  --type-splatoon-title-h2-letter-spacing: 0em;
  /* Splatoon/Title/H3 */
  --type-splatoon-title-h3-family: "SplatoonK", var(--font-family-base);
  --type-splatoon-title-h3-weight: 400;
  --type-splatoon-title-h3-size: 70px;
  --type-splatoon-title-h3-line-height: normal;
  --type-splatoon-title-h3-letter-spacing: 0em;
  /* Splatoon/Title/Stat Header */
  --type-splatoon-title-stat-header-family: "SplatoonK", var(--font-family-base);
  --type-splatoon-title-stat-header-weight: 400;
  --type-splatoon-title-stat-header-size: 48px;
  --type-splatoon-title-stat-header-line-height: normal;
  --type-splatoon-title-stat-header-letter-spacing: -0.04em;
  /* Splatoon/Body/Stat Label */
  --type-splatoon-body-stat-label-family: "SplatoonK", var(--font-family-base);
  --type-splatoon-body-stat-label-weight: 400;
  --type-splatoon-body-stat-label-size: 40px;
  --type-splatoon-body-stat-label-line-height: normal;
  --type-splatoon-body-stat-label-letter-spacing: -0.04em;
  /* Splatoon/Body/Weapon EN */
  --type-splatoon-body-weapon-en-family: "Pretendard", var(--font-family-base);
  --type-splatoon-body-weapon-en-weight: 600;
  --type-splatoon-body-weapon-en-size: 40px;
  --type-splatoon-body-weapon-en-line-height: normal;
  --type-splatoon-body-weapon-en-letter-spacing: 0em;
  /* Splatoon/Body/Stat Value */
  --type-splatoon-body-stat-value-family: "SplatoonK", var(--font-family-base);
  --type-splatoon-body-stat-value-weight: 400;
  --type-splatoon-body-stat-value-size: 36px;
  --type-splatoon-body-stat-value-line-height: normal;
  --type-splatoon-body-stat-value-letter-spacing: -0.04em;
  /* Splatoon/Body/Body Large */
  --type-splatoon-body-body-large-family: "SplatoonK", var(--font-family-base);
  --type-splatoon-body-body-large-weight: 400;
  --type-splatoon-body-body-large-size: 36px;
  --type-splatoon-body-body-large-line-height: var(--line-height-body);
  --type-splatoon-body-body-large-letter-spacing: 0em;
  /* Splatoon/Body/Nav */
  --type-splatoon-body-nav-family: "SplatoonK", var(--font-family-base);
  --type-splatoon-body-nav-weight: 400;
  --type-splatoon-body-nav-size: 32px;
  --type-splatoon-body-nav-line-height: normal;
  --type-splatoon-body-nav-letter-spacing: 0em;
  /* Zelda/Accent */
  --type-zelda-accent-family: "Triforce", var(--font-family-base);
  --type-zelda-accent-weight: 400;
  --type-zelda-accent-size: 60px;
  --type-zelda-accent-line-height: normal;
  --type-zelda-accent-letter-spacing: 0em;
  /* Zelda/H2 */
  --type-zelda-h2-family: "Heir of Light", var(--font-family-base);
  --type-zelda-h2-weight: 400;
  --type-zelda-h2-size: 56px;
  --type-zelda-h2-line-height: 1;
  --type-zelda-h2-letter-spacing: 0em;
  /* Zelda/H3 */
  --type-zelda-h3-family: "DNF Forged Blade", var(--font-family-base);
  --type-zelda-h3-weight: 500;
  --type-zelda-h3-size: 36px;
  --type-zelda-h3-line-height: 1.3;
  --type-zelda-h3-letter-spacing: 0.015em;
  /* Zelda/Display */
  --type-zelda-display-family: "The Wild Breath of Zelda", var(--font-family-base);
  --type-zelda-display-weight: 400;
  --type-zelda-display-size: 30px;
  --type-zelda-display-line-height: 1;
  --type-zelda-display-letter-spacing: 0em;
  /* Zelda/Label */
  --type-zelda-label-family: "DNF Forged Blade", var(--font-family-base);
  --type-zelda-label-weight: 500;
  --type-zelda-label-size: 24px;
  --type-zelda-label-line-height: normal;
  --type-zelda-label-letter-spacing: 0em;
  /* Commerce/UI Text */
  --type-commerce-ui-text-family: "Pretendard", var(--font-family-base);
  --type-commerce-ui-text-weight: 400;
  --type-commerce-ui-text-size: 24px;
  --type-commerce-ui-text-line-height: var(--line-height-body);
  --type-commerce-ui-text-letter-spacing: 0em;
  /* Commerce/Tab Label */
  --type-commerce-tab-label-family: "Pretendard", var(--font-family-base);
  --type-commerce-tab-label-weight: 400;
  --type-commerce-tab-label-size: 24px;
  --type-commerce-tab-label-line-height: 1.3;
  --type-commerce-tab-label-letter-spacing: 0em;
  /* Commerce/Price L */
  --type-commerce-price-l-family: "Pretendard", var(--font-family-base);
  --type-commerce-price-l-weight: 400;
  --type-commerce-price-l-size: 22px;
  --type-commerce-price-l-line-height: 1.3;
  --type-commerce-price-l-letter-spacing: 0em;
  /* Commerce/Menu Label */
  --type-commerce-menu-label-family: "Pretendard", var(--font-family-base);
  --type-commerce-menu-label-weight: 400;
  --type-commerce-menu-label-size: 16px;
  --type-commerce-menu-label-line-height: 1.3;
  --type-commerce-menu-label-letter-spacing: -0.02em;
  /* Commerce/Price S */
  --type-commerce-price-s-family: "Pretendard", var(--font-family-base);
  --type-commerce-price-s-weight: 400;
  --type-commerce-price-s-size: 13px;
  --type-commerce-price-s-line-height: 1.3;
  --type-commerce-price-s-letter-spacing: 0em;
  /* Mario/Item/Name */
  --type-mario-item-name-family: "Press Start 2P", var(--font-family-base);
  --type-mario-item-name-weight: 400;
  --type-mario-item-name-size: 20px;
  --type-mario-item-name-line-height: 1.3;
  --type-mario-item-name-letter-spacing: 0em;
  /* Mario/Item/Keyword */
  --type-mario-item-keyword-family: "Black Han Sans", var(--font-family-base);
  --type-mario-item-keyword-weight: 400;
  --type-mario-item-keyword-size: 20px;
  --type-mario-item-keyword-line-height: normal;
  --type-mario-item-keyword-letter-spacing: 0em;
  /* Mario/Nav/Scroll */
  --type-mario-nav-scroll-family: "Press Start 2P", var(--font-family-base);
  --type-mario-nav-scroll-weight: 400;
  --type-mario-nav-scroll-size: 18px;
  --type-mario-nav-scroll-line-height: normal;
  --type-mario-nav-scroll-letter-spacing: 0em;
  /* Mario/Item/Accent */
  --type-mario-item-accent-family: "Black Han Sans", var(--font-family-base);
  --type-mario-item-accent-weight: 400;
  --type-mario-item-accent-size: 16px;
  --type-mario-item-accent-line-height: normal;
  --type-mario-item-accent-letter-spacing: 0em;
  /* Mario/Section/Label */
  --type-mario-section-label-family: "Pretendard", var(--font-family-base);
  --type-mario-section-label-weight: 500;
  --type-mario-section-label-size: 24px;
  --type-mario-section-label-line-height: 34px;
  --type-mario-section-label-letter-spacing: -0.01em;
  /* Mario/Display/Character */
  --type-mario-display-character-family: "RO Spritendo", var(--font-family-base);
  --type-mario-display-character-weight: 600;
  --type-mario-display-character-size: 175px;
  --type-mario-display-character-line-height: normal;
  --type-mario-display-character-letter-spacing: 0.08em;
  /* Mario/Character/Name */
  --type-mario-character-name-family: "Jalnan Gothic", var(--font-family-base);
  --type-mario-character-name-weight: 400;
  --type-mario-character-name-size: 24px;
  --type-mario-character-name-line-height: normal;
  --type-mario-character-name-letter-spacing: 0.05em;
  /* Mario/Character/English Name */
  --type-mario-character-english-name-family: "Jalnan Gothic", var(--font-family-base);
  --type-mario-character-english-name-weight: 400;
  --type-mario-character-english-name-size: 18px;
  --type-mario-character-english-name-line-height: normal;
  --type-mario-character-english-name-letter-spacing: 0.04em;
  /* Mario/Character/Tagline */
  --type-mario-character-tagline-family: "Pretendard", var(--font-family-base);
  --type-mario-character-tagline-weight: 400;
  --type-mario-character-tagline-size: 18px;
  --type-mario-character-tagline-line-height: var(--line-height-body);
  --type-mario-character-tagline-letter-spacing: 0em;
  /* Mario/Character/Description */
  --type-mario-character-description-family: "Pretendard", var(--font-family-base);
  --type-mario-character-description-weight: 300;
  --type-mario-character-description-size: 14px;
  --type-mario-character-description-line-height: var(--line-height-body);
  --type-mario-character-description-letter-spacing: 0.03em;
  /* Mario/Store/Heading */
  --type-mario-store-heading-family: "Jalnan 2", var(--font-family-base);
  --type-mario-store-heading-weight: 400;
  --type-mario-store-heading-size: 36px;
  --type-mario-store-heading-line-height: 50px;
  --type-mario-store-heading-letter-spacing: 0.015em;
  /* Mario/Store/Description */
  --type-mario-store-description-family: "Jalnan Gothic", var(--font-family-base);
  --type-mario-store-description-weight: 400;
  --type-mario-store-description-size: 20px;
  --type-mario-store-description-line-height: var(--line-height-body);
  --type-mario-store-description-letter-spacing: -0.015em;
  /* Mario/Store/Footnote */
  --type-mario-store-footnote-family: "Jalnan Gothic", var(--font-family-base);
  --type-mario-store-footnote-weight: 400;
  --type-mario-store-footnote-size: 14px;
  --type-mario-store-footnote-line-height: normal;
  --type-mario-store-footnote-letter-spacing: 0.02em;
  /* Mario/Store/CTA */
  --type-mario-store-cta-family: "Jalnan Gothic", var(--font-family-base);
  --type-mario-store-cta-weight: 400;
  --type-mario-store-cta-size: 13px;
  --type-mario-store-cta-line-height: normal;
  --type-mario-store-cta-letter-spacing: -0.01em;
  /* Mario/RedBox/Label */
  --type-mario-redbox-label-family: "Black Han Sans", var(--font-family-base);
  --type-mario-redbox-label-weight: 400;
  --type-mario-redbox-label-size: 28px;
  --type-mario-redbox-label-line-height: 1;
  --type-mario-redbox-label-letter-spacing: -0.02em;
  /* Mario/World/Subtitle */
  --type-mario-world-subtitle-family: "Galmuri9", var(--font-family-base);
  --type-mario-world-subtitle-weight: 400;
  --type-mario-world-subtitle-size: 51.5px;
  --type-mario-world-subtitle-line-height: normal;
  --type-mario-world-subtitle-letter-spacing: -0.02em;
  /* Mario/World/Title Accent */
  --type-mario-world-title-accent-family: "Black Han Sans", var(--font-family-base);
  --type-mario-world-title-accent-weight: 400;
  --type-mario-world-title-accent-size: 98px;
  --type-mario-world-title-accent-line-height: normal;
  --type-mario-world-title-accent-letter-spacing: -0.02em;
  /* Mario/World/Title */
  --type-mario-world-title-family: "Black Han Sans", var(--font-family-base);
  --type-mario-world-title-weight: 400;
  --type-mario-world-title-size: 85px;
  --type-mario-world-title-line-height: normal;
  --type-mario-world-title-letter-spacing: -0.02em;
  /* Mario/World/Title Comma */
  --type-mario-world-title-comma-family: "Black Han Sans", var(--font-family-base);
  --type-mario-world-title-comma-weight: 400;
  --type-mario-world-title-comma-size: 98px;
  --type-mario-world-title-comma-line-height: normal;
  --type-mario-world-title-comma-letter-spacing: -0.02em;
  /* Mario/World Card/Index */
  --type-mario-world-card-index-family: "Press Start 2P", var(--font-family-base);
  --type-mario-world-card-index-weight: 400;
  --type-mario-world-card-index-size: 10px;
  --type-mario-world-card-index-line-height: normal;
  --type-mario-world-card-index-letter-spacing: 0em;
  /* Mario/World Card/Title */
  --type-mario-world-card-title-family: "Press Start 2P", var(--font-family-base);
  --type-mario-world-card-title-weight: 400;
  --type-mario-world-card-title-size: 18px;
  --type-mario-world-card-title-line-height: normal;
  --type-mario-world-card-title-letter-spacing: 0em;
  /* Mario/World Card/Description */
  --type-mario-world-card-description-family: "42dot Sans", var(--font-family-base);
  --type-mario-world-card-description-weight: 500;
  --type-mario-world-card-description-size: 16px;
  --type-mario-world-card-description-line-height: var(--line-height-body);
  --type-mario-world-card-description-letter-spacing: 0em;
  /* Splatoon/Body/Jalnan H2 */
  --type-splatoon-body-jalnan-h2-family: "Jalnan 2", var(--font-family-base);
  --type-splatoon-body-jalnan-h2-weight: 400;
  --type-splatoon-body-jalnan-h2-size: 36px;
  --type-splatoon-body-jalnan-h2-line-height: 50px;
  --type-splatoon-body-jalnan-h2-letter-spacing: 0.015em;
  /* Splatoon/Body/Jalnan Body */
  --type-splatoon-body-jalnan-body-family: "Jalnan Gothic", var(--font-family-base);
  --type-splatoon-body-jalnan-body-weight: 400;
  --type-splatoon-body-jalnan-body-size: 20px;
  --type-splatoon-body-jalnan-body-line-height: var(--line-height-body);
  --type-splatoon-body-jalnan-body-letter-spacing: -0.015em;
  /* Splatoon/Body/Caption */
  --type-splatoon-body-caption-family: "Jalnan Gothic", var(--font-family-base);
  --type-splatoon-body-caption-weight: 400;
  --type-splatoon-body-caption-size: 14px;
  --type-splatoon-body-caption-line-height: normal;
  --type-splatoon-body-caption-letter-spacing: 0.02em;

  /* Responsive body: mobile first */
  --text-body-family: var(--font-family-base);
  --text-body-size: var(--type-core-mobile-body-size);
  --text-body-weight: var(--type-core-mobile-body-weight);
  --text-body-line-height: var(--line-height-body);

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
  --size-header-mobile: 60px;
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
  --radius-navigation: 15px;
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
    --text-body-size: var(--type-core-font-body-body-size);
    --text-body-weight: var(--type-core-font-body-body-weight);
    --page-padding: var(--page-padding-desktop);
    --section-space: var(--space-24);
  }
}
```

---

## 17. React 적용 방법

`main.jsx`에서 공통 CSS를 한 번만 불러온다.

```jsx
import "./styles/reset.css";
import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/global.css";
```

Meyer reset 다음에 로드되는 `global.css`에 본문 기본값을 설정한다.

```css
body {
  font-family: var(--text-body-family);
  font-size: var(--text-body-size);
  font-weight: var(--text-body-weight);
  line-height: var(--text-body-line-height);
}

button,
input,
select,
textarea {
  font: inherit;
}
```

제목·내비게이션·버튼 등에는 해당 역할의 스타일을 별도로 지정한다. 컴포넌트가 본문 행간을 직접 선언하는 경우에도 `var(--line-height-body)`를 사용한다.

컴포넌트 CSS에서는 변수를 사용한다.

```css
.product-card {
  color: var(--color-text-primary);
  background-color: var(--card-bg);
}

.product-card__name {
  margin-top: var(--space-3);
  font-size: var(--font-size-300);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-heading);
}

.product-card__like-button {
  width: var(--size-touch-min);
  height: var(--size-touch-min);
  color: var(--color-text-primary);
}

.product-card__like-button:focus-visible {
  outline: var(--border-width-medium) solid var(--color-focus);
  outline-offset: 2px;
}
```

---

## 18. 토큰 사용 금지 기준

- 컴포넌트 CSS에 임의의 HEX 색상을 반복해서 작성하지 않는다.
- Figma 스타일 또는 이 문서에 정의되지 않은 글자 크기를 임의로 사용하지 않는다.
- `z-index: 9999`를 사용하지 않는다.
- 비슷한 간격 값을 페이지마다 새로 만들지 않는다.
- 색상만으로 성공, 실패, 선택 상태를 표시하지 않는다.
- 그림자와 radius는 해당 Figma 컴포넌트의 스타일을 우선하며 임의로 과장하지 않는다.
- 전역 토큰을 특정 컴포넌트 하나만을 위해 무분별하게 추가하지 않는다.

새로운 토큰이 필요한 경우 팀원과 용도, 이름, 중복 여부를 확인한 후 `variables.css`와 이 문서를 함께 수정한다.

---

## 19. 디자인 토큰 완료 체크리스트

- [ ] Meyer Reset CSS v2.0을 사용하고 reset → fonts → variables → global 순서로 로드했다.
- [ ] reset의 body 행간 1이 전역 본문 행간 1.4로 덮어써진다.
- [ ] 한글·영문 본문과 설명문에 단위 없는 행간 1.4가 적용된다.
- [ ] 한글 H1과 영문 H1의 서체가 각각 DeltaGlassKR·Pexel Grotesk으로 연결되었다.
- [ ] Pretendard Variable이 연결되었고 굵기 300~700을 확인했다.
- [ ] 1024px 미만 본문 13px·400, 1024px 이상 본문 24px·300이 적용된다.
- [ ] 한글·영문·숫자·문장부호 혼용 시 글리프 누락과 fallback을 확인했다.
- [ ] 모바일 캡션 원본 10px과 적용 최소 12px의 차이를 기록했다.
- [ ] `variables.css`에 공통 토큰이 선언되었다.
- [ ] 공통 컬러와 Mario·Zelda·Splatoon 테마 컬러가 Figma 스타일과 일치한다.
- [ ] 상태 컬러는 고객문의·알림 등 필요한 곳에만 사용한다.
- [ ] 본문과 제목에 해당 Core·Core_Mobile·Commerce·IP 텍스트 스타일을 적용했다.
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
