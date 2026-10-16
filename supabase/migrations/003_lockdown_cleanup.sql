-- 공개 읽기 차단 + 오래된 방 자동 삭제
-- 이 파일은 002와, RPC로 조회하는 클라이언트가 배포된 뒤에 적용한다.

drop policy if exists rooms_read   on public.rooms;
drop policy if exists players_read on public.players;
-- 정책이 없으면 anon/authenticated는 두 테이블을 직접 읽을 수 없다.
revoke select on public.rooms, public.players from anon, authenticated;

-- 실시간(postgres_changes)은 읽기 권한이 필요하므로 끈다. 클라이언트는 폴링한다.
alter publication supabase_realtime drop table public.rooms, public.players;

-- 7일 지난 방(변론·판결문 포함)을 매일 삭제. 하위 데이터는 cascade로 함께 지워진다.
create extension if not exists pg_cron;
select cron.schedule(
  'purge-old-rooms', '10 18 * * *',   -- 매일 03:10 (한국 시간)
  $$delete from public.rooms where updated_at < now() - interval '7 days'$$);
