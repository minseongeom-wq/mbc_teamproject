import './zeldaVideoSection.css';

export default function ZeldaVideoSection() {
  return (
    <section className="zelda-video" aria-labelledby="zelda-video-title">
      <h2 className="zelda-video__title" id="zelda-video-title">
        <span>EXPLORE</span>
        <span className="zelda-video__divider" aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}images/zelda/video-divider.svg`} alt="" />
        </span>
        <span>HYRULE</span>
      </h2>
      <div className="zelda-video__diamonds" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => <span key={index} />)}
      </div>
    </section>
  );
}
