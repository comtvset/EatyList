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

  const currentSegment = req.nextUrl.pathname.split('/').pop();

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

  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
  const preferredLocale = req.nextUrl.searchParams.get('locale');

  if (preferredLocale && preferredLocale !== cookieLocale) {
    const updatedResponse = NextResponse.redirect(req.url);
    updatedResponse.cookies.set('NEXT_LOCALE', preferredLocale);
    return updatedResponse;
  }

  if (result.token && ['/', '/signin', '/signup'].includes(pathname)) {
    return NextResponse.redirect(new URL('/main', req.url));
  }

  if (!result.token && pathname.startsWith('/main')) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (currentSegment && !allowedPaths.includes(currentSegment)) {
    return NextResponse.rewrite(new URL('/not-found', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/main/:path*', '/', '/signin', '/signup'],
};
