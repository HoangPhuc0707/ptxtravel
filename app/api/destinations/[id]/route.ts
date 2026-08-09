import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const destination = await prisma.destination.findUnique({
      where: { id: params.id }
    });
    
    if (!destination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }
    
    return NextResponse.json(destination);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching destination' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    
    // Auto generate slug from name if not provided
    const slug = data.slug || data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

    const destination = await prisma.destination.update({
      where: { id: params.id },
      data: {
        name: data.name,
        slug: slug,
        image: data.image,
        description: data.description,
        isFeatured: data.isFeatured,
      }
    });

    return NextResponse.json(destination);
  } catch (error) {
    console.error('Error updating destination:', error);
    return NextResponse.json({ error: 'Error updating destination' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.destination.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    console.error('Error deleting destination:', error);
    return NextResponse.json({ error: 'Error deleting destination' }, { status: 500 });
  }
}
