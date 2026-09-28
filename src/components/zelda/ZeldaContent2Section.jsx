import './zeldaContent2Section.css';

const asset = name => `${import.meta.env.BASE_URL}images/zelda/gameplay-${name}`;
const activities = [
  ['explore', 'EXPLORE', '광활한 하이랄을 자유롭게 누비며 숨겨진 장소와 새로운 이야기를 발견하세요.'],
  ['solve', 'SOLVE', '주변 환경과 다양한 능력을 활용해 자신만의 방법으로 퍼즐을 해결하세요.'],
  ['cook', 'COOK', '모험에서 얻은 다양한 재료를 조합해 특별한 효과를 가진 음식을 만들어보세요.'],
  ['travel', 'TRAVEL', '달리고, 오르고, 활강하며 다양한 방법으로 하이랄 곳곳을 자유롭게 여행하세요.'],
];

export default function ZeldaContent2Section() {
  return (
    <section className="zelda-gameplay" aria-labelledby="zelda-gameplay-title">
      <div className="zelda-gameplay__canvas">
        <img className="zelda-gameplay__background-base" src={asset('sword.png')} alt="" loading="lazy" />
        <img className="zelda-gameplay__background" src={asset('background.png')} alt="" loading="lazy" />
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
        {['korok', 'travel', 'sword', 'landscape', 'solve', 'cook'].map(name => (
          <div key={name} className={`zelda-gameplay__diamond zelda-gameplay__diamond--${name}`}>
            {name === 'cook' && <img className="zelda-gameplay__image-base" src={asset('image-base.svg')} alt="" />}
            <img className="zelda-gameplay__diamond-image" src={asset(`${name}.png`)} alt="" loading="lazy" />
          </div>
        ))}
        <div className="zelda-gameplay__left-frame"><img src={asset('left-frame.svg')} alt="" /></div>
        <img className="zelda-gameplay__right-frame" src={asset('right-frame.svg')} alt="" />
        <div className="zelda-gameplay__diamond-border zelda-gameplay__diamond-border--solve" aria-hidden="true" />
        <div className="zelda-gameplay__diamond-border zelda-gameplay__diamond-border--cook" aria-hidden="true" />
        <div className="zelda-gameplay__diamonds" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => <span key={index} />)}
        </div>
        <p className="zelda-gameplay__note">더 많은 콘텐츠는 게임에서 만나보세요.</p>
      </div>
    </section>
  );
}
