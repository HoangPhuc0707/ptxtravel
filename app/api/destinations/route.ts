import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json({ error: 'Error fetching destinations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Auto generate slug from name if not provided
    const slug = data.slug || data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

    const destination = await prisma.destination.create({
      data: {
        name: data.name,
        slug: slug,
        image: data.image,
        description: data.description || '',
        isFeatured: data.isFeatured || false,
      }
    });

    return NextResponse.json(destination, { status: 201 });
  } catch (error) {
    console.error('Error creating destination:', error);
    return NextResponse.json({ error: 'Error creating destination' }, { status: 500 });
  }
}
