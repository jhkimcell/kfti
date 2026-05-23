import { createClient } from "@/lib/supabase/server";
import ContentEditor from "@/components/content-editor";

export const dynamic = "force-dynamic";

export default async function ContentPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_content").select("key, value");

  const values: Record<string, string> = {};
  (data ?? []).forEach((r: { key: string; value: string }) => {
    values[r.key] = r.value;
  });

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">페이지 내용</h1>
        <p className="mt-1 text-sm text-slate-500">
          재단소개·사업분야·조직구성의 주요 문구를 편집합니다. 저장하면 공개 페이지에 반영됩니다.
        </p>
      </header>

      {error && (
        <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          site_content 테이블이 아직 없습니다. SETUP의 migration-site-content.sql 을 먼저 실행하세요.
          <br />
          (아래에서 수정해도 저장은 실패합니다.)
        </p>
      )}

      <ContentEditor values={values} />
    </div>
  );
}
