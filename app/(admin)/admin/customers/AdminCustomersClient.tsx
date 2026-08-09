'use client';

import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin } from 'lucide-react';

export default function AdminCustomersClient({ customers }: { customers: any[] }) {
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone && c.phone.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Khách Hàng (CRM)</h1>
          <p className="text-gray-500 text-sm mt-1">Dữ liệu tổng hợp từ các lượt Đặt Tour và Liên Hệ</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Tìm kiếm tên, SĐT, email..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <p className="text-sm text-gray-500">{filtered.length} khách hàng</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Khách hàng</th>
                <th className="px-6 py-4 font-medium">Thông tin liên lạc</th>
                <th className="px-6 py-4 font-medium">Khu vực</th>
                <th className="px-6 py-4 font-medium">Nguồn dữ liệu</th>
                <th className="px-6 py-4 font-medium text-right">Lần cuối cập nhật</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Chưa có khách hàng nào trong hệ thống.
                  </td>
                </tr>
              ) : filtered.map((c: any) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{c.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5 text-gray-600">
                      {c.phone ? (
                        <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" /> {c.phone}</div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-gray-400 italic"><Phone className="w-3.5 h-3.5" /> Trống</div>
                      )}
                      {c.email ? (
                        <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400" /> {c.email}</div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-gray-400 italic"><Mail className="w-3.5 h-3.5" /> Trống</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" /> {c.region}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs">
                      {c.sources.map((src: string, idx: number) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded w-fit">
                          {src}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-right">
                    {new Date(c.createdAt).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
