import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wheat, Coffee, Cake } from 'lucide-react';
import { ArtisanSeal } from '../components/brand/ArtisanSeal';
import { FlourSackIllustration } from '../components/brand/FlourSackIllustration';
import { WheatDecoration } from '../components/brand/WheatDecoration';
import { api } from '../services/api';

export function HomePage() {
  const [content, setContent] = useState({
    settings: {
      homepage_hero_kicker: 'BOULANGERIE • PÂTISSERIE ARTISANALE',
      homepage_hero_title: 'Le goût des bonnes choses.',
      homepage_hero_subtitle: 'Des produits artisanaux, préparés chaque jour avec des ingrédients sélectionnés et beaucoup de passion.',
      homepage_hero_cta: 'Découvrir nos créations',
      story_kicker: 'NOTRE HISTOIRE',
      story_title: 'Le savoir-faire, chaque jour.',
      story_text_1: 'Artisans boulangers-pâtissiers à Épinay-sur-Orge, nous mettons tout notre cœur dans la préparation de pains authentiques et de pâtisseries maison.',
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

  const categoryImages = {
    'pains-de-tradition': '/assets/images/cat-pains.webp',
    'viennoiseries': '/assets/images/cat-viennoiseries.webp',
    'patisseries-maison': '/assets/images/cat-patisseries.webp'
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* 1. HERO SECTION (2-COLUMN EDITORIAL COMPOSITION MATCHING REFERENCE IMAGE) */}
      <section
        style={{
          position: 'relative',
          padding: '3rem 0 2rem',
          backgroundColor: 'var(--color-ivory)',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Botanical Wheat Stalk climbing from bottom-left corner */}
        <WheatDecoration
          style={{ bottom: '-20px', left: '-15px' }}
          opacity={0.35}
          width={140}
        />

        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 1.25fr',
              gap: '2.5rem',
              alignItems: 'center'
            }}
            className="hero-split-grid"
          >
            {/* Left Column: Brand Narrative & Editorial Typography */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Kicker */}
              <div
                style={{
                  color: 'var(--color-gold)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem'
                }}
              >
                {settings.homepage_hero_kicker}
              </div>

              {/* Headline matching reference */}
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.75rem, 5vw, 4.4rem)',
                  fontWeight: 600,
                  color: 'var(--color-burgundy)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  margin: '0 0 1.25rem',
                  maxWidth: '440px'
                }}
              >
                {settings.homepage_hero_title || 'Le goût des bonnes choses.'}
              </h1>

              {/* Gold Accent Line */}
              <div
                style={{
                  width: '48px',
                  height: '2px',
                  backgroundColor: 'var(--color-gold)',
                  marginBottom: '1.5rem'
                }}
              />

              {/* Subtitle */}
              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--color-text-main)',
                  lineHeight: 1.6,
                  maxWidth: '460px',
                  marginBottom: '2.5rem'
                }}
              >
                {settings.homepage_hero_subtitle}
              </p>

              {/* CTA Button and Floating Seal */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  flexWrap: 'wrap'
                }}
              >
                <Link
                  to="/produits"
                  className="btn btn-primary"
                  style={{
                    padding: '0.85rem 2.2rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    boxShadow: 'var(--shadow-burgundy)',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  <span>{settings.homepage_hero_cta || 'Découvrir nos créations'}</span>
                  <ArrowRight size={16} />
                </Link>

                <div style={{ transform: 'rotate(-4deg)' }} className="hero-seal-wrapper">
                  <ArtisanSeal size={105} />
                </div>
              </div>
            </div>

            {/* Right Column: High-Quality Warm Bread Photography blending into Ivory */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
              className="hero-image-wrapper"
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: '650px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <img
                  src="/assets/images/hero-bread.webp"
                  alt="Pains de tradition au levain cuits sur sole de pierre"
                  style={{
                    width: '100%',
                    height: '460px',
                    objectFit: 'cover',
                    display: 'block',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 10%, black 22%)',
                    maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 10%, black 22%)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE PRODUCT CATEGORY CARDS (SPLIT LAYOUT MATCHING REFERENCE) */}
      <section style={{ padding: '2rem 0 4rem' }}>
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
                  alt="Pains de tradition artisanale"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.4rem' }}>
                  <Wheat size={18} />
                </div>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--color-burgundy)', marginBottom: '0.4rem' }}>
                  Pains de tradition
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                  Façonnés à la main, cuits sur place, avec des farines de qualité.
                </p>
                <Link
                  to="/produits?category=pains-de-tradition"
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'var(--color-burgundy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>Voir la sélection</span>
                  <ArrowRight size={14} />
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
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.4rem' }}>
                  <Coffee size={18} />
                </div>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--color-burgundy)', marginBottom: '0.4rem' }}>
                  Viennoiseries
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                  Beurre de qualité, feuilletage pur beurre et dorure maison.
                </p>
                <Link
                  to="/produits?category=viennoiseries"
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'var(--color-burgundy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>Voir la sélection</span>
                  <ArrowRight size={14} />
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
                  alt="Pâtisseries artisanales fines"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.4rem' }}>
                  <Cake size={18} />
                </div>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--color-burgundy)', marginBottom: '0.4rem' }}>
                  Pâtisseries maison
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                  Des créations gourmandes élaborées chaque jour avec soin.
                </p>
                <Link
                  to="/produits?category=patisseries-maison"
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'var(--color-burgundy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <span>Voir la sélection</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "NOTRE HISTOIRE" EDITORIAL SECTION WITH STOREFRONT PHOTO */}
      <section
        id="notre-histoire"
        style={{
          padding: '4.5rem 0',
          backgroundColor: '#FAF5EC',
          borderTop: '1px solid var(--color-border-subtle)',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(300px, 1fr) minmax(320px, 1.25fr)',
              gap: '4rem',
              alignItems: 'center'
            }}
            className="story-split-grid"
          >
            {/* Left: Authentic Storefront Photo with Stone Wall Plaque matching Reference */}
            <div
              style={{
                display: 'flex',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-md)',
                backgroundColor: '#FFF'
              }}
              className="storefront-card"
            >
              {/* Plaque "ARTISAN BOULANGER • ÉPINAY-SUR-ORGE" */}
              <div
                style={{
                  width: '120px',
                  flexShrink: 0,
                  backgroundColor: '#EFE4D1',
                  borderRight: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                  textAlign: 'center'
                }}
                className="storefront-plaque"
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: 'var(--color-burgundy)',
                    textTransform: 'uppercase',
                    lineHeight: 1.25
                  }}
                >
                  Artisan<br />Boulanger
                </div>
                <div style={{ width: '24px', height: '1px', backgroundColor: 'var(--color-gold)', margin: '0.75rem 0' }} />
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Épinay-sur-Orge
                </div>
              </div>

              {/* Photo */}
              <div style={{ flex: 1, minHeight: '260px' }}>
                <img
                  src="/assets/images/storefront.webp"
                  alt="Devanture authentique de la boulangerie La Carafa des Blés à Épinay-sur-Orge"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>

            {/* Right: Brand Narrative, Italic Headline, Signature & Flour Sack */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  color: 'var(--color-gold)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem'
                }}
              >
                {settings.story_kicker}
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  color: 'var(--color-burgundy)',
                  lineHeight: 1.15,
                  marginBottom: '1.5rem'
                }}
              >
                {settings.story_title}
              </h2>

              <p
                style={{
                  fontSize: '1.02rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-main)',
                  marginBottom: '0.85rem'
                }}
              >
                {settings.story_text_1}
              </p>

              <p
                style={{
                  fontSize: '1.02rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-muted)',
                  marginBottom: '2rem'
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
                    fontSize: '2.4rem',
                    fontStyle: 'italic',
                    color: 'var(--color-burgundy)',
                    lineHeight: 1
                  }}
                >
                  {settings.story_signature}
                </div>

                <div style={{ opacity: 0.75 }}>
                  <FlourSackIllustration width={150} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .hero-split-grid,
          .story-split-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-image-wrapper img {
            mask-image: none !important;
            -webkit-mask-image: none !important;
            height: 320px !important;
          }
        }
        @media (max-width: 480px) {
          .storefront-card {
            flex-direction: column !important;
          }
          .storefront-plaque {
            width: 100% !important;
            padding: 0.75rem !important;
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
