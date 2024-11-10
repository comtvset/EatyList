import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const apiUrl = `${req.nextUrl.origin}/api/verifyToken`;
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Cookie: req.headers.get('cookie') || '',
    },
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL('/signup', req.url));
  }

  const result = await response.json();

  if (
    (result.token && pathname === '/') ||
    (result.token && pathname === '/signin') ||
    (result.token && pathname === '/signup')
  ) {
    return NextResponse.redirect(new URL('/main', req.url));
  }

  if (!result.token && pathname === '/main') {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/main', '/', '/signin', '/signup'],
};
