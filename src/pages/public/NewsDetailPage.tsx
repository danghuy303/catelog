import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsService } from '../../services/newsService';
import { NewsArticle } from '../../types/news';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import { formatDate } from '../../utils/formatters';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { NewsCard } from '../../components/news/NewsCard';

export const NewsDetailPage: React.FC = () => {
  const { categorySlug, slug } = useParams<{ categorySlug: string; slug: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;
      setLoading(true);
      const data = await newsService.getNewsBySlug(categorySlug || '', slug);
      setArticle(data);

      const all = await newsService.getNews({ limit: 4 });
      setLatestNews(all.data.filter(n => n.id !== data?.id));
      setLoading(false);
    }
    loadArticle();
  }, [categorySlug, slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-96 bg-slate-100 rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy bài viết</h2>
        <p className="text-sm text-gray-500 mb-6">Bài viết này không tồn tại hoặc đã bị xóa.</p>
        <Link to="/tin-tuc" className="text-brand-600 font-bold hover:underline">
          Quay lại danh sách tin tức
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.seoTitle || `${article.title} - Kiot Thiên Thanh`}</title>
        <meta name="description" content={article.seoDescription || article.shortDescription} />
      </Helmet>

      <div className="bg-slate-50 py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Tin tức', href: '/tin-tuc' },
              { label: article.categoryName || 'Danh mục', href: `/tin-tuc/${article.categorySlug}` },
              { label: article.title }
            ]}
          />
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Article Main Body */}
            <div className="lg:col-span-8">
              <div className="space-y-4 mb-8">
                <span className="px-3 py-1 bg-brand-50 text-brand-600 font-bold text-xs rounded-full border border-brand-200 uppercase">
                  {article.categoryName}
                </span>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  {article.title}
                </h1>

                <div className="flex items-center gap-6 text-xs text-gray-500 border-y border-gray-100 py-3">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-4 h-4 text-brand-500" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-4 h-4 text-tealBrand-500" />
                    Tác giả: {article.author}
                  </span>
                </div>
              </div>

              {/* Featured Thumbnail Image */}
              <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-8 border border-gray-100 shadow-md">
                <ImageWithFallback
                  src={article.thumbnailUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Short Lead Summary */}
              <div className="p-5 bg-blue-50/60 rounded-2xl border-l-4 border-brand-500 text-sm font-semibold text-gray-800 leading-relaxed mb-8">
                {article.shortDescription}
              </div>

              {/* Rich HTML Content */}
              <div
                className="prose-custom text-gray-800"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Sidebar: Latest News */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-surfaceBg p-6 rounded-3xl border border-gray-100 shadow-soft sticky top-24">
                <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                  Tin tức mới nhất
                </h3>

                <div className="space-y-4">
                  {latestNews.map((n) => (
                    <Link
                      key={n.id}
                      to={`/tin-tuc/${n.categorySlug}/${n.slug}`}
                      className="group flex gap-3 items-start pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <img
                        src={n.thumbnailUrl}
                        alt={n.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-brand-600 uppercase">
                          {n.categoryName}
                        </span>
                        <h4 className="text-xs font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
                          {n.title}
                        </h4>
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          {formatDate(n.publishedAt)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
