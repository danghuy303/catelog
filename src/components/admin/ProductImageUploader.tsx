import React, { useRef, useState } from 'react';
import { ProductImage } from '../../types/product';
import { uploadService } from '../../services/uploadService';
import { toast } from 'sonner';
import { Upload, X, Star, MoveLeft, MoveRight, Loader2, ImagePlus } from 'lucide-react';

interface ProductImageUploaderProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  productId?: string;
}

export const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({
  images,
  onChange,
  productId
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setIsUploading(true);
    const newImageList: ProductImage[] = [...images];

    for (const file of fileArray) {
      try {
        const uploadRes = await uploadService.uploadProductImage(file, productId);
        if (uploadRes.success) {
          const isFirst = newImageList.length === 0;
          newImageList.push({
            id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            productId: productId || 'temp',
            imageUrl: uploadRes.url,
            fileName: uploadRes.fileName,
            alt: uploadRes.fileName,
            sortOrder: newImageList.length + 1,
            isPrimary: isFirst
          });
        }
      } catch (err: any) {
        toast.error(`Tải ảnh ${file.name} thất bại: ${err.message}`);
      }
    }

    onChange(newImageList);
    setIsUploading(false);
    toast.success('Đã tải ảnh lên thành công!');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const setPrimaryImage = (id: string) => {
    const updated = images.map(img => ({
      ...img,
      isPrimary: img.id === id
    }));
    onChange(updated);
    toast.success('Đã đặt làm ảnh đại diện chính');
  };

  const removeImage = (id: string) => {
    const updated = images.filter(img => img.id !== id);
    // If we removed the primary image, set the first one as primary
    if (updated.length > 0 && !updated.some(img => img.isPrimary)) {
      updated[0].isPrimary = true;
    }
    onChange(updated);
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    const newImages = [...images];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newImages.length) return;

    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;

    // re-assign sortOrder
    newImages.forEach((img, i) => {
      img.sortOrder = i + 1;
    });

    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone Container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-brand-500 bg-brand-50/50 scale-[1.01]'
            : 'border-gray-300 hover:border-brand-400 bg-slate-50/50'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center shadow-sm">
            {isUploading ? (
              <Loader2 className="w-7 h-7 animate-spin" />
            ) : (
              <Upload className="w-7 h-7" />
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              Kéo & thả ảnh sản phẩm vào đây
            </p>
            <p className="text-xs text-gray-500 mt-1">
              hoặc <span className="text-brand-600 font-bold underline">Bấm để chọn file từ máy tính</span>
            </p>
          </div>
          <p className="text-[11px] text-gray-400">
            Hỗ trợ JPG, PNG, WEBP, AVIF • Tối đa 10MB / file
          </p>
        </div>
      </div>

      {/* Image Thumbnails Grid */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              DANH SÁCH ẢNH DỰ ÁN ({images.length})
            </span>
            <span className="text-xs text-gray-400">
              * Ảnh đầu tiên hoặc gắn thẻ ngôi sao làm Ảnh chính
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div
                key={img.id}
                className={`relative group bg-white rounded-2xl overflow-hidden border-2 transition-all shadow-sm ${
                  img.isPrimary ? 'border-brand-500 ring-2 ring-brand-200' : 'border-gray-200'
                }`}
              >
                {/* Thumbnail Image */}
                <div className="aspect-square relative bg-slate-100">
                  <img
                    src={img.imageUrl}
                    alt={img.alt || 'Ảnh sản phẩm'}
                    className="w-full h-full object-cover"
                  />

                  {/* Primary Badge */}
                  {img.isPrimary && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2 py-1 bg-brand-500 text-white text-[10px] font-extrabold uppercase rounded-md shadow-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" />
                        Ảnh chính
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay Controls */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                    <div className="flex items-center justify-between">
                      {!img.isPrimary && (
                        <button
                          type="button"
                          onClick={() => setPrimaryImage(img.id)}
                          className="p-1.5 bg-white/20 hover:bg-white text-white hover:text-brand-600 rounded-lg backdrop-blur-md text-xs font-bold transition-colors"
                          title="Set làm ảnh chính"
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors ml-auto"
                        title="Xóa ảnh"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveImage(index, 'left')}
                        className="p-1 bg-white/20 hover:bg-white text-white hover:text-gray-900 rounded disabled:opacity-30 transition-colors"
                      >
                        <MoveLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] text-white font-mono">{index + 1}</span>
                      <button
                        type="button"
                        disabled={index === images.length - 1}
                        onClick={() => moveImage(index, 'right')}
                        className="p-1 bg-white/20 hover:bg-white text-white hover:text-gray-900 rounded disabled:opacity-30 transition-colors"
                      >
                        <MoveRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-2 text-[11px] text-gray-600 truncate font-mono bg-slate-50 border-t border-gray-100">
                  {img.fileName}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
