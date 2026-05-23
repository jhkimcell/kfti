// 게시판 종류(공지사항 / 보도자료)와 화면에 쓰는 정보를 한곳에 모아둡니다.
export type Category = "notice" | "press";

type BoardConfig = {
  label: string; // 사이드바/제목에 표시 (예: 공지사항)
  basePath: string; // 목록 경로 (예: /admin/notices)
  newLabel: string; // 새 글 버튼 문구
};

export const BOARDS: Record<Category, BoardConfig> = {
  notice: {
    label: "공지사항",
    basePath: "/admin/notices",
    newLabel: "새 공지 작성",
  },
  press: {
    label: "보도자료",
    basePath: "/admin/press",
    newLabel: "새 보도자료 작성",
  },
};

export function isCategory(value: string): value is Category {
  return value === "notice" || value === "press";
}
