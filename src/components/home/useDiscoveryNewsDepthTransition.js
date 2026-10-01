import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DiscoveryNewsDepthTransition.css';

gsap.registerPlugin(ScrollTrigger);

export default function useDiscoveryNewsDepthTransition(containerRef, mobile) {
  useLayoutEffect(() => {
    const canvas = containerRef.current?.querySelector('.home-page__canvas');
    const discovery = canvas?.querySelector('.home-discovery, .home-discovery-mobile');
    const news = canvas?.querySelector('.home-news, .home-news-mobile');
    if (!canvas || !discovery || !news) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let context;
      let sawBoot = discovery.classList.contains('home-discovery--booting');
      let scheduledFrame;
      const createTrigger = () => {
        scheduledFrame = undefined;
        if (context || discovery.classList.contains('home-discovery--booting')) return;
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
            },
          }).to(discovery, {
            scale: 0.88,
            y: -36,
            ease: 'none',
            transformOrigin: 'center center',
          });
        }, canvas);
      };
      const observer = new MutationObserver(() => {
        if (discovery.classList.contains('home-discovery--booting')) {
          sawBoot = true;
          if (scheduledFrame !== undefined) cancelAnimationFrame(scheduledFrame);
          scheduledFrame = undefined;
          if (context) {
            context.revert();
            context = undefined;
            window.scrollTo(0, window.scrollY + discovery.getBoundingClientRect().top);
          }
        } else if (sawBoot && !context && scheduledFrame === undefined) {
          scheduledFrame = requestAnimationFrame(createTrigger);
        }
      });
      observer.observe(discovery, { attributes: true, attributeFilter: ['class'] });
      return () => {
        observer.disconnect();
        if (scheduledFrame !== undefined) cancelAnimationFrame(scheduledFrame);
        context?.revert();
      };
    });

    return () => media.revert();
  }, [containerRef, mobile]);
}
