"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'vi' | 'en';

const dictionary = {
  vi: {
    // Navbar
    'nav.about': 'Về chúng tôi',
    'nav.tours': 'Tất cả Tour',
    'nav.destinations': 'Điểm đến',
    'nav.blog': 'Blog',
    'nav.contact': 'Liên hệ',
    'nav.hotline': 'Hotline',
    'nav.bookNow': 'Đặt tour ngay',
    
    // Footer
    'footer.description': 'Chuyên cung cấp tour du lịch trong nước và quốc tế, mang đến dịch vụ chuyên nghiệp, tận tâm và những trải nghiệm đáng nhớ.',
    'footer.aboutUs': 'Về chúng tôi',
    'footer.home': 'Trang chủ',
    'footer.aboutPTX': 'Về PTX Travel',
    'footer.tours': 'Các Tour du lịch',
    'footer.news': 'Tin tức & Blog',
    'footer.quickLinks': 'Liên kết nhanh',
    'footer.popularDestinations': 'Điểm đến phổ biến',
    'footer.newsletter': 'Đăng ký nhận tin',
    'footer.privacy': 'Chính sách bảo mật',
    'footer.terms': 'Điều khoản dịch vụ',
    'footer.contact': 'Liên hệ',
    'footer.address': '15 Lê Quang Chiểu, Phường Phú Thọ Hoà, TP.HCM',
    
    'footer.services': 'Dịch vụ',
    'footer.newsletterTitle': 'Đăng ký nhận ưu đãi',
    'footer.newsletterDesc': 'Nhận ngay ưu đãi 10% cho tour đầu tiên khi đăng ký newsletter của PTX Travel.',
    'footer.copyright': 'Bản quyền thuộc về PTX Travel & Services.',
    
    // About Page
    'about.title1': 'Về',
    'about.title2': 'PTX Travel',
    'about.subtitle': 'Hành trình hơn 15 năm kinh nghiệm mang đến những trải nghiệm du lịch tuyệt vời nhất cho người Việt.',
    'about.heading': 'Giới thiệu Công ty PTX Travel & Services',
    'about.p1': 'PTX Travel & Services, tiền thân là Công ty Du lịch Phú Thọ Xanh, được thành lập từ năm 2005. Trải qua nhiều giai đoạn phát triển và điều chỉnh chức năng hoạt động để phù hợp với xu hướng của thị trường du lịch, PTX từng bước hoàn thiện hệ thống dịch vụ theo hướng linh hoạt, chuyên nghiệp và lấy khách hàng làm trung tâm.',
    'about.p2': 'PTX phục vụ đa dạng nhu cầu của khách lẻ, khách đoàn, khách nội địa và quốc tế, với các dịch vụ chính gồm tổ chức tour du lịch, cho thuê xe, vé máy bay, hỗ trợ visa, đặt phòng khách sạn và các dịch vụ du lịch liên quan.',
    'about.p3': 'Kế thừa tinh thần của thương hiệu Phú Thọ Xanh, PTX hướng đến sự tin cậy, an toàn, tận tâm và gia tăng giá trị cho khách hàng, đồng thời không ngừng đổi mới để đồng hành cùng khách hàng trên mỗi hành trình.',
    'about.quote': '"Đồng hành cùng bạn trên mỗi hành trình."',
  },
  en: {
    // Navbar
    'nav.about': 'About Us',
    'nav.tours': 'All Tours',
    'nav.destinations': 'Destinations',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.hotline': 'Hotline',
    'nav.bookNow': 'Book Tour Now',
    
    // Footer
    'footer.description': 'Reputable travel company in HCMC. Specializing in domestic and international tours with professional services and competitive prices.',
    'footer.aboutUs': 'About Us',
    'footer.home': 'Home',
    'footer.aboutPTX': 'About PTX Travel',
    'footer.tours': 'Our Tours',
    'footer.news': 'News & Blog',
    'footer.quickLinks': 'Quick Links',
    'footer.popularDestinations': 'Popular Destinations',
    'footer.newsletter': 'Newsletter',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact Us',
    'footer.address': '15 Le Quang Chieu, Phu Tho Hoa Ward, HCMC',
    'footer.services': 'Services',
    'footer.newsletterTitle': 'Sign up for offers',
    'footer.newsletterDesc': 'Get 10% off your first tour by subscribing to the PTX Travel newsletter.',
    'footer.copyright': 'All rights reserved.',
    
    // About Page
    'about.title1': 'About',
    'about.title2': 'PTX Travel',
    'about.subtitle': 'A journey of over 15 years of experience bringing the best travel experiences to our customers.',
    'about.heading': 'Introduction to PTX Travel & Services Company',
    'about.p1': 'PTX Travel & Services, formerly Phu Tho Xanh Travel Company, was established in 2005. Going through many stages of development and adjusting operational functions to suit the trends of the tourism market, PTX has gradually improved its service system in a flexible, professional, and customer-centric direction.',
    'about.p2': 'PTX serves diverse needs of retail, group, domestic, and international customers, with main services including organizing tours, car rental, flight tickets, visa support, hotel bookings, and related travel services.',
    'about.p3': 'Inheriting the spirit of the Phu Tho Xanh brand, PTX aims for reliability, safety, dedication, and adding value to customers, while constantly innovating to accompany customers on every journey.',
    'about.quote': '"Accompanying you on every journey."',
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof dictionary['vi']) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'vi',
  setLang: () => {},
  t: (key) => dictionary['vi'][key] || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('vi');

  useEffect(() => {
    // Load preference from local storage on mount
    const savedLang = localStorage.getItem('ptx_lang') as Language;
    if (savedLang === 'vi' || savedLang === 'en') {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('ptx_lang', newLang);
  };

  const t = (key: keyof typeof dictionary['vi']) => {
    return dictionary[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
