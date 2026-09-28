import './HistoryDetailsIntroSection.css';

const rays = [
  { id: 5, angle: 90, width: 254 },
  { id: 6, angle: 135, width: 255.973 },
  { id: 7, angle: 165.1, width: 256.632 },
  { id: 8, angle: 45, width: 255.973 },
  { id: 9, angle: 14.9, width: 256.632 },
];

function HistoryDetailsIntroSection() {
  return (
    <section className="history-details-intro" aria-label="The next play">
      <p className="history-details-intro__the">THE</p>
      <h2 className="history-details-intro__next">NEXT</h2>
      <p className="history-details-intro__play">PLAY</p>
      <img className="history-details-intro__baseline" src="/images/history/history-details-line-4.svg" alt="" aria-hidden="true" />
      {rays.map(({ id, angle, width }) => (
        <img
          className="history-details-intro__ray"
          key={id}
          src={`/images/history/history-details-line-${id}.svg`}
          alt=""
          aria-hidden="true"
          style={{ width, transform: `rotate(${angle}deg)` }}
        />
      ))}
      <p className="history-details-intro__since">SINCE 1889</p>
      <p className="history-details-intro__still">AND STILL PLAYING</p>
    </section>
  );
}

export default HistoryDetailsIntroSection;
