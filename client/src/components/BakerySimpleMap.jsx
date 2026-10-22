import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { MapPin, Navigation, Train, Clock, Phone, ExternalLink, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

import franceGeoData from '../data/france-regions.json';

// Exact coordinates for 15 Rue Pasteur, 91360 Épinay-sur-Orge
// In GeoJSON / react-simple-maps: [longitude, latitude]
const BAKERY_COORDS = [2.3295643, 48.668527];

export function BakerySimpleMap() {
  const [position, setPosition] = useState({ coordinates: [2.3295643, 48.668527], zoom: 4 });
  const [showTooltip, setShowTooltip] = useState(true);

  const handleZoomIn = () => {
    if (position.zoom >= 8) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.4 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.4 }));
  };

  const handleRecenter = () => {
    setPosition({ coordinates: [2.3295643, 48.668527], zoom: 4 });
    setShowTooltip(true);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 1.35fr) minmax(300px, 1fr)',
        gap: '2.5rem',
        alignItems: 'center',
        backgroundColor: '#FAF5EC',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-md)',
        padding: '2rem',
        position: 'relative'
      }}
      className="simple-map-container"
    >
      {/* 1. Vector Map via react-simple-maps */}
      <div
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          backgroundColor: '#F8F3E8',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'inset 0 2px 8px rgba(41, 34, 30, 0.04)',
          minHeight: '440px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Floating Map Controls */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem'
          }}
        >
          <button
            onClick={handleZoomIn}
            className="btn"
            style={{
              width: 36,
              height: 36,
              padding: 0,
              backgroundColor: '#FFFFFF',
              color: 'var(--color-burgundy)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-sm)'
            }}
            title="Zoomer"
            aria-label="Zoomer"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={handleZoomOut}
            className="btn"
            style={{
              width: 36,
              height: 36,
              padding: 0,
              backgroundColor: '#FFFFFF',
              color: 'var(--color-burgundy)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-sm)'
            }}
            title="Dézoomer"
            aria-label="Dézoomer"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={handleRecenter}
            className="btn"
            style={{
              width: 36,
              height: 36,
              padding: 0,
              backgroundColor: '#FFFFFF',
              color: 'var(--color-burgundy)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-sm)'
            }}
            title="Recentrer sur la boulangerie"
            aria-label="Recentrer"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Badge Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            zIndex: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            padding: '0.4rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)',
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'var(--color-burgundy)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          Île-de-France • Essonne (91)
        </div>

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 2600,
            center: [2.35, 46.8]
          }}
          width={700}
          height={520}
          style={{ width: '100%', height: '100%', outline: 'none' }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={({ coordinates, zoom }) => setPosition({ coordinates, zoom })}
          >
            <Geographies geography={franceGeoData}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isIDF = geo.properties?.code === '11' || geo.properties?.nom === 'Île-de-France';

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isIDF ? '#E5D5BD' : '#F5EBDD'}
                      stroke={isIDF ? '#B78A3D' : '#DFD4C2'}
                      strokeWidth={isIDF ? 1.6 : 0.75}
                      style={{
                        default: { outline: 'none', transition: 'fill 0.2s ease' },
                        hover: { fill: '#DECDB5', outline: 'none', cursor: 'pointer' },
                        pressed: { fill: '#D3C0A6', outline: 'none' }
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Marker for La Carafa des Blés at 15 Rue Pasteur, 91360 Épinay-sur-Orge */}
            <Marker
              coordinates={BAKERY_COORDS}
              onClick={() => setShowTooltip(prev => !prev)}
            >
              <g style={{ cursor: 'pointer' }}>
                {/* Pulsing ring */}
                <circle r={14} fill="rgba(183, 138, 61, 0.3)" className="simple-marker-pulse" />
                <circle r={8} fill="rgba(89, 11, 22, 0.4)" />
                {/* Main pin body */}
                <circle r={5} fill="#590B16" stroke="#B78A3D" strokeWidth={1.5} />
              </g>

              {/* Custom SVG Tooltip Label */}
              {showTooltip && (
                <g transform="translate(0, -22)">
                  <rect
                    x={-85}
                    y={-28}
                    width={170}
                    height={26}
                    rx={4}
                    fill="#590B16"
                    stroke="#B78A3D"
                    strokeWidth={1}
                  />
                  <text
                    textAnchor="middle"
                    y={-12}
                    fill="#FAF5EC"
                    fontSize={9.5}
                    fontWeight="600"
                    fontFamily="var(--font-sans)"
                    letterSpacing="0.04em"
                  >
                    La Carafa des Blés (Épinay)
                  </text>
                  <polygon points="0, -2 4, -7 -4, -7" fill="#590B16" />
                </g>
              )}
            </Marker>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* 2. Store Location Details Card */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <div
            style={{
              color: 'var(--color-gold)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}
          >
            Notre Adresse
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              color: 'var(--color-burgundy)',
              margin: '0 0 0.5rem'
            }}
          >
            La Carafa des Blés
          </h3>
          <p style={{ fontSize: '1.02rem', color: 'var(--color-text-main)', margin: 0, lineHeight: 1.5 }}>
            15 Rue Pasteur<br />
            91360 Épinay-sur-Orge, France
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            padding: '1.25rem',
            backgroundColor: '#FFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem' }}>
            <Train size={18} color="var(--color-gold)" style={{ flexShrink: 0 }} />
            <span><strong>RER C</strong> : Gare d'Épinay-sur-Orge à 2 minutes à pied</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem' }}>
            <Clock size={18} color="var(--color-gold)" style={{ flexShrink: 0 }} />
            <span>Stationnement aisé dans la rue</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem' }}>
            <Phone size={18} color="var(--color-gold)" style={{ flexShrink: 0 }} />
            <span>07 53 79 29 19 <em style={{ fontSize: '0.8rem', color: '#D4AB65' }}>(Non vérifié)</em></span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <a
            href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              padding: '0.75rem 1.6rem',
              fontSize: '0.9rem',
              borderRadius: 'var(--radius-full)',
              flex: 1,
              minWidth: '180px'
            }}
          >
            <Navigation size={15} />
            <span>Itinéraire Google Maps</span>
          </a>

          <button
            onClick={handleRecenter}
            type="button"
            className="btn btn-outline"
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '0.9rem',
              borderRadius: 'var(--radius-full)',
              borderColor: 'var(--color-burgundy)'
            }}
          >
            <RotateCcw size={15} />
            <span>Recentrer</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulseMarker {
          0% { r: 10px; opacity: 0.8; }
          70% { r: 24px; opacity: 0; }
          100% { r: 26px; opacity: 0; }
        }
        .simple-marker-pulse {
          animation: pulseMarker 2.4s infinite cubic-bezier(0.25, 1, 0.5, 1);
        }
        @media (max-width: 900px) {
          .simple-map-container {
            grid-template-columns: 1fr !important;
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
