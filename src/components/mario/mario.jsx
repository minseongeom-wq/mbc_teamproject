import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import imgIntroCloud07 from "./assets/intro-cloud-07.png";

const imgCon3MarioPowerUps = "/images/mario/con3-mario-power-ups.png";
const imgCon4NintendoSwitch2Enhancement =
  "/images/mario/con4-nintendo-switch2-enhancement.png";
const imgCharacterArtMarioDefault =
  "/images/mario/character-art-mario-default.png";
const imgAsset1342 = "/images/mario/asset1342.png";
const imgAsset1341 = "/images/mario/asset1341.png";
const img = "/images/mario/.png";
const img1 = "/images/mario/1.png";
const img2 = "/images/mario/2.png";
const imgAsset1345 = "/images/mario/asset1345.png";
const img3 = "/images/mario/3.png";
const imgAsset1330 = "/images/mario/asset1330.png";
const imgAsset133002 = "/images/mario/asset133002.png";
const imgAsset1332 = "/images/mario/asset1332.png";
const imgAsset1325 = "/images/mario/asset1325.png";
const imgAsset1326 = "/images/mario/asset1326.png";
const imgAsset1337 = "/images/mario/asset1337.png";
const imgAsset1335 = "/images/mario/asset1335.png";
const imgAsset1336 = "/images/mario/asset1336.png";
const imgAsset1344 = "/images/mario/asset1344.png";
const powerUpHoverArt = {
  bubble: "/images/mario/bubble-mario.png",
  cat: "/images/mario/cat-mario.png",
  drill: "/images/mario/drill-mario.png",
  elephant: "/images/mario/elephant-mario.png",
  fire: "/images/mario/fire-mario.png",
};
const imgCharacterCardMarioSelected =
  "/images/mario/character-card-mario-selected.png";
const imgCharacterCardMarioDefault =
  "/images/mario/character-card-mario-default.png";
const imgCharacterCardLuigiDefault =
  "/images/mario/character-card-luigi-default.png";
const imgCharacterCardPeachDefault =
  "/images/mario/character-card-peach-default.png";
const imgCharacterCardYoshiDefault =
  "/images/mario/character-card-yoshi-default.png";
const imgCharacterCardToadDefault =
  "/images/mario/character-card-toad-default.png";
const imgCharacterCardBowserDefault =
  "/images/mario/character-card-bowser-default.png";
const characterCardAssets = [
  {
    default: imgCharacterCardMarioDefault,
    selected: imgCharacterCardMarioSelected,
  },
  {
    default: imgCharacterCardLuigiDefault,
    selected: "/images/mario/character-card-luigi-selected.png",
  },
  {
    default: imgCharacterCardPeachDefault,
    selected: "/images/mario/character-card-peach-selected.png",
  },
  {
    default: imgCharacterCardYoshiDefault,
    selected: "/images/mario/character-card-yoshi-selected.png",
  },
  {
    default: imgCharacterCardToadDefault,
    selected: "/images/mario/character-card-kinopio-selected.png",
  },
  {
    default: imgCharacterCardBowserDefault,
    selected: "/images/mario/character-card-koopa-selected.png",
  },
];
const characterAccentAssets = [
  "/images/mario/background-accent-circle-mario.svg",
  "/images/mario/background-accent-circle-luigi.svg",
  "/images/mario/background-accent-circle-peach.svg",
  "/images/mario/background-accent-circle-yoshi.svg",
  "/images/mario/background-accent-circle-kinopio.svg",
  "/images/mario/background-accent-circle-koopa.svg",
];
const imgNavigationNext = "/images/mario/navigation-next.png";
const imgCharacterArtGrassLand = "/images/mario/character-art-grass-land.png";
const imgCharacterArtSandKingdom =
  "/images/mario/character-art-sand-kingdom.png";
const imgIconNextStage = "/images/mario/icon-next-stage.png";
const imgDecorCharacter01 = "/images/mario/decor-character01.png";
const imgDecorCharacter02 = "/images/mario/decor-character02.png";
const imgWorldDecorSceneBackground =
  "/images/mario/world-decor-scene-background.png";
const imgWorldDecorForeground = "/images/mario/world-decor-foreground.png";
const imgDecorCharacter03 = "/images/mario/decor-character03.png";
const imgDecorObjectGroupPart01 = "/images/mario/decor-object-group-part01.png";
const imgDecorObjectGroupPart02 = "/images/mario/decor-object-group-part02.png";
const imgDecorObjectGroupPart03 = "/images/mario/decor-object-group-part03.png";
const imgDecorCharacter04 = "/images/mario/decor-character04.png";
const imgDecorCharacter05 = "/images/mario/decor-character05.png";
const imgDecorCharacter06 = "/images/mario/decor-character06.png";
const imgDecorCharacter07 = "/images/mario/decor-character07.png";
const imgDecorCharacter08 = "/images/mario/decor-character08.png";
const imgDecorCharacter09 = "/images/mario/decor-character09.png";
const imgDecorCharacter10 = "/images/mario/decor-character10.png";
const img7 = "/images/mario/7.png";
const img8 = "/images/mario/8.png";
const img10 = "/images/mario/10.png";
const img12 = "/images/mario/12.png";
const img14 = "/images/mario/14.png";
const imgDeviceTvFrame = "/images/mario/device-tv-frame.png";
const imgDeviceNintendoSwitch2Console =
  "/images/mario/device-nintendo-switch2-console.png";
const imgCharacterArtMario = "/images/mario/character-art-mario.png";
const imgAsset1303 = "/images/mario/asset1303.png";
const imgAsset1302 = "/images/mario/asset1302.png";
const imgPipe1301 = "/images/mario/pipe1301.png";
const imgAsset1298 = "/images/mario/asset1298.png";
const imgHero = "/images/mario/hero.png";
const img41 = "/images/mario/41.png";
const img31 = "/images/mario/31.png";
const imgFrame801 = "/images/mario/frame801.png";
const img16 = "/images/mario/16.png";
const img8D20F950367F4636823F1De375876E331 =
  "/images/mario/8-d20-f950367-f4636823-f1-de375876-e331.png";
const img21 = "/images/mario/21.png";
const imgLine = "/images/mario/line.svg";
const imgLine03 = "/images/mario/line03.svg";
const imgIconTriangle = "/images/mario/icon-triangle.svg";
const imgVector66 = "/images/mario/vector66.svg";
const imgVector67 = "/images/mario/vector67.svg";
const imgVector69 = "/images/mario/vector69.svg";
const imgPath = "/images/mario/path.svg";
const imgGroup = "/images/mario/group.svg";
const imgGroup1 = "/images/mario/group1.svg";
const imgStarWithCircle = "/images/mario/star-with-circle.svg";
const img4 = "/images/mario/4.svg";
const img5 = "/images/mario/5.svg";
const img6 = "/images/mario/6.svg";
const img9 = "/images/mario/9.svg";
const img11 = "/images/mario/11.svg";
const img13 = "/images/mario/13.svg";
const img15 = "/images/mario/15.svg";
const imgLogoNintendoSwitch2 = "/images/mario/logo-nintendo-switch2.svg";
const imgCtaArrowIcon = "/images/mario/cta-arrow-icon.svg";
const imgGroup77 = "/images/mario/group77.svg";
const imgGroup2 = "/images/mario/group2.svg";
const imgGroup3 = "/images/mario/group3.svg";
const imgStarWithCircle1 = "/images/mario/star-with-circle1.svg";
// const imgVectorChevron = "/images/mario/vector-chevron.svg";
const imgEllipse32 = "/images/mario/ellipse32.svg";

const characterSelection = [
  {
    key: "mario",
    display: "MARIO",
    korean: "마리오",
    english: "Mario",
    color: "#e60012",
    art: imgNavigationNext,
    tagline: "빨간 모자가 어울리는 영웅, 마리오",
    description: ["밝고 씩씩한 성격으로,", "친구들을 위해 모험에 나서요."],
  },
  {
    key: "luigi",
    display: "LUIGI",
    korean: "루이지",
    english: "Luigi",
    color: "#08a937",
    art: "/images/mario/character-art-luigi.png",
    tagline: "초록 모자의 다정한 동생, 루이지",
    description: ["조금 겁이 많지만,", "중요한 순간엔 용기를 내요."],
  },
  {
    key: "peach",
    display: "PEACH",
    korean: "피치",
    english: "Peach",
    color: "#f196bf",
    art: "/images/mario/character-art-peach.png",
    tagline: "버섯왕국의 따뜻한 공주, 피치",
    description: ["상냥한 마음과 용기로,", "소중한 친구들을 지켜요."],
  },
  {
    key: "yoshi",
    display: "YOSHI",
    korean: "요시",
    english: "Yoshi",
    color: "#70b921",
    art: "/images/mario/character-art-yoshi.png",
    tagline: "함께 모험하는 든든한 친구, 요시",
    description: ["긴 혀로 먹이를 꿀꺽,", "알을 던져 모험을 도와줘요."],
  },
  {
    key: "kinopio",
    display: "KINOPIO",
    korean: "키노피오",
    english: "Kinopio",
    color: "#18419a",
    art: "/images/mario/character-art-kinopio.png",
    tagline: "버섯 왕국의 작은 친구, 키노피오",
    description: ["언제나 밝고 성실하게,", "피치공주 곁에서 힘을 보태요."],
  },
  {
    key: "koopa",
    display: "KOOPA",
    korean: "쿠파",
    english: "Koopa",
    color: "#f8bf10",
    art: "/images/mario/character-art-koopa.png",
    tagline: "마리오의 강력한 라이벌, 쿠파",
    description: ["뜨거운 불꽃과 엄청난 힘으로,", "마리오 일행을 가로막아요."],
  },
];

