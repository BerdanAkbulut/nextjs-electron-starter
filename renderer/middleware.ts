import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/home') {
    if (!request.cookies.get('user')) {
      return NextResponse.redirect(new URL('/register', request.url));
    }
  }
  if (request.nextUrl.pathname === '/register') {
    if (request.cookies.get('user')) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  //return NextResponse.redirect(new URL('/', request.url));
  // if (request.nextUrl.pathname === '/') {
  //   console.log('me');
  //   return NextResponse.redirect(new URL('/signin', request.url));
  // }
}
