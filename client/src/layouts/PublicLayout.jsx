import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieBanner } from '../components/CookieBanner';

export function PublicLayout() {
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
