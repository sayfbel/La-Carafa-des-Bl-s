import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div style={{ padding: '4rem 0 6rem' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem' }}>Politique de Confidentialité (RGPD)</h1>
        <div style={{ width: '48px', height: '2px', backgroundColor: 'var(--color-gold)', marginBottom: '2.5rem' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-success)', marginBottom: '2rem' }}>
          <ShieldCheck size={24} />
          <span style={{ fontWeight: 600, fontSize: '1rem' }}>Conforme au Règlement Général sur la Protection des Données (RGPD / CNIL)</span>
        </div>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>1. Collecte des Données Personnelles</h2>
          <p style={{ lineHeight: 1.7, color: 'var(--color-text-main)' }}>
            Dans le cadre de l'utilisation du site <strong>La Carafa des Blés</strong>, nous pouvons être amenés à collecter les données que vous nous transmettez volontairement via le formulaire de contact :
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', lineHeight: 1.7 }}>
            <li>Nom complet</li>
            <li>Adresse de courrier électronique</li>
            <li>Numéro de téléphone (facultatif)</li>
            <li>Objet et contenu du message</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>2. Finalité du Traitement</h2>
          <p style={{ lineHeight: 1.7, color: 'var(--color-text-main)' }}>
            Les informations recueillies sont uniquement destinées à :
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', lineHeight: 1.7 }}>
            <li>Répondre à vos demandes de renseignements, réservations ou commandes spéciales.</li>
            <li>Assurer le suivi de la relation client avec notre fournil.</li>
          </ul>
          <p style={{ lineHeight: 1.7, color: 'var(--color-text-main)', marginTop: '0.75rem' }}>
            Ces données ne sont jamais vendues, louées, ni cédées à des tiers à des fins publicitaires ou de prospection commerciale.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>3. Durée de Conservation & Vos Droits</h2>
          <p style={{ lineHeight: 1.7, color: 'var(--color-text-main)' }}>
            Les messages reçus sont conservés dans notre base de données sécurisée pour une durée maximale de 24 mois après le dernier échange.<br />
            Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification et d'effacement de vos données personnelles. Pour exercer ce droit, il vous suffit de nous adresser un courriel à <strong>contact@lacarafadesbles.fr</strong> ou par courrier postal au 15 Rue Pasteur, 91360 Épinay-sur-Orge.
          </p>
        </section>
      </div>
    </div>
  );
}
