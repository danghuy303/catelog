import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../../constants/company';
import { PRODUCT_CATEGORIES_NAV, NEWS_CATEGORIES_NAV } from '../../constants/navigation';
import { Phone, Mail, MapPin, Clock, Building2, Facebook, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-darkBrand text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Column 1: Company Profile & Logo */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-brand-500/30">
                KT
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white tracking-tight leading-none">
                  KIOT THIÊN THANH
                </span>
                <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase mt-1">
                  THIÊN THANH VIỆT NAM
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed">
              CÔNG TY TNHH TM THIÊN THANH VIỆT NAM - Chuyên phân phối các sản phẩm tiêu dùng & giải pháp quà tặng doanh nghiệp B2B uy tín.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-tealBrand-500 shrink-0" />
                <span>Mã số thuế: <strong className="text-white">{COMPANY_INFO.taxCode}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                <span>{COMPANY_INFO.workingHours.weekdays}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Về Thiên Thanh */}
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4 border-l-2 border-brand-500 pl-3">
              Về Thiên Thanh
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/ve-thien-thanh" className="hover:text-white transition-colors">
                  Giới thiệu doanh nghiệp
                </Link>
              </li>
              <li>
                <Link to="/ve-thien-thanh#doi-tac" className="hover:text-white transition-colors">
                  Đối tác chiến lược
                </Link>
              </li>
              <li>
                <Link to="/tin-tuc/tuyen-dung" className="hover:text-white transition-colors">
                  Tuyển dụng nhân tài
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="hover:text-white transition-colors">
                  Tải Catalogue PDF
                </Link>
              </li>
              <li>
                <Link to="/lien-he" className="hover:text-white transition-colors">
                  Yêu cầu báo giá sỉ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Sản phẩm */}
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4 border-l-2 border-brand-500 pl-3">
              Sản phẩm
            </h4>
            <ul className="space-y-2.5 text-xs">
              {PRODUCT_CATEGORIES_NAV.map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/san-pham/${cat.slug}`} className="hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Tin tức */}
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4 border-l-2 border-brand-500 pl-3">
              Tin tức & Hoạt động
            </h4>
            <ul className="space-y-2.5 text-xs">
              {NEWS_CATEGORIES_NAV.map((ncat) => (
                <li key={ncat.slug}>
                  <Link to={`/tin-tuc/${ncat.slug}`} className="hover:text-white transition-colors">
                    {ncat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Thông tin liên hệ */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4 border-l-2 border-brand-500 pl-3">
              Thông tin liên hệ
            </h4>

            <div className="space-y-2.5 text-xs">
              <a
                href={`tel:${COMPANY_INFO.hotline}`}
                className="flex items-start gap-2.5 text-brand-400 hover:text-brand-300 font-bold transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span>Hotline: {COMPANY_INFO.hotlineFormatted}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-start gap-2.5 text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span className="break-all">{COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2.5 text-gray-300">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span>Trụ sở: {COMPANY_INFO.address}</span>
              </div>

              <div className="flex items-start gap-2.5 text-gray-400">
                <Building2 className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                <span>CS1: {COMPANY_INFO.branches[0].address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & social bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Kiot Thiên Thanh. All rights reserved. Công ty TNHH TM Thiên Thanh Việt Nam.</p>

          <div className="flex items-center gap-4">
            <a
              href={COMPANY_INFO.socials.facebook}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-gray-800 hover:bg-brand-500 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={COMPANY_INFO.socials.zalo}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-tealBrand-500 hover:text-white font-bold text-xs transition-colors"
            >
              Zalo OA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
