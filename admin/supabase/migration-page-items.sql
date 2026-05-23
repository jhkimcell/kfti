-- ============================================================
-- [마이그레이션] 사업분야 / 조직구성 카드 항목 (추가·수정·삭제 가능)
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 Run 하세요. (한 번만)
-- 표만 만들면 됩니다. 기본 항목은 관리자에서 '기본 항목 불러오기'로 채웁니다.
-- ============================================================

create table if not exists public.page_items (
  id          uuid primary key default gen_random_uuid(),
  section     text not null,                 -- research / org_division / org_support
  icon        text not null default '',      -- 아이콘(이모지)
  tag         text not null default '',      -- 작은 라벨 (예: Think-Tank)
  title       text not null,                 -- 제목
  body        text not null default '',      -- 설명 문구
  bullets     text not null default '',      -- 세부 항목 (한 줄에 하나)
  image_url   text not null default '',      -- 이미지(사업분야용)
  sort_order  int  not null default 0,       -- 순서
  published   boolean not null default true, -- 노출 여부
  created_at  timestamptz not null default now()
);

alter table public.page_items enable row level security;

drop policy if exists "admin full access items" on public.page_items;
create policy "admin full access items"
  on public.page_items for all to authenticated
  using (true) with check (true);

drop policy if exists "public read published items" on public.page_items;
create policy "public read published items"
  on public.page_items for select to anon
  using (published = true);
