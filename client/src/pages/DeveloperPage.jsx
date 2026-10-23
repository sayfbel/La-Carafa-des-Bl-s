import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  Layout, 
  Layers, 
  ArrowLeft 
} from 'lucide-react';
import signatureImg from '../assets/sighnator.png';

export function DeveloperPage() {
  return (
    <div className="dev-page-wrapper">
      {/* Hero Header */}
      <section className="dev-hero-section">
        <div className="container">
          <Link to="/" className="dev-back-link">
            <ArrowLeft size={16} />
            <span>Retour à l'accueil de la boulangerie</span>
          </Link>

          <div className="dev-hero-header">
            <div className="dev-hero-pill">
              <Sparkles size={14} color="var(--color-gold)" />
              <span>Conception &amp; Ingénierie Web Sur-Mesure</span>
            </div>
            <h1 className="dev-hero-title">
              L’Artisanat Numérique
            </h1>
            <p className="dev-hero-subtitle">
              Rencontre entre l’excellence de la tradition boulangère française et la précision du développement web moderne.
            </p>
          </div>
        </div>
      </section>

      {/* Main Developer Profile Card */}
      <section className="dev-profile-section">
        <div className="container">
          <div className="dev-main-card">
            <div className="dev-card-identity">
              <div className="dev-identity-text">
                <div className="dev-identity-pill">
                  <span className="dev-badge-dot" />
                  <span>Concepteur &amp; Développeur Web</span>
                </div>
                <h2 className="dev-identity-name">Saif Belfaquir</h2>
                <p className="dev-identity-role">
                  Développeur Full Stack &amp; UI/UX Designer Indépendant
                </p>
                <p className="dev-identity-location">
                  Agadir, Maroc • Projets Internationaux (France, Maroc &amp; Remote)
                </p>
              </div>

              {/* Direct Quick Actions */}
              <div className="dev-contact-ctas">
                <a
                  href="https://github.com/sayfbel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-primary-btn"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href="https://www.linkedin.com/in/saif-belfaquir-90b044241/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-primary-btn linkedin"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href="mailto:saifbelfaquir@gmail.com"
                  className="dev-primary-btn email"
                >
                  <Mail size={18} />
                  <span>Me Contacter</span>
                </a>

                <a
                  href="https://wa.me/212649157151"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-primary-btn whatsapp"
                >
                  <Phone size={18} />
                  <span>+212 649 157 151</span>
                </a>
              </div>
            </div>

            {/* Signature Showcase Block */}
            <div className="dev-signature-showcase">
              <div className="dev-signature-box">
                <div className="dev-sig-top">
                  <span className="dev-sig-decor">★</span>
                  <span className="dev-sig-title">SIGNATURE AUTHENTIQUE DU CONCEPTEUR</span>
                  <span className="dev-sig-decor">★</span>
                </div>
                <img
                  src={signatureImg}
                  alt="Signature officielle Saif Belfaquir"
                  className="dev-sig-image"
                />
                <p className="dev-sig-text">
                  « Chaque ligne de code et chaque pixel ont été façonnés avec la même exigence que celle d’un boulanger façonnant son pain de tradition. »
                </p>
                <div className="dev-sig-author">— Saif Belfaquir</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study / Project Blueprint */}
      <section className="dev-project-section">
        <div className="container">
          <div className="dev-section-title-wrap">
            <h2 className="dev-section-heading">
              Réalisation du Projet : <em>La Carafa des Blés</em>
            </h2>
            <p className="dev-section-sub">
              Découvrez les piliers techniques et ergonomiques mis en œuvre pour concevoir ce portail d'artisan.
            </p>
          </div>

          <div className="dev-pillars-grid">
            {/* Pillar 1 */}
            <div className="dev-pillar-card">
              <div className="dev-pillar-icon">
                <Smartphone size={24} color="var(--color-gold)" />
              </div>
              <h3>Ergonomie Mobile-First</h3>
              <p>
                Conception responsive chirurgicale adaptée à 100% des smartphones (iPhone, Samsung, tablettes et écrans ultra-larges). Cibles tactiles calibrées à 44px minimum, navigation au pouce naturelle et absence totale de débordement horizontal.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="dev-pillar-card">
              <div className="dev-pillar-icon">
                <Layout size={24} color="var(--color-gold)" />
              </div>
              <h3>Direction Artistique &amp; UI Gastronomique</h3>
              <p>
                Palette chromatique chaleureuse inspirée des fournils d'antan (Bordeaux profond, Or chaud, Parchemin), typographies d'exception (Cormorant Garamond &amp; Plus Jakarta Sans) et micro-interactions soignées.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="dev-pillar-card">
              <div className="dev-pillar-icon">
                <ShieldCheck size={24} color="var(--color-gold)" />
              </div>
              <h3>Back-Office Sécurisé</h3>
              <p>
                Espace d'administration complet : gestion des produits, mise à jour des prix, gestion des disponibilités en rayon, suivi des messages clients et administration du contenu. Protection par session HTTP-only et hachage Bcrypt.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="dev-pillar-card">
              <div className="dev-pillar-icon">
                <Zap size={24} color="var(--color-gold)" />
              </div>
              <h3>Performance &amp; SEO Local</h3>
              <p>
                Architecture Vite ultra-rapide, lazy-loading des médias WebP, balisage Schema.org / OpenGraph pour le référencement local à Épinay-sur-Orge et accessibilité universelle.
              </p>
            </div>
          </div>

          {/* Technical Stack Tags */}
          <div className="dev-stack-box">
            <div className="dev-stack-title">
              <Terminal size={18} color="var(--color-gold)" />
              <span>Technologies &amp; Outils Utilisés</span>
            </div>
            <div className="dev-stack-tags">
              <span className="dev-stack-pill">React 18</span>
              <span className="dev-stack-pill">Vite</span>
              <span className="dev-stack-pill">React Router v6</span>
              <span className="dev-stack-pill">Node.js</span>
              <span className="dev-stack-pill">Express</span>
              <span className="dev-stack-pill">Bcrypt &amp; JWT</span>
              <span className="dev-stack-pill">Vanilla CSS (Zero Tailwind Bloat)</span>
              <span className="dev-stack-pill">Responsive Design Systems</span>
              <span className="dev-stack-pill">SEO &amp; Microdata</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="dev-cta-section">
        <div className="container">
          <div className="dev-cta-box">
            <h2 className="dev-cta-title">
              Vous avez un projet web d'exception ?
            </h2>
            <p className="dev-cta-desc">
              Que vous soyez artisan, créateur ou dirigeant d'entreprise, bénéficiez d'une présence digitale sur-mesure, haut de gamme et performante.
            </p>
            <div className="dev-cta-buttons">
              <a
                href="mailto:saifbelfaquir@gmail.com"
                className="btn btn-primary"
                style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
              >
                <Mail size={18} />
                <span>Envoyer un Message (saifbelfaquir@gmail.com)</span>
              </a>
              <a
                href="https://www.linkedin.com/in/saif-belfaquir-90b044241/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
              >
                <Linkedin size={18} />
                <span>Voir le Profil LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Scoped CSS Stylesheet */}
      <style>{`
        .dev-page-wrapper {
          background-color: #FAF5EC;
          color: var(--color-text-main);
          min-height: 100vh;
        }

        .dev-hero-section {
          background: linear-gradient(180deg, #1A0205 0%, #290409 100%);
          color: #FAF5EA;
          padding: 3.5rem 0 4rem;
          border-bottom: 2px solid var(--color-gold);
          position: relative;
        }

        .dev-back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-gold-light);
          font-size: 0.88rem;
          text-decoration: none;
          margin-bottom: 2rem;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .dev-back-link:hover {
          color: #FFFFFF;
          transform: translateX(-4px);
        }

        .dev-hero-header {
          max-width: 800px;
        }

        .dev-hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(212, 175, 55, 0.15);
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: var(--color-gold);
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.4rem 0.9rem;
          margin-bottom: 1.25rem;
        }

        .dev-hero-title {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          color: #FFFFFF;
          line-height: 1.1;
          margin: 0 0 1rem;
          letter-spacing: 0.02em;
        }

        .dev-hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #D6C8BA;
          line-height: 1.6;
          margin: 0;
        }

        /* Profile Section */
        .dev-profile-section {
          padding: 3.5rem 0 2rem;
          margin-top: -2rem;
          position: relative;
          z-index: 2;
        }

        .dev-main-card {
          background: #FFFFFF;
          border: 1px solid var(--color-border);
          box-shadow: 0 16px 40px rgba(41, 4, 9, 0.08);
          padding: 3rem;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .dev-card-identity {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .dev-identity-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #FAF5EC;
          border: 1px solid var(--color-border);
          padding: 0.35rem 0.85rem;
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-burgundy);
          margin-bottom: 0.5rem;
          width: fit-content;
        }

        .dev-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 8px #10B981;
        }

        .dev-identity-badge {
          display: inline-block;
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-gold-dark);
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .dev-identity-name {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.5vw, 2.6rem);
          color: var(--color-burgundy);
          margin: 0;
          line-height: 1.15;
        }

        .dev-identity-role {
          font-size: 1.05rem;
          color: var(--color-text-main);
          font-weight: 600;
          margin: 0.35rem 0 0;
        }

        .dev-identity-location {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          margin: 0.2rem 0 0;
        }

        .dev-contact-ctas {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .dev-primary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.8rem 1.25rem;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          color: #FFFFFF;
          background: #1F2937;
          border: 1px solid transparent;
          transition: all 0.2s ease;
          min-height: 46px;
        }

        .dev-primary-btn:hover {
          background: #111827;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .dev-primary-btn.linkedin {
          background: #0A66C2;
        }
        .dev-primary-btn.linkedin:hover {
          background: #084E96;
        }

        .dev-primary-btn.email {
          background: var(--color-burgundy);
        }
        .dev-primary-btn.email:hover {
          background: var(--color-burgundy-dark);
        }

        .dev-primary-btn.whatsapp {
          background: #059669;
        }
        .dev-primary-btn.whatsapp:hover {
          background: #047857;
        }

        /* Signature Showcase */
        .dev-signature-showcase {
          display: flex;
          justify-content: center;
        }

        .dev-signature-box {
          background: #FDFBF7;
          border: 2px solid var(--color-gold);
          padding: 2rem 1.75rem;
          text-align: center;
          box-shadow: inset 0 0 20px rgba(212, 175, 55, 0.08);
          position: relative;
          width: 100%;
        }

        .dev-sig-top {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .dev-sig-decor {
          color: var(--color-gold);
          font-size: 0.8rem;
        }

        .dev-sig-title {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          color: var(--color-burgundy);
          font-weight: 700;
        }

        .dev-sig-image {
          max-width: 240px;
          width: 100%;
          height: auto;
          margin: 0 auto 1.25rem;
          display: block;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
          transition: transform 0.3s ease;
        }

        .dev-sig-box:hover .dev-sig-image {
          transform: scale(1.05);
        }

        .dev-sig-text {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.05rem;
          line-height: 1.5;
          color: var(--color-burgundy-dark);
          margin: 0 0 0.75rem;
        }

        .dev-sig-author {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-gold-dark);
          letter-spacing: 0.04em;
        }

        /* Pillars Section */
        .dev-project-section {
          padding: 4rem 0;
        }

        .dev-section-title-wrap {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem;
        }

        .dev-section-heading {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          color: var(--color-burgundy);
          margin: 0 0 0.75rem;
        }

        .dev-section-heading em {
          font-style: normal;
          color: var(--color-gold-dark);
        }

        .dev-section-sub {
          font-size: 1.02rem;
          color: var(--color-text-muted);
          margin: 0;
        }

        .dev-pillars-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.75rem;
          margin-bottom: 3rem;
        }

        .dev-pillar-card {
          background: #FFFFFF;
          border: 1px solid var(--color-border);
          padding: 2.25rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .dev-pillar-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.07);
          border-color: var(--color-gold);
        }

        .dev-pillar-icon {
          width: 52px;
          height: 52px;
          background: #FAF5EC;
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .dev-pillar-card h3 {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          color: var(--color-burgundy);
          margin: 0 0 0.75rem;
        }

        .dev-pillar-card p {
          font-size: 0.92rem;
          line-height: 1.65;
          color: var(--color-text-muted);
          margin: 0;
        }

        /* Tech Stack Box */
        .dev-stack-box {
          background: #1A0205;
          color: #FAF5EA;
          padding: 2rem 2.5rem;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .dev-stack-title {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-gold);
          margin-bottom: 1.25rem;
        }

        .dev-stack-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
        }

        .dev-stack-pill {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #FAF5EA;
          font-size: 0.82rem;
          font-weight: 500;
          padding: 0.45rem 0.9rem;
        }

        /* CTA Section */
        .dev-cta-section {
          padding: 0 0 5rem;
        }

        .dev-cta-box {
          background: linear-gradient(135deg, var(--color-burgundy) 0%, var(--color-burgundy-dark) 100%);
          color: #FAF5EA;
          padding: 3.5rem 3rem;
          text-align: center;
          border: 2px solid var(--color-gold);
          box-shadow: 0 20px 48px rgba(41, 4, 9, 0.25);
        }

        .dev-cta-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          margin: 0 0 1rem;
          color: #FFFFFF;
        }

        .dev-cta-desc {
          font-size: 1.05rem;
          line-height: 1.6;
          max-width: 650px;
          margin: 0 auto 2rem;
          color: #E6D7C7;
        }

        .dev-cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .dev-main-card {
            grid-template-columns: 1fr;
            padding: 2.25rem;
          }
          .dev-pillars-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .dev-hero-section {
            padding: 2.5rem 0 3rem;
          }
          .dev-main-card {
            padding: 1.75rem 1.25rem;
          }
          .dev-contact-ctas {
            grid-template-columns: 1fr;
          }
          .dev-stack-box {
            padding: 1.5rem 1.25rem;
          }
          .dev-cta-box {
            padding: 2.5rem 1.25rem;
          }
          .dev-cta-buttons {
            flex-direction: column;
          }
          .dev-cta-buttons .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
