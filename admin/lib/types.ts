import type { Category } from "@/lib/board";

// 게시물 한 건의 데이터 구조 (Supabase의 notices 테이블과 동일)
export type Notice = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  category: Category; // notice(공지사항) / press(보도자료)
  created_at: string;
};

// 사업분야/조직구성 카드 항목 (Supabase의 page_items 테이블과 동일)
export type PageItem = {
  id: string;
  section: string;
  icon: string;
  tag: string;
  title: string;
  body: string;
  bullets: string;
  image_url: string;
  sort_order: number;
  published: boolean;
  created_at: string;
};

// 메인(홈) 히어로 슬라이드 (Supabase의 hero_slides 테이블과 동일)
export type HeroSlide = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  button_label: string;
  button_link: string;
  image_url: string;
  sort_order: number;
  published: boolean;
  created_at: string;
};
