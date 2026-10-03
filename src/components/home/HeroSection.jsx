import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { homeAsset } from './homeAssets.js';
import './HeroMotion.css';

export default function HeroSection({ mobile = false, onDiscover }) {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    if (mobile) return;
    const intro = document.querySelector('.nintendo-intro');
    if (!intro) return;

    const section = sectionRef.current;
    const characterSelectors = mobile
      ? '.home-hero-mobile__layer-3, .home-hero-mobile__layer-6, .home-hero-mobile__layer-10'
      : '.home-hero__hero-visual-01, .home-hero__hero-visual-02, .home-hero__hero-visual-03, .home-hero__hero-visual-05, .home-hero__layer-14';
    const characters = [...section.querySelectorAll(characterSelectors)]
      .map(character => character.firstElementChild)
      .filter(Boolean);
    const discoverCharacter = section.querySelector(mobile ? '.home-hero-mobile__layer-13' : '.home-hero__hero-visual-06');
    if (discoverCharacter) characters.push(discoverCharacter);

    let played = false;
    let observer;
    const ctx = gsap.context(() => {
      gsap.set(characters, { scale: 0.64, transformOrigin: 'center center' });
    }, section);
    ctx.add('revealCharacters', () => {
      if (played) return;
      played = true;
      observer?.disconnect();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(characters, { clearProps: 'transform' });
        return;
      }
      gsap.to(characters, {
        scale: 1,
        duration: 0.78,
        stagger: 0.075,
        ease: 'back.out(1.8)',
        onComplete: () => gsap.set(characters, { clearProps: 'transform' }),
      });
    });

    observer = new MutationObserver(() => {
      const currentIntro = document.querySelector('.nintendo-intro');
      if (!currentIntro || currentIntro.dataset.phase === 'revealing') ctx.revealCharacters();
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-phase'] });
    if (intro.dataset.phase === 'revealing') ctx.revealCharacters();
    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, [mobile]);

  if (mobile) return (
      <section ref={sectionRef} aria-label="마리오 40주년" className="home-hero-mobile" data-node-id="2156:6615">
        <div className="home-hero-mobile__layer" data-node-id="2156:6620">
          <p className="home-hero-mobile__text">SUPER MAARIO</p>
          <p className="home-hero-mobile__text-2">BROS.</p>
        </div>
        <div className="home-hero-mobile__layer-2" data-node-id="2156:6621">
          <p className="home-hero-mobile__text-3">{`40 YEARS OF `}</p>
          <p className="home-hero-mobile__text-4">ADVENTURE</p>
        </div>
        <div className="home-hero-mobile__layer-3" data-node-id="2156:7622">
          <div className="home-hero-mobile__layer-4">
            <div className="home-hero-mobile__halftone-generator-6-1" data-name="halftone-generator (6) 1">
              <div className="home-hero-mobile__layer-5">
                <img alt="" className="home-hero-mobile__image" src={homeAsset('e574c.png')} />
              </div>
            </div>
          </div>
        </div>
        <div className="home-hero-mobile__layer-6" data-node-id="2156:7623">
          <div className="home-hero-mobile__layer-7">
            <div className="home-hero-mobile__halftone-generator-15-2" data-name="halftone-generator (15) 2">
              <div className="home-hero-mobile__layer-8">
                <img alt="" className="home-hero-mobile__image-2" src={homeAsset('ded11.png')} />
              </div>
            </div>
          </div>
        </div>
        <div className="home-hero-mobile__layer-9" data-node-id="2156:6622">
          <p className="home-hero-mobile__text-5">40년간</p>
          <p className="home-hero-mobile__text-6">이어진 모험</p>
        </div>
        <div className="home-hero-mobile__layer-10" data-node-id="2156:7619">
          <div className="home-hero-mobile__layer-11">
            <div className="home-hero-mobile__halftone-generator-19-1" data-name="halftone-generator (19) 1">
              <div className="home-hero-mobile__layer-12">
                <img alt="" className="home-hero-mobile__image-3" src={homeAsset('52328.png')} />
              </div>
            </div>
          </div>
        </div>
        <h1 className="home-hero-mobile__text-7" data-node-id="2156:6619">
          40th
        </h1>
        <button type="button" className="home-hero-mobile__layer-13" data-node-id="2156:7621" aria-label="게임 둘러보기로 이동" onClick={onDiscover}>
          <div className="home-hero-mobile__layer-14">
            <div className="home-hero-mobile__halftone-generator-7-7" data-name="halftone-generator (7) 7">
              <div className="home-hero-mobile__layer-15">
                <img alt="" className="home-hero-mobile__image-4" src={homeAsset('5f26d.png')} />
              </div>
            </div>
          </div>
        </button>
      </section>
  );
  return (
      <section ref={sectionRef} aria-label="마리오 40주년" className="home-hero" data-node-id="1148:6400" data-name="01_Hero">
        <h1 className="home-hero__text" data-node-id="1148:6401">
          <span className="home-hero__layer">40</span>
          <span className="home-hero__layer-2">th</span>
        </h1>
        <div className="home-hero__hero-visual-02" data-node-id="1148:6402" data-name="Hero-Visual-02">
          <div className="home-hero__halftone-generator-7-6" data-node-id="1148:6407" data-name="halftone-generator (7) 6">
            <div className="home-hero__layer-3">
              <img alt="" className="home-hero__image" src={homeAsset('5f26d.png')} />
            </div>
          </div>
        </div>
        <div className="home-hero__layer-4" data-node-id="1148:6408">
          <p className="home-hero__text-2">SUPER MAARIO</p>
          <p className="home-hero__text-3">BROS.</p>
        </div>
        <div className="home-hero__hero-visual-04" data-node-id="1148:6409" data-name="Hero-Visual-04" />
        <button type="button" className="home-hero__hero-visual-06" data-node-id="1148:6410" data-name="Hero-Visual-06" aria-label="게임 둘러보기로 이동" onClick={onDiscover}>
          <div className="home-hero__layer-5" data-node-id="1148:6413">
            <div className="home-hero__layer-6">
              <div className="home-hero__halftone-generator-8-2" data-name="halftone-generator (8) 2">
                <div className="home-hero__layer-7">
                  <img alt="" className="home-hero__image-2" src={homeAsset('209e0.png')} />
                </div>
              </div>
            </div>
          </div>
        </button>
        <div className="home-hero__layer-8" data-node-id="1148:6414">
          <p className="home-hero__text-4">40 YEARS OF ADVENTURE</p>
          <p className="home-hero__text-5">40년간 이어진 모험</p>
        </div>
        <div className="home-hero__hero-visual-03" data-node-id="1148:6415" data-name="Hero-Visual-03">
          <div className="home-hero__halftone-generator-6-1" data-node-id="1148:6420" data-name="halftone-generator (6) 1">
            <div className="home-hero__layer-9">
              <img alt="" className="home-hero__image-3" src={homeAsset('e574c.png')} />
            </div>
          </div>
        </div>
        <div className="home-hero__hero-visual-01" data-node-id="1148:6421" data-name="Hero-Visual-01">
          <div className="home-hero__layer-10" data-node-id="1148:6425">
            <div className="home-hero__layer-11">
              <div className="home-hero__halftone-generator-8-3" data-name="halftone-generator (8) 3">
                <div className="home-hero__layer-12">
                  <img alt="" className="home-hero__image-4" src={homeAsset('976c8.png')} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-hero__hero-visual-05" data-node-id="1148:6501" data-name="Hero-Visual-05">
          <div className="home-hero__halftone-generator-15-2" data-node-id="1148:6504" data-name="halftone-generator (15) 2">
            <div className="home-hero__layer-13">
              <img alt="" className="home-hero__image-5" src={homeAsset('ded11.png')} />
            </div>
          </div>
        </div>
        <div className="home-hero__layer-14" data-node-id="1148:8131">
          <div className="home-hero__layer-15">
            <div className="home-hero__halftone-generator-19-1" data-name="halftone-generator (19) 1">
              <div className="home-hero__layer-16">
                <img alt="" className="home-hero__image-6" src={homeAsset('52328.png')} />
              </div>
            </div>
          </div>
        </div>
        <div className="home-hero__layer-17" data-node-id="1148:6517">
          <div className="home-hero__layer-18">
            <div className="home-hero__layer-19">
              <img alt="" className="home-hero__image-7" src={homeAsset('18397.svg')} />
            </div>
          </div>
        </div>
      </section>
  );
}
