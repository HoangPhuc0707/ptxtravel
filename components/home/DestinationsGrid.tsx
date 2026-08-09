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
          label="Điểm Đến Hot"
          title={<>Tới Những Chân Trời <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--color-primary)_0%,#0083FF_100%)]">Mới Lạ</span></>}
          subtitle="Khám phá các điểm đến được yêu thích nhất trong và ngoài nước."
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
              <Link href={`/tours?destination=${dest.name}`} className="block w-full h-full">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-heading font-bold mb-1">{dest.name}</h3>
                  {/* Ideally fetch tour counts dynamically later */}
                  <span className="text-sm text-gray-300">Khám phá ngay</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
