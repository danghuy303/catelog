import React, { useEffect, useState } from 'react';
import { contactService } from '../../services/contactService';
import { ContactSubmission, ContactStatus } from '../../types/contact';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Button } from '../../components/common/Button';
import { formatDate, formatDateTime } from '../../utils/formatters';
import { toast } from 'sonner';
import { Eye, Trash2, CheckCircle2, Clock, Phone, Mail, MapPin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchContacts = async () => {
    const data = await contactService.getContacts();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = filterStatus === 'all'
    ? contacts
    : contacts.filter(c => c.status === filterStatus);

  const handleUpdateStatus = async (id: string, status: ContactStatus) => {
    try {
      await contactService.updateContactStatus(id, status);
      toast.success('Đã cập nhật trạng thái liên hệ!');
      if (selectedContact) {
        setSelectedContact({ ...selectedContact, status });
      }
      fetchContacts();
    } catch {
      toast.error('Cập nhật thất bại');
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await contactService.deleteContact(selectedId);
      toast.success('Đã xóa thông tin liên hệ');
      setDeleteDialogOpen(false);
      fetchContacts();
    } catch {
      toast.error('Xóa thất bại');
    }
  };

  return (
    <>
      <Helmet>
        <title>Quản Lý Yêu Cầu Liên Hệ - CMS</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Yêu cầu tư vấn & Báo giá</h1>
            <p className="text-xs text-gray-500">Danh sách khách hàng đăng ký liên hệ qua website</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'all' ? 'bg-brand-500 text-white' : 'bg-white text-gray-700 border'
              }`}
            >
              Tất cả ({contacts.length})
            </button>
            <button
              onClick={() => setFilterStatus('new')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'new' ? 'bg-brand-500 text-white' : 'bg-white text-gray-700 border'
              }`}
            >
              Mới ({contacts.filter(c => c.status === 'new').length})
            </button>
            <button
              onClick={() => setFilterStatus('processing')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'processing' ? 'bg-brand-500 text-white' : 'bg-white text-gray-700 border'
              }`}
            >
              Đang xử lý
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'completed' ? 'bg-brand-500 text-white' : 'bg-white text-gray-700 border'
              }`}
            >
              Hoàn thành
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">Ngày gửi</th>
                  <th className="py-3 px-4">Họ và tên</th>
                  <th className="py-3 px-4">Số điện thoại</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Chủ đề</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredContacts.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 text-gray-400 font-mono">{formatDateTime(c.createdAt)}</td>
                    <td className="py-3 px-4 font-bold text-gray-900">{c.name}</td>
                    <td className="py-3 px-4 font-mono font-bold text-brand-600">{c.phone}</td>
                    <td className="py-3 px-4 text-gray-600">{c.email}</td>
                    <td className="py-3 px-4 text-gray-800 max-w-xs truncate">{c.subject || c.message}</td>
                    <td className="py-3 px-4">
                      {c.status === 'new' && <Badge variant="primary">Mới</Badge>}
                      {c.status === 'processing' && <Badge variant="warning">Đang xử lý</Badge>}
                      {c.status === 'completed' && <Badge variant="success">Đã xử lý</Badge>}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedContact(c);
                          setDetailModalOpen(true);
                        }}
                        className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(c.id);
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

        {/* Contact Detail Modal */}
        {selectedContact && (
          <Modal
            isOpen={detailModalOpen}
            onClose={() => setDetailModalOpen(false)}
            title="Chi tiết yêu cầu tư vấn"
          >
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl space-y-2 border border-gray-100">
                <div className="text-base font-bold text-gray-900">{selectedContact.name}</div>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-brand-500" />{selectedContact.phone}</span>
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-tealBrand-500" />{selectedContact.email}</span>
                </div>
                {selectedContact.address && (
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{selectedContact.address}</span>
                  </div>
                )}
              </div>

              <div>
                <div className="font-bold text-gray-700 mb-1">Chủ đề:</div>
                <div className="p-3 bg-white border rounded-xl font-bold text-gray-900">
                  {selectedContact.subject || 'Không có chủ đề'}
                </div>
              </div>

              <div>
                <div className="font-bold text-gray-700 mb-1">Nội dung thông điệp gửi:</div>
                <div className="p-4 bg-white border rounded-xl text-gray-800 leading-relaxed font-sans whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="text-gray-400">Thời gian: {formatDateTime(selectedContact.createdAt)}</div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateStatus(selectedContact.id, 'processing')}
                  >
                    Đánh dấu Đang xử lý
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleUpdateStatus(selectedContact.id, 'completed')}
                  >
                    Đánh dấu Đã hoàn thành
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        )}

        <ConfirmDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          title="Xác nhận xóa tin liên hệ"
          message="Bạn có chắc chắn muốn xóa lượt liên hệ này?"
        />
      </div>
    </>
  );
};
