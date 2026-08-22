import { SiteSettings } from '../types/setting';
import { COMPANY_INFO } from '../constants/company';

export const MOCK_SITE_SETTINGS: SiteSettings = {
  companyName: COMPANY_INFO.name,
  taxCode: COMPANY_INFO.taxCode,
  hotline: COMPANY_INFO.hotlineFormatted,
  email: COMPANY_INFO.email,
  address: COMPANY_INFO.address,
  branch1: COMPANY_INFO.branches[0].address,
  branch2: COMPANY_INFO.branches[1].address,
  workingHoursWeekdays: COMPANY_INFO.workingHours.weekdays,
  workingHoursSaturday: COMPANY_INFO.workingHours.saturday,
  socialFacebook: COMPANY_INFO.socials.facebook,
  socialZalo: COMPANY_INFO.socials.zalo,
  socialYoutube: COMPANY_INFO.socials.youtube,
  socialTiktok: COMPANY_INFO.socials.tiktok,
  siteTitle: "Kiot Thiên Thanh - Giải Pháp Quà Tặng & Sản Phẩm Tiêu Dùng Doanh Nghiệp",
  metaDescription: "CÔNG TY TNHH TM THIÊN THANH VIỆT NAM - Chuyên cung cấp sản phẩm tiêu dùng, đồ uống, hóa mỹ phẩm, bánh mứt kẹo, đồ gia dụng và giải pháp quà tặng doanh nghiệp.",
  logoUrl: "/logo-thien-thanh.svg",
  footerLogoUrl: "/logo-thien-thanh-white.svg",
  defaultOgImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
  updatedAt: new Date().toISOString()
};
