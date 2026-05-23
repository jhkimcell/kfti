import { notFound } from "next/navigation";
import { updatePost } from "@/lib/actions/notices";
import { createClient } from "@/lib/supabase/server";
import { BOARDS, type Category } from "@/lib/board";
import type { Notice } from "@/lib/types";
import NoticeForm from "@/components/notice-form";

// 글 수정 화면 (공지/보도자료 공유)
export default async function BoardEdit({
  category,
  id,
}: {
  category: Category;
  id: string;
}) {
  const board = BOARDS[category];
  const supabase = await createClient();
  // id + category가 모두 맞아야 가져옵니다. (공지 id를 보도자료 경로로 열 수 없게)
  const { data } = await supabase
    .from("notices")
    .select("*")
    .eq("id", id)
    .eq("category", category)
    .single();

  if (!data) notFound();
  const post = data as Notice;

  // category와 id를 미리 묶어두면 폼에서는 (이전상태, 폼데이터)만 넘기면 됩니다.
  const updateAction = updatePost.bind(null, category, post.id);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {board.label} 수정
        </h1>
      </header>
      <NoticeForm
        action={updateAction}
        submitLabel="수정 저장"
        cancelHref={board.basePath}
        defaultValues={{
          title: post.title,
          content: post.content,
          published: post.published,
        }}
      />
    </div>
  );
}
