import { ContactSubmission } from '../types/contact';

export const MOCK_CONTACTS: ContactSubmission[] = [
  {
    id: "ct-101",
    name: "Nguyễn Văn Hùng",
    address: "Tòa nhà Keangnam Landmark 72, Nam Từ Liêm, Hà Nội",
    phone: "0988123456",
    email: "hung.nguyen@techcorp.vn",
    subject: "Tư vấn báo giá 200 bộ quà tặng Tết cho cán bộ quản lý",
    message: "Chào Thiên Thanh, công ty mình đang tìm hiểu bộ quà tặng rượu vang và bánh kẹo nhập khẩu số lượng 200 suất. Nhờ tư vấn và gửi catalogue kèm bảng chiết khấu giúp mình.",
    status: "new",
    createdAt: "2026-02-21T09:15:00Z"
  },
  {
    id: "ct-102",
    name: "Phạm Thị Minh Anh",
    address: "KCN VSIP Hải Phòng, Thủy Nguyên, Hải Phòng",
    phone: "0912345678",
    email: "minhanh.hr@shipbuilding.com",
    subject: "Yêu cầu hợp tác cung ứng thực phẩm gia dụng sỉ",
    message: "Bên mình cần nhập sỉ số lượng lớn bộ nồi inox và đồ gia dụng làm quà tặng công nhân dịp 30/4. Vui lòng liên hệ lại qua điện thoại.",
    status: "processing",
    createdAt: "2026-02-20T14:30:00Z"
  },
  {
    id: "ct-103",
    name: "Trần Quốc Tuấn",
    address: "Chợ Bần, Mỹ Hào, Hưng Yên",
    phone: "0904112233",
    email: "tuantran@gmail.com",
    subject: "Hỏi thông tin đại lý phân phối hóa mỹ phẩm",
    message: "Muốn làm đại lý phân phối các dòng hóa mỹ phẩm Nature Care tại địa bàn Hưng Yên.",
    status: "completed",
    createdAt: "2026-02-18T11:00:00Z"
  }
];
