"use client";

import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';

const contacts = [
  { name: 'Ms Vi', phone: '0862493572', display: '0862.49.35.72' },
  { name: 'Ms Yến', phone: '0949369874', display: '0949.369.874' },
  { name: 'Ms Trân', phone: '0978255471', display: '0978.255.471' },
];

export function FloatingContact() {
  const [activeMenu, setActiveMenu] = useState<'phone' | 'zalo' | null>(null);

  const toggleMenu = (menu: 'phone' | 'zalo') => {
    if (activeMenu === menu) setActiveMenu(null);
    else setActiveMenu(menu);
  };

  return (
    <div className="fixed left-6 bottom-24 z-50 flex flex-col items-center gap-6">
      
      {/* Phone Button Container */}
      <div className="relative">
        {/* Phone Menu */}
        <div className={`absolute left-full ml-4 bottom-0 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-gray-100 p-3 min-w-[220px] flex flex-col gap-2 transition-all origin-bottom-left ${activeMenu === 'phone' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-1">
            <span className="font-bold text-gray-800 text-sm">Gọi điện tư vấn</span>
            <button onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1"><X className="w-4 h-4"/></button>
          </div>
          {contacts.map(c => (
            <a key={c.phone} href={`tel:${c.phone}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-orange-50 text-[var(--color-primary)] transition-colors group">
              <span className="font-medium text-gray-600 group-hover:text-[var(--color-primary)]">{c.name}</span>
              <span className="font-bold">{c.display}</span>
            </a>
          ))}
        </div>

        <button 
          onClick={() => toggleMenu('phone')}
          className="relative flex items-center justify-center w-14 h-14 bg-[var(--color-primary)] rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--color-primary-light)] opacity-75 animate-ping"></span>
          <Phone className="relative text-white w-7 h-7" />
        </button>
      </div>

      {/* Zalo Button Container */}
      <div className="relative">
        {/* Zalo Menu */}
        <div className={`absolute left-full ml-4 bottom-0 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-gray-100 p-3 min-w-[220px] flex flex-col gap-2 transition-all origin-bottom-left ${activeMenu === 'zalo' ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
          <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-1">
            <span className="font-bold text-gray-800 text-sm">Chat Zalo</span>
            <button onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1"><X className="w-4 h-4"/></button>
          </div>
          {contacts.map(c => (
            <a key={c.phone} href={`https://zalo.me/${c.phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors group">
              <span className="font-medium text-gray-600 group-hover:text-blue-600">{c.name}</span>
              <span className="font-bold">{c.display}</span>
            </a>
          ))}
        </div>

        <button 
          onClick={() => toggleMenu('zalo')}
          className="relative flex items-center justify-center w-14 h-14 bg-blue-500 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <span className="absolute inline-flex w-full h-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>
          <span className="relative text-white font-bold text-xl tracking-tighter">Zalo</span>
        </button>
      </div>

    </div>
  );
}
