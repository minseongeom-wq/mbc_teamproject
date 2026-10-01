# Nintendo intro

Source file: `e0m4kzzInBhdHR8Hrp5jPN`.

- Start: [인트로_로고 합쳐짐, 3432:6998](https://www.figma.com/design/e0m4kzzInBhdHR8Hrp5jPN/?node-id=3432-6998).
- End: [인트로_로고 분산1, 1233:4898](https://www.figma.com/design/e0m4kzzInBhdHR8Hrp5jPN/?node-id=1233-4898). `분산2` (1233:4925) has identical vector geometry relative to its frame.
- `figma-keyframes.json` records the unrounded vector dimensions and absolute transforms relative to each 1920 × 1080 frame. `introKeyframes.js` pairs the two n letters explicitly and derives center, rotation and scale from these matrices. Parent-frame rotation and vector rotation are both included.
- SVGs in `public/images/home/intro` are individual original start-vector exports. Their vector outlines match the target vectors under scale/rotation. Intrinsic SVG dimensions are preserved. The R and its ring share one animated parent.

| Asset / object | Start vector | Scatter vector |
| --- | --- | --- |
| N | 3432:7008 | 1233:4900 |
| i | 3432:7007 | 1233:4917 |
| n-first | 3432:7002 | 1233:4905 |
| t | 3432:7006 | 1233:4920 |
| e | 3432:7003 | 1233:4908 |
| n-second | 3432:7004 | 1233:4911 |
| d | 3432:7005 | 1233:4903 |
| o | 3432:7000 | 1233:4914 |
| registered-ring | 3432:7009 | 1233:4924 |
| registered-r | 3432:7001 | 1233:4923 |

`NintendoIntro` owns the full-screen panel and renders `LogoIntro` and `IntroVideo` above the already-mounted Home. The logo timeline retains `timeScale(1.3)`. Authored timings hold the original alignment for 0.30s, squash / jump / land / settle for 0.87s, hold for 0.16s, then release nine objects along fixed curved paths. Scatter takes 1.28–1.48s per object with 18ms stagger. It holds the exact final frame for 0.65 timeline seconds (0.5 real seconds), then fades/scales each letter to 92% in place over 0.28 timeline seconds with 12ms stagger. Position and rotation do not change during exit.

`public/videos/Sequence 02_1.mp4` is the provided original from `Desktop/zelda video`: 2560 × 1440, 8 seconds, approximately 19.6 MB. It preloads during the logo and plays muted, inline, once from zero at its original speed. Its actual `ended` event starts an independent 1-second `power3.inOut` tween of the entire panel to `yPercent: -100`. Home is never moved or remounted. The last video frame stays in the panel until it leaves; no fade to black or crossfade is used. The panel is removed and scrolling restored on completion. A failed video releases the panel; blocked autoplay offers a play button.

The panel uses the existing `--color-action-primary, #e60012` background. The original white-silhouette video decodes to RGB(247,23,13), so an SVG display filter maps its silhouette coverage onto the existing red token and white. The source MP4 is unchanged. `IntroVideo` owns a full-viewport red wrapper; its video uses `width/height: 100%`, `object-fit: contain`, and centered positioning at every aspect ratio. This preserves the entire source frame without scaling beyond the available space. The filter removes a visible color seam between the video and wrapper.

`lockIntroScroll` temporarily preserves and replaces root/body overflow, reserves any classic scrollbar gutter, blocks wheel/touch/scroll keys, and makes the underlying app inert. Original inline values, priorities, inert state and focus are restored on completion or unmount. There is no Lenis instance in this checkout. Reduced motion skips to the scatter hold, uses a minimal letter exit, plays the video and reveals Home without the large panel movement. GSAP contexts, media listeners, observers and video playback are cleaned up on route changes and StrictMode remounts.

Validation: `npm run build`, `npm run lint`, `npx playwright test tests/home-intro.spec.js`. Six intro tests cover Figma endpoints, exit in place, the real eight-second video and `ended` event, one-second panel movement, unchanged Hero DOM/bounds, scroll restoration, mobile framing, reduced motion, failed media and route/StrictMode cleanup. Existing Home/common interaction tests wait for the intro to complete before interacting with Home.
