import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Menu, X } from 'lucide-react';
import { WheatLogo } from './brand/WheatLogo';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNousTrouver = (e) => {
    setMobileOpen(false);
    const isHomePage = location.pathname === '/' || location.pathname.toLowerCase() === '/accueil';
    if (isHomePage) {
      const el = document.getElementById('localisation');
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', '/#localisation');
      }
    } else {
      e.preventDefault();
      navigate('/#localisation');
    }
  };

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/produits', label: 'Nos produits' },
    { to: '/notre-histoire', label: 'Notre histoire' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <header
        style={{
          backgroundColor: 'var(--color-ivory)',
          borderBottom: '1px solid var(--color-border-subtle)',
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          padding: '0.95rem 0'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          {/* Brand Logo */}
          <WheatLogo />

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem'
            }}
            className="desktop-nav"
            aria-label="Navigation principale"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--color-burgundy)' : 'var(--color-text-main)',
                  position: 'relative',
                  paddingBottom: '4px',
                  borderBottom: isActive ? '2px solid var(--color-burgundy)' : '2px solid transparent',
                  whiteSpace: 'nowrap'
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            {/* Desktop CTA */}
            <Link
              to="/#localisation"
              onClick={handleNousTrouver}
              className="find-us-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'var(--color-burgundy-dark)',
                color: 'var(--color-white)',
                padding: '0.6rem 1.4rem',
                borderRadius: 0,
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background-color var(--transition-fast), transform var(--transition-fast)',
                minHeight: '44px'
              }}
            >
              <MapPin size={14} />
              <span>Nous trouver</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-toggle"
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu de navigation'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu-drawer"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'var(--color-burgundy)',
                cursor: 'pointer',
                padding: '0.5rem',
                minWidth: '44px',
                minHeight: '44px',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-Down Drawer */}
      <div
        id="mobile-menu-drawer"
        className={`mobile-drawer ${mobileOpen ? 'mobile-drawer--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Navigation mobile">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.08rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-burgundy)' : 'var(--color-text-main)',
                padding: '1rem var(--container-px-sm)',
                borderBottom: '1px solid var(--color-border-subtle)',
                minHeight: '52px',
                transition: 'color var(--transition-fast), background-color var(--transition-fast)'
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <div style={{ padding: '1rem var(--container-px-sm) 1.5rem' }}>
            <Link
              to="/#localisation"
              onClick={handleNousTrouver}
              className="btn btn-primary"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                borderRadius: 0,
                fontSize: '0.9rem',
                minHeight: '52px'
              }}
            >
              <MapPin size={18} />
              <span>Nous trouver au fournil</span>
            </Link>
          </div>
        </nav>
      </div>

      <style>{`
        /* Desktop — hide hamburger, show nav */
        @media (min-width: 861px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
          .find-us-btn { display: inline-flex !important; }
          .mobile-drawer { display: none !important; }
          .mobile-backdrop { display: none !important; }
        }

        /* Mobile — show hamburger, hide desktop nav */
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
          .find-us-btn { display: none !important; }
        }

        /* Mobile drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background-color: var(--color-ivory);
          z-index: 1099;
          transform: translateY(-110%);
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--shadow-lg);
          padding-top: 70px; /* Clear sticky header */
          border-bottom: 2px solid var(--color-burgundy);
        }

        .mobile-drawer--open {
          transform: translateY(0);
        }

        /* Backdrop */
        .mobile-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(41, 34, 30, 0.45);
          z-index: 1098;
          animation: fadeIn 0.25s ease;
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
        }

        /* Active mobile nav item background */
        .mobile-drawer nav a[aria-current="page"] {
          background-color: rgba(89, 11, 22, 0.06);
        }
      `}</style>
    </>
  );
}
