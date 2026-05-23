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
