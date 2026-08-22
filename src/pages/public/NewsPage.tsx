import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { NewsCard } from '../../components/news/NewsCard';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { SearchInput } from '../../components/common/SearchInput';
import { newsService } from '../../services/newsService';
import { categoryService } from '../../services/categoryService';
import { NewsCategory } from '../../types/category';
import { NewsArticle } from '../../types/news';
import { Helmet } from 'react-helmet-async';
import { Newspaper } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const cats = await categoryService.getNewsCategories();
      setCategories(cats);
    }
    loadData();
  }, []);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      const res = await newsService.getNews({
        categorySlug,
        search: searchTerm
      });
      setNewsArticles(res.data);
      setLoading(false);
    }
    fetchNews();
  }, [categorySlug, searchTerm]);

  const currentCategory = categories.find(c => c.slug === categorySlug);
  const pageTitle = currentCategory ? currentCategory.name : 'Tin tức & Hoạt động';

  return (
    <>
      <Helmet>
        <title>{pageTitle} - Kiot Thiên Thanh</title>
        <meta name="description" content="Cập nhật tin tức doanh nghiệp, xu hướng quà tặng B2B, bài viết tuyển dụng và câu chuyện case study thực tế từ CÔNG TY TNHH TM THIÊN THANH VIỆT NAM." />
      </Helmet>

      <div className="bg-slate-50 py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Tin tức', href: '/tin-tuc' },
              ...(currentCategory ? [{ label: currentCategory.name }] : [])
            ]}
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {pageTitle}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Xu hướng quà tặng doanh nghiệp, văn hóa Thiên Thanh & câu chuyện thành công
              </p>
            </div>
            <SearchInput
              value={searchTerm}
              onChange={(val) => {
                setSearchTerm(val);
                if (val) searchParams.set('q', val);
                else searchParams.delete('q');
                setSearchParams(searchParams);
              }}
              placeholder="Tìm kiếm bài viết..."
              className="w-full sm:w-72"
            />
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-gray-100">
            <a
              href="/tin-tuc"
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                !categorySlug
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'bg-slate-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tất cả bài viết
            </a>
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`/tin-tuc/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  categorySlug === cat.slug
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'bg-slate-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </a>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-slate-100 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : newsArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {newsArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-gray-100 max-w-xl mx-auto">
              <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-900 mb-1">Chưa có bài viết nào</h3>
              <p className="text-xs text-gray-500">Vui lòng quay lại sau để cập nhật bài viết mới nhất.</p>
            </div>
          )}

        </div>
      </section>
    </>
  );
};
