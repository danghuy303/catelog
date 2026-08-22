import React, { useEffect, useState } from 'react';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { Button } from '../../components/common/Button';
import { catalogueService } from '../../services/catalogueService';
import { CatalogueItem } from '../../types/catalogue';
import { formatDate } from '../../utils/formatters';
import { FileText, Download, ExternalLink, Calendar, HardDrive } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const CataloguePage: React.FC = () => {
  const [catalogues, setCatalogues] = useState<CatalogueItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCatalogues() {
      const data = await catalogueService.getCatalogues();
      setCatalogues(data);
      setLoading(false);
    }
    loadCatalogues();
  }, []);

  return (
    <>
      <Helmet>
        <title>Catalogue Doanh Nghiệp - Kiot Thiên Thanh</title>
        <meta name="description" content="Tải Catalogue sản phẩm tiêu dùng, rượu vang, bánh kẹo, hóa mỹ phẩm & giải pháp quà tặng doanh nghiệp Kiot Thiên Thanh." />
      </Helmet>

      <div className="bg-slate-50 py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Catalogue' }]} />
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
            Catalogue Sản Phẩm & Quà Tặng Doanh Nghiệp
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
            Tải bản mềm PDF hoặc xem trực tuyến danh mục sản phẩm mới nhất của Thiên Thanh Việt Nam.
          </p>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-64 bg-slate-100 rounded-3xl animate-pulse" />
              <div className="h-64 bg-slate-100 rounded-3xl animate-pulse" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {catalogues.map((item) => (
                <div
                  key={item.id}
                  className="bg-surfaceBg p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col sm:flex-row gap-6 items-start"
                >
                  {/* Thumbnail Cover */}
                  <div className="w-full sm:w-40 aspect-[3/4] bg-slate-200 rounded-2xl overflow-hidden shrink-0 shadow-md">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 flex flex-col justify-between h-full space-y-4">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-brand-500" />
                          Cập nhật: {formatDate(item.updatedAt)}
                        </span>
                        {item.fileSize && (
                          <span className="flex items-center gap-1 font-mono">
                            <HardDrive className="w-3.5 h-3.5 text-gray-400" />
                            {item.fileSize}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="primary"
                          rightIcon={<ExternalLink className="w-4 h-4" />}
                          className="w-full text-xs font-bold"
                        >
                          Xem Catalogue
                        </Button>
                      </a>

                      <a
                        href={item.fileUrl}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          rightIcon={<Download className="w-4 h-4" />}
                          className="w-full text-xs font-bold"
                        >
                          Tải PDF
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
};
