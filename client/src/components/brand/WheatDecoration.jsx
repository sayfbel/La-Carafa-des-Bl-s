import React from 'react';

/**
 * Botanical etched wheat stalk illustration for decorative background accents
 */
export function WheatDecoration({ style = {}, opacity = 0.35, width = 120 }) {
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
        width={width}
        viewBox="0 0 160 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Curved Wheat Stem */}
        <path
          d="M30 380 C 45 280, 75 160, 110 20"
          stroke="#B78A3D"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        {/* Secondary Delicate Stem */}
        <path
          d="M15 380 C 20 290, 45 200, 70 80"
          stroke="#B78A3D"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />

        {/* Wheat Kernels & Awns (Barbes de blé) */}
        {/* Top Tip */}
        <path d="M110 20 C 114 10, 118 6, 122 2" stroke="#B78A3D" strokeWidth="1.2" />
        <path d="M110 20 C 108 8, 102 4, 98 0" stroke="#B78A3D" strokeWidth="1.2" />

        {/* Tier 1 */}
        <path d="M107 35 C 118 28, 125 32, 112 45 C 103 40, 105 36, 107 35 Z" fill="#D4AB65" stroke="#B78A3D" strokeWidth="1" />
        <path d="M118 28 C 135 15, 145 10, 155 5" stroke="#B78A3D" strokeWidth="1" />
        <path d="M103 42 C 90 35, 85 40, 95 50 C 102 46, 103 44, 103 42 Z" fill="#D4AB65" stroke="#B78A3D" strokeWidth="1" />
        <path d="M90 35 C 75 22, 65 18, 55 12" stroke="#B78A3D" strokeWidth="1" />

        {/* Tier 2 */}
        <path d="M100 60 C 112 52, 120 58, 106 72 C 98 67, 98 63, 100 60 Z" fill="#D4AB65" stroke="#B78A3D" strokeWidth="1" />
        <path d="M112 52 C 132 38, 142 32, 158 24" stroke="#B78A3D" strokeWidth="1" />
        <path d="M94 68 C 80 58, 74 65, 85 78 C 92 73, 93 70, 94 68 Z" fill="#D4AB65" stroke="#B78A3D" strokeWidth="1" />
        <path d="M80 58 C 62 44, 52 40, 40 32" stroke="#B78A3D" strokeWidth="1" />

        {/* Tier 3 */}
        <path d="M90 90 C 103 82, 112 88, 97 104 C 88 98, 88 94, 90 90 Z" fill="#D4AB65" stroke="#B78A3D" strokeWidth="1" />
        <path d="M103 82 C 126 68, 138 60, 156 50" stroke="#B78A3D" strokeWidth="1" />
        <path d="M84 98 C 70 88, 62 96, 74 110 C 81 104, 82 101, 84 98 Z" fill="#D4AB65" stroke="#B78A3D" strokeWidth="1" />
        <path d="M70 88 C 50 72, 40 68, 28 58" stroke="#B78A3D" strokeWidth="1" />

        {/* Tier 4 */}
        <path d="M80 125 C 93 116, 102 124, 86 140 C 78 134, 78 130, 80 125 Z" fill="#D4AB65" stroke="#B78A3D" strokeWidth="1" />
        <path d="M93 116 C 118 102, 130 95, 150 84" stroke="#B78A3D" strokeWidth="1" />
        <path d="M73 134 C 58 122, 50 132, 63 148 C 70 141, 71 138, 73 134 Z" fill="#D4AB65" stroke="#B78A3D" strokeWidth="1" />
        <path d="M58 122 C 38 104, 28 100, 15 90" stroke="#B78A3D" strokeWidth="1" />

        {/* Tier 5 */}
        <path d="M68 165 C 80 156, 88 165, 73 180 C 66 174, 66 170, 68 165 Z" fill="#D4AB65" stroke="#B78A3D" strokeWidth="1" />
        <path d="M80 156 C 104 142, 118 134, 138 122" stroke="#B78A3D" strokeWidth="1" />
        <path d="M60 174 C 46 162, 38 172, 50 188 C 57 181, 58 178, 60 174 Z" fill="#D4AB65" stroke="#B78A3D" strokeWidth="1" />
        <path d="M46 162 C 26 144, 18 140, 5 130" stroke="#B78A3D" strokeWidth="1" />

        {/* Lower Leaf Tendril */}
        <path
          d="M48 240 C 70 230, 95 245, 115 265 C 85 260, 60 255, 42 270"
          fill="#D4AB65"
          fillOpacity="0.4"
          stroke="#B78A3D"
          strokeWidth="1"
        />
        <path
          d="M35 310 C 18 295, 5 310, 0 325 C 15 320, 28 322, 32 335"
          fill="#D4AB65"
          fillOpacity="0.3"
          stroke="#B78A3D"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
