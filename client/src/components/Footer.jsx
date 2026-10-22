import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Compass, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ marginTop: 'auto' }}>
      {/* 1. Sleek 3-Part Burgundy Contact Strip (No Map in Footer) */}
      <div
        style={{
          backgroundColor: '#4A0A14',
          color: '#F8F3E8',
          borderTop: '2px solid var(--color-gold)',
          position: 'relative'
        }}
      >
        <div
          className="container footer-contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            alignItems: 'stretch',
            padding: 0
          }}
        >
          {/* Item 1: Address */}
          <div
            style={{
              padding: '2.2rem 1.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.1rem',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: 'rgba(183, 138, 61, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold)',
                flexShrink: 0
              }}
            >
              <MapPin size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.02rem', color: '#FFFFFF', marginBottom: '2px' }}>
                15 Rue Pasteur
              </div>
              <div style={{ color: 'var(--color-cream)', fontSize: '0.88rem' }}>
                91360 Épinay-sur-Orge
              </div>
              <div style={{ color: 'var(--color-gold)', fontSize: '0.82rem', marginTop: '1px' }}>
                France
              </div>
            </div>
          </div>

          {/* Item 2: Phone */}
          <div
            style={{
              padding: '2.2rem 1.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.1rem',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: 'rgba(183, 138, 61, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold)',
                flexShrink: 0
              }}
            >
              <Phone size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '3px' }}>
                07 53 79 29 19
              </div>
              <div style={{ color: '#D4AB65', fontSize: '0.82rem', fontStyle: 'italic' }}>
                (Non vérifié)
              </div>
            </div>
          </div>

          {/* Item 3: Google Maps Link */}
          <div
            style={{
              padding: '2.2rem 1.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.1rem'
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: 'rgba(183, 138, 61, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold)',
                flexShrink: 0
              }}
            >
              <Compass size={22} />
            </div>
            <div>
              <a
                href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                <div style={{ color: 'var(--color-cream)', fontSize: '0.86rem', marginBottom: '2px' }}>
                  Ouvrir dans
                </div>
                <div style={{ fontWeight: 600, fontSize: '1rem', color: '#FFFFFF' }}>
                  Google Maps →
                </div>
                <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
                  Ouvrir dans Google Maps
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Legal Mentions & Administration Bottom Bar */}
      <div
        style={{
          backgroundColor: '#30050B',
          color: '#A39689',
          padding: '1.25rem 0',
          fontSize: '0.82rem'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div>
            © {new Date().getFullYear()} <strong>La Carafa des Blés</strong>. Tous droits réservés.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/mentions-legales" style={{ color: '#C8BEB5' }}>
              Mentions légales
            </Link>
            <Link to="/politique-de-confidentialite" style={{ color: '#C8BEB5' }}>
              Politique de confidentialité
            </Link>
            <Link to="/gestion-des-cookies" style={{ color: '#C8BEB5' }}>
              Gestion des cookies
            </Link>
            <Link
              to="/admin"
              style={{
                color: 'var(--color-gold)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontWeight: 600
              }}
            >
              <Lock size={12} />
              <span>Espace Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive layout rules */}
      <style>{`
        @media (max-width: 820px) {
          .footer-contact-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-contact-grid > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
        }
      `}</style>
    </footer>
  );
}
