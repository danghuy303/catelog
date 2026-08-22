import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { contactService } from '../../services/contactService';
import { toast } from 'sonner';
import { Send, CheckCircle2 } from 'lucide-react';

interface PriceQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productSku: string;
}

export const PriceQuoteModal: React.FC<PriceQuoteModalProps> = ({
  isOpen,
  onClose,
  productName,
  productSku
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState('100');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      toast.error('Vui lòng điền họ tên, số điện thoại và email (*)');
      return;
    }

    setLoading(true);
    try {
      await contactService.submitContact({
        name,
        phone,
        email,
        subject: `Yêu cầu báo giá: ${productName} (${productSku})`,
        message: `Số lượng dự kiến: ${quantity} bộ/sp. Ghi chú thêm: ${note || 'Không có'}`
      });

      setSuccess(true);
      toast.success('Đã gửi yêu cầu báo giá thành công!');
    } catch {
      toast.error('Gửi yêu cầu thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setName('');
    setPhone('');
    setEmail('');
    setNote('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Đăng ký nhận báo giá B2B">
      {success ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Đã nhận yêu cầu báo giá!</h4>
          <p className="text-sm text-gray-600 mb-6">
            Cảm ơn bạn đã quan tâm sản phẩm <strong>{productName}</strong>. Đội ngũ chuyên viên Thiên Thanh sẽ liên hệ gửi bảng giá chiết khấu ưu đãi trong thời gian ngắn nhất.
          </p>
          <Button variant="primary" onClick={handleReset} className="w-full">
            Đóng cửa sổ
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3.5 bg-brand-50 rounded-2xl border border-brand-100 mb-2">
            <div className="text-xs font-bold text-brand-600 uppercase">Sản phẩm yêu cầu báo giá:</div>
            <div className="text-sm font-extrabold text-gray-900 line-clamp-1">{productName}</div>
            <div className="text-[11px] text-gray-500 font-mono">SKU: {productSku}</div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Họ và tên người nhận báo giá *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Số điện thoại *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="037 833 9999"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email công ty *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@company.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Số lượng dự kiến đặt hàng
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="50">Từ 20 đến 50 bộ/sp</option>
              <option value="100">Từ 50 đến 100 bộ/sp</option>
              <option value="500">Từ 100 đến 500 bộ/sp</option>
              <option value="1000">Trên 1000 bộ/sp (Dự án lớn)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Ghi chú thêm (In logo, thời gian cần giao...)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập thông tin in dập logo, quy cách hộp quà hoặc thời gian giao hàng..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              isLoading={loading}
              rightIcon={<Send className="w-4 h-4" />}
              className="w-full py-3"
            >
              Gửi yêu cầu báo giá ngay
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
