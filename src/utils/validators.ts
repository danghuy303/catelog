import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ và tên (ít nhất 2 ký tự)'),
  address: z.string().optional(),
  phone: z.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ (ví dụ: 0378339999)'),
  email: z.string().email('Địa chỉ email không hợp lệ'),
  subject: z.string().optional(),
  message: z.string().min(5, 'Nội dung cần có ít nhất 5 ký tự'),
  honeypot: z.string().optional(),
});

export const productFormSchema = z.object({
  name: z.string().min(3, 'Tên sản phẩm bắt buộc (tối thiểu 3 ký tự)'),
  slug: z.string().min(3, 'Slug bắt buộc'),
  categoryId: z.string().min(1, 'Vui lòng chọn danh mục sản phẩm'),
  sku: z.string().min(2, 'Mã SKU bắt buộc'),
  brand: z.string().optional(),
  origin: z.string().optional(),
  specification: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  thumbnailUrl: z.string().min(1, 'Vui lòng cung cấp ít nhất 1 ảnh đại diện sản phẩm'),
  status: z.enum(['published', 'draft']),
  featured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const newsFormSchema = z.object({
  title: z.string().min(5, 'Tiêu đề bài viết bắt buộc (ít nhất 5 ký tự)'),
  slug: z.string().min(3, 'Slug bắt buộc'),
  categoryId: z.string().min(1, 'Vui lòng chọn danh mục tin tức'),
  shortDescription: z.string().min(10, 'Mô tả ngắn bắt buộc (ít nhất 10 ký tự)'),
  content: z.string().min(20, 'Nội dung bài viết bắt buộc'),
  thumbnailUrl: z.string().min(1, 'Vui lòng chọn ảnh đại diện bài viết'),
  author: z.string().min(2, 'Tác giả bắt buộc'),
  status: z.enum(['published', 'draft']),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const loginFormSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  rememberMe: z.boolean().optional(),
});
