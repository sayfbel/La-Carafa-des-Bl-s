import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';
import { App } from '../app/App';

describe('Frontend Components Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Header renders brand logo and navigation links', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText(/LA CARAFA/i)).toBeInTheDocument();
    expect(screen.getByText(/DES BLÉS/i)).toBeInTheDocument();
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Nos produits')).toBeInTheDocument();
    expect(screen.getByText('Notre histoire')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Nous trouver')).toBeInTheDocument();
  });

  it('Footer renders verified business location and phone details', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByText(/15 Rue Pasteur/i)).toBeInTheDocument();
    expect(screen.getByText(/91360 Épinay-sur-Orge/i)).toBeInTheDocument();
    expect(screen.getByText(/07 53 79 29 19/i)).toBeInTheDocument();
    expect(screen.getByText(/Ouvrir dans Google Maps/i)).toBeInTheDocument();
    expect(screen.getByText(/Mentions légales/i)).toBeInTheDocument();
    expect(screen.getByText(/Politique de confidentialité/i)).toBeInTheDocument();
  });

  it('CookieBanner renders and can be accepted', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <CookieBanner />
      </BrowserRouter>
    );

    expect(screen.getByText(/Respect de votre vie privée/i)).toBeInTheDocument();
    const acceptBtn = screen.getByText('Accepter');
    fireEvent.click(acceptBtn);

    expect(localStorage.getItem('lacarafa_cookie_consent')).toBe('accepted');
    expect(screen.queryByText(/Respect de votre vie privée/i)).not.toBeInTheDocument();
  });

  it('App renders homepage with hero heading', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }} initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/BOULANGERIE • PÂTISSERIE ARTISANALE/i)).toBeInTheDocument();
    expect(screen.getByText(/Le goût des bonnes choses/i)).toBeInTheDocument();
    expect(screen.getByText(/Découvrir nos créations/i)).toBeInTheDocument();
  });

  it('App renders Notre Histoire page with monumental artisan headline and timeline', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }} initialEntries={['/notre-histoire']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Maison Artisanale Fondée sur la Tradition/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Le temps ne respecte rien de ce qui se fait sans lui/i)).toBeInTheDocument();
    expect(screen.getByText(/Pourquoi Nous Avons Choisi le Levain Naturel/i)).toBeInTheDocument();
    expect(screen.getByText(/24 Heures dans le Secret du Fournil/i)).toBeInTheDocument();
  });

  it('Navigating to invalid route renders 404 page', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }} initialEntries={['/une-fournee-qui-nexiste-pas']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Cette fournée n'existe pas/i)).toBeInTheDocument();
  });
});

describe('Store Live Status Utility', () => {
  it('correctly handles admin force closed override', async () => {
    const { getStoreLiveStatus } = await import('../utils/storeStatus');
    const status = getStoreLiveStatus({ store_status_mode: 'forced_closed', store_status_custom_message: 'Congés annuels' });
    expect(status.isOpen).toBe(false);
    expect(status.badgeText).toBe('Fermé Exceptionnellement');
    expect(status.subtext).toBe('Congés annuels');
  });

  it('correctly handles admin force open override', async () => {
    const { getStoreLiveStatus } = await import('../utils/storeStatus');
    const status = getStoreLiveStatus({ store_status_mode: 'forced_open' });
    expect(status.isOpen).toBe(true);
    expect(status.badgeText).toBe('Fournil Ouvert');
  });

  it('calculates auto schedule without throwing error', async () => {
    const { getStoreLiveStatus } = await import('../utils/storeStatus');
    const status = getStoreLiveStatus({ store_status_mode: 'auto' });
    expect(typeof status.isOpen).toBe('boolean');
    expect(status.badgeText).toBeTruthy();
  });
});
