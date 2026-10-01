import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { INTRO_FRAME, INTRO_LETTERS, LOGO_ORIGIN } from './introKeyframes.js';

gsap.registerPlugin(MotionPathPlugin);

export default function LogoIntro({ onComplete }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const logoRef = useRef(null);
  const letterRefs = useRef([]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const overlay = root.closest('.nintendo-intro');
    const stage = stageRef.current;
    const logo = logoRef.current;
    const media = gsap.matchMedia();
    let disposed = false;

    // Resize only the shared artboard; never recalculate or randomize endpoints.
    const fit = () => {
      const { width, height } = overlay.getBoundingClientRect();
      stage.style.setProperty('--intro-fit', Math.min(width / INTRO_FRAME.width, height / INTRO_FRAME.height));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(overlay);

    const ctx = gsap.context(() => {
      gsap.set(logo, { transformOrigin: `${LOGO_ORIGIN.x}px ${LOGO_ORIGIN.y}px` });
      media.add({ reduce: '(prefers-reduced-motion: reduce)', animate: '(prefers-reduced-motion: no-preference)' }, context => {
        const reduced = context.conditions.reduce;
        const introTimeline = gsap.timeline({ paused: true, onComplete }).timeScale(1.3);
        introTimeline.set(logo, { y: 0, scaleX: 1, scaleY: 1 }, 0);
        INTRO_LETTERS.forEach((letter, index) => {
          introTimeline.set(letterRefs.current[index], { ...letter.start, opacity: 1, rotation: 0, scaleX: 1, scaleY: 1 }, 0);
        });
        introTimeline.addLabel('logo-enter', 0)
          .set(overlay, { attr: { 'data-phase': 'aligned' } }, 0)
          .addLabel('bounce', 0.30)
          .set(overlay, { attr: { 'data-phase': 'bounce' } }, 'bounce')
          .to(logo, { scaleX: 1.025, scaleY: 0.92, y: 5, duration: 0.16, ease: 'power2.inOut' }, 'bounce')
          .to(logo, { scaleX: 0.985, scaleY: 1.05, y: -37, duration: 0.28, ease: 'power2.out' })
          .to(logo, { scaleX: 1.012, scaleY: 0.98, y: 3, duration: 0.24, ease: 'power2.in' })
          .to(logo, { scaleX: 1, scaleY: 1, y: 0, duration: 0.19, ease: 'power2.out' })
          .addLabel('settle')
          .set(overlay, { attr: { 'data-phase': 'settle' } })
          .addLabel('scatter', 'settle+=0.16')
          .set(overlay, { attr: { 'data-phase': 'scatter' } }, 'scatter');

        INTRO_LETTERS.forEach((letter, index) => {
          const { start, target, curve } = letter;
          const dx = target.x - start.x;
          const dy = target.y - start.y;
          const distance = Math.hypot(dx, dy) || 1;
          introTimeline.to(letterRefs.current[index], {
            motionPath: {
              path: [start, {
                x: start.x + dx * 0.48 - dy / distance * curve,
                y: start.y + dy * 0.48 + dx / distance * curve,
              }, { x: target.x, y: target.y }],
              curviness: 0.7,
              autoRotate: false,
            },
            rotation: target.rotation,
            scaleX: target.scaleX,
            scaleY: target.scaleY,
            duration: letter.duration,
            ease: index % 3 === 0 ? 'power2.inOut' : 'power3.inOut',
          }, `scatter+=${letter.delay}`);
        });
        introTimeline.addLabel('hold');
        // Pin exact values before the short hold and exit in place.
        INTRO_LETTERS.forEach((letter, index) => {
          introTimeline.set(letterRefs.current[index], letter.target, 'hold');
        });
        introTimeline.set(overlay, { attr: { 'data-phase': 'hold' } }, 'hold')
          .to({}, { duration: 0.65 })
          .addLabel('logo-exit')
          .set(overlay, { attr: { 'data-phase': 'logo-exit' } });
        INTRO_LETTERS.forEach((letter, index) => {
          introTimeline.to(letterRefs.current[index], {
            opacity: 0,
            scaleX: letter.target.scaleX * 0.92,
            scaleY: letter.target.scaleY * 0.92,
            duration: reduced ? 0.01 : 0.28,
            ease: 'power2.inOut',
          }, `logo-exit+=${reduced ? 0 : index * 0.012}`);
        });

        let active = true;
        const images = [...root.querySelectorAll('img')];
        Promise.all(images.map(image => image.decode().catch(() => {}))).then(() => {
          if (disposed || !active) return;
          if (reduced) introTimeline.play('hold');
          else introTimeline.play(0);
        });
        return () => { active = false; };
      });
    }, root);

    return () => {
      disposed = true;
      observer.disconnect();
      media.revert();
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div className="nintendo-intro__logo-layer" ref={rootRef}>
      <div className="nintendo-intro__stage" ref={stageRef} aria-hidden="true">
        <div className="nintendo-intro__logo" ref={logoRef}>
          {INTRO_LETTERS.map((letter, index) => (
            <div
              key={letter.id}
              className="nintendo-intro__letter"
              ref={node => { letterRefs.current[index] = node; }}
              data-letter={letter.id}
              data-start-node={letter.sourceId}
              data-scatter-node={letter.targetId}
              style={{ transform: `translate(${letter.start.x}px, ${letter.start.y}px)` }}
            >
              {letter.parts.map(part => (
                <img
                  key={part.asset}
                  src={`${import.meta.env.BASE_URL}images/home/intro/${part.asset}.svg`}
                  alt=""
                  draggable="false"
                  fetchPriority="high"
                  style={{ left: part.x, top: part.y }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
