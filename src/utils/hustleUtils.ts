import { HustlePassData } from '../types';

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 24) || 'hustler';
}

export function encodePassToHash(pass: HustlePassData): string {
  const compact = [
    pass.id,
    pass.handle,
    pass.name,
    pass.jobTitle,
    pass.photo,
    pass.skills,
    pass.status,
    pass.whatsapp,
    pass.cvUrl,
    pass.theme,
    pass.vouches.map((vouch) => [vouch.id, vouch.author, vouch.message, vouch.createdAt]),
    pass.createdAt,
  ];
  const bytes = new TextEncoder().encode(JSON.stringify(compact));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const encoded = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `#p=${encoded}`;
}

export function decodePassFromHash(hash: string): HustlePassData | null {
  try {
    if (hash.startsWith('#p=')) {
      const encoded = hash.slice(3).replace(/-/g, '+').replace(/_/g, '/');
      const binary = atob(encoded.padEnd(Math.ceil(encoded.length / 4) * 4, '='));
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      const compact: unknown = JSON.parse(new TextDecoder().decode(bytes));
      if (!Array.isArray(compact) || compact.length !== 12) return null;

      const [id, handle, name, jobTitle, photo, skills, status, whatsapp, cvUrl, theme, rawVouches, createdAt] = compact;
      if (
        typeof id !== 'string' || typeof handle !== 'string' || typeof name !== 'string' ||
        typeof jobTitle !== 'string' || typeof photo !== 'string' || !Array.isArray(skills) ||
        skills.length !== 3 || !skills.every((skill) => typeof skill === 'string') ||
        !['open', 'gigs', 'employed'].includes(status) || typeof whatsapp !== 'string' ||
        typeof cvUrl !== 'string' || !['danfo', 'receipt', 'id', 'midnight'].includes(theme) ||
        !Array.isArray(rawVouches) || typeof createdAt !== 'string'
      ) return null;

      const vouches: HustlePassData['vouches'] = [];
      for (const vouch of rawVouches) {
        if (
          !Array.isArray(vouch) || vouch.length !== 4 ||
          !vouch.every((value) => typeof value === 'string')
        ) return null;
        const [vouchId, author, message, vouchCreatedAt] = vouch;
        vouches.push({ id: vouchId, author, message, createdAt: vouchCreatedAt });
      }

      return {
        id,
        handle,
        name,
        jobTitle,
        photo,
        skills: skills as [string, string, string],
        status: status as HustlePassData['status'],
        whatsapp,
        cvUrl,
        theme: theme as HustlePassData['theme'],
        vouches,
        createdAt,
      };
    }

    if (!hash.startsWith('#pass=')) return null;
    const json = decodeURIComponent(atob(hash.slice(6)));
    const parsed: unknown = JSON.parse(json);
    if (parsed && typeof parsed === 'object' && 'name' in parsed && 'jobTitle' in parsed) {
      return parsed as HustlePassData;
    }
    return null;
  } catch {
    return null;
  }
}

export function getPassShareUrl(pass: HustlePassData): string {
  return `${window.location.origin}${window.location.pathname}${encodePassToHash(pass)}`;
}

export function formatWhatsAppUrl(whatsappNumber: string, name: string, jobTitle: string): string {
  const cleaned = whatsappNumber.replace(/\D/g, '');
  const message = encodeURIComponent(
    `Omo ${name}! I saw your Hustle Pass as "${jobTitle}" and I want us to talk business. When you are free?`
  );
  return `https://wa.me/${cleaned}?text=${message}`;
}

const STORAGE_KEY = 'hustle_passes';

export function getStoredPasses(): HustlePassData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function savePassToStorage(pass: HustlePassData): void {
  try {
    const existing = getStoredPasses();
    const index = existing.findIndex((p) => p.id === pass.id);
    if (index >= 0) {
      existing[index] = pass;
    } else {
      existing.unshift(pass);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // ignore
  }
}

export function getPassById(id: string): HustlePassData | null {
  return getStoredPasses().find((p) => p.id === id) || null;
}

const DRAFT_KEY = 'hustle_pass_draft';

export function saveDraft(partial: Partial<HustlePassData>): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(partial));
  } catch {
    // ignore
  }
}

export function loadDraft(): Partial<HustlePassData> | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
