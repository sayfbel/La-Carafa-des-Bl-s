import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { ArtisanSeal } from '../components/brand/ArtisanSeal';
import { WheatEarWatermark } from '../components/brand/WheatEarWatermark';
import { BakeryMap } from '../components/BakeryMap';
import { api } from '../services/api';
import { getStoreLiveStatus } from '../utils/storeStatus';

export function HomePage() {
  const [content, setContent] = useState({
    settings: {
      homepage_hero_title: 'Le goût des bonnes choses.',
      homepage_hero_subtitle: 'Boulangerie et pâtisserie artisanale à Épinay-sur-Orge. Pains au levain naturel, viennoiseries pur beurre et créations du jour façonnées à la main.',
      homepage_hero_cta: 'Découvrir nos créations',
      story_title: 'Le savoir-faire, chaque jour.',
      story_text_1: 'Artisans boulangers-pâtissiers à Épinay-sur-Orge, nous mettons tout notre cœur dans la préparation de pains authentiques et de pâtisseries maison.',
      story_text_2: 'Notre exigence : des produits savoureux, un accueil chaleureux et le respect des traditions artisanales.',
      story_signature: 'La Carafa des Blés'
    },
    categories: []
  });

  const [activeMoment, setActiveMoment] = useState('matin');

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
  const storeStatus = getStoreLiveStatus(settings);

  const moments = [
    {
      id: 'matin',
      title: 'Matinée Croustillante',
      hours: '06h30 – 11h00',
      headline: 'Premières fournées dorées et viennoiseries pur beurre',
      description: 'Dès l’aube, les baguettes de tradition sortent brûlantes du four à sole de pierre. Le feuilletage de nos croissants et pains au chocolat croustille sous la dent, élaboré exclusivement au beurre AOP Charentes-Poitou.',
      recommendations: ['Baguette Tradition Française', 'Croissant pur beurre', 'Pain au chocolat feuilleté', 'Pain de mie artisanal'],
      highlight: 'Cuisson en continu dès 06h30'
    },
    {
      id: 'midi',
      title: 'Pause Déjeuner Fraîche',
      hours: '11h30 – 14h00',
      headline: 'Sandwichs préparés minute sur pain du jour et quiches dorées',
      description: 'Pour votre pause déjeuner, nos garnitures généreuses et fraîches s’associent à nos pains croustillants. Nos quiches lorraines et tartes salées sont garnies d’ingrédients de saison et cuites chaque matin.',
      recommendations: ['Le Parisien beurre fermier', 'Quiche Lorraine maison', 'Focaccia aux herbes de Provence', 'Formule Déjeuner'],
      highlight: 'Pains cuits du matin même'
    },
    {
      id: 'gouter',
      title: 'Le Goûter Gourmand',
      hours: '15h30 – 17h30',
      headline: 'Pâtisseries fines et douceurs d’enfance pour petits et grands',
      description: 'L’heure du thé et du goûter se savoure avec nos éclairs au chocolat grand cru, tartes aux fruits frais du marché et financiers fondants. Chaque pâtisserie est confectionnée sur place sans aucun produit surgelé.',
      recommendations: ['Éclair au chocolat noir', 'Tartelette framboises', 'Brioche pur beurre', 'Chouquettes au sucre perlé'],
      highlight: '100% fait maison chaque jour'
    },
    {
      id: 'diner',
      title: 'La Table du Soir',
      hours: '17h30 – 19h30',
      headline: 'Pains au levain de garde et miches rustiques pour le dîner',
      description: 'Retrouvez nos pains spéciaux à fermentation lente de 24h : pain de campagne, tourte de meule, seigle complet ou pain aux graines. Leur mie alvéolée et leur croûte caramélisée accompagnent vos repas de famille.',
      recommendations: ['Pain de Campagne au levain', 'Tourte de Meule T80', 'Pain aux Céréales & Graines', 'Pain de Seigle'],
      highlight: 'Conservation naturelle 3 à 4 jours'
    }
  ];

  const currentMomentData = moments.find(m => m.id === activeMoment) || moments[0];

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* 1. HERO SECTION — MONUMENTAL ARTISANAL EDITORIAL (TASTESKILL DIRECTION) */}
      <section
        style={{
          position: 'relative',
          padding: '4.5rem 0 3.5rem',
          backgroundColor: '#F8F3EA',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-editorial-grid">
            {/* Left Content Column */}
            <div className="hero-text-block">
              {/* Fournil Live Status Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.4rem 0.95rem',
                  backgroundColor: storeStatus.isOpen ? '#ECFDF5' : '#FEF2F2',
                  border: storeStatus.isOpen ? '1px solid #10B981' : '1px solid #F87171',
                  color: storeStatus.isOpen ? '#065F46' : '#991B1B',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: storeStatus.isOpen ? '#10B981' : '#EF4444',
                    display: 'inline-block'
                  }}
                />
                <span>{storeStatus.badgeText}</span>
                <span style={{ opacity: 0.6 }}>•</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 500 }}>Épinay-sur-Orge</span>
              </div>

              {/* Confident Headline — 2 lines max */}
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.5rem, 4.8vw, 4.2rem)',
                  fontWeight: 600,
                  color: 'var(--color-burgundy)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  margin: '0 0 1.35rem'
                }}
              >
                {settings.homepage_hero_title || 'Le goût des bonnes choses.'}
              </h1>

              {/* Supporting Statement */}
              <p
                style={{
                  fontSize: '1.08rem',
                  color: '#4A3E39',
                  lineHeight: 1.65,
                  margin: '0 0 2.25rem',
                  maxWidth: '520px'
                }}
              >
                <span style={{ display: 'block', color: 'var(--color-burgundy)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  {settings.homepage_hero_kicker || 'Boulangerie • Pâtisserie Artisanale'}
                </span>
                {settings.homepage_hero_subtitle}
              </p>

              {/* Actions & Artisanal Seal */}
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
                    padding: '0.9rem 2.25rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    backgroundColor: 'var(--color-burgundy)',
                    color: '#FFFFFF'
                  }}
                >
                  <span>{settings.homepage_hero_cta || 'Découvrir nos créations'}</span>
                  <ArrowRight size={16} />
                </Link>

                <a
                  href="#localisation"
                  style={{
                    color: 'var(--color-burgundy)',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <MapPin size={16} color="var(--color-gold)" />
                  <span>15 Rue Pasteur, 91360</span>
                </a>
              </div>

              {/* Quality Assurances */}
              <div className="hero-quality-row">
                <div className="quality-item">
                  <ShieldCheck size={16} color="var(--color-gold)" />
                  <span>Farines françaises Label Rouge</span>
                </div>
                <div className="quality-item">
                  <Clock size={16} color="var(--color-gold)" />
                  <span>Levain naturel & fermentation 24h</span>
                </div>
              </div>
            </div>

            {/* Right Media Frame */}
            <div className="hero-media-block">
              <div className="hero-main-frame">
                <img
                  src="/assets/images/hero-bread.webp"
                  alt="Pains de tradition au levain naturel cuits sur sole de pierre — La Carafa des Blés"
                  loading="eager"
                  fetchpriority="high"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div className="hero-badge-corner">
                  <ArtisanSeal size={96} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE INTERACTIVE FEATURE: LES FOURNÉES DU JOUR (TASTESKILL "ONE LIVE THING") */}
      <section
        style={{
          padding: '5rem 0',
          backgroundColor: '#FFFFFF',
          position: 'relative'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.8vw, 2.9rem)',
                color: 'var(--color-burgundy)',
                lineHeight: 1.15,
                margin: '0 0 0.75rem'
              }}
            >
              Le Rythme du Fournil
            </h2>
            <p style={{ fontSize: '1.02rem', color: '#66564E', lineHeight: 1.6, margin: 0 }}>
              Choisissez votre moment pour découvrir les fournées chaudes et les spécialités de l’artisan.
            </p>
          </div>

          {/* Moment Tabs */}
          <div className="moments-nav-row" role="tablist">
            {moments.map(m => {
              const isSelected = m.id === activeMoment;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveMoment(m.id)}
                  className={`moment-tab-btn ${isSelected ? 'active' : ''}`}
                >
                  <span className="moment-tab-time">{m.hours}</span>
                  <span className="moment-tab-title">{m.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Moment Display Card */}
          <div className="moment-detail-stage">
            <div className="moment-detail-left">
              <div className="moment-highlight-tag">
                <Sparkles size={14} color="var(--color-gold)" />
                <span>{currentMomentData.highlight}</span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.95rem)',
                  color: 'var(--color-burgundy)',
                  lineHeight: 1.25,
                  margin: '0 0 1rem'
                }}
              >
                {currentMomentData.headline}
              </h3>
              <p style={{ fontSize: '0.96rem', color: '#554740', lineHeight: 1.7, margin: '0 0 1.75rem' }}>
                {currentMomentData.description}
              </p>
              <Link
                to="/produits"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--color-burgundy)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none'
                }}
              >
                <span>Consulter toute la carte</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="moment-detail-right">
              <div className="recs-box-label">Sorties du four & Suggestions :</div>
              <div className="recs-list">
                {currentMomentData.recommendations.map((item, idx) => (
                  <div key={idx} className="rec-item">
                    <span className="rec-bullet" />
                    <span className="rec-name">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE DES CRÉATIONS — CURATED ARTISAN EXHIBITION */}
      <section
        style={{
          backgroundColor: '#2A060B',
          color: '#FAF5EA',
          padding: '5.5rem 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <WheatEarWatermark
          size={320}
          opacity={0.06}
          color="var(--color-gold)"
          style={{ top: '-40px', right: '-40px', transform: 'rotate(15deg)' }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#FFFFFF',
                lineHeight: 1.15,
                margin: '0 0 0.85rem'
              }}
            >
              Nos Quatre Savoir-Faire
            </h2>
            <p style={{ color: '#E4D7C8', fontSize: '1.02rem', lineHeight: 1.6, margin: 0 }}>
              Chaque gamme est travaillée sur place selon les règles de l’artisanat traditionnel français.
            </p>
          </div>

          <div className="creations-mosaic-grid">
            {/* Item 1: Pains de tradition */}
            <div className="creation-mosaic-item">
              <div className="creation-mosaic-img">
                <img
                  src="/assets/images/cat-pains.webp"
                  alt="Pains de tradition au levain naturel cuits sur sole de pierre"
                  loading="lazy"
                />
              </div>
              <div className="creation-mosaic-body">
                <h3 className="creation-item-title">Pains de Tradition & Meule</h3>
                <p className="creation-item-desc">
                  Farines de blés français Label Rouge, eau pure, sel de mer et levain naturel nourri chaque jour. Pousse lente de 24 heures pour une mie aérée et alvéolée.
                </p>
                <Link to="/produits?category=pains-de-tradition" className="creation-item-link">
                  <span>Découvrir nos pains</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Item 2: Viennoiseries */}
            <div className="creation-mosaic-item">
              <div className="creation-mosaic-img">
                <img
                  src="/assets/images/cat-viennoiseries.webp"
                  alt="Viennoiseries pur beurre faites maison"
                  loading="lazy"
                />
              </div>
              <div className="creation-mosaic-body">
                <h3 className="creation-item-title">Viennoiserie Fine Pur Beurre</h3>
                <p className="creation-item-desc">
                  Feuilletage artisanal réalisé avec du beurre AOP de Charentes-Poitou. Croissants croustillants, pains au chocolat fondants et brioches dorées chaque matin.
                </p>
                <Link to="/produits?category=viennoiseries" className="creation-item-link">
                  <span>Découvrir nos viennoiseries</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Item 3: Pâtisseries */}
            <div className="creation-mosaic-item">
              <div className="creation-mosaic-img">
                <img
                  src="/assets/images/cat-patisseries.webp"
                  alt="Pâtisseries fines et créations maison"
                  loading="lazy"
                />
              </div>
              <div className="creation-mosaic-body">
                <h3 className="creation-item-title">Pâtisseries & Entremets Maison</h3>
                <p className="creation-item-desc">
                  Des classiques de la pâtisserie française équilibrés en sucre, sublimés par des chocolats de grands crus et des fruits de saison fraîchement coupés.
                </p>
                <Link to="/produits?category=patisseries-maison" className="creation-item-link">
                  <span>Découvrir nos douceurs</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Item 4: Snacking salé */}
            <div className="creation-mosaic-item">
              <div className="creation-mosaic-img">
                <img
                  src="/assets/images/cat-snacking.webp"
                  alt="Snacking salé, sandwichs frais et quiches dorées"
                  loading="lazy"
                />
              </div>
              <div className="creation-mosaic-body">
                <h3 className="creation-item-title">Snacking & Traiteur Salé</h3>
                <p className="creation-item-desc">
                  Sandwichs confectionnés chaque matin sur baguette fraîche, focaccias à l’huile d’olive vierge et quiches traditionnelles pour vos déjeuners à emporter.
                </p>
                <Link to="/produits?category=snacking-sale" className="creation-item-link">
                  <span>Découvrir le salé</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NOTRE HISTOIRE & SAVOIR-FAIRE (NO 01/02/03 NUMBERS, PURE CRAFT PILLARS) */}
      <section
        id="notre-histoire"
        style={{
          padding: '6rem 0',
          backgroundColor: '#FAF5EA',
          position: 'relative'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.2vw, 3.4rem)',
                fontWeight: 600,
                color: 'var(--color-burgundy)',
                lineHeight: 1.15,
                margin: '0 0 1rem',
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
                margin: 0
              }}
            >
              {settings.story_text_1}
            </p>
          </div>

          <div className="savoir-artisan-grid">
            {/* Left Photo & Artisan Quote */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="storefront-photo-frame">
                <img
                  src="/assets/images/storefront.webp"
                  alt="Devanture authentique et fournil de La Carafa des Blés à Épinay-sur-Orge"
                  style={{
                    width: '100%',
                    height: '380px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div className="storefront-caption-strip">
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>Fournil Artisanal d'Épinay-sur-Orge</span>
                  <span style={{ color: 'var(--color-gold-light)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>15 Rue Pasteur</span>
                </div>
              </div>

              <blockquote
                style={{
                  margin: 0,
                  padding: '1.25rem 1.5rem',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-burgundy)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.18rem',
                  fontStyle: 'italic',
                  lineHeight: 1.6
                }}
              >
                « {settings.story_text_2} »
              </blockquote>
            </div>

            {/* Right Craft Pillars (Pure Essence, Zero Index Numbering) */}
            <div className="pillars-container">
              {/* Pillar A */}
              <div className="craft-pillar">
                <div className="pillar-heading-block">
                  <span className="pillar-theme">Le Terroir & La Terre</span>
                  <h3 className="pillar-main-title">Farines 100% Françaises Sélectionnées</h3>
                </div>
                <p className="pillar-text">
                  Issus de minoteries régionales responsables, nos blés sont garantis sans additifs chimiques afin de préserver l’intégrité nutritionnelle, la saveur originelle et le respect des sols.
                </p>
              </div>

              {/* Pillar B */}
              <div className="craft-pillar">
                <div className="pillar-heading-block">
                  <span className="pillar-theme">Le Temps & L'Alchimie</span>
                  <h3 className="pillar-main-title">Levain Naturel & Fermentation Lente</h3>
                </div>
                <p className="pillar-text">
                  Une fermentation patiente de 18 à 24 heures en chambre pour développer une mie alvéolée nacrée, des notes subtiles de noisette et une haute digestibilité naturelle.
                </p>
              </div>

              {/* Pillar C */}
              <div className="craft-pillar">
                <div className="pillar-heading-block">
                  <span className="pillar-theme">Le Geste & La Cuisson</span>
                  <h3 className="pillar-main-title">Façonnage Manuel & Cuisson sur Sole</h3>
                </div>
                <p className="pillar-text">
                  Zéro produit industriel, zéro surgélation. Chaque viennoiserie est façonnée à la main au beurre AOP, chaque baguette incisée d’un coup de lame précis et cuite sur sole au quotidien.
                </p>
              </div>

              {/* Signature */}
              <div className="artisan-signature-row">
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.5rem',
                    fontStyle: 'italic',
                    color: 'var(--color-burgundy)',
                    lineHeight: 1
                  }}
                >
                  {settings.story_signature || 'La Carafa des Blés'}
                </div>
                <a href="#localisation" className="link-to-map">
                  <span>Venir au Fournil</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOCALISATION & HORAIRES D'OUVERTURE AVEC GOOGLE MAPS OFFICIEL */}
      <section
        id="localisation"
        style={{
          padding: '6rem 0',
          backgroundColor: '#FFFFFF',
          position: 'relative'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.2vw, 3.4rem)',
                fontWeight: 600,
                color: 'var(--color-burgundy)',
                lineHeight: 1.15,
                margin: '0 0 1rem',
                letterSpacing: '-0.01em'
              }}
            >
              Venez Nous Rendre Visite au Fournil
            </h2>
            <p
              style={{
                fontSize: '1.08rem',
                lineHeight: 1.8,
                color: '#554840',
                margin: 0
              }}
            >
              Située au <strong>15 Rue Pasteur à Épinay-sur-Orge</strong>, notre boulangerie artisanale vous accueille chaque jour pour savourer nos créations au levain naturel et nos spécialités de tradition.
            </p>
          </div>

          {/* Official Google Maps & Visitor Hub */}
          <BakeryMap settings={settings} />
        </div>
      </section>

      {/* Tasteskill Pure CSS Stylesheet */}
      <style>{`
        /* Hero Grid */
        .hero-editorial-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-quality-row {
          display: flex;
          gap: 1.75rem;
          margin-top: 2.25rem;
          flex-wrap: wrap;
        }

        .quality-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: #5A4B44;
        }

        .hero-main-frame {
          position: relative;
          height: 480px;
          background-color: #E6DBCF;
          overflow: hidden;
        }

        .hero-badge-corner {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          transform: rotate(-6deg);
        }

        /* Moments Interactive Bar */
        .moments-nav-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .moment-tab-btn {
          flex: 1;
          min-width: 180px;
          padding: 1rem 1.25rem;
          background-color: #FAF5EA;
          border: none;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }

        .moment-tab-btn:hover {
          background-color: #F0E6D5;
        }

        .moment-tab-btn.active {
          background-color: var(--color-burgundy);
          color: #FFFFFF;
        }

        .moment-tab-time {
          display: block;
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.75;
          margin-bottom: 0.25rem;
        }

        .moment-tab-title {
          display: block;
          font-size: 0.95rem;
          font-weight: 700;
        }

        /* Moment Detail Stage */
        .moment-detail-stage {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 3rem;
          padding: 2.5rem;
          background-color: #FAF5EA;
          align-items: center;
        }

        .moment-highlight-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 0.85rem;
        }

        .recs-box-label {
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--color-burgundy);
          margin-bottom: 1rem;
        }

        .recs-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .rec-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background-color: #FFFFFF;
          padding: 0.75rem 1rem;
        }

        .rec-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--color-gold);
        }

        .rec-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-burgundy);
        }

        /* Creations Mosaic Grid */
        .creations-mosaic-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.75rem;
        }

        .creation-mosaic-item {
          background-color: #38080F;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease;
        }

        .creation-mosaic-item:hover {
          transform: translateY(-4px);
        }

        .creation-mosaic-img {
          height: 220px;
          overflow: hidden;
        }

        .creation-mosaic-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .creation-mosaic-item:hover .creation-mosaic-img img {
          transform: scale(1.05);
        }

        .creation-mosaic-body {
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .creation-item-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: #FFFFFF;
          margin: 0 0 0.65rem;
          line-height: 1.25;
        }

        .creation-item-desc {
          font-size: 0.88rem;
          color: #E2D4C5;
          line-height: 1.6;
          margin: 0 0 1.25rem;
          flex: 1;
        }

        .creation-item-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-gold-light);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .creation-item-link:hover {
          color: #FFFFFF;
        }

        /* Savoir-Faire Artisan Grid */
        .savoir-artisan-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 4rem;
          align-items: start;
        }

        .storefront-photo-frame {
          position: relative;
          background-color: #EFE7DA;
        }

        .storefront-caption-strip {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(42, 6, 11, 0.92);
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          justifyContent: space-between;
          font-size: 0.8rem;
        }

        .pillars-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .craft-pillar {
          padding-bottom: 1.5rem;
        }

        .pillar-theme {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-gold);
          display: block;
          margin-bottom: 0.25rem;
        }

        .pillar-main-title {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--color-burgundy);
          margin: 0 0 0.5rem;
          line-height: 1.3;
        }

        .pillar-text {
          font-size: 0.94rem;
          color: #554840;
          line-height: 1.68;
          margin: 0;
        }

        .artisan-signature-row {
          display: flex;
          align-items: center;
          justifyContent: space-between;
          padding-top: 1.5rem;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .link-to-map {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-burgundy);
          text-decoration: none;
        }

        @media (max-width: 960px) {
          .hero-editorial-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .hero-main-frame {
            height: 340px;
          }
          .moment-detail-stage {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 1.75rem;
          }
          .savoir-artisan-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}
