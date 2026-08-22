import { NewsArticle, NewsFilterParams } from '../types/news';
import { MOCK_NEWS } from '../mock/newsData';

let localNews: NewsArticle[] = [...MOCK_NEWS];

export const newsService = {
  async getNews(params?: NewsFilterParams): Promise<{ data: NewsArticle[]; total: number }> {
    let filtered = [...localNews];

    if (params?.categorySlug) {
      filtered = filtered.filter(n => n.categorySlug === params.categorySlug);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.shortDescription.toLowerCase().includes(q)
      );
    }
    if (params?.status) {
      filtered = filtered.filter(n => n.status === params.status);
    }

    return {
      data: filtered,
      total: filtered.length
    };
  },

  async getNewsBySlug(categorySlug: string, slug: string): Promise<NewsArticle | null> {
    return localNews.find(n => n.slug === slug || n.id === slug) || null;
  },

  async getNewsById(id: string): Promise<NewsArticle | null> {
    return localNews.find(n => n.id === id) || null;
  },

  async createNews(data: Partial<NewsArticle>): Promise<NewsArticle> {
    const newArticle: NewsArticle = {
      id: `news-${Date.now()}`,
      categoryId: data.categoryId || 'ncat-1',
      categoryName: data.categoryName || 'Văn hóa doanh nghiệp',
      categorySlug: data.categorySlug || 'van-hoa-doanh-nghiep',
      title: data.title || 'Bài viết mới',
      slug: data.slug || `bai-viet-${Date.now()}`,
      thumbnailUrl: data.thumbnailUrl || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      shortDescription: data.shortDescription || '',
      content: data.content || '',
      author: data.author || 'Ban Biên Tập',
      publishedAt: data.publishedAt || new Date().toISOString(),
      status: data.status || 'published',
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    localNews.unshift(newArticle);
    return newArticle;
  },

  async updateNews(id: string, data: Partial<NewsArticle>): Promise<NewsArticle> {
    const index = localNews.findIndex(n => n.id === id);
    if (index === -1) throw new Error('Không tìm thấy bài viết');

    const updated: NewsArticle = {
      ...localNews[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    localNews[index] = updated;
    return updated;
  },

  async deleteNews(id: string): Promise<boolean> {
    localNews = localNews.filter(n => n.id !== id);
    return true;
  }
};
