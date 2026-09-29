import { useEffect, useRef, useState } from 'react';
import { asset } from './asset.js';
import './con3.css';


function Art({ file, x, y, w, h, angle = 0, flip = false, scaleX = 1, transformOrigin, crop, alt = '' }) {
  return <div className="splatoon-con3__art" style={{ left: x, top: y, width: w, height: h, transform: `rotate(${angle}deg) scaleX(${scaleX}) scaleY(${flip ? -1 : 1})`, transformOrigin }}><img src={asset(file)} alt={alt} style={crop ?? (file.endsWith('.svg') ? undefined : { width: '100%', height: '100%', objectFit: 'cover' })} /></div>;
}

function HairSlide({ onPrevious, onNext }) {
  return (
    <>
      <Art file="10d67.svg" x={18} y={347} w={1845} h={565} />
      <div className="splatoon-con3__panel-fill splatoon-con3__panel-fill--hair">
        <Art file="fb8b8.svg" x={27} y={391.5} w={884.5} h={509.5} />
        <Art file="36cb1.svg" x={849.87} y={357.5} w={1003.13} h={460.5} />
        <Art file="c66e0.png" x={133.939} y={445.437} w={454.632} h={474.44} angle={-59.88} crop={{ width: '194.61%', height: '186.48%', left: 0, top: '-86.48%' }} />
        <Art file="49917.png" x={23} y={436} w={247.407} h={215.296} crop={{ width: '245.11%', height: '500.73%', left: 0, top: 0 }} />
        <Art file="38cbe.png" x={19.336} y={814.137} w={155.019} h={74.561} angle={-3.86} crop={{ width: '100%', height: '311.86%', left: 0, top: '-93.79%' }} />
        <Art file="d6513.png" x={1231.283} y={362.875} w={449.518} h={436.724} angle={178.48} crop={{ width: '145.73%', height: '100%', left: '-22.49%', top: 0 }} />
        <Art file="b57d8.png" x={1648.022} y={604.746} w={205.558} h={103.758} angle={-12.97} />
        <Art file="2e1a4.png" x={1705.051} y={402.404} w={140.514} h={103.942} angle={34} crop={{ width: '182.65%', height: '246.91%', left: '-43.84%', top: '-80.86%' }} />
      </div>
      <Art file="dea2f.png" x={857.675} y={211.889} w={521.097} h={578.598} angle={-5.77} crop={{ width: '197.49%', height: '100%', left: '-97.47%', top: 0 }} alt="보라색 웨이브 헤어 스타일" />
      <Art file="21b33.png" x={404.872} y={235.274} w={350.77} h={610.665} angle={-5.29} crop={{ width: '135.92%', height: '104.1%', left: '-15.27%', top: '-2.3%' }} alt="민트색 헤어 스타일의 캐릭터" />
      <h2 id="splatoon-con3-title" className="splatoon-con3__title">NEW HAIR</h2>
      <button type="button" className="splatoon-con3__previous" aria-label="이전 스타일: 신발" onClick={onPrevious}>
        <Art file="0056a.svg" x={0} y={0} w={290} h={279} />
        <Art file="272c0.png" x={57} y={53} w={200} h={200} angle={180} flip />
        <span><b>Previous</b></span>
      </button>
      <button type="button" className="splatoon-con3__next" aria-label="다음 스타일: 바지" onClick={onNext}>
        <Art file="65972.svg" x={0} y={0} w={391} h={279} angle={180} flip />
        <Art file="7b648.png" x={175} y={77} w={173} h={162} crop={{ width: '120.35%', height: '128.48%', left: '-10.94%', top: '-13.63%' }} />
        <span><b>NEXT</b></span>
      </button>
    </>
  );
}

