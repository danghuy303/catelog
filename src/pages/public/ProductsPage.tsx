import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../components/product/ProductCard';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { SearchInput } from '../../components/common/SearchInput';
import { Pagination } from '../../components/common/Pagination';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { ProductCategory } from '../../types/category';
import { Product } from '../../types/product';
import { Helmet } from 'react-helmet-async';
import { Filter, Layers } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<ProductCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitial() {
      const cats = await categoryService.getProductCategories();
      setCategories(cats);
    }
    loadInitial();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      if (categorySlug) {
        const cat = await categoryService.getProductCategoryBySlug(categorySlug);
        setCurrentCategory(cat);
      } else {
        setCurrentCategory(null);
      }

      const res = await productService.getProducts({
        categorySlug,
        search: searchTerm
      });

      setProducts(res.data);
      setLoading(false);
    }

    fetchProducts();
  }, [categorySlug, searchTerm]);

  const pageTitle = currentCategory ? currentCategory.name : 'Tất cả sản phẩm';
  const pageDescription = currentCategory
    ? currentCategory.description
    : 'Khám phá hơn 500+ sản phẩm tiêu dùng, đồ uống, hóa mỹ phẩm, bánh kẹo và gia dụng phân phối chính hãng bởi Kiot Thiên Thanh.';

  return (
    <>
      <Helmet>
        <title>{pageTitle} - Kiot Thiên Thanh</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <div className="bg-slate-50 py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Sản phẩm', href: '/san-pham' },
              ...(currentCategory ? [{ label: currentCategory.name }] : [])
            ]}
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {pageTitle}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
                {pageDescription}
              </p>
            </div>
            <SearchInput
              value={searchTerm}
              onChange={(val) => {
                setSearchTerm(val);
                if (val) searchParams.set('q', val);
                else searchParams.delete('q');
                setSearchParams(searchParams);
              }}
              placeholder="Tìm theo tên, mã SKU, thương hiệu..."
              className="w-full sm:w-72"
            />
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-gray-100">
            <a
              href="/san-pham"
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                !categorySlug
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'bg-slate-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tất cả danh mục
            </a>
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`/san-pham/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  categorySlug === cat.slug
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'bg-slate-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </a>
            ))}
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-80 bg-slate-100 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-gray-100 max-w-xl mx-auto">
              <Layers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-900 mb-1">Không tìm thấy sản phẩm nào</h3>
              <p className="text-xs text-gray-500">
                Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác.
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  );
};
