import { useCallback, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './HeroDiscoveryTransition.css';

gsap.registerPlugin(ScrollToPlugin);
const SCROLL_START = 0.8;

function createConsoleTimeline({ overlay, consoleElement, screen, screenContent, selectedInfo, caption }) {
  const timeline = gsap.timeline({ paused: true });
  timeline
    .fromTo(overlay, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.46, ease: 'power2.out', immediateRender: false })
    .fromTo(consoleElement, { autoAlpha: 0, scale: 0.97 }, { autoAlpha: 1, scale: 1, duration: 0.46, ease: 'power2.out', immediateRender: false }, '<')
    .to({}, { duration: 0.18 })
    .fromTo(screen, { backgroundColor: '#151515' }, { backgroundColor: '#fff', duration: 0.2, ease: 'power1.out', immediateRender: false })
    .fromTo(screenContent, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, stagger: 0.045, ease: 'power2.out', immediateRender: false });
  if (selectedInfo) timeline.fromTo(selectedInfo, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22, immediateRender: false }, '<');
  if (caption) timeline.fromTo(caption, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.32, ease: 'power2.out', immediateRender: false }, '-=0.08');
  return timeline;
}

export default function useHeroDiscoveryTransition(containerRef) {
  const overlayRef = useRef(null);
  const timelineRef = useRef(null);
  const sequenceRef = useRef(null);
  const reverseOverflowRef = useRef(null);
  const phaseRef = useRef('hero');
  const discoveryScrollYRef = useRef(null);
  const reverseForwardIntentRef = useRef(false);
  const pendingReverseScrollRef = useRef(0);
  const lastScrollYRef = useRef(window.scrollY);

  const bootConsole = useCallback(() => {
    if (phaseRef.current !== 'blackout') return;
    phaseRef.current = 'bootingConsole';
    const { finish } = sequenceRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }
    const timeline = createConsoleTimeline(sequenceRef.current);
    timelineRef.current = timeline;
    timeline.eventCallback('onComplete', finish).play();
  }, []);

  const completePanel = useCallback(() => {
    if (!['scrollingPanel', 'animatingPanel', 'reversingPanel'].includes(phaseRef.current)) return;
    phaseRef.current = 'blackout';
    gsap.killTweensOf(window);
    const discovery = containerRef.current?.querySelector('.home-discovery, .home-discovery-mobile');
    const overlay = overlayRef.current;
    if (!discovery || !overlay) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const consoleElement = discovery.querySelector('.home-discovery__game-discovery-console, .home-discovery-mobile__layer-7');
    const screen = discovery.querySelector('.home-discovery__game-carousel-viewport, .home-discovery-mobile__layer-8');
    const screenContent = screen ? [...screen.children] : [];
    const selectedInfo = discovery.querySelector('.home-discovery__game-selected-info');
    const caption = discovery.querySelector('.home-discovery__layer-3, .home-discovery-mobile__layer-3');

    const finish = () => {
      discovery.classList.remove('home-discovery--booting');
      gsap.set([consoleElement, screen, ...screenContent, selectedInfo, caption].filter(Boolean), { clearProps: 'all' });
      gsap.set(overlay, { autoAlpha: 0, yPercent: 100 });
      document.body.style.overflow = oldOverflow;
      discovery.dataset.transitionReady = 'true';
      phaseRef.current = 'completed';
      sequenceRef.current = null;
      timelineRef.current = null;
    };
    sequenceRef.current = { overlay, consoleElement, screen, screenContent, selectedInfo, caption, finish, oldOverflow };

    discovery.classList.add('home-discovery--booting');
    delete discovery.dataset.transitionReady;
    gsap.set(overlay, { autoAlpha: 1, yPercent: 0 });
    gsap.set(consoleElement, { autoAlpha: 0, scale: 0.97, transformOrigin: 'center center' });
    gsap.set(screen, { backgroundColor: '#151515' });
    gsap.set([...screenContent, selectedInfo, caption].filter(Boolean), { autoAlpha: 0 });
    if (caption) gsap.set(caption, { y: 12 });
    window.scrollTo(0, window.scrollY + discovery.getBoundingClientRect().top);
    discoveryScrollYRef.current = window.scrollY;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      bootConsole();
      return;
    }
    const timeline = gsap.timeline();
    timelineRef.current = timeline;
    timeline.to({}, { duration: 0.18 }).call(bootConsole);
  }, [containerRef, bootConsole]);

  const start = useCallback(() => {
    if (phaseRef.current !== 'hero' || document.querySelector('.nintendo-intro, dialog[open]')) return;
    if (!containerRef.current?.querySelector('.home-discovery, .home-discovery-mobile')) return;
    phaseRef.current = 'animatingPanel';
    const overlay = overlayRef.current;
    gsap.set(overlay, { autoAlpha: 1, yPercent: 100 });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      completePanel();
      return;
    }
    timelineRef.current = gsap.to(overlay, {
      yPercent: 0,
      duration: 0.9,
      ease: 'power2.inOut',
      onComplete: completePanel,
    });
  }, [containerRef, completePanel]);

  const startReverse = useCallback((discovery, top) => {
    if (phaseRef.current !== 'completed') return;
    phaseRef.current = 'reversingConsole';
    reverseForwardIntentRef.current = false;
    pendingReverseScrollRef.current = 0;
    delete discovery.dataset.transitionReady;
    gsap.killTweensOf(window);
    window.scrollTo(0, discoveryScrollYRef.current ?? window.scrollY + top);
    reverseOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const overlay = overlayRef.current;
    const consoleElement = discovery.querySelector('.home-discovery__game-discovery-console, .home-discovery-mobile__layer-7');
    const screen = discovery.querySelector('.home-discovery__game-carousel-viewport, .home-discovery-mobile__layer-8');
    const screenContent = screen ? [...screen.children] : [];
    const selectedInfo = discovery.querySelector('.home-discovery__game-selected-info');
    const caption = discovery.querySelector('.home-discovery__layer-3, .home-discovery-mobile__layer-3');
    const content = [...screenContent, selectedInfo, caption].filter(Boolean);
    gsap.set(overlay, { autoAlpha: 0, yPercent: 0 });

    const finishReverseBoot = () => {
      gsap.set(content, { clearProps: 'opacity,visibility' });
      gsap.set(screen, { clearProps: 'backgroundColor' });
      gsap.set(consoleElement, { clearProps: 'opacity,visibility,transform' });
      discovery.classList.add('home-discovery--booting');
      gsap.set(overlay, { autoAlpha: 1, yPercent: 0 });
      document.body.style.overflow = reverseOverflowRef.current;
      reverseOverflowRef.current = null;
      phaseRef.current = 'reversingPanel';
      timelineRef.current = null;
      const pendingScroll = pendingReverseScrollRef.current;
      pendingReverseScrollRef.current = 0;
      if (pendingScroll) {
        timelineRef.current = gsap.to(window, {
          scrollTo: { y: Math.max(0, window.scrollY + pendingScroll), autoKill: true },
          duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.45,
          ease: 'power2.out',
          overwrite: true,
        });
      }
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishReverseBoot();
      return;
    }
    const timeline = createConsoleTimeline({ overlay, consoleElement, screen, screenContent, selectedInfo, caption });
    timelineRef.current = timeline;
    timeline.progress(1, true).eventCallback('onReverseComplete', finishReverseBoot).reverse();
  }, []);

  useLayoutEffect(() => {
    const restoreAtDiscovery = () => {
      if (phaseRef.current !== 'hero' || document.querySelector('.nintendo-intro, dialog[open]')) return;
      const discovery = containerRef.current?.querySelector('.home-discovery, .home-discovery-mobile');
      if (!discovery) return;
      const top = discovery.getBoundingClientRect().top;
      if (top > 0) return;
      discoveryScrollYRef.current = window.scrollY + top;
      discovery.dataset.transitionReady = 'true';
      phaseRef.current = 'completed';
    };
    const onScroll = () => {
      const movingDown = window.scrollY > lastScrollYRef.current;
      lastScrollYRef.current = window.scrollY;
      if (!['hero', 'scrollingPanel', 'completed', 'reversingPanel'].includes(phaseRef.current)) return;
      if (document.querySelector('.nintendo-intro, dialog[open]')) return;
      restoreAtDiscovery();
      const discovery = containerRef.current?.querySelector('.home-discovery, .home-discovery-mobile');
      if (!discovery) return;
      const top = discovery.getBoundingClientRect().top;
      const startDistance = window.innerHeight * SCROLL_START;
      if (phaseRef.current === 'completed') {
        const anchor = discovery.parentElement.classList.contains('pin-spacer') ? discovery.parentElement : discovery;
        discoveryScrollYRef.current = window.scrollY + anchor.getBoundingClientRect().top;
        const distanceAboveDiscovery = (discoveryScrollYRef.current ?? window.scrollY) - window.scrollY;
        if (!movingDown && distanceAboveDiscovery > 1 && distanceAboveDiscovery <= startDistance) {
          if (Number(discovery.dataset.scrollPosition) > 0) {
            gsap.killTweensOf(window);
            window.scrollTo(0, discoveryScrollYRef.current);
          } else startReverse(discovery, top);
        }
        return;
      }
      if (phaseRef.current === 'hero') {
        if (!movingDown || top > startDistance || top <= 0) return;
        phaseRef.current = 'scrollingPanel';
        gsap.set(overlayRef.current, { autoAlpha: 1, yPercent: 100 });
      }
      const progress = top >= startDistance - 1 ? 0 : top <= 1 ? 1
        : (startDistance - top) / startDistance;
      if (progress === 0) {
        gsap.set(overlayRef.current, { autoAlpha: 0, yPercent: 100 });
        discovery.classList.remove('home-discovery--booting');
        phaseRef.current = 'hero';
      } else {
        gsap.set(overlayRef.current, { yPercent: 100 * (1 - progress) });
        const returningToDiscovery = phaseRef.current === 'reversingPanel' && movingDown
          && (reverseForwardIntentRef.current || top < -window.innerHeight * 0.15);
        if (progress === 1 && (phaseRef.current === 'scrollingPanel' || returningToDiscovery)) completePanel();
      }
    };
    const onWheel = event => {
      restoreAtDiscovery();
      if (['reversingPanel', 'reversingConsole'].includes(phaseRef.current) && !event.ctrlKey && !event.metaKey && event.deltaY) {
        reverseForwardIntentRef.current = event.deltaY > 0;
        if (phaseRef.current === 'reversingConsole') {
          const multiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16
            : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1;
          const limit = Math.ceil(window.innerHeight * SCROLL_START);
          pendingReverseScrollRef.current = Math.max(-limit, Math.min(limit,
            pendingReverseScrollRef.current + event.deltaY * multiplier));
        }
      }
      if (!['blackout', 'bootingConsole', 'reversingConsole'].includes(phaseRef.current)) return;
      if (event.ctrlKey || event.metaKey) return;
      event.preventDefault();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { capture: true, passive: false });
    const introObserver = new MutationObserver(() => {
      if (document.querySelector('.nintendo-intro')) return;
      restoreAtDiscovery();
      introObserver.disconnect();
    });
    if (document.querySelector('.nintendo-intro')) introObserver.observe(document.body, { childList: true, subtree: true });
    else restoreAtDiscovery();
    return () => {
      introObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel, true);
      timelineRef.current?.kill();
      if (sequenceRef.current) document.body.style.overflow = sequenceRef.current.oldOverflow;
      if (reverseOverflowRef.current !== null) document.body.style.overflow = reverseOverflowRef.current;
    };
  }, [containerRef, completePanel, startReverse]);

  const overlay = createPortal(
    <div className="home-transition" ref={overlayRef} aria-hidden="true" />,
    document.body,
  );
  return { start, overlay };
}
