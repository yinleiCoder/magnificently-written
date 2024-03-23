import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

// next-video vercel blob
// https://vercel.com/yinlei/~/stores/blob/store_qkkh860lHBovJAqg/guides
export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  const blob = await put(filename!, request.body!, {
    access: 'public',
  });

  return NextResponse.json(blob);
}