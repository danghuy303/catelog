import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderTree,
  Package,
  PlusCircle,
  Newspaper,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
  ChevronDown,
  Layers
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('thienthanh_admin_token');
    localStorage.removeItem('thienthanh_admin_user');
    toast.success('Đã đăng xuất tài khoản quản trị');
    navigate('/admin/login');
  };

  const navGroups = [
    {
      title: "Tổng quan",
      items: [
        { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> }
      ]
    },
    {
      title: "Quản lý sản phẩm",
      items: [
        { label: "Danh mục sản phẩm", href: "/admin/categories", icon: <FolderTree className="w-4 h-4" /> },
        { label: "Tất cả sản phẩm", href: "/admin/products", icon: <Package className="w-4 h-4" /> },
        { label: "Thêm sản phẩm mới", href: "/admin/products/create", icon: <PlusCircle className="w-4 h-4" /> }
      ]
    },
    {
      title: "Quản lý bài viết",
      items: [
        { label: "Danh mục tin tức", href: "/admin/news-categories", icon: <Layers className="w-4 h-4" /> },
        { label: "Tất cả bài viết", href: "/admin/news", icon: <Newspaper className="w-4 h-4" /> },
        { label: "Thêm bài viết mới", href: "/admin/news/create", icon: <PlusCircle className="w-4 h-4" /> }
      ]
    },
    {
      title: "Tài liệu & Yêu cầu",
      items: [
        { label: "Quản lý Catalogue PDF", href: "/admin/catalogues", icon: <FileText className="w-4 h-4" /> },
        { label: "Yêu cầu liên hệ", href: "/admin/contacts", icon: <MessageSquare className="w-4 h-4" /> }
      ]
    },
    {
      title: "Hệ thống",
      items: [
        { label: "Cài đặt doanh nghiệp", href: "/admin/settings", icon: <Settings className="w-4 h-4" /> }
      ]
    }
  ];

  const content = (
    <div className="flex flex-col h-full justify-between bg-slate-900 text-slate-300 w-64 border-r border-slate-800">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white font-black text-sm shadow-md">
              KT
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-white tracking-tight">
                Thiên Thanh CMS
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                Quản trị doanh nghiệp
              </span>
            </div>
          </div>
          <Link
            to="/"
            target="_blank"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Xem website public"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-none">
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {group.title}
              </div>
              {group.items.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng xuất hệ thống</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 z-30">
        {content}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative z-10">{content}</div>
        </div>
      )}
    </>
  );
};
