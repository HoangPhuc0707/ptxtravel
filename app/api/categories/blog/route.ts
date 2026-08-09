import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const slug = data.slug || data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

    const category = await prisma.blogCategory.create({
      data: {
        name: data.name,
        slug: slug,
        description: data.description || '',
      }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating blog category:', error);
    return NextResponse.json({ error: 'Error creating category' }, { status: 500 });
  }
}
