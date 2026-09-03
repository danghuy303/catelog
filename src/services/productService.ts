import { Product, ProductFilterParams } from '../types/product';
import { MOCK_PRODUCTS } from '../mock/productsData';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { realtimeSync } from './realtimeService';

const STORAGE_KEY = 'thienthanh_products_db';

function getLocalProducts(): Product[] {
  const prods = loadFromStorage<Product[]>(STORAGE_KEY, MOCK_PRODUCTS);
  return prods.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

let memoryProducts: Product[] = getLocalProducts();

// Listen to realtimeSync for cross-window / cross-device incoming updates
realtimeSync.subscribe('PRODUCT_CHANGED', (incomingProducts: Product[]) => {
  if (Array.isArray(incomingProducts) && incomingProducts.length > 0) {
    const currentLocal = getLocalProducts();
    const mergedMap = new Map<string, Product>();

    // Put current local products first
    currentLocal.forEach(p => mergedMap.set(p.id, p));

    // Merge incoming products without overriding with empty data
    incomingProducts.forEach(inc => {
      if (inc && inc.id) {
        const existing = mergedMap.get(inc.id);
        if (existing) {
          mergedMap.set(inc.id, { ...existing, ...inc });
        } else {
          mergedMap.set(inc.id, inc);
        }
      }
    });

    const merged = Array.from(mergedMap.values()).sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );

    memoryProducts = merged;
    saveToStorage(STORAGE_KEY, merged);
  }
});

function persistProducts(products: Product[]): void {
  const sorted = [...products].sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
  memoryProducts = sorted;
  saveToStorage(STORAGE_KEY, sorted);
  realtimeSync.publish('PRODUCT_CHANGED', sorted);
}

async function pushProductsToCloud(products: Product[]): Promise<void> {
  try {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    });
  } catch {
    // fallback gracefully
  }
}

async function syncWithCloudStore(): Promise<Product[]> {
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const cloudProducts: Product[] = json.data;
        const currentLocal = getLocalProducts();
        const mergedMap = new Map<string, Product>();

        // Always prioritize local products so newly created local items are NEVER lost
        currentLocal.forEach(p => mergedMap.set(p.id, p));

        cloudProducts.forEach(c => {
          if (c && c.id && !mergedMap.has(c.id)) {
            mergedMap.set(c.id, c);
          }
        });

        const merged = Array.from(mergedMap.values()).sort(
          (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );

        memoryProducts = merged;
        saveToStorage(STORAGE_KEY, merged);
        return merged;
      }
    }
  } catch {
    // Return local if fetch fails
  }
  return memoryProducts;
}

export const productService = {
  async getProducts(params?: ProductFilterParams): Promise<{ data: Product[]; total: number }> {
    // 1. Load local memory first for instant 0ms response
    memoryProducts = getLocalProducts();

    // 2. Safely attempt cloud sync in background without blocking or wiping local products
    try {
      const synced = await syncWithCloudStore();
      if (synced && synced.length > 0) {
        memoryProducts = synced;
      }
    } catch {
      // Use local memory fallback
    }

    let filtered = [...memoryProducts].sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );

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
    await syncWithCloudStore();
    const list = getLocalProducts();
    const found = list.find(p => p.slug === productSlug || p.id === productSlug);
    return found || null;
  },

  async getProductById(id: string): Promise<Product | null> {
    await syncWithCloudStore();
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
    const currentList = getLocalProducts();
    const defaultThumb = productData.images?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80';
    
    // Unique ID and SKU for unlimited product creation
    const uniqueId = `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const uniqueSku = productData.sku || `TT-SKU-${Date.now().toString().slice(-4)}`;

    const newProduct: Product = {
      id: uniqueId,
      categoryId: productData.categoryId || 'cat-1',
      categoryName: productData.categoryName || 'Đồ uống',
      categorySlug: productData.categorySlug || 'do-uong',
      name: productData.name || 'Sản phẩm mới',
      slug: productData.slug || `san-pham-${Date.now()}`,
      sku: uniqueSku,
      shortDescription: productData.shortDescription || '',
      description: productData.description || '',
      brand: productData.brand || 'Thiên Thanh',
      origin: productData.origin || 'Việt Nam',
      specification: productData.specification || '',
      thumbnailUrl: productData.thumbnailUrl || defaultThumb,
      images: productData.images && productData.images.length > 0 ? productData.images : [{
        id: `img-${Date.now()}`,
        productId: uniqueId,
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

    // Remove collision and unshift to top of current list
    const filteredList = currentList.filter(p => p.id !== uniqueId && p.sku !== uniqueSku);
    const updatedList = [newProduct, ...filteredList];
    
    persistProducts(updatedList);
    await pushProductsToCloud(updatedList);

    return newProduct;
  },

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const currentList = getLocalProducts();
    const index = currentList.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Không tìm thấy sản phẩm');

    const updated: Product = {
      ...currentList[index],
      ...productData,
      updatedAt: new Date().toISOString()
    };

    const updatedList = [...currentList];
    updatedList[index] = updated;
    persistProducts(updatedList);
    await pushProductsToCloud(updatedList);

    return updated;
  },

  async deleteProduct(id: string): Promise<boolean> {
    const currentList = getLocalProducts();
    const updatedList = currentList.filter(p => p.id !== id);
    persistProducts(updatedList);
    await pushProductsToCloud(updatedList);
    return true;
  }
};
