import { useCallback, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import './HeroDiscoveryTransition.css';

const SCROLL_START = 0.8;

export default function useHeroDiscoveryTransition(containerRef) {
  const overlayRef = useRef(null);
  const timelineRef = useRef(null);
  const sequenceRef = useRef(null);
  const reverseOverflowRef = useRef(null);
  const phaseRef = useRef('hero');
  const lastScrollYRef = useRef(window.scrollY);

  const bootConsole = useCallback(() => {
    if (phaseRef.current !== 'blackout') return;
    phaseRef.current = 'bootingConsole';
    const { overlay, consoleElement, screen, screenContent, selectedInfo, caption, finish } = sequenceRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }
    const timeline = gsap.timeline({ onComplete: finish });
    timelineRef.current = timeline;
    timeline
      .to(overlay, { autoAlpha: 0, duration: 0.46, ease: 'power2.out' })
      .to(consoleElement, { autoAlpha: 1, scale: 1, duration: 0.46, ease: 'power2.out' }, '<')
      .to({}, { duration: 0.18 })
      .to(screen, { backgroundColor: '#fff', duration: 0.2, ease: 'power1.out' })
      .to(screenContent, { autoAlpha: 1, duration: 0.3, stagger: 0.045, ease: 'power2.out' });
    if (selectedInfo) timeline.to(selectedInfo, { autoAlpha: 1, duration: 0.22 }, '<');
    if (caption) timeline.to(caption, { autoAlpha: 1, y: 0, duration: 0.32, ease: 'power2.out' }, '-=0.08');
    timeline.to({}, { duration: 0.28 });
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
      phaseRef.current = 'completed';
      sequenceRef.current = null;
      timelineRef.current = null;
    };
    sequenceRef.current = { overlay, consoleElement, screen, screenContent, selectedInfo, caption, finish, oldOverflow };

    discovery.classList.add('home-discovery--booting');
    gsap.set(overlay, { autoAlpha: 1, yPercent: 0 });
    gsap.set(consoleElement, { autoAlpha: 0, scale: 0.97, transformOrigin: 'center center' });
    gsap.set(screen, { backgroundColor: '#151515' });
    gsap.set([...screenContent, selectedInfo, caption].filter(Boolean), { autoAlpha: 0 });
    if (caption) gsap.set(caption, { y: 12 });
    window.scrollTo(0, window.scrollY + discovery.getBoundingClientRect().top);

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
    gsap.killTweensOf(window);
    window.scrollTo(0, window.scrollY + top);
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
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishReverseBoot();
      return;
    }
    const timeline = gsap.timeline({ onComplete: finishReverseBoot });
    timelineRef.current = timeline;
    timeline
      .to(content, { autoAlpha: 0, duration: 0.2, stagger: 0.02, ease: 'power1.in' })
      .to(screen, { backgroundColor: '#151515', duration: 0.18 }, '<')
      .to(consoleElement, { autoAlpha: 0, scale: 0.97, duration: 0.32, ease: 'power2.in' }, '+=0.04')
      .to(overlay, { autoAlpha: 1, duration: 0.28, ease: 'power2.inOut' }, '-=0.18');
  }, []);

  useLayoutEffect(() => {
    const onScroll = () => {
      const movingDown = window.scrollY > lastScrollYRef.current;
      lastScrollYRef.current = window.scrollY;
      if (!['hero', 'scrollingPanel', 'completed', 'reversingPanel'].includes(phaseRef.current)) return;
      if (document.querySelector('.nintendo-intro, dialog[open]')) return;
      const discovery = containerRef.current?.querySelector('.home-discovery, .home-discovery-mobile');
      if (!discovery) return;
      const top = discovery.getBoundingClientRect().top;
      const startDistance = window.innerHeight * SCROLL_START;
      if (phaseRef.current === 'completed') {
        if (!movingDown && top > 0 && top <= startDistance) startReverse(discovery, top);
        return;
      }
      if (phaseRef.current === 'hero') {
        if (!movingDown || top > startDistance || top <= 0) return;
        phaseRef.current = 'scrollingPanel';
        gsap.set(overlayRef.current, { autoAlpha: 1, yPercent: 100 });
      }
      const progress = Math.max(0, Math.min(1, (startDistance - top) / startDistance));
      if (progress === 0) {
        gsap.set(overlayRef.current, { autoAlpha: 0, yPercent: 100 });
        discovery.classList.remove('home-discovery--booting');
        phaseRef.current = 'hero';
      } else {
        gsap.set(overlayRef.current, { yPercent: 100 * (1 - progress) });
        if (progress === 1) completePanel();
      }
    };
    const onWheel = event => {
      if (!['blackout', 'bootingConsole', 'reversingConsole'].includes(phaseRef.current)) return;
      if (event.ctrlKey || event.metaKey) return;
      event.preventDefault();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { capture: true, passive: false });
    return () => {
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
