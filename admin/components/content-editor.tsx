"use client";

import { useActionState } from "react";
import { saveSiteContent } from "@/lib/actions/content";
import { CONTENT_FIELDS, CONTENT_GROUPS } from "@/lib/site-content";

function GroupForm({
  group,
  values,
}: {
  group: string;
  values: Record<string, string>;
}) {
  const [state, formAction, pending] = useActionState(saveSiteContent, undefined);
  const fields = CONTENT_FIELDS.filter((f) => f.group === group);

  return (
    <form action={formAction} className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-900">{group}</h2>
        <div className="flex items-center gap-3">
          {state?.ok && <span className="text-sm font-medium text-emerald-600">저장됨 ✓</span>}
          {state?.error && <span className="text-sm font-medium text-red-600">{state.error}</span>}
          <button
            type="submit"
            disabled={pending}
            className="shrink-0 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            {pending ? "저장 중..." : "이 블록 저장"}
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {fields.map((f) => (
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
    </form>
  );
}

export default function ContentEditor({
  values,
}: {
  values: Record<string, string>;
}) {
  return (
    <div className="space-y-6">
      {CONTENT_GROUPS.map((g) => (
        <GroupForm key={g} group={g} values={values} />
      ))}
    </div>
  );
}
