import React, { useEffect, useState } from 'react';
import { categoryService } from '../../services/categoryService';
import { ProductCategory } from '../../types/category';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Badge } from '../../components/common/Badge';
import { slugify } from '../../utils/slugify';
import { formatDate } from '../../utils/formatters';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Eye, FolderTree, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sortOrder, setSortOrder] = useState(1);

  const loadCategories = async () => {
    setLoading(true);
    const data = await categoryService.getProductCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80');
    setSortOrder(categories.length + 1);
    setModalOpen(true);
  };

  const handleOpenEdit = (cat: ProductCategory) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setImageUrl(cat.imageUrl);
    setSortOrder(cat.sortOrder);
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(slugify(val));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast.error('Vui lòng nhập tên danh mục');
      return;
    }

    try {
      if (editingCategory) {
        await categoryService.updateProductCategory(editingCategory.id, {
          name,
          slug,
          description,
          imageUrl,
          sortOrder
        });
        toast.success('Đã cập nhật danh mục thành công!');
      } else {
        await categoryService.createProductCategory({
          name,
          slug: slug || slugify(name),
          description,
          imageUrl,
          sortOrder
        });
        toast.success('Đã tạo danh mục mới thành công!');
      }

      setModalOpen(false);
      loadCategories();
    } catch {
      toast.error('Lưu danh mục thất bại.');
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await categoryService.deleteProductCategory(selectedId);
      toast.success('Đã xóa danh mục sản phẩm!');
      setDeleteDialogOpen(false);
      loadCategories();
    } catch {
      toast.error('Xóa thất bại');
    }
  };

  return (
    <>
      <Helmet>
        <title>Quản Lý Danh Mục Sản Phẩm - Kiot Thiên Thanh CMS</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Danh mục sản phẩm</h1>
            <p className="text-xs text-gray-500">Quản lý các nhóm ngành hàng sản phẩm công ty cung ứng</p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={handleOpenCreate}
          >
            Thêm danh mục mới
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">STT</th>
                  <th className="py-3 px-4">Hình ảnh</th>
                  <th className="py-3 px-4">Tên danh mục</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">Thứ tự</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map((cat, index) => (
                  <tr key={cat.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-gray-400">{index + 1}</td>
                    <td className="py-3 px-4">
                      <img src={cat.imageUrl} alt={cat.name} className="w-12 h-12 rounded-xl object-cover" />
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900">{cat.name}</td>
                    <td className="py-3 px-4 font-mono text-gray-500">{cat.slug}</td>
                    <td className="py-3 px-4 font-bold">{cat.sortOrder}</td>
                    <td className="py-3 px-4">
                      <Badge variant="success">Hoạt động</Badge>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(cat)}
                        className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(cat.id);
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

        {/* Modal Form */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingCategory ? 'Sửa danh mục sản phẩm' : 'Thêm danh mục sản phẩm mới'}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tên danh mục *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Slug *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-mono focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mô tả ngắn</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">URL Hình ảnh</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Thứ tự hiển thị</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Hủy</Button>
              <Button type="submit" variant="primary">Lưu danh mục</Button>
            </div>
          </form>
        </Modal>

        {/* Confirm Delete Dialog */}
        <ConfirmDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          title="Xác nhận xóa danh mục"
          message="Bạn có chắc chắn muốn xóa danh mục này? Hành động không thể hoàn tác."
        />
      </div>
    </>
  );
};
