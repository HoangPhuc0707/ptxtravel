import React from 'react';
import { Metadata } from 'next';
import { AdminCategoriesClient } from './AdminCategoriesClient';

export const metadata: Metadata = {
  title: 'Quản lý Danh mục | PTX Admin',
};

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Quản lý Danh mục</h1>
        <p className="text-slate-500 mt-1">
          Quản lý các danh mục phân loại Tour và Bài viết (Blog).
        </p>
      </div>

      <AdminCategoriesClient />
    </div>
  );
}
