import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, Wheat } from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';

export function AdminLoginPage() {
  const { admin, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (admin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Identifiants incorrects.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-burgundy-dark)',
        padding: '1.5rem'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          padding: '2.5rem',
          border: '1px solid var(--color-border)'
        }}
      >
        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: '50%',
              backgroundColor: 'var(--color-ivory)',
              color: 'var(--color-burgundy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              border: '1px solid var(--color-border)'
            }}
          >
            <Wheat size={30} color="var(--color-gold)" />
          </div>
          <h1 style={{ fontSize: '1.75rem', color: 'var(--color-burgundy)', margin: '0 0 0.5rem' }}>
            Espace d'Administration
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            La Carafa des Blés — Épinay-sur-Orge
          </p>
        </div>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">
              Adresse email
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="admin-email"
                type="email"
                required
                maxLength={150}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="admin@lacarafadesbles.fr"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Mail size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label" htmlFor="admin-password">
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="admin-password"
                type="password"
                required
                maxLength={128}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••••••"
                style={{ paddingLeft: '2.5rem' }}
              />
              <Lock size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem' }}
          >
            {submitting ? 'Vérification en cours...' : 'Se connecter au tableau de bord'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.82rem', color: 'var(--color-text-light)' }}>
          Session sécurisée avec cookie HTTP-only &amp; hachage bcrypt.
        </div>
      </div>

      <style>{`
        @media (max-width: 380px) {
          .admin-login-card {
            padding: 1.75rem 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}
