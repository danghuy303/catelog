import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { Product, ProductImage } from '../../types/product';
import { ProductCategory } from '../../types/category';
import { ProductImageUploader } from '../../components/admin/ProductImageUploader';
import { Button } from '../../components/common/Button';
import { slugify } from '../../utils/slugify';
import { toast } from 'sonner';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminProductEditPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [sku, setSku] = useState('');
  const [brand, setBrand] = useState('');
  const [origin, setOrigin] = useState('');
  const [specification, setSpecification] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<ProductImage[]>([]);
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [featured, setFeatured] = useState(false);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');

  useEffect(() => {
    async function init() {
      const cats = await categoryService.getProductCategories();
      setCategories(cats);

      if (cats.length > 0 && !categoryId) {
        setCategoryId(cats[0].id);
      }

      if (id) {
        const prod = await productService.getProductById(id);
        if (prod) {
          setName(prod.name);
          setSlug(prod.slug);
          setCategoryId(prod.categoryId);
          setSku(prod.sku);
          setBrand(prod.brand);
          setOrigin(prod.origin);
          setSpecification(prod.specification);
          setShortDescription(prod.shortDescription);
          setDescription(prod.description);
          setImages(prod.images || []);
          setStatus(prod.status);
          setFeatured(prod.featured);
          setSeoTitle(prod.seoTitle || '');
          setSeoDescription(prod.seoDescription || '');
        }
      }
    }
    init();
  }, [id]);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !categoryId || !sku) {
      toast.error('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }

    if (images.length === 0) {
      toast.error('Vui lòng tải lên ít nhất 1 hình ảnh sản phẩm');
      return;
    }

    setLoading(true);

    const primaryImg = images.find(img => img.isPrimary) || images[0];
    const category = categories.find(c => c.id === categoryId);

    const payload: Partial<Product> = {
      name,
      slug: slug || slugify(name),
      categoryId,
      categoryName: category?.name,
      categorySlug: category?.slug,
      sku,
      brand,
      origin,
      specification,
      shortDescription,
      description,
      images,
      thumbnailUrl: primaryImg.imageUrl,
      status,
      featured,
      seoTitle,
      seoDescription
    };

    try {
      if (isEditing && id) {
        await productService.updateProduct(id, payload);
        toast.success('Đã lưu thay đổi sản phẩm thành công!');
      } else {
        await productService.createProduct(payload);
        toast.success('Đã tạo sản phẩm mới thành công!');
      }

      navigate('/admin/products');
    } catch {
      toast.error('Lưu sản phẩm thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isEditing ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'} - Kiot Thiên Thanh CMS</title>
      </Helmet>

      <form onSubmit={handleSubmit} className="space-y-8 pb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="p-2 bg-white text-gray-600 hover:bg-slate-100 rounded-xl border border-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
            </h1>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Lưu sản phẩm
          </Button>
        </div>

        {/* 1. Basic Information */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
            1. Thông tin cơ bản
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tên sản phẩm *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Bộ Hộp Quà Rượu Vang Đỏ Bordeaux"
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
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
              <label className="block text-xs font-bold text-gray-700 mb-1">Danh mục sản phẩm *</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500 font-bold"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mã SKU *</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="TT-SKU-001"
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-mono font-bold focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Thương hiệu</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Château Bordeaux"
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Xuất xứ</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Pháp"
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Quy cách đóng gói</label>
              <input
                type="text"
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
                placeholder="Hộp 2 chai 750ml"
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Mô tả ngắn sản phẩm</label>
            <textarea
              rows={3}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Bộ quà tặng cao cấp gồm 2 chai vang đỏ Bordeaux Pháp..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Nội dung mô tả chi tiết</label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập nội dung HTML hoặc văn bản mô tả chi tiết..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500 font-sans"
            />
          </div>
        </div>

        {/* 2. Image Uploader */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
            2. Hình ảnh sản phẩm (Giao diện Upload trực quan)
          </h2>
          <ProductImageUploader
            images={images}
            onChange={setImages}
            productId={id}
          />
        </div>

        {/* 3. SEO & Settings */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
            3. Trạng thái & Tối ưu SEO
          </h2>

          <div className="flex items-center gap-8">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Trạng thái xuất bản</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-brand-500"
              >
                <option value="published">Xuất bản công khai</option>
                <option value="draft">Bản nháp</option>
              </select>
            </div>

            <div className="pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-800">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded text-brand-500 focus:ring-brand-500 w-4 h-4"
                />
                <span>Đánh dấu là Sản phẩm nổi bật (Featured)</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">SEO Title</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Bộ Quà Tặng Rượu Vang Bordeaux - Kiot Thiên Thanh"
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">SEO Meta Description</label>
              <input
                type="text"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Mô tả meta chuẩn SEO..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

      </form>
    </>
  );
};