function BottomsSlide({ onPrevious, onNext }) {
  return (
    <>
      <Art file="10d67.svg" x={28} y={332} w={1845} h={565} />
      <div className="splatoon-con3__panel-fill splatoon-con3__panel-fill--bottoms">
        <Art file="d1ae6.svg" x={37} y={376} w={981} h={511} />
        <Art file="ad8e5.svg" x={898} y={341.48} w={965} h={455.516} />
        <Art file="0e008.png" x={188} y={351.43} w={521.808} h={521.808} angle={84.17} />
        <Art file="94b3e.png" x={1167} y={334} w={427} h={427} />
        <Art file="9e98b.png" x={16.67} y={453.69} w={235.042} h={220.141} angle={15.27} />
        <Art file="b6203.png" x={20} y={759} w={197.678} h={118.877} angle={-4.59} crop={{ width: '100%', height: '255.58%', left: '-.07%', top: '-81.63%' }} />
        <Art file="b6203.png" x={1660} y={573} w={209.808} h={129.972} angle={164.74} flip crop={{ width: '100%', height: '335.5%', left: '.02%', top: '-235.57%' }} />
        <Art file="f0d77.png" x={1651} y={368.53} w={136.292} h={185.257} angle={-3.6} crop={{ width: '151%', height: '106.52%', left: '-26.35%', top: '-4.13%' }} />
      </div>
      <Art file="9fb6b.png" x={478} y={109} w={309.275} h={745.718} angle={2.21} crop={{ width: '174.43%', height: '100%', left: '-33.81%', top: 0 }} alt="흰색 상의와 노란색 바지를 입은 캐릭터" />
      <Art file="45b6c.png" x={1090} y={88} w={351.098} h={701.726} angle={-178.83} flip crop={{ width: '137.49%', height: '100%', left: '-21.71%', top: 0 }} alt="청록색 상의와 검은색 바지를 입은 캐릭터" />
      <h2 id="splatoon-con3-title" className="splatoon-con3__title splatoon-con3__title--bottoms">NEW BOTTOMS</h2>
      <button type="button" className="splatoon-con3__previous splatoon-con3__previous--bottoms" aria-label="이전 스타일: 헤어" onClick={onPrevious}>
        <Art file="e3044.svg" x={0} y={0} w={284} h={279} />
        <Art file="488c3.png" x={24} y={57} w={200} h={200} angle={180} flip />
        <span><b>Previous</b></span>
      </button>
      <button type="button" className="splatoon-con3__next splatoon-con3__next--bottoms" aria-label="다음 스타일: 헤드기어" onClick={onNext}>
        <Art file="fb83f.svg" x={0} y={0} w={386} h={279} angle={180} flip />
        <Art file="e15d2.png" x={158} y={56} w={200} h={200} />
        <span><b>NEXT</b></span>
      </button>
    </>
  );
}

function HeadgearSlide({ onPrevious, onNext }) {
  return (
    <>
      <Art file="10d67.svg" x={28} y={332} w={1845} h={565} />
      <div className="splatoon-con3__panel-fill splatoon-con3__panel-fill--headgear">
        <Art file="da585.svg" x={37} y={373} w={981} h={513} />
        <Art file="e8b76.svg" x={882} y={342} w={981} h={455.516} />
        <Art file="c0441.png" x={403} y={373} w={453} h={453} />
        <Art file="c66e0.png" x={1168.73} y={290} w={556.518} h={566.055} angle={-61.27} crop={{ width: '221.34%', height: '234.61%', left: '-6.88%', top: '-10.67%' }} />
        <Art file="aa59e.png" x={6} y={733} w={309.704} h={156.89} angle={-4.5} crop={{ width: '100%', height: '314.02%', left: 0, top: '-200.91%' }} />
        <Art file="d256c.png" x={161} y={494} w={191.13} h={182.264} angle={-172.61} flip crop={{ width: '109.69%', height: '116.67%', left: '-8.18%', top: '-8.01%' }} />
        <Art file="b6203.png" x={1621} y={548} w={241.962} h={156.146} angle={-16.63} crop={{ width: '100%', height: '325.95%', left: 0, top: 0 }} />
        <Art file="49917.png" x={1619} y={373} w={195} h={191} angle={180} flip crop={{ width: '428.25%', height: '775.76%', left: '-39.41%', top: '-400%' }} />
      </div>
      <Art file="db44a.png" x={272} y={169} w={439.513} h={697.062} angle={-176.21} flip crop={{ width: '128.06%', height: '104%', left: '-17.63%', top: 0 }} alt="헤드기어를 착용한 왼쪽 캐릭터" />
      <Art file="98c51.png" x={956.84} y={90.03} w={561.107} h={666.561} angle={-5.69} crop={{ width: '125%', height: '134.97%', left: '-15.66%', top: '-.04%' }} alt="헤드기어를 착용한 오른쪽 캐릭터" />
      <h2 id="splatoon-con3-title" className="splatoon-con3__title splatoon-con3__title--headgear">NEW HEADGEAR</h2>
      <button type="button" className="splatoon-con3__previous splatoon-con3__previous--headgear" aria-label="이전 스타일: 바지" onClick={onPrevious}>
        <Art file="37611.svg" x={0} y={0} w={284} h={279} />
        <Art file="dff61.png" x={33} y={64} w={200} h={200} angle={180} flip />
        <span><b>Previous</b></span>
      </button>
      <button type="button" className="splatoon-con3__next splatoon-con3__next--headgear" aria-label="다음 스타일: 아이브로우" onClick={onNext}>
        <Art file="27f62.svg" x={0} y={0} w={386} h={279} angle={180} flip />
        <Art file="ca732.png" x={160} y={69} w={200} h={200} />
        <span><b>NEXT</b></span>
      </button>
    </>
  );
}

