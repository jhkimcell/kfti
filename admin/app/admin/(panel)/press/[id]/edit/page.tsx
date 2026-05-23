import BoardEdit from "@/components/board-edit";

export default async function EditPressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BoardEdit category="press" id={id} />;
}
