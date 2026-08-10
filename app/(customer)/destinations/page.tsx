import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Khám Phá Điểm Đến',
  description: 'Khám phá các điểm đến du lịch tuyệt vời nhất cùng PTX Travel.',
};

export const dynamic = 'force-dynamic';

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-slate-900 pt-32 pb-24 text-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://res.cloudinary.com/dhhsef0so/image/upload/v1786326340/ptxtravel_tours/ikb9wsei13tehqdlcns6.jpg" 
            alt="Hero Background" 
            fill
            priority
            className="object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-heading font-black text-5xl md:text-6xl mb-6 tracking-tight drop-shadow-lg leading-tight">
            Những Điểm Đến <br className="hidden md:block" />
            <span className="text-[var(--color-primary)]">Không Thể Bỏ Lỡ</span>
          </h1>
          <p className="text-slate-200 max-w-2xl mx-auto text-lg md:text-xl font-medium drop-shadow">
            Khám phá những điểm đến nổi bật, mới lạ và đầy cảm hứng cùng PTX Travel. Mỗi hành trình là một câu chuyện đáng nhớ.
          </p>
        </div>
      </div>
      
      {/* Destinations Grid */}
      <div className="bg-[var(--color-bg-soft)] py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm tracking-wider uppercase mb-2">
                <MapPin className="w-5 h-5" />
                Tất cả điểm đến
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-gray-900">
                Lựa chọn hành trình của bạn
              </h2>
            </div>
            <p className="text-gray-500 font-medium hidden md:block">
              Hiển thị {destinations.length} điểm đến
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <Link 
                href={`/destinations/${dest.slug}`} 
                key={dest.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col h-full"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {dest.isFeatured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      🔥 Nổi bật
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-gray-500 leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {dest.description || 'Khám phá ngay điểm đến hấp dẫn này cùng những trải nghiệm tuyệt vời nhất.'}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[var(--color-primary)] font-semibold text-sm group-hover:underline">
                      Xem chi tiết
                    </span>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                      &rarr;
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
