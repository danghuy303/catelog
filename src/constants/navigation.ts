export interface MegaMenuItem {
  name: string;
  slug: string;
  description: string;
  iconName: string;
  itemCountText?: string;
  badge?: string;
}

export const PRODUCT_CATEGORIES_NAV: MegaMenuItem[] = [
  {
    name: "Đồ uống",
    slug: "do-uong",
    description: "Rượu ngoại nhập, bia cao cấp, trà & cà phê thượng hạng",
    iconName: "Wine",
    badge: "Hot Sales"
  },
  {
    name: "Hóa mỹ phẩm",
    slug: "hoa-my-pham",
    description: "Sản phẩm chăm sóc cá nhân & vệ sinh gia đình cao cấp",
    iconName: "Sparkles"
  },
  {
    name: "Bánh mứt kẹo",
    slug: "banh-mut-keo",
    description: "Bánh kẹo quà tặng, hộp quà Tết doanh nghiệp cao cấp",
    iconName: "Gift",
    badge: "Mới"
  },
  {
    name: "Thực phẩm nhà bếp",
    slug: "thuc-pham-nha-bep",
    description: "Gia vị cao cấp, nông sản đóng gói, dầu ăn & hạt dinh dưỡng",
    iconName: "CookingPot"
  },
  {
    name: "Đồ gia dụng",
    slug: "do-gia-dung",
    description: "Thiết bị nhà bếp, bộ nồi chảo, đồ dùng tiện ích gia đình",
    iconName: "Home"
  }
];

export const NEWS_CATEGORIES_NAV: MegaMenuItem[] = [
  {
    name: "Văn hóa doanh nghiệp",
    slug: "van-hoa-doanh-nghiep",
    description: "Giá trị cốt lõi, môi trường làm việc & hoạt động gắn kết",
    iconName: "Users"
  },
  {
    name: "Xu hướng quà tặng",
    slug: "xu-huong-qua-tang",
    description: "Gợi ý chọn quà tặng đối tác, khách hàng & nhân viên",
    iconName: "Award"
  },
  {
    name: "Sự kiện",
    slug: "su-kien",
    description: "Các sự kiện nổi bật, triển lãm & hội thảo doanh nghiệp",
    iconName: "Calendar"
  },
  {
    name: "Tuyển dụng",
    slug: "tuyen-dung",
    description: "Cơ hội nghề nghiệp & gia nhập đội ngũ Thiên Thanh",
    iconName: "Briefcase"
  },
  {
    name: "Case Study",
    slug: "case-study",
    description: "Câu chuyện thành công & dự án cung ứng thực tế",
    iconName: "BookOpen"
  }
];

export const MAIN_NAV_ITEMS = [
  { name: "Trang chủ", href: "/" },
  { name: "Về Thiên Thanh", href: "/ve-thien-thanh" },
  { name: "Sản phẩm", href: "/san-pham", hasDropdown: true },
  { name: "Tin tức", href: "/tin-tuc", hasNewsDropdown: true },
  { name: "Catalogue", href: "/catalogue" },
  { name: "Liên hệ", href: "/lien-he" },
];
