import React from 'react';

/**
 * SectionWaveDivider Component:
 * Creates organic, fluid wave transitions between homepage sections,
 * removing harsh divider lines and giving life to the artisanal narrative.
 */
export function SectionWaveDivider({
  fill = '#FFFFFF',
  position = 'bottom',
  variant = 'primary',
  height = 'clamp(28px, 3.8vw, 54px)',
  style = {}
}) {
  const getPositionStyle = () => {
    if (position === 'top') {
      return { top: 0, transform: 'rotate(180deg)' };
    }
    if (position === 'above') {
      return { bottom: '100%', marginBottom: '-1px' };
    }
    return { bottom: '-1px' };
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        width: '100%',
        height,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: position === 'above' ? 3 : 1,
        overflow: 'hidden',
        lineHeight: 0,
        ...getPositionStyle(),
        ...style
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        {variant === 'reverse' ? (
          <>
            {/* Secondary harmonious sub-wave */}
            <path
              d="M0,24 C220,8 440,46 720,24 C1000,4 1220,44 1440,18 L1440,64 L0,64 Z"
              fill={fill}
              opacity={0.32}
            />
            {/* Primary organic wave */}
            <path
              d="M0,32 C200,16 420,54 700,32 C980,10 1200,50 1440,28 L1440,64 L0,64 Z"
              fill={fill}
            />
          </>
        ) : (
          <>
            {/* Secondary harmonious sub-wave */}
            <path
              d="M0,22 C320,44 540,8 820,28 C1100,48 1280,14 1440,24 L1440,64 L0,64 Z"
              fill={fill}
              opacity={0.32}
            />
            {/* Primary organic wave */}
            <path
              d="M0,34 C260,56 500,16 760,36 C1020,56 1240,20 1440,32 L1440,64 L0,64 Z"
              fill={fill}
            />
          </>
        )}
      </svg>
    </div>
  );
}
