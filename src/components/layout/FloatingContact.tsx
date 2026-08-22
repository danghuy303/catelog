import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { ZaloIcon } from '../common/ZaloIcon';
import { COMPANY_INFO } from '../../constants/company';

export const FloatingContact: React.FC = () => {
  return (
    <div className="fixed right-4 sm:right-6 bottom-6 z-40 flex flex-col gap-3 group">
      {/* Zalo Button */}
      <a
        href={COMPANY_INFO.socials.zalo}
        target="_blank"
        rel="noreferrer"
        className="relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 bg-tealBrand-500 hover:bg-tealBrand-600 text-white rounded-full shadow-lg shadow-tealBrand-500/30 hover:scale-110 active:scale-95 transition-all"
        title="Chat Zalo ngay"
      >
        <ZaloIcon className="w-6 h-6" />
        <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md hidden sm:block">
          Chat Zalo với Thiên Thanh
        </span>
      </a>

      {/* Hotline Call Button */}
      <a
        href={`tel:${COMPANY_INFO.hotline}`}
        className="relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-lg shadow-brand-500/30 hover:scale-110 active:scale-95 transition-all animate-bounce"
        title="Gọi hotline tư vấn"
      >
        <Phone className="w-6 h-6" />
        <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md hidden sm:block">
          Hotline: {COMPANY_INFO.hotlineFormatted}
        </span>
      </a>

      {/* Email Quick Link */}
      <a
        href={`mailto:${COMPANY_INFO.email}`}
        className="relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 bg-gray-900 hover:bg-black text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all hidden sm:flex"
        title="Gửi Email liên hệ"
      >
        <Mail className="w-5 h-5" />
      </a>
    </div>
  );
};
