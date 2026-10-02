import { useState } from 'react';
import './zeldaContent4Section.css';

const asset = name => `${import.meta.env.BASE_URL}images/zelda/village-${name}.png`;
const villages = [
  ['kakariko', 'Kakariko Village', '카카리코 마을'],
  ['zora', "Zora's Domain", '조라의 마을'],
  ['gerudo', 'Gerudo Town', '겔드의 마을'],
];

export default function ZeldaContent4Section() {
  const [selected, setSelected] = useState('kakariko');
  const views = { kakariko: 'content4', zora: 'content4_2', gerudo: 'content4_3' };
  return (
    <section className="zelda-villages" data-view={views[selected]} aria-labelledby="zelda-villages-title">
      {villages.map(([id]) => <img key={id} className={`zelda-villages__background zelda-villages__background--${id}`} src={asset(id === 'kakariko' ? 'background' : id)} alt="" hidden={selected !== id} />)}
      <div className="zelda-villages__canvas">
        <div className="zelda-villages__heading">
          <p>모험이 머무는 곳</p>
          <h2 id="zelda-villages-title">VILLAGES OF HYRULE</h2>
        </div>
        {villages.map(([id, name, label]) => (
          <div className={`zelda-villages__village zelda-villages__village--${id}`} key={id}>
            <button type="button" className="zelda-villages__diamond" aria-label={`${name} ${label}`} aria-pressed={selected === id} onClick={() => setSelected(id)}>
              <img className="zelda-villages__image-base" src={`${import.meta.env.BASE_URL}images/zelda/gameplay-image-base.svg`} alt="" />
              <img className="zelda-villages__image" src={asset(id)} alt={label} loading="lazy" />
              <img className="zelda-villages__image zelda-villages__highlight" src={asset(id)} alt="" hidden={selected !== id} />
            </button>
            <div className="zelda-villages__border" aria-hidden="true" />
            <div className="zelda-villages__label">
              <h3>{name}</h3>
              <p>{label}</p>
            </div>
          </div>
        ))}
        <p className="zelda-villages__note">더 많은 콘텐츠는 게임에서 만나보세요.</p>
      </div>
    </section>
  );
}
