import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { api } from '../services/api';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    // Frontend validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMessage('Veuillez renseigner tous les champs obligatoires.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await api.submitContact(formData);
      if (res?.success) {
        setSuccessMessage(res.message || 'Votre message a été envoyé avec succès.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '3.5rem 0 6rem' }}>
      <div className="container">
        {/* Header Title */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
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
            NOUS ÉCRIRE & NOUS RENDRE VISITE
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', marginBottom: '1rem' }}>
            Prendre contact avec notre fournil
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Une commande spéciale pour un événement ? Une question sur nos farines ou nos allergènes ? Notre équipe vous répond avec attention.
          </p>
        </div>

        {/* 2-Columns Grid: Details Left, Form Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 1fr) minmax(320px, 1.4fr)',
            gap: '3.5rem',
            alignItems: 'start'
          }}
          className="contact-grid"
        >
          {/* Left Column: Business Coordinates */}
          <div
            style={{
              backgroundColor: '#FAF5EC',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}
          >
            <h2 style={{ fontSize: '1.6rem', color: 'var(--color-burgundy)', margin: 0 }}>
              Coordonnées de l'établissement
            </h2>

            {/* Address */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-ivory)',
                  color: 'var(--color-burgundy)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid var(--color-border)'
                }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '0.2rem' }}>
                  Adresse
                </strong>
                <p style={{ color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                  15 Rue Pasteur<br />
                  91360 Épinay-sur-Orge, France
                </p>
                <a
                  href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--color-burgundy)',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    marginTop: '0.5rem'
                  }}
                >
                  <span>Ouvrir l'itinéraire Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Telephone */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-ivory)',
                  color: 'var(--color-burgundy)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid var(--color-border)'
                }}
              >
                <Phone size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '0.2rem' }}>
                  Téléphone
                </strong>
                <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
                  07 53 79 29 19
                </p>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)', fontStyle: 'italic' }}>
                  (Numéro indicatif en attente de validation)
                </span>
              </div>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-ivory)',
                  color: 'var(--color-burgundy)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid var(--color-border)'
                }}
              >
                <Mail size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '0.2rem' }}>
                  Courrier électronique
                </strong>
                <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
                  contact@lacarafadesbles.fr
                </p>
              </div>
            </div>

            {/* Opening Hours */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-ivory)',
                  color: 'var(--color-burgundy)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid var(--color-border)'
                }}
              >
                <Clock size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '0.2rem' }}>
                  Horaires d'ouverture
                </strong>
                <p style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
                  En cours de confirmation par le propriétaire.<br />
                  Pour toute commande matinale, n'hésitez pas à nous téléphoner directement.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-burgundy)', marginBottom: '1.5rem' }}>
              Envoyez-nous un message
            </h2>

            {/* Success Alert */}
            {successMessage && (
              <div className="alert alert-success">
                <CheckCircle2 size={20} />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Error Alert */}
            {errorMessage && (
              <div className="alert alert-error">
                <AlertCircle size={20} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Votre nom complet *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Ex: Marie Dupont"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Adresse email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="marie.dupont@email.fr"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    Téléphone (optionnel)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="06 12 34 56 78"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">
                    Objet de la demande *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Ex: Commande gâteau d'anniversaire"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Votre message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Décrivez votre demande en quelques mots..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem 1.5rem', marginTop: '0.5rem' }}
              >
                {submitting ? (
                  <span>Envoi en cours...</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Transmettre mon message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
