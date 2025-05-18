'use server';

import { IEvent } from '@/types/allTypes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function uploadJsonData(data: IEvent) {
  try {
    if (!Array.isArray(data)) {
      return { message: 'Invalid JSON format. Must be an array.' };
    }

    // const events = data.map((item: any) => ({
    //   title: item.title,
    //   slug: item.slug,
    //   image: item.image,
    //   createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
    //   updatedAt: item.updatedAt ? new Date(item.updatedAt) : new Date(),
    // }));

    await prisma.event.createMany({ data });

    return { message: 'Event data uploaded successfully.' };
  } catch (err: any) {
    console.error('Upload error:', err);
    throw new Error('Failed to upload data: ' + err.message);
  }
}
