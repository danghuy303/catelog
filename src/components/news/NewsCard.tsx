import React from 'react';
import { Link } from 'react-router-dom';
import { NewsArticle } from '../../types/news';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { formatDate } from '../../utils/formatters';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <article className="group bg-white rounded-3xl border border-gray-100/90 shadow-soft hover:shadow-soft-lg hover:border-brand-200 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Thumbnail Container */}
        <Link
          to={`/tin-tuc/${article.categorySlug}/${article.slug}`}
          className="relative block aspect-[16/9] bg-slate-100 overflow-hidden"
        >
          <ImageWithFallback
            src={article.thumbnailUrl}
            alt={article.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-white/90 backdrop-blur-md text-brand-600 rounded-lg shadow-sm">
              {article.categoryName}
            </span>
          </div>
        </Link>

        {/* Content Body */}
        <div className="p-6">
          <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-gray-400" />
              {article.author}
            </span>
          </div>

          <Link to={`/tin-tuc/${article.categorySlug}/${article.slug}`}>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-brand-500 transition-colors line-clamp-2 leading-snug mb-2">
              {article.title}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-normal">
            {article.shortDescription}
          </p>
        </div>
      </div>

      {/* Footer Read More Link */}
      <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex items-center justify-between">
        <Link
          to={`/tin-tuc/${article.categorySlug}/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 group-hover:translate-x-1 transition-all"
        >
          <span>Xem chi tiết</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
