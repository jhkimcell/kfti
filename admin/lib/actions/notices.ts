"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BOARDS, type Category } from "@/lib/board";

/**
 * 폼 데이터에서 제목/본문/노출여부를 꺼내고 간단히 검증합니다.
 * 문제가 있으면 에러 메시지를, 없으면 정제된 값을 돌려줍니다.
 */
function parsePost(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  // 체크박스는 켜져 있을 때만 "on" 값이 전송됩니다.
  const published = formData.get("published") === "on";

  if (!title) return { error: "제목을 입력해 주세요." as const };
  if (!content) return { error: "본문을 입력해 주세요." as const };

  return { data: { title, content, published } };
}

// 로그인 여부를 다시 확인합니다. (미들웨어가 막아주지만, 서버 액션도 따로 지켜야 안전합니다.)
async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

export async function createPost(
  category: Category,
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const parsed = parsePost(formData);
  if ("error" in parsed) return { error: parsed.error };

  const supabase = await requireUser();
  const { error } = await supabase
    .from("notices")
    .insert({ ...parsed.data, category });
  if (error) return { error: "저장에 실패했습니다: " + error.message };

  revalidatePath(BOARDS[category].basePath);
  redirect(BOARDS[category].basePath);
}

export async function updatePost(
  category: Category,
  id: string,
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const parsed = parsePost(formData);
  if ("error" in parsed) return { error: parsed.error };

  const supabase = await requireUser();
  const { error } = await supabase
    .from("notices")
    .update(parsed.data)
    .eq("id", id);
  if (error) return { error: "수정에 실패했습니다: " + error.message };

  revalidatePath(BOARDS[category].basePath);
  redirect(BOARDS[category].basePath);
}

export async function deletePost(
  category: Category,
  id: string
): Promise<void> {
  const supabase = await requireUser();
  await supabase.from("notices").delete().eq("id", id);
  revalidatePath(BOARDS[category].basePath);
}
