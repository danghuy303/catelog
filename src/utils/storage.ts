export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item);
  } catch (e) {
    console.warn(`Error loading key "${key}" from localStorage:`, e);
    return fallback;
  }
}

export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Error saving key "${key}" to localStorage (attempting sanitization):`, e);
    try {
      // If saving fails (e.g. QuotaExceededError due to large base64 image strings),
      // sanitize heavy base64 strings to lightweight placeholders so data is never lost!
      if (Array.isArray(data)) {
        const defaultPlaceholder = 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80';
        const sanitized = data.map((item: any) => {
          if (item && typeof item === 'object') {
            const newItem = { ...item };
            if (typeof newItem.thumbnailUrl === 'string' && newItem.thumbnailUrl.startsWith('data:image')) {
              newItem.thumbnailUrl = defaultPlaceholder;
            }
            if (Array.isArray(newItem.images)) {
              newItem.images = newItem.images.map((img: any) => {
                if (img && typeof img.imageUrl === 'string' && img.imageUrl.startsWith('data:image')) {
                  return { ...img, imageUrl: defaultPlaceholder };
                }
                return img;
              });
            }
            return newItem;
          }
          return item;
        });
        localStorage.setItem(key, JSON.stringify(sanitized));
      } else {
        localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (err) {
      console.error(`Failed to save key "${key}" to localStorage after sanitization:`, err);
    }
  }
}
