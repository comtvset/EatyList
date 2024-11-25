import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const allow = [
  'pasta',
  'potato',
  'rice',
  'meat',
  'fish',
  'salad',
  'soup',
  'main',
  'signin',
  'signup',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const current = req.nextUrl.pathname.split('/').pop();

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

  if (result.token && ['/', '/signin', '/signup'].includes(pathname)) {
    return NextResponse.redirect(new URL('/main', req.url));
  }

  if (!result.token && pathname === '/main') {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (current && !allow.includes(current)) {
    return NextResponse.redirect(new URL('/not-found', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/main/:path*', '/', '/signin', '/signup'],
};
