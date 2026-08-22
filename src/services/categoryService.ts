import { ProductCategory, NewsCategory } from '../types/category';
import { MOCK_PRODUCT_CATEGORIES, MOCK_NEWS_CATEGORIES } from '../mock/categoriesData';

let localProductCategories = [...MOCK_PRODUCT_CATEGORIES];
let localNewsCategories = [...MOCK_NEWS_CATEGORIES];

export const categoryService = {
  // Product Categories
  async getProductCategories(): Promise<ProductCategory[]> {
    return localProductCategories.sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async getProductCategoryBySlug(slug: string): Promise<ProductCategory | null> {
    return localProductCategories.find(c => c.slug === slug) || null;
  },

  async createProductCategory(data: Partial<ProductCategory>): Promise<ProductCategory> {
    const newCat: ProductCategory = {
      id: `cat-${Date.now()}`,
      name: data.name || '',
      slug: data.slug || `danh-muc-${Date.now()}`,
      description: data.description || '',
      imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      sortOrder: data.sortOrder || localProductCategories.length + 1,
      status: data.status || 'active',
      productCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    localProductCategories.push(newCat);
    return newCat;
  },

  async updateProductCategory(id: string, data: Partial<ProductCategory>): Promise<ProductCategory> {
    const index = localProductCategories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Không tìm thấy danh mục');
    localProductCategories[index] = {
      ...localProductCategories[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return localProductCategories[index];
  },

  async deleteProductCategory(id: string): Promise<boolean> {
    localProductCategories = localProductCategories.filter(c => c.id !== id);
    return true;
  },

  // News Categories
  async getNewsCategories(): Promise<NewsCategory[]> {
    return localNewsCategories;
  },

  async createNewsCategory(data: Partial<NewsCategory>): Promise<NewsCategory> {
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
    localNewsCategories.push(newCat);
    return newCat;
  }
};
