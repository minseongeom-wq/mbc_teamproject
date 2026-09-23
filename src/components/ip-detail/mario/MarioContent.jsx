import { useState } from 'react';
import AppLink from '../../common/AppLink';
import { navigationRoutes } from '../../common/navigation/navigationLinks';
import { characters, worlds, powerUps } from './marioData';
import './style.css';

const images = import.meta.glob('./assets/*.{png,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const asset = (name, extension = 'png') => images[`./assets/${name}.${extension}`];

function SectionHeading({ badge, subtitle, children }) {
  return <header className="mario-content__heading">
    <span className="mario-content__badge">{badge}</span>
    <p>{subtitle}</p><h2>{children}</h2>
  </header>;
}

export default function MarioContent() {
  const [selected, setSelected] = useState(0);
  const character = characters[selected];
  const changeCharacter = (direction) => setSelected(index => (index + direction + characters.length) % characters.length);

  return <div className="mario-content" data-node-id="2127:8927" style={{ '--power-texture': `url("${asset('imgCon3MarioPowerUps')}")` }}>
    <section className="mario-content__hero" aria-labelledby="mario-title">
      <h1 id="mario-title" className="sr-only" tabIndex={-1}>SUPER NINTENDO WORLD — 마리오와 함께하는 모험</h1>
      <img className="mario-content__sky" src={asset('imgHero')} alt="" fetchPriority="high" />
      <img className="mario-content__cloud mario-content__cloud--left" src={asset('img16')} alt="" />
      <img className="mario-content__cloud mario-content__cloud--right" src={asset('img16')} alt="" />
      <img className="mario-content__logo" src={asset('img8D20F950367F4636823F1De375876E331')} alt="SUPER NINTENDO WORLD" />
      <img className="mario-content__cloud mario-content__cloud--middle" src={asset('img21')} alt="" />
      <img className="mario-content__friends" src={asset('imgFrame801')} alt="마리오, 루이지, 피치, 요시와 친구들" />
      <img className="mario-content__cloud-floor" src={asset('img41')} alt="" />
      <a className="mario-content__scroll" href="#mario-characters">SCROLL DOWN <span aria-hidden="true">↓</span></a>
    </section>

    <section className="mario-content__characters" id="mario-characters" aria-labelledby="mario-choose" style={{ '--character-color': character.color }}>
      <div className="mario-content__section-meta"><span>CHARACTERS</span><p>마리오와 친구들,<br />누가 궁금한가요?</p></div>
      <h2 id="mario-choose">CHOOSE YOUR PLAYER</h2>
      <div className="mario-content__character-list" role="group" aria-label="캐릭터 선택">
        {characters.map((item, index) => <button type="button" key={item.name} className="mario-content__character-button" aria-label={item.label} aria-pressed={selected === index} onClick={() => setSelected(index)} style={{ '--card-color': item.color }}>
          <img src={asset(item.image)} alt="" width="124" height="120" loading="lazy" />
        </button>)}
      </div>
      <div className="mario-content__character-stage">
        <img className="mario-content__character-circle" src={asset('imgBackgroundAccentCircleMario', 'svg')} alt="" loading="lazy" />
        <p className="mario-content__character-name" aria-hidden="true">{character.name}</p>
        <div className={`mario-content__portrait${selected === 0 ? ' mario-content__portrait--mario' : ''}`}>
          <img src={asset(selected === 0 ? 'imgNavigationNext' : character.image)} alt={character.label} loading="lazy" />
        </div>
        <button type="button" className="mario-content__character-prev" onClick={() => changeCharacter(-1)} aria-label="이전 캐릭터">‹</button>
        <button type="button" className="mario-content__character-next" onClick={() => changeCharacter(1)} aria-label="다음 캐릭터">›</button>
        <div className="mario-content__character-info" aria-live="polite" aria-atomic="true">
          <h3>{character.label} <small>({character.name})</small></h3>
          <p>{character.description}</p><p>{character.detail}</p>
        </div>
      </div>
    </section>

    <img className="mario-content__banner" src={asset('green-banner')} alt="LET’S-A GO — TO THE NEXT ADVENTURE!" width="1920" height="357" loading="lazy" />
    <section className="mario-content__worlds" aria-label="마리오의 월드">
      <SectionHeading badge="WORLD" subtitle="점프 하나로 펼쳐지는 다채로운 월드">달리고, 뛰고, 세계를 탐험해요!</SectionHeading>
      <div className="mario-content__journey">
        {worlds.map((world, index) => <article key={world.id} id={`mario-world-${index}`} className={`mario-content__world mario-content__world--${world.id}`} style={{ '--world-scene': `url("${asset(world.id)}")` }}>
          <img className="mario-content__world-art" src={asset(world.art)} alt="" loading="lazy" />
          <img className="mario-content__world-scene" src={asset(world.id)} alt={`${world.name} 게임 화면`} width="783" height="427" loading="lazy" />
          <div className="mario-content__world-info"><span>WORLD {String(index + 1).padStart(2, '0')}</span><h3>{world.name}</h3><p>{world.description}</p>
            <a href={index < worlds.length - 1 ? `#mario-world-${index + 1}` : '#mario-power'} aria-label={index < worlds.length - 1 ? `다음 월드: ${worlds[index + 1].name}` : '파워업 아이템 보기'}>→</a>
          </div>
        </article>)}
      </div>
      <a className="mario-content__next-stage" href="#mario-power"><span aria-hidden="true">★</span> NEXT STAGE <span aria-hidden="true">→</span></a>
    </section>
    <img className="mario-content__banner mario-content__banner--yellow" src={asset('yellow-banner')} alt="다양한 모습으로 변신한 마리오" width="1920" height="460" loading="lazy" />
    <section className="mario-content__power" id="mario-power" aria-label="마리오 파워업">
      <SectionHeading badge="POWER" subtitle="아이템 하나로 달라지는 마리오">새로운 모습과 능력을 발견해요</SectionHeading>
      <div className="mario-content__power-stage">
        <img className="mario-content__power-mario" src={asset('imgCharacterArtMarioDefault')} alt="점프하는 마리오" width="617" height="849" loading="lazy" />
        {powerUps.map(item => <div className={`mario-content__power-item mario-content__power-item--${item.id}`} key={item.id}><h3>{item.name}</h3><img src={asset(item.image)} alt={item.label} width="220" height="220" loading="lazy" /></div>)}
        <img className="mario-content__power-decor mario-content__power-decor--left" src={asset('imgAsset1330')} alt="" loading="lazy" />
        <img className="mario-content__power-decor mario-content__power-decor--bottom" src={asset('imgAsset133002')} alt="" loading="lazy" />
        <img className="mario-content__power-decor mario-content__power-decor--right" src={asset('imgAsset1344')} alt="" loading="lazy" />
      </div>
    </section>
    <section className="mario-content__store" aria-labelledby="mario-store-title">
      <div className="mario-content__store-copy">
        <img className="mario-content__switch-logo" src={asset('imgLogoNintendoSwitch2', 'svg')} alt="Nintendo Switch 2" width="132" height="122" loading="lazy" />
        <h2 id="mario-store-title">Nintendo Store에서<br />새로운 게임을 만나보세요</h2>
        <p>다양한 Nintendo 게임을 만나보세요.<br />인기 타이틀과 신작을 한눈에 확인하고,<br />취향에 맞는 게임을 찾아 즐겨보세요.</p>
        <small>※ 일부 상품은 별도 구매가 필요합니다.<br />※ 자세한 상품 정보는 Nintendo Store에서 확인해 주세요.</small>
        <AppLink className="mario-content__store-link" to={navigationRoutes.store}><span aria-hidden="true">➜</span> 자세한 내용은 이쪽에서</AppLink>
      </div>
      <div className="mario-content__store-media">
        <img className="mario-content__tv" src={asset('imgDeviceTvFrame')} alt="" loading="lazy" />
        <img className="mario-content__gameplay" src={asset('gameplay')} alt="마리오 게임 플레이 화면" loading="lazy" />
        <img className="mario-content__store-mario" src={asset('imgCharacterArtMario')} alt="" loading="lazy" />
        <img className="mario-content__console" src={asset('imgDeviceNintendoSwitch2Console')} alt="Nintendo Switch 2 본체" loading="lazy" />
      </div>
    </section>
  </div>;
}
