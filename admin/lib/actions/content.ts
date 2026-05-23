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

  const rows = CONTENT_FIELDS.map((f) => ({
    key: f.key,
    value: String(formData.get(f.key) ?? "").trim(),
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("site_content")
    .upsert(rows, { onConflict: "key" });
  if (error) return { error: "저장에 실패했습니다: " + error.message };

  revalidatePath("/admin/content");
  return { ok: true };
}
