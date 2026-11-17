import { HustlePassData } from './types';

export const SAMPLE_PASSES: HustlePassData[] = [
  {
    id: 'tunde-danfo-dev',
    name: 'Tunde Bakare',
    jobTitle: 'Senior Danfo Navigator & React Wizard',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    skills: ['React', 'TypeScript', 'Lagos Traffic Navigation'],
    status: 'Open to Work',
    whatsapp: '2348031234567',
    cvLink: 'https://example.com/tunde-cv.pdf',
    linkedinUrl: 'https://linkedin.com/in/tundebakare',
    theme: 'danfo',
    bio: 'I can debug your production server while dodging keke napep in Yaba. No bug pass Oshodi traffic.',
    location: 'Yaba, Lagos',
    vouches: [
      { id: 'v1', author: 'Chief Alabi', message: 'This boy code is sharp like generator!', createdAt: '2026-11-15' },
      { id: 'v2', author: 'Funke O.', message: 'Shipped our app in 2 days. Mad guy!', createdAt: '2026-11-16' }
    ],
    createdAt: '2026-11-01'
  },
  {
    id: 'chioma-growth-queen',
    name: 'Chioma Adebayo',
    jobTitle: 'Growth Queen & Brand Alchemist',
    photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    skills: ['Viral Marketing', 'TikTok Ads', 'Community Building'],
    status: 'Taking Gigs',
    whatsapp: '2348098765432',
    cvLink: 'https://example.com/chioma-cv.pdf',
    linkedinUrl: 'https://linkedin.com/in/chiomaadebayo',
    theme: 'lagos_id',
    bio: 'Making brands go viral from Ikeja to London. If your product good, we go blow am.',
    location: 'Ikeja, Lagos',
    vouches: [
      { id: 'v3', author: 'Emeka CEO', message: 'Sales went 300% up after 1 week. Legendary!', createdAt: '2026-11-14' }
    ],
    createdAt: '2026-11-05'
  },
  {
    id: 'emeka-lekki-architect',
    name: 'Emeka Okafor',
    jobTitle: 'Fullstack Engineer & Cloud Mechanic',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    skills: ['Node.js', 'AWS', 'System Architecture'],
    status: 'Employed',
    whatsapp: '2348023456789',
    cvLink: 'https://example.com/emeka-cv.pdf',
    linkedinUrl: 'https://linkedin.com/in/emekaokafor',
    theme: 'lekki',
    bio: 'Building bulletproof backend systems even when PHCN takes light.',
    location: 'Lekki Phase 1, Lagos',
    vouches: [
      { id: 'v4', author: 'Desmond', message: 'Architect clean pass Lekki bridge.', createdAt: '2026-11-10' }
    ],
    createdAt: '2026-11-08'
  },
  {
    id: 'zainab-bill-wizard',
    name: 'Zainab Bello',
    jobTitle: 'UI/UX Design Oracle & Illustrator',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    skills: ['Figma', 'Design Systems', 'Motion Design'],
    status: 'Busy Cooking',
    whatsapp: '2348076543210',
    cvLink: 'https://example.com/zainab-cv.pdf',
    linkedinUrl: 'https://linkedin.com/in/zainabbello',
    theme: 'nepa',
    bio: 'Designing interfaces so sweet you go forget say NEPA took light.',
    location: 'Victoria Island, Lagos',
    vouches: [
      { id: 'v5', author: 'Kola Product', message: 'Best designer east of the Niger!', createdAt: '2026-11-12' }
    ],
    createdAt: '2026-11-09'
  }
];
