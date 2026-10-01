import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DiscoveryNewsDepthTransition.css';

gsap.registerPlugin(ScrollTrigger);

const clamp01 = value => Math.min(1, Math.max(0, value));

function updateDotVisual(discovery, progress, mobile, dotLayerRef) {
  // Clone the live section only when the depth transition starts, so the dots
  // retain the currently selected game's images and colors.
  if (progress > 0 && !dotLayerRef.current) {
    const layer = document.createElement('div');
    layer.className = 'home-discovery__dot-layer';
    layer.setAttribute('aria-hidden', 'true');
    layer.inert = true;
    for (const child of [...discovery.children]) {
      const copy = child.cloneNode(true);
      copy.removeAttribute('id');
      copy.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
      layer.append(copy);
    }
    discovery.append(layer);
    discovery.classList.add('home-discovery--dot-active');
    dotLayerRef.current = layer;
  }

  const conversion = clamp01((progress - 0.2) / 0.38);
  const retreat = clamp01((progress - 0.72) / 0.28);
  discovery.style.setProperty('--home-dot-source-opacity', String(1 - conversion));
  discovery.style.setProperty('--home-dot-opacity', String(conversion * (1 - retreat)));
  discovery.style.setProperty('--home-dot-radius', `${(mobile ? 1.9 : 2.65) * (1 - 0.78 * retreat)}px`);

  if (progress === 0 && dotLayerRef.current) {
    dotLayerRef.current.remove();
    dotLayerRef.current = null;
    discovery.classList.remove('home-discovery--dot-active');
  }
}

function clearDotVisual(discovery, dotLayerRef) {
  dotLayerRef.current?.remove();
  dotLayerRef.current = null;
  if (discovery.classList.contains('home-discovery--dot-active')) {
    discovery.classList.remove('home-discovery--dot-active');
  }
  discovery.style.removeProperty('--home-dot-source-opacity');
  discovery.style.removeProperty('--home-dot-opacity');
  discovery.style.removeProperty('--home-dot-radius');
}

export default function useDiscoveryNewsDepthTransition(containerRef, mobile) {
  useLayoutEffect(() => {
    const canvas = containerRef.current?.querySelector('.home-page__canvas');
    const discovery = canvas?.querySelector('.home-discovery, .home-discovery-mobile');
    const news = canvas?.querySelector('.home-news, .home-news-mobile');
    if (!canvas || !discovery || !news) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let context;
      let scheduledFrame;
      let wasReady;
      const dotLayerRef = { current: null };
      const ready = () => discovery.dataset.transitionReady === 'true'
        && !discovery.classList.contains('home-discovery--booting');
      const createTrigger = () => {
        scheduledFrame = undefined;
        if (context || !ready()) return;
        context = gsap.context(() => {
          gsap.timeline({
            scrollTrigger: {
              trigger: discovery,
              start: 'top top',
              end: () => `+=${Math.max(window.innerHeight, discovery.getBoundingClientRect().height)}`,
              pin: discovery,
              pinSpacing: false,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: self => {
                if (self.progress > 0) discovery.dataset.depthActive = 'true';
                else delete discovery.dataset.depthActive;
                updateDotVisual(discovery, self.progress, mobile, dotLayerRef);
              },
            },
          }).to(discovery, {
            scale: 0.88,
            y: -36,
            ease: 'none',
            transformOrigin: 'center center',
          });
        }, canvas);
      };
      const update = () => {
        const isReady = ready();
        if (isReady === wasReady) return;
        wasReady = isReady;
        if (!isReady) {
          if (scheduledFrame !== undefined) cancelAnimationFrame(scheduledFrame);
          scheduledFrame = undefined;
          if (context) {
            context.revert();
            context = undefined;
          }
          clearDotVisual(discovery, dotLayerRef);
          delete discovery.dataset.depthActive;
        } else if (!context && scheduledFrame === undefined) {
          scheduledFrame = requestAnimationFrame(createTrigger);
        }
      };
      const observer = new MutationObserver(update);
      observer.observe(discovery, { attributes: true, attributeFilter: ['class', 'data-transition-ready'] });
      update();
      return () => {
        observer.disconnect();
        if (scheduledFrame !== undefined) cancelAnimationFrame(scheduledFrame);
        context?.revert();
        clearDotVisual(discovery, dotLayerRef);
        delete discovery.dataset.depthActive;
      };
    });

    return () => media.revert();
  }, [containerRef, mobile]);
}
