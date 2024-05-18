import createMiddleware from "next-intl/middleware";
import { locales, localePrefix, pathnames } from "./navigation";
import { NextRequest, NextResponse } from "next/server";

function setUrlHeaderMiddleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  requestHeaders.set("x-url", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

const intlMiddleware = createMiddleware({
  defaultLocale: "pt",
  localePrefix,
  locales,
  pathnames
});

// Combine middlewares
export default async function middleware(request: NextRequest) {
  // First, run the custom middleware to set the `x-url` header
  const response = setUrlHeaderMiddleware(request);

  // Then, run the next-intl middleware
  const intlResponse = await intlMiddleware(request);

  // Merge headers and response bodies
  const combinedHeaders = new Headers(response.headers);
  intlResponse.headers.forEach((value, key) => {
    combinedHeaders.set(key, value);
  });

  return new NextResponse(intlResponse.body, {
    headers: combinedHeaders,
    status: intlResponse.status,
    statusText: intlResponse.statusText
  });
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(pt|en)/:path*"]
};
