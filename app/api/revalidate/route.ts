// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export const runtime = 'nodejs';          // ensure Node runtime, not Edge
export const dynamic = 'force-dynamic';   // avoid any caching of this handler

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.REVALIDATION_SECRET;
    if (!secret) {
      return NextResponse.json({ ok: false, error: 'Missing secret' }, { status: 500 });
    }

    const body = await req.json().catch(() => ({} as any));
    if (body.secret !== secret) {
      return NextResponse.json({ ok: false, error: 'Invalid secret' }, { status: 401 });
    }

    const { path, tag } = body;

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ ok: true, revalidated: 'path', path });
    }
    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ ok: true, revalidated: 'tag', tag });
    }

    return NextResponse.json({ ok: false, error: 'Provide path or tag' }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'Error' }, { status: 500 });
  }
}
