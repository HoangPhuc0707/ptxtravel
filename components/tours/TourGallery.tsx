"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface TourGalleryProps {
  mainImage: string;
  images: string[];
}

export function TourGallery({ mainImage, images }: TourGalleryProps) {
  // Gộp ảnh chính và thư viện ảnh
  const galleryImages = [mainImage, ...(images || [])].filter(Boolean);
  if (galleryImages.length === 0) galleryImages.push('/assets/tour_halong.png');
  
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="flex flex-col gap-1.5 mb-10 bg-white rounded-2xl overflow-hidden">
      {/* Main Image */}
      <div className="relative w-full aspect-video overflow-hidden cursor-zoom-in group">
        <Image
          src={galleryImages[activeIdx]}
          alt={`Gallery main image`}
          fill
          className="object-cover transition-transform duration-400 ease-[ease] group-hover:scale-[1.03]"
        />
      </div>

      {/* Thumbnails Row */}
      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-1.5 mt-1.5">
          {galleryImages.slice(0, 4).map((src, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveIdx(idx)}
              className={`relative aspect-[4/3] rounded-md overflow-hidden cursor-pointer border-[3px] transition-colors duration-200 group ${activeIdx === idx ? 'border-[var(--color-primary)]' : 'border-transparent'}`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-300 ease-[ease] group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
