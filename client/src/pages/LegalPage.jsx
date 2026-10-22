import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function LegalPage() {
  return (
    <div style={{ padding: '4rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Mentions Légales</h1>
        <div style={{ width: '48px', height: '2px', backgroundColor: 'var(--color-gold)', marginBottom: '2rem' }} />

        {/* Owner notice banner */}
        <div
          style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
            marginBottom: '2.5rem'
          }}
        >
          <AlertTriangle color="#D97706" size={24} style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.9rem', color: '#92400E', lineHeight: 1.5 }}>
            <strong>Note à l'attention du propriétaire :</strong> Ce document constitue un modèle juridique standard pour les entreprises artisanales en France. Les mentions marquées comme <em>« À compléter »</em> doivent être renseignées avant la mise en production officielle.
          </div>
        </div>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>1. Éditeur du Site</h2>
          <p style={{ lineHeight: 1.7, color: 'var(--color-text-main)' }}>
            Le présent site internet est édité par l'établissement <strong>La Carafa des Blés</strong>, boulangerie-pâtisserie artisanale.<br />
            <strong>Siège d'exploitation :</strong> 15 Rue Pasteur, 91360 Épinay-sur-Orge, France.<br />
            <strong>Téléphone :</strong> 07 53 79 29 19 (En attente de validation finale)<br />
            <strong>Courriel :</strong> contact@lacarafadesbles.fr<br />
            <strong>Forme juridique :</strong> Entreprise artisanale individuelle / Société (À compléter par le gérant)<br />
            <strong>Numéro SIRET :</strong> À compléter par le gérant<br />
            <strong>Numéro de TVA intracommunautaire :</strong> À compléter si applicable
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>2. Hébergement</h2>
          <p style={{ lineHeight: 1.7, color: 'var(--color-text-main)' }}>
            Ce site est hébergé localement pour le développement (XAMPP / Node.js).<br />
            Pour la production : Hébergeur certifié en Union Européenne (OVHcloud / Hostinger / Scaleway — coordonnées précises à insérer lors de la mise en ligne).
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>3. Propriété Intellectuelle</h2>
          <p style={{ lineHeight: 1.7, color: 'var(--color-text-main)' }}>
            L'ensemble des éléments constituant ce site (textes, logos de la marque « La Carafa des Blés », charte graphique, photographies de l'établissement et des artisans) sont protégés par les dispositions du Code de la propriété intellectuelle. Toute reproduction non autorisée sans l'accord préalable écrit de l'artisan est formellement interdite.
          </p>
        </section>
      </div>
    </div>
  );
}
