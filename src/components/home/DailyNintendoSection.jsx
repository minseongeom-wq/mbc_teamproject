import { useRef } from 'react';
import { homeAsset } from './homeAssets.js';
import useDailyNintendoScroll from './useDailyNintendoScroll.js';
import { dailyPhoneScreens } from './dailyNintendoData.js';
import './daily-nintendo.css';

const widgets = [
  { id: '04', title: '위젯', copy: '좋아하는 게임 시리즈의\n위젯을 설정하면 콘텐츠를\n확인할 수 있습니다.\n배경화면도 당신이 원하는 캐릭터로 만들어보세요.' },
  { id: '03', title: '스케줄과 내 일정 확인', copy: '소프트웨어의 발매일이나 게임 내의 이벤트 등을 캘린더에 저장해 알림을 받을 수 있습니다.' },
  { id: '02', title: '날마다 만나는 콘텐츠', copy: '최신 뉴스를 비롯해 영상과 만화 등 당신이 관심 있는 게임 시리즈를 중심으로 다양한 콘텐츠를 만날 수 있습니다.' },
  { id: '01', title: '애니메이션 캘린더', copy: '당신이 좋아하는 캐릭터가\n애니메이션으로 날짜를 알려드립니다.\n4개의 게임 시리즈 중\n선택할 수 있습니다.' },
].reverse();
const phones = ['kirby-wallpaper', '01', '02', '03', '04', 'splatoon'];
function PhoneContent({ id }) {
  const screen = { kirby: 'aabb0.png', '04': '5c3ac.png', '03': 'bcf99.png', '02': '464bf.png', '01': 'daily-pikmin-screen.png', splatoon: '33b43.png', zelda: '5c047.png', calendar: 'bcf99.png', 'kirby-wallpaper': '8f036.png' }[id];
  return <>
    <div className={`daily-carousel__screen ${id === '02' ? 'daily-carousel__screen--content' : ''}`}>
      {id === '01'
        ? <video data-widget-video src="/videos/daily/widget-01-pikmin.mp4" poster={homeAsset(screen)} muted loop playsInline preload="metadata" aria-hidden="true" />
        : <img src={homeAsset(screen)} alt="" />}
    </div>
    {id === 'kirby-wallpaper' && <div className="daily-carousel__kirby-widget"><img src={homeAsset('77d5e.png')} alt="" /></div>}
    {id === '03' && <div className="daily-carousel__screen-dim" />}
    <div className="daily-carousel__frame"><img src={homeAsset('b9e69.png')} alt="" /></div>
    {id === '03' && <img className="daily-carousel__schedule" src={homeAsset('e1a9c.png')} alt="" />}
  </>;
}
export default function DailyNintendoSection({ mobile = false }) {
  const section = useRef(null);
  useDailyNintendoScroll(section, mobile);
  return (
    <section ref={section} className={`daily-carousel ${mobile ? 'daily-carousel--mobile' : ''}`} data-daily-scroll data-name="06_Daily-Nintendo" data-node-id="1148:6749" aria-label="날마다 만나는 닌텐도">
      <div className="daily-scene-wrapper">
      <div className="daily-scene daily-carousel__stage">
        <h2 className="daily-carousel__heading">날마다 만나는 닌텐도</h2>
        <div className="daily-carousel__titles">
          <p className="daily-carousel__title" data-title aria-label="NINTENDO Widget 01부터 04까지">
            <span>NINTENDO Widget</span>
            <span className="daily-carousel__number-window" aria-hidden="true">
              <span className="daily-carousel__number-track" data-number-track>
                {widgets.map(widget => <span key={widget.id} className="daily-carousel__number" data-number={widget.id}>{widget.id}</span>)}
              </span>
            </span>
          </p>
        </div>
        <div className="daily-carousel__visuals">
        <img className="daily-carousel__background" src={homeAsset('c2c57.png')} alt="" />
        <div className="daily-carousel__calendars" aria-hidden="true">
          {[1, 2, 3, 4].map((id, i) => <div className={`daily-carousel__calendar daily-carousel__calendar--${id}`} key={id} data-calendar={i}><div className="daily-carousel__calendar-crop"><img src={homeAsset(id % 2 ? '77d5e.png' : 'e0d2e.png')} alt="" /></div></div>)}
        </div>
        <div className="daily-carousel__support daily-carousel__state" data-support="2"><img src={homeAsset('f18df.png')} alt="게임 일정과 알림 예시" /></div>
        <div className="daily-carousel__content-grid daily-carousel__state" data-support="1" aria-hidden="true">
          {[0, 1, 2].map(i => <div key={i}><img src={homeAsset('464bf.png')} alt="" /></div>)}
        </div>
        <div className="daily-carousel__phones">
          {phones.map((id, i) => <div key={id} className="daily-carousel__phone" data-phone={i} data-content={id} role="img" aria-label={`Widget ${id} phone`}>
            {[...new Set(dailyPhoneScreens.map(state => state[i]).filter(Boolean))].map((screen, index) =>
              <div key={screen} className="daily-carousel__phone-art" data-screen={screen} style={{ opacity: index === 0 ? 1 : 0 }}>
                <PhoneContent id={screen} />
              </div>)}
          </div>)}
        </div>
        <div className="daily-carousel__descriptions">
          {widgets.map((widget, i) => <div key={widget.id} className={`daily-carousel__description daily-carousel__state ${i === 0 ? 'daily-carousel__state--initial' : ''}`} data-description={i} data-widget={widget.id}><h3>{widget.title}</h3><p>{widget.copy}</p></div>)}
        </div>
        </div>
      </div>
      </div>
    </section>
  );
}

