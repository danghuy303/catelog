import { Product, ProductFilterParams } from '../types/product';
import { MOCK_PRODUCTS } from '../mock/productsData';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'thienthanh_products_db';

function getLocalProducts(): Product[] {
  return loadFromStorage<Product[]>(STORAGE_KEY, MOCK_PRODUCTS);
}

function saveLocalProducts(products: Product[]): void {
  saveToStorage(STORAGE_KEY, products);
}

export const productService = {
  async getProducts(params?: ProductFilterParams): Promise<{ data: Product[]; total: number }> {
    let filtered = getLocalProducts();

    if (params?.categorySlug) {
      filtered = filtered.filter(p => p.categorySlug === params.categorySlug);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }
    if (params?.featured !== undefined) {
      filtered = filtered.filter(p => p.featured === params.featured);
    }
    if (params?.status) {
      filtered = filtered.filter(p => p.status === params.status);
    }

    return {
      data: filtered,
      total: filtered.length
    };
  },

  async getProductBySlug(categorySlug: string, productSlug: string): Promise<Product | null> {
    const list = getLocalProducts();
    const found = list.find(p => p.slug === productSlug || p.id === productSlug);
    return found || null;
  },

  async getProductById(id: string): Promise<Product | null> {
    const list = getLocalProducts();
    const found = list.find(p => p.id === id);
    return found || null;
  },

  async getRelatedProducts(categoryId: string, currentProductId: string, limit = 4): Promise<Product[]> {
    const list = getLocalProducts();
    return list
      .filter(p => p.categoryId === categoryId && p.id !== currentProductId && p.status === 'published')
      .slice(0, limit);
  },

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const list = getLocalProducts();
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      categoryId: productData.categoryId || 'cat-1',
      categoryName: productData.categoryName || 'Đồ uống',
      categorySlug: productData.categorySlug || 'do-uong',
      name: productData.name || 'Sản phẩm mới',
      slug: productData.slug || `san-pham-${Date.now()}`,
      sku: productData.sku || `TT-SKU-${Math.floor(Math.random() * 1000)}`,
      shortDescription: productData.shortDescription || '',
      description: productData.description || '',
      brand: productData.brand || 'Thiên Thanh',
      origin: productData.origin || 'Việt Nam',
      specification: productData.specification || '',
      thumbnailUrl: productData.thumbnailUrl || productData.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
      images: productData.images || [],
      status: productData.status || 'published',
      featured: productData.featured || false,
      seoTitle: productData.seoTitle,
      seoDescription: productData.seoDescription,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    list.unshift(newProduct);
    saveLocalProducts(list);
    return newProduct;
  },

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const list = getLocalProducts();
    const index = list.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Không tìm thấy sản phẩm');

    const updated: Product = {
      ...list[index],
      ...productData,
      updatedAt: new Date().toISOString()
    };

    list[index] = updated;
    saveLocalProducts(list);
    return updated;
  },

  async deleteProduct(id: string): Promise<boolean> {
    let list = getLocalProducts();
    list = list.filter(p => p.id !== id);
    saveLocalProducts(list);
    return true;
  }
};
