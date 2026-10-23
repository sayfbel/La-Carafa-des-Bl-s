import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Inbox, Layers, CheckCircle2, FileEdit, Clock, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';

export function AdminDashboardPage() {
  const [data, setData] = useState({
    stats: {
      totalProducts: 0,
      publishedProducts: 0,
      draftProducts: 0,
      totalCategories: 0,
      unreadMessages: 0
    },
    recentLogs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await api.admin.getStats();
        if (res?.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const { stats, recentLogs } = data;

  return (
    <div>
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--color-burgundy)', margin: 0 }}>
          Tableau de bord
        </h1>
        <p style={{ color: 'var(--color-text-muted)', margin: '0.4rem 0 0' }}>
          Vue d'ensemble en temps réel des activités et du catalogue de La Carafa des Blés.
        </p>
      </div>

      {/* KPI Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}
      >
        {/* Total Products */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: 0,
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Produits au catalogue</span>
            <div style={{ padding: '0.5rem', borderRadius: 0, backgroundColor: 'rgba(183, 138, 61, 0.1)', color: 'var(--color-gold)' }}>
              <Package size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--color-burgundy)' }}>
            {stats.totalProducts}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-success)', marginTop: '0.35rem' }}>
            {stats.publishedProducts} publiés en ligne
          </div>
        </div>

        {/* Categories */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: 0,
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Catégories actives</span>
            <div style={{ padding: '0.5rem', borderRadius: 0, backgroundColor: 'rgba(89, 11, 22, 0.1)', color: 'var(--color-burgundy)' }}>
              <Layers size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--color-burgundy)' }}>
            {stats.totalCategories}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
            Pains, Viennoiseries, Pâtisseries
          </div>
        </div>

        {/* Unread Messages */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: 0,
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Messages reçus</span>
            <div style={{ padding: '0.5rem', borderRadius: 0, backgroundColor: stats.unreadMessages > 0 ? '#FEF2F2' : '#F0FDF4', color: stats.unreadMessages > 0 ? '#DC2626' : '#16A34A' }}>
              <Inbox size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 700, color: stats.unreadMessages > 0 ? '#DC2626' : 'var(--color-burgundy)' }}>
            {stats.unreadMessages}
          </div>
          <div style={{ fontSize: '0.82rem', color: stats.unreadMessages > 0 ? '#DC2626' : 'var(--color-text-muted)', marginTop: '0.35rem' }}>
            {stats.unreadMessages > 0 ? 'Nouveaux messages à traiter' : 'Boîte à jour'}
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}
      >
        {/* Quick Actions */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '2rem',
            borderRadius: 0,
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h2 style={{ fontSize: '1.35rem', color: 'var(--color-burgundy)', marginBottom: '1.25rem' }}>
            Actions rapides
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link
              to="/admin/produits"
              className="btn btn-outline"
              style={{ justifyContent: 'space-between', padding: '0.75rem 1.25rem' }}
            >
              <span>Ajouter ou modifier un produit</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/admin/contenu"
              className="btn btn-outline"
              style={{ justifyContent: 'space-between', padding: '0.75rem 1.25rem' }}
            >
              <span>Éditer les textes d'accueil & histoire</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/admin/messages"
              className="btn btn-outline"
              style={{ justifyContent: 'space-between', padding: '0.75rem 1.25rem' }}
            >
              <span>Consulter la boîte de réception</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Audit Logs Trail */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            padding: '2rem',
            borderRadius: 0,
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-burgundy)', margin: 0 }}>
              Journal des dernières actions
            </h2>
            <Link to="/admin/securite" style={{ fontSize: '0.85rem', color: 'var(--color-burgundy)', fontWeight: 600 }}>
              Tout voir
            </Link>
          </div>

          {recentLogs.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Aucune action récente enregistrée.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentLogs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    fontSize: '0.88rem'
                  }}
                >
                  <div>
                    <strong>{log.action}</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      Par {log.admin_name || 'Système'} ({log.entity_type} #{log.entity_id || '-'})
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} />
                    <span>{new Date(log.created_at).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
