import { useEffect, useRef, useState } from 'react';
import { asset } from './asset.js';
import './con1.css';

const clips = [
  { key: 'pink', title: '분홍 잉크 플레이 장면', frame: 'ef008.png', image: 'gameplay-1.png', video: 'con1-gameplay-1.mp4' },
  { key: 'victory', title: '승리 결과 화면', frame: 'b8873.png', image: 'gameplay-2.png', video: 'con1-gameplay-2.mp4' },
  { key: 'yellow', title: '노랑 잉크 플레이 장면', frame: 'e003f.png', image: 'gameplay-3.png', video: 'con1-gameplay-3.mp4' },
];

// Supply the original clips as { pink, victory, yellow } video URLs.
export default function Con1({ videos = {} }) {
  const container = useRef(null);
  const videoElements = useRef([]);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1920));
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const target = container.current;
    if (!target) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      videoElements.current.forEach((video) => {
        if (!video) return;
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { rootMargin: '200px 0px', threshold: 0 });
    observer.observe(target);
    return () => {
      observer.disconnect();
      videoElements.current.forEach((video) => video?.pause());
    };
  }, []);
  return (
    <section id="con1" ref={container} className="splatoon-con1" aria-labelledby="splatoon-con1-title">
      <div className="splatoon-con1__stage" style={{ transform: `scale(${scale})` }}>
        <div className="splatoon-con1__background" aria-hidden="true"><img src={asset('222a5.png')} alt="" /></div>
        <div className="splatoon-con1__inner">
          <h2 id="splatoon-con1-title" className="splatoon-con1__title">쏘고, 물들이고, 점령해라!<br />나의 색깔로 세상을 물들이세요!</h2>
          <div className="splatoon-con1__graffiti" aria-hidden="true"><img src={asset('d0f08.png')} alt="" /></div>
          <div className="splatoon-con1__bear" aria-hidden="true">
            <div className="splatoon-con1__bear-paper" />
            <div className="splatoon-con1__bear-creature">
              <div className="splatoon-con1__bear-mask" style={{ maskImage: `url(${asset('321cd.png')})` }} />
              <img className="splatoon-con1__eye splatoon-con1__eye--left" src={asset('f33cc.svg')} alt="" />
              <img className="splatoon-con1__eye splatoon-con1__eye--right" src={asset('f33cc.svg')} alt="" />
            </div>
            <img className="splatoon-con1__bear-frame" src={asset('0a9e4.png')} alt="" />
          </div>
          {clips.map(({ key, title, frame, image, video }, index) => (
            <div key={key} className={`splatoon-con1__clip splatoon-con1__clip--${key}`}>
              {videos[key] || video ? <video ref={(element) => { videoElements.current[index] = element; }} className="splatoon-con1__video" src={videos[key] || asset(video)} poster={asset(image)} aria-label={title} muted loop playsInline preload="metadata" /> : <div className="splatoon-con1__video splatoon-con1__still"><img src={asset(image)} alt={title} /></div>}
              <div className="splatoon-con1__ink" aria-hidden="true"><img src={asset(frame)} alt="" /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
