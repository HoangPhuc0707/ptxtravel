import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    await prisma.booking.deleteMany();
    await prisma.tour.deleteMany();
    await prisma.blog.deleteMany();
    return NextResponse.json({ success: true, message: 'Database wiped successfully! You can now delete this file.' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
