import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthProvider } from '../features/auth/AuthContext';

// Public Pages
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { StoryPage } from '../pages/StoryPage';
import { ContactPage } from '../pages/ContactPage';
import { LegalPage } from '../pages/LegalPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { CookiePolicyPage } from '../pages/CookiePolicyPage';
import { NotFoundPage } from '../pages/NotFoundPage';

// Admin Pages
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminProductsPage } from '../pages/admin/AdminProductsPage';
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage';
import { AdminMessagesPage } from '../pages/admin/AdminMessagesPage';
import { AdminContentPage } from '../pages/admin/AdminContentPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';
import { AdminSecurityPage } from '../pages/admin/AdminSecurityPage';
import { ScrollToTop } from '../components/ScrollToTop';

export function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/produits" element={<ProductsPage />} />
          <Route path="/produits/:slug" element={<ProductDetailPage />} />
          <Route path="/notre-histoire" element={<StoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
          <Route path="/politique-de-confidentialite" element={<PrivacyPage />} />
          <Route path="/gestion-des-cookies" element={<CookiePolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="produits" element={<AdminProductsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="messages" element={<AdminMessagesPage />} />
          <Route path="contenu" element={<AdminContentPage />} />
          <Route path="parametres" element={<AdminSettingsPage />} />
          <Route path="securite" element={<AdminSecurityPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
