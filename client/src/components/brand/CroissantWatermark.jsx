import React from 'react';

/**
 * Artisan Viennoiserie (Ptiepan / Croissant pur beurre & Pain au chocolat) Watermark:
 * Delicate vector illustration of a flaky crescent croissant and layered pain au chocolat.
 * Used for subtle, atmospheric luxury background ornamentation.
 */
export function CroissantWatermark({ size = 260, color = 'var(--color-gold)', opacity = 0.06, style = {} }) {
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
        viewBox="0 0 220 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === CROISSANT PUR BEURRE === */}
        {/* Outer Crescent Curve */}
        <path
          d="M20,110 C25,60 70,30 110,30 C150,30 195,60 200,110 C180,95 155,75 110,75 C65,75 40,95 20,110 Z"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner Curved Flaky Segments */}
        {/* Center Rolled Heart */}
        <path
          d="M92,32 C92,32 100,22 110,22 C120,22 128,32 128,32 C122,55 98,55 92,32 Z"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Tier 1 Rolls */}
        <path
          d="M74,42 C82,34 94,36 94,48 C90,64 78,64 74,42 Z"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M146,42 C138,34 126,36 126,48 C130,64 142,64 146,42 Z"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Tier 2 Rolls */}
        <path
          d="M52,58 C62,48 74,52 74,68 C68,82 56,80 52,58 Z"
          stroke={color}
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M168,58 C158,48 146,52 146,68 C152,82 164,80 168,58 Z"
          stroke={color}
          strokeWidth="1.3"
          strokeLinecap="round"
        />

        {/* Tips / Horns */}
        <path
          d="M20,110 C15,120 28,128 38,118 C38,105 30,105 20,110 Z"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M200,110 C205,120 192,128 182,118 C182,105 190,105 200,110 Z"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Delicate Lamination Texture Lines */}
        <path d="M85,58 C98,62 122,62 135,58" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
        <path d="M70,72 C92,78 128,78 150,72" stroke={color} strokeWidth="1" strokeDasharray="2 3" />

        {/* === MINI PAIN AU CHOCOLAT ACCOMPANIMENT === */}
        <g transform="translate(65, 105) scale(0.65)">
          {/* Rectangular Pillow Body */}
          <path
            d="M10,10 C25,5 75,5 90,10 C95,20 95,45 90,55 C75,60 25,60 10,55 C5,45 5,20 10,10 Z"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Golden Score Lines on top */}
          <path d="M28,12 C30,30 30,40 28,52" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M50,10 C52,30 52,40 50,54" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M72,12 C70,30 70,40 72,52" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          {/* Chocolate Baton ends */}
          <ellipse cx="14" cy="32" rx="4" ry="2.5" fill={color} />
          <ellipse cx="86" cy="32" rx="4" ry="2.5" fill={color} />
        </g>
      </svg>
    </div>
  );
}
