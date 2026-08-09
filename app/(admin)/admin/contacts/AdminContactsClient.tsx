'use client';

import React, { useState } from 'react';
import { Search, Mail, MessageSquare, CheckCircle, Reply } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminContactsClient({ contacts: initialContacts }: { contacts: any[] }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = initialContacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.subject && c.subject.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Liên Hệ</h1>
          <p className="text-gray-500 text-sm mt-1">Quản lý tin nhắn phản hồi, góp ý từ khách hàng</p>
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
              placeholder="Tìm kiếm người gửi, email..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <p className="text-sm text-gray-500">{filtered.length} tin nhắn</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Người gửi</th>
                <th className="px-6 py-4 font-medium w-1/3">Nội dung liên hệ</th>
                <th className="px-6 py-4 font-medium">Ngày gửi</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Chưa có tin nhắn liên hệ nào phù hợp.
                  </td>
                </tr>
              ) : filtered.map((contact: any) => (
                <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{contact.name}</div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                      <Mail className="w-3.5 h-3.5" /> {contact.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 mb-1">{contact.subject || 'Không có tiêu đề'}</div>
                    <div className="text-gray-600 flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                      <p className="whitespace-pre-wrap">{contact.message}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(contact.createdAt).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs font-medium rounded-md ${
                      contact.status === 'NEW' ? 'bg-amber-100 text-amber-700' :
                      contact.status === 'READ' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {contact.status === 'NEW' ? 'Mới' : contact.status === 'READ' ? 'Đã đọc' : 'Đã phản hồi'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {contact.status === 'NEW' && (
                        <button
                          onClick={() => updateStatus(contact.id, 'READ')}
                          disabled={updating === contact.id}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md flex items-center gap-1.5 transition-colors text-xs font-medium disabled:opacity-50"
                          title="Đánh dấu đã đọc"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Đã đọc
                        </button>
                      )}
                      {contact.status !== 'REPLIED' && (
                        <button
                          onClick={() => updateStatus(contact.id, 'REPLIED')}
                          disabled={updating === contact.id}
                          className="px-3 py-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-md flex items-center gap-1.5 transition-colors text-xs font-medium disabled:opacity-50"
                          title="Đánh dấu đã phản hồi"
                        >
                          <Reply className="w-3.5 h-3.5" /> Đã phản hồi
                        </button>
                      )}
                    </div>
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
