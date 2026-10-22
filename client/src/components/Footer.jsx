import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Compass, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ marginTop: 'auto' }}>
      {/* 1. Sleek 4-Part Burgundy Contact & Location Strip matching Reference */}
      <div
        id="nous-trouver"
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
            gridTemplateColumns: '1fr 1fr 1fr 1.15fr',
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

          {/* Item 4: Stylized Map Thumbnail matching Reference */}
          <a
            href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'relative',
              display: 'block',
              overflow: 'hidden',
              backgroundColor: '#ECE2D2',
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(248, 243, 232, 0.3) 0%, rgba(239, 228, 209, 0.8) 100%),
                url("data:image/svg+xml,%3Csvg width='240' height='120' viewBox='0 0 240 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 Q 60 45, 120 30 T 240 50' stroke='%23D4C4A8' stroke-width='4' fill='none'/%3E%3Cpath d='M30 0 L 80 120' stroke='%23DDD0B8' stroke-width='3' fill='none'/%3E%3Cpath d='M100 0 L 160 120' stroke='%23DDD0B8' stroke-width='5' fill='none'/%3E%3Cpath d='M0 80 Q 90 70, 180 90 T 240 85' stroke='%23D4C4A8' stroke-width='3' fill='none'/%3E%3Cpath d='M190 0 L 220 120' stroke='%23DDD0B8' stroke-width='2' fill='none'/%3E%3C/svg%3E")
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              minHeight: '90px'
            }}
            title="Ouvrir 15 Rue Pasteur sur Google Maps"
          >
            {/* Center Burgundy Pin with Gold Wheat Ring */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -60%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: 'var(--color-burgundy)',
                  border: '2px solid var(--color-gold)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(56, 7, 14, 0.35)'
                }}
              >
                <MapPin size={16} color="#FFFFFF" />
              </div>
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '7px solid var(--color-burgundy)',
                  marginTop: '-2px'
                }}
              />
            </div>
          </a>
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

      {/* Responsive layout rules for the 4-part strip */}
      <style>{`
        @media (max-width: 992px) {
          .footer-contact-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-contact-grid > div,
          .footer-contact-grid > a {
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
        }
        @media (max-width: 600px) {
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
