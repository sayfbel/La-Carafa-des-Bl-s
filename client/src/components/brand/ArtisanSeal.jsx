import React from 'react';

export function ArtisanSeal({ size = 110 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        userSelect: 'none'
      }}
      aria-label="Sceau : Fait maison avec passion"
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {/* Circular text path */}
        <path
          id="sealPath"
          d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          fill="none"
        />
        {/* Subtle dotted outer ring */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="#B78A3D" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="50" cy="50" r="32" fill="none" stroke="#B78A3D" strokeWidth="0.75" opacity="0.4" />
        
        {/* Text following circle */}
        <text fontSize="7.5" fill="#B78A3D" letterSpacing="2.8" fontWeight="600" fontFamily="var(--font-sans)">
          <textPath href="#sealPath" startOffset="50%" textAnchor="middle">
            FAIT MAISON • AVEC PASSION •
          </textPath>
        </text>

        {/* Center Wheat Emblem */}
        <g transform="translate(43, 38) scale(0.6)">
          <path d="M12 2v24" stroke="#B78A3D" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 4C9 4 8 7 12 10C16 7 15 4 12 4Z" fill="#B78A3D" />
          <path d="M12 10C8 10 7 14 12 17C17 14 16 10 12 10Z" fill="#B78A3D" />
          <path d="M12 17C7 17 6 21 12 24C18 21 17 17 12 17Z" fill="#B78A3D" />
        </g>
      </svg>
    </div>
  );
}
