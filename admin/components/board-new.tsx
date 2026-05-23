import { createPost } from "@/lib/actions/notices";
import { BOARDS, type Category } from "@/lib/board";
import NoticeForm from "@/components/notice-form";

// 새 글 작성 화면 (공지/보도자료 공유)
export default function BoardNew({ category }: { category: Category }) {
  const board = BOARDS[category];
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{board.newLabel}</h1>
      </header>
      <NoticeForm
        action={createPost.bind(null, category)}
        submitLabel="등록"
        cancelHref={board.basePath}
      />
    </div>
  );
}
