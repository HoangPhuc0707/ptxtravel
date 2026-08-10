"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface Destination {
  id: string;
  name: string;
  slug: string;
  image: string;
  isFeatured: boolean;
  description?: string;
}

export function DestinationsGrid() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await fetch('/api/destinations');
        if (res.ok) {
          const data = await res.json();
          // Filter to only show featured destinations, or max 4
          const featured = data.filter((d: Destination) => d.isFeatured).slice(0, 4);
          if (featured.length > 0) {
            setDestinations(featured);
          } else {
            setDestinations(data.slice(0, 4));
          }
        }
      } catch (error) {
        console.error("Failed to fetch destinations", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  // Class assignment logic to maintain the masonry layout
  const getClassForIndex = (idx: number) => {
    if (idx === 0) return 'md:col-span-2 md:row-span-2 h-[400px]';
    if (idx === 1) return 'md:col-span-1 md:row-span-1 h-[192px]';
    if (idx === 2) return 'md:col-span-1 md:row-span-1 h-[192px]';
    if (idx === 3) return 'md:col-span-2 md:row-span-1 h-[192px]';
    return 'md:col-span-1 md:row-span-1 h-[192px]';
  };

  if (isLoading) {
    return (
      <section className="section bg-[var(--color-bg-soft)] min-h-[500px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  if (destinations.length === 0) return null;

  return (
    <section className="section bg-[var(--color-bg-soft)]">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          label="Khám phá"
          title={<>Điểm Đến <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--color-primary)_0%,#0083FF_100%)]">Đáng Khám Phá</span></>}
          subtitle="Cùng PTX Travel khám phá những điểm đến mới lạ, nổi bật và những trải nghiệm đặc biệt cho hành trình của bạn."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-2xl overflow-hidden group ${getClassForIndex(idx)}`}
            >
              <Link href={`/destinations/${dest.slug}`} className="block w-full h-full relative rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-2xl md:text-3xl font-heading font-black text-white mb-2 tracking-wide drop-shadow-md">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-gray-300 line-clamp-2 mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {dest.description || `Hành trình trải nghiệm tuyệt vời đang chờ đón bạn.`}
                    </p>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-white bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full hover:bg-[var(--color-primary)] transition-colors">
                        Khám phá ngay <span className="text-lg leading-none">&rarr;</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
