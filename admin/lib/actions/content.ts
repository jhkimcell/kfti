"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CONTENT_FIELDS } from "@/lib/site-content";

export async function saveSiteContent(
  _prevState: { error?: string; ok?: boolean } | undefined,
  formData: FormData
): Promise<{ error?: string; ok?: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // 폼에 포함된 항목만 저장 (블록 단위 저장 지원)
  const rows = CONTENT_FIELDS.filter((f) => formData.has(f.key)).map((f) => ({
    key: f.key,
    value: String(formData.get(f.key) ?? "").trim(),
    updated_at: new Date().toISOString(),
  }));
  if (rows.length === 0) return { ok: true };

  const { error } = await supabase
    .from("site_content")
    .upsert(rows, { onConflict: "key" });
  if (error) return { error: "저장에 실패했습니다: " + error.message };

  revalidatePath("/admin/content");
  return { ok: true };
}
