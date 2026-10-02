import { Fragment, useRef } from 'react';
import { homeAsset } from './homeAssets.js';
import useAmiiboScroll from './useAmiiboScroll.js';
import './AmiiboScroll.css';

const mobileFigures = [
(          <div className="home-amiibo-mobile__01-image-box" data-node-id="2156:6923" data-name="01_image-box">
            <div className="home-amiibo-mobile__abaa-1" data-node-id="2156:6925" data-name="abaa 1">
              <div className="home-amiibo-mobile__layer-2">
                <img alt="" className="home-amiibo-mobile__image" src={homeAsset('96176.png')} />
              </div>
            </div>
          </div>),
(          <div className="home-amiibo-mobile__02-image-box" data-node-id="2156:6926" data-name="02_image-box">
            <div className="home-amiibo-mobile__abaf-1" data-node-id="2156:6928" data-name="abaf 1">
              <div className="home-amiibo-mobile__layer-3">
                <img alt="" className="home-amiibo-mobile__image-2" src={homeAsset('13c63.png')} />
              </div>
            </div>
          </div>),
(          <div className="home-amiibo-mobile__03-image-box" data-node-id="2156:6929" data-name="03_image-box">
            <div className="home-amiibo-mobile__abac-1" data-node-id="2156:6931" data-name="abac 1">
              <img alt="" className="home-amiibo-mobile__image-3" src={homeAsset('34c8a.png')} />
            </div>
          </div>),
(          <div className="home-amiibo-mobile__04-image-box" data-node-id="2156:6932" data-name="04_image-box">
            <div className="home-amiibo-mobile__aeaj-1" data-node-id="2156:6934" data-name="aeaj 1">
              <img alt="" className="home-amiibo-mobile__image-4" src={homeAsset('89750.png')} />
            </div>
          </div>),
(          <div className="home-amiibo-mobile__05-image-box" data-node-id="2156:6935" data-name="05_image-box">
            <div className="home-amiibo-mobile__aeak-1" data-node-id="2156:6937" data-name="aeak 1">
              <img alt="" className="home-amiibo-mobile__image-5" src={homeAsset('ac698.png')} />
            </div>
          </div>),
(          <div className="home-amiibo-mobile__06-image-box" data-node-id="2156:6938" data-name="06_image-box">
            <div className="home-amiibo-mobile__akak-1" data-node-id="2156:6940" data-name="akak 1">
              <img alt="" className="home-amiibo-mobile__image-6" src={homeAsset('92b18.png')} />
            </div>
          </div>),
(          <div className="home-amiibo-mobile__07-image-box" data-node-id="2156:6941" data-name="07_image-box">
            <div className="home-amiibo-mobile__akan-1" data-node-id="2156:6943" data-name="akan 1">
              <img alt="" className="home-amiibo-mobile__image-7" src={homeAsset('57ece.png')} />
            </div>
          </div>),
(          <div className="home-amiibo-mobile__08-image-box" data-node-id="2156:6944" data-name="08_image-box">
            <div className="home-amiibo-mobile__ajab-1" data-node-id="2156:6946" data-name="ajab 1">
              <img alt="" className="home-amiibo-mobile__image-8" src={homeAsset('0a8de.png')} />
            </div>
          </div>),
(          <div className="home-amiibo-mobile__09-image-box" data-node-id="2156:6947" data-name="09_image-box">
            <div className="home-amiibo-mobile__aaad-1" data-node-id="2156:6949" data-name="aaad 1">
              <img alt="" className="home-amiibo-mobile__image-9" src={homeAsset('ea8f1.png')} />
            </div>
          </div>),
(          <div className="home-amiibo-mobile__10-image-box" data-node-id="2156:6950" data-name="10_image-box">
            <div className="home-amiibo-mobile__aaak-1" data-node-id="2156:6952" data-name="aaak 1">
              <img alt="" className="home-amiibo-mobile__image-10" src={homeAsset('98871.png')} />
            </div>
          </div>),
(          <div className="home-amiibo-mobile__11-image-box" data-node-id="2156:6953" data-name="11_image-box">
            <div className="home-amiibo-mobile__aaaf-1" data-node-id="2156:6955" data-name="aaaf 1">
              <img alt="" className="home-amiibo-mobile__image-11" src={homeAsset('e6ea2.png')} />
            </div>
          </div>),
(          <div className="home-amiibo-mobile__12-image-box" data-node-id="2156:6956" data-name="12_image-box">
            <div className="home-amiibo-mobile__alaa-1" data-node-id="2156:6958" data-name="alaa 1">
              <img alt="" className="home-amiibo-mobile__image-12" src={homeAsset('8e284.png')} />
            </div>
          </div>)
];
const desktopFigures = [
(          <div className="home-amiibo__01-image-box" data-node-id="1148:6631" data-name="01_image-box">
            <div className="home-amiibo__abaa-1" data-node-id="1148:6633" data-name="abaa 1">
              <img alt="" className="home-amiibo__image" src={homeAsset('96176.png')} />
            </div>
          </div>),
(          <div className="home-amiibo__02-image-box" data-node-id="1148:6634" data-name="02_image-box">
            <div className="home-amiibo__abaf-1" data-node-id="1148:6636" data-name="abaf 1">
              <img alt="" className="home-amiibo__image-2" src={homeAsset('13c63.png')} />
            </div>
          </div>),
(          <div className="home-amiibo__03-image-box" data-node-id="1148:6637" data-name="03_image-box">
            <div className="home-amiibo__abac-1" data-node-id="1148:6639" data-name="abac 1">
              <img alt="" className="home-amiibo__image-3" src={homeAsset('34c8a.png')} />
            </div>
          </div>),
(          <div className="home-amiibo__04-image-box" data-node-id="1148:6640" data-name="04_image-box">
            <div className="home-amiibo__aeaj-1" data-node-id="1148:6642" data-name="aeaj 1">
              <img alt="" className="home-amiibo__image-4" src={homeAsset('89750.png')} />
            </div>
          </div>),
(          <div className="home-amiibo__05-image-box" data-node-id="1148:6643" data-name="05_image-box">
            <div className="home-amiibo__aeak-1" data-node-id="1148:6645" data-name="aeak 1">
              <img alt="" className="home-amiibo__image-5" src={homeAsset('ac698.png')} />
            </div>
          </div>),
(          <div className="home-amiibo__06-image-box" data-node-id="1148:6646" data-name="06_image-box">
            <div className="home-amiibo__akak-1" data-node-id="1148:6648" data-name="akak 1">
              <img alt="" className="home-amiibo__image-6" src={homeAsset('92b18.png')} />
            </div>
          </div>),
(          <div className="home-amiibo__07-image-box" data-node-id="1148:6649" data-name="07_image-box">
            <div className="home-amiibo__akan-1" data-node-id="1148:6651" data-name="akan 1">
              <img alt="" className="home-amiibo__image-7" src={homeAsset('57ece.png')} />
            </div>
          </div>),
(          <div className="home-amiibo__08-image-box" data-node-id="1148:6652" data-name="08_image-box">
            <div className="home-amiibo__ajab-1" data-node-id="1148:6654" data-name="ajab 1">
              <img alt="" className="home-amiibo__image-8" src={homeAsset('0a8de.png')} />
            </div>
          </div>),
(          <div className="home-amiibo__09-image-box" data-node-id="1148:6655" data-name="09_image-box">
            <div className="home-amiibo__aaad-1" data-node-id="1148:6657" data-name="aaad 1">
              <img alt="" className="home-amiibo__image-9" src={homeAsset('ea8f1.png')} />
            </div>
          </div>),
(          <div className="home-amiibo__10-image-box" data-node-id="1148:6658" data-name="10_image-box">
            <div className="home-amiibo__aaak-1" data-node-id="1148:6660" data-name="aaak 1">
              <img alt="" className="home-amiibo__image-10" src={homeAsset('98871.png')} />
            </div>
          </div>),
(          <div className="home-amiibo__11-image-box" data-node-id="1148:6661" data-name="11_image-box">
            <div className="home-amiibo__aaaf-1" data-node-id="1148:6663" data-name="aaaf 1">
              <img alt="" className="home-amiibo__image-11" src={homeAsset('e6ea2.png')} />
            </div>
          </div>),
(          <div className="home-amiibo__12-image-box" data-node-id="1148:6664" data-name="12_image-box">
            <div className="home-amiibo__alaa-1" data-node-id="1148:6666" data-name="alaa 1">
              <img alt="" className="home-amiibo__image-12" src={homeAsset('8e284.png')} />
            </div>
          </div>)
];

