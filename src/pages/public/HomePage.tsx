import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../../components/home/HeroSection';
import { TrustSection } from '../../components/home/TrustSection';
import { AboutSection } from '../../components/home/AboutSection';
import { WhyChooseUsSection } from '../../components/home/WhyChooseUsSection';
import { B2BSection } from '../../components/home/B2BSection';
import { CategoryCard } from '../../components/product/CategoryCard';
import { ProductCard } from '../../components/product/ProductCard';
import { NewsCard } from '../../components/news/NewsCard';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Button } from '../../components/common/Button';
import { categoryService } from '../../services/categoryService';
import { productService } from '../../services/productService';
import { newsService } from '../../services/newsService';
import { ProductCategory } from '../../types/category';
import { Product } from '../../types/product';
import { NewsArticle } from '../../types/news';
import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');
  const [loadingProducts, setLoadingProducts] = useState(true);

  const loadData = async () => {
    try {
      const [cats, prods, news] = await Promise.all([
        categoryService.getProductCategories(),
        productService.getProducts({ status: 'published' }),
        newsService.getNews({ status: 'published' })
      ]);
      setCategories(cats);
      setProducts(prods.data);
      setNewsList(news.data.slice(0, 3));
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    loadData();

    // Listen to real-time BroadcastChannel updates
    let pChannel: BroadcastChannel | null = null;
    let nChannel: BroadcastChannel | null = null;

    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      pChannel = new BroadcastChannel('thienthanh_products_channel');
      nChannel = new BroadcastChannel('thienthanh_news_channel');

      pChannel.onmessage = (e) => {
        if (e.data?.type === 'PRODUCTS_UPDATED') loadData();
      };
      nChannel.onmessage = (e) => {
        if (e.data?.type === 'NEWS_UPDATED') loadData();
      };
    }

    return () => {
      if (pChannel) pChannel.close();
      if (nChannel) nChannel.close();
    };
  }, []);

  const filteredProducts = activeCategoryTab === 'all'
    ? products
    : products.filter(p => p.categorySlug === activeCategoryTab);

  return (
    <>
      <Helmet>
        <title>Kiot Thiên Thanh - Giải Pháp Quà Tặng & Sản Phẩm Tiêu Dùng Doanh Nghiệp</title>
        <meta name="description" content="CÔNG TY TNHH TM THIÊN THANH VIỆT NAM - Chuyên cung cấp sản phẩm tiêu dùng, đồ uống, hóa mỹ phẩm, bánh mứt kẹo, đồ gia dụng và giải pháp quà tặng doanh nghiệp." />
      </Helmet>

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust & Statistics Section */}
      <TrustSection />

      {/* 3. Product Categories Section */}
      <section className="py-16 sm:py-24 bg-surfaceBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="DANH MỤC TIÊU BIỂU"
            title="Danh mục sản phẩm Kiot Thiên Thanh"
            subheading="Đa dạng sản phẩm đáp ứng đầy đủ nhu cầu tiêu dùng hàng ngày và gói quà tặng cao cấp cho doanh nghiệp."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Products Section with Tab Filter */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-brand-600 uppercase bg-brand-50 rounded-full border border-brand-200">
                SẢN PHẨM NỔI BẬT
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Sản phẩm được doanh nghiệp tin chọn
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setActiveCategoryTab('all')}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategoryTab === 'all'
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'bg-slate-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Tất cả
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategoryTab(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    activeCategoryTab === cat.slug
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                      : 'bg-slate-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {loadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-80 bg-slate-100 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-3xl border border-gray-100">
              <p className="text-sm text-gray-500 font-medium">Chưa có sản phẩm trong danh mục này.</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/san-pham">
              <Button size="lg" variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Xem toàn bộ sản phẩm ({products.length})
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. About Thiên Thanh Section */}
      <AboutSection />

      {/* 6. Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* 7. B2B Enterprise Solution Banner */}
      <B2BSection />

      {/* 8. News & Activities Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block px-3 py-1 mb-2 text-xs font-bold tracking-wider text-brand-600 uppercase bg-brand-50 rounded-full border border-brand-200">
                TIN TỨC SỰ KIỆN
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Tin tức & Hoạt động doanh nghiệp
              </h2>
            </div>
            <Link to="/tin-tuc" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Xem tất cả bài viết
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsList.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
