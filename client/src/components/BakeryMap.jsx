import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Train, Clock, ExternalLink } from 'lucide-react';

export function BakeryMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Exact coordinates of 15 Rue Pasteur, 91360 Épinay-sur-Orge
  const BAKERY_COORDS = [48.668527, 2.3295643];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Prevent double initialization
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Initialize Leaflet map with smooth scroll & zoom
    const map = L.map(mapContainerRef.current, {
      center: BAKERY_COORDS,
      zoom: 16,
      zoomControl: false,
      scrollWheelZoom: false
    });

    mapInstanceRef.current = map;

    // Custom Styled Tiles (CartoDB Positron with our French artisan CSS filter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Custom Zoom Control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Custom DivIcon for Bakery Marker
    const customIcon = L.divIcon({
      className: 'custom-bakery-pin',
      html: `
        <div class="pin-pulse-ring"></div>
        <div class="pin-marker-body">
          <svg width="20" height="24" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2v28" stroke="#B78A3D" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 4C9 4 8 7 12 10C16 7 15 4 12 4Z" fill="#B78A3D"/>
            <path d="M12 10C8 10 7 14 12 17C17 14 16 10 12 10Z" fill="#B78A3D"/>
            <path d="M12 17C7 17 6 21 12 24C18 21 17 17 12 17Z" fill="#B78A3D"/>
          </svg>
        </div>
        <div class="pin-tip"></div>
      `,
      iconSize: [44, 54],
      iconAnchor: [22, 54],
      popupAnchor: [0, -56]
    });

    // Custom Popup Content
    const popupContent = `
      <div class="bakery-popup">
        <div class="popup-kicker">ARTISAN BOULANGER • PÂTISSIER</div>
        <h3 class="popup-title">La Carafa des Blés</h3>
        <p class="popup-address">15 Rue Pasteur<br/>91360 Épinay-sur-Orge</p>
        <div class="popup-transit">
          <span>🚆 Gare RER C à 2 min à pied</span>
        </div>
        <a href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France" target="_blank" rel="noopener noreferrer" class="popup-link">
          Ouvrir dans Google Maps →
        </a>
      </div>
    `;

    // Add marker and open popup by default
    const marker = L.marker(BAKERY_COORDS, { icon: customIcon }).addTo(map);
    marker.bindPopup(popupContent, {
      className: 'custom-leaflet-popup',
      closeButton: false,
      autoClose: false
    }).openPopup();

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(BAKERY_COORDS, 16, { duration: 1.2 });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
      {/* Map Container */}
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '460px',
          backgroundColor: '#FAF5EC'
        }}
        className="custom-styled-leaflet"
      />

      {/* Floating Artisan Location Card */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          left: '1.25rem',
          zIndex: 400,
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(8px)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.5rem',
          border: '1px solid var(--color-border)',
          boxShadow: '0 8px 24px rgba(56, 7, 14, 0.12)',
          maxWidth: '320px'
        }}
        className="map-floating-card"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
          <MapPin size={14} />
          <span>Notre Emplacement</span>
        </div>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-burgundy)', margin: '0 0 0.4rem' }}>
          La Carafa des Blés
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: '0 0 0.85rem', lineHeight: 1.4 }}>
          15 Rue Pasteur, 91360 Épinay-sur-Orge
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--color-text-main)', marginBottom: '1rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Train size={14} color="var(--color-gold)" />
            <span>RER C (Gare d'Épinay-sur-Orge) à 200m</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={14} color="var(--color-gold)" />
            <span>Stationnement aisé dans la rue</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a
            href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem', flex: 1 }}
          >
            <Navigation size={13} />
            <span>Itinéraire</span>
          </a>
          <button
            onClick={handleRecenter}
            className="btn btn-outline"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
            title="Recentrer la carte"
          >
            <span>Recentrer</span>
          </button>
        </div>
      </div>

      {/* Embedded CSS for Map Theme & Custom Marker */}
      <style>{`
        /* Map Tiles Custom Filter matching Project Palette (Warm Ivory / Parchment) */
        .custom-styled-leaflet .leaflet-tile {
          filter: sepia(0.38) saturate(0.85) hue-rotate(-15deg) contrast(1.05) brightness(0.98);
        }

        /* Marker Styles */
        .custom-bakery-pin {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pin-marker-body {
          width: 44px;
          height: 44px;
          background-color: var(--color-burgundy);
          border: 2px solid var(--color-gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(89, 11, 22, 0.45);
          position: relative;
          z-index: 2;
        }

        .pin-tip {
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-top: 10px solid var(--color-burgundy);
          margin-top: -3px;
          position: relative;
          z-index: 1;
        }

        /* Pulsing gold glow */
        .pin-pulse-ring {
          position: absolute;
          width: 60px;
          height: 60px;
          top: -8px;
          left: -8px;
          border-radius: 50%;
          background: rgba(183, 138, 61, 0.35);
          animation: bakeryPulse 2.2s infinite cubic-bezier(0.25, 1, 0.5, 1);
          z-index: 0;
        }

        @keyframes bakeryPulse {
          0% {
            transform: scale(0.6);
            opacity: 0.9;
          }
          70% {
            transform: scale(1.6);
            opacity: 0;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        /* Leaflet Popup Custom Styling */
        .custom-leaflet-popup .leaflet-popup-content-wrapper {
          background-color: #FAF5EC !important;
          border: 1px solid var(--color-border) !important;
          border-radius: var(--radius-md) !important;
          box-shadow: 0 10px 30px rgba(56, 7, 14, 0.2) !important;
          padding: 0 !important;
        }

        .custom-leaflet-popup .leaflet-popup-tip {
          background-color: #FAF5EC !important;
          border: 1px solid var(--color-border) !important;
        }

        .bakery-popup {
          padding: 1.1rem 1.25rem;
          min-width: 220px;
          font-family: var(--font-sans);
        }

        .popup-kicker {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-gold);
          letter-spacing: 0.12em;
          margin-bottom: 0.2rem;
        }

        .popup-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--color-burgundy);
          margin: 0 0 0.3rem 0;
        }

        .popup-address {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
        }

        .popup-transit {
          font-size: 0.78rem;
          color: var(--color-text-main);
          margin-bottom: 0.75rem;
          padding-top: 0.4rem;
          border-top: 1px solid var(--color-border-subtle);
        }

        .popup-link {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-burgundy);
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .map-floating-card {
            position: static !important;
            max-width: 100% !important;
            border-radius: 0 !important;
            border-bottom: 1px solid var(--color-border) !important;
          }
        }
      `}</style>
    </div>
  );
}
