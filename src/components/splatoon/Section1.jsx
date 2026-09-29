import "./section1.css";

import { asset } from './asset.js';

function RibbonTile() {
  return (
    <div className="splatoon-section1__tile">
      <div className="splatoon-section1__artwork">
        <div className="splatoon-section1__tape">
          <img src={asset("ba788.png")} alt="" />
        </div>
      </div>
      <div className="splatoon-section1__sticker">
        <img src={asset("18717.svg")} alt="" />
      </div>
      <span className="splatoon-section1__squid">오징어가</span>
      <span className="splatoon-section1__fashion">패션을!?</span>
      <span className="splatoon-section1__caption">PASHION</span>
    </div>
  );
}

export default function Section1() {
  return (
    <section
      id="section1"
      className="splatoon-section1"
      aria-label="오징어가 패션을!?"
    >
      <img
        className="splatoon-section1__background"
        src={asset("6c6fd.png")}
        alt=""
      />
      <div className="splatoon-section1__viewport" aria-hidden="true">
        <div className="splatoon-section1__track">
          <RibbonTile />
          <RibbonTile />
          <RibbonTile />
          <RibbonTile />
        </div>
      </div>
    </section>
  );
}
