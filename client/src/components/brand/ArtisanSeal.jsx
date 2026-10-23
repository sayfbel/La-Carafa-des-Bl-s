import React, { useState } from 'react';

/**
 * Luxury French Boulangerie Seal / Cachet de Maître Artisan
 * Features an authentic circular rotating stamp text with a stationary golden wheat medallion in the center.
 */
export function ArtisanSeal({ size = 110, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`artisan-seal-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
        transform: isHovered ? 'scale(1.08) rotate(2deg)' : 'scale(1)',
        filter: isHovered
          ? 'drop-shadow(0 8px 22px rgba(183, 138, 61, 0.35))'
          : 'drop-shadow(0 3px 10px rgba(89, 11, 22, 0.12))'
      }}
      aria-label="Sceau : Maître Artisan Boulanger — Fait Maison avec Passion"
      title="Sceau d'Excellence Artisanale — La Carafa des Blés"
    >
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        style={{ overflow: 'visible', display: 'block' }}
      >
        <defs>
          {/* Circular path for the rotating stamp text (radius 43, centered at 60,60) */}
          <path
            id="artisanSealCirclePath"
            d="M 60, 60 m -43, 0 a 43,43 0 1,1 86,0 a 43,43 0 1,1 -86,0"
            fill="none"
          />

          {/* Golden radial gradient for the parchment/craft medallion center */}
          <radialGradient id="sealCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="70%" stopColor="#FAF4E8" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#EFE3CE" stopOpacity="0.9" />
          </radialGradient>
        </defs>

        {/* 1. CENTRAL PHYSICAL MEDALLION BASE (Parchment / Wax stamp background) */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="url(#sealCenterGlow)"
          stroke="#B78A3D"
          strokeWidth="1.2"
        />

        {/* Notched / Serrated vintage stamp perimeter accent */}
        <circle
          cx="60"
          cy="60"
          r="56.5"
          fill="none"
          stroke="#B78A3D"
          strokeWidth="0.8"
          strokeDasharray="2.5 3.5"
          opacity="0.8"
        />

        {/* Inner solid circular framing rings */}
        <circle
          cx="60"
          cy="60"
          r="33"
          fill="none"
          stroke="#B78A3D"
          strokeWidth="1"
          opacity="0.85"
        />
        <circle
          cx="60"
          cy="60"
          r="30.5"
          fill="none"
          stroke="#590B16"
          strokeWidth="0.6"
          strokeDasharray="1.5 2"
          opacity="0.55"
        />

        {/* 2. ROTATING CIRCULAR TEXT BADGE */}
        <g
          style={{
            transformOrigin: '60px 60px',
            animation: isHovered
              ? 'artisanSealSpin 12s linear infinite'
              : 'artisanSealSpin 24s linear infinite',
            transition: 'animation-duration 0.5s ease'
          }}
        >
          <text
            fontSize="6.8"
            fontFamily="var(--font-sans)"
            fontWeight="700"
            fill="#590B16"
            letterSpacing="2.8"
            style={{ textTransform: 'uppercase' }}
          >
            <textPath
              href="#artisanSealCirclePath"
              startOffset="0%"
            >
              ★ MAÎTRE ARTISAN ★ FAIT MAISON ★ DEPUIS 1998
            </textPath>
          </text>
        </g>

        {/* 3. CENTER EMBLEM (STATIONARY): Crossed Golden Wheat Ears & Artisan Banner */}
        <g id="center-emblem" style={{ pointerEvents: 'none' }}>
          {/* Subtle curved side wheat accents */}
          <path
            d="M 52 70 C 54 62, 56 52, 53 44"
            stroke="#B78A3D"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 68 70 C 66 62, 64 52, 67 44"
            stroke="#B78A3D"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Central main upright wheat stalk */}
          <path
            d="M 60 72 L 60 41"
            stroke="#B78A3D"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Top awns */}
          <path d="M 60 41 L 60 34" stroke="#B78A3D" strokeWidth="1" strokeLinecap="round" />
          <path d="M 60 41 L 55 35" stroke="#B78A3D" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M 60 41 L 65 35" stroke="#B78A3D" strokeWidth="0.8" strokeLinecap="round" />

          {/* Tier 1 Kernels */}
          <path d="M 60 44 C 57 42, 55 45, 58 48 C 60 46, 60 45, 60 44 Z" fill="#B78A3D" />
          <path d="M 60 44 C 63 42, 65 45, 62 48 C 60 46, 60 45, 60 44 Z" fill="#B78A3D" />
          <path d="M 57 43 L 52 39" stroke="#B78A3D" strokeWidth="0.75" />
          <path d="M 63 43 L 68 39" stroke="#B78A3D" strokeWidth="0.75" />

          {/* Tier 2 Kernels */}
          <path d="M 60 49 C 56 47, 54 51, 58 54 C 60 52, 60 50, 60 49 Z" fill="#B78A3D" />
          <path d="M 60 49 C 64 47, 66 51, 62 54 C 60 52, 60 50, 60 49 Z" fill="#B78A3D" />
          <path d="M 56 48 L 50 45" stroke="#B78A3D" strokeWidth="0.75" />
          <path d="M 64 48 L 70 45" stroke="#B78A3D" strokeWidth="0.75" />

          {/* Tier 3 Kernels */}
          <path d="M 60 55 C 56 53, 54 57, 58 60 C 60 58, 60 56, 60 55 Z" fill="#B78A3D" />
          <path d="M 60 55 C 64 53, 66 57, 62 60 C 60 58, 60 56, 60 55 Z" fill="#B78A3D" />
          <path d="M 56 54 L 51 52" stroke="#B78A3D" strokeWidth="0.75" />
          <path d="M 64 54 L 69 52" stroke="#B78A3D" strokeWidth="0.75" />

          {/* Golden base leaves */}
          <path
            d="M 60 62 C 54 59, 49 63, 47 67 C 51 66, 56 65, 60 63"
            fill="#B78A3D"
            opacity="0.85"
          />
          <path
            d="M 60 62 C 66 59, 71 63, 73 67 C 69 66, 64 65, 60 63"
            fill="#B78A3D"
            opacity="0.85"
          />

          {/* Center Text: ARTISAN in Burgundy Serif */}
          <text
            x="60"
            y="74"
            textAnchor="middle"
            fontFamily="var(--font-serif)"
            fontSize="6.2"
            fontWeight="700"
            fill="#590B16"
            letterSpacing="1.5"
          >
            ARTISAN
          </text>
        </g>
      </svg>
    </div>
  );
}
