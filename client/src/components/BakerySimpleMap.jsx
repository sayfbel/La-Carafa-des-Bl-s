import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { MapPin, Navigation, Train, Clock, Phone, ZoomIn, ZoomOut, RotateCcw, ArrowRight } from 'lucide-react';

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
        gridTemplateColumns: 'minmax(320px, 1.25fr) minmax(320px, 1fr)',
        gap: '4.5rem',
        alignItems: 'start'
      }}
      className="editorial-map-grid"
    >
      {/* 1. Architectural Map Presentation (Zero border-radius, museum-gallery matting frame) */}
      <div style={{ position: 'relative' }}>
        {/* Vintage Offset Fine Line Accent */}
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            right: '10px',
            bottom: '10px',
            border: '1px solid rgba(183, 138, 61, 0.45)',
            pointerEvents: 'none'
          }}
          aria-hidden="true"
        />

        {/* Main Map Viewport: Sharp clean corners, authentic look */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            boxShadow: '0 25px 50px -12px rgba(45, 4, 9, 0.18)',
            backgroundColor: '#FAF5EC',
            border: '1px solid rgba(183, 138, 61, 0.35)',
            minHeight: '440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Floating Map Controls - Sharp Minimalist Editorial Style */}
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}
          >
            <button
              onClick={handleZoomIn}
              className="map-control-btn"
              title="Zoomer sur la carte"
              aria-label="Zoomer"
            >
              <ZoomIn size={15} />
            </button>
            <button
              onClick={handleZoomOut}
              className="map-control-btn"
              title="Dézoomer"
              aria-label="Dézoomer"
            >
              <ZoomOut size={15} />
            </button>
            <button
              onClick={handleRecenter}
              className="map-control-btn"
              title="Recentrer sur Épinay-sur-Orge"
              aria-label="Recentrer"
            >
              <RotateCcw size={15} />
            </button>
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
                      x={-90}
                      y={-28}
                      width={180}
                      height={26}
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

          {/* Refined Brass Plate Atelier Label */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(42, 6, 11, 0.92)',
              backdropFilter: 'blur(6px)',
              padding: '0.65rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(212, 171, 101, 0.35)',
              zIndex: 10
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={14} color="var(--color-gold)" />
              <span
                style={{
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase'
                }}
              >
                15 Rue Pasteur · Épinay-sur-Orge
              </span>
            </div>
            <span
              style={{
                color: 'var(--color-gold-light)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic'
              }}
            >
              Essonne (91)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Access Tenets & Itinerary (Pure Editorial, Zero Box, Zero Radius) */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Column Eyebrow */}
        <div
          style={{
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(183, 138, 61, 0.35)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-burgundy)'
            }}
          >
            Guide d'Accès au Fournil
          </span>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '0.92rem',
              color: 'var(--color-gold)'
            }}
          >
            Au Cœur d’Épinay-sur-Orge
          </span>
        </div>

        {/* Item 01 */}
        <div className="savoir-pillar-item">
          <div className="pillar-numeral">01</div>
          <div className="pillar-body">
            <div className="pillar-badge">ADRESSE & LOCALISATION</div>
            <h3 className="pillar-title">15 Rue Pasteur, 91360 Épinay-sur-Orge</h3>
            <p className="pillar-desc">
              Implantée au cœur de la ville, à l'angle des rues commerçantes d'Épinay-sur-Orge. Le pain chaud et les viennoiseries sortent des fours tout au long de la journée.
            </p>
          </div>
        </div>

        {/* Item 02 */}
        <div className="savoir-pillar-item">
          <div className="pillar-numeral">02</div>
          <div className="pillar-body">
            <div className="pillar-badge">TRANSPORTS & DESSERTE</div>
            <h3 className="pillar-title">Gare RER C à 2 Minutes à Pied</h3>
            <p className="pillar-desc">
              Accès immédiat depuis la gare RER C d'Épinay-sur-Orge (200m). Stationnement gratuit et facile tout au long de la Rue Pasteur et sur les parkings attenants.
            </p>
          </div>
        </div>

        {/* Item 03 */}
        <div className="savoir-pillar-item" style={{ borderBottom: '1px solid rgba(183, 138, 61, 0.35)' }}>
          <div className="pillar-numeral">03</div>
          <div className="pillar-body">
            <div className="pillar-badge">LIGNE DIRECTE DU FOURNIL</div>
            <h3 className="pillar-title">07 53 79 29 19</h3>
            <p className="pillar-desc">
              Pour réserver vos créations pâtissières, grandes miches au levain ou passer une commande spéciale pour vos événements familiaux.
            </p>
          </div>
        </div>

        {/* Actions Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '2rem',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <a
            href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France"
            target="_blank"
            rel="noopener noreferrer"
            className="savoir-cta-link"
          >
            <Navigation size={15} style={{ color: 'var(--color-gold)' }} />
            <span>Itinéraire Google Maps</span>
            <ArrowRight size={16} className="cta-arrow" />
          </a>

          <button
            onClick={handleRecenter}
            type="button"
            className="savoir-cta-link"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)'
            }}
          >
            <RotateCcw size={14} style={{ color: 'var(--color-gold)' }} />
            <span>Recentrer la Carte</span>
          </button>
        </div>
      </div>

      <style>{`
        .map-control-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.95);
          color: var(--color-burgundy);
          border: 1px solid rgba(183, 138, 61, 0.45);
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 0;
        }
        .map-control-btn:hover {
          background-color: var(--color-burgundy);
          color: #FFF;
        }
        @keyframes pulseMarker {
          0% { r: 10px; opacity: 0.8; }
          70% { r: 24px; opacity: 0; }
          100% { r: 26px; opacity: 0; }
        }
        .simple-marker-pulse {
          animation: pulseMarker 2.4s infinite cubic-bezier(0.25, 1, 0.5, 1);
        }
        @media (max-width: 900px) {
          .editorial-map-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
