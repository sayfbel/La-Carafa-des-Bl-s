import React from 'react';
import { NavLink, Outlet, Navigate, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Inbox,
  FileEdit,
  Settings,
  ShieldAlert,
  LogOut,
  ExternalLink,
  Wheat
} from 'lucide-react';
import { useAuth } from '../features/auth/AuthContext';

export function AdminLayout() {
  const { admin, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Wheat size={40} className="spin-slow" style={{ color: 'var(--color-gold)' }} />
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin', label: 'Vue d\'ensemble', icon: LayoutDashboard, end: true },
    { to: '/admin/produits', label: 'Gestion des Produits', icon: Package },
    { to: '/admin/categories', label: 'Catégories', icon: Layers },
    { to: '/admin/messages', label: 'Messages reçus', icon: Inbox },
    { to: '/admin/contenu', label: 'Contenus du site', icon: FileEdit },
    { to: '/admin/parametres', label: 'Paramètres', icon: Settings },
    { to: '/admin/securite', label: 'Sécurité & Audit', icon: ShieldAlert }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F4EFE6' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '280px',
          backgroundColor: 'var(--color-burgundy-dark)',
          color: '#FFF',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0
        }}
      >
        {/* Brand Header */}
        <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Wheat color="var(--color-gold)" size={28} />
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                LA CARAFA
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)', letterSpacing: '0.15em' }}>
                ADMINISTRATION
              </div>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div style={{ padding: '1.25rem 1.5rem', backgroundColor: 'rgba(0,0,0,0.15)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-cream)' }}>Connecté en tant que :</div>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#FFF' }}>{admin.full_name}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-gold)' }}>{admin.email}</div>
        </div>

        {/* Nav Links */}
        <nav style={{ padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? '#FFF' : '#E8DDD0',
                  backgroundColor: isActive ? 'var(--color-burgundy)' : 'transparent',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.92rem',
                  transition: 'background var(--transition-fast)'
                })}
              >
                <Icon size={18} color="var(--color-gold)" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions: View Site & Logout */}
        <div style={{ padding: '1.25rem 1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'var(--color-cream)',
              padding: '0.6rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem'
            }}
          >
            <ExternalLink size={16} />
            <span>Voir le site public</span>
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: '#FCA5A5',
              background: 'none',
              border: 'none',
              padding: '0.6rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <LogOut size={16} />
            <span>Se déconnecter</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
