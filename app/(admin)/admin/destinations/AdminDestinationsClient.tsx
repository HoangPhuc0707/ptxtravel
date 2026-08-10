"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface Destination {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string | null;
  isFeatured: boolean;
  createdAt: string;
}

export function AdminDestinationsClient() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    image: '',
    description: '',
    isFeatured: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await fetch('/api/destinations');
      if (res.ok) {
        const data = await res.json();
        setDestinations(data);
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (dest?: Destination) => {
    if (dest) {
      setEditingDest(dest);
      setFormData({
        name: dest.name,
        slug: dest.slug,
        image: dest.image,
        description: dest.description || '',
        isFeatured: dest.isFeatured
      });
    } else {
      setEditingDest(null);
      setFormData({
        name: '',
        slug: '',
        image: '',
        description: '',
        isFeatured: false
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDest(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingDest ? `/api/destinations/${editingDest.id}` : '/api/destinations';
      const method = editingDest ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchDestinations();
        closeModal();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Có lỗi xảy ra khi lưu! ${errorData.details || errorData.error || ''}`);
      }
    } catch (error) {
      console.error('Error saving destination:', error);
      alert('Có lỗi xảy ra!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa điểm đến này?')) return;

    try {
      const res = await fetch(`/api/destinations/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setDestinations(destinations.filter(d => d.id !== id));
      } else {
        alert('Có lỗi xảy ra khi xóa!');
      }
    } catch (error) {
      console.error('Error deleting destination:', error);
      alert('Có lỗi xảy ra!');
    }
  };

  // Simple image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    const uploadData = new FormData();
    uploadData.append('file', file);
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      
      if (res.ok) {
        const data = await res.json();
        setFormData({ ...formData, image: data.url });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Lỗi upload ảnh!');
    }
  };

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm điểm đến..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          />
        </div>
        
        <button 
          onClick={() => openModal()}
          className="bg-[var(--color-primary)] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm Điểm Đến</span>
        </button>
      </div>

      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
              <th className="py-3 px-6 font-medium">Hình ảnh</th>
              <th className="py-3 px-6 font-medium">Tên điểm đến</th>
              <th className="py-3 px-6 font-medium">Đường dẫn (Slug)</th>
              <th className="py-3 px-6 font-medium">Nổi bật</th>
              <th className="py-3 px-6 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)] mb-2" />
                    <p>Đang tải dữ liệu...</p>
                  </div>
                </td>
              </tr>
            ) : filteredDestinations.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-slate-500">
                  <p>Không tìm thấy điểm đến nào</p>
                </td>
              </tr>
            ) : (
              filteredDestinations.map((dest) => (
                <tr key={dest.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-6">
                    <div className="w-16 h-12 relative rounded overflow-hidden bg-slate-100 border border-slate-200">
                      {dest.image ? (
                        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-slate-400">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-6 font-medium text-slate-800">{dest.name}</td>
                  <td className="py-3 px-6 text-slate-500">{dest.slug}</td>
                  <td className="py-3 px-6">
                    {dest.isFeatured ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Nổi bật</span>
                    ) : (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">Bình thường</span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openModal(dest)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(dest.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">
                {editingDest ? 'Cập nhật Điểm đến' : 'Thêm Điểm đến mới'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tên điểm đến *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    placeholder="VD: Hạ Long"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Đường dẫn (Slug)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-slate-50"
                    placeholder="Tự động tạo nếu để trống"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hình ảnh *</label>
                <div className="flex gap-4 items-start">
                  <div className="w-32 h-32 relative rounded-lg border border-slate-200 overflow-hidden bg-slate-50 shrink-0">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-slate-300">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      placeholder="URL hình ảnh"
                    />
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      />
                      <button type="button" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                        Hoặc tải ảnh lên
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] min-h-[100px]"
                  placeholder="Nhập mô tả ngắn gọn về điểm đến..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                  className="w-4 h-4 text-[var(--color-primary)] rounded border-slate-300"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700">
                  Điểm đến nổi bật (Sẽ hiển thị trên trang chủ)
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingDest ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
