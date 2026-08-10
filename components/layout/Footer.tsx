"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Music, Send, ArrowUp, Phone } from 'lucide-react';
import { useLanguage } from '@/components/layout/LanguageProvider';

export function Footer() {
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-slate-900 text-white pt-12 pb-6" aria-label="Footer">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="flex flex-col items-center text-center">
              <div className="w-full flex justify-center mb-4">
                <Link href="/" className="inline-flex items-center justify-center bg-white rounded-2xl p-2 shadow-lg group overflow-hidden">
                  <Image
                    src="/assets/Logo/1.png"
                    alt="PTX Travel"
                    width={280}
                    height={100}
                    className="h-24 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                </Link>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {t('footer.description')}
              </p>
              <div className="flex items-center justify-center gap-3 w-full">
                <a href="https://www.facebook.com/PTXTravel" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[var(--color-primary)] hover:text-white transition-colors" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[var(--color-primary)] hover:text-white transition-colors" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[var(--color-primary)] hover:text-white transition-colors" aria-label="YouTube">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[var(--color-primary)] hover:text-white transition-colors" aria-label="TikTok">
                  <Music className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Tour Links */}
            <div>
              <h4 className="font-heading font-bold text-xl mb-4">{t('footer.tours')}</h4>
              <nav className="flex flex-col gap-3 text-slate-300 text-sm" aria-label="Tour links">
                <Link href="/tours" className="hover:text-white hover:translate-x-1 transition-all">{t('nav.tours')}</Link>
                <Link href="/tours?category=Trong%20nước" className="hover:text-white hover:translate-x-1 transition-all">Tour trong nước</Link>
                <Link href="/tours?category=Quốc%20tế" className="hover:text-white hover:translate-x-1 transition-all">Tour quốc tế</Link>
                <Link href="/tours?category=Độc%20lạ" className="hover:text-white hover:translate-x-1 transition-all">Tour độc lạ</Link>
              </nav>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-heading font-bold text-xl mb-4">{t('footer.services')}</h4>
              <nav className="flex flex-col gap-3 text-slate-300 text-sm" aria-label="Service links">
                <Link href="/about#services" className="hover:text-white hover:translate-x-1 transition-all">Đặt vé máy bay</Link>
                <Link href="/about#services" className="hover:text-white hover:translate-x-1 transition-all">Đặt khách sạn</Link>
                <Link href="/about#services" className="hover:text-white hover:translate-x-1 transition-all">Xin visa</Link>
                <Link href="/about#services" className="hover:text-white hover:translate-x-1 transition-all">Thuê xe</Link>
                <Link href="/about#services" className="hover:text-white hover:translate-x-1 transition-all">Bảo hiểm</Link>
                <Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all">Tư vấn Tour</Link>
              </nav>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-heading font-bold text-xl mb-4">{t('footer.newsletterTitle')}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {t('footer.newsletterDesc')}
              </p>
              <form
                className="relative flex items-center"
                aria-label="Đăng ký newsletter"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const input = e.currentTarget.querySelector('input');
                  if (input && input.value) {
                    const email = input.value;
                    try {
                      const res = await fetch('/api/subscribe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email })
                      });
                      if (res.ok) {
                        input.value = '';
                        input.placeholder = '✓ Đã đăng ký thành công!';
                        setTimeout(() => { if (input) input.placeholder = 'Nhập email của bạn...'; }, 3000);
                      }
                    } catch (error) {
                      console.error('Subscribe error', error);
                    }
                  }
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Nhập email của bạn..."
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-full py-3 px-5 pr-12 focus:outline-none focus:border-[var(--color-primary)] text-sm"
                  aria-label="Email"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white hover:bg-[#0083FF] transition-colors"
                  aria-label="Đăng ký"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-8 text-xs text-slate-500 flex flex-col gap-2">
                <p>GCNKD: 2600000XXX | Sở KHĐT TP.HCM</p>
                <p>GPKD Lữ Hành Quốc Tế: 01-GPLHQT-XXX</p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} PTX Travel. {t('footer.copyright')} Designed by Nguyễn Hoàng Phúc.</p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <Link href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
              <Link href="#" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
              <Link href="#" className="hover:text-white transition-colors">Chính sách hủy Tour</Link>
            </div>
          </div>
        </div>
      </footer>


      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed right-4 bottom-4 md:right-8 md:bottom-8 w-12 h-12 md:w-[48px] md:h-[48px] rounded-full bg-[linear-gradient(135deg,#0057B8,#0083FF)] text-white flex items-center justify-center shadow-lg transition-all z-40 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'
          } hover:shadow-xl hover:-translate-y-1`}
        aria-label="Lên đầu trang"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </>
  );
}
