import React from 'react';

/** Icon set — spec section 7. 24 grid, 1.75 stroke, round caps/joins, currentColor. */
interface IconProps {
  size?: number;
  className?: string;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const DownloadIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}><path d="M12 3v12M7 11l5 5 5-5M4 21h16" /></svg>
);

export const MessageIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}><path d="M21 12a8 8 0 0 1-11.7 7L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
);

export const VouchIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M9 12l2 2 4-4" /></svg>
);

export const ShareIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}><path d="M12 16V4M7 9l5-5 5 5M5 13v6h14v-6" /></svg>
);

export const QrIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2z" /></svg>
);

export const LinkIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}><path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1" /></svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ size = 20, className }) => (
  <svg {...base(size)} className={className}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
);
