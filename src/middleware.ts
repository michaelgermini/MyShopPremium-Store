import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin');
    const isApiRoute = req.nextUrl.pathname.startsWith('/api');

    // Redirect to signin if accessing protected routes without auth
    if (isAdminPage && !isAuth) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    // For admin routes, check if user has admin role
    if (isAdminPage && isAuth) {
      // You can add role-based access control here
      // For now, we'll allow any authenticated user to access admin
      // In production, you might want to check user.roles.includes('admin')
    }

    // API routes protection
    if (isApiRoute && isAdminPage && !isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow auth pages
        if (pathname.startsWith('/auth')) return true;

        // Allow API routes
        if (pathname.startsWith('/api')) return true;

        // Allow public pages
        if (pathname === '/' || pathname.startsWith('/products') || pathname.startsWith('/about')) {
          return true;
        }

        // Require auth for admin and protected routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|public/).*)',
  ],
};
