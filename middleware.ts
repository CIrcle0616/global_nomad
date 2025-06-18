import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/profile/info', '/profile/reservation', '/profile/activities', '/profile/schedule', '/login', '/signup'],
};

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  if (accessToken && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!accessToken && pathname.startsWith('/profile')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect_url', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