function EyebrowsSlide({ onPrevious, onNext }) {
  return (
    <>
      <Art file="10d67.svg" x={28} y={332} w={1845} h={565} />
      <div className="splatoon-con3__panel-fill splatoon-con3__panel-fill--eyebrows">
        <Art file="76739.svg" x={37} y={373} w={983} h={513.5} />
        <Art file="4e709.svg" x={927.3} y={342} w={937.702} h={455.516} />
        <Art file="f9559.png" x={29.55} y={375.2} w={643.453} h={503.567} angle={-5.22} crop={{ width: '136.9%', height: '122.69%', left: '-24.42%', top: '-17.9%' }} />
        <Art file="b73ad.png" x={1186} y={347.6} w={504.982} h={428.352} angle={-92.34} crop={{ width: '119.57%', height: '100%', left: 0, top: 0 }} />
        <Art file="a2a1c.png" x={1645} y={570} w={210.111} h={129.631} angle={-13.98} crop={{ width: '100%', height: '321.87%', left: '.01%', top: '.12%' }} />
        <Art file="aa59e.png" x={17.13} y={788.97} w={303.946} h={96.444} angle={-5.97} crop={{ width: '100%', height: '635.8%', left: '-.01%', top: '-250.77%' }} />
        <Art file="9703c.png" x={1706} y={362} w={121} h={200} angle={180} flip crop={{ width: '170.61%', height: '103.29%', left: '-39.18%', top: '-1.4%' }} />
        <Art file="fc66b.png" x={17} y={422} w={304.297} h={265.02} angle={-13.16} crop={{ width: '100%', height: '150%', left: 0, top: '-31.77%' }} />
      </div>
      <Art file="d7989.png" x={46} y={67} w={814.81} h={768.973} angle={-5.67} crop={{ width: '100%', height: '134.85%', left: 0, top: 0 }} alt="아이브로우 스타일을 보여주는 왼쪽 캐릭터" />
      <Art file="5dd42.png" x={907.14} y={81.6} w={574.381} h={693.951} angle={-5.88} alt="아이브로우 스타일을 보여주는 오른쪽 캐릭터" />
      <h2 id="splatoon-con3-title" className="splatoon-con3__title splatoon-con3__title--eyebrows">NEW EYEBROWS</h2>
      <button type="button" className="splatoon-con3__previous splatoon-con3__previous--eyebrows" aria-label="이전 스타일: 헤드기어" onClick={onPrevious}>
        <Art file="1177f.svg" x={0} y={0} w={304} h={279} scaleX={284 / 304} transformOrigin="top left" />
        <Art file="507dc.png" x={38} y={54} w={200} h={200} angle={180} flip />
        <span><b>Previous</b></span>
      </button>
      <button type="button" className="splatoon-con3__next splatoon-con3__next--eyebrows" aria-label="다음 스타일: 상의" onClick={onNext}>
        <Art file="3ed82.svg" x={0} y={0} w={386} h={279} angle={180} flip />
        <Art file="b74e1.png" x={145} y={61} w={200} h={200} />
        <span><b>NEXT</b></span>
      </button>
    </>
  );
}

