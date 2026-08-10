import React from 'react';
import { getTours } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Clock, Star, Check } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

// Component imports
import { TourGallery } from '@/components/tours/TourGallery';
import { TourTabs } from '@/components/tours/TourTabs';
import { TourSidebar } from '@/components/tours/TourSidebar';
import { TourCard } from '@/components/tours/TourCard';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const tours = await getTours();
  const tour = tours.find(t => t.slug === slug);
  
  if (!tour) return { title: 'Tour không tồn tại' };
  
  return {
    title: tour.title,
    description: tour.description || `Khám phá tour ${tour.title} cùng PTX Travel.`,
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const tours = await getTours();
  const tour = tours.find(t => t.slug === slug);

  if (!tour) {
    notFound();
  }

  // Fallback data for highlights if empty
  const defaultHighlights = [
    "Chinh phục đỉnh Fansipan 3.143m",
    "Ruộng bậc thang mùa lúa vàng tháng 9",
    "Trekking bản H'Mông, Dao Đỏ",
    "Chợ tình Sa Pa",
    "Tắm thuốc người Dao"
  ];
  
  const highlights = tour.highlights && tour.highlights.length > 0 
    ? tour.highlights 
    : defaultHighlights;

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* Page Hero */}
      <div className="pt-24 pb-[60px] text-white relative h-[380px] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image src={tour.image || '/assets/tour_halong.png'} alt={tour.title} fill className="object-cover object-[center_30%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0057b8]/55 to-black/65"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 w-full">
          <div className="flex flex-col gap-4 max-w-4xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
              <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
              <span>›</span>
              <Link href="/tours" className="hover:text-white transition-colors">Tour Du Lịch</Link>
              <span>›</span>
              <span className="text-white truncate font-bold">{tour.title}</span>
            </div>
            
            <h1 className="font-heading font-extrabold text-[clamp(28px,4vw,48px)] leading-tight mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
              {tour.title}
            </h1>
            
              <div className="flex flex-wrap items-center gap-3 mt-2 text-white/90 font-medium text-sm md:text-base">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-rose-500" />
                  <span>{tour.location || 'Việt Nam'}</span>
                </div>
                <div className="text-white/50">|</div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-gray-300" />
                  <span>{tour.duration}</span>
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 mt-16 md:mt-20 mb-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Main Content (Left Column) */}
          <div className="w-full lg:w-[65%]">
            
            {/* Gallery */}
            <TourGallery mainImage={tour.image} images={tour.images || []} />

            {/* Highlights */}
            <div className="bg-[#f0f7ff] border border-[#0057b8]/15 rounded-2xl p-6 md:p-8 mb-8">
              <h3 className="font-heading font-bold text-[#0057b8] text-[18px] mb-4">
                ✨ Điểm Nổi Bật
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 m-0">
                {highlights.map((highlight: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-[14px] text-gray-700">
                    <span className="text-[#0057b8] font-bold shrink-0 mt-0.5">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Tabs */}
            <TourTabs tour={tour} />

          </div>

          {/* Sidebar (Right Column) */}
          <div className="w-full lg:w-[35%] relative">
             <TourSidebar tour={tour} />
          </div>

        </div>
      </div>
      
      {/* Related Tours */}
      <div className="container mx-auto px-4 md:px-6 py-20 border-t border-gray-100 mt-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-10 bg-[var(--color-primary)]"></div>
            <span className="text-sm font-bold tracking-widest text-[var(--color-primary)] uppercase">Có thể bạn thích</span>
            <div className="h-px w-10 bg-[var(--color-primary)]"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-gray-900">
            Tour <span className="text-[var(--color-primary)]">Liên Quan</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours
            .filter((t: any) => t.id !== tour.id)
            .slice(0, 3)
            .map((relatedTour: any) => (
              <div key={relatedTour.id}>
                {/* Fallback import below inside the layout */}
                <TourCard tour={relatedTour} />
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}
