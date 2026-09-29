import { useEffect, useRef, useState } from 'react';
import { asset } from './asset.js';
import './con5.css';

function Art({ file, x, y, w, h, angle = 0, flip = false, crop, alt = '' }) {
  return <div className="splatoon-con5__art" style={{ left: x, top: y, width: w, height: h, transform: `rotate(${angle}deg) scaleY(${flip ? -1 : 1})` }}><img src={asset(file)} alt={alt} style={crop ?? (file.endsWith('.svg') ? undefined : { width: '100%', height: '100%', objectFit: 'cover' })} /></div>;
}
const cards = [
  ['festival', '페스티벌', 'de836.png', 815.788, 232.017, 273.115, 190.098],
  ['salmon', '새먼 런 NEXT WAVE', '98756.png', 836.291, 438.904, 247.214, 198.332],
  ['hero', '히어로 모드', 'fc804.png', 849.121, 647.933, 255.567, 211.572],
  ['battle', '배틀 더 자세히 알아보기', '453f2.png', 356.815, 247.583, 458.773, 616.385],
  ['amiibo', 'amiibo', 'c5b65.png', 1136.639, 206.627, 334.542, 186.036],
  ['app', '스마트폰용 앱 오징어넷 3', 'aec79.png', 1136.636, 428.721, 334.533, 179.798],
  ['research', '오징어 연구소 극비 리포트', 'b3177.png', 1136.637, 644.488, 334.352, 163.785],
];
const marks = [
  [94.578, 370.883, 30.888, 96.515, 1.08, '573.89%', '183.66%', '-332.48%', '0.17%'],
  [128.187, 386.307, 24.053, 75.158, 28.86, '573.89%', '183.66%', '-338.3%', '-100.1%'],
  [68.725, 391.781, 24.053, 75.158, -6.96, '573.89%', '183.66%', '-235.55%', '-97.88%'],
  [1695.985, 269.331, 38.459, 81.945, -14.93, '481.05%', '225.77%', '-366.45%', '-125.78%'],
  [1737.456, 291.211, 31.468, 81.945, 6.68, '587.92%', '225.77%', '-239.32%', '-21.74%'],
  [1662.311, 295.342, 38.459, 81.945, -8.24, '481.05%', '225.77%', '-12.97%', '-121.5%'],
];

// Supply destinations by card key when the information links are decided.
export default function Con5({ links = {} }) {
  const container = useRef(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1920));
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="con5" ref={container} className="splatoon-con5" aria-labelledby="splatoon-con5-title">
      <div className="splatoon-con5__stage" style={{ transform: `scale(${scale})` }}>
        <div className="splatoon-con5__background" aria-hidden="true">
          <img src={asset('222a5.png')} alt="" />
        </div>
        <div className="splatoon-con5__inner">
          <Art file="c6aeb.svg" x={233.131} y={74.307} w={1371.31} h={911.418} />
          <Art file="385e9.svg" x={214.75} y={66.318} w={1409.33} h={940.419} />
          <Art file="effc4.svg" x={252.171} y={92.801} w={1333.81} h={876.425} />
          <Art file="aad19.png" x={3.1} y={318.1} w={223.481} h={223.481} angle={178.39} flip />
          <Art file="02c24.png" x={1593.137} y={211.137} w={251.29} h={251.29} angle={0.06} />
          {marks.map(([x, y, w, h, angle, width, height, left, top]) => <Art key={x} file="ae3c9.png" {...{ x, y, w, h, angle }} crop={{ width, height, left, top }} />)}
          <h2 id="splatoon-con5-title" className="splatoon-con5__title">INFORMATIONS</h2>
          <Art file="5bf9d.png" x={139} y={480} w={316} h={535} />
          <div className="splatoon-con5__cards" role="group" aria-label="스플래툰 더 많은 정보">
            {cards.map(([key, label, file, x, y, w, h]) => {
              const style = { left: x, top: y, width: w, height: h };
              const picture = <img src={asset(file)} alt={label} />;
              return links[key] ? <a key={key} className="splatoon-con5__card" style={style} href={links[key]}>{picture}</a> : <div key={key} className="splatoon-con5__card" style={style}>{picture}</div>;
            })}
          </div>
          <Art file="e4c2b.png" x={1450.115} y={427.67} w={272.513} h={465.834} angle={-8.55} />
        </div>
      </div>
    </section>
  );
}
