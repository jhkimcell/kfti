"use client";

import Link from "next/link";
import { useActionState } from "react";

type FormState = { error?: string };

type Props = {
  // 작성/수정 서버 액션. (이전상태, 폼데이터) → 결과
  action: (state: FormState | undefined, formData: FormData) => Promise<FormState>;
  defaultValues?: {
    title: string;
    content: string;
    published: boolean;
  };
  submitLabel: string;
  cancelHref: string; // 취소 시 돌아갈 목록 경로 (공지/보도자료에 따라 다름)
};

export default function NoticeForm({
  action,
  defaultValues,
  submitLabel,
  cancelHref,
}: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form
      action={formAction}
      className="max-w-2xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
    >
      <div>
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          제목
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={defaultValues?.title}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          placeholder="제목을 입력하세요"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          본문
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          defaultValue={defaultValues?.content}
          className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm leading-relaxed outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          placeholder="내용을 입력하세요"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          name="published"
          defaultChecked={defaultValues?.published ?? true}
          className="h-4 w-4 rounded border-slate-300"
        />
        사이트에 노출 (체크 해제 시 숨김)
      </label>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {state.error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
        >
          {pending ? "저장 중..." : submitLabel}
        </button>
        <Link
          href={cancelHref}
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          취소
        </Link>
      </div>
    </form>
  );
}
