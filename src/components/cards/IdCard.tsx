import React from 'react';
import { HustlePassData, STATUS_LABEL } from '../../types';
import { PhotoImg } from '../PhotoImg';

function plateNumber(id: string): string {
  const digits = id.replace(/\D/g, '') || '1';
  return digits.slice(-4).padStart(4, '0');
}

export const IdCard: React.FC<{ pass: HustlePassData }> = ({ pass }) => (
  <div className="card card--id">
    <div className="id-header">
      <span>LAGOS HUSTLE ID</span>
      <span>{plateNumber(pass.id)}</span>
    </div>
    <div className="id-body">
      <div className="id-top-row">
        <div className="id-photo">
          <PhotoImg src={pass.photo} alt={pass.name} crossOrigin="anonymous" />
        </div>
        <div className="id-fields">
          <span className="id-field-label">Trade</span>
          <span className="id-field-value">{pass.jobTitle}</span>
          <span className="id-field-label">Skills</span>
          <span className="id-field-value">{pass.skills.join(' / ')}</span>
          <span className="id-field-label">Status</span>
          <span className="id-field-value">{STATUS_LABEL[pass.status]}</span>
        </div>
      </div>

      <h2 className="id-name">{pass.name}</h2>

      <div className="id-buttons">
        <a href={pass.cvUrl} target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn--green">Download CV</a>
        <a
          href={`https://wa.me/${pass.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hp-btn hp-btn--green-outline"
        >
          Hire me
        </a>
      </div>
    </div>
  </div>
);
