import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HistoryDetailsIntroSection.css';

gsap.registerPlugin(ScrollTrigger);

const rays = [
  { id: 5, angle: 90, width: 254 },
  { id: 6, angle: 135, width: 255.973 },
  { id: 7, angle: 165.1, width: 256.632 },
  { id: 8, angle: 45, width: 255.973 },
  { id: 9, angle: 14.9, width: 256.632 },
];

function HistoryDetailsIntroSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const title = section.querySelector('.history-details-intro__next');
        const the = section.querySelector('.history-details-intro__the');
        const play = section.querySelector('.history-details-intro__play');
        const baseline = section.querySelector('.history-details-intro__baseline');
        const rays = section.querySelectorAll('.history-details-intro__ray');
        const captions = section.querySelectorAll('.history-details-intro__since, .history-details-intro__still');

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top top',
            scrub: 4,
            invalidateOnRefresh: true,
          },
        })
          .fromTo(title, { autoAlpha: 0, y: 90, scale: 0.92 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.28, ease: 'power2.inOut' }, 0)
          .fromTo(the, { autoAlpha: 0, x: -170, y: 85 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.32, ease: 'power2.inOut' }, 0.12)
          .fromTo(play, { autoAlpha: 0, x: 170, y: 85 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.32, ease: 'power2.inOut' }, 0.12)
          .fromTo(baseline, { autoAlpha: 0, scaleX: 0 }, { autoAlpha: 1, scaleX: 1, duration: 0.22, ease: 'power2.inOut' }, 0.32)
          .fromTo(rays, { autoAlpha: 0, scaleX: 0 }, { autoAlpha: 1, scaleX: 1, duration: 0.24, stagger: 0.045, ease: 'power2.inOut' }, 0.49)
          .fromTo(captions, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.18, ease: 'power2.inOut' }, 0.72);
      }, section);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section className="history-details-intro" ref={sectionRef} aria-label="The next play">
      <p className="history-details-intro__the">THE</p>
      <h2 className="history-details-intro__next">NEXT</h2>
      <p className="history-details-intro__play">PLAY</p>
      <img className="history-details-intro__baseline" src="/images/history/history-details-line-4.svg" alt="" aria-hidden="true" />
      {rays.map(({ id, angle, width }) => (
        <img
          className="history-details-intro__ray"
          key={id}
          src={`/images/history/history-details-line-${id}.svg`}
          alt=""
          aria-hidden="true"
          style={{ width, transform: `rotate(${angle}deg)` }}
        />
      ))}
      <p className="history-details-intro__since">SINCE 1889</p>
      <p className="history-details-intro__still">AND STILL PLAYING</p>
    </section>
  );
}

export default HistoryDetailsIntroSection;
