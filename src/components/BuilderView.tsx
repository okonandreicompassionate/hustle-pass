import React, { useState } from 'react';
import { HustlePassData, ThemeType, StatusType } from '../types';
import { HustleCard } from './HustleCard';
import { savePassToStorage, encodePassToHash } from '../utils/hustleUtils';
import { Sparkles, ArrowLeft, Check, Wand2, User, Briefcase, Phone, Link2, MapPin, FileText, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BuilderViewProps {
  initialData?: Partial<HustlePassData>;
  onFinish: (pass: HustlePassData) => void;
  onBack: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80'
];

export const BuilderView: React.FC<BuilderViewProps> = ({ initialData, onFinish, onBack }) => {
  const [name, setName] = useState(initialData?.name || 'Tunde Bakare');
  const [jobTitle, setJobTitle] = useState(initialData?.jobTitle || 'Senior Frontend Wizard & Danfo Navigator');
  const [photoUrl, setPhotoUrl] = useState(initialData?.photoUrl || PRESET_AVATARS[0]);
  const [skill1, setSkill1] = useState(initialData?.skills?.[0] || 'React');
  const [skill2, setSkill2] = useState(initialData?.skills?.[1] || 'TypeScript');
  const [skill3, setSkill3] = useState(initialData?.skills?.[2] || 'UI Design');
  const [status, setStatus] = useState<StatusType>(initialData?.status || 'Open to Work');
  const [whatsapp, setWhatsapp] = useState(initialData?.whatsapp || '2348031234567');
  const [cvLink, setCvLink] = useState(initialData?.cvLink || 'https://example.com/my-cv.pdf');
  const [linkedinUrl, setLinkedinUrl] = useState(initialData?.linkedinUrl || 'https://linkedin.com/in/tundebakare');
  const [theme, setTheme] = useState<ThemeType>(initialData?.theme || 'danfo');
  const [location, setLocation] = useState(initialData?.location || 'Yaba, Lagos');
  const [bio, setBio] = useState(initialData?.bio || 'I build solid web apps while navigating Lagos traffic.');

  const currentPass: HustlePassData = {
    id: initialData?.id || 'pass_' + Math.random().toString(36).substring(2, 9),
    name: name.trim() || 'Anonymous Hustler',
    jobTitle: jobTitle.trim() || 'Digital Hustler',
    photoUrl: photoUrl.trim() || PRESET_AVATARS[0],
    skills: [skill1 || 'Skill 1', skill2 || 'Skill 2', skill3 || 'Skill 3'],
    status,
    whatsapp: whatsapp.trim() || '2348031234567',
    cvLink: cvLink.trim() || 'https://example.com',
    linkedinUrl: linkedinUrl.trim() || '',
    theme,
    location: location.trim(),
    bio: bio.trim(),
    vouches: initialData?.vouches || [],
    createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0]
  };

  const handleSaveAndShare = (e: React.FormEvent) => {
    e.preventDefault();
    savePassToStorage(currentPass);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    onFinish(currentPass);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPhotoUrl(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-yellow-400 selection:text-black">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800/80 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-200">
            Hustle Pass Builder
          </span>
        </div>

        <button
          onClick={handleSaveAndShare}
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
        >
          Save & Share Pass
        </button>
      </header>

      {/* Main Builder Grid */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Section (7 cols) */}
        <form onSubmit={handleSaveAndShare} className="lg:col-span-7 space-y-8 bg-zinc-900/50 border border-zinc-800 p-6 sm:p-8 rounded-3xl backdrop-blur-sm">
          <div className="space-y-2 border-b border-zinc-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-zinc-100">Design Your Digital ID</h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Fill in your details. The live preview updates instantly as you type.
            </p>
          </div>

          {/* Theme Picker */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Select Lagos Theme Vibe
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'danfo', label: 'Danfo Bus', desc: 'Yellow & Black' },
                { id: 'nepa', label: 'NEPA Bill', desc: 'Receipt Grid' },
                { id: 'lagos_id', label: 'Lagos ID', desc: 'Official Green' },
                { id: 'lekki', label: 'Midnight Lekki', desc: 'Neon Glass' }
              ].map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setTheme(t.id as ThemeType)}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    theme === t.id 
                      ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400 shadow-lg shadow-yellow-400/10' 
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <span className="text-xs font-bold text-zinc-100">{t.label}</span>
                  <span className="text-[10px] opacity-75">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-yellow-400" /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tunde Bakare"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-zinc-100 focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-yellow-400" /> Job Title / Hustle
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Wizard"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-zinc-100 focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
            </div>
          </div>

          {/* Photo URL & Preset Avatars */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-yellow-400" /> Profile Photo (Upload or Preset)
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {PRESET_AVATARS.map((url, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setPhotoUrl(url)}
                  className={`w-12 h-12 rounded-2xl overflow-hidden border-2 transition-all ${
                    photoUrl === url ? 'border-yellow-400 scale-105 shadow-md' : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="preset" className="w-full h-full object-cover" />
                </button>
              ))}
              <label className="px-4 py-3 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-300 rounded-2xl cursor-pointer transition-all flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Upload Image
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* 3 Skills */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Exactly 3 Core Skills
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={skill1}
                onChange={(e) => setSkill1(e.target.value)}
                placeholder="Skill 1 (e.g. React)"
                className="px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-zinc-100 focus:outline-none focus:border-yellow-400"
                required
              />
              <input
                type="text"
                value={skill2}
                onChange={(e) => setSkill2(e.target.value)}
                placeholder="Skill 2 (e.g. TypeScript)"
                className="px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-zinc-100 focus:outline-none focus:border-yellow-400"
                required
              />
              <input
                type="text"
                value={skill3}
                onChange={(e) => setSkill3(e.target.value)}
                placeholder="Skill 3 (e.g. Figma)"
                className="px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-zinc-100 focus:outline-none focus:border-yellow-400"
                required
              />
            </div>
          </div>

          {/* Status & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300">Hustle Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as StatusType)}
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-zinc-100 focus:outline-none focus:border-yellow-400 transition-colors"
              >
                <option value="Open to Work">Open to Work</option>
                <option value="Taking Gigs">Taking Gigs</option>
                <option value="Employed">Employed</option>
                <option value="Japa Mode">Japa Mode</option>
                <option value="Busy Cooking">Busy Cooking</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-yellow-400" /> Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Yaba, Lagos"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-zinc-100 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>
          </div>

          {/* WhatsApp & CV Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-yellow-400" /> WhatsApp Number
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="e.g. 2348031234567"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-zinc-100 focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
              <span className="text-[10px] text-zinc-500">Include country code without '+' (e.g. 234...)</span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-yellow-400" /> CV / Resume Link
              </label>
              <input
                type="url"
                value={cvLink}
                onChange={(e) => setCvLink(e.target.value)}
                placeholder="Google Drive / Dropbox / PDF URL"
                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-zinc-100 focus:outline-none focus:border-yellow-400 transition-colors"
                required
              />
            </div>
          </div>

          {/* LinkedIn Profile URL */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-yellow-400" /> LinkedIn Profile URL (Optional)
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-zinc-100 focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          {/* Short Bio */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-yellow-400" /> Short Vibe / Bio (Optional)
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell people what makes your hustle special in one sentence..."
              rows={2}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-zinc-100 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-base rounded-2xl shadow-xl shadow-yellow-400/20 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>Generate & Share Pass</span>
            <Sparkles className="w-5 h-5" />
          </button>
        </form>

        {/* Live Preview Section (5 cols sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Live Card Preview</span>
            <span className="text-xs text-yellow-400 font-mono">Updating live ⚡</span>
          </div>
          <HustleCard pass={currentPass} showActions={false} />
        </div>
      </div>
    </div>
  );
};
