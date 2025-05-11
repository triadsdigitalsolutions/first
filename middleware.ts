import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  // Check if the user is trying to access a dashboard route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Use getSession to validate the session
    const session = await getToken({ req: request, secret });

    if (!session) {
      // Redirect to the login page if there's no session.
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }

    // If the session is valid, allow access to the dashboard route.
    return NextResponse.next();
  }
  // For any other route, allow normal access.
  return NextResponse.next();
}

// See the documentation about defining a matcher: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: '/dashboard/:path*', // Only applies to /dashboard and its sub-routes
};
