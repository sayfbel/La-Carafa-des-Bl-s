import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ExternalLink, Code2, Sparkles, Phone, Award, CheckCircle2, X } from 'lucide-react';
import signatureImg from '../assets/sighnator.png';

export function DeveloperCredits() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="dev-credits-section">
      <div className="container">
        <div className="dev-credits-card">
          {/* Subtle Ambient Glow */}
          <div className="dev-card-glow" />

          {/* Left Column: Developer Info & Craftsmanship */}
          <div className="dev-info-col">
            <div className="dev-badge">
              <span className="dev-badge-dot" />
              <Code2 size={13} color="var(--color-gold)" />
              <span>Conception & Ingénierie Web</span>
            </div>

            <h3 className="dev-name">
              Saif Belfaquir
            </h3>

            <p className="dev-title">
              Développeur Full Stack & UI/UX Designer
            </p>

            <p className="dev-bio">
              Architecture sur-mesure, design d’exception et expérience fluide conçus pour sublimer la tradition artisanale de <em>La Carafa des Blés</em>.
            </p>

            {/* Tech Badges */}
            <div className="dev-tags">
              <span className="dev-tag">React</span>
              <span className="dev-tag">Node.js</span>
              <span className="dev-tag">UI/UX Mobile First</span>
              <span className="dev-tag">Performance & SEO</span>
              <span className="dev-tag">Sécurité Bcrypt/JWT</span>
            </div>
          </div>

          {/* Center Column: Official Artisan Signature */}
          <div className="dev-signature-col">
            <div className="dev-signature-frame">
              <div className="dev-signature-badge">
                <Sparkles size={12} color="var(--color-gold)" />
                <span>Signature de l’Artisan</span>
              </div>
              <img
                src={signatureImg}
                alt="Signature de Saif Belfaquir"
                className="dev-signature-img"
              />
              <div className="dev-signature-caption">
                Garantie de fabrication numérique &amp; sur-mesure
              </div>
            </div>
          </div>

          {/* Right Column: Social Links & Contact */}
          <div className="dev-actions-col">
            <div className="dev-actions-title">Entrer en Contact</div>

            <div className="dev-links-grid">
              <a
                href="https://github.com/sayfbel"
                target="_blank"
                rel="noopener noreferrer"
                className="dev-btn dev-btn-github"
                title="Consulter le profil GitHub de Saif Belfaquir"
              >
                <Github size={16} />
                <span>GitHub</span>
                <ExternalLink size={12} className="dev-btn-ext" />
              </a>

              <a
                href="https://www.linkedin.com/in/saif-belfaquir-90b044241/"
                target="_blank"
                rel="noopener noreferrer"
                className="dev-btn dev-btn-linkedin"
                title="Consulter le profil LinkedIn de Saif Belfaquir"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
                <ExternalLink size={12} className="dev-btn-ext" />
              </a>

              <a
                href="mailto:saifbelfaquir@gmail.com"
                className="dev-btn dev-btn-mail"
                title="Envoyer un email à Saif Belfaquir"
              >
                <Mail size={16} />
                <span>Email</span>
                <ExternalLink size={12} className="dev-btn-ext" />
              </a>

              <a
                href="https://wa.me/212649157151"
                target="_blank"
                rel="noopener noreferrer"
                className="dev-btn dev-btn-phone"
                title="Contacter Saif Belfaquir via WhatsApp"
              >
                <Phone size={16} />
                <span>+212 649 157 151</span>
              </a>
            </div>

            <div className="dev-extra-actions">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="dev-btn-profile"
              >
                <span>Fiche Détaillée &amp; Réalisations</span>
                <Sparkles size={14} />
              </button>
              <Link to="/developpeur" className="dev-link-page">
                Voir la page dédiée →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal */}
      {showModal && (
        <div className="dev-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="dev-modal-panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="dev-modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <div className="dev-modal-header">
              <div className="dev-modal-avatar">
                <span>SB</span>
              </div>
              <div>
                <div className="dev-modal-tagline">
                  <Award size={14} color="var(--color-gold)" />
                  <span>Artisan du Web &amp; Ingénieur Digital</span>
                </div>
                <h2 className="dev-modal-name">Saif Belfaquir</h2>
                <p className="dev-modal-role">
                  Développeur Full Stack Indépendant • Agadir, Maroc
                </p>
              </div>
            </div>

            <div className="dev-modal-signature-block">
              <img
                src={signatureImg}
                alt="Signature Saif Belfaquir"
                className="dev-modal-signature-img"
              />
              <span className="dev-modal-signature-label">Signature Officielle</span>
            </div>

            <div className="dev-modal-content">
              <h4>À propos de la réalisation :</h4>
              <p>
                Ce site a été conçu et développé sur-mesure pour la boulangerie artisanale <strong>La Carafa des Blés</strong>. L’objectif était d’allier l’authenticité des métiers de bouche français à l’excellence ergonomique d’une application moderne et accessible.
              </p>

              <div className="dev-modal-points">
                <div className="dev-point">
                  <CheckCircle2 size={16} color="var(--color-gold)" />
                  <div>
                    <strong>Responsive &amp; Mobile-First :</strong> Optimisé pour toutes les résolutions d’écrans (smartphones, tablettes, ordinateurs).
                  </div>
                </div>
                <div className="dev-point">
                  <CheckCircle2 size={16} color="var(--color-gold)" />
                  <div>
                    <strong>Back-Office d’Administration :</strong> Gestion en direct des produits, catégories, textes et boîte de réception.
                  </div>
                </div>
                <div className="dev-point">
                  <CheckCircle2 size={16} color="var(--color-gold)" />
                  <div>
                    <strong>Sécurité &amp; Performance :</strong> Authentification sécurisée (Bcrypt, JWT HTTP-only), temps de réponse instantané.
                  </div>
                </div>
              </div>

              <div className="dev-modal-ctas">
                <a
                  href="https://github.com/sayfbel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-cta-link"
                >
                  <Github size={16} />
                  <span>github.com/sayfbel</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/saif-belfaquir-90b044241/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-cta-link"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:saifbelfaquir@gmail.com"
                  className="dev-cta-link highlight"
                >
                  <Mail size={16} />
                  <span>saifbelfaquir@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scoped CSS Styles */}
      <style>{`
        .dev-credits-section {
          padding: 2.5rem 0 3rem;
          background: linear-gradient(180deg, #1A0205 0%, #150103 100%);
          border-top: 1px solid rgba(212, 175, 55, 0.18);
          border-bottom: 1px solid rgba(212, 175, 55, 0.12);
          position: relative;
        }

        .dev-credits-card {
          position: relative;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(212, 175, 55, 0.22);
          padding: 2.25rem 2.5rem;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.3fr;
          gap: 2.5rem;
          align-items: center;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);
        }

        .dev-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.06), transparent 70%);
          pointer-events: none;
        }

        .dev-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-gold);
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .dev-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 8px #10B981;
        }

        .dev-name {
          font-family: var(--font-serif);
          font-size: clamp(1.6rem, 2.5vw, 2.1rem);
          color: #FFFFFF;
          margin: 0 0 0.3rem;
          letter-spacing: 0.02em;
          font-weight: 700;
        }

        .dev-title {
          font-size: 0.95rem;
          color: var(--color-gold-light);
          margin: 0 0 0.85rem;
          font-weight: 500;
        }

        .dev-bio {
          font-size: 0.88rem;
          line-height: 1.6;
          color: #D6C8BA;
          margin: 0 0 1.25rem;
        }

        .dev-bio em {
          color: var(--color-gold);
          font-style: normal;
        }

        .dev-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .dev-tag {
          font-size: 0.74rem;
          padding: 0.25rem 0.65rem;
          background: rgba(255, 255, 255, 0.05);
          color: #E6D7C7;
          border: 1px solid rgba(255, 255, 255, 0.08);
          letter-spacing: 0.02em;
        }

        /* Signature frame */
        .dev-signature-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dev-signature-frame {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(0, 0, 0, 0.35);
          border: 1px dashed rgba(212, 175, 55, 0.35);
          padding: 1.25rem 1.75rem;
          position: relative;
          width: 100%;
          max-width: 290px;
        }

        .dev-signature-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          color: var(--color-gold);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.5rem;
        }

        .dev-signature-img {
          width: 100%;
          max-width: 210px;
          height: auto;
          filter: invert(1) brightness(1.2) drop-shadow(0 2px 8px rgba(212, 175, 55, 0.2));
          transition: transform 0.3s ease;
          display: block;
        }

        .dev-signature-frame:hover .dev-signature-img {
          transform: scale(1.04);
        }

        .dev-signature-caption {
          font-size: 0.74rem;
          color: #A89B90;
          text-align: center;
          margin-top: 0.6rem;
          font-style: italic;
          line-height: 1.35;
        }

        /* Actions / Buttons */
        .dev-actions-col {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .dev-actions-title {
          font-size: 0.85rem;
          color: var(--color-gold);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
        }

        .dev-links-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem;
        }

        .dev-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 0.9rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: #FAF5EA;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-decoration: none;
          transition: all 0.2s ease;
          border-radius: 0;
          min-height: 42px;
        }

        .dev-btn:hover {
          background: var(--color-burgundy);
          border-color: var(--color-gold);
          color: #FFFFFF;
          transform: translateY(-2px);
        }

        .dev-btn-ext {
          margin-left: auto;
          opacity: 0.6;
        }

        .dev-btn-phone {
          grid-column: span 2;
          justify-content: center;
          background: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.3);
          color: #6EE7B7;
        }

        .dev-btn-phone:hover {
          background: rgba(16, 185, 129, 0.25);
          border-color: #10B981;
          color: #FFFFFF;
        }

        .dev-extra-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          flex-wrap: wrap;
        }

        .dev-btn-profile {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-gold);
          color: var(--color-burgundy-dark);
          border: none;
          padding: 0.65rem 1.1rem;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dev-btn-profile:hover {
          background: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(212, 175, 55, 0.35);
        }

        .dev-link-page {
          color: var(--color-gold-light);
          font-size: 0.82rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .dev-link-page:hover {
          color: #FFFFFF;
          text-decoration: underline;
        }

        /* Modal */
        .dev-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 0, 2, 0.82);
          backdrop-filter: blur(8px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          animation: devFadeIn 0.2s ease;
        }

        @keyframes devFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .dev-modal-panel {
          background: #1C0306;
          border: 1px solid var(--color-gold);
          color: #FAF5EA;
          max-width: 580px;
          width: 100%;
          padding: 2.25rem;
          position: relative;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
          max-height: 90vh;
          overflow-y: auto;
        }

        .dev-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #FAF5EA;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .dev-modal-close:hover {
          background: var(--color-burgundy);
          color: #FFFFFF;
        }

        .dev-modal-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .dev-modal-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--color-burgundy);
          border: 2px solid var(--color-gold);
          color: var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .dev-modal-tagline {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.74rem;
          color: var(--color-gold);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.25rem;
        }

        .dev-modal-name {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          margin: 0;
          color: #FFFFFF;
        }

        .dev-modal-role {
          font-size: 0.88rem;
          color: #D6C8BA;
          margin: 0.2rem 0 0;
        }

        .dev-modal-signature-block {
          background: rgba(0, 0, 0, 0.4);
          border: 1px dashed rgba(212, 175, 55, 0.3);
          padding: 1.25rem;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .dev-modal-signature-img {
          max-width: 200px;
          width: 100%;
          height: auto;
          filter: invert(1) brightness(1.2);
          display: block;
          margin: 0 auto;
        }

        .dev-modal-signature-label {
          display: block;
          font-size: 0.72rem;
          color: var(--color-gold-light);
          margin-top: 0.4rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .dev-modal-content h4 {
          font-size: 1rem;
          color: var(--color-gold);
          margin: 0 0 0.6rem;
        }

        .dev-modal-content p {
          font-size: 0.9rem;
          line-height: 1.6;
          color: #D6C8BA;
          margin: 0 0 1.25rem;
        }

        .dev-modal-points {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
        }

        .dev-point {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.86rem;
          line-height: 1.5;
          color: #EADFD5;
          background: rgba(255, 255, 255, 0.03);
          padding: 0.75rem;
        }

        .dev-modal-ctas {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .dev-cta-link {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #FAF5EA;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .dev-cta-link:hover {
          background: var(--color-burgundy);
          border-color: var(--color-gold);
          color: #FFFFFF;
        }

        .dev-cta-link.highlight {
          background: var(--color-gold);
          color: var(--color-burgundy-dark);
          font-weight: 700;
          border-color: var(--color-gold);
        }

        .dev-cta-link.highlight:hover {
          background: #FFFFFF;
          color: var(--color-burgundy);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .dev-credits-card {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem;
          }
          .dev-signature-col {
            order: 3;
            grid-column: span 2;
          }
          .dev-signature-frame {
            max-width: 100%;
          }
        }

        @media (max-width: 768px) {
          .dev-credits-card {
            grid-template-columns: 1fr;
            gap: 1.75rem;
            padding: 1.5rem 1.25rem;
          }
          .dev-signature-col {
            order: 2;
            grid-column: span 1;
          }
          .dev-actions-col {
            order: 3;
          }
          .dev-links-grid {
            grid-template-columns: 1fr;
          }
          .dev-btn-phone {
            grid-column: span 1;
          }
          .dev-extra-actions {
            flex-direction: column;
            align-items: stretch;
          }
          .dev-btn-profile {
            width: 100%;
            justify-content: center;
          }
          .dev-link-page {
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .dev-name {
            font-size: 1.5rem;
          }
          .dev-modal-panel {
            padding: 1.5rem 1.125rem;
          }
          .dev-modal-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
