"use client";

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Quote, 
  Undo, 
  Redo,
  Image as ImageIcon
} from 'lucide-react';

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PRESET_COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#cccccc', '#efefef', '#f3f3f3', '#ffffff',
  '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff',
  '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3',
  '#d9d2e9', '#ead1dc', '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9',
  '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd', '#cc4125', '#e06666', '#f6b26b', '#ffd966',
  '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0', '#a61c00', '#cc0000',
  '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79',
  '#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#1155cc', '#0b5394',
  '#351c75', '#741b47', '#5b0f00', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d',
  '#1c4587', '#073763', '#20124d', '#4c1130'
];

const MenuBar = ({ editor }: { editor: any }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded-md ${editor.isActive('bold') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
        title="In đậm"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded-md ${editor.isActive('italic') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
        title="In nghiêng"
      >
        <Italic className="w-4 h-4" />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1 my-auto"></div>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-md ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
        title="Tiêu đề 2"
      >
        <Heading1 className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded-md ${editor.isActive('heading', { level: 3 }) ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
        title="Tiêu đề 3"
      >
        <Heading2 className="w-4 h-4" />
      </button>
      
      <div className="w-px h-6 bg-gray-300 mx-1 my-auto"></div>
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-md ${editor.isActive('bulletList') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
        title="Danh sách"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-md ${editor.isActive('orderedList') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
        title="Danh sách số"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded-md ${editor.isActive('blockquote') ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-200 text-gray-700'}`}
        title="Trích dẫn"
      >
        <Quote className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1 my-auto"></div>

      <button
        type="button"
        onClick={() => {
          const url = window.prompt('Nhập URL hình ảnh:');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="p-2 rounded-md hover:bg-gray-200 text-gray-700"
        title="Chèn hình ảnh"
      >
        <ImageIcon className="w-4 h-4" />
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="p-2 rounded-md hover:bg-gray-200 flex items-center justify-center transition-colors"
          title="Màu chữ"
        >
          <div 
            className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
            style={{ backgroundColor: editor.getAttributes('textStyle').color || '#000000' }}
          ></div>
        </button>

        {showColorPicker && (
          <div className="absolute top-full left-0 mt-1 p-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 grid grid-cols-8 gap-1 w-64">
            {PRESET_COLORS.map(color => (
              <button
                key={color}
                type="button"
                className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => {
                  editor.chain().focus().setColor(color).run();
                  setShowColorPicker(false);
                }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-gray-300 mx-1 my-auto"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded-md hover:bg-gray-200 text-gray-700 disabled:opacity-50"
        title="Hoàn tác"
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded-md hover:bg-gray-200 text-gray-700 disabled:opacity-50"
        title="Làm lại"
      >
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function TiptapEditor({ value, onChange, placeholder }: TiptapEditorProps) {
  const [mounted, setMounted] = useState(false);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TextStyle,
      Color,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none max-w-none p-4 min-h-[200px] bg-white rounded-b-lg border-x border-b border-gray-200 tiptap-editor-content',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Handle updates from parent
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-[200px] border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">Loading editor...</div>;
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:border-transparent transition-shadow">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
