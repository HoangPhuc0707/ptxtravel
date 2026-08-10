"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Phạm Minh Đức',
    role: 'Khách du lịch',
    content: 'Gia đình mình vừa có chuyến du lịch Đà Nẵng - Hội An rất đáng nhớ cùng PTX Travel. Bạn HDV cực kỳ có tâm, chăm sóc chu đáo từ bữa ăn đến giấc ngủ. Chắc chắn năm sau cả nhà sẽ lại chọn PTX!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Hoàng Ngọc Ánh',
    role: 'Khách hàng doanh nghiệp',
    content: 'Công ty mình chọn PTX để tổ chức team building cho hơn 50 nhân viên. Phải nói là khâu tổ chức rất chuyên nghiệp, các trò chơi gắn kết hay và lịch trình vui vẻ, không bị quá mệt.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Trần Thanh Tùng',
    role: 'Khách du lịch',
    content: 'Mình đi tour Thái Lan 5 ngày 4 đêm. Giá tour rất hợp lý mà khách sạn lại ở ngay trung tâm. Mọi thủ tục đều được các bạn nhân viên hỗ trợ nhiệt tình từ A đến Z. Sẽ giới thiệu cho bạn bè!',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader 
          label="Đánh giá"
          title={<>Cảm nhận của Khách hàng về <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--color-primary)_0%,#0083FF_100%)]">PTX Travel</span></>}
          subtitle="Hơn 15,000+ khách hàng đã tin tưởng và đồng hành cùng chúng tôi trên những chuyến đi."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[var(--color-bg-soft)] p-8 rounded-2xl border border-[var(--color-border)] relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-6xl text-[var(--color-primary)] opacity-10 font-heading leading-none">
                "
              </div>
              
              <div className="flex items-center gap-1 text-amber-500 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-600 mb-8 italic relative z-10">"{review.content}"</p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center text-white font-bold text-lg">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <span className="text-sm text-gray-500">{review.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
