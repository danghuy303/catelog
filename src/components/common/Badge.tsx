import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = ''
}) => {
  const variantStyles = {
    primary: 'bg-brand-50 text-brand-600 border border-brand-200',
    secondary: 'bg-tealBrand-50 text-tealBrand-600 border border-tealBrand-500/20',
    outline: 'bg-white text-gray-700 border border-gray-200',
    success: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-600 border border-amber-200',
    info: 'bg-sky-50 text-sky-600 border border-sky-200'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
