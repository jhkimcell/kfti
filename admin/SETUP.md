# 한국미래기술연구원(KFTI) 관리자 — 설치 가이드

처음이어도 따라 할 수 있도록 **순서대로** 정리했습니다.
전체 흐름은 이렇습니다:

```
① Supabase 가입·프로젝트 생성
② API 키 복사 → .env.local 채우기
③ SQL 실행해서 공지 테이블 만들기
④ 관리자 계정(이메일/비번) 만들기
⑤ npm run dev 로 실행하고 로그인
```

> Supabase = 데이터베이스 + 로그인 기능을 무료로 빌려주는 서비스입니다.
> 우리가 직접 서버를 만들 필요 없이, 공지 데이터 저장과 로그인을 맡깁니다.

---

## ① Supabase 가입 & 프로젝트 생성

1. https://supabase.com 접속 → 우측 상단 **Start your project** → GitHub 또는 이메일로 가입
2. 로그인 후 **New project** 클릭
3. 입력값:
   - **Name**: `kfti-admin` (아무 이름이나 OK)
   - **Database Password**: 아무거나 강력하게 설정 → **메모해 두세요** (나중에 DB 직접 접속할 때 필요)
   - **Region**: `Northeast Asia (Seoul)` 추천 (한국에서 빠름)
4. **Create new project** → 1~2분 기다리면 준비 완료

---

## ② API 키 복사 → `.env.local` 채우기

1. 왼쪽 메뉴 맨 아래 **⚙ Project Settings** → **API** (또는 **API Keys**)
2. 두 가지 값을 복사합니다:
   - **Project URL** (예: `https://abcdxyz.supabase.co`)
   - **anon / public** 키 (`anon` `public` 라고 적힌 긴 문자열)
3. `admin/.env.local` 파일을 열어 아래처럼 채웁니다:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://abcdxyz.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...(복사한 anon 키)
   ```

> ⚠️ **막히기 쉬운 부분**
> - `service_role` 키가 아니라 **`anon` `public`** 키를 넣어야 합니다. (service_role은 절대 프론트엔드에 두면 안 됨)
> - 값을 넣은 뒤에는 **개발 서버를 껐다가(`Ctrl + C`) 다시 켜야** 적용됩니다.
> - 등호(`=`) 뒤에 따옴표·공백 없이 바로 값만 붙입니다.

---

## ③ 공지 테이블 만들기 (SQL 실행)

1. 왼쪽 메뉴 **SQL Editor** → **New query**
2. 이 폴더의 [`supabase/setup.sql`](supabase/setup.sql) 내용을 **전부 복사해 붙여넣기**
3. 우측 아래 **Run** 클릭 → `Success` 가 뜨면 완료
4. 왼쪽 **Table Editor** 에 `notices` 테이블이 보이면 성공

> 이 SQL은 공지 테이블을 만들고, "로그인한 사람만 글을 쓸 수 있게" 보안 규칙(RLS)까지 함께 설정합니다.

> 🔁 **이미 예전에 setup.sql을 실행한 분(보도자료 기능 추가)**
> 공지사항만 있던 시절에 setup.sql을 돌렸다면, 보도자료 구분(category)을 추가해야 합니다.
> SQL Editor에서 [`supabase/migration-add-category.sql`](supabase/migration-add-category.sql) 내용을 복사해 한 번 더 **Run** 하세요.
> (처음 설치라 위 setup.sql을 방금 돌린 분은 이미 포함돼 있으니 건너뛰어도 됩니다.)

---

## ④ 관리자 계정 만들기

로그인할 이메일/비밀번호를 직접 등록합니다.

1. 왼쪽 메뉴 **Authentication** → **Users** → **Add user** → **Create new user**
2. 입력:
   - **Email**: 로그인에 쓸 이메일 (예: `admin@kfti.or.kr`)
   - **Password**: 로그인 비밀번호
   - **Auto Confirm User**: **반드시 체크 ✅** (메일 인증 없이 바로 로그인 가능)
3. **Create user**

> ⚠️ **막히기 쉬운 부분**
> - **Auto Confirm User**를 체크하지 않으면 "이메일 인증" 때문에 로그인이 안 됩니다.
> - 회원가입 페이지는 일부러 만들지 않았습니다. 관리자는 위 방법으로만 추가합니다. (보안)

---

## ⑤ 실행하고 로그인

터미널에서:

```bash
cd admin
npm run dev
```

브라우저에서 **http://localhost:3000/admin/login** 접속 →
④에서 만든 이메일/비밀번호로 로그인 → 대시보드로 이동하면 성공입니다. 🎉

이제 **공지사항** 메뉴에서 글을 작성/수정/삭제해 보세요.

---

## 자주 막히는 상황 (FAQ)

| 증상 | 원인 / 해결 |
| --- | --- |
| 로그인 눌러도 "이메일 또는 비밀번호가 올바르지 않습니다" | 계정 미생성 / 비번 오타 / Auto Confirm 미체크. ④번 다시 확인 |
| 공지 목록에서 "테이블이 없다"는 에러 | ③번 SQL을 아직 안 돌림. SQL Editor에서 setup.sql 실행 |
| 화면이 계속 로그인으로 튕김 | `.env.local` 값이 비었거나 오타. ②번 확인 후 서버 재시작 |
| `.env.local` 고쳤는데 안 바뀜 | 서버를 껐다 켜야 적용됨 (`Ctrl + C` → `npm run dev`) |

---

## 폴더 구조 (참고)

```
admin/
├─ app/
│  └─ admin/
│     ├─ login/                  ← 로그인 페이지
│     └─ (panel)/                ← 로그인 후 화면 (사이드바 공통)
│        ├─ layout.tsx           ← 사이드바 + 본문 레이아웃
│        ├─ dashboard/           ← 대시보드 (통계 카드)
│        └─ notices/             ← 공지 목록 / new(작성) / [id]/edit(수정)
├─ components/                   ← 사이드바·폼·삭제버튼 등 재사용 UI
├─ lib/
│  ├─ supabase/                  ← Supabase 연결 (client/server/session)
│  └─ actions/notices.ts         ← 공지 저장·수정·삭제 (서버 로직)
├─ proxy.ts                      ← 비로그인 차단 (Next.js 16의 구 middleware)
├─ supabase/setup.sql            ← DB 초기 설정 SQL
└─ .env.local                    ← 내 Supabase 키 (비공개)
```

---

## 다음 단계 (원할 때)

- **공개 사이트 연동**: 지금 작성한 공지를 바깥 `news.html` 등에서 불러와 보여주기
- **본문 에디터 강화**: 지금은 일반 텍스트 입력. 글꼴/이미지가 필요하면 리치 에디터로 업그레이드
- **배포**: Vercel에 올려서 실제 주소로 접속 (환경변수 동일하게 등록)

필요하면 말씀해 주세요. 이어서 도와드리겠습니다.
