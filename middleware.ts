import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


/**
 * Middleware allows us to "inject" routing req/res with extra logic. In this case, 
 * middleware is used to protect the main page from unauthenticated users. 
 * @param req takes in a routing request
 * @returns a routing response
 */

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
      console.log('No cookies found in headers');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const supabase = createMiddlewareClient({req, res})


    // console.log('Cookies:', req.cookies);

    const { data: { session } } = await supabase.auth.getSession();
    

    if (!session) {
        const loginUrl = new URL('/login', req.url)
        loginUrl.searchParams.set('redirect', req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    return res;
}

// apply middleware to these routes
export const config = {
    matcher: ['/dashboard/:path*', '/group/:path*'] //'/dashboard/:path*', '/group/:path*'
};