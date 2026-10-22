import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wheat, Coffee, Cake } from 'lucide-react';
import { ArtisanSeal } from '../components/brand/ArtisanSeal';
import { FlourSackIllustration } from '../components/brand/FlourSackIllustration';
import { WheatDecoration } from '../components/brand/WheatDecoration';
import { BakeryMap } from '../components/BakeryMap';
import { api } from '../services/api';

export function HomePage() {
  const [content, setContent] = useState({
    settings: {
      homepage_hero_kicker: 'BOULANGERIE • PÂTISSERIE ARTISANALE',
      homepage_hero_title_1: 'Le goût des',
      homepage_hero_title_2: 'bonnes choses.',
      homepage_hero_subtitle: 'Des produits artisanaux, préparés chaque jour avec des ingrédients sélectionnés et beaucoup de passion.',
      homepage_hero_cta: 'DÉCOUVRIR NOS CRÉATIONS',
      story_kicker: 'NOTRE HISTOIRE',
      story_title_1: 'Le savoir-faire,',
      story_title_2: 'chaque jour.',
      story_text_1: 'Artisans boulangers-pâtissiers à Épinay-sur-Orge, nous mettons tout notre cœur dans la préparation de pains authentiques et de pâtisseries maisons.',
      story_text_2: 'Notre exigence : des produits savoureux, un accueil chaleureux et le respect des traditions artisanales.',
      story_signature: 'La Carafa des Blés'
    },
    categories: []
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.getHomepageContent();
        if (res?.success && res.data) {
          setContent(prev => ({
            settings: { ...prev.settings, ...res.data.settings },
            categories: res.data.categories || []
          }));
        }
      } catch (err) {
        console.error('Error loading homepage content:', err);
      }
    }
    loadData();
  }, []);

  const { settings } = content;

  // Dedicated verified product category images
  const categoryImages = {
    'pains-de-tradition': '/assets/images/cat-pains.webp',
    'viennoiseries': '/assets/images/cat-viennoiseries.webp',
    'patisseries-maison': '/assets/images/cat-patisseries.webp'
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* 1. HERO SECTION (EDITORIAL 3-PART COMPOSITION MATCHING REFERENCE) */}
      <section
        style={{
          position: 'relative',
          padding: '2.5rem 0 3.5rem',
          minHeight: 'auto'
        }}
      >
        {/* Subtle Botanical Wheat Stalk along Left Edge */}
        <WheatDecoration
          style={{ top: '10px', left: '-15px' }}
          opacity={0.3}
          width={130}
        />

        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr 1fr 1.25fr',
              gap: '2.25rem',
              alignItems: 'center'
            }}
            className="hero-reference-grid"
          >
            {/* Part 1: Left Editorial Narrative */}
            <div style={{ position: 'relative', zIndex: 2 }} className="hero-col-left">
              {/* Eyebrow */}
              <div
                style={{
                  color: 'var(--color-gold)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}
              >
                {settings.homepage_hero_kicker}
              </div>

              {/* Headline with deliberate editorial line breaks */}
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.4rem, 3.8vw, 3.6rem)',
                  fontWeight: 600,
                  color: 'var(--color-burgundy)',
                  lineHeight: 1.08,
                  marginBottom: '1.25rem',
                  letterSpacing: '-0.01em',
                  maxWidth: '380px'
                }}
              >
                {settings.homepage_hero_title || 'Le goût des bonnes choses.'}
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: '0.98rem',
                  color: 'var(--color-text-main)',
                  lineHeight: 1.6,
                  maxWidth: '380px',
                  marginBottom: '2rem'
                }}
              >
                {settings.homepage_hero_subtitle}
              </p>

              {/* CTA Buttons Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  flexWrap: 'wrap'
                }}
              >
                <Link
                  to="/produits"
                  className="btn btn-primary"
                  style={{
                    padding: '0.75rem 1.4rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    boxShadow: 'var(--shadow-burgundy)',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  <span>{settings.homepage_hero_cta}</span>
                  <ArrowRight size={15} />
                </Link>

                <Link
                  to="/notre-histoire"
                  className="btn btn-outline"
                  style={{
                    padding: '0.75rem 1.4rem',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderColor: 'var(--color-burgundy)',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  <span>NOTRE HISTOIRE</span>
                </Link>
              </div>
            </div>

            {/* Part 2: Center Warm Bread Photography & Seal */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="hero-col-center"
            >
              {/* Circular Artisan Seal Overlapping */}
              <div
                style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '-25px',
                  zIndex: 3,
                  transform: 'rotate(-4deg)'
                }}
                className="hero-seal-badge"
              >
                <ArtisanSeal size={95} />
              </div>

              {/* Bread Photograph */}
              <div
                style={{
                  width: '100%',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  boxShadow: '0 12px 35px rgba(56, 7, 14, 0.1)',
                  border: '1px solid var(--color-border-subtle)',
                  backgroundColor: '#FAF5EC'
                }}
              >
                <img
                  src="/assets/images/hero-bread.webp"
                  alt="Pains de tradition artisanale au levain naturel et farines de qualité"
                  style={{
                    width: '100%',
                    height: '380px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            </div>

            {/* Part 3: Right Access Plan & Real Interactive Leaflet Map */}
            <div id="localisation" style={{ position: 'relative' }} className="hero-col-right">
              <div style={{ marginBottom: '1rem' }}>
                <div
                  style={{
                    color: 'var(--color-gold)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    marginBottom: '0.35rem'
                  }}
                >
                  Plan d'accès & Localisation
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.65rem',
                    color: 'var(--color-burgundy)',
                    lineHeight: 1.15,
                    margin: '0 0 0.4rem'
                  }}
                >
                  Venez nous rendre visite
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.45, margin: 0 }}>
                  Située au <strong>15 Rue Pasteur à Épinay-sur-Orge</strong>, notre boulangerie artisanale est facilement accessible.
                </p>
              </div>

              {/* Leaflet Map with Dual Branded Cards Below */}
              <BakeryMap />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE PRODUCT CATEGORY CARDS (SPLIT LAYOUT MATCHING REFERENCE) */}
      <section style={{ padding: '1.5rem 0 4rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* Card 1: Pains de tradition */}
            <div
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                display: 'flex',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
              }}
              className="category-card"
            >
              <div style={{ width: '42%', flexShrink: 0 }}>
                <img
                  src={categoryImages['pains-de-tradition']}
                  alt="Pains de tradition au levain naturel"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.4rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.4rem' }}>
                  <Wheat size={18} />
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-burgundy)', marginBottom: '0.4rem' }}>
                  Pains de tradition
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.45, marginBottom: '1.1rem' }}>
                  Façonnés à la main, cuits sur place, avec des farines de qualité.
                </p>
                <Link
                  to="/produits?category=pains-de-tradition"
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-burgundy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>Voir la sélection</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Card 2: Viennoiseries */}
            <div
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                display: 'flex',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
              }}
              className="category-card"
            >
              <div style={{ width: '42%', flexShrink: 0 }}>
                <img
                  src={categoryImages['viennoiseries']}
                  alt="Viennoiseries pur beurre faites maison"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.4rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.4rem' }}>
                  <Coffee size={18} />
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-burgundy)', marginBottom: '0.4rem' }}>
                  Viennoiseries
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.45, marginBottom: '1.1rem' }}>
                  Beurre de qualité, feuilletage pur beurre et dorure maison.
                </p>
                <Link
                  to="/produits?category=viennoiseries"
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-burgundy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>Voir la sélection</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Card 3: Pâtisseries maison */}
            <div
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                display: 'flex',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
              }}
              className="category-card"
            >
              <div style={{ width: '42%', flexShrink: 0 }}>
                <img
                  src={categoryImages['patisseries-maison']}
                  alt="Pâtisseries artisanales faites avec soin"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.4rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.4rem' }}>
                  <Cake size={18} />
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-burgundy)', marginBottom: '0.4rem' }}>
                  Pâtisseries maison
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.45, marginBottom: '1.1rem' }}>
                  Des créations gourmandes élaborées chaque jour avec soin.
                </p>
                <Link
                  to="/produits?category=patisseries-maison"
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-burgundy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>Voir la sélection</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "NOTRE HISTOIRE" EDITORIAL SECTION WITH STOREFRONT PHOTO */}
      <section
        style={{
          padding: '4rem 0 4.5rem',
          backgroundColor: '#FAF5EC',
          borderTop: '1px solid var(--color-border-subtle)',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(300px, 1.05fr) minmax(320px, 1.25fr)',
              gap: '3.5rem',
              alignItems: 'center'
            }}
            className="story-reference-grid"
          >
            {/* Left : Real Bakery Storefront */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(56, 7, 14, 0.12)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <img
                  src="/assets/images/storefront.webp"
                  alt="Devanture de la boulangerie artisanale La Carafa des Blés à Épinay-sur-Orge"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>

            {/* Right : Brand Narrative, Italic Headline, Signature & Flour Sack */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  color: 'var(--color-gold)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem'
                }}
              >
                {settings.story_kicker}
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  color: 'var(--color-burgundy)',
                  lineHeight: 1.15,
                  marginBottom: '1.25rem'
                }}
              >
                {settings.story_title_1}
                <br />
                {settings.story_title_2}
              </h2>

              <p
                style={{
                  fontSize: '0.98rem',
                  lineHeight: 1.65,
                  color: 'var(--color-text-main)',
                  marginBottom: '0.75rem'
                }}
              >
                {settings.story_text_1}
              </p>

              <p
                style={{
                  fontSize: '0.98rem',
                  lineHeight: 1.65,
                  color: 'var(--color-text-muted)',
                  marginBottom: '1.75rem'
                }}
              >
                {settings.story_text_2}
              </p>

              {/* Calligraphic Signature & Engraved Flour Sack Illustration */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '2rem',
                  flexWrap: 'wrap'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.2rem',
                    fontStyle: 'italic',
                    color: 'var(--color-burgundy)',
                    lineHeight: 1
                  }}
                >
                  {settings.story_signature}
                </div>

                <div style={{ opacity: 0.75 }}>
                  <FlourSackIllustration width={140} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 1080px) {
          .hero-reference-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
          .hero-col-right {
            grid-column: 1 / -1;
            margin-top: 1rem;
          }
        }

        @media (max-width: 768px) {
          .hero-reference-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-seal-badge {
            display: none !important;
          }
          .story-reference-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }

        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </div>
  );
}
