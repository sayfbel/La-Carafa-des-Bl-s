import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Check, X } from 'lucide-react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lacarafa_cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lacarafa_cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleRefuse = () => {
    localStorage.setItem('lacarafa_cookie_consent', 'refused');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Consentement relatif aux cookies"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        right: '1.5rem',
        maxWidth: '560px',
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
        border: '1px solid var(--color-border)',
        padding: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: 'var(--color-ivory)',
            color: 'var(--color-burgundy)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Cookie size={20} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--color-burgundy)' }}>
            Respect de votre vie privée
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
            Nous utilisons uniquement des cookies nécessaires au fonctionnement du site et de votre navigation. Aucun traqueur publicitaire tiers n'est activé sans votre accord. Consultez notre{' '}
            <Link to="/politique-de-confidentialite" style={{ color: 'var(--color-burgundy)', textDecoration: 'underline' }}>
              politique de confidentialité
            </Link>.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={handleRefuse}
          className="btn btn-outline"
          style={{ padding: '0.5rem 1.1rem', fontSize: '0.88rem' }}
        >
          <X size={15} />
          <span>Continuer sans accepter</span>
        </button>
        <button
          onClick={handleAccept}
          className="btn btn-primary"
          style={{ padding: '0.5rem 1.3rem', fontSize: '0.88rem' }}
        >
          <Check size={15} />
          <span>Accepter</span>
        </button>
      </div>
    </div>
  );
}
