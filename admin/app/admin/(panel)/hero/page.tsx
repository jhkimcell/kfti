import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { HeroSlide } from "@/lib/types";
import DeleteHeroButton from "@/components/delete-hero-button";

export const dynamic = "force-dynamic";

export default async function HeroPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  const slides = (data ?? []) as HeroSlide[];

  return (
    <div>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">메인 슬라이드</h1>
          <p className="mt-1 text-sm text-slate-500">
            홈 상단 자동 슬라이드의 문구를 관리합니다. (총 {slides.length}개)
          </p>
        </div>
        <Link
          href="/admin/hero/new"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          + 새 슬라이드
        </Link>
      </header>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          목록을 불러오지 못했습니다: {error.message}
          <br />
          (hero_slides 테이블이 없다면 SETUP의 migration-hero-slides.sql 을 먼저 실행하세요.)
        </p>
      )}

      {!error && slides.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-sm text-slate-500">아직 등록된 슬라이드가 없습니다.</p>
          <Link href="/admin/hero/new" className="mt-3 inline-block text-sm font-semibold text-slate-900 hover:underline">
            첫 슬라이드 만들기 →
          </Link>
        </div>
      )}

      {slides.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-500">
                <th className="w-16 px-5 py-3 font-medium">순서</th>
                <th className="px-5 py-3 font-medium">메인 문구</th>
                <th className="w-28 px-5 py-3 font-medium">상태</th>
                <th className="w-32 px-5 py-3 text-right font-medium">관리</th>
              </tr>
            </thead>
            <tbody>
              {slides.map((slide) => (
                <tr key={slide.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="px-5 py-3 font-semibold text-slate-500">{slide.sort_order}</td>
                  <td className="px-5 py-3">
                    <Link href={`/admin/hero/${slide.id}/edit`} className="font-medium text-slate-900 hover:underline">
                      {slide.title.split("\n")[0] || "(제목 없음)"}
                    </Link>
                    {slide.tag && <span className="ml-2 text-xs text-slate-400">{slide.tag}</span>}
                  </td>
                  <td className="px-5 py-3">
                    {slide.published ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">노출</span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">숨김</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-3">
                      <Link href={`/admin/hero/${slide.id}/edit`} className="text-sm font-medium text-slate-600 hover:underline">수정</Link>
                      <DeleteHeroButton id={slide.id} title={slide.title.split("\n")[0]} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
