import { NewsArticle, NewsFilterParams } from '../types/news';
import { MOCK_NEWS } from '../mock/newsData';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { realtimeSync } from './realtimeService';

const STORAGE_KEY = 'thienthanh_news_db';
const CLOUD_NEWS_URL = 'https://api.restful-api.dev/objects/ff808181a04ccf2d01a052f1255117db';

let memoryNews: NewsArticle[] = loadFromStorage<NewsArticle[]>(STORAGE_KEY, MOCK_NEWS);

function persistNews(news: NewsArticle[]): void {
  memoryNews = news;
  saveToStorage(STORAGE_KEY, news);
  realtimeSync.publish('NEWS_CHANGED', news);
}

async function pushNewsToCloud(news: NewsArticle[]): Promise<void> {
  try {
    await fetch(CLOUD_NEWS_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'TT_NEWS_PERMANENT',
        data: news
      })
    });
  } catch (e) {
    console.warn('Cloud news sync notice:', e);
  }
}

export const newsService = {
  async getNews(params?: NewsFilterParams): Promise<{ data: NewsArticle[]; total: number }> {
    let list = [...memoryNews];

    try {
      const res = await fetch(CLOUD_NEWS_URL);
      if (res.ok) {
        const json = await res.json();
        const cloudData = json.data;
        if (Array.isArray(cloudData) && cloudData.length > 0) {
          const merged = [...cloudData];
          list.forEach((l: NewsArticle) => {
            if (!merged.some(m => m.id === l.id || m.slug === l.slug)) {
              merged.unshift(l);
            }
          });
          if (JSON.stringify(merged) !== JSON.stringify(memoryNews)) {
            memoryNews = merged;
            saveToStorage(STORAGE_KEY, merged);
            realtimeSync.publish('NEWS_CHANGED', merged);
          }
          list = memoryNews;
        }
      }
    } catch {
      // Use local memory fallback
    }

    let filtered = [...list];

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
    const list = memoryNews;
    return list.find(n => n.slug === slug || n.id === slug) || null;
  },

  async getNewsById(id: string): Promise<NewsArticle | null> {
    const list = memoryNews;
    return list.find(n => n.id === id) || null;
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

    const updatedList = [newArticle, ...memoryNews];
    persistNews(updatedList);
    pushNewsToCloud(updatedList);

    return newArticle;
  },

  async updateNews(id: string, data: Partial<NewsArticle>): Promise<NewsArticle> {
    const index = memoryNews.findIndex(n => n.id === id);
    if (index === -1) throw new Error('Không tìm thấy bài viết');

    const updated: NewsArticle = {
      ...memoryNews[index],
      ...data,
      updatedAt: new Date().toISOString()
    };

    const updatedList = [...memoryNews];
    updatedList[index] = updated;
    persistNews(updatedList);
    pushNewsToCloud(updatedList);

    return updated;
  },

  async deleteNews(id: string): Promise<boolean> {
    const updatedList = memoryNews.filter(n => n.id !== id);
    persistNews(updatedList);
    pushNewsToCloud(updatedList);
    return true;
  }
};
