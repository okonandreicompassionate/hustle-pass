export type ThemeType = 'danfo' | 'receipt' | 'id' | 'midnight';

export type StatusType = 'open' | 'gigs' | 'employed';

export const STATUS_LABEL: Record<StatusType, string> = {
  open: 'Open to work',
  gigs: 'Taking gigs',
  employed: 'Employed',
};

export interface Vouch {
  id: string;
  author: string;
  message: string;
  createdAt: string;
}

export interface HustlePassData {
  id: string;
  handle: string;
  name: string;
  jobTitle: string;
  photo: string;
  skills: [string, string, string];
  status: StatusType;
  whatsapp: string; // e.g. 2348012345678, no '+'
  cvUrl: string;
  theme: ThemeType;
  vouches: Vouch[];
  createdAt: string;
}
