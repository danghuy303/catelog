import { Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    categoryId: "cat-1",
    categoryName: "Đồ uống",
    categorySlug: "do-uong",
    name: "Bộ Hộp Quà Rượu Vang Đỏ Bordeaux Premium",
    slug: "bo-hop-qua-ruou-vang-do-bordeaux-premium",
    sku: "TT-WINE-BDX01",
    shortDescription: "Bộ quà tặng cao cấp gồm 2 chai vang đỏ Bordeaux Pháp nhập khẩu chính ngạch kèm phụ kiện mở vang sang trọng.",
    description: `
      <h3>Giải pháp quà tặng doanh nghiệp đẳng cấp</h3>
      <p>Bộ Hộp Quà Rượu Vang Đỏ Bordeaux Premium là sự lựa chọn hàng đầu cho các doanh nghiệp khi cần chuẩn bị quà tặng đối tác cao cấp trong các dịp Lễ, Tết, Kỷ niệm thành lập.</p>
      <h4>Đặc điểm nổi bật:</h4>
      <ul>
        <li>Xuất xứ: Bordeaux, Pháp (Nhập khẩu nguyên chai)</li>
        <li>Hương vị: Đậm đà hương trái cây chín đỏ, mâm xôi, gỗ sồi lâu năm và chút vị chát dịu êm.</li>
        <li>Vỏ hộp: Hộp gỗ bọc da cao cấp in dập nổi logo doanh nghiệp theo yêu cầu.</li>
        <li>Phụ kiện đi kèm: Dụng cụ mở nút bần, vòng đệm cổ chai, nút rót vang inox 304.</li>
      </ul>
      <p>Kiot Thiên Thanh cam kết đầy đủ giấy tờ chứng nhận xuất xứ (CO) và kiểm định an toàn vệ sinh thực phẩm (CA).</p>
    `,
    brand: "Château Bordeaux",
    origin: "Pháp",
    specification: "Hộp 2 chai 750ml + Phụ kiện da gỗ cao cấp",
    thumbnailUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img-1-1",
        productId: "prod-1",
        imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
        fileName: "bordeaux-1.jpg",
        alt: "Hộp quà rượu vang Bordeaux",
        sortOrder: 1,
        isPrimary: true
      },
      {
        id: "img-1-2",
        productId: "prod-1",
        imageUrl: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&w=800&q=80",
        fileName: "bordeaux-2.jpg",
        alt: "Chi tiết chai rượu vang Pháp",
        sortOrder: 2
      },
      {
        id: "img-1-3",
        productId: "prod-1",
        imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80",
        fileName: "bordeaux-3.jpg",
        alt: "Phụ kiện mở vang inox",
        sortOrder: 3
      }
    ],
    status: "published",
    featured: true,
    seoTitle: "Bộ Quà Tặng Rượu Vang Bordeaux Nhập Khẩu Pháp - Kiot Thiên Thanh",
    seoDescription: "Chuyên cung cấp bộ hộp quà rượu vang Pháp nhập khẩu cao cấp cho doanh nghiệp tại Hà Nội & Hải Phòng. Hỗ trợ in logo thương hiệu.",
    createdAt: "2026-01-15T09:00:00Z",
    updatedAt: "2026-02-10T14:20:00Z"
  },
  {
    id: "prod-2",
    categoryId: "cat-3",
    categoryName: "Bánh mứt kẹo",
    categorySlug: "banh-mut-keo",
    name: "Hộp Quà Tết Doanh Nghiệp Thiên Thanh Thịnh Vượng",
    slug: "hop-qua-tet-doanh-nghiep-thien-thanh-thinh-vuong",
    sku: "TT-GIFT-TET26",
    shortDescription: "Bộ sưu tập quà Tết sang trọng kết hợp bánh biscuit Bỉ, mứt dẻo hoa quả, hạt dinh dưỡng macca & trà Ô Long thượng hạng.",
    description: `
      <h3>Hộp Quà Tết Thịnh Vượng 2026</h3>
      <p>Mang thông điệp trao gửi an khang, thắt chặt tình giao hảo giữa doanh nghiệp với đối tác và toàn thể nhân viên.</p>
      <h4>Thành phần bộ quà:</h4>
      <ul>
        <li>1 Hộp bánh quy Bơ Bỉ Lambertz Premium (250g)</li>
        <li>1 Hộp mứt hoa quả sấy dẻo tự nhiên Đà Lạt (200g)</li>
        <li>1 Hộp hạt Macca Úc nứt vỏ cao cấp (250g)</li>
        <li>1 Hộp Trà Ô Long Mộc Châu tuyển chọn (100g)</li>
        <li>1 Chai Nước ép nho có ga nhập khẩu Tây Ban Nha (750ml)</li>
      </ul>
      <p>Hỗ trợ tùy chỉnh thành phần & in dập ép kim logo doanh nghiệp từ 20 bộ trở lên.</p>
    `,
    brand: "Kiot Thiên Thanh Select",
    origin: "Việt Nam / Nhập khẩu",
    specification: "Hộp gỗ cứng cao cấp + Túi ép kim thương hiệu",
    thumbnailUrl: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img-2-1",
        productId: "prod-2",
        imageUrl: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80",
        fileName: "gift-tet-1.jpg",
        alt: "Hộp quà Tết Thịnh Vượng",
        sortOrder: 1,
        isPrimary: true
      },
      {
        id: "img-2-2",
        productId: "prod-2",
        imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
        fileName: "gift-tet-2.jpg",
        alt: "Các sản phẩm trong hộp quà Tết",
        sortOrder: 2
      }
    ],
    status: "published",
    featured: true,
    seoTitle: "Hộp Quà Tết Doanh Nghiệp 2026 - Kiot Thiên Thanh",
    seoDescription: "Set quà Tết doanh nghiệp sang trọng, chiết khấu cao, in logo theo yêu cầu. Giao hàng toàn quốc.",
    createdAt: "2026-01-18T10:00:00Z",
    updatedAt: "2026-02-12T11:00:00Z"
  },
  {
    id: "prod-3",
    categoryId: "cat-5",
    categoryName: "Đồ gia dụng",
    categorySlug: "do-gia-dung",
    name: "Bộ Nồi Inox 3 Lớp Đáy Liền Elmich Supreme 5 Đáy",
    slug: "bo-noi-inox-3-lop-day-lien-elmich-supreme-5-day",
    sku: "TT-GD-ELM05",
    shortDescription: "Bộ 3 nồi inox 304 tiêu chuẩn châu Âu, dùng cho mọi loại bếp kể cả bếp từ, quà tặng doanh nghiệp thiết thực.",
    description: `
      <h3>Bộ nồi inox gia dụng cao cấp Elmich Supreme</h3>
      <p>Sản phẩm đạt chuẩn Châu Âu, là món quà tri ân thiết thực cho cán bộ công nhân viên hoặc khách hàng thân thiết trong các chương trình khuyến mãi, bốc thăm may mắn.</p>
      <ul>
        <li>Chất liệu: Inox 304 chống gỉ sét, an toàn tuyệt đối cho sức khỏe.</li>
        <li>Kích thước nồi: 16cm - 20cm - 24cm.</li>
        <li>Quai nồi: Tản nhiệt thông minh không lo bị nóng khi bưng bê.</li>
      </ul>
    `,
    brand: "Elmich",
    origin: "Cộng Hòa Séc",
    specification: "Bộ 3 nồi (16cm, 20cm, 24cm) + Nắp kính chịu lực",
    thumbnailUrl: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img-3-1",
        productId: "prod-3",
        imageUrl: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80",
        fileName: "elmich-1.jpg",
        alt: "Bộ nồi inox Elmich",
        sortOrder: 1,
        isPrimary: true
      }
    ],
    status: "published",
    featured: true,
    seoTitle: "Bộ Nồi Inox Elmich Quà Tặng Doanh Nghiệp - Thiên Thanh",
    seoDescription: "Phân phối bộ nồi inox Elmich chính hãng làm quà tặng khuyến mãi doanh nghiệp giá sỉ tốt nhất.",
    createdAt: "2026-01-20T08:30:00Z",
    updatedAt: "2026-02-05T16:45:00Z"
  },
  {
    id: "prod-4",
    categoryId: "cat-2",
    categoryName: "Hóa mỹ phẩm",
    categorySlug: "hoa-my-pham",
    name: "Bộ Chăm Sóc Cá Nhân Thảo Mộc Nature Care Premium",
    slug: "bo-cham-soc-ca-nhan-thao-moc-nature-care-premium",
    sku: "TT-HMP-NC01",
    shortDescription: "Combo bao gồm dầu gội thảo dược, sữa tắm dưỡng ẩm thiên nhiên & dung dịch rửa tay diệt khuẩn an toàn.",
    description: `
      <h3>Bộ sản phẩm chăm sóc cá nhânNature Care</h3>
      <p>Chiết xuất hoàn toàn từ thảo mộc thiên nhiên (bồ kết, vỏ bưởi, gừng tươi, hoa hồng), không chứa paraben hay hóa chất độc hại.</p>
    `,
    brand: "Nature Care",
    origin: "Việt Nam",
    specification: "Dầu gội 500ml + Sữa tắm 500ml + Nước rửa tay 300ml",
    thumbnailUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img-4-1",
        productId: "prod-4",
        imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
        fileName: "nature-care.jpg",
        alt: "Bộ hóa mỹ phẩm Nature Care",
        sortOrder: 1,
        isPrimary: true
      }
    ],
    status: "published",
    featured: true,
    seoTitle: "Bộ Hóa Mỹ Phẩm Nature Care Thảo Mộc - Kiot Thiên Thanh",
    seoDescription: "Cung cấp sỉ & quà tặng bộ hóa mỹ phẩm thiên nhiên cao cấp cho khách sạn, spa, doanh nghiệp.",
    createdAt: "2026-01-22T14:15:00Z",
    updatedAt: "2026-02-08T10:00:00Z"
  },
  {
    id: "prod-5",
    categoryId: "cat-4",
    categoryName: "Thực phẩm nhà bếp",
    categorySlug: "thuc-pham-nha-bep",
    name: "Combo Dầu Ăn Thượng Hạng & Gia Vị Thiên Thanh Home",
    slug: "combo-dau-an-thuong-hang-gia-vi-thien-thanh-home",
    sku: "TT-TP-KIT01",
    shortDescription: "Set thực phẩm nhà bếp gồm dầu hướng dương nhập khẩu, hạt nêm ngưu bàng, nước mắm cốt nhĩ truyền thống.",
    description: `
      <h3>Set gia vị & dầu ăn chất lượng cao</h3>
      <p>Cung cấp giải pháp nhu yếu phẩm tiêu dùng chất lượng cao cho bếp ăn công nghiệp, suất ăn doanh nghiệp hoặc làm quà tặng phúc lợi cán bộ công nhân viên.</p>
    `,
    brand: "Thiên Thanh Home",
    origin: "Việt Nam",
    specification: "Dầu ăn 2L + Nước mắm 500ml + Hạt nêm 1kg",
    thumbnailUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img-5-1",
        productId: "prod-5",
        imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
        fileName: "kitchen-set.jpg",
        alt: "Combo thực phẩm nhà bếp",
        sortOrder: 1,
        isPrimary: true
      }
    ],
    status: "published",
    featured: false,
    seoTitle: "Combo Gia Vị Dầu Ăn Doanh Nghiệp - Kiot Thiên Thanh",
    seoDescription: "Cung cấp thực phẩm gia vị nhà bếp cho công ty, bếp ăn trường học, quà tặng công nhân viên.",
    createdAt: "2026-01-25T09:40:00Z",
    updatedAt: "2026-02-01T15:30:00Z"
  },
  {
    id: "prod-6",
    categoryId: "cat-1",
    categoryName: "Đồ uống",
    categorySlug: "do-uong",
    name: "Trà Đen Cổ Thụ Shan Tuyết Hà Giang Đóng Hộp Kim Loại",
    slug: "tra-den-co-thu-shan-tuyet-ha-giang",
    sku: "TT-DRINK-TEA02",
    shortDescription: "Trà Shan Tuyết cổ thụ trên 200 năm tuổi tại vùng cao Hà Giang, giữ trọn hương vị núi rừng tự nhiên thanh khiết.",
    description: `
      <h3>Trà Shan Tuyết Cổ Thụ Thượng Hạng</h3>
      <p>Nguồn trà sạch từ búp trà cổ thụ phủ tuyết trắng. Được thu hái thủ công bởi đồng bào vùng cao, sấy lạnh tiêu chuẩn xuất khẩu.</p>
    `,
    brand: "Thiên Thanh Heritage",
    origin: "Việt Nam (Hà Giang)",
    specification: "Hộp thiếc cao cấp 200g",
    thumbnailUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    images: [
      {
        id: "img-6-1",
        productId: "prod-6",
        imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
        fileName: "shan-tuyet.jpg",
        alt: "Trà Shan Tuyết Hà Giang",
        sortOrder: 1,
        isPrimary: true
      }
    ],
    status: "published",
    featured: false,
    createdAt: "2026-01-28T11:20:00Z",
    updatedAt: "2026-02-14T08:15:00Z"
  }
];
