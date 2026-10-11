# 땅땅땅 — AI 친구 재판

친구끼리 사건을 접수하고 역할을 나눠 변론하면, AI 판사가 판결과 벌칙을 내려 주는 웹게임.

## 구성

| 부분 | 위치 | 역할 |
| --- | --- | --- |
| 화면 | `index.html`, `app.js`, `styles.css`, `config.js` | GitHub Pages로 배포 |
| DB + 실시간 | `supabase/migrations/001_init.sql` | 방, 참여자, 변론, 투표, 하루 사용량 |
| 판결 서버 | `supabase/functions/judge/index.ts` | 하루 상한 확인 → Gemini 호출 → 판결 저장 |

로그인이 없다. 참가자마다 비밀 토큰이 발급되고, 모든 쓰기는 DB 함수(RPC)를 통해서만 된다.
변론은 판결 서버만 읽을 수 있고, Gemini 키는 서버 비밀 값으로만 존재한다.

## 배포 순서

1. Supabase 프로젝트 생성 후 `supabase/migrations/001_init.sql` 실행
2. Edge Function `judge` 배포 (JWT 검증 끔, `supabase/config.toml` 참고)
3. Supabase 대시보드 → Edge Functions → Secrets 에 등록
   - `GEMINI_API_KEY`: Google AI Studio 키 (필수)
   - `DAILY_LIMIT`: 하루 최대 판결 수 (선택, 기본 1000)
   - `GEMINI_MODEL`: 모델 이름 (선택, 기본 `gemini-2.5-flash-lite`)
4. `config.js`에 Supabase URL과 anon(publishable) 키 입력
5. GitHub 저장소 Settings → Pages → Branch `main` / root 로 배포

## 게임 흐름

사건 접수 → 초대 링크 → 역할 선택(원고·피고 필수, 3인부터 증인·배심원·검사·변호인) →
변론 제출(200자) → 휴정(전면광고 자리) → 판결 공개 → 공유 / 재심 전원 동의 투표(최대 3회)

## 광고

- 배너 자리: `app.js`의 `adSlot()` (접수, 대기실, 제출 대기, 휴정, 판결, 공유 페이지)
- 휴정 전면광고: `recessAd()`가 애드센스 H5 게임 광고 `adBreak()`를 호출
- 애드센스 승인 후 `index.html` 머리의 주석을 풀고 `ca-pub` 값을 넣는다.
