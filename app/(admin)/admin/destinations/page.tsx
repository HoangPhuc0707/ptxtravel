import React from 'react';
import { Metadata } from 'next';
import { AdminDestinationsClient } from './AdminDestinationsClient';

export const metadata: Metadata = {
  title: 'Quản lý Điểm đến | PTX Admin',
};

export default function AdminDestinationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Quản lý Điểm đến</h1>
        <p className="text-slate-500 mt-1">
          Thêm, sửa, xóa các điểm đến du lịch nổi bật của PTX Travel.
        </p>
      </div>

      <AdminDestinationsClient />
    </div>
  );
}
