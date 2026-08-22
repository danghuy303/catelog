import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building, PhoneCall } from 'lucide-react';
import { Button } from '../common/Button';
import { COMPANY_INFO } from '../../constants/company';

export const B2BSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-4xl bg-gradient-to-r from-brand-600 via-brand-500 to-tealBrand-600 text-white p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden">
          
          {/* Subtle Background Geometry */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-1/3 w-64 h-64 bg-tealBrand-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-white">
                <Building className="w-3.5 h-3.5" />
                <span>ĐỐI TÁC CUNG ỨNG B2B CHUYÊN NGHIỆP</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                Giải pháp sản phẩm dành cho doanh nghiệp
              </h2>

              <p className="text-sm sm:text-base text-blue-100 max-w-2xl font-normal leading-relaxed">
                Thiên Thanh cung cấp danh mục sản phẩm đa dạng phục vụ doanh nghiệp, quà tặng, sự kiện, nhu yếu phẩm công nhân viên và nhu cầu tiêu dùng số lượng lớn với chiết khấu tốt nhất.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:items-end">
              <Link to="/lien-he" className="w-full sm:w-auto lg:w-full">
                <Button
                  size="lg"
                  className="bg-white text-brand-600 hover:bg-blue-50 border-none shadow-lg w-full font-bold"
                  rightIcon={<ArrowRight className="w-4 h-4 text-brand-600" />}
                >
                  Trao đổi với chúng tôi
                </Button>
              </Link>

              <a
                href={`tel:${COMPANY_INFO.hotline}`}
                className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md transition-colors border border-white/20"
              >
                <PhoneCall className="w-4 h-4 text-tealBrand-300" />
                <span>Gọi ngay: {COMPANY_INFO.hotlineFormatted}</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
