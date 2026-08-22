import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-xs sm:text-sm text-gray-500 py-3 overflow-x-auto whitespace-nowrap scrollbar-none">
      <Link
        to="/"
        className="inline-flex items-center gap-1 hover:text-brand-500 transition-colors font-medium"
      >
        <Home className="w-4 h-4" />
        <span>Trang chủ</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 shrink-0" />
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="hover:text-brand-500 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-md">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
