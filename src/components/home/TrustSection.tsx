import React from 'react';
import { COMPANY_INFO } from '../../constants/company';
import { Award, PackageCheck, Handshake, Users2 } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const statItems = [
    {
      icon: <Award className="w-7 h-7 text-brand-500" />,
      number: COMPANY_INFO.stats.yearsExperience,
      label: "Năm kinh nghiệm",
      desc: "Phát triển bền vững từ 2016"
    },
    {
      icon: <PackageCheck className="w-7 h-7 text-tealBrand-500" />,
      number: COMPANY_INFO.stats.productsCount,
      label: "Sản phẩm đa dạng",
      desc: "Đáp ứng mọi nhu cầu B2B"
    },
    {
      icon: <Handshake className="w-7 h-7 text-amber-500" />,
      number: COMPANY_INFO.stats.partnersCount,
      label: "Đối tác chiến lược",
      desc: "Nhà sản xuất uy tín hàng đầu"
    },
    {
      icon: <Users2 className="w-7 h-7 text-indigo-500" />,
      number: COMPANY_INFO.stats.clientsCount,
      label: "Khách hàng tin tưởng",
      desc: "Doanh nghiệp trên toàn quốc"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Đồng hành cùng doanh nghiệp bằng những sản phẩm chất lượng
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Con số ấn tượng khẳng định vị thế và năng lực cung ứng của CÔNG TY TNHH TM THIÊN THANH VIỆT NAM
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-surfaceBg border border-gray-100/80 hover:border-brand-200 hover:shadow-soft transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="p-3 rounded-2xl bg-white shadow-sm mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-1 group-hover:text-brand-500 transition-colors">
                {item.number}
              </div>
              <div className="text-sm font-bold text-gray-800">{item.label}</div>
              <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
