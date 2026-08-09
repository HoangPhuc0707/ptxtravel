import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();

    const updatedContact = await prisma.contact.update({
      where: { id },
      data: { status: body.status },
    });

    return NextResponse.json(updatedContact);
  } catch (error: any) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
