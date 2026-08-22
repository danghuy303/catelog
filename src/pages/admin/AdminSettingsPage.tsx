import React, { useEffect, useState } from 'react';
import { settingsService } from '../../services/settingsService';
import { SiteSettings } from '../../types/setting';
import { Button } from '../../components/common/Button';
import { toast } from 'sonner';
import { Save, Building2, Share2, Globe, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const data = await settingsService.getSettings();
      setSettings(data);
    }
    loadSettings();
  }, []);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setLoading(true);

    try {
      await settingsService.updateSettings(settings);
      toast.success('Đã lưu cấu hình doanh nghiệp thành công!');
    } catch {
      toast.error('Lưu cài đặt thất bại');
    } finally {
      setLoading(false);
    }
  };

  if (!settings) {
    return <div className="p-8 text-center text-gray-500">Đang tải cài đặt hệ thống...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Cài Đặt Doanh Nghiệp - CMS</title>
      </Helmet>

      <form onSubmit={handleSave} className="space-y-8 pb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cài đặt doanh nghiệp</h1>
            <p className="text-xs text-gray-500">Chỉnh sửa thông tin pháp lý, liên hệ & SEO website</p>
          </div>
          <Button type="submit" variant="primary" isLoading={loading} leftIcon={<Save className="w-4 h-4" />}>
            Lưu cài đặt
          </Button>
        </div>

        {/* 1. Legal & Contact Info */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3 text-brand-600 font-bold">
            <Building2 className="w-5 h-5" />
            <h2 className="text-base text-gray-900">1. Thông tin doanh nghiệp & Chi nhánh</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tên công ty pháp lý *</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mã số thuế *</label>
              <input
                type="text"
                value={settings.taxCode}
                onChange={(e) => handleChange('taxCode', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Hotline tư vấn *</label>
              <input
                type="text"
                value={settings.hotline}
                onChange={(e) => handleChange('hotline', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold text-brand-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email liên hệ *</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Trụ sở chính</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Chi nhánh 1 (Hải Phòng)</label>
              <input
                type="text"
                value={settings.branch1}
                onChange={(e) => handleChange('branch1', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Chi nhánh 2 (Hưng Yên)</label>
              <input
                type="text"
                value={settings.branch2}
                onChange={(e) => handleChange('branch2', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm"
              />
            </div>
          </div>
        </div>

        {/* 2. Social Links */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3 text-tealBrand-600 font-bold">
            <Share2 className="w-5 h-5" />
            <h2 className="text-base text-gray-900">2. Mạng xã hội & Kênh liên lạc</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Facebook Fanpage URL</label>
              <input
                type="text"
                value={settings.socialFacebook}
                onChange={(e) => handleChange('socialFacebook', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Zalo Official Account URL</label>
              <input
                type="text"
                value={settings.socialZalo}
                onChange={(e) => handleChange('socialZalo', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm"
              />
            </div>
          </div>
        </div>

        {/* 3. Global SEO */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3 text-indigo-600 font-bold">
            <Globe className="w-5 h-5" />
            <h2 className="text-base text-gray-900">3. SEO & Branding Website</h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Tiêu đề website mặc định (Site Title)</label>
            <input
              type="text"
              value={settings.siteTitle}
              onChange={(e) => handleChange('siteTitle', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Meta Description mặc định</label>
            <textarea
              rows={3}
              value={settings.metaDescription}
              onChange={(e) => handleChange('metaDescription', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm"
            />
          </div>
        </div>
      </form>
    </>
  );
};
