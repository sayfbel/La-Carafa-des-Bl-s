import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Lock } from 'lucide-react';
import { WheatLogo } from './brand/WheatLogo';
import { WheatDecoration } from './brand/WheatDecoration';

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#4A0A14',
        color: '#F8F3E8',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '2px solid var(--color-gold)'
      }}
    >
      {/* Delicate Wheat Watermark in bottom right */}
      <WheatDecoration
        style={{ right: '-20px', bottom: '-40px', transform: 'rotate(-15deg)' }}
        opacity={0.15}
        width={180}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '4rem 1.5rem 3rem'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            alignItems: 'flex-start'
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand & Copyright */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <WheatLogo light={true} size="large" />
            <p style={{ fontSize: '0.82rem', color: '#D4AB65', margin: 0, opacity: 0.9 }}>
              Artisan Boulanger & Pâtissier
            </p>
            <div style={{ fontSize: '0.8rem', color: '#E8D3C4', marginTop: '0.5rem', opacity: 0.8 }}>
              © {new Date().getFullYear()} Tous droits réservés
            </div>
          </div>

          {/* Col 2: Liens Rapides */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '1.25rem'
              }}
            >
              Liens Rapides
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <Link to="/" style={{ color: '#F8F3E8', fontSize: '0.9rem', opacity: 0.9 }}>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/produits" style={{ color: '#F8F3E8', fontSize: '0.9rem', opacity: 0.9 }}>
                  Nos produits
                </Link>
              </li>
              <li>
                <Link to="/notre-histoire" style={{ color: '#F8F3E8', fontSize: '0.9rem', opacity: 0.9 }}>
                  Notre histoire
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: '#F8F3E8', fontSize: '0.9rem', opacity: 0.9 }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Nos Informations */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '1.25rem'
              }}
            >
              Nos Informations
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.86rem', color: '#F8F3E8' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem' }}>
                <MapPin size={16} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  15 Rue Pasteur<br />
                  91360 Épinay-sur-Orge
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Phone size={16} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span>07 53 79 29 19</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Mail size={16} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span>contact@carafa-des-bles.fr</span>
              </div>
              <div style={{ marginTop: '0.35rem' }}>
                <a
                  href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#D4AB65', fontSize: '0.82rem', textDecoration: 'underline' }}
                >
                  Ouvrir dans Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Horaires d'Ouverture */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '1.25rem'
              }}
            >
              Horaires d'Ouverture
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.86rem', color: '#F8F3E8' }}>
              <div>
                <strong>Lundi – Samedi :</strong> 6h30 – 19h30
              </div>
              <div>
                <strong>Dimanche :</strong> 6h30 – 13h00
              </div>
              <div style={{ fontSize: '0.76rem', color: '#D4AB65', fontStyle: 'italic', marginTop: '0.35rem' }}>
                (Les horaires seront confirmés par la boulangerie)
              </div>
            </div>
          </div>

          {/* Col 5: Suivez-nous */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '1.25rem'
              }}
            >
              Suivez-nous
            </h4>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F8F3E8',
                  transition: 'background-color var(--transition-fast)'
                }}
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F8F3E8',
                  transition: 'background-color var(--transition-fast)'
                }}
              >
                <Instagram size={18} />
              </a>
            </div>

            {/* Discreet Admin Login */}
            <Link
              to="/admin"
              style={{
                fontSize: '0.75rem',
                color: '#D4AB65',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                opacity: 0.8
              }}
            >
              <Lock size={12} />
              <span>Espace d'administration</span>
            </Link>
          </div>
        </div>

        {/* Legal Mentions Bottom Bar */}
        <div
          style={{
            marginTop: '3rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.78rem',
            color: '#E8D3C4',
            opacity: 0.8,
            gap: '1rem'
          }}
        >
          <div>
            La Carafa des Blés — Artisans boulangers-pâtissiers à Épinay-sur-Orge.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/mentions-legales" style={{ color: 'inherit' }}>Mentions légales</Link>
            <Link to="/politique-de-confidentialite" style={{ color: 'inherit' }}>Politique de confidentialité</Link>
            <Link to="/gestion-des-cookies" style={{ color: 'inherit' }}>Gestion des cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
