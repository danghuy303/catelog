import React from 'react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { ContactForm } from '../../components/contact/ContactForm';
import { CompanyInfo } from '../../components/contact/CompanyInfo';
import { Helmet } from 'react-helmet-async';

export const ContactPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Liên Hệ Với Thiên Thanh - CÔNG TY TNHH TM THIÊN THANH VIỆT NAM</title>
        <meta name="description" content="Liên hệ Kiot Thiên Thanh để được tư vấn báo giá quà tặng doanh nghiệp B2B, sản phẩm tiêu dùng, rượu vang, gia dụng và bánh kẹo." />
      </Helmet>

      <div className="bg-slate-50 py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Liên hệ' }]} />
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
            Liên hệ với Thiên Thanh
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
            Bạn có thắc mắc hoặc cần tư vấn báo giá sỉ? Hãy để lại thông tin, đội ngũ Thiên Thanh sẽ liên hệ với bạn ngay lập tức.
          </p>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Interactive Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right: Verified Corporate Info */}
            <div className="lg:col-span-5">
              <CompanyInfo />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
