import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  // head: true → 데이터는 안 가져오고 개수(count)만 셉니다. (빠름)
  const { count: noticeCount } = await supabase
    .from("notices")
    .select("*", { count: "exact", head: true })
    .eq("category", "notice");

  const { count: pressCount } = await supabase
    .from("notices")
    .select("*", { count: "exact", head: true })
    .eq("category", "press");

  const stats = [
    { label: "공지사항", value: noticeCount ?? 0, color: "text-slate-900" },
    { label: "보도자료", value: pressCount ?? 0, color: "text-slate-900" },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">대시보드</h1>
        <p className="mt-1 text-sm text-slate-500">
          한국미래기술연구원 관리자 페이지에 오신 것을 환영합니다.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className={`mt-2 text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-semibold text-slate-900">바로가기</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/notices/new"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            + 새 공지 작성
          </Link>
          <Link
            href="/admin/press/new"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            + 새 보도자료 작성
          </Link>
          <Link
            href="/admin/notices"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            공지사항 목록
          </Link>
          <Link
            href="/admin/press"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            보도자료 목록
          </Link>
        </div>
      </div>
    </div>
  );
}
