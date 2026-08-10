"use client";

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/components/layout/LanguageProvider';

export default function AboutContent() {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="bg-slate-900 pt-24 pb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            {t('about.title1')} <span className="text-[var(--color-primary)]">{t('about.title2')}</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-12">
            <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
              <div className="relative w-full max-w-[400px] aspect-square">
                <Image 
                  src="/assets/Logo/1.png" 
                  alt="PTX Travel & Services Logo" 
                  fill 
                  className="object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500" 
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-heading font-bold text-[var(--color-primary)] mb-6 uppercase">{t('about.heading')}</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed font-medium text-[15px]">
                <p>
                  {t('about.p1')}
                </p>
                <p>
                  {t('about.p2')}
                </p>
                <p>
                  {t('about.p3')}
                </p>
              </div>
              
              <div className="mt-8 p-6 bg-blue-50/50 border-l-4 border-[var(--color-primary)] rounded-r-2xl">
                <h3 className="font-heading font-bold text-xl text-gray-900 mb-1">PTX TRAVEL & SERVICES</h3>
                <p className="italic text-[var(--color-primary)] font-semibold text-lg">{t('about.quote')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
