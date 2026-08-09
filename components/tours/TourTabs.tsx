"use client";

import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface TourTabsProps {
  tour: any;
}

export function TourTabs({ tour }: TourTabsProps) {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'includes' | 'notes' | 'reviews'>('itinerary');

  const tabs = [
    { id: 'itinerary', label: 'Lịch Trình', icon: '🗓️' },
    { id: 'includes', label: 'Bao Gồm', icon: '✅' },
    { id: 'notes', label: 'Lưu Ý', icon: '📌' },
    { id: 'reviews', label: 'Đánh Giá', icon: '⭐' },
  ] as const;

  return (
    <div className="mt-8">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-200 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 py-4 px-6 font-semibold text-sm md:text-base whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="py-8">
        {/* Lịch Trình */}
        {activeTab === 'itinerary' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {tour.itinerary && tour.itinerary.length > 0 ? (
              <div className="relative border-l-[3px] border-gray-200 ml-2 md:ml-4 flex flex-col gap-8">
                {tour.itinerary.map((day: any, idx: number) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute w-4 h-4 rounded-full bg-[var(--color-primary)] border-2 border-white -left-[9.5px] top-1 shadow-sm"></div>
                    <div className="flex flex-wrap items-baseline gap-2 mb-2">
                      <span className="font-bold text-[var(--color-primary)] text-lg">{day.day}:</span>
                      <h4 className="font-bold text-gray-900 text-lg">{day.title}</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">{day.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Chưa có lịch trình chi tiết.</p>
            )}
          </div>
        )}

        {/* Bao Gồm */}
        {activeTab === 'includes' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50/50 rounded-xl p-5 border border-green-100 h-full">
                <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" /> Dịch Vụ Bao Gồm
                </h3>
                {tour.includes && tour.includes.length > 0 ? (
                  <ul className="space-y-3">
                    {tour.includes.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="bg-green-500 rounded-sm w-4 h-4 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">Đang cập nhật...</p>
                )}
              </div>

              <div className="bg-red-50/50 rounded-xl p-5 border border-red-100 h-full">
                <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Không Bao Gồm
                </h3>
                {tour.excludes && tour.excludes.length > 0 ? (
                  <ul className="space-y-3">
                    {tour.excludes.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="text-red-500 shrink-0 mt-0.5">
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">Đang cập nhật...</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Lưu Ý */}
        {activeTab === 'notes' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 prose max-w-none text-gray-600">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Lưu ý quan trọng</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Quý khách vui lòng mang theo giấy tờ tùy thân (CMND/CCCD/Hộ chiếu) bản chính.</li>
              <li>Trẻ em dưới 14 tuổi phải mang theo giấy khai sinh bản chính và đi cùng bố mẹ.</li>
              <li>Lịch trình có thể thay đổi tùy theo tình hình thời tiết và giao thông thực tế.</li>
              <li>Công ty sẽ không chịu trách nhiệm bồi thường nếu quý khách vi phạm pháp luật tại điểm đến.</li>
            </ul>
          </div>
        )}

        {/* Đánh Giá */}
        {activeTab === 'reviews' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-black text-amber-500">{tour.rating}</div>
              <div>
                <div className="flex items-center text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < Math.floor(tour.rating) ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-gray-500">Dựa trên {tour.reviews} đánh giá</div>
              </div>
            </div>
            
            {/* Fake Reviews for Demo */}
            <div className="space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="border-b border-gray-100 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-gray-900">Người dùng {i}</div>
                    <div className="text-xs text-gray-400">12/10/2025</div>
                  </div>
                  <div className="flex items-center text-amber-500 mb-2">
                     {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">Chuyến đi tuyệt vời, hướng dẫn viên nhiệt tình. Khách sạn sạch sẽ và đồ ăn ngon. Chắc chắn sẽ ủng hộ công ty trong những chuyến đi tiếp theo!</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
