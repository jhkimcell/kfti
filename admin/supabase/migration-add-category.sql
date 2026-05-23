-- ============================================================
-- [마이그레이션] 기존 notices 테이블에 "종류(category)" 칸 추가
-- 이미 setup.sql 을 한 번 실행한 분이 이 파일을 추가로 실행하세요.
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 Run.
-- (처음 설치하는 분은 이 파일 대신 setup.sql 만 실행하면 됩니다.)
-- ============================================================

-- 1) category 칸 추가 (기존 글은 자동으로 'notice'(공지사항)가 됩니다)
alter table public.notices
  add column if not exists category text not null default 'notice';

-- 2) 값은 'notice'(공지사항) 또는 'press'(보도자료)만 허용
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'notices_category_check'
  ) then
    alter table public.notices
      add constraint notices_category_check check (category in ('notice', 'press'));
  end if;
end $$;
