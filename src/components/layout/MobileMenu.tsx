import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Phone, Mail, ArrowRight } from 'lucide-react';
import { PRODUCT_CATEGORIES_NAV, NEWS_CATEGORIES_NAV } from '../../constants/navigation';
import { COMPANY_INFO } from '../../constants/company';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [productOpen, setProductOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-black text-sm">
                  KT
                </div>
                <span className="font-extrabold text-gray-900 tracking-tight">
                  KIOT THIÊN THANH
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Accordion */}
            <div className="p-5 flex-1 space-y-2">
              <Link
                to="/"
                onClick={onClose}
                className="block py-3 px-4 text-base font-bold text-gray-800 hover:bg-slate-50 rounded-xl transition-colors"
              >
                Trang chủ
              </Link>

              <Link
                to="/ve-thien-thanh"
                onClick={onClose}
                className="block py-3 px-4 text-base font-bold text-gray-800 hover:bg-slate-50 rounded-xl transition-colors"
              >
                Về Thiên Thanh
              </Link>

              {/* Sản phẩm Accordion */}
              <div>
                <button
                  onClick={() => setProductOpen(!productOpen)}
                  className="flex items-center justify-between w-full py-3 px-4 text-base font-bold text-gray-800 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <span>Sản phẩm</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      productOpen ? 'rotate-180 text-brand-500' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {productOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-6 pr-2 space-y-1 overflow-hidden"
                    >
                      {PRODUCT_CATEGORIES_NAV.map((cat) => (
                        <Link
                          key={cat.slug}
                          to={`/san-pham/${cat.slug}`}
                          onClick={onClose}
                          className="block py-2 px-3 text-sm font-medium text-gray-600 hover:text-brand-500 hover:bg-blue-50/50 rounded-lg transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Tin tức Accordion */}
              <div>
                <button
                  onClick={() => setNewsOpen(!newsOpen)}
                  className="flex items-center justify-between w-full py-3 px-4 text-base font-bold text-gray-800 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <span>Tin tức</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      newsOpen ? 'rotate-180 text-brand-500' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {newsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-6 pr-2 space-y-1 overflow-hidden"
                    >
                      {NEWS_CATEGORIES_NAV.map((ncat) => (
                        <Link
                          key={ncat.slug}
                          to={`/tin-tuc/${ncat.slug}`}
                          onClick={onClose}
                          className="block py-2 px-3 text-sm font-medium text-gray-600 hover:text-brand-500 hover:bg-blue-50/50 rounded-lg transition-colors"
                        >
                          {ncat.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/catalogue"
                onClick={onClose}
                className="block py-3 px-4 text-base font-bold text-gray-800 hover:bg-slate-50 rounded-xl transition-colors"
              >
                Catalogue
              </Link>

              <Link
                to="/lien-he"
                onClick={onClose}
                className="block py-3 px-4 text-base font-bold text-gray-800 hover:bg-slate-50 rounded-xl transition-colors"
              >
                Liên hệ
              </Link>
            </div>

            {/* Footer Contact Info */}
            <div className="p-5 border-t border-gray-100 bg-slate-50 space-y-4">
              <div className="space-y-2">
                <a
                  href={`tel:${COMPANY_INFO.hotline}`}
                  className="flex items-center gap-3 text-sm font-bold text-brand-600 hover:text-brand-700"
                >
                  <div className="p-2 rounded-lg bg-brand-50 text-brand-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>{COMPANY_INFO.hotlineFormatted}</span>
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-3 text-xs font-medium text-gray-600 hover:text-gray-900 truncate"
                >
                  <div className="p-2 rounded-lg bg-gray-100 text-gray-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="truncate">{COMPANY_INFO.email}</span>
                </a>
              </div>

              <Link
                to="/lien-he"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 bg-brand-500 text-white font-bold text-sm rounded-xl shadow-md shadow-brand-500/20 active:scale-98 transition-all"
              >
                <span>Liên hệ ngay</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
