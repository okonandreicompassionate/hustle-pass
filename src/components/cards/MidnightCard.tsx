import React from 'react';
import { HustlePassData, STATUS_LABEL } from '../../types';
import { PhotoImg } from '../PhotoImg';

export const MidnightCard: React.FC<{ pass: HustlePassData }> = ({ pass }) => (
  <div className="card card--midnight">
    <div className="midnight-orb" />
    <div className="midnight-body">
      <div className="midnight-photo">
        <PhotoImg src={pass.photo} alt={pass.name} crossOrigin="anonymous" />
      </div>

      <h2 className="midnight-name">{pass.name}</h2>
      <div className="midnight-title">{pass.jobTitle}</div>
      <div className="midnight-skills">{pass.skills.join(' / ')}</div>

      <div className="card-status hp-status-line" style={{ color: 'var(--muted-on-dark)', marginTop: 10 }}>
        <span className="card-status-dot" style={{ color: 'var(--lagoon)' }}>&#9679;</span>
        {STATUS_LABEL[pass.status]}
      </div>

      <div className="midnight-row">
        <a href={pass.cvUrl} target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn--paper">Download CV</a>
        <a
          href={`https://wa.me/${pass.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="midnight-link"
        >
          Hire me &rarr;
        </a>
      </div>
    </div>
  </div>
);
