import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Award, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { FlourSackIllustration } from '../components/brand/FlourSackIllustration';
import { ArtisanSeal } from '../components/brand/ArtisanSeal';

export function StoryPage() {
  return (
    <div style={{ padding: '3.5rem 0 6rem' }}>
      <div className="container">
        {/* Title & Introduction */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
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
            NOTRE MAISON ARTISANALE
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '1.25rem' }}>
            L'amour du bon pain, chaque jour levé
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.15rem', lineHeight: 1.7 }}>
            Au 15 Rue Pasteur à Épinay-sur-Orge, notre fournil s'éveille avant l'aube pour perpétuer le respect des méthodes traditionnelles de la boulangerie-pâtisserie française.
          </p>
        </div>

        {/* Big Editorial Storefront Banner */}
        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)',
            position: 'relative',
            marginBottom: '5rem',
            backgroundColor: '#FAF5EC'
          }}
        >
          <img
            src="/assets/images/storefront.webp"
            alt="Artisans boulangers devant la boutique La Carafa des Blés à Épinay-sur-Orge"
            style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              right: '1.5rem',
              backgroundColor: 'rgba(56, 7, 14, 0.92)',
              color: '#FFF',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem'
            }}
          >
            <MapPin size={16} color="var(--color-gold)" />
            <span>15 Rue Pasteur, 91360 Épinay-sur-Orge</span>
          </div>
        </div>

        {/* Narrative Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            marginBottom: '5rem'
          }}
        >
          {/* Pillar 1 */}
          <div style={{ backgroundColor: '#FAF5EC', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: 'rgba(183, 138, 61, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold)',
                marginBottom: '1.25rem'
              }}
            >
              <Heart size={24} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Le respect du vivant</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Nos pains sont élaborés avec un levain naturel entretenu quotidiennement. Cette fermentation lente confère à nos mies une digestibilité remarquable et une conservation exceptionnelle.
            </p>
          </div>

          {/* Pillar 2 */}
          <div style={{ backgroundColor: '#FAF5EC', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: 'rgba(183, 138, 61, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold)',
                marginBottom: '1.25rem'
              }}
            >
              <Award size={24} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Des farines de qualité</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Nous sélectionnons rigoureusement nos farines de blé auprès de meuniers engagés, sans additifs chimiques ni accélérateurs de panification, pour préserver la vérité du goût.
            </p>
          </div>

          {/* Pillar 3 */}
          <div style={{ backgroundColor: '#FAF5EC', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: 'rgba(183, 138, 61, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold)',
                marginBottom: '1.25rem'
              }}
            >
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Pâtisserie maison</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Du feuilletage pur beurre de nos croissants aux crèmes délicates de nos tartes aux fruits frais, chaque création est confectionnée à la main dans notre laboratoire d'Épinay-sur-Orge.
            </p>
          </div>
        </div>

        {/* Closing Signature & CTA */}
        <div
          style={{
            backgroundColor: '#FAF5EC',
            padding: '3rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem'
          }}
        >
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Venez nous rendre visite</h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px' }}>
              Nous serons ravis de vous accueillir, de vous conseiller et de partager avec vous notre passion du goût authentique.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link to="/contact" className="btn btn-primary">
              <span>Nous contacter</span>
              <ArrowRight size={16} />
            </Link>
            <div style={{ transform: 'rotate(-5deg)' }}>
              <ArtisanSeal size={90} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
