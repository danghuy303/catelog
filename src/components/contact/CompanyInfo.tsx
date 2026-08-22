import React from 'react';
import { COMPANY_INFO } from '../../constants/company';
import { Building2, ShieldCheck, Phone, Mail, MapPin, Clock, Calendar } from 'lucide-react';

export const CompanyInfo: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-darkBrand to-slate-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6 relative overflow-hidden border border-gray-800">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-tealBrand-400 uppercase tracking-wider mb-3">
          <Building2 className="w-3.5 h-3.5" />
          <span>THÔNG TIN DOANH NGHIỆP</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {COMPANY_INFO.name}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
          <ShieldCheck className="w-4 h-4 text-tealBrand-500" />
          <span>Mã số thuế: <strong className="text-white font-mono">{COMPANY_INFO.taxCode}</strong></span>
        </div>
      </div>

      <div className="space-y-4 pt-2 border-t border-gray-800 text-xs sm:text-sm text-gray-300">
        
        {/* Hotline */}
        <a
          href={`tel:${COMPANY_INFO.hotline}`}
          className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors group"
        >
          <div className="p-2 rounded-xl bg-brand-500 text-white group-hover:scale-110 transition-transform shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-gray-400">Hotline tư vấn 24/7</div>
            <div className="text-base text-brand-300 font-extrabold">{COMPANY_INFO.hotlineFormatted}</div>
          </div>
        </a>

        {/* Email */}
        <a
          href={`mailto:${COMPANY_INFO.email}`}
          className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-colors group"
        >
          <div className="p-2 rounded-xl bg-tealBrand-500 text-white group-hover:scale-110 transition-transform shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-gray-400">Email báo giá</div>
            <div className="text-sm font-semibold text-gray-200">{COMPANY_INFO.email}</div>
          </div>
        </a>

        {/* Trụ sở chính */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Trụ sở văn phòng:</strong>
            <p className="text-gray-400 text-xs mt-0.5">{COMPANY_INFO.address}</p>
          </div>
        </div>

        {/* Chi nhánh 1 */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-tealBrand-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">CS1 (Hải Phòng):</strong>
            <p className="text-gray-400 text-xs mt-0.5">{COMPANY_INFO.branches[0].address}</p>
          </div>
        </div>

        {/* Chi nhánh 2 */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">CS2 (Hưng Yên):</strong>
            <p className="text-gray-400 text-xs mt-0.5">{COMPANY_INFO.branches[1].address}</p>
          </div>
        </div>

        {/* Giờ làm việc */}
        <div className="flex items-start gap-3 pt-2 border-t border-gray-800">
          <Clock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">Thời gian làm việc:</strong>
            <p className="text-gray-400 text-xs mt-0.5">{COMPANY_INFO.workingHours.weekdays}</p>
            <p className="text-gray-400 text-xs">{COMPANY_INFO.workingHours.saturday}</p>
          </div>
        </div>

      </div>
    </div>
  );
};
