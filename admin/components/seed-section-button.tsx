"use client";

import { useTransition } from "react";
import { seedSection } from "@/lib/actions/page-items";
import type { SectionSlug } from "@/lib/page-sections";

export default function SeedSectionButton({ section }: { section: SectionSlug }) {
  const [pending, start] = useTransition();
  return (
    <button
      onClick={() => start(() => seedSection(section))}
      disabled={pending}
      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
    >
      {pending ? "불러오는 중..." : "기본 항목 불러오기"}
    </button>
  );
}
