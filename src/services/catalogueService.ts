import { CatalogueItem } from '../types/catalogue';
import { MOCK_CATALOGUES } from '../mock/cataloguesData';

let localCatalogues: CatalogueItem[] = [...MOCK_CATALOGUES];

export const catalogueService = {
  async getCatalogues(): Promise<CatalogueItem[]> {
    return localCatalogues.filter(c => c.status === 'active');
  },

  async getAllCataloguesForAdmin(): Promise<CatalogueItem[]> {
    return localCatalogues;
  },

  async createCatalogue(data: Partial<CatalogueItem>): Promise<CatalogueItem> {
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
    localCatalogues.unshift(newItem);
    return newItem;
  },

  async deleteCatalogue(id: string): Promise<boolean> {
    localCatalogues = localCatalogues.filter(c => c.id !== id);
    return true;
  }
};
