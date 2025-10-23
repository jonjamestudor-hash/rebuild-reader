import { NextResponse } from "next/server";

export function middleware(request) {
  const referer = request.headers.get("referer") || "";
  const origin  = request.headers.get("origin") || "";

  // Allow both LearnWorlds and your main site as valid sources
  const allowedDomains = [
    "learnworlds.com",
    "therebuild100.com",
    "learn.therebuild100.com"
  ];

  const allowed = allowedDomains.some(domain =>
    referer.includes(domain) || origin.includes(domain)
  );

  if (!allowed) {
    return new NextResponse(
      `<html><body style="font-family:sans-serif;text-align:center;padding:3em;background:#000;color:#fff;">
         <h1 style="color:#ff4444;">Access via your LearnWorlds account</h1>
         <p>To read <strong>The Rebuilt Man</strong>, please open it from inside your course.</p>
         <a href="https://therebuild100.com"
            style="display:inline-block;margin-top:1.5em;padding:10px 16px;background:#c80002;color:#fff;
                   text-decoration:none;border-radius:6px;font-weight:600;">
            Go to my course
         </a>
       </body></html>`,
      { status: 403, headers: { "content-type": "text/html" } }
    );
  }

  return NextResponse.next();
}

export const config = { matcher: ["/", "/index.html"] };
