import React, { useState } from 'react';
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
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../features/auth/AuthContext';

export function AdminLayout() {
  const { admin, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4EFE6' }}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="spin-slow"
        >
          <path d="M2 22 16 8" />
          <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
          <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
          <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
          <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
          <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
          <path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
          <path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
        </svg>
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

  const closeSidebar = () => setMobileSidebarOpen(false);

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
    <div className="admin-root-layout">
      {/* Mobile Top Bar */}
      <div className="admin-mobile-topbar">
        <button
          className="admin-mobile-menu-btn"
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu size={24} />
        </button>
        <div className="admin-mobile-brand">LA CARAFA — ADMIN</div>
      </div>

      {/* Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="admin-mobile-backdrop"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar with sticky 100vh height, scrollable nav, and fixed bottom actions */}
      <aside className={`admin-sidebar ${mobileSidebarOpen ? 'admin-sidebar--open' : ''}`} aria-label="Navigation Administration">
        {/* Brand Header */}
        <div className="admin-brand-header">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
            aria-hidden="true"
          >
            <path d="M2 22 16 8" />
            <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
            <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
            <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
            <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
            <path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
            <path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
            <path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z" />
          </svg>
          <div className="admin-brand-text">
            <div className="admin-brand-title">LA CARAFA</div>
            <div className="admin-brand-sub">ADMINISTRATION</div>
          </div>
        </div>

        {/* User Info Card (Compact on desktop, hidden on compact rail) */}
        <div className="admin-user-card">
          <div className="admin-user-label">Connecté en tant que :</div>
          <div className="admin-user-name">{admin.full_name}</div>
          <div className="admin-user-email">{admin.email}</div>
        </div>

        {/* Scrollable Nav Links: middle area scrolls if viewport height is small */}
        <nav className="admin-nav-scroll" aria-label="Pages d'administration">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                title={item.label}
                onClick={closeSidebar}
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={19} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span className="admin-nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Fixed Bottom Actions: Logout is ALWAYS visible */}
        <div className="admin-bottom-actions">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            title="Voir le site public"
            className="admin-action-link"
            onClick={closeSidebar}
          >
            <ExternalLink size={18} style={{ flexShrink: 0 }} />
            <span className="admin-action-label">Voir le site public</span>
          </Link>

          <button
            onClick={handleLogout}
            title="Se déconnecter"
            className="admin-logout-btn"
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            <span className="admin-action-label">Se déconnecter</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-viewport">
        <Outlet />
      </main>

      <style>{`
        .admin-root-layout {
          display: flex;
          min-height: 100vh;
          background-color: #F4EFE6;
          position: relative;
        }

        .admin-sidebar {
          width: 270px;
          height: 100vh;
          position: sticky;
          top: 0;
          background-color: var(--color-burgundy-dark);
          color: #FFF;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          z-index: 90;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          transition: width 0.25s ease;
          overflow: hidden;
        }

        .admin-brand-header {
          padding: 1.5rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .admin-brand-text {
          display: flex;
          flex-direction: column;
          white-space: nowrap;
        }

        .admin-brand-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #FFF;
        }

        .admin-brand-sub {
          font-size: 0.72rem;
          color: var(--color-gold);
          letter-spacing: 0.16em;
          font-weight: 600;
        }

        .admin-user-card {
          padding: 1rem 1.25rem;
          background-color: rgba(0, 0, 0, 0.18);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          flex-shrink: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .admin-user-label {
          font-size: 0.78rem;
          color: var(--color-cream);
          opacity: 0.85;
        }

        .admin-user-name {
          font-weight: 600;
          font-size: 0.92rem;
          color: #FFF;
          margin-top: 0.15rem;
        }

        .admin-user-email {
          font-size: 0.75rem;
          color: var(--color-gold);
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .admin-nav-scroll {
          padding: 1rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          min-height: 0;
        }

        .admin-nav-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .admin-nav-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.15);
        }

        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.7rem 0.9rem;
          border-radius: 0;
          color: #E8DDD0;
          background-color: transparent;
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          transition: background-color 0.15s ease, color 0.15s ease;
          white-space: nowrap;
        }

        .admin-nav-item:hover {
          background-color: rgba(255, 255, 255, 0.07);
          color: #FFF;
        }

        .admin-nav-item.active {
          background-color: var(--color-burgundy);
          color: #FFF;
          font-weight: 600;
          box-shadow: inset 3px 0 0 var(--color-gold);
        }

        .admin-bottom-actions {
          padding: 1rem 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background-color: var(--color-burgundy-dark);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex-shrink: 0;
        }

        .admin-action-link, .admin-logout-btn {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          padding: 0.65rem 0.9rem;
          border-radius: 0;
          font-size: 0.88rem;
          text-decoration: none;
          white-space: nowrap;
          border: none;
          background: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: background-color 0.15s ease;
        }

        .admin-action-link {
          color: var(--color-cream);
        }
        .admin-action-link:hover {
          background-color: rgba(255, 255, 255, 0.06);
          color: #FFF;
        }

        .admin-logout-btn {
          color: #FCA5A5;
        }
        .admin-logout-btn:hover {
          background-color: rgba(239, 68, 68, 0.15);
          color: #FECACA;
        }

        .admin-main-viewport {
          flex: 1;
          min-width: 0;
          padding: 2.25rem 2.5rem;
          overflow-y: auto;
        }

        /* Responsive: Icon rail 70px between 640px-900px, full mobile drawer < 640px */
        @media (max-width: 900px) and (min-width: 641px) {
          .admin-sidebar {
            width: 70px;
          }

          .admin-brand-header {
            justify-content: center;
            padding: 1.25rem 0.5rem;
          }

          .admin-brand-text,
          .admin-user-card,
          .admin-nav-label,
          .admin-action-label {
            display: none !important;
          }

          .admin-nav-item,
          .admin-action-link,
          .admin-logout-btn {
            justify-content: center !important;
            padding: 0.75rem 0 !important;
          }

          .admin-main-viewport {
            padding: 1.5rem 1rem;
          }
        }

        /* Full mobile — drawer mode */
        @media (max-width: 640px) {
          .admin-mobile-topbar {
            display: flex !important;
          }

          .admin-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 280px;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 2000;
            box-shadow: var(--shadow-lg);
          }

          .admin-sidebar--open {
            transform: translateX(0);
          }

          .admin-mobile-backdrop {
            display: block !important;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1999;
            animation: fadeIn 0.2s ease;
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
          }

          .admin-root-layout {
            flex-direction: column;
          }

          .admin-main-viewport {
            padding: 1rem;
            padding-top: calc(1rem + 56px); /* account for topbar height */
          }

          /* Restore labels in full mobile drawer */
          .admin-brand-text,
          .admin-nav-label,
          .admin-action-label {
            display: flex !important;
          }
          .admin-user-card {
            display: block !important;
          }

          .admin-nav-item,
          .admin-action-link,
          .admin-logout-btn {
            justify-content: flex-start !important;
            padding: 0.7rem 0.9rem !important;
          }
        }

        /* Mobile top bar — hidden on desktop */
        .admin-mobile-topbar {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 56px;
          background-color: var(--color-burgundy-dark);
          color: #FFF;
          align-items: center;
          padding: 0 1rem;
          gap: 1rem;
          z-index: 1100;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .admin-mobile-menu-btn {
          background: none;
          border: none;
          color: #FFF;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          min-height: 44px;
          min-width: 44px;
          justify-content: center;
        }

        .admin-mobile-brand {
          font-family: var(--font-serif);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #FFF;
        }

        .admin-mobile-backdrop {
          display: none;
        }
      `}</style>
    </div>
  );
}
