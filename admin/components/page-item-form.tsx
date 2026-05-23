"use client";

import Link from "next/link";
import { useActionState } from "react";
import { SECTIONS, type SectionSlug } from "@/lib/page-sections";

type FormState = { error?: string };

type Props = {
  section: SectionSlug;
  action: (state: FormState | undefined, formData: FormData) => Promise<FormState>;
  defaultValues?: {
    icon: string;
    tag: string;
    title: string;
    body: string;
    bullets: string;
    image_url: string;
    sort_order: number;
    published: boolean;
  };
  submitLabel: string;
};

const inputCls =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900";

export default function PageItemForm({ section, action, defaultValues, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const cfg = SECTIONS[section];

  return (
    <form action={formAction} className="max-w-2xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cfg.layout !== "faq" ? (
          <div>
            <label htmlFor="icon" className="mb-1 block text-sm font-medium text-slate-700">아이콘(이모지) <span className="text-slate-400">(선택)</span></label>
            <input id="icon" name="icon" type="text" defaultValue={defaultValues?.icon} className={inputCls} placeholder="예: 🎓" />
          </div>
        ) : (
          <input type="hidden" name="icon" defaultValue={defaultValues?.icon ?? ""} />
        )}
        {cfg.hasTag && (
          <div>
            <label htmlFor="tag" className="mb-1 block text-sm font-medium text-slate-700">작은 라벨 <span className="text-slate-400">(선택)</span></label>
            <input id="tag" name="tag" type="text" defaultValue={defaultValues?.tag} className={inputCls} placeholder="예: Think-Tank" />
          </div>
        )}
        {!cfg.hasTag && <input type="hidden" name="tag" defaultValue={defaultValues?.tag ?? ""} />}
      </div>

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">{cfg.titleLabel ?? "제목"}</label>
        <input id="title" name="title" type="text" required defaultValue={defaultValues?.title} className={inputCls} placeholder={cfg.titleLabel ?? "제목"} />
      </div>

      <div>
        <label htmlFor="body" className="mb-1 block text-sm font-medium text-slate-700">{cfg.bodyLabel ?? "설명"} <span className="text-slate-400">(선택)</span></label>
        <textarea id="body" name="body" rows={cfg.layout === "faq" ? 4 : 3} defaultValue={defaultValues?.body} className={`${inputCls} resize-y`} placeholder={cfg.bodyLabel ?? "설명 문구"} />
      </div>

      {cfg.layout !== "faq" ? (
        <div>
          <label htmlFor="bullets" className="mb-1 block text-sm font-medium text-slate-700">세부 항목 <span className="text-slate-400">(한 줄에 하나씩)</span></label>
          <textarea id="bullets" name="bullets" rows={4} defaultValue={defaultValues?.bullets} className={`${inputCls} resize-y`} placeholder={"항목 1\n항목 2\n항목 3"} />
        </div>
      ) : (
        <input type="hidden" name="bullets" defaultValue={defaultValues?.bullets ?? ""} />
      )}

      {cfg.hasImage ? (
        <div>
          <label htmlFor="image_url" className="mb-1 block text-sm font-medium text-slate-700">이미지 URL <span className="text-slate-400">(선택)</span></label>
          <input id="image_url" name="image_url" type="text" defaultValue={defaultValues?.image_url} className={inputCls} placeholder="https://..." />
        </div>
      ) : (
        <input type="hidden" name="image_url" defaultValue={defaultValues?.image_url ?? ""} />
      )}

      <div className="flex items-center gap-6">
        <div>
          <label htmlFor="sort_order" className="mb-1 block text-sm font-medium text-slate-700">순서</label>
          <input id="sort_order" name="sort_order" type="number" defaultValue={defaultValues?.sort_order ?? 0} className={`${inputCls} w-28`} />
        </div>
        <label className="mt-6 flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="published" defaultChecked={defaultValues?.published ?? true} className="h-4 w-4 rounded border-slate-300" />
          노출
        </label>
      </div>

      {state?.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={pending} className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50">
          {pending ? "저장 중..." : submitLabel}
        </button>
        <Link href={`/admin/sections/${section}`} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          취소
        </Link>
      </div>
    </form>
  );
}
