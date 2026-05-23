-- ============================================================
-- [마이그레이션] 메인(홈) 히어로 슬라이드 텍스트 관리용 테이블
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 Run 하세요. (한 번만)
-- ============================================================

-- 1) 슬라이드 테이블
create table if not exists public.hero_slides (
  id           uuid primary key default gen_random_uuid(),
  tag          text not null default '',     -- 작은 라벨 (예: K-CULTURE · K-CONTENT)
  title        text not null,                -- 큰 제목 (줄바꿈 가능)
  subtitle     text not null default '',     -- 설명 문구
  button_label text not null default '',     -- 버튼 글자 (비우면 버튼 숨김)
  button_link  text not null default '',     -- 버튼 링크 (예: research.html)
  image_url    text not null default '',     -- 배경 이미지 URL (비우면 기본 배경)
  sort_order   int  not null default 0,      -- 노출 순서 (작을수록 먼저)
  published    boolean not null default true,-- 노출 여부
  created_at   timestamptz not null default now()
);

-- 2) RLS
alter table public.hero_slides enable row level security;

drop policy if exists "admin full access hero" on public.hero_slides;
create policy "admin full access hero"
  on public.hero_slides for all to authenticated
  using (true) with check (true);

drop policy if exists "public read published hero" on public.hero_slides;
create policy "public read published hero"
  on public.hero_slides for select to anon
  using (published = true);

-- 3) 현재 홈페이지의 3개 슬라이드를 기본값으로 채움 (테이블이 비어있을 때만)
insert into public.hero_slides (tag, title, subtitle, button_label, button_link, sort_order)
select v.tag, v.title, v.subtitle, v.button_label, v.button_link, v.sort_order
from (values
  ('NEXT-K Initiative Forum', E'세계를 주도하는\nK-선도국가로',
   '재단법인 K-선도국가 미래포럼은 대한민국의 문화적 저력을 결집하는 공공 플랫폼입니다.',
   '사업분야 보기', 'research.html', 1),
  ('K-CULTURE · K-CONTENT', E'문화가 곧\n국가 경쟁력입니다',
   'K-콘텐츠·푸드·뷰티·바이오, 문화 주도 성장으로 미래를 엽니다.',
   '자세히 보기', 'research.html', 2),
  ('PUBLIC PLATFORM', E'대한민국 문화 창달의\n중심, NEXT-K',
   E'민·관·학을 잇는 협력 네트워크로 \'K-컬처\'의 글로벌 위상을 높입니다.',
   '재단 소개', 'about.html', 3)
) as v(tag, title, subtitle, button_label, button_link, sort_order)
where not exists (select 1 from public.hero_slides);
