"use client";

import Link from "next/link";
import { useActionState } from "react";

type FormState = { error?: string };

type Props = {
  action: (state: FormState | undefined, formData: FormData) => Promise<FormState>;
  defaultValues?: {
    tag: string;
    title: string;
    subtitle: string;
    button_label: string;
    button_link: string;
    image_url: string;
    sort_order: number;
    published: boolean;
  };
  submitLabel: string;
};

const inputCls =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900";

export default function HeroForm({ action, defaultValues, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form
      action={formAction}
      className="max-w-2xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
    >
      <div>
        <label htmlFor="tag" className="mb-1 block text-sm font-medium text-slate-700">
          작은 라벨 <span className="text-slate-400">(선택)</span>
        </label>
        <input id="tag" name="tag" type="text" defaultValue={defaultValues?.tag} className={inputCls} placeholder="예: K-CULTURE · K-CONTENT" />
      </div>

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
          메인 문구 <span className="text-slate-400">(줄바꿈하면 화면에서도 줄이 나뉩니다)</span>
        </label>
        <textarea id="title" name="title" required rows={2} defaultValue={defaultValues?.title} className={`${inputCls} resize-y`} placeholder={"예: 문화가 곧\n국가 경쟁력입니다"} />
      </div>

      <div>
        <label htmlFor="subtitle" className="mb-1 block text-sm font-medium text-slate-700">
          설명 문구 <span className="text-slate-400">(선택)</span>
        </label>
        <textarea id="subtitle" name="subtitle" rows={2} defaultValue={defaultValues?.subtitle} className={`${inputCls} resize-y`} placeholder="예: K-콘텐츠·푸드·뷰티·바이오, 문화 주도 성장으로 미래를 엽니다." />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="button_label" className="mb-1 block text-sm font-medium text-slate-700">
            버튼 글자 <span className="text-slate-400">(비우면 버튼 숨김)</span>
          </label>
          <input id="button_label" name="button_label" type="text" defaultValue={defaultValues?.button_label} className={inputCls} placeholder="예: 사업분야 보기" />
        </div>
        <div>
          <label htmlFor="button_link" className="mb-1 block text-sm font-medium text-slate-700">
            버튼 링크
          </label>
          <input id="button_link" name="button_link" type="text" defaultValue={defaultValues?.button_link} className={inputCls} placeholder="예: research.html" />
        </div>
      </div>

      <div>
        <label htmlFor="image_url" className="mb-1 block text-sm font-medium text-slate-700">
          배경 이미지 URL <span className="text-slate-400">(선택 · 비우면 기본 남색 배경)</span>
        </label>
        <input id="image_url" name="image_url" type="text" defaultValue={defaultValues?.image_url} className={inputCls} placeholder="https://..." />
      </div>

      <div className="flex items-center gap-6">
        <div>
          <label htmlFor="sort_order" className="mb-1 block text-sm font-medium text-slate-700">
            순서
          </label>
          <input id="sort_order" name="sort_order" type="number" defaultValue={defaultValues?.sort_order ?? 0} className={`${inputCls} w-28`} />
        </div>
        <label className="mt-6 flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="published" defaultChecked={defaultValues?.published ?? true} className="h-4 w-4 rounded border-slate-300" />
          홈에 노출
        </label>
      </div>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={pending} className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50">
          {pending ? "저장 중..." : submitLabel}
        </button>
        <Link href="/admin/hero" className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          취소
        </Link>
      </div>
    </form>
  );
}
