import { useEffect, useRef, useState } from 'react';

const STEP_COOLDOWN = 180;

const getOrder = (mobile, mode) => mode === 'together'
  ? [1, 3, 4].filter(index => !mobile || index !== 4)
  : mobile ? [1, 2, 3, 1] : [0, 1, 2, 3, 4, 0, 1];

export default function useDiscoveryScroll({ mobile, mode, onSelect }) {
  const sectionRef = useRef(null);
  const positionRef = useRef(mobile ? 1 : 2);
  const completedRef = useRef(false);
  const lastStepRef = useRef(0);
  const wheelAmountRef = useRef(0);
  const touchYRef = useRef(null);
  const [position, setPosition] = useState(positionRef.current);

  const select = (index, visualPosition) => {
    const order = getOrder(mobile, mode);
    const nextPosition = visualPosition ?? order.indexOf(index);
    if (nextPosition >= 0) {
      positionRef.current = nextPosition;
      setPosition(nextPosition);
    }
    onSelect(index);
  };

  const reset = (nextMode, index) => {
    const nextPosition = getOrder(mobile, nextMode).indexOf(index);
    positionRef.current = Math.max(0, nextPosition);
    setPosition(positionRef.current);
    completedRef.current = false;
    wheelAmountRef.current = 0;
    lastStepRef.current = 0;
  };

  useEffect(() => {
    const section = sectionRef.current;
    const order = getOrder(mobile, mode);
    const ready = () => {
      if (!section || section.dataset.transitionReady !== 'true' || section.dataset.depthActive === 'true' || section.classList.contains('home-discovery--booting') || document.querySelector('.nintendo-intro, dialog[open]')) return false;
      const rect = section.getBoundingClientRect();
      // The depth effect can move the pinned section slightly below the viewport top.
      return rect.top >= -window.innerHeight * 0.15
        && rect.top <= window.innerHeight * 0.2
        && rect.bottom >= window.innerHeight * 0.6;
    };
    const advance = direction => {
      const current = positionRef.current;
      if (direction < 0 && current === 0) return false;
      if (direction > 0 && completedRef.current) return false;
      if (direction > 0 && current === order.length - 1) return false;
      const next = current + direction;
      positionRef.current = next;
      setPosition(next);
      onSelect(order[next]);
      lastStepRef.current = performance.now();
      return true;
    };
    const onWheel = event => {
      if (!ready() || event.defaultPrevented || event.ctrlKey || event.metaKey || !event.deltaY) return;
      if (completedRef.current && event.deltaY > 0) return;
      if (positionRef.current === 0 && event.deltaY < 0) return;
      if (positionRef.current === order.length - 1 && event.deltaY > 0) {
        if (performance.now() - lastStepRef.current < STEP_COOLDOWN) event.preventDefault();
        else completedRef.current = true;
        return;
      }
      event.preventDefault();
      if (Math.sign(wheelAmountRef.current) !== Math.sign(event.deltaY)) wheelAmountRef.current = 0;
      wheelAmountRef.current += event.deltaY;
      if (Math.abs(wheelAmountRef.current) < 80 || performance.now() - lastStepRef.current < STEP_COOLDOWN) return;
      const direction = Math.sign(wheelAmountRef.current);
      wheelAmountRef.current = 0;
      advance(direction);
    };
    const onTouchStart = event => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };
    const onTouchMove = event => {
      if (!ready() || touchYRef.current === null) return;
      const delta = touchYRef.current - event.touches[0].clientY;
      if (delta > 0 && positionRef.current === order.length - 1 && performance.now() - lastStepRef.current >= STEP_COOLDOWN) {
        completedRef.current = true;
        return;
      }
      if ((delta > 0 && !completedRef.current) || (delta < 0 && positionRef.current > 0)) event.preventDefault();
    };
    const onTouchEnd = event => {
      const startY = touchYRef.current;
      touchYRef.current = null;
      if (!ready() || startY === null || completedRef.current) return;
      const delta = startY - event.changedTouches[0].clientY;
      if (Math.abs(delta) < 45 || performance.now() - lastStepRef.current < STEP_COOLDOWN) return;
      advance(Math.sign(delta));
    };
    window.addEventListener('wheel', onWheel, { capture: true, passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { capture: true, passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel, true);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove, true);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [mobile, mode, onSelect]);

  return { sectionRef, position, select, reset };
}
