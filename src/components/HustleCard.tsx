import React, { useRef, useState } from 'react';
import { HustlePassData } from '../types';
import { formatWhatsAppUrl } from '../utils/hustleUtils';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  MessageSquare, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  Briefcase, 
  MapPin, 
  Send, 
  QrCode, 
  Camera, 
  Award,
  ExternalLink,
  ShieldCheck,
  Zap,
  Check,
  Linkedin
} from 'lucide-react';

interface HustleCardProps {
  pass: HustlePassData;
  onVouchAdded?: (newVouches: HustlePassData['vouches']) => void;
  showActions?: boolean;
}

export const HustleCard: React.FC<HustleCardProps> = ({ pass, onVouchAdded, showActions = true }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [vouchName, setVouchName] = useState('');
  const [vouchMessage, setVouchMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const currentUrl = window.location.href.split('#')[0] + `#pass=${btoa(encodeURIComponent(JSON.stringify(pass)))}`;

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, quality: 0.95, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = `hustle-pass-${pass.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
      alert('Could not export image directly. You can take a screenshot!');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    confetti({ particleCount: 30, spread: 50 });
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const handleAddVouch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vouchName.trim() || !vouchMessage.trim()) return;

    const newVouch = {
      id: 'v_' + Math.random().toString(36).substring(2, 9),
      author: vouchName.trim(),
      message: vouchMessage.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedVouches = [newVouch, ...pass.vouches];
    pass.vouches = updatedVouches;
    if (onVouchAdded) {
      onVouchAdded(updatedVouches);
    }

    // save to localStorage
    try {
      const stored = localStorage.getItem('hustle_passes');
      if (stored) {
        const parsed: HustlePassData[] = JSON.parse(stored);
        const idx = parsed.findIndex(p => p.id === pass.id);
        if (idx >= 0) {
          parsed[idx].vouches = updatedVouches;
          localStorage.setItem('hustle_passes', JSON.stringify(parsed));
        }
      }
    } catch {}

    setVouchName('');
    setVouchMessage('');
    confetti({ particleCount: 40, spread: 70 });
    triggerToast(`Vouch received! ${newVouch.author} just endorsed ${pass.name.split(' ')[0]}.`);
  };

  // Theme configuration styles
  const getThemeStyles = () => {
    switch (pass.theme) {
      case 'danfo':
        return {
          container: 'bg-[#FDE047] text-black border-4 border-black shadow-[8px_8px_0px_0px_#000]',
          header: 'bg-black text-[#FDE047] px-4 py-3 font-black tracking-wider uppercase flex justify-between items-center border-b-4 border-black',
          badge: 'bg-black text-[#FDE047] font-bold px-3 py-1 rounded-none uppercase text-xs tracking-wider border border-black',
          skillChip: 'bg-white text-black font-bold px-3 py-1 text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000]',
          buttonPrimary: 'bg-black text-[#FDE047] hover:bg-zinc-800 font-extrabold border-2 border-black shadow-[4px_4px_0px_0px_#FFF] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all',
          buttonSecondary: 'bg-white text-black hover:bg-yellow-100 font-extrabold border-2 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all',
          accentStripe: 'h-3 bg-black w-full repeating-linear-gradient(45deg, #000, #000 10px, #FDE047 10px, #FDE047 20px)'
        };
      case 'nepa':
        return {
          container: 'bg-[#FEF08A] text-zinc-900 border-2 border-dashed border-amber-800 shadow-xl font-mono',
          header: 'bg-amber-900 text-amber-50 px-4 py-3 font-bold tracking-widest uppercase flex justify-between items-center border-b border-amber-800',
          badge: 'bg-amber-200 text-amber-900 font-bold px-3 py-0.5 rounded text-xs border border-amber-400',
          skillChip: 'bg-amber-100 text-amber-900 font-bold px-3 py-1 text-xs border border-amber-300 rounded',
          buttonPrimary: 'bg-emerald-700 text-white hover:bg-emerald-800 font-bold rounded shadow-md transition-all',
          buttonSecondary: 'bg-amber-800 text-amber-100 hover:bg-amber-900 font-bold rounded shadow-md transition-all',
          accentStripe: 'bg-amber-300 h-2 w-full'
        };
      case 'lagos_id':
        return {
          container: 'bg-white text-zinc-900 border-2 border-emerald-600 shadow-2xl rounded-2xl overflow-hidden',
          header: 'bg-gradient-to-r from-emerald-800 to-emerald-600 text-white px-4 py-3 font-bold tracking-wide flex justify-between items-center',
          badge: 'bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-xs border border-emerald-300',
          skillChip: 'bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 text-xs rounded-full border border-emerald-200',
          buttonPrimary: 'bg-emerald-600 text-white hover:bg-emerald-700 font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all',
          buttonSecondary: 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200 font-bold rounded-xl transition-all',
          accentStripe: 'bg-gradient-to-r from-green-500 via-white to-green-500 h-2 w-full'
        };
      case 'lekki':
      default:
        return {
          container: 'bg-slate-950 text-slate-100 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] rounded-3xl backdrop-blur-xl overflow-hidden',
          header: 'bg-gradient-to-r from-cyan-950/80 to-slate-900/80 border-b border-cyan-500/20 text-cyan-400 px-5 py-3 font-bold tracking-wider flex justify-between items-center',
          badge: 'bg-cyan-950/80 text-cyan-300 font-semibold px-3 py-1 rounded-full text-xs border border-cyan-500/30',
          skillChip: 'bg-cyan-950/40 text-cyan-200 font-medium px-3 py-1 text-xs rounded-full border border-cyan-500/20',
          buttonPrimary: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold rounded-2xl shadow-lg shadow-cyan-500/25 transition-all',
          buttonSecondary: 'bg-slate-900 text-cyan-300 hover:bg-slate-800 font-semibold rounded-2xl border border-cyan-500/20 transition-all',
          accentStripe: 'bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 h-1 w-full'
        };
    }
  };

  const theme = getThemeStyles();

  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'Open to Work': return 'bg-emerald-500/20 text-emerald-600 border-emerald-500/40';
      case 'Taking Gigs': return 'bg-amber-500/20 text-amber-600 border-amber-500/40';
      case 'Japa Mode': return 'bg-purple-500/20 text-purple-600 border-purple-500/40';
      case 'Busy Cooking': return 'bg-rose-500/20 text-rose-600 border-rose-500/40';
      default: return 'bg-blue-500/20 text-blue-600 border-blue-500/40';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 relative">
      {/* Toast Notification with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white border border-emerald-500/40 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-zinc-100">
              {toastMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Actual Card to export */}
      <div 
        ref={cardRef} 
        className={`w-full transition-all duration-300 relative ${theme.container}`}
      >
        {/* Top Strip / Header */}
        <div className={theme.header}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono tracking-widest opacity-80">HUSTLE PASS // ID: {pass.id.substring(0, 8).toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>VERIFIED LAGOSIAN</span>
          </div>
        </div>

        {/* Accent Bar */}
        <div className={theme.accentStripe} />

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Row: Photo & Basic Info */}
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-current shadow-md bg-zinc-800 flex items-center justify-center">
                {pass.photoUrl ? (
                  <img 
                    src={pass.photoUrl} 
                    alt={pass.name} 
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                    onError={(e)=>{
                      // fallback
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-2xl font-black">{pass.name.charAt(0)}</span>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1 shadow-md" title="Verified">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadgeColor(pass.status)}`}>
                  ● {pass.status}
                </span>
                {pass.location && (
                  <span className="text-xs opacity-70 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {pass.location}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight truncate">
                {pass.name}
              </h2>

              <p className="text-sm font-medium opacity-90 leading-snug">
                {pass.jobTitle}
              </p>
            </div>
          </div>

          {/* Bio if present */}
          {pass.bio && (
            <p className="text-xs opacity-80 italic border-l-2 border-current pl-3 py-0.5">
              "{pass.bio}"
            </p>
          )}

          {/* 3 Skill Chips */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider opacity-70 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Core Hustle Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {pass.skills.map((skill, idx) => (
                <span key={idx} className={theme.skillChip}>
                  #{skill.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs inside card */}
          {showActions && (
            <div className={`grid gap-3 pt-2 ${pass.linkedinUrl ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'}`}>
              <a 
                href={pass.cvLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 py-3 px-3 text-xs font-bold rounded-xl text-center ${theme.buttonSecondary}`}
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>CV</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              {pass.linkedinUrl && (
                <a 
                  href={pass.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 py-3 px-3 text-xs font-bold rounded-xl text-center ${theme.buttonSecondary}`}
                >
                  <Linkedin className="w-4 h-4 shrink-0 text-blue-500" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              )}

              <a 
                href={formatWhatsAppUrl(pass.whatsapp, pass.name, pass.jobTitle)} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 py-3 px-3 text-xs font-bold rounded-xl text-center ${theme.buttonPrimary}`}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Hire Me</span>
              </a>
            </div>
          )}

          {/* QR Code trigger & Footer */}
          <div className="pt-4 border-t border-current/10 flex items-center justify-between text-xs opacity-75">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowQRModal(true)}
                className="flex items-center gap-1 hover:underline font-bold"
              >
                <QrCode className="w-4 h-4" /> Show QR Code
              </button>
            </div>
            <div className="font-mono text-[10px]">
              Hustle Pass © {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>

      {/* External Control Actions Bar */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleDownloadImage}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
          >
            <Camera className="w-4 h-4" />
            <span>{isExporting ? 'Preparing PNG...' : 'Save Card as Image'}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm rounded-2xl shadow-lg transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>{copiedLink ? 'Link Copied!' : 'Copy Share Link'}</span>
          </button>
        </div>
      )}

      {/* Vouches Section */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Hustle Vouches ({pass.vouches.length})</span>
          </h3>
          <span className="text-xs text-zinc-500">Real talk only</span>
        </div>

        {/* Existing Vouches */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {pass.vouches.length === 0 ? (
            <p className="text-xs text-zinc-500 italic py-2 text-center">
              No vouches yet. Be the first person to vouch for this hustle!
            </p>
          ) : (
            pass.vouches.map((v) => (
              <div key={v.id} className="bg-zinc-50 dark:bg-zinc-800/60 p-3.5 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-900 dark:text-zinc-200">@{v.author}</span>
                  <span className="text-[10px] text-zinc-400">{v.createdAt}</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  "{v.message}"
                </p>
              </div>
            ))
          )}
        </div>

        {/* Add Vouch Form */}
        <form onSubmit={handleAddVouch} className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
          <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            Vouch for {pass.name.split(' ')[0]}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Your Name / Title"
              value={vouchName}
              onChange={(e) => setVouchName(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <input
              type="text"
              placeholder="One-line vouch (e.g. Sharp guy!)"
              value={vouchMessage}
              onChange={(e) => setVouchMessage(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Drop Vouch</span>
          </button>
        </form>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl border border-zinc-200 dark:border-zinc-800">
            <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Scan Hustle Pass
            </h4>
            <div className="bg-white p-4 rounded-2xl inline-block shadow-inner mx-auto border border-zinc-200">
              <QRCodeSVG value={currentUrl} size={180} level="H" includeMargin={true} />
            </div>
            <p className="text-xs text-zinc-500">
              Scan with any phone camera to view {pass.name}'s verified Hustle Pass instantly.
            </p>
            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
