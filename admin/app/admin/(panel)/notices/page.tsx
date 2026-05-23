import BoardList from "@/components/board-list";

// 항상 최신 목록을 보여주기 위해 캐시를 사용하지 않습니다.
export const dynamic = "force-dynamic";

export default function NoticesPage() {
  return <BoardList category="notice" />;
}
