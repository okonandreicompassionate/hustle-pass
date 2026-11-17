import React from 'react';
import { SAMPLE_PASSES } from '../mockPasses';
import { HustlePassData } from '../types';
import { Sparkles, ArrowRight, Download, MessageSquare, ShieldCheck, Zap, Layers, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LandingViewProps {
  onStartBuilding: () => void;
  onSelectPass: (pass: HustlePassData) => void;
  storedPasses: HustlePassData[];
}

export const LandingView: React.FC<LandingViewProps> = ({ onStartBuilding, onSelectPass, storedPasses }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-yellow-400 selection:text-black">
      {/* Navbar */}
      <header className="border-b border-zinc-800/80 px-4 sm:px-8 py-4 flex items-center justify-between backdrop-blur-md sticky top-0 z-40 bg-zinc-950/80">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-yellow-400 text-black font-black flex items-center justify-center text-lg shadow-md">
            ⚡
          </div>
          <span className="text-lg font-black tracking-tight bg-gradient-to-r from-yellow-400 via-amber-200 to-white bg-clip-text text-transparent">
            Hustle Pass
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              confetti({ particleCount: 30, spread: 60 });
              onStartBuilding();
            }}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-yellow-400/20 transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>Make my Pass</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-16 w-full">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Made in Lagos, For Global Hustlers
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
            Your hustle. <br />
            <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              One link.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
            No too long story. Show your work, drop your CV, and let people understand who you are in <span className="text-yellow-400 font-bold">3 seconds</span>.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                confetti({ particleCount: 50, spread: 70 });
                onStartBuilding();
              }}
              className="w-full sm:w-auto px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-base rounded-2xl shadow-xl shadow-yellow-400/25 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Make My Hustle Pass Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center font-bold">
              ⚡
            </div>
            <h3 className="text-base font-bold text-zinc-100">3-Second Read</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Clean layout highlighting your title, photo, and skills so recruiters or clients get the gist instantly.
            </p>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-2xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-100">Direct WhatsApp Hire</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              One tap on "Hire Me" opens WhatsApp with a prefilled message ready to start business.
            </p>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-2xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-100">Lagos Theme Vibe</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Switch live between Danfo Bus Ticket, NEPA Bill, Official Lagos ID, and Midnight Lekki neon glass.
            </p>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-2xl bg-purple-400/10 text-purple-400 flex items-center justify-center font-bold">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-100">Status PNG Export</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Download your card as a crisp image sized perfectly for WhatsApp Status or Instagram Stories.
            </p>
          </div>
        </div>

        {/* My Saved Passes on this device */}
        {storedPasses.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-zinc-900">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-200">Your Saved Passes on this Device</h3>
              <span className="text-xs text-zinc-500 font-mono">{storedPasses.length} saved</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {storedPasses.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => onSelectPass(p)}
                  className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400/50 p-4 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group"
                >
                  <img src={p.photoUrl} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-zinc-800" />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-zinc-100 truncate group-hover:text-yellow-400 transition-colors">{p.name}</h4>
                    <p className="text-xs text-zinc-400 truncate">{p.jobTitle}</p>
                    <span className="text-[10px] text-yellow-500 uppercase tracking-wider font-bold">Theme: {p.theme}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Sample Passes */}
        <div className="space-y-8 pt-8 border-t border-zinc-900">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Explore Community Hustles</h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Check out how other Lagos creators, devs, and professionals are rocking their Hustle Pass.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_PASSES.map((pass) => (
              <div
                key={pass.id}
                onClick={() => onSelectPass(pass)}
                className="bg-zinc-900/80 border border-zinc-800 hover:border-yellow-400/50 rounded-3xl p-5 space-y-4 cursor-pointer transition-all hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={pass.photoUrl} alt={pass.name} className="w-14 h-14 rounded-2xl object-cover bg-zinc-800" />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-zinc-100 group-hover:text-yellow-400 transition-colors truncate">
                        {pass.name}
                      </h4>
                      <span className="text-[11px] text-zinc-400 block truncate">{pass.jobTitle}</span>
                      <span className="text-[10px] text-emerald-400 font-bold">● {pass.status}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2">
                    "{pass.bio}"
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {pass.skills.map((s, i) => (
                      <span key={i} className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md font-mono">
                        #{s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-bold text-yellow-400">
                  <span>View Pass</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-6 text-center text-xs text-zinc-500 space-y-2">
        <p className="font-bold text-zinc-400">Get your Hustle Pass today. No too long story.</p>
        <p>Built with React & Tailwind CSS for the culture.</p>
      </footer>
    </div>
  );
};
