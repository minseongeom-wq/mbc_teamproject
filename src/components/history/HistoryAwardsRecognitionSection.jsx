import './HistoryAwardsRecognitionSection.css';

const awards = [
  ['The Game Awards', '(2023)'],
  ['BAFTA Games Awards', '(2024)'],
  ['Japan Game Awards', '(2024)'],
  ['D.I.C.E. Awards', '(2018)'],
  ['GDCA', '(2018)'],
];

function HistoryAwardsRecognitionSection() {
  return (
    <section className="history-awards" aria-labelledby="history-awards-title">
      <img className="history-awards__grid" src="/images/history/history-awards-pixel-grid.png" alt="" aria-hidden="true" />

      <h2 className="history-awards__heading" id="history-awards-title">
        <span>Awards</span>
        <span>수상기록들</span>
      </h2>

      <div className="history-awards__featured">
        <img src="/images/history/history-awards-logo.svg" alt="The Game Awards" />
        <p className="history-awards__featured-title">The Legend of Zelda:<br />Tears of the Kingdom</p>
        <p className="history-awards__featured-prize">Japan Game Awards 2024</p>
        <p className="history-awards__featured-detail">Grand Award / Best Sales Award / Award for Excellence</p>
      </div>

      <ul className="history-awards__list">
        {awards.map(([name, year], index) => (
          <li key={name}>
            <span>{name}</span>
            <span style={{ top: 5 + index * 2 }}>{year}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HistoryAwardsRecognitionSection;
