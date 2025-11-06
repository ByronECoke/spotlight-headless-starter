import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    vercelEnv: process.env.VERCEL_ENV,             // 'development' | 'preview' | 'production'
    nextRuntime: process.env.NEXT_RUNTIME,         // 'nodejs' if our flag works
    hasSecret: !!process.env.REVALIDATION_SECRET,  // should be true
    hasDirectus: !!process.env.DIRECTUS_URL
  });
}