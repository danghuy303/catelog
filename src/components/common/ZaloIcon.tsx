import React from 'react';

interface ZaloIconProps {
  className?: string;
}

export const ZaloIcon: React.FC<ZaloIconProps> = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M24 4C12.9543 4 4 11.835 4 21.5C4 26.657 6.42537 31.258 10.2526 34.463L8.04169 41.096C7.83403 41.719 8.52834 42.238 9.07689 41.868L16.2917 37.001C18.6756 38.293 21.2683 39 24 39C35.0457 39 44 31.165 44 21.5C44 11.835 35.0457 4 24 4Z"
        fill="currentColor"
      />
      <text
        x="24"
        y="25"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#0068FF"
        fontSize="12"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.5"
      >
        Zalo
      </text>
    </svg>
  );
};
