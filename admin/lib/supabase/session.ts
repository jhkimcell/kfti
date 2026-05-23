import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * 모든 요청마다 실행되어 (1) 로그인 세션을 최신으로 유지하고
 * (2) 비로그인 상태로 보호된 /admin 페이지에 들어오면 로그인 페이지로 보냅니다.
 * proxy.ts(구 middleware.ts)에서 호출합니다.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getUser()는 토큰을 실제로 검증하므로 보안상 안전합니다. (getSession보다 권장)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === "/admin/login";

  // 비로그인 + 로그인 페이지가 아닌 /admin 경로 → 로그인 페이지로 차단
  if (!user && !isLoginRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // 이미 로그인했는데 로그인 페이지로 오면 → 대시보드로
  if (user && isLoginRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
