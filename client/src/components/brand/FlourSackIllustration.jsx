import React from 'react';

export function FlourSackIllustration({ width = 160 }) {
  return (
    <div style={{ width, display: 'flex', justifyContent: 'center' }} aria-hidden="true">
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', opacity: 0.65 }}
      >
        {/* Flour sack outline & hatching */}
        <path
          d="M60 140 C50 140 40 135 38 100 C36 75 42 60 55 50 C62 45 78 45 88 50 C100 55 106 75 104 100 C102 135 92 140 60 140 Z"
          stroke="#B78A3D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Tied top of sack with overflowing flour */}
        <path d="M50 50 C55 35 75 35 85 50" stroke="#B78A3D" strokeWidth="1.5" />
        <path d="M52 48 C60 40 76 40 84 48" fill="#F8F3E8" stroke="#B78A3D" strokeWidth="1" />
        {/* Wooden scoop resting beside sack */}
        <path
          d="M100 130 C120 125 145 110 160 95 C165 90 170 95 165 102 C150 120 125 138 102 140 Z"
          stroke="#B78A3D"
          strokeWidth="1.5"
          fill="#FAF5EC"
        />
        <path d="M155 100 L185 85" stroke="#B78A3D" strokeWidth="2.5" strokeLinecap="round" />
        {/* Stems of wheat sheaves */}
        <path d="M20 145 C40 140 70 145 120 148" stroke="#B78A3D" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M25 130 C45 135 65 138 85 139" stroke="#B78A3D" strokeWidth="1" />
      </svg>
    </div>
  );
}
