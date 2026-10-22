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
        </div>

        <button type="submit" disabled={saving} className="btn btn-primary" style={{ padding: '0.8rem 1.75rem' }}>
          <Save size={18} />
          <span>{saving ? 'Enregistrement...' : 'Sauvegarder les paramètres'}</span>
        </button>
      </form>
    </div>
  );
}
