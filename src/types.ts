export type ThemeType = 'danfo' | 'nepa' | 'lagos_id' | 'lekki';

export type StatusType = 'Open to Work' | 'Taking Gigs' | 'Employed' | 'Japa Mode' | 'Busy Cooking';

export interface Vouch {
  id: string;
  author: string;
  message: string;
  createdAt: string;
}

export interface HustlePassData {
  id: string;
  name: string;
  jobTitle: string;
  photoUrl: string;
  skills: string[]; // exactly 3 skills
  status: StatusType;
  whatsapp: string; // e.g. 2348012345678
  cvLink: string;
  linkedinUrl?: string;
  theme: ThemeType;
  bio?: string;
  location?: string;
  vouches: Vouch[];
  createdAt: string;
}
