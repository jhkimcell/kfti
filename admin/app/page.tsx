import { redirect } from "next/navigation";

// 루트(/)로 들어오면 관리자 대시보드로 보냅니다.
// 비로그인 상태면 proxy.ts가 다시 /admin/login 으로 보내줍니다.
export default function Home() {
  redirect("/admin/dashboard");
}