export default function AmiiboSection({ mobile = false }) {
  const sectionRef = useRef(null);
  useAmiiboScroll(sectionRef, mobile);
  if (mobile) return (
      <section ref={sectionRef} aria-label="amiibo" className="home-amiibo-mobile" data-amiibo-scroll data-node-id="2156:6959">
        <div className="home-amiibo-mobile__layer" data-node-id="2156:6960">
          <p className="home-amiibo-mobile__text" data-node-id="2156:6961">
            AMIIBO
          </p>
          <p className="home-amiibo-mobile__text-2" data-node-id="2156:6962">
            TAP INTO FUN
          </p>
          <p className="home-amiibo-mobile__text-3" data-node-id="2156:6963">
            게임과 이어지는 특별한 캐릭터
          </p>
        </div>
        <div className="home-amiibo-mobile__infinite-marquee-animation-amibo" data-node-id="2156:6922" data-name="infinite marquee animation-Amibo">
          {[0, 1].map(copy => <div className="home-amiibo-track" key={copy} aria-hidden={copy === 1}>
            {mobileFigures.map((figure, index) => <Fragment key={index}>{figure}</Fragment>)}
          </div>)}
        </div>
      </section>
  );
  return (
      <section ref={sectionRef} aria-label="amiibo" className="home-amiibo" data-amiibo-scroll data-node-id="1148:6626" data-name="04_Amiibo">
        <p className="home-amiibo__text" data-node-id="1148:6627">
          게임과 이어지는 특별한 캐릭터
        </p>
        <p className="home-amiibo__text-2" data-node-id="1148:6628">
          AMIIBO
        </p>
        <p className="home-amiibo__text-3" data-node-id="1148:6629">
          TAP INTO FUN
        </p>
        <div className="home-amiibo__infinite-marquee-animation-amibo" data-node-id="1148:6630" data-name="infinite marquee animation-Amibo">
          {[0, 1].map(copy => <div className="home-amiibo-track" key={copy} aria-hidden={copy === 1}>
            {desktopFigures.map((figure, index) => <Fragment key={index}>{figure}</Fragment>)}
          </div>)}
        </div>
        <div className="home-amiibo__layer" data-node-id="1148:6667">
          <div className="home-amiibo__layer-2">
            <img alt="" className="home-amiibo__image-13" src={homeAsset('07a30.svg')} />
          </div>
        </div>
        <div className="home-amiibo__dot" data-node-id="1148:6669" data-name="Dot" />
        <div className="home-amiibo__layer-3" data-node-id="1148:6670">
          <div className="home-amiibo__layer-4">
            <div className="home-amiibo__layer-5">
              <img alt="" className="home-amiibo__image-14" src={homeAsset('0667a.svg')} />
            </div>
          </div>
        </div>
        <div className="home-amiibo__layer-6" data-node-id="1148:6671">
          <div className="home-amiibo__layer-7">
            <div className="home-amiibo__layer-8">
              <img alt="" className="home-amiibo__image-15" src={homeAsset('d05b5.svg')} />
            </div>
          </div>
        </div>
        <div className="home-amiibo__layer-9" data-node-id="1148:6672">
          <div className="home-amiibo__layer-10">
            <div className="home-amiibo__layer-11">
              <img alt="" className="home-amiibo__image-16" src={homeAsset('4ac35.svg')} />
            </div>
          </div>
        </div>
        <div className="home-amiibo__dot-2" data-node-id="1148:6673" data-name="Dot" />
        <div className="home-amiibo__dot-3" data-node-id="1148:6674" data-name="Dot" />
      </section>
  );
}
