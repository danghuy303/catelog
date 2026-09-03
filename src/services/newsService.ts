import { NewsArticle, NewsFilterParams } from '../types/news';
import { MOCK_NEWS } from '../mock/newsData';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { realtimeSync } from './realtimeService';

const STORAGE_KEY = 'thienthanh_news_db';
const DELETED_NEWS_KEY = 'thienthanh_deleted_news_db';

function getDeletedNewsIds(): string[] {
  return loadFromStorage<string[]>(DELETED_NEWS_KEY, []);
}

function addDeletedNewsId(id: string): void {
  const ids = getDeletedNewsIds();
  if (!ids.includes(id)) {
    ids.push(id);
    saveToStorage(DELETED_NEWS_KEY, ids);
  }
}

function getLocalNews(): NewsArticle[] {
  const deletedIds = getDeletedNewsIds();
  const articles = loadFromStorage<NewsArticle[]>(STORAGE_KEY, MOCK_NEWS);
  return articles
    .filter(a => a && a.id && !deletedIds.includes(a.id))
    .sort((a, b) => new Date(b.createdAt || b.publishedAt || 0).getTime() - new Date(a.createdAt || a.publishedAt || 0).getTime());
}

let memoryNews: NewsArticle[] = getLocalNews();

realtimeSync.subscribe('NEWS_CHANGED', (incomingNews: NewsArticle[]) => {
  if (Array.isArray(incomingNews)) {
    const deletedIds = getDeletedNewsIds();
    const currentLocal = getLocalNews();
    const mergedMap = new Map<string, NewsArticle>();

    currentLocal.forEach(a => {
      if (a && a.id && !deletedIds.includes(a.id)) {
        mergedMap.set(a.id, a);
      }
    });

    incomingNews.forEach(inc => {
      if (inc && inc.id && !deletedIds.includes(inc.id)) {
        const existing = mergedMap.get(inc.id);
        if (existing) {
          mergedMap.set(inc.id, { ...existing, ...inc });
        } else {
          mergedMap.set(inc.id, inc);
        }
      }
    });

    const merged = Array.from(mergedMap.values()).sort(
      (a, b) => new Date(b.createdAt || b.publishedAt || 0).getTime() - new Date(a.createdAt || a.publishedAt || 0).getTime()
    );

    memoryNews = merged;
    saveToStorage(STORAGE_KEY, merged);
  }
});

function persistNews(news: NewsArticle[]): void {
  const deletedIds = getDeletedNewsIds();
  const sorted = [...news]
    .filter(a => a && a.id && !deletedIds.includes(a.id))
    .sort((a, b) => new Date(b.createdAt || b.publishedAt || 0).getTime() - new Date(a.createdAt || a.publishedAt || 0).getTime());
  memoryNews = sorted;
  saveToStorage(STORAGE_KEY, sorted);
  realtimeSync.publish('NEWS_CHANGED', sorted);
}

async function pushNewsToCloud(news: NewsArticle[]): Promise<void> {
  try {
    await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(news)
    });
  } catch {
    // fallback
  }
}

async function syncWithCloudStore(): Promise<NewsArticle[]> {
  try {
    const deletedIds = getDeletedNewsIds();
    const res = await fetch('/api/news');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const cloudNews: NewsArticle[] = json.data;
        const currentLocal = getLocalNews();
        const mergedMap = new Map<string, NewsArticle>();

        currentLocal.forEach(a => {
          if (a && a.id && !deletedIds.includes(a.id)) {
            mergedMap.set(a.id, a);
          }
        });

        cloudNews.forEach(c => {
          if (c && c.id && !deletedIds.includes(c.id) && !mergedMap.has(c.id)) {
            mergedMap.set(c.id, c);
          }
        });

        const merged = Array.from(mergedMap.values()).sort(
          (a, b) => new Date(b.createdAt || b.publishedAt || 0).getTime() - new Date(a.createdAt || a.publishedAt || 0).getTime()
        );

        memoryNews = merged;
        saveToStorage(STORAGE_KEY, merged);
        return merged;
      }
    }
  } catch {
    // Return local fallback
  }
  return memoryNews;
}

export const newsService = {
  async getNews(params?: NewsFilterParams): Promise<{ data: NewsArticle[]; total: number }> {
    memoryNews = getLocalNews();

    try {
      const synced = await syncWithCloudStore();
      if (synced && synced.length > 0) {
        memoryNews = synced;
      }
    } catch {
      // Use local memory fallback
    }

    let filtered = [...memoryNews].sort(
      (a, b) => new Date(b.createdAt || b.publishedAt || 0).getTime() - new Date(a.createdAt || a.publishedAt || 0).getTime()
    );

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
    await syncWithCloudStore();
    const list = getLocalNews();
    return list.find(n => n.slug === slug || n.id === slug) || null;
  },

  async getNewsById(id: string): Promise<NewsArticle | null> {
    await syncWithCloudStore();
    const list = getLocalNews();
    return list.find(n => n.id === id) || null;
  },

  async createNews(data: Partial<NewsArticle>): Promise<NewsArticle> {
    const currentList = getLocalNews();
    const uniqueId = `news-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newArticle: NewsArticle = {
      id: uniqueId,
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

    const filteredList = currentList.filter(n => n.id !== uniqueId);
    const updatedList = [newArticle, ...filteredList];
    persistNews(updatedList);
    await pushNewsToCloud(updatedList);

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
    await pushNewsToCloud(updatedList);

    return updated;
  },

  async deleteNews(id: string): Promise<boolean> {
    addDeletedNewsId(id);
    const currentList = getLocalNews();
    const updatedList = currentList.filter(n => n.id !== id);
    persistNews(updatedList);
    await pushNewsToCloud(updatedList);
    return true;
  }
};
