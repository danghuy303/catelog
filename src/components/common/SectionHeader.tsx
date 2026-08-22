import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subheading?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subheading,
  centered = true,
  className = ''
}) => {
  return (
    <div className={`mb-10 sm:mb-14 ${centered ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
      {badge && (
        <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-brand-600 uppercase bg-brand-50 rounded-full border border-brand-200">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
        {title}
      </h2>
      {subheading && (
        <p className="mt-3 text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
          {subheading}
        </p>
      )}
    </div>
  );
};
