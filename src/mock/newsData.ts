import { NewsArticle } from '../types/news';

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: "news-1",
    categoryId: "ncat-2",
    categoryName: "Xu hướng quà tặng",
    categorySlug: "xu-huong-qua-tang",
    title: "Xu Hướng Quà Tặng Doanh Nghiệp B2B Năm 2026: Ưu Tiên Tính Thiết Thực Và Bảo Vệ Môi Trường",
    slug: "xu-huong-qua-tang-doanh-nghiep-b2b-nam-2026",
    thumbnailUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Khám phá những xu hướng chọn lựa bộ quà tặng doanh nghiệp nổi bật nhất năm 2026, từ các vật phẩm xanh thân thiện môi trường đến hộp quà sức khỏe cao cấp.",
    content: `
      <h2>1. Sự chuyển dịch mạnh mẽ sang quà tặng xanh & bền vững</h2>
      <p>Năm 2026 ghi nhận sự bùng nổ của các sản phẩm quà tặng có nguồn gốc thiên nhiên, bao bì tái chế và khả năng tái sử dụng nhiều lần. Doanh nghiệp không chỉ tặng quà mà còn thể hiện cam kết trách nhiệm xã hội (ESG).</p>
      
      <h2>2. Hộp quà sức khỏe & nông sản thượng hạng</h2>
      <p>Thay vì các món quà trang trí đơn thuần, các bộ quà bao gồm hạt dinh dưỡng, trà cổ thụ, mứt quả dẻo và thực phẩm hữu cơ đang chiếm ưu thế vượt trội trong danh mục đặt hàng B2B.</p>
      
      <blockquote>
        "Mỗi bộ quà tặng thành công là một điểm chạm thương hiệu tinh tế, giúp kết nối chiều sâu cảm xúc giữa doanh nghiệp và đối tác." - Đại diện Kiot Thiên Thanh phát biểu.
      </blockquote>

      <h2>3. Tùy biến thương hiệu cá nhân hóa (Personalization)</h2>
      <p>In dập dán logo ép kim, khắc tên cá nhân người nhận trên từng sản phẩm đang trở thành tiêu chuẩn bắt buộc cho các gói quà tặng VIP.</p>
    `,
    author: "Ban Biên Tập Thiên Thanh",
    publishedAt: "2026-02-15T08:30:00Z",
    status: "published",
    seoTitle: "Xu Hướng Quà Tặng Doanh Nghiệp 2026 - Kiot Thiên Thanh",
    seoDescription: "Phân tích xu hướng quà tặng doanh nghiệp B2B năm 2026. Tư vấn chọn quà Tết, quà sự kiện tinh tế & hiệu quả.",
    createdAt: "2026-02-15T08:30:00Z",
    updatedAt: "2026-02-15T08:30:00Z"
  },
  {
    id: "news-2",
    categoryId: "ncat-5",
    categoryName: "Case Study",
    categorySlug: "case-study",
    title: "Case Study: Cung Ứng 5.000 Suất Quà Tri Ân Cán Bộ Công Nhân Viên Cho Tập Đoàn Công Nghệ Tại Hà Nội",
    slug: "case-study-cung-ung-5000-suat-qua-tri-an-tap-doan-cong-nghe",
    thumbnailUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Hành trình Kiot Thiên Thanh hoàn thành đơn hàng 5.000 set quà nhu yếu phẩm & gia dụng chỉ trong 7 ngày làm việc với tiêu chuẩn kiểm soát chất lượng 100%.",
    content: `
      <h2>Thách thức của dự án</h2>
      <p>Khách hàng là tập đoàn công nghệ quy mô hơn 5.000 nhân sự tại Hà Nội và các chi nhánh phía Bắc, yêu cầu giao đúng tiến độ trước dịp kỷ niệm 15 năm thành lập công ty.</p>
      
      <h2>Giải pháp từ Kiot Thiên Thanh</h2>
      <p>Chúng tôi đã huy động toàn bộ hạ tầng kho vận tại Techno Park Gia Lâm và Hải Phòng, phân loại sản phẩm theo quy trình tự động hóa và đóng gói chuyên nghiệp.</p>
      
      <h2>Kết quả đạt được</h2>
      <ul>
        <li>100% sản phẩm giao đúng hẹn trước 48h so với hạn cam kết.</li>
        <li>Tỷ lệ phản hồi hài lòng về chất lượng đóng gói đạt 99.4%.</li>
        <li>Ký kết hợp đồng cung ứng dài hạn cho các năm tiếp theo.</li>
      </ul>
    `,
    author: "Phòng Dự Án B2B",
    publishedAt: "2026-02-10T10:00:00Z",
    status: "published",
    seoTitle: "Case Study Cung Ứng Quà Tặng Doanh Nghiệp - Kiot Thiên Thanh",
    seoDescription: "Tham khảo dự án cung ứng 5.000 suất quà tri ấn cán bộ công nhân viên thành công của Thiên Thanh Việt Nam.",
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-02-10T10:00:00Z"
  },
  {
    id: "news-3",
    categoryId: "ncat-1",
    categoryName: "Văn hóa doanh nghiệp",
    categorySlug: "van-hoa-doanh-nghiep",
    title: "Thiên Thanh Việt Nam Tổ Chức Hoạt Động Teambuilding Kỷ Niệm 10 Năm Phát Triển Bền Vững",
    slug: "thien-thanh-viet-nam-to-chuc-teambuilding-10-nam",
    thumbnailUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Nhìn lại chuỗi hoạt động gắn kết tập thể nhân viên Thiên Thanh tại Hải Phòng với chủ đề 'Bứt Phá Giới Hạn - Kiến Tạo Tương Lai'.",
    content: `
      <p>Kỷ niệm 10 năm thành lập, toàn thể đại gia đình CÔNG TY TNHH TM THIÊN THANH VIỆT NAM đã có chuyến hành trình teambuilding tràn đầy năng lượng và niềm vui.</p>
    `,
    author: "Ban Nhân Sự",
    publishedAt: "2026-01-20T14:00:00Z",
    status: "published",
    createdAt: "2026-01-20T14:00:00Z",
    updatedAt: "2026-01-20T14:00:00Z"
  }
];
