import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import { uploadService } from '../../services/uploadService';
import { toast } from 'sonner';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return <div className="p-4 border rounded-xl bg-slate-50 text-xs text-gray-400">Đang khởi tạo trình soạn thảo...</div>;
  }

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        try {
          const res = await uploadService.uploadNewsImage(file);
          if (res.url) {
            editor.chain().focus().setImage({ src: res.url }).run();
            toast.success('Đã chèn ảnh vào bài viết');
          }
        } catch {
          toast.error('Chèn ảnh thất bại');
        }
      }
    };
    input.click();
  };

  const addLink = () => {
    const url = window.prompt('Nhập đường dẫn liên kết (URL):');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-gray-200 text-gray-700">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${editor.isActive('bold') ? 'bg-brand-500 text-white hover:bg-brand-600' : ''}`}
          title="In đậm"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${editor.isActive('italic') ? 'bg-brand-500 text-white hover:bg-brand-600' : ''}`}
          title="In nghiêng"
        >
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-brand-500 text-white hover:bg-brand-600' : ''}`}
          title="Tiêu đề H2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-brand-500 text-white hover:bg-brand-600' : ''}`}
          title="Tiêu đề H3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${editor.isActive('bulletList') ? 'bg-brand-500 text-white hover:bg-brand-600' : ''}`}
          title="Danh sách dấu chấm"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${editor.isActive('orderedList') ? 'bg-brand-500 text-white hover:bg-brand-600' : ''}`}
          title="Danh sách số"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${editor.isActive('blockquote') ? 'bg-brand-500 text-white hover:bg-brand-600' : ''}`}
          title="Trích dẫn"
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={addLink}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          title="Chèn liên kết"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-brand-600"
          title="Chèn hình ảnh bài viết"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          title="Hoàn tác"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          title="Làm lại"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="p-4 min-h-[300px] max-h-[600px] overflow-y-auto font-sans focus:outline-none">
        <EditorContent editor={editor} className="prose-custom min-h-[250px] focus:outline-none" />
      </div>
    </div>
  );
};
