import React, { useState, useEffect } from 'react';
import { HustlePassData } from './types';
import { LandingView } from './components/LandingView';
import { BuilderView } from './components/BuilderView';
import { PublicView } from './components/PublicView';
import { decodePassFromHash, getStoredPasses } from './utils/hustleUtils';

type ViewState = 'landing' | 'builder' | 'public';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [activePass, setActivePass] = useState<HustlePassData | null>(null);
  const [storedPasses, setStoredPasses] = useState<HustlePassData[]>([]);

  useEffect(() => {
    // Check localStorage
    const passes = getStoredPasses();
    setStoredPasses(passes);

    // Check URL hash for shared pass
    const hash = window.location.hash;
    if (hash && hash.startsWith('#pass=')) {
      const decoded = decodePassFromHash(hash);
      if (decoded) {
        setActivePass(decoded);
        setCurrentView('public');
      }
    }

    // Listen to hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash && newHash.startsWith('#pass=')) {
        const decoded = decodePassFromHash(newHash);
        if (decoded) {
          setActivePass(decoded);
          setCurrentView('public');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectPass = (pass: HustlePassData) => {
    setActivePass(pass);
    window.location.hash = `pass=${btoa(encodeURIComponent(JSON.stringify(pass)))}`;
    setCurrentView('public');
  };

  const handleVouchUpdated = (updatedVouches: HustlePassData['vouches']) => {
    if (activePass) {
      const updated = { ...activePass, vouches: updatedVouches };
      setActivePass(updated);
    }
  };

  return (
    <div>
      {currentView === 'landing' && (
        <LandingView
          onStartBuilding={() => {
            setActivePass(null);
            setCurrentView('builder');
          }}
          onSelectPass={handleSelectPass}
          storedPasses={storedPasses}
        />
      )}

      {currentView === 'builder' && (
        <BuilderView
          initialData={activePass || undefined}
          onFinish={(pass) => {
            setActivePass(pass);
            setStoredPasses(getStoredPasses());
            window.location.hash = `pass=${btoa(encodeURIComponent(JSON.stringify(pass)))}`;
            setCurrentView('public');
          }}
          onBack={() => {
            setCurrentView('landing');
            window.location.hash = '';
          }}
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
          onVouchUpdated={handleVouchUpdated}
        />
      )}
    </div>
  );
}
