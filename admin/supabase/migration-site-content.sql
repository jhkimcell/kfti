-- ============================================================
-- [마이그레이션] 페이지 내용(재단소개/사업분야/조직구성) 편집용 키-값 테이블
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 Run 하세요. (한 번만)
-- 기본 문구는 코드에 들어있어, 표만 만들면 됩니다. (시드 불필요)
-- ============================================================

create table if not exists public.site_content (
  key        text primary key,             -- 항목 식별자 (예: about_mission)
  value      text not null default '',      -- 내용
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "admin full access content" on public.site_content;
create policy "admin full access content"
  on public.site_content for all to authenticated
  using (true) with check (true);

drop policy if exists "public read content" on public.site_content;
create policy "public read content"
  on public.site_content for select to anon
  using (true);
