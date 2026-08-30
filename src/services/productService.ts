import { Product, ProductFilterParams } from '../types/product';
import { MOCK_PRODUCTS } from '../mock/productsData';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'thienthanh_products_db';
const CENTRAL_SYNC_URL = 'https://api.jsonbin.io/v3/b/66cc3a18e41b4d34e4242fa5';

const productChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('thienthanh_products_channel')
  : null;

function getLocalProducts(): Product[] {
  return loadFromStorage<Product[]>(STORAGE_KEY, MOCK_PRODUCTS);
}

function saveLocalProducts(products: Product[]): void {
  saveToStorage(STORAGE_KEY, products);
  if (productChannel) {
    productChannel.postMessage({ type: 'PRODUCTS_UPDATED' });
  }
}

async function syncProductsToCloud(products: Product[]): Promise<void> {
  // 1. Sync to Vercel native API
  try {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    });
  } catch {
    // fallback
  }

  // 2. Sync to Central JSONBin Storage for global cross-browser sync
  try {
    await fetch(CENTRAL_SYNC_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$7zVn2fV5Wf/O8P5VbS9wO.m2gR8s5T9e1u2v3w4x5y6z'
      },
      body: JSON.stringify(products)
    });
  } catch (e) {
    console.warn('Central product sync notice:', e);
  }
}

export const productService = {
  async getProducts(params?: ProductFilterParams): Promise<{ data: Product[]; total: number }> {
    let list = getLocalProducts();

    // Fetch cloud data and prioritize Cloud global order (newest items at top)
    try {
      const res = await fetch(CENTRAL_SYNC_URL, {
        headers: {
          'X-Master-Key': '$2a$10$7zVn2fV5Wf/O8P5VbS9wO.m2gR8s5T9e1u2v3w4x5y6z'
        }
      });
      if (res.ok) {
        const json = await res.json();
        const cloudData = json.record || json;
        if (Array.isArray(cloudData) && cloudData.length > 0) {
          // Cloud array is the global source of truth for order!
          const merged = [...cloudData];
          // Preserve any unpushed local drafts
          list.forEach((l: Product) => {
            if (!merged.some(m => m.id === l.id || m.sku === l.sku)) {
              merged.unshift(l);
            }
          });
          list = merged;
          saveLocalProducts(list);
        }
      }
    } catch {
      // Use local storage fallback
    }

    let filtered = [...list];

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
    if (params?.featured !== undefined && params.featured === true) {
      const feat = filtered.filter(p => p.featured === true);
      if (feat.length > 0) filtered = feat;
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
    const defaultThumb = productData.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80';
    
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
      thumbnailUrl: productData.thumbnailUrl || defaultThumb,
      images: productData.images && productData.images.length > 0 ? productData.images : [{
        id: `img-${Date.now()}`,
        productId: `prod-${Date.now()}`,
        imageUrl: defaultThumb,
        fileName: 'placeholder.jpg',
        alt: productData.name || 'Ảnh sản phẩm',
        sortOrder: 0,
        isPrimary: true
      }],
      status: productData.status || 'published',
      featured: productData.featured !== undefined ? productData.featured : true,
      seoTitle: productData.seoTitle,
      seoDescription: productData.seoDescription,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    list.unshift(newProduct);
    saveLocalProducts(list);
    syncProductsToCloud(list);
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
    syncProductsToCloud(list);
    return updated;
  },

  async deleteProduct(id: string): Promise<boolean> {
    let list = getLocalProducts();
    list = list.filter(p => p.id !== id);
    saveLocalProducts(list);
    syncProductsToCloud(list);
    return true;
  }
};
