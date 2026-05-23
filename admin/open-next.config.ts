// Cloudflare 배포용 OpenNext 설정.
// 관리자 페이지는 모두 로그인 기반의 동적 화면이라 별도 캐시(R2 등)는 쓰지 않습니다.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({});
