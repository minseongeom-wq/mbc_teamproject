import { useCallback, useEffect, useRef, useState } from 'react';
import './zeldaContent2Section.css';

const asset = name => `${import.meta.env.BASE_URL}images/zelda/gameplay-${name}`;
const activities = [
  ['explore', 'EXPLORE', '광활한 하이랄을 자유롭게 누비며 숨겨진 장소와 새로운 이야기를 발견하세요.'],
  ['solve', 'SOLVE', '주변 환경과 다양한 능력을 활용해 자신만의 방법으로 퍼즐을 해결하세요.'],
  ['cook', 'COOK', '모험에서 얻은 다양한 재료를 조합해 특별한 효과를 가진 음식을 만들어보세요.'],
  ['travel', 'TRAVEL', '달리고, 오르고, 활강하며 다양한 방법으로 하이랄 곳곳을 자유롭게 여행하세요.'],
];
const sceneImages = ['sword', 'solve', 'cook', 'landscape'];
const sceneStart = 7.9;
const sceneDuration = .5;

export default function ZeldaContent2Section({ overlapPhase = 'character' }) {
  const [selectedImage, setSelectedImage] = useState('sword');
  const [previousImage, setPreviousImage] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const sectionRef = useRef(null);
  const selectedIndexRef = useRef(0);
  const views = { sword: 'content2', solve: 'content2_2', cook: 'content2_3', landscape: 'content2_4' };
  const backgrounds = { sword: 'background.png', solve: 'solve-background.png', cook: 'cook-background.png', landscape: 'landscape.png' };
  const selectImage = useCallback(index => {
    if (index === selectedIndexRef.current) return;
    setPreviousImage(sceneImages[selectedIndexRef.current]);
    selectedIndexRef.current = index;
    setSelectedImage(sceneImages[index]);
    setHasInteracted(true);
  }, []);
  useEffect(() => {
    if (overlapPhase !== 'complete') {
      if (selectedIndexRef.current !== 0) {
        selectedIndexRef.current = 0;
        setSelectedImage('sword');
        setPreviousImage(null);
        setHasInteracted(false);
      }
      return undefined;
    }
    let frame = 0;
    const updateScene = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const sceneHeight = section.querySelector('.zelda-gameplay__stage')?.offsetHeight || window.innerHeight;
      const scrolled = -section.getBoundingClientRect().top / sceneHeight;
      const index = Math.max(0, Math.min(sceneImages.length - 1, Math.floor((scrolled - sceneStart) / sceneDuration)));
      selectImage(index);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScene);
    };
    updateScene();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [overlapPhase, selectImage]);
  const goToImage = name => {
    const section = sectionRef.current;
    if (!section) return;
    const index = sceneImages.indexOf(name);
    const sceneHeight = section.querySelector('.zelda-gameplay__stage')?.offsetHeight || window.innerHeight;
    window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top + (sceneStart + index * sceneDuration) * sceneHeight, behavior: 'instant' });
  };
  return (
    <section ref={sectionRef} className={`zelda-gameplay${overlapPhase !== 'character' ? ' zelda-gameplay--overlap-active' : ''}${overlapPhase === 'complete' ? ' zelda-gameplay--overlap-complete' : ''}`} data-view={views[selectedImage]} data-interacted={hasInteracted} aria-labelledby="zelda-gameplay-title" style={{ '--gameplay-background': `url("${asset(backgrounds[selectedImage])}")` }}>
      <div className="zelda-gameplay__stage" inert={overlapPhase !== 'complete'}>
      <div className="zelda-gameplay__canvas">
        <img className="zelda-gameplay__background-base" src={asset('sword.png')} alt="" loading="lazy" />
        {previousImage && <img className={`zelda-gameplay__background-previous zelda-gameplay__background--${previousImage}`} src={asset(backgrounds[previousImage])} alt="" />}
        <img key={selectedImage} className={`zelda-gameplay__background zelda-gameplay__background--${selectedImage}`} src={asset(backgrounds[selectedImage])} alt="" onAnimationEnd={() => setPreviousImage(null)} />
        <div key={selectedImage} className="zelda-gameplay__foreground">
        <div className="zelda-gameplay__heading">
          <p>나만의 모험</p>
          <h2 id="zelda-gameplay-title">GAMEPLAY</h2>
        </div>
        <div className="zelda-gameplay__activities">
          {activities.map(([id, title, description]) => (
            <div className={`zelda-gameplay__activity zelda-gameplay__activity--${id}`} key={id}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
          <img className="zelda-gameplay__timeline" src={asset('timeline.svg')} alt="" />
        </div>
        {['korok', 'travel', 'sword', 'landscape', 'solve', 'cook'].map(name => {
          const interactive = name in views;
          const Tag = interactive ? 'button' : 'div';
          return (
          <Tag key={name} className={`zelda-gameplay__diamond zelda-gameplay__diamond--${name}`}
            {...(interactive ? {
              type: 'button',
              'aria-label': `${views[name]} 화면 보기`,
              'aria-pressed': selectedImage === name,
              onClick: () => goToImage(name),
            } : {})}>
            {name === 'cook' && <img className="zelda-gameplay__image-base" src={asset('image-base.svg')} alt="" />}
            <img className="zelda-gameplay__diamond-image" src={asset(`${name}.png`)} alt="" loading="lazy" />
            {interactive && name !== 'sword' && <img className="zelda-gameplay__diamond-image zelda-gameplay__hover-image" src={asset(name === 'cook' ? 'cook-hover.png' : `${name}.png`)} alt="" hidden={selectedImage !== name} />}
          </Tag>
          );
        })}
        <div className="zelda-gameplay__left-frame"><img src={asset('left-frame.svg')} alt="" /></div>
        <img className="zelda-gameplay__right-frame" src={asset('right-frame.svg')} alt="" />
        <div className="zelda-gameplay__diamond-border zelda-gameplay__diamond-border--solve" aria-hidden="true" />
        <div className="zelda-gameplay__diamond-border zelda-gameplay__diamond-border--cook" aria-hidden="true" />
        <p className="zelda-gameplay__note">더 많은 콘텐츠는 게임에서 만나보세요.</p>
        </div>
      </div>
      </div>
    </section>
  );
}
