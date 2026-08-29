import { NewsArticle, NewsFilterParams } from '../types/news';
import { MOCK_NEWS } from '../mock/newsData';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'thienthanh_news_db';
const PUBLIC_REST_API = 'https://api.restful-api.dev/objects';
const OBJECT_PREFIX = 'TT_NEWS_RECORD_V6';

const newsChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('thienthanh_news_channel')
  : null;

function getLocalNews(): NewsArticle[] {
  return loadFromStorage<NewsArticle[]>(STORAGE_KEY, MOCK_NEWS);
}

function saveLocalNews(news: NewsArticle[]): void {
  saveToStorage(STORAGE_KEY, news);
  if (newsChannel) {
    newsChannel.postMessage({ type: 'NEWS_UPDATED' });
  }
}

async function syncNewsToCloud(news: NewsArticle[]): Promise<void> {
  try {
    await fetch(PUBLIC_REST_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: OBJECT_PREFIX,
        data: news
      })
    });
  } catch (e) {
    console.warn('Cloud news sync warning:', e);
  }
}

export const newsService = {
  async getNews(params?: NewsFilterParams): Promise<{ data: NewsArticle[]; total: number }> {
    let list = getLocalNews();

    if (!import.meta.env.DEV) {
      try {
        const res = await fetch(PUBLIC_REST_API);
        if (res.ok) {
          const rawObjects = await res.json();
          if (Array.isArray(rawObjects)) {
            const cloudObj = [...rawObjects].reverse().find((obj: any) => obj && obj.name === OBJECT_PREFIX && Array.isArray(obj.data));
            if (cloudObj && Array.isArray(cloudObj.data) && cloudObj.data.length > 0) {
              const cloudList: NewsArticle[] = cloudObj.data;
              const merged = [...cloudList];
              list.forEach(l => {
                if (!merged.some(m => m.id === l.id || m.slug === l.slug)) {
                  merged.unshift(l);
                }
              });
              list = merged;
              saveToStorage(STORAGE_KEY, list);
            }
          }
        }
      } catch {
        // fallback
      }
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
    const list = getLocalNews();
    return list.find(n => n.slug === slug || n.id === slug) || null;
  },

  async getNewsById(id: string): Promise<NewsArticle | null> {
    const list = getLocalNews();
    return list.find(n => n.id === id) || null;
  },

  async createNews(data: Partial<NewsArticle>): Promise<NewsArticle> {
    const list = getLocalNews();
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
    list.unshift(newArticle);
    saveLocalNews(list);

    if (!import.meta.env.DEV) {
      syncNewsToCloud(list);
    }
    return newArticle;
  },

  async updateNews(id: string, data: Partial<NewsArticle>): Promise<NewsArticle> {
    const list = getLocalNews();
    const index = list.findIndex(n => n.id === id);
    if (index === -1) throw new Error('Không tìm thấy bài viết');

    const updated: NewsArticle = {
      ...list[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    list[index] = updated;
    saveLocalNews(list);

    if (!import.meta.env.DEV) {
      syncNewsToCloud(list);
    }
    return updated;
  },

  async deleteNews(id: string): Promise<boolean> {
    let list = getLocalNews();
    list = list.filter(n => n.id !== id);
    saveLocalNews(list);

    if (!import.meta.env.DEV) {
      syncNewsToCloud(list);
    }
    return true;
  }
};
