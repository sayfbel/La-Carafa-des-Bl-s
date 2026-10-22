import React from 'react';
import { Link } from 'react-router-dom';

export function WheatLogo({ size = 'normal', light = false }) {
  const isLarge = size === 'large';
  const color = light ? '#FFFFFF' : '#590B16';
  const goldColor = '#B78A3D';

  return (
    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }} aria-label="La Carafa des Blés — Accueil">
      {/* Refined Wheat Stalk SVG */}
      <svg
        width={isLarge ? 36 : 28}
        height={isLarge ? 48 : 38}
        viewBox="0 0 24 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <path d="M12 2v28" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />
        {/* Grain Kernels Left & Right */}
        <path d="M12 4C9 4 8 7 12 10C16 7 15 4 12 4Z" fill={goldColor} />
        <path d="M12 10C8 10 7 14 12 17C17 14 16 10 12 10Z" fill={goldColor} />
        <path d="M12 17C7 17 6 21 12 24C18 21 17 17 12 17Z" fill={goldColor} />
        <path d="M5 14C3 13 4 10 7 11C7 13 6 15 5 14Z" fill={goldColor} />
        <path d="M19 14C21 13 20 10 17 11C17 13 18 15 19 14Z" fill={goldColor} />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isLarge ? '1.5rem' : '1.25rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: color,
            lineHeight: 1.1
          }}
        >
          LA CARAFA
        </span>
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isLarge ? '1.15rem' : '0.95rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: color,
            lineHeight: 1.1
          }}
        >
          DES BLÉS
        </span>
      </div>
    </Link>
  );
}
