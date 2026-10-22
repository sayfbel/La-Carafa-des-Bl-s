import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock, Clock, User, AlertTriangle } from 'lucide-react';
import { api } from '../../services/api';

export function AdminSecurityPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await api.admin.getAuditLogs();
        if (res?.success) setLogs(res.data);
      } catch (err) {
        console.error('Failed to load audit logs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--color-burgundy)', margin: 0 }}>
          Sécurité & Journal d'Audit
        </h1>
        <p style={{ color: 'var(--color-text-muted)', margin: '0.4rem 0 0' }}>
          Traçabilité complète des actions administratives et état des protections de sécurité.
        </p>
      </div>

      {/* Security Health Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}
      >
        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-success)', marginBottom: '0.5rem' }}>
            <ShieldCheck size={20} />
            <strong style={{ fontSize: '1rem' }}>Sessions Sécurisées</strong>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: 0 }}>
            Cookies <code>HttpOnly</code> avec protection CSRF et SameSite=Lax. Zéro token dans le localStorage.
          </p>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-gold)', marginBottom: '0.5rem' }}>
            <Lock size={20} />
            <strong style={{ fontSize: '1rem' }}>Hachage des Passwords</strong>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: 0 }}>
            Algorithme <code>bcrypt</code> robuste avec sel cryptographique (coût: 12 rounds).
          </p>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-success)', marginBottom: '0.5rem' }}>
            <ShieldCheck size={20} />
            <strong style={{ fontSize: '1rem' }}>Immunité Injection SQL</strong>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: 0 }}>
            Requêtes 100% paramétrées via <code>mysql2/promise</code> avec typage strict.
          </p>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', backgroundColor: '#FAF5EC' }}>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--color-burgundy)', margin: 0 }}>
            Journal d'audit administratif ({logs.length} événements récents)
          </h2>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
              <th style={{ padding: '0.85rem 1.25rem' }}>Horodatage</th>
              <th style={{ padding: '0.85rem 1.25rem' }}>Administrateur</th>
              <th style={{ padding: '0.85rem 1.25rem' }}>Action exécutée</th>
              <th style={{ padding: '0.85rem 1.25rem' }}>Entité ciblée</th>
              <th style={{ padding: '0.85rem 1.25rem' }}>Détails / Métadonnées</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <td style={{ padding: '0.85rem 1.25rem', color: 'var(--color-text-light)', whiteSpace: 'nowrap' }}>
                  {new Date(log.created_at).toLocaleString('fr-FR')}
                </td>
                <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  {log.admin_name || log.admin_email || 'Système'}
                </td>
                <td style={{ padding: '0.85rem 1.25rem' }}>
                  <span style={{ backgroundColor: 'var(--color-ivory)', color: 'var(--color-burgundy)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>
                    {log.action}
                  </span>
                </td>
                <td style={{ padding: '0.85rem 1.25rem', color: 'var(--color-text-muted)' }}>
                  {log.entity_type} {log.entity_id ? `(#${log.entity_id})` : ''}
                </td>
                <td style={{ padding: '0.85rem 1.25rem', color: 'var(--color-text-muted)', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                  {log.metadata ? JSON.stringify(log.metadata) : '—'}
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                  Aucun journal d'audit disponible.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
