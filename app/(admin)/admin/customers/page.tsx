export const dynamic = 'force-dynamic';
import React from 'react';
import prisma from '@/lib/prisma';
import AdminCustomersClient from './AdminCustomersClient';

export default async function AdminCustomersPage() {
  let unifiedCustomers: any[] = [];
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: { tour: { select: { location: true } } }
    });
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const customersMap = new Map<string, any>();

    // Process bookings
    for (const b of bookings) {
      const key = b.customerEmail || b.customerPhone; // Use email or phone as unique identifier
      if (!key) continue;

      if (!customersMap.has(key)) {
        customersMap.set(key, {
          id: `cust_${key}`,
          name: b.customerName,
          email: b.customerEmail || '',
          phone: b.customerPhone,
          region: b.tour?.location || 'Chưa cập nhật',
          sources: [`Đặt tour: ${b.tourName}`],
          createdAt: b.createdAt
        });
      } else {
        const existing = customersMap.get(key);
        existing.sources.push(`Đặt tour: ${b.tourName}`);
        if (!existing.phone && b.customerPhone) existing.phone = b.customerPhone;
      }
    }

    // Process contacts
    for (const c of contacts) {
      const key = c.email;
      if (!key) continue;

      if (!customersMap.has(key)) {
        customersMap.set(key, {
          id: `cust_${key}`,
          name: c.name,
          email: c.email,
          phone: '',
          region: 'Chưa cập nhật',
          sources: ['Liên hệ / Phản hồi'],
          createdAt: c.createdAt
        });
      } else {
        const existing = customersMap.get(key);
        if (!existing.sources.includes('Liên hệ / Phản hồi')) {
          existing.sources.push('Liên hệ / Phản hồi');
        }
      }
    }

    unifiedCustomers = Array.from(customersMap.values());
    unifiedCustomers.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  } catch (error) {
    console.error('Error fetching customers:', error);
  }

  return <AdminCustomersClient customers={unifiedCustomers} />;
}
