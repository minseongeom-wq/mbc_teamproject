import { Link } from 'react-router-dom';
import './PlaceholderPage.css';

export default function PlaceholderPage({ english, title, description, cards, links }) {
  return (
    <section className="placeholder-page" aria-labelledby="page-title">
      <div className="placeholder-page__intro">
        <p className="placeholder-page__english" lang="en">{english}</p>
        <h1 id="page-title">{title}</h1>
        <p className="placeholder-page__description">{description}</p>
        <span className="placeholder-page__status">준비 중</span>
      </div>
      <div className="placeholder-page__cards">
        {cards.map(([heading, body], index) => (
          <article className="placeholder-page__card" key={heading}>
            <span className="placeholder-page__number" aria-hidden="true">0{index + 1}</span>
            <h2>{heading}</h2>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <nav className="placeholder-page__actions" aria-label="관련 페이지">
        {links.map(([label, to]) => (
          <Link className="placeholder-page__button" to={to} key={to}>{label}<span aria-hidden="true"> →</span></Link>
        ))}
      </nav>
    </section>
  );
}
