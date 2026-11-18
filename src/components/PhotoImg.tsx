import React, { useState } from 'react';

interface PhotoImgProps {
  src?: string;
  alt: string;
  crossOrigin?: 'anonymous';
}

/** An <img> that disappears cleanly instead of leaking alt text when the URL 404s or is blocked. */
export const PhotoImg: React.FC<PhotoImgProps> = ({ src, alt, crossOrigin }) => {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      crossOrigin={crossOrigin}
      onError={() => setFailed(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
};
