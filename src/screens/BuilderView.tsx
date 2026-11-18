import React, { useState } from 'react';
import { HustlePassData, ThemeType, StatusType, STATUS_LABEL } from '../types';
import { ScaledCard } from '../components/cards/ScaledCard';
import { ThemeCard } from '../components/cards/ThemeCard';
import { savePassToStorage, slugify } from '../utils/hustleUtils';
import { ArrowLeftIcon } from '../components/icons';
import { PhotoImg } from '../components/PhotoImg';

interface BuilderViewProps {
  initialData?: Partial<HustlePassData>;
  onFinish: (pass: HustlePassData) => void;
  onBack: () => void;
}

const PRESET_PHOTOS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
];

const THEME_SWATCHES: { id: ThemeType; color: string }[] = [
  { id: 'danfo', color: 'var(--danfo)' },
  { id: 'receipt', color: 'var(--paper-2)' },
  { id: 'id', color: 'var(--lagoon-deep)' },
  { id: 'midnight', color: 'var(--ink)' },
];

const STATUS_OPTIONS: StatusType[] = ['open', 'gigs', 'employed'];

export const BuilderView: React.FC<BuilderViewProps> = ({ initialData, onFinish, onBack }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(initialData?.name || '');
  const [jobTitle, setJobTitle] = useState(initialData?.jobTitle || '');
  const [photo, setPhoto] = useState(initialData?.photo || PRESET_PHOTOS[0]);
  const [photoError, setPhotoError] = useState('');
  const [skills, setSkills] = useState<[string, string, string]>(
    initialData?.skills || ['', '', '']
  );
  const [whatsapp, setWhatsapp] = useState(initialData?.whatsapp || '');
  const [cvUrl, setCvUrl] = useState(initialData?.cvUrl || '');
  const [status, setStatus] = useState<StatusType>(initialData?.status || 'open');
  const [theme, setTheme] = useState<ThemeType>(initialData?.theme || 'danfo');

  const pass: HustlePassData = {
    id: initialData?.id || 'pass_' + Math.random().toString(36).slice(2, 9),
    handle: initialData?.handle || slugify(name || 'hustler'),
    name: name.trim() || 'Your Name',
    jobTitle: jobTitle.trim() || 'Your Hustle',
    photo,
    skills: [skills[0] || 'Skill 1', skills[1] || 'Skill 2', skills[2] || 'Skill 3'],
    status,
    whatsapp: whatsapp.trim() || '234',
    cvUrl: cvUrl.trim() || 'https://example.com',
    theme,
    vouches: initialData?.vouches || [],
    createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0],
  };

  const canAdvance = step === 0 ? name.trim() && jobTitle.trim() : true;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError('');
    if (!file.type.startsWith('image/')) {
      setPhotoError('Choose an image file to use as your photo.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === 'string') {
        setPhoto(ev.target.result);
      } else {
        setPhotoError('Could not preview that image. Try another file.');
      }
    };
    reader.onerror = () => setPhotoError('Could not preview that image. Try another file.');
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const finish = () => {
    const finalPass = { ...pass, handle: slugify(name) };
    savePassToStorage(finalPass);
    onFinish(finalPass);
  };

  return (
    <div className="hp-frame">
      <button
        onClick={onBack}
        className="hp-btn"
        style={{ background: 'transparent', padding: 0, height: 'auto', alignSelf: 'flex-start', color: 'var(--ink)' }}
      >
        <ArrowLeftIcon size={18} /> Back
      </button>

      <h1 className="builder-title" style={{ marginTop: 16 }}>Build Your Pass</h1>

      <div className="builder-stepper">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`builder-step ${i <= step ? 'builder-step--active' : ''}`} />
        ))}
      </div>

      <div className="builder-scroll">
        {step === 0 && (
          <>
            <div className="hp-field">
              <label className="hp-label">Full name</label>
              <input className="hp-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Tunde Bakare" />
            </div>
            <div className="hp-field">
              <label className="hp-label">Job title / hustle</label>
              <input className="hp-input" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g. Senior Frontend Wizard" />
            </div>
            <div className="hp-field">
              <span className="hp-label">Your photo</span>
              <div className="builder-photo-current">
                <div className="builder-photo-preview">
                  <PhotoImg src={photo} alt={`Preview of ${name || 'your selected photo'}`} />
                </div>
                <div className="builder-photo-actions">
                  <strong>Pass photo preview</strong>
                  <label className="builder-upload-button">
                    Upload a photo
                    <input type="file" accept="image/*" onChange={handleFile} />
                  </label>
                </div>
              </div>
              {photoError && <p className="builder-photo-error" role="alert">{photoError}</p>}
              <span className="builder-photo-help">Or pick a sample photo</span>
              <div className="builder-photo-options">
                {PRESET_PHOTOS.map((url) => (
                  <button
                    key={url}
                    type="button"
                    aria-label="Choose sample photo"
                    aria-pressed={photo === url}
                    onClick={() => {
                      setPhoto(url);
                      setPhotoError('');
                    }}
                    className={`builder-photo-option ${photo === url ? 'builder-photo-option--selected' : ''}`}
                  >
                    <PhotoImg src={url} alt="" />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="hp-field">
              <label className="hp-label">Exactly 3 skills</label>
              <div className="builder-skills-row">
                {[0, 1, 2].map((i) => (
                  <input
                    key={i}
                    className="hp-input"
                    style={{ padding: '0 10px' }}
                    value={skills[i]}
                    onChange={(e) => {
                      const next = [...skills] as [string, string, string];
                      next[i] = e.target.value;
                      setSkills(next);
                    }}
                    placeholder={`Skill ${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="hp-field">
              <label className="hp-label">WhatsApp number</label>
              <input className="hp-input" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="2348031234567" />
            </div>
            <div className="hp-field">
              <label className="hp-label">CV link (Drive or Dropbox URL)</label>
              <input className="hp-input" value={cvUrl} onChange={(e) => setCvUrl(e.target.value)} placeholder="https://drive.google.com/..." />
            </div>
            <div className="hp-field">
              <label className="hp-label">Status</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className="hp-btn"
                    style={{
                      flex: 1,
                      height: 40,
                      fontSize: 12,
                      background: status === s ? 'var(--ink)' : 'transparent',
                      color: status === s ? 'var(--danfo)' : 'var(--ink)',
                      border: status === s ? 'none' : '2px solid var(--ink)',
                    }}
                  >
                    {STATUS_LABEL[s]}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ margin: '4px 0 20px', display: 'flex', justifyContent: 'center' }}>
              <ScaledCard maxWidth={200}>
                <ThemeCard pass={pass} />
              </ScaledCard>
            </div>
            <p className="builder-look-label">Pick a look</p>
            <div className="builder-swatches">
              {THEME_SWATCHES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`builder-swatch ${theme === t.id ? 'builder-swatch--selected' : ''}`}
                  style={{ background: t.color }}
                  aria-label={t.id}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="builder-nav">
        {step > 0 && (
          <button className="hp-btn hp-btn--app hp-btn--outline" onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}
        {step < 2 ? (
          <button
            className="hp-btn hp-btn--app hp-btn--primary"
            disabled={!canAdvance}
            style={{ opacity: canAdvance ? 1 : 0.5 }}
            onClick={() => setStep(step + 1)}
          >
            Next
          </button>
        ) : (
          <button className="hp-btn hp-btn--app hp-btn--primary" onClick={finish}>
            See my Pass
          </button>
        )}
      </div>
    </div>
  );
};
