-- ============================================================
-- 한국미래기술연구원(KFTI) 관리자 - 데이터베이스 초기 설정
-- Supabase 대시보드 → 왼쪽 메뉴 "SQL Editor" 에 붙여넣고 실행하세요.
-- ============================================================

-- 1) 공지사항 테이블
create table if not exists public.notices (
  id          uuid primary key default gen_random_uuid(),  -- 자동 생성되는 고유 ID
  title       text not null,                                -- 제목
  content     text not null,                                -- 본문
  published   boolean not null default true,                -- 노출 여부 (true=노출, false=숨김)
  category    text not null default 'notice'                -- 종류: notice(공지사항) / press(보도자료)
              check (category in ('notice', 'press')),
  created_at  timestamptz not null default now()            -- 작성일시 (자동)
);

-- 2) RLS(Row Level Security) 켜기
--    켜두면 아래에서 "허용"한 작업만 가능합니다. (보안 기본기)
alter table public.notices enable row level security;

-- 3) 로그인한 관리자: 조회/생성/수정/삭제 모두 허용
drop policy if exists "admin full access" on public.notices;
create policy "admin full access"
  on public.notices
  for all
  to authenticated
  using (true)
  with check (true);

-- 4) 비로그인 방문자(공개 홈페이지용): "노출"된 공지만 읽기 허용
--    지금 어드민에는 필요 없지만, 나중에 공개 사이트에서 공지를 불러올 때 씁니다.
drop policy if exists "public read published" on public.notices;
create policy "public read published"
  on public.notices
  for select
  to anon
  using (published = true);
