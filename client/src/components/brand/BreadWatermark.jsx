import React from 'react';

/**
 * Artisan Sourdough Loaf (Khobza / Pain au levain) Watermark:
 * Delicate vector illustration of a scored artisanal sourdough boule and baguette.
 * Used for subtle, atmospheric luxury background ornamentation.
 */
export function BreadWatermark({ size = 260, color = 'var(--color-gold)', opacity = 0.06, style = {} }) {
  return (
    <div
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
        opacity,
        ...style
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size * 0.75}
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Artisan Sourdough Boule Outline */}
        <path
          d="M25,115 C20,85 45,35 100,32 C155,35 180,85 175,115 C150,128 50,128 25,115 Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Base shadow/crust line */}
        <path
          d="M32,114 C65,124 135,124 168,114"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Signature Artisan "Grigne" / Sourdough Ear Scoring */}
        <path
          d="M50,75 C70,45 130,45 150,75"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M55,78 C75,52 125,52 145,78"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="2 3"
        />

        {/* Botanical Wheat Kernel Flour-Dusting Scores */}
        {/* Center stem */}
        <path
          d="M100,48 L100,105"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Kernel slashes left & right */}
        <path d="M100,58 C90,52 82,58 78,64 C86,65 94,62 100,58 Z" stroke={color} strokeWidth="1.2" />
        <path d="M100,58 C110,52 118,58 122,64 C114,65 106,62 100,58 Z" stroke={color} strokeWidth="1.2" />

        <path d="M100,74 C88,68 80,75 75,82 C84,83 93,80 100,74 Z" stroke={color} strokeWidth="1.2" />
        <path d="M100,74 C112,68 120,75 125,82 C116,83 107,80 100,74 Z" stroke={color} strokeWidth="1.2" />

        <path d="M100,90 C90,85 83,92 79,98 C87,99 94,96 100,90 Z" stroke={color} strokeWidth="1.2" />
        <path d="M100,90 C110,85 117,92 121,98 C113,99 106,96 100,90 Z" stroke={color} strokeWidth="1.2" />

        {/* Flour Dusting Specks */}
        <circle cx="48" cy="98" r="1.5" fill={color} />
        <circle cx="58" cy="106" r="1.2" fill={color} />
        <circle cx="142" cy="102" r="1.5" fill={color} />
        <circle cx="152" cy="95" r="1.2" fill={color} />
        <circle cx="100" cy="116" r="1.5" fill={color} />
      </svg>
    </div>
  );
}
