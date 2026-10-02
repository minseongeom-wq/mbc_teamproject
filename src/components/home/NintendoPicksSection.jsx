import { useRef } from 'react';
import usePicksMotion from './usePicksMotion.js';
import upperLine from './assets/picks-upper-line.svg?raw';
import lowerLine from './assets/picks-lower-line.svg?raw';
import { homeAsset } from './homeAssets.js';

const checkpoints = [
  ['2485:10409', 'ed445.svg', 1526, 3338],
  ['2485:10410', '644e2.svg', 240, 486],
  ['2485:10411', '78360.svg', 1065, 1329],
  ['2485:10412', '2f93a.svg', 181, 1155],
  ['2485:10413', 'f7b83.svg', 280, 2887],
  ['2485:10414', 'ab508.svg', 928, 937],
  ['2485:10415', '9006b.svg', 1588, 486],
  ['2485:10416', '7b060.svg', 604, 2201],
  ['2485:10417', '4a4e8.svg', 1212, 2258],
  ['2485:10418', '9e849.svg', 1080, 2916],
  ['2485:10419', 'ca366.svg', 606, 3682],
];

export default function NintendoPicksSection({ mobile = false }) {
  const sectionRef = useRef(null);
  usePicksMotion(sectionRef, mobile);
  if (mobile) return (
      <section aria-label="Nintendo Picks" className="home-picks-mobile" data-node-id="2156:6672">
        <p className="home-picks-mobile__text" data-node-id="2156:6673">
          NINTENDO PICKS 07
        </p>
        <p className="home-picks-mobile__text-2" data-node-id="2156:6674">
          지금 주목해야 할 7가지 소식
        </p>
        <div className="home-picks-mobile__mobilenewscard" data-node-id="2156:6675" data-name="MobileNewscard">
          <div className="home-picks-mobile__img-image" data-node-id="I2156:6675;1833:12340" data-name="img/image">
            <img alt="" className="home-picks-mobile__image" src={homeAsset('addc4.svg')} />
          </div>
          <div className="home-picks-mobile__textbox" data-node-id="I2156:6675;1799:10937" data-name="TextBox">
            <div className="home-picks-mobile__layer" data-node-id="I2156:6675;1799:10932">
              <div className="home-picks-mobile__layer-2" data-node-id="I2156:6675;1799:10954">
                <div className="home-picks-mobile__layer-3" data-node-id="I2156:6675;1799:10950">
                  <div className="home-picks-mobile__layer-4" data-node-id="I2156:6675;1833:12341">
                    <p className="home-picks-mobile__text-3">{`젤다의 전설 시리즈 `}</p>
                    <p className="home-picks-mobile__text-4">40주년을 기념한 특별 다이렉트</p>
                  </div>
                  <p className="home-picks-mobile__text-5" data-node-id="I2156:6675;1833:12342">{`젤다의 전설 시리즈 40주년을 기념한 특별 Nintendo Direct. `}</p>
                </div>
                <p className="home-picks-mobile__text-6" data-node-id="I2156:6675;1833:12343">
                  1
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-picks-mobile__mobilenewscard-2" data-node-id="2156:6676" data-name="MobileNewscard">
          <div className="home-picks-mobile__img-image-2" data-node-id="I2156:6676;1833:12340" data-name="img/image">
            <img alt="" className="home-picks-mobile__image-2" src={homeAsset('0ef20.svg')} />
          </div>
          <div className="home-picks-mobile__textbox-2" data-node-id="I2156:6676;1799:10937" data-name="TextBox">
            <div className="home-picks-mobile__layer-5" data-node-id="I2156:6676;1799:10932">
              <div className="home-picks-mobile__layer-6" data-node-id="I2156:6676;1799:10954">
                <div className="home-picks-mobile__layer-7" data-node-id="I2156:6676;1799:10950">
                  <div className="home-picks-mobile__layer-8" data-node-id="I2156:6676;1833:12341">
                    <p className="home-picks-mobile__text-7">ELDEN RING</p>
                    <p className="home-picks-mobile__text-8">빛바랜 자 에디션</p>
                  </div>
                  <div className="home-picks-mobile__layer-9" data-node-id="I2156:6676;1833:12342">
                    <p className="home-picks-mobile__text-9">{`『ELDEN RING』이 Nintendo Switch 2로 출시. `}</p>
                    <p className="home-picks-mobile__text-10">본 게임은 스위치 2 전용 에디션.</p>
                  </div>
                </div>
                <p className="home-picks-mobile__text-11" data-node-id="I2156:6676;1833:12343">
                  2
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-picks-mobile__mobilenewscard-3" data-node-id="2156:6677" data-name="MobileNewscard">
          <div className="home-picks-mobile__img-image-3" data-node-id="I2156:6677;1833:12340" data-name="img/image">
            <img alt="" className="home-picks-mobile__image-3" src={homeAsset('56acc.svg')} />
          </div>
          <div className="home-picks-mobile__textbox-3" data-node-id="I2156:6677;1799:10937" data-name="TextBox">
            <div className="home-picks-mobile__layer-10" data-node-id="I2156:6677;1799:10932">
              <div className="home-picks-mobile__layer-11" data-node-id="I2156:6677;1799:10954">
                <div className="home-picks-mobile__layer-12" data-node-id="I2156:6677;1799:10950">
                  <div className="home-picks-mobile__layer-13" data-node-id="I2156:6677;1833:12341">
                    <p className="home-picks-mobile__text-12">{`Xenoblade Genesis `}</p>
                    <p className="home-picks-mobile__text-13">2027년 발매</p>
                  </div>
                  <div className="home-picks-mobile__layer-14" data-node-id="I2156:6677;1833:12342">
                    <p className="home-picks-mobile__text-14">{`제노블레이드 시리즈의 새로운 출발점이 되는 신작. `}</p>
                    <p className="home-picks-mobile__text-15">{`Switch2 전용으로 2027년 출시 예정입니다.  `}</p>
                  </div>
                </div>
                <p className="home-picks-mobile__text-16" data-node-id="I2156:6677;1833:12343">
                  3
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-picks-mobile__mobilenewscard-4" data-node-id="2156:6678" data-name="MobileNewscard">
          <div className="home-picks-mobile__img-image-4" data-node-id="I2156:6678;1833:12340" data-name="img/image">
            <img alt="" className="home-picks-mobile__image-4" src={homeAsset('e253b.svg')} />
          </div>
          <div className="home-picks-mobile__textbox-4" data-node-id="I2156:6678;1799:10937" data-name="TextBox">
            <div className="home-picks-mobile__layer-15" data-node-id="I2156:6678;1799:10932">
              <div className="home-picks-mobile__layer-16" data-node-id="I2156:6678;1799:10954">
                <div className="home-picks-mobile__layer-17" data-node-id="I2156:6678;1799:10950">
                  <div className="home-picks-mobile__layer-18" data-node-id="I2156:6678;1833:12341">
                    <p className="home-picks-mobile__text-17">Pokemon Pokopia</p>
                    <p className="home-picks-mobile__text-18">바다 업데이트</p>
                  </div>
                  <div className="home-picks-mobile__layer-19" data-node-id="I2156:6678;1833:12342">
                    <p className="home-picks-mobile__text-19">{`새로운 기술인 Dive가 추가되어 바닷속을 `}</p>
                    <p className="home-picks-mobile__text-20">자유롭게 탐험하고 수중에 건축할 수 있습니다.</p>
                  </div>
                </div>
                <p className="home-picks-mobile__text-21" data-node-id="I2156:6678;1833:12343">
                  4
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-picks-mobile__mobilenewscard-5" data-node-id="2156:6679" data-name="MobileNewscard">
          <div className="home-picks-mobile__img-image-5" data-node-id="I2156:6679;1833:12340" data-name="img/image">
            <img alt="" className="home-picks-mobile__image-5" src={homeAsset('e253b.svg')} />
          </div>
          <div className="home-picks-mobile__textbox-5" data-node-id="I2156:6679;1799:10937" data-name="TextBox">
            <div className="home-picks-mobile__layer-20" data-node-id="I2156:6679;1799:10932">
              <div className="home-picks-mobile__layer-21" data-node-id="I2156:6679;1799:10954">
                <div className="home-picks-mobile__layer-22" data-node-id="I2156:6679;1799:10950">
                  <div className="home-picks-mobile__layer-23" data-node-id="I2156:6679;1833:12341">
                    <p className="home-picks-mobile__text-22">{`Minecraft  `}</p>
                    <p className="home-picks-mobile__text-23">Nintendo Switch 2 버전</p>
                  </div>
                  <div className="home-picks-mobile__layer-24" data-node-id="I2156:6679;1833:12342">
                    <p className="home-picks-mobile__text-24">{`스위치 2 전용 마인크래프트가  2026년 10월 출시.`}</p>
                    <p className="home-picks-mobile__text-25">{`더욱 향상된 게임을 선보일 예정. `}</p>
                  </div>
                </div>
                <p className="home-picks-mobile__text-26" data-node-id="I2156:6679;1833:12343">
                  5
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-picks-mobile__mobilenewscard-6" data-node-id="2156:6680" data-name="MobileNewscard">
          <div className="home-picks-mobile__img-image-6" data-node-id="I2156:6680;1833:12340" data-name="img/image">
            <img alt="" className="home-picks-mobile__image-6" src={homeAsset('e253b.svg')} />
          </div>
          <div className="home-picks-mobile__textbox-6" data-node-id="I2156:6680;1799:10937" data-name="TextBox">
            <div className="home-picks-mobile__layer-25" data-node-id="I2156:6680;1799:10932">
              <div className="home-picks-mobile__layer-26" data-node-id="I2156:6680;1799:10954">
                <div className="home-picks-mobile__layer-27" data-node-id="I2156:6680;1799:10950">
                  <div className="home-picks-mobile__layer-28" data-node-id="I2156:6680;1833:12341">
                    <p className="home-picks-mobile__text-27">{`Rhythm Paradise Groove `}</p>
                    <p className="home-picks-mobile__text-28">정식 발매</p>
                  </div>
                  <p className="home-picks-mobile__text-29" data-node-id="I2156:6680;1833:12342">
                    짧고 개성 강한 리듬 게임들을 모은 『Rhythm Paradise Groove』 가 정식 발매
                  </p>
                </div>
                <p className="home-picks-mobile__text-30" data-node-id="I2156:6680;1833:12343">
                  6
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-picks-mobile__mobilenewscard-7" data-node-id="2156:6681" data-name="MobileNewscard">
          <div className="home-picks-mobile__img-image-7" data-node-id="I2156:6681;1833:12340" data-name="img/image">
            <img alt="" className="home-picks-mobile__image-7" src={homeAsset('e253b.svg')} />
          </div>
          <div className="home-picks-mobile__textbox-7" data-node-id="I2156:6681;1799:10937" data-name="TextBox">
            <div className="home-picks-mobile__layer-29" data-node-id="I2156:6681;1799:10932">
              <div className="home-picks-mobile__layer-30" data-node-id="I2156:6681;1799:10954">
                <div className="home-picks-mobile__layer-31" data-node-id="I2156:6681;1799:10950">
                  <div className="home-picks-mobile__layer-32" data-node-id="I2156:6681;1833:12341">
                    <p className="home-picks-mobile__text-31">{`Star Fox의 신작 발매 예정 `}</p>
                    <p className="home-picks-mobile__text-32">얼굴 인식 기능 탑재</p>
                  </div>
                  <div className="home-picks-mobile__layer-33" data-node-id="I2156:6681;1833:12342">
                    <p className="home-picks-mobile__text-33">Star Fox 신작이 발매 예정.</p>
                    <p className="home-picks-mobile__text-34">게임 캐릭터를 자신의 얼굴과 인식하는 기능 탑재.</p>
                  </div>
                </div>
                <p className="home-picks-mobile__text-35" data-node-id="I2156:6681;1833:12343">
                  7
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="home-picks-mobile__image-1096" data-node-id="2156:7204" data-name="image 1096">
          <img alt="" className="home-picks-mobile__image-8" src={homeAsset('d0793.png')} />
        </div>
        <div className="home-picks-mobile__image-1098" data-node-id="2156:7210" data-name="image 1098" />
        <div className="home-picks-mobile__layer-34" data-node-id="2156:7229" data-name="포코피아">
          <div className="home-picks-mobile__image-1099" data-node-id="2156:7213" data-name="image 1099">
            <img alt="" className="home-picks-mobile__image-9" src={homeAsset('18445.png')} />
          </div>
          <div className="home-picks-mobile__image-1100" data-node-id="2156:7217" data-name="image 1100">
            <img alt="" className="home-picks-mobile__image-10" src={homeAsset('85063.png')} />
          </div>
        </div>
        <div className="home-picks-mobile__image-1101" data-node-id="2156:7241" data-name="image 1101">
          <img alt="" className="home-picks-mobile__image-11" src={homeAsset('46540.png')} />
        </div>
        <div className="home-picks-mobile__image-1102" data-node-id="2156:7244" data-name="image 1102">
          <img alt="" className="home-picks-mobile__image-12" src={homeAsset('2e4fc.png')} />
        </div>
        <div className="home-picks-mobile__image-1103" data-node-id="2156:7247" data-name="image 1103">
          <img alt="" className="home-picks-mobile__image-13" src={homeAsset('ddbc2.png')} />
        </div>
      </section>
  );
  return (
      <section ref={sectionRef} aria-label="Nintendo Picks" className="home-picks" data-node-id="2485:10400" data-name="05_Nintendo-Picks">
        <div aria-hidden className="home-picks__layer">
          <div className="home-picks__layer-2" />
          <img alt="" className="home-picks__image" src={homeAsset('9de49.png')} />
        </div>
        <div className="home-picks__background-line" aria-hidden="true" data-node-id="2485:10406" data-name="Background Line">
          <div className="home-picks__path home-picks__path--upper" dangerouslySetInnerHTML={{ __html: upperLine }} data-node-id="2485:10407" />
          <div className="home-picks__path home-picks__path--lower" dangerouslySetInnerHTML={{ __html: lowerLine }} data-node-id="2485:10408" />
          {checkpoints.map(([nodeId, asset, left, top]) => (
            <img key={nodeId} alt="" className="home-picks__checkpoint" src={homeAsset(asset)} style={{ left, top }} data-node-id={nodeId} />
          ))}
        </div>
        <div className="home-picks__picks-visual-05" data-node-id="1148:6676" data-name="Picks-Visual-05" />
        <div className="home-picks__1section" data-node-id="2485:10420" data-name="1section">
          <div className="home-picks__picks-visual-01" data-node-id="1148:6679" data-name="Picks-Visual-01" />
          <div className="home-picks__layer-3" data-node-id="1148:6681">
            <p className="home-picks__text">{`젤다의 전설 시리즈 `}</p>
            <p className="home-picks__text-2">40주년을 기념한 특별 다이렉트</p>
          </div>
          <p className="home-picks__text-3" data-node-id="1148:6682">
            1
          </p>
          <div className="home-picks__layer-4" data-node-id="1148:6683">
            <p className="home-picks__text-4">{`젤다의 전설 시리즈 40주년을 기념한 특별 Nintendo Direct. `}</p>
            <p className="home-picks__text-5">약 30분 동안 시리즈의 40주년 관련 정보와 향후 전개를 다룰 예정입니다.</p>
          </div>
        </div>
        <div className="home-picks__3section" data-node-id="2485:10425" data-name="3section">
          <div className="home-picks__layer-5" data-node-id="1148:6685">
            <p className="home-picks__text-6">{`Xenoblade Genesis `}</p>
            <p className="home-picks__text-7">2027년 발매</p>
          </div>
          <p className="home-picks__text-8" data-node-id="1148:6686">
            3
          </p>
          <div className="home-picks__layer-6" data-node-id="1148:6687">
            <p className="home-picks__text-9">{`제노블레이드 시리즈의 새로운 출발점이 되는 신작. `}</p>
            <p className="home-picks__text-10">{`『Xenoblade Genesis』가 Nintendo Switch2 전용으로 2027년 출시 예정입니다. `}</p>
          </div>
          <div className="home-picks__3efe1987-e1a6-42e6-acb3-56b887b62373-1" data-node-id="1148:6688" data-name="3efe1987-e1a6-42e6-acb3-56b887b62373 1">
            <div className="home-picks__layer-7">
              <img alt="" className="home-picks__image-2" src={homeAsset('4d938.png')} />
            </div>
          </div>
        </div>
        <div className="home-picks__4section" data-node-id="2485:10430" data-name="4section">
          <div className="home-picks__layer-8" data-node-id="1148:6690">
            <p className="home-picks__text-11">Pokemon Pokopia</p>
            <p className="home-picks__text-12">바다 업데이트</p>
          </div>
          <p className="home-picks__text-13" data-node-id="1148:6691">
            4
          </p>
          <div className="home-picks__layer-9" data-node-id="1148:6692">
            <p className="home-picks__text-14">{`무료 업데이트로 새로운 기술인 Dive가 `}</p>
            <p className="home-picks__text-15">{`추가되어 바닷속을 자유롭게 탐험하고 수중에 `}</p>
            <p className="home-picks__text-16">{`건축할 수 있습니다.  `}</p>
            <p className="home-picks__text-17">동시에 익스팬션 패스 Part 1 Bubbly Basin에서는 새로운 수중 마을, 가구, 의상, 포켓몬 등이 무료로업데이트 될 예정입니다.</p>
          </div>
          <div className="home-picks__image-3" data-node-id="1148:6693" data-name="Image">
            <div className="home-picks__layer-10" data-node-id="1148:6694">
              <div className="home-picks__layer-11">
                <div className="home-picks__cover-image" data-name="Cover image">
                  <img alt="" className="home-picks__image-4" src={homeAsset('83f28.png')} />
                </div>
              </div>
            </div>
            <div className="home-picks__layer-12" data-node-id="1148:6695">
              <div className="home-picks__layer-13">
                <div className="home-picks__image-5" data-name="Image">
                  <img alt="" className="home-picks__image-6" src={homeAsset('b8718.png')} />
                </div>
              </div>
            </div>
            <div className="home-picks__layer-14" data-node-id="1148:6696">
              <div className="home-picks__layer-15">
                <div className="home-picks__halftone-1789348135044-2" data-name="halftone-1789348135044 2">
                  <div className="home-picks__layer-16">
                    <img alt="" className="home-picks__image-7" src={homeAsset('5a689.png')} />
                  </div>
                </div>
              </div>
            </div>
            <div className="home-picks__layer-17" data-node-id="1148:6697">
              <div className="home-picks__layer-18">
                <div className="home-picks__halftone-1789348135044-1" data-name="halftone-1789348135044 1">
                  <div className="home-picks__layer-19">
                    <img alt="" className="home-picks__image-8" src={homeAsset('5a689.png')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-picks__5section" data-node-id="2485:10439" data-name="5section">
          <div className="home-picks__layer-20" data-node-id="1148:6699">
            <p className="home-picks__text-18">{`Minecraft  `}</p>
            <p className="home-picks__text-19">Nintendo Switch 2 버전</p>
          </div>
          <p className="home-picks__text-20" data-node-id="1148:6700">
            5
          </p>
          <div className="home-picks__layer-21" data-node-id="1148:6701" data-name="치킨조키">
            <div className="home-picks__layer-22" data-node-id="1148:6702" data-name="치킨 조키">
              <div className="home-picks__layer-23">
                <img alt="" className="home-picks__image-9" src={homeAsset('0e669.png')} />
              </div>
            </div>
          </div>
          <div className="home-picks__layer-24" data-node-id="1148:6703">
            <p className="home-picks__text-21">{`Nintendo Switch 2용 마인크래프트가 2026년 10월 `}</p>
            <p className="home-picks__text-22">{`출시 예정입니다. `}</p>
            <p className="home-picks__text-23">{`향상된 조명·그림자 등의 Vibrant Visuals를 지원하고, `}</p>
            <p className="home-picks__text-24">{`Nintendo 버전 전용 Super Mario Mash-Up Pack도 추가하여 사용자 여러분께 보다 더 재밌는 요소를 `}</p>
            <p className="home-picks__text-25">추가할 예정입니다.</p>
          </div>
        </div>
        <div className="home-picks__6section" data-node-id="2485:10445" data-name="6section">
          <div className="home-picks__layer-25" data-node-id="1148:6705">
            <p className="home-picks__text-26">{`Rhythm Paradise Groove `}</p>
            <p className="home-picks__text-27">정식 발매</p>
          </div>
          <p className="home-picks__text-28" data-node-id="1148:6706">
            6
          </p>
          <div className="home-picks__layer-26" data-node-id="1148:6707">
            <p className="home-picks__text-29">짧고 개성 강한 리듬 게임들을 모은 『Rhythm Paradise Groove』 가 정식 발매 되었습니다.</p>
            <p className="home-picks__text-30">{`많이 사랑 받은 기존 게임 다수와 새롭게 추가된 `}</p>
            <p className="home-picks__text-31">{`리듬게임이 게임을 보다 더 풍성하게 할 것입니다.  `}</p>
            <p className="home-picks__text-32">{`친구들과 플레이할 수 있는 멀티 기능, 온라인으로 대결하는 재미 요소를 추가한 리듬 파라다이스 `}</p>
            <p className="home-picks__text-33">{`그루브를 즐겨보세요! `}</p>
          </div>
          <div className="home-picks__layer-27" data-node-id="1148:6708" data-name="리듬게임">
            <p className="home-picks__text-34" data-node-id="1148:6709">
              나
            </p>
            <div className="home-picks__game-image" data-node-id="1148:6710" data-name="Game image">
              <img alt="" className="home-picks__image-10" src={homeAsset('157ff.png')} />
            </div>
            <div className="home-picks__layer-28" data-node-id="1148:6711">
              <div className="home-picks__layer-29">
                <div className="home-picks__chatgpt-image-2026-9-14-10-19-37-2" data-name="ChatGPT Image 2026년 9월 14일 오전 10_19_37 2">
                  <div className="home-picks__layer-30">
                    <img alt="" className="home-picks__image-11" src={homeAsset('c6355.png')} />
                  </div>
                </div>
              </div>
            </div>
            <div className="home-picks__chatgpt-image-2026-9-14-10-19-37-2-2" data-node-id="1148:6712" data-name="ChatGPT Image 2026년 9월 14일 오전 10_19_37 2">
              <div className="home-picks__layer-31">
                <img alt="" className="home-picks__image-12" src={homeAsset('c6355.png')} />
              </div>
            </div>
            <div className="home-picks__chatgpt-image-2026-9-14-10-19-37-3" data-node-id="1148:6713" data-name="ChatGPT Image 2026년 9월 14일 오전 10_19_37 3">
              <div className="home-picks__layer-32">
                <img alt="" className="home-picks__image-13" src={homeAsset('c6355.png')} />
              </div>
            </div>
            <div className="home-picks__layer-33" data-node-id="1148:6714">
              <div className="home-picks__layer-34">
                <div className="home-picks__chatgpt-image-2026-9-14-10-19-37-2-3" data-name="ChatGPT Image 2026년 9월 14일 오전 10_19_37 2">
                  <div className="home-picks__layer-35">
                    <img alt="" className="home-picks__image-14" src={homeAsset('c6355.png')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-picks__layer-36" data-node-id="1148:6716">
            <div className="home-picks__layer-37">
              <div className="home-picks__chatgpt-image-2026-9-14-10-19-37-2-4" data-name="ChatGPT Image 2026년 9월 14일 오전 10_19_37 2">
                <div className="home-picks__layer-38">
                  <img alt="" className="home-picks__image-15" src={homeAsset('c6355.png')} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-picks__7section" data-node-id="2485:10457" data-name="7section">
          <div className="home-picks__layer-39" data-node-id="1148:6718">
            <p className="home-picks__text-35">{`Star Fox의 신작 발매 예정 `}</p>
            <p className="home-picks__text-36">얼굴 인식 기능 탑재</p>
          </div>
          <p className="home-picks__text-37" data-node-id="1148:6719">
            7
          </p>
          <div className="home-picks__layer-40" data-node-id="1148:6720">
            <p className="home-picks__text-38">{`Nintendo Switch 2 전용 『Star Fox』 신작이 발매 예정입니다. `}</p>
            <p className="home-picks__text-39">{` Fox McCloud와 Star Fox 팀이 우주·행성을 오가며 전투하는 기존 스타폭스 게임 방식을 유지하며, 1·3인칭 시점, 온라인 협동과 온라인 경쟁을 제공할 예정입니다. 추가적으로 닌텐도 스위치 2에서 게임 캐릭터를 자신의 얼굴과 인식해 보다 더 실감나는 타격 액션을 제공할 예정입니다.`}</p>
          </div>
          <div className="home-picks__layer-41" data-node-id="1148:6721" data-name="스타폭스">
            <div className="home-picks__layer-42" data-node-id="1148:6722" data-name="부주인공 스타폭스">
              <img alt="" className="home-picks__image-16" src={homeAsset('65d31.png')} />
            </div>
            <div className="home-picks__layer-43" data-node-id="1148:6723" data-name="박사 토끼'">
              <img alt="" className="home-picks__image-17" src={homeAsset('551ae.png')} />
            </div>
            <div className="home-picks__gemini-generated-image-yzel3xyzel3xyzel-1" data-node-id="1148:6724" data-name="Gemini_Generated_Image_yzel3xyzel3xyzel 1">
              <img alt="" className="home-picks__image-18" src={homeAsset('64cdb.png')} />
            </div>
          </div>
        </div>
        <div className="home-picks__2section" data-node-id="2485:10465" data-name="2section">
          <p className="home-picks__text-40" data-node-id="1148:6726">
            ELDEN RING ‘빛바랜 자’ 에디션
          </p>
          <p className="home-picks__text-41" data-node-id="1148:6727">
            2
          </p>
          <div className="home-picks__layer-44" data-node-id="1148:6728">
            <p className="home-picks__text-42">{`『ELDEN RING Tarnished Edition』이 Nintendo Switch 2로 출시. `}</p>
            <p className="home-picks__text-43">{`본편과 「Shadow of the Erdtree」 확장팩, 추가 방어구와 `}</p>
            <p className="home-picks__text-44">영마 토렌트 스킨 등이 포함된 스위치 2 전용 에디션입니다.</p>
          </div>
        </div>
        <div className="home-picks__picks-bottom-visual-03" data-node-id="2485:10469" data-name="Picks-Bottom-Visual-03" />
        <div className="home-picks__title" data-node-id="2485:10470">
        <p className="home-picks__text-45" data-node-id="1148:6733">
          지금 주목해야 할 7가지 소식
        </p>
        <p className="home-picks__text-46" data-node-id="1148:6734">
          NINTENDO PICKS 07
        </p>
        </div>
        <div className="home-picks__cover-image-2" data-node-id="2485:10473" data-name="Cover image">
          <div className="home-picks__layer-45">
            <img alt="" className="home-picks__image-19" src={homeAsset('6d128.png')} />
          </div>
        </div>
        <div className="home-picks__layer-46" data-node-id="2485:10474">
          <div className="home-picks__layer-47">
            <div className="home-picks__badge-image" data-name="Badge image">
              <div className="home-picks__layer-48">
                <img alt="" className="home-picks__image-20" src={homeAsset('ce1d4.png')} />
              </div>
            </div>
          </div>
        </div>
        <div className="home-picks__card-image" data-node-id="2485:10475" data-name="Card image">
          <div className="home-picks__image-21" data-node-id="1148:6746" data-name="Image">
            <div className="home-picks__image-22" data-node-id="1148:6747" data-name="Image">
              <img alt="" className="home-picks__image-23" src={homeAsset('ffc42.png')} />
            </div>
          </div>
          <div className="home-picks__pngwing-com-1" data-node-id="1148:6748" data-name="pngwing.com 1">
            <img alt="" className="home-picks__image-24" src={homeAsset('c9190.png')} />
          </div>
        </div>
      </section>
  );
}
