import { useEffect, useRef } from 'react';
import Con1 from './Con1.jsx';
import Con2 from './Con2.jsx';
import Con3 from './Con3.jsx';
import Con4 from './Con4.jsx';
import Con5 from './Con5.jsx';
import Section1 from './Section1.jsx';
import Section2 from './Section2.jsx';
import SplatoonIntro from './SplatoonIntro.jsx';

export default function SplatoonContent() {
  const pageRef = useRef(null);
  const scrollControllerRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let frame = null;
    let settleCallback = null;

    const cancelSmoothScroll = (notify = true) => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      targetY = window.scrollY;
      currentY = window.scrollY;
      const callback = settleCallback;
      settleCallback = null;
      if (notify) callback?.(false);
    };

    const smoothScroll = () => {
      currentY += (targetY - currentY) * 0.11;

      if (Math.abs(targetY - currentY) < 0.5) {
        window.scrollTo(0, targetY);
        currentY = targetY;
        frame = null;
        const callback = settleCallback;
        settleCallback = null;
        callback?.(true);
        return;
      }

      window.scrollTo(0, currentY);
      frame = requestAnimationFrame(smoothScroll);
    };

    const handleWheel = (event) => {
      if (event.defaultPrevented) return;
      if (
        event.ctrlKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        event.target.closest('button, a, input, select, textarea, dialog')
      ) {
        return;
      }

      event.preventDefault();
      targetY += event.deltaY * 1.05;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetY = Math.max(0, Math.min(targetY, maxScroll));

      if (frame === null) {
        currentY = window.scrollY;
        frame = requestAnimationFrame(smoothScroll);
      }
    };

    const syncScroll = () => {
      if (frame === null) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };

    scrollControllerRef.current = {
      getTargetY() {
        return targetY;
      },
      settleAt(nextY, onSettled) {
        if (frame !== null) cancelAnimationFrame(frame);
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        targetY = Math.max(0, Math.min(nextY, maxScroll));
        currentY = window.scrollY;
        settleCallback = onSettled;
        frame = requestAnimationFrame(smoothScroll);
      },
    };

    page.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', syncScroll, { passive: true });
    window.addEventListener('resize', cancelSmoothScroll);
    window.addEventListener('keydown', cancelSmoothScroll);
    window.addEventListener('touchstart', cancelSmoothScroll, { passive: true });

    return () => {
      cancelSmoothScroll(false);
      scrollControllerRef.current = null;
      page.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', syncScroll);
      window.removeEventListener('resize', cancelSmoothScroll);
      window.removeEventListener('keydown', cancelSmoothScroll);
      window.removeEventListener('touchstart', cancelSmoothScroll);
    };
  }, []);

  return (
    <div className="splatoon-page" ref={pageRef}>
      <SplatoonIntro />
      <Con1 />
      <Con2 scrollController={scrollControllerRef} />
      <Section1 />
      <Con3 scrollController={scrollControllerRef} />
      <Con4 />
      <Con5 />
      <Section2 />
    </div>
  );
}
