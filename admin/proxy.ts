import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/session";

// Next.js 16부터 middleware.ts → proxy.ts 로 이름이 바뀌었습니다.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // /admin 으로 시작하는 모든 경로에서만 인증 검사를 실행합니다.
  matcher: ["/admin/:path*"],
};
