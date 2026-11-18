import React from 'react';
import { HustlePassData, STATUS_LABEL } from '../../types';

export const ReceiptCard: React.FC<{ pass: HustlePassData }> = ({ pass }) => {
  const rows: [string, string][] = [
    ['NAME', pass.name],
    ['TRADE', pass.jobTitle],
    ['SKILLS', pass.skills.join(', ')],
    ['CV', 'Linked below'],
  ];

  return (
    <div className="card card--receipt">
      <div className="receipt-heading">Hustle Pass &mdash; Lagos</div>
      <div className="receipt-body">
        <div className="receipt-rows">
          {rows.map(([label, value]) => (
            <div className="receipt-row" key={label}>
              <span className="receipt-label">{label}</span>
              <span className="receipt-leader" />
              <span className="receipt-value">{value}</span>
            </div>
          ))}
        </div>

        <div className="receipt-stamp">{STATUS_LABEL[pass.status]}</div>

        <div className="receipt-barcode" />
        <div className="receipt-buttons">
          <a href={pass.cvUrl} target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn--ink-paper">
            Download CV
          </a>
          <a
            href={`https://wa.me/${pass.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hp-btn hp-btn--outline"
          >
            Hire me
          </a>
        </div>
      </div>
    </div>
  );
};
