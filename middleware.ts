import { NextResponse } from 'next/server';

// Allow if referer contains any of these tokens
const ALLOWED_TOKENS = [
  'therebuild100.com',   // covers www.therebuild100.com and subdomains
  'learnworlds.com'      // covers default LearnWorlds domains
];

// We only gate the entry routes to avoid breaking the app's internal requests
export const config = {
  matcher: ['/', '/index.html']
};

export default function middleware(req: Request) {
  const url = new URL(req.url);
  const path = url.pathname;

  const referer = req.headers.get('referer') || '';
  const allowed = referer && ALLOWED_TOKENS.some(t => referer.includes(t));

  // If not allowed, show access page
  if (!allowed) {
    return NextResponse.rewrite(new URL('/access.html', url));
  }

  // If the lesson points at "/", rewrite to the static reader
  if (path === '/' || path === '') {
    return NextResponse.rewrite(new URL('/index.html', url));
  }

  return NextResponse.next();
}