function TopsSlide({ onPrevious, onNext }) {
  return (
    <>
      <Art file="10d67.svg" x={28} y={332} w={1845} h={565} />
      <div className="splatoon-con3__panel-fill splatoon-con3__panel-fill--tops">
        <Art file="46668.svg" x={36} y={374} w={986} h={512} />
        <Art file="f551b.svg" x={886.5} y={338} w={976.5} h={458.5} />
        <Art file="b6203.png" x={42} y={764} w={208.275} h={117.292} angle={-6.72} crop={{ width: '125.38%', height: '367.86%', left: '-13.12%', top: '-7.86%' }} />
        <Art file="7dd98.png" x={1609} y={581} w={239.502} h={128.32} angle={-15.14} crop={{ width: '127.09%', height: '136.6%', left: '-16.09%', top: '-18.68%' }} />
        <Art file="a657f.png" x={1616} y={308} w={255.778} h={289.663} angle={21.5} />
        <Art file="5159b.png" x={44} y={459} w={236.516} h={269.445} angle={-9.4} crop={{ width: '122.17%', height: '108.21%', left: '-13.94%', top: '-4.44%' }} />
        <Art file="c275f.png" x={898.14} y={346.06} w={478.714} h={468.884} angle={-9.6} crop={{ width: '255.35%', height: '122.6%', left: '-12.1%', top: '-10.59%' }} />
        <Art file="c275f.png" x={1232.8} y={297} w={520.915} h={523.78} angle={38.92} crop={{ width: '247.77%', height: '110.3%', left: '-139.9%', top: '-7.36%' }} />
        <Art file="6866c.png" x={162} y={356} w={548.736} h={523.78} angle={-7.6} crop={{ width: '141.77%', height: '119.28%', left: '-23.21%', top: '-12.11%' }} />
      </div>
      <Art file="6ba6f.png" x={321} y={96} w={477.229} h={727.543} angle={-4.76} crop={{ width: '111.55%', height: '101.45%', left: '-6.75%', top: '-.92%' }} alt="새로운 상의를 입은 왼쪽 캐릭터" />
      <Art file="10c50.png" x={1004} y={-2} w={577.796} h={756.275} angle={-5.87} crop={{ width: '113.78%', height: '102.01%', left: '-11.72%', top: '-.02%' }} alt="새로운 상의를 입은 오른쪽 캐릭터" />
      <h2 id="splatoon-con3-title" className="splatoon-con3__title splatoon-con3__title--tops">NEW TOPS</h2>
      <button type="button" className="splatoon-con3__previous splatoon-con3__previous--tops" aria-label="이전 스타일: 아이브로우" onClick={onPrevious}>
        <Art file="03f94.svg" x={0} y={0} w={284} h={279} />
        <Art file="ae1e8.png" x={18} y={70} w={200} h={200} angle={180} flip />
        <span><b>Previous</b></span>
      </button>
      <button type="button" className="splatoon-con3__next splatoon-con3__next--tops" aria-label="다음 스타일: 신발" onClick={onNext}>
        <Art file="ebed1.svg" x={0} y={0} w={386} h={279} angle={180} flip />
        <Art file="347ab.png" x={162} y={68} w={200} h={200} />
        <span><b>NEXT</b></span>
      </button>
    </>
  );
}