const characters = [
  {
    name: "마리오",
    image: imgCharacterCardMarioSelected,
    description: "밝고 씩씩한 성격으로, 친구들을 위해 모험에 나서요.",
  },
  {
    name: "루이지",
    image: imgCharacterCardLuigiDefault,
    description:
      "마리오의 동생. 초록색 모자가 잘 어울리는 다정한 모험의 친구예요.",
  },
  {
    name: "피치",
    image: imgCharacterCardPeachDefault,
    description: "버섯 왕국의 공주. 따뜻한 마음과 용기로 친구들과 함께해요.",
  },
  {
    name: "요시",
    image: imgCharacterCardYoshiDefault,
    description: "마리오의 든든한 친구. 긴 혀와 멋진 점프로 모험을 도와요.",
  },
  {
    name: "키노피오",
    image: imgCharacterCardToadDefault,
    description:
      "버섯 왕국의 활기찬 친구. 작은 몸으로도 씩씩하게 모험에 나서요.",
  },
  {
    name: "쿠파",
    image: imgCharacterCardBowserDefault,
    description:
      "강력한 힘을 가진 쿠파 군단의 왕. 마리오와 맞서는 라이벌이에요.",
  },
];
function scrollToSection(name) {
  document.getElementById("mario-" + name).scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
}
// Illustrated scenes preserve their local coordinates; sections stay in document flow.
export default function Mario() {
  const pageRef = useRef(null);
  const dialogRef = useRef(null);
  const dividerRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [activeCharacter, setActiveCharacter] = useState(0);
  const [charactersEntered, setCharactersEntered] = useState(false);
  const [bannerEntered, setBannerEntered] = useState(false);
  const [world01Entered, setWorld01Entered] = useState(false);
  const [heroCharacterPhase, setHeroCharacterPhase] = useState("pending");
  const [hoveredPower, setHoveredPower] = useState(null);
  const powerScrollRef = useRef(null);
  const powerHoverEnabledRef = useRef(false);
  const [scrollPower, setScrollPower] = useState(null);
  const activePower = hoveredPower ?? scrollPower;
  const hoverPower = (power) => {
    if (powerHoverEnabledRef.current) setHoveredPower(power);
  };
  useEffect(() => {
    const track = powerScrollRef.current;
    const scene = track.querySelector("#mario-powerups");
    const art = scene.querySelector(".mario-powerup-hero");
    const artCenter = art.offsetTop + art.offsetHeight / 2;
    const desktop = matchMedia("(min-width: 768px)");
    const powers = ["drill", "elephant", "fire", "bubble", "cat"];
    let frame = 0;
    let scale = 1;
    let pinTop = 0;
    let lead = 0;
    let step = 1;

    const update = () => {
      frame = 0;
      if (!desktop.matches) {
        powerHoverEnabledRef.current = true;
        setScrollPower(null);
        return;
      }
      const distance = pinTop * scale - track.getBoundingClientRect().top;
      powerHoverEnabledRef.current =
        distance >= 0 && distance < lead + step * powers.length;
      if (!powerHoverEnabledRef.current) setHoveredPower(null);
      const index = Math.min(
        powers.length - 1,
        Math.floor((distance - lead) / step),
      );
      setScrollPower(index < 0 ? null : powers[index]);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      if (desktop.matches) {
        // Account for the existing zoom without changing the scene's coordinates.
        scale = scene.getBoundingClientRect().width / scene.offsetWidth;
        const viewport = window.innerHeight / scale;
        pinTop = -Math.max(
          0,
          Math.min(artCenter - viewport / 2, scene.offsetHeight - viewport),
        );
        lead = window.innerHeight * 0.25;
        step = window.innerHeight * 0.75;
        track.style.setProperty("--powerup-pin-top", `${pinTop}px`);
        track.style.setProperty(
          "--powerup-track-height",
          `${scene.offsetHeight + (lead + step * powers.length) / scale}px`,
        );
      }
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(scene);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    desktop.addEventListener("change", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      desktop.removeEventListener("change", measure);
    };
  }, []);
  const navigate = useNavigate();
  const activeCharacterData = characterSelection[activeCharacter];
  useEffect(() => {
    const page = pageRef.current;
    const intro = page.querySelector("#mario-intro");
    const hero = page.querySelector("#mario-hero");
    const logo = intro.querySelector(".mario-layer-6");
    const navigation = page
      .closest(".site-shell")
      ?.querySelector(":scope > .common-header");
    const clouds = [
      ...intro.querySelectorAll(':scope > [data-name^="cloud "]'),
    ];
    const secondLayer = clouds.filter((cloud) =>
      /^cloud (09|1[0-8])$/.test(cloud.dataset.name),
    );

    const desktop = matchMedia("(min-width: 768px)");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let ready = false;
    let pending = false;
    let disposed = false;
    let phase = "idle";
    let lockedY = window.scrollY;
    let frame = 0;
    let releaseTimer = 0;
    let generation = 0;
    let exits = [];
    let transitionClouds = null;
    let navExit = null;
    let navReturn = null;
    let touchY = null;
    const isLocked = () =>
      ["exiting", "descending", "settling"].includes(phase);
    const setPhase = (next) => {
      phase = next;
      page.dataset.introTransition = next;
    };
    const restoreNavigation = () => {
      navExit?.cancel();
      navReturn?.cancel();
      navExit = null;
      navReturn = null;
    };
    const releaseScroll = () => {
      clearTimeout(releaseTimer);
      // Absorb the trackpad momentum remaining at landing before restoring scroll.
      releaseTimer = window.setTimeout(() => setPhase("done"), 140);
    };
    const returnNavigation = () => {
      if (!navigation || navReturn || !navExit) return;
      navReturn = navigation.animate(
        [
          { translate: "0 -120%", opacity: 0 },
          { translate: "0 0", opacity: 1 },
        ],
        {
          duration: 200,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "forwards",
        },
      );
      navReturn.finished.then(restoreNavigation, () => {});
    };
    const coverCloudHandoff = () => {
      // Bridge the first-layer exit and the delayed lower layer in viewport
      // space, independently of the existing cloud/camera animations.
      const layer = document.createElement("div");
      layer.className = "mario-transition-clouds";
      layer.setAttribute("aria-hidden", "true");
      transitionClouds = layer;
      const passes = ["cloud 13", "cloud 14"].map((name, index) => {
        const source = clouds
          .find((cloud) => cloud.dataset.name === name)
          .querySelector("img");
        const image = source.cloneNode(false);
        image.className = "mario-transition-cloud";
        image.alt = "";
        image.draggable = false;
        const width = window.innerWidth * (index ? 0.8 : 0.86);
        const height =
          width * (source.naturalHeight / source.naturalWidth || 0.75);
        Object.assign(image.style, {
          width: `${width}px`,
          height: `${height}px`,
          left: `${window.innerWidth * (index ? 0.26 : -0.06)}px`,
          top: `${window.innerHeight + 2}px`,
        });
        layer.append(image);
        return image.animate(
          [
            { translate: "0 0" },
            { translate: `0 ${-(window.innerHeight + height + 4)}px` },
          ],
          {
            delay: index ? 220 : 0,
            duration: index ? 1700 : 1250,
            easing: "linear",
            fill: "both",
          },
        );
      });
      page.append(layer);
      exits.push(...passes);
      Promise.all(passes.map((animation) => animation.finished)).then(
        () => {
          layer.remove();
          if (transitionClouds === layer) transitionClouds = null;
        },
        () => {},
      );
    };
    const descend = () => {
      setPhase("descending");
      const startY = window.scrollY;
      const targetY = hero.getBoundingClientRect().top + startY;
      const startedAt = performance.now();
      const duration = reducedMotion.matches ? 0 : 950;
      const cameraBridges = [];
      const sceneScale =
        intro.getBoundingClientRect().width / intro.offsetWidth;
      if (!reducedMotion.matches) {
        // Keep these clouds in place until the camera starts falling through them.

        exits.push(
          ...secondLayer.map((cloud, index) => {
            const foreground = cloud.offsetWidth >= 600;
            const rect = cloud.getBoundingClientRect();
            const isGapCloud = ["cloud 16", "cloud 17", "cloud 18"].includes(
              cloud.dataset.name,
            );
            if (isGapCloud) {
              // Add camera compensation separately so the existing rise
              // delay, duration, easing and floating stay untouched.
              const depth = {
                "cloud 16": 1,
                "cloud 17": 0.85,
                "cloud 18": 0.7,
              }[cloud.dataset.name];
              const cameraDistance = ((targetY - startY) / sceneScale) * depth;
              const bridge = cloud.animate(
                [
                  { transform: "translateY(0px)" },
                  { transform: `translateY(${cameraDistance}px)` },
                ],
                { duration, fill: "both", composite: "add" },
              );
              bridge.pause();
              bridge.currentTime = 0;
              cameraBridges.push(bridge);
              exits.push(bridge);
            }

            const cloudDistance = isGapCloud
              ? window.innerHeight * 0.85
              : rect.height * 1.4;

            const cloudDelays = [0, 140, 280, 70, 400, 80, 260, 160, 580, 440];
            const cloudDelay = cloudDelays[index] ?? 0;

            return cloud.animate(
              [
                { translate: "0 0" },
                { translate: `0 ${-cloudDistance}px` },
              ],
              {
                delay: cloudDelay,
                duration: foreground
                  ? 580 + (index % 2) * 80
                  : 680 + (index % 3) * 90,
                easing: "cubic-bezier(0.3, 0, 0.65, 1)",
                fill: "forwards",
              },
            );
          }),
        );
      }
      const animate = (now) => {
        const progress = duration
          ? Math.min(1, (now - startedAt) / duration)
          : 1;
        // Carry the cloud pass into a quick descent, then settle at the Hero.
        const eased = progress;
        lockedY = startY + (targetY - startY) * eased;
        // Retain centre coverage during descent, then continuously remove
        // compensation before landing so no offset survives into the Hero.
        const handoff = Math.min(1, Math.max(0, (progress - 0.65) / 0.35));
        const retention = 1 - handoff * handoff * (3 - 2 * handoff);
        cameraBridges.forEach((bridge) => {
          bridge.currentTime = duration * eased * retention;
        });
        window.scrollTo({ top: lockedY, behavior: "instant" });
        if (progress >= 0.7) returnNavigation();
        if (progress < 1) frame = requestAnimationFrame(animate);
        else {
          frame = 0;
          restoreNavigation();
          setPhase("settling");
          releaseScroll();
        }
      };
      frame = requestAnimationFrame(animate);
    };
    const trigger = () => {
      pending = false;
      lockedY = window.scrollY;
      setPhase("exiting");
      if (reducedMotion.matches) {
        descend();
        return;
      }
      const run = ++generation;
      coverCloudHandoff();
      if (navigation) {
        navExit = navigation.animate(
          [
            { translate: "0 0", opacity: 1 },
            { translate: "0 -120%", opacity: 0 },
          ],
          {
            duration: 220,
            easing: "cubic-bezier(0.4, 0, 0.8, 1)",
            fill: "forwards",
          },
        );
      }
      exits.push(
        logo.animate(
          [
            { translate: "0 0", opacity: 1 },
            { translate: "0 -110px", opacity: 0 },
          ],
          {
            delay: 100,
            duration: 320,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "forwards",
          },
        ),
      );
      const distance =
        Math.max(
          ...clouds.map((cloud) => cloud.offsetTop + cloud.offsetHeight),
        ) + 80;
      const cloudExits = clouds.flatMap((cloud, index) => {
        if (secondLayer.includes(cloud)) return [];
        const foreground = cloud.offsetWidth >= 600;
        const depth = foreground ? 1.12 : 1 + (index % 3) * 0.025;
        return cloud.animate(
          [
            { translate: "0 0" },
            { translate: "0 " + -distance * depth + "px" },
          ],
          {
            delay: 180 + (foreground ? (index % 3) * 10 : 30 + (index % 4) * 12),
            duration: foreground ? 900 + (index % 3) * 20 : 990 + (index % 4) * 20,
            easing: "cubic-bezier(0.45, 0, 0.8, 1)",
            fill: "forwards",
          },
        );
      });
      exits.push(...cloudExits);
      // Overlap the last 180ms of the first layer with the descent and second layer.
      const lastCloud = cloudExits.reduce((latest, animation) =>
        animation.effect.getComputedTiming().endTime >
        latest.effect.getComputedTiming().endTime
          ? animation
          : latest,
      );
      const descentAt = lastCloud.effect.getComputedTiming().endTime - 180;
      const connectLayers = () => {
        if (disposed || run !== generation || phase !== "exiting") return;
        if (lastCloud.currentTime >= descentAt) descend();
        else frame = requestAnimationFrame(connectLayers);
      };
      frame = requestAnimationFrame(connectLayers);
    };
    const handleInput = (event, delta) => {
      if (!desktop.matches) return;
      if (isLocked()) {
        event.preventDefault();
        if (phase === "settling") releaseScroll();
        return;
      }
      if (
        event.defaultPrevented ||
        phase !== "idle" ||
        delta <= 0 ||
        navigation?.classList.contains("common-header--open")
      )
        return;
      const bounds = intro.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top > window.innerHeight) return;
      event.preventDefault();
      if (ready) trigger();
      else pending = true;
    };
    const onWheel = (event) => {
      if (event.ctrlKey) return;
      if (!isLocked() && Math.abs(event.deltaX) > Math.abs(event.deltaY))
        return;
      handleInput(event, event.deltaY);
    };
    const onKey = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (
        ![
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "End",
          "Home",
          " ",
        ].includes(event.key)
      )
        return;
      if (
        !isLocked() &&
        event.target.closest(
          "input, textarea, select, button, a, [contenteditable], dialog",
        )
      )
        return;
      const downward =
        ["ArrowDown", "PageDown", "End"].includes(event.key) ||
        (event.key === " " && !event.shiftKey);
      handleInput(event, downward ? 1 : -1);
    };
    const onTouchStart = (event) => {
      touchY = event.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (event) => {
      const nextY = event.touches[0]?.clientY;
      if (touchY !== null && nextY !== undefined)
        handleInput(event, touchY - nextY);
      touchY = nextY ?? null;
    };
    const cancel = () => {
      generation++;
      pending = false;
      cancelAnimationFrame(frame);
      clearTimeout(releaseTimer);
      frame = 0;
      exits.forEach((animation) => animation.cancel());
      exits = [];
      transitionClouds?.remove();
      transitionClouds = null;
      restoreNavigation();
      setPhase("idle");
    };
    const guardScroll = () => {
      if (isLocked() && Math.abs(window.scrollY - lockedY) > 1) {
        window.scrollTo({ top: lockedY, behavior: "instant" });
      } else if (phase === "done" && intro.getBoundingClientRect().top >= -1) {
        cancel();
      }
    };
    // Keep the initial logo entrance and its timing intact, including early input.
    const entrance = intro
      .getAnimations({ subtree: true })
      .filter(
        (animation) => animation.animationName === "mario-intro-logo-fade-in",
      );
    Promise.allSettled(entrance.map((animation) => animation.finished)).then(
      () => {
        if (disposed) return;
        ready = true;
        if (pending && desktop.matches) trigger();
      },
    );
    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, {
      passive: false,
      capture: true,
    });
    window.addEventListener("scroll", guardScroll, { passive: true });
    window.addEventListener("resize", cancel);
    reducedMotion.addEventListener("change", cancel);
    return () => {
      disposed = true;
      cancel();
      delete page.dataset.introTransition;
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove, true);
      window.removeEventListener("scroll", guardScroll);
      window.removeEventListener("resize", cancel);
      reducedMotion.removeEventListener("change", cancel);
    };
  }, []);
  useEffect(() => {
    const page = pageRef.current;
    const intro = page.querySelector("#mario-intro");
    const mobileIntro = page.querySelector(".mario-mobile-intro");
    const hero = page.querySelector(
      matchMedia("(max-width: 767px)").matches
        ? ".mario-mobile-hero"
        : "#mario-hero",
    );
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const updateDepth = () => {
      const visibleIntro = matchMedia("(max-width: 767px)").matches
        ? mobileIntro
        : intro;
      const introTop = visibleIntro.getBoundingClientRect().top;
      const heroTop = hero.getBoundingClientRect().top;
      const distance = heroTop - introTop;
      const progress =
        distance > 0 ? Math.min(1, Math.max(0, -introTop / distance)) : 1;
      const remaining = reducedMotion.matches ? 0 : 1 - progress;
      hero.style.setProperty("--hero-character-offset", `${18 * remaining}px`);
      hero.style.setProperty(
        "--hero-character-scale",
        `${1 + 0.05 * remaining}`,
      );
      hero.style.setProperty(
        "--hero-cloud-offset",
        `${reducedMotion.matches ? 0 : 10 * progress}px`,
      );
    };
    updateDepth();
    const observer = new ResizeObserver(updateDepth);
    observer.observe(intro);
    window.addEventListener("scroll", updateDepth, { passive: true });
    window.addEventListener("resize", updateDepth);
    reducedMotion.addEventListener("change", updateDepth);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateDepth);
      window.removeEventListener("resize", updateDepth);
      reducedMotion.removeEventListener("change", updateDepth);
      hero.style.removeProperty("--hero-character-offset");
      hero.style.removeProperty("--hero-character-scale");
      hero.style.removeProperty("--hero-cloud-offset");
    };
  }, []);
  useEffect(() => {
    const hero = pageRef.current?.querySelector(
      matchMedia("(max-width: 767px)").matches
        ? ".mario-mobile-hero"
        : "#mario-hero",
    );
    if (!hero) return undefined;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHeroCharacterPhase("done");
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHeroCharacterPhase("entering");
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const page = pageRef.current;
    const intro = page.querySelector("#mario-intro");
    const mobileIntro = page.querySelector(".mario-mobile-intro");
    const hero = page.querySelector(
      matchMedia("(max-width: 767px)").matches
        ? ".mario-mobile-hero"
        : "#mario-hero",
    );
    let frame = null;

    const cancelScroll = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    };
    const onWheel = (event) => {
      if (matchMedia("(min-width: 768px)").matches) return;
      if (event.ctrlKey || event.defaultPrevented) return;

      if (frame !== null) {
        event.preventDefault();
        return;
      }

      if (
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        event.target.closest("button, a, input, select, textarea, dialog")
      ) {
        return;
      }

      const visibleIntro = matchMedia("(max-width: 767px)").matches
        ? mobileIntro
        : intro;
      const introBounds = visibleIntro.getBoundingClientRect();
      const heroBounds = hero.getBoundingClientRect();

      let targetY = null;

      // 인트로 → 히어로
      if (
        event.deltaY > 0 &&
        introBounds.top > -10 &&
        introBounds.top < 10 &&
        heroBounds.top > 1
      ) {
        targetY = window.scrollY + heroBounds.top;
      }

      // 히어로 → 인트로
      if (event.deltaY < 0 && heroBounds.top > -10 && heroBounds.top < 10) {
        targetY = window.scrollY + introBounds.top;
      }

      if (targetY === null) return;

      event.preventDefault();

      const startY = window.scrollY;
      const startX = window.scrollX;

      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo({
          left: startX,
          top: targetY,
          behavior: "instant",
        });
        return;
      }

      const startedAt = performance.now();

      const animate = (now) => {
        const progress = Math.min((now - startedAt) / 1100, 1);
        const eased = (1 - Math.cos(Math.PI * progress)) / 2;

        window.scrollTo({
          left: startX,
          top: startY + (targetY - startY) * eased,
          behavior: "instant",
        });

        frame = progress < 1 ? requestAnimationFrame(animate) : null;
      };

      frame = requestAnimationFrame(animate);
    };
    page.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", cancelScroll);
    window.addEventListener("keydown", cancelScroll);
    window.addEventListener("touchstart", cancelScroll, { passive: true });
    return () => {
      cancelScroll();
      page.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", cancelScroll);
      window.removeEventListener("keydown", cancelScroll);
      window.removeEventListener("touchstart", cancelScroll);
    };
  }, []);

  // CON1 이후 부드러운 휠 스크롤
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let frame = null;

    const smoothScroll = () => {
      currentY += (targetY - currentY) * 0.11;

      if (Math.abs(targetY - currentY) < 0.5) {
        window.scrollTo(0, targetY);
        currentY = targetY;
        frame = null;
        return;
      }

      window.scrollTo(0, currentY);
      frame = requestAnimationFrame(smoothScroll);
    };

    const onSmoothWheel = (event) => {
      if (event.ctrlKey || event.defaultPrevented) return;

      // CON1 위치
      const con1 = page.querySelector("#mario-characters");
      if (!con1) return;

      const con1Top = con1.getBoundingClientRect().top + window.scrollY;

      const wheelTargetY = window.scrollY + event.deltaY * 1.05;
      const isEnteringCon1 =
        event.deltaY > 0 &&
        window.scrollY < con1Top &&
        wheelTargetY >= con1Top - 20;

      // 인트로 / 히어로 영역에서는 기존 스크롤 로직 사용
      if (window.scrollY < con1Top - 20 && !isEnteringCon1) return;

      // 버튼, 링크 등 조작 중에는 기본 동작 유지
      if (event.target.closest("button, a, input, select, textarea, dialog")) {
        return;
      }

      // Hand upward scrolling back to the hero before the CON1 lower bound clamps it.
      if (event.deltaY < 0 && targetY + event.deltaY * 1.05 < con1Top) {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        targetY = window.scrollY;
        currentY = window.scrollY;
        return;
      }

      if (isEnteringCon1) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }

      event.preventDefault();

      // 휠 이동량 누적
      targetY += event.deltaY * 1.05;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      targetY = Math.max(con1Top, Math.min(targetY, maxScroll));

      if (frame === null) {
        currentY = window.scrollY;
        frame = requestAnimationFrame(smoothScroll);
      }
    };

    // 사용자가 다른 방식으로 스크롤하면 위치 다시 동기화
    const syncScroll = () => {
      if (frame === null) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    page.addEventListener("wheel", onSmoothWheel, {
      passive: false,
    });

    window.addEventListener("scroll", syncScroll, {
      passive: true,
    });

    return () => {
      page.removeEventListener("wheel", onSmoothWheel);
      window.removeEventListener("scroll", syncScroll);

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);
  useEffect(() => {
    const page = pageRef.current;
    const observer = new ResizeObserver(([entry]) => {
      const scale = Math.min(entry.contentRect.width / 1920, 1);
      page.style.setProperty("--mario-scale", scale);
      page.style.setProperty(
        "--mario-canvas-width",
        `${entry.contentRect.width / scale}px`,
      );
      page.style.setProperty(
        "--mario-gutter",
        `${Math.max(0, (entry.contentRect.width - 1920) / 2)}px`,
      );
    });
    observer.observe(page);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (selected !== null && !dialogRef.current.open)
      dialogRef.current.showModal();
  }, [selected]);
  useEffect(() => {
    const characters = pageRef.current?.querySelector("#mario-characters");

    if (!characters) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCharactersEntered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(characters);

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const banner = pageRef.current?.querySelector(".mario-layer-86");

    if (!banner) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBannerEntered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.8,
      },
    );

    observer.observe(banner);

    return () => observer.disconnect();
  }, []);

  /* CON2 - World 01 entrance */
  useEffect(() => {
    const world01 = pageRef.current?.querySelector(".mario-layer-138");

    if (!world01) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWorld01Entered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.8,
      },
    );

    observer.observe(world01);

    return () => observer.disconnect();
  }, []);
  /* CON2 - World 02~05 Info entrance */
  useEffect(() => {
    const worlds = [
      { video: ".mario-layer-141", info: ".mario-layer-202" },
      { video: ".mario-layer-145", info: ".mario-layer-203" },
      { video: ".mario-layer-146", info: ".mario-layer-204" },
      { video: ".mario-layer-147", info: ".mario-layer-205" },
    ];

    const observers = [];

    worlds.forEach(({ video, info }) => {
      const videoElement = pageRef.current?.querySelector(video);
      const infoElement = pageRef.current?.querySelector(info);

      if (!videoElement || !infoElement) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            infoElement.classList.add("is-entered");
            observer.disconnect();
          }
        },
        {
          threshold: 0.8,
        },
      );

      observer.observe(videoElement);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const track = dividerRef.current;
    const original = track?.querySelector(
      ":scope > .mario-divider-marquee-set",
    );
    if (!original) return undefined;

    const duplicate = original.cloneNode(true);
    duplicate.setAttribute("aria-hidden", "true");
    duplicate.dataset.marqueeDuplicate = "true";
    track.append(duplicate);

    return () => duplicate.remove();
  }, []);
  return (
    <div className="mario-page" ref={pageRef}>
      <h1 className="mario-sr-only">슈퍼 마리오의 세계</h1>
      <section className="mario-mobile-intro" aria-label="intro">
        <div
          className="mario-mobile-intro__cloud mario-mobile-intro__cloud--top-left"
          aria-hidden="true"
        >
          <img src={img16} alt="" />
        </div>
        <div
          className="mario-mobile-intro__cloud mario-mobile-intro__cloud--top-right"
          aria-hidden="true"
        >
          <img src={img21} alt="" />
        </div>
        <img
          className="mario-mobile-intro__logo"
          src={img8D20F950367F4636823F1De375876E331}
          alt="SUPER NINTENDO WORLD"
        />
        <div
          className="mario-mobile-intro__cloud mario-mobile-intro__cloud--bottom-right"
          aria-hidden="true"
        >
          <img src={img21} alt="" />
        </div>
        <div
          className="mario-mobile-intro__cloud mario-mobile-intro__cloud--bottom-left"
          aria-hidden="true"
        >
          <img src={img21} alt="" />
        </div>
      </section>
      <section className="mario-mobile-hero" aria-label="hero">
        <img className="mario-mobile-hero__background" src={imgHero} alt="" />
        <div className="mario-mobile-hero__decoration" aria-hidden="true">
          <img src={imgEllipse32} alt="" />
        </div>
        <div
          className="mario-mobile-hero__cloud mario-mobile-hero__cloud--left"
          aria-hidden="true"
        >
          <img src={img21} alt="" />
        </div>
        <div
          className="mario-mobile-hero__cloud mario-mobile-hero__cloud--right"
          aria-hidden="true"
        >
          <img src={img21} alt="" />
        </div>
        <img
          className="mario-mobile-hero__characters"
          src={imgFrame801}
          alt="마리오와 버섯 왕국의 친구들"
        />
      </section>
      <div className="mario-stage">
        <div className="mario-opening">
          <div className="mario-opening-sky" aria-hidden="true">
            <img src={imgHero} alt="" />
          </div>
          <div className="mario-intro-scroll">
            <section
              id="mario-intro"
              className="mario-scene mario-intro"
              aria-label="intro"
            >
              <div
                className="mario-layer-3 mario-intro-cloud--03"
                data-node-id="2890:4421"
                data-name="cloud 03"
              >
                <img alt="" className="mario-layer-4" src={img16} />
              </div>
              <div
                className="mario-layer-5 mario-intro-cloud--07"
                data-node-id="3423:3059"
                data-name="cloud 07"
              >
                <img alt="" className="mario-layer-4" src={imgIntroCloud07} />
              </div>
              <div
                className="mario-layer-7 mario-intro-cloud--08"
                data-node-id="2890:4424"
                data-name="cloud 08"
              >
                <img alt="" className="mario-layer-4" src={img21} />
              </div>
              <div
                className="mario-layer-8 mario-intro-cloud--09"
                data-node-id="2890:4425"
                data-name="cloud 09"
              >
                <div className="mario-layer-9">
                  <div className="mario-layer-10" data-name="구름2 3">
                    <img alt="" className="mario-layer-4" src={img21} />
                  </div>
                </div>
              </div>
              <div
                className="mario-layer-11 mario-intro-cloud--11"
                data-node-id="2890:4426"
                data-name="cloud 11"
              >
                <div className="mario-layer-9">
                  <div className="mario-layer-12" data-name="구름2 4">
                    <img alt="" className="mario-layer-4" src={img21} />
                  </div>
                </div>
              </div>
              <div
                className="mario-intro-cloud-added mario-intro-cloud--10"
                data-node-id="3423:3045"
                data-name="cloud 10"
                aria-hidden="true"
              >
                <img alt="" src={img21} />
              </div>
              <div
                className="mario-intro-cloud-added mario-intro-cloud--05"
                data-node-id="3423:3050"
                data-name="cloud 05"
                aria-hidden="true"
              >
                <img alt="" src={img21} />
              </div>
              <div
                className="mario-intro-cloud-added mario-intro-cloud--04"
                data-node-id="3423:3047"
                data-name="cloud 04"
                aria-hidden="true"
              >
                <img alt="" src={img21} />
              </div>
              <div
                className="mario-intro-cloud-added mario-intro-cloud--12"
                data-node-id="3423:3048"
                data-name="cloud 12"
                aria-hidden="true"
              >
                <img alt="" src={img21} />
              </div>
              <div
                className="mario-intro-cloud-added mario-intro-cloud--15"
                data-node-id="3423:3049"
                data-name="cloud 15"
                aria-hidden="true"
              >
                <img alt="" src={img21} />
              </div>

              <div
                className="mario-intro-cloud-added mario-intro-cloud--16"
                data-name="cloud 16"
                aria-hidden="true"
              >
                <img alt="" src={img21} />
              </div>

              <div
                className="mario-intro-cloud-added mario-intro-cloud--17"
                data-name="cloud 17"
                aria-hidden="true"
              >
                <img alt="" src={img21} />
              </div>

              <div
                className="mario-intro-cloud-added mario-intro-cloud--18"
                data-name="cloud 18"
                aria-hidden="true"
              >
                <img alt="" src={img21} />
              </div>

              <div
                className="mario-intro-cloud-added mario-intro-cloud--01"
                data-node-id="3423:3046"
                data-name="cloud 01"
                aria-hidden="true"
              >
                <img alt="" src={img21} />
              </div>
              <div
                className="mario-layer-13 mario-intro-cloud--06"
                data-node-id="2890:4427"
                data-name="cloud 06"
              >
                <img alt="" className="mario-layer-4" src={img21} />
              </div>
              <div
                className="mario-layer-14 mario-intro-cloud--02"
                data-node-id="2890:4428"
                data-name="cloud 02"
              >
                <div className="mario-layer-15">
                  <div className="mario-layer-16" data-name="구름3 5">
                    <img alt="" className="mario-layer-4" src={img31} />
                  </div>
                </div>
              </div>
              <div
                className="mario-intro-cloud-added mario-intro-cloud--13"
                data-node-id="3423:3055"
                data-name="cloud 13"
                aria-hidden="true"
              >
                <img alt="" src={img16} />
              </div>
              <div
                className="mario-intro-cloud-added mario-intro-cloud--14"
                data-node-id="3423:3056"
                data-name="cloud 14"
                aria-hidden="true"
              >
                <img alt="" src={img16} />
              </div>
              <div
                className="mario-layer-6"
                data-node-id="2712:13187"
                data-name="8d20f950-367f-4636-823f-1de375876e33 1"
              >
                <img
                  alt="SUPER NINTENDO WORLD"
                  className="mario-layer-4"
                  src={img8D20F950367F4636823F1De375876E331}
                />
              </div>
            </section>
          </div>
          <section
            id="mario-hero"
            className={`mario-scene mario-hero mario-hero-character-${heroCharacterPhase}`}
            aria-label="hero"
          >
            <div
              className="mario-layer-18"
              data-node-id="2712:13160"
              data-name="구름4 1"
            >
              <div className="mario-layer-1">
                <img alt="" className="mario-layer-19" src={img41} />
              </div>
            </div>
            <button
              type="button"
              className="mario-layer-20"
              data-node-id="2712:13161"
              data-name="scroll-down"
              aria-label="캐릭터 소개로 이동"
              onClick={() => scrollToSection("characters")}
            >
              <p className="mario-layer-21" data-node-id="2712:13162">
                SCROLL DOWN
              </p>
              <img
                src="/images/mario/Union.png"
                alt=""
                className="mario-scroll-down-arrow"
              />
            </button>
            <div
              className="mario-layer-27"
              data-node-id="2712:13164"
              data-name="구름3 1"
            >
              <img alt="" className="mario-layer-4" src={img31} />
            </div>
            <div
              className="mario-layer-28"
              data-node-id="2712:13165"
              data-name="구름3 2"
            >
              <img alt="" className="mario-layer-4" src={img31} />
            </div>
            <div className="mario-layer-29" data-node-id="2712:13166">
              <div className="mario-layer-30">
                <div className="mario-layer-31" data-name="구름3 3">
                  <img alt="" className="mario-layer-4" src={img31} />
                </div>
              </div>
            </div>
            <div className="mario-layer-32" data-node-id="2712:13167">
              <div className="mario-layer-33">
                <div className="mario-layer-34" data-name="구름3 4">
                  <img alt="" className="mario-layer-4" src={img31} />
                </div>
              </div>
            </div>
            <div className="mario-layer-35" data-node-id="2712:13168">
              <div className="mario-layer-36">
                <div className="mario-layer-37" data-name="구름3 2">
                  <img alt="" className="mario-layer-4" src={img31} />
                </div>
              </div>
            </div>
            <div className="mario-layer-38" data-node-id="2712:13169">
              <div className="mario-layer-15">
                <div className="mario-layer-39" data-name="구름3 5">
                  <img alt="" className="mario-layer-4" src={img31} />
                </div>
              </div>
            </div>
            <div
              className="mario-layer-40"
              data-node-id="2712:13170"
              data-name="Group / 80"
            >
              <div className="mario-layer-41" data-node-id="2712:13171">
                <div className="mario-layer-42">
                  <div className="mario-layer-43">
                    <img alt="" className="mario-layer-44" src={imgEllipse32} />
                  </div>
                </div>
              </div>
              <div
                className="mario-layer-45"
                data-node-id="2712:13172"
                data-name="Frame 80 1"
              >
                <img
                  alt="마리오와 버섯 왕국의 친구들"
                  className="mario-layer-46"
                  src={imgFrame801}
                  onAnimationEnd={(event) => {
                    if (event.animationName === "mario-hero-character-pop-in") {
                      setHeroCharacterPhase("done");
                    }
                  }}
                />
              </div>
            </div>
          </section>
        </div>
        <section
          id="mario-characters"
          className={`mario-scene mario-characters ${
            charactersEntered ? "is-entered" : ""
          }`}
          aria-label="마리오와 친구들"
          data-node-id="2865:5511"
          data-character={activeCharacterData.key}
        >
          <div
            className="mario-layer-47"
            data-node-id="2712:12750"
            data-name="BG / Character Sprite Texture"
          >
            <div
              className="mario-layer-48"
              data-node-id="2712:12751"
              data-name="Base / White"
            />
          </div>
          <div
            className="mario-layer-49"
            data-node-id="2712:12764"
            data-name="Background / Accent Circle / Mario"
          >
            <img
              alt=""
              className="mario-layer-44"
              src={characterAccentAssets[activeCharacter]}
            />
          </div>
          <div
            className="mario-layer-50"
            data-node-id="2712:12772"
            data-name="Character Name / Mario"
          >
            <p
              key={activeCharacterData.key}
              className="mario-layer-51"
              style={{ color: activeCharacterData.color }}
            >
              {activeCharacterData.display}
            </p>
          </div>
          <div
            className="mario-layer-52"
            data-node-id="2712:12778"
            data-name="Selection Prompt / Choose Your Player"
          >
            <p className="mario-layer-53" data-node-id="2712:12779">
              CHOOSE YOUR PLAYER
            </p>
          </div>
          <button
            type="button"
            className="mario-layer-54"
            data-node-id="2712:12780"
            data-name="Character Card / Mario / Selected"
            aria-label="Mario 선택"
            aria-pressed={activeCharacter === 0}
            onClick={() => setActiveCharacter(0)}
          >
            <img
              alt=""
              className="mario-layer-55"
              src={
                activeCharacter === 0
                  ? characterCardAssets[0].selected
                  : characterCardAssets[0].default
              }
            />
          </button>
          <button
            type="button"
            className="mario-layer-56"
            data-node-id="2712:12781"
            data-name="Character Card / Luigi / Default"
            aria-label="Luigi 선택"
            aria-pressed={activeCharacter === 1}
            onClick={() => setActiveCharacter(1)}
          >
            <img
              alt=""
              className="mario-layer-55"
              src={
                activeCharacter === 1
                  ? characterCardAssets[1].selected
                  : characterCardAssets[1].default
              }
            />
          </button>
          <button
            type="button"
            className="mario-layer-57"
            data-node-id="2712:12782"
            data-name="Character Card / Peach / Default"
            aria-label="Peach 선택"
            aria-pressed={activeCharacter === 2}
            onClick={() => setActiveCharacter(2)}
          >
            <img
              alt=""
              className="mario-layer-55"
              src={
                activeCharacter === 2
                  ? characterCardAssets[2].selected
                  : characterCardAssets[2].default
              }
            />
          </button>
          <button
            type="button"
            className="mario-layer-58"
            data-node-id="2712:12783"
            data-name="Character Card / Yoshi / Default"
            aria-label="Yoshi 선택"
            aria-pressed={activeCharacter === 3}
            onClick={() => setActiveCharacter(3)}
          >
            <img
              alt=""
              className="mario-layer-55"
              src={
                activeCharacter === 3
                  ? characterCardAssets[3].selected
                  : characterCardAssets[3].default
              }
            />
          </button>
          <button
            type="button"
            className="mario-layer-59"
            data-node-id="2712:12784"
            data-name="Character Card / Toad / Default"
            aria-label="Kinopio 선택"
            aria-pressed={activeCharacter === 4}
            onClick={() => setActiveCharacter(4)}
          >
            <img
              alt=""
              className="mario-layer-55"
              src={
                activeCharacter === 4
                  ? characterCardAssets[4].selected
                  : characterCardAssets[4].default
              }
            />
          </button>
          <button
            type="button"
            className="mario-layer-60"
            data-node-id="2712:12785"
            data-name="Character Card / Bowser / Default"
            aria-label="Koopa 선택"
            aria-pressed={activeCharacter === 5}
            onClick={() => setActiveCharacter(5)}
          >
            <img
              alt=""
              className="mario-layer-55"
              src={
                activeCharacter === 5
                  ? characterCardAssets[5].selected
                  : characterCardAssets[5].default
              }
            />
          </button>
          <div
            className="mario-layer-61"
            data-node-id="2712:12786"
            data-name="Navigation / Next"
            data-character={activeCharacterData.key}
          >
            <div className="mario-layer-1">
              <img
                key={activeCharacterData.key}
                alt={activeCharacterData.korean}
                className={`mario-layer-62 mario-selected-character ${activeCharacter === 0 ? "is-mario" : ""}`}
                src={activeCharacterData.art}
              />
            </div>
          </div>
          <button
            type="button"
            className="mario-layer-63"
            data-node-id="2712:12787"
            data-name="Navigation / Previous"
            aria-label="다음 캐릭터 소개"
            onClick={() =>
              setActiveCharacter(
                (activeCharacter + 1) % characterSelection.length,
              )
            }
          >
            <div className="mario-layer-64" data-node-id="2712:12790">
              <div className="mario-layer-65">
                <div
                  className="mario-layer-66"
                  data-name="Icon / Previous / Default"
                >
                  <span
                    className="mario-character-arrow mario-character-arrow-previous"
                    style={{ backgroundColor: activeCharacterData.color }}
                  />
                </div>
              </div>
            </div>
          </button>
          <button
            type="button"
            className="mario-layer-67"
            data-node-id="2712:12792"
            aria-label="이전 캐릭터 소개"
            onClick={() =>
              setActiveCharacter(
                (activeCharacter + characterSelection.length - 1) %
                  characterSelection.length,
              )
            }
          >
            <div className="mario-layer-68">
              <div
                className="mario-layer-69"
                data-name="Text / Character Section Heading"
              >
                <div className="mario-layer-64" data-node-id="2712:12795">
                  <div className="mario-layer-65">
                    <div
                      className="mario-layer-66"
                      data-name="akar-icons:chevron-up"
                    >
                      <span
                        className="mario-character-arrow mario-character-arrow-next"
                        style={{
                          backgroundColor: activeCharacterData.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
          <div
            key={activeCharacterData.key}
            className="mario-layer-70"
            data-node-id="2712:12797"
            data-name="Character Info / Mario"
            data-character={activeCharacterData.key}
            style={{ "--character-color": activeCharacterData.color }}
          >
            <div
              className="mario-layer-71"
              data-node-id="2712:12798"
              data-name="Character Info / Mario / Name Badge"
            >
              <p
                className="mario-layer-72"
                data-node-id="2712:12799"
                style={{ color: activeCharacterData.color }}
              >
                {activeCharacterData.korean}{" "}
                <span
                  className="mario-layer-79"
                  data-node-id="2712:12804"
                  style={{ color: activeCharacterData.color }}
                >
                  ({activeCharacterData.english})
                </span>
              </p>
            </div>
            <div
              className="mario-layer-73"
              data-node-id="2712:12800"
              data-name="Character Info / Mario / Tagline"
            >
              <p className="mario-layer-74" data-node-id="2712:12801">
                {activeCharacterData.tagline}
              </p>
            </div>
            <div
              className="mario-layer-75"
              data-node-id="2712:12802"
              data-name="Character Info / Mario / Description"
            >
              <div className="mario-layer-76" data-node-id="2712:12803">
                <p className="mario-layer-77">
                  {activeCharacterData.description[0]}
                </p>
                <p className="mario-layer-78">
                  {activeCharacterData.description[1]}
                </p>
              </div>
            </div>
          </div>
          <div
            className="mario-layer-80"
            data-node-id="2712:12805"
            data-name="CHARACTERS"
          >
            <p className="mario-layer-81" data-node-id="2712:12806">
              CHARACTERS
            </p>
          </div>
          <div
            className="mario-layer-82"
            data-node-id="2712:12807"
            data-name="character-select-guide"
          >
            <div className="mario-layer-83" data-node-id="2712:12808">
              <p className="mario-layer-84">마리오와 친구들,</p>
              <p className="mario-layer-85">누가 궁금한가요?</p>
            </div>
          </div>
        </section>
        <section
          id="mario-adventure"
          className="mario-scene mario-adventure"
          aria-label="adventure"
        >
          <div
            className={`mario-layer-86 ${bannerEntered ? "is-entered" : ""}`}
            data-node-id="2712:13107"
            data-name="Group / 77"
          >
            <img alt="" className="mario-layer-44" src={imgGroup77} />
            <div
              className="mario-layer-87"
              data-node-id="2712:13109"
              data-name="Clip path group"
            >
              <div
                className="mario-layer-88"
                data-node-id="2712:13112"
                style={{ maskImage: `url("${imgGroup2}")` }}
                data-name="Group"
              >
                <img alt="" className="mario-layer-44" src={imgGroup3} />
              </div>
              <div className="mario-banner-character-clip">
                <div className="mario-layer-89" data-node-id="2712:13134">
                  <div className="mario-layer-90">
                    <div
                      className="mario-layer-91"
                      style={{ maskImage: `url("${imgGroup2}")` }}
                      data-name="Asset / 1303"
                    >
                      <div className="mario-layer-1">
                        <img
                          alt=""
                          className="mario-layer-92"
                          src={imgAsset1303}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="mario-layer-93"
                  data-node-id="2712:13135"
                  style={{ maskImage: `url("${imgGroup2}")` }}
                  data-name="Asset / 1302"
                >
                  <div className="mario-layer-1">
                    <img alt="" className="mario-layer-94" src={imgAsset1302} />
                  </div>
                </div>
              </div>
              <div
                className="mario-layer-95"
                data-node-id="2712:13136"
                style={{ maskImage: `url("${imgGroup2}")` }}
                data-name="Pipe / 1301"
              >
                <div className="mario-layer-1">
                  <img alt="" className="mario-layer-96" src={imgPipe1301} />
                </div>
              </div>
              <div
                className="mario-layer-97"
                data-node-id="2712:13137"
                style={{ maskImage: `url("${imgGroup2}")` }}
                data-name="Pipe / 1302"
              >
                <div className="mario-layer-1">
                  <img alt="" className="mario-layer-96" src={imgPipe1301} />
                </div>
              </div>
              <div
                className="mario-layer-98"
                data-node-id="2712:13138"
                style={{ maskImage: `url("${imgGroup2}")` }}
                data-name="Pipe / 1299"
              >
                <div className="mario-layer-1">
                  <img alt="" className="mario-layer-96" src={imgPipe1301} />
                </div>
              </div>
              <div className="mario-banner-character-clip">
                <div
                  className="mario-layer-99"
                  data-node-id="2712:13139"
                  style={{ maskImage: `url("${imgGroup2}")` }}
                  data-name="Asset / 1298"
                >
                  <img alt="" className="mario-layer-4" src={imgAsset1298} />
                </div>
              </div>
              <div
                className="mario-layer-100"
                data-node-id="2712:13140"
                style={{ maskImage: `url("${imgGroup2}")` }}
                data-name="Pipe / 1300"
              >
                <div className="mario-layer-1">
                  <img alt="" className="mario-layer-96" src={imgPipe1301} />
                </div>
              </div>
              <div
                className="mario-layer-101"
                data-node-id="2712:13141"
                style={{ maskImage: `url("${imgGroup2}")` }}
                data-name="Pipe / 1304"
              >
                <div className="mario-layer-1">
                  <img alt="" className="mario-layer-96" src={imgPipe1301} />
                </div>
              </div>
            </div>
            <div
              className="mario-layer-102"
              data-node-id="2712:13142"
              data-name="star with circle"
            >
              <img alt="" className="mario-layer-44" src={imgStarWithCircle1} />
            </div>
            <div className="mario-layer-103" data-node-id="2712:13156">
              <div className="mario-layer-104">
                <p className="mario-layer-105">LET’S-A GO</p>
              </div>
            </div>
            <div className="mario-layer-106" data-node-id="2712:13157">
              <div className="mario-layer-107">
                <div className="mario-layer-108">
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-109"></p>
                  <p className="mario-layer-110"></p>
                </div>
              </div>
            </div>
            <div className="mario-layer-111" data-node-id="2712:13158">
              <div className="mario-layer-112">
                <p className="mario-layer-113">TO THE NEXT ADVENTURE!</p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="mario-worlds"
          className="mario-scene mario-worlds"
          aria-label="마리오 월드 탐험"
          data-node-id="2865:5571"
        >
          <div
            className="mario-layer-114"
            data-node-id="2712:12810"
            data-name="BG / Editorial World Journey"
          >
            <div
              className="mario-layer-115"
              data-node-id="2712:12812"
              data-name="Atmosphere / Grass World"
            >
              <div
                className="mario-layer-116 mario-atmosphere-video"
                data-node-id="2712:12813"
                data-name="Atmosphere / Grass World / Blurred Scene"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Grass World atmosphere background"
                >
                  <source
                    src="/videos/mario/world01-grass.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <div
                className="mario-layer-117"
                data-node-id="2712:12814"
                data-name="Atmosphere / Grass World / White Veil"
              />
            </div>
            <div
              className="mario-layer-118"
              data-node-id="2712:12815"
              data-name="Atmosphere / Snow World"
            >
              <div
                className="mario-layer-119 mario-atmosphere-video"
                data-node-id="2712:12816"
                data-name="Atmosphere / Snow World / Blurred Scene"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Snow World atmosphere background"
                >
                  <source
                    src="/videos/mario/world04-snow.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <div
                className="mario-layer-120"
                data-node-id="2712:12817"
                data-name="Atmosphere / Snow World / White Veil"
              />
            </div>
            <div
              className="mario-layer-121"
              data-node-id="2712:12818"
              data-name="Atmosphere / Bowser World"
            >
              <div
                className="mario-layer-122 mario-atmosphere-video"
                data-node-id="2712:12819"
                data-name="Atmosphere / Bowser World / Blurred Scene"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Bowser World atmosphere background"
                >
                  <source
                    src="/videos/mario/world05-bowser.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
              <div
                className="mario-layer-123"
                data-node-id="2712:12820"
                data-name="Atmosphere / Bowser World / White Veil"
              />
            </div>
          </div>
          {/*
        <div className="mario-layer-124" data-node-id="2712:12896" data-name="Section Title / Mario Worlds">
          <div className="mario-layer-125" data-node-id="I2712:12896;2059:4257" data-name="Section Badge / World">
            <div className="mario-layer-126" data-node-id="I2712:12896;2203:5217" data-name="Shape / 2176" />
            <div className="mario-layer-127" data-node-id="I2712:12896;2203:4929" data-name="Line">
              <div className="mario-layer-128">
                <img alt="" className="mario-layer-26" src={imgLine} />
              </div>
            </div>
            <div className="mario-layer-129" data-node-id="I2712:12896;2203:4935" data-name="Line / 02">
              <div className="mario-layer-128">
                <img alt="" className="mario-layer-26" src={imgLine} />
              </div>
            </div>
            <div className="mario-layer-130" data-node-id="I2712:12896;2203:4967">
              <div className="mario-layer-65">
                <div className="mario-layer-131" data-name="Line / 03">
                  <div className="mario-layer-132">
                    <img alt="" className="mario-layer-26" src={imgLine03} />
                  </div>
                </div>
              </div>
            </div>
            <p className="mario-layer-133" data-node-id="I2712:12896;2203:5004">
              WORLD
            </p>
          </div>
          <p className="mario-layer-134" data-node-id="I2712:12896;2059:4265">
            점프 하나로 펼쳐지는 다채로운 월드
          </p>
          <p className="mario-layer-135" data-node-id="I2712:12896;2059:4266">
            <span className="mario-layer-136">달리</span>
            <span className="mario-layer-137">고</span>
            <span className="mario-layer-136">,</span>
            <span className="mario-layer-136">{` `}</span>
            <span className="mario-layer-136">뛰</span>
            <span className="mario-layer-137">고</span>
            <span className="mario-layer-136">,</span>
            <span className="mario-layer-136">{` `}</span>
            <span className="mario-layer-136">세계</span>
            <span className="mario-layer-137">를</span>
            <span className="mario-layer-136">{` `}</span>
            <span className="mario-layer-136">탐험</span>
            <span className="mario-layer-137">해요 !</span>
          </p>
        </div>
            <div className="mario-layer-123" data-node-id="2712:12820" data-name="Atmosphere / Bowser World / White Veil" />
          </div>
        </div>
        */}
          <div
            className="mario-layer-124"
            data-node-id="2712:12896"
            data-name="Section Title / Mario Worlds"
          >
            <div
              className="mario-layer-125"
              data-node-id="I2712:12896;2059:4257"
              data-name="Section Badge / World"
            >
              <div
                className="mario-layer-126"
                data-node-id="I2712:12896;2203:5217"
                data-name="Shape / 2176"
              />
              <div
                className="mario-layer-127"
                data-node-id="I2712:12896;2203:4929"
                data-name="Line"
              >
                <div className="mario-layer-128">
                  <img alt="" className="mario-layer-26" src={imgLine} />
                </div>
              </div>
              <div
                className="mario-layer-129"
                data-node-id="I2712:12896;2203:4935"
                data-name="Line / 02"
              >
                <div className="mario-layer-128">
                  <img alt="" className="mario-layer-26" src={imgLine} />
                </div>
              </div>
              <div
                className="mario-layer-130"
                data-node-id="I2712:12896;2203:4967"
              >
                <div className="mario-layer-65">
                  <div className="mario-layer-131" data-name="Line / 03">
                    <div className="mario-layer-132">
                      <img alt="" className="mario-layer-26" src={imgLine03} />
                    </div>
                  </div>
                </div>
              </div>
              <p
                className="mario-layer-133"
                data-node-id="I2712:12896;2203:5004"
              >
                WORLD
              </p>
            </div>
            <p className="mario-layer-134" data-node-id="I2712:12896;2059:4265">
              점프 하나로 펼쳐지는 다채로운 월드
            </p>
            <p className="mario-layer-135" data-node-id="I2712:12896;2059:4266">
              <span className="mario-layer-136">달리</span>
              <span className="mario-layer-137">고</span>
              <span className="mario-layer-136">,</span>
              <span className="mario-layer-136">{` `}</span>
              <span className="mario-layer-136">뛰</span>
              <span className="mario-layer-137">고</span>
              <span className="mario-layer-136">,</span>
              <span className="mario-layer-136">{` `}</span>
              <span className="mario-layer-136">세계</span>
              <span className="mario-layer-137">를</span>
              <span className="mario-layer-136">{` `}</span>
              <span className="mario-layer-136">탐험</span>
              <span className="mario-layer-137">해요 !</span>
            </p>
          </div>
          <div
            className="mario-layer-138 mario-world-video"
            data-node-id="2712:12897"
            data-name="World Visual / 01 / Grass Land"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Grass World gameplay background"
            >
              <source src="/videos/mario/world01-grass.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            className="mario-layer-139"
            data-node-id="2712:12898"
            data-name="Character Art / Grass Land"
          >
            <div className="mario-layer-1">
              <img
                alt=""
                className="mario-layer-140"
                src={imgCharacterArtGrassLand}
              />
              <div className="mario-world-plant-clip">
                <img
                  alt=""
                  className="mario-layer-140 mario-world-plant-idle"
                  src={imgCharacterArtGrassLand}
                />
              </div>
            </div>
          </div>
          <div
            className="mario-layer-141 mario-world-video"
            data-node-id="2712:12899"
            data-name="World Visual / 02 / Sand Kingdom"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Sand World gameplay background"
            >
              <source src="/videos/mario/world02-sand.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="mario-layer-142" data-node-id="2712:12900">
            <div className="mario-layer-143">
              <div
                className="mario-layer-144"
                data-name="Character Art / Sand Kingdom"
              >
                <img
                  alt=""
                  className="mario-layer-46"
                  src={imgCharacterArtSandKingdom}
                />
              </div>
            </div>
          </div>
          <div
            className="mario-layer-145 mario-world-video"
            data-node-id="2712:12901"
            data-name="World Visual / 03 / Seaside Kingdom"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Sea World gameplay background"
            >
              <source src="/videos/mario/world03-sea.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            className="mario-layer-146 mario-world-video"
            data-node-id="2712:12902"
            data-name="World Visual / 04 / Snow Kingdom"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Snow World gameplay background"
            >
              <source src="/videos/mario/world04-snow.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            className="mario-layer-147 mario-world-video"
            data-node-id="2712:12903"
            data-name="World Visual / 05 / Bowser Castle"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Bowser World gameplay background"
            >
              <source src="/videos/mario/world05-bowser.mp4" type="video/mp4" />
            </video>
          </div>
          <button
            type="button"
            className="mario-layer-148"
            data-node-id="2712:12904"
            data-name="Button / Next Stage"
            onClick={() => scrollToSection("powerups")}
          >
            <div
              className="mario-layer-149"
              data-node-id="2712:12905"
              data-name="Icon / Next Stage"
            >
              <img alt="" className="mario-layer-4" src={imgIconNextStage} />
            </div>
            <p className="mario-layer-150" data-node-id="2712:12906">
              NEXT STAGE
            </p>
            <div className="mario-layer-151" data-node-id="2712:12907">
              <div className="mario-layer-152">
                <div className="mario-layer-153" data-name="Icon / Triangle">
                  <img
                    alt=""
                    className="mario-layer-44"
                    src={imgIconTriangle}
                  />
                </div>
              </div>
            </div>
          </button>
          <div
            className="mario-layer-154"
            data-node-id="2712:12909"
            data-name="Decor / Character 01"
          >
            <img alt="" className="mario-layer-4" src={imgDecorCharacter01} />
          </div>
          <div className="mario-layer-155" data-node-id="2712:12910">
            <div className="mario-layer-68">
              <div className="mario-layer-156" data-name="Decor / Character 02">
                <img
                  alt=""
                  className="mario-layer-4"
                  src={imgDecorCharacter02}
                />
              </div>
            </div>
          </div>
          <div className="mario-layer-157" data-node-id="2712:12911">
            <div className="mario-layer-158">
              <div
                className="mario-layer-159"
                data-name="World Decor / Scene Background"
              >
                <img
                  alt=""
                  className="mario-layer-4"
                  src={imgWorldDecorSceneBackground}
                />
              </div>
            </div>
          </div>
          <div className="mario-world-sand-idle">
            <div
              className="mario-layer-160"
              data-node-id="2712:12912"
              data-name="World Decor / Foreground"
            >
              <div className="mario-layer-1">
                <img
                  alt=""
                  className="mario-layer-161"
                  src={imgWorldDecorForeground}
                />
              </div>
            </div>
            <div
              className="mario-layer-162"
              data-node-id="2712:12913"
              data-name="Decor / Character 03"
            >
              <div className="mario-layer-1">
                <img
                  alt=""
                  className="mario-layer-163"
                  src={imgDecorCharacter03}
                />
              </div>
            </div>
          </div>
          <div className="mario-world-shell-idle">
            <div
              className="mario-layer-164"
              data-node-id="2712:12914"
              data-name="Decor / Object Group"
            >
              <div className="mario-layer-165" data-node-id="2712:12915">
                <div className="mario-layer-166">
                  <div
                    className="mario-layer-167"
                    data-name="Decor / Object Group / Part 01"
                  >
                    <img
                      alt=""
                      className="mario-layer-4"
                      src={imgDecorObjectGroupPart01}
                    />
                  </div>
                </div>
              </div>
              <div className="mario-layer-168" data-node-id="2712:12916">
                <div className="mario-layer-166">
                  <div
                    className="mario-layer-169"
                    data-name="Decor / Object Group / Part 02"
                  >
                    <div className="mario-layer-1">
                      <img
                        alt=""
                        className="mario-layer-170"
                        src={imgDecorObjectGroupPart02}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mario-layer-171" data-node-id="2712:12917">
                <div className="mario-layer-166">
                  <div
                    className="mario-layer-172"
                    data-name="Decor / Object Group / Part 03"
                  >
                    <div className="mario-layer-1">
                      <img
                        alt=""
                        className="mario-layer-173"
                        src={imgDecorObjectGroupPart03}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mario-layer-174"
            data-node-id="2712:12918"
            data-name="Decor / Character 04"
          >
            <img alt="" className="mario-layer-4" src={imgDecorCharacter04} />
          </div>
          <div
            className="mario-layer-175"
            data-node-id="2712:12919"
            data-name="Decor / Character 05"
          >
            <img alt="" className="mario-layer-4" src={imgDecorCharacter05} />
          </div>
          <div
            className="mario-layer-176"
            data-node-id="2712:12920"
            data-name="Decor / Character 06"
          >
            <div className="mario-layer-1">
              <img
                alt=""
                className="mario-layer-177"
                src={imgDecorCharacter06}
              />
            </div>
          </div>
          <div className="mario-layer-178" data-node-id="2712:12921">
            <div className="mario-layer-179">
              <div className="mario-layer-180" data-name="Decor / Character 07">
                <img
                  alt=""
                  className="mario-layer-4"
                  src={imgDecorCharacter07}
                />
              </div>
            </div>
          </div>
          <div
            className="mario-layer-181"
            data-node-id="2712:12922"
            data-name="Decor / Character 08"
          >
            <img alt="" className="mario-layer-4" src={imgDecorCharacter08} />
          </div>
          <div
            className="mario-layer-182"
            data-node-id="2712:12923"
            data-name="Decor / Character 09"
          >
            <div className="mario-layer-1">
              <img
                alt=""
                className="mario-layer-183"
                src={imgDecorCharacter09}
              />
            </div>
          </div>
          <div className="mario-layer-184" data-node-id="2712:12924">
            <div className="mario-layer-68">
              <div className="mario-layer-185" data-name="Decor / Character 10">
                <img
                  alt=""
                  className="mario-layer-4"
                  src={imgDecorCharacter10}
                />
              </div>
            </div>
          </div>
          <div
            className={`mario-layer-186 ${world01Entered ? "is-entered" : ""}`}
            data-node-id="2712:12925"
            data-name="World Info / 01 / Grass Land"
          >
            <div
              className="mario-layer-187"
              data-node-id="I2712:12925;1595:1963"
              data-name="Top / world number + flexible line"
            >
              <p
                className="mario-layer-188"
                data-node-id="I2712:12925;1595:1964"
              >
                WORLD 01
              </p>
              <div
                className="mario-layer-189"
                data-node-id="I2712:12925;1595:1965"
                data-name="Flexible divider"
              />
            </div>
            <p className="mario-layer-190" data-node-id="I2712:12925;1595:1966">
              GRASS LAND
            </p>
            <div
              className="mario-layer-191"
              data-node-id="I2712:12925;1595:1967"
              data-name="Bottom / description + fixed arrow"
            >
              <p
                className="mario-layer-192"
                data-node-id="I2712:12925;1595:1968"
              >
                푸른 초원을 달리며 모험을 시작해요.
              </p>
              <p
                className="mario-layer-193"
                data-node-id="I2712:12925;1595:1969"
              >
                →
              </p>
            </div>
            <div
              className="mario-layer-194"
              data-node-id="I2712:12925;1595:1979"
            >
              <div className="mario-layer-195">
                <img alt="" className="mario-layer-26" src={imgVector66} />
              </div>
            </div>
            <div
              className="mario-layer-196"
              data-node-id="I2712:12925;1595:1981"
            >
              <div className="mario-layer-65">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector67} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mario-layer-198"
              data-node-id="I2712:12925;1595:1983"
            >
              <div className="mario-layer-199">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector66} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mario-layer-200"
              data-node-id="I2712:12925;1595:1984"
            >
              <div className="mario-layer-201">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector69} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mario-layer-202"
            data-node-id="2712:12926"
            data-name="World Info / 02 / Sand Kingdom"
          >
            <div
              className="mario-layer-187"
              data-node-id="I2712:12926;1595:1963"
              data-name="Top / world number + flexible line"
            >
              <p
                className="mario-layer-188"
                data-node-id="I2712:12926;1595:1964"
              >
                WORLD 02
              </p>
              <div
                className="mario-layer-189"
                data-node-id="I2712:12926;1595:1965"
                data-name="Flexible divider"
              />
            </div>
            <p className="mario-layer-190" data-node-id="I2712:12926;1595:1966">
              SAND KINGDOM
            </p>
            <div
              className="mario-layer-191"
              data-node-id="I2712:12926;1595:1967"
              data-name="Bottom / description + fixed arrow"
            >
              <p
                className="mario-layer-192"
                data-node-id="I2712:12926;1595:1968"
              >
                붉은 사막을 넘어 고대 유적을 발견해요.
              </p>
              <p
                className="mario-layer-193"
                data-node-id="I2712:12926;1595:1969"
              >
                →
              </p>
            </div>
            <div
              className="mario-layer-194"
              data-node-id="I2712:12926;1595:1979"
            >
              <div className="mario-layer-195">
                <img alt="" className="mario-layer-26" src={imgVector66} />
              </div>
            </div>
            <div
              className="mario-layer-196"
              data-node-id="I2712:12926;1595:1981"
            >
              <div className="mario-layer-65">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector67} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mario-layer-198"
              data-node-id="I2712:12926;1595:1983"
            >
              <div className="mario-layer-199">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector66} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mario-layer-200"
              data-node-id="I2712:12926;1595:1984"
            >
              <div className="mario-layer-201">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector69} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mario-layer-203"
            data-node-id="2712:12927"
            data-name="World Info / 03 / Seaside Kingdom"
          >
            <div
              className="mario-layer-187"
              data-node-id="I2712:12927;1595:1963"
              data-name="Top / world number + flexible line"
            >
              <p
                className="mario-layer-188"
                data-node-id="I2712:12927;1595:1964"
              >
                WORLD 03
              </p>
              <div
                className="mario-layer-189"
                data-node-id="I2712:12927;1595:1965"
                data-name="Flexible divider"
              />
            </div>
            <p className="mario-layer-190" data-node-id="I2712:12927;1595:1966">
              SEASIDE KINGDOM
            </p>
            <div
              className="mario-layer-191"
              data-node-id="I2712:12927;1595:1967"
              data-name="Bottom / description + fixed arrow"
            >
              <p
                className="mario-layer-192"
                data-node-id="I2712:12927;1595:1968"
              >
                푸른 바다와 해변을 탐험해요.
              </p>
              <p
                className="mario-layer-193"
                data-node-id="I2712:12927;1595:1969"
              >
                →
              </p>
            </div>
            <div
              className="mario-layer-194"
              data-node-id="I2712:12927;1595:1979"
            >
              <div className="mario-layer-195">
                <img alt="" className="mario-layer-26" src={imgVector66} />
              </div>
            </div>
            <div
              className="mario-layer-196"
              data-node-id="I2712:12927;1595:1981"
            >
              <div className="mario-layer-65">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector67} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mario-layer-198"
              data-node-id="I2712:12927;1595:1983"
            >
              <div className="mario-layer-199">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector66} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mario-layer-200"
              data-node-id="I2712:12927;1595:1984"
            >
              <div className="mario-layer-201">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector69} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mario-layer-204"
            data-node-id="2712:12928"
            data-name="World Info / 04 / Snow Kingdom"
          >
            <div
              className="mario-layer-187"
              data-node-id="I2712:12928;1595:1963"
              data-name="Top / world number + flexible line"
            >
              <p
                className="mario-layer-188"
                data-node-id="I2712:12928;1595:1964"
              >
                WORLD 04
              </p>
              <div
                className="mario-layer-189"
                data-node-id="I2712:12928;1595:1965"
                data-name="Flexible divider"
              />
            </div>
            <p className="mario-layer-190" data-node-id="I2712:12928;1595:1966">
              SNOW KINGDOM
            </p>
            <div
              className="mario-layer-191"
              data-node-id="I2712:12928;1595:1967"
              data-name="Bottom / description + fixed arrow"
            >
              <p
                className="mario-layer-192"
                data-node-id="I2712:12928;1595:1968"
              >
                새하얀 설원을 탐험해요.
              </p>
              <p
                className="mario-layer-193"
                data-node-id="I2712:12928;1595:1969"
              >
                →
              </p>
            </div>
            <div
              className="mario-layer-194"
              data-node-id="I2712:12928;1595:1979"
            >
              <div className="mario-layer-195">
                <img alt="" className="mario-layer-26" src={imgVector66} />
              </div>
            </div>
            <div
              className="mario-layer-196"
              data-node-id="I2712:12928;1595:1981"
            >
              <div className="mario-layer-65">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector67} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mario-layer-198"
              data-node-id="I2712:12928;1595:1983"
            >
              <div className="mario-layer-199">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector66} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mario-layer-200"
              data-node-id="I2712:12928;1595:1984"
            >
              <div className="mario-layer-201">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector69} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mario-layer-205"
            data-node-id="2712:12929"
            data-name="World Info / 05 / Bowser Castle"
          >
            <div
              className="mario-layer-187"
              data-node-id="I2712:12929;1595:1963"
              data-name="Top / world number + flexible line"
            >
              <p
                className="mario-layer-188"
                data-node-id="I2712:12929;1595:1964"
              >
                WORLD 05
              </p>
              <div
                className="mario-layer-189"
                data-node-id="I2712:12929;1595:1965"
                data-name="Flexible divider"
              />
            </div>
            <p className="mario-layer-190" data-node-id="I2712:12929;1595:1966">
              BOWSER’S CASTLE
            </p>
            <div
              className="mario-layer-191"
              data-node-id="I2712:12929;1595:1967"
              data-name="Bottom / description + fixed arrow"
            >
              <p
                className="mario-layer-192"
                data-node-id="I2712:12929;1595:1968"
              >
                용암을 넘어 쿠파성으로!
              </p>
              <p
                className="mario-layer-193"
                data-node-id="I2712:12929;1595:1969"
              >
                →
              </p>
            </div>
            <div
              className="mario-layer-194"
              data-node-id="I2712:12929;1595:1979"
            >
              <div className="mario-layer-195">
                <img alt="" className="mario-layer-26" src={imgVector66} />
              </div>
            </div>
            <div
              className="mario-layer-196"
              data-node-id="I2712:12929;1595:1981"
            >
              <div className="mario-layer-65">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector67} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mario-layer-198"
              data-node-id="I2712:12929;1595:1983"
            >
              <div className="mario-layer-199">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector66} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mario-layer-200"
              data-node-id="I2712:12929;1595:1984"
            >
              <div className="mario-layer-201">
                <div className="mario-layer-197">
                  <div className="mario-layer-195">
                    <img alt="" className="mario-layer-26" src={imgVector69} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="mario-divider"
          className="mario-scene mario-divider"
          aria-label="divider"
        >
          <div className="mario-divider-marquee-track" ref={dividerRef}>
            <div className="mario-divider-marquee-set">
              <div
                className="mario-layer-206"
                data-node-id="2712:12931"
                data-name="Path"
              >
                <img alt="" className="mario-layer-44" src={imgPath} />
              </div>
              <div
                className="mario-layer-207"
                data-node-id="2712:12932"
                data-name="Clip path group"
              >
                <div
                  className="mario-layer-208"
                  data-node-id="2712:12935"
                  style={{ maskImage: `url("${imgGroup}")` }}
                  data-name="Group"
                >
                  <img alt="" className="mario-layer-44" src={imgGroup1} />
                </div>
              </div>
              <div
                className="mario-layer-209"
                data-node-id="2712:12957"
                data-name="star with circle"
              >
                <img
                  alt=""
                  className="mario-layer-44"
                  src={imgStarWithCircle}
                />
              </div>
              <div
                className="mario-layer-210"
                data-node-id="2712:12971"
                data-name="벨"
              >
                <div aria-hidden className="mario-layer-211" />
                <div
                  className="mario-layer-212"
                  data-node-id="2712:12972"
                  data-name="벨"
                >
                  <img alt="" className="mario-layer-4" src={img2} />
                </div>
                <div
                  className="mario-layer-213"
                  data-node-id="2712:12973"
                  data-name="광택효과"
                >
                  <div className="mario-layer-214">
                    <img alt="" className="mario-layer-26" src={img4} />
                  </div>
                </div>
                <div className="mario-layer-215" />
              </div>
              <div
                className="mario-layer-216"
                data-node-id="2712:12977"
                data-name="코끼리열매"
              >
                <div aria-hidden className="mario-layer-217" />
                <div
                  className="mario-layer-218"
                  data-node-id="2712:12978"
                  data-name="광택효과"
                >
                  <div className="mario-layer-219">
                    <img alt="" className="mario-layer-26" src={img5} />
                  </div>
                </div>
                <div className="mario-layer-220" data-node-id="2712:12982">
                  <div className="mario-layer-221">
                    <div className="mario-layer-222" data-name="코끼리열매">
                      <img alt="" className="mario-layer-4" src={img1} />
                    </div>
                  </div>
                </div>
                <div className="mario-layer-223" />
              </div>
              <div
                className="mario-layer-224"
                data-node-id="2712:12985"
                data-name="드릴버섯"
              >
                <div aria-hidden className="mario-layer-225" />
                <div className="mario-layer-226" data-node-id="2712:12986">
                  <div className="mario-layer-227">
                    <div className="mario-layer-228" data-name="드릴버섯">
                      <img alt="" className="mario-layer-4" src={img} />
                    </div>
                  </div>
                </div>
                <div
                  className="mario-layer-229"
                  data-node-id="2712:12987"
                  data-name="광택효과"
                >
                  <div className="mario-layer-230">
                    <img alt="" className="mario-layer-26" src={img6} />
                  </div>
                </div>
                <div className="mario-layer-231" />
              </div>
              <div
                className="mario-layer-232"
                data-node-id="2712:12991"
                data-name="고양이마리오"
              >
                <div aria-hidden className="mario-layer-233" />
                <div className="mario-layer-234" data-node-id="2712:12992">
                  <div className="mario-layer-235">
                    <div className="mario-layer-236" data-name="고양이마리오">
                      <img alt="" className="mario-layer-4" src={img7} />
                    </div>
                  </div>
                </div>
                <div className="mario-layer-237" />
              </div>
              <div
                className="mario-layer-238"
                data-node-id="2712:12993"
                data-name="코끼리마리오"
              >
                <div aria-hidden className="mario-layer-239" />
                <div className="mario-layer-240" data-node-id="2712:12994">
                  <div className="mario-layer-241">
                    <div className="mario-layer-242" data-name="코끼리마리오">
                      <img alt="" className="mario-layer-4" src={img8} />
                    </div>
                  </div>
                </div>
                <div
                  className="mario-layer-243"
                  data-node-id="2712:12995"
                  data-name="광택효과"
                >
                  <div className="mario-layer-244">
                    <img alt="" className="mario-layer-26" src={img9} />
                  </div>
                </div>
                <div className="mario-layer-245" />
              </div>
              <div
                className="mario-layer-246"
                data-node-id="2712:12999"
                data-name="드릴마리오"
              >
                <div aria-hidden className="mario-layer-247" />
                <div className="mario-layer-248" data-node-id="2712:13000">
                  <div className="mario-layer-249">
                    <div className="mario-layer-250" data-name="드릴마리오">
                      <img alt="" className="mario-layer-4" src={img10} />
                    </div>
                  </div>
                </div>
                <div
                  className="mario-layer-251"
                  data-node-id="2712:13001"
                  data-name="광택효과"
                >
                  <div className="mario-layer-252">
                    <img alt="" className="mario-layer-26" src={img11} />
                  </div>
                </div>
                <div className="mario-layer-215" />
              </div>
              <div
                className="mario-layer-253"
                data-node-id="2712:13005"
                data-name="파이어마리오"
              >
                <div aria-hidden className="mario-layer-254" />
                <div
                  className="mario-layer-255"
                  data-node-id="2712:13006"
                  style={{ containerType: "size" }}
                >
                  <div className="mario-layer-256">
                    <div className="mario-layer-257" data-name="파이어마리오">
                      <img alt="" className="mario-layer-4" src={img12} />
                    </div>
                  </div>
                </div>
                <div
                  className="mario-layer-258"
                  data-node-id="2712:13007"
                  data-name="광택효과"
                >
                  <div className="mario-layer-259">
                    <img alt="" className="mario-layer-26" src={img13} />
                  </div>
                </div>
                <div className="mario-layer-260" />
              </div>
              <div
                className="mario-layer-261"
                data-node-id="2712:13011"
                style={{ containerType: "size" }}
              >
                <div className="mario-layer-262">
                  <div className="mario-layer-263" data-name="버블마리오">
                    <div aria-hidden className="mario-layer-264" />
                    <div
                      className="mario-layer-265"
                      data-node-id="2712:13012"
                      data-name="버블마리오"
                    >
                      <img alt="" className="mario-layer-4" src={img14} />
                    </div>
                    <div
                      className="mario-layer-266"
                      data-node-id="2712:13013"
                      data-name="광택효과"
                    >
                      <div className="mario-layer-267">
                        <img alt="" className="mario-layer-26" src={img15} />
                      </div>
                    </div>
                    <div className="mario-layer-215" />
                  </div>
                </div>
              </div>
              <div
                className="mario-layer-268"
                data-node-id="2712:13017"
                style={{ containerType: "size" }}
              >
                <div className="mario-layer-269">
                  <div className="mario-layer-270" data-name="버블플라워">
                    <div aria-hidden className="mario-layer-271" />
                    <div className="mario-layer-272" data-node-id="2712:13018">
                      <div className="mario-layer-273">
                        <div className="mario-layer-274" data-name="버블플라워">
                          <img alt="" className="mario-layer-4" src={img3} />
                        </div>
                      </div>
                    </div>
                    <div className="mario-layer-275" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div ref={powerScrollRef} className="mario-powerup-scroll">
          <section
            id="mario-powerups"
            className="mario-scene mario-powerups"
            aria-label="powerups"
          >
            <div aria-hidden className="mario-layer-276">
              <img
                alt=""
                className="mario-layer-277"
                src={imgCon3MarioPowerUps}
              />
              <div
                className="mario-layer-278"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%), linear-gradient(90deg, rgba(255, 213, 40, 0.05) 0%, rgba(255, 213, 40, 0.05) 100%)",
                }}
              />
            </div>
            <div
              className="mario-layer-279"
              data-node-id="2712:12703"
              data-name="Section Title / Mario Worlds"
            >
              <div
                className="mario-layer-125"
                data-node-id="I2712:12703;2059:4257"
                data-name="Section Badge / World"
              >
                <div
                  className="mario-layer-126"
                  data-node-id="I2712:12703;2203:5217"
                  data-name="Shape / 2176"
                />
                <div
                  className="mario-layer-127"
                  data-node-id="I2712:12703;2203:4929"
                  data-name="Line"
                >
                  <div className="mario-layer-128">
                    <img alt="" className="mario-layer-26" src={imgLine} />
                  </div>
                </div>
                <div
                  className="mario-layer-129"
                  data-node-id="I2712:12703;2203:4935"
                  data-name="Line / 02"
                >
                  <div className="mario-layer-128">
                    <img alt="" className="mario-layer-26" src={imgLine} />
                  </div>
                </div>
                <div
                  className="mario-layer-130"
                  data-node-id="I2712:12703;2203:4967"
                >
                  <div className="mario-layer-65">
                    <div className="mario-layer-131" data-name="Line / 03">
                      <div className="mario-layer-132">
                        <img
                          alt=""
                          className="mario-layer-26"
                          src={imgLine03}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p
                  className="mario-layer-133"
                  data-node-id="I2712:12703;2203:5004"
                >
                  POWER
                </p>
              </div>
              <p
                className="mario-layer-134"
                data-node-id="I2712:12703;2059:4265"
              >
                아이템 하나로 달라지는 마리오
              </p>
              <p
                className="mario-layer-135"
                data-node-id="I2712:12703;2059:4266"
              >
                <span className="mario-layer-136">새로</span>
                <span className="mario-layer-280">운</span>
                <span className="mario-layer-136">{` 모습`}</span>
                <span className="mario-layer-280">과</span>
                <span className="mario-layer-136">{` 능력`}</span>
                <span className="mario-layer-280">을</span>
                <span className="mario-layer-136">{` 발견`}</span>
                <span className="mario-layer-280">해요</span>
              </p>
            </div>
            <div
              className="mario-layer-281 mario-powerup-hero"
              data-powerup={activePower ?? "default"}
              data-node-id="2712:12705"
              data-name="Character Art / Mario / Default"
            >
              <img
                key={activePower ?? "default"}
                alt=""
                className={
                  activePower ? "mario-powerup-hero-art" : "mario-layer-4"
                }
                src={
                  activePower
                    ? powerUpHoverArt[activePower]
                    : imgCharacterArtMarioDefault
                }
              />
            </div>
            <div
              className="mario-layer-282"
              data-node-id="2712:12706"
              data-name="Decor / Mushroom Pair"
            >
              <div
                className="mario-layer-283"
                data-node-id="2712:12707"
                data-name="Asset / 1342"
              >
                <img alt="" className="mario-layer-4" src={imgAsset1342} />
              </div>
              <div
                className="mario-layer-284"
                data-node-id="2712:12708"
                data-name="Asset / 1341"
              >
                <img alt="" className="mario-layer-4" src={imgAsset1341} />
              </div>
            </div>
            <div
              className={`mario-layer-285 mario-powerup-card ${activePower === "drill" ? "is-active" : ""}`}
              data-node-id="2712:12713"
              data-name="Item / Drill Mushroom"
              onMouseEnter={() => hoverPower("drill")}
              onMouseLeave={() => setHoveredPower(null)}
            >
              <div className="mario-layer-286" data-node-id="2712:12714">
                <p className="mario-layer-287">DRILL</p>
                <p className="mario-layer-288">MUSHROOM</p>
              </div>
              <div className="mario-layer-289" data-node-id="2712:12715">
                <div className="mario-layer-290">
                  <div className="mario-layer-291" data-name="드릴버섯">
                    <img alt="" className="mario-layer-4" src={img} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`mario-layer-292 mario-powerup-card ${activePower === "elephant" ? "is-active" : ""}`}
              data-node-id="2712:12716"
              data-name="Item / Elephant Fruit"
              onMouseEnter={() => hoverPower("elephant")}
              onMouseLeave={() => setHoveredPower(null)}
            >
              <div className="mario-layer-293" data-node-id="2712:12717">
                <p className="mario-layer-287">ELEPHANT</p>
                <p className="mario-layer-288">FRUIT</p>
              </div>
              <div className="mario-layer-294" data-node-id="2712:12718">
                <div className="mario-layer-221">
                  <div className="mario-layer-295" data-name="코끼리열매">
                    <img alt="" className="mario-layer-4" src={img1} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`mario-layer-296 mario-powerup-card ${activePower === "cat" ? "is-active" : ""}`}
              data-node-id="2712:12719"
              data-name="Item / Super Bell"
              onMouseEnter={() => hoverPower("cat")}
              onMouseLeave={() => setHoveredPower(null)}
            >
              <p className="mario-layer-297" data-node-id="2712:12720">
                SUPER BELL
              </p>
              <div className="mario-layer-298" data-node-id="2712:12721">
                <div className="mario-layer-299">
                  <div className="mario-layer-300" data-name="벨">
                    <img alt="" className="mario-layer-4" src={img2} />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mario-layer-301"
              data-node-id="2712:12722"
              data-name="Item / Fire Flower Art"
            >
              <div
                className="mario-layer-302"
                data-node-id="2712:12723"
                data-name="Asset / 1345"
              >
                <div className="mario-layer-1">
                  <img alt="" className="mario-layer-303" src={imgAsset1345} />
                </div>
              </div>
            </div>
            <div
              className={`mario-layer-304 mario-powerup-card ${activePower === "fire" ? "is-active" : ""}`}
              data-node-id="2712:12724"
              data-name="Item / Fire Flower"
              onMouseEnter={() => hoverPower("fire")}
              onMouseLeave={() => setHoveredPower(null)}
            >
              <div className="mario-layer-305" data-node-id="2712:12725">
                <p className="mario-layer-287">FIRE</p>
                <p className="mario-layer-288">FLOWER</p>
              </div>
            </div>
            <div
              className={`mario-layer-306 mario-powerup-card ${activePower === "bubble" ? "is-active" : ""}`}
              data-node-id="2712:12726"
              data-name="Item / Bubble Flower"
              onMouseEnter={() => hoverPower("bubble")}
              onMouseLeave={() => setHoveredPower(null)}
            >
              <div className="mario-layer-307" data-node-id="2712:12727">
                <p className="mario-layer-287">BUBBLE</p>
                <p className="mario-layer-288">FLOWER</p>
              </div>
              <div className="mario-layer-308" data-node-id="2712:12728">
                <div className="mario-layer-309">
                  <div className="mario-layer-310" data-name="버블플라워">
                    <img alt="" className="mario-layer-4" src={img3} />
                  </div>
                </div>
              </div>
            </div>
            <p
              className="mario-layer-311"
              data-node-id="2712:12729"
              style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}
            >
              JUMP · MUSHROOM · PIPE
            </p>
            <p
              className="mario-layer-312"
              data-node-id="2712:12730"
              style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}
            >
              STAR · BLOCK
            </p>
            <p className="mario-layer-313" data-node-id="2712:12731">
              모험은 점프에서 시작된다 !
            </p>
            <div className="mario-layer-314" data-node-id="2712:12732">
              <p className="mario-layer-287">점프하며 펼쳐지는</p>
              <p className="mario-layer-288">새로운 모험!</p>
            </div>
            <div className="mario-layer-315" data-node-id="2712:12733">
              <div className="mario-layer-316">
                <div className="mario-layer-317" data-name="Asset / 1330">
                  <div className="mario-layer-1">
                    <img
                      alt=""
                      className="mario-layer-318"
                      src={imgAsset1330}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mario-layer-319" data-node-id="2712:12734">
              <div className="mario-layer-320">
                <div className="mario-layer-321" data-name="Asset / 1330 / 02">
                  <img alt="" className="mario-layer-4" src={imgAsset133002} />
                </div>
              </div>
            </div>
            <div className="mario-layer-322" data-node-id="2712:12735">
              <div className="mario-layer-323">
                <div className="mario-layer-324" data-name="Asset / 1332">
                  <img alt="" className="mario-layer-4" src={imgAsset1332} />
                </div>
              </div>
            </div>
            <div
              className="mario-layer-325"
              data-node-id="2712:12736"
              data-name="Asset / 1325"
            >
              <div className="mario-layer-1">
                <img alt="" className="mario-layer-326" src={imgAsset1325} />
              </div>
            </div>
            <div
              className="mario-layer-327"
              data-node-id="2712:12737"
              data-name="Decor / Star Cluster"
            >
              <div
                className="mario-layer-328"
                data-node-id="2712:12738"
                data-name="Asset / 1326"
              >
                <img alt="" className="mario-layer-4" src={imgAsset1326} />
              </div>
              <div className="mario-layer-329" data-node-id="2712:12739">
                <div className="mario-layer-68">
                  <div className="mario-layer-330" data-name="Asset / 1340">
                    <img alt="" className="mario-layer-4" src={imgAsset1326} />
                  </div>
                </div>
              </div>
              <div className="mario-layer-331" data-node-id="2712:12740">
                <div className="mario-layer-68">
                  <div className="mario-layer-332" data-name="Asset / 1337">
                    <img alt="" className="mario-layer-4" src={imgAsset1337} />
                  </div>
                </div>
              </div>
              <div
                className="mario-layer-333"
                data-node-id="2712:12741"
                data-name="Asset / 1338"
              >
                <img alt="" className="mario-layer-4" src={imgAsset1337} />
              </div>
              <div className="mario-layer-334" data-node-id="2712:12742">
                <div className="mario-layer-335">
                  <div className="mario-layer-336" data-name="Asset / 1339">
                    <img alt="" className="mario-layer-4" src={imgAsset1337} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mario-layer-337" data-node-id="2712:12743">
              <div className="mario-layer-68">
                <div className="mario-layer-338" data-name="Asset / 1335">
                  <div className="mario-layer-1">
                    <img
                      alt=""
                      className="mario-layer-339"
                      src={imgAsset1335}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mario-layer-340"
              data-node-id="2712:12744"
              data-name="Asset / 1337"
            >
              <div className="mario-layer-1">
                <img alt="" className="mario-layer-339" src={imgAsset1335} />
              </div>
            </div>
            <div
              className="mario-layer-341"
              data-node-id="2712:12745"
              data-name="Asset / 1336"
            >
              <img alt="" className="mario-layer-4" src={imgAsset1336} />
            </div>
            <div className="mario-layer-342" data-node-id="2712:12746">
              <div className="mario-layer-68">
                <div className="mario-layer-343" data-name="Asset / 1344">
                  <div className="mario-layer-1">
                    <img
                      alt=""
                      className="mario-layer-344"
                      src={imgAsset1344}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mario-layer-345"
              data-node-id="2712:12747"
              data-name="Label / Adventure"
            >
              <p className="mario-layer-346" data-node-id="2712:12748">
                ADVENTURE
              </p>
            </div>
            <div
              aria-hidden
              className="mario-powerup-hover-target mario-powerup-hover-target--drill"
              onMouseEnter={() => hoverPower("drill")}
              onMouseLeave={() => setHoveredPower(null)}
            />
            <div
              aria-hidden
              className="mario-powerup-hover-target mario-powerup-hover-target--elephant"
              onMouseEnter={() => hoverPower("elephant")}
              onMouseLeave={() => setHoveredPower(null)}
            />
            <div
              aria-hidden
              className="mario-powerup-hover-target mario-powerup-hover-target--cat"
              onMouseEnter={() => hoverPower("cat")}
              onMouseLeave={() => setHoveredPower(null)}
            />
            <div
              aria-hidden
              className="mario-powerup-hover-target mario-powerup-hover-target--fire-main"
              onMouseEnter={() => hoverPower("fire")}
              onMouseLeave={() => setHoveredPower(null)}
            />

            <div
              aria-hidden
              className="mario-powerup-hover-target mario-powerup-hover-target--bubble"
              onMouseEnter={() => hoverPower("bubble")}
              onMouseLeave={() => setHoveredPower(null)}
            />
          </section>
        </div>
        <section
          id="mario-games"
          className="mario-scene mario-games"
          aria-label="games"
        >
          <div aria-hidden className="mario-layer-276">
            <div className="mario-layer-347">
              <img
                alt=""
                className="mario-layer-348"
                src={imgCon4NintendoSwitch2Enhancement}
              />
            </div>
            <div className="mario-layer-349" />
          </div>
          <div className="mario-layer-350" data-node-id="2712:13076">
            <div
              className="mario-layer-351"
              data-node-id="2712:13077"
              data-name="Logo / Nintendo Switch 2"
            >
              <img
                alt=""
                className="mario-layer-44"
                src={imgLogoNintendoSwitch2}
              />
            </div>
            <div className="mario-layer-352" data-node-id="2712:13078">
              <p className="mario-layer-353">Nintendo Store에서</p>
              <p className="mario-layer-354">새로운 게임을 만나보세요</p>
            </div>
            <div className="mario-layer-355" data-node-id="2712:13079">
              <p className="mario-layer-356">
                다양한 Nintendo 게임을 만나보세요.
              </p>
              <p className="mario-layer-356">
                인기 타이틀과 신작을 한눈에 확인하고,
              </p>
              <p className="mario-layer-357">
                취향에 맞는 게임을 찾아 즐겨보세요.
              </p>
            </div>
            <p className="mario-layer-358" data-node-id="2712:13080">
              ※ 일부 상품은 별도 구매가 필요합니다.
            </p>
            <p className="mario-layer-359" data-node-id="2712:13081">
              ※ 자세한 상품 정보는 Nintendo Store에서 확인해 주세요.
            </p>
            <button
              type="button"
              className="mario-layer-360"
              data-node-id="2712:13082"
              data-name="CTA / View Details / Arrow"
              aria-label="Nintendo Store 보기"
              onClick={() => navigate("/store")}
            >
              <div
                className="mario-layer-361"
                data-node-id="2712:13083"
                data-name="Group / 82"
              >
                <p className="mario-layer-362" data-node-id="2712:13084">
                  자세한 내용은 이쪽에서
                </p>
                <div
                  className="mario-layer-363"
                  data-node-id="2712:13085"
                  data-name="CTA / Arrow Background"
                />
              </div>
              <div
                className="mario-layer-364"
                data-node-id="2712:13086"
                data-name="CTA / Arrow Icon"
              >
                <div className="mario-layer-365">
                  <img
                    alt=""
                    className="mario-layer-26"
                    src={imgCtaArrowIcon}
                  />
                </div>
              </div>
            </button>
            <div
              className="mario-layer-366"
              data-node-id="2712:13087"
              data-name="Media / TV Display"
            >
              <div
                className="mario-layer-367"
                data-node-id="2712:13088"
                data-name="Device / TV Frame"
              >
                <div className="mario-layer-1">
                  <img
                    alt=""
                    className="mario-layer-368"
                    src={imgDeviceTvFrame}
                  />
                </div>
              </div>
              <div
                className="mario-layer-369"
                data-node-id="2712:13089"
                data-name="Media / Gameplay Video"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Super Mario 3D World gameplay"
                >
                  <source
                    src="/videos/mario/con4-tv-gameplay.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
            <div
              className="mario-layer-370"
              data-node-id="2712:13090"
              data-name="Device / Nintendo Switch 2 Console"
            >
              <div className="mario-layer-1">
                <img
                  alt=""
                  className="mario-layer-371"
                  src={imgDeviceNintendoSwitch2Console}
                />
              </div>
            </div>
            <div className="mario-layer-372" data-node-id="2712:13091">
              <div className="mario-layer-68">
                <div
                  className="mario-layer-373"
                  data-name="Character Art / Mario"
                >
                  <div className="mario-layer-1">
                    <img
                      alt=""
                      className="mario-layer-374"
                      src={imgCharacterArtMario}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mario-layer-375"
              data-node-id="2712:13092"
              data-name="Heading Accent / Nintendo Red"
            />
            <div className="mario-layer-376" data-node-id="2712:13093">
              <div className="mario-layer-68">
                <div
                  className="mario-layer-377"
                  data-name="Decor / Coin / Bottom"
                >
                  <img
                    alt=""
                    className="mario-layer-4"
                    src={imgDecorCharacter02}
                  />
                </div>
              </div>
            </div>
            <div className="mario-layer-378" data-node-id="2712:13094">
              <div className="mario-layer-68">
                <div
                  className="mario-layer-379"
                  data-name="Decor / Coin / Middle"
                >
                  <img
                    alt=""
                    className="mario-layer-4"
                    src={imgDecorCharacter02}
                  />
                </div>
              </div>
            </div>
            <div className="mario-layer-380" data-node-id="2712:13095">
              <div className="mario-layer-68">
                <div className="mario-layer-381" data-name="Decor / Coin / Top">
                  <img
                    alt=""
                    className="mario-layer-4"
                    src={imgDecorCharacter02}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <dialog
        className="mario-character-dialog"
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        aria-labelledby="mario-dialog-title"
      >
        {selected !== null && (
          <>
            <button
              type="button"
              className="mario-dialog-close"
              aria-label="소개 닫기"
              onClick={() => dialogRef.current.close()}
            >
              ×
            </button>
            <img
              src={characters[selected].image}
              alt={characters[selected].name}
              width="124"
              height="120"
            />
            <h2 id="mario-dialog-title">{characters[selected].name}</h2>
            <p>{characters[selected].description}</p>
            <div className="mario-dialog-controls">
              <button
                type="button"
                onClick={() => setSelected((selected + 5) % 6)}
              >
                ← 이전
              </button>
              <button
                type="button"
                onClick={() => setSelected((selected + 1) % 6)}
              >
                다음 →
              </button>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
