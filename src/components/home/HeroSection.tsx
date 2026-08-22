import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-surfaceBg py-12 sm:py-20 lg:py-24">
      {/* Decorative Blob Shapes */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-200/30 to-teal-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-extrabold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THIÊN THANH VIỆT NAM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              Giải pháp <span className="text-brand-500 underline decoration-brand-200 decoration-wavy underline-offset-8">quà tặng</span> & sản phẩm tiêu dùng cho doanh nghiệp
            </h1>

            <p className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Đồng hành cùng doanh nghiệp trong việc lựa chọn, cung ứng và phát triển các sản phẩm chất lượng, phù hợp với nhu cầu thị trường & tối ưu ngân sách.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/san-pham" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto">
                  Khám phá sản phẩm
                </Button>
              </Link>

              <Link to="/lien-he" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Liên hệ ngay
                </Button>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-tealBrand-500 shrink-0" />
                <span className="text-xs font-semibold text-gray-700">Giá sỉ chiết khấu cao</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-tealBrand-500 shrink-0" />
                <span className="text-xs font-semibold text-gray-700">In dập logo theo yêu cầu</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-tealBrand-500 shrink-0" />
                <span className="text-xs font-semibold text-gray-700">Giao hàng toàn quốc</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3] sm:aspect-[1/1]">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80"
                  alt="Hộp quà tặng doanh nghiệp Thiên Thanh"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-brand-500 rounded-md">
                    B2B Gift Solution
                  </span>
                  <h3 className="text-lg font-bold mt-1">Hộp Quà Thịnh Vượng 2026</h3>
                  <p className="text-xs text-gray-200 mt-0.5">Sản phẩm tiêu biểu cung ứng cho hơn 500+ tập đoàn đối tác</p>
                </div>
              </div>

              {/* Floating Card 1: Verified Partner */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-3 hidden sm:flex"
              >
                <div className="p-2.5 rounded-xl bg-tealBrand-50 text-tealBrand-500">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Chất lượng kiểm định</div>
                  <div className="text-[11px] font-medium text-gray-500">100% chính hãng CO/CQ</div>
                </div>
              </motion.div>

              {/* Floating Card 2: Top Award */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-3 hidden sm:flex"
              >
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">10+ Năm uy tín</div>
                  <div className="text-[11px] font-medium text-gray-500">Đối tác cung ứng tin cậy</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
