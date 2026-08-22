import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '../../utils/validators';
import { Button } from '../../components/common/Button';
import { toast } from 'sonner';
import { Lock, Mail, ShieldAlert, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: 'admin@kiotthienthanh.vn',
      password: 'admin123',
      rememberMe: true
    }
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));

    // Simulate login token
    localStorage.setItem('thienthanh_admin_token', 'mock-jwt-token-123456');
    localStorage.setItem('thienthanh_admin_user', JSON.stringify({
      email: data.email,
      name: 'Admin Thiên Thanh',
      role: 'superadmin'
    }));

    setLoading(false);
    toast.success('Đăng nhập thành công! Đang chuyển hướng...');
    navigate('/admin/dashboard');
  };

  return (
    <>
      <Helmet>
        <title>Đăng nhập Admin CMS - Kiot Thiên Thanh</title>
      </Helmet>

      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
          
          {/* Logo & Title */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-brand-500 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg shadow-brand-500/30">
              KT
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Kiot Thiên Thanh Admin
            </h1>
            <p className="text-xs text-gray-500">
              Đăng nhập tài khoản quản trị CMS doanh nghiệp
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Địa chỉ Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  {...register('email')}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message as string}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Mật khẩu *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  {...register('password')}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message as string}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-gray-600 font-medium cursor-pointer">
                <input type="checkbox" {...register('rememberMe')} className="rounded text-brand-500 focus:ring-brand-500" />
                <span>Ghi nhớ đăng nhập</span>
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              variant="primary"
              isLoading={loading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full font-bold shadow-md shadow-brand-500/20 py-3"
            >
              Đăng nhập ngay
            </Button>
          </form>

          <div className="pt-2 text-center text-[11px] text-gray-400">
            © 2026 CÔNG TY TNHH TM THIÊN THANH VIỆT NAM
          </div>
        </div>
      </div>
    </>
  );
};
