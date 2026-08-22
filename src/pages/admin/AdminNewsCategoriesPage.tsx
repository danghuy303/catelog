import React, { useEffect, useState } from 'react';
import { categoryService } from '../../services/categoryService';
import { NewsCategory } from '../../types/category';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { slugify } from '../../utils/slugify';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminNewsCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    try {
      await categoryService.createNewsCategory({
        name,
        slug: slug || slugify(name),
        description
      });
      toast.success('Đã tạo danh mục tin tức!');
      setModalOpen(false);
      setName('');
      setSlug('');
      setDescription('');
      loadCategories();
    } catch {
      toast.error('Lưu thất bại');
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
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-gray-900">{c.name}</td>
                  <td className="py-3 px-4 font-mono text-brand-600">{c.slug}</td>
                  <td className="py-3 px-4 text-gray-500 max-w-xs truncate">{c.description}</td>
                  <td className="py-3 px-4"><Badge variant="success">Hoạt động</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Thêm danh mục tin tức">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tên danh mục *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSlug(slugify(e.target.value));
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
      </div>
    </>
  );
};
