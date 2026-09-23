import './AmiiboFigure.css';

export default function AmiiboFigure({ figure }) {
  return <div className="amiibo-figure" data-node-id={figure.id}>
    <div className={figure.artClass}>
      <img className="amiibo-figure__image" src={figure.src} alt={figure.alt} decoding="async" loading="lazy" />
    </div>
  </div>;
}
