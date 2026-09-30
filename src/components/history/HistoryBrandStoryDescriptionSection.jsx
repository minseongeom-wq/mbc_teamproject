import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { routePaths } from '../../routes/routePaths.js';
import './HistoryBrandStoryDescriptionSection.css';

gsap.registerPlugin(ScrollTrigger);

function HistoryBrandStoryDescriptionSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const headings = section.querySelectorAll('.history-brand-story__column h2');
        const paragraphs = section.querySelectorAll('.history-brand-story__column p');
        const arrow = section.querySelector('.history-brand-story__arrow');
        const button = section.querySelector('.history-brand-story__button');

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top top',
            scrub: 1.6,
            invalidateOnRefresh: true,
          },
        })
          .fromTo(headings, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: -2, duration: 0.36, stagger: 0.04, ease: 'power2.out' }, 0)
          .fromTo(arrow, { autoAlpha: 0, scaleX: 0 }, { autoAlpha: 1, scaleX: 1, duration: 0.25, ease: 'power2.out' }, 0.17)
          .fromTo(paragraphs, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.04, ease: 'power2.out' }, 0.18)
          .fromTo(button, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.48);
      }, section);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section className="history-brand-story" ref={sectionRef} aria-label="닌텐도의 변하지 않는 즐거움">
      <div className="history-brand-story__column history-brand-story__column--left">
        <h2>놀이의 모습은 계속 달라졌지만</h2>
        <p>1889년 교토에서 시작한 닌텐도는 오랜 시간 새로운 형태의 엔터테인먼트를 만들어 왔습니다. 시대에 따라 놀이의 모습은 달라졌지만, 독창적인 아이디어와 경험을 통해 사람들에게 즐거움을 전해왔습니다.</p>
      </div>
      <img className="history-brand-story__arrow" src="/images/history/history-brand-story-arrow.svg" alt="" aria-hidden="true" />
      <div className="history-brand-story__column history-brand-story__column--right">
        <h2>즐거움의 마음은 변하지 않습니다.</h2>
        <p>변하지 않은 것은 엔터테인먼트를 통해 사람들의 얼굴에 미소를 만들고자 하는 마음입니다. 닌텐도는 앞으로도 새로운 놀이와 경험을 통해 더 많은 사람들에게 즐거움을 전하고자 합니다.</p>
      </div>
      <Link className="history-brand-story__button" to={routePaths.home}>현재의 닌텐도 만나보기 →</Link>
    </section>
  );
}

export default HistoryBrandStoryDescriptionSection;
