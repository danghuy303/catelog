export interface CatalogueItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  fileUrl: string;
  fileSize?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
