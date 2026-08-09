"use client";

import React from 'react';
import Link from 'next/link';
import { MapPin, Info, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface TourSidebarProps {
  tour: any;
}

export function TourSidebar({ tour }: TourSidebarProps) {
  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price;
    if (price >= 1000000) {
      return (price / 1000000).toLocaleString('vi-VN') + ' Tr';
    }
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden sticky top-24 border border-gray-100">
      {/* Header Price Section */}
      <div className="bg-[var(--color-primary)] text-white p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
        
        <p className="text-white/80 text-sm font-medium mb-1">Giá từ / người</p>
        
        {tour.originalPrice && tour.originalPrice > tour.price && (
          <div className="flex flex-col items-center justify-center mb-1">
            <div className="flex items-center gap-2">
              <span className="text-white/60 line-through text-sm">{formatPrice(tour.originalPrice)}</span>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                GIẢM {Math.round((1 - tour.price / tour.originalPrice) * 100)}%
              </span>
            </div>
          </div>
        )}
        
        <div className="flex items-start justify-center gap-1 mb-2">
          <span className="text-xl font-bold mt-1 text-yellow-300">₫</span>
          <strong className="text-5xl font-black tracking-tight text-yellow-300 drop-shadow-md">{formatPrice(tour.price)}</strong>
        </div>
        <div className="flex justify-center text-yellow-400">
          {[...Array(Math.floor(tour.rating || 5))].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Info Details */}
      <div className="p-6 md:p-8">
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-4 h-4" /> Điểm đến
            </div>
            <div className="font-semibold text-gray-900">{tour.location || 'Nhiều điểm'}</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button variant="red" size="lg" className="w-full h-14 rounded-2xl text-base shadow-lg shadow-red-500/30" asChild>
            <Link href={`/booking?tour=${tour.slug}`}>
              ⚡ Đặt Tour Ngay
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full h-14 rounded-2xl text-[var(--color-primary)] border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white" asChild>
            <a href="tel:02103625678">
              💬 Tư Vấn Miễn Phí
            </a>
          </Button>
        </div>

        {/* Guarantee */}
        <div className="mt-6 flex flex-col items-center justify-center text-center gap-1">
          <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium bg-amber-50 px-3 py-1.5 rounded-full">
            <Info className="w-3.5 h-3.5" />
            Đảm bảo hoàn tiền 100% nếu không hài lòng
          </div>
          <p className="text-xs text-gray-500 mt-2">
            📞 Hỗ trợ 24/7: <strong className="text-[var(--color-primary)]">0210 362 5678</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
