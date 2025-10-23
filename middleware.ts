import { NextResponse } from "next/server";

export function middleware(request) {
  const referer = request.headers.get("referer") || "";
  // ✅ allow only requests that come from your LearnWorlds domain
  if (!referer.includes("learn.therebuild100.com")) {
    return new NextResponse(
      `<html><body style="font-family:sans-serif;text-align:center;padding:3em;">
         <h1>Access via your LearnWorlds account</h1>
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

  // ✅ everything else (requests coming from LearnWorlds) goes through normally
  return NextResponse.next();
}

// run on your homepage and main index only
export const config = {
  matcher: ["/", "/index.html"]
};
