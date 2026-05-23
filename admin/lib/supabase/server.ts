import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * 서버(서버 컴포넌트, 서버 액션, 라우트 핸들러)에서 사용하는 Supabase 클라이언트.
 * 쿠키에 저장된 로그인 세션을 읽어와 "지금 로그인한 사용자가 누구인지"를 알 수 있습니다.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // 서버 컴포넌트에서 호출되면 쿠키를 직접 못 바꿉니다.
            // 세션 갱신은 middleware.ts가 처리하므로 여기서는 무시해도 됩니다.
          }
        },
      },
    }
  );
}
