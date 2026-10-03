import { homeAsset } from './homeAssets.js';

const art = {
  1: (        <div className="home-discovery-mobile__layer-15" style={{ position: "relative", left: 0, top: 0 }} data-node-id="2156:7035">
          <div className="home-discovery-mobile__image-1094" data-node-id="2156:7036" data-name="image 1094">
            <div className="home-discovery-mobile__layer-16">
              <img alt="" className="home-discovery-mobile__image-9" src={homeAsset('5ca73.png')} />
            </div>
          </div>
        </div>),
  2: (        <div className="home-discovery-mobile__image-1095" style={{ position: "relative", left: 0, top: 0 }} data-node-id="2156:7120" data-name="image 1095">
          <div className="home-discovery-mobile__layer-19">
            <img alt="" className="home-discovery-mobile__image-12" src={homeAsset('d7b7b.png')} />
          </div>
        </div>),
  3: (        <div className="home-discovery-mobile__3" style={{ position: "relative", left: 0, top: 0 }} data-node-id="2156:7037" data-name="스플래툰3">
          <div className="home-discovery-mobile__image-1093" data-node-id="2156:7038" data-name="image 1093">
            <img alt="" className="home-discovery-mobile__image-10" src={homeAsset('345e5.png')} />
          </div>
          <div className="home-discovery-mobile__layer-17" data-node-id="2156:7039">
            <div className="home-discovery-mobile__layer-18">
              <div className="home-discovery-mobile__logo-1" data-name="logo 1">
                <img alt="" className="home-discovery-mobile__image-11" src={homeAsset('9b8f1.png')} />
              </div>
            </div>
          </div>
        </div>),
};
const names = { 1: '슈퍼 마리오 오디세이', 2: '젤다의 전설', 3: '스플래툰 3' };
export default function MobileGameCarousel({ active, onSelect, mode }) {
  const games = mode === 'together' ? [1, 3] : [1, 2, 3];
  const position = games.indexOf(active);
  function move(direction) { onSelect(games[(position + direction + games.length) % games.length]); }
  return <div className="home-mobile-carousel" role="group" aria-label="게임 선택" onKeyDown={event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
  }}>
    {[-1, 0, 1].map(offset => {
      const index = games[(position + offset + games.length) % games.length];
      const selected = offset === 0;
      const width = selected ? 242 : 205;
      const height = selected ? 284 : 239;
      return <button type="button" key={offset} className="home-mobile-carousel__card" aria-label={names[index]} aria-pressed={selected} onClick={() => onSelect(index)} style={{ left: selected ? 59 : offset < 0 ? -164 : 319, top: selected ? 318 : 343, width, height }}>
        <span className="home-mobile-carousel__art" style={{ transform: 'scale(' + width / (index === 2 ? 242 : 205) + ', ' + height / (index === 2 ? 284 : 239) + ')' }}>{art[index]}</span>
      </button>;
    })}
  </div>;
}
