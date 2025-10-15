import { NextResponse } from 'next/server';

// Allow if the Referer contains ANY of these tokens (covers default + custom LW domains)
const ALLOWED_TOKENS = [
  'learnworlds.com',                 // covers many LW subdomains/editors
  'therebuild100.learnworlds.com',   // your default LW domain
  'learn.therebuild100.com'          // your custom LW domain (if/when you set it)
];

// Public assets that should pass without a gate
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

  // Let static assets through
  if (ALWAYS_ALLOW_PREFIXES.some(p => path.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow only if Referer contains any allowed token
  const referer = req.headers.get('referer') || '';
  const allowed = referer && ALLOWED_TOKENS.some(t => referer.includes(t));

  if (!allowed) {
    // Show the friendly access page
    return NextResponse.rewrite(new URL('/access.html', url));
  }

  // If lesson points to "/", rewrite it to the static reader
  if (path === '/' || path === '') {
    return NextResponse.rewrite(new URL('/index.html', url));
  }

  return NextResponse.next();
}
