import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Train, Clock, ArrowRight, RotateCcw } from 'lucide-react';

export function BakeryMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Exact coordinates of 15 Rue Pasteur, 91360 Épinay-sur-Orge, France
  const BAKERY_COORDS = [48.668527, 2.3295643];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Prevent double initialization
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: BAKERY_COORDS,
      zoom: 16,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // OpenStreetMap official tiles (completely free, no API key required, no watermark)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Zoom Controls at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Custom DivIcon for Bakery Marker matching reference
    const customIcon = L.divIcon({
      className: 'custom-bakery-pin',
      html: `
        <div class="pin-marker-body">
          <svg width="18" height="22" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2v28" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 4C9 4 8 7 12 10C16 7 15 4 12 4Z" fill="#B78A3D"/>
            <path d="M12 10C8 10 7 14 12 17C17 14 16 10 12 10Z" fill="#B78A3D"/>
            <path d="M12 17C7 17 6 21 12 24C18 21 17 17 12 17Z" fill="#B78A3D"/>
          </svg>
        </div>
        <div class="pin-tip"></div>
      `,
      iconSize: [36, 46],
      iconAnchor: [18, 46],
      popupAnchor: [0, -48]
    });

    // Custom Popup Content
    const popupContent = `
      <div class="bakery-popup">
        <div class="popup-kicker">ARTISAN BOULANGER • PÂTISSIER</div>
        <h4 class="popup-title">La Carafa des Blés</h4>
        <p class="popup-address">15 Rue Pasteur, 91360 Épinay-sur-Orge</p>
        <a href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France" target="_blank" rel="noopener noreferrer" class="popup-link">
          Ouvrir dans Google Maps →
        </a>
      </div>
    `;

    const marker = L.marker(BAKERY_COORDS, { icon: customIcon }).addTo(map);
    marker.bindPopup(popupContent, {
      className: 'custom-leaflet-popup',
      closeButton: false
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(BAKERY_COORDS, 16, { duration: 1 });
    }
  };

  return (
    <div className="bakery-map-block" style={{ width: '100%' }}>
      {/* 1. Interactive Map Viewport */}
      <div
        style={{
          width: '100%',
          height: '240px',
          borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
          borderBottom: 'none',
          position: 'relative'
        }}
      >
        <div
          ref={mapContainerRef}
          style={{ width: '100%', height: '100%', backgroundColor: '#FAF5EC' }}
          className="custom-styled-leaflet"
        />
      </div>

      {/* 2. Side-by-Side Dual Info Cards matching Reference */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          backgroundColor: '#FAF5EC',
          border: '1px solid var(--color-border)',
          borderRadius: '0 0 var(--radius-md) var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden'
        }}
        className="map-dual-cards"
      >
        {/* Left Card: NOTRE EMPLACEMENT */}
        <div
          style={{
            padding: '1.25rem 1.4rem',
            borderRight: '1px solid var(--color-border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--color-gold)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem'
              }}
            >
              <MapPin size={13} />
              <span>Notre Emplacement</span>
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.2rem',
                fontWeight: 600,
                color: 'var(--color-burgundy)',
                margin: '0 0 0.35rem'
              }}
            >
              La Carafa des Blés
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', margin: '0 0 1rem', lineHeight: 1.4 }}>
              15 Rue Pasteur<br />91360 Épinay-sur-Orge
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <a
              href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.78rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Navigation size={12} />
              <span>Itinéraire</span>
            </a>
            <button
              onClick={handleRecenter}
              type="button"
              className="btn btn-outline"
              style={{
                padding: '0.45rem 0.75rem',
                fontSize: '0.78rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'transparent',
                borderColor: 'var(--color-border)'
              }}
              title="Recentrer la carte"
            >
              <RotateCcw size={12} />
              <span>Recentrer</span>
            </button>
          </div>
        </div>

        {/* Right Card: ACCÈS */}
        <div
          style={{
            padding: '1.25rem 1.4rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#FAF5EC'
          }}
        >
          <div>
            <div
              style={{
                color: 'var(--color-gold)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '0.65rem'
              }}
            >
              Accès
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--color-text-main)', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Train size={14} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span>RER C (Gare d'Épinay-sur-Orge) à 2 min à pied</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Clock size={14} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span>Stationnement aisé dans la rue</span>
              </div>
            </div>
          </div>

          {/* Google Maps External Link */}
          <a
            href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--color-burgundy)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            <span>Ouvrir dans Google Maps</span>
            <ArrowRight size={13} />
          </a>
        </div>
      </div>

      {/* Embedded CSS for Custom Leaflet Theme and Marker */}
      <style>{`
        /* Warm Ivory/Parchment filter for Leaflet tiles */
        .custom-styled-leaflet .leaflet-tile {
          filter: sepia(0.35) saturate(0.85) hue-rotate(-12deg) contrast(1.04) brightness(0.99);
        }

        /* Marker Styles */
        .custom-bakery-pin {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pin-marker-body {
          width: 36px;
          height: 36px;
          background-color: var(--color-burgundy);
          border: 2px solid var(--color-gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(89, 11, 22, 0.4);
          z-index: 2;
        }

        .pin-tip {
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid var(--color-burgundy);
          margin-top: -2px;
          z-index: 1;
        }

        /* Custom Leaflet Popup */
        .custom-leaflet-popup .leaflet-popup-content-wrapper {
          background-color: #FAF5EC !important;
          border: 1px solid var(--color-border) !important;
          border-radius: var(--radius-sm) !important;
          box-shadow: 0 8px 20px rgba(56, 7, 14, 0.18) !important;
          padding: 0 !important;
        }

        .custom-leaflet-popup .leaflet-popup-tip {
          background-color: #FAF5EC !important;
          border: 1px solid var(--color-border) !important;
        }

        .bakery-popup {
          padding: 0.9rem 1.1rem;
          min-width: 200px;
          font-family: var(--font-sans);
        }

        .popup-kicker {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--color-gold);
          letter-spacing: 0.1em;
          margin-bottom: 0.2rem;
        }

        .popup-title {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: var(--color-burgundy);
          margin: 0 0 0.25rem 0;
        }

        .popup-address {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          margin: 0 0 0.5rem 0;
          line-height: 1.35;
        }

        .popup-link {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-burgundy);
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .map-dual-cards {
            grid-template-columns: 1fr !important;
          }
          .map-dual-cards > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid var(--color-border-subtle) !important;
          }
        }
      `}</style>
    </div>
  );
}
