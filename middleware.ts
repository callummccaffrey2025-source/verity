import { NextRequest, NextResponse } from 'next/server';

// Routes that require prefs set
const protectedPrefixes = ['/ground', '/dashboard', '/news', '/mps', '/bills'];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Allow the onboarding and public assets to pass
  if (path.startsWith('/onboarding') || path.startsWith('/personalise')) {
    return NextResponse.next();
  }

  const hasPrefs = req.cookies.get('v_prefs')?.value;

  if (!hasPrefs && protectedPrefixes.some((p) => path.startsWith(p))) {
    const url = req.nextUrl.clone();
    url.pathname = '/onboarding';
    url.searchParams.set('next', path);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Match everything except Next internals, API, and common static files
export const config = {
  matcher: ['/((?!_next|api|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|txt)|favicon\\.ico|manifest\\.webmanifest).*)'],
};
