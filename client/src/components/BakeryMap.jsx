import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Train,
  Clock,
  Phone,
  Maximize2,
  Minimize2,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { getStoreLiveStatus } from '../utils/storeStatus';

export function BakeryMap({ settings = {} }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Compute live dynamic status (open/closed) based on time + admin override
  const status = getStoreLiveStatus(settings);

  // Google Maps official embed URL for 15 Rue Pasteur, 91360 Épinay-sur-Orge
  const googleMapsEmbedUrl =
    'https://maps.google.com/maps?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France&t=&z=16&ie=UTF8&iwloc=&output=embed';

  const googleMapsExternalUrl =
    'https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('15 Rue Pasteur, 91360 Épinay-sur-Orge, France').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  return (
    <div className="google-map-hub-root" style={{ isolation: 'isolate', position: 'relative', zIndex: 1 }}>
      <div className="google-map-grid">
        
        {/* COLUMN 1: Official Standard Google Maps with Architectural Header */}
        <div className={`google-map-frame ${isFullscreen ? 'map-fullscreen-mode' : ''}`}>
          
          {/* Map Top Bar */}
          <div className="google-map-topbar">
            <div className="topbar-location">
              <MapPin size={15} color="var(--color-gold)" style={{ flexShrink: 0 }} />
              <span className="topbar-address">15 Rue Pasteur · Épinay-sur-Orge</span>
              <span className="topbar-badge">Google Maps</span>
            </div>

            <div className="topbar-actions">
              <a
                href={googleMapsExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="topbar-btn"
                title="Ouvrir dans l'application Google Maps"
              >
                <ExternalLink size={13} />
                <span>Ouvrir dans l'App</span>
              </a>

              <button
                onClick={() => setIsFullscreen(prev => !prev)}
                type="button"
                className="topbar-btn"
                title={isFullscreen ? 'Quitter le mode agrandi' : 'Agrandir la carte'}
              >
                {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                <span>{isFullscreen ? 'Réduire' : 'Plein écran'}</span>
              </button>
            </div>
          </div>

          {/* Standard Official Google Maps Iframe */}
          <div className="google-map-viewport">
            <iframe
              title="Localisation Google Maps — La Carafa des Blés à Épinay-sur-Orge"
              src={googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: isFullscreen ? '100%' : '480px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Bottom Bar: Live Transport Notice */}
          <div className="google-map-footer-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Train size={14} color="var(--color-gold)" />
              <span>Gare RER C Épinay-sur-Orge à 200m</span>
            </div>
            <a
              href={googleMapsExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-gold-light)', textDecoration: 'underline', fontSize: '0.74rem' }}
            >
              Calculer l'itinéraire →
            </a>
          </div>
        </div>

        {/* COLUMN 2: Fournil Visitor Panel with Dynamic Live Status & Horaires */}
        <div className="visitor-panel">
          
          {/* Header & Dynamic Real-Time Status Badge */}
          <div className="visitor-header">
            <div className={`status-chip ${status.chipVariant}`}>
              <span className="status-dot"></span>
              <span className="status-main-text">{status.badgeText}</span>
            </div>
            <p className="status-sub-text">{status.subtext}</p>

            <h3 className="visitor-title">Votre Fournil Artisanal</h3>
            <p className="visitor-lead">
              Pains de tradition française cuits sur sole tout au long du jour, viennoiseries pur beurre faites maison et pâtisseries du chef boulanger.
            </p>
          </div>

          {/* Schedule / Horaires du Fournil */}
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

          {/* Practical Mobility Cards */}
          <div className="mobility-grid">
            <div className="mobility-card">
              <Train size={18} className="mobility-icon" />
              <div>
                <div className="mobility-card-title">RER C — Gare d'Épinay</div>
                <div className="mobility-card-desc">À 2 min à pied (180 mètres) via la sortie Rue Pasteur.</div>
              </div>
            </div>

            <div className="mobility-card">
              <MapPin size={18} className="mobility-icon" />
              <div>
                <div className="mobility-card-title">Stationnement Gratuit</div>
                <div className="mobility-card-desc">Places gratuites et dépose-minute devant la boutique.</div>
              </div>
            </div>
          </div>

          {/* Action Row: Direct GPS Navigation, Phone & Copy Address */}
          <div className="action-buttons-row">
            <a
              href={googleMapsExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn-primary"
            >
              <Navigation size={16} />
              <span>Lancer le GPS (Google Maps)</span>
            </a>

            <a
              href="tel:0753792919"
              className="action-btn-secondary"
            >
              <Phone size={15} />
              <span>07 53 79 29 19</span>
            </a>

            <button
              onClick={handleCopyAddress}
              type="button"
              className="action-btn-copy"
              title="Copier l'adresse exacte"
            >
              {copied ? <Check size={15} color="#166534" /> : <Copy size={15} />}
              <span>{copied ? 'Copié !' : 'Copier'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Scoped CSS for Google Map Hub */}
      <style>{`
        .google-map-hub-root {
          width: 100%;
        }

        .google-map-grid {
          display: grid;
          grid-template-columns: minmax(320px, 1.3fr) minmax(320px, 1fr);
          gap: 3.5rem;
          align-items: stretch;
        }

        /* Map Container Frame */
        .google-map-frame {
          position: relative;
          background-color: #FAF5EA;
          border: 1px solid rgba(183, 138, 61, 0.35);
          box-shadow: 0 20px 45px -10px rgba(56, 7, 14, 0.12);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-height: 520px;
        }

        .google-map-frame.map-fullscreen-mode {
          position: fixed !important;
          inset: 4rem 2rem 2rem 2rem !important;
          z-index: 9999 !important;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5) !important;
        }

        /* Top Bar */
        .google-map-topbar {
          background-color: rgba(42, 6, 11, 0.95);
          color: #FFFFFF;
          padding: 0.65rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(212, 171, 101, 0.35);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .topbar-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .topbar-badge {
          background-color: rgba(212, 171, 101, 0.25);
          color: var(--color-gold-light);
          border: 1px solid var(--color-gold);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.15rem 0.45rem;
          text-transform: uppercase;
        }

        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .topbar-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
          border: 1px solid rgba(212, 171, 101, 0.3);
          padding: 0.3rem 0.65rem;
          font-size: 0.74rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .topbar-btn:hover {
          background-color: var(--color-burgundy-hover);
          border-color: var(--color-gold);
          color: var(--color-gold-light);
        }

        /* Map Viewport */
        .google-map-viewport {
          flex: 1;
          width: 100%;
          min-height: 440px;
          position: relative;
        }

        .google-map-footer-bar {
          background-color: rgba(42, 6, 11, 0.92);
          color: #FFFFFF;
          padding: 0.55rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.76rem;
          border-top: 1px solid rgba(212, 171, 101, 0.25);
        }

        /* Column 2: Visitor Panel */
        .visitor-panel {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.6rem;
        }

        .visitor-header {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        /* Dynamic Status Chip */
        .status-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.35rem 0.8rem;
          width: fit-content;
        }

        .status-chip.open {
          color: #065F46;
          background-color: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .status-chip.closed {
          color: #991B1B;
          background-color: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .status-chip.open .status-dot {
          background-color: #10B981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.35);
        }

        .status-chip.closed .status-dot {
          background-color: #EF4444;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.35);
        }

        .status-sub-text {
          font-size: 0.8rem;
          color: #8C7B70;
          margin: 0;
          font-style: italic;
        }

        .visitor-title {
          font-family: var(--font-serif);
          font-size: 2.1rem;
          color: var(--color-burgundy);
          line-height: 1.15;
          margin: 0.25rem 0 0;
        }

        .visitor-lead {
          font-size: 0.95rem;
          color: #63554D;
          line-height: 1.6;
          margin: 0;
        }

        /* Horaires Block */
        .horaires-block {
          background-color: #FFFFFF;
          border: 1px solid rgba(183, 138, 61, 0.28);
          padding: 1.3rem 1.5rem;
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
          margin-bottom: 0.9rem;
        }

        .schedule-rows {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
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

        .schedule-row.highlight .day-name,
        .schedule-row.highlight .day-hours {
          font-weight: 700;
          color: var(--color-burgundy);
        }

        .schedule-row.closed .day-hours {
          color: #8C7B70;
          font-style: italic;
        }

        /* Mobility Grid */
        .mobility-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.1rem;
        }

        .mobility-card {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          padding: 0.9rem 1rem;
          background-color: #FFFFFF;
          border: 1px solid rgba(183, 138, 61, 0.22);
        }

        .mobility-icon {
          color: var(--color-gold);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .mobility-card-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-burgundy);
          margin-bottom: 0.2rem;
        }

        .mobility-card-desc {
          font-size: 0.78rem;
          color: #63554D;
          line-height: 1.45;
        }

        /* Action Buttons Row */
        .action-buttons-row {
          display: flex;
          gap: 0.75rem;
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
          .google-map-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .mobility-grid {
            grid-template-columns: 1fr;
          }
          .google-map-viewport iframe {
            min-height: 380px !important;
          }
        }
      `}</style>
    </div>
  );
}
