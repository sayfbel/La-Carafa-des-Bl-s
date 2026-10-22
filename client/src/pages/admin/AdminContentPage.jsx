import React, { useEffect, useState } from 'react';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

export function AdminContentPage() {
  const [settings, setSettings] = useState({
    homepage_hero_kicker: '',
    homepage_hero_title: '',
    homepage_hero_subtitle: '',
    homepage_hero_cta: '',
    story_kicker: '',
    story_title: '',
    story_text: '',
    story_signature: '',
    business_name: '',
    business_address: '',
    business_phone: '',
    business_email: '',
    google_maps_url: '',
    opening_hours_note: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await api.admin.getSettings();
        if (res?.success && res.data) {
          setSettings(prev => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        setErrorMessage(err.message || 'Erreur lors du chargement des contenus.');
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      await api.admin.updateSettings(settings);
      setStatusMessage('Contenus du site sauvegardés avec succès. Les modifications sont immédiatement visibles en ligne.');
    } catch (err) {
      setErrorMessage(err.message || 'Erreur lors de la sauvegarde.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p style={{ color: 'var(--color-text-muted)' }}>Chargement des contenus...</p>;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--color-burgundy)', margin: 0 }}>
          Éditeur de Contenu du Site
        </h1>
        <p style={{ color: 'var(--color-text-muted)', margin: '0.4rem 0 0' }}>
          Personnalisez directement les accroches de la page d'accueil, l'histoire de la maison et les coordonnées.
        </p>
      </div>

      {statusMessage && (
        <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} />
          <span>{statusMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        {/* Section 1: Hero Accueil */}
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
          <h2 style={{ fontSize: '1.4rem', color: 'var(--color-burgundy)', marginBottom: '1.25rem' }}>
            Section Hero (Haut de page d'accueil)
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="hero-kicker">Surtitre doré (Kicker)</label>
              <input
                id="hero-kicker"
                name="homepage_hero_kicker"
                type="text"
                value={settings.homepage_hero_kicker}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="hero-cta">Libellé du bouton d'action (CTA)</label>
              <input
                id="hero-cta"
                name="homepage_hero_cta"
                type="text"
                value={settings.homepage_hero_cta}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="hero-title">Grand titre principal (H1)</label>
            <input
              id="hero-title"
              name="homepage_hero_title"
              type="text"
              value={settings.homepage_hero_title}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="hero-sub">Texte de présentation sous le titre</label>
            <textarea
              id="hero-sub"
              name="homepage_hero_subtitle"
              rows={3}
              value={settings.homepage_hero_subtitle}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>
        </div>

        {/* Section 2: Notre Histoire */}
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
          <h2 style={{ fontSize: '1.4rem', color: 'var(--color-burgundy)', marginBottom: '1.25rem' }}>
            Section « Notre Histoire »
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="story-kicker">Surtitre</label>
              <input
                id="story-kicker"
                name="story_kicker"
                type="text"
                value={settings.story_kicker}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="story-sig">Signature manuscrite</label>
              <input
                id="story-sig"
                name="story_signature"
                type="text"
                value={settings.story_signature}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="story-title">Titre de la section</label>
            <input
              id="story-title"
              name="story_title"
              type="text"
              value={settings.story_title}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="story-text">Récit artisanal</label>
            <textarea
              id="story-text"
              name="story_text"
              rows={4}
              value={settings.story_text}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>
        </div>

        {/* Section 3: Coordonnées & Bandeau Pied de Page */}
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
          <h2 style={{ fontSize: '1.4rem', color: 'var(--color-burgundy)', marginBottom: '1.25rem' }}>
            Coordonnées de l'établissement
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="biz-phone">Numéro de téléphone</label>
              <input
                id="biz-phone"
                name="business_phone"
                type="text"
                value={settings.business_phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="biz-email">Email officiel</label>
              <input
                id="biz-email"
                name="business_email"
                type="email"
                value={settings.business_email}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="biz-address">Adresse physique</label>
            <input
              id="biz-address"
              name="business_address"
              type="text"
              value={settings.business_address}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="biz-map">Lien de l'itinéraire Google Maps</label>
            <input
              id="biz-map"
              name="google_maps_url"
              type="text"
              value={settings.google_maps_url}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary"
          style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
        >
          <Save size={18} />
          <span>{saving ? 'Enregistrement...' : 'Sauvegarder les modifications'}</span>
        </button>
      </form>
    </div>
  );
}
