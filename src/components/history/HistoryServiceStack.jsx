import { createElement } from 'react';
import HistoryBrandStatement01 from './HistoryBrandStatement01';
import HistoryBrandStatement02 from './HistoryBrandStatement02';
import HistoryBrandStatement03 from './HistoryBrandStatement03';
import './HistoryServiceStack.css';

const servicePanels = [
  { id: 'originality', Component: HistoryBrandStatement01 },
  { id: 'flexibility', Component: HistoryBrandStatement02 },
  { id: 'sincerity', Component: HistoryBrandStatement03 },
];

export default function HistoryServiceStack() {
  return (
    <div className="history-service-stack">
      {servicePanels.map(({ id, Component }, index) => (
        <div
          className={`history-service-stack__panel history-service-stack__panel--${id}`}
          style={{ zIndex: index + 1 }}
          key={id}
        >
          {createElement(Component)}
        </div>
      ))}
    </div>
  );
}
