import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '../../utils/validators';
import { ContactFormInput } from '../../types/contact';
import { contactService } from '../../services/contactService';
import { Button } from '../common/Button';
import { toast } from 'sonner';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
      honeypot: ''
    }
  });

  const onSubmit = async (data: ContactFormInput) => {
    setServerError(null);
    setServerSuccess(null);

    try {
      const res = await contactService.submitContact(data);
      if (res.success) {
        setServerSuccess(res.message);
        toast.success('Đã gửi thông tin liên hệ thành công!');
        reset();
      } else {
        setServerError(res.message || 'Không thể gửi thông tin.');
        toast.error(res.message || 'Không thể gửi thông tin.');
      }
    } catch {
      const fallbackMsg = 'Hiện hệ thống đang bận. Vui lòng thử lại hoặc liên hệ trực tiếp qua hotline.';
      setServerError(fallbackMsg);
      toast.error(fallbackMsg);
    }
  };

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-soft">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Gửi yêu cầu tư vấn & Báo giá
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Điền thông tin bên dưới, chuyên viên Kiot Thiên Thanh sẽ phản hồi lại bạn trong vòng 30 phút.
        </p>
      </div>

      {serverSuccess && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-emerald-700 text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <div>{serverSuccess}</div>
        </div>
      )}

      {serverError && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-rose-700 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>{serverError}</div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Hidden Honeypot Spam Protection Field */}
        <input
          type="text"
          {...register('honeypot')}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        {/* Họ và tên */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Họ và tên khách hàng / Doanh nghiệp *
          </label>
          <input
            type="text"
            {...register('name')}
            placeholder="Nguyễn Văn A"
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-brand-500'
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Số điện thoại & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Số điện thoại liên hệ *
            </label>
            <input
              type="tel"
              {...register('phone')}
              placeholder="037 833 9999"
              className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-brand-500'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Địa chỉ Email *
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="name@company.com"
              className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-brand-500'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Địa chỉ */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Địa chỉ doanh nghiệp / Tỉnh thành
          </label>
          <input
            type="text"
            {...register('address')}
            placeholder="Số 102 Đường Lê Hồng Phong, Ngô Quyền, Hải Phòng"
            className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Chủ đề */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Chủ đề cần tư vấn
          </label>
          <input
            type="text"
            {...register('subject')}
            placeholder="Tư vấn bộ quà tặng Tết / Đặt sỉ hóa mỹ phẩm gia dụng"
            className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Nội dung */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Nội dung chi tiết *
          </label>
          <textarea
            rows={4}
            {...register('message')}
            placeholder="Mô tả nhu cầu sản phẩm, số lượng dự kiến, yêu cầu in dập logo..."
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.message ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-brand-500'
            }`}
          />
          {errors.message && (
            <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
          )}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            variant="primary"
            isLoading={isSubmitting}
            rightIcon={<Send className="w-4 h-4" />}
            className="w-full font-bold shadow-md shadow-brand-500/25"
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu ngay'}
          </Button>
        </div>
      </form>
    </div>
  );
};
