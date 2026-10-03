import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { dailyPhoneScreens } from './dailyNintendoData.js';

export default function useMobileDailyCarousel(sectionRef, mobile) {
  const [step, setStep] = useState(0);
  const selectRef = useRef(() => {});
  const gesture = useRef(null);

  useLayoutEffect(() => {
    if (!mobile) return;
    const section = sectionRef.current;
    let current = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const context = gsap.context(() => {}, section);
    const select = (next, immediate = false) => {
      current = Math.max(0, Math.min(3, next));
      setStep(current);
      const duration = immediate || reducedMotion.matches ? 0 : 0.4;
      context.add(() => {
        const animate = (target, values) => gsap.to(target, {
          ...values, duration, ease: 'power2.out', overwrite: true,
        });
        section.querySelectorAll('[data-phone]').forEach((phone, index) => {
          const relative = index - current - 1;
          animate(phone, {
            x: relative * 154 + Math.sign(relative) * Math.max(0, Math.abs(relative) - 1) * 176,
            y: relative === 0 ? 0 : 133,
            scale: relative === 0 ? 1 : .992,
            rotation: Math.sign(relative) * 27.49,
            zIndex: relative === 0 ? 5 : 2,
            autoAlpha: Math.abs(relative) <= 1 ? 1 : 0,
          });
          const screen = current === 0 && index === 0 ? '04' : dailyPhoneScreens[current][index];
          phone.querySelectorAll('[data-screen]').forEach(art => {
            animate(art, { opacity: art.dataset.screen === screen ? 1 : 0 });
          });
        });
        section.querySelectorAll('[data-description]').forEach(node => {
          const visible = Number(node.dataset.description) === current;
          node.setAttribute('aria-hidden', String(!visible));
          animate(node, { autoAlpha: visible ? 1 : 0 });
        });
        section.querySelectorAll('[data-support]').forEach(node => {
          animate(node, { autoAlpha: Number(node.dataset.support) === current ? 1 : 0 });
        });
      });
    };
    selectRef.current = next => select(typeof next === 'function' ? next(current) : next);
    select(0, true);
    return () => {
      selectRef.current = () => {};
      gesture.current = null;
      context.revert();
      section.querySelectorAll('[data-description]').forEach(node => node.removeAttribute('aria-hidden'));
    };
  }, [sectionRef, mobile]);

  return {
    step,
    select: next => selectRef.current(next),
    onPointerDown: event => {
      if (!event.isPrimary || event.button !== 0 || event.target.closest('button, a')) return;
      gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    onPointerUp: event => {
      const start = gesture.current;
      gesture.current = null;
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        selectRef.current(current => current + (dx < 0 ? 1 : -1));
      }
    },
    onPointerCancel: () => { gesture.current = null; },
  };
}
