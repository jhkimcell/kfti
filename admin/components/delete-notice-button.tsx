"use client";

import { useState, useTransition } from "react";
import { deletePost } from "@/lib/actions/notices";
import type { Category } from "@/lib/board";

export default function DeleteNoticeButton({
  id,
  title,
  category,
}: {
  id: string;
  title: string;
  category: Category;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deletePost(category, id);
      setOpen(false);
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm font-medium text-red-600 hover:underline"
      >
        삭제
      </button>

      {open && (
        // 확인 모달 (배경 클릭 시 닫힘)
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => !pending && setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-semibold text-slate-900">
              삭제할까요?
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              &ldquo;{title}&rdquo; 글이 영구적으로 삭제됩니다. 이 작업은 되돌릴
              수 없습니다.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={pending}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                disabled={pending}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-50"
              >
                {pending ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
