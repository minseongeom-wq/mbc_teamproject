import { useCallback, useEffect, useRef } from 'react';

export default function useCartAddAnimation(cartButtonRef) {
  const animations = useRef(new Set());

  useEffect(() => {
    const clear = () => {
      for (const animation of animations.current) animation.cancel();
      animations.current.clear();
    };
    window.addEventListener('resize', clear);
    return () => {
      window.removeEventListener('resize', clear);
      clear();
    };
  }, []);

  return useCallback((source) => {
    const button = cartButtonRef.current;
    const image = source?.querySelector('img');
    if (!button || !image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const from = source.getBoundingClientRect();
    const to = button.getBoundingClientRect();
    const start = { x: from.left + from.width / 2, y: from.top + from.height / 2 };
    const end = { x: to.left + to.width / 2, y: to.top + to.height / 2 };
    const control = { x: (start.x + end.x) / 2, y: Math.min(start.y, end.y) - Math.min(200, window.innerHeight * .25) };
    const floating = document.createElement('img');
    floating.className = 'store-cart-flying-image';
    floating.src = image.currentSrc || image.src;
    floating.alt = '';
    floating.setAttribute('aria-hidden', 'true');
    document.body.appendChild(floating);

    const frames = Array.from({ length: 31 }, (_, index) => {
      const t = index / 30;
      const inverse = 1 - t;
      const x = inverse * inverse * start.x + 2 * inverse * t * control.x + t * t * end.x;
      const y = inverse * inverse * start.y + 2 * inverse * t * control.y + t * t * end.y;
      return {
        offset: t,
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${1 - .65 * t})`,
        opacity: .8 * (t < .65 ? 1 : (1 - t) / .35),
      };
    });

    const track = (animation, cleanup = () => {}) => {
      animations.current.add(animation);
      const release = () => {
        animations.current.delete(animation);
        cleanup();
      };
      animation.oncancel = release;
      return release;
    };
    const flight = floating.animate(frames, { duration: 700 / 1.1, easing: 'cubic-bezier(.42, 0, 1, 1)', fill: 'both' });
    const release = track(flight, () => floating.remove());
    flight.onfinish = () => {
      release();
      if (!button.isConnected) return;
      for (const element of [button, button.querySelector('.store-cart-button__count')]) {
        if (!element) continue;
        for (const previous of element.getAnimations()) previous.cancel();
        const bounce = element.animate([
          { transform: 'translateY(0) scale(1)' },
          { transform: 'translateY(-6px) scale(1.1)', offset: .4 },
          { transform: 'translateY(0) scale(1)' },
        ], { duration: 320, easing: 'ease-out' });
        bounce.onfinish = track(bounce);
      }
    };
  }, [cartButtonRef]);
}
