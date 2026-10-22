import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wheat, Coffee, Cake } from 'lucide-react';
import { ArtisanSeal } from '../components/brand/ArtisanSeal';
import { FlourSackIllustration } from '../components/brand/FlourSackIllustration';
import { WheatDecoration } from '../components/brand/WheatDecoration';
import { BakerySimpleMap } from '../components/BakerySimpleMap';
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

        {/* Right Background Image with smooth gradient fade to the left */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '56%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
            overflow: 'hidden'
          }}
          className="hero-right-bg"
        >
          <img
            src="/assets/images/hero-bread.webp"
            alt="Pains de tradition au levain cuits sur sole de pierre — La Carafa des Blés"
            loading="eager"
            fetchpriority="high"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 42%',
              display: 'block',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 45%, rgba(0,0,0,0.4) 75%, transparent 100%)',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 45%, rgba(0,0,0,0.4) 75%, transparent 100%)'
            }}
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '540px', padding: '4.5rem 0 4rem' }} className="hero-content-col">
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

            {/* Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.75rem, 5vw, 4.4rem)',
                fontWeight: 600,
                color: 'var(--color-burgundy)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                margin: '0 0 1.25rem',
                maxWidth: '460px'
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
        </div>
      </section>

      {/* 2. THREE PRODUCT CATEGORY CARDS SECTION (BURGUNDY BACKGROUND) */}
      <section
        style={{
          backgroundColor: 'var(--color-burgundy)',
          color: '#F8F3E8',
          padding: '4rem 0 4.5rem',
          borderTop: '2px solid var(--color-gold)',
          borderBottom: '2px solid var(--color-gold)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          {/* Section Editorial Header */}
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.75rem' }}>
            <div
              style={{
                color: 'var(--color-gold)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '0.65rem'
              }}
            >
              Nos Créations Artisanales
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                color: '#FFFFFF',
                marginBottom: '0.85rem'
              }}
            >
              Le Savoir-Faire de Notre Fournil
            </h2>
            <p style={{ color: 'var(--color-cream)', fontSize: '0.98rem', lineHeight: 1.6, margin: 0 }}>
              Découvrez nos trois gammes emblématiques, confectionnées chaque jour sur place avec passion et authenticité.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {/* Card 1: Pains de tradition */}
            <div
              style={{
                backgroundColor: '#FAF5EC',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--color-gold)',
                display: 'flex',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
              }}
              className="category-card"
            >
              <div style={{ width: '44%', flexShrink: 0 }}>
                <img
                  src={categoryImages['pains-de-tradition']}
                  alt="Pains de tradition au levain naturel"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: '1.6rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.45rem' }}>
                  <Wheat size={20} />
                </div>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--color-burgundy)', marginBottom: '0.45rem' }}>
                  Pains de tradition
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Façonnés à la main, cuits sur place, avec des farines de qualité.
                </p>
                <Link
                  to="/produits?category=pains-de-tradition"
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-burgundy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
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
                backgroundColor: '#FAF5EC',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--color-gold)',
                display: 'flex',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
              }}
              className="category-card"
            >
              <div style={{ width: '44%', flexShrink: 0 }}>
                <img
                  src={categoryImages['viennoiseries']}
                  alt="Viennoiseries pur beurre faites maison"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: '1.6rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.45rem' }}>
                  <Coffee size={20} />
                </div>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--color-burgundy)', marginBottom: '0.45rem' }}>
                  Viennoiseries
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Beurre de qualité, feuilletage pur beurre et dorure maison.
                </p>
                <Link
                  to="/produits?category=viennoiseries"
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-burgundy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
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
                backgroundColor: '#FAF5EC',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--color-gold)',
                display: 'flex',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
              }}
              className="category-card"
            >
              <div style={{ width: '44%', flexShrink: 0 }}>
                <img
                  src={categoryImages['patisseries-maison']}
                  alt="Pâtisseries artisanales faites avec soin"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: '1.6rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.45rem' }}>
                  <Cake size={20} />
                </div>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--color-burgundy)', marginBottom: '0.45rem' }}>
                  Pâtisseries maison
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Des créations gourmandes élaborées chaque jour avec soin.
                </p>
                <Link
                  to="/produits?category=patisseries-maison"
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--color-burgundy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
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

      {/* 4. DEDICATED STORE LOCATION & REACT-SIMPLE-MAPS SECTION */}
      <section
        id="localisation"
        style={{
          padding: '4.5rem 0 5rem',
          backgroundColor: 'var(--color-ivory)'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2.5rem' }}>
            <div
              style={{
                color: 'var(--color-gold)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem'
              }}
            >
              Plan d'accès & Localisation
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: 'var(--color-burgundy)',
                marginBottom: '1rem'
              }}
            >
              Venez nous rendre visite au fournil
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Située au <strong>15 Rue Pasteur à Épinay-sur-Orge</strong>, notre boulangerie artisanale vous accueille chaque jour pour savourer nos pains au levain et douceurs maison.
            </p>
          </div>

          {/* Dedicated react-simple-maps Component */}
          <BakerySimpleMap />
        </div>
      </section>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .hero-right-bg {
            width: 100% !important;
            opacity: 0.2 !important;
            mask-image: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%) !important;
            -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%) !important;
          }
          .hero-content-col {
            padding: 3rem 0 2.5rem !important;
          }
          .story-split-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
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
