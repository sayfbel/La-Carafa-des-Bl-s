import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ExternalLink, Lock } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ marginTop: 'auto' }}>
      {/* Reference Design Dark Burgundy Strip */}
      <div
        id="nous-trouver"
        style={{
          backgroundColor: 'var(--color-burgundy-dark)',
          color: 'var(--color-white)',
          padding: '2.5rem 0',
          borderTop: '2px solid var(--color-gold)'
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}
        >
          {/* Address Item */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
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
              <div style={{ fontWeight: 600, fontSize: '1.05rem', color: '#FFF' }}>15 Rue Pasteur</div>
              <div style={{ color: 'var(--color-cream)', fontSize: '0.9rem' }}>91360 Épinay-sur-Orge</div>
              <div style={{ color: 'var(--color-gold)', fontSize: '0.85rem' }}>France</div>
            </div>
          </div>

          {/* Phone Item */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
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
              <div style={{ fontWeight: 600, fontSize: '1.05rem', color: '#FFF' }}>07 53 79 29 19</div>
              <div style={{ color: '#D4AB65', fontSize: '0.85rem', fontStyle: 'italic' }}>(Non vérifié)</div>
            </div>
          </div>

          {/* Google Maps Link Item */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
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
              <ExternalLink size={22} />
            </div>
            <div>
              <a
                href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  color: '#FFF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px'
                }}
              >
                Ouvrir dans Google Maps →
              </a>
              <div style={{ color: 'var(--color-cream)', fontSize: '0.85rem' }}>Itinéraire direct</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal & Secondary Footer */}
      <div
        style={{
          backgroundColor: '#270409',
          color: '#A39689',
          padding: '1.5rem 0',
          fontSize: '0.85rem'
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
            © {new Date().getFullYear()} <strong>La Carafa des Blés</strong>. Tous droits réservés. Artisans boulangers-pâtissiers.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/mentions-legales" style={{ color: '#C8BEB5' }}>Mentions légales</Link>
            <Link to="/politique-de-confidentialite" style={{ color: '#C8BEB5' }}>Politique de confidentialité</Link>
            <Link to="/gestion-des-cookies" style={{ color: '#C8BEB5' }}>Gestion des cookies</Link>
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
              <Lock size={13} />
              <span>Espace Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
