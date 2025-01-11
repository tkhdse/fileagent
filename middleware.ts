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
    const supabase = createMiddlewareClient({req, res})
    const { pathname } = req.nextUrl

    const {
        data: {session},
    } = await supabase.auth.getSession();

    if (session && req.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!session && pathname === '/') {
        const redirect = req.nextUrl.clone()
        redirect.pathname = '/login';
        redirect.searchParams.set('redirectedFrom', req.nextUrl.pathname);
        return NextResponse.redirect(redirect);
    }


    return res;
}

export const config = {
    matcher: ['/dashboard:path*']
};