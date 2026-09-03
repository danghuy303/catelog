import { api } from './api';

export interface UploadResult {
  success: boolean;
  url: string;
  objectKey: string;
  fileName: string;
}

export const uploadService = {
  async uploadProductImage(file: File, productId?: string): Promise<UploadResult> {
    // 1. Validation
    const maxSizeMB = 10;
    if (file.size > maxSizeMB * 1024 * 1024) {
      throw new Error(`Dung lượng ảnh không được vượt quá ${maxSizeMB}MB.`);
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Định dạng file không hỗ trợ. Vui lòng chọn JPG, PNG, WEBP hoặc AVIF.');
    }

    // 2. Real API upload if Worker VITE_API_URL exists
    if (import.meta.env.VITE_API_URL) {
      const formData = new FormData();
      formData.append('file', file);
      if (productId) formData.append('productId', productId);

      const res = await api.post<UploadResult>('/upload/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    }

    // 3. Fallback client-side image compression and preview creation
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 800;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              maxDim;
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedUrl = canvas.toDataURL('image/jpeg', 0.7);
            const objectKey = `products/${productId || 'temp'}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
            resolve({
              success: true,
              url: compressedUrl,
              objectKey,
              fileName: file.name
            });
            return;
          }

          const objectKey = `products/${productId || 'temp'}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
          resolve({
            success: true,
            url: e.target?.result as string,
            objectKey,
            fileName: file.name
          });
        };
        img.onerror = () => {
          const objectKey = `products/${productId || 'temp'}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
          resolve({
            success: true,
            url: e.target?.result as string,
            objectKey,
            fileName: file.name
          });
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  },

  async uploadNewsImage(file: File): Promise<UploadResult> {
    if (import.meta.env.VITE_API_URL) {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post<UploadResult>('/upload/news', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          success: true,
          url: reader.result as string,
          objectKey: `news/${Date.now()}_${file.name}`,
          fileName: file.name
        });
      };
      reader.readAsDataURL(file);
    });
  }
};
