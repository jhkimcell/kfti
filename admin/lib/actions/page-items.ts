"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_ITEMS, type SectionSlug } from "@/lib/page-sections";

function parseItem(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "제목을 입력해 주세요." as const };
  return {
    data: {
      icon: String(formData.get("icon") ?? "").trim(),
      tag: String(formData.get("tag") ?? "").trim(),
      title,
      body: String(formData.get("body") ?? "").trim(),
      bullets: String(formData.get("bullets") ?? "").trim(),
      image_url: String(formData.get("image_url") ?? "").trim(),
      sort_order: Number(formData.get("sort_order") ?? 0) || 0,
      published: formData.get("published") === "on",
    },
  };
}

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

export async function createPageItem(
  section: SectionSlug,
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const parsed = parseItem(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await requireUser();
  const { error } = await supabase.from("page_items").insert({ ...parsed.data, section });
  if (error) return { error: "저장에 실패했습니다: " + error.message };
  revalidatePath(`/admin/sections/${section}`);
  redirect(`/admin/sections/${section}`);
}

export async function updatePageItem(
  section: SectionSlug,
  id: string,
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const parsed = parseItem(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await requireUser();
  const { error } = await supabase.from("page_items").update(parsed.data).eq("id", id);
  if (error) return { error: "수정에 실패했습니다: " + error.message };
  revalidatePath(`/admin/sections/${section}`);
  redirect(`/admin/sections/${section}`);
}

export async function deletePageItem(section: SectionSlug, id: string): Promise<void> {
  const supabase = await requireUser();
  await supabase.from("page_items").delete().eq("id", id);
  revalidatePath(`/admin/sections/${section}`);
}

// 기본 항목 불러오기 (해당 섹션이 비어 있을 때만)
export async function seedSection(section: SectionSlug): Promise<void> {
  const supabase = await requireUser();
  const { count } = await supabase
    .from("page_items")
    .select("*", { count: "exact", head: true })
    .eq("section", section);
  if ((count ?? 0) > 0) return;
  const rows = DEFAULT_ITEMS[section].map((d) => ({ ...d, section }));
  await supabase.from("page_items").insert(rows);
  revalidatePath(`/admin/sections/${section}`);
}
