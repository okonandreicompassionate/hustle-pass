import { HustlePassData } from '../types';

export function encodePassToHash(pass: HustlePassData): string {
  try {
    const json = JSON.stringify(pass);
    const encoded = btoa(encodeURIComponent(json));
    return `#pass=${encoded}`;
  } catch {
    return '';
  }
}

export function decodePassFromHash(hash: string): HustlePassData | null {
  try {
    if (!hash.startsWith('#pass=')) return null;
    const encoded = hash.replace('#pass=', '');
    const json = decodeURIComponent(atob(encoded));
    const parsed = JSON.parse(json);
    if (parsed && parsed.name && parsed.jobTitle) {
      return parsed as HustlePassData;
    }
    return null;
  } catch {
    return null;
  }
}

export function formatWhatsAppUrl(whatsappNumber: string, name: string, jobTitle: string): string {
  // clean number
  const cleaned = whatsappNumber.replace(/\D/g, '');
  const message = encodeURIComponent(`Omo ${name}! I saw your Hustle Pass as "${jobTitle}" and I want us to talk business. When you are free?`);
  return `https://wa.me/${cleaned}?text=${message}`;
}

export function getStoredPasses(): HustlePassData[] {
  try {
    const raw = localStorage.getItem('hustle_passes');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function savePassToStorage(pass: HustlePassData): void {
  try {
    const existing = getStoredPasses();
    const index = existing.findIndex(p => p.id === pass.id);
    if (index >= 0) {
      existing[index] = pass;
    } else {
      existing.unshift(pass);
    }
    localStorage.setItem('hustle_passes', JSON.stringify(existing));
  } catch {
    // ignore
  }
}

export function getPassById(id: string): HustlePassData | null {
  const stored = getStoredPasses();
  const found = stored.find(p => p.id === id);
  if (found) return found;
  return null;
}
