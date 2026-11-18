import React from 'react';

/**
 * Cards are authored at an intrinsic 320x500. This wrapper scales that exact
 * composition up or down to fill its container width, via a CSS container
 * query — every border, font size and offset scales uniformly, so the
 * pixel relationships from the spec hold at any display size.
 */
export const ScaledCard: React.FC<{ children: React.ReactNode; maxWidth?: number }> = ({ children, maxWidth }) => {
  return (
    <div
      style={{
        containerType: 'inline-size',
        width: '100%',
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
        aspectRatio: '320 / 500',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '320px',
          height: '500px',
          transformOrigin: 'top left',
          // Normalize the container-query length to a unitless number
          // (scale() requires a number, not a length) by dividing by 1px.
          transform: 'scale(calc(100cqw / 1px / 320))',
        }}
      >
        {children}
      </div>
    </div>
  );
};
