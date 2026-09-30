import { useEffect, useRef, useState } from 'react';
import { asset } from './asset.js';
import './con4.css';

function Picture({ file, x, y, w, h, crop, flip = false, alt = '' }) {
  return <div className="splatoon-con4__picture" style={{ left: x, top: y, width: w, height: h, transform: flip ? 'scaleX(-1)' : undefined }}><img src={asset(file)} alt={alt} style={crop} /></div>;
}

export default function Con4() {
  const container = useRef(null);
  const cityRevealTarget = useRef(null);
  const [scale, setScale] = useState(1);
  const [isCityRevealed, setIsCityRevealed] = useState(false);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1920));
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const target = cityRevealTarget.current;
    if (!target) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsCityRevealed(true);
      observer.disconnect();
    }, { rootMargin: '0px 0px -50% 0px', threshold: 0.01 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="con4" ref={container} className="splatoon-con4" aria-labelledby="splatoon-con4-title">
      <div className="splatoon-con4__stage" style={{ transform: `scale(${scale})` }}>
        <div className="splatoon-con4__background"><img src={asset('222a5.png')} alt="" /></div>
        <div className="splatoon-con4__inner">
          <div ref={cityRevealTarget} className={`splatoon-con4__city-reveal${isCityRevealed ? ' is-revealed' : ''}`}>
            <div className="splatoon-con4__city-stroke splatoon-con4__city-stroke--1">
              <Picture file="b8416.png" x={0} y={0} w={529} h={937} crop={{ width: '106.57%', height: '106.91%', left: '-4.42%', top: '-3.45%' }} alt="카오폴리스 타운의 건물과 거리를 바라보는 캐릭터" />
            </div>
            <div className="splatoon-con4__city-stroke splatoon-con4__city-stroke--2">
              <Picture file="b8416.png" x={-176} y={0} w={529} h={937} crop={{ width: '106.57%', height: '106.91%', left: '-4.42%', top: '-3.45%' }} />
            </div>
            <div className="splatoon-con4__city-stroke splatoon-con4__city-stroke--3">
              <Picture file="b8416.png" x={-352} y={0} w={529} h={937} crop={{ width: '106.57%', height: '106.91%', left: '-4.42%', top: '-3.45%' }} />
            </div>
            <div className="splatoon-con4__city-spray splatoon-con4__city-spray--1" />
            <div className="splatoon-con4__city-spray splatoon-con4__city-spray--2" />
            <div className="splatoon-con4__city-spray splatoon-con4__city-spray--3" />
          </div>
          <div className="splatoon-con4__hanging-assembly">
            <Picture file="13b91.png" x={49} y={457} w={168} h={473} crop={{ width: '196.7%', height: '209.12%', left: '-46.1%', top: '-109.12%' }} />
            <Picture file="13b91.png" x={523} y={289} w={218} h={609} flip crop={{ width: '100.15%', height: '107.55%', left: '-0.08%', top: 0 }} />
            <Picture file="f1876.png" x={0} y={808} w={737} h={490} crop={{ width: '115.1%', height: '129.9%', left: '-7.47%', top: '-11.84%' }} />
            <p className="splatoon-con4__description">
              <span>카로폴리스 타운은</span>
              <span>다양한 해양 생물과 건물이 들어선</span>
              <span>독특한 분위기의 지상 도시입니다.</span>
            </p>
          </div>
          <div className="splatoon-con4__station">
            <Picture file="9890f.png" x={0} y={0} w={1474} h={502.689} crop={{ width: '100%', height: '146.61%', left: 0, top: '-21.49%' }} />
            <p className="splatoon-con4__caution">발 밑 조심</p>
            <p className="splatoon-con4__brand">SPLATOON3</p>
            <div className="splatoon-con4__ticker">
              <div className="splatoon-con4__ticker-track">
                <h2 id="splatoon-con4-title" className="splatoon-con4__title">이번역은 <span>카오폴리스 타운</span>입니다</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
