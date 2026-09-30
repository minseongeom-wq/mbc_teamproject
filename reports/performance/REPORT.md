# Performance profiling — 2026-09-30

애플리케이션 소스·디자인·인터랙션은 수정하지 않았다. 기존 작업 변경사항도 유지했다. 이 디렉터리에 측정 도구와 결과만 추가했다.

가장 우선할 항목은 **비활성 GLB까지 매번 draw하는 비용**, **초기 일괄 로딩과 화면 밖 render**, **고정된 WebGL 출력 해상도**다. 상시 RAF 중복이나 스크롤에 따른 React 재렌더 누적은 발견하지 못했다.

## 측정 범위와 한계

- 전체 `src`에서 animation/scroll 호출 경로를 검색하고, History 화면의 초기 로딩·orbit 초반/중반/후반·08→09 전환·cursor·화면 밖 정지를 측정했다. Home↔History 왕복으로 해제/재생성을 점검했다.
- Windows, headless Microsoft Edge, NVIDIA GeForce RTX 4070 SUPER / ANGLE D3D11, viewport 1920×1080. GPU 소프트웨어 에뮬레이션이 아닌 실제 NVIDIA renderer를 확인했다.
- production preview에서 실행 횟수·WebGL renderer.info·React commit·RAF를 계측했다. 별도의 production 페이지에서는 이러한 wrapper 없이 CDP Performance/Tracing으로 검증했다. dev에서만 Lenis 생명주기 계측 코드를 브라우저 응답에 삽입했으며 파일은 바꾸지 않았다.
- 기본 DPR 1, 추가 trace는 DPR 2. CPU 4배 throttling은 별도 인공 부하 시나리오다.
- 로딩 완료 후 시험한 스크롤은 대체로 60 RAF fps였다. **사용자가 느낀 지속적인 FPS drop을 이 환경에서 재현했다고 주장할 수 없다.** RAF 간격은 실제 화면 presentation/GPU 완료 시간과 동일하지 않으며, 측정 도구에도 오버헤드가 있다.
- 초기 로딩의 50–213ms long task와 최대 120.7ms의 renderer.render 호출은 확인했다. renderer.render 시간은 JavaScript 측 경과 시간으로 GPU 실행 전체 시간을 나타내지 않는다. 모든 초기 long task를 GLB 때문이라고 단정하지 않았다.

## 우선순위별 병목

### 1. 비활성 모델도 매 프레임 실제 draw에 포함됨 — 확인

`src/components/history/HistoryOverviewCanvas.jsx:160`에서 비활성 모델을 `visible=false`로 제외하지 않고 scale을 `baseScale * 0.0001`로 줄인다. 화면에는 거의 보이지 않지만 카메라 안의 오브젝트로 남는다.

실제 orbit 초반/중반/후반 모두 여섯 GLB가 draw에 포함됐다:

| 모델/그룹 | 프레임당 draw calls |
| --- | ---: |
| 1889 | 1 |
| Famicom | 31 |
| Game Boy | 26 |
| Nintendo DS | 4 |
| Wii | 18 |
| Switch 2 | 20 |
| 구체 | 1 |
| 연도·카드 | 프레임에 따라 달라짐 |

전체 **107–115 draw calls, 364,721–365,105 triangles/render**가 관측됐다. DS의 draw 수는 mesh 수와 동일하지 않으며 renderer 계측값을 표기했다. 모델 여섯 개 자체의 triangles 합은 358,389다. Switch 2와 Wii가 모델 triangles의 약 91.5%를 차지한다. 축소된 구체도 6,016 triangles를 계속 제출한다.

08 orbit의 JS renderer.render 평균은 약 1.14–1.54ms, 관측 최대는 6.5ms였다. 이 PC에서는 프레임 예산 안이지만, 낮은 GPU 성능에서 부담이 커질 수 있는 실제 불필요한 제출 작업이다.

최적화를 진행하게 된다면 첫 대상은 현재 보이는 모델 및 전환 중인 모델만 draw 대상으로 유지하는 것이다. 모델이나 디자인 삭제를 의미하지 않으며 이번에는 적용하지 않았다.

### 2. 초기 일괄 로딩·화면 밖 render — 확인

`HistoryOverviewCanvas.jsx:168`에서 여섯 GLB를 모두 로드한다. 연도·카드 이미지 18개도 처음부터 로드하고, 각 texture/GLB 완료 callback에서 render를 다시 호출한다(`:41`, `:186`).

