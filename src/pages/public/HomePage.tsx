import React, { useEffect, useState } from 'react';
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
import { realtimeSync } from '../../services/realtimeService';
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
  const [, setLoadingProducts] = useState(true);

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

    // 1. Instant event listener when products or news change (0ms update)
    const unSubProd = realtimeSync.subscribe('PRODUCT_CHANGED', () => {
      loadData();
    });
    const unSubNews = realtimeSync.subscribe('NEWS_CHANGED', () => {
      loadData();
    });

    // 2. Refresh when switching tabs back to Home Page
    const handleFocus = () => {
      loadData();
    };
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      unSubProd();
      unSubNews();
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
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

      {/* 2. Trust Badges */}
      <TrustSection />

      {/* 3. Featured Product Categories */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Danh Mục Sản Phẩm Phân Phối"
            subheading="Hơn 500+ dòng sản phẩm tiêu dùng chất lượng cao, đầy đủ chứng nhận CO/CQ dành cho doanh nghiệp & bếp ăn công nghiệp."
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Us Section */}
      <AboutSection />

      {/* 5. Featured Products Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Sản Phẩm Tiêu Biểu
              </h2>
              <p className="mt-2 text-sm text-gray-500 max-w-xl">
                Danh sách các sản phẩm đang được các tập đoàn, đối tác B2B tin tưởng lựa chọn nhiều nhất tại Kiot Thiên Thanh.
              </p>
            </div>

            {/* Category Tabs */}
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
                  key={cat.id}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/san-pham" className="inline-block">
              <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Xem tất cả 500+ sản phẩm
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 7. B2B / Gift Solutions */}
      <B2BSection />

      {/* 8. Latest News & Blog */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Tin Tức & Hoạt Động
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Cập nhật thông tin xu hướng quà tặng doanh nghiệp và văn hóa Kiot Thiên Thanh.
              </p>
            </div>
            <a href="/tin-tuc" className="hidden sm:inline-block">
              <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Xem tất cả bài viết
              </Button>
            </a>
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
