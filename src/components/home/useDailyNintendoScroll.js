import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { dailyPhoneScreens } from './dailyNintendoData.js';

gsap.registerPlugin(ScrollTrigger);

// Each step moves ALL permanent cards one slot; no source swapping or timers.
export default function useDailyNintendoScroll(sectionRef, mobile) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let active = true;
      let frame;
      let timeline;
      const canvas = section.closest('.home-page__canvas');
      const zoom = () => Number.parseFloat(getComputedStyle(canvas).zoom) || 1;
      const pinY = gsap.quickSetter(section, 'y', 'px');
      const videos = [...section.querySelectorAll('[data-widget-video]')];
      const pendingPlayback = new WeakSet();
      const visibleVideos = new WeakSet();
      const updateVideos = () => {
        videos.forEach(video => {
          const phone = video.closest('[data-phone]');
          const art = video.closest('[data-screen]');
          const bounds = video.getBoundingClientRect();
          const visible = bounds.bottom > 0 && bounds.top < window.innerHeight
            && bounds.right > 0 && bounds.left < window.innerWidth
            && Number(getComputedStyle(phone).opacity) > .05
            && Number(getComputedStyle(art).opacity) > .05;
          if (!visible) {
            visibleVideos.delete(video);
            video.pause();
          } else {
            visibleVideos.add(video);
          }
          if (visible && video.paused && !pendingPlayback.has(video)) {
            pendingPlayback.add(video);
            video.play().catch(() => {}).finally(() => {
              pendingPlayback.delete(video);
              if (!active || !visibleVideos.has(video)) video.pause();
            });
          }
        });
      };
      const updatePin = self => {
        pinY(Math.max(0, Math.min(self.end - self.start, self.scroll() - self.start)) / zoom());
        updateVideos();
      };
      const context = gsap.context(() => {
        const phones = [...section.querySelectorAll('[data-phone]')];
        const title = section.querySelector('[data-title]');
        const numberTrack = section.querySelector('[data-number-track]');
        const descriptions = [...section.querySelectorAll('[data-description]')];
        const calendars = [...section.querySelectorAll('[data-calendar]')];
        const supports = [...section.querySelectorAll('[data-support]')];
        const heading = section.querySelector('.daily-carousel__heading');
        // Figma side slots remain on the same width-scaled Home artboard.
        // Bounds from the four Figma frames, expressed as device centers.
        const slots = [
          [[111.77, 1058.02, 351, 678, -31.88], [959.89, 857, 354, 678, 0], [1807.66, 1058.02, 351, 678, 31.88]],
          [[102.73, 1091.48, 350.394, 676.198, -32], [960.197, 863.099, 350.394, 676.198, 0], [1802.88, 1099.14, 372, 718, 37.42]],
          [[126.98, 1104.01, 372, 718, -32], [971.275, 863.9485, 350.55, 675.897, 0], [1813.74, 1116.56, 350.394, 676.198, 32]],
          [[51.67, 1057.58, 350.394, 676.198, -31.98], [951, 843, 372, 718, 0], [1779.23, 1058.48, 350.394, 676.198, 32]],
        ].reverse();
        const slot = (relative, state = 0) => {
          if (mobile) return {
            x: relative * 154 + Math.sign(relative) * Math.max(0, Math.abs(relative) - 1) * 176,
            y: relative === 0 ? 0 : 70,
            scaleX: relative === 0 ? 1 : .82, scaleY: relative === 0 ? 1 : .82,
            rotation: relative === 0 ? 0 : Math.sign(relative) * 27.49,
            zIndex: relative === 0 ? 5 : 2,
          };
          const [x, y, width, height, rotation] = slots[state][Math.max(0, Math.min(2, relative + 1))];
          return {
            x: x - 960 + Math.sign(relative) * Math.max(0, Math.abs(relative) - 1) * 1050,
            y: y - 857, scaleX: width / 354, scaleY: height / 678, rotation,
            zIndex: relative === 0 ? 5 : 2,
          };
        };
        phones.forEach((phone, index) => gsap.set(phone, slot(index - 1)));
        gsap.set([heading, title], { autoAlpha: 0, y: 18 });
        gsap.set(numberTrack, { yPercent: 0 });
        gsap.set(descriptions, { autoAlpha: 0, y: 10 });
        gsap.set(calendars, { opacity: 0, scale: 0.96, y: 12 });
        gsap.set('.daily-carousel__background', { y: mobile ? 400 : 800 });
        // Stage the center first, then bring the two wings in from below/outside.
        // These offsets belong to the same scrub timeline as the carousel.
        phones.forEach((phone, index) => {
          const target = slot(index - 1);
          gsap.set(phone, {
            autoAlpha: 0,
            x: target.x + (index === 0 ? -80 : index === 2 ? 80 : 0),
            y: target.y + (mobile ? 65 : 150),
          });
        });
        timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: 'daily-nintendo', trigger: section,
            start: 'top top',
            end: () => '+=' + window.innerHeight * 5.175,
            pin: true, pinType: 'transform', scrub: true,
            invalidateOnRefresh: true, onUpdate: updatePin,
            onRefresh: self => {
              // Home uses CSS zoom: compensate pin translation and spacer once.
              const spacing = (self.end - self.start) / zoom();
              self.spacer.style.paddingBottom = spacing + 'px';
              self.spacer.style.height = section.offsetHeight + spacing + 'px';
              updatePin(self);
            },
          },
        });
        timeline.to({}, { duration: 115 }, 0)
          .to(heading, { autoAlpha: 1, y: 0, duration: 5, ease: 'power2.out' }, 0)
          .to(title, { autoAlpha: 1, y: 0, duration: 5, ease: 'power2.out' }, 1)
          .to('.daily-carousel__background', { y: 0, duration: 10, ease: 'power2.out' }, 6)
          .to(phones[1], { ...slot(0), autoAlpha: 1, duration: 8, ease: 'power2.out' }, 12)
          .to(descriptions[0], { autoAlpha: 1, y: 0, duration: 6, ease: 'power2.out' }, 24);
        phones.forEach((phone, index) => {
          if (index === 1) return;
          timeline.to(phone, { ...slot(index - 1), autoAlpha: 1, duration: 8, ease: 'power2.out' }, 20);
        });
        // Hold 01: 30–35; 02: 53–67; 03: 85–91; 04: 107–115.
        [[35, 18], [67, 18], [91, 16]].forEach(([at, duration], step) => {
          phones.forEach((phone, index) => timeline.to(phone, { ...slot(index - step - 2, step + 1), duration }, at));
          phones.forEach((phone, index) => {
            const screen = dailyPhoneScreens[step + 1][index];
            if (!screen) return;
            phone.querySelectorAll('[data-screen]').forEach(art => timeline.to(art, {
              opacity: art.dataset.screen === screen ? 1 : 0, duration: duration * .6,
            }, at + duration * .2));
          });
          // Four stacked rows: one quarter of the track is one number height.
          // Linear scrub keeps both numbers at the exact scroll position.
          timeline.to(numberTrack, { yPercent: -(step + 1) * 25, duration }, at)
            .to(descriptions[step], { autoAlpha: 0, y: -10, duration: duration * 0.5 }, at)
            .fromTo(descriptions[step + 1], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: duration * 0.5, immediateRender: false }, at + duration * 0.5);
          supports.forEach(node => {
            const incoming = Number(node.dataset.support) === step + 1;
            timeline.to(node, { autoAlpha: incoming ? 1 : 0, y: incoming ? 0 : 10, duration }, at);
          });
          calendars.forEach((card, index) => timeline.to(card, {
            x: (index < 2 ? -1 : 1) * (step + 1) * 5,
            opacity: step === 2 ? 1 : 0, y: step === 2 ? 0 : 12,
            scale: step === 2 ? 1 : 0.96, duration,
          }, at));
        });
      }, section);
      const refresh = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => { if (active) timeline.scrollTrigger.refresh(); });
      };
      const observer = new ResizeObserver(refresh);
      observer.observe(section);
      videos.forEach(video => video.addEventListener('loadeddata', updateVideos));
      document.fonts.ready.then(refresh);
      return () => {
        active = false;
        videos.forEach(video => {
          video.removeEventListener('loadeddata', updateVideos);
          video.pause();
        });
        observer.disconnect();
        cancelAnimationFrame(frame);
        context.revert();
      };
    });
    return () => media.revert();
  }, [sectionRef, mobile]);
}

