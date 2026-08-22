import React, { useEffect, useState } from 'react';
import { catalogueService } from '../../services/catalogueService';
import { CatalogueItem } from '../../types/catalogue';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Badge } from '../../components/common/Badge';
import { formatDate } from '../../utils/formatters';
import { toast } from 'sonner';
import { Plus, Trash2, Download, ExternalLink, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminCataloguesPage: React.FC = () => {
  const [catalogues, setCatalogues] = useState<CatalogueItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileSize, setFileSize] = useState('10.5 MB');

  const loadCatalogues = async () => {
    const data = await catalogueService.getAllCataloguesForAdmin();
    setCatalogues(data);
  };

  useEffect(() => {
    loadCatalogues();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !fileUrl) {
      toast.error('Vui lòng điền tên catalogue và URL file PDF');
      return;
    }

    try {
      await catalogueService.createCatalogue({
        title,
        description,
        thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        fileUrl,
        fileSize
      });
      toast.success('Đã tải lên Catalogue PDF mới!');
      setModalOpen(false);
      setTitle('');
      setDescription('');
      setFileUrl('');
      loadCatalogues();
    } catch {
      toast.error('Tải lên thất bại');
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await catalogueService.deleteCatalogue(selectedId);
      toast.success('Đã xóa catalogue');
      setDeleteDialogOpen(false);
      loadCatalogues();
    } catch {
      toast.error('Xóa thất bại');
    }
  };

  return (
    <>
      <Helmet>
        <title>Quản Lý Catalogue - CMS</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Catalogue PDF</h1>
            <p className="text-xs text-gray-500">Tải lên & quản lý tài liệu catalogue giới thiệu sản phẩm doanh nghiệp</p>
          </div>
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>
            Thêm Catalogue mới
          </Button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Bìa</th>
                <th className="py-3 px-4">Tên Catalogue</th>
                <th className="py-3 px-4">Dung lượng</th>
                <th className="py-3 px-4">Ngày tải lên</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {catalogues.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <img src={c.thumbnailUrl} alt={c.title} className="w-10 h-12 rounded-lg object-cover" />
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900">{c.title}</td>
                  <td className="py-3 px-4 font-mono text-gray-500">{c.fileSize}</td>
                  <td className="py-3 px-4 text-gray-400">{formatDate(c.createdAt)}</td>
                  <td className="py-3 px-4"><Badge variant="success">Hoạt động</Badge></td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <a href={c.fileUrl} target="_blank" rel="noreferrer" className="p-1.5 text-gray-500 hover:text-brand-600 rounded-lg inline-block">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => {
                        setSelectedId(c.id);
                        setDeleteDialogOpen(true);
                      }}
                      className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Thêm Catalogue PDF Mới">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tên Catalogue *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Catalogue Quà Tặng Doanh Nghiệp 2026"
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mô tả ngắn</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">URL File PDF *</label>
              <input
                type="text"
                required
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="https://storage.../catalogue.pdf"
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">URL Ảnh bìa Thumbnail</label>
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm"
              />
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Hủy</Button>
              <Button type="submit" variant="primary">Tải lên</Button>
            </div>
          </form>
        </Modal>

        <ConfirmDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          title="Xác nhận xóa catalogue"
          message="Bạn có chắc muốn xóa tài liệu catalogue này khỏi website?"
        />
      </div>
    </>
  );
};
