import { NewsArticle, NewsFilterParams } from '../types/news';
import { MOCK_NEWS } from '../mock/newsData';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { realtimeSync } from './realtimeService';

const STORAGE_KEY = 'thienthanh_news_db';

function getLocalNews(): NewsArticle[] {
  return loadFromStorage<NewsArticle[]>(STORAGE_KEY, MOCK_NEWS);
}

let memoryNews: NewsArticle[] = getLocalNews();

realtimeSync.subscribe('NEWS_CHANGED', (newNews: NewsArticle[]) => {
  if (Array.isArray(newNews) && newNews.length > 0) {
    if (JSON.stringify(newNews) !== JSON.stringify(memoryNews)) {
      memoryNews = newNews;
      saveToStorage(STORAGE_KEY, newNews);
    }
  }
});

function persistNews(news: NewsArticle[]): void {
  memoryNews = news;
  saveToStorage(STORAGE_KEY, news);
  realtimeSync.publish('NEWS_CHANGED', news);
}

export const newsService = {
  async getNews(params?: NewsFilterParams): Promise<{ data: NewsArticle[]; total: number }> {
    memoryNews = getLocalNews();
    let filtered = [...memoryNews];

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
    const list = getLocalNews();
    return list.find(n => n.slug === slug || n.id === slug) || null;
  },

  async getNewsById(id: string): Promise<NewsArticle | null> {
    const list = getLocalNews();
    return list.find(n => n.id === id) || null;
  },

  async createNews(data: Partial<NewsArticle>): Promise<NewsArticle> {
    const currentList = getLocalNews();
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

    const updatedList = [newArticle, ...currentList];
    persistNews(updatedList);

    return newArticle;
  },

  async updateNews(id: string, data: Partial<NewsArticle>): Promise<NewsArticle> {
    const currentList = getLocalNews();
    const index = currentList.findIndex(n => n.id === id);
    if (index === -1) throw new Error('Không tìm thấy bài viết');

    const updated: NewsArticle = {
      ...currentList[index],
      ...data,
      updatedAt: new Date().toISOString()
    };

    const updatedList = [...currentList];
    updatedList[index] = updated;
    persistNews(updatedList);

    return updated;
  },

  async deleteNews(id: string): Promise<boolean> {
    const currentList = getLocalNews();
    const updatedList = currentList.filter(n => n.id !== id);
    persistNews(updatedList);
    return true;
  }
};
