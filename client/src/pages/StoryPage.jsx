import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Sparkles,
  ShieldCheck,
  Award,
  Heart,
  MapPin,
  Compass,
  Wheat,
  Check,
  Flame,
  Sun,
  Moon
} from 'lucide-react';
import { ArtisanSeal } from '../components/brand/ArtisanSeal';
import { WheatDecoration } from '../components/brand/WheatDecoration';
import { WheatEarWatermark } from '../components/brand/WheatEarWatermark';
import { BreadWatermark } from '../components/brand/BreadWatermark';
import { CroissantWatermark } from '../components/brand/CroissantWatermark';
import { SectionWaveDivider } from '../components/brand/SectionWaveDivider';
import { WheatLogo } from '../components/brand/WheatLogo';

export function StoryPage() {
  const [activeStep, setActiveStep] = useState(0);

  const timelineSteps = [
    {
      time: '03h30',
      period: 'Nuit & Aube',
      icon: Moon,
      title: 'Le Premier Réveil & Le Levain Vivant',
      description:
        'Quand la ville d’Épinay-sur-Orge dort encore, le maître boulanger allume le fournil. Le levain chef naturel, nourri patiemment chaque jour, est incorporé aux farines sélectionnées. Commence alors le pétrissage doux et mesuré pour ne pas échauffer la pâte.',
      badge: 'Fermentation naturelle'
    },
    {
      time: '05h00',
      period: 'Crépuscule matinal',
      icon: Flame,
      title: 'Le Façonnage Manuel & Le Coup de Lame',
      description:
        'Chaque pâton est pesé et façonné à la main avec respect du réseau glutineux. Les baguettes de tradition et miches de meule reçoivent la signature de l’artisan : l’incision précise à la lame de rasoir (« la grigne ») qui permettra au pain de s’épanouir au four.',
      badge: 'Façonnage 100% manuel'
    },
    {
      time: '06h15',
      period: 'Premières Lueurs',
      icon: Sun,
      title: 'La Cuisson sur Sole & Le Chant du Pain',
      description:
        'Enfournement direct sur pierre réfractaire brûlante. Sous l’effet de la vapeur d’eau pure, la croûte se caramélise et prend sa teinte dorée ambrée. À la sortie du four, le pain « chante » : le craquement inimitable de la croûte qui refroidit.',
      badge: 'Four à sole de pierre'
    },
    {
      time: '10h30',
      period: 'Matinée Gourmande',
      icon: Wheat,
      title: 'Le Tourage de la Viennoiserie Pur Beurre',
      description:
        'Au laboratoire de pâtisserie, le feuilletage des croissants et pains au chocolat est travaillé au beurre AOP Charentes-Poitou. Pliage en trois tours pour obtenir ces alvéoles légères et ce feuilletage doré croustillant qui fond en bouche.',
      badge: 'Beurre AOP Charentes-Poitou'
    },
    {
      time: '15h00',
      period: 'Après-Midi & Soirée',
      icon: Clock,
      title: 'Les Fournées du Soir & Pains Spéciaux',
      description:
        'Pour la table du dîner, une nouvelle fournée de pains au levain de garde (pain de campagne, tourte de meule T80, seigle complet) sort du fournil afin d’offrir à nos voisins un pain tout juste sorti du four pour le repas du soir.',
      badge: 'Fournées chaudes continues'
    }
  ];

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* ========================================================
          1. MONUMENTAL EDITORIAL HERO (PRESTIGE & ARTISANAL SOUL)
         ======================================================== */}
      <section
        style={{
          position: 'relative',
          padding: '4rem 0 4.5rem',
          backgroundColor: 'var(--color-ivory)',
          overflow: 'hidden'
        }}
      >
        {/* Botanical Wheat Stalk climbing from bottom-left corner */}
        <WheatDecoration
          style={{ bottom: '-25px', left: '-15px' }}
          opacity={0.35}
          width={150}
        />

        {/* Delicate background bread watermark */}
        <BreadWatermark
          size={320}
          opacity={0.045}
          color="var(--color-gold)"
          style={{ top: '20px', right: '-30px', transform: 'rotate(-8deg)' }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Top Brand Kicker */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              color: 'var(--color-gold)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}
          >
            <Wheat size={16} />
            <span>Maison Artisanale Fondée sur la Tradition • Épinay-sur-Orge</span>
          </div>

          {/* Monumental Editorial Headline */}
          <div style={{ maxWidth: '960px', marginBottom: '2.5rem' }}>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
                fontWeight: 600,
                color: 'var(--color-burgundy)',
                lineHeight: 1.08,
                letterSpacing: '-0.015em',
                margin: '0 0 1.5rem'
              }}
            >
              « Le temps ne respecte rien de ce qui se fait sans lui. »
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                color: '#554840',
                lineHeight: 1.65,
                maxWidth: '780px',
                margin: 0
              }}
            >
              Au 15 Rue Pasteur à Épinay-sur-Orge, nous perpétuons chaque nuit l’alchimie vivante du levain naturel, des farines de blés français et de la cuisson sur sole de pierre.
            </p>
          </div>

          {/* Editorial Ledger Strip (Artisanal Proof Metrics) */}
          <div className="story-ledger-strip">
            <div className="ledger-cell">
              <span className="ledger-num">03h30</span>
              <span className="ledger-label">Premier réveil du fournil chaque matin</span>
            </div>
            <div className="ledger-cell">
              <span className="ledger-num">100%</span>
              <span className="ledger-label">Farines françaises de tradition meunière</span>
            </div>
            <div className="ledger-cell">
              <span className="ledger-num">24 Heures</span>
              <span className="ledger-label">Fermentation lente au levain chef naturel</span>
            </div>
            <div className="ledger-cell">
              <span className="ledger-num">0 Surgélation</span>
              <span className="ledger-label">Façonnage et cuisson 100% artisanaux</span>
            </div>
          </div>

          {/* Hero Dual Composition: Storefront Grand Frame + Poetic Seal Box */}
          <div className="story-hero-grid">
            {/* Grand Photo Frame with Square Architectural Precision */}
            <div className="story-main-frame">
              <img
                src="/assets/images/storefront.webp"
                alt="Devanture authentique et fournil de La Carafa des Blés à Épinay-sur-Orge"
                style={{
                  width: '100%',
                  height: '460px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div className="story-frame-overlay">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <MapPin size={18} color="var(--color-gold)" />
                  <span style={{ fontWeight: 700, letterSpacing: '0.04em' }}>15 Rue Pasteur, 91360 Épinay-sur-Orge</span>
                </div>
                <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', color: 'var(--color-gold-light)', fontSize: '0.92rem' }}>
                  Fournil ouvert du Mardi au Dimanche
                </span>
              </div>
            </div>

            {/* Right Artisan Manifesto Card */}
            <div className="story-manifesto-card">
              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <WheatLogo size="small" variant="gold" />
                <div style={{ transform: 'rotate(-4deg)' }}>
                  <ArtisanSeal size={82} />
                </div>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.65rem',
                  color: 'var(--color-burgundy)',
                  lineHeight: 1.25,
                  margin: '0 0 1rem'
                }}
              >
                Notre Promesse au Voisinage
              </h3>

              <p style={{ fontSize: '0.96rem', color: '#554740', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
                À l’heure où les mélanges industriels envahissent le pain, nous avons fait le choix courageux de l’artisanat absolu. Tout ce qui franchit notre vitrine est pétri, façonné, touré et cuit sur place par nos soins.
              </p>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--color-burgundy)', fontWeight: 600 }}>
                  <Check size={16} color="var(--color-gold)" />
                  <span>Farines Label Rouge & Meuniers régionaux</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--color-burgundy)', fontWeight: 600 }}>
                  <Check size={16} color="var(--color-gold)" />
                  <span>Beurre AOP Charentes-Poitou exclusivement</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--color-burgundy)', fontWeight: 600 }}>
                  <Check size={16} color="var(--color-gold)" />
                  <span>Levain vivant nourri quotidiennement</span>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <a
                  href="#chronologie"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '0.85rem 1.5rem',
                    fontSize: '0.92rem',
                    borderRadius: 0
                  }}
                >
                  <span>Découvrir le rythme d'une journée</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Organic Wave Divider transitioning into Section 2 (#FFFFFF) */}
        <SectionWaveDivider fill="#FFFFFF" position="bottom" variant="primary" />
      </section>

      {/* ========================================================
          2. LA GENÈSE DU FOURNIL (EDITORIAL TWO-COLUMN DIALOGUE)
         ======================================================== */}
      <section
        style={{
          padding: '6rem 0 6.5rem',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle wheat watermark in background */}
        <WheatEarWatermark
          size={340}
          opacity={0.04}
          color="var(--color-gold)"
          style={{ bottom: '20px', left: '-30px', transform: 'rotate(20deg)' }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="genesis-grid">
            {/* Left Column: The Artisan's Voice & Manifesto */}
            <div>
              <div
                style={{
                  color: 'var(--color-gold)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}
              >
                LA VÉRITÉ DU GESTE
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  color: 'var(--color-burgundy)',
                  lineHeight: 1.15,
                  margin: '0 0 1.5rem'
                }}
              >
                Pourquoi Nous Avons Choisi le Levain Naturel
              </h2>

              <p
                style={{
                  fontSize: '1.08rem',
                  color: '#4A3D36',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem'
                }}
              >
                Le levain n’est pas une simple recette : c’est un organisme vivant qui demande de l’écoute, du dévouement et de la constance. En réveillant chaque jour notre levain avec de la farine de meule et de l’eau pure, nous créons un pain qui nourrit véritablement.
              </p>

              <blockquote
                style={{
                  margin: '2rem 0',
                  padding: '1.5rem 1.75rem',
                  backgroundColor: '#FAF5EA',
                  borderLeft: '4px solid var(--color-gold)',
                  color: 'var(--color-burgundy)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                  lineHeight: 1.6
                }}
              >
                « Un vrai pain se reconnaît à trois sens : l'œil qui contemple sa croûte dorée alvéolée, l'oreille qui écoute son craquement sonore, et l'estomac qui le digère avec une légèreté naturelle. »
              </blockquote>

              <p
                style={{
                  fontSize: '1.02rem',
                  color: '#554840',
                  lineHeight: 1.8,
                  marginBottom: '2rem'
                }}
              >
                À La Carafa des Blés, nous refusons les pâtes congelées venues d'usines. Nous respectons le cycle naturel de fermentation qui décompose les sucres complexes et développe ces notes profondes de noisette grillée et de blé mûr.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontStyle: 'italic', color: 'var(--color-burgundy)' }}>
                    La Carafa des Blés
                  </div>
                  <div style={{ fontSize: '0.82rem', letterSpacing: '0.12em', color: 'var(--color-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Maîtres Artisans Boulangers
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Exhibition Cards */}
            <div className="genesis-photo-stack">
              <div className="genesis-photo-card card-top">
                <img
                  src="/assets/images/hero-bread.webp"
                  alt="Miche de pain de campagne au levain cuite sur sole de pierre"
                  style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '1.5rem', backgroundColor: '#FAF5EA' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.35rem' }}>
                    Pain de Garde & Meule T80
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-burgundy)', fontWeight: 600 }}>
                    Alvéoles nacrées et croûte caramélisée
                  </div>
                </div>
              </div>

              <div className="genesis-photo-card card-bottom">
                <img
                  src="/assets/images/cat-viennoiseries.webp"
                  alt="Croissants dorés et feuilletage pur beurre de La Carafa des Blés"
                  style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '1.25rem 1.5rem', backgroundColor: '#FAF5EA' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.35rem' }}>
                    Viennoiserie Fine Maison
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--color-burgundy)', fontWeight: 600 }}>
                    100% Beurre AOP Charentes-Poitou
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organic Wave Divider transitioning into Section 3 (#2A060B) */}
        <SectionWaveDivider fill="#2A060B" position="bottom" variant="reverse" />
      </section>

      {/* ========================================================
          3. LES 4 PILIERS DE NOTRE ARTISANAT (DARK BURGUNDY EXHIBITION)
         ======================================================== */}
      <section
        style={{
          backgroundColor: '#2A060B',
          color: '#FAF5EA',
          padding: '6.5rem 0 7rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Watermarks */}
        <CroissantWatermark
          size={360}
          opacity={0.05}
          color="var(--color-gold)"
          style={{ top: '25px', right: '-40px', transform: 'rotate(-12deg)' }}
        />
        <BreadWatermark
          size={280}
          opacity={0.045}
          color="var(--color-gold)"
          style={{ bottom: '30px', left: '-30px', transform: 'rotate(15deg)' }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '820px', marginBottom: '4rem' }}>
            <div
              style={{
                color: 'var(--color-gold)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              NOS ENGAGEMENTS INÉBRANLABLES
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)',
                color: '#FFFFFF',
                lineHeight: 1.12,
                margin: '0 0 1rem'
              }}
            >
              Les Quatre Lois du Fournil
            </h2>
            <p style={{ color: '#E4D7C8', fontSize: '1.1rem', lineHeight: 1.7, margin: 0 }}>
              Dans notre métier, il n’y a aucun raccourci. Voici les quatre principes immuables qui régissent notre travail quotidien à Épinay-sur-Orge.
            </p>
          </div>

          <div className="pillars-mosaic-grid">
            {/* Pillar 1 */}
            <div className="pillar-dark-card">
              <div className="pillar-icon-box">
                <Wheat size={26} color="var(--color-gold)" />
              </div>
              <span className="pillar-theme-tag">Le Terroir & La Minoterie</span>
              <h3 className="pillar-card-title">Farines Françaises Sans Additifs</h3>
              <p className="pillar-card-text">
                Toutes nos farines (T65 Tradition, T80 Meule, Seigle pur) proviennent de moulins régionaux engagés en filière CRC et Label Rouge. Zéro améliorant chimique, zéro acide ascorbique de synthèse.
              </p>
              <div className="pillar-proof-strip">
                <span>Certification Label Rouge & CRC</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="pillar-dark-card">
              <div className="pillar-icon-box">
                <Clock size={26} color="var(--color-gold)" />
              </div>
              <span className="pillar-theme-tag">Le Temps & La Fermentation</span>
              <h3 className="pillar-card-title">Levain Naturel de 24 Heures</h3>
              <p className="pillar-card-text">
                Une fermentation lente à basse température permet aux enzymes de travailler naturellement le gluten. Résultat : une mie nacrée d'une digestibilité supérieure et une conservation naturelle de plusieurs jours.
              </p>
              <div className="pillar-proof-strip">
                <span>Levain chef rafraîchi 2x par jour</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="pillar-dark-card">
              <div className="pillar-icon-box">
                <Award size={26} color="var(--color-gold)" />
              </div>
              <span className="pillar-theme-tag">Le Geste & La Matière Noble</span>
              <h3 className="pillar-card-title">Viennoiserie 100% Beurre AOP</h3>
              <p className="pillar-card-text">
                Aucune graisse végétale ni margarine industrielle. Nos croissants et pains au chocolat sont feuilletés à la main avec du véritable beurre de baratte AOP Charentes-Poitou au goût de noisette inégalable.
              </p>
              <div className="pillar-proof-strip">
                <span>Feuilletage artisanal pur beurre AOP</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="pillar-dark-card">
              <div className="pillar-icon-box">
                <Flame size={26} color="var(--color-gold)" />
              </div>
              <span className="pillar-theme-tag">Le Feu & La Pierre Réfractaire</span>
              <h3 className="pillar-card-title">Cuisson sur Sole de Pierre</h3>
              <p className="pillar-card-text">
                Nos pains ne cuisent jamais sur des chariots rotatifs à air pulsé. Ils sont déposés directement sur la pierre brûlante du four à sole, assurant ce fond croustillant et ce développement vigoureux de la mie.
              </p>
              <div className="pillar-proof-strip">
                <span>Sole en pierre naturelle réfractaire</span>
              </div>
            </div>
          </div>
        </div>

        {/* Organic Wave Divider transitioning into Section 4 (#FAF5EA) */}
        <SectionWaveDivider fill="#FAF5EA" position="bottom" variant="primary" />
      </section>

      {/* ========================================================
          4. LA CHRONOLOGIE D'UNE NUIT D'ARTISAN (INTERACTIVE TIMELINE)
         ======================================================== */}
      <section
        id="chronologie"
        style={{
          padding: '6.5rem 0 7rem',
          backgroundColor: '#FAF5EA',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Watermark */}
        <WheatEarWatermark
          size={320}
          opacity={0.045}
          color="var(--color-gold)"
          style={{ top: '40px', left: '-30px', transform: 'rotate(-15deg)' }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
            <div
              style={{
                color: 'var(--color-gold)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              LE RITUEL QUOTIDIEN
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)',
                color: 'var(--color-burgundy)',
                lineHeight: 1.15,
                margin: '0 0 1rem'
              }}
            >
              24 Heures dans le Secret du Fournil
            </h2>
            <p style={{ color: '#554840', fontSize: '1.08rem', lineHeight: 1.7, margin: 0 }}>
              Du premier rafraîchi du levain aux miches encore fumantes du soir, explorez les étapes qui rythment notre maison.
            </p>
          </div>

          {/* Timeline Navigation Tabs */}
          <div className="timeline-nav-strip">
            {timelineSteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              const IconComp = step.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`timeline-tab-btn ${isSelected ? 'active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <IconComp size={15} />
                    <span className="timeline-tab-time">{step.time}</span>
                  </div>
                  <span className="timeline-tab-title">{step.period}</span>
                </button>
              );
            })}
          </div>

          {/* Timeline Detail Spotlight Stage */}
          <div className="timeline-stage-card">
            <div className="timeline-stage-left">
              <div className="timeline-badge-tag">
                <Sparkles size={14} color="var(--color-gold)" />
                <span>{timelineSteps[activeStep].badge}</span>
              </div>

              <div className="timeline-stage-hour">{timelineSteps[activeStep].time}</div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.7rem, 2.8vw, 2.3rem)',
                  color: 'var(--color-burgundy)',
                  lineHeight: 1.2,
                  margin: '0 0 1.25rem'
                }}
              >
                {timelineSteps[activeStep].title}
              </h3>

              <p style={{ fontSize: '1.05rem', color: '#4A3D36', lineHeight: 1.8, margin: 0 }}>
                {timelineSteps[activeStep].description}
              </p>
            </div>

            <div className="timeline-stage-right">
              <div className="timeline-quote-box">
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem' }}>
                  L'Oeil du Boulanger
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.15rem', color: 'var(--color-burgundy)', lineHeight: 1.6 }}>
                  « La pâte nous parle à chaque instant : par son élasticité sous la paume, son odeur légèrement acidulée et sa façon de lever sous le linge de lin. »
                </div>
                <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-gold)' }} />
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-burgundy)' }}>
                    Fournil d'Épinay-sur-Orge
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Organic Wave Divider transitioning into Section 5 (#FFFFFF) */}
        <SectionWaveDivider fill="#FFFFFF" position="bottom" variant="reverse" />
      </section>

      {/* ========================================================
          5. LA CHARTE DE NOS MATIÈRES PREMIÈRES (GALLERY NOBLESS)
         ======================================================== */}
      <section
        style={{
          padding: '6.5rem 0 7rem',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Watermarks */}
        <BreadWatermark
          size={320}
          opacity={0.045}
          color="var(--color-gold)"
          style={{ top: '30px', right: '-30px', transform: 'rotate(10deg)' }}
        />
        <CroissantWatermark
          size={280}
          opacity={0.04}
          color="var(--color-gold)"
          style={{ bottom: '20px', left: '-20px', transform: 'rotate(-20deg)' }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '820px', marginBottom: '4rem' }}>
            <div
              style={{
                color: 'var(--color-gold)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              TRANSPARENCE & NOBLESSE
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)',
                color: 'var(--color-burgundy)',
                lineHeight: 1.15,
                margin: '0 0 1rem'
              }}
            >
              Ce Que Nous Mettons dans Nos Pétrins
            </h2>
            <p style={{ color: '#554840', fontSize: '1.08rem', lineHeight: 1.7, margin: 0 }}>
              La qualité d’un produit artisanal commence par la terre et le respect du producteur. Nous sélectionnons nos ingrédients avec une rigueur absolue.
            </p>
          </div>

          <div className="ingredients-showcase-grid">
            {/* Ingredient 1 */}
            <div className="ingredient-artisan-card">
              <div className="ingredient-badge">Farines Meunières</div>
              <h3 className="ingredient-title">Blés 100% Français Label Rouge</h3>
              <p className="ingredient-desc">
                Nos farines de tradition française T65 et nos farines écrasées sur meules de pierre T80 garantissent une teneur en minéraux préservée et un arôme rustique exceptionnel.
              </p>
              <div className="ingredient-footer-tag">Origine : Minoteries régionales de tradition</div>
            </div>

            {/* Ingredient 2 */}
            <div className="ingredient-artisan-card">
              <div className="ingredient-badge">Matière Grasse d’Excellence</div>
              <h3 className="ingredient-title">Beurre AOP Charentes-Poitou</h3>
              <p className="ingredient-desc">
                Réputé dans toute la gastronomie française pour sa texture ferme et son point de fusion idéal, ce beurre d'appellation donne à notre feuilletage son craquant inimitable.
              </p>
              <div className="ingredient-footer-tag">Appellation d'Origine Protégée</div>
            </div>

            {/* Ingredient 3 */}
            <div className="ingredient-artisan-card">
              <div className="ingredient-badge">Assaisonnement Ancestral</div>
              <h3 className="ingredient-title">Sel Marin Gris de Guérande</h3>
              <p className="ingredient-desc">
                Récolté artisanalement à la main dans les marais salants de l'Atlantique, non raffiné et naturellement riche en oligo-éléments pour sublimer la croûte sans l'alourdir.
              </p>
              <div className="ingredient-footer-tag">100% Sel de mer naturel non traité</div>
            </div>

            {/* Ingredient 4 */}
            <div className="ingredient-artisan-card">
              <div className="ingredient-badge">Pâtisserie & Chocolaterie</div>
              <h3 className="ingredient-title">Chocolats Purs Origine & Fruits Frais</h3>
              <p className="ingredient-desc">
                Cacao grand cru sans huile de palme pour nos pains au chocolat et éclairs, gousses de vanille Bourbon de Madagascar et fruits frais livrés selon les saisons.
              </p>
              <div className="ingredient-footer-tag">100% Fait maison chaque matin</div>
            </div>
          </div>

          {/* Golden Seal of Honour Box */}
          <div className="honour-seal-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ backgroundColor: 'var(--color-gold)', color: '#FFFFFF', padding: '0.85rem 1.25rem', fontWeight: 700, letterSpacing: '0.12em', fontSize: '0.82rem', textTransform: 'uppercase' }}>
                CHARTE DU FOURNIL
              </div>
              <div style={{ color: 'var(--color-burgundy)', fontSize: '1.05rem', fontWeight: 600 }}>
                Zéro améliorant chimique • Zéro produit surgelé • Zéro colorant artificiel
              </div>
            </div>
            <div style={{ transform: 'rotate(-4deg)' }}>
              <ArtisanSeal size={90} />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. INVITATION AU FOURNIL & RENCONTRE AVEC L'ARTISAN
         ======================================================== */}
      <section
        style={{
          padding: '5.5rem 0 6rem',
          backgroundColor: '#FAF5EA',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="invitation-hero-box">
            <div style={{ maxWidth: '640px' }}>
              <div
                style={{
                  color: 'var(--color-gold)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem'
                }}
              >
                VENEZ PARTAGER LA PASSION
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                  color: 'var(--color-burgundy)',
                  lineHeight: 1.15,
                  margin: '0 0 1rem'
                }}
              >
                Passez Nous Dire Bonjour au Fournil
              </h2>
              <p style={{ color: '#554840', fontSize: '1.08rem', lineHeight: 1.7, margin: '0 0 2rem' }}>
                Rien ne remplace la chaleur d’une baguette qui sort du four et l’accueil d’un artisan passionné. Venez découvrir nos créations et échanger avec notre équipe au 15 Rue Pasteur à Épinay-sur-Orge.
              </p>

              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                <Link
                  to="/produits"
                  className="btn btn-primary"
                  style={{
                    padding: '0.9rem 2rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    borderRadius: 0
                  }}
                >
                  <span>Découvrir toutes nos créations</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/contact"
                  className="btn btn-outline"
                  style={{
                    padding: '0.9rem 2rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    borderRadius: 0
                  }}
                >
                  <span>Nous contacter</span>
                </Link>
              </div>
            </div>

            <div className="invitation-aside-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Compass size={22} color="var(--color-gold)" />
                <span style={{ fontWeight: 700, color: 'var(--color-burgundy)', fontSize: '1.1rem' }}>
                  Fournil d'Épinay-sur-Orge
                </span>
              </div>
              <div style={{ color: '#554840', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                <strong>Adresse :</strong> 15 Rue Pasteur, 91360 Épinay-sur-Orge<br />
                <strong>Accès RER :</strong> Gare RER C Épinay-sur-Orge à 200m
              </div>
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', color: 'var(--color-burgundy)', fontWeight: 600, fontSize: '0.9rem' }}>
                Mardi au Vendredi : 06h30 – 19h30<br />
                Samedi : 07h00 – 19h30 | Dimanche : 07h00 – 13h00
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PURE RESPONSIVE CSS STYLESHEET (NO TAILWIND, ZERO RADIUS)
         ======================================================== */}
      <style>{`
        /* Ledger Proof Strip */
        .story-ledger-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          margin-bottom: 3.5rem;
        }

        .ledger-cell {
          padding: 1.75rem 1.5rem;
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .ledger-cell:last-child {
          border-right: none;
        }

        .ledger-num {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 2.5vw, 2.3rem);
          font-weight: 700;
          color: var(--color-burgundy);
          lineHeight: 1;
        }

        .ledger-label {
          font-size: 0.85rem;
          color: #66564E;
          line-height: 1.4;
          font-weight: 500;
        }

        /* Hero Split Grid */
        .story-hero-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 2.5rem;
          align-items: stretch;
        }

        .story-main-frame {
          position: relative;
          background-color: #FAF5EA;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }

        .story-frame-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(36, 4, 8, 0.94);
          color: #FAF5EA;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          border-top: 1px solid rgba(183, 138, 61, 0.4);
        }

        .story-manifesto-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--shadow-sm);
        }

        /* Genesis Two-Column */
        .genesis-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .genesis-photo-stack {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .genesis-photo-card {
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        /* Pillars Dark Grid */
        .pillars-mosaic-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
          gap: 2rem;
        }

        .pillar-dark-card {
          background-color: #38080F;
          border: 1px solid rgba(183, 138, 61, 0.25);
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .pillar-dark-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-gold);
        }

        .pillar-icon-box {
          width: 52px;
          height: 52px;
          background-color: rgba(183, 138, 61, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          border: 1px solid rgba(183, 138, 61, 0.3);
        }

        .pillar-theme-tag {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 0.5rem;
        }

        .pillar-card-title {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          color: #FFFFFF;
          margin: 0 0 1rem;
          line-height: 1.25;
        }

        .pillar-card-text {
          font-size: 0.94rem;
          color: #D6C8B8;
          line-height: 1.7;
          margin: 0 0 1.5rem;
          flex: 1;
        }

        .pillar-proof-strip {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 1rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-gold-light);
          letter-spacing: 0.05em;
        }

        /* Timeline Navigation */
        .timeline-nav-strip {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .timeline-tab-btn {
          flex: 1;
          min-width: 170px;
          padding: 1.1rem 1.25rem;
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
          border-radius: 0;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
        }

        .timeline-tab-btn:hover {
          background-color: #F8F3E8;
        }

        .timeline-tab-btn.active {
          background-color: var(--color-burgundy);
          color: #FFFFFF;
          border-color: var(--color-burgundy);
        }

        .timeline-tab-time {
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .timeline-tab-title {
          font-size: 0.92rem;
          font-weight: 600;
          opacity: 0.85;
        }

        /* Timeline Detail Stage */
        .timeline-stage-card {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 3rem;
          padding: 3rem;
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          align-items: center;
        }

        .timeline-badge-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 0.75rem;
        }

        .timeline-stage-hour {
          font-family: var(--font-serif);
          font-size: 2.8rem;
          font-weight: 700;
          color: var(--color-burgundy);
          line-height: 1;
          margin-bottom: 0.75rem;
        }

        .timeline-quote-box {
          background-color: #FAF5EA;
          border-left: 3px solid var(--color-gold);
          padding: 2rem;
        }

        /* Ingredients Showcase */
        .ingredients-showcase-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .ingredient-artisan-card {
          background-color: #FAF5EA;
          border: 1px solid var(--color-border);
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
        }

        .ingredient-badge {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 0.75rem;
        }

        .ingredient-title {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          color: var(--color-burgundy);
          margin: 0 0 1rem;
          line-height: 1.25;
        }

        .ingredient-desc {
          font-size: 0.94rem;
          color: #554840;
          line-height: 1.7;
          margin: 0 0 1.5rem;
          flex: 1;
        }

        .ingredient-footer-tag {
          border-top: 1px solid var(--color-border);
          padding-top: 1rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-burgundy);
        }

        .honour-seal-banner {
          background-color: #FAF5EA;
          border: 1px solid var(--color-border);
          padding: 1.75rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        /* Invitation Box */
        .invitation-hero-box {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 3.5rem;
          align-items: center;
        }

        .invitation-aside-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
          padding: 2.25rem;
          box-shadow: var(--shadow-sm);
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .story-ledger-strip {
            grid-template-columns: 1fr 1fr;
          }
          .ledger-cell:nth-child(2) {
            border-right: none;
          }
          .ledger-cell:nth-child(1), .ledger-cell:nth-child(2) {
            border-bottom: 1px solid var(--color-border);
          }
          .story-hero-grid {
            grid-template-columns: 1fr;
          }
          .genesis-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .timeline-stage-card {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem;
          }
          .invitation-hero-box {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 600px) {
          .story-ledger-strip {
            grid-template-columns: 1fr;
          }
          .ledger-cell {
            border-right: none !important;
            border-bottom: 1px solid var(--color-border);
          }
          .ledger-cell:last-child {
            border-bottom: none;
          }
          .story-manifesto-card {
            padding: 1.75rem;
          }
          .honour-seal-banner {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
