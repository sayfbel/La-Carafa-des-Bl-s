import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Compass, Lock, ArrowRight, Wheat, Clock, Award } from 'lucide-react';
import { WheatLogo } from './brand/WheatLogo';
import { WheatEarWatermark } from './brand/WheatEarWatermark';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ marginTop: 'auto', backgroundColor: '#240408', color: '#F8F3E8', position: 'relative', overflow: 'hidden' }}>
      {/* Background Watermark Accent */}
      <WheatEarWatermark
        size={380}
        opacity={0.04}
        color="var(--color-gold)"
        style={{ bottom: '-60px', right: '-40px', transform: 'rotate(12deg)', pointerEvents: 'none' }}
      />

      {/* 1. Monumental Brand Header Banner */}
      <div style={{ backgroundColor: '#1A0205', padding: '3.5rem 0 3rem' }}>
        <div className="container">
          <div className="footer-monument-row">
            <div>
              <div className="footer-brand-monument">
                LA CARAFA DES BLÉS
              </div>
              <p className="footer-brand-tagline">
                Maison Artisanale Fondée sur la Tradition • Fournil d’Épinay-sur-Orge
              </p>
            </div>
            <div className="footer-monument-action">
              <a
                href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-cta-btn"
              >
                <Compass size={16} />
                <span>Ouvrir dans Google Maps</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Four-Column Architectural Grid */}
      <div style={{ padding: '4.5rem 0 3.5rem' }}>
        <div className="container">
          <div className="footer-columns-grid">
            {/* Col 1: L'Artisanat & Engagements */}
            <div className="footer-col">
              <div style={{ marginBottom: '1.25rem' }}>
                <WheatLogo size="medium" />
              </div>
              <p className="footer-col-text">
                Artisans boulangers et pâtissiers passionnés à Épinay-sur-Orge. Nous pétrissons chaque jour avec des farines françaises sélectionnées, un levain naturel vivant et un respect absolu du temps de fermentation.
              </p>
              <div className="footer-engagements">
                <div className="engagement-item">
                  <Award size={15} color="var(--color-gold)" />
                  <span>Farines Label Rouge & CRC</span>
                </div>
                <div className="engagement-item">
                  <Clock size={15} color="var(--color-gold)" />
                  <span>Fermentation longue 24h</span>
                </div>
                <div className="engagement-item">
                  <Wheat size={15} color="var(--color-gold)" />
                  <span>Viennoiserie 100% pur beurre AOP</span>
                </div>
              </div>
            </div>

            {/* Col 2: Horaires du Fournil */}
            <div className="footer-col">
              <div className="footer-col-title">Horaires du Fournil</div>
              <div className="hours-table">
                <div className="hours-row">
                  <span className="hours-day">Mardi – Vendredi</span>
                  <span className="hours-time">06h30 – 19h30</span>
                </div>
                <div className="hours-row">
                  <span className="hours-day">Samedi</span>
                  <span className="hours-time">07h00 – 19h30</span>
                </div>
                <div className="hours-row">
                  <span className="hours-day">Dimanche</span>
                  <span className="hours-time">07h00 – 13h00</span>
                </div>
                <div className="hours-row closed">
                  <span className="hours-day">Lundi</span>
                  <span className="hours-time">Fermé (Repos de l’artisan)</span>
                </div>
              </div>
              <p className="hours-note">
                Fournées fraîches et baguettes chaudes dès 06h30 le matin.
              </p>
            </div>

            {/* Col 3: Adresse & Contact Direct */}
            <div className="footer-col">
              <div className="footer-col-title">Nous Trouver</div>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <MapPin size={18} color="var(--color-gold)" className="contact-icon" />
                  <div>
                    <div style={{ fontWeight: 600, color: '#FFFFFF' }}>15 Rue Pasteur</div>
                    <div style={{ color: '#D4C4B5', fontSize: '0.9rem' }}>91360 Épinay-sur-Orge</div>
                    <div style={{ color: 'var(--color-gold)', fontSize: '0.8rem', marginTop: '2px' }}>
                      Essonne • Île-de-France
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <Phone size={18} color="var(--color-gold)" className="contact-icon" />
                  <div>
                    <a href="tel:0753792919" style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '1.02rem', textDecoration: 'none' }}>
                      07 53 79 29 19
                    </a>
                    <div style={{ color: 'var(--color-gold-light)', fontSize: '0.78rem', fontStyle: 'italic' }}>
                      Commandes & réservations par téléphone
                    </div>
                  </div>
                </div>

                <div className="transit-note">
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>Accès :</span> À 2 minutes à pied de la gare RER C d’Épinay-sur-Orge.
                </div>
              </div>
            </div>

            {/* Col 4: Carte & Spécialités */}
            <div className="footer-col">
              <div className="footer-col-title">La Carte Gourmande</div>
              <ul className="footer-links-list">
                <li>
                  <Link to="/produits?category=pains-de-tradition">
                    <span>Pains au Levain & Traditions</span>
                  </Link>
                </li>
                <li>
                  <Link to="/produits?category=viennoiseries">
                    <span>Viennoiseries Pur Beurre</span>
                  </Link>
                </li>
                <li>
                  <Link to="/produits?category=patisseries-maison">
                    <span>Pâtisseries Fines Maison</span>
                  </Link>
                </li>
                <li>
                  <Link to="/produits?category=snacking-sale">
                    <span>Snacking Frais & Déjeuner</span>
                  </Link>
                </li>
                <li>
                  <Link to="/notre-histoire">
                    <span>Notre Histoire & Savoir-Faire</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <span>Venir Nous Rencontrer</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Administration Bar */}
      <div style={{ backgroundColor: '#130103', color: '#8A7A70', padding: '1.5rem 0', fontSize: '0.82rem' }}>
        <div className="container">
          <div className="footer-bottom-flex">
            <div>
              © {currentYear} <strong>La Carafa des Blés</strong>. Tous droits réservés. Boulangerie artisanale indépendante.
            </div>

            <div className="footer-legal-links">
              <Link to="/mentions-legales" className="legal-link">
                Mentions légales
              </Link>
              <Link to="/politique-de-confidentialite" className="legal-link">
                Politique de confidentialité
              </Link>
              <Link to="/gestion-des-cookies" className="legal-link">
                Gestion des cookies
              </Link>
              <Link to="/admin" className="admin-link">
                <Lock size={12} />
                <span>Espace Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Pure CSS Stylesheet */}
      <style>{`
        .footer-monument-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .footer-brand-tagline {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          color: var(--color-gold-light);
          margin: 0.5rem 0 0;
          letter-spacing: 0.04em;
        }

        .footer-brand-monument {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #FFFFFF;
          line-height: 1;
        }

        .footer-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background-color: var(--color-burgundy);
          color: #FFFFFF;
          padding: 0.85rem 1.6rem;
          font-size: 0.86rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-decoration: none;
          border-radius: 0;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .footer-cta-btn:hover {
          background-color: var(--color-gold);
          color: var(--color-burgundy-dark);
          transform: translateY(-2px);
        }

        .footer-columns-grid {
          display: grid;
          grid-template-columns: 1.3fr 1.1fr 1.1fr 1fr;
          gap: 3.5rem;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
        }

        .footer-col-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: var(--color-gold);
          margin-bottom: 1.4rem;
          letter-spacing: 0.02em;
          font-weight: 600;
        }

        .footer-col-text {
          font-size: 0.9rem;
          line-height: 1.7;
          color: #D6C8BA;
          margin-bottom: 1.4rem;
        }

        .footer-engagements {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .engagement-item {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.82rem;
          color: #E6D7C7;
        }

        .hours-table {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1rem;
        }

        .hours-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.86rem;
          padding: 0.35rem 0;
          background: rgba(255, 255, 255, 0.03);
          padding-left: 0.6rem;
          padding-right: 0.6rem;
        }

        .hours-row.closed {
          color: #E09898;
          background: rgba(183, 28, 28, 0.12);
        }

        .hours-day {
          font-weight: 600;
          color: #FAF5EA;
        }

        .hours-row.closed .hours-day {
          color: #F87171;
        }

        .hours-time {
          color: #E2D4C4;
        }

        .hours-note {
          font-size: 0.8rem;
          color: var(--color-gold-light);
          line-height: 1.5;
          margin: 0;
          font-style: italic;
        }

        .contact-info-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .contact-info-item {
          display: flex;
          gap: 0.85rem;
          align-items: flex-start;
        }

        .contact-icon {
          flex-shrink: 0;
          margin-top: 3px;
        }

        .transit-note {
          font-size: 0.82rem;
          color: #C2B3A4;
          line-height: 1.5;
          background-color: rgba(255, 255, 255, 0.04);
          padding: 0.6rem 0.8rem;
        }

        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links-list a {
          color: #D6C8BA;
          font-size: 0.88rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .footer-links-list a:hover {
          color: var(--color-gold);
          transform: translateX(4px);
        }

        .footer-bottom-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .footer-legal-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .legal-link {
          color: #A89B90;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .legal-link:hover {
          color: #FFFFFF;
        }

        .admin-link {
          color: var(--color-gold);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .admin-link:hover {
          color: #FFFFFF;
        }

        @media (max-width: 1024px) {
          .footer-columns-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.75rem;
          }
        }

        @media (max-width: 640px) {
          .footer-columns-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .footer-monument-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-cta-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
