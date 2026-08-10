import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { MapPin, ChevronRight, Image as ImageIcon } from 'lucide-react';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const dest = await prisma.destination.findUnique({ where: { slug } });
  if (!dest) return { title: 'Điểm đến không tồn tại' };
  return {
    title: `${dest.name} | Khám phá cùng PTX Travel`,
    description: dest.description || `Khám phá điểm đến ${dest.name} cùng PTX Travel`,
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const dest = await prisma.destination.findUnique({ where: { slug } });

  if (!dest) notFound();

  let images: string[] = [];
  try { images = dest.images ? JSON.parse(dest.images) : []; } catch(e) {}
  
  let highlights: string[] = [];
  try { highlights = dest.highlights ? JSON.parse(dest.highlights) : []; } catch(e) {}

  return (
    <div className="bg-[var(--color-bg-soft)] min-h-screen">
      <article>
        {/* Hero */}
        <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden bg-slate-900">
          {dest.image && (
            <Image
              src={dest.image}
              alt={dest.name}
              fill
              className="object-cover opacity-70"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Breadcrumb */}
          <div className="absolute top-24 left-0 right-0 container mx-auto px-4 z-10">
            <nav className="flex items-center gap-2 text-sm text-white/80 font-medium">
              <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white/60 line-clamp-1 max-w-xs">{dest.name}</span>
            </nav>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12 max-w-5xl z-10">
            <h1 className="font-heading font-black text-4xl md:text-6xl text-white leading-tight drop-shadow-xl mb-4">
              Khám phá {dest.name}
            </h1>
            {dest.description && (
              <p className="text-xl text-white/90 max-w-2xl leading-relaxed drop-shadow-md border-l-4 border-[var(--color-primary)] pl-4">
                {dest.description}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 max-w-6xl py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
            
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div
                className="tiptap-content prose prose-lg max-w-none text-gray-700 leading-loose
                  prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mt-10 prose-headings:mb-4
                  prose-h2:text-3xl prose-h2:border-b-2 prose-h2:border-blue-100 prose-h2:pb-3 prose-h2:inline-block
                  prose-p:mb-6 prose-p:leading-[1.9] text-[17px]
                  prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                  prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-10
                  prose-ul:my-6 prose-li:mb-2
                  prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: dest.content || '<p class="italic text-gray-500">Nội dung chi tiết đang được cập nhật...</p>' }}
              />

              {/* Image Album */}
              {images.length > 0 && (
                <div className="mt-16 pt-10 border-t border-gray-100">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <ImageIcon className="w-8 h-8 text-[var(--color-primary)]" />
                    Thư viện ảnh {dest.name}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-100">
                        <Image src={img} alt={`${dest.name} ${idx + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar (Highlights) */}
            <div className="lg:col-span-4 sticky top-28">
              <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100">
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                  Điểm nhấn đặc sắc
                </h3>
                
                {highlights.length > 0 ? (
                  <ul className="space-y-4">
                    {highlights.map((hl, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-700">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-blue-50 text-[var(--color-primary)] flex items-center justify-center text-xs font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{hl}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">Đang cập nhật điểm nhấn...</p>
                )}

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <Link href={`/tours`} className="block w-full py-4 px-6 bg-[var(--color-primary)] hover:bg-blue-600 text-white text-center font-semibold rounded-2xl transition-colors shadow-lg shadow-blue-500/30">
                    Xem các Tour PTX Travel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
