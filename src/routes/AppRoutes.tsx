import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Public Pages
import { HomePage } from '../pages/public/HomePage';
import { AboutPage } from '../pages/public/AboutPage';
import { ProductsPage } from '../pages/public/ProductsPage';
import { ProductDetailPage } from '../pages/public/ProductDetailPage';
import { NewsPage } from '../pages/public/NewsPage';
import { NewsDetailPage } from '../pages/public/NewsDetailPage';
import { CataloguePage } from '../pages/public/CataloguePage';
import { ContactPage } from '../pages/public/ContactPage';
import { SearchPage } from '../pages/public/SearchPage';

// Admin Pages
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage';
import { AdminProductsPage } from '../pages/admin/AdminProductsPage';
import { AdminProductEditPage } from '../pages/admin/AdminProductEditPage';
import { AdminNewsPage } from '../pages/admin/AdminNewsPage';
import { AdminNewsEditPage } from '../pages/admin/AdminNewsEditPage';
import { AdminNewsCategoriesPage } from '../pages/admin/AdminNewsCategoriesPage';
import { AdminCataloguesPage } from '../pages/admin/AdminCataloguesPage';
import { AdminContactsPage } from '../pages/admin/AdminContactsPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ve-thien-thanh" element={<AboutPage />} />
        <Route path="/san-pham" element={<ProductsPage />} />
        <Route path="/san-pham/:categorySlug" element={<ProductsPage />} />
        <Route path="/san-pham/:categorySlug/:productSlug" element={<ProductDetailPage />} />
        <Route path="/tin-tuc" element={<NewsPage />} />
        <Route path="/tin-tuc/:categorySlug" element={<NewsPage />} />
        <Route path="/tin-tuc/:categorySlug/:slug" element={<NewsDetailPage />} />
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/tim-kiem" element={<SearchPage />} />
      </Route>

      {/* Admin Auth Route */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Admin CMS Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/categories" element={<AdminCategoriesPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/products/create" element={<AdminProductEditPage />} />
          <Route path="/admin/products/:id/edit" element={<AdminProductEditPage />} />
          <Route path="/admin/news" element={<AdminNewsPage />} />
          <Route path="/admin/news/create" element={<AdminNewsEditPage />} />
          <Route path="/admin/news/:id/edit" element={<AdminNewsEditPage />} />
          <Route path="/admin/news-categories" element={<AdminNewsCategoriesPage />} />
          <Route path="/admin/catalogues" element={<AdminCataloguesPage />} />
          <Route path="/admin/contacts" element={<AdminContactsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
        </Route>
      </Route>

      {/* Fallback 404 Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
