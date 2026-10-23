import React, { useEffect, useState } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

export function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    business_name: 'La Carafa des Blés',
    business_phone_verified: 'false',
    opening_hours_note: ''
  });
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.admin.getSettings();
        if (res?.success) setSettings(prev => ({ ...prev, ...res.data }));
      } catch (err) {}
    }
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);
    try {
      await api.admin.updateSettings(settings);
      setStatusMessage('Paramètres enregistrés.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--color-burgundy)', margin: 0 }}>
          Paramètres Généraux
        </h1>
        <p style={{ color: 'var(--color-text-muted)', margin: '0.4rem 0 0' }}>
          Gestion des paramètres globaux de fonctionnement de la boutique.
        </p>
      </div>

      {statusMessage && (
        <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} />
          <span>{statusMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} style={{ maxWidth: '680px' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div className="form-group">
            <label className="form-label" htmlFor="setting-name">Nom commercial de l'établissement</label>
            <input
              id="setting-name"
              type="text"
              value={settings.business_name}
              onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="setting-hours">Note sur les horaires d'ouverture</label>
            <textarea
              id="setting-hours"
              rows={3}
              value={settings.opening_hours_note}
              onChange={(e) => setSettings({ ...settings, opening_hours_note: e.target.value })}
              className="form-textarea"
              placeholder="Indiquez vos horaires ou la mention à afficher aux clients..."
            />
          </div>

          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.business_phone_verified === 'true'}
                onChange={(e) => setSettings({ ...settings, business_phone_verified: e.target.checked ? 'true' : 'false' })}
              />
              <span style={{ fontSize: '0.95rem' }}>
                Marquer le numéro de téléphone comme <strong>Vérifié</strong> (retire la mention <em>« Non vérifié »</em> sur le site)
              </span>
            </label>
          </div>

          {/* Statut d'Ouverture du Fournil en Temps Réel & Paramétrage Admin */}
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border-subtle)' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--color-burgundy)', margin: '0 0 0.4rem' }}>
              Statut d'Ouverture du Fournil en Direct
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: '0 0 1.25rem' }}>
              Contrôlez l'affichage du statut (Ouvert / Fermé) visible par les visiteurs sur la page d'accueil.
            </p>

            <div className="form-group">
              <label className="form-label">Mode d'affichage du statut</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="store_status_mode"
                    value="auto"
                    checked={!settings.store_status_mode || settings.store_status_mode === 'auto'}
                    onChange={() => setSettings({ ...settings, store_status_mode: 'auto' })}
                    style={{ marginTop: '3px' }}
                  />
                  <span style={{ fontSize: '0.9rem' }}>
                    <strong>Automatique (Recommandé)</strong> — Calcule l'ouverture et la fermeture en temps réel selon les horaires réels du fournil (Lundi fermé, mar-ven 06h30-19h30, sam 07h00-19h30, dim 07h00-13h00).
                  </span>
                </label>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="store_status_mode"
                    value="forced_closed"
                    checked={settings.store_status_mode === 'forced_closed'}
                    onChange={() => setSettings({ ...settings, store_status_mode: 'forced_closed' })}
                    style={{ marginTop: '3px' }}
                  />
                  <span style={{ fontSize: '0.9rem', color: '#991B1B' }}>
                    <strong>Forcer la Fermeture (Fermé manuellement)</strong> — Affiche immédiatement le badge rouge <em>Fermé</em> sur le site (congés, inventaire, fermeture exceptionnelle).
                  </span>
                </label>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="store_status_mode"
                    value="forced_open"
                    checked={settings.store_status_mode === 'forced_open'}
                    onChange={() => setSettings({ ...settings, store_status_mode: 'forced_open' })}
                    style={{ marginTop: '3px' }}
                  />
                  <span style={{ fontSize: '0.9rem', color: '#065F46' }}>
                    <strong>Forcer l'Ouverture (Ouvert manuellement)</strong> — Affiche immédiatement le badge vert <em>Ouvert</em> (fête, jour férié travaillé).
                  </span>
                </label>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label" htmlFor="custom-status-msg">
                Message personnalisé aux clients (Optionnel)
              </label>
              <input
                id="custom-status-msg"
                type="text"
                value={settings.store_status_custom_message || ''}
                onChange={(e) => setSettings({ ...settings, store_status_custom_message: e.target.value })}
                className="form-input"
                placeholder="Ex : Fermeture annuelle du 1er au 15 août / Fournée spéciale de Pâques..."
              />
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '0.8rem 1.75rem' }}>
          <Save size={18} />
          <span>{saving ? 'Enregistrement...' : 'Sauvegarder les paramètres'}</span>
        </button>
      </form>
    </div>
  );
}