- production 최초 진입에서 **화면 밖 WebGL render 25회**: 초기 1회 + 이미지 18개 + GLB 6개와 일치한다.
- GLB 전체 파일 크기 **39,629,880 bytes = 37.79MiB**.
- 모델의 1024×1024 텍스처 37장: RGBA8 + mipmap 기준 약 **197.33MiB**. WebGL texture 핸들이 실제 생성된 것도 확인했다. 이미지 decode 메모리, geometry buffer, MSAA/framebuffer, 드라이버 추가 메모리는 별도다. VRAM 계측기가 반환한 실측 bytes가 아닌 포맷·크기로 계산한 추정치다.
- 최초 진입에서 renderer.render 단일 호출 최대 **120.7ms**, 문서 전체 long tasks는 **50–213ms**였다. 독립적인 CDP trace에서도 초기 main-thread task 최대 약 209ms와 긴 초기 layout이 관측됐다. 처음 진입할 때 끊기는 현상과 직접 연결될 수 있다.
- 개발 모드 StrictMode에서는 effect setup/cleanup을 거쳐 renderer가 두 번 만들어지지만 정리 후 활성 renderer는 1개다. 개발 초기화 비용과 지속적인 누수는 구분해야 한다.

우선 검토 대상은 로딩/업로드/첫 render의 실행 시점과 중복 render의 묶음 처리다. 구체적인 적용은 아직 하지 않았다.

### 3. 빠른 이탈 뒤 scrub 잔여 render — 확인

독립적인 Three.js RAF/setAnimationLoop는 없다. `HistoryOverviewSection.jsx:65`의 GSAP onUpdate와 리소스 로드 callback이 render를 호출한다.

- 로딩 완료 후 화면 밖 정지: 1.8초 동안 render **0회**(08 이전/이후 각각).
- 08 중간에서 09 이후로 즉시 이동: **화면 밖 render 52회**, 마지막 호출은 이동 후 **892.9ms**.
- 이는 `scrub: 0.9`가 상태 보간을 마무리하는 동안 visibility 검사 없이 render하는 경로다. 무한 loop는 아니다.

화면 밖에서 WebGL 제출을 멈추되 다시 진입했을 때 현재 진행 상태를 그리는 것이 검토 대상이다.

### 4. 출력 해상도·AA 비용 — 구조 확인, 현재 기기에서 지속적 저하 미재현

`HistoryOverviewCanvas.jsx:22–24`: antialias=true, `setSize(1920, 1080, false)`, DPR 최대 1.5다. CSS에서 stage를 작게 보여도 내부 해상도는 viewport에 맞춰 줄어들지 않는다.

- DPR 1: 1920×1080 = 2.07M pixels.
- DPR 1.5 이상: 2880×1620 = 4.67M pixels.
- 작은 화면에서도 동일한 내부 해상도로 렌더할 수 있다. 반투명 카드의 양면 재질과 AA 비용도 더해진다.

이번 고성능 GPU에서는 이 항목만으로 FPS 하락을 재현하지 않았다. 실제 표시 크기와 출력 해상도의 관계를 다음 최적화 대상으로 검토할 수 있다.

### 5. 픽셀 전환과 cursor — 누수 없음, 재그리기 비용은 존재

- boundary: `AwardsPixelBoundary.jsx:34–57`에서 bounding rect 읽기, transform/clip-path/top 쓰기, 4행 canvas 다시 그리기를 한다.
- DPR 2의 2.4초 전환 trace에서 style recalculation 144회, layout 26회, Paint 26회였다. Paint 합 약 7.48ms, 단일 최대 2.13ms; layout 합 약 2.7–2.9ms. 이 실행에서는 60 RAF fps를 유지했다. **매 프레임 큰 강제 layout이 발생한다는 증거는 없다.**
- cursor: DOM을 만들지 않는다. canvas 1개와 최대 24개 pixel 레코드를 사용한다. 수명은 650ms, 배열 상한과 RAF guard가 있고 끝나면 RAF를 멈춘다.
- pointermove 시나리오에서 DOM node 증가 **0**, 효과 종료 후 추가 canvas clear **0회**였다.
- 다만 `AwardsPixelTrail.jsx:32`에서 픽셀이 있는 동안 canvas 전체를 매 프레임 clear한다. 1920×1080/DPR 2라면 내부 canvas 3840×2160, 8.29M pixels다. DPR 2의 cursor trace에서 script 합 32.7ms/2.4초, 25ms 초과 RAF 간격 1회가 있었다. 누수나 지속적 저하의 증거로 해석하지 않는다.

## 요청 항목별 판정

