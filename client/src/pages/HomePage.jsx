import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wheat, Coffee, Cake } from 'lucide-react';
import { ArtisanSeal } from '../components/brand/ArtisanSeal';
import { FlourSackIllustration } from '../components/brand/FlourSackIllustration';
import { WheatDecoration } from '../components/brand/WheatDecoration';
import { WheatEarWatermark } from '../components/brand/WheatEarWatermark';
import { BakerySimpleMap } from '../components/BakerySimpleMap';
import { api } from '../services/api';

function CroissantIcon({ size = 20, color = 'var(--color-gold)' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 16C5 10 8 5.5 12 5.5C16 5.5 19 10 20 16" />
      <path d="M4 16C6 14 8.5 13 12 13C15.5 13 18 14 20 16" />
      <path d="M8.5 7.5C8 9.5 8 12.5 8.5 14" />
      <path d="M12 5.5V13" />
      <path d="M15.5 7.5C16 9.5 16 12.5 15.5 14" />
    </svg>
  );
}

function SandwichIcon({ size = 20, color = 'var(--color-gold)' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 11h18a2 2 0 0 0 1-3.5C20.5 5 16.5 4 12 4S3.5 5 2 7.5A2 2 0 0 0 3 11z" />
      <path d="M4 14c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 2.5 1 2.5 1" />
      <path d="M3 17h18a1 1 0 0 1 1 1c0 1.5-2 2-10 2s-10-.5-10-2a1 1 0 0 1 1-1z" />
    </svg>
  );
}

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
    'patisseries-maison': '/assets/images/cat-patisseries.webp',
    'snacking-sale': '/assets/images/cat-snacking.webp'
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

      {/* 2. THREE PRODUCT CATEGORY CARDS SECTION (DARK NOBLE BURGUNDY BACKGROUND) */}
      <section
        style={{
          backgroundColor: '#2D0409',
          backgroundImage: 'radial-gradient(ellipse at 50% 30%, #3D0711 0%, #250307 100%)',
          color: '#F8F3E8',
          padding: '4rem 0 4.5rem',
          borderTop: '2px solid var(--color-gold)',
          borderBottom: '2px solid var(--color-gold)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle OneShoot Noun Project Wheat Ears Watermarks in Background */}
        <WheatEarWatermark
          size={300}
          opacity={0.09}
          color="var(--color-gold)"
          style={{ top: '-30px', left: '-25px', transform: 'rotate(-10deg)' }}
        />
        <WheatEarWatermark
          size={300}
          opacity={0.09}
          color="var(--color-gold)"
          style={{ bottom: '-40px', right: '-25px', transform: 'rotate(10deg)' }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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
              Découvrez nos quatre gammes emblématiques, confectionnées chaque jour sur place avec passion et authenticité.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {/* Card 1: Pains de tradition */}
            <div
              style={{
                backgroundColor: '#FAF5EC',
                borderRadius: 0,
                border: 'none',
                overflow: 'hidden',
                display: 'flex',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.22)',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
              }}
              className="category-card"
            >
              <div style={{ width: '45%', flexShrink: 0 }}>
                <img
                  src={categoryImages['pains-de-tradition']}
                  alt="Pains de tradition au levain naturel"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 0 }}
                />
              </div>
              <div style={{ padding: '1.6rem 1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.45rem' }}>
                  <Wheat size={20} />
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-burgundy)', marginBottom: '0.4rem' }}>
                  Pains de tradition
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.1rem' }}>
                  Façonnés à la main, cuits sur place, avec des farines de qualité.
                </p>
                <Link
                  to="/produits?category=pains-de-tradition"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    color: 'var(--color-burgundy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem'
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
                borderRadius: 0,
                border: 'none',
                overflow: 'hidden',
                display: 'flex',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.22)',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
              }}
              className="category-card"
            >
              <div style={{ width: '45%', flexShrink: 0 }}>
                <img
                  src={categoryImages['viennoiseries']}
                  alt="Viennoiseries pur beurre faites maison"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 0 }}
                />
              </div>
              <div style={{ padding: '1.6rem 1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.45rem' }}>
                  <CroissantIcon size={20} color="var(--color-gold)" />
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-burgundy)', marginBottom: '0.4rem' }}>
                  Viennoiseries
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.1rem' }}>
                  Beurre de qualité, feuilletage pur beurre et dorure maison.
                </p>
                <Link
                  to="/produits?category=viennoiseries"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    color: 'var(--color-burgundy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem'
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
                borderRadius: 0,
                border: 'none',
                overflow: 'hidden',
                display: 'flex',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.22)',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
              }}
              className="category-card"
            >
              <div style={{ width: '45%', flexShrink: 0 }}>
                <img
                  src={categoryImages['patisseries-maison']}
                  alt="Pâtisseries artisanales faites avec soin"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 0 }}
                />
              </div>
              <div style={{ padding: '1.6rem 1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.45rem' }}>
                  <Cake size={20} />
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-burgundy)', marginBottom: '0.4rem' }}>
                  Pâtisseries maison
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.1rem' }}>
                  Des créations gourmandes élaborées chaque jour avec soin.
                </p>
                <Link
                  to="/produits?category=patisseries-maison"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    color: 'var(--color-burgundy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  <span>Voir la sélection</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card 4: Snacking & Salé */}
            <div
              style={{
                backgroundColor: '#FAF5EC',
                borderRadius: 0,
                border: 'none',
                overflow: 'hidden',
                display: 'flex',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.22)',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
              }}
              className="category-card"
            >
              <div style={{ width: '45%', flexShrink: 0 }}>
                <img
                  src={categoryImages['snacking-sale']}
                  alt="Snacking salé, sandwichs frais et quiches dorées maison"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 0 }}
                />
              </div>
              <div style={{ padding: '1.6rem 1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: 'var(--color-gold)', marginBottom: '0.45rem' }}>
                  <SandwichIcon size={20} color="var(--color-gold)" />
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-burgundy)', marginBottom: '0.4rem' }}>
                  Snacking & Salé
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.1rem' }}>
                  Sandwichs frais, quiches dorées et déjeuners sur le pouce.
                </p>
                <Link
                  to="/produits?category=snacking-sale"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    color: 'var(--color-burgundy)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem'
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

      {/* 3. "NOTRE HISTOIRE & SAVOIR-FAIRE" EDITORIAL ARTISAN SHOWCASE */}
      <section
        id="notre-histoire"
        style={{
          padding: '6rem 0',
          backgroundColor: '#FAF5EA',
          borderTop: '1px solid rgba(183, 138, 61, 0.22)',
          borderBottom: '1px solid rgba(183, 138, 61, 0.22)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Background Watermark Accent */}
        <WheatDecoration
          style={{
            top: '-40px',
            right: '-20px',
            transform: 'rotate(22deg)',
            pointerEvents: 'none'
          }}
          opacity={0.12}
          width={220}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section Header with Haute Artisan Styling */}
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'var(--color-gold)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              <span style={{ width: '28px', height: '1px', backgroundColor: 'var(--color-gold)' }} />
              <span>{settings.story_kicker || 'NOTRE HISTOIRE & SAVOIR-FAIRE'}</span>
              <span style={{ width: '28px', height: '1px', backgroundColor: 'var(--color-gold)' }} />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.2vw, 3.4rem)',
                fontWeight: 600,
                color: 'var(--color-burgundy)',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
                letterSpacing: '-0.01em'
              }}
            >
              {settings.story_title || 'Le Savoir-Faire, Chaque Jour.'}
            </h2>
            <p
              style={{
                fontSize: '1.08rem',
                lineHeight: 1.8,
                color: '#554840',
                margin: 0,
                fontWeight: 400
              }}
            >
              {settings.story_text_1}
            </p>
          </div>

          {/* 2-Column Creative Editorial Story Layout (NO BOXES, NO RADIUS) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(320px, 1fr) minmax(360px, 1.25fr)',
              gap: '4.5rem',
              alignItems: 'start'
            }}
            className="savoir-faire-grid"
          >
            {/* Left Column: Authentic Atelier Gallery Frame & Free-Flowing Quote */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {/* Gallery Print Presentation (Zero border-radius, clean architectural lines) */}
              <div style={{ position: 'relative' }}>
                {/* Vintage Offset Fine Line Accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    right: '10px',
                    bottom: '10px',
                    border: '1px solid rgba(183, 138, 61, 0.45)',
                    pointerEvents: 'none'
                  }}
                  aria-hidden="true"
                />

                {/* Main Photo: Sharp clean corners, authentic look */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0 25px 50px -12px rgba(45, 4, 9, 0.18)',
                    backgroundColor: '#EFE7DA'
                  }}
                >
                  <img
                    src="/assets/images/storefront.webp"
                    alt="Devanture authentique et artisans de la boulangerie La Carafa des Blés à Épinay-sur-Orge"
                    style={{
                      width: '100%',
                      height: '380px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />

                  {/* Refined Brass Plate Atelier Label */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(42, 6, 11, 0.92)',
                      backdropFilter: 'blur(6px)',
                      padding: '0.65rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(212, 171, 101, 0.35)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Wheat size={14} color="var(--color-gold)" />
                      <span
                        style={{
                          color: '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase'
                        }}
                      >
                        Fournil 100% Artisanal
                      </span>
                    </div>
                    <span
                      style={{
                        color: 'var(--color-gold-light)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic'
                      }}
                    >
                      Épinay-sur-Orge
                    </span>
                  </div>
                </div>
              </div>

              {/* Artisan Quote (Pure Typography, No Box, No Border, No Radius) */}
              <div
                style={{
                  position: 'relative',
                  paddingLeft: '1.75rem',
                  borderLeft: '2px solid var(--color-gold)',
                  marginTop: '0.5rem'
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontStyle: 'italic',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.22rem',
                    color: 'var(--color-burgundy)',
                    lineHeight: 1.6,
                    fontWeight: 500
                  }}
                >
                  « {settings.story_text_2} »
                </p>
                <div
                  style={{
                    marginTop: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--color-gold)' }} />
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--color-gold)'
                    }}
                  >
                    Artisan Boulanger · Maison Fondée sur la Tradition
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Les 3 Rituels du Fournil (Editorial List, Zero Box Cards, Zero Radius) */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Column Eyebrow */}
              <div
                style={{
                  paddingBottom: '1rem',
                  borderBottom: '1px solid rgba(183, 138, 61, 0.35)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-burgundy)'
                  }}
                >
                  Les Rituels du Fournil
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: '0.92rem',
                    color: 'var(--color-gold)'
                  }}
                >
                  Excellence & Gestes Purs
                </span>
              </div>

              {/* Pillar 01 */}
              <div className="savoir-pillar-item">
                <div className="pillar-numeral">01</div>
                <div className="pillar-body">
                  <div className="pillar-badge">LE TERROIR & LA FARINE</div>
                  <h3 className="pillar-title">Farines 100% Françaises Sélectionnées</h3>
                  <p className="pillar-desc">
                    Issus de minoteries régionales responsables, nos blés sont moulus sans additifs chimiques afin de préserver l'intégrité nutritionnelle, la saveur originelle et le respect des terres françaises.
                  </p>
                </div>
              </div>

              {/* Pillar 02 */}
              <div className="savoir-pillar-item">
                <div className="pillar-numeral">02</div>
                <div className="pillar-body">
                  <div className="pillar-badge">LE TEMPS & L'ALCHIMIE</div>
                  <h3 className="pillar-title">Levain Naturel & Fermentation Lente</h3>
                  <p className="pillar-desc">
                    Une pousse lente et patiente de 18 à 24 heures en chambre pour développer une mie alvéolée nacrée, des notes délicates de noisette et une digestibilité incomparable au fil des jours.
                  </p>
                </div>
              </div>

              {/* Pillar 03 */}
              <div className="savoir-pillar-item" style={{ borderBottom: '1px solid rgba(183, 138, 61, 0.35)' }}>
                <div className="pillar-numeral">03</div>
                <div className="pillar-body">
                  <div className="pillar-badge">LE TOUR DE MAIN</div>
                  <h3 className="pillar-title">Façonnage Manuel & Pur Beurre AOP</h3>
                  <p className="pillar-desc">
                    Zéro produit industriel, zéro surgélation. Chaque viennoiserie est façonnée à la main au pur beurre, chaque baguette incisée d'un coup de lame précis et cuite sur sole au quotidien.
                  </p>
                </div>
              </div>

              {/* Signature & Editorial Navigation Link */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '2rem',
                  flexWrap: 'wrap',
                  gap: '1.5rem'
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '2.8rem',
                      fontStyle: 'italic',
                      color: 'var(--color-burgundy)',
                      lineHeight: 1,
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {settings.story_signature || 'La Carafa des Blés'}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#8A7A70',
                      marginTop: '0.35rem'
                    }}
                  >
                    Boulangerie & Pâtisserie Fine d'Épinay-sur-Orge
                  </div>
                </div>

                <a
                  href="#localisation"
                  className="savoir-cta-link"
                >
                  <span>Venir au Fournil</span>
                  <ArrowRight size={16} className="cta-arrow" />
                </a>
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

      {/* Responsive adjustments & Savoir-Faire Editorial Styles */}
      <style>{`
        /* Savoir-Faire Editorial Pillar - Pure Craftsmanship (Zero Box, Zero Radius) */
        .savoir-pillar-item {
          display: flex;
          gap: 1.6rem;
          align-items: flex-start;
          padding: 1.45rem 0;
          border-top: 1px solid rgba(183, 138, 61, 0.24);
          transition: transform 0.3s ease;
          background: transparent;
        }

        .savoir-pillar-item:hover .pillar-numeral {
          color: var(--color-burgundy);
          transform: translateX(4px);
        }

        .savoir-pillar-item:hover .pillar-title {
          color: var(--color-gold);
        }

        .pillar-numeral {
          font-family: var(--font-serif);
          font-size: 2.3rem;
          font-weight: 500;
          font-style: italic;
          color: var(--color-gold);
          line-height: 1;
          min-width: 44px;
          transition: all 0.3s ease;
          user-select: none;
        }

        .pillar-body {
          flex: 1;
        }

        .pillar-badge {
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 0.3rem;
        }

        .pillar-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--color-burgundy);
          margin-bottom: 0.45rem;
          line-height: 1.25;
          transition: color 0.25s ease;
        }

        .pillar-desc {
          margin: 0;
          font-size: 0.92rem;
          color: #63554D;
          line-height: 1.68;
        }

        .savoir-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-burgundy);
          padding: 0.5rem 0;
          position: relative;
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .savoir-cta-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--color-gold);
          transition: background-color 0.3s ease;
        }

        .savoir-cta-link:hover {
          color: var(--color-gold);
        }

        .savoir-cta-link:hover::after {
          background-color: var(--color-burgundy);
        }

        .savoir-cta-link:hover .cta-arrow {
          transform: translateX(5px);
        }

        .cta-arrow {
          transition: transform 0.25s ease;
        }

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
          .savoir-faire-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
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
