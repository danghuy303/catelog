import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/product/ProductCard';
import { NewsCard } from '../../components/news/NewsCard';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { SearchInput } from '../../components/common/SearchInput';
import { productService } from '../../services/productService';
import { newsService } from '../../services/newsService';
import { Product } from '../../types/product';
import { NewsArticle } from '../../types/news';
import { Helmet } from 'react-helmet-async';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function performSearch() {
      if (!query.trim()) {
        setProducts([]);
        setNews([]);
        return;
      }
      setLoading(true);
      const [prodRes, newsRes] = await Promise.all([
        productService.getProducts({ search: query }),
        newsService.getNews({ search: query })
      ]);
      setProducts(prodRes.data);
      setNews(newsRes.data);
      setLoading(false);
    }
    performSearch();
  }, [query]);

  return (
    <>
      <Helmet>
        <title>Kết quả tìm kiếm cho: {query} - Kiot Thiên Thanh</title>
      </Helmet>

      <div className="bg-slate-50 py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Tìm kiếm' }]} />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                {query ? `Kết quả tìm kiếm cho: "${query}"` : 'Tìm kiếm sản phẩm & bài viết'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Tìm thấy {products.length} sản phẩm và {news.length} bài viết phù hợp.
              </p>
            </div>
            <SearchInput
              value={query}
              onChange={(val) => {
                if (val) searchParams.set('q', val);
                else searchParams.delete('q');
                setSearchParams(searchParams);
              }}
              placeholder="Nhập từ khóa tìm kiếm..."
              className="w-full sm:w-80"
            />
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Products Results */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Sản phẩm tìm thấy ({products.length})</span>
            </h2>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic">Không có sản phẩm nào khớp với từ khóa "{query}".</p>
            )}
          </div>

          {/* News Results */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Bài viết tin tức ({news.length})</span>
            </h2>
            {news.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {news.map((n) => (
                  <NewsCard key={n.id} article={n} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic">Không có bài viết nào khớp với từ khóa "{query}".</p>
            )}
          </div>

        </div>
      </section>
    </>
  );
};
