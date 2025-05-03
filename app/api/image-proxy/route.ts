// app/api/image-proxy/route.ts
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get('src');

  if (!src) {
    return new Response('Missing src param', { status: 400 });
  }

  try {
    const imageRes = await fetch(src);
    const contentType = imageRes.headers.get('content-type') || 'image/webp';
    const buffer = await imageRes.arrayBuffer();

    return new Response(Buffer.from(buffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new Response('Failed to fetch image', { status: 500 });
  }
}
