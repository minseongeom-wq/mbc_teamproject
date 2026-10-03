import { useEffect, useRef, useState } from 'react';
import './zeldaContent3Section.css';

const asset = name => `${import.meta.env.BASE_URL}images/zelda/combat-${name}`;
const video = name => `${import.meta.env.BASE_URL}videos/zelda/combat-${name}.mp4`;
const weapons = [
  ['sword', 'SWORD', '검', 'png'],
  ['bow', 'BOW', '활', 'svg'],
  ['shield', 'SHIELD', '방패', 'svg'],
  ['environment', 'ENVIRONMENT', '환경 활용', 'png'],
  ['elemental', 'ELEMENTAL COMBAT', '속성 공격', 'png'],
  ['robot', 'AUTO-COMBAT ROBOT', '자동 전투 로봇', 'png'],
];
const descriptions = [
  ['SWORD', ['빠른 공격으로 적에게 맞서세요.', '다양한 검을 손에 들고 다가오는 적의 빈틈을 노려', '강력한 공격을 펼쳐보세요.']],
  ['BOW', ['거리를 두고 활시위를 당겨', '적의 약점을 정확하게 노리세요.', '공중에서도 공격할 수 있습니다.']],
  ['SHIELD', ['적의 공격에 맞서', '방패로 몸을 지키세요.', '완벽한 방어가 반격으로 이어집니다.']],
  ['ENVIRONMENT', ['주변을 자세히 살펴보세요.', '바위와 폭탄, 지형까지 활용하면', '전투의 방법은 더욱 다양해집니다.']],
  ['ELEMENTAL', ['다양한 속성의 힘을 활용해 적을 공략하세요.', ' 불과 얼음, 전기 등 각 속성의 특징을 이용하고,', ' 주변 환경과 연계해 더욱 다채로운 전투를 펼쳐보세요.']],
  ['COMBAT ROBOT', ['자동으로 적을 추적해 전투를 맡겨보세요.', '다양한 조나우 기어를 조합해 전투 로봇을 만들고,', '적을 발견하면 스스로 공격하는 강력한 동료로 활용해 보세요.']],
];

export default function ZeldaContent3Section() {
  const [selected, setSelected] = useState(0);
  const listRef = useRef(null);
  const scrollTargetRef = useRef(0);
  const selectWeapon = index => {
    if (index !== selected) listRef.current?.closest('.zelda-combat')?.classList.remove('zelda-transition-settled');
    setSelected(index);
  };
  const moveCards = direction => {
    const list = listRef.current;
    const cards = list?.querySelectorAll('.zelda-combat__card');
    if (!cards || cards.length < 2) return;
    const cardStep = cards[1].offsetLeft - cards[0].offsetLeft;
    const maxScroll = list.scrollWidth - list.clientWidth;
    scrollTargetRef.current = Math.max(0, Math.min(maxScroll, scrollTargetRef.current + direction * cardStep));
    list.scrollTo({ left: scrollTargetRef.current, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  useEffect(() => {
    const list = listRef.current;
    const onWheel = event => {
      if (event.ctrlKey) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? list.clientWidth : 1;
      const next = Math.max(0, Math.min(list.scrollWidth - list.clientWidth, list.scrollLeft + delta * unit));
      if (next !== list.scrollLeft) {
        event.preventDefault();
        list.scrollLeft = next;
        scrollTargetRef.current = next;
      }
    };
    const onScrollEnd = () => { scrollTargetRef.current = list.scrollLeft; };
    list.addEventListener('wheel', onWheel, { passive: false });
    list.addEventListener('scrollend', onScrollEnd);
    return () => {
      list.removeEventListener('wheel', onWheel);
      list.removeEventListener('scrollend', onScrollEnd);
    };
  }, []);
  return (
    <section className="zelda-combat" data-view={selected === 0 ? 'content3' : `content3_${selected + 1}`} aria-labelledby="zelda-combat-title">
      <div className="zelda-combat__canvas">
        {weapons[selected][0] === 'elemental' ? (
          <img key="elemental" className="zelda-combat__background zelda-combat__background--elemental" src={asset('elemental-background.gif')} alt="" />
        ) : (
          <video key={weapons[selected][0]} className={`zelda-combat__background zelda-combat__background--${weapons[selected][0]}`} src={video(weapons[selected][0])} autoPlay muted loop playsInline aria-hidden="true" />
        )}
        <div className="zelda-combat__shade" />
        <div className="zelda-combat__heading">
          <p>모험을 위한 기술</p>
          <h2 id="zelda-combat-title">COMBAT</h2>
        </div>
        <div key={weapons[selected][0]} className="zelda-combat__description">
          <h3>{descriptions[selected][0]}</h3>
          <p>{descriptions[selected][1].map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p>
          <div className="zelda-combat__arrows">
            <button type="button" aria-label="이전 카드" onClick={() => moveCards(-1)}><img src={asset('arrow-left.svg')} alt="" /></button>
            <button type="button" aria-label="다음 카드" onClick={() => moveCards(1)}><img src={asset('arrow-right.svg')} alt="" /></button>
          </div>
        </div>
        <div ref={listRef} className="zelda-combat__list" tabIndex={0} role="region" aria-label="전투 기술 목록">
          {weapons.map(([id, title, label, extension], index) => (
            <button type="button" className={`zelda-combat__card zelda-combat__card--${id}`} key={id} aria-pressed={selected === index} aria-label={`${title} ${label}`} onMouseEnter={() => selectWeapon(index)} onFocus={() => selectWeapon(index)} onClick={() => selectWeapon(index)}>
              <div className="zelda-combat__image-slot">
                <img src={asset(`${id}.${extension}`)} alt="" loading="lazy" />
              </div>
              <span className="zelda-combat__card-title">{title}</span>
              <p>{label}</p>
            </button>
          ))}
        </div>
        <p className="zelda-combat__note">더 많은 콘텐츠는 게임에서 만나보세요.</p>
      </div>
    </section>
  );
}
