import { ProductCategory, NewsCategory } from '../types/category';

export const MOCK_PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "cat-1",
    name: "Đồ uống",
    slug: "do-uong",
    description: "Các dòng sản phẩm rượu vang nhập khẩu, bia thủ công, nước trái cây nguyên chất & trà biếu cao cấp.",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    sortOrder: 1,
    status: "active",
    productCount: 12,
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-01T09:30:00Z"
  },
  {
    id: "cat-2",
    name: "Hóa mỹ phẩm",
    slug: "hoa-my-pham",
    description: "Bộ chăm sóc cá nhân, dầu gội, sữa tắm, dung dịch kháng khuẩn & vệ sinh công nghiệp tiêu chuẩn.",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    sortOrder: 2,
    status: "active",
    productCount: 8,
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-01T09:30:00Z"
  },
  {
    id: "cat-3",
    name: "Bánh mứt kẹo",
    slug: "banh-mut-keo",
    description: "Hộp quà Tết doanh nghiệp, bánh kẹo cao cấp nhập khẩu châu Âu, mứt hoa quả tự nhiên sang trọng.",
    imageUrl: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80",
    sortOrder: 3,
    status: "active",
    productCount: 15,
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-01T09:30:00Z"
  },
  {
    id: "cat-4",
    name: "Thực phẩm nhà bếp",
    slug: "thuc-pham-nha-bep",
    description: "Gia vị cao cấp, dầu ăn thượng hạng, nông sản chế biến & hạt dinh dưỡng đóng gói quà tặng.",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    sortOrder: 4,
    status: "active",
    productCount: 10,
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-01T09:30:00Z"
  },
  {
    id: "cat-5",
    name: "Đồ gia dụng",
    slug: "do-gia-dung",
    description: "Bộ nồi chảo inox cao cấp, ấm đun nước siêu tốc, máy xay sinh tố & bộ ly thủy tinh in logo.",
    imageUrl: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80",
    sortOrder: 5,
    status: "active",
    productCount: 9,
    createdAt: "2026-01-10T08:00:00Z",
    updatedAt: "2026-02-01T09:30:00Z"
  }
];

export const MOCK_NEWS_CATEGORIES: NewsCategory[] = [
  {
    id: "ncat-1",
    name: "Văn hóa doanh nghiệp",
    slug: "van-hoa-doanh-nghiep",
    description: "Các hoạt động nội bộ, xây dựng đội ngũ và tinh thần đồng đội tại Kiot Thiên Thanh.",
    status: "active",
    articleCount: 4,
    createdAt: "2026-01-01T08:00:00Z",
    updatedAt: "2026-01-01T08:00:00Z"
  },
  {
    id: "ncat-2",
    name: "Xu hướng quà tặng",
    slug: "xu-huong-qua-tang",
    description: "Gợi ý chọn lựa quà tặng doanh nghiệp, quà Tết, quà tri ân đối tác phù hợp xu hướng.",
    status: "active",
    articleCount: 6,
    createdAt: "2026-01-01T08:00:00Z",
    updatedAt: "2026-01-01T08:00:00Z"
  },
  {
    id: "ncat-3",
    name: "Sự kiện",
    slug: "su-kien",
    description: "Tin tức sự kiện, hội thảo và các chương trình kết nối doanh nghiệp.",
    status: "active",
    articleCount: 3,
    createdAt: "2026-01-01T08:00:00Z",
    updatedAt: "2026-01-01T08:00:00Z"
  },
  {
    id: "ncat-4",
    name: "Tuyển dụng",
    slug: "tuyen-dung",
    description: "Thông tin tuyển dụng các vị trí tại Thiên Thanh Việt Nam.",
    status: "active",
    articleCount: 2,
    createdAt: "2026-01-01T08:00:00Z",
    updatedAt: "2026-01-01T08:00:00Z"
  },
  {
    id: "ncat-5",
    name: "Case Study",
    slug: "case-study",
    description: "Phân tích dự án cung ứng quà tặng thành công cho đối tác tập đoàn.",
    status: "active",
    articleCount: 3,
    createdAt: "2026-01-01T08:00:00Z",
    updatedAt: "2026-01-01T08:00:00Z"
  }
];
