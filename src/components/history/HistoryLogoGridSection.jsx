import './HistoryLogoGridSection.css';

const logos = [
  { id: '14', x: 516, y: 204, width: 82, height: 65 },
  { id: '13', x: 781, y: 205, width: 82, height: 66 },
  { id: '12', x: 1037, y: 188, width: 100, height: 100 },
  { id: '11', x: 1311, y: 214, width: 81, height: 48 },
  { id: '10', x: 512, y: 439, width: 90, height: 44, extension: 'svg' },
  { id: '09', x: 762, y: 444, width: 120, height: 34 },
  { id: '15', x: 1041, y: 439, width: 91, height: 45 },
  { id: '16', x: 1318, y: 439, width: 68, height: 45 },
  { id: '08', x: 518, y: 659, width: 78, height: 50 },
  { id: '07', x: 785, y: 661, width: 73, height: 47 },
  { id: '06', x: 1040, y: 661, width: 93, height: 46 },
  { id: '05', x: 1303, y: 670, width: 97, height: 28 },
  { id: '04', x: 507, y: 897, width: 100, height: 21 },
  { id: '03', x: 772, y: 897, width: 100, height: 21 },
  { id: '02', x: 1046, y: 890, width: 82, height: 35 },
  { id: '01', x: 1304, y: 892, width: 93.307, height: 30 },
];

function HistoryLogoGridSection() {
  return (
    <section className="history-logo-grid" aria-label="닌텐도를 빛낸 작품들">
      <div className="history-logo-grid__label">
        <h2>Awards</h2>
        <p>닌텐도를 빛낸 작품들</p>
      </div>
      {logos.map(({ id, x, y, width, height, extension = 'png' }) => (
        <img
          className="history-logo-grid__logo"
          key={id}
          src={`/images/history/history-logo-grid-${id}.${extension}`}
          alt=""
          aria-hidden="true"
          style={{ left: x, top: y, width, height }}
        />
      ))}
    </section>
  );
}

export default HistoryLogoGridSection;
