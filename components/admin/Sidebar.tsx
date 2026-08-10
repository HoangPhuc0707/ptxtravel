"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Map, ShoppingBag, FileText, Users, Settings, LogOut, MessageSquare, Mail, ChevronDown, ChevronRight, FolderTree } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { 
    name: 'Danh Mục', 
    icon: FolderTree,
    subItems: [
      { name: 'Danh mục Tour', href: '/admin/categories' },
      { name: 'Quản lý Điểm đến', href: '/admin/destinations' }
    ]
  },
  { name: 'Quản lý Tour', href: '/admin/tours', icon: Map },
  { name: 'Bài viết (Blog)', href: '/admin/blogs', icon: FileText },
  { name: 'Quản lý Booking', href: '/admin/bookings', icon: ShoppingBag },
  { name: 'Liên hệ', href: '/admin/contacts', icon: MessageSquare },
  { name: 'Đăng ký nhận tin', href: '/admin/subscribers', icon: Mail },
  { name: 'Khách hàng', href: '/admin/customers', icon: Users },
  { name: 'Cài đặt', href: '/admin/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  // Auto open the menu if a sub-item is active on initial load
  useEffect(() => {
    const newOpenMenus = { ...openMenus };
    let hasChanges = false;
    
    menuItems.forEach(item => {
      if (item.subItems) {
        const isActive = item.subItems.some(sub => pathname.startsWith(sub.href));
        if (isActive && !newOpenMenus[item.name]) {
          newOpenMenus[item.name] = true;
          hasChanges = true;
        }
      }
    });

    if (hasChanges) {
      setOpenMenus(newOpenMenus);
    }
  }, [pathname]);

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <aside className="w-60 h-screen bg-blue-950 text-blue-100 flex flex-col fixed left-0 top-0 border-r border-blue-900 z-50">
      <div className="h-16 flex items-center justify-center border-b border-blue-900 shrink-0 bg-white">
        <Link href="/admin" className="flex items-center gap-3 group px-4 py-2">
          <Image 
            src="/assets/Logo/1.png" 
            alt="PTX Admin" 
            width={150} 
            height={40} 
            className="h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="font-extrabold text-xl tracking-tight whitespace-nowrap uppercase">
            <span className="text-red-600">PTX</span> <span className="text-blue-600">Travel</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-4 px-2">Menu chính</div>
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            
            if (item.subItems) {
              const isActive = item.subItems.some(sub => pathname.startsWith(sub.href));
              const isOpen = openMenus[item.name];
              
              return (
                <div key={item.name} className="flex flex-col gap-1">
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-900 text-white' 
                        : 'hover:bg-blue-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  {isOpen && (
                    <div className="flex flex-col gap-1 pl-11 pr-2">
                      {item.subItems.map(sub => {
                        const isSubActive = pathname.startsWith(sub.href);
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                              isSubActive
                                ? 'bg-[var(--color-primary)] text-white'
                                : 'text-blue-300 hover:text-white hover:bg-blue-900'
                            }`}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href || '');
            
            return (
              <Link 
                key={item.href} 
                href={item.href!}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[var(--color-primary)] text-white' 
                    : 'hover:bg-blue-900 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-blue-900">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-blue-300 hover:bg-blue-900 hover:text-red-400 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}
