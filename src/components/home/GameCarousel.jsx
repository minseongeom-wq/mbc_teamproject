import { homeAsset } from './homeAssets.js';
import { homeGames } from './homeGames.js';

const cardArt = [
  (
              <div className="home-discovery__game-card-01" data-node-id="1148:6530" data-name="Game-Card-01">
                <div className="home-discovery__game-image" data-node-id="1148:6531" data-name="Game image">
                  <img alt="" className="home-discovery__image-3" src={homeAsset('ede00.svg')} />
                </div>
                <div className="home-discovery__icon" data-node-id="1148:6532" data-name="Icon" />
                <div className="home-discovery__icon-2" data-node-id="1148:6533" data-name="Icon" />
                <div className="home-discovery__icon-3" data-node-id="1148:6534" data-name="Icon" />
                <div className="home-discovery__icon-4" data-node-id="1148:6535" data-name="Icon" />
                <p className="home-discovery__text-4" data-node-id="1148:6536">
                  TEC
                </p>
              </div>
  ),
  (
              <div className="home-discovery__game-card-02" data-node-id="1148:6537" data-name="Game-Card-02">
                <div className="home-discovery__game-image-2" data-node-id="1148:6538" data-name="Game image">
                  <img alt="" className="home-discovery__image-4" src={homeAsset('1e273.svg')} />
                </div>
                <div className="home-discovery__icon-5" data-node-id="1148:6539" data-name="Icon">
                  <img alt="" className="home-discovery__image-5" src={homeAsset('eefb3.png')} />
                </div>
                <div className="home-discovery__icon-6" data-node-id="1148:6540" data-name="Icon">
                  <img alt="" className="home-discovery__image-6" src={homeAsset('ab137.png')} />
                </div>
              </div>
  ),
  (
              <div className="home-discovery__game-card-active" data-node-id="1148:6541" data-name="Game-Card-Active">
                <div className="home-discovery__game-image-3" data-node-id="1148:6542" data-name="Game image">
                  <img alt="" className="home-discovery__image-7" src={homeAsset('c0ed6.svg')} />
                </div>
                <div className="home-discovery__icon-7" data-node-id="1148:6543" data-name="Icon">
                  <img alt="" className="home-discovery__image-8" src={homeAsset('1d81c.png')} />
                </div>
                <div className="home-discovery__icon-8" data-node-id="1148:6544" data-name="Icon">
                  <img alt="" className="home-discovery__image-9" src={homeAsset('ac1d0.png')} />
                </div>
                <div className="home-discovery__icon-9" data-node-id="1148:6545" data-name="Icon">
                  <img alt="" className="home-discovery__image-10" src={homeAsset('e4a61.png')} />
                </div>
                <div className="home-discovery__icon-10" data-node-id="1148:6546" data-name="Icon">
                  <div className="home-discovery__layer">
                    <img alt="" className="home-discovery__image-11" src={homeAsset('5ebab.png')} />
                  </div>
                </div>
              </div>
  ),
  (
              <div className="home-discovery__game-card-04" data-node-id="1148:6547" data-name="Game-Card-04">
                <div className="home-discovery__game-image-4" data-node-id="1148:6548" data-name="Game image">
                  <img alt="" className="home-discovery__image-12" src={homeAsset('22377.svg')} />
                </div>
                <div className="home-discovery__icon-11" data-node-id="1148:6549" data-name="Icon">
                  <div className="home-discovery__layer-2">
                    <img alt="" className="home-discovery__image-13" src={homeAsset('9fa86.png')} />
                  </div>
                </div>
                <div className="home-discovery__icon-12" data-node-id="1148:6550" data-name="Icon">
                  <img alt="" className="home-discovery__image-14" src={homeAsset('67e7b.png')} />
                </div>
              </div>
  ),
  (
              <div className="home-discovery__game-card-05" data-node-id="1148:6551" data-name="Game-Card-05">
                <div className="home-discovery__game-image-5" data-node-id="1148:6552" data-name="Game image">
                  <img alt="" className="home-discovery__image-15" src={homeAsset('ce1b3.svg')} />
                </div>
                <div className="home-discovery__icon-13" data-node-id="1148:6553" data-name="Icon">
                  <img alt="" className="home-discovery__image-16" src={homeAsset('dd368.png')} />
                </div>
                <div className="home-discovery__icon-14" data-node-id="1148:6554" data-name="Icon">
                  <img alt="" className="home-discovery__image-17" src={homeAsset('a47e9.png')} />
                </div>
                <div className="home-discovery__icon-15" data-node-id="1148:6555" data-name="Icon">
                  <img alt="" className="home-discovery__image-18" src={homeAsset('a47e9.png')} />
                </div>
                <div className="home-discovery__icon-16" data-node-id="1148:6556" data-name="Icon" />
              </div>
  )
];

export default function GameCarousel({ active, onSelect, mode }) {
  const visible = homeGames.map((game, index) => ({ ...game, index })).filter(game => mode !== 'together' || game.together);
  const activePosition = visible.findIndex(game => game.index === active);
  return (
    <div className="home-discovery__game-carousel home-game-carousel" role="group" aria-label="게임 선택" style={{ left: 254.81 - activePosition * 268.545 }} onKeyDown={event => {
      const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      const next = visible[(activePosition + direction + visible.length) % visible.length].index;
      onSelect(next);
      event.currentTarget.querySelector('[data-game="' + next + '"]').focus();
    }}>
      {visible.map(game => {
        const size = game.index === active ? 338.733 : 237.266;
        return <button type="button" key={game.index} data-game={game.index} aria-label={game.title} aria-pressed={game.index === active} onClick={() => onSelect(game.index)} className="home-game-carousel__card" style={{ width: size, height: size }}>
          <span className="home-game-carousel__art" style={{ zoom: size / (game.index === 2 ? 338.733 : 237.266) }}>{cardArt[game.index]}</span>
        </button>;
      })}
    </div>
  );
}
