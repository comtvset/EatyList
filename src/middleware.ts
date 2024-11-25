import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const allowedPaths = [
  'pasta',
  'potato',
  'rice',
  'meat',
  'fish',
  'potatopancakes',
  'salad',
  'soup',
  'main',
  'signin',
  'signup',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const segments = req.nextUrl.pathname.split('/').filter(Boolean);
  const currentSegment = segments.pop();

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

  if (currentSegment && !allowedPaths.includes(currentSegment)) {
    return NextResponse.rewrite(new URL('/404', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/main/:path*', '/', '/signin', '/signup'],
};
