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
  // proxy.ts가 1차로 막아주지만, 여기서도 한 번 더 확인합니다. (이중 안전장치)
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
