import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { routePaths } from '../../routes/routePaths.js';
import { asset } from './asset.js';
import './section2.css';

const tapes = [
  [556.196, 47.197, 891.85, 109.693, 5.46, '220.78%', '-76.5%'],
  [1090.392, 381.977, 567.999, 96.342, 97.92, '304.47%', '-92.21%'],
  [565.421, 584.44, 805.785, 110.422, 3.02, '245.99%', '-94.59%'],
  [252.606, 299.406, 661.238, 96.342, 88.03, '261.54%', '-68.63%'],
];

export default function Section2() {
  const container = useRef(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1920));
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="section2" ref={container} className="splatoon-section2" aria-labelledby="splatoon-section2-title">
      <div className="splatoon-section2__stage" style={{ transform: `scale(${scale})` }}>
        <img className="splatoon-section2__background" src={asset('3a9de.png')} alt="" />
        <div className="splatoon-section2__inner">
          <video
            className="splatoon-section2__game"
            src={asset('section2-switch-comparison.mp4')}
            aria-label="Nintendo Switch 1과 2 비교 영상"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          {tapes.map(([x, y, w, h, angle, width, left]) => <div key={x} className="splatoon-section2__tape" style={{ left: x, top: y, width: w, height: h, transform: `rotate(${angle}deg)` }} aria-hidden="true"><img src={asset('e358f.png')} alt="" style={{ width, left }} /></div>)}
          <img className="splatoon-section2__logo" src={asset('10b72.svg')} alt="Nintendo Store" />
          <h2 id="splatoon-section2-title" className="splatoon-section2__title">Nintendo Store에서<br />새로운 게임을 만나보세요</h2>
          <div className="splatoon-section2__accent" aria-hidden="true" />
          <p className="splatoon-section2__description">다양한 Nintendo 게임을 만나보세요.<br />인기 타이틀과 신작을 한눈에 확인하고,<br />취향에 맞는 게임을 찾아 즐겨보세요.</p>
          <p className="splatoon-section2__note splatoon-section2__note--purchase">※ 일부 상품은 별도 구매가 필요합니다.</p>
          <p className="splatoon-section2__note splatoon-section2__note--details">※ 자세한 상품 정보는 Nintendo Store에서 확인해 주세요.</p>
          <Link className="splatoon-section2__link" to={routePaths.store}>
            <span className="splatoon-section2__arrow" aria-hidden="true"><img src={asset('b1f82.svg')} alt="" /></span>
            자세한 내용은 이쪽에서
          </Link>
        </div>
      </div>
    </section>
  );
}
