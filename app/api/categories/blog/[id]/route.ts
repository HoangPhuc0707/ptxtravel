import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const category = await prisma.blogCategory.findUnique({
      where: { id: params.id }
    });
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching category' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const slug = data.slug || data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

    const category = await prisma.blogCategory.update({
      where: { id: params.id },
      data: {
        name: data.name,
        slug: slug,
        description: data.description,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating category' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.blogCategory.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting category' }, { status: 500 });
  }
}
