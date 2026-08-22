import { SiteSettings } from '../types/setting';
import { MOCK_SITE_SETTINGS } from '../mock/settingsData';

let currentSettings: SiteSettings = { ...MOCK_SITE_SETTINGS };

export const settingsService = {
  async getSettings(): Promise<SiteSettings> {
    return currentSettings;
  },

  async updateSettings(newSettings: Partial<SiteSettings>): Promise<SiteSettings> {
    currentSettings = {
      ...currentSettings,
      ...newSettings,
      updatedAt: new Date().toISOString()
    };
    return currentSettings;
  }
};
