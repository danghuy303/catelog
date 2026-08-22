export interface NewsArticle {
  id: string;
  categoryId: string;
  categoryName?: string;
  categorySlug?: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  shortDescription: string;
  content: string;
  author: string;
  publishedAt: string;
  status: 'published' | 'draft';
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsFilterParams {
  categorySlug?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}
