import React from 'react';
import { HustlePassData } from '../types';
import { Logo } from '../components/Logo';
import { ThemeCard } from '../components/cards/ThemeCard';
import { ScaledCard } from '../components/cards/ScaledCard';
import { SAMPLE_PASSES } from '../mockPasses';

interface LandingViewProps {
  onStartBuilding: () => void;
  storedPasses: HustlePassData[];
}

export const LandingView: React.FC<LandingViewProps> = ({ onStartBuilding, storedPasses }) => {
  const featured = storedPasses[0] || SAMPLE_PASSES[0];

  return (
    <div className="hp-frame landing hp-theme-fade-enter">
      <div className="landing-top">
        <Logo size={34} variant="dark" />
        <span className="landing-wordmark">Hustle Pass</span>
        <span className="landing-made-here">MADE FOR THE HUSTLE</span>
      </div>

      <h1 className="landing-headline">Your hustle.<br />One link.</h1>

      <p className="landing-intro">
        Your skills, your work, your way to reach you — all in one shareable pass.
      </p>

      <div className="landing-preview">
        <div className="landing-preview-top">
          <span>01 / YOUR DIGITAL ID</span>
          <span className="landing-live"><i /> LIVE</span>
        </div>
        <div className="landing-preview-card">
          <ScaledCard maxWidth={196}>
            <ThemeCard pass={featured} />
          </ScaledCard>
        </div>
        <div className="landing-preview-foot">
          <span>LOOKING FOR GIGS</span>
          <span>READY TO SHARE ↗</span>
        </div>
      </div>

      <div className="landing-bottom">
        <button className="hp-btn hp-btn--app hp-btn--primary" onClick={onStartBuilding}>
          Make my Pass
        </button>
        <p className="landing-sub">Free. Ready in 2 minutes. No account needed.</p>
      </div>
    </div>
  );
};
