import { ProductCategory, NewsCategory } from '../types/category';
import { MOCK_PRODUCT_CATEGORIES, MOCK_NEWS_CATEGORIES } from '../mock/categoriesData';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const PROD_CAT_KEY = 'thienthanh_prod_categories_db';
const DELETED_PROD_CATS_KEY = 'thienthanh_deleted_prod_cats_db';
const NEWS_CAT_KEY = 'thienthanh_news_categories_db';
const DELETED_NEWS_CATS_KEY = 'thienthanh_deleted_news_cats_db';

function getDeletedCategoryIds(): string[] {
  return loadFromStorage<string[]>(DELETED_PROD_CATS_KEY, []);
}

function addDeletedCategoryId(id: string): void {
  const ids = getDeletedCategoryIds();
  if (!ids.includes(id)) {
    ids.push(id);
    saveToStorage(DELETED_PROD_CATS_KEY, ids);
  }
}

function getDeletedNewsCategoryIds(): string[] {
  return loadFromStorage<string[]>(DELETED_NEWS_CATS_KEY, []);
}

function addDeletedNewsCategoryId(id: string): void {
  const ids = getDeletedNewsCategoryIds();
  if (!ids.includes(id)) {
    ids.push(id);
    saveToStorage(DELETED_NEWS_CATS_KEY, ids);
  }
}

function getProdCategories(): ProductCategory[] {
  const deletedIds = getDeletedCategoryIds();
  const cats = loadFromStorage<ProductCategory[]>(PROD_CAT_KEY, MOCK_PRODUCT_CATEGORIES);
  return cats.filter(c => c && c.id && !deletedIds.includes(c.id));
}

function saveProdCategories(cats: ProductCategory[]): void {
  const deletedIds = getDeletedCategoryIds();
  const filtered = cats.filter(c => c && c.id && !deletedIds.includes(c.id));
  saveToStorage(PROD_CAT_KEY, filtered);
}

function getNewsCategories(): NewsCategory[] {
  const deletedIds = getDeletedNewsCategoryIds();
  const cats = loadFromStorage<NewsCategory[]>(NEWS_CAT_KEY, MOCK_NEWS_CATEGORIES);
  return cats.filter(c => c && c.id && !deletedIds.includes(c.id));
}

function saveNewsCategories(cats: NewsCategory[]): void {
  const deletedIds = getDeletedNewsCategoryIds();
  const filtered = cats.filter(c => c && c.id && !deletedIds.includes(c.id));
  saveToStorage(NEWS_CAT_KEY, filtered);
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
    addDeletedCategoryId(id);
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
  },

  async updateNewsCategory(id: string, data: Partial<NewsCategory>): Promise<NewsCategory> {
    const list = getNewsCategories();
    const index = list.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Không tìm thấy danh mục tin tức');
    list[index] = {
      ...list[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    saveNewsCategories(list);
    return list[index];
  },

  async deleteNewsCategory(id: string): Promise<boolean> {
    addDeletedNewsCategoryId(id);
    let list = getNewsCategories();
    list = list.filter(c => c.id !== id);
    saveNewsCategories(list);
    return true;
  }
};
