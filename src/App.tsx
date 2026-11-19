import React, { useState, useEffect } from 'react';
import { HustlePassData } from './types';
import { LandingView } from './screens/LandingView';
import { BuilderView } from './screens/BuilderView';
import { PublicView } from './screens/PublicView';
import { ShareView } from './screens/ShareView';
import { decodePassFromHash, encodePassToHash, getStoredPasses } from './utils/hustleUtils';

type ViewState = 'landing' | 'builder' | 'public' | 'share';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [activePass, setActivePass] = useState<HustlePassData | null>(null);
  const [storedPasses, setStoredPasses] = useState<HustlePassData[]>([]);

  useEffect(() => {
    setStoredPasses(getStoredPasses());

    const decoded = decodePassFromHash(window.location.hash);
    if (decoded) {
      setActivePass(decoded);
      setCurrentView('public');
    }

    const handleHashChange = () => {
      const decoded = decodePassFromHash(window.location.hash);
      if (decoded) {
        setActivePass(decoded);
        setCurrentView('public');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleVouchUpdated = (updatedVouches: HustlePassData['vouches']) => {
    if (activePass) {
      setActivePass({ ...activePass, vouches: updatedVouches });
    }
  };

  return (
    <>
      {currentView === 'landing' && (
        <LandingView
          storedPasses={storedPasses}
          onStartBuilding={() => {
            setActivePass(null);
            setCurrentView('builder');
          }}
        />
      )}

      {currentView === 'builder' && (
        <BuilderView
          initialData={activePass || undefined}
          onFinish={(pass) => {
            setActivePass(pass);
            setStoredPasses(getStoredPasses());
            window.location.hash = encodePassToHash(pass).slice(1);
            setCurrentView('public');
          }}
          onBack={() => setCurrentView('landing')}
        />
      )}

      {currentView === 'public' && activePass && (
        <PublicView
          pass={activePass}
          onBackToHome={() => {
            setCurrentView('landing');
            window.location.hash = '';
          }}
          onCreateNew={() => {
            setActivePass(null);
            setCurrentView('builder');
            window.location.hash = '';
          }}
          onShare={() => setCurrentView('share')}
          onVouchUpdated={handleVouchUpdated}
        />
      )}

      {currentView === 'share' && activePass && (
        <ShareView pass={activePass} onBack={() => setCurrentView('public')} />
      )}
    </>
  );
}
