import publicAsset from '../../utils/publicAsset';
import './FigmaImage.css';

export default function FigmaImage({ className = "" }) {
  return (<div className={`figma-image ${className}`} data-node-id="670:683">
      <img alt="" className="figma-image__layer-2" src={publicAsset('/images/banners/94fd4.svg')} decoding="async" loading="lazy" />
    </div>);
}

