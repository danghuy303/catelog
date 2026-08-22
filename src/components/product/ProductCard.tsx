import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { PriceQuoteModal } from './PriceQuoteModal';
import { ArrowRight, Tag, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-3xl border border-gray-100/90 shadow-soft hover:shadow-soft-lg hover:border-brand-200 transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div>
          {/* Image Thumbnail Container */}
          <Link
            to={`/san-pham/${product.categorySlug}/${product.slug}`}
            className="relative block aspect-[4/3] bg-slate-100 overflow-hidden"
          >
            <ImageWithFallback
              src={product.thumbnailUrl}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            {product.featured && (
              <div className="absolute top-3 left-3">
                <Badge variant="primary">Nổi bật</Badge>
              </div>
            )}
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-white/90 backdrop-blur-md text-gray-700 rounded-lg shadow-sm">
                SKU: {product.sku}
              </span>
            </div>
          </Link>

          {/* Body Content */}
          <div className="p-5">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className="font-semibold text-brand-600 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                {product.categoryName}
              </span>
              <span className="font-medium flex items-center gap-1 text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-tealBrand-500" />
                {product.brand}
              </span>
            </div>

            <Link to={`/san-pham/${product.categorySlug}/${product.slug}`}>
              <h3 className="text-base font-bold text-gray-900 group-hover:text-brand-500 transition-colors line-clamp-2 leading-snug mb-2">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-normal">
              {product.shortDescription}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 pb-5 pt-2 flex items-center gap-2 border-t border-gray-50">
          <Button
            size="sm"
            variant="secondary"
            className="w-full text-xs font-bold"
            onClick={() => setQuoteModalOpen(true)}
          >
            Nhận báo giá
          </Button>

          <Link
            to={`/san-pham/${product.categorySlug}/${product.slug}`}
            className="p-2 rounded-xl text-gray-400 hover:text-brand-500 hover:bg-brand-50 transition-colors shrink-0"
            title="Xem chi tiết"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Price Quote Request Modal */}
      <PriceQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        productName={product.name}
        productSku={product.sku}
      />
    </>
  );
};
