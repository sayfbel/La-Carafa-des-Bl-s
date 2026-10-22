import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Wheat, Coffee, Cake } from 'lucide-react';
import { ArtisanSeal } from '../components/brand/ArtisanSeal';
import { FlourSackIllustration } from '../components/brand/FlourSackIllustration';
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
      story_text: 'Artisans boulangers-pâtissiers à Épinay-sur-Orge, nous mettons tout notre cœur dans la préparation de pains authentiques et de pâtisseries maison. Notre exigence : des produits savoureux, un accueil chaleureux et le respect des traditions artisanales.',
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

  // Category card image map matching reference
  const categoryImages = {
    'pains-de-tradition': '/assets/images/cat-pains.webp',
    'viennoiseries': '/assets/images/cat-viennoiseries.webp',
    'patisseries-maison': '/assets/images/cat-patisseries.webp'
  };

  const categoryIcons = {
    'pains-de-tradition': Wheat,
    'viennoiseries': Coffee,
    'patisseries-maison': Cake
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          padding: '4rem 0 3rem',
          backgroundColor: 'var(--color-ivory)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(300px, 1.15fr) minmax(300px, 1.25fr)',
              gap: '3rem',
              alignItems: 'center'
            }}
            className="hero-grid"
          >
            {/* Left Content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Kicker */}
              <div
                style={{
                  color: 'var(--color-gold)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{settings.homepage_hero_kicker}</span>
              </div>

              {/* Headline */}
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.75rem, 5.5vw, 4.4rem)',
                  fontWeight: 600,
                  color: 'var(--color-burgundy)',
                  lineHeight: 1.08,
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.01em'
                }}
              >
                {settings.homepage_hero_title}
              </h1>

              {/* Decorative small divider line */}
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
                  fontSize: '1.1rem',
                  color: 'var(--color-text-main)',
                  lineHeight: 1.6,
                  maxWidth: '480px',
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
                  gap: '2.5rem',
                  flexWrap: 'wrap'
                }}
              >
                <Link
                  to="/produits"
                  className="btn btn-primary"
                  style={{
                    padding: '0.9rem 2.2rem',
                    fontSize: '1.02rem',
                    letterSpacing: '0.02em',
                    boxShadow: 'var(--shadow-burgundy)'
                  }}
                >
                  <span>{settings.homepage_hero_cta}</span>
                  <ArrowRight size={18} />
                </Link>

                <div style={{ transform: 'rotate(-5deg)' }}>
                  <ArtisanSeal size={105} />
                </div>
              </div>
            </div>

            {/* Right Hero Image (Large Crusty Artisan Bread) */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(56, 7, 14, 0.12)',
                  border: '1px solid var(--color-border-subtle)',
                  position: 'relative'
                }}
              >
                <img
                  src="/assets/images/hero-bread.webp"
                  alt="Pains artisanaux au levain cuits sur sole de pierre"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE CATEGORY CARDS SECTION */}
      <section style={{ padding: '2.5rem 0 4.5rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
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
              <div style={{ width: '45%', flexShrink: 0 }}>
                <img
                  src={categoryImages['pains-de-tradition']}
                  alt="Pains de tradition artisanale"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-gold)', marginBottom: '0.4rem' }}>
                  <Wheat size={18} />
                </div>
                <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem' }}>Pains de tradition</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Façonnés à la main, cuits sur place, avec des farines de qualité.
                </p>
                <Link
                  to="/produits?category=pains-de-tradition"
                  style={{
                    fontSize: '0.9rem',
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
              <div style={{ width: '45%', flexShrink: 0 }}>
                <img
                  src={categoryImages['viennoiseries']}
                  alt="Viennoiseries pur beurre faites maison"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-gold)', marginBottom: '0.4rem' }}>
                  <Coffee size={18} />
                </div>
                <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem' }}>Viennoiseries</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Beurre de qualité, feuilletage pur beurre et dorure maison.
                </p>
                <Link
                  to="/produits?category=viennoiseries"
                  style={{
                    fontSize: '0.9rem',
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
              <div style={{ width: '45%', flexShrink: 0 }}>
                <img
                  src={categoryImages['patisseries-maison']}
                  alt="Pâtisseries artisanales fines"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-gold)', marginBottom: '0.4rem' }}>
                  <Cake size={18} />
                </div>
                <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem' }}>Pâtisseries maison</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Des créations gourmandes élaborées chaque jour avec soin.
                </p>
                <Link
                  to="/produits?category=patisseries-maison"
                  style={{
                    fontSize: '0.9rem',
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

      {/* 3. "NOTRE HISTOIRE" EDITORIAL SECTION WITH AUTHENTIC STOREFRONT PHOTO */}
      <section
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
            className="story-grid"
          >
            {/* Left : Real Bakery Storefront and Artisan Bakers */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <img
                  src="/assets/images/storefront.webp"
                  alt="Devanture authentique de la boulangerie La Carafa des Blés à Épinay-sur-Orge"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              {/* Badge Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  backgroundColor: 'rgba(248, 243, 232, 0.95)',
                  backdropFilter: 'blur(4px)',
                  padding: '0.5rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'var(--color-burgundy)',
                  textTransform: 'uppercase'
                }}
              >
                ARTISAN BOULANGER • ÉPINAY-SUR-ORGE
              </div>
            </div>

            {/* Right : Brand Narrative */}
            <div>
              <div
                style={{
                  color: 'var(--color-gold)',
                  fontSize: '0.88rem',
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
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                  fontWeight: 500
                }}
              >
                {settings.story_title}
              </h2>

              <p
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-main)',
                  marginBottom: '2rem'
                }}
              >
                {settings.story_text}
              </p>

              {/* Signature & Flour Sack Sketch */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '2rem',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '1.5rem'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    fontStyle: 'italic',
                    color: 'var(--color-burgundy)'
                  }}
                >
                  {settings.story_signature}
                </div>

                <FlourSackIllustration width={130} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid, .story-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
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
