import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { newsService } from '../../services/newsService';
import { contactService } from '../../services/contactService';
import { catalogueService } from '../../services/catalogueService';
import { ContactSubmission } from '../../types/contact';
import { formatDate } from '../../utils/formatters';
import { Badge } from '../../components/common/Badge';
import { Package, FolderTree, Newspaper, MessageSquare, FileText, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    news: 0,
    contacts: 0,
    newContacts: 0,
    catalogues: 0
  });
  const [recentContacts, setRecentContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const [p, c, n, ct, catl] = await Promise.all([
        productService.getProducts(),
        categoryService.getProductCategories(),
        newsService.getNews(),
        contactService.getContacts(),
        catalogueService.getCatalogues()
      ]);

      const newCount = ct.filter(x => x.status === 'new').length;
      setStats({
        products: p.total,
        categories: c.length,
        news: n.total,
        contacts: ct.length,
        newContacts: newCount,
        catalogues: catl.length
      });
      setRecentContacts(ct.slice(0, 5));
      setLoading(false);
    }
    loadDashboard();
  }, []);

  const cards = [
    { title: 'Tổng Sản Phẩm', value: stats.products, icon: <Package className="w-6 h-6 text-brand-500" />, href: '/admin/products', color: 'bg-brand-50' },
    { title: 'Danh Mục Sản Phẩm', value: stats.categories, icon: <FolderTree className="w-6 h-6 text-tealBrand-500" />, href: '/admin/categories', color: 'bg-tealBrand-50' },
    { title: 'Bài Viết Tin Tức', value: stats.news, icon: <Newspaper className="w-6 h-6 text-amber-500" />, href: '/admin/news', color: 'bg-amber-50' },
    { title: 'Tin Liên Hệ Mới', value: stats.newContacts, total: stats.contacts, icon: <MessageSquare className="w-6 h-6 text-rose-500" />, href: '/admin/contacts', color: 'bg-rose-50' },
    { title: 'Catalogue PDF', value: stats.catalogues, icon: <FileText className="w-6 h-6 text-indigo-500" />, href: '/admin/catalogues', color: 'bg-indigo-50' },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard Quản Trị - Kiot Thiên Thanh CMS</title>
      </Helmet>

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tổng quan hệ thống</h1>
          <p className="text-xs text-gray-500">Chào mừng trở lại! Dưới đây là tình hình hoạt động của website.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cards.map((c, idx) => (
            <Link
              key={idx}
              to={c.href}
              className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${c.color}`}>{c.icon}</div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-brand-500 transition-colors" />
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900">{c.value}</div>
                <div className="text-xs font-semibold text-gray-500 mt-0.5">{c.title}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Contacts Table Quick View */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-gray-900">Yêu cầu liên hệ mới nhất</h2>
              <p className="text-xs text-gray-500">Danh sách khách hàng để lại thông tin tư vấn gần đây</p>
            </div>
            <Link to="/admin/contacts" className="text-xs font-bold text-brand-600 hover:underline">
              Xem tất cả ({stats.contacts})
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase font-bold text-[10px]">
                  <th className="pb-3 px-3">Khách hàng</th>
                  <th className="pb-3 px-3">Số điện thoại</th>
                  <th className="pb-3 px-3">Chủ đề</th>
                  <th className="pb-3 px-3">Ngày gửi</th>
                  <th className="pb-3 px-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {recentContacts.map((ct) => (
                  <tr key={ct.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-gray-900">{ct.name}</td>
                    <td className="py-3 px-3 font-mono">{ct.phone}</td>
                    <td className="py-3 px-3 truncate max-w-xs">{ct.subject || ct.message}</td>
                    <td className="py-3 px-3 text-gray-400">{formatDate(ct.createdAt)}</td>
                    <td className="py-3 px-3">
                      {ct.status === 'new' && <Badge variant="primary">Mới</Badge>}
                      {ct.status === 'processing' && <Badge variant="warning">Đang xử lý</Badge>}
                      {ct.status === 'completed' && <Badge variant="success">Hoàn thành</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
