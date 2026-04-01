import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

function setUrlHeader(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  requestHeaders.set('x-url', pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const response = setUrlHeader(request);
  const intlResponse = await intlMiddleware(request);

  const combinedHeaders = new Headers(response.headers);
  intlResponse.headers.forEach((value, key) => {
    combinedHeaders.set(key, value);
  });

  return new NextResponse(intlResponse.body, {
    headers: combinedHeaders,
    status: intlResponse.status,
    statusText: intlResponse.statusText,
  });
}

export const config = {
  matcher: ['/', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
