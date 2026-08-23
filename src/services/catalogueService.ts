import { CatalogueItem } from '../types/catalogue';
import { MOCK_CATALOGUES } from '../mock/cataloguesData';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'thienthanh_catalogues_db';

function getLocalCatalogues(): CatalogueItem[] {
  return loadFromStorage<CatalogueItem[]>(STORAGE_KEY, MOCK_CATALOGUES);
}

function saveLocalCatalogues(items: CatalogueItem[]): void {
  saveToStorage(STORAGE_KEY, items);
}

export const catalogueService = {
  async getCatalogues(): Promise<CatalogueItem[]> {
    const list = getLocalCatalogues();
    return list.filter(c => c.status === 'active');
  },

  async getAllCataloguesForAdmin(): Promise<CatalogueItem[]> {
    return getLocalCatalogues();
  },

  async createCatalogue(data: Partial<CatalogueItem>): Promise<CatalogueItem> {
    const list = getLocalCatalogues();
    const newItem: CatalogueItem = {
      id: `catl-${Date.now()}`,
      title: data.title || 'Catalogue Mới',
      description: data.description || '',
      thumbnailUrl: data.thumbnailUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      fileUrl: data.fileUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSize: data.fileSize || '5.0 MB',
      status: data.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    list.unshift(newItem);
    saveLocalCatalogues(list);
    return newItem;
  },

  async deleteCatalogue(id: string): Promise<boolean> {
    let list = getLocalCatalogues();
    list = list.filter(c => c.id !== id);
    saveLocalCatalogues(list);
    return true;
  }
};
