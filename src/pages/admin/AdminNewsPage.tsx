import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { newsService } from '../../services/newsService';
import { NewsArticle } from '../../types/news';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Badge } from '../../components/common/Badge';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { formatDate } from '../../utils/formatters';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminNewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [search, setSearch] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchNews = async () => {
    const res = await newsService.getNews({ search });
    setNewsList(res.data);
  };

  useEffect(() => {
    fetchNews();
  }, [search]);

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await newsService.deleteNews(selectedId);
      toast.success('Đã xóa bài viết!');
      setDeleteDialogOpen(false);
      fetchNews();
    } catch {
      toast.error('Xóa thất bại');
    }
  };

  return (
    <>
      <Helmet>
        <title>Quản Lý Tin Tức - Kiot Thiên Thanh CMS</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý bài viết tin tức</h1>
            <p className="text-xs text-gray-500">Danh sách các bài viết truyền thông doanh nghiệp</p>
          </div>
          <Link to="/admin/news/create">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Thêm bài viết mới
            </Button>
          </Link>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Tìm theo tiêu đề bài viết..."
            className="w-full md:w-80"
          />
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">Ảnh</th>
                  <th className="py-3 px-4">Tiêu đề bài viết</th>
                  <th className="py-3 px-4">Danh mục</th>
                  <th className="py-3 px-4">Tác giả</th>
                  <th className="py-3 px-4">Ngày xuất bản</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {newsList.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <img src={n.thumbnailUrl} alt={n.title} className="w-12 h-12 rounded-xl object-cover" />
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900 max-w-xs truncate">{n.title}</td>
                    <td className="py-3 px-4 font-medium text-brand-600">{n.categoryName}</td>
                    <td className="py-3 px-4 text-gray-500">{n.author}</td>
                    <td className="py-3 px-4 text-gray-400">{formatDate(n.publishedAt)}</td>
                    <td className="py-3 px-4">
                      <Badge variant="success">Đã xuất bản</Badge>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link
                        to={`/tin-tuc/${n.categorySlug}/${n.slug}`}
                        target="_blank"
                        className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg inline-block"
                        title="Xem public"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => navigate(`/admin/news/${n.id}/edit`)}
                        className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg"
                        title="Sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(n.id);
                          setDeleteDialogOpen(true);
                        }}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ConfirmDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          title="Xác nhận xóa bài viết"
          message="Bạn có chắc chắn muốn xóa bài viết này khỏi hệ thống?"
        />
      </div>
    </>
  );
};
