import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { HustlePassData } from '../types';
import { ThemeCard } from '../components/cards/ThemeCard';
import { ScaledCard } from '../components/cards/ScaledCard';
import { Logo } from '../components/Logo';
import { ArrowLeftIcon } from '../components/icons';

interface ShareViewProps {
  pass: HustlePassData;
  onBack: () => void;
}

type Tab = 'status' | 'post' | 'link';

type ArtworkFormat = 'story' | 'post';

const ShareArtwork: React.FC<{
  pass: HustlePassData;
  format: ArtworkFormat;
  innerRef?: React.Ref<HTMLDivElement>;
}> = ({ pass, format, innerRef }) => (
  <div ref={innerRef} className={`share-art share-art--${format}`}>
    <div className="share-art-top">
      <div className="share-art-brand"><Logo size={24} /><span>Hustle Pass</span></div>
      <span className="share-art-edition">LAGOS · 001</span>
    </div>
    <div className="share-art-heading">
      <span>MEET</span>
      <strong>THE HUSTLE.</strong>
    </div>
    <div className="share-art-card">
      <ScaledCard maxWidth={format === 'story' ? 256 : 150}>
        <ThemeCard pass={pass} />
      </ScaledCard>
    </div>
    <div className="share-art-footer">
      <span>YOUR HUSTLE. ONE LINK.</span>
      <span>@{pass.handle}</span>
    </div>
  </div>
);

export const ShareView: React.FC<ShareViewProps> = ({ pass, onBack }) => {
  const [tab, setTab] = useState<Tab>('status');
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const exportRef = useRef<HTMLDivElement>(null);
  const shareUrl = `${window.location.origin}${window.location.pathname}#pass=${btoa(encodeURIComponent(JSON.stringify(pass)))}`;
  const linkDisplay = `hustlepass.link/${pass.handle}`;
  const artworkFormat: ArtworkFormat = tab === 'post' ? 'post' : 'story';

  const handleSaveImage = async () => {
    if (!exportRef.current || saving) return;
    setSaving(true);
    setSaveError('');
    try {
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        quality: 0.95,
        skipFonts: true,
      });
      const a = document.createElement('a');
      a.download = `hustle-pass-${pass.handle}-${artworkFormat}.png`;
      a.href = dataUrl;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Failed to generate Hustle Pass image', error);
      setSaveError('Could not save the image. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="hp-frame hp-theme-fade-enter">
      <button onClick={onBack} className="hp-btn" style={{ background: 'transparent', padding: 0, height: 'auto', alignSelf: 'flex-start', color: 'var(--ink)' }}>
        <ArrowLeftIcon size={18} /> Back
      </button>

      <h1 className="share-title" style={{ marginTop: 16 }}>Share Your Pass</h1>

      <div className="share-tabs">
        {(['status', 'post', 'link'] as Tab[]).map((t) => (
          <button key={t} className={`share-tab ${tab === t ? 'share-tab--active' : ''}`} onClick={() => setTab(t)}>
            {t === 'status' ? 'Status' : t === 'post' ? 'Post' : 'Link'}
          </button>
        ))}
      </div>

      {tab !== 'link' ? (
        <div className="share-preview-wrap">
          <div className={`share-preview share-preview--${artworkFormat}`}>
            <ShareArtwork pass={pass} format={artworkFormat} />
          </div>
        </div>
      ) : (
        <div className="share-link-row">{linkDisplay}</div>
      )}

      {tab === 'link' && (
        <p className="landing-sub" style={{ marginTop: 10 }}>
          Anyone with this link sees {pass.name.split(' ')[0]}&rsquo;s live Hustle Pass &mdash; no sign-in needed.
        </p>
      )}

      <div className="share-art-export" aria-hidden="true">
        <ShareArtwork pass={pass} format={artworkFormat} innerRef={exportRef} />
      </div>

      <div className="share-buttons">
        {tab !== 'link' ? (
          <>
            <button className="hp-btn hp-btn--app hp-btn--primary" onClick={handleSaveImage} disabled={saving}>
              {saving ? 'Saving…' : 'Save image'}
            </button>
            <button className="hp-btn hp-btn--app hp-btn--outline" onClick={handleCopyLink}>{copied ? 'Copied!' : 'Copy link'}</button>
          </>
        ) : (
          <button className="hp-btn hp-btn--app hp-btn--primary" style={{ gridColumn: '1 / -1' }} onClick={handleCopyLink}>
            {copied ? 'Link copied!' : 'Copy link'}
          </button>
        )}
      </div>
      {saveError && <p className="share-error" role="alert">{saveError}</p>}
    </div>
  );
};
