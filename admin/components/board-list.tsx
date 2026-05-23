import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BOARDS, type Category } from "@/lib/board";
import type { Notice } from "@/lib/types";
import DeleteNoticeButton from "@/components/delete-notice-button";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

/**
 * 공지사항/보도자료 목록 화면 (둘이 구조가 같아 하나로 공유).
 * category 만 바꿔서 재사용합니다.
 */
export default async function BoardList({ category }: { category: Category }) {
  const board = BOARDS[category];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  const posts = (data ?? []) as Notice[];

  return (
    <div>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{board.label}</h1>
          <p className="mt-1 text-sm text-slate-500">
            총 {posts.length}건이 있습니다.
          </p>
        </div>
        <Link
          href={`${board.basePath}/new`}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          + {board.newLabel}
        </Link>
      </header>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          목록을 불러오지 못했습니다: {error.message}
          <br />
          (category 칸이 없다면 SETUP.md의 마이그레이션 SQL을 먼저 실행하세요.)
        </p>
      )}

      {!error && posts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-sm text-slate-500">아직 등록된 글이 없습니다.</p>
          <Link
            href={`${board.basePath}/new`}
            className="mt-3 inline-block text-sm font-semibold text-slate-900 hover:underline"
          >
            첫 글 작성하기 →
          </Link>
        </div>
      )}

      {posts.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-500">
                <th className="px-5 py-3 font-medium">제목</th>
                <th className="w-28 px-5 py-3 font-medium">상태</th>
                <th className="w-32 px-5 py-3 font-medium">작성일</th>
                <th className="w-32 px-5 py-3 text-right font-medium">관리</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`${board.basePath}/${post.id}/edit`}
                      className="font-medium text-slate-900 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    {post.published ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        노출
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                        숨김
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-500">
                    {formatDate(post.created_at)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`${board.basePath}/${post.id}/edit`}
                        className="text-sm font-medium text-slate-600 hover:underline"
                      >
                        수정
                      </Link>
                      <DeleteNoticeButton
                        id={post.id}
                        title={post.title}
                        category={category}
                      />
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
