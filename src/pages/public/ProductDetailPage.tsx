import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { Product } from '../../types/product';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProductCard } from '../../components/product/ProductCard';
import { PriceQuoteModal } from '../../components/product/PriceQuoteModal';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import { ShieldCheck, Truck, Tag, Send, CheckCircle2, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const ProductDetailPage: React.FC = () => {
  const { categorySlug, productSlug } = useParams<{ categorySlug: string; productSlug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      if (!productSlug) return;
      setLoading(true);
      const prod = await productService.getProductBySlug(categorySlug || '', productSlug);
      setProduct(prod);

      if (prod) {
        const related = await productService.getRelatedProducts(prod.categoryId, prod.id);
        setRelatedProducts(related);
      }
      setLoading(false);
    }
    loadProduct();
  }, [categorySlug, productSlug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-96 bg-slate-100 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
        <p className="text-sm text-gray-500 mb-6">Sản phẩm này có thể đã bị xóa hoặc chuyển vị trí.</p>
        <Link to="/san-pham">
          <Button variant="primary">Quay lại danh mục sản phẩm</Button>
        </Link>
      </div>
    );
  }

  const allImages = product.images && product.images.length > 0
    ? product.images
    : [{ id: '1', productId: product.id, imageUrl: product.thumbnailUrl, fileName: 'thumb.jpg', alt: product.name, sortOrder: 1 }];

  const currentImage = allImages[selectedImageIndex] || allImages[0];

  return (
    <>
      <Helmet>
        <title>{product.seoTitle || `${product.name} - Kiot Thiên Thanh`}</title>
        <meta name="description" content={product.seoDescription || product.shortDescription} />
      </Helmet>

      <div className="bg-slate-50 py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Sản phẩm', href: '/san-pham' },
              { label: product.categoryName || 'Danh mục', href: `/san-pham/${product.categorySlug}` },
              { label: product.name }
            ]}
          />
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            
            {/* Left Column: Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-gray-200 shadow-md">
                <ImageWithFallback
                  src={currentImage.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-md text-gray-800 hover:bg-white transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-md text-gray-800 hover:bg-white transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails list */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {allImages.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                        idx === selectedImageIndex ? 'border-brand-500 ring-2 ring-brand-200' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.imageUrl} alt={img.alt} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Information & B2B CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <Badge variant="primary">{product.categoryName}</Badge>
                <span className="text-xs font-mono font-semibold text-gray-400">SKU: {product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="p-4 rounded-2xl bg-surfaceBg border border-gray-100 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block font-medium">Thương hiệu:</span>
                  <span className="font-bold text-gray-800">{product.brand}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Xuất xứ:</span>
                  <span className="font-bold text-gray-800">{product.origin}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-400 block font-medium">Quy cách đóng gói:</span>
                  <span className="font-bold text-gray-800">{product.specification}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* B2B CTAs */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => setQuoteModalOpen(true)}
                  rightIcon={<Send className="w-4 h-4" />}
                  className="w-full sm:w-auto font-bold shadow-lg shadow-brand-500/25"
                >
                  Liên hệ nhận báo giá sỉ
                </Button>
                <Link to="/lien-he">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto font-bold">
                    Đăng ký tư vấn B2B
                  </Button>
                </Link>
              </div>

              <div className="pt-4 space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-tealBrand-500" />
                  <span>Cam kết chính hãng 100%, đầy đủ giấy chứng nhận xuất xứ CO/CQ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-500" />
                  <span>Hỗ trợ vận chuyển tận kho doanh nghiệp toàn quốc</span>
                </div>
              </div>
            </div>

          </div>

          {/* Long Description & Spec Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-gray-100 pt-12">
            <div className="lg:col-span-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Mô tả chi tiết sản phẩm
              </h2>
              <div
                className="prose-custom text-sm"
                dangerouslySetInnerHTML={{ __html: product.description || `<p>${product.shortDescription}</p>` }}
              />
            </div>

            <div className="lg:col-span-4 bg-surfaceBg p-6 rounded-3xl border border-gray-100 h-fit">
              <h3 className="text-base font-bold text-gray-900 mb-4">Thông số kỹ thuật</h3>
              <dl className="space-y-3 text-xs">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <dt className="text-gray-500">Mã SKU</dt>
                  <dd className="font-bold text-gray-900 font-mono">{product.sku}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <dt className="text-gray-500">Thương hiệu</dt>
                  <dd className="font-bold text-gray-900">{product.brand}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <dt className="text-gray-500">Xuất xứ</dt>
                  <dd className="font-bold text-gray-900">{product.origin}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <dt className="text-gray-500">Quy cách</dt>
                  <dd className="font-bold text-gray-900">{product.specification}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Related Products Carousel/Grid */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 border-t border-gray-100 pt-12">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-8">
                Sản phẩm liên quan cùng danh mục
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rp) => (
                  <ProductCard key={rp.id} product={rp} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      <PriceQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        productName={product.name}
        productSku={product.sku}
      />
    </>
  );
};