function ShoesSlide({ onPrevious, onNext }) {
  return (
    <>
      <Art file="10d67.svg" x={28} y={332} w={1845} h={565} />
      <div className="splatoon-con3__panel-fill splatoon-con3__panel-fill--shoes">
        <Art file="b3e23.svg" x={38} y={372} w={981} h={515.5} />
        <Art file="36e8e.svg" x={827.5} y={342} w={1036.5} h={455.516} />
        <Art file="cb4e0.png" x={973} y={352} w={519.205} h={423.665} angle={176.92} crop={{ width: '104.59%', height: '131.19%', left: '-.67%', top: '-24.43%' }} />
        <Art file="2aa0c.png" x={-4} y={306} w={656.016} h={636.782} angle={157.43} crop={{ width: '157.39%', height: '126.87%', left: '-29.78%', top: '-12.5%' }} />
        <Art file="a2a1c.png" x={1566} y={319} w={331.804} h={218.593} angle={-12.98} crop={{ width: '100%', height: '276.88%', left: 0, top: '-85.1%' }} />
        <Art file="a2a1c.png" x={8} y={751} w={329.108} h={152.868} angle={-4.53} crop={{ width: '100%', height: '349.15%', left: 0, top: '-249.15%' }} />
        <Art file="2fc93.png" x={34} y={468} w={165.886} h={273.51} angle={83.51} />
        <Art file="a9608.png" x={1502.32} y={463.37} w={196.355} h={253.259} angle={-3.73} crop={{ width: '161.05%', height: '120.26%', left: '-26.26%', top: '-5.39%' }} />
      </div>
      <Art file="5dc9b.png" x={288} y={186} w={597} h={645} crop={{ width: '123.79%', height: '135.1%', left: '-11.63%', top: '-10.1%' }} alt="새로운 신발을 착용한 왼쪽 캐릭터" />
      <Art file="fdb9c.png" x={1205} y={111} w={318} h={635} crop={{ width: '217.61%', height: '128.5%', left: '-21.38%', top: '-3.62%' }} alt="새로운 신발을 착용한 오른쪽 캐릭터" />
      <h2 id="splatoon-con3-title" className="splatoon-con3__title splatoon-con3__title--shoes">NEW SHOES</h2>
      <button type="button" className="splatoon-con3__previous splatoon-con3__previous--shoes" aria-label="이전 스타일: 상의" onClick={onPrevious}>
        <Art file="67152.svg" x={0} y={0} w={284} h={279} />
        <Art file="65254.png" x={32} y={60} w={200} h={200} angle={180} flip />
        <span><b>Previous</b></span>
      </button>
      <button type="button" className="splatoon-con3__next splatoon-con3__next--shoes" aria-label="처음 스타일: 헤어" onClick={onNext}>
        <Art file="807cf.svg" x={0} y={0} w={386} h={279} angle={180} flip />
        <Art file="36854.png" x={150} y={70} w={200} h={200} />
        <span><b>NEXT</b></span>
      </button>
    </>
  );
}

export default function Con3() {
  const container = useRef(null);
  const [scale, setScale] = useState(1);
  const [slide, setSlide] = useState('hair');
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1920));
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="con3" ref={container} className="splatoon-con3" aria-labelledby="splatoon-con3-title">
      <div className="splatoon-con3__stage" style={{ transform: `scale(${scale})` }}>
        <img className="splatoon-con3__background" src={asset('3a9de.png')} alt="" />
        <div className="splatoon-con3__inner" aria-live="polite">
          {slide === 'hair' && <HairSlide onPrevious={() => setSlide('shoes')} onNext={() => setSlide('bottoms')} />}
          {slide === 'bottoms' && <BottomsSlide onPrevious={() => setSlide('hair')} onNext={() => setSlide('headgear')} />}
          {slide === 'headgear' && <HeadgearSlide onPrevious={() => setSlide('bottoms')} onNext={() => setSlide('eyebrows')} />}
          {slide === 'eyebrows' && <EyebrowsSlide onPrevious={() => setSlide('headgear')} onNext={() => setSlide('tops')} />}
          {slide === 'tops' && <TopsSlide onPrevious={() => setSlide('eyebrows')} onNext={() => setSlide('shoes')} />}
          {slide === 'shoes' && <ShoesSlide onPrevious={() => setSlide('tops')} onNext={() => setSlide('hair')} />}
        </div>
      </div>
    </section>
  );
}
