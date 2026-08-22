import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCT_CATEGORIES_NAV } from '../../constants/navigation';
import { Wine, Sparkles, Gift, CookingPot, Home, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Wine: <Wine className="w-5 h-5 text-brand-500" />,
  Sparkles: <Sparkles className="w-5 h-5 text-tealBrand-500" />,
  Gift: <Gift className="w-5 h-5 text-amber-500" />,
  CookingPot: <CookingPot className="w-5 h-5 text-rose-500" />,
  Home: <Home className="w-5 h-5 text-indigo-500" />,
};

interface MegaMenuProps {
  onClose?: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-5xl bg-white rounded-3xl shadow-mega border border-gray-100 p-8 z-50 mt-2"
    >
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Category Grid */}
        <div className="col-span-8">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              DANH MỤC SẢN PHẨM KHUYÊN DÙNG
            </span>
            <Link
              to="/san-pham"
              onClick={onClose}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
            >
              <span>Xem tất cả danh mục</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {PRODUCT_CATEGORIES_NAV.map((cat) => (
              <Link
                key={cat.slug}
                to={`/san-pham/${cat.slug}`}
                onClick={onClose}
                className="group flex items-start gap-3.5 p-3.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-gray-100 transition-all"
              >
                <div className="p-2.5 rounded-xl bg-slate-100/80 group-hover:bg-white group-hover:shadow-md transition-all shrink-0">
                  {iconMap[cat.iconName] || <Wine className="w-5 h-5 text-brand-500" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900 group-hover:text-brand-500 transition-colors">
                      {cat.name}
                    </span>
                    {cat.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase text-white bg-brand-500 rounded-full">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: Promotional B2B Banner */}
        <div className="col-span-4 bg-gradient-to-br from-brand-500 via-brand-600 to-brand- dark text-white p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div>
            <span className="inline-block px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white rounded-full mb-3">
              GIẢI PHÁP B2B
            </span>
            <h4 className="text-lg font-bold leading-snug mb-2">
              Quà Tặng & Nhu Yếu Phẩm Cho Doanh Nghiệp
            </h4>
            <p className="text-xs text-blue-100 leading-relaxed mb-4">
              Cung cấp số lượng lớn, chiết khấu hấp dẫn, in ấn logo thương hiệu theo yêu cầu.
            </p>
          </div>
          <Link
            to="/lien-he"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white text-brand-600 hover:bg-blue-50 rounded-xl text-xs font-bold shadow-md transition-all"
          >
            <span>Nhận Báo Giá Sỉ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
