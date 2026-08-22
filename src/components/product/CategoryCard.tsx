import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCategory } from '../../types/category';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: ProductCategory;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/san-pham/${category.slug}`}
      className="group relative flex flex-col justify-end h-80 sm:h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1.5 border border-gray-100"
    >
      {/* Background Image with Zoom */}
      <img
        src={category.imageUrl}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent group-hover:from-brand-950/90 transition-colors duration-500" />

      {/* Content */}
      <div className="relative p-6 sm:p-8 text-white z-10">
        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
          {category.productCount ? `${category.productCount}+ Sản phẩm` : 'Danh mục chính'}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-brand-300 transition-colors">
          {category.name}
        </h3>

        <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 mb-4 leading-relaxed font-normal">
          {category.description}
        </p>

        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
          <span>Xem sản phẩm</span>
          <ArrowRight className="w-4 h-4 text-brand-400 group-hover:text-white" />
        </div>
      </div>
    </Link>
  );
};
