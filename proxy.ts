import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function proxy(req: NextRequest) {
  const res = NextResponse.next()

  // Supabase not configured — skip auth check (development / build mode)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return res
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  const pathname = req.nextUrl.pathname

  // Redirect unauthenticated users away from protected routes
  const providerPublic = pathname === '/provider/login' || pathname === '/provider/signup'
  if (!session && (pathname.startsWith('/dashboard') || (pathname.startsWith('/provider') && !providerPublic))) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect non-providers away from provider routes
  if (session && pathname.startsWith('/provider') && !providerPublic) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (profile?.role !== 'provider') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/provider/:path*'],
}
