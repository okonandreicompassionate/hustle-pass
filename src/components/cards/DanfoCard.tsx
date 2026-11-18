import React from 'react';
import { HustlePassData, STATUS_LABEL } from '../../types';
import { PhotoImg } from '../PhotoImg';

function plateNumber(id: string): string {
  const digits = id.replace(/\D/g, '') || '1';
  return digits.slice(-4).padStart(4, '0');
}

export const DanfoCard: React.FC<{ pass: HustlePassData }> = ({ pass }) => (
  <div className="card card--danfo">
    <span className="danfo-plate">LAGOS &middot; {plateNumber(pass.id)}</span>
    <div className="danfo-body">
      <h2 className="danfo-title">{pass.jobTitle}</h2>

      <div className="danfo-name-band">
        {pass.name}
        <div className="danfo-photo">
          <PhotoImg src={pass.photo} alt={pass.name} crossOrigin="anonymous" />
        </div>
      </div>

      <div className="card-skills">{pass.skills.join(' · ')}</div>
      <div className="card-status danfo-status hp-status-line">
        <span className="card-status-dot" style={{ color: 'var(--lagoon-deep)' }}>&#9679;</span>
        {STATUS_LABEL[pass.status]}
      </div>

      <div className="danfo-buttons">
        <a href={pass.cvUrl} target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn--primary">Download CV</a>
        <a
          href={`https://wa.me/${pass.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hp-btn hp-btn--outline"
        >
          Hire me on WhatsApp
        </a>
      </div>
    </div>
  </div>
);
