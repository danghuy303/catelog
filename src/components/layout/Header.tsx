import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Phone, Menu, ChevronDown, Search } from 'lucide-react';
import { COMPANY_INFO } from '../../constants/company';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { Button } from '../common/Button';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMegaOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-soft border-b border-gray-100/80 h-20' : 'h-20 sm:h-22 border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform">
              KT
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-gray-900 tracking-tight leading-none group-hover:text-brand-500 transition-colors">
                KIOT THIÊN THANH
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-gray-500 tracking-wider uppercase mt-1">
                THIÊN THANH VIỆT NAM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              to="/ve-thien-thanh"
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-colors ${
                location.pathname === '/ve-thien-thanh'
                  ? 'text-brand-500 bg-brand-50'
                  : 'text-gray-700 hover:text-brand-500 hover:bg-slate-50'
              }`}
            >
              Về Thiên Thanh
            </Link>

            {/* Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <Link
                to="/san-pham"
                className={`px-3.5 py-2 rounded-xl text-sm font-bold inline-flex items-center gap-1.5 transition-colors ${
                  location.pathname.startsWith('/san-pham')
                    ? 'text-brand-500 bg-brand-50'
                    : 'text-gray-700 hover:text-brand-500 hover:bg-slate-50'
                }`}
              >
                <span>Sản phẩm</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    megaOpen ? 'rotate-180 text-brand-500' : ''
                  }`}
                />
              </Link>

              {/* Animated Dropdown Mega Menu */}
              <AnimatePresence>
                {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
              </AnimatePresence>
            </div>

            <Link
              to="/tin-tuc"
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-colors ${
                location.pathname.startsWith('/tin-tuc')
                  ? 'text-brand-500 bg-brand-50'
                  : 'text-gray-700 hover:text-brand-500 hover:bg-slate-50'
              }`}
            >
              Tin tức
            </Link>

            <Link
              to="/catalogue"
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-colors ${
                location.pathname === '/catalogue'
                  ? 'text-brand-500 bg-brand-50'
                  : 'text-gray-700 hover:text-brand-500 hover:bg-slate-50'
              }`}
            >
              Catalogue
            </Link>

            <Link
              to="/lien-he"
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-colors ${
                location.pathname === '/lien-he'
                  ? 'text-brand-500 bg-brand-50'
                  : 'text-gray-700 hover:text-brand-500 hover:bg-slate-50'
              }`}
            >
              Liên hệ
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Icon Quick Link */}
            <Link
              to="/tim-kiem"
              className="p-2.5 text-gray-500 hover:text-brand-500 hover:bg-slate-100 rounded-xl transition-colors hidden sm:flex"
              title="Tìm kiếm sản phẩm"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Hotline Display */}
            <a
              href={`tel:${COMPANY_INFO.hotline}`}
              className="hidden xl:flex items-center gap-2.5 px-3.5 py-2 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-brand-50 text-brand-500 group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  HOTLINE TƯ VẤN
                </span>
                <span className="text-sm font-extrabold text-brand-600 group-hover:text-brand-700">
                  {COMPANY_INFO.hotlineFormatted}
                </span>
              </div>
            </a>

            {/* Contact CTA Button */}
            <Link to="/lien-he" className="hidden sm:block">
              <Button size="md" variant="primary">
                Liên hệ ngay
              </Button>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 text-gray-700 hover:text-brand-500 hover:bg-slate-100 rounded-xl lg:hidden transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
