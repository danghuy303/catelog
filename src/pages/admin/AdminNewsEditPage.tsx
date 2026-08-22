import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { newsService } from '../../services/newsService';
import { categoryService } from '../../services/categoryService';
import { NewsArticle } from '../../types/news';
import { NewsCategory } from '../../types/category';
import { RichTextEditor } from '../../components/admin/RichTextEditor';
import { Button } from '../../components/common/Button';
import { uploadService } from '../../services/uploadService';
import { slugify } from '../../utils/slugify';
import { toast } from 'sonner';
import { ArrowLeft, Save, Upload, Image as ImageIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminNewsEditPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Ban Biên Tập');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  useEffect(() => {
    async function init() {
      const cats = await categoryService.getNewsCategories();
      setCategories(cats);
      if (cats.length > 0 && !categoryId) {
        setCategoryId(cats[0].id);
      }

      if (id) {
        const article = await newsService.getNewsById(id);
        if (article) {
          setTitle(article.title);
          setSlug(article.slug);
          setCategoryId(article.categoryId);
          setThumbnailUrl(article.thumbnailUrl);
          setShortDescription(article.shortDescription);
          setContent(article.content);
          setAuthor(article.author);
          setStatus(article.status);
          setSeoTitle(article.seoTitle || '');
          setSeoDescription(article.seoDescription || '');
        }
      }
    }
    init();
  }, [id]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing) {
      setSlug(slugify(val));
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const res = await uploadService.uploadNewsImage(file);
        setThumbnailUrl(res.url);
        toast.success('Đã tải ảnh đại diện thành công!');
      } catch {
        toast.error('Tải ảnh thất bại');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !categoryId || !shortDescription || !content) {
      toast.error('Vui lòng điền các thông tin bắt buộc (*)');
      return;
    }

    setLoading(true);
    const category = categories.find(c => c.id === categoryId);

    const payload: Partial<NewsArticle> = {
      title,
      slug: slug || slugify(title),
      categoryId,
      categoryName: category?.name,
      categorySlug: category?.slug,
      thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      shortDescription,
      content,
      author,
      status,
      seoTitle,
      seoDescription
    };

    try {
      if (isEditing && id) {
        await newsService.updateNews(id, payload);
        toast.success('Đã cập nhật bài viết!');
      } else {
        await newsService.createNews(payload);
        toast.success('Đã tạo bài viết mới!');
      }
      navigate('/admin/news');
    } catch {
      toast.error('Lưu bài viết thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isEditing ? 'Sửa Bài Viết' : 'Thêm Bài Viết Mới'} - Kiot Thiên Thanh CMS</title>
      </Helmet>

      <form onSubmit={handleSubmit} className="space-y-8 pb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/news')}
              className="p-2 bg-white text-gray-600 hover:bg-slate-100 rounded-xl border border-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Chỉnh sửa bài viết' : 'Soạn bài viết mới'}
            </h1>
          </div>

          <Button type="submit" variant="primary" isLoading={loading} leftIcon={<Save className="w-4 h-4" />}>
            Lưu bài viết
          </Button>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
            Thông tin tiêu đề & Danh mục
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tiêu đề bài viết *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Slug URL *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-mono focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Danh mục tin tức *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-brand-500"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tác giả *</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Thumbnail Image Picker */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Ảnh đại diện bài viết</label>
            <div className="flex items-center gap-4">
              {thumbnailUrl && (
                <img src={thumbnailUrl} alt="Thumbnail" className="w-24 h-24 object-cover rounded-2xl border" />
              )}
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="URL ảnh đại diện..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm"
                />
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-gray-700 cursor-pointer">
                  <Upload className="w-4 h-4 text-brand-500" />
                  <span>Chọn ảnh từ máy tính</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} />
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Mô tả tóm tắt ngắn *</label>
            <textarea
              rows={3}
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Tóm tắt ngắn nội dung bài viết..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Rich Text Editor */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
            Nội dung bài viết (Trình soạn thảo Rich Text TipTap)
          </h2>
          <RichTextEditor value={content} onChange={setContent} />
        </div>

      </form>
    </>
  );
};
