"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/components/layout/LanguageProvider';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  const NAV_LINKS = [
    { href: '/about', label: t('nav.about') },
    { href: '/tours', label: t('nav.tours') },
    { href: '/destinations', label: t('nav.destinations') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/contact', label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <Image 
              src="/assets/Logo/2.png" 
              alt="PTX Travel" 
              width={64} 
              height={64} 
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              quality={100}
              priority
            />
            <div className="flex items-center gap-1.5">
              <span className="text-xl md:text-2xl font-black text-red-600 tracking-wider">PTX</span>
              <span className="text-xl md:text-2xl font-bold text-blue-700 tracking-wider">TRAVEL</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-2 lg:gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-semibold text-[15px] transition-colors ${
                      isActive
                        ? 'text-[#0052CC]'
                        : 'text-[#6B7280] hover:text-[#0052CC]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center p-1 mr-2 text-xs font-bold text-gray-500 bg-[#F4F6F8] rounded-full">
              <button 
                onClick={() => setLang('vi')} 
                className={`px-3 py-1.5 rounded-full transition-all ${lang === 'vi' ? 'bg-[#0052CC] text-white shadow-sm' : 'hover:text-gray-700'}`}
              >
                VI
              </button>
              <button 
                onClick={() => setLang('en')} 
                className={`px-3 py-1.5 rounded-full transition-all ${lang === 'en' ? 'bg-[#0052CC] text-white shadow-sm' : 'hover:text-gray-700'}`}
              >
                EN
              </button>
            </div>

            <Button variant="outline" size="default" className="py-2 px-4 text-sm" asChild>
              <a href="tel:0839837891">
                <Phone className="w-4 h-4" /> {t('nav.hotline')}
              </a>
            </Button>
            <Button variant="red" size="default" className="py-2 px-4 text-sm" asChild>
              <Link href="/booking">{t('nav.bookNow')}</Link>
            </Button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-[80px] px-6 flex flex-col h-[100dvh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg font-bold py-4 border-b border-gray-100 ${
                    isActive ? 'text-[var(--color-primary)]' : 'text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          
          {/* Language Switcher Mobile */}
          <div className="flex items-center justify-center gap-4 py-4 mt-4 border-t border-gray-100">
            <button 
              onClick={() => { setLang('vi'); toggleMobileMenu(); }} 
              className={`font-semibold text-[15px] ${lang === 'vi' ? 'text-[var(--color-primary)]' : 'text-gray-500'}`}
            >
              Tiếng Việt (VI)
            </button>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => { setLang('en'); toggleMobileMenu(); }} 
              className={`font-semibold text-[15px] ${lang === 'en' ? 'text-[var(--color-primary)]' : 'text-gray-500'}`}
            >
              English (EN)
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-3 pb-8">
            <Button variant="outline" className="w-full py-6" asChild>
              <a href="tel:0839837891">
                <Phone className="w-5 h-5 mr-2" /> {t('nav.hotline')}
              </a>
            </Button>
            <Button variant="red" className="w-full py-6" onClick={toggleMobileMenu} asChild>
              <Link href="/booking">{t('nav.bookNow')}</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
