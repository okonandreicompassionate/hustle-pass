import React, { useState } from 'react';
import { HustlePassData, STATUS_LABEL, ThemeType } from '../types';
import { formatWhatsAppUrl } from '../utils/hustleUtils';
import { ArrowLeftIcon, QrIcon, ShareIcon } from '../components/icons';
import { PhotoImg } from '../components/PhotoImg';
import { QRCodeSVG } from 'qrcode.react';

interface PublicViewProps {
  pass: HustlePassData;
  onBackToHome: () => void;
  onCreateNew: () => void;
  onShare: () => void;
  onVouchUpdated: (vouches: HustlePassData['vouches']) => void;
}

function plateNumber(id: string): string {
  const digits = id.replace(/\D/g, '') || '1';
  return digits.slice(-4).padStart(4, '0');
}

// Header/band colours echo each card theme's own chrome. The info & button
// section below always sits directly on the page's paper background (per
// spec 5.3), so buttons stay the one canonical ink/danfo + ink-outline pair
// regardless of theme — a theme's own "paper-filled" button (Midnight) would
// otherwise vanish against this section's paper background.
const PALETTE: Record<ThemeType, {
  headerBg: string; headerText: string; bandBg: string; bandText: string; photoBorder: string;
}> = {
  danfo: { headerBg: 'var(--danfo)', headerText: 'var(--ink)', bandBg: 'var(--ink)', bandText: 'var(--danfo)', photoBorder: 'var(--danfo)' },
  receipt: { headerBg: 'var(--paper-2)', headerText: 'var(--ink)', bandBg: 'var(--ink)', bandText: 'var(--paper)', photoBorder: 'var(--paper-2)' },
  id: { headerBg: 'var(--lagoon-deep)', headerText: '#fff', bandBg: '#fff', bandText: 'var(--lagoon-deep)', photoBorder: 'var(--lagoon-deep)' },
  midnight: { headerBg: 'var(--ink)', headerText: 'var(--danfo)', bandBg: 'var(--ink)', bandText: '#fff', photoBorder: 'var(--danfo)' },
};

export const PublicView: React.FC<PublicViewProps> = ({ pass, onBackToHome, onCreateNew, onShare, onVouchUpdated }) => {
  const [vouchName, setVouchName] = useState('');
  const [vouchMessage, setVouchMessage] = useState('');
  const [toast, setToast] = useState('');
  const [showQR, setShowQR] = useState(false);
  const p = PALETTE[pass.theme];
  const shareUrl = `${window.location.origin}${window.location.pathname}#pass=${btoa(encodeURIComponent(JSON.stringify(pass)))}`;

  const flashToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleAddVouch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vouchName.trim() || !vouchMessage.trim()) return;
    const updated = [
      { id: 'v_' + Math.random().toString(36).slice(2, 9), author: vouchName.trim(), message: vouchMessage.trim(), createdAt: new Date().toISOString().split('T')[0] },
      ...pass.vouches,
    ];
    onVouchUpdated(updated);
    setVouchName('');
    setVouchMessage('');
    flashToast(`Vouch received from ${vouchName.trim()}!`);
  };

  return (
    <div className="hp-frame public-frame hp-theme-fade-enter">
      {toast && <div className="hp-toast">{toast}</div>}

      <div style={{ padding: '16px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBackToHome} className="hp-btn" style={{ background: 'transparent', padding: 0, height: 'auto', color: 'var(--ink)' }}>
          <ArrowLeftIcon size={18} /> Home
        </button>
        <button onClick={onShare} className="hp-btn" style={{ background: 'transparent', padding: 0, height: 'auto', color: 'var(--ink)' }}>
          <ShareIcon size={18} /> Share
        </button>
      </div>

      <div className="public-header" style={{ background: p.headerBg, color: p.headerText }}>
        <span className="public-plate">LAGOS &middot; {plateNumber(pass.id)}</span>
        <h1 className="public-title">{pass.jobTitle}</h1>
      </div>

      <div className="public-band" style={{ background: p.bandBg, color: p.bandText }}>
        <span>{pass.name}</span>
        <div className="public-photo" style={{ border: `3px solid ${p.photoBorder}` }}>
          <PhotoImg src={pass.photo} alt={pass.name} />
        </div>
      </div>

      <div className="public-info">
        <div className="public-skills">{pass.skills.join(' · ')}</div>
        <div className="public-status" style={{ color: 'var(--lagoon-deep)' }}>&#9679; {STATUS_LABEL[pass.status]}</div>
      </div>

      <div className="public-buttons">
        <a href={pass.cvUrl} target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn--app hp-btn--primary">Download CV</a>
        <a href={formatWhatsAppUrl(pass.whatsapp, pass.name, pass.jobTitle)} target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn--app hp-btn--outline">
          Hire me on WhatsApp
        </a>
      </div>

      <div className="public-qr-wrap">
        <button onClick={() => setShowQR((s) => !s)} className="hp-btn hp-btn--outline" style={{ width: '100%' }}>
          <QrIcon size={16} /> {showQR ? 'Hide QR' : 'Show QR code'}
        </button>
        {showQR && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, background: '#fff', padding: 16, borderRadius: 10, border: '2px solid var(--ink)' }}>
            <QRCodeSVG value={shareUrl} size={140} level="H" />
          </div>
        )}
      </div>

      <div className="public-vouch-strip">
        {pass.vouches.length} {pass.vouches.length === 1 ? 'person vouches' : 'people vouch'} for {pass.name.split(' ')[0]}
      </div>

      {pass.vouches.length > 0 && (
        <div className="public-vouches-list">
          {pass.vouches.slice(0, 3).map((v) => (
            <div key={v.id} className="public-vouch-item">
              <strong>@{v.author}</strong>
              <p>&ldquo;{v.message}&rdquo;</p>
            </div>
          ))}
        </div>
      )}

      <form className="public-vouch-form" onSubmit={handleAddVouch}>
        <input className="hp-input" style={{ height: 40 }} placeholder="Your name" value={vouchName} onChange={(e) => setVouchName(e.target.value)} />
        <input className="hp-input" style={{ height: 40 }} placeholder="One-line vouch" value={vouchMessage} onChange={(e) => setVouchMessage(e.target.value)} />
        <button type="submit" className="hp-btn hp-btn--outline" style={{ height: 40 }}>Drop a vouch</button>
      </form>

      <button onClick={onCreateNew} className="public-footer" style={{ background: 'transparent', border: 'none', color: 'var(--ink)' }}>
        Make your own Pass, free &rarr;
      </button>
    </div>
  );
};
