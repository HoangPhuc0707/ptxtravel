import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    const destinationsWithCount = await Promise.all(
      destinations.map(async (dest) => {
        const tourCount = await prisma.tour.count({
          where: { 
            destination: dest.name,
            isHidden: false
          }
        });
        return { ...dest, tourCount };
      })
    );

    return NextResponse.json(destinationsWithCount);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json({ error: 'Error fetching destinations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const generateSlug = (text: string) => {
      return text.toString().toLowerCase()
        .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
        .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
        .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
        .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
        .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
        .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
        .replace(/đ/gi, 'd')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    };

    const slug = data.slug || generateSlug(data.name);

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
  } catch (error: any) {
    console.error('Error creating destination:', error);
    return NextResponse.json({ error: 'Error creating destination', details: error.message }, { status: 500 });
  }
}
