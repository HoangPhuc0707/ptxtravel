import React from 'react';
import { Metadata } from 'next';
import { AdminSubscribersClient } from './AdminSubscribersClient';

export const metadata: Metadata = {
  title: 'Quản lý Đăng ký nhận tin | PTX Admin',
};

export default function AdminSubscribersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Đăng ký nhận tin</h1>
        <p className="text-slate-500 mt-1">
          Quản lý danh sách khách hàng đăng ký nhận bản tin khuyến mãi.
        </p>
      </div>

      <AdminSubscribersClient />
    </div>
  );
}
