import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/sidebar";

/**
 * 로그인이 필요한 관리자 화면(대시보드/공지사항)의 공통 레이아웃입니다.
 * 왼쪽 사이드바 + 오른쪽 메인 영역 구조이며, 로그인 페이지에는 적용되지 않습니다.
 */
export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 보호 페이지 진입 시 로그인 여부를 확인하고, 아니면 로그인으로 보냅니다.
  // (글 작성/수정/삭제 같은 동작도 서버 액션에서 한 번 더 확인합니다.)
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <Sidebar email={user.email ?? ""} />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
