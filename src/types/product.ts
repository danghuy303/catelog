export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  fileName: string;
  alt: string;
  sortOrder: number;
  isPrimary?: boolean;
  createdAt?: string;
}

export interface Product {
  id: string;
  categoryId: string;
  categoryName?: string;
  categorySlug?: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  brand: string;
  origin: string;
  specification: string;
  thumbnailUrl: string;
  images: ProductImage[];
  status: 'published' | 'draft';
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilterParams {
  categorySlug?: string;
  search?: string;
  featured?: boolean;
  status?: string;
  page?: number;
  limit?: number;
}
