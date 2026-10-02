import MobileGameCarousel from './MobileGameCarousel.jsx';
import { useState } from 'react';
import GameCarousel from './GameCarousel.jsx';
import { homeGames } from './homeGames.js';
import { homeAsset } from './homeAssets.js';
import useDiscoveryScroll from './useDiscoveryScroll.js';
import './GameDiscoveryScroll.css';

export default function GameDiscoverySection({ mobile = false }) {
  const [active, setActive] = useState(2);
  const [mode, setMode] = useState('solo');
  const discoveryScroll = useDiscoveryScroll({ mobile, mode, onSelect: setActive });
  function selectMode(nextMode) {
    const nextActive = nextMode === 'together' && !homeGames[active].together ? 1 : active;
    discoveryScroll.reset(nextMode, nextActive);
    setMode(nextMode);
    setActive(nextActive);
  }
  if (mobile) return (
      <section ref={discoveryScroll.sectionRef} aria-label="게임 둘러보기" className="home-discovery-mobile" data-scroll-position={discoveryScroll.position} data-node-id="2156:6633" data-name="게임기 - 젤다">
        <div className="home-discovery-mobile__layer" data-node-id="2156:6634">
          <button type="button" className="home-discovery-mobile__text" data-node-id="2156:6635" aria-pressed={mode === 'together'} onClick={() => selectMode('together')}>Play Together</button>
        </div>
        <div className="home-discovery-mobile__layer-2" data-mode={mode} data-node-id="2156:6636">
          <button type="button" className="home-discovery-mobile__text-2" data-node-id="2156:6637" aria-pressed={mode === 'solo'} onClick={() => selectMode('solo')}>Play Solo</button>
        </div>
        <div className="home-discovery-mobile__layer-3" data-node-id="2156:6638" aria-live="polite">
          <p className="home-discovery-mobile__text-3" data-node-id="2156:6639">
            {active === 1 ? '슈퍼 마리오 오디세이' : homeGames[active].title}
          </p>
        </div>
        <div className="home-discovery-mobile__layer-7" data-node-id="2156:6643">
          <div className="home-discovery-mobile__layer-8" data-node-id="2156:6644">
            <p className="home-discovery-mobile__text-4">어떤 게임을 즐겨볼까요?</p>
            <p className="home-discovery-mobile__text-5">{` `}</p>
            <p className="home-discovery-mobile__text-6">{`지금 마음에 드는 게임을 찾아 `}</p>
            <p className="home-discovery-mobile__text-7">나만의 플레이를 시작해 보세요!</p>
          </div>
          <div className="home-discovery-mobile__image-817" data-node-id="2156:6645" data-name="image 817">
            <img alt="" className="home-discovery-mobile__image-4" src={homeAsset('b1a62.png')} />
          </div>
          <div className="home-discovery-mobile__image-816" data-node-id="2156:6646" data-name="image 816">
            <img alt="" className="home-discovery-mobile__image-5" src={homeAsset('f006d.png')} />
          </div>
        </div>
        <div className="home-discovery-mobile__layer-9" data-node-id="2156:6647">
          <img alt="" className="home-discovery-mobile__image-6" src={homeAsset('c2990.svg')} />
        </div>
        <div className="home-discovery-mobile__layer-10" data-node-id="2156:6652">
          <div className="home-discovery-mobile__layer-11" data-node-id="2156:7165" data-name="하이랄 로고">
            <div className="home-discovery-mobile__layer-12">
              <img alt="" className="home-discovery-mobile__image-7" src={homeAsset('659bc.png')} />
            </div>
          </div>
          <p className="home-discovery-mobile__text-8" data-node-id="2156:6654">
            {active === 1 ? '슈퍼 마리오 오디세이' : homeGames[active].description}
          </p>
          <div className="home-discovery-mobile__layer-13" data-node-id="2156:7201" data-name="시커스톤 로고">
            <div className="home-discovery-mobile__layer-14">
              <img alt="" className="home-discovery-mobile__image-8" src={homeAsset('2e95b.png')} />
            </div>
          </div>
        </div>
        <MobileGameCarousel active={active} onSelect={discoveryScroll.select} mode={mode} />
      </section>
  );
  return (
      <section ref={discoveryScroll.sectionRef} aria-label="게임 둘러보기" className="home-discovery" data-scroll-position={discoveryScroll.position} data-node-id="1148:6518" data-name="02_Game-Discovery">
        <div className="home-discovery__game-discovery-console" data-node-id="1148:6519" data-name="Game-Discovery-Console">
          <img alt="" className="home-discovery__console-shell" data-node-id="3760:4622" src={homeAsset('1cd5b.png')} />
          <div className="home-discovery__console-image" data-node-id="1148:6520" data-name="Console image">
            <img alt="" className="home-discovery__image" src={homeAsset('discovery-console-right.png')} />
          </div>
          <div className="home-discovery__game-background" data-node-id="1148:6521" data-name="Game background">
            <div className="home-discovery__background-image" data-node-id="1148:6522" data-name="Background image">
              <img alt="" className="home-discovery__image-2" src={homeAsset('75de7.svg')} />
            </div>
          </div>
          <div className="home-discovery__game-carousel-viewport" data-node-id="1148:6523" data-name="Game-Carousel-Viewport">
            <div className="home-discovery__game-playmode-nav" data-node-id="1148:6524" data-name="Game-Playmode-Nav">
              <p className="home-discovery__text" data-node-id="1148:6525">
                11:27
              </p>
              <button type="button" className="home-discovery__text-2" data-node-id="1148:6526" aria-pressed={mode === 'solo'} onClick={() => selectMode('solo')}>Play Solo</button>
              <button type="button" className="home-discovery__text-3" data-node-id="1148:6527" aria-pressed={mode === 'together'} onClick={() => selectMode('together')}>Play Together</button>
            </div>
            <GameCarousel active={active} onSelect={discoveryScroll.select} mode={mode} scrollPosition={discoveryScroll.position} />
          </div>
          <div className="home-discovery__game-selected-info" data-node-id="1148:6557" data-name="Game-Selected-Info" aria-live="polite">
            <div className="home-discovery__game-title-block" data-node-id="1148:6559" data-name="Game-Title-Block">
              <p className="home-discovery__text-5" data-node-id="1148:6560">
                {homeGames[active].title}
              </p>
              <div className="home-discovery__game-description" data-node-id="1148:6561" data-name="Game-Description">
                <div className="home-discovery__element" data-node-id="1148:6562" data-name="element">
                  <img alt="" className="home-discovery__image-19" src={homeAsset('55185.svg')} />
                </div>
                <p className="home-discovery__text-6" data-node-id="1148:6565">
                  {homeGames[active].description}
                </p>
              </div>
            </div>
          </div>
          <div className="home-discovery__console-image-2" data-node-id="1148:6566" data-name="Console image">
            <img alt="" className="home-discovery__image-20" src={homeAsset('discovery-console-left.png')} />
          </div>
        </div>
        <div className="home-discovery__layer-3" data-node-id="1148:6567">
          <p className="home-discovery__text-7">
            어떤 게임을 즐겨볼까요?
            <br aria-hidden />
            {` 혼자 떠나는 짜릿한 모험부터 가족, 친구와 함께하는 즐거운 플레이까지.`}
          </p>
          <p className="home-discovery__text-8">지금 마음에 드는 게임을 찾아 나만의 플레이를 시작해 보세요!</p>
        </div>
      </section>
  );
}
