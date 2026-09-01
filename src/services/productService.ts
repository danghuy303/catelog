import { Product, ProductFilterParams } from '../types/product';
import { MOCK_PRODUCTS } from '../mock/productsData';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { realtimeSync } from './realtimeService';

const STORAGE_KEY = 'thienthanh_products_db';
const CLOUD_PRODUCTS_URL = 'https://api.restful-api.dev/objects/ff808181a04ccf2d01a052f1252217da';

// Reactive in-memory store for instant zero-delay access
let memoryProducts: Product[] = loadFromStorage<Product[]>(STORAGE_KEY, MOCK_PRODUCTS);

function persistProducts(products: Product[]): void {
  memoryProducts = products;
  saveToStorage(STORAGE_KEY, products);
  realtimeSync.publish('PRODUCT_CHANGED', products);
}

async function pushProductsToCloud(products: Product[]): Promise<void> {
  // 1. Vercel Serverless Function
  try {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    });
  } catch {
    // fallback
  }

  // 2. Permanent REST Cloud Storage
  try {
    await fetch(CLOUD_PRODUCTS_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'TT_PRODUCTS_PERMANENT',
        data: products
      })
    });
  } catch (e) {
    console.warn('Cloud product sync notice:', e);
  }
}

export const productService = {
  async getProducts(params?: ProductFilterParams): Promise<{ data: Product[]; total: number }> {
    // Always start with memoryProducts for INSTANT 0ms response on Client A
    let list = [...memoryProducts];

    // Background cloud fetch to pull remote additions from other devices
    try {
      const res = await fetch(CLOUD_PRODUCTS_URL);
      if (res.ok) {
        const json = await res.json();
        const cloudData = json.data;
        if (Array.isArray(cloudData) && cloudData.length > 0) {
          // Cloud order is global authoritative order
          const merged = [...cloudData];
          // Keep any unpushed local items at the top
          list.forEach((l: Product) => {
            if (!merged.some(m => m.id === l.id || m.sku === l.sku)) {
              merged.unshift(l);
            }
          });
          if (JSON.stringify(merged) !== JSON.stringify(memoryProducts)) {
            memoryProducts = merged;
            saveToStorage(STORAGE_KEY, merged);
            realtimeSync.publish('PRODUCT_CHANGED', merged);
          }
          list = memoryProducts;
        }
      }
    } catch {
      // Use local memory fallback
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
    const list = memoryProducts;
    const found = list.find(p => p.slug === productSlug || p.id === productSlug);
    return found || null;
  },

  async getProductById(id: string): Promise<Product | null> {
    const list = memoryProducts;
    const found = list.find(p => p.id === id);
    return found || null;
  },

  async getRelatedProducts(categoryId: string, currentProductId: string, limit = 4): Promise<Product[]> {
    const list = memoryProducts;
    return list
      .filter(p => p.categoryId === categoryId && p.id !== currentProductId && p.status === 'published')
      .slice(0, limit);
  },

  async createProduct(productData: Partial<Product>): Promise<Product> {
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

    const updatedList = [newProduct, ...memoryProducts];
    persistProducts(updatedList);
    pushProductsToCloud(updatedList);

    return newProduct;
  },

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const index = memoryProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Không tìm thấy sản phẩm');

    const updated: Product = {
      ...memoryProducts[index],
      ...productData,
      updatedAt: new Date().toISOString()
    };

    const updatedList = [...memoryProducts];
    updatedList[index] = updated;
    persistProducts(updatedList);
    pushProductsToCloud(updatedList);

    return updated;
  },

  async deleteProduct(id: string): Promise<boolean> {
    const updatedList = memoryProducts.filter(p => p.id !== id);
    persistProducts(updatedList);
    pushProductsToCloud(updatedList);
    return true;
  }
};
