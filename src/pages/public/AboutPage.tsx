import React from 'react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { COMPANY_INFO } from '../../constants/company';
import { ShieldCheck, Award, Building2, MapPin, CheckCircle2, Users2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Helmet } from 'react-helmet-async';

export const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Về Thiên Thanh - CÔNG TY TNHH TM THIÊN THANH VIỆT NAM</title>
        <meta name="description" content="Tìm hiểu thông tin doanh nghiệp, sứ mệnh, tầm nhìn và năng lực cung ứng của CÔNG TY TNHH TM THIÊN THANH VIỆT NAM." />
      </Helmet>

      <div className="bg-slate-50 py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Về Thiên Thanh' }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
            Về CÔNG TY TNHH TM THIÊN THANH VIỆT NAM
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-3xl">
            Đơn vị uy tín hàng đầu trong lĩnh vực nhập khẩu, phân phối sản phẩm tiêu dùng & cung ứng quà tặng doanh nghiệp B2B.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Main Story */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3 py-1 bg-brand-50 text-brand-600 font-bold text-xs rounded-full border border-brand-200 uppercase">
                LỊCH SỬ HÌNH THÀNH & PHÁT TRIỂN
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                10+ Năm Khẳng Định Uy Tín & Thương Hiệu Trên Thị Trường Việt Nam
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Được thành lập với mục tiêu trở thành cầu nối tin cậy giữa các nhà sản xuất hàng đầu và khối doanh nghiệp, <strong>Kiot Thiên Thanh</strong> luôn tiên phong mang lại giải pháp quà tặng sáng tạo, sản phẩm tiêu dùng chất lượng cao cùng mức giá tối ưu nhất.
              </p>
              <div className="p-4 bg-slate-50 border-l-4 border-brand-500 rounded-r-2xl text-xs sm:text-sm text-gray-700 font-medium">
                Mã số thuế: <strong className="text-gray-900">{COMPANY_INFO.taxCode}</strong> | Cấp bởi Sở Kế Hoạch & Đầu Tư Thành Phố Hải Phòng.
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                  alt="Đội ngũ Thiên Thanh Việt Nam"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-surfaceBg border border-gray-100 shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tầm nhìn</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Trở thành hệ sinh thái cung ứng sản phẩm tiêu dùng và giải pháp quà tặng doanh nghiệp B2B hàng đầu Miền Bắc và toàn quốc.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surfaceBg border border-gray-100 shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-tealBrand-50 text-tealBrand-500 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sứ mệnh</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tối ưu chi phí mua sắm cho doanh nghiệp, nâng cao giá trị trải nghiệm cho người nhận bằng sản phẩm an toàn, chuẩn nguồn gốc 100%.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surfaceBg border border-gray-100 shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Giá trị cốt lõi</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tận tâm - Chất lượng - Trung thực - Tốc độ - Đồng hành cùng sự phát triển của quý đối tác.
              </p>
            </div>
          </div>

          {/* Infrastructure & Branches */}
          <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-4xl shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">
              Hạ Tầng Kho Vận & Chi Nhánh Văn Phòng
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-300">
              <div className="p-5 bg-white/10 rounded-2xl border border-white/10">
                <div className="font-bold text-white text-sm flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-brand-400" />
                  Trụ sở chính (Hà Nội)
                </div>
                <p>{COMPANY_INFO.address}</p>
              </div>

              <div className="p-5 bg-white/10 rounded-2xl border border-white/10">
                <div className="font-bold text-white text-sm flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-tealBrand-400" />
                  Chi nhánh 1 (Hải Phòng)
                </div>
                <p>{COMPANY_INFO.branches[0].address}</p>
              </div>

              <div className="p-5 bg-white/10 rounded-2xl border border-white/10">
                <div className="font-bold text-white text-sm flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  Chi nhánh 2 (Hưng Yên)
                </div>
                <p>{COMPANY_INFO.branches[1].address}</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};
