export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
  status: 'active' | 'inactive';
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'inactive';
  articleCount?: number;
  createdAt: string;
  updatedAt: string;
}
