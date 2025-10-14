import { NextResponse } from 'next/server';

const ALLOWED_REFERRERS = [
  'https://learn.therebuild100.com',
  'https://therebuild100.learnworlds.com'
];

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

  if (ALWAYS_ALLOW_PREFIXES.some(prefix => path.startsWith(prefix))) return NextResponse.next();

  const referer = req.headers.get('referer') || '';
  const ok = ALLOWED_REFERRERS.some(origin => referer.startsWith(origin));
  if (!ok) return NextResponse.rewrite(new URL('/access.html', url));

  return NextResponse.next();
}
