import { SiteSettings } from '../types/setting';
import { MOCK_SITE_SETTINGS } from '../mock/settingsData';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'thienthanh_settings_db';

function getLocalSettings(): SiteSettings {
  return loadFromStorage<SiteSettings>(STORAGE_KEY, MOCK_SITE_SETTINGS);
}

function saveLocalSettings(settings: SiteSettings): void {
  saveToStorage(STORAGE_KEY, settings);
}

export const settingsService = {
  async getSettings(): Promise<SiteSettings> {
    return getLocalSettings();
  },

  async updateSettings(newSettings: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = getLocalSettings();
    const updated = {
      ...current,
      ...newSettings,
      updatedAt: new Date().toISOString()
    };
    saveLocalSettings(updated);
    return updated;
  }
};
