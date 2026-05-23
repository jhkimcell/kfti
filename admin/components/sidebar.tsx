"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin/dashboard", label: "대시보드", icon: "▦" },
  { href: "/admin/hero", label: "메인 슬라이드", icon: "▭" },
  { href: "/admin/content", label: "페이지 내용", icon: "▥" },
  { href: "/admin/notices", label: "공지사항", icon: "▤" },
  { href: "/admin/press", label: "보도자료", icon: "▣" },
];

export default function Sidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <p className="text-sm font-bold text-slate-900">K-선도국가 미래포럼</p>
        <p className="mt-0.5 text-xs text-slate-400">관리자</p>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          // 현재 경로가 메뉴 경로로 시작하면 활성화 표시
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <p className="truncate px-3 pb-2 text-xs text-slate-400" title={email}>
          {email}
        </p>
        <button
          onClick={handleLogout}
          className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
}
