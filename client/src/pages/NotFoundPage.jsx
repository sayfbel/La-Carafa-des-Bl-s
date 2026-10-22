import React from 'react';
import { Link } from 'react-router-dom';
import { Wheat, Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div style={{ padding: '7rem 0', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: '#FAF5EC',
            color: 'var(--color-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            border: '1px solid var(--color-border)'
          }}
        >
          <Wheat size={36} />
        </div>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'var(--color-burgundy)', marginBottom: '0.5rem' }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
          Cette fournée n'existe pas
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          La page que vous tentez d'ouvrir a été déplacée ou n'existe plus. Retournez à l'accueil pour découvrir nos spécialités du jour.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} />
            <span>Retour à l'accueil</span>
          </Link>
          <Link to="/produits" className="btn btn-outline">
            <ArrowLeft size={16} />
            <span>Voir nos produits</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
