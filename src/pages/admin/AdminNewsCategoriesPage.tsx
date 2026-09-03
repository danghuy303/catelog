import React, { useEffect, useState } from 'react';
import { categoryService } from '../../services/categoryService';
import { NewsCategory } from '../../types/category';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Badge } from '../../components/common/Badge';
import { slugify } from '../../utils/slugify';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminNewsCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<NewsCategory | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  const loadCategories = async () => {
    const cats = await categoryService.getNewsCategories();
    setCategories(cats);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setModalOpen(true);
  };

  const handleOpenEdit = (cat: NewsCategory) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    try {
      if (editingCategory) {
        await categoryService.updateNewsCategory(editingCategory.id, {
          name,
          slug,
          description
        });
        toast.success('Đã cập nhật danh mục tin tức!');
      } else {
        await categoryService.createNewsCategory({
          name,
          slug: slug || slugify(name),
          description
        });
        toast.success('Đã tạo danh mục tin tức!');
      }
      setModalOpen(false);
      setName('');
      setSlug('');
      setDescription('');
      loadCategories();
    } catch {
      toast.error('Lưu thất bại');
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await categoryService.deleteNewsCategory(selectedId);
      toast.success('Đã xóa danh mục tin tức thành công!');
      setDeleteDialogOpen(false);
      loadCategories();
    } catch {
      toast.error('Xóa thất bại');
    }
  };

  return (
    <>
      <Helmet>
        <title>Quản Lý Danh Mục Tin Tức - CMS</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Danh mục tin tức</h1>
            <p className="text-xs text-gray-500">Phân loại các chủ đề bài viết trên website</p>
          </div>
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={handleOpenCreate}>
            Thêm danh mục
          </Button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Tên danh mục</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Mô tả</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-gray-900">{c.name}</td>
                  <td className="py-3 px-4 font-mono text-brand-600">{c.slug}</td>
                  <td className="py-3 px-4 text-gray-500 max-w-xs truncate">{c.description}</td>
                  <td className="py-3 px-4"><Badge variant="success">Hoạt động</Badge></td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(c)}
                      className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedId(c.id);
                        setDeleteDialogOpen(true);
                      }}
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCategory ? 'Chỉnh sửa danh mục tin tức' : 'Thêm danh mục tin tức'}>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tên danh mục *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!editingCategory) {
                    setSlug(slugify(e.target.value));
                  }
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Slug *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mô tả</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm"
              />
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Hủy</Button>
              <Button type="submit" variant="primary">Lưu</Button>
            </div>
          </form>
        </Modal>

        <ConfirmDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          title="Xác nhận xóa danh mục"
          message="Bạn có chắc chắn muốn xóa danh mục tin tức này?"
        />
      </div>
    </>
  );
};
