import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Menu, X } from 'lucide-react';
import { WheatLogo } from './brand/WheatLogo';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNousTrouver = (e) => {
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
    <header
      style={{
        backgroundColor: 'var(--color-ivory)',
        borderBottom: '1px solid var(--color-border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        padding: '1.1rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--color-burgundy)' : 'var(--color-text-main)',
                position: 'relative',
                paddingBottom: '4px',
                borderBottom: isActive ? '2px solid var(--color-burgundy)' : '2px solid transparent'
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA : "NOUS TROUVER" */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
              transition: 'background-color var(--transition-fast), transform var(--transition-fast)'
            }}
          >
            <MapPin size={14} />
            <span>Nous trouver</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-toggle"
            aria-label="Ouvrir le menu de navigation"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--color-burgundy)',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-ivory)',
            borderTop: '1px solid var(--color-border)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                fontSize: '1.1rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--color-burgundy)' : 'var(--color-text-main)',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--color-border-subtle)'
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/#localisation"
            onClick={(e) => {
              setMobileOpen(false);
              handleNousTrouver(e);
            }}
            className="btn btn-primary"
            style={{
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              borderRadius: 0
            }}
          >
            <MapPin size={18} />
            <span>Nous trouver au fournil</span>
          </Link>
        </div>
      )}

      {/* Inline styles for responsive breakpoints */}
      <style>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .find-us-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
