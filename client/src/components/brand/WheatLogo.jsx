import React from 'react';
import { Link } from 'react-router-dom';

export function WheatLogo({ size = 'normal', light = false, variant = 'default' }) {
  const isLarge = size === 'large';
  const isMedium = size === 'medium';
  const isSmall = size === 'small';

  const iconDimension = isLarge ? 36 : isMedium ? 30 : isSmall ? 22 : 28;

  // Text color: on dark backgrounds (light=true or variant='gold'), use warm gold or cream
  let textColor = '#590B16'; // burgundy by default
  if (variant === 'gold') {
    textColor = '#D4AB65';
  } else if (light) {
    textColor = '#F8F3E8';
  }

  const goldColor = '#B78A3D';

  return (
    <Link
      to="/"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
      aria-label="La Carafa des Blés — Accueil"
    >
      {/* Authentic Diagonal Wheat Ear Icon (Matches browser tab window header favicon) */}
      <svg
        width={iconDimension}
        height={iconDimension}
        viewBox="0 0 24 24"
        fill="none"
        stroke={goldColor}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      >
        <path d="M2 22 16 8" />
        <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
        <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
        <path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
        <path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isLarge ? '1.5rem' : isMedium ? '1.35rem' : '1.25rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: textColor,
            lineHeight: 1.1,
            transition: 'color 0.2s ease'
          }}
        >
          LA CARAFA
        </span>
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: isLarge ? '1.15rem' : isMedium ? '1.02rem' : '0.95rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: textColor,
            lineHeight: 1.1,
            transition: 'color 0.2s ease'
          }}
        >
          DES BLÉS
        </span>
      </div>
    </Link>
  );
}
