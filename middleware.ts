import { NextResponse } from 'next/server';

// Allow if the referer contains ANY of these tokens
const ALLOWED_TOKENS = [
  'therebuild100.com',               // covers www.therebuild100.com + learn.therebuild100.com
  'learnworlds.com'                  // covers default LearnWorlds subdomains
];

// Public assets that always pass
const ALWAYS_ALLOW_PREFIXES = [
  '/access.html','/robots.txt','/favicon.ico','/manifest.webmanifest',
  '/apple-touch-icon.png','/.well-known/','/_next/',
  '/assets/','/libs/','/css/','/js/','/img/','/fonts/','/media/'
];

export const config = {
  matcher: [
    '/((?!.*\\.(?:css|js|mjs|map|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot|mp4|webm|ogg|mp3|wav)$).*)'
  ]
};

export default function middleware(req: Request) {
  const url = new URL(req.url);
  const path = url.pathname;

  // Skip gate for assets
  if (ALWAYS_ALLOW_PREFIXES.some(p => path.startsWith(p))) return NextResponse.next();

  const referer = req.headers.get('referer') || '';
  const allowed = referer && ALLOWED_TOKENS.some(t => referer.includes(t));

  // Block if referer not allowed
  if (!allowed) return NextResponse.rewrite(new URL('/access.html', url));

  // Rewrite root "/" to the static reader file
  if (path === '/' || path === '') return NextResponse.rewrite(new URL('/index.html', url));

  return NextResponse.next();
}
