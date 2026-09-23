import publicAsset from '../../utils/publicAsset';
import AmiiboFigure from './AmiiboFigure';
import './AmiiboSection.css';
export default function AmiiboSection({
  figures
}) {
  return <section className="amiibo-section" data-node-id="1148:6626" id="amiibo-section">
        <p className="amiibo-section__layer-2" data-node-id="1148:6627">
          게임과 이어지는 특별한 캐릭터
        </p>
        <h2 className="amiibo-section__layer-3" data-node-id="1148:6628">
          AMIIBO
        </h2>
        <p className="amiibo-section__layer-4" data-node-id="1148:6629">
          TAP INTO FUN
        </p>
        <div className="amiibo-section__infinite-marquee-animation-amibo-5" data-node-id="1148:6630">{figures.map(figure => <AmiiboFigure key={figure.id} figure={figure} />)}</div>
        <div className="amiibo-section__layer-42" data-node-id="1148:6667">
          <div className="amiibo-section__layer-43">
            <img alt="" className="amiibo-section__layer-44" src={publicAsset('/images/banners/07a30.svg')} decoding="async" loading="lazy" />
          </div>
        </div>
        <div className="amiibo-section__dot-45" data-node-id="1148:6669" />
        <div className="amiibo-section__layer-46" data-node-id="1148:6670">
          <div className="amiibo-section__layer-47">
            <div className="amiibo-section__layer-48">
              <img alt="" className="amiibo-section__layer-49" src={publicAsset('/images/banners/0667a.svg')} decoding="async" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="amiibo-section__layer-50" data-node-id="1148:6671">
          <div className="amiibo-section__layer-51">
            <div className="amiibo-section__layer-52">
              <img alt="" className="amiibo-section__layer-53" src={publicAsset('/images/banners/d05b5.svg')} decoding="async" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="amiibo-section__layer-54" data-node-id="1148:6672">
          <div className="amiibo-section__layer-55">
            <div className="amiibo-section__layer-56">
              <img alt="" className="amiibo-section__layer-57" src={publicAsset('/images/banners/4ac35.svg')} decoding="async" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="amiibo-section__dot-58" data-node-id="1148:6673" />
        <div className="amiibo-section__dot-59" data-node-id="1148:6674" />
      </section>;
}
