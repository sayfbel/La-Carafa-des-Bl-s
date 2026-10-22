import React from 'react';

/**
 * Exact vector replica of the Noun Project "Wheat Ear" graphic by OneShoot
 * Used for subtle, luxurious background watermarks
 */
export function WheatEarWatermark({ size = 180, color = '#D4AB65', opacity = 0.1, style = {} }) {
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
        height={size * 1.25}
        viewBox="0 0 100 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Central Vertical Spine / Stem */}
        <path d="M50 8 L50 118" stroke={color} strokeWidth="1.8" strokeLinecap="round" />

        {/* Topmost Kernel Spike */}
        <path
          d="M50 8 C47 16, 47 24, 50 28 C53 24, 53 16, 50 8 Z"
          fill={color}
        />

        {/* Tier 1 Kernels */}
        <path
          d="M50 24 C44 20, 39 27, 43 35 C46 33, 49 30, 50 28 Z"
          fill={color}
        />
        <path
          d="M50 24 C56 20, 61 27, 57 35 C54 33, 51 30, 50 28 Z"
          fill={color}
        />

        {/* Tier 2 Kernels */}
        <path
          d="M50 36 C42 31, 35 40, 41 50 C45 47, 48 43, 50 41 Z"
          fill={color}
        />
        <path
          d="M50 36 C58 31, 65 40, 59 50 C55 47, 52 43, 50 41 Z"
          fill={color}
        />

        {/* Tier 3 Kernels */}
        <path
          d="M50 49 C40 43, 31 54, 39 65 C44 61, 48 57, 50 54 Z"
          fill={color}
        />
        <path
          d="M50 49 C60 43, 69 54, 61 65 C56 61, 52 57, 50 54 Z"
          fill={color}
        />

        {/* Tier 4 Kernels */}
        <path
          d="M50 63 C38 56, 28 69, 37 81 C42 76, 47 71, 50 68 Z"
          fill={color}
        />
        <path
          d="M50 63 C62 56, 72 69, 63 81 C58 76, 53 71, 50 68 Z"
          fill={color}
        />

        {/* Tier 5 Kernels */}
        <path
          d="M50 78 C37 70, 26 84, 36 96 C42 90, 47 85, 50 82 Z"
          fill={color}
        />
        <path
          d="M50 78 C63 70, 74 84, 64 96 C58 90, 53 85, 50 82 Z"
          fill={color}
        />

        {/* Bottom Curved Outward Leaves */}
        <path
          d="M50 96 C36 92, 20 84, 12 68 C 18 80, 32 94, 50 98"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M50 96 C64 92, 80 84, 88 68 C 82 80, 68 94, 50 98"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Base Stem End */}
        <path d="M50 96 L50 120" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
