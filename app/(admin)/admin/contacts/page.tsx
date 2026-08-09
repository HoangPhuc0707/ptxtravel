export const dynamic = 'force-dynamic';
import React from 'react';
import prisma from '@/lib/prisma';
import AdminContactsClient from './AdminContactsClient';

export default async function AdminContactsPage() {
  let contacts: any[] = [];
  try {
    contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
  }

  return <AdminContactsClient contacts={contacts} />;
}