| 점검 항목 | 판정 |
| --- | --- |
| Three.js 화면 밖 render loop | 상시 loop 없음. 초기 offscreen 25회, 빠른 이탈 시 약 0.89초/52회 잔여 render 있음. |
| GLB file/texture/polygon | 아래 자산 표 및 glb-inventory.json에 기록. |
| Lenis 중복 | 활성 1개. dev에서 생성 총 2회는 StrictMode setup/cleanup 때문이며 1개가 정리됨. 두 차례 route 왕복 후에도 활성 1개. |
| RAF / gsap.ticker 중복 | ticker listener 2개: GSAP updateRoot + Lenis update 각 1개. 지속 RAF는 GSAP _tick + ScrollTrigger 내부 _rafBugFix. 서로 다른 역할이며 route 왕복 시 누적 안 됨. cursor RAF만 잠시 추가됨. Lenis autoRaf=false. |
| ScrollTrigger 중복 | History 9개, Home 0개, History 복귀 9개. 두 차례 왕복에도 9→0→9 유지. |
| React scroll 재렌더 | initial commit 이후 측정한 9개 시나리오 모두 추가 commit 0회. 주요 scroll 상태는 refs와 GSAP 객체로 갱신됨. resize/menu state 변경은 별개. |
| cursor DOM 무제한 생성 | 없음. canvas 1개, 레코드 최대 24개, pointermove 중 node delta 0. |
| position/rotation/lookAt | 매 render 호출마다 카드·연도 18개의 position/rotation/scale을 갱신하고 모델 6개의 scale/rotation과 구체도 갱신. 비활성 모델도 포함. lookAt 호출은 src에 없음. 모델 position은 초기 로드에서 설정하며 매 frame 변경하지 않음. |

transform 계산은 render가 요청된 때만 발생한다. 모든 idle browser frame에서 실행되는 구조가 아니다. 특히 카드 scale은 현재 수식상 phase와 무관한 값인데 매번 다시 설정된다. 불필요한 CPU 작업이지만 이번 측정에서 이것이 geometry 제출보다 큰 원인이라는 증거는 없다.

History의 ScrollTrigger 9개 구성: Intro pin 1, Story motion/velocity 2, Service panel 3, Overview entrance/orbit 2, Awards boundary 1. 같은 element를 trigger로 쓰는 경우도 역할과 범위가 다르다.

추가로 `HistoryStoryTransitionSection.jsx:43`은 onUpdate마다 gsap.to를 만든다. overwrite 및 cleanup이 있어 무제한 누적은 확인되지 않았으며 낮은 우선순위의 allocation 점검 대상이다.

## GLB 자산

폴리곤은 glTF triangle primitive의 index/accessor count로 계산한 triangles다. 텍스처 수는 GLB embedded image 개수이며 material slot 중복을 세지 않았다.

| 파일 | 파일 크기(MiB) | Triangles | Mesh/primitive 수 | 이미지 해상도·개수 | RGBA8+mipmap 추정(MiB) |
| --- | ---: | ---: | ---: | --- | ---: |
| 1889.glb | 0.473 | 44 | 1 | 1024² × 2 | 10.67 |
| famicom.glb | 3.573 | 10,948 | 31 | 1024² × 3 | 16.00 |
| gameboy.glb | 12.622 | 18,182 | 26 | 1024² × 13 | 69.33 |
| nintendo-ds.glb | 1.037 | 1,186 | 3 | 1024² × 3 | 16.00 |
| wii.glb | 6.177 | 76,626 | 18 | 1024² × 16 | 85.33 |
| switch-2.glb | 13.913 | 251,403 | 20 | 없음 | 0 |
| 합계 | 37.79 | 358,389 | 99 | 37장 | 197.33 |

Switch 2는 텍스처보다 geometry 비중이 크고, Game Boy/Wii는 텍스처 비용도 크다. Draco/Meshopt geometry 압축이나 KTX2/Basis texture 압축을 사용하는 자산은 없었다. 압축 도입만으로 렌더 triangles가 줄어드는 것은 아니므로 전송 비용과 draw 비용을 구분해야 한다.

## 측정 산출물

- [runtime.json](runtime.json): renderer.info, 단계별 RAF·React commit·canvas clear·DOM node, 초기 long tasks.
- [lifecycle.json](lifecycle.json): dev Lenis/ticker/ScrollTrigger/renderer 생성·해제, 두 차례 route 왕복.
- [glb-inventory.json](glb-inventory.json): GLB별 bytes, triangles, vertices, embedded image dimensions.
- [memory-and-exit.json](memory-and-exit.json): 업로드된 texture 확인과 빠른 화면 밖 이탈의 잔여 render.
- [trace-summary.json](trace-summary.json): DPR 2, CPU 4x 분리 시나리오의 CDP metrics와 main-thread event 통계.
- [browser-trace.json](browser-trace.json): DevTools Performance에서 불러올 수 있는 원본 trace.
- [profile.mjs](profile.mjs), [trace.mjs](trace.mjs): 브라우저 계측 도구. dev 4173 / production preview 4174를 실행한 상태에서 사용한다.

trace의 event duration은 부모/자식 이벤트가 겹치므로 행들을 합해서 총 CPU 시간이라고 해석하면 안 된다. 사용자 환경의 지속적인 하락 원인 확정에는 해당 기기의 실제 저하 구간 trace가 추가로 필요하다. 현재 결과만으로도 위의 불필요한 모델 draw 및 초기/잔여 offscreen render는 우선순위를 정할 수 있다.
