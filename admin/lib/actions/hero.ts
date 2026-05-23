"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function parseSlide(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "메인 문구(제목)를 입력해 주세요." as const };

  return {
    data: {
      tag: String(formData.get("tag") ?? "").trim(),
      title,
      subtitle: String(formData.get("subtitle") ?? "").trim(),
      button_label: String(formData.get("button_label") ?? "").trim(),
      button_link: String(formData.get("button_link") ?? "").trim(),
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

export async function createHeroSlide(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const parsed = parseSlide(formData);
  if ("error" in parsed) return { error: parsed.error };

  const supabase = await requireUser();
  const { error } = await supabase.from("hero_slides").insert(parsed.data);
  if (error) return { error: "저장에 실패했습니다: " + error.message };

  revalidatePath("/admin/hero");
  redirect("/admin/hero");
}

export async function updateHeroSlide(
  id: string,
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const parsed = parseSlide(formData);
  if ("error" in parsed) return { error: parsed.error };

  const supabase = await requireUser();
  const { error } = await supabase
    .from("hero_slides")
    .update(parsed.data)
    .eq("id", id);
  if (error) return { error: "수정에 실패했습니다: " + error.message };

  revalidatePath("/admin/hero");
  redirect("/admin/hero");
}

export async function deleteHeroSlide(id: string): Promise<void> {
  const supabase = await requireUser();
  await supabase.from("hero_slides").delete().eq("id", id);
  revalidatePath("/admin/hero");
}
