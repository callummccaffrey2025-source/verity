import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Allow everything outside /api
  if (!pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Light input guard (GET ?q= only)
  const q = req.method === 'GET' ? (searchParams.get('q') ?? '') : '';
  if (q.length > 2000) {
    return NextResponse.json({ error: 'Query too long' }, { status: 400 });
  }

  return NextResponse.next();
}

// Run on all paths except Next internals & static assets
export const config = {
  matcher: ['/((?!_next|favicon.ico|manifest.webmanifest).*)'],
};
