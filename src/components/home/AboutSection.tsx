import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Truck, Sparkles, Building2 } from 'lucide-react';
import { Button } from '../common/Button';

export const AboutSection: React.FC = () => {
  const highlights = [
    { title: "Sản phẩm đa dạng", desc: "Hơn 500+ dòng sản phẩm từ đồ uống, bánh mứt kẹo đến gia dụng." },
    { title: "Chất lượng kiểm soát 100%", desc: "Đầy đủ chứng nhận nguồn gốc xuất xứ (CO) và an toàn thực phẩm." },
    { title: "Đối tác uy tín hàng đầu", desc: "Liên kết với các tập đoàn và nhà sản xuất lớn tại Việt Nam & quốc tế." },
    { title: "Dịch vụ chuyên nghiệp", desc: "Tư vấn thiết kế bộ quà tặng cá nhân hóa, in logo ấn tượng." },
    { title: "Đồng hành lâu dài", desc: "Chính sách giá sỉ ưu đãi và hỗ trợ hậu mãi chu đáo cho doanh nghiệp." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Corporate Imagery Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border-4 border-slate-50 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Đội ngũ CÔNG TY TNHH TM THIÊN THANH VIỆT NAM"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-1 text-tealBrand-400">
                  <Building2 className="w-5 h-5" />
                  <span className="text-xs font-extrabold uppercase tracking-wider">Trụ Sở Chính</span>
                </div>
                <h4 className="text-lg font-bold">Techno Park Gia Lâm, Hà Nội</h4>
                <p className="text-xs text-gray-300">Trung tâm phát triển và kết nối cung ứng B2B trên toàn quốc</p>
              </div>
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-brand-500 text-white p-5 rounded-3xl shadow-xl hidden sm:flex items-center gap-4 max-w-xs">
              <div className="p-3 bg-white/20 rounded-2xl">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black">100%</div>
                <div className="text-xs font-semibold text-blue-100">Cam kết chính hãng & an toàn</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Bullet Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block px-3 py-1 bg-brand-50 border border-brand-200 text-brand-600 rounded-full text-xs font-extrabold tracking-wider uppercase">
              VỀ THIÊN THANH VIỆT NAM
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Kiến tạo giá trị bền vững cùng đối tác doanh nghiệp
            </h2>

            <p className="text-base text-gray-600 leading-relaxed font-normal">
              <strong>CÔNG TY TNHH TM THIÊN THANH VIỆT NAM</strong> tự hào là đối tác tiên phong trong lĩnh vực cung ứng hàng tiêu dùng, giải pháp quà tặng doanh nghiệp và thực phẩm cao cấp tại Hà Nội, Hải Phòng, Hưng Yên và trên toàn quốc.
            </p>

            {/* Highlighted Bullets */}
            <div className="space-y-4 pt-2">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start gap-3.5 group">
                  <div className="p-1 rounded-full bg-tealBrand-50 text-tealBrand-500 mt-0.5 group-hover:bg-tealBrand-500 group-hover:text-white transition-colors shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link to="/ve-thien-thanh">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Tìm hiểu về Thiên Thanh
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
