import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { realtimeSync } from '../../services/realtimeService';
import { Product } from '../../types/product';
import { ProductCategory } from '../../types/category';
import { Button } from '../../components/common/Button';
import { SearchInput } from '../../components/common/SearchInput';
import { Badge } from '../../components/common/Badge';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { formatDate } from '../../utils/formatters';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Eye, Star, RefreshCw } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchProducts = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);
    try {
      const [pRes, cRes] = await Promise.all([
        productService.getProducts({
          search,
          categorySlug: selectedCategory || undefined,
          status: selectedStatus || undefined
        }),
        categoryService.getProductCategories()
      ]);
      setProducts(pRes.data);
      setCategories(cRes);
    } finally {
      setLoading(false);
      if (showRefreshIndicator) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const unsub = realtimeSync.subscribe('PRODUCT_CHANGED', () => {
      fetchProducts();
    });
    return () => unsub();
  }, [search, selectedCategory, selectedStatus]);

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await productService.deleteProduct(selectedId);
      toast.success('Đã xóa sản phẩm thành công!');
      setDeleteDialogOpen(false);
      fetchProducts();
    } catch {
      toast.error('Xóa thất bại');
    }
  };

  return (
    <>
      <Helmet>
        <title>Quản Lý Sản Phẩm - Kiot Thiên Thanh CMS</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Quản lý sản phẩm
              <button
                onClick={() => fetchProducts(true)}
                className="p-1.5 text-gray-400 hover:text-brand-500 rounded-lg transition-colors"
                title="Làm mới danh sách"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-brand-500' : ''}`} />
              </button>
            </h1>
            <p className="text-xs text-gray-500">Danh sách các sản phẩm hiển thị trên website (Tự động đồng bộ Realtime)</p>
          </div>
          <Link to="/admin/products/create">
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Thêm sản phẩm mới
            </Button>
          </Link>
        </div>

        {/* Filter Controls */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Tìm theo tên, mã SKU, thương hiệu..."
            className="w-full md:w-80"
          />

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:ring-2 focus:ring-brand-500 w-full md:w-48"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 focus:ring-2 focus:ring-brand-500 w-full md:w-40"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="published">Xuất bản</option>
              <option value="draft">Nháp</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">Ảnh</th>
                  <th className="py-3 px-4">Tên sản phẩm</th>
                  <th className="py-3 px-4">Mã SKU</th>
                  <th className="py-3 px-4">Danh mục</th>
                  <th className="py-3 px-4">Thương hiệu</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4">Ngày tạo</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <img src={p.thumbnailUrl} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900">
                      <div className="flex items-center gap-1.5">
                        <span>{p.name}</span>
                        {p.featured && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-brand-600">{p.sku}</td>
                    <td className="py-3 px-4 text-gray-600 font-medium">{p.categoryName}</td>
                    <td className="py-3 px-4 text-gray-500">{p.brand}</td>
                    <td className="py-3 px-4">
                      {p.status === 'published' ? (
                        <Badge variant="success">Đã xuất bản</Badge>
                      ) : (
                        <Badge variant="outline">Bản nháp</Badge>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-400">{formatDate(p.createdAt)}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link
                        to={`/san-pham/${p.categorySlug}/${p.slug}`}
                        target="_blank"
                        className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg inline-block"
                        title="Xem trang public"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                        className="p-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(p.id);
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

        <ConfirmDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          title="Xác nhận xóa sản phẩm"
          message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi hệ thống?"
        />
      </div>
    </>
  );
};
