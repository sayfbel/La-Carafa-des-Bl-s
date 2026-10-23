import React from 'react';

/**
 * Botanical French Wheat Sheaf (Épis de Blé Barbus Anciens)
 * Handcrafted engraving-style illustration with gentle ambient breeze sway.
 */
export function WheatDecoration({
  style = {},
  opacity = 0.32,
  width = 220,
  color = '#B78A3D',
  animated = true,
  className = ''
}) {
  return (
    <div
      className={`wheat-decoration ${className}`}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
        opacity,
        transformOrigin: 'bottom left',
        animation: animated ? 'wheatBreezeSway 14s ease-in-out infinite alternate' : 'none',
        ...style
      }}
      aria-hidden="true"
    >
      <svg
        width={width}
        viewBox="0 0 260 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible', display: 'block' }}
      >
        <defs>
          <linearGradient id="wheatGrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AB65" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#B78A3D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8A5A1F" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="wheatStemGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#8A5A1F" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#B78A3D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D4AB65" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* ========================================================
            1. CENTRAL TALL WHEAT STALK (Grand Épi Maître)
           ======================================================== */}
        {/* Main Stem */}
        <path
          d="M 100 540 C 105 420, 120 260, 165 42"
          stroke="url(#wheatStemGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Top Whispers / Crown Awns */}
        <path d="M 165 42 C 170 24, 176 10, 185 0" stroke={color} strokeWidth="1" strokeLinecap="round" />
        <path d="M 165 42 C 162 20, 155 8, 145 0" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
        <path d="M 165 42 L 165 14" stroke={color} strokeWidth="1.1" strokeLinecap="round" />

        {/* Alternating Spikelets with Long Fine Awns */}
        {/* Tier 1 */}
        <path d="M 164 45 C 174 36, 182 42, 170 56 C 160 50, 162 46, 164 45 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="1.1" />
        <path d="M 174 36 C 196 20, 215 12, 235 4" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
        <path d="M 160 52 C 146 44, 140 50, 150 63 C 158 58, 159 55, 160 52 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="1.1" />
        <path d="M 146 44 C 124 28, 110 20, 90 12" stroke={color} strokeWidth="0.85" strokeLinecap="round" />

        {/* Tier 2 */}
        <path d="M 158 72 C 170 62, 180 70, 166 84 C 156 78, 157 74, 158 72 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="1.1" />
        <path d="M 170 62 C 198 44, 218 36, 242 26" stroke={color} strokeWidth="0.95" strokeLinecap="round" />
        <path d="M 152 79 C 137 68, 130 76, 142 90 C 150 85, 151 81, 152 79 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="1.1" />
        <path d="M 137 68 C 112 50, 98 42, 76 34" stroke={color} strokeWidth="0.85" strokeLinecap="round" />

        {/* Tier 3 */}
        <path d="M 150 102 C 163 91, 174 100, 158 115 C 148 108, 149 104, 150 102 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="1.1" />
        <path d="M 163 91 C 194 72, 216 62, 244 50" stroke={color} strokeWidth="0.95" strokeLinecap="round" />
        <path d="M 143 109 C 127 97, 120 106, 133 121 C 141 115, 142 111, 143 109 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="1.1" />
        <path d="M 127 97 C 100 78, 84 70, 60 60" stroke={color} strokeWidth="0.85" strokeLinecap="round" />

        {/* Tier 4 */}
        <path d="M 141 134 C 155 122, 167 132, 150 148 C 140 141, 140 137, 141 134 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="1.1" />
        <path d="M 155 122 C 188 102, 212 92, 242 80" stroke={color} strokeWidth="0.95" strokeLinecap="round" />
        <path d="M 133 142 C 116 128, 108 138, 122 154 C 130 148, 132 144, 133 142 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="1.1" />
        <path d="M 116 128 C 88 108, 70 100, 44 90" stroke={color} strokeWidth="0.85" strokeLinecap="round" />

        {/* Tier 5 */}
        <path d="M 131 168 C 146 155, 158 166, 140 182 C 130 175, 130 171, 131 168 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="1.1" />
        <path d="M 146 155 C 180 135, 204 125, 236 112" stroke={color} strokeWidth="0.95" strokeLinecap="round" />
        <path d="M 123 176 C 105 162, 96 172, 111 189 C 119 182, 121 178, 123 176 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="1.1" />
        <path d="M 105 162 C 76 142, 56 134, 30 124" stroke={color} strokeWidth="0.85" strokeLinecap="round" />

        {/* Tier 6 */}
        <path d="M 122 204 C 137 190, 148 202, 130 218 C 121 211, 121 207, 122 204 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="1.1" />
        <path d="M 137 190 C 170 170, 194 160, 226 146" stroke={color} strokeWidth="0.95" strokeLinecap="round" />
        <path d="M 114 212 C 96 198, 86 208, 101 226 C 109 219, 111 215, 114 212 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="1.1" />
        <path d="M 96 198 C 66 178, 46 170, 20 160" stroke={color} strokeWidth="0.85" strokeLinecap="round" />

        {/* ========================================================
            2. SECONDARY ARCHING SISTER STALK (Épi Incliné Gauche)
           ======================================================== */}
        <path
          d="M 85 540 C 85 410, 80 270, 65 140"
          stroke="url(#wheatStemGrad)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Crown Awns */}
        <path d="M 65 140 C 60 120, 52 105, 40 92" stroke={color} strokeWidth="0.85" strokeLinecap="round" />
        <path d="M 65 140 C 72 122, 80 110, 92 100" stroke={color} strokeWidth="0.85" strokeLinecap="round" />

        {/* Left Ear Spikelets */}
        <path d="M 65 145 C 55 136, 46 144, 56 156 C 64 150, 64 147, 65 145 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="0.95" />
        <path d="M 55 136 C 36 122, 22 114, 2 106" stroke={color} strokeWidth="0.75" strokeLinecap="round" />
        <path d="M 68 152 C 78 143, 86 150, 76 162 C 69 157, 68 154, 68 152 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="0.95" />
        <path d="M 78 143 C 98 130, 112 122, 130 114" stroke={color} strokeWidth="0.75" strokeLinecap="round" />

        <path d="M 67 172 C 56 162, 46 171, 58 184 C 66 177, 66 174, 67 172 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="0.95" />
        <path d="M 56 162 C 34 148, 18 138, 0 128" stroke={color} strokeWidth="0.75" strokeLinecap="round" />
        <path d="M 70 179 C 81 170, 90 178, 79 191 C 72 185, 71 181, 70 179 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="0.95" />
        <path d="M 81 170 C 102 156, 118 148, 138 138" stroke={color} strokeWidth="0.75" strokeLinecap="round" />

        <path d="M 70 202 C 58 191, 48 201, 60 215 C 68 208, 69 204, 70 202 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="0.95" />
        <path d="M 58 191 C 34 176, 16 166, 0 156" stroke={color} strokeWidth="0.75" strokeLinecap="round" />
        <path d="M 73 210 C 85 200, 94 210, 82 224 C 75 217, 74 213, 73 210 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="0.95" />
        <path d="M 85 200 C 108 185, 126 176, 148 165" stroke={color} strokeWidth="0.75" strokeLinecap="round" />

        {/* ========================================================
            3. THIRD HARVEST STALK (Épi Moisson Droite)
           ======================================================== */}
        <path
          d="M 110 540 C 120 440, 150 310, 210 185"
          stroke="url(#wheatStemGrad)"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path d="M 210 185 C 224 168, 238 152, 255 140" stroke={color} strokeWidth="0.85" strokeLinecap="round" />
        <path d="M 210 185 C 205 166, 198 150, 188 136" stroke={color} strokeWidth="0.85" strokeLinecap="round" />

        <path d="M 206 195 C 218 184, 228 194, 212 208 C 203 201, 204 197, 206 195 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="0.95" />
        <path d="M 218 184 C 238 168, 252 158, 260 148" stroke={color} strokeWidth="0.75" strokeLinecap="round" />
        <path d="M 198 206 C 185 194, 178 204, 192 218 C 199 212, 200 208, 198 206 Z" fill="url(#wheatGrainGrad)" stroke={color} strokeWidth="0.95" />
        <path d="M 185 194 C 160 178, 142 168, 120 156" stroke={color} strokeWidth="0.75" strokeLinecap="round" />

        {/* ========================================================
            4. BOTANICAL LEAF RIBBONS AT BASE (Feuilles de blé)
           ======================================================== */}
        {/* Graceful left ribbon leaf */}
        <path
          d="M 95 360 C 50 330, 20 370, 0 420 C 35 390, 70 385, 95 395"
          fill="url(#wheatGrainGrad)"
          stroke={color}
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Graceful right ribbon leaf */}
        <path
          d="M 105 310 C 150 280, 190 310, 225 350 C 180 340, 140 330, 105 345"
          fill="url(#wheatGrainGrad)"
          stroke={color}
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
