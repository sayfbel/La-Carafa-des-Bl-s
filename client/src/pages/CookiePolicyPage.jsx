import React, { useState, useEffect } from 'react';
import { Cookie, Check, RotateCcw } from 'lucide-react';

export function CookiePolicyPage() {
  const [currentConsent, setCurrentConsent] = useState('none');

  useEffect(() => {
    const val = localStorage.getItem('lacarafa_cookie_consent') || 'non défini';
    setCurrentConsent(val);
  }, []);

  const handleReset = () => {
    localStorage.removeItem('lacarafa_cookie_consent');
    setCurrentConsent('non défini (bannière réactivée)');
  };

  const handleUpdate = (status) => {
    localStorage.setItem('lacarafa_cookie_consent', status);
    setCurrentConsent(status);
  };

  return (
    <div style={{ padding: '4rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Gestion des Cookies</h1>
        <div style={{ width: '48px', height: '2px', backgroundColor: 'var(--color-gold)', marginBottom: '2.5rem' }} />

        <div
          style={{
            backgroundColor: '#FAF5EC',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            marginBottom: '3rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Cookie size={24} color="var(--color-burgundy)" />
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Votre statut actuel</h2>
          </div>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>
            Statut enregistré sur cet appareil : <strong>{currentConsent.toUpperCase()}</strong>
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => handleUpdate('accepted')} className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
              <Check size={16} />
              <span>Accepter les cookies d'usage</span>
            </button>
            <button onClick={() => handleUpdate('refused')} className="btn btn-outline" style={{ padding: '0.6rem 1.25rem' }}>
              <span>Refuser les cookies non essentiels</span>
            </button>
            <button onClick={handleReset} className="btn" style={{ backgroundColor: '#E5D9C5', padding: '0.6rem 1.25rem' }}>
              <RotateCcw size={16} />
              <span>Réinitialiser mon choix</span>
            </button>
          </div>
        </div>

        <section style={{ lineHeight: 1.7 }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Qu'est-ce qu'un cookie ?</h2>
          <p style={{ color: 'var(--color-text-main)', marginBottom: '1.5rem' }}>
            Un cookie est un petit fichier texte déposé sur votre terminal lors de la consultation d'un site web. Sur <strong>La Carafa des Blés</strong>, nous n'employons aucun cookie tiers intrusif à des fins de ciblage publicitaire. Seuls les cookies indispensables au bon fonctionnement technique de l'application (ex: sessions de connexion pour les administrateurs) sont activés.
          </p>
        </section>
      </div>
    </div>
  );
}
