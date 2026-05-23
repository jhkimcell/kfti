import BoardEdit from "@/components/board-edit";

export default async function EditNoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Next.js 16에서 params는 Promise라 await 해야 합니다.
  const { id } = await params;
  return <BoardEdit category="notice" id={id} />;
}
