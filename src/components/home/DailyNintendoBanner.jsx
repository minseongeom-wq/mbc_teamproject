import { useRef } from 'react';
import { homeAsset } from './homeAssets.js';
import useDailyBannerScroll from './useDailyBannerScroll.js';
import './daily-banner.css';

export default function DailyNintendoBanner({ mobile = false }) {
  const section = useRef(null);
  useDailyBannerScroll(section, mobile);
  if (mobile) return (
      <section aria-label="Putting Smiles on the Faces of Everyone" className="home-banner-mobile" data-node-id="2156:6712">
        <div className="home-banner-mobile__layer" data-node-id="2156:6713" />
        <div className="home-banner-mobile__layer-2" data-node-id="2156:6714" />
        <p className="home-banner-mobile__text" data-node-id="2156:6715">
          Faces of Everyone
        </p>
        <p className="home-banner-mobile__text-2" data-node-id="2156:6716">
          Putting Smiles on the
        </p>
        <p className="home-banner-mobile__text-3" data-node-id="2156:6717">{`Nintendo Touches `}</p>
        <div className="home-banner-mobile__layer-3" data-node-id="2156:6718">
          <div className="home-banner-mobile__layer-4">
            <div className="home-banner-mobile__image-872" data-name="image 872">
              <img alt="" className="home-banner-mobile__image" src={homeAsset('664b4.png')} />
            </div>
          </div>
        </div>
        <div className="home-banner-mobile__layer-5" data-node-id="2156:6719">
          <div className="home-banner-mobile__layer-6">
            <div className="home-banner-mobile__frame-1430103154-1" data-name="Frame 1430103154 1">
              <img alt="" className="home-banner-mobile__image-2" src={homeAsset('04258.png')} />
            </div>
          </div>
        </div>
      </section>
  );
  return (
      <section ref={section} aria-label="Putting Smiles on the Faces of Everyone Nintendo Touches" className="home-banner home-banner--interactive" data-banner-scroll data-node-id="1147:2670" data-name="07_Daily-Nintendo-Banner">
        <div className="home-banner__scene">
        <img className="home-banner__placeholder" src={homeAsset('94fd4.svg')} width="300" height="300" alt="" />
        <div className="home-banner__mario" data-banner-mario aria-hidden="true">
          <div className="home-banner__mario-crop" data-banner-mario-art>
            <img src={homeAsset('2f91e.png')} alt="" />
          </div>
        </div>
        <div className="home-banner__slugun-text" data-node-id="1148:6785" data-name="Slugun-text">
          <div className="home-banner__slogan-text" data-node-id="1148:6786" data-name="Slogan text">
            <p className="home-banner__word home-banner__word--putting" data-banner-word="putting">Putting</p>
            <p className="home-banner__word home-banner__word--smiles" data-banner-word="smiles">{`Smiles `}</p>
            <div className="home-banner__element" data-node-id="1148:6788" data-name="element" data-banner-block>
              <div className="home-banner__halftone-generator-21-1" data-node-id="1148:6790" data-name="halftone-generator (21) 1">
                <img alt="" className="home-banner__image" src={homeAsset('66341.png')} />
              </div>
            </div>
            <p className="home-banner__word home-banner__word--on-the" data-banner-word="on-the">on the</p>
            <p className="home-banner__word home-banner__word--faces" data-banner-word="faces">Faces</p>
          </div>
          <div className="home-banner__slogan-text-2" data-node-id="1148:6792" data-name="Slogan text">
            <p className="home-banner__text-3" data-node-id="1148:6793">
              of Everyone
            </p>
            <div className="home-banner__element-2" data-node-id="1148:6794" data-name="element">
              <div className="home-banner__halftone-generator-22-1" data-node-id="1148:6796" data-name="halftone-generator (22) 1">
                <div className="home-banner__layer">
                  <img alt="" className="home-banner__image-2" src={homeAsset('a8314.png')} />
                </div>
              </div>
            </div>
            <p className="home-banner__text-4" data-node-id="1148:6797">
              Nintendo Touches
            </p>
          </div>
        </div>
        <div className="home-banner__layer-2" data-node-id="1148:6798">
          <div className="home-banner__layer-3">
            <div className="home-banner__frame-1430103154-1" data-name="Frame 1430103154 1">
              <img alt="" className="home-banner__image-3" src={homeAsset('04258.png')} />
            </div>
          </div>
        </div>
        <div className="home-banner__layer-4" data-node-id="1148:6799">
          <div className="home-banner__layer-5">
            <div className="home-banner__banner-image" data-name="Banner image">
              <img alt="" className="home-banner__image-4" src={homeAsset('664b4.png')} />
            </div>
          </div>
        </div>
        </div>
      </section>
  );
}
