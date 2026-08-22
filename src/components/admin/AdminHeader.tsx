import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, User, Globe, Search } from 'lucide-react';

interface AdminHeaderProps {
  onToggleMobileSidebar: () => void;
  title?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleMobileSidebar,
  title = 'Quản trị hệ thống'
}) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl lg:hidden transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 truncate">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-slate-50 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-brand-500" />
          <span>Xem Trang Chủ</span>
        </Link>

        {/* Admin Profile Chip */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-brand-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            AD
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-gray-900">Admin Thiên Thanh</span>
            <span className="text-[10px] text-gray-400 font-medium">admin@kiotthienthanh.vn</span>
          </div>
        </div>
      </div>
    </header>
  );
};
