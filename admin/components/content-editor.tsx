"use client";

import { useActionState } from "react";
import { saveSiteContent } from "@/lib/actions/content";
import { CONTENT_FIELDS, CONTENT_GROUPS } from "@/lib/site-content";

export default function ContentEditor({
  values,
}: {
  values: Record<string, string>;
}) {
  const [state, formAction, pending] = useActionState(saveSiteContent, undefined);

  return (
    <form action={formAction} className="space-y-6 pb-24">
      {CONTENT_GROUPS.map((group) => (
        <section key={group} className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">{group}</h2>
          <div className="space-y-4">
            {CONTENT_FIELDS.filter((f) => f.group === group).map((f) => (
              <div key={f.key}>
                <label htmlFor={f.key} className="mb-1 block text-sm font-medium text-slate-700">
                  {f.label}
                </label>
                <textarea
                  id={f.key}
                  name={f.key}
                  rows={f.rows}
                  defaultValue={values[f.key] ?? f.default}
                  className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm leading-relaxed outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="sticky bottom-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white/90 px-4 py-3 backdrop-blur">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
        >
          {pending ? "저장 중..." : "전체 저장"}
        </button>
        {state?.ok && (
          <span className="text-sm font-medium text-emerald-600">
            저장되었습니다. 공개 페이지 새로고침 시 반영됩니다.
          </span>
        )}
        {state?.error && (
          <span className="text-sm font-medium text-red-600">{state.error}</span>
        )}
      </div>
    </form>
  );
}
