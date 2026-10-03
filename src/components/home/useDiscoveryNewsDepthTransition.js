import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DiscoveryNewsDepthTransition.css';

gsap.registerPlugin(ScrollTrigger);

const clamp01 = value => Math.min(1, Math.max(0, value));
const smoothstep = value => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};

function updateDotVisual(discovery, news, progress, mobile, dotLayerRef) {
  // Clone the live section only when the depth transition starts, so the dots
  // retain the currently selected game's images and colors.
  if (progress > 0 && !dotLayerRef.current) {
    const layer = document.createElement('div');
    layer.className = 'home-discovery__dot-layer';
    layer.setAttribute('aria-hidden', 'true');
    layer.inert = true;
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    filter.classList.add('home-discovery__dot-filter');
    filter.setAttribute('aria-hidden', 'true');
    filter.innerHTML = '<filter id="home-discovery-dot-luma" color-interpolation-filters="sRGB"><feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0.1169 0.3934 0.0396 0 0.45" result="tone"/><feComposite in="tone" in2="SourceGraphic" operator="in"/></filter>';
    layer.append(filter);
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

  const conversion = smoothstep((progress - 0.18) / 0.4);
  const retreat = smoothstep((progress - 0.85) / 0.15);
  const backgroundReveal = mobile ? 0 : smoothstep((progress - 0.35) / 0.25);
  discovery.style.setProperty('--home-dot-source-opacity', String(1 - conversion));
  discovery.style.setProperty('--home-dot-opacity', String(conversion * (1 - retreat)));
  discovery.style.setProperty('--home-dot-radius', `${(mobile ? 0.9 : 1.05) * (1 - 0.72 * retreat)}px`);
  discovery.style.setProperty('--home-dot-gap-opacity', String((1 - 0.22 * conversion) * (1 - backgroundReveal)));
  if (!mobile) {
    discovery.style.setProperty('--home-dark-limit', `${Math.min(1 - progress, 1 - backgroundReveal) * 100}%`);
    discovery.style.setProperty('--home-edge-size', `${280 * smoothstep((progress - 0.1) / 0.25)}px`);
    const newsEdge = 140 * smoothstep(progress / 0.25) * (1 - smoothstep((progress - 0.82) / 0.18));
    news.style.setProperty('--home-news-edge-softness', `${newsEdge}px`);
    news.style.setProperty('--home-news-cover-opacity', String(1 - 0.78 * smoothstep((progress - 0.5) / 0.12)));
    news.classList.toggle('home-news--soft-overlap', progress > 0 && progress < 1);
  }

  if (progress === 0 && dotLayerRef.current) {
    dotLayerRef.current.remove();
    dotLayerRef.current = null;
    discovery.classList.remove('home-discovery--dot-active');
  }
}

function clearDotVisual(discovery, news, dotLayerRef) {
  dotLayerRef.current?.remove();
  dotLayerRef.current = null;
  if (discovery.classList.contains('home-discovery--dot-active')) {
    discovery.classList.remove('home-discovery--dot-active');
  }
  discovery.style.removeProperty('--home-dot-source-opacity');
  discovery.style.removeProperty('--home-dot-opacity');
  discovery.style.removeProperty('--home-dot-radius');
  discovery.style.removeProperty('--home-dot-gap-opacity');
  discovery.style.removeProperty('--home-dark-limit');
  discovery.style.removeProperty('--home-edge-size');
  news.classList.remove('home-news--soft-overlap');
  news.style.removeProperty('--home-news-edge-softness');
  news.style.removeProperty('--home-news-cover-opacity');
}

export default function useDiscoveryNewsDepthTransition(containerRef, mobile) {
  useLayoutEffect(() => {
    if (mobile) return;
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
          const setY = gsap.quickSetter(discovery, 'y', 'px');
          const updatePin = self => {
            const zoom = Number.parseFloat(getComputedStyle(canvas).zoom) || 1;
            const travel = Math.max(0, Math.min(self.end - self.start, self.scroll() - self.start));
            // Keep design-sized sections in their zoomed canvas. Fixed pinning
            // otherwise applies CSS zoom twice to viewport-sized pin bounds.
            setY(travel / zoom - 36 * self.progress);
          };
          gsap.timeline({
            scrollTrigger: {
              trigger: discovery,
              start: 'top top',
              end: () => `+=${Math.max(window.innerHeight, discovery.getBoundingClientRect().height)}`,
              pin: discovery,
              pinType: 'transform',
              pinSpacing: false,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: updatePin,
              onUpdate: self => {
                updatePin(self);
                // CSS zoom produces fractional section boundaries, while the
                // browser rounds scrollY. That rounding must not bypass cards.
                const progress = self.scroll() <= self.start + 1 ? 0 : self.progress;
                if (progress > 0) discovery.dataset.depthActive = 'true';
                else delete discovery.dataset.depthActive;
                updateDotVisual(discovery, news, progress, mobile, dotLayerRef);
              },
            },
          }).to(discovery, {
            scale: 0.88,
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
          clearDotVisual(discovery, news, dotLayerRef);
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
        clearDotVisual(discovery, news, dotLayerRef);
        delete discovery.dataset.depthActive;
      };
    });

    return () => media.revert();
  }, [containerRef, mobile]);
}
