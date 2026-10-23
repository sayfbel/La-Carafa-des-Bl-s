import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Compass,
  Train,
  MessageSquare,
  Calendar,
  Sparkles,
  Wheat,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ArtisanSeal } from '../components/brand/ArtisanSeal';
import { WheatDecoration } from '../components/brand/WheatDecoration';
import { WheatEarWatermark } from '../components/brand/WheatEarWatermark';
import { BreadWatermark } from '../components/brand/BreadWatermark';
import { CroissantWatermark } from '../components/brand/CroissantWatermark';
import { SectionWaveDivider } from '../components/brand/SectionWaveDivider';
import { WheatLogo } from '../components/brand/WheatLogo';
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
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const quickSubjects = [
    { label: 'Commande d’Événement / Gâteau', value: 'Commande Gâteau ou Événement' },
    { label: 'Pains au Levain & Allergènes', value: 'Renseignements Pains & Allergènes' },
    { label: 'Buffet & Traiteur Salé', value: 'Devis Traiteur & Buffet Salé' },
    { label: 'Question Générale', value: 'Demande d’information générale' }
  ];

  const faqs = [
    {
      q: 'Quel délai faut-il prévoir pour une commande personnalisée ?',
      a: 'Pour les gâteaux d’anniversaire, pièces montées, grands entremets ou pains spéciaux en grande quantité (buffets, mariages), nous vous recommandons de passer commande au moins 48 heures à l’avance afin de garantir la sélection des ingrédients et le temps de pousse nécessaire.'
    },
    {
      q: 'Vos pains au levain conviennent-ils aux personnes sensibles au gluten ?',
      a: 'Oui, une grande partie de nos habitués sensibles au gluten apprécient nos pains au levain naturel. Notre fermentation lente de 24 heures prédigère naturellement les protéines de gluten et les sucres complexes (FODMAPs), conférant à notre mie une haute tolérance digestive.'
    },
    {
      q: 'Puis-je réserver mes baguettes de tradition et viennoiseries par téléphone ?',
      a: 'Absolument ! Un simple appel au 07 53 79 29 19 dès le matin permet de réserver vos baguettes chaudes, tourtes de meule ou viennoiseries pur beurre. Vos douceurs sont mises de côté et vous attendent jusqu’à la fermeture du fournil à 19h30.'
    },
    {
      q: 'Quels sont les modes de paiement acceptés au fournil ?',
      a: 'Nous acceptons les cartes bancaires (avec ou sans contact dès 1€), les espèces, ainsi que les cartes et titres-restaurant dématérialisés (Edenred, Swile, Sodexo, etc.).'
    }
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('15 Rue Pasteur, 91360 Épinay-sur-Orge, France').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  const handleSelectQuickSubject = (val) => {
    setFormData(prev => ({ ...prev, subject: val }));
  };

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
      setErrorMessage('Veuillez renseigner tous les champs obligatoires (*).');
      setSubmitting(false);
      return;
    }

    try {
      const res = await api.submitContact(formData);
      if (res?.success) {
        setSuccessMessage(res.message || 'Votre message a bien été transmis au maître artisan. Nous vous répondrons dans les plus brefs délais.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Une erreur est survenue lors de l’envoi. Veuillez réessayer ou nous contacter par téléphone.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* ========================================================
          1. MONUMENTAL HERO: L'ÉCOUTE ARTISANALE
         ======================================================== */}
      <section
        style={{
          position: 'relative',
          padding: '4rem 0 4.5rem',
          backgroundColor: 'var(--color-ivory)',
          overflow: 'hidden'
        }}
      >
        {/* Botanical Wheat Stalk in bottom corner */}
        <WheatDecoration
          style={{ bottom: '-25px', left: '-15px' }}
          opacity={0.35}
          width={150}
        />

        {/* Subtle Bread Watermark */}
        <BreadWatermark
          size={300}
          opacity={0.045}
          color="var(--color-gold)"
          style={{ top: '20px', right: '-30px', transform: 'rotate(-8deg)' }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Top Brand Kicker */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              color: 'var(--color-gold)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}
          >
            <Wheat size={16} />
            <span>ÉCOUTE & TRADITION • FOURNIL D’ÉPINAY-SUR-ORGE</span>
          </div>

          {/* Monumental Serif Headline */}
          <div style={{ maxWidth: '900px', marginBottom: '3rem' }}>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.7rem, 5.2vw, 4.4rem)',
                fontWeight: 600,
                color: 'var(--color-burgundy)',
                lineHeight: 1.1,
                letterSpacing: '-0.015em',
                margin: '0 0 1.25rem'
              }}
            >
              Le Lien Direct avec Votre Boulanger
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                color: '#554840',
                lineHeight: 1.65,
                maxWidth: '750px',
                margin: 0
              }}
            >
              Une commande spéciale pour un anniversaire ? Une question sur nos farines de tradition ou notre levain vivant ? Notre équipe vous répond avec attention et dévouement.
            </p>
          </div>

          {/* 4 Pillars Summary Strip */}
          <div className="contact-pillars-strip">
            <div className="contact-pillar-item">
              <div className="pillar-num-badge">01</div>
              <div className="pillar-content">
                <span className="pillar-title">Au Fournil d'Épinay</span>
                <span className="pillar-desc">15 Rue Pasteur (Gare RER C à 200m)</span>
              </div>
            </div>

            <div className="contact-pillar-item">
              <div className="pillar-num-badge">02</div>
              <div className="pillar-content">
                <span className="pillar-title">Par Téléphone Direct</span>
                <span className="pillar-desc">07 53 79 29 19 (Réservations matinales)</span>
              </div>
            </div>

            <div className="contact-pillar-item">
              <div className="pillar-num-badge">03</div>
              <div className="pillar-content">
                <span className="pillar-title">Par Courrier Électronique</span>
                <span className="pillar-desc">contact@lacarafadesbles.fr</span>
              </div>
            </div>

            <div className="contact-pillar-item">
              <div className="pillar-num-badge">04</div>
              <div className="pillar-content">
                <span className="pillar-title">Commandes Événements</span>
                <span className="pillar-desc">Pièces montées, buffets & pains de fête</span>
              </div>
            </div>
          </div>
        </div>

        {/* Organic Wave Divider transitioning into Section 2 (#FFFFFF) */}
        <SectionWaveDivider fill="#FFFFFF" position="bottom" variant="primary" />
      </section>

      {/* ========================================================
          2. MAIN ATELIER: CONTACT DETAILS & FORMULAR
         ======================================================== */}
      <section
        style={{
          padding: '5.5rem 0 6.5rem',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Watermarks */}
        <WheatEarWatermark
          size={340}
          opacity={0.04}
          color="var(--color-gold)"
          style={{ bottom: '30px', left: '-35px', transform: 'rotate(20deg)' }}
        />
        <CroissantWatermark
          size={280}
          opacity={0.04}
          color="var(--color-gold)"
          style={{ top: '40px', right: '-30px', transform: 'rotate(-15deg)' }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="contact-layout-grid">
            {/* LEFT COLUMN: Carnet d'Adresses & Artisan Details */}
            <div className="artisan-dossier-card">
              <div className="dossier-header">
                <div>
                  <div style={{ color: 'var(--color-gold)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    CARNET DE L'ARTISAN
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: 'var(--color-burgundy)', margin: 0 }}>
                    Fournil La Carafa des Blés
                  </h2>
                </div>
                <div style={{ transform: 'rotate(-4deg)' }}>
                  <ArtisanSeal size={74} />
                </div>
              </div>

              {/* Coordinates List */}
              <div className="coordinates-list">
                {/* Item 1: Address */}
                <div className="coord-item">
                  <div className="coord-icon-box">
                    <MapPin size={20} color="var(--color-gold)" />
                  </div>
                  <div className="coord-info">
                    <span className="coord-label">Adresse de la Boulangerie</span>
                    <p className="coord-val">
                      15 Rue Pasteur<br />
                      91360 Épinay-sur-Orge, France
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                      <a
                        href="https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="coord-link-btn"
                      >
                        <Compass size={14} />
                        <span>Ouvrir dans Maps</span>
                        <ExternalLink size={12} />
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyAddress}
                        className="coord-copy-btn"
                        title="Copier l'adresse"
                      >
                        {copied ? <Check size={14} color="#166534" /> : <Copy size={14} />}
                        <span>{copied ? 'Copié !' : 'Copier'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Item 2: Telephone */}
                <div className="coord-item">
                  <div className="coord-icon-box">
                    <Phone size={20} color="var(--color-gold)" />
                  </div>
                  <div className="coord-info">
                    <span className="coord-label">Ligne Directe du Fournil</span>
                    <a href="tel:0753792919" className="coord-val-link">
                      07 53 79 29 19
                    </a>
                    <span className="coord-note">
                      Idéal pour réserver vos pains chauds et vos viennoiseries dès 06h30 le matin.
                    </span>
                  </div>
                </div>

                {/* Item 3: Email */}
                <div className="coord-item">
                  <div className="coord-icon-box">
                    <Mail size={20} color="var(--color-gold)" />
                  </div>
                  <div className="coord-info">
                    <span className="coord-label">Courrier Électronique</span>
                    <a href="mailto:contact@lacarafadesbles.fr" className="coord-val-link">
                      contact@lacarafadesbles.fr
                    </a>
                    <span className="coord-note">
                      Réponse attentive sous 24h ouvrées.
                    </span>
                  </div>
                </div>

                {/* Item 4: Horaires */}
                <div className="coord-item">
                  <div className="coord-icon-box">
                    <Clock size={20} color="var(--color-gold)" />
                  </div>
                  <div className="coord-info">
                    <span className="coord-label">Horaires d'Ouverture</span>
                    <div className="hours-mini-table">
                      <div className="hours-mini-row">
                        <span>Mardi – Vendredi :</span>
                        <strong>06h30 – 19h30</strong>
                      </div>
                      <div className="hours-mini-row">
                        <span>Samedi :</span>
                        <strong>07h00 – 19h30</strong>
                      </div>
                      <div className="hours-mini-row">
                        <span>Dimanche :</span>
                        <strong>07h00 – 13h00</strong>
                      </div>
                      <div className="hours-mini-row closed">
                        <span>Lundi :</span>
                        <em>Fermé (Repos de l'artisan)</em>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transit & Access Banner */}
              <div className="dossier-transit-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
                  <Train size={16} color="var(--color-gold)" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-burgundy)' }}>
                    Accès RER C & Stationnement
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: '#554840', lineHeight: 1.5 }}>
                  Sortie <em>Rue Pasteur</em> de la gare d’Épinay-sur-Orge à seulement 200 mètres (2 minutes à pied). Places de stationnement gratuites et dépose-minute devant la boutique.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive High-End Form */}
            <div className="artisan-form-card">
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  TRANSMISSION DIRECTE
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', color: 'var(--color-burgundy)', margin: '0 0 0.5rem' }}>
                  Écrire à Notre Fournil
                </h2>
                <p style={{ color: '#554840', fontSize: '0.96rem', lineHeight: 1.6, margin: 0 }}>
                  Remplissez le formulaire ci-dessous. Chaque message est lu personnellement par notre équipe d’artisans.
                </p>
              </div>

              {/* Quick Topic Selector */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-burgundy)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                  Objet rapide (cliquez pour pré-remplir) :
                </div>
                <div className="quick-topics-row">
                  {quickSubjects.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectQuickSubject(item.value)}
                      className={`quick-topic-btn ${formData.subject === item.value ? 'active' : ''}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Alerts */}
              {successMessage && (
                <div className="contact-alert alert-success">
                  <CheckCircle2 size={20} color="#166534" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Message bien transmis !</strong>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.92rem' }}>{successMessage}</p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="contact-alert alert-danger">
                  <AlertCircle size={20} color="#991B1B" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Attention :</strong>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.92rem' }}>{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Actual Form */}
              <form onSubmit={handleSubmit} className="artisan-form">
                <div className="form-fields-grid">
                  {/* Name */}
                  <div className="form-field-item">
                    <label className="field-label" htmlFor="name">
                      Votre Nom Complet <span className="req">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="field-input"
                      placeholder="Ex: Alexandre Martin"
                    />
                  </div>

                  {/* Email */}
                  <div className="form-field-item">
                    <label className="field-label" htmlFor="email">
                      Adresse Courriel <span className="req">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="field-input"
                      placeholder="alexandre.martin@email.fr"
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-field-item">
                    <label className="field-label" htmlFor="phone">
                      Numéro de Téléphone (optionnel)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="field-input"
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  {/* Subject */}
                  <div className="form-field-item">
                    <label className="field-label" htmlFor="subject">
                      Objet de la Demande <span className="req">*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="field-input"
                      placeholder="Ex: Commande gâteau d'anniversaire 12 personnes"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="form-field-item" style={{ marginTop: '1.25rem' }}>
                  <label className="field-label" htmlFor="message">
                    Votre Message Détaillé <span className="req">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="field-textarea"
                    placeholder="Précisez la date de retrait souhaitée, le nombre de convives ou vos questions particulières..."
                  />
                </div>

                {/* Submit Row */}
                <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary form-submit-btn"
                  >
                    {submitting ? (
                      <span>Transmission en cours...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Transmettre ma demande à l'artisan</span>
                      </>
                    )}
                  </button>

                  <div style={{ fontSize: '0.82rem', color: '#66564E', fontStyle: 'italic', textAlign: 'center' }}>
                    Vos coordonnées restent strictement confidentielles et ne sont jamais communiquées à des tiers.
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Organic Wave Divider transitioning into Section 3 (#FAF5EA) */}
        <SectionWaveDivider fill="#FAF5EA" position="bottom" variant="reverse" />
      </section>

      {/* ========================================================
          3. FAQ ARTISANALE: CONSEILS & RÉPONSES DU BOULANGER
         ======================================================== */}
      <section
        style={{
          padding: '6rem 0 6.5rem',
          backgroundColor: '#FAF5EA',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Watermark */}
        <BreadWatermark
          size={320}
          opacity={0.045}
          color="var(--color-gold)"
          style={{ top: '30px', left: '-30px', transform: 'rotate(-10deg)' }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
            <div
              style={{
                color: 'var(--color-gold)',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              LE CONSEIL DU FOURNIL
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.3rem, 4vw, 3.4rem)',
                color: 'var(--color-burgundy)',
                lineHeight: 1.15,
                margin: '0 0 1rem'
              }}
            >
              Foire Aux Questions Artisanales
            </h2>
            <p style={{ color: '#554840', fontSize: '1.08rem', lineHeight: 1.7, margin: 0 }}>
              Retrouvez les réponses aux questions les plus fréquentes de nos clients pour préparer au mieux vos délices.
            </p>
          </div>

          <div className="faq-cards-grid">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="faq-artisan-card">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="faq-question-btn"
                  >
                    <span className="faq-q-text">{faq.q}</span>
                    <span className="faq-toggle-icon">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  <div className={`faq-answer-collapse ${isOpen ? 'open' : ''}`}>
                    <p style={{ margin: 0, padding: '0 1.5rem 1.5rem', color: '#4A3D36', fontSize: '0.98rem', lineHeight: 1.75 }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          PURE RESPONSIVE CSS STYLESHEET (NO TAILWIND, ZERO RADIUS)
         ======================================================== */}
      <style>{`
        /* Hero Pillars Strip */
        .contact-pillars-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
        }

        .contact-pillar-item {
          padding: 1.75rem 1.5rem;
          border-right: 1px solid var(--color-border);
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .contact-pillar-item:last-child {
          border-right: none;
        }

        .pillar-num-badge {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--color-gold);
          line-height: 1;
        }

        .pillar-title {
          display: block;
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--color-burgundy);
          margin-bottom: 0.25rem;
        }

        .pillar-desc {
          display: block;
          font-size: 0.82rem;
          color: #66564E;
          line-height: 1.4;
        }

        /* Contact Layout Grid */
        .contact-layout-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 3.5rem;
          align-items: start;
        }

        /* Dossier Left Card */
        .artisan-dossier-card {
          background-color: #FAF5EA;
          border: 1px solid var(--color-border);
          padding: 2.75rem 2.25rem;
          box-shadow: var(--shadow-sm);
        }

        .dossier-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 1.75rem;
          margin-bottom: 2rem;
        }

        .coordinates-list {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          margin-bottom: 2rem;
        }

        .coord-item {
          display: flex;
          align-items: flex-start;
          gap: 1.15rem;
        }

        .coord-icon-box {
          width: 44px;
          height: 44px;
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .coord-info {
          flex: 1;
        }

        .coord-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 0.35rem;
        }

        .coord-val {
          margin: 0;
          font-size: 0.98rem;
          color: var(--color-burgundy);
          font-weight: 600;
          line-height: 1.5;
        }

        .coord-val-link {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-burgundy);
          text-decoration: none;
          display: block;
          transition: color 0.2s ease;
        }

        .coord-val-link:hover {
          color: var(--color-gold);
        }

        .coord-note {
          display: block;
          font-size: 0.82rem;
          color: #66564E;
          margin-top: 0.25rem;
          line-height: 1.4;
        }

        .coord-link-btn, .coord-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.85rem;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid var(--color-border);
          background-color: #FFFFFF;
          color: var(--color-burgundy);
          text-decoration: none;
          cursor: pointer;
          border-radius: 0;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .coord-link-btn:hover, .coord-copy-btn:hover {
          background-color: #F0E6D5;
          border-color: var(--color-gold);
        }

        .hours-mini-table {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-top: 0.35rem;
          font-size: 0.88rem;
        }

        .hours-mini-row {
          display: flex;
          justify-content: space-between;
          color: #4A3D36;
        }

        .hours-mini-row.closed {
          color: #991B1B;
        }

        .dossier-transit-banner {
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
          border-left: 3px solid var(--color-gold);
          padding: 1.25rem;
        }

        /* Form Card */
        .artisan-form-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
          padding: 3rem 2.75rem;
          box-shadow: var(--shadow-sm);
        }

        .quick-topics-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .quick-topic-btn {
          background-color: #FAF5EA;
          border: 1px solid var(--color-border);
          color: #4A3D36;
          padding: 0.45rem 0.85rem;
          font-size: 0.82rem;
          font-weight: 600;
          border-radius: 0;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .quick-topic-btn:hover {
          background-color: #F0E6D5;
          border-color: var(--color-gold);
        }

        .quick-topic-btn.active {
          background-color: var(--color-burgundy);
          color: #FFFFFF;
          border-color: var(--color-burgundy);
        }

        .contact-alert {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          padding: 1rem 1.25rem;
          margin-bottom: 1.75rem;
          border: 1px solid transparent;
        }

        .contact-alert.alert-success {
          background-color: #F0FDF4;
          border-color: #BBF7D0;
          color: #166534;
        }

        .contact-alert.alert-danger {
          background-color: #FEF2F2;
          border-color: #FECACA;
          color: #991B1B;
        }

        .form-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .form-field-item {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .field-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-burgundy);
          letter-spacing: 0.02em;
        }

        .field-label .req {
          color: var(--color-gold);
        }

        .field-input, .field-textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          background-color: #FAF5EA;
          border: 1px solid var(--color-border);
          border-radius: 0;
          font-family: inherit;
          font-size: 0.95rem;
          color: var(--color-text-main);
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .field-input:focus, .field-textarea:focus {
          outline: none;
          background-color: #FFFFFF;
          border-color: var(--color-gold);
          box-shadow: 0 0 0 1px var(--color-gold);
        }

        .form-submit-btn {
          width: 100%;
          padding: 1rem 1.75rem;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          border-radius: 0;
          justify-content: center;
        }

        /* FAQ Cards */
        .faq-cards-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .faq-artisan-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
        }

        .faq-question-btn {
          width: 100%;
          padding: 1.35rem 1.5rem;
          background: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          cursor: pointer;
          gap: 1rem;
        }

        .faq-q-text {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--color-burgundy);
        }

        .faq-toggle-icon {
          color: var(--color-gold);
          flex-shrink: 0;
        }

        .faq-answer-collapse {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.25s ease-out;
        }

        .faq-answer-collapse.open {
          max-height: 300px;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .contact-pillars-strip {
            grid-template-columns: 1fr 1fr;
          }
          .contact-pillar-item:nth-child(2) {
            border-right: none;
          }
          .contact-pillar-item:nth-child(1), .contact-pillar-item:nth-child(2) {
            border-bottom: 1px solid var(--color-border);
          }
          .contact-layout-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .artisan-form-card {
            padding: 2.25rem 1.75rem;
          }
        }

        @media (max-width: 600px) {
          .contact-pillars-strip {
            grid-template-columns: 1fr;
          }
          .contact-pillar-item {
            border-right: none !important;
            border-bottom: 1px solid var(--color-border);
          }
          .contact-pillar-item:last-child {
            border-bottom: none;
          }
          .form-fields-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
