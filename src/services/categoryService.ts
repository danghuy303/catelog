import { ProductCategory, NewsCategory } from '../types/category';
import { MOCK_PRODUCT_CATEGORIES, MOCK_NEWS_CATEGORIES } from '../mock/categoriesData';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const PROD_CAT_KEY = 'thienthanh_prod_categories_db';
const NEWS_CAT_KEY = 'thienthanh_news_categories_db';

function getProdCategories(): ProductCategory[] {
  return loadFromStorage<ProductCategory[]>(PROD_CAT_KEY, MOCK_PRODUCT_CATEGORIES);
}

function saveProdCategories(cats: ProductCategory[]): void {
  saveToStorage(PROD_CAT_KEY, cats);
}

function getNewsCategories(): NewsCategory[] {
  return loadFromStorage<NewsCategory[]>(NEWS_CAT_KEY, MOCK_NEWS_CATEGORIES);
}

function saveNewsCategories(cats: NewsCategory[]): void {
  saveToStorage(NEWS_CAT_KEY, cats);
}

export const categoryService = {
  // Product Categories
  async getProductCategories(): Promise<ProductCategory[]> {
    const list = getProdCategories();
    return list.sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async getProductCategoryBySlug(slug: string): Promise<ProductCategory | null> {
    const list = getProdCategories();
    return list.find(c => c.slug === slug) || null;
  },

  async createProductCategory(data: Partial<ProductCategory>): Promise<ProductCategory> {
    const list = getProdCategories();
    const newCat: ProductCategory = {
      id: `cat-${Date.now()}`,
      name: data.name || '',
      slug: data.slug || `danh-muc-${Date.now()}`,
      description: data.description || '',
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      sortOrder: data.sortOrder || list.length + 1,
      status: data.status || 'active',
      productCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    list.push(newCat);
    saveProdCategories(list);
    return newCat;
  },

  async updateProductCategory(id: string, data: Partial<ProductCategory>): Promise<ProductCategory> {
    const list = getProdCategories();
    const index = list.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Không tìm thấy danh mục');
    list[index] = {
      ...list[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    saveProdCategories(list);
    return list[index];
  },

  async deleteProductCategory(id: string): Promise<boolean> {
    let list = getProdCategories();
    list = list.filter(c => c.id !== id);
    saveProdCategories(list);
    return true;
  },

  // News Categories
  async getNewsCategories(): Promise<NewsCategory[]> {
    return getNewsCategories();
  },

  async createNewsCategory(data: Partial<NewsCategory>): Promise<NewsCategory> {
    const list = getNewsCategories();
    const newCat: NewsCategory = {
      id: `ncat-${Date.now()}`,
      name: data.name || '',
      slug: data.slug || `tin-${Date.now()}`,
      description: data.description || '',
      status: data.status || 'active',
      articleCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    list.push(newCat);
    saveNewsCategories(list);
    return newCat;
  }
};
