import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Layers, ShieldCheck, UserCheck, Cpu, Headset, HeartHandshake } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const reasons = [
    {
      num: "01",
      icon: <Layers className="w-6 h-6 text-brand-500" />,
      title: "Sản phẩm đa dạng",
      desc: "Danh mục phong phú từ đồ uống, hóa mỹ phẩm, bánh mứt kẹo đến thực phẩm nhà bếp & gia dụng."
    },
    {
      num: "02",
      icon: <ShieldCheck className="w-6 h-6 text-tealBrand-500" />,
      title: "Nguồn hàng uy tín",
      desc: "Nhập khẩu và phân phối trực tiếp từ nhà sản xuất chính hãng, đầy đủ hóa đơn chứng từ VAT & CO/CQ."
    },
    {
      num: "03",
      icon: <UserCheck className="w-6 h-6 text-amber-500" />,
      title: "Dịch vụ chuyên nghiệp",
      desc: "Quy trình làm việc B2B nhanh gọn, đóng gói chuẩn quà tặng, hỗ trợ in dập dán logo thương hiệu."
    },
    {
      num: "04",
      icon: <Cpu className="w-6 h-6 text-rose-500" />,
      title: "Giải pháp phù hợp doanh nghiệp",
      desc: "Thiết kế bộ quà theo đúng ngân sách, thông điệp truyền thông và đặc thụ từng sự kiện doanh nghiệp."
    },
    {
      num: "05",
      icon: <Headset className="w-6 h-6 text-indigo-500" />,
      title: "Hỗ trợ nhanh chóng",
      desc: "Đội ngũ chuyên viên tư vấn trực tuyến 24/7, xử lý báo giá và mẫu thử sản phẩm trong vòng 24h."
    },
    {
      num: "06",
      icon: <HeartHandshake className="w-6 h-6 text-emerald-500" />,
      title: "Đồng hành lâu dài",
      desc: "Chính sách chiết khấu lũy tiến, ưu tiên kho vận và hỗ trợ thanh toán linh hoạt cho khách hàng thân thiết."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-surfaceBg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="TẠI SAO CHỌN THIÊN THANH"
          title="Tại sao lựa chọn Kiot Thiên Thanh?"
          subheading="Chúng tôi cam kết mang đến giá trị đích thực và sự an tâm tuyệt đối cho mọi khách hàng doanh nghiệp."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((r) => (
            <div
              key={r.num}
              className="bg-white p-7 rounded-3xl border border-gray-100 shadow-soft hover:shadow-soft-lg hover:border-brand-200 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Large Outline Number Accent */}
              <div className="absolute top-4 right-6 text-4xl font-black text-slate-100 group-hover:text-brand-50 transition-colors pointer-events-none">
                {r.num}
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 w-fit mb-5 group-hover:bg-brand-50 transition-colors">
                {r.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                {r.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
