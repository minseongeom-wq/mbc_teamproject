export default function ZeldaHeroSection() {
  return (
    <section className="zelda-hero" aria-labelledby="zelda-title">
      <img className="zelda-hero__background" src={`${import.meta.env.BASE_URL}images/zelda/hero.png`} alt="" fetchPriority="high" />
      <h1 className="zelda-hero__title" id="zelda-title" aria-label="The Legend of Zelda" tabIndex={-1}>
        <img src={`${import.meta.env.BASE_URL}images/zelda/logo.svg`} alt="" />
      </h1>
      <span className="zelda-hero__scroll">Scroll Down</span>
      <span className="zelda-hero__scroll-line" aria-hidden="true" />
    </section>
  );
}
