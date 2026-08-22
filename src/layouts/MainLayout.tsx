import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FloatingContact } from '../components/layout/FloatingContact';
import { Toaster } from 'sonner';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-surfaceBg text-darkBrand font-sans antialiased">
      <Toaster position="top-right" richColors />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <FloatingContact />
      <Footer />
    </div>
  );
};
