import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Canonical URLs omit trailing slashes (matches site canonical and sitemap).
 * Next.js serves the homepage at `/`; strip trailing slashes on all other paths.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.length > 1 && pathname.endsWith('/')) {
    const normalizedPath = pathname.replace(/\/+$/, '') || '/';
    const url = new URL(normalizedPath + request.nextUrl.search, request.url);
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons/|images/|sitemap|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|txt)$).*)',
  ],
};
