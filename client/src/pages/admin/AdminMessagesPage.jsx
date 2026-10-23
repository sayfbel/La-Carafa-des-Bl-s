import React, { useEffect, useState } from 'react';
import { Mail, Check, Trash2, Clock, Phone, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

export function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await api.admin.getMessages();
      if (res?.success) setMessages(res.data);
    } catch (err) {
      setErrorMessage(err.message || 'Erreur lors du chargement des messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'unread' ? 'read' : 'unread';
    try {
      await api.admin.updateMessageStatus(id, nextStatus);
      setStatusMessage(`Message marqué comme ${nextStatus === 'read' ? 'lu' : 'non lu'}.`);
      loadMessages();
    } catch (err) {
      setErrorMessage(err.message || 'Erreur lors de la mise à jour.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous supprimer définitivement ce message ?')) return;
    try {
      await api.admin.deleteMessage(id);
      setStatusMessage('Message supprimé.');
      setSelectedMessage(null);
      loadMessages();
    } catch (err) {
      setErrorMessage(err.message || 'Impossible de supprimer ce message.');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--color-burgundy)', margin: 0 }}>
          Boîte de Réception
        </h1>
        <p style={{ color: 'var(--color-text-muted)', margin: '0.4rem 0 0' }}>
          Tous les messages soumis via le formulaire de contact du site.
        </p>
      </div>

      {statusMessage && (
        <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
          <span>{statusMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="messages-layout-grid">
        {/* Messages List */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 0,
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--color-text-muted)' }}>
              <Mail size={36} style={{ color: 'var(--color-gold)', margin: '0 auto 1rem' }} />
              <p>Aucun message reçu pour le moment.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMessage(m)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    backgroundColor: m.status === 'unread' ? '#FAF5EC' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    transition: 'background var(--transition-fast)'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                      <strong style={{ color: 'var(--color-text-main)', fontSize: '1rem' }}>{m.name}</strong>
                      {m.status === 'unread' && (
                        <span style={{ backgroundColor: 'var(--color-burgundy)', color: '#FFF', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 0, fontWeight: 700 }}>
                          NOUVEAU
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-burgundy)', marginBottom: '0.25rem' }}>
                      {m.subject}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '400px' }}>
                      {m.message}
                    </p>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={12} />
                      {new Date(m.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleToggleStatus(m.id, m.status); }}
                        title={m.status === 'unread' ? 'Marquer comme lu' : 'Marquer comme non lu'}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem', color: m.status === 'unread' ? 'var(--color-burgundy)' : 'var(--color-text-light)' }}
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(m.id); }}
                        title="Supprimer"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.3rem', color: 'var(--color-danger)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Message Detail Drawer */}
        {selectedMessage && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 0,
              border: '1px solid var(--color-border)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--color-burgundy)', margin: 0 }}>
                  {selectedMessage.subject}
                </h2>
                <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                  De : <strong>{selectedMessage.name}</strong> ({selectedMessage.email})
                </div>
                {selectedMessage.phone && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                    <Phone size={14} />
                    <span>{selectedMessage.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-text-main)', whiteSpace: 'pre-wrap', marginBottom: '2rem' }}>
              {selectedMessage.message}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1rem' }}>
              <button
                onClick={() => handleToggleStatus(selectedMessage.id, selectedMessage.status)}
                className="btn btn-outline"
                style={{ padding: '0.5rem 1rem', fontSize: '0.88rem' }}
              >
                {selectedMessage.status === 'unread' ? 'Marquer comme lu' : 'Marquer comme non lu'}
              </button>

              <button
                onClick={() => handleDelete(selectedMessage.id)}
                className="btn btn-primary"
                style={{ backgroundColor: 'var(--color-danger)', padding: '0.5rem 1rem', fontSize: '0.88rem' }}
              >
                <Trash2 size={16} />
                <span>Supprimer</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .messages-layout-grid {
          display: grid;
          grid-template-columns: ${selectedMessage ? '1.2fr 1fr' : '1fr'};
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .messages-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
