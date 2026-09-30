import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HistoryStoryTransitionSection.css';

gsap.registerPlugin(ScrollTrigger);

function HistoryStoryTransitionSection() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

        const textGroups = section.querySelectorAll('.history-story-transition__text');
        const textContent = section.querySelectorAll('.history-story-transition__text > strong, .history-story-transition__text > p');
        const background = section.querySelector('.history-story-transition__bg');
        let returnToRest;
        const ctx = gsap.context(() => {
            returnToRest = gsap.delayedCall(0.12, () => {
                gsap.to(textGroups, { y: 0, rotation: 0, duration: 0.65, ease: 'power3.out', overwrite: true });
            }).pause();

            const scrollMotion = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: () => section.offsetHeight > window.innerHeight ? 'bottom bottom' : 'top top',
                    end: () => `+=${Math.round(window.innerHeight * 0.8)}`,
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                },
            });
            scrollMotion
                .to(textContent, { y: -36, ease: 'none' }, 0)
                .to(background, { scale: 1.025, ease: 'none' }, 0);

            ScrollTrigger.create({
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                onUpdate: (self) => {
                    const offset = gsap.utils.clamp(-10, 10, self.getVelocity() / 180);
                    gsap.to(textGroups, {
                        y: offset,
                        rotation: offset * 0.035,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: true,
                    });
                    returnToRest.restart(true);
                },
            });
        }, section);

        return () => {
            returnToRest.kill();
            gsap.killTweensOf(textGroups);
            gsap.killTweensOf(textContent);
            ctx.revert();
        };
    }, []);

    return (
        <section className="history-story-transition" ref={sectionRef}>
            <img
                className="history-story-transition__bg"
                src="/images/history/story-transition.png"
                alt=""
            />

            <div className="history-story-transition__top-line">
                <div className="history-story-transition__top-line-left" />
                <div className="history-story-transition__top-line-right" />
            </div>

            <div className="history-story-transition__panel history-story-transition__panel--left">
                <div className="history-story-transition__text history-story-transition__text--left">
                    <strong>OUR BEGINNING</strong>

                    <p>
                        1889년 교토에서 화투 제작으로 시작한 닌텐도는
                        <br />
                        시대의 변화와 함께 새로운 놀이의 형태를 만들어 왔습니다.
                    </p>
                </div>
            </div>

            <div className="history-story-transition__panel history-story-transition__panel--right">
                <div className="history-story-transition__text history-story-transition__text--right">
                    <strong>OUR PHILOSOPHY</strong>

                    <p>
                        형태는 달라져도 놀이가 주는 즐거움은 변하지 않습니다.
                        <br />
                        닌텐도는 언제나 새로운 방식으로 사람과 사람을 연결해 왔습니다.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default HistoryStoryTransitionSection;
