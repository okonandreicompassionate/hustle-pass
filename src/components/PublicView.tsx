import React, { useState } from 'react';
import { HustlePassData } from '../types';
import { HustleCard } from './HustleCard';
import { QRCodeSVG } from 'qrcode.react';
import { Sparkles, PlusCircle, ArrowLeft, QrCode, Copy, Check, Download, Share2, Link2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface PublicViewProps {
  pass: HustlePassData;
  onBackToHome: () => void;
  onCreateNew: () => void;
  onVouchUpdated: (vouches: HustlePassData['vouches']) => void;
}

export const PublicView: React.FC<PublicViewProps> = ({ pass, onBackToHome, onCreateNew, onVouchUpdated }) => {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setShowToast(true);
    confetti({ particleCount: 35, spread: 60 });
    setTimeout(() => setCopied(false), 3000);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-yellow-400 selection:text-black relative">
      {/* Toast Notification with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white border border-yellow-400/40 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-7 h-7 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-zinc-100">
              Profile link copied to clipboard! Ready to share.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <header className="border-b border-zinc-800/80 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200">
            Hustle Pass Verified
          </span>
        </div>

        <button
          onClick={() => {
            confetti({ particleCount: 40, spread: 60 });
            onCreateNew();
          }}
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Make Mine</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full p-4 sm:p-8 space-y-8 my-auto">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {pass.name}'s Hustle Pass
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Verified digital ID card. Tap buttons below to download CV or connect on WhatsApp.
          </p>
        </div>

        <HustleCard pass={pass} onVouchAdded={onVouchUpdated} showActions={true} />

        {/* Copy Profile Link CTA Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center space-y-4 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-zinc-100 flex items-center justify-center gap-2">
              <Link2 className="w-5 h-5 text-yellow-400" />
              <span>Share Profile Link</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Copy your unique shareable Hustle Pass link to send via Twitter, LinkedIn, or chat.
            </p>
          </div>

          <button
            onClick={handleCopyLink}
            className="w-full sm:w-auto px-8 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all active:scale-95 inline-flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied Successfully!' : 'Copy Profile Link'}</span>
          </button>
        </div>

        {/* Physical Sharing QR Code Generator Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5 text-center shadow-xl">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-zinc-100 flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5 text-yellow-400" />
              <span>Physical Sharing QR Code</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Show this QR code to anyone nearby to let them scan your Hustle Pass instantly with their phone camera.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl inline-block shadow-inner mx-auto border-2 border-zinc-200">
            <QRCodeSVG value={currentUrl} size={200} level="H" includeMargin={true} />
          </div>
        </div>

        {/* Banner to create own */}
        <div className="bg-gradient-to-r from-yellow-500/20 via-amber-500/10 to-transparent border border-yellow-500/30 rounded-3xl p-6 text-center space-y-4">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-yellow-400">
              Want your own Hustle Pass?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300">
              Create your custom digital ID card with CV link and WhatsApp hire button in 30 seconds.
            </p>
          </div>
          <button
            onClick={() => {
              confetti({ particleCount: 50, spread: 70 });
              onCreateNew();
            }}
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create My Hustle Pass</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-6 px-6 text-center text-xs text-zinc-500 space-y-1">
        <p className="font-bold text-zinc-400">Get your Hustle Pass — Your hustle. One link.</p>
        <p>No backend required. Built for Lagos hustlers worldwide.</p>
      </footer>
    </div>
  );
};
