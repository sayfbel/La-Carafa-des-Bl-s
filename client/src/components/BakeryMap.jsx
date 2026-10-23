import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Navigation,
  Train,
  Clock,
  Phone,
  Maximize2,
  Minimize2,
  Compass,
  RotateCcw,
  Check,
  Copy,
  Info,
  Calendar,
  Sparkles
} from 'lucide-react';

// Exact coordinates for 15 Rue Pasteur, 91360 Épinay-sur-Orge
const BAKERY_COORDS = [48.668527, 2.3295643];

export function BakeryMap() {
  const mapContainerRef = useRef(null);
  const mapWrapperRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [bearing, setBearing] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    // Prevent double initialization
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      // Initialize Leaflet Map
      const map = L.map(mapContainerRef.current, {
        center: BAKERY_COORDS,
        zoom: 16,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false
      });

      mapInstanceRef.current = map;

      // CartoDB Positron light tiles with warm project filter
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map);

      // Custom Airport-style Pin Marker matching flightcn screenshot
      const customPinIcon = L.divIcon({
        className: 'flight-airport-marker',
        html: `
          <div class="marker-wrapper">
            <div class="marker-label">
              <span class="marker-code">LA CARAFA</span>
              <span class="marker-sub">Fournil</span>
            </div>
            <div class="marker-pin-dot">
              <div class="marker-pulse-ring"></div>
              <div class="marker-core-dot"></div>
            </div>
          </div>
        `,
        iconSize: [120, 60],
        iconAnchor: [60, 50],
        popupAnchor: [0, -50]
      });

      const popupContent = `
        <div class="flight-popup">
          <div class="flight-popup-badge">MAISON ARTISANALE</div>
          <h4 class="flight-popup-title">La Carafa des Blés</h4>
          <p class="flight-popup-address">15 Rue Pasteur, 91360 Épinay-sur-Orge</p>
          <div class="flight-popup-meta">
            <span>🌾 100% Artisanal</span>
            <span>🚆 RER C (180m)</span>
          </div>
        </div>
      `;

      const marker = L.marker(BAKERY_COORDS, { icon: customPinIcon }).addTo(map);
      marker.bindPopup(popupContent, {
        className: 'flight-custom-popup',
        closeButton: false
      });

      // Invalidate size on load
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    } catch (err) {
      console.warn('Map initialization warning:', err.message);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(BAKERY_COORDS, 16, { duration: 1.2 });
    }
  };

  const handleRotate = () => {
    const nextBearing = (bearing + 90) % 360;
    setBearing(nextBearing);
    // Visual orientation feedback
  };

  const toggleFullscreen = () => {
    if (!mapWrapperRef.current) return;

    if (!isFullscreen) {
      if (mapWrapperRef.current.requestFullscreen) {
        mapWrapperRef.current.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }

    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 250);
  };

  const handleCopyAddress = () => {
    const text = '15 Rue Pasteur, 91360 Épinay-sur-Orge, France';
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  return (
    <div className="flightcn-location-hub">
      {/* 2-Column Dedicated Layout: Interactive Map on Left, Fournil Information on Right */}
      <div className="location-grid-layout">
        
        {/* COLUMN 1: The FlightAirport-Style Interactive Map */}
        <div
          ref={mapWrapperRef}
          className={`flight-map-container ${isFullscreen ? 'is-fullscreen' : ''}`}
        >
          {/* Top-Left Floating Controls Group (Direct flightcn style) */}
          <div className="flight-controls-group">
            <button
              onClick={toggleFullscreen}
              type="button"
              className="flight-ctrl-btn"
              title={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
              aria-label="Plein écran"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              onClick={handleRotate}
              type="button"
              className="flight-ctrl-btn"
              title="Orientation de la carte"
              aria-label="Orientation"
            >
              <Compass
                size={16}
                style={{
                  transform: `rotate(${bearing}deg)`,
                  transition: 'transform 0.3s ease'
                }}
              />
            </button>

            <button
              onClick={handleRecenter}
              type="button"
              className="flight-ctrl-btn"
              title="Recentrer sur le fournil"
              aria-label="Recentrer"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Bottom-Right Floating Info / Attribution Button */}
          <div className="flight-info-container">
            <button
              onClick={() => setShowInfo(prev => !prev)}
              type="button"
              className="flight-info-btn"
              title="Informations cartographiques"
              aria-label="Informations"
            >
              <Info size={14} />
            </button>
            {showInfo && (
              <div className="flight-info-popover">
                <p><strong>La Carafa des Blés</strong></p>
                <p>15 Rue Pasteur, 91360 Épinay-sur-Orge</p>
                <p style={{ fontSize: '0.72rem', opacity: 0.8, marginTop: '0.25rem' }}>
                  Données cartographiques © OpenStreetMap & CARTO
                </p>
              </div>
            )}
          </div>

          {/* Leaflet Map Target */}
          <div
            ref={mapContainerRef}
            className="flight-leaflet-viewport"
            style={{ width: '100%', height: '100%', minHeight: '480px' }}
          />
        </div>

        {/* COLUMN 2: Fournil Visitor Panel (Fresh, Functional, NOT 01/02/03) */}
        <div className="visitor-panel">
          
          {/* Header & Real-Time Status Badge */}
          <div className="visitor-header">
            <div className="status-live-chip">
              <span className="live-dot"></span>
              <span>Fournil Ouvert · Fournées du jour</span>
            </div>
            <h3 className="visitor-title">Votre Boulangerie de Quartier</h3>
            <p className="visitor-lead">
              Pains au levain naturel cuits sur sole, viennoiseries dorées maison et pâtisseries fraîches façonnées chaque matin à Épinay-sur-Orge.
            </p>
          </div>

          {/* Schedule / Horaires Card */}
          <div className="horaires-block">
            <div className="block-eyebrow">
              <Calendar size={14} color="var(--color-gold)" />
              <span>Horaires d'Ouverture du Fournil</span>
            </div>
            <div className="schedule-rows">
              <div className="schedule-row">
                <span className="day-name">Mardi au Vendredi</span>
                <span className="day-hours">06h30 — 19h30</span>
              </div>
              <div className="schedule-row highlight">
                <span className="day-name">Samedi</span>
                <span className="day-hours">07h00 — 19h30</span>
              </div>
              <div className="schedule-row">
                <span className="day-name">Dimanche</span>
                <span className="day-hours">07h00 — 13h00</span>
              </div>
              <div className="schedule-row closed">
                <span className="day-name">Lundi</span>
                <span className="day-hours">Fermeture hebdomadaire</span>
              </div>
            </div>
          </div>

          {/* Practical Access & Transport Highlights */}
          <div className="mobility-block">
            <div className="mobility-item">
              <Train size={18} className="mobility-icon" />
              <div>
                <div className="mobility-title">Accès RER C</div>
                <div className="mobility-desc">Gare d'Épinay-sur-Orge à 2 min à pied (180 mètres).</div>
              </div>
            </div>

            <div className="mobility-item">
              <MapPin size={18} className="mobility-icon" />
              <div>
                <div className="mobility-title">Stationnement Aisé</div>
                <div className="mobility-desc">Places gratuites et dépose-minute devant le 15 Rue Pasteur.</div>
              </div>
            </div>
          </div>

          {/* Action Row: GPS Navigation, Phone & Copy Address */}
          <div className="action-buttons-row">
            <a
              href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France"
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn-primary"
            >
              <Navigation size={16} />
              <span>Itinéraire Google Maps</span>
            </a>

            <a
              href="tel:0753792919"
              className="action-btn-secondary"
            >
              <Phone size={15} />
              <span>Appeler le Fournil</span>
            </a>

            <button
              onClick={handleCopyAddress}
              type="button"
              className="action-btn-copy"
              title="Copier l'adresse"
            >
              {copied ? <Check size={15} color="#166534" /> : <Copy size={15} />}
              <span>{copied ? 'Adresse copiée !' : 'Copier'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Scoped CSS for FlightAirport Map & Visitor Hub */}
      <style>{`
        .flightcn-location-hub {
          width: 100%;
          position: relative;
        }

        .location-grid-layout {
          display: grid;
          grid-template-columns: minmax(320px, 1.35fr) minmax(320px, 1fr);
          gap: 3.5rem;
          align-items: stretch;
        }

        /* 1. Map Container (FlightAirport-styled) */
        .flight-map-container {
          position: relative;
          background-color: #FAF5EC;
          border: 1px solid rgba(183, 138, 61, 0.35);
          box-shadow: 0 20px 45px -10px rgba(56, 7, 14, 0.12);
          overflow: hidden;
          min-height: 520px;
          display: flex;
        }

        .flight-map-container.is-fullscreen {
          position: fixed !important;
          inset: 0 !important;
          z-index: 99999 !important;
          width: 100vw !important;
          height: 100vh !important;
          border: none !important;
        }

        /* Leaflet Project Theming (Warm Ivory/Gold/Bordeaux Filter) */
        .flight-leaflet-viewport .leaflet-tile {
          filter: sepia(0.38) saturate(0.85) hue-rotate(-20deg) contrast(1.06) brightness(0.98);
        }

        /* Top-Left Floating Controls Group (flightcn exact style) */
        .flight-controls-group {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 0;
          background-color: #FFFFFF;
          border: 1px solid rgba(183, 138, 61, 0.35);
          box-shadow: 0 4px 14px rgba(41, 34, 30, 0.1);
        }

        .flight-ctrl-btn {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          border-right: 1px solid rgba(183, 138, 61, 0.2);
          color: var(--color-burgundy);
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .flight-ctrl-btn:last-child {
          border-right: none;
        }

        .flight-ctrl-btn:hover {
          background-color: #FAF5EA;
          color: var(--color-gold);
        }

        /* Bottom-Right Floating Info / Attribution */
        .flight-info-container {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          z-index: 999;
        }

        .flight-info-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #FFFFFF;
          border: 1px solid rgba(183, 138, 61, 0.35);
          color: var(--color-burgundy);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: all 0.2s ease;
        }

        .flight-info-btn:hover {
          background-color: var(--color-burgundy);
          color: #FFF;
        }

        .flight-info-popover {
          position: absolute;
          bottom: 34px;
          right: 0;
          background-color: #FFFFFF;
          border: 1px solid rgba(183, 138, 61, 0.35);
          box-shadow: 0 8px 24px rgba(41, 34, 30, 0.15);
          padding: 0.75rem 1rem;
          min-width: 220px;
          font-size: 0.78rem;
          color: var(--color-text-main);
          z-index: 1000;
        }

        /* FlightAirport Pin Marker */
        .flight-airport-marker {
          background: transparent;
          border: none;
        }

        .marker-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .marker-label {
          background-color: var(--color-burgundy);
          color: #FFFFFF;
          padding: 0.25rem 0.65rem;
          font-family: var(--font-sans);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          box-shadow: 0 4px 14px rgba(56, 7, 14, 0.35);
          border: 1px solid var(--color-gold);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          white-space: nowrap;
          margin-bottom: 6px;
        }

        .marker-code {
          color: #FFFFFF;
        }

        .marker-sub {
          color: var(--color-gold-light);
          font-size: 0.68rem;
          font-weight: 500;
        }

        .marker-pin-dot {
          position: relative;
          width: 14px;
          height: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .marker-core-dot {
          width: 10px;
          height: 10px;
          background-color: var(--color-burgundy);
          border: 2px solid var(--color-gold);
          border-radius: 50%;
          z-index: 2;
        }

        .marker-pulse-ring {
          position: absolute;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background-color: rgba(183, 138, 61, 0.4);
          animation: pulseRing 2.2s infinite cubic-bezier(0.2, 1, 0.4, 1);
          z-index: 1;
        }

        @keyframes pulseRing {
          0% { transform: scale(0.6); opacity: 0.9; }
          75% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        /* Custom Popup */
        .flight-custom-popup .leaflet-popup-content-wrapper {
          background-color: #FAF5EA !important;
          border: 1px solid rgba(183, 138, 61, 0.4) !important;
          box-shadow: 0 10px 30px rgba(56, 7, 14, 0.2) !important;
          border-radius: 0 !important;
          padding: 0 !important;
        }

        .flight-custom-popup .leaflet-popup-tip {
          background-color: #FAF5EA !important;
          border: 1px solid rgba(183, 138, 61, 0.4) !important;
        }

        .flight-popup {
          padding: 0.9rem 1.1rem;
          font-family: var(--font-sans);
        }

        .flight-popup-badge {
          color: var(--color-gold);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          margin-bottom: 0.25rem;
        }

        .flight-popup-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--color-burgundy);
          margin: 0 0 0.25rem;
        }

        .flight-popup-address {
          font-size: 0.82rem;
          color: #554840;
          margin: 0 0 0.5rem;
        }

        .flight-popup-meta {
          display: flex;
          gap: 0.75rem;
          font-size: 0.75rem;
          color: var(--color-burgundy);
          font-weight: 600;
        }

        /* 2. Column 2: Visitor Panel */
        .visitor-panel {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.75rem;
        }

        .visitor-header {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .status-live-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #065F46;
          background-color: rgba(16, 185, 129, 0.12);
          padding: 0.35rem 0.8rem;
          border: 1px solid rgba(16, 185, 129, 0.3);
          width: fit-content;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
        }

        .visitor-title {
          font-family: var(--font-serif);
          font-size: 2.1rem;
          color: var(--color-burgundy);
          line-height: 1.15;
          margin: 0;
        }

        .visitor-lead {
          font-size: 0.98rem;
          color: #63554D;
          line-height: 1.65;
          margin: 0;
        }

        /* Horaires Block */
        .horaires-block {
          background-color: #FFFFFF;
          border: 1px solid rgba(183, 138, 61, 0.28);
          padding: 1.4rem 1.6rem;
        }

        .block-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 1rem;
        }

        .schedule-rows {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .schedule-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.88rem;
          color: var(--color-text-main);
          padding-bottom: 0.45rem;
          border-bottom: 1px dashed rgba(183, 138, 61, 0.18);
        }

        .schedule-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .schedule-row.highlight .day-name {
          font-weight: 700;
          color: var(--color-burgundy);
        }

        .schedule-row.highlight .day-hours {
          font-weight: 700;
          color: var(--color-burgundy);
        }

        .schedule-row.closed .day-hours {
          color: #8C7B70;
          font-style: italic;
        }

        /* Mobility Block */
        .mobility-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .mobility-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          padding: 0.9rem 1.1rem;
          background-color: #FFFFFF;
          border: 1px solid rgba(183, 138, 61, 0.22);
        }

        .mobility-icon {
          color: var(--color-gold);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .mobility-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-burgundy);
          margin-bottom: 0.2rem;
        }

        .mobility-desc {
          font-size: 0.78rem;
          color: #63554D;
          line-height: 1.45;
        }

        /* Action Buttons Row */
        .action-buttons-row {
          display: flex;
          gap: 0.85rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .action-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background-color: var(--color-burgundy);
          color: #FFFFFF;
          padding: 0.75rem 1.4rem;
          font-size: 0.86rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          border: 1px solid var(--color-burgundy);
          transition: all 0.2s ease;
          text-decoration: none;
          flex: 1;
          justify-content: center;
          min-width: 190px;
        }

        .action-btn-primary:hover {
          background-color: var(--color-burgundy-hover);
          border-color: var(--color-gold);
          color: var(--color-gold-light);
        }

        .action-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: transparent;
          color: var(--color-burgundy);
          padding: 0.75rem 1.25rem;
          font-size: 0.86rem;
          font-weight: 600;
          border: 1px solid rgba(89, 11, 22, 0.35);
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .action-btn-secondary:hover {
          border-color: var(--color-burgundy);
          background-color: #FAF5EA;
        }

        .action-btn-copy {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: transparent;
          border: 1px solid rgba(183, 138, 61, 0.3);
          color: #63554D;
          padding: 0.75rem 1rem;
          font-size: 0.84rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn-copy:hover {
          border-color: var(--color-gold);
          color: var(--color-burgundy);
        }

        @media (max-width: 960px) {
          .location-grid-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .mobility-block {
            grid-template-columns: 1fr;
          }
          .flight-map-container {
            min-height: 400px;
          }
        }
      `}</style>
    </div>
  );
}
