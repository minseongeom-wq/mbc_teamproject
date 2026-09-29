import { useState } from 'react';
import './zeldaCharacterSection.css';

const characters = [
  {
    id: 'link', name: '링크', title: 'LINK',
    intro: '하이랄의 운명을 짊어진 용감한 영웅, 링크.\n검과 방패를 들고 광활한 세계와 던전을 탐험하며,\n수많은 시련과 수수께끼를 헤쳐 나갑니다.\n시대를 넘어 하이랄과 젤다를 지켜온 전설의 용사입니다.',
    description: '과묵하지만 강한 의지를 지닌 용사.\n다양한 능력과 도구를 활용하며,\n스스로 새로운 길을 개척합니다.',
  },
  {
    id: 'zelda', name: '젤다', title: 'ZELDA',
    intro: '하이랄 왕가의 혈통을 이어받은 공주, 젤다.\n지혜와 용기를 바탕으로 하이랄의 운명에 맞서며,\n때로는 특별한 힘으로 위기에 처한 왕국을 지켜냅니다.\n링크와 함께 전설의 중심에 서 있는 인물입니다.',
    description: '강인한 의지와 지혜를 지닌 공주.\n시대마다 서로 다른 모습으로 등장하며,\n하이랄의 운명을 이끌어 갑니다.',
  },
  {
    id: 'mipha', name: '미파', title: 'MIPHA',
    intro: '조라족의 공주이자 뛰어난 치유 능력을 지닌 영걸, 미파.\n온화하고 다정한 마음으로 동료들을 보살피며,\n하이랄을 지키기 위해 신수 바·루타의 조종자로 나섭니다. 링크를 향한 깊은 마음을 간직한 용감한 전사입니다.',
    description: '물의 힘과 치유의 능력을 지닌 존재.\n조용하지만 굳은 의지로 하이랄을 위해 싸우며,\n위기의 순간에도 소중한 이를 지켜냅니다.',
  },
  {
    id: 'impa', name: '임파', title: 'IMPA',
    intro: '오랜 세월 하이랄 왕가와 함께해 온 인물, 임파.\n여러 시대에 걸쳐 서로 다른 모습으로 등장하며,\n젤다를 지키고 링크의 모험을 이끌어 줍니다.\n하이랄의 역사와 비밀을 이어주는 중요한 존재입니다..',
    description: '왕가를 지키며 용사를 돕는 조력자.\n오랜 지식과 경험을 바탕으로,\n모험에 필요한 길을 알려줍니다.',
  },
  {
    id: 'ganondorf', name: '가논돌프', title: 'GANONDORF',
    intro: '강대한 힘을 지닌 마왕, 가논돌프.\n하이랄과 트라이포스의 힘을 손에 넣기 위해,\n시대를 넘어 링크와 젤다 앞에 모습을 드러냅니다.\n전설 속에서 끊임없이 되살아나는 강력한 숙적입니다.',
    description: '힘의 트라이포스와 연결된 존재.\n압도적인 힘과 야망으로 하이랄을 위협하며,\n용사와 공주의 운명에 맞섭니다.',
  },
  {
    id: 'beedle', name: '테리', title: 'Beedle',
    intro: '커다란 배낭을 메고 곳곳을 누비는 행상인, 테리.\n모험에 필요한 다양한 물건을 사고팔며,\n여러 지역에서 링크와 마주치는 친숙한 상인입니다.\n특유의 말투와 모습으로 기억되는 개성 넘치는 인물입니다.',
    description: '여행자에게 필요한 물건을 판매하는 상인.\n하이랄 곳곳을 부지런히 오가며,\n링크의 긴 모험에 작지만 든든한 도움을 건넵니다.',
  },
];
const asset = name => `${import.meta.env.BASE_URL}images/zelda/${name}.png`;

export default function ZeldaCharacterSection() {
  const [selectedId, setSelectedId] = useState('link');
  const selected = characters.find(character => character.id === selectedId);

  return (
    <section className={`zelda-character zelda-character--${selected.id}`} aria-labelledby="zelda-character-title">
      <div className="zelda-character__canvas">
        <img className="zelda-character__background" src={asset('character-background')} alt="" loading="lazy" />
        <div className="zelda-character__heading">
          <p>전설을 잇는 자들</p>
          <h2 id="zelda-character-title">character</h2>
        </div>
        <div className="zelda-character__intro" aria-live="polite" aria-atomic="true">
          <h3>{selected.title}</h3>
          <p>{selected.intro}</p>
        </div>
        <div className="zelda-character__portrait">
          <span className="zelda-character__light" aria-hidden="true" />
          <div className="zelda-character__portrait-art">
            <img src={asset(`character-${selected.id}`)} alt={selected.name} />
          </div>
        </div>
        <p className="zelda-character__description">{selected.description}</p>
        <ul className="zelda-character__thumbnails" aria-label="등장 캐릭터">
          {characters.map(({ id, name }) => (
            <li key={id}>
              <button
                type="button"
                className={`zelda-character__thumbnail zelda-character__thumbnail--${id}`}
                aria-label={`${name} 소개 보기`}
                aria-pressed={selectedId === id}
                onClick={() => setSelectedId(id)}
              >
                <div className="zelda-character__crop"><img src={asset(`character-${id}`)} alt="" loading="lazy" /></div>
              </button>
            </li>
          ))}
        </ul>
        <div className="zelda-character__diamonds" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => <span key={index} />)}
        </div>
        <div className="zelda-character__diamonds zelda-character__diamonds--overlay" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => <span key={index} />)}
        </div>
        <p className="zelda-character__note">더 많은 캐릭터를 게임에서 만나보세요.</p>
      </div>
    </section>
  );
}
